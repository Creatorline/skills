# Porting playbook

How a pipeline from another tool becomes a Creatorline graph. Work node by node: classify,
map, collapse, then validate.

## 1. Classify every source node

| Class | Examples | What happens to it |
| --- | --- | --- |
| Generator | text-to-image, image-to-video, reference/character video, TTS, lipsync | Becomes a `generation` step. |
| Transform | inpaint/edit, restyle, swap person in a clip, motion transfer, merge, captions | Becomes a `generation` step on a util/transform stage. |
| Input | prompt fields, dropdowns, "subject" variables, uploaded references | `text` node, `image` node, or `slotBindings`. |
| Glue | prompt enhancer / LLM rewriter, upscaler, resize, format convert, seed, preview, router, note | **Dropped** (see collapse rules). |
| Output | save, export, post to social | `publish` node, or nothing (every step's output is saved as an asset anyway). |
| Unsupported | loops, branches, cron inside the graph, webhooks, code nodes | Restructure (see SKILL.md) and tell the user. |

## 2. Map generators and transforms to stages

| Source node does… | Creatorline stage | Notes |
| --- | --- | --- |
| Text → image (Flux, SD, Imagen, Midjourney, Ideogram, GPT Image) | `photo` | No slots. Default Nano Banana Pro; GPT 2 for typography-heavy or "quality High". |
| Image → image edit, inpaint, restyle, "with this product / this face" | `photo-edit` | Slots `characters`, `location`, `other_elements`. Use this, not `photo`, whenever an existing image must be preserved. |
| Image → video, first/last frame, keyframes | `video-i2v` | `image_url` (+ `end_image_url`). Keyframe lists → Flux 3 Keyframes (`keyframes` slot, up to 10). |
| Character / reference / "consistent person" video, UGC talking video, product-in-hand | `video-ref` | Seedance reference. Slots `characters`, `location`, `objects`, `audio_urls`, `source_video`. The creator is auto-added to `characters`. |
| Text → video with no references | `video-t2v` | Only when the source truly had no image input; otherwise `video-ref` gives identity. |
| Replace the person in a real clip, "face swap in video", scene swap | `scene-video` | `source_video` (driving) + `character` (auto) + optional `location`. Splits and merges long sources itself. |
| Motion transfer, "copy this dance", pose-driven video | `motion-control` | `character_image` + `motion_video`. Prompt is fixed; no `enhance` key. |
| Redo a reference video as the creator (clay sheet, reshoot) | `reshoot` | Owns its own analysis → sheet → engine chain; prompt is a direction, no `enhance` key. |
| Lipsync audio onto a clip | `lipsync` | `video_url` + `audio_url` (an audio asset). Pro tier for fast speech. |
| Replace the voice in a clip with the creator's | `change-voice` | `video_url`. Uses the creator's cloned voice by default; `voice_id` overrides. |
| Add a music/voice track | `add-audio` | `video_url` + `audio_url`, `start_offset`. |
| Text → speech | `text-to-speech` | Emits audio; wire it into `lipsync` or `add-audio`. `voice_id`, `model_id` (`eleven_v3` default). |
| Two-voice dialogue | `dialogue` | Prompt is an `A:` / `B:` script; `voice_a`, `voice_b`. |
| Concatenate clips | `merge-clips` | `video_urls` (2 to 10), edge order = clip order. |
| Captions / subtitles / hook text burn-in | `caption-burn` | `source_video`; `hook_mode` (`auto` writes one, `manual` uses the prompt, `off`), `caption_style`. Transcribes itself. |
| Post to TikTok / Instagram / YouTube | `publish` | Terminal; lands in the review queue. |

## 3. Collapse rules (the "optimized path")

- **Prompt enhancer / LLM rewriter in front of a model** → delete it, keep `enhance: true` on
  the model step, and put the user's raw idea in `prompt`. That is what Enhance is. If the
  enhancer's output was captured as the final prompt, use that text with `enhance: false`.
- **Upscale, resize, crop, format, codec, "1080p node"** → delete; set `resolution` /
  `aspect_ratio` on the generating step instead.
- **Split long source → per-segment generate → concat** around a person swap → one
  `scene-video` step (it does exactly this, with the model's `max_duration_sec` as the cut).
- **Transcribe → write hook → burn captions** → one `caption-burn` step.
- **Load face / IP-Adapter / LoRA of the creator** → nothing. Bind the workflow to the
  creator (`account_id`); their avatar goes into the character slot automatically and their
  persona into composed prompts. A LoRA of a *product* → `objects` (video) or
  `other_elements` (photo) via `slotBindings`.
- **Seed, sampler, CFG, scheduler, steps** → nothing. Not exposed; the provider tunes them.
- **Preview / save / "show image"** → nothing. Every step's output is saved as an asset and
  visible on the creator's wall and in `get_workflow_run`.
- **A "for each" over values** → one `text` node holding the values (the user runs once per
  value with `activeIndex`, or you run it N times over MCP by updating `activeIndex`).
- **Two branches from one image (e.g. a photo and a video from the same frame)** → one graph;
  a step's output can feed several targets.
- **Negative prompts** → fold into the prompt as "without …" only when `enhance` is on;
  with `enhance: false` keep the positive prompt exactly as given and tell the user negatives
  are not a separate field.

## 4. Choosing the model on a stage

Read `references/catalog.md` for the ladder. In short:

- Hero / final video from references: `bytedance-seedance-2-5-reference-to-video` (30 s,
  1080p). Standard: `bytedance-seedance-2-0-reference-to-video` (15 s, 1080p). Draft/cheap:
  the stage default `…-fast` (720p).
- Photo to video: `bytedance-seedance-2-5-image-to-video` for a hero, the default Fast for
  volume, Veo 3.1 when the brief needs its look, Flux 3 Keyframes for timed keyframes.
- Photo: `nano-banana-pro` (default) for realism and character consistency, `gpt-image-v2-*`
  with `quality: High` for text-heavy or graphic frames, Seedream 4.5 Edit when the user's
  source used Seedream.
- Scene video: `scene-seedance-2-5` (30 s takes, best read of the source), `scene-seedance-2-0`
  for 1080p, Kling O3 when the user's source used Kling.
- Never pick a model the catalog lists as `pending`, and never a stage the catalog omits.

## 5. Report back

End with a mapping table the user can check against their ORIGINAL pipeline. The left
column is **their** node in **their** tool (the names are whatever that tool called them,
so Flux, Kling and Upscale nodes will appear there even though Creatorline has none); the
other columns say what each became on Creatorline, or that it was dropped and why.

Example, porting a four-node ComfyUI graph:

| Their node (in their tool) | Creatorline step | Model | Notes |
| --- | --- | --- | --- |
| "Flux Dev t2i" | n1 `photo` | nano-banana-pro | prompt verbatim (`enhance: false`) |
| "Upscale 2x" | dropped | | no upscale step here; `resolution: "2K"` on n1 gives the size |
| "Kling i2v" | n2 `video-i2v` | bytedance-seedance-2-5-image-to-video | 10 s, 1080p |
| "Post to TikTok" | n3 `publish` | | lands in review, not public |

Then the cost from the dry run, the workflow id, and the studio link
`https://app.creatorline.io/workflows/<id>`.
