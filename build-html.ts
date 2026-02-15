import { marked } from "marked";
import { readdir, mkdir, cp } from "node:fs/promises";
import { join } from "node:path";

const MD_DIR = join(import.meta.dir, "build", "markdown");
const HTML_DIR = join(import.meta.dir, "build", "html");
const CSS_SRC = join(import.meta.dir, "node_modules", "github-markdown-css", "github-markdown-light.css");

await mkdir(HTML_DIR, { recursive: true });

// Copy images and CSS into html output
await cp(join(MD_DIR, "img"), join(HTML_DIR, "img"), { recursive: true });
const css = await Bun.file(CSS_SRC).text();
await Bun.write(join(HTML_DIR, "github-markdown.css"), css);

function htmlFilename(mdFilename: string): string {
  if (mdFilename === "curriculum.md") return "index.html";
  return mdFilename.replace(/\.md$/, ".html");
}

function rewriteLinks(html: string): string {
  // Rewrite .md links to .html, and curriculum.md to index.html
  return html
    .replace(/href="curriculum\.md"/g, 'href="index.html"')
    .replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
}

function template(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="github-markdown.css">
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
${body}
</body>
</html>`;
}

const files = await readdir(MD_DIR);
const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

for (const filename of mdFiles) {
  const md = await Bun.file(join(MD_DIR, filename)).text();

  // Extract title from first heading
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1]! : filename.replace(/\.md$/, "");

  const bodyHtml = rewriteLinks(await marked(md));
  const fullHtml = template(title, bodyHtml);
  const outName = htmlFilename(filename);

  await Bun.write(join(HTML_DIR, outName), fullHtml);
}

console.log(`Done: ${mdFiles.length} HTML files written to build/html/`);
