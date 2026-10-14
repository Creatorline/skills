# Screen layouts

How the real screens go over the avatar's talking take in Video Studio: the three layouts as
exact `edit_video` operations, sizes that read on a phone, the captions clock that times
them, and the texts around them.

## Contents

1. [The frame you design for](#1-the-frame-you-design-for)
2. [The order of work](#2-the-order-of-work)
3. [The captions clock](#3-the-captions-clock)
4. [Cards (screenshots)](#4-cards-screenshots)
5. [Full-screen cutaways (a phone recording)](#5-full-screen-cutaways-a-phone-recording)
6. [Split screen (a wide recording or one key screen)](#6-split-screen-a-wide-recording-or-one-key-screen)
7. [Result-first opener](#7-result-first-opener)
8. [Hook, step and call to action texts](#8-hook-step-and-call-to-action-texts)
9. [Look before you export](#9-look-before-you-export)

## 1. The frame you design for

- One vertical 1080 x 1920 frame (9:16). `get_video_guide` has the full rules; read it once.
- The apps cover the top 250 px, the bottom 420 px, 70 px on the left, 55 px on the right, and
  a 194 px column of buttons on the right from 958 px down. Nothing to read goes there.
- Texts and captions stay inside the safe area by themselves. Layers do not: you place them
  with `column` (left, center, right), `row` (top, middle, bottom), `width` (0.15 to 1 of the
  frame's width) or `fill`. A layer's `top` and `bottom` rows are the frame's own edges, so
  keep screens on `middle`.
- Captions sit on the bottom row of the safe area, or across the middle when any clip has a
  split screen or layers cover more of the bottom row than of the middle (`position: "auto"`
  picks this by itself).
- Times are seconds on the video's timeline, to the hundredth. `trim_start` on a layer is
  seconds of the layer's own source.

## 2. The order of work

Texts and layers sit at fixed times: they do not move when a clip is trimmed or split.
Captions do not move either, and any change to the clips makes them `out_of_date`. A new
hearing is free, but it replaces every word you corrected. So work in this order:

1. `create_video` with the take as one clip, `id: "talk"`.
2. `write_captions` (paid once per video, in the person's yes). Wait for `ready`.
3. ONE `edit_video` call with every change to the clips: the dead-air trims, then the splits
   of the split-screen layout (in seconds after the trim). Then `write_captions` again (free,
   no approval), wait for `ready`, and read the final times. Skip this step when nothing
   changes.
4. `edit_caption` for misheard words, the app's name first.
5. One `edit_video` call: the screens (layers, or `set_split_screen` on the pieces), then the
   hook and call to action texts. None of these change the captions.
6. `preview_video`, fix, preview again.
7. `export_video`.

Each `edit_video` call applies all its operations or none; the answer lists every clip, text
and layer with its start and end. Read times from it instead of adding them up.

## 3. The captions clock

The take's words are timed only once captions exist. `get_video` then lists
`captions.lines`: `{index, start, end, text}`, a few words each.

1. When you write the script, pick one cue word per screen: the distinctive word in the line
   that names what the screen shows ("categories", "calendar", "checkout").
2. Find the first caption line that holds each cue word.
3. Screen start: that line's `start` minus 0.2 s, never before the hook line ends (unless it
   is a result-first opener).
4. Screen length: 1.5 to 3 s for a card, 2 to 4 s for a cutaway, the whole line or lines for a
   split screen. End it 0.3 to 0.5 s before the next screen starts, and at least 2 s before
   the video ends.
5. A cue word missing from the captions means the take changed or misheard the line: read the
   lines around it and place the screen on the line that carries the idea.

No captions wanted: still write them for the clock, then `remove_captions` before the export
(the captions are still charged once), or place screens by word share (start = take length x
words before the cue / all words), which can drift by a second. Say which you did.

## 4. Cards (screenshots)

A screenshot as a photo layer over the talk, with a white edge and rounded corners so it reads
as a card held up to the viewer.

| Screen shape | `width` | Height on the frame |
|---|---|---|
| Phone screenshot (tall) | 0.4 (0.36 if captions cover what matters) | about half the frame |
| Tablet or square | 0.7 | about 40 % |
| Desktop screenshot (wide) | 0.9 | about a third, across the middle |

```json
{"op": "add_layer", "asset_id": "<screen 1>", "id": "s1", "start": 3.1, "duration": 2.4,
 "width": 0.4, "column": "center", "row": "middle", "border": "white", "corners": "rounded"}
```

- One `add_layer` per screen, all in one `edit_video` call.
- The same `width`, `border` and `corners` on every card, so they read as one set.
- A card covers the face while it shows. That is why cards are short and never on the hook or
  the verdict.
- A photo layer shows for up to 30 s; a card should never need that.

## 5. Full-screen cutaways (a phone recording)

The recording covers the whole frame while the avatar's voice keeps going under it, then the
face comes back.

```json
{"op": "add_layer", "asset_id": "<recording>", "id": "rec1", "kind": "video", "start": 4.0,
 "duration": 3.2, "trim_start": 6.5, "fill": true, "sound": false}
```

- `trim_start` picks the moment of the recording to show: the tap, the screen changing, the
  result appearing. You usually cannot see inside a recording here: `preview_assets` shows
  its first frame only, and `preview_video` may show a clip or layer by its cover
  (`exact: false`). So, unless the person told you where the moments are, let the recording
  play on as one flow: the first cutaway at `trim_start: 0`, each next one at the previous
  `trim_start` plus its `duration`. Read the recording's length (`duration_sec`) and keep the
  last cutaway inside it. Say so in the delivery; the person can nudge a cutaway in the studio.
- `fill: true` takes the frame's width. A tall phone recording runs a little past the top and
  bottom edges, which are the apps' bands anyway; check with `show_safe_area` that the part
  that matters is inside.
- `fill` cannot go with `column`, `row` or `width`.
- Several cutaways from one recording: one layer each, each with its own `trim_start`.
- `sound: false` keeps the phone's own sound out from under the voice.

## 6. Split screen (a wide recording or one key screen)

The screen fills the top part of the frame while the face stays in the rest below it, for the
stretch of lines about it. It belongs to a clip, so the take is cut into pieces first. Two calls, because
`split_clip` makes its new piece's id itself:

**Call 1** (the final-cut call): cut where the app moment starts and ends, after any trim in
the same call.

```json
[{"op": "split_clip", "at": 3.0}, {"op": "split_clip", "at": 10.2}]
```

The answer's `applied` gives each new piece's id. The FIRST split's new id is the middle
piece (3.0 to 10.2); the second split's is the end piece. Then `write_captions` again (free)
and wait for `ready`.

**Call 2** (the screens call): the screen on the middle piece.

```json
[{"op": "set_split_screen", "id": "<middle piece>", "asset_id": "<recording or screen>",
  "place": "top", "share": "third", "sound": false, "focus": {"x": 0.5, "y": 0.5}}]
```

- `place: "top"` keeps the screen clear of the apps' bottom band, where most of a bottom half
  would hide; the face reads below it. If the face is cut off there, add
  `"main_focus": {"x": 0.5, "y": 0.3}` (the part of the take that is looked at).
- `share`: `third`, `half` (the default) or `two_thirds` of the frame's height for the screen.
  A wide (16:9) recording or screenshot: `third`, which shows it almost whole. A phone
  recording: `half`.
- The screen FILLS its part, so anything wider than its part loses its sides. Move `focus.x`
  to the part that matters, look closer with `focus.zoom` (1 to 3), or use a wide card.
- The second video plays from its own start and loops; it cannot be trimmed here. If the part
  to show starts later in the recording, use a cutaway (section 5).
- A phone screenshot in a split shows a band of the screen, like a close-up: use it to show one
  region (a total, a button), with `focus.y` on it.
- Keep `sound: false`: a heard second video makes the captions `out_of_date` again.

## 7. Result-first opener

When the finished result is the most striking picture (a finished design, a full plan, a
total), open on it: a card or a cutaway from 0 to about 1.8 s, the hook text over it, the hook
line already playing under it. Then the face. Use it at most once per video.

## 8. Hook, step and call to action texts

All on the top row, where `auto` captions never sit.

```json
[{"op": "add_text", "text": "Budget you'll\nactually open", "start": 0, "end": 2.5,
  "position": "top", "look": "tiktokHighlight", "size": "l"},
 {"op": "add_text", "text": "Fernly: link in bio", "start": 12.6, "end": 15.0,
  "position": "top", "look": "tiktokHighlight", "size": "m"}]
```

- The hook text: 3 to 6 words that add to the spoken hook rather than repeat it. About 26
  characters fit on a line at size `m`, fewer at `l`; break lines with `\n`.
- The call to action: the app's name and where to get it, in the person's or the brand's words
  (`brand_voice.call_to_action`). Only what is true: "free" or a platform only when the page
  says so.
- With a split-screen video, `over` takes a clip id: `"over": "<end piece>"` puts the call to
  action exactly over the last piece.
- Walkthrough step labels: one `add_text` per step, with the same `start` and `end` as that
  step's screen, the same `look` and `size` on every label (`m`), a few words each:
  "1. Snap the receipt", "2. Pick a category".
- Text over a screen: keep it off the screen's own words.

## 9. Look before you export

`preview_video` is free; use it in a loop.

- `at`: the hook (0.5), the middle of each screen's window, and the last second (up to 9
  moments a call).
- `show_safe_area: true` once: nothing to read under the shaded bands or the button column.
- When the answer says `exact: false`, the take and the recordings are drawn from their cover
  picture: judge placement, overlap and readability, not what the footage shows at that
  second.
- Then `get_video`: `warnings` empty, `ready_to_export` true, `captions.status` `ready`.
- The person can watch the real thing at `studio_url` before the export if they want to.
