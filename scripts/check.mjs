#!/usr/bin/env node
/**
 * scripts/check.mjs: validate every skill and the package around them.
 *
 *   node scripts/check.mjs                         every skill
 *   node scripts/check.mjs --only creatorline,creatorline-workflows
 *
 * What it holds, and why (CONTRIBUTING.md has the long form):
 *
 *   - frontmatter keys are exactly name, description, license, metadata: claude.ai refuses
 *     an upload with any other key, and the ChatGPT package rewrites it to name + description;
 *   - name = folder, lowercase words joined by single hyphens, and "creatorline:<name>" at
 *     most 64 characters (OpenAI's skill_identity_too_long);
 *   - description 1 to 1024 characters (warned outside 250 to 420), no XML, and no word
 *     about price, cost, credits or plans: the plugin directory's metadata check refuses a
 *     description with one;
 *   - no em dash in any file, and no other vendor's or product's name in any file (a NOTICE.md
 *     or LICENSE, which must name what it credits, is the exception);
 *   - agents/openai.yaml present, with the fields ChatGPT and Codex read and nothing else;
 *   - every relative link resolves inside its own skill folder and never uses "../", because
 *     every install copies one folder and nothing beside it;
 *   - SKILL.md under 500 lines (warned over 400); references one level deep, with a table of
 *     contents when longer than 100 lines;
 *   - all descriptions together (warned over 8000 characters, the Codex listing budget);
 *   - the shared references copied into the skills match shared/ byte for byte.
 *
 * No dependencies: Node 18 or later. The YAML reader below takes the subset these files use
 * (mappings, lists, quoted and plain scalars, block scalars, one-line flow lists).
 */

