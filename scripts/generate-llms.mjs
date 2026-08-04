#!/usr/bin/env node
/**
 * Emits agent-readable plain-text copies of the docs into public/:
 *
 *   /llms.txt          index of every page (llmstxt.org)
 *   /llms-full.txt     every page concatenated
 *   /<route>.md        one file per page
 *
 * The MDX components this site uses are flattened into ordinary Markdown so a
 * model reading the .md gets the same facts as a human reading the page.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = join(ROOT, "pages");
const PUBLIC = join(ROOT, "public");
const SITE = "https://docs.useknit.io";
const API_BASE = "https://api-prod.useknit.io";

/* ------------------------------------------------------------------ pages */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (entry !== "api") walk(p, out);
    } else if (entry.endsWith(".mdx")) {
      out.push(p);
    }
  }
  return out;
}

function routeFor(file) {
  const rel = relative(PAGES, file).replace(/\.mdx$/, "").split(sep).join("/");
  return "/" + rel.replace(/(^|\/)index$/, "");
}

/** Nav order and section titles, read from the _meta.json files. */
function readMeta(dir) {
  try {
    return JSON.parse(readFileSync(join(dir, "_meta.json"), "utf8"));
  } catch {
    return {};
  }
}

/* -------------------------------------------------------------- frontmatter */

function splitFrontmatter(src) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1).replace(/\\"/g, '"');
    }
    data[kv[1]] = v;
  }
  return { data, body: src.slice(m[0].length) };
}

/* ------------------------------------------------------ component flattening */

/**
 * Pull `attr="value"` / `attr={value}` pairs off a JSX open tag. Bare
 * attributes (`required`) become "true"; the `|$` in the lookahead matters
 * because the closing `>` is consumed by the caller's regex, so a trailing
 * bare attribute sits at the end of the string.
 */
function attrs(tag) {
  const out = {};
  const re = /(\w+)\s*=\s*(?:"([^"]*)"|\{([^}]*)\})|(\w+)(?=[\s/>]|$)/g;
  let m;
  while ((m = re.exec(tag))) {
    if (m[1]) out[m[1]] = m[2] !== undefined ? m[2] : m[3].trim();
    else if (m[4]) out[m[4]] = "true";
  }
  return out;
}

/** Replace a paired <Tag ...>children</Tag> using a formatter. */
function replacePaired(src, tag, format) {
  const re = new RegExp(`<${tag}(\\s[^>]*?)?>([\\s\\S]*?)</${tag}>`, "g");
  let prev;
  do {
    prev = src;
    src = src.replace(re, (_, a = "", children) =>
      format(attrs(a || ""), children.trim())
    );
  } while (src !== prev);
  return src;
}

/** Replace a self-closing <Tag ... /> using a formatter. */
function replaceSelfClosing(src, tag, format) {
  return src.replace(
    new RegExp(`<${tag}(\\s[^>]*?)?/>`, "g"),
    (_, a = "") => format(attrs(a || ""))
  );
}

/**
 * Strip the common indent. The first line is excluded from the measurement —
 * children arrive already trimmed, so it always reads as indent 0 and would
 * otherwise drag the minimum down to nothing.
 */
function dedent(text) {
  const lines = text.replace(/\t/g, "  ").split("\n");
  const rest = lines.slice(1).filter((l) => l.trim());
  const min = rest.length
    ? Math.min(...rest.map((l) => l.match(/^ */)[0].length))
    : 0;
  return [lines[0], ...lines.slice(1).map((l) => l.slice(min))]
    .join("\n")
    .trim();
}

/** Collapse a block to a single line of prose. */
function oneLine(text) {
  return dedent(text).replace(/\s+/g, " ").trim();
}

/** Left-align already-formatted list items produced by nested replacements. */
function asList(children) {
  return children
    .split("\n")
    .map((l) => l.replace(/^\s+/, ""))
    .filter(Boolean)
    .join("\n");
}

