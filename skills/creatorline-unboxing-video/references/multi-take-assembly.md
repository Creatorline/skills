# Several takes, one video

How to make a haul (or any unboxing built from separate takes) and join it into one Video
Studio video the person can open, change and post. Every tool name, field and value here is
the server's own.

## Contents

1. [When several takes beat one](#1-when-several-takes-beat-one)
2. [Plan the takes](#2-plan-the-takes)
3. [Price the whole batch](#3-price-the-whole-batch)
4. [Run and wait](#4-run-and-wait)
5. [Build the video](#5-build-the-video)
6. [Look, caption, export](#6-look-caption-export)
7. [Show it](#7-show-it)
8. [When one take goes wrong](#8-when-one-take-goes-wrong)

## 1. When several takes beat one

| Situation | Takes |
|---|---|
| One product, up to 30 s | One take. Never split it: each join is a fresh render where the face can drift a little. |
| One product, over 30 s | One take per 15-second section (after-the-reveal.md, section 1): a failed section is filmed again on its own. |
| A haul of 2 to 5 items | One take per item: each product stays true to its own photo. |
| More than 5 items | Two hauls, or the 5 the person cares about most. Past about 45 s a haul loses people. |
| The person wants a separate intro or a separate verdict take | Fine: plan it as its own take with no product, or with the hero product. |

## 2. Plan the takes

- **Take 1** (12-15 s) runs the four beats with item 1 (unboxing-craft.md, section 1).
- **Takes 2 and on** (8 s each, two shots) start with the package already open at the edge and
  lift out the next item. No second opening, and the box is never closed or carried.
- Write every take's brief before you price any of them, and check each against the brief
  checklist in SKILL.md.
- One item in `objects` per take. Its product card in its brief.
- The same avatar in every take (the brand's default, or the same `avatar_id`).
- The Setting and Wardrobe lines are copied word for word into every brief, so the room, the
  light and the clothes match across the joins.
- The package description is the same in every brief that mentions it.
- Every take's verdict speaks about its own item only. A word on the whole haul goes in a
  closing text over the last clip; a call to action goes in the post caption.

Worked briefs: unboxing-briefs.md, section 6.

## 3. Price the whole batch

Nothing starts until the person has said yes to the total.

1. For every take, call `generate_ugc_video` WITHOUT `confirm`, with the exact arguments it will
   run with. Note each `credits`.
2. Call `get_video_guide` (free). Its `credits.export` is the price of one export, and
   `credits.captions` the price of captions (charged once per video). Add captions only when
   the person wants them.
3. Send one message: one line per take, the export (and captions), the total, the balance, one
   question.

   > A 28-second haul of the summer drop, three takes joined into one video:
   > 1. Opening the mailer and the linen shirt, 12 s: <a> credits
   > 2. The canvas tote, 8 s: <b> credits
   > 3. The silk scarf, 8 s: <c> credits
   > 4. The finished video with item labels (the export): <d> credits
   >
   > Total <T> credits; you have <M>. Go ahead?

4. If the total is more than the balance, offer fewer items or shorter takes before anything
   runs.

## 4. Run and wait

1. On yes, call `generate_ugc_video` with `confirm: true` for each take, in order, one after
   another. Do not wait for one to finish before starting the next. Keep each
   `generation_id`.
2. The workspace films a set number of runs at once (one at a time on some plans); the rest
   wait their turn and start on their own. The status does not tell which: `queued` only means
   no output yet, so a take can sit `queued` for longer than one filmed alone. Say "Filming the
   three takes; some may wait their turn, so this can take a few extra minutes."
3. Call `get_generation` with `wait_seconds: 45` on each until every one is `succeeded` or
   `failed`. One short line between calls: "Two of three takes are done."
4. Collect each take's `output[0].asset_id` and `duration_sec`.

## 5. Build the video

Read `get_video_guide` once if you have not. Then create the video with the clips only, in
order:

```json
{
  "brand_id": "<brand id>",
  "title": "Summer drop haul",
  "clips": [
    { "asset_id": "<take 1 asset id>", "id": "item1" },
    { "asset_id": "<take 2 asset id>", "id": "item2" },
    { "asset_id": "<take 3 asset id>", "id": "item3" }
  ]
}
```

That is `create_video`. Its answer gives each clip's `start` and `end`: read them, do not work
them out. Then add the title and the item labels with `edit_video_texts`:

```json
{
  "video_id": "<video id>",
  "operations": [
    { "op": "add_text", "id": "title", "text": "Summer drop haul", "start": 0, "end": 2.5, "position": "top", "size": "l" },
    { "op": "add_text", "id": "label1", "text": "1. Linen shirt", "start": 2.5, "end": 12, "position": "top", "look": "tiktokHighlight" },
    { "op": "add_text", "id": "label2", "text": "2. Canvas tote", "over": "item2", "position": "top", "look": "tiktokHighlight" },
    { "op": "add_text", "id": "label3", "text": "3. Silk scarf", "over": "item3", "position": "top", "look": "tiktokHighlight" }
  ]
}
```

- `12` is item 1's `end` in this example: use the one the answer gave. Label 1 starts after
  the title so the two never sit on top of each other.
- `over` puts a text over a whole clip. It cannot be combined with `start` and `end`.
- The same `look` and size on every label, so they read as a set. Looks: `tiktokOutline` (the
  default), `tiktokText`, `tiktokHighlight`, `tiktokTranslucent`, `snapchat`, `instagram`.
  Sizes: `s`, `m` (default), `l`, `xl`.
- Labels are short: about 26 characters fit on one line at size `m`. Product names go here
  exactly as the person spells them.
- Make every trim BEFORE you add texts. A text stays at its time when a clip is trimmed or
  removed later; re-anchor it with `update_text` and `over`.
- To cut a slow start off a take: `edit_video_clips` with `update_clip`, `id` and
  `trim_start` (seconds of that clip's own source), then re-anchor the texts.
- Music: only from the brand's library (`edit_video_sound` with `set_sound` and an audio
  `asset_id`); there is no stock music. It is turned down only under a voiceover, not under
  the avatar's own words in the takes, so under a talking haul it competes with the voice:
  leave it out, or choose a quiet track and say so to the person.

## 6. Look, caption, export

1. `preview_video` with `video_id` and `show_safe_area: true`. Check that labels and the title
   sit clear of the covered bands and do not overlap each other. In production a clip can be
   shown by its cover frame (`exact: false`): judge placement and readability, not what the
   clip shows at that second.
2. Captions, when they were in the yes: `write_captions` with `video_id`,
   `position: "auto"` and `confirm: true`. With labels on top, `auto` puts captions on a free
   row. Read `get_video` every 20 seconds or so until `captions.status` is `ready`. The
   captions are written from what is heard, so read every line against the lines in your
   briefs: the product's name spelled exactly as the person spells it, numbers as digits. Fix
   a wrong word with `edit_video_captions` and `edit_caption` (`index`, `text`). Nothing said
   (a quiet unboxing): the captions credits come back; burn nothing.
3. Read `get_video`: `ready_to_export` must be true and `warnings` empty.
4. `export_video` with `video_id` and `confirm: true` (covered by the batch's yes). Read
   `get_video` every 10 to 30 seconds until `export.status` is `done`.
5. `export.url` is the MP4; `export.asset_id` is what `create_post` takes; `studio_url` opens
   the editable video in Creatorline.

An edit after the export makes it out of date, and the next export is charged again: finish
the edits first.

## 7. Show it

```
**Summer drop haul**: 28 s, Mia opens the mailer and shows the linen shirt, the canvas tote and the silk scarf, each with its label.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <total> credits. <balance> left.

What next?
1. Captions in the brand's style
2. A cover with the three pieces
3. Put it in the review queue for TikTok and Instagram
```

Read the balance with `get_credit_balance` after the batch.

## 8. When one take goes wrong

- A failed take is refunded on its own; the others are fine. Never re-run the whole batch, and
  never build the video with a take missing without saying so.
- Two content-check failures in a row on the same take: do not send the same inputs a third
  time. Change the product photo or the wording, or offer another of the brand's avatars; never
  switch the avatar or the model without asking.
- Offer two ways: re-run only that take (a new quote and a new yes), or build the video from
  the takes that worked, with the labels renumbered.
- A take that came back wrong (the product drifted, a hand is off): give it a verdict
  (house-rules.md, section 5). Re-run only that take with one change, then swap it in place
  with `edit_video_clips` and `replace_clip` (`id`, `asset_id`). It keeps the clip's place, but a
  shorter take shortens the clip and the texts stay at their old times: re-anchor them with
  `update_text` and `over`, then look with `preview_video`. Captions written before the swap
  are out of date; writing them again is free.
