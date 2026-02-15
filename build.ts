import { Window } from "happy-dom";
import initScratchblocks from "scratchblocks/index.js";
import { readdir, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

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

// --- Frontmatter parsing ---

interface Frontmatter {
  unit?: number;
  session?: string;
  title?: string;
}

function parseFrontmatter(content: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const raw = match[1]!;
  const body = match[2]!;
  const frontmatter: Frontmatter = {};

  for (const line of raw.split("\n")) {
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim().replace(/^["']|["']$/g, "");
    if (key!.trim() === "unit") frontmatter.unit = parseInt(value);
    if (key!.trim() === "session") frontmatter.session = value;
    if (key!.trim() === "title") frontmatter.title = value;
  }

  return { frontmatter, body };
}

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

function looksLikeScratchblocks(code: string): boolean {
  const keywords = [
    "when green flag clicked",
    "when [",
    "when I receive",
    "when I start as a clone",
    "when this sprite clicked",
    "forever",
    "repeat",
    "if <",
    "move (",
    "say [",
    "set [",
    "change [",
    "broadcast [",
    "create clone",
    "delete this clone",
    "go to",
    "glide (",
    "turn right",
    "turn left",
    "pen down",
    "pen up",
    "erase all",
    "play sound",
    "define ",
    "hide",
    "show",
    "wait (",
    "stop [",
    "switch costume",
    "switch backdrop",
    "set size",
    "set rotation style",
    "if on edge, bounce",
    "change x by",
    "change y by",
    "point in direction",
    "next costume",
  ];
  const lines = code.split("\n").filter((l) => l.trim() && !l.trim().startsWith("//"));
  if (lines.length === 0) return false;
  return lines.some((line) =>
    keywords.some((kw) => line.trim().toLowerCase().startsWith(kw.toLowerCase()))
  );
}

// --- Build pipeline ---

const SRC = join(import.meta.dir, "src");
const BUILD = join(import.meta.dir, "build", "markdown");
const IMG = join(BUILD, "img");

// Clean and create output dirs
await rm(join(import.meta.dir, "build"), { recursive: true, force: true });
await mkdir(IMG, { recursive: true });

const files = await readdir(SRC);
const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

let totalImages = 0;
let totalSkipped = 0;

for (const filename of mdFiles) {
  const content = await Bun.file(join(SRC, filename)).text();
  const { frontmatter, body } = parseFrontmatter(content);
  const session = frontmatter.session;

  // Process code blocks
  let imageIndex = 0;
  const processed = body.replace(
    /```\n([\s\S]*?)```/g,
    (match, code: string) => {
      const trimmed = code.trim();

      if (!looksLikeScratchblocks(trimmed)) {
        totalSkipped++;
        return match;
      }

      const svgString = renderScratchblocks(trimmed);
      if (!svgString) {
        totalSkipped++;
        return match;
      }

      imageIndex++;
      const imgName = session ? `${session}-${imageIndex}.svg` : `${filename.replace(".md", "")}-${imageIndex}.svg`;

      Bun.write(join(IMG, imgName), svgString);
      totalImages++;

      return `![${session || filename} example ${imageIndex}](img/${imgName})`;
    }
  );

  await Bun.write(join(BUILD, filename), processed);
  if (imageIndex > 0) {
    console.log(`  ${filename}: ${imageIndex} image(s)`);
  }
}

console.log(`\nDone: ${totalImages} SVGs generated, ${totalSkipped} code blocks skipped`);
