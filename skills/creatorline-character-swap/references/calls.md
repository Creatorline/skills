# Calls

The exact arguments for each kind of swap, the Video Studio swap, the motion route and the
re-voice. Every paid call goes out first WITHOUT `confirm`: nothing starts, and the answer is
the price. After the person's yes, send the same arguments again with `confirm: true`. Ids
below are placeholders: take them from the tools, never from the person.

## Contents

1. [Limits](#1-limits)
2. [One avatar, Transfer](#2-one-avatar-transfer)
3. [Two avatars](#3-two-avatars)
4. [Transfer with a place, a garment or a product](#4-transfer-with-a-place-a-garment-or-a-product)
5. [Replace, with or without an Outfit](#5-replace-with-or-without-an-outfit)
6. [A part of a longer video, in Video Studio](#6-a-part-of-a-longer-video-in-video-studio)
7. [Motion: the avatar performs the moves](#7-motion-the-avatar-performs-the-moves)
8. [Re-voice after the swap](#8-re-voice-after-the-swap)
9. [Pricing a batch](#9-pricing-a-batch)

## 1. Limits

| Thing | Rule |
|---|---|
| Tool | `generate_character_swap` |
| `model` | `character-swap-transfer` (Transfer, the default) or `character-swap-replace` (Replace). Pass it: it is the mode. |
| `inputs.source_video` | Required. One video: an asset id, a direct file link, or a TikTok / Instagram post link. Import it first anyway: the import gives you its length. |
| `inputs.character` | Optional. ONE asset id: the second avatar's face. The first avatar goes in by itself, so two people in total. |
| `inputs.other_elements` | Transfer only. Up to 6 images: a place, a garment, a product. |
| `inputs.outfit` | Replace only. One image of clothes, worn by the main avatar. |
| `params.duration` | Whole seconds, 4 to 30. Always set it: the source's length, rounded, at most 30. Left out, it is 15 and 15 seconds are billed. The swap films the source's first `duration` seconds. |
| `params.resolution` | `480p`, `720p` (default) or `1080p`. |
| `params.quality` | `high` (default) or `standard`: a fraction of the price, less detail, filmed 15 s at a time. |
| `params.change_voice` | Leave it out. Re-voice with its own call (section 8). |
| `prompt` | Transfer: an optional direction (directions.md). Replace: ignored, so leave it out. |
| Frame and sound | No `aspect_ratio` and no audio setting: the result keeps the source's frame and its sound. |
| `include_avatar` | Leave it at its default (`true`). Pass `false` only when you supply every face yourself in `character` (two at most). |

The `generate_character_swap` tool's schema lists the slots and params live. If it ever
disagrees with this table, it wins. It lists `character` with room for two: one of those
places is the first avatar's.

## 2. One avatar, Transfer

The brand's default avatar takes the main person and wears the video's clothes
(`generate_character_swap`):

```json
{
  "model": "character-swap-transfer",
  "brand_id": "<brand id>",
  "inputs": { "source_video": "<source asset id>" },
  "params": { "duration": 14, "resolution": "720p" }
}
```

Another avatar of the workspace: add `"avatar_id": "<avatar id>"`.

## 3. Two avatars

The avatar in `avatar_id` (or the brand's default) takes the main person. For the second
avatar, read its `image_url` with `get_avatar`, then `import_asset` with that `url`, the
`brand_id` and a title such as "Jack face". Pass the returned id in `character`. The signed
link expires and changes on every read; the asset id stays, so the price call and the
confirmed call carry the same arguments. Reuse the same id for every run in a batch.

```json
{
  "model": "character-swap-transfer",
  "brand_id": "<brand id>",
  "avatar_id": "<Mia's avatar id>",
  "inputs": {
    "source_video": "<source asset id>",
    "character": ["<Jack's face asset id>"]
  },
  "params": { "duration": 12, "resolution": "720p" },
  "prompt": "@Avatar1 replaces the woman in the red jacket on the left. @Avatar2 replaces the man in the grey hoodie on the right."
}
```

For Replace, use `character-swap-replace` and drop `prompt`: the order alone decides who is
who.

## 4. Transfer with a place, a garment or a product

Each `other_elements` image needs its role in the direction, named `@Object1`, `@Object2`...
in the order passed:

```json
{
  "model": "character-swap-transfer",
  "brand_id": "<brand id>",
  "inputs": {
    "source_video": "<source asset id>",
    "other_elements": ["<rooftop photo asset id>", "<product photo asset id>"]
  },
  "params": { "duration": 10, "resolution": "720p" },
  "prompt": "@Object1 is the new setting, a rooftop at sunset; keep the camera and every move. @Object2 is our cold brew can: it replaces the cup she drinks from."
}
```

A product swaps best for something of the same size and grip that the performer already
holds.

## 5. Replace, with or without an Outfit

The avatar as its image shows it, clothes included:

```json
{
  "model": "character-swap-replace",
  "brand_id": "<brand id>",
  "inputs": { "source_video": "<source asset id>" },
  "params": { "duration": 10, "resolution": "720p" }
}
```

Wearing a given outfit: add `"outfit": "<outfit photo asset id>"` to `inputs`. Only the main
avatar wears it; what the outfit photo does not show stays as filmed.

## 6. A part of a longer video, in Video Studio

To swap seconds 8 to 22 of a 50 s video, cut the part out in a Video Studio project and swap
the clip there. Nothing is exported first, and the result lands in a project the person can
open, caption and export.

1. `create_video` (free) with `brand_id`, a `title` and one clip:

   ```json
   {
     "brand_id": "<brand id>",
     "title": "Swap: kitchen dance",
     "clips": [
       { "id": "src", "asset_id": "<source asset id>", "trim_start": 8, "trim_end": 22 }
     ]
   }
   ```

2. `swap_character_in_clip` WITHOUT `confirm` for the price:

   ```json
   {
     "video_id": "<video id>",
     "clip_id": "src",
     "mode": "transfer",
     "avatar_id": "<avatar id>"
   }
   ```

   `mode` is `transfer` (default) or `replace`. `prompt` is a Transfer direction; with
   `replace` it is refused. Leave `avatar_id` out for the brand's default avatar.
3. On yes, the same call with `confirm: true`. Read `get_video` every 20 seconds or so until
   the clip no longer shows `generating`. The swapped take then sits in the clip's place, and
   the clip's `asset_id` is the new video: `create_post` takes it as it is.

Limits of this route: the clip shows 5 to 30 s, one avatar only, standard quality only, no
Outfit and no other elements. The clip is billed on its seconds, rounded up. For a second
avatar, an Outfit, extras or another quality, cut the part out with `export_video` (its own
price) and swap the exported file with `generate_character_swap`. The export is a vertical
1080 x 1920 video in which every clip fills the frame: a wide source loses its sides.

## 7. Motion: the avatar performs the moves

A new video of the avatar's photo doing the moves of a reference video. One person, no prompt
(the tool takes none), priced per second of the motion video, so cut it to the moves first.
The tool is `generate_motion_control`:

```json
{
  "brand_id": "<brand id>",
  "inputs": { "motion_video": "<dance video asset id>" },
  "params": { "scene_control": "image" }
}
```

| `scene_control` | Background | Note |
|---|---|---|
| `video` (default) | The motion video's own setting: the avatar is placed into its first frame first | A small extra step, included in the price |
| `image` | The avatar photo's own background | For "on its own" or "in front of a plain wall" |

- The avatar keeps the clothes of its photo in both.
- A backdrop the avatar's photo does not have: make that photo first with
  `generate_photo_edit` (the `creatorline-photos` skill), then pass it as
  `inputs.character_image` with `include_avatar: false`. Two paid steps: price them together.
- Leave `character_orientation` at its default (`video`).
- Listen to the result. If the trend's sound is missing, add it in Video Studio.

## 8. Re-voice after the swap

Only for one avatar, one clear speaker and no music. After the swap succeeded,
`generate_change_voice`:

```json
{
  "brand_id": "<brand id>",
  "avatar_id": "<avatar id>",
  "inputs": { "video_url": "<the swap's output asset_id>" },
  "params": { "voice_id": "<voice_id from get_avatar>" }
}
```

Always pass `voice_id`: left out, a stock voice can be used. Price it without `confirm` like
any other run. A swap made in Video Studio (section 6) is re-voiced there instead:
`change_clip_voice` with the same `clip_id` and the `voice_id`.

## 9. Pricing a batch

A swap plus a re-voice, a cut plus a swap, or several swaps: price every item first, add them
up, and ask one yes for the total (house-rules.md, section 2).

- A swap: `generate_character_swap` without `confirm`.
- A re-voice before the swap exists: `generate_change_voice` without `confirm` and without the
  video, which answers with an estimate. Once the swap is done, call it again with the video
  and without `confirm`, check that the price matches, then confirm.
- A Video Studio swap: `swap_character_in_clip` without `confirm`.
- An export: `export_video` without `confirm` answers with its price.
