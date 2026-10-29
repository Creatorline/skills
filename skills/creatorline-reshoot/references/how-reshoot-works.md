# How Reshoot works

What happens between `generate_reshoot` and the finished video, and
what each setting changes. Read it to explain a result, to plan a tricky source, or to fix a
take that went wrong.

## Contents

1. [The run, step by step](#1-the-run-step-by-step)
2. [The condensed cut](#2-the-condensed-cut)
3. [The storyboard](#3-the-storyboard)
4. [The words and the voice](#4-the-words-and-the-voice)
5. [Filming](#5-filming)
6. [Text on screen](#6-text-on-screen)
7. [Re-voicing the finished take](#7-re-voicing-the-finished-take)
8. [When the default model refuses](#8-when-the-default-model-refuses)
9. [What the price is made of](#9-what-the-price-is-made-of)
10. [What Reshoot does not do](#10-what-reshoot-does-not-do)

## 1. The run, step by step

| Step | What happens | What steers it |
|---|---|---|
| Product look | With a photo in `objects`: one look at the first photo, written down as a line (shape, size, material, colours, legible label) so the new lines can name it | The photo |
| Watch and plan | A small copy of the source is watched and listened to. The planner writes down the main person as a role, the setting, the product, the camera, the cut rule, the pace, the music, every sound, every spoken line with how it is delivered, every on-screen text. Then it plans the condensed cut, the storyboard frames and the shots | `duration`, the Direction, the attachments |
| Cut | The planned pieces of the source are joined, with tiny fades on the sound at each join. A cut that keeps the whole video uses the source as it is | The plan |
| Storyboard | Frames of the cut tiled into one sheet; the main person turned into a grey clay figure, the swapped product too | The plan, `objects` |
| Voice track | Only when the words change: each new line recorded and placed on a track as long as the cut | `objects`, `change_voice`, the avatar's voice |
| Filming | The whole cut filmed in one take with the avatar in the figure's place | Everything above, `resolution` |
| Caption | Only when a caption was rewritten: the new words added on top of the finished video | `objects` |
| Re-voice | Only with `change_voice` on, unchanged words and an avatar with a voice: the take's speech converted to the avatar's voice | `change_voice` |

A video over two minutes is scrubbed through rather than watched in one go, which takes
longer. If a planned join falls inside a spoken word, the planner is told and plans once more.

## 2. The condensed cut

- The target is `duration`, kept between 4 s and the model's most (30 s on the default, 15 s
  on `reshoot-seedance-2-0`).
- A source no longer than the target is used whole, and the video comes out at the source's
  own length (in whole seconds). It is still charged for `duration`.
- A longer source is cut down: the opening hook stays first and intact, the payoff stays
  last, the middle is compressed. It keeps one to three pieces of the source (up to five for
  targets over 15 s), each at least 2 s, with every join on a musical beat and between words.
- The cut is then split into shots of at least 3 s each. A shot never runs across a join, so
  a join is always a hard cut.
- What the planner drops is what it judged the video survives without. Name a moment in the
  Direction to keep it.

## 3. The storyboard

The storyboard is how Reshoot copies a video without handing the video itself to the model.

- 16 frames on the default model, 12 on `reshoot-seedance-2-0`, in a grid: the first frame of
  the hook, every change of framing, every product moment, every change of expression, the
  last frame.
- Grey means "replace": the main person becomes a matte grey clay figure with a blank head,
  same outline, pose and place. With `objects`, the product in hand becomes grey clay too,
  same shape, size and angle.
- Colour means "keep": the room, the light, other people, signs, and the product when it is
  not swapped (label and all).
- Only one person can be grey. A second lead stays in colour, as the original person: that is
  why two-person videos break Reshoot.
- Fast moves, heavy effects and constant camera motion are hard to pin into frames: the
  steadier the source, the closer the reshoot.

## 4. The words and the voice

**When the words change.** Only with a product photo in `objects`, and only when a spoken line
falls inside the cut. Then the whole speech track is recorded again, the unchanged lines
included. Without a product photo, the video's own words and sound are kept, even when the
Direction asks for other words.

**How lines are rewritten.**

- Every line that names or describes the old product is rewritten about the new one, in the
  same voice and energy and at about the same length (within roughly 15 % of its syllables),
  so it fits the same moment.
- Lines that do not mention the product stay word for word.
- Each sentence keeps its job: a reference to the old product becomes one to the new product,
  a reference to alternatives stays one, a joke stays a joke, a claim stays a claim. Each beat
  of the source stays, filled with the new product's facts; the person's approved claims or
  words to avoid, and a fix for a source that promises a cure or an income, go in the
  Direction.
- On-screen texts are rewritten the same way, or removed.

**How they are voiced.**

- Each line is recorded with one delivery cue taken from how the original line was said
  (excited, deadpan, whispered...).
- The voice is the avatar's when `change_voice` is on and the avatar has one; otherwise a
  stock voice.
- The lines are laid back to back from where the first one starts, all sped up by the same
  amount (at most 30 % faster) to fit. When even that is too long, middle lines are
  dropped (unchanged ones first, then the longest), never the first or the last.
- The new track is the voice and room tone only. The music of the source is gone; the picture
  still follows the storyboard.
- With a product photo but no speech in the cut, nothing is re-recorded and the source's own
  track is kept.

## 5. Filming

- One take with several shots. The model gets the avatar's image (face, hair and body), the
  storyboard, the product photo as the only product, the sound track, and any `source_video`
  clips. It never gets the source's picture. It gets the source's sound whenever the words
  stay the same.
- The person's look in each shot is written from the source's person, so the avatar tends to
  wear what the source's person wore.
- The camera, the framing habits, the transition rule, the setting, the light and the pace
  are written from the source, so the reshoot feels like the same phone video.
- The frame follows the source: a 9:16 source gives a 9:16 video, a 16:9 source a 16:9 one.
- The Direction is added as the intent of the reshoot. The `source_video` clips are passed to
  the model but described only by the Direction, so say what each one is for.

## 6. Text on screen

| Case | What you get |
|---|---|
| No product photo, the source has on-screen text | The text stays in the storyboard and the model redraws it. Letters can slip: check the spelling. |
| Product photo, speech in the cut, the source has on-screen text | All text is wiped from the storyboard. The first caption, rewritten, is added afterwards in clean white letters, centred near the top, for the whole video. Other captions are not put back: add them with Video Studio `add_text` if they matter. |
| Product photo, no speech in the cut, the source has on-screen text | The rewritten first caption is added on top as above, and the model may still draw the old captions. Check them first. |
| No text in the source | None. Add a hook later (`creatorline-captions`). |

After a product swap, check that no text on screen still names the old product. Text that
does: cover it with Video Studio `add_text`.

## 7. Re-voicing the finished take

- Runs when `change_voice` is on, the words did not change, and the avatar has a voice.
- The finished take's sound is converted into the avatar's voice. Words, timing and lip
  movement stay.
- The whole track is converted as speech: music or a second voice under the words comes out
  garbled. Background noise is fine.
- If this step fails, the take keeps its own sound and the run still succeeds.

## 8. When the default model refuses

- The default model accepts AI faces only and can refuse a take (a real face, a content
  check).
- A refused take of 15 s or less is filmed once more on `reshoot-seedance-2-0`, by itself. The
  charge is then adjusted to that model's price, up or down.
- A refused take over 15 s fails, and the credits come back.
- Other failures (a step that timed out, an input that could not be read) are not retried:
  they fail and are refunded.
- For an avatar made from a real person's photo, choose `reshoot-seedance-2-0` from the start
  and keep `duration` at 15 s or less.
- No answer tells you a take was re-filmed. That is why the result card reads the balance from
  `get_credit_balance` after the run, not from the confirmed answer.

## 9. What the price is made of

- A small fixed part for the steps before filming (watching, storyboard, voice, caption),
  plus the filming model's rate per second of `duration`.
- It is charged on `duration`, not on the source's length. Set `duration` to the source's
  length when the source is shorter.
- `1080p` more than doubles the rate per second. `change_voice` adds nothing.
- Clips in `source_video` add their own seconds to what is billed. The source itself and the
  product photo do not.
- The `needs_approval` answer of `generate_reshoot` is the exact charge. Before there is a
  source, `generate_reshoot` without `confirm`, with `params.duration` and no source, gives an
  estimate (`estimate: true`).
- Never write a number from memory: quote the tool's answer.

## 10. What Reshoot does not do

| Not possible | Instead |
|---|---|
| Choose the frame shape | It follows the source; pick a vertical source |
| Two avatars, or a second person replaced | `creatorline-character-swap` |
| Exact clothes from a photo | Character Swap's Replace mode with an outfit image |
| New words without a product photo | `creatorline-talking-video` with the trend's format |
| Another language | A talking video or a voiceover version (`creatorline-ad-variations`) |
| Part of a long video only | The Video Studio route in [sources-and-trends.md](sources-and-trends.md) |
| Keep the music while new lines are spoken | Add music afterwards in Video Studio (`set_sound`) |
