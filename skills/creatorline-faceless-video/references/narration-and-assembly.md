# Narration and assembly

The block grid, the narration lines, the price of the whole video, and how it is built in the
Video Studio for each picture mode: Animated, Picture story and Stock footage. Tool and field
names are the connector's; `get_video_guide` lists every operation and limit.

## Contents

1. [The block grid](#1-the-block-grid)
2. [Narration lines](#2-narration-lines)
3. [The narrator voice](#3-the-narrator-voice)
4. [Pricing the whole video](#4-pricing-the-whole-video)
5. [Animated: the still cut](#5-animated-the-still-cut)
6. [Narrating, measuring and centring](#6-narrating-measuring-and-centring)
7. [Animated: putting the motion in](#7-animated-putting-the-motion-in)
8. [Picture story: narration first, then the frames](#8-picture-story-narration-first-then-the-frames)
9. [Stock footage](#9-stock-footage)
10. [Texts, music and reactions](#10-texts-music-and-reactions)
11. [Captions](#11-captions)
12. [Export and the cover](#12-export-and-the-cover)
13. [Pitfalls](#13-pitfalls)

## 1. The block grid

- **N blocks of exactly 10 seconds**: N is the length in seconds divided by 10, rounded half up,
  at least 3 and at most 18 (the Video Studio holds 180 seconds). The video is N x 10 seconds,
  fixed: it is never shortened to fit a short line or stretched for a long one.
- **One narration line per block**, centred in its block (section 6), so sync holds by
  construction and no line runs into the next scene.
- **Animated and Stock footage: 5 shots of 2 seconds per block.** No shot runs over 2.5
  seconds: a hold of 3 to 5 seconds reads as a slideshow. A shot that cannot be made drops out
  and its block becomes 4 shots of 2.5 seconds; never drop a whole block.
- **Shot ids** say where they sit: `b1s1` to `b1s5` for block 1, `b2s1` for block 2, and so on.
- **Picture story** has no shot grid: one continuous narration, and the frames follow its words
  (section 8).

## 2. Narration lines

- **20 to 23 words per block, at most two sentences.** Block 1 opens with a sentence of 8 words
  or fewer ([formats.md](formats.md), section 2).
- **Few commas and full stops.** The voice pauses about 0.7 seconds at a full stop and 0.5 at a
  comma: one flowing clause fits where three clipped sentences run long and sound halting.
- **Numbers written as words**, the way they are said: "eighteen eighty-three", "about two
  hundred". No digits.
- **No run of five or more words repeated** anywhere in the script.
- **Only the words that are said.** No timecodes, no stage directions, no parentheses, never "in
  this video". The voiceover's `text` is read exactly as written.
- **Feelings** are tags in the words (`get_video_guide` `voiceover_feelings`: `[whispers]`,
  `[pauses]`, `[excited]`, `[cheerfully]`, `[curious]`, `[sad]`, `[sighs]`, `[laughs]`). They
  stay in English in any language. A performed one (a laugh, a sigh, a pause) takes about a
  second: count it as two or three words. One or two per video at most; the mood lives in the
  words, never in switching voices.
- **What the take must measure:** 7.8 to 9.5 seconds of speech, at most about 2.9 words a
  second, no pause of 0.8 seconds or more inside the line (section 6).
- A voiceover reads in the language its words are written in: the brand's `language` unless the
  person asked for another. One voiceover holds up to 2,000 characters.

## 3. The narrator voice

- **One voice for every line.** Pass the same `voice_id` on every `add_voiceover`. Left out, the
  voiceover uses the brand's own voice: its default avatar's, else the brand's, else a stock
  default. A take that comes back in another voice counts as failed.
- The voice is picked in the intake ([intake.md](intake.md), section 3). For a language the
  workspace voices do not cover: `list_voices` with `scope: "library"` and `language` (such as
  `tr`).
- `add_voiceover` takes only the words: there is no field for how to say them. Choose the voice
  for the delivery the format wants, and let the words carry the mood.
- Never make voice samples, never describe a voice beyond its own `description`, and never ask
  again once it is picked. If its first use fails, look it up again by name.

## 4. Pricing the whole video

Quote every part without starting anything, add it up, and ask one yes (house rules,
section 2). Call `get_video_guide` once for the voiceover, captions and export prices.

**Animated**, a 1 min video (6 blocks, 30 shots):

| Part | Call, without `confirm` | Count |
|---|---|---|
| Look reference | `create_generation` `{ tool: "text-to-photo", brand_id, prompt, params: { aspect_ratio: "2:3" } }` | 1 |
| Roster and shot pictures | `create_generation` `{ tool: "photo-edit", brand_id, include_avatar: false, inputs, params: { aspect_ratio: "2:3" }, prompt }` for one; the others cost the same | roster + 30 |
| Motion | `estimate_generation_cost` `{ tool: "photo-to-video", model: "google-gemini-omni-flash-image-to-video", params: { duration: 3 } }` | 30 |
| Narration | `credits.voiceover`, plus up to 2 retakes for lines that run long or short, charged only if used | 6 + 2 |
| Captions, export | `credits.captions`, `credits.export` | 1 each |
| Cover (when yes) | the cover's own quote (`creatorline-cover-image`) | 1 |

**Picture story:** the look reference, the roster, the frames (plan on one frame per second of
narration, never fewer than the seconds divided by 1.5; each costs one `photo-edit`), the
narration (one voiceover per 2,000 characters, plus one retake), captions, export, cover.

**Stock footage:** only the narration (with its retakes), captions, export and the cover.

For the same length, Animated costs about two to three times Picture story, and Stock footage
costs least. Say so when the person weighs them.

> A 1-minute history short in the Editorial collage look: six blocks, thirty animated shots,
> narrated by <voice name>, captions on, a cover.
> - Pictures (look reference, 9 roster pictures, 30 shots): <a> credits
> - Motion for 30 shots: <b> credits
> - Narration, six lines, and up to two retakes if needed: <c> credits
> - Captions, export and cover: <d> credits
>
> Total <N> credits (at most); you have <M>. Go ahead?

The yes covers exactly these parts. A retry of a run that FAILED is covered (it was refunded and
is charged once, when it succeeds). A redo of a run that succeeded, another look, an extra block
or a longer video is quoted again first.

## 5. Animated: the still cut

Once the shot pictures are ready, build the video from them, free, so the narration can go on
before any motion is paid for:

```json
{
  "brand_id": "<brand id>",
  "title": "The lighthouse that never went dark",
  "operations": [
    { "op": "add_clip", "asset_id": "<shot picture>", "id": "b1s1", "duration": 2 },
    { "op": "add_clip", "asset_id": "<shot picture>", "id": "b1s2", "duration": 2 },
    { "op": "add_clip", "asset_id": "<shot picture>", "id": "b1s3", "duration": 2 },
    { "op": "add_clip", "asset_id": "<shot picture>", "id": "b1s4", "duration": 2 },
    { "op": "add_clip", "asset_id": "<shot picture>", "id": "b1s5", "duration": 2 },
    { "op": "set_all_clips_sound", "sound": false }
  ]
}
```

- Every block in order, 5 clips of 2 seconds (or 4 of 2.5). Muting every clip now keeps the
  motion takes muted when they replace the pictures.
- At most 60 operations per call: a 2 min video (60 shots) is `create_video` with the first
  blocks, then `edit_video` with the rest and `set_all_clips_sound` last.
- Keep the video's `id` and `studio_url`. "Nothing is heard" in `warnings` is expected until the
  narration is on.

## 6. Narrating, measuring and centring

1. **Every line, in block order:** `add_voiceover` with `video_id`, `text`, `voice_id`,
   `start: <10 x (k - 1)>` for block k, `wait_seconds: 0`, `confirm: true`. Keep each
   `voiceover_id`.
2. **Wait:** `get_video` every 10 to 20 seconds until every voiceover is `ready`. A voiceover
   that failed is gone from `voiceovers` and was refunded: add that line again.
3. **Measure each take:** its length is `end - start`; its rate is its words divided by that.

   | Length | Verdict |
   |---|---|
   | 7.8 to 9.5 s, rate at most about 2.9 words a second | Pass. A passing take is never redone |
   | 7.2 to 7.8 s | Retake once with a line two or three words longer; then accept |
   | Under 7.2 s or over 9.5 s | Rewrite the line (longer, or shorter and with fewer stops) and retake |

   A retake is `add_voiceover` with `replace_id`, the rewritten `text` and the same `voice_id`.
   At most 3 attempts per line, with the words changed before the third. Still outside after
   that: stop and tell the person which line, its lengths, and what you changed; never keep the
   nearest failing take. Retakes beyond the quoted allowance are quoted first.
4. **Centre each line in its block:** `move_voiceover` with `start` =
   `10 x (k - 1) + (10 - length) / 2`, to the hundredth. Read every length from `get_video`;
   never estimate it.
5. **Check:** every voiceover inside its own block, nothing past the end, no `warnings`.

The pause and the words are checked later from the captions (section 11).

## 7. Animated: putting the motion in

1. Start every shot's motion run ([visual-style.md](visual-style.md), section 10) with
   `confirm: true`, one after another without waiting. Runs past the workspace's parallel limit
   show `queued` and start on their own.
2. `get_generation` with `wait_seconds: 45` on each until `succeeded`; its `output[0].asset_id`
   is the moving shot.
3. `edit_video` with one `replace_clip` per finished shot (many in one call is fine):
   `{ "op": "replace_clip", "id": "b3s2", "asset_id": "<moving shot>" }`. The clip keeps its
   place, its 2 seconds and its silence. When a take is still for its first half second, add
   `{ "op": "update_clip", "id": "b3s2", "trim_start": 0.5, "trim_end": 2.5 }`.
4. The blocks keep their lengths, so the voiceovers stay centred. If an `applied` note says the
   new media is shorter, read the clip's new length: put that shot's picture back, or slow it
   with `update_clip` `speed` (not below 0.75).
5. A shot whose motion cannot be made after the retry ladder ([checks.md](checks.md), section 6)
   drops out: `remove_clip` it and set the other shots of its block to 2.5 seconds, so the block
   still runs 10.

## 8. Picture story: narration first, then the frames

The person reviews the narration first, then the pictures.

1. **One continuous narration**, written in paragraphs. Over 2,000 characters: split at a
   paragraph end into two voiceovers, the second starting where the first ends.
2. **A placeholder cut:** `create_video` with the roster's place pictures as clips whose
   `duration`s add up to the estimated narration length plus 2 seconds (each at most 30), then
   `set_all_clips_sound` false.
3. **Record:** `add_voiceover` with `start: 0` (and the second at the first one's `end`),
   `confirm: true`; `get_video` until `ready`. The real length sets the video's length.
4. **The timeline:** `write_captions` (`confirm: true`, charged once); `get_video` every 20
   seconds until `captions.status` is `ready`. Each line of `captions.lines` has a `start`, an
   `end` and the words heard. Check them against the script (section 11) before going on.
5. **Frame slots:** walk the lines in order. A line up to 1.2 seconds is one frame; a longer
   line is split into equal frames of 0.7 to 1.2 seconds. A gap after a line goes to the frame
   before it. The first frame starts at 0; the last runs to the narration's end plus 0.5. Mark
   which slots are new framings (the action or the place changes) and which are variations.
6. **Frames, in waves** ([visual-style.md](visual-style.md), section 11). Keep each frame's slot
   number with its asset id: frames are placed by their slot, never by the order they finished.
7. **Assemble:** `edit_video` removing the placeholders and adding every frame in slot order with
   ids `f001`, `f002`, ... and its slot's `duration`. At most 60 operations per call, so several
   calls, always in order.
8. `write_captions` again when the frames are in (free): they were heard before the cut changed.

## 9. Stock footage

- Per shot: `list_stock_clips` with `library: "hooks"` and a `search` of one to three plain
  words of what the shot shows (`walking park`, `gym`, `laptop`, `beach sunset`). Read `title`,
  `tags` and `duration`; look with `preview_assets` `stock_ids`.
- In `create_video`: `{ "op": "add_clip", "stock_id": "<id>", "id": "b1s1", "trim_start": 0.5,
  "trim_end": 2.5 }` for a 2-second shot, five per block, then `set_all_clips_sound` false.
- Narrate, measure and centre as in section 6.
- A block stock cannot show is rewritten to something it can ([visual-style.md](visual-style.md),
  section 12).

## 10. Texts, music and reactions

Add texts once the clips are final: texts stay at fixed times when clips change.

- **Title** over the first shot, 3 to 6 words: `{ "op": "add_text", "text": "The lighthouse
  that never went dark", "over": "b1s1", "position": "top", "size": "l" }`. About 26 characters
  fit a line at size `m`, fewer at `l`. For a whole block, use `start` and `end` (10 seconds).
- **Top-N labels**, the same `look` and `size` on each: `{ "op": "add_text", "text": "3. The
  Sahara", "start": 10, "end": 20, "position": "top", "look": "tiktokHighlight", "size": "m" }`.
- **A call to action**, never spoken: `{ "op": "add_text", "text": "Follow for part two",
  "over": "b6s5", "position": "middle" }`.
- **Music** only from the brand's library: `list_assets` with `brand_id` and
  `file_type: "audio"`, then `{ "op": "set_sound", "asset_id": "<track>" }`. It plays under the
  whole video and drops to a quarter of its level while the narration speaks: louder than a bed
  should sit, so choose a quiet instrumental with no words (Fairy tale and myth: soft strings,
  harp or a music box, no drums). There is no music to make here; with no track, say so in one
  line and deliver without one.
- **One reaction** for an explainer or a top-N: `list_stock_clips` with `library:
  "green_screen"` and `search: "shocked cat"`, then `{ "op": "add_layer", "stock_id": "<id>",
  "start": 30, "end": 32, "width": 0.45, "column": "right", "row": "middle", "sound": false }`.
  Check it clears the apps' covered bands with `preview_video` `show_safe_area: true`.

## 11. Captions

- `write_captions` with `video_id`, the look's `style` ([formats.md](formats.md), section 1),
  `position: "auto"`, `confirm: true`, once the clips and voiceovers are final. `get_video` every
  20 seconds until `captions.status` is `ready`. Every style shows 4 or 5 words a line, at the
  bottom, clear of the subject.
- **The timing comes from hearing the final audio; the words come from the script.** Read
  `captions.lines` against the script and correct every name, number and spelling with
  `{ "op": "edit_caption", "index": <n>, "text": "..." }`.
- **The lines are also the check that each take said its own line.** A block whose words are
  missing, or another block's words in its place, fails the narration gate: retake it
  (section 6). A gap of 0.8 seconds or more between two lines inside one block is a pause to
  remove: rewrite that line with fewer stops and retake it.
- Change the look or the place later for free: `{ "op": "set_captions", "style": "sticker" }`.
- Clips changed after captions: `captions.status` is `out_of_date`; `write_captions` again when
  the cut is final (free, no yes needed).

## 12. Export and the cover

- `export_video` with `video_id` and `confirm: true` when `ready_to_export` is true and there
  are no `warnings`. `get_video` every 15 seconds until `export.status` is `done`.
  `export.asset_id` goes to `create_post`; `export.url` is the MP4. Any edit after it makes
  `up_to_date` false, and a new export is charged again. Deliver the video as exported: no
  upscaling.
- **The cover** (when yes): follow `creatorline-cover-image` with this run's look reference as
  its reference image. A 9:16 cover; a hook of 3 to 6 words in the video's language (or the
  pasted script's title); one sentence of scene carrying the video's hook; up to 3 of the
  video's figures, anonymous, or a concept with no figure; never a photoreal person; one
  version. Words that come out wrong: the same cover with no words; failing that, the strongest
  shot picture as the cover. Say which in one line.

## 13. Pitfalls

- The operations of one call are applied all together or not at all; an `add_text` or
  `add_layer` before the first clip refuses the whole call.
- Texts, layers and voiceovers do not follow trims, removals or reorders: the fixed block grid
  avoids most of it; after any change of a block's length, put them back with `update_text`,
  `update_layer` and `move_voiceover`, then look again.
- Read `get_video` before each round of edits: the person may have the studio open and be
  changing it too.
- A retried `create_video` can leave two videos: check `list_videos` first.
- `preview_video` often shows a clip by its cover picture (`exact: false`): judge placement,
  overlap and readability, not the motion.
- The person may not see preview pictures in their chat: share links instead.
- The export is refused while a voiceover is generating or captions are being written.
- Limits: 180 seconds per video, 60 operations per call, 300 characters per text, 30 seconds
  per photo clip.
