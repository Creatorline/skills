# Stage catalog and quality ladder

A snapshot of `get_workflow_catalog` (October 2026), to plan with. Write graphs from the tool:
models, slots, params and prices change, and the tool is the only authority. Call it with
`stage` to keep the answer small.

Notation: a slot is `key: kind`, with `(auto)` when the avatar joins it by itself and `?`
when it is optional. Each table lists the best model first; `default` marks the stage
default (what runs when a node names no `modelId`).

**Cost words** compare models of the same kind at their default settings: lowest, low,
standard, high, highest. For the exact number of a graph, `validate_workflow`
(`estimated_credits`); of a saved workflow, `run_workflow` without `confirm`. The catalog's
`price` lines give each model's rate rule. What raises a price: more seconds, `1080p` (about
2 to 2.5 times 720p on most models), a stronger model, more steps. Quote from the tool, never
from these words.

## Contents

1. [Video: reference to video](#1-video-reference-to-video-video-ref)
2. [Video: photo to video](#2-video-photo-to-video-video-i2v)
3. [Video: text to video](#3-video-text-to-video-video-t2v)
4. [Video: Reshoot](#4-video-reshoot-reshoot)
5. [Video: Character Swap](#5-video-character-swap-scene-video)
6. [Video: motion control](#6-video-motion-control-motion-control)
7. [Photo](#7-photo-photo-and-photo-edit)
8. [Audio and finishing](#8-audio-and-finishing)
9. [Natural next steps](#9-natural-next-steps)
10. [Not workflow stages](#10-not-workflow-stages)

## 1. Video: reference to video (`video-ref`)

The avatar acting and speaking, with a product, a place or a reference clip. Output: video.
Slots on the Seedance models, in token order: `characters: image (auto)`, `location: image?`,
`objects: image?`, `audio_urls: audio?`, `source_video: video?`. `characters` is required:
the avatar fills it, so a clip with no person in it belongs to photo to video or text to
video. Composes a shot plan with Enhance on; with Enhance off, tokens bind the inputs. Params:
`ugc_style` (writer only), `aspect_ratio` (default `9:16`), `duration` (default 10),
`resolution`, `generate_audio` (default true), `change_voice` (no effect in a workflow: add a
`change-voice` step instead).

| Model | One take | Resolution | Cost | Notes |
|---|---|---|---|---|
| `bytedance-seedance-2-5-reference-to-video` | 30 s (duration up to 120, filmed as joined takes) | 720p, 1080p | standard | The hero. AI faces only. Up to 10 reference clips |
| `bytedance-seedance-2-0-reference-to-video` | 15 s (up to 60) | 720p, 1080p | standard | Real faces, with consent. Up to 3 reference clips |
| `bytedance-seedance-2-0-reference-to-video-fast` (default) | 15 s (up to 60) | 720p | low | Drafts and volume |
| `bytedance-seedance-2-0-mini-reference-to-video` | 15 s (up to 60) | 720p | lowest | Budget drafts |
| `google-gemini-omni-flash-reference-to-video` | 10 s (up to 60) | 720p, 1080p | low (1080p high) | `characters` up to 3, `location` 2, `objects` 2, `reference_videos` up to 3; no audio slot |
| `veo3-1-reference-to-video` | 8 s steps (8 to 56) | 720p, 1080p | high | `image_urls` only (up to 3): the avatar is NOT added |
| `xai-grok-imagine-reference-to-video` | up to 15 s | 720p | lowest | `image_urls` only (up to 7): the avatar is NOT added |

Pick 2.5 for the piece that gets posted, 2.0 for a real person's face, the default for drafts
and high volume. A take longer than its one-take limit is filmed in parts and joined; the face
can drift a little at each join, so prefer one take.

## 2. Video: photo to video (`video-i2v`)

One image brought to life in one continuous take, with an optional end frame. Output: video.
Frames are wired straight in (no tokens). The first-frame slot is `image_url` on most models,
`first_frame_url` on Veo 3.1, `first_image_url` on Veo 3.1 Lite, `start_image_url` on the
Kling v3 tiers, `keyframes` on Flux 3 Keyframes; the end frame is the matching `end_...` /
`last_...` slot. No avatar slot: put the avatar into the frame first (a photo edit step).

| Model | Length | Resolution | Cost | Notes |
|---|---|---|---|---|
| `bytedance-seedance-2-5-image-to-video` | 4 to 30 s | 720p, 1080p | standard | The hero. No `aspect_ratio`: follows the frame, so make the frame 9:16 |
| `bytedance-seedance-2-0-image-to-video` | 4 to 15 s | 720p, 1080p | standard | |
| `bytedance-seedance-2-0-image-to-video-fast` (default) | 4 to 15 s | 720p | low | Volume |
| `google-gemini-omni-flash-image-to-video` | 3 to 10 s | 720p, 1080p | low (1080p high) | |
| `veo3-1-first-last-frame-to-video` | 4, 6 or 8 s | 720p, 1080p | high | A first-and-last-frame look |
| `veo3-1-first-last-frame-to-video-fast` | 4, 6 or 8 s | 720p, 1080p | low | |
| `veo-3-1-lite-first-last-frame-to-video` | 8 s | 720p, 1080p | low, one price per run | |
| `flux-3-image-to-video-timestamped` | 5 to 20 s | `hd`, `fhd` | low | Up to 10 `keyframes` with `keyframe_timestamps` |
| `xai-grok-imagine-video-1-5-preview-image-to-video` | 1 to 15 s | 720p | lowest | No end frame |
| `minimax-h3-max-image-to-video` / `minimax-h3-max-turbo-image-to-video` | 5 to 15 s | `768P` | lowest | `prompt_expansion_mode` |
| `kling-v3-pro-image-to-video` / `kling-v3-standard-image-to-video` / `kling-o3-standard-image-to-video` | 3 to 15 s | fixed 1080p / 720p / 720p | low to lowest | Native audio raises the Kling v3 rate |
| `kling-v3-4k-image-to-video` | 3 to 15 s | fixed 4K | highest | Only when asked |

## 3. Video: text to video (`video-t2v`)

A scene from words alone: no avatar, no image. Output: video. Use it for b-roll and places;
whenever the avatar should appear, use reference video instead.

| Model | Length | Resolution | Cost |
|---|---|---|---|
| `bytedance-seedance-2-0-text-to-video` (default) | 4 to 15 s | 720p, 1080p | standard |
| `veo3-1-text-to-video` | 4, 6 or 8 s | 720p, 1080p | high |
| `veo-3-1-lite-text-to-video` | 4, 6 or 8 s | 720p, 1080p | lowest |
| `flux-3-text-to-video` | 5 to 20 s | `hd`, `fhd` | low |
| `minimax-h3-max-text-to-video` / `minimax-h3-max-turbo-text-to-video` | 5 to 15 s | `768P` | lowest |

## 4. Video: Reshoot (`reshoot`)

A source video re-filmed with the avatar: same beats, cut rhythm and sound, optionally the
person's product and new lines. Output: video. Slots: `character: image (auto)`,
`source: video` (required: bind it or wire it), `objects: image?` (the product shown instead
of the one in the video), `source_video: video?` (up to 3: a screen recording or product
footage to show). The prompt is an optional Direction; the pipeline writes its own model
prompt, so no `enhance` key. Params: `duration` (default 10), `resolution`, `change_voice`
(no effect in a workflow: add a `change-voice` step for the avatar's voice). The source needs
one main person on camera.

| Model | Length | Resolution | Cost | Notes |
|---|---|---|---|---|
| `reshoot-seedance-2-5` (default) | 4 to 30 s | 720p, 1080p | standard, plus a small fixed part | AI faces; a refused take of 15 s or less is re-filmed on 2.0 by itself |
| `reshoot-seedance-2-0` | 4 to 15 s | 720p, 1080p | standard, plus a small fixed part | Real faces |

## 5. Video: Character Swap (`scene-video`)

A real video kept exactly (moves, camera, cuts, sound) with its people replaced by avatars.
Output: video. The stage id stays `scene-video`; the canvas calls it Character Swap. Slots:
`source_video: video` (required), `character: image (auto)` (up to 2 people, the workflow's
avatar first), then by mode. Params: `resolution` (`480p`, `720p` default, `1080p`),
`duration` (4 to 30, default 15: how much of the source is filmed and billed, from its start;
set it to the source's length, at most 30), `change_voice` (no effect in a workflow: add a
`change-voice` step). The source keeps its own audio.

| Mode | Model | Extra slot | Prompt |
|---|---|---|---|
| Transfer (default): the avatar wears the video's clothes | `character-swap-transfer` | `other_elements: image?` (up to 6: a place, an outfit, a product) | Optional Direction (what to wear instead, what each extra image is for); no `enhance` key |
| Replace: the avatar as its own image shows it | `character-swap-replace` | `outfit: image?` (one photo of what the avatar wears) | None: a prompt on this step is ignored |

Cost: per second filmed; 720p about twice 480p, 1080p about five times 480p. Use 480p for a
test. Never name the engine behind it; the modes are Transfer and Replace.

## 6. Video: motion control (`motion-control`)

The avatar performs the moves of a motion video (a dance, a gesture) from its photo. Output:
video. `kling-v3-standard-motion-control`: `character_image: image (auto)`,
`motion_video: video` (required). Params: `scene_control` (`video`, default: the avatar is put
into the motion video's first frame; `image`: keeps the avatar photo's background),
`character_orientation` (`video` default, or `image`). Fixed prompt: no prompt, no `enhance`.
Cost: per second of the motion video, low.

## 7. Photo (`photo` and `photo-edit`)

`photo` draws from words alone: no slots, so it cannot show the avatar. `photo-edit` keeps an
existing image: `characters: image (auto, up to 4)`, `location: image?`,
`other_elements: image?`. Every picture of the avatar is `photo-edit`; a product-only edit
sets `dropCharacterAvatar: true`. Params: `aspect_ratio`, `resolution` (default `1K` on the
Nano Banana models and `2K` on GPT Image; `2K` for a frame that gets animated or posted; `4K`
only when asked), `num_images` (keep 1: a step passes one image on). Output: image.

| Stage | Model | Cost | Notes |
|---|---|---|---|
| `photo` | `nano-banana-pro` (default) | standard | Realism; 9:16 available |
| `photo` | `nano-banana-2-text-to-image` | low | Volume |
| `photo` | `gpt-image-v2-text-to-image` | low to highest by `quality` (`Low`, `Medium`, `High`) | Words inside the image |
| `photo-edit` | `nano-banana-pro-edit` (default) | standard | Best likeness. No 9:16 (`auto` follows the input) |
| `photo-edit` | `nano-banana-2-edit` | low | No 9:16 |
| `photo-edit` | `gpt-image-v2-edit` | low to highest by `quality` | 9:16 available; words inside the image |
| `photo-edit` | `bytedance-seedream-v4-5-edit` | lowest | `image_size` instead of ratio and resolution (`portrait_16_9` is vertical) |

A 9:16 still of the avatar (a frame to animate, a story): `gpt-image-v2-edit` at `9:16`.

## 8. Audio and finishing

| Stage | Model (default) | Slots | Key params | Cost |
|---|---|---|---|---|
| `lipsync` | `sync-3-lipsync`; `sync-lipsync-v2-pro` when you need `sync_mode` | `video_url: video`, `audio_url: audio` | `sync_mode` on v2 Pro (`cut_off`, `loop`, `bounce`, `silence`, `remap`: what happens when the video and the audio differ in length) | low, per source second |
| `add-audio` | `ffmpeg-api-merge-audio-video` | `video_url: video`, `audio_url: audio` | `start_offset` | low, per run |
| `change-voice` | `change-voice` | `video_url: video` | `voice_id` (set it: rule 5), `remove_background_noise` | per run, the highest of these |
| `text-to-speech` (output: audio) | `elevenlabs-zrm-text-to-speech` | none; the prompt is the exact words | `voice_id` (set it), `model_id` (`eleven_v4` default, `eleven_v4_turbo`, `eleven_v3`, `eleven_multilingual_v2`, `eleven_flash_v2_5`), `speed` (0.7 to 1.2) | low, per run |
| `dialogue` (output: audio) | `elevenlabs-zrm-text-to-dialogue` | none; the prompt is an `A:` / `B:` script | `voice_a` (a stock voice when unset), `voice_b` (no default: set both), `stability` (0, 0.5, 1) | low, per run |
| `merge-clips` | `merge-clips` | `video_urls: video` (2 to 10, edge order) | | low, per run |
| `caption-burn` | `caption-burn` | `source_video: video` | `hook_mode` (`auto` writes one from the speech, `manual` uses the prompt as the hook, `off`), `caption_style` (`hormozi`, `tiktok`, `minimal`, `sticker`, `bold`, `karaoke`) | low, per run |

`caption-burn` reads the speech. A clip with no speech gets a manual hook as a title and no
captions; with `hook_mode` `auto` or `off` it fails (refunded). Voice lines and a manual hook
are words, not briefs: `enhance: false`.

## 9. Natural next steps

What the canvas suggests after each stage (`next_stages`). Any edge whose kinds match is
valid too, such as a video step into `change-voice`.

- `photo`, `photo-edit` → `video-i2v`, `video-ref`, `motion-control`, `photo`, publish
- any video stage → `add-audio`, `merge-clips`, `caption-burn`, `lipsync`, publish
- `lipsync` → `merge-clips`, `caption-burn`, `add-audio`, publish
- `merge-clips` → `caption-burn`, `lipsync`, `add-audio`, publish
- `add-audio`, `change-voice` → `caption-burn`, publish
- `caption-burn` → publish (captions go last, on the finished cut)
- `text-to-speech`, `dialogue` → `lipsync` or `add-audio` (`audio_url`), never publish

## 10. Not workflow stages

- `short-clip` (a long video into several shorts): one source makes many clips, and a step
  passes on one. Use the long-to-shorts skill.
- Photos with text on them (slides) and album posts: made in the app.
- The hook writer and other internal steps.
- `photo-to-video` and `text-to-video` are the one-off tools' names for the `video-i2v` and
  `video-t2v` stages; in a graph, use the stage ids.
