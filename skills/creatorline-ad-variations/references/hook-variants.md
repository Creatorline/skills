# Hook variants

How to write a set of hooks for one video so the test teaches which kind of opening works, and
how to put them on screen.

## Contents

1. [What a hook version changes](#1-what-a-hook-version-changes)
2. [Angles](#2-angles)
3. [Writing rules](#3-writing-rules)
4. [On screen](#4-on-screen)
5. [A new opening shot](#5-a-new-opening-shot)
6. [Spoken hooks](#6-spoken-hooks)

## 1. What a hook version changes

A hook version changes only the first seconds: the line on screen, or the opening shot with its
line. The rest of the video, its sound and what is said stay the same. It is the cheapest test
and usually the one with the biggest differences, so it comes first.

## 2. Angles

Give each version a different ANGLE, not a different wording of the same one. Then the result
says which kind of opening this audience stops for. Once an angle wins, a later round can test
three wordings of it.

| Angle | What it does | Example (a vitamin C serum) |
|---|---|---|
| Problem | Names the pain the viewer has | "Your serum is wasted without this" |
| Curiosity | Opens a question the video answers | "The step everyone skips with vitamin C" |
| Call-out | Names who it is for | "Oily skin? This one is for you" |
| Bold opinion | A clear stand the viewer can agree or argue with | "You do not need five serums" |
| Number | A count or a small exact fact | "Two drops. Every morning. That's it." |
| Question | Asks what the viewer is already wondering | "Why does your serum stop working?" |
| How-to | Promises a method the video shows | "How to make your serum actually work" |
| Look at this | Points at what the first frame shows | "Watch how fast this sinks in" |

Pick 3 to 5 that fit the video and the brand. The brand's content angles and tone from
`get_brand` come first; a brand "don't" rules an angle out.

## 3. Writing rules

- 3 to 8 words, at most about 40 characters. A line holds about 26 characters at size `m` and
  about 20 at `l`; two short lines read, a sentence does not.
- Plain words and basic punctuation. No emoji, no hashtags.
- The video must answer the hook. A hook the video does not pay off loses the viewer at second 4.
- The claim floor (house-rules.md, section 7): no personal results, no before and after the video
  does not show, no numbers that are not on the label or the approved claims list.
- The brand's language, unless the test is about language.
- The same line never repeats what is said in the first seconds word for word; it adds to it.
- Write the set as a list first and check that no two share an angle.

## 4. On screen

| Setting | Value | Why |
|---|---|---|
| `start`, `end` | `0`, `3` | The decision window |
| `position` | `"top"` | Clear of the face and the app's buttons in most videos |
| `size` | `"l"` | Readable on a phone at a glance |
| `look` | `"tiktokOutline"` | White words with an edge read on any picture |

- The same settings on every hook row: only the words change.
- `preview_video` with `at: [0.5, 2.5]` and `show_safe_area: true`. Move the line when it sits
  in a shaded band, on the face, or on text already in the picture (`position: "middle"`, or a
  `y` between 0 and 1).
- Other looks: `tiktokText`, `tiktokHighlight`, `tiktokTranslucent`, `snapchat`, `instagram`.
  Match the look of text the brand already uses.

## 5. A new opening shot

An opener is a 2 to 3 second clip placed before the video, with the hook line over it
(`add_hook`). Use it when the video's own first seconds are slow.

- Stock: `list_stock_clips` with `library: "hooks"`. Search by who and where, in a few plain
  words: "surprised woman", "man office", "reaction kitchen". Every word must match; when none
  match all, the nearest come back with `matched: "some"`.
- Look before choosing: `preview_assets` with the `stock_ids`.
- The brand's own clip works too: a product close-up from `list_assets`, passed as `asset_id`.
- Keep it short (`trim_end: 2.5`): the opener delays the first spoken word.
- Most stock openers are silent. The opener adds its seconds to the video's length.

## 6. Spoken hooks

What the avatar SAYS first is not a text hook: changing it is a lines version (new speech in the
avatar's voice, lip-synced to the original picture: variant-recipes.md, section 10). A text hook
must not contradict the spoken first line. When the person wants to test the spoken opening,
plan it as L rows, not H rows.