import { existsSync, lstatSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { skillFolders, syncShared } from "./sync-shared.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ── rules shared with the ChatGPT build ────────────────────────────────────── */

/** The same words the ChatGPT build refuses in a description (keep the two equal). */
export const PRICING_WORDS = /\bpric(?:e|es|ed|ing)\b|\bcosts?\b|\bcredits?\b|\bplans?\b|\bsubscri\w*|\bupgrad\w*|\bpaid\b|\bbalance\b|\bspen[dt]\w*/i;

/** A skill's own name ("creatorline-content-calendar", "$creatorline-x") is not a word about pricing. */
export const withoutSkillNames = (text) => String(text ?? "").replace(/\$?\bcreatorline(?:-[a-z0-9]+)+/g, " ");

/** The first pricing word in a text, or null. */
export function pricingWord(text) {
  return PRICING_WORDS.exec(withoutSkillNames(text))?.[0] ?? null;
}

// Names no skill may carry. Spelled in halves so that this file does not carry them whole.
const VENDOR_PARTS = [
  ["Higgs", "field"],
  ["Gen", "jutsu"],
  ["Soul", "ID"],
  ["Cinema", "Studio"],
  ["Higgs", "edit"],
  ["Marketing", "Studio"],
];
const VENDOR_RES = VENDOR_PARTS.map(([a, b]) => new RegExp(`\\b${a}[\\s_-]?${b}\\b`, "i"));

/** The first forbidden vendor or product name in a text, or null. */
export function vendorName(text) {
  for (const re of VENDOR_RES) {
    const hit = re.exec(String(text ?? ""));
    if (hit) return hit[0];
  }
  return null;
}

/** Files that exist to credit other projects, and so must name them. */
export const isNoticeFile = (file) => /^(NOTICE|LICEN[CS]E)(\.(md|txt))?$/i.test(path.basename(file));

export const EM_DASH = String.fromCharCode(0x2014);

/* ── a small YAML reader for the shapes these files use ─────────────────────── */

/** Parse the YAML subset of SKILL.md frontmatter and agents/openai.yaml. Throws with a line number. */
export function parseYaml(source, where = "yaml") {
  const lines = String(source).replace(/\r\n?/g, "\n").split("\n").map((raw, i) => ({ raw, no: i + 1 }));
  let pos = 0;
  const fail = (message, line) => {
    throw new Error(`${where}${line ? ` line ${line.no}` : ""}: ${message}`);
  };
  const indentOf = (raw) => raw.match(/^ */)[0].length;
  const isBlank = (line) => /^\s*(#.*)?$/.test(line.raw);
  for (const line of lines) {
    if (/^ *\t/.test(line.raw)) fail("a tab in the indentation (use spaces)", line);
  }
  const skipBlank = () => {
    while (pos < lines.length && isBlank(lines[pos])) pos++;
  };
  const isSeqText = (text) => text === "-" || text.startsWith("- ");

  function typed(plain) {
    if (/^(true|True|TRUE)$/.test(plain)) return true;
    if (/^(false|False|FALSE)$/.test(plain)) return false;
    if (/^(null|Null|NULL|~)$/.test(plain) || plain === "") return null;
    if (/^[-+]?\d+$/.test(plain)) return Number(plain);
    if (/^[-+]?(\d+\.\d*|\.\d+)([eE][-+]?\d+)?$/.test(plain)) return Number(plain);
    return plain;
  }

  function unescapeDouble(body, line) {
    return body.replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8}|.)/g, (_, e) => {
      switch (e[0]) {
        case "n": return "\n";
        case "t": return "\t";
        case "r": return "\r";
        case "0": return "\0";
        case "\\": return "\\";
        case '"': return '"';
        case "/": return "/";
        case " ": return " ";
        case "x": case "u": case "U": return String.fromCodePoint(parseInt(e.slice(1), 16));
        default: return fail(`unknown escape \\${e} in a double-quoted string`, line);
      }
    });
  }

  /** A quoted scalar that starts at `text` (first char is the quote); may run over lines. */
  function quoted(text, line) {
    const q = text[0];
    const closeAt = (s, from) => {
      for (let i = from; i < s.length; i++) {
        if (q === '"' && s[i] === "\\") { i++; continue; }
        if (s[i] === q) {
          if (q === "'" && s[i + 1] === "'") { i++; continue; }
          return i;
        }
      }
      return -1;
    };
    let body = "";
    let rest = text.slice(1);
    let end = closeAt(rest, 0);
    const pieces = [];
    let last = line;
    while (end === -1) {
      pieces.push(rest);
      if (pos >= lines.length) fail(`an unterminated ${q === '"' ? "double" : "single"}-quoted string`, line);
      last = lines[pos++];
      rest = last.raw.trim();
      end = closeAt(rest, 0);
    }
    pieces.push(rest.slice(0, end));
    const after = rest.slice(end + 1).trim();
    if (after !== "" && !after.startsWith("#")) fail(`text after a closing quote ("${after}")`, last);
    // Fold the line breaks the way YAML does: one break is a space, a blank line is a newline.
    pieces.forEach((piece, i) => {
      const p = i === 0 ? piece.replace(/\s+$/, "") : i === pieces.length - 1 ? piece.replace(/^\s+/, "") : piece.trim();
      if (i === 0) body = p;
      else if (p === "") body += "\n";
      else body += body.endsWith("\n") || body === "" ? p : ` ${p}`;
    });
    return q === '"' ? unescapeDouble(body, line) : body.replace(/''/g, "'");
  }

  function blockScalar(header, parentIndent, line) {
    const m = /^([|>])([+-]?)(\d?)\s*(#.*)?$/.exec(header);
    if (!m) fail(`a block scalar header I cannot read ("${header}")`, line);
    const [, style, chomp] = m;
    const body = [];
    let blockIndent = null;
    while (pos < lines.length) {
      const l = lines[pos];
      if (l.raw.trim() === "") { body.push(""); pos++; continue; }
      const ind = indentOf(l.raw);
      if (ind <= parentIndent) break;
      if (blockIndent === null) blockIndent = ind;
      if (ind < blockIndent) break;
      body.push(l.raw.slice(blockIndent));
      pos++;
    }
    while (body.length && body[body.length - 1] === "") body.pop();
    let text;
    if (style === "|") text = body.join("\n");
    else {
      text = "";
      body.forEach((b, i) => {
        if (i === 0) text = b;
        else if (b === "") text += "\n";
        else text += text.endsWith("\n") ? b : ` ${b}`;
      });
    }
    if (chomp === "-") return text;
    return text === "" ? "" : `${text}\n`;
  }

  function flowList(text, line) {
    if (!text.endsWith("]")) fail("a flow list must close on its own line", line);
    const inner = text.slice(1, -1).trim();
    if (inner === "") return [];
    const items = [];
    let cur = "";
    let quote = null;
    for (const ch of inner) {
      if (quote) {
        cur += ch;
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
        cur += ch;
      } else if (ch === ",") {
        items.push(cur.trim());
        cur = "";
      } else if (ch === "[" || ch === "{") {
        fail("nested flow collections are not supported", line);
      } else cur += ch;
    }
    items.push(cur.trim());
    return items.map((item) => (item.startsWith('"') || item.startsWith("'") ? quoted(item, line) : typed(item)));
  }

  /** The value written after "key:" (or "- ") on a line whose block indent is `indent`. */
  function valueAfter(rest, indent, line) {
    const text = rest.trim();
    if (text === "" || text.startsWith("#")) {
      skipBlank();
      if (pos >= lines.length) return null;
      const next = lines[pos];
      const ind = indentOf(next.raw);
      if (ind > indent) return node(ind);
      if (ind === indent && isSeqText(next.raw.slice(ind))) return seq(ind);
      return null;
    }
    if (text[0] === "|" || text[0] === ">") return blockScalar(text, indent, line);
    if (text[0] === '"' || text[0] === "'") return quoted(text, line);
    if (text[0] === "[") return flowList(text, line);
    if (text === "{}") return {};
    if (text[0] === "{") fail("flow mappings are not supported (write it as a block mapping)", line);
    if ("&*!%@`".includes(text[0])) fail(`"${text[0]}" (anchors, aliases, tags) is not supported`, line);
    let plain = text.replace(/\s+#.*$/, "");
    // A plain scalar may continue on more-indented lines.
    while (pos < lines.length && !isBlank(lines[pos]) && indentOf(lines[pos].raw) > indent) {
      const cont = lines[pos].raw.trim();
      if (/^[^\s#'"][^:#]*:(\s|$)/.test(cont) || isSeqText(cont)) break;
      plain += ` ${cont.replace(/\s+#.*$/, "")}`;
      pos++;
    }
    return typed(plain);
  }

  function map(indent) {
    const out = {};
    for (;;) {
      skipBlank();
      if (pos >= lines.length) break;
      const line = lines[pos];
      const ind = indentOf(line.raw);
      if (ind < indent) break;
      if (ind > indent) fail("unexpected indentation", line);
      const text = line.raw.slice(ind);
      if (isSeqText(text)) break;
      const m = /^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*'|[^\s#'"[\]{}][^:#]*?)\s*:(?:\s+(.*)|\s*)$/.exec(text);
      if (!m) fail(`expected "key: value" ("${text}")`, line);
      const key = m[1].startsWith('"') || m[1].startsWith("'") ? quoted(m[1], line) : m[1].trim();
      if (Object.prototype.hasOwnProperty.call(out, key)) fail(`the key "${key}" appears twice`, line);
      pos++;
      out[key] = valueAfter(m[2] ?? "", indent, line);
    }
    return out;
  }

  function seq(indent) {
    const out = [];
    for (;;) {
      skipBlank();
      if (pos >= lines.length) break;
      const line = lines[pos];
      const ind = indentOf(line.raw);
      if (ind < indent) break;
      if (ind > indent) fail("unexpected indentation in a list", line);
      const text = line.raw.slice(ind);
      if (!isSeqText(text)) break;
      const rest = text === "-" ? "" : text.slice(2);
      if (/^[^\s#'"[\]{}][^:#]*?\s*:(\s|$)/.test(rest.trim()) || /^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*')\s*:(\s|$)/.test(rest.trim())) {
        // "- key: value": the item is a mapping whose keys sit two spaces in.
        const itemIndent = ind + 2 + (rest.length - rest.trimStart().length);
        lines[pos] = { raw: " ".repeat(itemIndent) + rest.trimStart(), no: line.no };
        out.push(map(itemIndent));
      } else {
        pos++;
        out.push(valueAfter(rest, ind, line));
      }
    }
    return out;
  }

  function node(indent) {
    skipBlank();
    if (pos >= lines.length) return null;
    const text = lines[pos].raw.slice(indentOf(lines[pos].raw));
    return isSeqText(text) ? seq(indent) : map(indent);
  }

  skipBlank();
  if (pos >= lines.length) return {};
  const first = lines[pos];
  if (/^---\s*$/.test(first.raw) || /^\.\.\.\s*$/.test(first.raw)) fail("document markers are not supported here", first);
  const result = node(indentOf(first.raw));
  skipBlank();
  if (pos < lines.length) fail("text I could not read", lines[pos]);
  return result;
}

/** SKILL.md split into its frontmatter (parsed) and body. Throws when there is no frontmatter. */
export function splitFrontmatter(text, where = "SKILL.md") {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text);
  if (!m) throw new Error(`${where}: it must open with a frontmatter block between two "---" lines`);
  return { data: parseYaml(m[1], `${where} frontmatter`) ?? {}, raw: m[0], body: text.slice(m[0].length) };
}

/** Relative link targets in a Markdown text (code spans and fenced code are not links). */
export function markdownLinks(text) {
  const prose = text
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, "")
    .replace(/`[^`\n]*`/g, "");
  const targets = [];
  for (const m of prose.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+["'(][^)]*)?\)/g)) targets.push(m[1]);
  for (const m of prose.matchAll(/^\s{0,3}\[[^\]]+\]:\s*<?(\S+?)>?(?:\s|$)/gm)) targets.push(m[1]);
  return targets.filter((t) => !/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(t));
}

/* ── the checks ─────────────────────────────────────────────────────────────── */

const SKILL_FRONTMATTER_KEYS = ["name", "description", "license", "metadata"];
const OPENAI_TOP_KEYS = ["interface", "policy", "dependencies"];
const OPENAI_INTERFACE_KEYS = ["display_name", "short_description", "icon_small", "icon_large", "brand_color", "default_prompt"];
const OPENAI_POLICY_KEYS = ["products", "allow_implicit_invocation"];
const SKILL_TOP_ENTRIES = new Set(["SKILL.md", "agents", "references", "examples", "assets", "NOTICE.md"]);
const MCP_SERVER = { value: "creatorline", url: "https://api.creatorline.io/mcp", transport: "streamable_http" };
const TEXT_EXT = new Set([".md", ".markdown", ".txt", ".yaml", ".yml", ".json", ".mjs", ".js", ".cjs", ".ts", ".csv", ".svg", ".html", ".xml"]);
const isText = (file) => TEXT_EXT.has(path.extname(file).toLowerCase()) || /^(LICENSE|NOTICE|README|CONTRIBUTING)$/i.test(path.basename(file));

function walk(dir, { skipDirs = new Set() } = {}) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      out.push(...walk(full, { skipDirs }));
    } else out.push(full);
  }
  return out;
}

/** Check one skill folder. Pushes into errors/warnings; returns the description (or null). */
function checkSkill(name, root, errors, warnings) {
  const dir = path.join(root, "skills", name);
  const rel = (file) => path.relative(root, file);
  const err = (file, message) => errors.push(`${rel(file)}: ${message}`);
  const warn = (file, message) => warnings.push(`${rel(file)}: ${message}`);
  const skillFile = path.join(dir, "SKILL.md");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) err(dir, "a skill folder's name is lowercase letters and digits joined by single hyphens, at most 64 characters");
  if (/anthropic|claude/.test(name)) err(dir, 'a skill name may not contain "anthropic" or "claude"');
  if (`creatorline:${name}`.length > 64) err(dir, `"creatorline:${name}" is ${`creatorline:${name}`.length} characters; the plugin directory allows 64`);
  if (!existsSync(skillFile)) {
    err(dir, "no SKILL.md");
    return null;
  }

  // Everything in the folder: no symlinks, nothing hidden, only the known parts.
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) warn(path.join(dir, entry), "a hidden file; the packages leave it out (delete it)");
    else if (!SKILL_TOP_ENTRIES.has(entry)) warn(path.join(dir, entry), `not a part a skill folder has (${[...SKILL_TOP_ENTRIES].join(", ")}); scripts in particular hold a review`);
  }
  const files = [];
  for (const file of walk(dir)) {
    if (lstatSync(file).isSymbolicLink()) err(file, "a symlink; the packages refuse or drop them, so copy the file instead");
    else files.push(file);
  }
  for (const file of files) {
    const size = statSync(file).size;
    if (size > 5 * 1024 * 1024) err(file, "over 5 MiB");
    else if (size > 256 * 1024 && isText(file)) warn(file, "over 256 KiB; a reviewer looks at every text file this large");
  }

  // Frontmatter.
  const text = readFileSync(skillFile, "utf8");
  let fm;
  try {
    fm = splitFrontmatter(text, rel(skillFile));
  } catch (error) {
    errors.push(error.message);
    return null;
  }
  const data = fm.data && typeof fm.data === "object" && !Array.isArray(fm.data) ? fm.data : {};
  const keys = Object.keys(data);
  const extra = keys.filter((k) => !SKILL_FRONTMATTER_KEYS.includes(k));
  const missing = SKILL_FRONTMATTER_KEYS.filter((k) => !keys.includes(k));
  if (extra.length) err(skillFile, `frontmatter keys are exactly ${SKILL_FRONTMATTER_KEYS.join(", ")}; remove ${extra.join(", ")}`);
  if (missing.length) err(skillFile, `frontmatter is missing ${missing.join(", ")}`);
  if (data.name !== name) err(skillFile, `frontmatter name "${data.name}" must equal the folder name "${name}"`);
  const description = typeof data.description === "string" ? data.description.trim() : null;
  if (description === null || description === "") err(skillFile, "description: a non-empty string");
  else {
    if (description.length > 1024) err(skillFile, `description: ${description.length} characters; at most 1024`);
    else if (description.length < 250 || description.length > 420) warn(skillFile, `description: ${description.length} characters; aim for 250 to 420`);
    if (/[\r\n]/.test(description)) err(skillFile, "description: one line (no line breaks)");
    if (/<\/?[a-z!][^>]*>/i.test(description)) err(skillFile, "description: no XML or HTML tags");
    const word = pricingWord(description);
    if (word) err(skillFile, `description: no word about price, cost, credits or plans ("${word}"); the plugin directory refuses a description that has one`);
  }
  if (data.license !== "MIT") err(skillFile, `license: MIT (is ${JSON.stringify(data.license)})`);
  const meta = data.metadata;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) err(skillFile, "metadata: a mapping with author and version");
  else {
    if (typeof meta.author !== "string" || meta.author.trim() === "") err(skillFile, "metadata.author: a string");
    else if (meta.author !== "creatorline") warn(skillFile, `metadata.author is "${meta.author}"; the others say "creatorline"`);
    if (typeof meta.version !== "string") err(skillFile, `metadata.version: a quoted string such as "2.0" (is ${JSON.stringify(meta.version)})`);
  }

  // Body.
  const lineCount = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  if (lineCount >= 500) err(skillFile, `${lineCount} lines; keep SKILL.md under 500 (move detail into references/)`);
  else if (lineCount > 400) warn(skillFile, `${lineCount} lines; aim for under 400`);
  if (fm.body.trim() === "") err(skillFile, "the body is empty");

  // agents/openai.yaml.
  const yamlFile = path.join(dir, "agents", "openai.yaml");
  if (!existsSync(yamlFile)) err(yamlFile, "missing; every skill has one (display name, short description, default prompt, policy, the MCP dependency)");
  else {
    let y;
    try {
      y = parseYaml(readFileSync(yamlFile, "utf8"), rel(yamlFile));
    } catch (error) {
      errors.push(error.message);
    }
    if (y !== undefined) checkOpenaiYaml(y, name, dir, yamlFile, err, warn);
  }
  const agentsDir = path.join(dir, "agents");
  if (existsSync(agentsDir)) {
    for (const f of readdirSync(agentsDir)) if (f !== "openai.yaml" && !f.startsWith(".")) warn(path.join(agentsDir, f), "only agents/openai.yaml is read");
  }

  // References: one level deep, a table of contents past 100 lines.
  const refs = path.join(dir, "references");
  if (existsSync(refs)) {
    for (const entry of readdirSync(refs, { withFileTypes: true })) {
      const full = path.join(refs, entry.name);
      if (entry.isDirectory()) warn(full, "references stay one level deep (no folders inside references/)");
      else if (entry.name.endsWith(".md")) {
        const lines = readFileSync(full, "utf8").split("\n");
        if (lines.length > 100) {
          const head = lines.slice(0, 40).join("\n");
          const hasToc = /^#{1,3}\s*(contents|table of contents|on this page|in this file)\b/im.test(head) || (head.match(/\]\(#[^)]+\)/g) ?? []).length >= 3;
          if (!hasToc) warn(full, `${lines.length} lines and no table of contents at the top (a "## Contents" list of its sections)`);
        }
      }
    }
  }

  // Examples parse.
  const examples = path.join(dir, "examples");
  if (existsSync(examples)) {
    for (const f of readdirSync(examples).filter((x) => x.endsWith(".json"))) {
      try {
        JSON.parse(readFileSync(path.join(examples, f), "utf8"));
      } catch (error) {
        err(path.join(examples, f), `not valid JSON: ${error.message}`);
      }
    }
  }

  // A NOTICE.md credits adapted MIT material in full.
  const notice = path.join(dir, "NOTICE.md");
  if (existsSync(notice)) {
    const n = readFileSync(notice, "utf8");
    if (!/\bMIT\b/.test(n) || !/Copyright \(c\) \d{4} \S/.test(n) || !/Permission is hereby granted/.test(n)) {
      err(notice, 'a NOTICE.md names the source, its "Copyright (c) <year> <holder>" line and the full MIT permission text');
    }
  }

  // Links, em dashes and vendor names, file by file.
  for (const file of files) {
    if (!isText(file)) continue;
    const body = readFileSync(file, "utf8");
    if (body.includes(EM_DASH)) err(file, `an em dash on line ${body.slice(0, body.indexOf(EM_DASH)).split("\n").length}; use a colon, a comma or two sentences`);
    if (!isNoticeFile(file)) {
      const vendor = vendorName(body);
      if (vendor) err(file, `names "${vendor}"; no other vendor's or product's name in a skill (only NOTICE.md may credit a source)`);
    }
    if (!/\.(md|markdown)$/i.test(file)) continue;
    for (const target of markdownLinks(body)) {
      let clean = target.split("#")[0].split("?")[0];
      try {
        clean = decodeURIComponent(clean);
      } catch {
        /* keep as written */
      }
      if (clean === "") continue;
      if (clean.startsWith("/")) {
        err(file, `link "${target}": an absolute path; link relative to the file, inside the skill folder`);
        continue;
      }
      if (clean.split(/[\\/]/).includes("..")) {
        err(file, `link "${target}": no "../" links; every skill folder stands alone (copy a shared file in with scripts/sync-shared.mjs)`);
        continue;
      }
      const resolved = path.resolve(path.dirname(file), clean);
      if (!resolved.startsWith(dir + path.sep)) err(file, `link "${target}" leaves the skill folder`);
      else if (!existsSync(resolved)) err(file, `link "${target}" points at a file that does not exist`);
    }
  }
  return description;
}

function checkOpenaiYaml(y, name, dir, file, err, warn) {
  if (!y || typeof y !== "object" || Array.isArray(y)) {
    err(file, "must be a mapping with interface, policy and dependencies");
    return;
  }
  const unknown = Object.keys(y).filter((k) => !OPENAI_TOP_KEYS.includes(k));
  if (unknown.length) err(file, `only ${OPENAI_TOP_KEYS.join(", ")} are read; remove ${unknown.join(", ")}`);
  const ui = y.interface;
  if (!ui || typeof ui !== "object" || Array.isArray(ui)) err(file, "interface is required");
  else {
    const extraUi = Object.keys(ui).filter((k) => !OPENAI_INTERFACE_KEYS.includes(k));
    if (extraUi.length) err(file, `interface takes ${OPENAI_INTERFACE_KEYS.join(", ")}; remove ${extraUi.join(", ")}`);
    const str = (v) => typeof v === "string" && v.trim() !== "";
    if (!str(ui.display_name)) err(file, "interface.display_name: a non-empty string");
    else if (ui.display_name.length > 40) warn(file, `interface.display_name is ${ui.display_name.length} characters; keep it short (a title of two to four words)`);
    if (!str(ui.short_description)) err(file, "interface.short_description: a non-empty string");
    else if (ui.short_description.length > 50) err(file, `interface.short_description: at most 50 characters (is ${ui.short_description.length})`);
    if (!str(ui.default_prompt)) err(file, `interface.default_prompt: a starter sentence that names the skill, "Use $${name} to ..."`);
    else if (!ui.default_prompt.includes(`$${name}`)) err(file, `interface.default_prompt must name the skill as $${name}`);
    for (const icon of ["icon_small", "icon_large"]) {
      if (ui[icon] === undefined) continue;
      if (!str(ui[icon]) || ui[icon].split(/[\\/]/).includes("..") || ui[icon].startsWith("/")) err(file, `interface.${icon}: a relative path inside the skill folder`);
      else if (!existsSync(path.join(dir, ui[icon]))) err(file, `interface.${icon}: ${ui[icon]} does not exist`);
    }
    if (ui.brand_color !== undefined && !/^#[0-9a-fA-F]{6}$/.test(String(ui.brand_color))) err(file, "interface.brand_color: a six-digit hex colour such as #346AEA");
  }
  if (y.policy !== undefined) {
    const p = y.policy;
    if (!p || typeof p !== "object" || Array.isArray(p)) err(file, "policy: a mapping");
    else {
      const extraP = Object.keys(p).filter((k) => !OPENAI_POLICY_KEYS.includes(k));
      if (extraP.length) err(file, `policy may contain only ${OPENAI_POLICY_KEYS.join(" and ")}; remove ${extraP.join(", ")}`);
      if (p.allow_implicit_invocation === undefined) warn(file, "policy.allow_implicit_invocation is not set (it defaults to true)");
      else if (typeof p.allow_implicit_invocation !== "boolean") err(file, "policy.allow_implicit_invocation: true or false");
      if (p.products !== undefined) {
        const list = [p.products].flat();
        if (list.length === 0 || !list.every((v) => v === "CHAT" || v === "CODEX")) err(file, "policy.products: CHAT, CODEX or both");
      }
    }
  } else warn(file, "no policy; add policy.allow_implicit_invocation: true");
  if (y.dependencies === undefined) err(file, "dependencies.tools must name the Creatorline MCP server");
  else {
    const d = y.dependencies;
    if (!d || typeof d !== "object" || Array.isArray(d) || Object.keys(d).some((k) => k !== "tools")) err(file, "dependencies: a mapping with only tools");
    const tools = d?.tools;
    if (!Array.isArray(tools) || tools.length === 0) err(file, "dependencies.tools: a list with the Creatorline MCP server");
    else {
      for (const [i, t] of tools.entries()) {
        const at = `dependencies.tools[${i}]`;
        if (!t || typeof t !== "object") {
          err(file, `${at}: a mapping`);
          continue;
        }
        const extraT = Object.keys(t).filter((k) => !["type", "value", "description", "transport", "url"].includes(k));
        if (extraT.length) err(file, `${at}: unknown keys ${extraT.join(", ")}`);
        if (t.type !== "mcp") err(file, `${at}.type: mcp`);
        if (t.value !== MCP_SERVER.value) err(file, `${at}.value: ${MCP_SERVER.value} (the server's name in mcp.json)`);
        if (t.transport !== MCP_SERVER.transport) err(file, `${at}.transport: ${MCP_SERVER.transport}`);
        if (t.url !== MCP_SERVER.url) err(file, `${at}.url: ${MCP_SERVER.url}`);
        if (typeof t.description !== "string" || t.description.trim() === "") err(file, `${at}.description: a short label such as "Creatorline MCP server"`);
      }
    }
  }
}

