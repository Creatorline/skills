# Porting playbook

How a pipeline from another tool (a node-graph image app, an automation tool, a creative
canvas, a screenshot of one, or a written recipe) becomes a Creatorline graph. Work node by
node: inventory, classify, map, collapse, validate, report.

## Contents

1. [Inventory](#1-inventory)
2. [Classify every source node](#2-classify-every-source-node)
3. [Map generators and transforms to stages](#3-map-generators-and-transforms-to-stages)
4. [Collapse rules](#4-collapse-rules)
5. [Report back](#5-report-back)

## 1. Inventory

Before you map anything, write down for every source node: its name, what it does, its
inputs and outputs, its settings (length, resolution, aspect, model) and its prompt
**character for character**. From a screenshot, read every visible field; ask only for what
the image does not show and the graph cannot run without (asking.md: one message, at most 3
questions). Note which fields the person changes between runs: those become inputs.

## 2. Classify every source node

| Class | Examples | What happens to it |
|---|---|---|
| Generator | text to image, image to video, character or reference video, text to speech | A `generation` step |
| Transform | edit or inpaint, restyle, swap the person in a clip, motion transfer, lipsync, merge, captions | A `generation` step on a transform stage |
| Input | prompt fields, dropdowns, a "subject" variable, uploaded references | A `text` node, an `image` node, or `slotBindings` |
| Glue | prompt enhancer or AI rewriter, upscaler, resize, format convert, seed, preview, router, note | Dropped (section 4) |
| Output | save, export, post to social | A `publish` node, or nothing (every step's output is kept in the brand's library) |
| Unsupported | loops, branches, conditions, timers inside the graph, webhooks, code nodes | Restructured (SKILL.md, "What a workflow cannot do"), and said |

## 3. Map generators and transforms to stages

| The source node does | Creatorline stage | Notes |
|---|---|---|
| Text to image | `photo` | No slots: it cannot show the avatar. Words inside the image: `gpt-image-v2-text-to-image` with `quality: "High"` |
| Edit an image, inpaint, restyle, "with this product", "with this face" | `photo-edit` | Slots `characters` (the avatar joins by itself), `location`, `other_elements`. Use it whenever an existing image or the avatar must be kept |
| Image to video, first and last frame, keyframes | `video-i2v` | `image_url` (+ `end_image_url`); slot names differ per model (catalog.md, section 2). A keyframe list: `flux-3-image-to-video-timestamped` (`keyframes`, up to 10) |
| Character or reference video, a consistent person, UGC talking video, product in hand | `video-ref` | The avatar joins `characters`. Product photos in `objects`, a place in `location`, a voice track in `audio_urls`, clips to copy in `source_video` |
| Text to video with no image at all | `video-t2v` | Only when the source truly had no image; when a person appears, `video-ref` gives them the avatar's face |
| Replace the person in a real clip, face swap in video | `scene-video` (Character Swap) | `source_video` + the avatar (auto). Mode by clothing: `character-swap-transfer` keeps the video's outfit, `character-swap-replace` keeps the avatar's own (or the one in `outfit`). 4 to 30 s of source per take |
| Motion transfer, copy this dance, pose-driven video | `motion-control` | `character_image` (auto) + `motion_video`. Fixed prompt |
| Re-film a reference video with a new performer | `reshoot` | `source` (required), `objects`, `source_video`. The prompt is a Direction; the pipeline writes its own |
| Lipsync audio onto a clip | `lipsync` | `video_url` + `audio_url`, both required. `sync-lipsync-v2-pro` when the source set what happens on a length mismatch (`sync_mode`) |
| Replace the voice in a clip | `change-voice` | `video_url`. Set `voice_id` to the avatar's (`get_avatar`): left out, it is a stock voice. A "change voice" toggle on a generator in the source becomes this step too |
| Add a music or voice track | `add-audio` | `video_url` + `audio_url`, `start_offset` |
| Text to speech | `text-to-speech` | Makes audio for `lipsync` or `add-audio`. Set `voice_id`; `model_id` `eleven_v4` by default |
| Two-voice dialogue | `dialogue` | The prompt is an `A:` / `B:` script; set `voice_a` and `voice_b` |
| Concatenate clips | `merge-clips` | `video_urls`, 2 to 10; edge order is clip order |
| Captions, subtitles, hook text burned in | `caption-burn` | `source_video`; `hook_mode` (`auto`, `manual` uses the prompt, `off`), `caption_style`. It transcribes by itself |
| Post to TikTok, Instagram or YouTube | `publish` | Terminal; the post waits in the review queue |

**Which model.** Keep what the source asked for in effect, not in name: its length, its
resolution, whether it takes a real person's photo, whether it needs an end frame. Then take
the best model on the ladder in catalog.md that does it. A source on a fast or cheap tier
stays on our fast tier unless the person wants an upgrade. A model the source used that the
catalog also lists (a Veo, Kling, Flux or Seedance model) can stay itself when its look is the
point. Never pick a model the catalog does not list, and never a stage it omits.

## 4. Collapse rules

- **An AI prompt writer in front of a model** → delete it. Keep Enhance on the model step and
  put the writer's input (the idea) in `prompt`: that is what Enhance does. If the source
  saved the writer's output as a final prompt, use that text with `enhance: false` instead.
- **Upscale, resize, crop, format, codec, a "1080p" node** → delete; set `resolution` and
  `aspect_ratio` on the step that makes the media.
- **Split a long source → swap each part → join**, around a person swap → one `scene-video`
  step: it cuts the source to `duration` and swaps it in one take of up to 30 s. A source
  longer than 30 s keeps only its first 30: say so.
- **Transcribe → write a hook → burn captions** → one `caption-burn` step.
- **Load a face, a face adapter or a trained model of the person** → nothing. Bind the
  workflow to the brand (`brand_id`); its avatar's face joins the character slots and its
  persona joins written prompts. Another face is `avatar_id` (from `list_avatars`), never an
  image node. A trained model of a product → its photo in `objects` (video) or
  `other_elements` (photo) via `slotBindings`.
- **A voice clone node** → nothing to load: the avatar's `voice_id` on the voice steps.
- **Seed, sampler, guidance scale, scheduler, steps** → nothing. Not exposed; the models tune
  them.
- **Preview, save, show image** → nothing. Every step's output is kept and visible in
  `get_workflow_run` and the brand's library.
- **A "for each" over values** → one `text` node holding the values, one run per value (the
  active value changes between runs).
- **One image feeding two branches** (a photo and a video from the same frame) → one graph:
  a step's output can feed several targets.
- **A negative prompt** → with Enhance on, fold it in as a positive ("a plain grey t-shirt",
  not "no logo"). With Enhance off, keep the prompt exactly as given and tell the person
  negatives are not a separate field.
- **A video fetched from a post link** → `import_asset` with the TikTok or Instagram link,
  then bind the asset id.
- **A file on their computer** → they drop it on https://app.creatorline.io/assets; find it
  with `list_assets` and bind its id.

## 5. Report back

End with a mapping table the person can hold against their original. The left column is
their node in their tool, under whatever name it had there. The middle column says what the
step does on Creatorline and its key settings; add the model's catalog `title` (never its id)
only when their node named a model or they ask.

| Their node | On Creatorline | Notes |
|---|---|---|
| "Text to image, portrait" | Step 1, photo: the rooftop frame, 9:16, 2K | Prompt word for word (Enhance off) |
| "Upscale 2x" | Dropped | No upscale step; step 1 makes the frame at 2K |
| "Image to video" | Step 2, photo to video: 10 s, 1080p, our sharpest model | Prompt word for word |
| "Post to TikTok" | Step 3, post | Waits in the review queue; nothing goes public on its own |

Then: what you dropped and why (one line each), anything that works differently here, the
price of one run, and the link `https://app.creatorline.io/workflows/<workflow id>`.
