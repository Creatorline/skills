# The picture plan

What goes on screen over the host, where, and on which words: cutaways, cards, labels, split
screens. Write the plan while the parts film, then build it in one `edit_video` call
(assembly.md, sections 6 and 7) and check the build against it (review.md, section 7). The
look of each item comes from the edit style (edit-styles.md).

## Contents

1. [The plan table](#1-the-plan-table)
2. [Who owns the picture](#2-who-owns-the-picture)
3. [How much: the density budget](#3-how-much-the-density-budget)
4. [The cutaway pass, part by part](#4-the-cutaway-pass-part-by-part)
5. [Timing from the caption lines](#5-timing-from-the-caption-lines)
6. [Placement](#6-placement)
7. [Readability](#7-readability)
8. [Nothing that looks like evidence unless it is](#8-nothing-that-looks-like-evidence-unless-it-is)

## 1. The plan table

One row per item. The id is the one you will give the operation, so the build can be read back
row by row.

| Id | What | Lands on (exact words) | Owner | Size and place | If the spot is busy |
|---|---|---|---|---|---|
| `hook` | Hook text "3 phrases that make you sound confident" | the first line | on camera | top, `l` | none: always |
| `b1` | Cutaway: a hand closing a notebook | "sounds like a decision" | visual | full screen | a card, `width` 0.6 |
| `l2` | Label "2. Ask the question" | "Phrase two." | on camera | top, `m` | drop it |

- Anchors are the host's exact words, never guessed seconds. Times come later, from the
  caption lines (section 5).
- Keep the plan out of the takes: a part's brief never mentions cutaways, cards, labels,
  split screens or room left for a graphic. The video model draws such words.
- Write the prompt for a new cutaway only after its row is fixed: what it shows, how big,
  for how long.

## 2. Who owns the picture

| Owner | What the viewer watches | How it is built |
|---|---|---|
| On camera | The host. The item only annotates. | A label or a small card (`width` up to 0.5) away from the face; the host fills the frame |
| Visual | The thing being talked about, while the host keeps talking underneath | A full-screen cutaway (`fill: true`) or a big card (`width` 0.7 to 0.9), `sound: false` |
| Playback | A supplied clip with its own sound, played alone | Its own `add_clip` between two parts, sound on. The only owner that may stop the host's speech |

- Full screen over the host's speech needs a reason you can say: the thing is the subject of
  the sentence.
- When an item does not fit, its fallback may shrink, simplify, split, move or drop it,
  never give it a bigger owner. Dropping is usually best.
- The host in a window beside real content is a split screen (`set_split_screen`): the host
  stays live, the content takes the other part. Use it only when the content is real and
  needs the room (a screen recording, a document read for several seconds). A frozen frame of
  the host is never a window.

## 3. How much: the density budget

A treatment is one label, card with words, source line, series tag or split screen: the
graphic layer. The hook text, the call to action and the captions are in every episode and do
not count. Cutaways are decided by the cutaway pass (section 4), not by this budget.

| Band | One treatment per | When |
|---|---|---|
| Light | about 20 s of speech | Minimal and Editorial Overlay, calm topics |
| Standard (default) | about 14 s of speech | Most episodes |
| Rich | about 10 s of speech | Funky Modular, Web Brutalism, lists of many concrete things |

- Spend the budget where the script earns it: the hook, each turn between parts, a list, a
  comparison, the payoff. Quiet stretches need no excuse beyond "the host is the point here".
- When a brief needs more than its band (eight products in a minute), say so in the plan and
  go one band up.
- Cutaways together stay under about a third of the runtime: the host is the show.

## 4. The cutaway pass, part by part

For every part, before deciding there is nothing to show:

1. Name the strongest specific picture for one of its lines: the actual thing, place or action,
   not a stand-in ("the empty meeting room at 9 am", not "a laptop").
2. Say what it adds: how something looks, an action, where it is, a process, a mood, or proof.
3. Anchor it on the exact words it shows.
4. Use it, or reject it with a reason and a fallback (the host alone, or a label).

Then choose the kind:

| The beat needs | Use |
|---|---|
| Something to look at | A still: a library photo or `text-to-photo`, shown 2 to 3 s |
| Something that moves or changes | A clip: library footage, `text-to-video`, or `photo-to-video` on a still |
| The real thing, because being real is the point (an archive photo, news, a named real product, person or place, proof) | A sourced file the person gave or agreed to (supplied-media.md, section 7) |
| An illustration of an idea | A generated still or clip, never one that looks like a document |

- Labels, lists and cards with words are texts, not cutaways.
- An episode about concrete things (places, products, steps) whose only variety is text is a
  planning failure: go back to step 1 for the strongest rejected picture.
- No faces in generated cutaways: hands, objects, places. A face that is not the host's reads
  as a guest.

## 5. Timing from the caption lines

Captions are the only transcript here, line by line (assembly.md, section 4). There are no
word times.

- Plan in phrases. Separate the phrase that brings an item in from the word it lands on: the
  item is already up when that word is said.
- In: the `start` of the caption line holding the anchor, minus 0.1 s.
- Hold: readable once it is up. A text stays at least its word count divided by 3 seconds,
  and never less than 2 s.
- Out: 1 to 2 s after the anchor's line ends, not at the next seam.
- One item out before the next comes in at the same place; never two appearing and vanishing
  inside one fast line.
- A list that builds (the recap "three phrases: ...") keeps the earlier items up as the next
  ones arrive: each item its own text, its own row (`y`), starting on its own words, all
  ending together.
- A count that steps (1, 2, 3) is one text per value, each ending where the next starts.
- A cue that must land on one word inside a long line lands on the line's start; say so when
  it matters.
- A phrase the host says twice: take the line by its order in the script, not the first match.

## 6. Placement

- Before anything shares the frame with the host, look at that stretch: `preview_video` at its
  start, its middle and its end, and on both sides of any seam it covers. In production a
  clip may be shown by its cover frame (`exact: false`): judge places and overlaps only.
- Keep cards and labels off the face. A card in the middle row leaves a face in the upper
  middle visible; a card at the top does not.
- Nothing in the bands the apps cover: `preview_video` with `show_safe_area: true`. Texts
  keep inside the safe area by themselves; layers do not.
- When the spot is busy, use the row's fallback from the plan table.

## 7. Readability

- No see-through box over the host's face: move the text instead of darkening the face.
  `tiktokTranslucent` sits over cutaways or plain areas only.
- A band across the whole frame (`snapchat`) or words with an edge (`tiktokOutline`) read
  over moving footage; plain words (`tiktokText`, `instagram`) need a calm area behind them.
- One look per level of text for the whole episode.
- Check what the finished frame shows, not what the table says: preview after the build.

## 8. Nothing that looks like evidence unless it is

- Never put on screen an invented number, date, stamp, source name, headline or interface as
  if it were a real record. A real one carries what it is ("Screenshot: the app's settings").
- A review or a comment card goes in as Video Studio text, or from an image the person
  supplies: never generated into a picture, where words come out garbled.
- An illustration never looks like a captured screen or a document.
- A web page goes on screen as a screenshot the person supplies, showing where it is from
  (supplied-media.md, section 7).