/** The plugin manifests and the repository's own files. */
function checkPackage(root, { only }, errors, warnings) {
  const rel = (file) => path.relative(root, file);
  const readJson = (file) => {
    const full = path.join(root, file);
    if (!existsSync(full)) {
      errors.push(`${file}: missing`);
      return null;
    }
    try {
      return JSON.parse(readFileSync(full, "utf8"));
    } catch (error) {
      errors.push(`${file}: not valid JSON (${error.message})`);
      return null;
    }
  };
  const semver = (v) => typeof v === "string" && /^\d+\.\d+\.\d+$/.test(v);
  const noPricing = (where, text) => {
    const word = pricingWord(text);
    if (word) errors.push(`${where}: no word about price, cost, credits or plans ("${word}")`);
  };

  const market = readJson(".claude-plugin/marketplace.json");
  const claude = readJson(".claude-plugin/plugin.json");
  const codex = readJson(".codex-plugin/plugin.json");
  const mcp = readJson(".mcp.json");
  const versions = new Map();
  if (market) {
    const plugins = market.plugins ?? [];
    if (plugins.length !== 1) errors.push(".claude-plugin/marketplace.json: exactly one plugin");
    const entry = plugins[0];
    if (entry) {
      if (entry.name !== "creatorline") errors.push('.claude-plugin/marketplace.json: the plugin is named "creatorline"');
      if (entry.source !== "./") errors.push('.claude-plugin/marketplace.json: the plugin\'s source is "./" (the repository root is the plugin)');
      if (entry.skills !== undefined) errors.push(".claude-plugin/marketplace.json: list no skills; the plugin loads every folder in skills/");
      if (entry.version !== undefined) versions.set("marketplace entry", entry.version);
      noPricing(".claude-plugin/marketplace.json plugin description", entry.description);
    }
    noPricing(".claude-plugin/marketplace.json description", market.description);
  }
  if (claude) {
    if (claude.name !== "creatorline") errors.push('.claude-plugin/plugin.json: name "creatorline"');
    if (!semver(claude.version)) errors.push(".claude-plugin/plugin.json: version, a semantic version");
    versions.set(".claude-plugin/plugin.json", claude.version);
    if (claude.license !== "MIT") errors.push(".claude-plugin/plugin.json: license MIT");
    noPricing(".claude-plugin/plugin.json description", claude.description);
  }
  if (codex) {
    if (codex.name !== "creatorline") errors.push('.codex-plugin/plugin.json: name "creatorline"');
    if (!semver(codex.version)) errors.push(".codex-plugin/plugin.json: version, a semantic version");
    versions.set(".codex-plugin/plugin.json", codex.version);
    if (codex.skills !== "./skills/") errors.push('.codex-plugin/plugin.json: skills "./skills/"');
    noPricing(".codex-plugin/plugin.json description", codex.description);
    for (const field of ["shortDescription", "longDescription"]) noPricing(`.codex-plugin/plugin.json interface.${field}`, codex.interface?.[field]);
    if (codex.interface?.shortDescription && codex.interface.shortDescription.length > 30) errors.push(".codex-plugin/plugin.json: interface.shortDescription at most 30 characters");
    const onboarding = codex.extensions?.["com.openai"]?.onboardingSkill;
    const m = /^\.\/skills\/([a-z0-9-]+)\/SKILL\.md$/.exec(onboarding ?? "");
    if (!m) errors.push('.codex-plugin/plugin.json: extensions["com.openai"].onboardingSkill is "./skills/<name>/SKILL.md"');
    else if (!existsSync(path.join(root, onboarding))) {
      const message = `.codex-plugin/plugin.json: the onboarding skill ${onboarding} does not exist`;
      if (only && !only.includes(m[1])) warnings.push(`${message} (not in --only)`);
      else errors.push(message);
    }
  }
  if (new Set(versions.values()).size > 1) {
    errors.push(`the version differs between ${[...versions].map(([k, v]) => `${k} (${v})`).join(", ")}; keep them equal`);
  }
  if (mcp) {
    const server = mcp.mcpServers?.creatorline;
    if (!server || server.url !== MCP_SERVER.url) errors.push(`.mcp.json: one server, "creatorline", at ${MCP_SERVER.url}`);
    if (server?.headers) errors.push(".mcp.json: no headers (a key never ships in the package)");
  }

  const readme = path.join(root, "README.md");
  if (!existsSync(readme)) errors.push("README.md: missing");
  else {
    const words = readFileSync(readme, "utf8").replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
    if (words < 40) errors.push("README.md: at least 40 words outside code blocks");
  }
  const license = path.join(root, "LICENSE");
  if (!existsSync(license) || !/MIT License/.test(readFileSync(license, "utf8"))) errors.push("LICENSE: the MIT license");
  if (!existsSync(path.join(root, "NOTICE.md"))) errors.push("NOTICE.md: missing (it credits the MIT material the skills adapt)");
  if (existsSync(path.join(root, "bin"))) errors.push("bin/: a plugin with a top-level bin/ is not installed by claude.ai");

  // Every text file outside the skills: no em dash, no vendor name (NOTICE.md and LICENSE excepted).
  const own = walk(root, { skipDirs: new Set([".git", "node_modules", "skills", "dist"]) });
  for (const file of own) {
    if (!isText(file)) continue;
    if (lstatSync(file).isSymbolicLink()) {
      errors.push(`${rel(file)}: a symlink`);
      continue;
    }
    const body = readFileSync(file, "utf8");
    if (body.includes(EM_DASH)) errors.push(`${rel(file)}: an em dash on line ${body.slice(0, body.indexOf(EM_DASH)).split("\n").length}`);
    if (!isNoticeFile(file)) {
      const vendor = vendorName(body);
      if (vendor) errors.push(`${rel(file)}: names "${vendor}" (only NOTICE.md may)`);
    }
  }

  // The skills/ folder itself: folders only, none hidden.
  const skillsDir = path.join(root, "skills");
  if (existsSync(skillsDir)) {
    for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue;
      if (entry.isDirectory() && entry.name.startsWith(".")) errors.push(`skills/${entry.name}: a hidden skill folder (the packages refuse it)`);
      else if (!entry.isDirectory()) warnings.push(`skills/${entry.name}: a file directly in skills/ is ignored; skills are folders`);
    }
  }
}

