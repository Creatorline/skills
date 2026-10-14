#!/usr/bin/env node
/**
 * scripts/sync-shared.mjs: copy the shared references into the skills that use them.
 *
 *   node scripts/sync-shared.mjs            write the copies
 *   node scripts/sync-shared.mjs --check    change nothing; fail if a copy is missing or differs
 *
 * `shared/*.md` is the ONE source of the references several skills need (the house rules,
 * how to ask, ...). Every skill folder must stand alone (an install copies one folder and
 * nothing beside it, and a skill may never link with `../`), so each skill that uses a
 * shared file gets its own byte-identical copy at `skills/<name>/references/<file>`.
 * Edit the file in `shared/`, run this script, commit both. Never edit a copy.
 *
 * `shared/manifest.json` says which skill gets which file. Accepted shapes:
 *
 *   { "house-rules.md": "*", "asking.md": ["creatorline-talking-video", "..."] }
 *   { "files": { ...the same map... } }
 *   { "house-rules.md": { "skills": ["..."] } }
 *   [ { "file": "asking.md", "skills": ["..."] } ]
 *
 * "*" or "all" (alone or inside the list) means every skill folder. Keys that start with
 * "$" or "_" are comments.
 *
 * No dependencies: Node 18 or later.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Every skill folder: an immediate, non-hidden child of skills/ (with or without SKILL.md yet). */
export function skillFolders(root = ROOT) {
  const dir = path.join(root, "skills");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();
}

/** The manifest as a list of { file, skills } with "*" expanded. Throws on a shape it cannot read. */
export function readManifest(root = ROOT) {
  const file = path.join(root, "shared", "manifest.json");
  if (!existsSync(file)) return { entries: [], missing: true };
  let raw;
  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`shared/manifest.json is not valid JSON: ${error.message}`);
  }
  const all = skillFolders(root);
  const expand = (list, where) => {
    const names = [list].flat();
    if (!names.every((n) => typeof n === "string")) {
      throw new Error(`shared/manifest.json: ${where} must be a skill name, a list of skill names, or "*"`);
    }
    return names.some((n) => n === "*" || n === "all") ? all : names;
  };
  const entries = [];
  const add = (shared, target, where) => {
    const skills = typeof target === "object" && target !== null && !Array.isArray(target) ? target.skills ?? target.to : target;
    if (skills === undefined) throw new Error(`shared/manifest.json: ${where} names no skills`);
    entries.push({ file: shared, skills: [...new Set(expand(skills, where))] });
  };
  if (Array.isArray(raw)) {
    raw.forEach((row, i) => {
      if (typeof row?.file !== "string") throw new Error(`shared/manifest.json: entry ${i + 1} has no "file"`);
      add(row.file, row.skills ?? row.to, `entry ${i + 1} (${row.file})`);
    });
  } else if (raw && typeof raw === "object") {
    const map = raw.files && typeof raw.files === "object" && !Array.isArray(raw.files) ? raw.files : raw;
    for (const [key, value] of Object.entries(map)) {
      if (key.startsWith("$") || key.startsWith("_")) continue;
      if (map === raw && key === "files") continue;
      add(key, value, `"${key}"`);
    }
  } else {
    throw new Error("shared/manifest.json must be an object or a list");
  }
  for (const { file } of entries) {
    if (file !== path.basename(file) || !file.endsWith(".md")) {
      throw new Error(`shared/manifest.json: "${file}" must be the name of a .md file directly in shared/`);
    }
  }
  return { entries, missing: false };
}

/**
 * Write (or, with check, compare) every copy the manifest asks for.
 * Returns { errors, warnings, written, checked }; never throws for a content problem.
 */
export function syncShared({ check = false, only = null, root = ROOT } = {}) {
  const errors = [];
  const warnings = [];
  const written = [];
  let checked = 0;

  let manifest;
  try {
    manifest = readManifest(root);
  } catch (error) {
    return { errors: [error.message], warnings, written, checked };
  }
  if (manifest.missing) {
    const sharedDir = path.join(root, "shared");
    const loose = existsSync(sharedDir) ? readdirSync(sharedDir).filter((f) => f.endsWith(".md")) : [];
    if (loose.length > 0) errors.push(`shared/ has ${loose.join(", ")} but no manifest.json saying which skills get them`);
    return { errors, warnings, written, checked };
  }

  const existing = new Set(skillFolders(root));
  const wanted = new Map(); // skill -> Set(file)
  const absent = new Map(); // skill named in the manifest with no folder -> its files
  for (const { file, skills } of manifest.entries) {
    const source = path.join(root, "shared", file);
    if (!existsSync(source)) {
      errors.push(`shared/manifest.json names shared/${file}, which does not exist`);
      continue;
    }
    const bytes = readFileSync(source);
    for (const skill of skills) {
      if (only && !only.includes(skill)) continue;
      if (!wanted.has(skill)) wanted.set(skill, new Set());
      wanted.get(skill).add(file);
      if (!existing.has(skill)) {
        if (!absent.has(skill)) absent.set(skill, []);
        absent.get(skill).push(file);
        continue;
      }
      const copy = path.join(root, "skills", skill, "references", file);
      const rel = path.relative(root, copy);
      checked++;
      const same = existsSync(copy) && statSync(copy).isFile() && Buffer.compare(readFileSync(copy), bytes) === 0;
      if (same) continue;
      if (check) {
        errors.push(
          existsSync(copy)
            ? `${rel} differs from shared/${file}: edit shared/${file}, never the copy, then run node scripts/sync-shared.mjs`
            : `${rel} is missing: run node scripts/sync-shared.mjs`,
        );
      } else {
        mkdirSync(path.dirname(copy), { recursive: true });
        writeFileSync(copy, bytes);
        written.push(rel);
      }
    }
  }

  for (const [skill, files] of absent) {
    const message = `skills/${skill}/ does not exist, but shared/manifest.json gives it ${files.join(", ")}`;
    if (check) errors.push(message);
    else warnings.push(`${message} (skipped; run again once the folder exists)`);
  }

  // A copy of a shared file that the manifest no longer gives to that skill is stale.
  const sharedNames = new Set(manifest.entries.map((e) => e.file));
  for (const skill of existing) {
    if (only && !only.includes(skill)) continue;
    const refs = path.join(root, "skills", skill, "references");
    if (!existsSync(refs)) continue;
    for (const file of readdirSync(refs)) {
      if (sharedNames.has(file) && !wanted.get(skill)?.has(file)) {
        warnings.push(`skills/${skill}/references/${file} is a copy of shared/${file}, but shared/manifest.json does not give it to ${skill}: add it to the manifest or delete the copy`);
      }
    }
  }
  return { errors, warnings, written, checked };
}

function main() {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const onlyArg = args.find((a) => a.startsWith("--only="))?.slice("--only=".length) ?? (args.includes("--only") ? args[args.indexOf("--only") + 1] : null);
  const only = onlyArg ? onlyArg.split(",").map((s) => s.trim()).filter(Boolean) : null;
  const { errors, warnings, written, checked } = syncShared({ check, only });
  for (const w of warnings) console.warn(`warning: ${w}`);
  if (errors.length > 0) {
    console.error(`Shared references are not in sync (${errors.length}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
    process.exit(1);
  }
  if (check) console.log(`shared references: ${checked} copies in sync`);
  else console.log(written.length > 0 ? `shared references: wrote ${written.length}\n${written.map((w) => `  ${w}`).join("\n")}` : `shared references: ${checked} copies already in sync`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