function mdxToMarkdown(body, { title, description }) {
  let s = body;

  // Fenced code blocks are protected from the transformations below.
  const fences = [];
  s = s.replace(/```[\s\S]*?```/g, (block) => {
    fences.push(block);
    return `\n%%KNITFENCE${fences.length - 1}%%\n`;
  });

  s = replaceSelfClosing(s, "Hero", (a) =>
    [`# ${a.title || title}`, "", a.subtitle || description || ""].join("\n")
  );

  s = replaceSelfClosing(s, "Endpoint", (a) => {
    const method = (a.method || "GET").toUpperCase();
    const base = a.base === "false" ? "" : API_BASE;
    return `\`${method} ${base}${a.path || ""}\``;
  });

  s = replaceSelfClosing(s, "Scope", (a) => `- Required scope: \`${a.value}\``);
  s = replaceSelfClosing(s, "Chip", (a) =>
    `- ${a.label ? `${a.label}: ` : ""}\`${a.value}\``
  );
  s = replacePaired(s, "Meta", (_a, c) => `\n${asList(c)}\n`);

  s = replacePaired(s, "Field", (a, c) => {
    const meta = [];
    if (a.type) meta.push(a.type);
    if (a.required === "true") meta.push("required");
    else if (a.required === "false") meta.push("optional");
    if (a.defaultValue) meta.push(`default \`${a.defaultValue}\``);
    const head = `\`${a.name}\`${meta.length ? ` (${meta.join(", ")})` : ""}`;
    const desc = oneLine(c);
    return `- **${head}**${desc ? ` — ${desc}` : ""}`;
  });
  s = replacePaired(
    s,
    "ResponseField",
    (a, c) => `- **\`${a.name}\`** — ${oneLine(c)}`
  );
  s = replacePaired(s, "Fields", (_a, c) => `\n${asList(c)}\n`);

  s = replacePaired(s, "Card", (a, c) => {
    const label = a.title || "";
    const body = oneLine(c);
    return a.href
      ? `- [${label}](${a.href})${body ? ` — ${body}` : ""}`
      : `- **${label}**${body ? ` — ${body}` : ""}`;
  });
  s = replacePaired(s, "CardGrid", (_a, c) => `\n${asList(c)}\n`);
  s = replacePaired(s, "Cards", (_a, c) => `\n${asList(c)}\n`);

  s = replacePaired(s, "Callout", (a, c) => {
    const kind =
      { warning: "Warning", error: "Warning", info: "Note", default: "Note" }[
        a.type
      ] || "Note";
    return `\n> **${kind}:** ${oneLine(c)}\n`;
  });

  // Steps just wraps headings; keep the headings.
  s = replacePaired(s, "Steps", (_a, c) => `\n${dedent(c)}\n`);
  s = replacePaired(s, "Tabs", (_a, c) => `\n${dedent(c)}\n`);
  s = replacePaired(s, "Tab", (_a, c) => `\n${dedent(c)}\n`);

  // Anything left over: drop the tags, keep the text.
  s = s.replace(/<\/?[A-Z][\w.]*(\s[^>]*?)?\/?>/g, "");

  s = s.replace(/%%KNITFENCE(\d+)%%/g, (_, i) => fences[Number(i)]);

  // Site-relative links become absolute so the file stands alone when an
  // agent fetches only the .md.
  s = s.replace(/\]\((\/[^)\s]*)\)/g, (_, href) => `](${SITE}${href})`);
  s = s.replace(/\n{3,}/g, "\n\n").trim();

  // Ensure the document opens with its title.
  if (!/^#\s/m.test(s.split("\n")[0] || "")) s = `# ${title}\n\n${s}`;
  return s + "\n";
}

/* ---------------------------------------------------------------- generate */

/*
 * Nextra 2 embeds the page map into every compiled page. When a page is added,
 * removed, or renamed, pages whose own source did not change are served from
 * the webpack cache and keep the *old* map — which shows up as stale sidebar
 * links. Vercel restores .next/cache between builds, so drop it here rather
 * than ship a nav pointing at deleted routes.
 */
