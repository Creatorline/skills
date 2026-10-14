# Edit grammar

How a short vertical video is cut so people watch it to the end, in the terms of the Video
Studio's operations. The numbers are starting points: the person's taste and their own
reference win (asking.md, "Who wins").

## Contents

1. [The first two seconds](#1-the-first-two-seconds)
2. [Length and pace](#2-length-and-pace)
3. [Cutting](#3-cutting)
4. [Text on screen](#4-text-on-screen)
5. [Where things sit](#5-where-things-sit)
6. [Sound](#6-sound)
7. [The ending](#7-the-ending)
8. [Looking at your work](#8-looking-at-your-work)

## 1. The first two seconds

Most viewers decide in the first two seconds. Everything there is chosen on purpose.

- **The strongest picture first.** Open on the most interesting moment: the result, the
  reaction, the product in hand, mid-movement. Never a greeting, a logo or someone settling in.
  Trim it off (`trim_start`), or move the best clip to the front (`update_clip` with
  `index: 0`).
- **A hook line from 0 s.** On the top row, six words or fewer, readable in one glance. It
  makes the promise the video keeps.
- **A stock hook when the footage has no strong start.** `add_hook` puts a ready-made reaction
  clip first with the line over it. Trim it to 2 to 3 s (`trim_end`): it opens the video, it is
  not the video.
- **Hook lines that work:**

| Kind | Example |
|---|---|
| A number | "3 runner mistakes" |
| A result first | "This took 10 minutes" |
| Against the grain | "Stop washing your face twice" |
| A question they have asked | "Is this serum worth it?" |
| A tease | "Wait for the last one" |
| Point of view | "POV: your first 5K" |

- The hook line and the post's caption say the same thing in different words.
- Never promise what the video does not deliver; the claim floor applies to on-screen words too
  (house rules, section 7).

## 2. Length and pace

| What it is | Length |
|---|---|
| A reaction, a meme, a loop | 6 to 12 s |
| One tip, one product moment | 12 to 20 s |
| A list, a short tutorial | 20 to 45 s |
| A story, an episode | 30 to 90 s |
| The most an export holds | 180 s |

- **Something changes every 2 to 4 seconds**: a cut, a new text, a layer appearing, a split
  screen starting. A picture that holds longer needs words or movement to carry it.
- **Shorter beats the plan.** When in doubt, cut. A 14 s video watched twice beats a 30 s video
  left at 8 s.
- **Speed.** `speed` 1.1 to 1.25 tightens a slow talker without making them sound odd (the voice
  keeps its pitch). Above 1.5 speech gets hard to follow. Under 1 only for a moment worth
  savoring, with no one talking.

## 3. Cutting

- **Cut the air.** Generated takes and phone clips often hold still for half a second before
  anything happens and after the last word. Trim 0.3 to 0.5 s off each start (`trim_start`)
  and end (`trim_end`) unless that moment matters.
- **Cut on action.** Join two clips on a movement: a hand lifting the product, a turn of the
  head, a step. The movement carries the eye over the cut. A cut between two still pictures
  feels like a stumble.
- **Jump cuts in a talking clip** are normal in short video: cutting out a pause or a flub
  between two sentences keeps the energy. Remove with `split_clip` at both ends of the pause,
  then `remove_clip` on the middle part.
- **You cannot hear the clip.** To find what is said when: write the captions (paid once per
  video), read `captions.lines` in `get_video`, cut between lines, then write the captions again
  (free). The lines are your transcript.
- **Order by energy.** Put the highest-energy clip first, the payoff about two thirds in, and a
  calm verdict last.
- **Keep the first frame of each clip readable.** A clip whose first frame is a blur reads as
  a glitch; trim a few tenths in.

## 4. Text on screen

**One idea per text.** A label names one thing. Two ideas are two texts, one after the other.

**How much fits.** About 26 characters per line at size `m`; about 32 at `s`, 20 at `l`, 16 at
`xl`. Two lines at most. Write `\n` for a line break you choose.

**How long it stays.** About 1 s plus 0.3 s per word, never under 1.5 s:

| Words | Hold |
|---|---|
| 1 to 2 | 1.5 s |
| 3 to 4 | 2 s |
| 5 to 6 | 2.5 to 3 s (a new text's default is 2.5 s) |
| 7 to 10 | 3.5 to 4 s |
| More | Split it into two texts |

A label that names a clip's subject stays as long as that clip: use `over` with the clip's id.

**Sizes.** `l` for a title or a hook of four words or fewer, `m` for labels and longer hooks,
`s` for a small credit or source line, `xl` for one or two words that are the whole point
("Before", "After", a price).

**Looks** (`look`; `get_video_guide` describes them all):

| Look | Use it for |
|---|---|
| `tiktokOutline` (the default) | Almost everything: white words with a dark edge read over any picture |
| `tiktokHighlight` | Labels over busy or bright footage: a solid plate behind each line |
| `tiktokTranslucent` | A longer line that should stay calm: a see-through dark box |
| `snapchat` | A one-line meme caption across the frame |
| `tiktokText` | Plain words over a dark, calm picture |
| `instagram` | A quieter, classic typeface for lifestyle and fashion |

- **One look per video**, and one size for all labels. Mixed looks read as a mistake. Leave
  `look` and `size` out of every label and they match by themselves.
- **Rows.** Top for the hook and titles, middle for labels and short notes, bottom for the
  captions alone. With a split screen the captions take the middle: put labels on top.
- **Words, not sentences.** "Too fast, too soon", not "The first mistake is running too fast
  too soon". Digits for numbers ("3", "10 min"). Exact words (a price, a name, a handle, a
  discount code) always go in text, never in a generated picture.
- **No text over the face.** The face reads best in the upper middle of the frame; a top-row
  text sits above it.

## 5. Where things sit

The frame is one 1080 x 1920 vertical picture. TikTok, Reels and Shorts draw their own
buttons and words over parts of it:

| Covered | Size |
|---|---|
| Top band | 250 px |
| Bottom band (caption, sound, progress bar) | 420 px |
| Left edge | 70 px |
| Right edge | 55 px |
| Buttons column, right side | 194 px wide, from 958 px down |

- **Texts and captions are kept inside the safe area for you.** Their `position` rows are
  inside it.
- **Layers are not.** A layer's `row` and `column` put it flush against the frame's edges:
  `row: "top"` sits under the top band, `row: "bottom"` under the bottom band, `column: "right"`
  under the buttons column on the lower half. Cards (photos, screenshots, a `video` layer) go on
  the middle row. A green screen person can stand on the bottom row: only their body is
  covered. Check every layer with `preview_video` and `show_safe_area: true`.
- **Every clip fills the frame.** A wide (16:9) or square clip loses its sides. To show it
  whole, put it in a split screen or as a `video` layer.
- **The lower third is the busiest part** (captions and the apps' own text). Keep a second thing
  to read out of it.
- **Split screen focus.** In a split, each picture is cropped to its part. `main_focus` and
  `focus` (x and y from 0 to 1, `zoom` 1 to 3) keep the face or the product in view.

## 6. Sound

What is heard, and how it is mixed:

| Source | Heard when | Level |
|---|---|---|
| A clip's own sound | Its `sound` is on (the default for a video clip) | As filmed |
| The music (`set_sound`) | Always, from 0 s under the whole video | As the file is; turned down to a quarter while a voiceover speaks, NOT under a clip's own speech |
| A layer's sound | On by default for a green screen clip, off for other layers | As filmed |
| A split screen's second video | Only with `sound: true` | As filmed |
| A voiceover | From its `start` | On top of everything |

- **One voice at a time.** Two people talking at once (a clip and a green screen layer, a
  clip and a voiceover) lose both. Turn one off.
- **Music under speech.** There is no volume control. Under a clip where someone talks, either
  leave the music out or turn the clip's sound off and let a voiceover carry the words.
- **No stock music.** Music is the person's own audio file. Most stock hooks are silent; every
  green screen clip has sound.
- **"Nothing is heard in this video"** means every clip is muted and there is no music or
  voiceover. Fix it unless silence is the point.
- **Captions hear speech only**: the clips' own and the voiceovers. Music is never captioned.

## 7. The ending

- The last 2 to 3 s carry the call to action as text: "Link in bio", "Part 2 tomorrow", "Save
  this for later". Middle row, the same look as the other texts.
- End on the verdict or the payoff, not on a fade into nothing. Trim the tail of the last clip.
- A video that loops well (the last frame leads back into the first) gets watched twice. For
  a loop, end on a cut back to the opening picture instead of a call to action.

## 8. Looking at your work

`preview_video` draws frames of the video as the export will have them: texts, layers, the
split screen and the captions' place. It is free; use it after every change that moves
something.

| Look at | Call |
|---|---|
| The whole video at a glance | `preview_video` (6 frames; `frames` up to 9) |
| The hook | `at: [0.5]` |
| A label and the clip under it | `at: [<label start + 0.5>]` |
| The ending | `at: [<duration - 1>]` |
| What the apps will cover | `show_safe_area: true` |
| Inside one clip, before choosing a trim | `from` and `to` over that clip, `frames: 4` |

- `exact: false` means some clips are drawn from their cover picture, not their picture at
  that second: trust the layout, not the content.
- The frames show no sound and draw captions in a stand-in font: their place is right, their
  look is the style.
- The pictures are for you. Tell the person what you checked in one line and give them the
  studio link to watch it with sound.
