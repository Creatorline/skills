---
name: creatorline-workflows
description: Build, replicate, port and modify Creatorline workflows (AI influencer photo/video pipelines) through the Creatorline MCP server. Use when the user wants to recreate a pipeline from another tool (ComfyUI, n8n, Flora, Weavy, Higgsfield, Freepik Spaces, Krea, fal workflows, a screenshot or a written recipe) on Creatorline, wants a new reusable workflow with exact prompts, or wants an existing Creatorline workflow changed or run. Covers the graph grammar, the Enhance-off rule for finished prompts, the quality ladder per stage, cost checks and the porting playbook.
license: MIT
compatibility: Needs the Creatorline MCP server connected (https://api.creatorline.io/mcp) with a write-scope API key. Works in Claude Code, Cursor, Codex CLI, Windsurf and any MCP client.
metadata:
  author: creatorline
  version: "1.0"
---

# Creatorline workflows over MCP

A Creatorline workflow is a reusable pipeline the studio runs again and again: generation
steps (a stage + a model + a prompt + params) wired into each other, optionally ending in a
publish step that lands a post in the review queue. The MCP server exposes the same graph
the studio canvas edits, validated by the same rules. Your job is to turn what the user
already has (a pipeline elsewhere, a recipe, exact prompts) into a graph that runs on
Creatorline with no loss and the best possible output.

## Tools you will use

| Tool | Use it for |
| --- | --- |
| `get_workflow_catalog` | The vocabulary: stages, models, slots, params, prices. Pass `stage` to keep it small. |
| `list_accounts` | The creators (AI influencers). A workflow is bound to one. |
| `list_assets` / `list_models` / `list_voices` | Existing media to pin into slots; the generation catalog; voices for audio steps. |
| `validate_workflow` | Free. Every error at once, step order, real model per step, cost of one run. |
| `create_workflow` / `update_workflow` | Persist. `update_workflow` replaces the whole graph (pass `nodes` and `edges` together). |
| `list_workflows` / `get_workflow` | Read what exists. `get_workflow` returns the graph in the same shape you write. |
| `run_workflow` | `dry_run: true` first (free plan + cost), then the real run. |
| `get_workflow_run` | Poll every few seconds until `succeeded`, `failed` or `partial`. |

Setup, if the server is not connected yet:

```bash
claude mcp add --transport http creatorline https://api.creatorline.io/mcp \
  --header "Authorization: Bearer $CREATORLINE_API_KEY"
```

The key comes from Settings → API in the studio and must have the `write` scope to author
or run. A `read` key can still call the catalog, `validate_workflow` and dry runs.

## The loop

1. **Inventory the source.** List every node the user's pipeline has: generators, transforms,
   glue (routers, prompt builders, upscalers, format converters), inputs (fields the user
   changes per run) and outputs. Capture every prompt **character for character**.
2. **Read the vocabulary.** Call `get_workflow_catalog` for each stage you expect to need.
   Never guess a stage, model, slot key or param value; an unknown key is rejected.
3. **Map.** Use [references/porting-playbook.md](references/porting-playbook.md) to turn each
   source node into a Creatorline step, an input node, or a deliberate drop.
4. **Choose the path.** Apply the rules below and the ladder in
   [references/catalog.md](references/catalog.md).
5. **Validate.** `validate_workflow` until `ok: true`. Read every error; each names the node
   or edge and the fix.
6. **Persist.** `create_workflow` (or `update_workflow`) with the validated `nodes` and `edges`,
   a short `name`, and the creator's `account_id`.
7. **Price and run.** `run_workflow` with `dry_run: true`, tell the user the credit total, and
   run only after they agree. Poll `get_workflow_run`.
8. **Report.** A mapping table (source node → Creatorline step), what you dropped and why,
   the cost, and the studio link so they can open the canvas.

## Hard rules

**1. Finished prompts run verbatim. Never leave Enhance on for a prompt the user supplied.**
Every generation node has a compose-time switch `params.enhance` (default `true`, the AI
rewrites the idea into a full prompt, injects the creator's persona and applies a template).
When the user brings their own prompts, or you are replicating a pipeline whose prompts are
already final, set `params.enhance: false` on **every** generation node that has a prompt,
and pass the prompt exactly as given. Do not fix typos, do not translate, do not "improve".
The only time Enhance stays on is when the source pipeline itself had an LLM prompt-writer
step in front of the model; then drop that step and let Enhance do its job with the user's
idea as the prompt. Models that report `prompt.verbatim_supported: false` in the catalog
(Reshoot, motion control) own their text and take no `enhance` key.

**2. Always pick the most optimized, highest-quality path.** In order:
- Fewest steps that produce the asked result. Creatorline steps are composites: Scene video
  already splits, swaps and merges a long source; Hook + captions already transcribes, writes
  the hook and burns captions; the creator's avatar is added to the character slot
  automatically. Do not rebuild those by hand.
- The best model that meets the brief's hard constraints (duration, resolution, inputs it
  takes), from the ladder in [references/catalog.md](references/catalog.md). The stage default
  is the fast tier; step up to Seedance 2.5 / 2.0 for a hero clip, 1080p for a final deliverable,
  the Pro lipsync when the take has fast speech. Step down only when the user asked for cheap,
  fast, or a draft.
- No dead weight. Drop upscalers, format converters, resolution nodes, "prompt enhancers"
  (see rule 1), seed pickers, preview nodes and routing glue. Creatorline handles formats,
  normalization and sizing itself.
- Cost stays visible. Report the `validate_workflow` estimate and the dry-run total before
  anything runs.

**3. Never invent vocabulary.** Stage ids, model ids, slot keys, param keys and values come
from `get_workflow_catalog`. Read it before you write, and re-read a stage when validation
says a key is unknown.

**4. Bind media the way the runner binds it.**
- A step's output into another step: an edge. Handles default correctly (`sourceHandle` = the
  source stage's `output`, `targetHandle` = the first slot with that modality); set
  `targetHandle` explicitly when the model has several slots of one modality (Seedance
  reference: `characters`, `location`, `objects`).
- A fixed asset (a product shot, a source clip): `slotBindings: { slot: asset_id }`. Get ids from
  `list_assets` or upload through the API / CLI first.
- Something the user swaps between runs: a `text` node (`@name` in prompts) or an `image` node
  (a list of asset ids wired into one slot).
- The creator's face: nothing. The workflow's `account_id` adds their avatar to the
  `role: "character"` slot automatically. Set `dropCharacterAvatar: true` only on a step where
  the creator must not appear (a product-only shot).

**5. Verbatim + reference-to-video = tokens.** With `enhance: false` on a reference-to-video
model (`prompt.tokens_bind_inputs: true`), every media input reaches the model **only** through
its token in the prompt: `@Image1`, `@Image2`, `@Video1`, `@Audio1` in slot order, or `@step<n>`
for a wired upstream step (the runner rewrites it to the positional token). An input the
prompt never names is silently ignored. Photo-to-video models wire frames directly and need no
tokens. See [references/graph-grammar.md](references/graph-grammar.md) for the numbering.

**6. Publish never publishes.** A publish node lands the post in the review queue as
`pending_review`; a human approves it in the studio. Say so. Never promise a workflow will post.

**7. Preserve the user's structure.** Keep their node names as `title`, keep their order, keep
their variables as `text` nodes. Use short stable ids (`n1`, `n2`, ..., or the source's own
names in `[A-Za-z0-9_-]`). When editing an existing workflow, `get_workflow` first and send the
full graph back with only the intended changes; ids that survive keep their canvas positions.

## Minimal graph

```json
{
  "name": "Matcha product ad",
  "account_id": "<creator id from list_accounts>",
  "nodes": [
    { "id": "topic", "kind": "text", "name": "topic", "values": ["matcha latte", "cold brew"] },
    { "id": "product", "kind": "image", "values": ["<asset id of the product shot>"] },
    {
      "id": "clip", "kind": "generation", "stageId": "video-ref",
      "modelId": "bytedance-seedance-2-5-reference-to-video",
      "prompt": "@Image1 holds @Image2 up to the camera and talks about the @topic for 10 seconds, phone-shot, natural light.",
      "params": { "enhance": false, "duration": 10, "resolution": "1080p", "aspect_ratio": "9:16" }
    },
    { "id": "post", "kind": "publish", "prompt": "morning ritual ☕️ #ugc", "publishChannels": ["TikTok"], "postSettings": { "videoMadeWithAi": true } }
  ],
  "edges": [
    { "source": "product", "target": "clip", "targetHandle": "objects" },
    { "source": "clip", "target": "post" }
  ]
}
```

`@Image1` is the creator's avatar (auto-added to `characters`), `@Image2` the product wired into
`objects`. More examples, each validated by the repo's tests, live in [examples/](examples/).

## What cannot be replicated today (say it, do not fake it)

- **Audio never publishes.** `text-to-speech` and `dialogue` emit `audio`; wire them into
  `lipsync` (`audio_url`) or `add-audio` (`audio_url`), never into a publish node. A post needs
  a picture or a clip.
- **Short clip** (one long source into many clips) is a workshop tool, not a workflow step:
  a step has exactly one output. Point the user to `create_generation` with `tool: "short-clip"`.
- **Fetch-a-post-by-URL** nodes are canvas-only. Upload the video (API `POST /v1/uploads`, or
  `crl upload`) and bind the asset id.
- **Carousels** (`album-post`, slides) are their own surface, not a workflow stage.
- **Branching, loops, conditionals, retries.** A graph is a DAG that runs once per kickoff.
  Turn a loop over N values into a `text` node with N values (one run each), and a branch into
  two workflows.
- **Image lists** are asset ids only; an `image` node cannot hold a URL. Upload first.

## Reference files

- [references/graph-grammar.md](references/graph-grammar.md): node and edge shapes, handles,
  tokens, publish fields, schedule.
- [references/catalog.md](references/catalog.md): every stage with its models, slots, key params,
  prices and the quality ladder. A snapshot; `get_workflow_catalog` is the live truth.
- [references/porting-playbook.md](references/porting-playbook.md): source-tool node → Creatorline
  step mappings and the collapse rules.
- [examples/](examples/): complete graphs to copy from.
