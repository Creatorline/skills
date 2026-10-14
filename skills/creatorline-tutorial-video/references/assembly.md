# Assembly in Video Studio

How the filmed take (or takes) becomes the finished tutorial: one Video Studio project with the
clips, a title, one label per step, captions and an end text, exported to an MP4. Every edit
and preview is free; captions and the export are paid and were in the quote.

## Contents

1. [Before you start](#1-before-you-start)
2. [The text layout](#2-the-text-layout)
3. [Looks](#3-looks)
4. [One take: build, captions, labels](#4-one-take-build-captions-labels)
5. [Timing the labels from the captions](#5-timing-the-labels-from-the-captions)
6. [Step takes: build, labels, captions](#6-step-takes-build-labels-captions)
7. [Look before you export](#7-look-before-you-export)
8. [Export](#8-export)
9. [Swapping one step](#9-swapping-one-step)
10. [Changes after the result](#10-changes-after-the-result)

## 1. Before you start

- `get_video_guide` once (free): `text_looks`, `caption_styles`, the frame and the bands the
  apps cover, and `credits.captions` and `credits.export`.
- Clips come first. A text before the first clip refuses the whole call ("Add a clip first").
- Give everything you add an `id`: `take`, `hook`, `s1` to `s5`, `title`, `step1` to `step5`,
  `end`. Later operations name them.
- Read every time from the answers (`clips[].start`, `clips[].end`, `captions.lines`). Never
  add lengths up yourself.
- Read `get_video` before each new round of edits. If the person is editing the same video in
  the studio (`studio_url`), wait for them: two writers on one video undo each other.
- `create_video` is not idempotent. Before you retry one, `list_videos` with the `brand_id`
  shows whether it was made.

## 2. The text layout

| Text | Row | Look | Size | Shows |
|---|---|---|---|---|
| Title | `top` | the label look | `l` | From 0 to the start of step 1 |
| Step labels | `top` | the label look | `m` | Each from its step's start to the next step's start |
| End text | `top` | the label look | `m` | The last 2 s |
| Captions | `bottom` (from `position: "auto"`) | the caption style that goes with the label look (section 3) | | The whole video |

- One text on the top row at a time. They hand over, never overlap.
- The same look and size on every label, so they read as one system.
- Captions never go on top: that row is the labels'.
- The top row is inside the area the apps leave clear; the editor keeps texts there by itself.

## 3. Looks

| The video feels | Label look | Caption style |
|---|---|---|
| Everyday: most products, food, home, fitness | `tiktokHighlight` (words on a solid plate) | `tiktok` |
| Calm or premium: skincare, fragrance, tech | `tiktokTranslucent` (words on a see-through dark box) | `minimal` |
| Loud, high energy | `tiktokOutline` (white words with a dark edge) | `hormozi` |

Pick one row per video and keep it for every label and the captions. Check each value against
`text_looks` and `caption_styles` in the guide before you use it. The person asked for a look:
theirs wins.

## 4. One take: build, captions, labels

1. Build:

   ```
   create_video {
     brand_id: <brand>,
     title: "Glow C serum: 4 steps",
     operations: [ { op: "add_clip", asset_id: <the take's asset id>, id: "take" } ]
   }
   ```

   The clip keeps its sound: it carries the voice.
2. Captions: `write_captions` with `video_id`, the `style` from section 3 (the serum example
   reads calm: `minimal`), `position: "auto"` and no `confirm`. The price matches the quote:
   call again with `confirm: true`. It does not: ask.
3. Say "Writing the captions." and read `get_video` about every 20 s until `captions.status`
   is `ready`.
4. Read `captions.lines` against the script. A misheard word: `edit_video` with
   `{ op: "edit_caption", index: <line>, text: "<right words>" }` (free).
5. Time the labels (section 5). Then one `edit_video` call adds every text:

   ```json
   [
     { "op": "add_text", "id": "title", "text": "Glow C serum\nin 4 steps", "start": 0, "end": 2.9, "position": "top", "look": "tiktokTranslucent", "size": "l" },
     { "op": "add_text", "id": "step1", "text": "Step 1: Dry skin", "start": 2.9, "end": 6.4, "position": "top", "look": "tiktokTranslucent", "size": "m" },
     { "op": "add_text", "id": "step2", "text": "Step 2: Two drops", "start": 6.4, "end": 10.1, "position": "top", "look": "tiktokTranslucent", "size": "m" },
     { "op": "add_text", "id": "step3", "text": "Step 3: Press in", "start": 10.1, "end": 13.8, "position": "top", "look": "tiktokTranslucent", "size": "m" },
     { "op": "add_text", "id": "step4", "text": "Step 4: Let it settle", "start": 13.8, "end": 17.6, "position": "top", "look": "tiktokTranslucent", "size": "m" },
     { "op": "add_text", "id": "end", "text": "Save this for later", "start": 17.6, "end": 20, "position": "top", "look": "tiktokTranslucent", "size": "m" }
   ]
   ```

   The times above are an example; yours come from section 5. Each text ends where the next
   one starts. An `end` past the video's end is cut to it (the `note` in `applied` says so).
   Texts do not change the captions, so the captions stay `ready`.

## 5. Timing the labels from the captions

The writer lands each cut near the planned second, not on it. The spoken words are the true
clock, and every step's line opens with its own order word (steps-and-script.md, section 8).

1. Walk `captions.lines` in order. Step k starts in the first line after step k-1's start
   that holds step k's order word (ignore case and punctuation). The writer may reword a line
   a little: when the order word is gone, look for the words of the step's heading or its
   amount ("two drops") instead.
2. Where in the line: the order word opens the line, so the step starts at the line's
   `start`. It sits further in: start + (words before it / words in the line) x (end - start).
   Three words before it in a line of eight: three eighths of the way.
3. Each switch on the top row happens 0.2 s before the spoken start, so the label is up as
   the step begins. Call that moment cut k (step k's start minus 0.2, never below 0), and cut
   V for the verdict (the start of the line with the verdict's first words, minus 0.2).
4. The title runs from 0 to cut 1. Label k runs from cut k to cut k+1. The last label runs
   to cut V, and the end text from cut V to the video's end. Each text ends exactly where the
   next one starts, so two never share the row.
5. Less than 1.5 s for the end text: drop it and run the last label to the end. Less than
   1.2 s for the title: drop it.
6. Every label shows for at least 1.5 s. Round times to the hundredth.
7. An order word you cannot find (misheard, or the line came out different): look in the lines
   around where it should be. Still nothing: put that label halfway between its neighbours and
   look at that moment with `preview_video`.

The person did not want captions: time the labels from the plan instead (the hook's seconds,
then each step's planned seconds), and tell them in one line that a label may sit a beat off
and can be dragged in the studio. For exact labels without captions, film step takes.

## 6. Step takes: build, labels, captions

1. Build with the clips in order, then the title and the labels, each `over` its clip:

   ```json
   [
     { "op": "add_clip", "asset_id": "<hook take>", "id": "hook" },
     { "op": "add_clip", "asset_id": "<step 1 take>", "id": "s1" },
     { "op": "add_clip", "asset_id": "<step 2 take>", "id": "s2" },
     { "op": "add_clip", "asset_id": "<step 3 take>", "id": "s3" },
     { "op": "add_text", "id": "title", "text": "Hair oil\nin 3 steps", "over": "hook", "position": "top", "look": "tiktokHighlight", "size": "l" },
     { "op": "add_text", "id": "step1", "text": "Step 1: One pump", "over": "s1", "position": "top", "look": "tiktokHighlight", "size": "m" },
     { "op": "add_text", "id": "step2", "text": "Step 2: Warm in palms", "over": "s2", "position": "top", "look": "tiktokHighlight", "size": "m" },
     { "op": "add_text", "id": "step3", "text": "Step 3: Ends only", "over": "s3", "position": "top", "look": "tiktokHighlight", "size": "m" }
   ]
   ```

2. End text: read the video's `duration` from the answer. Then `edit_video`:
   `{ op: "update_text", id: "step3", end: <duration - 2> }` and
   `{ op: "add_text", id: "end", text: "Save this for later", start: <duration - 2>, end: <duration>, position: "top", look: "tiktokHighlight", size: "m" }`.
3. One voice, when the takes sound different (each take is its own render): offer to give
   every clip the avatar's own voice. `run_video_ai` with `video_id`, `action:
   "change_voice"`, the clip's `clip_id` and the avatar's `voice_id` (from `get_avatar`), one
   call per clip. Price them all without `confirm`, ask one yes for the total, then run them
   with `confirm: true`. Read `get_video` every 20 s or so until no clip is `generating`. Do
   this before the captions: a changed clip puts captions out of date.
4. Captions as in section 4, steps 2 to 4.
5. Optional tightening, once the captions are ready: a clip whose first line starts more than
   0.8 s after the clip does opens on a pause. `update_clip` with `trim_start` so the speech
   begins about 0.3 s in. A trim does not move texts: put the title and each label back with
   `{ op: "update_text", id: "stepK", over: "sK" }`, then set the last label's end and the end
   text again as in step 2, from the new `duration`. Then `write_captions` again (free) and
   check the lines.

## 7. Look before you export

- `preview_video` with `video_id`, `at` (the middle of the title, of each label and of the end
  text; up to 9 moments) and `show_safe_area: true`.
- Check: each label reads in one line; one text at a time on the top row; nothing a viewer must
  read in the shaded bands; the captions' row clear of the labels; each label over the step it
  names.
- A label crosses the face in a close shot: keep it on the top row and change the look of
  every label to `tiktokTranslucent` (when it is not already), or the size to `s`. Never move
  labels into the captions' row.
- The answer says `exact: false`: some clips are drawn from their cover frame. Judge layout and
  words only; tell the person to watch the action in the video.
- `get_video`: `ready_to_export` is true and `warnings` is empty. "Nothing is heard": a clip's
  sound is off; `update_clip` with `id` and `sound: true`.

## 8. Export

1. `export_video` with `video_id` and no `confirm`. The price matches the quote: call again
   with `confirm: true`. It does not: ask.
2. Say "Exporting the final video." and read `get_video` every 10 to 30 s until
   `export.status` is `done` (`failed`: refunded; say so and ask before trying again).
3. `export.url` is the MP4 (the link expires). `export.asset_id` is the file for `create_post`.
   `studio_url` is the project.
4. Any edit after the export makes it out of date (`up_to_date: false`). A new export is
   charged again: quote it first.

## 9. Swapping one step

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
4. `write_captions` again (free: the clips changed) and check the lines. The new line is cut
   short: lengthen the clip with `update_clip` and `trim_end`, then re-time the labels after
   it from the new `captions.lines` (section 5). Preview, then export again (quote it).

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

## 10. Changes after the result

| The person asks | Do | Paid? |
|---|---|---|
| Other words or timing on a label | `update_text` with `text`, `start`, `end` | Edit free; the new export is charged |
| A wrong caption word | `edit_caption` | Edit free; the new export is charged |
| Another caption style | `set_captions` with `style` | Edit free; the new export is charged |
| Another label look | `update_text` with `look` on every label | Edit free; the new export is charged |
| Remove the title or the end text | `remove_text` | Edit free; the new export is charged |
| A step re-filmed | Section 9 | Yes |
| Another hook, or another order of steps | A new take of the whole tutorial, put in the same video with `replace_clip` (the captions stay paid), labels re-timed (section 5) | Yes: the take and the new export |

Quote every paid change and wait for a yes. Then show the new card.
