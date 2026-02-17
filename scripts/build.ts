import { Window } from "happy-dom";
import initScratchblocks from "scratchblocks/index.js";
import cssContent from "scratchblocks/scratch3/style.css.js";
import { readdir, mkdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";
import type { Plugin } from "unified";
import type { Root, Code } from "mdast";

const SRC = resolve(join(import.meta.dir, "..", "src"));
const BUILD = resolve(join(import.meta.dir, "..", "build"));

// --- DOM setup for server-side scratchblocks rendering ---

const window = new Window();

const origCreateElement = window.document.createElement.bind(window.document);
window.document.createElement = function (tag: string, ...args: any[]) {
  const el = origCreateElement(tag, ...args);
  if (tag === "canvas") {
    (el as any).getContext = () => ({
      font: "",
      measureText: (text: string) => ({
        width: text.length * 7.2,
      }),
    });
  }
  return el;
};

const sb = initScratchblocks(window as any);
const serializer = new window.XMLSerializer();

// --- Scratchblocks rendering ---

function renderScratchblocks(code: string): string | null {
  try {
    const doc = sb.parse(code, { languages: ["en"] });
    const view = sb.newView(doc, { style: "scratch3" });
    const svg = view.render();
    return serializer.serializeToString(svg);
  } catch {
    return null;
  }
}

// --- Remark plugins ---

const extractFrontmatter: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, "yaml", (node: any) => {
      file.data.frontmatter = parseYaml(node.value);
    });
  };
};

const renderScratchblocksPlugin: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "scratchblocks" || index == null || !parent) return;

      const svgString = renderScratchblocks(node.value);
      if (!svgString) return;

      (parent.children as any[])[index] = {
        type: "html",
        value: `<div class="scratchblocks">${svgString}</div>`,
      };
    });
  };
};

// --- HTML template ---

function template(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="github-markdown.css">
  <link rel="stylesheet" href="scratchblocks.css">
  <style>
    body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
    .markdown-body img {
      max-width: 100%;
      height: auto;
    }
    @media (max-width: 767px) {
      body { padding: 15px; }
    }
  </style>
</head>
<body class="markdown-body">
  ${title !== 'curriculum' ? ('<div><a href="index.html">&laquo; Back to Curriculum</a></div>') : ''}
  ${body}
</body>
</html>`;
}

function rewriteLinks(html: string): string {
  return html
    .replace(/href="curriculum\.md"/g, 'href="index.html"')
    .replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
}

function htmlFilename(mdFilename: string): string {
  if (mdFilename === "curriculum.md") return "index.html";
  return mdFilename.replace(/\.md$/, ".html");
}

// --- Build pipeline ---

await rm(BUILD, { recursive: true, force: true });
await mkdir(BUILD, { recursive: true });

// Write shared CSS files
const githubCss = await Bun.file(
  resolve(join(import.meta.dir, "..", "node_modules", "github-markdown-css", "github-markdown-light.css"))
).text();
await Bun.write(join(BUILD, "github-markdown.css"), githubCss);

// Load custom CSS overrides if present
const customCssPath = join(SRC, "custom.css");
const customCss = await Bun.file(customCssPath).exists()
  ? await Bun.file(customCssPath).text()
  : "";
await Bun.write(join(BUILD, "scratchblocks.css"), `${cssContent}\n${customCss}`);

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkGfm)
  .use(extractFrontmatter)
  .use(renderScratchblocksPlugin)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

const files = await readdir(SRC);
const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

let totalSvgs = 0;

for (const filename of mdFiles) {
  const content = await Bun.file(join(SRC, filename)).text();
  const result = await processor.process(content);

  const frontmatter = result.data.frontmatter as Record<string, any> | undefined;
  const title = frontmatter?.title ?? filename.replace(/\.md$/, "");

  let bodyHtml = rewriteLinks(String(result));

  // Count SVGs in this file
  const svgCount = (bodyHtml.match(/<div class="scratchblocks">/g) || []).length;
  totalSvgs += svgCount;

  const fullHtml = template(title, bodyHtml);
  const outName = htmlFilename(filename);
  await Bun.write(join(BUILD, outName), fullHtml);

  if (svgCount > 0) {
    console.log(`  ${filename}: ${svgCount} scratchblock(s)`);
  }
}

console.log(`\nDone: ${mdFiles.length} HTML files, ${totalSvgs} inline SVGs`);