rmSync(join(ROOT, ".next", "cache", "webpack"), { recursive: true, force: true });

const files = walk(PAGES).sort();
const docs = files.map((file) => {
  const src = readFileSync(file, "utf8");
  const { data, body } = splitFrontmatter(src);
  const route = routeFor(file);
  const title = data.title || route;
  return {
    route,
    title,
    description: data.description || "",
    markdown: mdxToMarkdown(body, { title, description: data.description }),
  };
});

// Clean previously generated artefacts so removed pages don't linger.
for (const stale of ["llms.txt", "llms-full.txt"]) {
  rmSync(join(PUBLIC, stale), { force: true });
}

// Per-page .md
for (const doc of docs) {
  const target = join(
    PUBLIC,
    (doc.route === "/" ? "/index" : doc.route) + ".md"
  );
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, doc.markdown);
}

/* ------------------------------------------------------------- llms.txt */

const rootMeta = readMeta(PAGES);
const sections = [];
let current = { title: "Docs", items: [] };
sections.push(current);

for (const [key, value] of Object.entries(rootMeta)) {
  if (value && typeof value === "object" && value.type === "separator") {
    current = { title: value.title || "", items: [] };
    sections.push(current);
    continue;
  }
  const prefix = "/" + key;
  const matches = docs
    .filter((d) => d.route === prefix || d.route.startsWith(prefix + "/"))
    .sort((a, b) => a.route.localeCompare(b.route));
  if (key === "index") {
    const home = docs.find((d) => d.route === "/");
    if (home) current.items.push(home);
    continue;
  }
  current.items.push(...matches);
}

// Anything not reachable from the root meta still belongs in the index.
const listed = new Set(sections.flatMap((s) => s.items.map((i) => i.route)));
const orphans = docs.filter((d) => !listed.has(d.route));
if (orphans.length) sections.push({ title: "Other", items: orphans });

const llms = [
  "# Knit API Documentation",
  "",
  "> Knit is a stablecoin payments API: collect payments to single-use",
  "> addresses, hold balances in reusable wallets, disburse payouts on-chain,",
  "> and receive signed webhooks. Every endpoint lives under `/api/v1` and is",
  "> authenticated with OAuth 2.0 client-credential bearer tokens.",
  "",
  "Append `.md` to any documentation URL to get its Markdown source, e.g.",
  `${SITE}/authentication.md`,
  "",
  `- Production API base URL: ${API_BASE}`,
  "- Development API base URL: https://api-dev.useknit.io",
  "",
];

for (const section of sections) {
  if (!section.items.length) continue;
  llms.push(`## ${section.title}`, "");
  for (const doc of section.items) {
    const suffix = doc.route === "/" ? "/index.md" : `${doc.route}.md`;
    llms.push(
      `- [${doc.title}](${SITE}${suffix})${doc.description ? `: ${doc.description}` : ""}`
    );
  }
  llms.push("");
}

writeFileSync(join(PUBLIC, "llms.txt"), llms.join("\n").trimEnd() + "\n");

/* -------------------------------------------------------- llms-full.txt */

const full = [
  "# Knit API Documentation — full text",
  "",
  `Generated from ${SITE}. Every documentation page, concatenated.`,
  "",
];
for (const section of sections) {
  for (const doc of section.items) {
    full.push(
      "",
      "<!-- ---------------------------------------------------------------- -->",
      `<!-- source: ${SITE}${doc.route} -->`,
      "",
      doc.markdown.trim(),
      ""
    );
  }
}
writeFileSync(join(PUBLIC, "llms-full.txt"), full.join("\n").trimEnd() + "\n");

console.log(
  `llms: wrote ${docs.length} .md files, llms.txt (${sections.filter((s) => s.items.length).length} sections), llms-full.txt`
);
