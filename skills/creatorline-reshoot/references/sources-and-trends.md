# Sources and trends

Where a video to reshoot comes from, which links work, how to judge one before quoting, and
the cases where another tool fits better.

## Contents

1. [Where a source comes from](#1-where-a-source-comes-from)
2. [Links that work](#2-links-that-work)
3. [The pre-flight check](#3-the-pre-flight-check)
4. [Reading the cover](#4-reading-the-cover)
5. [Which tool for "recreate this video"](#5-which-tool-for-recreate-this-video)
6. [Reshooting part of a longer video](#6-reshooting-part-of-a-longer-video)
7. [Several trends at once](#7-several-trends-at-once)

## 1. Where a source comes from

| Source | How it reaches the run |
|---|---|
| A link the person pastes (the usual case) | `import_asset`, then its `id` in `inputs.source` |
| Trends in the app: https://app.creatorline.io/trending?activeBrand=BRAND_ID | The person opens a trend and either presses Reshoot there or copies the original post's link (each trend links to it) into the chat |
| Their library: past posts, imported videos, earlier creations | `list_assets` with `brand_id`, `file_type: "video"`, `search` |
| A clip in one of their Video Studio videos | `run_video_ai` with `action: "reshoot"` (section 6) |

No tool here lists trends. The Trends page is on some plans only and closed during the free
trial. It leaves out videos Reshoot cannot re-film (two leads, no person, smoking, heavy
effects), so a trend from there is a safe start. When the person has no link and cannot open
Trends, ask them to paste one from their own For You or Reels feed, or offer an original idea
with `creatorline-short-script`.

## 2. Links that work

| Link | Works? | Note |
|---|---|---|
| A TikTok video link (`tiktok.com/@name/video/...`, `vm.tiktok.com/...` share links) | Yes | `import_asset` copies the video in |
| An Instagram Reel or video post (`instagram.com/reel/...`, share links) | Yes | Same |
| A direct link to a video file (`.mp4`) | Yes | It must serve the file itself |
| A photo post, a carousel, a photo slideshow | No | It has no video. A carousel trend: `creatorline-photos` |
| YouTube, YouTube Shorts | No | Ask for the same video's TikTok or Instagram link, or for the file: dropped at https://app.creatorline.io/assets?activeBrand=BRAND_ID, then `list_assets` |
| A web page with a video on it | No | Refused before anything is charged |
| A private, deleted or region-locked post | No | "could not be found" |
| A share link that does not resolve | No | Ask them to open it in a browser and copy the full address |

Imports take videos up to 100 MB and cost nothing. Importing the same post again returns the
file already in the library.

## 3. The pre-flight check

Run it on every source before you quote. Each "no" has a way out.

| Check | If not |
|---|---|
| One main person, on camera the whole way | Two leads: `creatorline-character-swap` (it swaps up to two people) |
| A real person filmed with a camera | Animation, a screen with no one, a text-only video: another source, or `creatorline-talking-video` with the idea |
| Few hard cuts, no heavy effects or fast transitions | Expect a looser copy; prefer a steadier source |
| Nobody smoking or vaping | Another source |
| Vertical | The result keeps the source's frame: a horizontal source gives a horizontal video |
| 4 s or longer | Too short to film: another source |
| 30 s or less | Pick the length: the cut keeps the hook and the payoff and compresses the middle |
| Nothing said that the avatar must not say (another brand's name, a promise that something cures a disease or guarantees income) | Swap their product in, and set the claims in the Direction for a promise; or another source |
| No other brand's product in hand | Swap theirs in with `objects`, or another source |
| A song or trending sound, or a person talking? | Decides `change_voice` (SKILL.md, Craft, "Voice") |

You see one frame and cannot hear the video. What the person told you about it, and the post's
own caption when they pasted it, fill the rest. State what you assume; never quiz them.

## 4. Reading the cover

`preview_assets` with the asset id shows the source's cover frame and its length.

- One person, clearly filmed, nothing in the way: a good sign.
- Two people sharing the frame: Character Swap.
- A cover that is mostly text over a still (a hook card) says little: the person often appears
  a second later. Say what you assume and go on.
- A cigarette, a vape, or a frame dominated by effects: say so and suggest another source.
- The cover does not show what is said or the sound: rely on the person and the caption.

## 5. Which tool for "recreate this video"

"Recreate this TikTok with my avatar" can mean several things. Pick from what they care
about; when it is unclear, say which you chose and why in one line.

| They care most about | Tool | What they get |
|---|---|---|
| The idea, beats and sound, freshly filmed with the avatar, maybe their product | Reshoot (this skill) | A new video in the same shape |
| Every move, cut and frame of the real video (a dance, a skit, exact timing) | `creatorline-character-swap`, Transfer | The real video with the avatar in place of the person, in the video's clothes |
| The avatar exactly as its picture shows it, clothes included, in the real video | `creatorline-character-swap`, Replace | The same, in the avatar's own look or an outfit image |
| Two people replaced | `creatorline-character-swap` | Up to two avatars |
| The avatar doing the dance's moves on its own photo's background | `creatorline-character-swap` (its motion section) | The moves without the video's world |
| The format with their own script and lines | `creatorline-talking-video` | A new talking video, written from scratch |

## 6. Reshooting part of a longer video

`create_generation` always starts from the beginning of the source and condenses it. To
reshoot only one stretch (the 10 seconds from 0:40), use Video Studio:

1. `create_video` with `brand_id`, a `title` and one operation:
   `{ "op": "add_clip", "asset_id": "SOURCE_ASSET_ID", "id": "src", "trim_start": 40, "trim_end": 50 }`.
   The clip must show at least 5 s.
2. `run_video_ai` with `video_id`, `action: "reshoot"`, `clip_id: "src"`, an optional `prompt`
   (the Direction) and `avatar_id` when not the default, WITHOUT `confirm`: the price. Ask.
3. The same call with `confirm: true`. Then `get_video` every 20 s or so until the clip is no
   longer generating: the new take takes the clip's place.
4. The lengths it films are the clip's own (when one take holds it) or 5, 10, 15, 20 and 30 s;
   a longer clip needs `duration`, and a refusal lists the lengths it accepts.

This route takes no product photo and has no voice switch. When either is needed, export the
trimmed video first (`export_video`, a small charge, quoted like any other; the export is
9:16), then run `create_generation` with the export's `asset_id` as `inputs.source`.

## 7. Several trends at once

1. Import and check every source first (free).
2. Quote each: `create_generation` without `confirm`, one per trend.
3. Show one line per trend with its length and credits, then the total and the balance. Ask
   one yes for the whole batch (house-rules section 2).
4. Start them one after another with `confirm: true`. A run over the workspace's parallel
   limit waits its turn by itself; say so.
5. Poll each with `get_generation` and show one line per finished video, then one "What next?".
