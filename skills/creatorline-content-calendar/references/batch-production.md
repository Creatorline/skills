# Making the batch

How to price a whole week as one number, run it through the format skills without losing
track, and keep the person posted until every piece is in the review queue.

## Contents

1. [Quote the whole week](#1-quote-the-whole-week)
2. [The quote message](#2-the-quote-message)
3. [A short balance or a budget](#3-a-short-balance-or-a-budget)
4. [The run order](#4-the-run-order)
5. [Each row, through its format skill](#5-each-row-through-its-format-skill)
6. [Checks](#6-checks)
7. [Narration and the progress board](#7-narration-and-the-progress-board)
8. [When a turn ends mid-week](#8-when-a-turn-ends-mid-week)
9. [Failures inside a batch](#9-failures-inside-a-batch)

## 1. Quote the whole week

Price every paid call of every row before any of them starts. Nothing in this section spends
anything.

- `estimate_generation_cost` prices a call from partial arguments: use it for every row whose
  inputs are not all there yet. Pass the real `inputs` whenever they exist: some tools bill by
  the length of the source video.
- `create_generation` without `confirm` gives the exact price of a call whose inputs exist. It
  starts nothing.
- `get_video_guide` (once) holds the Video Studio prices in `credits`: a voiceover, captions,
  an export.
- Bring a trend link in first with `import_asset` (`url`, `brand_id`, `title`): it is free, it
  checks the link works, and its `duration_sec` sets the reshoot's length.

| Row | Quote with |
|---|---|
| Talking video | `estimate_generation_cost` with `tool: "ugc-video"` and `params: {"duration": <seconds>}`; plus `tool: "change-voice"` when the talking-video skill's own-voice rule applies (the avatar has a `voice_id`, one speaker) |
| Trend reshoot | `estimate_generation_cost` with `tool: "reshoot"`, `inputs: {"source": "<imported asset id>"}`, `params: {"duration": <seconds>}` |
| Character Swap | `estimate_generation_cost` with `tool: "character-swap"`, `inputs: {"source_video": "<imported asset id>"}`, `params: {"duration": <seconds>}`; `model` only for the Replace mode (`character-swap-replace`), left out for Transfer |
| Carousel | `estimate_generation_cost` with `tool: "photo-edit"` and the photos skill's `params` (`aspect_ratio: "3:4"`, `resolution: "2K"`) for one photo, times the photos: the photos skill makes one call per photo |
| Product video, unboxing, try-on, tutorial, app promo, faceless video, episode, clips from a long video | Every paid call its skill's price step names (several takes and Video Studio steps are common) |
| Captions on a video with speech, when its skill does not add them | `estimate_generation_cost` with `tool: "hook-captions"`, once per video |
| Video Studio steps | `get_video_guide` `credits` |

Write each row's total down next to the row: it is that row's ceiling at run time
(section 5). Add the rows up for the week.

The lengths and settings you quote are the ones the format skill will use: its default length
for the format, videos at `720p` and 9:16, photos as the photos skill makes them. Quote what
will run, so the run-time price matches.

## 2. The quote message

Its own short message, after the calendar or under it, never inside the intake. One line per
row, the total, the balance, one question:

> What the week takes:
> Mon tip video <a> · Tue trend reshoot <b> · Thu carousel <c> · Fri product video <d> ·
> Sat hot take video <e> · captions on the three talking videos <f>
> All five: <total> credits. You have <balance>. Make them?

- A yes covers every row up to its quoted amount, and nothing else.
- When the calendar and the quote go out together, a "Credits" column in the table can replace
  the line per row.
- "Just do it" never skips this question.

## 3. A short balance or a budget

**`sufficient: false`** (or the total is over the balance): say the shortfall in one line, pass
on the server's own line about where credits come from (house rules, section 8), and offer a
lighter week. Start nothing.

**A budget** ("keep it under 500"): build to fit it from the start.

Ways to lighten a week, lightest change first:

1. Shorter clips: 8 to 10 seconds instead of 15.
2. A carousel instead of a heavy row (a tutorial, a swap, an episode).
3. Captions only where the words matter most.
4. Fewer posts: four strong ones beat six thin ones.
5. Week 1 only, week 2 next week.

Show what changed and the new total, and ask again. A part of the week the person picks ("just
the first three") is a new quote and a new yes.

## 4. The run order

- **Up to three rows in production at a time**, in calendar order. The workspace runs a set
  number of generations at once and holds the rest as `queued` until a slot frees up; three
  keeps the board readable and limits what a flawed brief can cost.
- **The first of each format goes alone.** Do not start a second row of the same format until
  the first one's take has passed its check. One wrong product look caught early saves the rest.
- **Start the next row** when one is filed, held or failed.
- **Picks in the middle of a row** (a look to approve before a try-on, stills before a product
  video): pick the best yourself and say which, unless the person asked to choose. Picking costs
  nothing; a second take is a new quote.
- **An input still missing** (a link they will send later): run the other rows, then ask once.

## 5. Each row, through its format skill

1. Load the row's skill (section 3 of [planning](planning.md) names it). When that skill is
   not available to you and `get_guide` is in your tools, call it with the name minus
   `creatorline-` as `topic` (`talking-video`, `reshoot`, `photos`) and follow that.
2. Carry everything over so the skill asks nothing: the brand, the avatar, the row's hook and
   angle, the product card word for word, the language, the length, the accounts.
3. Skip its orientation, its intake and its price step: all three are done. Follow its brief,
   its defaults, its checks and its finishing steps as quoted, in this order: the take, the
   avatar's own voice, then captions (they are read from the final speech). Captions on a
   video with speech go on through `creatorline-captions`, in its one-pass way for a batch:
   `hook-captions` on the finished take, one call per video, with `hook_mode: "manual"` and
   the row's hook as `prompt` (you know what is said), or `hook_mode: "off"` when the video
   already opens on text.
4. At each paid call, call first without `confirm` and compare the `credits` with the row's
   quote:

| The live price | Do |
|---|---|
| At or under the quote | The person's yes covers this row at its quoted price: the same call again with `confirm: true`. |
| Above the quote | Hold this row only. "Friday's product video comes to <N>, <d> more than quoted, because the clip runs longer. Go ahead?" The other rows go on. |
| `sufficient: false` | Stop starting rows. Say so; what is made stays made and gets filed. |

5. Wait with `get_generation` and `wait_seconds: 45`, again until `succeeded` or `failed`. With
   several rows running, wait on the oldest first.
6. Skip the skill's own result card and next steps: the progress board replaces them, and the
   week card closes the batch.
7. Never call `track_skill_activation` for a format skill inside the week.

## 6. Checks

**Each take**: its format skill's checks, plus a look at the cover with `preview_assets`
(up to 8 ids at once). Give it one verdict before any new spend (house rules, section 5).

**The week as a set**: keep a private note per row and compare each new piece with the first:

| Row | Avatar looks like the first? | Product right? | Language | Length | Caption opener | Status |
|---|---|---|---|---|---|---|

A difference nobody chose is a flaw: the face drifted, the label changed colour, a caption
repeats Monday's opening. Fix what is free before you file (the post caption, the hashtags).
A fix in Video Studio (a trim, on-screen text) is free to edit but needs a new export, and a
new take is a new run: quote either one first.

## 7. Narration and the progress board

- One line when a stage starts: "Working out the week." "Making five posts; I'll keep you
  posted." "Filing them for review." "Sending them out."
- Between polls, one short line about a real row: "Filming Tuesday's trend." "Making the
  carousel photos." "Putting captions on Monday's video."
- Show the progress board (SKILL.md, card 2) when a row lands, when one needs the person, and
  when the turn ends. Not on every poll.
- No ids, no tool names, no model names, no status JSON.

Board statuses, in plain words: Next · Filming (or Making the photos) · Checking · Finishing
(voice, captions) · In your review queue · Needs you · Failed, refunded · Held.

## 8. When a turn ends mid-week

A video takes a few minutes, a reshoot or a swap longer, so a week takes a good while: with
three rows at a time, tell the person roughly how long (often 15 to 30 minutes for five posts).

- Keep working while takes finish. When every running row still has minutes to go, end the turn
  with the board, about how long is left, and what to say: "Say 'check my week' and I'll pick
  it up."
- On their return: `get_generation` on every row that was running (its `generation_id` is in
  the earlier answers), then carry on from the board. Never start a row a second time.
- A paid call that timed out may have started: check with `get_generation`, `list_assets` or
  `list_videos` before calling again.
- In a new conversation the ids are gone. Rebuild from `list_posts` (`brand_id`,
  `status: "pending_review"`: what is filed), `list_assets` (`brand_id`, `source: "generated"`,
  newest first: what is made) and `list_videos` (`brand_id`: Video Studio projects). Ask which
  rows are left only if that is still unclear.

## 9. Failures inside a batch

Every failed run is refunded automatically.

| What happened | Do this |
|---|---|
| A run failed | Mark the row "Failed, refunded" and keep going with the others. At the end, ask once for all failed rows: retry each (a new quote) or drop it. Say what you would change. |
| A refusal (a real face in a reshoot source, a blocked subject) | Say what was refused. Offer another source or another format for that day, as a new quote. |
| A take is fine but weak | Its verdict: keep it, fix it in Video Studio (the edits are free, the export is quoted), or one more take as a new quote. |
| The first of a format shows a flaw the next would repeat | Hold the not-started rows of that format and ask before more spend. Change one thing, then retry. |
| The balance ran out mid-week | Stop starting rows. File what is made. Quote the rest again when there is room. |
| An input never arrived | Ask once at the end, or swap the row for a format that needs nothing. |
| `create_post` refused | [Posting the week](posting-the-week.md), section 1. The piece stays in the library. |

After three paid tries at the same row, stop: keep the best take, change the idea, or drop the
row.
