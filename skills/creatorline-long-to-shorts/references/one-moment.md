# One moment, in Video Studio

When the person knows which moment they want, or wants control the cutting tool does not give,
build the short by hand in Video Studio. Every edit and every look is free; captions and the
export each have a small fixed price, quoted and agreed first. For anything past these recipes
(layers, split screens, music), follow `creatorline-video-studio`.

## Contents

1. [Before you start](#1-before-you-start)
2. [One moment by time](#2-one-moment-by-time)
3. [A list of moments](#3-a-list-of-moments)
4. [A best-of in one video](#4-a-best-of-in-one-video)
5. [Keeping a wide shot whole](#5-keeping-a-wide-shot-whole)
6. [Polishing a finished short](#6-polishing-a-finished-short)
7. [The price and the yes](#7-the-price-and-the-yes)

## 1. Before you start

- **The recording must be a library file.** A YouTube link cannot be imported. A direct file
  link goes in with `import_asset`; a file on their device is uploaded at
  https://app.creatorline.io/assets?activeBrand=BRAND_ID (up to 100 MB), then `list_assets`.
- **Call `get_video_guide` once per conversation** before your first `create_video`. It is
  free and it is the authority on operations, fields, looks and limits: where it and this file
  disagree, it wins.
- **Times.** `trim_start` and `trim_end` are seconds of the SOURCE. "12:30" is 750,
  "1:02:15" is 3735. `start` and `end` on texts are seconds of the new video's own timeline.
- **The moment.** You cannot watch the recording. The person gives the time, or a quote with
  roughly when it is said. Start a breath before the first word of the sentence that opens
  the moment, and end half a second after its last word. When they only remember the quote,
  ask for the minute; you cannot search the speech.
- **The frame.** One 1080 x 1920 frame. A wide recording fills it by losing its sides, cropped
  at the center: a speaker off to one side may be cut. Section 5 keeps it whole.
- **Length.** A video runs up to 180 seconds.

## 2. One moment by time

1. Build it in one call (free):

   ```json
   {
     "brand_id": "BRAND_ID",
     "title": "Why your first price is too low",
     "operations": [
       { "op": "add_clip", "id": "moment", "asset_id": "SOURCE_ASSET_ID", "trim_start": 750, "trim_end": 795 },
       { "op": "add_text", "id": "headline", "text": "Why your first price is too low", "start": 0, "end": 2.5, "position": "top", "size": "l" }
     ]
   }
   ```

   The headline: a few words that name the moment's subject and pull the viewer in. About 26
   characters fit a line at the default size, fewer at `l`. Leave it out if they want only
   captions.
2. Read the answer: the clip's `start` and `end` on the timeline, and `warnings`.
3. `preview_video` with `at` at the first second, the middle and the end (free). On the live
   server a long clip may be shown by its cover frame (`exact: false`): then say so and ask
   the person to check the moment in the studio at `studio_url` before anything is paid.
4. Captions, when anyone speaks: `write_captions` with `video_id` and `style` (the same looks
   as the cutting tool), WITHOUT `confirm` for the price. After the yes (section 7), with
   `confirm: true`. Read `get_video` every 10 to 20 seconds until `captions.status` is
   `ready`, read the `lines`, and fix a mis-heard word with `edit_video` (`video_id` and
   `operations: [{ "op": "edit_caption", "index": 4, "text": "the corrected line" }]`).
5. `export_video` with `video_id`, the same price-then-yes way. Read `get_video` every 10
   seconds until `export.status` is `done`. `export.asset_id` is the finished short; post it
   with `create_post` ([posting-shorts.md](posting-shorts.md)).

Captions come after the cut is final: a trim made after them puts them over the wrong words
(`captions.status: "out_of_date"`), and hearing them again is free.

## 3. A list of moments

The person lists moments ("12:30 to 13:15, 24:00 to 24:50, the bit about refunds at 41
minutes"). Each moment is its own short: one `create_video` per moment, each with its own
headline, captions and export. Build and look at all of them first (free), quote the captions
and exports of all of them together, ask one yes for the total, then run them one after
another.

## 4. A best-of in one video

Several moments joined into one short ("the three best answers"): one `create_video` with an
`add_clip` per moment, all from the same `asset_id`, each with its own `trim_start` and
`trim_end` and its own `id`, in the order they should play. Keep the total under 180 seconds,
and under 90 for a short people finish. A headline over the first clip; a text label over each
following clip (`over` its clip id) when the subject changes. Then captions and the export as
in section 2.

## 5. Keeping a wide shot whole

Two people side by side, or a speaker far off center: put the same moment over itself as a
layer that shows the whole wide picture across the middle, while the cropped clip fills the
frame behind it.

```json
{ "op": "add_layer", "id": "wide", "asset_id": "SOURCE_ASSET_ID", "kind": "video", "over": "moment", "trim_start": 750, "fill": true, "sound": false }
```

- `trim_start` matches the clip's, so both play the same second.
- `fill: true` makes the layer as wide as the frame and centers it top to bottom. Leave
  `row`, `column` and `width` out with it: the call is refused otherwise.
- `sound: false` keeps the voice from playing twice.

Put the headline at the top and captions at the bottom, clear of the layer. Look with
`preview_video`, then ask the person to watch it in the studio before the export.

## 6. Polishing a finished short

For a short the cutting tool made. Its captions and headline are part of the picture, so:

- Do NOT `write_captions` on it: there would be two sets.
- A trim: `create_video` with `add_clip` (`asset_id` = the short) and `trim_start` /
  `trim_end` in the short's own seconds. The burned captions move with the picture, so a trim
  is safe.
- An end line ("Full episode on YouTube", the brand's call to action): `add_text` over the
  last 2 to 3 seconds, `position: "middle"`, clear of the captions at the bottom and the
  headline at the top.
- Music under a talking short competes with the voice: only when the person asks, from their
  own audio file (`set_sound`).
- Then `export_video` (paid, price first) and post the export's `asset_id`, not the original.

## 7. The price and the yes

- `get_video_guide` lists the fixed prices in `credits` (`captions`, `export`); each tool
  without `confirm` answers with its own price. Use those numbers, never ones from memory.
- Captions are charged once per video (writing them again after a change is free, and they
  are refunded when nothing is said). Every export is charged.
- One moment: quote captions and the export together, one yes, then run them in order. A list
  of moments: the same for all of them at once (house rules, section 2).
