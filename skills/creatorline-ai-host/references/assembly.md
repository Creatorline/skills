# Assembling the episode in Video Studio

The operation lists for building, timing and finishing an episode. Every list goes into
`create_video` or `edit_video` as `operations`, applied all together or not at all.
`get_video_guide` lists every operation and field; read it once before the first edit.

## Contents

1. [Order of work](#1-order-of-work)
2. [The spine](#2-the-spine)
3. [Voice match](#3-voice-match)
4. [Captions as the transcript](#4-captions-as-the-transcript)
5. [Trimming the seams](#5-trimming-the-seams)
6. [Cutaways, cards and split screens](#6-cutaways-cards-and-split-screens)
7. [Texts](#7-texts)
8. [Sound](#8-sound)
9. [Look, then export](#9-look-then-export)
10. [A teaser from the episode](#10-a-teaser-from-the-episode)
11. [Patching one line](#11-patching-one-line)
12. [Changing a delivered episode](#12-changing-a-delivered-episode)

## 1. Order of work

1. `create_video` with the parts in order (the spine). Send the person the `studio_url` in one
   line as a rough cut they can watch, and carry on without waiting for an answer.
2. Voice match on every part.
3. `write_captions` (charged once per video) and wait until `ready`.
4. Read `captions.lines`. All trims at the seams in one call. Then `write_captions` again
   (free, no price step) and wait.
5. Only for a split screen: cut at the NEW caption times and set it (section 6). If
   `captions.status` is then `out_of_date`, write them again (free) and wait.
6. The picture plan (picture-plan.md): cutaways, cards and texts in one call, timed from the
   latest caption lines.
7. Read it back against the plan, then the frame review (review.md, sections 7 and 8). Fix,
   look again.
8. Checklist (SKILL.md), then `export_video`.

Why this order: captions are tied to the cut they were heard from. Any change to the clips
(order, trims, splits, speed, a voice match) can leave them `out_of_date`. Texts, layers and
voiceovers keep their times when clips change, so they drift off their words after a trim. A
trim also moves every later moment, so a split worked out from the old times lands in the
wrong place. So the clips are finished first, then captions, then everything timed from the
captions. Adding texts and layers after captions does not touch the captions.

## 2. The spine

```json
{
  "brand_id": "<brand>",
  "title": "Speak Up Sundays Ep. 1: 3 phrases that make you sound confident",
  "operations": [
    { "op": "add_clip", "id": "p1", "asset_id": "<part 1>" },
    { "op": "add_clip", "id": "p2", "asset_id": "<part 2>" },
    { "op": "add_clip", "id": "p3", "asset_id": "<part 3>" },
    { "op": "add_clip", "id": "signoff", "asset_id": "<sign-off clip>" }
  ]
}
```

- Title every episode "<Show> Ep. <n>: <topic>": `list_videos` finds the series by it.
- The answer is the whole video: each clip's `start`, `end`, `trim_start`, `trim_end` and
  `source_duration`. Read times from it; never work them out by hand.
- `create_video` is not safe to repeat: after an error with no answer, check `list_videos`
  before sending it again.

## 3. Voice match

Once per part, the sign-off included the first time it is filmed (a reused sign-off clip is
already matched):

```json
{ "video_id": "<video>", "action": "change_voice", "clip_id": "p1", "voice_id": "<host voice_id>" }
```

- `voice_id` is the host's, from `get_avatar` (a host with none: the one voice picked from
  `list_voices`, host-continuity.md, section 6). Left out, the brand's own voice is used, which
  belongs to its default avatar and may be another person's.
- First without `confirm` (the price), then with `confirm: true` when it matches the quote the
  person said yes to; when it differs, ask them.
- Start all parts, then read `get_video` every 20 s until no clip shows `generating`. Each
  result takes its clip's place.
- A failed match is refunded and leaves the clip as it was.

## 4. Captions as the transcript

```json
{ "video_id": "<video>", "style": "hormozi", "position": "auto" }
```

`write_captions` hears the clips' speech. After `get_video` shows `captions.status: "ready"`,
`captions.lines` holds every line with its `start` and `end` on the timeline. Use them:

- to check the words against the script: a misheard word is fixed with
  `{ "op": "edit_caption", "index": 7, "text": "<right words>" }`, never by changing the script
  and never by re-filming; a word the host really said wrong or left out needs a re-take or a
  patch (section 11);
- to find where each part's speech starts and ends (section 5);
- to time every cutaway, label and card on the line that holds its words (sections 6 and 7).

Lines are the finest timing there is: no tool gives the time of a single word. A phrase that
comes twice is found by its place in the script, not by the first match.

Style per the series bible. With a split screen anywhere, captions sit in the middle row.

## 5. Trimming the seams

For each part, from the caption lines inside it:

- **Lead**: the first line's `start` minus the clip's `start`. Over 0.4 s: new `trim_start` =
  the old `trim_start` (0 when absent) + lead - 0.15.
- **Tail**: the clip's `end` minus the last line's `end`. Over 0.6 s: new `trim_end` = the old
  `trim_end` (or `source_duration`) - tail + 0.3.
- The sign-off keeps about 0.8 s after its last word for the held smile.
- Every trim keeps 0 ≤ `trim_start` < `trim_end` ≤ `source_duration`, with all of the part's
  words inside. Trim only idle air at the ends: keep the first sound, the tail of the last word
  and the pauses inside. Never change a clip's `speed` to make the episode fit.

All trims in one call, and nothing else in it:

```json
[
  { "op": "update_clip", "id": "p1", "trim_end": 19.6 },
  { "op": "update_clip", "id": "p2", "trim_start": 0.35, "trim_end": 16.4 },
  { "op": "update_clip", "id": "p3", "trim_start": 0.3, "trim_end": 19.2 }
]
```

Then `write_captions` again with the same arguments: free, it runs at once. Wait for `ready`
and read the new lines before timing anything.

## 6. Cutaways, cards and split screens

All cutaways sit over the host clip as layers, so the host keeps talking under them. Every
layer gets `sound: false`.

**Full screen** (vertical footage):

```json
{ "op": "add_layer", "id": "b1", "asset_id": "<cutaway>", "fill": true, "sound": false, "start": 9.2, "duration": 3, "trim_start": 0.5 }
```

**Card** (a photo, a screenshot, a wide clip):

```json
{ "op": "add_layer", "id": "c1", "asset_id": "<photo>", "width": 0.6, "column": "center", "row": "middle", "border": "white", "corners": "rounded", "start": 27.0, "duration": 3 }
```

- `start`: the caption line holding the word the cutaway shows, minus 0.1 s. `duration`: 2 to
  4 s. `trim_start` skips a slow first moment of a generated clip.
- `fill: true` on wide footage makes a band across the middle with the host above and below:
  use a card (`width` up to 0.9) instead.
- A card in the middle row leaves the face visible above it. Keep layers out of the bands the
  apps cover: check with `preview_video` and `show_safe_area: true`.
- A cutaway across a seam (from 1 s before to 1 or 2 s after) hides a small shift between
  parts.
- New cutaway footage, when the library has none: `text-to-video` (`params: {duration: 5,
  generate_audio: false}`, a scene with hands, objects or places and no faces), or
  `photo-to-video` (`inputs: {image_url: "<photo>"}`, the still as the first frame,
  `params: {duration: 5, generate_audio: false}`; one continuous move). video-briefs.md,
  section 14, says how to brief both.

**Split screen** (a long demonstration, such as a screen recording the person gave): it covers
a whole clip, so cut the part first. Do it after the trims and their free re-caption
(section 1, step 5), with `at` taken from the NEW caption lines. Each cut must sit at least
0.3 s inside a clip.

```json
[
  { "op": "split_clip", "at": 31.2 },
  { "op": "split_clip", "at": 38.0 }
]
```

The middle piece is the new clip the FIRST `split_clip` made: its line in `applied` names it.
Then:

```json
{ "op": "set_split_screen", "id": "<middle piece>", "asset_id": "<recording>", "place": "bottom", "share": "half", "sound": false }
```

With a split screen, `position: "auto"` captions move to the middle row by themselves.

## 7. Texts

```json
[
  { "op": "add_text", "id": "hook", "text": "3 phrases that make you\nsound confident", "start": 0, "end": 3, "position": "top", "size": "l", "look": "tiktokHighlight" },
  { "op": "add_text", "id": "tag", "text": "Speak Up Sundays · Ep. 1", "start": 3.1, "end": 5.6, "position": "top", "size": "s", "look": "tiktokHighlight" },
  { "op": "add_text", "id": "l1", "text": "1. My recommendation is", "start": 5.8, "end": 9.4, "position": "top", "look": "tiktokHighlight" },
  { "op": "add_text", "id": "l2", "text": "2. Ask the question", "start": 20.1, "end": 23.5, "position": "top", "look": "tiktokHighlight" },
  { "op": "add_text", "id": "l3", "text": "3. The next step is...", "start": 36.9, "end": 40.2, "position": "top", "look": "tiktokHighlight" },
  { "op": "add_text", "id": "cta", "text": "New episode every Sunday", "over": "signoff", "position": "middle", "look": "tiktokHighlight" }
]
```

- A label starts on the caption line where its item is named and stays at least 2 s.
- One look for the series; sizes `l` hook, `m` labels, `s` tag. About 26 characters per line
  at size `m`; `\n` breaks a line.
- `over` a clip id shows a text for exactly that clip and needs no times.
- Nothing on the captions row, and never two texts in the same row at the same time.
- Texts and layers can only go on a video that has a clip, so the spine comes first.

## 8. Sound

- No music by default, and the delivery says so. `set_sound` puts one audio file from the
  library under the whole video at its own level; it is turned down only under voiceovers, not
  under the host's own speech. A normal music track buries the words.
- If the person gives a quiet instrumental and wants it: `{ "op": "set_sound", "asset_id":
  "<audio>" }`. Say once that you cannot hear the mix and ask them to listen in the studio
  (supplied-media.md, section 8).
- Cutaways and cards stay silent (`sound: false`). A supplied clip that must be heard plays
  as its own clip between parts, sound on.

## 9. Look, then export

1. `preview_video` with `show_safe_area: true`: nothing important in the covered bands.
2. `preview_video` with `at`: the first second, each seam, the middle of each cutaway, the
   sign-off (up to 9 moments). When the answer says `exact: false`, some clips are shown by
   their cover frame: judge placement and readability only.
3. Fix with `edit_video`, look again.
4. `get_video`: `ready_to_export` true, `warnings` empty, captions `ready`.
5. `export_video`: price, then `confirm: true`. Read `get_video` every 10 to 30 s until
   `export.status` is `done`. `export.asset_id` is the MP4 in the library (for `create_post`),
   `export.url` downloads it.
6. Any edit after the export marks it not `up_to_date`; that version needs its own export, and
   each export is charged.

## 10. A teaser from the episode

A 10 to 15 s teaser of the opening, its own video, cut from the episode's exported MP4. The
hook text, the labels, the cutaways and the captions are already burned into it, so the
teaser needs no captions run: only one export, quoted first.

```json
{
  "brand_id": "<brand>",
  "title": "Teaser: Speak Up Sundays Ep. 1",
  "operations": [
    { "op": "add_clip", "id": "t1", "asset_id": "<the episode's export.asset_id>", "trim_end": 14.4 },
    { "op": "add_text", "id": "cta", "text": "Full episode on our page", "start": 11.6, "end": 14.3, "position": "middle", "look": "tiktokHighlight" }
  ]
}
```

- `trim_end`: the `end` of a full sentence in the episode's caption lines, ideally the bridge
  line, plus 0.2 s. The episode starts at 0, so its timeline times are the MP4's own seconds.
- The call to action sits in the middle row: the burned captions hold the bottom one. Check
  with `preview_video` that it does not cover a card.

## 11. Patching one line

One wrong or missing line, without re-filming the part. The host's face is hidden while the
fixed line plays, so lips never mismatch.

1. Quote it as one batch: the voiceover and a new export. One yes for both.
2. From the caption lines (`captions.status` must be `ready`), the line's `start` and `end`.
   One call: `[{ "op": "split_clip", "at": <start> }, { "op": "split_clip", "at": <end> }]`.
3. The middle piece is the new clip the first `split_clip` made (its `applied` line). One
   call:

   ```json
   [
     { "op": "update_clip", "id": "<piece>", "sound": false },
     { "op": "add_layer", "id": "patch", "asset_id": "<cutaway>", "fill": true, "sound": false, "over": "<piece>" }
   ]
   ```

4. `add_voiceover` `{video_id, text: "<the right line>", voice_id: "<host voice_id>", over:
   "<piece>"}`: first without `confirm`; when the price matches the quote, again with
   `confirm: true`. Its answer gives the voiceover's real `end`; the right line should be no
   longer than the one it replaces, or it runs into the next words.
5. `write_captions` again (free), then check the words, preview, and export.

Use it for one line. More than one wrong line in a part: re-film the part (section 12).

## 12. Changing a delivered episode

The Video Studio project is the episode's editable source. Change only what was asked, in
place.

1. Find it: `list_videos` (by its title), then `get_video`. Read it first, every time: the
   person may have edited it in the studio since. Never rebuild the episode over their edits.
2. Quote the change as one batch: a new take of the part (the same brief with the one change),
   its voice match, and a new export (every export is charged). One yes for the total.
3. Re-film the part. `edit_video` `[{op: "replace_clip", id: "p2", asset_id: "<new take>"}]`:
   same place, same length when the new take is long enough.
4. Voice match that clip, then `write_captions` again (free).
5. Re-time the texts and cutaways that sat over it (`update_text`, `update_layer`). Look only at
   the changed stretch and the seams on both sides of it, then export.
6. Deliver the new MP4 and the same Video Studio link, with one line on what changed.

Only an MP4, no project (an episode made elsewhere, or a project deleted): say that parts
cannot be swapped cleanly, then offer to bring the MP4 in (`import_asset`), make a project
with it as one clip, cut out the part's stretch (`split_clip` at its caption times) and put
the new take in its place (`replace_clip` on the middle piece). The MP4's captions and texts
are burned in, so the new stretch will not match them exactly: say so before quoting.
