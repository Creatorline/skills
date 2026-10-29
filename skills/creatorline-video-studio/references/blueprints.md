# Blueprints, text systems and motion

The structures that proven short-video edits are built from, each turned into Video Studio
operations, and an honest list of the motion the studio does not make. Read the section you
need, not the whole file. Formats with full operation lists are in [formats](formats.md).

## Contents

1. [Shot blueprints](#1-shot-blueprints)
2. [Caption and text systems](#2-caption-and-text-systems)
3. [Timing several things together](#3-timing-several-things-together)
4. [Stepped motion with held states](#4-stepped-motion-with-held-states)
5. [What the studio cannot make, and what to offer](#5-what-the-studio-cannot-make-and-what-to-offer)

## 1. Shot blueprints

Every edit is a spine with things on top. The spine is the clips in order: their picture and,
when someone talks, their sound. Everything else (texts, layers, a split screen's second
picture) sits over it for a stretch of time.

| Blueprint | Structure | In the studio |
|---|---|---|
| Talking head with overlays | The speaker's clip carries the picture and the sound; titles and cards float on top | Formats 2 and 8: `add_clip` for the take, `add_text` and `add_layer` timed to what is said |
| Footage beside graphics | A media slot next to a card of words or a picture | `set_split_screen` with the footage in one part and a photo (a screenshot, a product shot, a card) in the other; the words on the top row with `add_text` |
| Before and after | Two states of one thing, shown in sync | One after the other with the change on the cut (format 6), or stacked with `set_split_screen`, `share: "half"`. Side by side is not possible: a split is top and bottom only |
| A number that counts | A value climbing to its end, often with a bar | A held-state count (section 4). There is no bar or progress element |
| A list or a wall of logos | Several items in a grid or a column | Photo layers on the middle row (`column` left, center, right; `width` about 0.3), appearing in a stagger (section 3), leaving together |
| Input to result demo | The screen before, the action, the screen after | A screen recording in a split screen or a `video` layer; or two screenshot layers back to back at one place (a held-state swap, section 4). No cursor or pointer element |
| Zoom or parallax | A camera move over layered depth | Not available (section 5). Nearest: a closer take cut in, or a split screen's `focus` with `zoom` (a fixed crop, up to 3 times) |
| Sequential phrases | One phrase after another, each following the last | Texts in a sequence (section 3), all in one place, one look and size |
| A title card | A full-frame card with a title | A photo clip (a plain background or a brand picture from the library) shown 1.5 to 2.5 s, with an `l` or `xl` title `over` it |
| B-roll over speech | The voice goes on while the picture cuts away | A `video` layer with `fill: true` over part of the talking clip; layers are silent by default, so the voice carries on underneath |

B-roll over speech, as `edit_video_layers` operations (the talking take is clip `talk`; the
cutaway shows from 4 s to 6.5 s while she keeps talking):

```json
[
  { "op": "add_layer", "asset_id": "<b-roll video>", "id": "broll1", "kind": "video", "fill": true, "start": 4, "duration": 2.5 }
]
```

A 9:16 b-roll covers the whole frame this way; a wide one covers a band across the middle.
Cut away on a sentence that names what the b-roll shows (time it from `captions.lines`), and
come back to the face for the payoff.

## 2. Caption and text systems

The caption and title looks that short video uses, and which one the studio has. Captions are
words heard (`write_captions`, then `set_captions` for the style); texts are words you write
(`add_text` with a `look`).

| System | What it looks like | In the studio |
|---|---|---|
| Static card | One block of words per line said | Every caption style shows a line at a time; for texts, one `add_text` per line |
| Word highlight | The whole line stays; the word being said changes colour | Caption styles `hormozi` (the word being said in yellow) and `karaoke` (it fills with gold) |
| Walking highlight box | A box that moves from word to word | Not available; `hormozi` is the nearest |
| Plate | Words on a padded background | Texts: `tiktokHighlight` (a solid plate per line), `tiktokTranslucent` (a see-through dark box), `snapchat` (a band across the frame). No caption style has a plate |
| Outline | Words with a flat edge | Captions: `tiktok` (thin), `bold` (heavy), `hormozi` (thick, capitals), `sticker` (black words in a heavy white edge). Texts: `tiktokOutline` |
| Shadow only | Quiet words over calm footage | Caption style `minimal` |
| Reveal (a wipe uncovering the words) | | Not available |
| Word by word arrival | Words, letters or lines arriving one at a time | Not as an animation. Captions already show a few words at a time; a phrase can be built in held steps (section 4) |

- Text settings the studio takes: `look`, `size` (`s`, `m`, `l`, `xl`), `position` (or `y`),
  `align` (or `x`) and line breaks written as `\n`. Line height, letter spacing, weight,
  italics, colour, outline width and shadow are set by the look; they are not separate fields.
- One caption system per video, and one text look for every label (edit grammar, section 4).

## 3. Timing several things together

A text or a layer appears on a cut, holds, and goes on a cut. Several of them are timed with
`start` and `end` (a text) or `start` and `duration` (a layer), or with `over`.

| Pattern | Rule | Example |
|---|---|---|
| Sequence | Each starts where the last ended, plus a gap (0.1 s when a beat between them should be felt, none when one replaces the other in the same place) | Text 1 from 2 to 4 s, text 2 from 4.1 to 6 s |
| Parallel | Same `start`; the group lasts until the longest ends | A product card and its name, both from 3 s |
| Stagger | Item `i` starts `i` times a step later; all can end together | Three cards at 1, 1.2 and 1.4 s, all ending at 5 s |
| On a cue | A start taken from something already timed, plus an offset | A label from a caption line's `start` plus 0.2 s; a card from a clip's start with `over` |
| One clock | Things that must move together share one span | A text and a layer both `over` the same clip start and end together, whatever the clip's length |

- A span is from `start` up to `end`: a text ending at 4 s and the next starting at 4 s follow
  each other with no gap and no overlap.
- Items in a stagger keep one size, one row and one look, so only their timing differs.
- `over` is read once, when the operation runs. If a clip later changes length, re-anchor with
  `over` again (timeline rules, section 2).

## 4. Stepped motion with held states

The studio has no keyframes, but a change can happen in steps: a few versions of one thing,
each held for a moment, at exactly the same place. This is how a stop-motion count or a build
reads, and it is honest about what it is: each step appears on a cut.

- **Every step at least 0.3 s.** A text shows for at least 0.3 s, so steps are 0.3 to 0.4 s.
  (Word-by-word animation usually spaces words 0.2 s apart; the studio cannot go below 0.3 s.)
- **3 to 6 steps.** More reads as flicker.
- **One box.** The same `look`, `size` and `position` for every step, so nothing jumps.
  Prefix and suffix stay inside the text ("$12", "40%").
- **The last step holds** until the label's job is done (edit grammar, section 4 for read time).

**A count up** ("0%" to "100%" over 1.2 s, then held), as `edit_video_texts` operations:

```json
[
  { "op": "add_text", "id": "n1", "text": "0%", "start": 3, "end": 3.3, "position": "middle", "size": "xl" },
  { "op": "add_text", "id": "n2", "text": "25%", "start": 3.3, "end": 3.6, "position": "middle", "size": "xl" },
  { "op": "add_text", "id": "n3", "text": "60%", "start": 3.6, "end": 3.9, "position": "middle", "size": "xl" },
  { "op": "add_text", "id": "n4", "text": "100%", "start": 3.9, "end": 6, "position": "middle", "size": "xl" }
]
```

The number can be a product fact or the brand's figure. When it points at something to see, the
video shows it.

**A phrase build** ("Stop" then "Stop washing" then "Stop washing your face"): each step is the
whole phrase so far, `align: "left"` so the first word stays put while the line grows (a
centred line re-centres at every step and jumps).

**A swap** (one screenshot replaced by the next, a before by an after): two layers back to
back with the same `column`, `row` and `width`, the second starting where the first ends.
`replace_layer` changes the picture for the whole span instead, not from a moment on.

## 5. What the studio cannot make, and what to offer

Say it plainly when the person asks for one of these, and offer the nearest thing. Never
describe a cut as a transition or a held step as an animation.

| They ask for | Not in Video Studio | Offer instead |
|---|---|---|
| A transition (fade, slide, zoom, spin, blur) between clips | Clips join on a cut | A cut on a movement (edit grammar, section 3); the person can review the cut in the studio |
| Animated text (pop, slide up, typewriter, bounce) | Texts appear and go on a cut | The words timed to the speech; `hormozi` or `karaoke` captions for word-by-word energy; a phrase build (section 4) |
| A zoom or punch-in on a talking head | Clips cannot be scaled | A closer take of the same moment cut in (a new take, priced: an AI-on-a-clip tool, SKILL.md, or a format skill); in a split screen, `main_focus` with `zoom` |
| A slow move over a photo | Photos do not move | `animate_photo_clip` on that photo (priced) |
| Music turned down under speech, or a volume level | Sound is on or off per clip; music plays at its own level; only a voiceover turns it down | Music only where nobody talks, or the clip's sound off with a voiceover carrying the words |
| Silences removed by themselves | No automatic silence removal | Captions first, then `split_clip` at both ends of each pause and `remove_clip` (edit grammar, section 3) |
| Shapes, arrows, progress bars, icons | No graphics layer | A photo layer of an arrow or an icon from their library; a held-state count |
| A colour grade, a filter, a look-up table | No grade | Pick the footage that already has the look; a new take in that look (priced) |
| A frame rate, bitrate, codec or 4K export | One export setting: a 1080 x 1920 MP4 | Say what the export is |
| Part of the video exported | The export is the whole video | Duplicate the cut in a new video with only that part (`create_video`), then export it |
