# One video, several avatars

`multiply_character_swap` films ONE source video once per avatar, in one call: the same idea
for several accounts, a different avatar on each. Use it whenever the person wants the same
video with more than one avatar. It makes takes; it posts nothing.

## Contents

1. [What it films](#1-what-it-films)
2. [The three calls](#2-the-three-calls)
3. [The fields](#3-the-fields)
4. [What the answer says](#4-what-the-answer-says)
5. [From takes to posts](#5-from-takes-to-posts)
6. [If it goes wrong](#6-if-it-goes-wrong)

## 1. What it films

| Thing | Rule |
|---|---|
| The look | The video is filmed again with the avatar in its OWN clothes. Every move and every cut is kept, and so is the video's own sound |
| Length | At most 15 seconds. A longer source is cut to its first 15 |
| Rows | 1 to 12, one per take. Each avatar once, each account once |
| The mode | Fixed. It takes no `model` |
| The place | The video's own, or the place in one optional photo (`inputs.location`), the same for every row |
| Quality | `params.resolution` is REQUIRED and never guessed: the price changes several times over with it. Ask the person |

More than 12 accounts: several calls, each with its own rows and the same `batch_id`.

## 2. The three calls

The person always SEES THE FIRST TAKE before the rest is filmed. A source that films badly then
costs one take, not twelve. The tool holds to this by itself: given several rows, it films only
the first.

**Call 1: the quality and the price.** Send the rows without `params.resolution` and without
`confirm`. Nothing starts. The answer is `needs_quality` with what all rows would cost at each
quality. Tell the person the totals and their balance and ask which quality. Then send the same
call with `params.resolution`, still without `confirm`: the answer is `needs_approval` with the
exact total. Ask one yes for it.

**Call 2: the test take.** The same arguments with `confirm: true`. The answer is `test_queued`:
only the first row was started and charged; the others are `waiting`. Wait on the first row's
`generation_id` with `get_generation`, show the take, and ask: "Film the other <n> the same
way?" Say what the rest costs (`rest_credits`).

**Call 3: the rest**, only on the person's yes to the take they saw:

```json
{
  "brand_id": "<brand id>",
  "inputs": {"source_video": "<source_asset_id from call 2>"},
  "params": {"resolution": "720p"},
  "rows": [
    {"avatar_id": "<avatar 2>", "connection_id": "<account 2>"},
    {"avatar_id": "<avatar 3>", "connection_id": "<account 3>"}
  ],
  "test_generation_id": "<the test take's generation_id>",
  "batch_id": "<batch_id from call 2>",
  "confirm": true
}
```

- `rows` holds ONLY the waiting rows. The test's avatar is not filmed twice.
- `inputs.source_video` is the answer's `source_asset_id`: the test take's own copy of the video.
- `batch_id` is the one call 2 answered, so every take and post of this video reads together.
- The price of the rest was told with the test; a changed quality or direction is a new price
  and a new yes.

The person does not like the test take: nothing else was charged. Offer another source, another
quality, or a direction, and start again from call 1.

One row only: there is no test stage. Call 1 prices it, call 2 films it.

## 3. The fields

| Field | What it takes |
|---|---|
| `brand_id` | The brand the takes are for |
| `inputs.source_video` | The video: an asset id, a TikTok or Instagram post link, or a direct file link |
| `inputs.location` | Optional. One photo of a place: every take is set there |
| `params.resolution` | The quality the person chose |
| `prompt` | Optional direction for every row |
| `rows[].avatar_id` | The avatar of this take |
| `rows[].connection_id` | The account this take is for, from `list_connections`. Pass it whenever the person named accounts: it stays with the take |
| `rows[].prompt` | This row's own direction, instead of the shared one |
| `test_generation_id` | Call 3 only |
| `batch_id` | From call 2 onward |
| `confirm` | `true` only after the person's yes to the total |

Pair avatars and accounts with the person before call 1, in one short table (avatar, account,
platform). An account whose `avatar_id` is set is that avatar's own: pair them.

## 4. What the answer says

| `status` | Meaning | Do |
|---|---|---|
| `needs_quality` | Nothing started | Ask the quality with `quality_options` |
| `needs_approval` | Nothing started | Tell the total, ask one yes |
| `test_queued` | Only the first row started | Wait, show the take, ask about the rest |
| `queued` | Every row started | Wait on each `generation_id` |
| `partial` | Some rows started | Each row says which; a row with `error` was not charged |

Rows start as the plan's limit on takes at once allows; the others queue by themselves. Wait on
each with `get_generation` and report once, one line per avatar and account.

## 5. From takes to posts

A take remembers the account it was filmed for and its batch. So one `create_post` per take
needs only the take and the words:

```json
{
  "brand_id": "<brand id>",
  "asset_ids": ["<the take's asset id>"],
  "caption": "...",
  "hashtags": ["..."],
  "made_with_ai": true
}
```

- Leave `connection_ids` and `channels` out: the post goes to the account the take was filmed
  for. Naming another account is refused, because the avatar in the take is that account's.
- Vary the captions: the same words on ten accounts read as copies.
- The posts wait in the review queue. Accounts that post from a phone take a day, not a time:
  `creatorline-publish` (its posting reference, section 9) has the rules and the batch steps.
- Read the batch back with `list_posts` and its `batch_id`.

## 6. If it goes wrong

| The answer says | Do |
|---|---|
| A row's `error` names an avatar or an account | Fix that row (the id, or an account of another brand) and send only it, with the same `batch_id` |
| The test take "must be this brand's take of this same video" | `test_generation_id` belongs to another video or brand: use the test from call 2 and its `source_asset_id` |
| The balance is short (`sufficient: false`) | A lower quality, fewer rows, or more credits (house rules, section 8) |
| A take failed | Its credits came back. Say which avatar; offer that one row again, after a yes |
| The source is longer than 15 seconds | Only its first 15 are filmed. A later part: cut it first ([sources](sources.md)) |