/** Run every check. Returns { errors, warnings, skills, descriptionChars }. */
export function runChecks({ only = null, root = ROOT } = {}) {
  const errors = [];
  const warnings = [];
  const all = skillFolders(root);
  if (only) {
    for (const name of only) if (!all.includes(name)) errors.push(`--only names ${name}, which has no folder in skills/`);
  }
  const names = only ? all.filter((n) => only.includes(n)) : all;
  if (names.length === 0) errors.push("no skills to check (skills/<name>/SKILL.md)");

  checkPackage(root, { only }, errors, warnings);

  const descriptions = [];
  const seen = new Set();
  for (const name of names) {
    const description = checkSkill(name, root, errors, warnings);
    if (description) descriptions.push(description);
    if (seen.has(name)) errors.push(`skills/${name}: the name is used twice`);
    seen.add(name);
  }
  const descriptionChars = descriptions.reduce((n, d) => n + d.length, 0);
  if (descriptionChars > 8000) {
    warnings.push(`all descriptions together are ${descriptionChars} characters; Codex lists at most about 8000 before it shortens or drops some`);
  }

  const sync = syncShared({ check: true, only, root });
  errors.push(...sync.errors);
  warnings.push(...sync.warnings);
  return { errors, warnings, skills: names, descriptionChars, sharedCopies: sync.checked };
}

function main() {
  const args = process.argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith("--only="))?.slice("--only=".length) ?? (args.includes("--only") ? args[args.indexOf("--only") + 1] : null);
  const only = onlyArg ? onlyArg.split(",").map((s) => s.trim()).filter(Boolean) : null;
  const { errors, warnings, skills, descriptionChars, sharedCopies } = runChecks({ only });
  for (const w of warnings) console.warn(`warning: ${w}`);
  if (errors.length > 0) {
    console.error(`\nThe skills are not ready (${errors.length} problem${errors.length === 1 ? "" : "s"}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`skills: ${skills.length} checked (${skills.join(", ")}); descriptions ${descriptionChars} characters together; ${sharedCopies} shared copies in sync`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
