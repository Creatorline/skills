# Contributing

This repository is one plugin, `creatorline`, for three channels at once: Claude (the
marketplace in `.claude-plugin/`), Codex (`.codex-plugin/`) and the skills CLI
(`npx skills add Creatorline/skills`). The Creatorline team also builds the ChatGPT plugin
directory package from these same folders, so a skill is written once.

Before you open a pull request:

```bash
node scripts/sync-shared.mjs    # copy shared/ into the skills that use it
node scripts/check.mjs          # every rule below that a script can hold
```

Both need Node 18 or later and nothing else.

## Layout

```text
.claude-plugin/marketplace.json   the marketplace: one plugin, "creatorline", source "./"
.claude-plugin/plugin.json        the plugin for Claude
.codex-plugin/plugin.json         the plugin for Codex (skills, server, listing, onboarding skill)
.mcp.json                         the one MCP server, https://api.creatorline.io/mcp
shared/                           references several skills need (the source; see below)
shared/manifest.json              which skill gets which shared file
scripts/sync-shared.mjs           copies shared/*.md into skills/<name>/references/
scripts/check.mjs                 validates every skill and the manifests
evals/scenarios.md                routing and behavior cases
skills/<name>/SKILL.md            the skill
skills/<name>/agents/openai.yaml  how ChatGPT and Codex list it
skills/<name>/references/*.md     its own references, plus the shared copies
skills/<name>/examples/*.json     workflow graphs, validated against the live registry
skills/<name>/NOTICE.md           only when the skill adapts MIT material
docs/*.png                        README screenshots
```

**Every skill folder stands alone.** An install copies one folder and nothing beside it, so
a link never leaves the folder and never uses `../`. That is why shared references are copied
in rather than linked.

## Add a skill

