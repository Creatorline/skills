# Stage catalog and quality ladder

A snapshot of `get_workflow_catalog` (September 2026). **Always call the tool for the live
truth**: models, params and prices change, and the tool is the only authority. Use this
file to plan; use the tool to write.

Notation: slot `key:modality/role` (`?` = optional). Prices are credits; `/s` = per output
second, `/src s` = per source second, `/run` = flat. The first model listed under
"ladder" is the best; the stage default is marked.

## Video

### `video-ref` (reference to video, the UGC workhorse)  output: video
Slots: `characters:image/character` (the avatar auto-added), `location:image?`, `objects:image?`,
`audio_urls:audio?`, `source_video:video?`. Prompt required; verbatim supported; composes a
timeline (`reviewScript` works); **tokens bind inputs** when verbatim.
Params: `ugc_style` (compose-only), `aspect_ratio`, `duration`, `resolution`, `generate_audio`,
`change_voice`.

| Ladder | Model id | Max take | Res | Price |
| --- | --- | --- | --- | --- |
| 1 hero | `bytedance-seedance-2-5-reference-to-video` | 30 s | 720p/1080p | 8/s, 20/s at 1080p |
| 2 standard | `bytedance-seedance-2-0-reference-to-video` | 15 s | 720p/1080p | 8/s, 18/s at 1080p |
| 3 default, draft | `bytedance-seedance-2-0-reference-to-video-fast` | 15 s | 720p | 6/s |
| 4 budget | `bytedance-seedance-2-0-mini-reference-to-video` | 15 s | 720p | 3/s |
| alt look | `google-gemini-omni-flash-reference-to-video` | 10 s | 720p/1080p | 5/s, 12/s |
| alt look | `veo3-1-reference-to-video` | 8 s | 720p/1080p | 12/s, 14/s |
| alt cheap | `xai-grok-imagine-reference-to-video` | | 720p | 3/s |

Pick 2.5 when the take is over 15 s or it is the final deliverable; 2.0 for 1080p at 15 s;
the default for volume and drafts.

### `video-i2v` (photo to video)  output: video
Slots: `image_url:image/first-frame` (key differs per family: `first_frame_url` on Veo 3.1,
`first_image_url` on Veo Lite, `start_image_url` on Kling v3, `keyframes` on Flux 3),
`end_image_url:image/last-frame?`. Prompt required; verbatim supported; composes a timeline;
frames are wired directly (no tokens needed).

| Ladder | Model id | Max take | Res | Price |
| --- | --- | --- | --- | --- |
| 1 hero | `bytedance-seedance-2-5-image-to-video` | 30 s | 720p/1080p | 9/s, 20/s |
| 2 standard | `bytedance-seedance-2-0-image-to-video` | | 720p/1080p | 8/s, 18/s |
| 3 default | `bytedance-seedance-2-0-image-to-video-fast` | | 720p | 6/s |
| Veo look | `veo3-1-first-last-frame-to-video` / `…-fast` / `veo-3-1-lite-…` | 8 s | 720p/1080p | 12/s / 5/s / 16/run |
| timed keyframes | `flux-3-image-to-video-timestamped` (`keyframes` up to 10 + `keyframe_timestamps`) | 20 s | hd/fhd | 5/s |
| others | Gemini Omni Flash (10 s), Grok 1.5, MiniMax H3 Max / Turbo (15 s), Kling v3 4K / Pro / Standard, Kling O3 | | | 1 to 19/s |

### `video-t2v` (text to video)  output: video
No slots. Ladder: `bytedance-seedance-2-0-text-to-video` (default, 8/s), `veo3-1-text-to-video`
(8 s, 12/s), `veo-3-1-lite-text-to-video` (2/s), `flux-3-text-to-video` (20 s, 5/s), MiniMax.
Prefer `video-ref` whenever the creator should appear.

### `scene-video` (put the creator into a real clip)  output: video
Slots: `source_video:video/driving` (required), `character:image/character` (auto),
`location:image?`. Prompt optional (a fixed internal template drives it). Splits sources
longer than the model's take and merges them back itself.

