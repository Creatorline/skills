# Assembly in Video Studio

How the filmed take (or takes) becomes the finished tutorial: one Video Studio project with the
clips, one label per step, the end text, and the extra text the person chose, exported to an
MP4. Every edit and preview is free; captions and the export are paid and were in the quote.

## Contents

1. [Before you start](#1-before-you-start)
2. [The text layout](#2-the-text-layout)
3. [The label look by category](#3-the-label-look-by-category)
4. [Extra text: the four choices](#4-extra-text-the-four-choices)
5. [One take: build, clock, labels](#5-one-take-build-clock-labels)
6. [Timing the labels from the captions](#6-timing-the-labels-from-the-captions)
7. [Step takes: build, labels, captions](#7-step-takes-build-labels-captions)
8. [Look before you export](#8-look-before-you-export)
9. [Export](#9-export)
10. [Swapping one step](#10-swapping-one-step)
11. [Changes after the result](#11-changes-after-the-result)

## 1. Before you start

- `get_video_guide` once (free): `text_looks`, `caption_styles`, the frame and the bands the
  apps cover, and `credits.captions` and `credits.export`.
- Clips come first. A text before the first clip refuses the whole call ("Add a clip first").
- Give everything you add an `id`: `take`, `s1` to `s12`, `step1` to `step12`, `hook`, `end`.
  Later operations name them.
- Read every time from the answers (`clips[].start`, `clips[].end`, `captions.lines`). Never
  add lengths up yourself.
- Read `get_video` before each new round of edits. If the person is editing the same video in
  the studio (`studio_url`), wait for them: two writers on one video undo each other.
- `create_video` is not idempotent. Before you retry one, `list_videos` with the `brand_id`
  shows whether it was made.

## 2. The text layout

| Text | Where | Shows |
|---|---|---|
| Step labels | `position: "top"`, size `m`, one look | Label 1 from the first frame; each label until the next step starts; the last one to the end |
| Hook text (only when chosen) | Just under the labels: `y: 0.21` under one-line labels, `y: 0.26` under two-line ones | Over step 1 only, in capitals |
| End text | `position: "bottom"` when there are no captions (the pointing hand aims at it); the top row, taking over from the last label, when there are captions | The last second |
| Captions (only when chosen) | The bottom row (`position: "auto"`) | The whole video |

- One text on the top row at a time. They hand over, never overlap.
- The same look, size and place for every label, so they read as one set.
- A label that would cross the face: move EVERY label to `position: "bottom"` when there are no
  captions. With captions, keep the labels on top and set every label to size `s`. Labels on
  the bottom row: the end text takes that row over from the last label for the last second
  (the last label ends where it starts), and the hook text moves to `position: "top"`.
- Texts stay inside the area the apps leave clear by themselves.

## 3. The label look by category

Our looks are white words. Pick the one closest to the category's style and keep it for every
label, the hook text and the end text:

| Category | The style that fits | Look |
|---|---|---|
| Skincare, luxury beauty | Editorial, refined | `instagram` |
| Fragrance | Refined, thin, elegant | `instagram` |
| Colour cosmetics | Modern | `tiktokText` |
| Tech | Geometric | `snapchat` |
| Fitness, supplements | Bold, in capitals | `tiktokOutline`, the label written in capitals |
| Food | Warm, rounded | `tiktokHighlight` |
| Coffee, artisan goods | Warm | `instagram` |
| Fashion | Minimal | `instagram` |
| Home | Light | `instagram` |
| Not sure | Clean, neutral | `tiktokText` |

- `instagram` and `tiktokText` are bare words with a soft shadow: right over a busy scene. On a
  bright, clean scene where white words wash out, use `tiktokTranslucent` (white words on a
  see-through dark box) for every label instead.
- Check each value against `text_looks` in the guide before you use it. The person asked for a
  look: theirs wins.
- Captions, when chosen, use `hormozi` (bold capitals at the bottom).

## 4. Extra text: the four choices

The labels are always there. Anything more is the person's choice, asked once at the end of
intake when they have not said:

| Choice | On the video | Captions written? |
|---|---|---|
| None (default) | Labels and end text | Yes, as the clock, then removed before the export |
| Captions | Labels, end text, captions at the bottom | Yes, kept |
| Hook | Labels, end text, a hook line under the step 1 label | Yes, as the clock, then removed |
| Both | Labels, end text, hook line, captions | Yes, kept |

The captions are written in every case because their timing is what puts each label on its
step. They are paid once per video (`credits.captions`), so they are in every quote; say so in
one line ("the captions pass times the labels"). Removed captions can come back later at no
charge: `write_captions` again on the same video.

## 5. One take: build, clock, labels

1. Build:

   ```
   create_video {
     brand_id: <brand>,
     title: "Glow C serum: 4 steps",
     operations: [ { op: "add_clip", asset_id: <the take's asset id>, id: "take" } ]
   }
   ```

   The clip keeps its sound: it carries the voice.
2. Captions: `write_captions` with `video_id`, `style: "hormozi"`, `position: "auto"` and no
   `confirm`. The price matches the quote: call again with `confirm: true`. It does not: ask.
3. Say "Timing the steps." and read `get_video` about every 20 s until `captions.status` is
   `ready`.
4. **The first word within 0.4 s.** The first line's `start` is later than 0.4: one
   `edit_video` with `{ op: "update_clip", id: "take", trim_start: <that start - 0.3> }`, then
   `write_captions` again (free, no approval) and wait for `ready`.
5. Captions staying (Captions or Both): read `captions.lines` against the script and fix a
   misheard word with `{ op: "edit_caption", index: <line>, text: "<right words>" }` (free).
   The product's name and every number first; numbers as digits.
6. Time the labels (section 6). Then one `edit_video` call adds every text, and ends with
   `{ op: "remove_captions" }` when the choice is None or Hook:

   ```json
   [
     { "op": "add_text", "id": "step1", "text": "Step 1 – Dry Skin", "start": 0, "end": 3.3, "position": "top", "look": "instagram", "size": "m" },
     { "op": "add_text", "id": "step2", "text": "Step 2 – Lift the Dropper", "start": 3.3, "end": 7.2, "position": "top", "look": "instagram", "size": "m" },
     { "op": "add_text", "id": "step3", "text": "Step 3 – Two Drops", "start": 7.2, "end": 11.4, "position": "top", "look": "instagram", "size": "m" },
     { "op": "add_text", "id": "step4", "text": "Step 4 – Press In", "start": 11.4, "end": 15, "position": "top", "look": "instagram", "size": "m" },
     { "op": "add_text", "id": "end", "text": "Link in bio", "start": 14, "end": 15, "position": "bottom", "look": "instagram", "size": "m" },
     { "op": "remove_captions" }
   ]
   ```

   The times above are an example; yours come from section 6. An `end` past the video's end is
   cut to it (the `note` in `applied` says so).

## 6. Timing the labels from the captions

Our writer lands each cut near the planned second, not on it. The spoken words are the true
clock, and every step after the first carries its own cue word (steps-and-script.md,
section 8).

1. Walk `captions.lines` in order. Step k (k from 2) starts in the first line after step k-1's
   start that holds step k's cue word (ignore case and punctuation). The take may reword a line
   a little: when the cue word is gone, look for the words of the step's heading or its amount
   ("two drops") instead.
2. Where in the line: the cue word opens the line, so the step starts at the line's `start`.
   Further in: start + (words before it / words in the line) x (end - start). Three words
   before it in a line of eight: three eighths of the way.
3. Each label switches 0.2 s before its step is heard, so it is up as the step begins: cut k =
   step k's start minus 0.2.
4. Label 1 runs from 0 to cut 2; label k from cut k to cut k+1; the last label to the video's
   end. Each text ends exactly where the next one starts.
5. End text: the last second (from the video's `duration` minus 1 to the end). With captions
   it takes the top row, so the last label ends where it starts; without, it sits on the
   bottom row and the last label stays to the end.
6. Hook text (Hook or Both): from 0 to cut 2, at the `y` in section 2.
7. Every label shows for at least 1.5 s. Round times to the hundredth.
8. A cue word you cannot find (misheard, or the line came out different): look in the lines
   around where it should be. Still nothing: put that label halfway between its neighbours and
   look at that moment with `preview_video`.

The person said no to captions even as a clock (they will not pay for them): time the labels
from the plan instead (each step's planned seconds), and tell them in one line that a label
may sit a beat off and can be dragged in the studio.

## 7. Step takes: build, labels, captions

For steps filmed one take each (steps-and-script.md, section 12).

1. Build with the clips in order, then each label `over` its clip:

   ```json
   [
     { "op": "add_clip", "asset_id": "<step 1 take>", "id": "s1" },
     { "op": "add_clip", "asset_id": "<step 2 take>", "id": "s2" },
     { "op": "add_clip", "asset_id": "<step 3 take>", "id": "s3" },
     { "op": "add_clip", "asset_id": "<step 4 take>", "id": "s4" },
     { "op": "add_text", "id": "step1", "text": "Step 1 – One Pump", "over": "s1", "position": "top", "look": "tiktokHighlight", "size": "m" },
     { "op": "add_text", "id": "step2", "text": "Step 2 – Warm in Palms", "over": "s2", "position": "top", "look": "tiktokHighlight", "size": "m" },
     { "op": "add_text", "id": "step3", "text": "Step 3 – Ends Only", "over": "s3", "position": "top", "look": "tiktokHighlight", "size": "m" },
     { "op": "add_text", "id": "step4", "text": "Step 4 – Smooth Down", "over": "s4", "position": "top", "look": "tiktokHighlight", "size": "m" }
   ]
   ```

2. End text: read the video's `duration` from the answer, then
   `{ op: "add_text", id: "end", text: "Link in bio", start: <duration - 1>, end: <duration>, position: "bottom", look: "tiktokHighlight", size: "m" }`
   (with captions: on the top row, and `update_text` on the last label to end at
   `<duration - 1>`).
3. One voice, when the takes sound different (each take is its own render): offer to give
   every clip the avatar's own voice. `run_video_ai` with `video_id`, `action:
   "change_voice"`, the clip's `clip_id` and the avatar's `voice_id` (from `get_avatar`), one
   call per clip. Price them all without `confirm`, ask one yes for the total, then run them
   with `confirm: true`. Read `get_video` every 20 s or so until no clip is `generating`. Do
   this before the captions: a changed clip puts captions out of date.
4. Captions as in section 5, steps 2 to 5 (a clip whose first line starts more than 0.4 s in:
   `update_clip` with `trim_start`, then put each label back with
   `{ op: "update_text", id: "stepK", over: "sK" }`, then `write_captions` again, free).
5. The choice is None or Hook: `remove_captions` before the export.

## 8. Look before you export

- `preview_video` with `video_id`, `at` (the middle of each label, the hook text, the end text;
  up to 9 moments a call) and `show_safe_area: true`.
- Check: each label reads, all labels wrap alike; one text at a time on the top row; nothing a
  viewer must read in the shaded bands; the captions' row clear of the labels; each label over
  the step it names.
- **Real frames.** When the answer says `exact: true`, the frames are the footage itself. Call
  it again at the middle of each step and at two or three moments mid-sentence, and check: the
  right hand action for that step, one product, no more than two hands, the cap and the state
  consistent from step to step, the product the same size, a clean face and mouth, no text in
  the picture except the product's own label. A step that fails: swap only that step
  (section 10).
- **Cover frames.** When it says `exact: false`, clips are drawn from their cover frame. Judge
  layout and words only, and ask the person to watch the action in the studio.
- `get_video`: `ready_to_export` is true and `warnings` is empty. "Nothing is heard": a clip's
  sound is off; `update_clip` with `id` and `sound: true`.

## 9. Export

1. `export_video` with `video_id` and no `confirm`. The price matches the quote: call again
   with `confirm: true`. It does not: ask.
2. Say "Exporting the final video." and read `get_video` every 10 to 30 s until
   `export.status` is `done` (`failed`: refunded; say so and ask before trying again).
3. `export.url` is the MP4 (the link expires). `export.asset_id` is the file for `create_post`.
   `studio_url` is the project.
4. Any edit after the export makes it out of date (`up_to_date: false`). A new export is
   charged again: quote it first.

## 10. Swapping one step

**One take.**

1. Film that step alone: a 4 to 6 s `ugc-video` take with the step-take brief
   (steps-and-script.md, section 12), the same Product, Setting and Wardrobe words. Quote it
   and wait for a yes.
2. One `edit_video` call with `{ op: "split_clip", at: <the step's start> }` and then
   `{ op: "split_clip", at: <the step's end> }` (each cut at least 0.3 s from a clip's
   edge). The first split's new clip is the step: its id is that operation's `id` in
   `applied`.
3. A second `edit_video` call: `{ op: "replace_clip", id: <that clip>, asset_id: <the new
   take> }`. It keeps its place, and its length when the new take is long enough, so the
   labels stay where they were. Give the new take the same line and a length close to the old
   part, so nothing said is cut off.
4. `write_captions` again (free: the clips changed; if they were removed, still free) and
   check the lines. The new line is cut short: lengthen the clip with `update_clip` and
   `trim_end`, then re-time the labels after it from the new `captions.lines` (section 6).
   Remove the captions again if the choice was None or Hook. Preview, then export again (quote
   it).

**Step takes.** Re-film that take with the same brief and one change, then `replace_clip` on
its clip.

**The same step fails twice.** Make a still of the avatar mid-step with `create_generation`,
tool `photo-edit` (the product in `other_elements`, the brief says what the hands hold). Then
animate it with tool `photo-to-video`: read its slots with `list_models` and `tool:
"photo-to-video"`, put the still in the first-frame slot, and write only what moves in one
continuous take, no cuts. Swap it in as above. Two paid runs: quote both together, the
animation with `estimate_generation_cost` while the still does not exist yet; before
starting it, call `create_generation` without `confirm` once more and ask again only if the
price moved.

## 11. Changes after the result

| The person asks | Do | Paid? |
|---|---|---|
| Other words or timing on a label | `update_text` with `text`, `start`, `end` | Edit free; the new export is charged |
| Captions on after all | `write_captions` (free on this video), wait, then `set_captions` if needed | The new export is charged |
| Captions off | `remove_captions` | The new export is charged |
| Another caption style | `set_captions` with `style` | Edit free; the new export is charged |
| Another label look | `update_text` with `look` on every label | Edit free; the new export is charged |
| Remove the hook text or the end text | `remove_text` | Edit free; the new export is charged |
| A step re-filmed | Section 10 | Yes |
| Another opener, or another order of steps | A new take of the whole tutorial, put in the same video with `replace_clip` (captions stay paid), labels re-timed (section 6) | Yes: the take and the new export |

Quote every paid change and wait for a yes. Then show the new card.