1. **Name it.** `creatorline-<topic>`: lowercase letters and digits joined by single hyphens.
   Installs are flat with no namespace, so the prefix keeps our skills apart from others.
   `creatorline:<name>` must fit in 64 characters (the plugin directory's limit), which leaves
   52 for the name. The folder, the frontmatter `name` and the name everywhere else are equal.
2. **Make the folder:** `skills/<name>/SKILL.md` and `skills/<name>/agents/openai.yaml`.
3. **Give it the shared references** it needs: add its name to the right entries in
   `shared/manifest.json`, then run `node scripts/sync-shared.mjs`.
4. **Write it** (the rules below).
5. **Add its cases** to `evals/scenarios.md`: three or four prompts that must reach it, the
   first tool calls expected, and one near miss that must go to another skill.
6. **Run** `node scripts/check.mjs` until it passes.
7. **Raise the version** in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`
   and `.codex-plugin/plugin.json` together (the check refuses them out of step), and the
   skill's `metadata.version`.

### SKILL.md frontmatter

Exactly these four keys, nothing else (claude.ai refuses an upload with any other key):

```yaml
---
name: creatorline-talking-video
description: "Makes ... Use when ... Not for ...: use creatorline-..."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---
```

Quote `version`, or YAML reads `2.0` as a number.

**The description decides when the skill runs.** Write it in the third person, 250 to 420
characters (1024 at most), on one line:

- what it produces;
- the words people use when they want it ("UGC review", "unboxing", "fit check");
- the main exclusions, each with the sibling skill to use instead ("Not for X: use
  creatorline-y").

It carries **no word about price, cost, credits, plans, subscriptions, upgrades, paid,
balance or spending**. The plugin directory's metadata check refuses a description with one,
even as a plain fact. A sibling skill's name (`creatorline-content-calendar`) is fine. No XML or
HTML, no em dash, and no other product's or vendor's name.

### agents/openai.yaml

ChatGPT and Codex read it to list the skill. These are the fields they validate; nothing
else may be in the file:

```yaml
interface:
  display_name: "UGC Talking Video"
  short_description: "Your avatar talks to camera"
  default_prompt: "Use $creatorline-talking-video to make a talking video of my avatar about this product."
policy:
  allow_implicit_invocation: true
dependencies:
  tools:
    - type: mcp
      value: creatorline
      description: "Creatorline MCP server"
      transport: streamable_http
      url: https://api.creatorline.io/mcp
```

| Field | Rule |
| --- | --- |
| `interface.display_name` | Required. A title of two to four words, as the person would name the format. |
| `interface.short_description` | Required. One line, at most 50 characters (our limit; OpenAI sets none). |
| `interface.default_prompt` | Required by us. One string that starts "Use $<name> to ...": the `$` mention is how a person calls the skill by name. |
| `interface.icon_small`, `icon_large` | Optional. A relative path to a file inside the skill folder. |
| `interface.brand_color` | Optional. Six-digit hex, such as `#7777F2`. |
| `policy.allow_implicit_invocation` | `true` or `false` (default `true`). `false` means the skill runs only when called by name. |
| `policy.products` | Optional. A list of `CHAT`, `CODEX` or both. Leave it out to offer the skill in both. |
| `dependencies.tools` | The only key `dependencies` takes. One entry: type `mcp`, value `creatorline` (the server's name in `.mcp.json`), transport `streamable_http`, the server's URL. |

### SKILL.md body

Under 400 lines (500 is the hard limit), English, imperative, written to the agent. Name
the tools bare in backticks (`create_generation`), with their params and values exactly as the
server has them: never invent a tool, a param, a slug or a value. The shape that works:

1. One paragraph: what this produces and the promise to the person.
2. `## When to use` and `## Not for` (each exclusion names the sibling skill).
3. `## What you need`: what must be asked (it changes the result) and what is a stated default.
4. `## The flow`: numbered steps with the exact tool calls.
5. `## Craft`: the format's know-how (beats, hooks, timing).
6. `## Check before you show it` and `## If it goes wrong` (failure, then fix).
7. `## Show the result` and `## Next steps to offer`.
8. `## References`: links to its own `references/*.md` and the shared copies.

Detail that is needed only some of the time goes into `references/`, one level deep (no
folders inside `references/`). A reference file over 100 lines opens with a `## Contents` list
of its sections.

### How every skill behaves

The shared `house-rules.md` writes this out once; a skill links to it and does not restate it.

- **Orient once per conversation:** the brand (`list_brands`; ask which when there are
  several, by name), its default avatar, an avatar the person names.
- **Ask once, only what changes the result**, with options and a recommended one. State the
  defaults in one line.
- **Price before spend.** Call the spending tool without `confirm` (or
  `estimate_generation_cost`) to get the price, tell the person the credits and their balance,
  and start only on a yes. A batch is priced as a whole before any of it starts.
- **Wait and narrate:** `get_generation` with `wait_seconds`, one short line between polls.
- **Show** the result with readable links (the media and the page in Creatorline) and what it
  used, then offer two or three next steps.
- **Post only on an explicit yes** that names the post, the accounts and the time.
  `create_post` puts it in the review queue; `publish_post` is public and cannot be undone.
- Names, never ids. The person's language. Vertical 9:16 by default, filmed like a phone
  video; the cinematic look is opt in.

## Writing rules

- **Our own words.** Material from another project comes in only under a license that allows
  it. A skill that adapts MIT-licensed material carries a `NOTICE.md` with the source, its
  copyright line and the full MIT text, and the root `NOTICE.md` lists the source too.
- **No other vendor's or product's name** in any skill file. The check holds a list of names
  that must never appear (`VENDOR_PARTS` in `scripts/check.mjs`); a `NOTICE.md` is the only
  file that may credit a source by name. A model name (Seedance, Kling, Veo...) is fine where
  the agent must pick a model id, but the person is told what a choice does, not which model
  it is, unless they ask. The engine behind Character Swap is never named in any form.
- **No prices written down.** Say how to get the price (the tool's `needs_approval` answer or
  `estimate_generation_cost`). Relative guidance is fine ("1080p costs about 2.5 times 720p").
- **No em dashes** anywhere. Short sentences. Tables for choices, numbered lists for flows.
- **Never ask for or show an id, and never ask the person for a model name.**

## Shared references

`shared/*.md` is the one source of what several skills need (the house rules, how to ask,
how to brief a video, how to take a product in). To change one:

1. Edit the file in `shared/`, never a copy in `skills/<name>/references/`.
2. Run `node scripts/sync-shared.mjs`. It writes a byte-identical copy into every skill the
   manifest names.
3. Commit the source and the copies together.

`shared/manifest.json` maps each file to its skills:

```json
{
  "house-rules.md": "*",
  "asking.md": ["creatorline-talking-video", "creatorline-product-video"]
}
```

`"*"` means every skill. `node scripts/sync-shared.mjs --check` changes nothing and fails when
a copy is missing or differs; `scripts/check.mjs` runs it too.

## What scripts/check.mjs holds

| Rule | Why |
| --- | --- |
| Frontmatter keys exactly name, description, license, metadata | claude.ai refuses other keys; the ChatGPT package keeps only name and description. |
| `name` equals the folder, `creatorline:<name>` at most 64 characters | The plugin directory's identity limit. |
| Description 1 to 1024 characters, warned outside 250 to 420; no XML | Agent Skills limit; the shorter range routes best. |
| No pricing words in a description | The directory's metadata check. |
| No em dash; no forbidden vendor name (NOTICE.md and LICENSE excepted) | House style; the directory's "no other product" rule. |
| `agents/openai.yaml` present, known keys only, the MCP dependency correct | What ChatGPT and Codex validate. |
| Every relative link resolves inside its own skill folder, no `../` | Each install copies one folder. |
| SKILL.md under 500 lines (warned over 400) | Skills load whole; detail goes to references. |
| References one level deep, a table of contents past 100 lines | Agents read the head of a long file first. |
| All descriptions together (warned over 8000 characters) | Codex's listing budget; past it, skills get shortened or dropped. |
| Shared copies byte-identical to `shared/` | One source. |
| Manifests: one plugin, equal versions, an onboarding skill that exists | The three channels stay in step. |

`node scripts/check.mjs --only creatorline,creatorline-reshoot` checks a few skills while
others are still being written.

## Evals

`evals/scenarios.md` lists, per skill, the prompts that must reach it, the first tool calls
expected and a near miss that must route elsewhere. Run them by hand in a fresh session with
the plugin installed, in English and in Turkish, before a release. A change to a description
is a change to routing: run the cases of that skill and of its neighbours.