| Ladder | Model id | Max take | Res | Price |
| --- | --- | --- | --- | --- |
| 1 | `scene-seedance-2-5` | 30 s | 720p | 8/s |
| 2 | `scene-seedance-2-0` | 15 s | 720p/1080p | 5/s, 10/s |
| 3 default | `scene-seedance-2-0-fast` | 15 s | 720p | 3/s |
| 4 | `scene-seedance-2-0-mini` | 15 s | 720p | 3/s |
| Kling | `scene-kling-o3-pro-reference`, `scene-kling-o3-standard-reference`, `scene-kling-o3-pro-edit`, `scene-kling-o3-standard-edit` | 15 s | | 3 to 4/s |

### `motion-control`  output: video
`kling-v3-standard-motion-control`: `character_image:image/character`, `motion_video:video/driving`;
params `scene_control` (video | image), `character_orientation`. Fixed prompt. 4/src s.

### `reshoot`  output: video
`reshoot-seedance-2-5` (default, 30 s) / `reshoot-seedance-2-0` (15 s): `character`, `source`
(driving video), `objects?`, `source_video?`. The prompt is a direction; no `enhance` key.

## Photo

### `photo` (text to image)  output: image
No slots. Params `aspect_ratio`, `resolution` (1K default; 2K for final frames; never 4K
unless asked), `num_images`.

| Ladder | Model id | Price |
| --- | --- | --- |
| 1 default | `nano-banana-pro` | 4/image (8 at 4K) |
| 2 volume | `nano-banana-2-text-to-image` | 2/image |
| typography | `gpt-image-v2-text-to-image` (`quality` Low/Medium/High) | 1 to 50/image |

### `photo-edit` (image to image, keeps a creator / product / reference)  output: image
Slots: `characters:image/character?` (auto, up to 4), `location:image?`, `other_elements:image?`.

| Ladder | Model id | Price |
| --- | --- | --- |
| 1 default | `nano-banana-pro-edit` | 4/image |
| 2 volume | `nano-banana-2-edit` | 3/image |
| typography | `gpt-image-v2-edit` | 1 to 100/image |
| Seedream | `bytedance-seedream-v4-5-edit` (`image_size` instead of ratio/res) | 2/image |

## Audio and utilities

| Stage | Model (default) | Slots | Key params | Price |
| --- | --- | --- | --- | --- |
| `lipsync` | `sync-3-lipsync`; `sync-lipsync-v2-pro` for fast speech (`sync_mode`) | `video_url:video`, `audio_url:audio` | | 3/src s |
| `add-audio` | `ffmpeg-api-merge-audio-video` | `video_url:video`, `audio_url:audio` | `start_offset` | 5/run |
| `change-voice` | `change-voice` | `video_url:video` | `voice_id`, `remove_background_noise` | 20/run |
| `text-to-speech` (output: audio) | `elevenlabs-zrm-text-to-speech` | none (prompt = text) | `voice_id`, `model_id`, `speed` | 8/run |
| `dialogue` (output: audio) | `elevenlabs-zrm-text-to-dialogue` | none (prompt = `A:`/`B:` script) | `voice_a`, `voice_b`, `stability` | 8/run |
| `merge-clips` | `merge-clips` | `video_urls:video` (2 to 10, edge order) | | 5/run |
| `caption-burn` | `caption-burn` | `source_video:video` | `hook_mode` auto/manual/off, `caption_style` hormozi/tiktok/minimal/sticker/bold/karaoke | 5/run |

## Chains the studio suggests (`next_stages`)

- `photo` / `photo-edit` → `video-i2v`, `video-ref`, `motion-control`, `photo`, `publish`
- any video stage → `add-audio`, `merge-clips`, `caption-burn`, `lipsync`, `publish`
- `text-to-speech` / `dialogue` → `lipsync` (`audio_url`), `add-audio` (`audio_url`); never `publish`
- `lipsync` → `merge-clips`, `caption-burn`, `add-audio`, `publish`
- `merge-clips` → `caption-burn`, `lipsync`, `add-audio`, `publish`
- `caption-burn`, `add-audio`, `change-voice` → `publish`

## Not workflow stages

`short-clip` (one source into many clips), `album-post` and slides (carousels), `hook-write`
and `hook` (internal). Use `create_generation` / the studio for those.
