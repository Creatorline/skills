# Graph grammar

The exact shapes `validate_workflow`, `create_workflow` and `update_workflow` take and
`get_workflow` returns. Node and edge fields are strict: an unknown field is refused, so a
typo surfaces. Params are not checked by name: a misspelled param key is dropped without a
word, so copy every key from `get_workflow_catalog`.

## Contents

1. [Node](#1-node)
2. [What the validator refuses](#2-what-the-validator-refuses)
3. [Edge](#3-edge)
4. [Steps and tokens](#4-steps-and-tokens)
5. [Compose switches](#5-compose-switches)
6. [The publish step](#6-the-publish-step)
7. [Schedule](#7-schedule)
8. [Identity: brand, avatar, voice](#8-identity-brand-avatar-voice)
9. [Run options and the price loop](#9-run-options-and-the-price-loop)
10. [Run and step states](#10-run-and-step-states)

## 1. Node

```jsonc
{
  "id": "n1",                 // required. letters, digits, "_" and "-"; unique in the graph
  "kind": "generation",       // generation | publish | text | image
  "title": "Hero clip",       // optional card name on the canvas (up to 80 characters)

  // generation
  "stageId": "video-ref",     // a stage id from get_workflow_catalog
  "modelId": "bytedance-seedance-2-5-reference-to-video", // optional; omitted = stage default
  "prompt": "...",            // the prompt (on a publish node: the caption)
  "params": { "enhance": false, "duration": 10, "resolution": "720p", "aspect_ratio": "9:16" },
  "slotBindings": { "objects": "<asset id>" },  // slot key -> ONE asset id pinned into it
  "dropCharacterAvatar": true, // keep the avatar out of this step
  "reviewScript": true,        // park the run until a person approves the script on the canvas

  // publish
  "publishFormat": "video",    // auto | video | photo | carousel
  "publishChannels": ["TikTok"], // IG | TikTok | YouTube; omit = every connected one
  "postSettings": { "videoMadeWithAi": true, "autoAddMusic": false, "draft": false, "physicalDevice": false },
  "platformSettings": { "YouTube": { "title": "...", "visibility": "unlisted" } },

  // text
  "name": "topic",             // the variable; prompts and captions write @topic
  "values": ["matcha latte", "cold brew"],
  "activeIndex": 0,            // which value runs (0-based)

  // image
  "values": ["<asset id>", "<asset id>"], // asset ids to switch between
  "activeIndex": 0
}
```

- `name` on the workflow: up to 120 characters; `description`: up to 500.
- `reviewScript` only means something on a model whose catalog entry says `prompt.timeline`,
  with Enhance on. Over MCP nobody can approve the script, so the run waits until a person
  does it on the canvas. Leave it off for runs started from chat.
- An `image` node holds asset ids only, never a URL. Make the asset first: `list_assets`, or
  `import_asset` with a public file link or a TikTok / Instagram post link.
- An `image` node feeds image slots only. A source video (Reshoot `source`, Character Swap
  `source_video`) goes in `slotBindings`; a new clip for the next run is an edit of that
  binding.

## 2. What the validator refuses

- `text` and `image` nodes are inputs: they never run and never cost. A `text` node is never
  wired (a prompt reads it by name). An `image` node is wired outward into the slot it feeds.
- A `text` node needs a `name` (letters, digits, `_`, `-`; `step<n>` is reserved) and at
  least one non-blank value. Two text nodes cannot share a name.
- An `image` node needs at least one asset id.
- A `publish` node is terminal: no outgoing edge. `publishFormat: "video"` takes video;
  `photo` and `carousel` take images; `auto` takes anything.
- A generation node's `modelId` must be one its `stageId` offers. `short-clip` cannot be a
  step (it makes several clips; a step passes on one).
- A slot fed by an `image` node cannot also be fed by a step in a single-file slot. An array
  slot takes both, in wire order.
- No cycles. A graph of inputs only is empty and cannot run.

Not checked here: whether every slot the catalog marks `required` is fed (a Reshoot's
`source`, a Character Swap's `source_video`, both lipsync slots). The avatar counts for a
`role: "character"` slot unless `dropCharacterAvatar` is set. Check the rest yourself: an
empty required slot surfaces only when the step runs.

## 3. Edge

```jsonc
{ "source": "n1", "target": "n2", "sourceHandle": "image", "targetHandle": "image_url" }
```

- `sourceHandle` is what the source makes: `image`, `video` or `audio`. Omit it: a
  generation node makes its stage's `output` (audio for `text-to-speech` and `dialogue`), an
  `image` node makes `image`.
- `targetHandle` is the target model's slot key. Omitted, a publish target takes the edge as
  is and a step takes it into its FIRST slot of the matching kind. Set it whenever the target
  has several slots of one kind: `characters` / `location` / `objects` on reference video (an
  image with no handle lands in `characters` and replaces the avatar), `image_url` /
  `end_image_url` on photo to video. Setting it on every edge into a step is never wrong.
- Kinds must match: an image cannot feed a video slot.
- Several edges into one array slot (`video_urls` on merge clips, `objects` on reference
  video, several photos into a carousel publish) keep the order of `edges`. That order is the
  cut order and the slide order.

## 4. Steps and tokens

- Every wired step gets a step number in run order (by dependency, then by `nodes` order).
  `validate_workflow` and `get_workflow` return them as `steps`. Inputs have none.
- `@step3` in a prompt names step 3's output. The runner turns it into the right positional
  token when the run starts, so write `@step3`, never a guessed `@Video2`.
- `@name` in a prompt or a caption becomes the active value of the text node `name`.
- Positional tokens (`@Image1`, `@Video1`, `@Audio1`) count a step's inputs per kind, slot by
  slot in the catalog's slot order:
  - a slot nothing is wired into counts the avatar first (in the `role: "character"` slot,
    unless `dropCharacterAvatar`), then its bound assets (`slotBindings`);
  - a wired slot counts only its wires: a step's output replaces what the slot would hold, and
    an `image` node wired into the character slot also switches the avatar off.
- So on reference video with a product image node wired into `objects`: `@Image1` is the
  avatar, `@Image2` the product. On photo edit with a background step wired into `location`:
  `@Image1` the avatar, `@Image2` the background.
- With Enhance on, the writer gets the token list and binds the inputs itself. With Enhance off
  on a model whose catalog says `prompt.tokens_bind_inputs: true`, write every token yourself:
  an input the prompt never names is ignored. Photo to video wires its frames directly and
  needs no tokens.

## 5. Compose switches

`enhance` and `inject_persona` are the catalog's `compose_params`: valid in `params` on every
step whose model reports `prompt.verbatim_supported`. `ugc_style` is a writer-only param of the
reference video models.

| Key | Default | Effect |
|---|---|---|
| `enhance` | `true` | `false` sends the prompt to the model as written: no rewrite, no persona, no template, no shot plan. A take longer than the model's one-take limit is still split into parts, with only the edits the split needs and every token kept |
| `inject_persona` | `true` | `false` keeps the avatar's persona (name, bio, tone) out of a written prompt. Nothing to do when `enhance` is false |
| `ugc_style` | `Auto` | The video template on reference video: `Auto`, `Keyframes`, `Talking head`, `Storytime`, `Podcast clip`, `GRWM`, `Product ad`, `Unboxing`, `Street interview`, `Day in the life`, `Before & after`, `Reaction`, `Cinematic`. Read only by the writer, so ignored when `enhance` is false |

The canvas's hook picker (`ugc_hook`) takes names from a library this connection does not
list: leave it out and put the hook in the prompt. Model params (`duration`, `resolution`,
`aspect_ratio`, `generate_audio`, `voice_id`, ...) are listed per model in the catalog with
their values or bounds. Numbers as numbers, choices as the listed strings.

## 6. The publish step

- Its `prompt` is the caption; `@name` works in it. Write it in the brand's voice
  (`get_brand`), with the hashtags in it.
- It lands one post in the brand's review queue as `pending_review`, on `publishChannels`
  (or every connected one). Nothing goes public until a person approves it in the app or
  `publish_post` runs on an explicit yes (`creatorline-publish`). `list_posts` with
  `status: "pending_review"` finds it.
- `postSettings.videoMadeWithAi: true` on every publish step that carries AI media.
- `postSettings.draft: true` hands the post to the platform's app inbox as a draft, to be
  finished there. `autoAddMusic` adds music to a TikTok carousel. `physicalDevice` posts
  through the brand's bound phone.
- `publishFormat: "carousel"` with two or more image steps wired in makes one carousel post,
  slides in edge order. `photo` keeps the first image. `video` keeps the videos.
- `platformSettings.YouTube`: `title` (up to 100 characters) and `visibility`
  (`public`, `unlisted`, `private`).

## 7. Schedule

```jsonc
"schedule": {
  "enabled": true,
  "timezone": "Europe/Istanbul",
  "days": { "mon": ["09:00", "18:00"], "thu": ["12:00"] }
}
```

- Weekday keys `sun` to `sat`, times `"HH:mm"` in the given IANA zone. An enabled schedule
  needs at least one slot.
- `update_workflow` with `schedule.enabled: false` pauses it; `schedule: null` removes it.
- Every scheduled run runs every step with the active input values; nothing is reused from an
  earlier run and nothing asks first. Save one only after the person agreed to the weekly
  total.

## 8. Identity: brand, avatar, voice

- A workflow belongs to a brand (`brand_id`): the publish step uses that brand's accounts and
  the results land in its library.
- The face and the persona come from an avatar: the brand's `default_avatar_id` unless the
  workflow has an `avatar_id`. `run_workflow` with `avatar_id` renders one run with another
  avatar without changing the workflow. `update_workflow` with `avatar_id: null` returns to
  the brand's default.
- The voice does NOT follow the avatar in a workflow. `text-to-speech` and `change-voice`
  speak in a stock voice unless `params.voice_id` is set; `dialogue` reads `voice_a` and
  `voice_b`. Set the avatar's `voice_id` from `get_avatar`. A run with another avatar keeps
  the voice the steps name, so change those too.
- The `change_voice` switch (reference video, Reshoot, Character Swap) does not give a
  workflow step the avatar's voice. To make a take speak in it, add a `change-voice` step after
  it with the avatar's `voice_id`.
- Changing the avatar changes what "unchanged" means for reuse: steps that show the face run
  again; renaming the brand does not.

## 9. Run options and the price loop

```jsonc
{ "workflow_id": "..." }                                   // the quote: needs_approval, nothing runs
{ "workflow_id": "...", "confirm": true }                  // the run, after the person's yes
{ "workflow_id": "...", "dry_run": true }                  // the plan and price, no question attached
{ "workflow_id": "...", "only_node_ids": ["n3"] }          // only that step (and what it needs)
{ "workflow_id": "...", "reuse_from_run_id": "<run id>" }  // unchanged steps served from that run, free
{ "workflow_id": "...", "avatar_id": "<avatar id>" }       // this run with another avatar
```

- Without `confirm: true` nothing runs and nothing is charged. The answer is
  `status: "needs_approval"` with `credits` (the whole run), `credit_balance`, `sufficient`,
  a one-line `summary` and `plan` (`will_run`, `reused`, `cost`, `preflight_cost`, the first
  steps' share that must be covered to start).
- `confirm: true` starts it and answers `status: "queued"` with the `run_id`.
- Each step is charged when it runs and refunded if it fails. When `sufficient` is false the
  balance does not cover every step, and the later ones would fail for lack of credits: do
  not start it (house rules, section 2, short balance).
- `validate_workflow` prices an unsaved graph the same way (`estimated_credits`).
- `plan.models` names the model each step runs; it is for you, never for the person.

## 10. Run and step states

- The run: `queued`, `running`, then `succeeded`, `failed` or `partial` (some steps failed).
  `queued` can last a while when the workspace's parallel slots are busy; it starts by itself.
- Each step in `nodes`: `running`, `awaiting_script` (parked by `reviewScript`), `succeeded`
  (with `asset_id`, `url` and `credits`), `failed` (with `error`, refunded) or `skipped` (a
  step before it failed). `reused: true` marks a step served from an earlier run.
- `vars` records the text values the run used.
- `get_workflow` lists the last five runs of a workflow.
