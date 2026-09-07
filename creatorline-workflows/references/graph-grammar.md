# Graph grammar

The exact shapes `create_workflow`, `update_workflow` and `validate_workflow` take and
`get_workflow` returns. Unknown keys are rejected (the schemas are strict), so a typo
surfaces instead of silently doing nothing.

## Node

```jsonc
{
  "id": "n1",                 // required. [A-Za-z0-9_-]+, unique in the graph
  "kind": "generation",       // generation | publish | text | image
  "title": "Hero clip",       // optional card name on the canvas; display only

  // generation
  "stageId": "video-ref",     // a stage id from get_workflow_catalog
  "modelId": "bytedance-seedance-2-5-reference-to-video", // optional; omitted = stage default
  "prompt": "…",              // the prompt (caption on a publish node)
  "params": { "enhance": false, "duration": 10, "resolution": "1080p", "aspect_ratio": "9:16" },
  "slotBindings": { "objects": "<asset id>" },  // slot key -> ONE asset id pinned into it
  "dropCharacterAvatar": true, // keep the creator out of this step
  "reviewScript": true,        // park the run for a human to approve the composed script

  // publish
  "publishFormat": "video",    // auto | video | photo | carousel
  "publishChannels": ["TikTok"], // subset of the creator's connected channels; omit = all
  "postSettings": { "videoMadeWithAi": true, "autoAddMusic": false, "draft": false, "physicalDevice": false },
  "platformSettings": { "YouTube": { "title": "…", "visibility": "unlisted" } },

  // text
  "name": "topic",             // the variable; prompts write @topic
  "values": ["matcha latte", "cold brew"],
  "activeIndex": 0,            // which value this run uses

  // image
  "values": ["<asset id>", "<asset id>"], // the list to switch between
  "activeIndex": 0
}
```

Rules the validator enforces:

- `text` and `image` nodes are **inputs**. They never run, never cost, take no incoming edge.
  A `text` node is never wired at all (a prompt reads it by name); an `image` node is wired
  outward into exactly the slot it feeds.
- A `text` node needs a `name` (letters, digits, `_`, `-`; not `step<n>`, that is reserved)
  and at least one non-blank value. Two text nodes cannot share a name.
- A `publish` node is terminal: no outgoing edge. `publishFormat: "video"` refuses image
  inputs; `photo` / `carousel` refuse video inputs; `auto` takes anything.
- A generation node's `modelId` must be one its `stageId` offers.
- The graph must be acyclic. A graph with only input nodes is empty and cannot run.
- A slot fed by an `image` node cannot also be fed by a step (the step output would replace
  the picked asset). Several image nodes into one slot merge in edge order.

## Edge

```jsonc
{ "source": "n1", "target": "n2", "sourceHandle": "image", "targetHandle": "image_url" }
```

- `sourceHandle` is the modality the source emits. Omit it: a generation node emits its
  stage's `output` (`image`, `video`, or `audio` for text-to-speech and dialogue), an
  `image` node emits `image`.
- `targetHandle` is the target model's slot **key**. Omit it to take the first slot whose
  modality matches, or the publish input. Set it when a model has several slots of one
  modality (`characters` / `location` / `objects` on Seedance reference; `image_url` /
  `end_image_url` on photo-to-video).
- Modalities must match: an `image` output cannot feed a `video` slot.
- Several edges into one array slot (`video_urls` on merge-clips, `objects` on Seedance)
  merge in the order the edges appear in `edges`. That order IS the merge order.

## Steps and tokens

- Every wired, runnable node gets a 1-based **step number** in run order (Kahn waves, then
  `nodes` order). `validate_workflow` returns them as `steps`. Inputs and unwired nodes have
  no number.
- `@step3` in a prompt names step 3's output. The runner rewrites it to the provider's
  positional token at kickoff, so write `@step3` and never guess `@Video2`.
- `@name` in a prompt or caption is replaced by the active value of the text node `name`.
- Positional tokens (`@Image1`, `@Video1`, `@Audio1`) number a step's inputs in **slot order**,
  one counter per modality, counting: the creator's avatar (prepended into the
  `role: "character"` slot unless `dropCharacterAvatar`), then static assets
  (`slotBindings` and baked `image` nodes), then wired steps. So on Seedance reference with
  a bound workflow and a product in `objects`: `@Image1` = the creator, `@Image2` = the product.
- With `enhance: true` the writer is handed the token manifest and binds inputs for you.
  With `enhance: false` on a `tokens_bind_inputs` model you must write every token yourself.

## Compose switches (`params`)

| Key | Default | Effect |
| --- | --- | --- |
| `enhance` | `true` | `false` = the prompt goes to the provider verbatim: no rewrite, no persona, no template, no timeline compose. |
| `inject_persona` | `true` | `false` = keep the creator's persona (bio, tone) out of a composed prompt. Meaningless when `enhance` is false. |
| `ugc_style` | `Auto` | Video template for reference-to-video (Product ad, Unboxing, Talking head, …). Compose-only: ignored when `enhance` is false. |
| `ugc_hook` | | A hook template name. Compose-only. |

Model params (`duration`, `resolution`, `aspect_ratio`, `generate_audio`, `voice_id`, …) are
listed per model in the catalog with their allowed values or bounds. Pass numbers as numbers
and enums as the listed strings.

## Schedule

```jsonc
"schedule": {
  "enabled": true,
  "timezone": "Europe/Istanbul",
  "days": { "mon": ["09:00", "18:00"], "thu": ["12:00"] }
}
```

Weekday keys `sun`..`sat`, times `HH:mm` in the given zone. An enabled schedule needs at
least one slot. `update_workflow` with `schedule: null` removes it. A scheduled run runs
every step; nothing is reused.

## Run options

```jsonc
{ "workflow_id": "…", "dry_run": true }                         // plan + cost, nothing spent
{ "workflow_id": "…", "only_node_ids": ["n3"] }                  // run one step (+ what it needs)
{ "workflow_id": "…", "reuse_from_run_id": "<run id>" }          // serve unchanged steps from that run
```

A run charges each step as it executes and refunds a failed step. The run row reports
`queued → running → succeeded | failed | partial`; each node reports `running`,
`awaiting_script`, `succeeded` (with `asset_id` and `url`), `failed` (with `error`) or
`skipped`.
