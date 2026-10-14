# Screen layouts

How the real screenshots go over the avatar's talking take in Video Studio: card sizes that
read on a phone, timing from the captions, the order of the cards, the hook plate and the call
to action, and what to do when the person brings a screen recording.

## Contents

1. [The frame you design for](#1-the-frame-you-design-for)
2. [The order of work](#2-the-order-of-work)
3. [Captions: the clock and the three modes](#3-captions-the-clock-and-the-three-modes)
4. [Card size and place](#4-card-size-and-place)
5. [Card timing](#5-card-timing)
6. [Card order, and which screenshots work](#6-card-order-and-which-screenshots-work)
7. [The hook plate and the call to action](#7-the-hook-plate-and-the-call-to-action)
8. [Walkthrough labels](#8-walkthrough-labels)
9. [When the person brings a screen recording](#9-when-the-person-brings-a-screen-recording)
10. [Look before you export](#10-look-before-you-export)

## 1. The frame you design for

- One vertical 1080 x 1920 frame (9:16). `get_video_guide` has the full rules; read it once.
- The apps cover the top 250 px, the bottom 420 px, 70 px on the left, 55 px on the right, and
  a 194 px column of buttons on the right from 958 px down. Nothing to read goes there.
- Texts and captions stay inside the safe area by themselves. Layers do not: you place them
  with `column` (left, center, right), `row` (top, middle, bottom) and `width` (0.15 to 1 of
  the frame's width), or `fill`. A layer's `top` and `bottom` rows are the frame's own edges,
  so cards always go on `middle`, which centres them top to bottom.
- Bottom captions stand just above the apps' bottom band, from about 0.68 to 0.78 of the
  frame's height. Middle captions sit across the centre.
- Times are seconds on the video's timeline, to the hundredth. `trim_start` on a layer is
  seconds of the layer's own source.

## 2. The order of work

Texts and layers sit at fixed times: they do not move when a clip is trimmed. Captions do not
move either, and any change to the clips makes them `out_of_date`. A new hearing is free, but
it replaces every word you corrected. So work in this order:

1. `create_video` with the take as one clip, `id: "talk"`.
2. `write_captions` with `style: "bold"`, `position: "auto"` (paid once per video, in the
   person's yes). Wait for `ready`.
3. **Dead air.** The first line starts after 0.4 s, or the last line ends more than about
   0.5 s before the clip does: one `edit_video` with `update_clip` (`id: "talk"`, `trim_start`
   so the first word lands at about 0.3 s, `trim_end` about 0.5 s after the last word). Then
   `write_captions` again (free, no approval), wait for `ready`, and read the final times.
4. **Correct the words** with `edit_caption`: the app's name spelled right, numbers as digits,
   every line in the script's words. In Both mode, take the hook out of the captions here
   (section 3).
5. One `edit_video` call: the cards, the hook plate, the call to action text, and
   `remove_captions` at the end in Hook mode. None of the others change the captions.
6. `preview_video`, fix, preview again.
7. `export_video`.

Each `edit_video` call applies all its operations or none; the answer lists every clip, text
and layer with its start and end. Read times from it instead of adding them up.

## 3. Captions: the clock and the three modes

The take's words are timed only once captions exist. `get_video` then lists `captions.lines`:
`{index, start, end, text}`, four words at most each, so a line's `start` is close to its first
word's own time. That is what places every card.

| Mode | On the video | How |
|---|---|---|
| Both (default) | The hook plate at the top, then captions of the body and the closer | Captions kept; the hook's own lines taken out |
| Subtitles | Captions of every word, no plate | Captions kept as heard and corrected |
| Hook | The hook plate only | Captions written as the clock, then `remove_captions` before the export |

- **Style:** `bold`, sentence case with a heavy edge and shadow, readable over a busy card.
  `tiktok` when the person wants it lighter. Never all capitals: the plate is the only text in
  capitals.
- **Taking the hook out (Both).** Lines that hold only hook words: `edit_caption` with that
  `index` and `text: ""` (an empty text removes the line). A line that holds the hook's last
  words and the first body words: `edit_caption` with only its body words. Do them in one call,
  highest `index` first, so the numbers of the lines still to change do not move.
- **Checking the words.** The words come from hearing the take. Compare every line with the
  script: a word that only sounds alike (the app's name, a number) is fixed to the script's
  word; a line the take really said differently stays as said, and you check that its card
  still matches it.
- **Nothing is said** (the captions come back empty and are refunded): time the cards by word
  share (section 5) and say so.
- The person turned captions down even as a clock: time the cards by word share and say they
  may sit a beat off.

## 4. Card size and place

Each screenshot is a photo layer over the talk, as big as reads well, centred, with the face
showing around it:

- **The box:** a card fits inside 0.78 of the frame's width and 0.60 of its height, centred
  left to right and top to bottom (`column: "center"`, `row: "middle"`). Its bottom lands at
  about 0.80 of the height.
- **Width by shape,** from the asset's `ratio` (`list_assets`, `import_asset`):

  | `ratio` | `width` | Height on the frame |
  |---|---|---|
  | `9:16` (every phone screenshot) | 0.48 | about 0.60 |
  | `3:4` | 0.78 | about 0.59 |
  | `4:5` | 0.78 | about 0.55 |
  | `1:1` | 0.78 | about 0.44 |
  | `4:3` | 0.78 | about 0.33 |
  | `16:9` (a desktop screenshot) | 0.78 | about 0.25 |

- **The same width for every card of one shape,** so a tall card and a wide card do not jump
  in size from one to the next.
- **`corners: "rounded"`,** and nothing behind the card: no blurred copy, no coloured panel.
- **As it is.** The person's screenshots (often desktop ones) go in whole: no crop to a phone
  shape, no stretch. The box just makes a wide one shorter.
- **The captions' row.** Our captions stand above the apps' bottom band, so the lowest strip of
  a tall card (where a phone screen keeps its tab bar) sits under the bottom captions for its
  1.4 s. Choose screenshots whose important part is in their upper four fifths.

```json
{"op": "add_layer", "asset_id": "<card 1>", "id": "c1", "start": 2.4, "duration": 1.4,
 "width": 0.48, "column": "center", "row": "middle", "corners": "rounded"}
```

One `add_layer` per card, all in one `edit_video` call. A photo layer can show for up to 30 s;
a card never needs that.

## 5. Card timing

- **No card during the hook** (until the first body word) **or the closer** (the last 15 % or
  so).
- **Each card shows 1.4 s** (1.2 to 1.5).
- **0.3 to 0.5 s of face between two cards.** A card that would start sooner is pushed later,
  never shortened below 1.2 s. A card that would then run into the closer is dropped.
- **The hero card first,** on the beat that names the site.
- **Anchor on the words.** A card starts at the `start` of the caption line that holds its cue
  word (the word that names what the card shows). A cue word deep inside a line: line start +
  (words before it / words in the line) x (end - start).
- **More cards come from more screenshots and more beats,** never from longer windows. About 6
  cards in 15 s, up to 10 in a longer video.
- **Word share, when there are no caption times:** card start = the take's length x (words
  before the beat / all the words), end = start + 1.4 s, never before the hook ends. It can
  drift a beat from the voice.
- A cue word missing from the captions means the take changed or misheard the line: read the
  lines around it and place the card on the line that carries the idea.

## 6. Card order, and which screenshots work

**The section map.** Look at every screenshot with `preview_assets` and list them in the
order the page has them, top to bottom, marking the ones the script needs and the filler:

1. The hero: the logo and the navigation bar, or the app's home screen with its name. Always
   the first card.
2. The product or the main features.
3. The app at work: a dashboard, a search, an editor, a booking screen.
4. Reviews.
5. Specs or details.
6. The price or the plans, a warranty.

The script follows this order (promo-scripts.md, section 5).

**A usable card:**

- Shows something that says whose site it is: the logo, the navigation bar, a price with its
  button, or a block of the site's own reviews.
- Is sharp, fully loaded, with no cookie banner, pop-up or error over it.
- Shows demo data only: no real names, emails, messages or balances.
- Is the person's own site or app, never another company's or an unrelated page.

At least 3 usable cards, or the video is made talking only (other-paths.md, section 3). One
missing section is not a problem: the script skips its beat.

## 7. The hook plate and the call to action

Both on the top row, where `auto` captions never sit.

```json
[{"op": "add_text", "id": "hook", "text": "A FREE BUDGET\nTHAT SORTS ITSELF", "start": 0, "end": 2.1,
  "position": "top", "look": "tiktokHighlight", "size": "m"},
 {"op": "add_text", "id": "cta", "text": "Fernly: link in bio", "start": 12.6, "end": 15.0,
  "position": "top", "look": "tiktokHighlight", "size": "m"}]
```

- **The hook plate** (Both and Hook modes): the hook in 6 words or fewer, in capitals, no emoji.
  It starts at 0 and ends exactly where the first whole body word starts. About 26 characters
  fit on a line at size `m`, fewer in capitals: break it with `\n`.
- **The call to action** goes over the closer, from its first word to the end: the app's name
  and where to get it, in the person's or the brand's words (`brand_voice.call_to_action`).
  The app's own facts from the page or the person: "free" or a platform only when one of them
  says so.
- The same look and size for the plate and the call to action.
- Text over a card never sits on the card's own words.

## 8. Walkthrough labels

For "how to do X in our app": each step gets one or two cards of 1.4 s, and a label on the top
row over the step's whole stretch, in the tutorial format: `Step 1 – Snap the Receipt`
(Title Case, 1 to 4 words, the same look and size on every label, size `m`). The label row
then holds, in turn: the hook plate, the step labels, the call to action. One text on the row
at a time.

## 9. When the person brings a screen recording

Never ask for one. When the person brings their own recording, use it as a card, not a full
screen:

```json
{"op": "add_layer", "asset_id": "<recording>", "id": "r1", "kind": "video", "start": 4.0,
 "duration": 1.4, "trim_start": 6.5, "width": 0.48, "column": "center", "row": "middle",
 "corners": "rounded", "sound": false}
```

- `trim_start` picks the moment of the recording to show. You usually cannot see inside a
  recording here (`preview_assets` shows its first frame only), so unless the person told you
  where the moments are, let it play on as one flow: the first card at `trim_start: 0`, each
  next one at the previous `trim_start` plus its `duration`. Keep the last one inside its
  `duration_sec`. Say so in the delivery; the person can nudge a card in the studio.
- `width` by its shape (section 4). `sound: false` keeps its own sound out from under the
  voice.
- **Full screen or split screen only when the person asks for that look.**
  - Full screen: the same layer with `fill: true` instead of `width`, `column` and `row`.
  - Split screen: it belongs to a clip, so first `split_clip` the take where the stretch
    starts and ends (the first split's new id in `applied` is the middle piece), then
    `write_captions` again (free), then `{"op": "set_split_screen", "id": "<middle piece>",
    "asset_id": "<recording>", "place": "top", "share": "third", "sound": false}`. A wide
    recording takes `share: "third"`, a phone one `half`; `focus` `{x, y, zoom}` picks the
    part that shows. The second video plays from its own start and cannot be trimmed there.

## 10. Look before you export

`preview_video` is free; use it in a loop.

- `at`: the hook (0.5), the middle of each card, and the last second (up to 9 moments a call).
- `show_safe_area: true` once: nothing to read under the shaded bands or the button column.
- **Real frames.** When the answer says `exact: true`, the frames are the take itself. Also
  look at two or three moments mid-sentence and check: one person, no more than two hands, the
  same face throughout, a clean mouth, no phone, laptop, screen or app drawn into the take, no
  product in her hands before the closer, no text in the picture.
- **Cover frames.** When it says `exact: false`, the take is drawn from its cover picture:
  judge placement, overlap and readability only, and ask the person to watch the real thing at
  `studio_url`.
- Then `get_video`: `warnings` empty, `ready_to_export` true, `captions.status` `ready` (or
  no captions in Hook mode).
