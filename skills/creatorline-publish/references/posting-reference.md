# Posting reference

Every field, rule, status and refusal of the three posting tools: `create_post`, `publish_post`
and `list_posts`, plus `list_connections` for the accounts.

## Contents

1. [create_post](#1-create_post)
2. [Media and platforms](#2-media-and-platforms)
3. [Accounts](#3-accounts)
4. [publish_post](#4-publish_post)
5. [The review queue](#5-the-review-queue)
6. [Statuses and list_posts](#6-statuses-and-list_posts)
7. [Refusals and fixes](#7-refusals-and-fixes)
8. [Several posts](#8-several-posts)
9. [Posting from the brand's phone](#9-posting-from-the-brands-phone)

## 1. create_post

Puts a post in the brand's review queue with status `pending_review`. Nothing is public. Free.
You cannot change or delete it afterwards from here, so get the words right first.

| Field | Required | What it takes |
|---|---|---|
| `brand_id` | yes | The brand the post belongs to |
| `asset_ids` | yes | 1 to 10 asset ids, in post order |
| `caption` | no | The text. Its first 60 characters become the post's title in the app |
| `hashtags` | no | Bare words, no `#`. Added after a blank line at the end of every platform's caption; a tag already in the caption is not repeated; they count toward the limits |
| `connection_ids` | no | The exact accounts (ids from `list_connections`), all on this brand and able to post. Never with `channels` |
| `channels` | no | Platforms: `IG`, `TikTok`, `YouTube`, `Telegram`, any case. Write `IG`: "Instagram" is refused. Each goes out through the brand's first connected account on it. Never with `connection_ids` |
| `scheduled_for` | no | A time of day, `"HH:mm"`, 24-hour. No date: it is that time on the day the post is approved or published |
| `timezone` | no | An IANA zone (`"Europe/Istanbul"`) the time is read in. `publish_post` cannot set one later |
| `format` | no | `photo`, `video` or `carousel`. Leave it out: it is read from the media |
| `made_with_ai` | no | The AI label: TikTok's AI-made flag and YouTube's synthetic-content flag. Set it to `true` by default; the person may switch it off |
| `draft` | no | TikTok only: the post lands in the TikTok app's inbox, where the person finishes it. Refused when any other platform is in the post |
| `auto_add_music` | no | TikTok photo carousels: TikTok adds a sound. On unless set to `false` |
| `photo_cover_index` | no | TikTok photo carousels: the cover photo, 0-based into `asset_ids` |
| `platform_settings` | no | Per platform, keyed by a channel the post targets: `caption` and `scheduled_for` everywhere, plus `title` and `visibility` (`public`, `unlisted`, `private`) on `YouTube`. All values are strings |
| `physical_device` | no | Section 9 |

Neither `connection_ids` nor `channels`: the post goes to every platform the brand has connected,
one account each. Always pass `connection_ids` instead, so the post goes exactly where the
person saw.

The answer: `clip_id` (the post's id, for `publish_post`), `status` (`pending_review`),
`channels` (the platforms it will go to), and `connection_ids`, `draft`, `made_with_ai` when
set. Compare them with what the person approved before going on.

## 2. Media and platforms

The format is read from the media: any video makes a video post, two or more photos a carousel,
one photo a photo post.

| Rule | Detail |
|---|---|
| One video per post | A video post holds exactly one video. A video with photos is refused: make two posts |
| Carousels are photos only | 2 to 10 photos (`asset_ids` takes at most 10, although TikTok takes more) |
| Finished media only | An asset still being made, or with no file, is refused |
| Videos and photos only | Never post an audio file |
| A Video Studio project | Post its export (`export.asset_id`), never the project. An export older than the last edit (`up_to_date: false`) is the old version |

| Platform | Video | One photo | Carousel | Caption limit, hashtags included |
|---|---|---|---|---|
| TikTok (`TikTok`) | yes | no | 2 to 10 photos | 2,200 |
| Instagram (`IG`) | yes | yes | 2 to 10 photos | 2,200 |
| YouTube (`YouTube`) | yes | no | no | 5,000 |
| Telegram (`Telegram`) | yes | yes | 2 to 10 photos | 1,024 |

A per-platform caption (`platform_settings.<channel>.caption`) is checked against that
platform's limit; the shared caption against the others.

Fixes for a mismatch:

- One photo and TikTok: add a second photo (a carousel), or animate it into a clip first.
- Photos and YouTube: leave YouTube out, or make a short video of the photos in Video Studio.
- A video and photos: two posts.

## 3. Accounts

`list_connections` with `brand_id` returns, per account: `id`, `platform` (`IG`, `TikTok`,
`YouTube`, `Telegram`), `handle`, `display_name`, `status`, `can_publish`, `avatar_id` and
`follower_count`.

| Field | Meaning |
|---|---|
| `can_publish: true` | The account can take posts |
| `can_publish: false` | Logged out on the platform's side (`status` `expired` or `disconnected`) or never finished. It must be reconnected at https://app.creatorline.io/connections. A post naming it is refused |
| `avatar_id` | The avatar pinned to the account: the face that posts there. An avatar with an account is an Influencer in the app |

Choosing:

1. Keep only `can_publish: true`.
2. The avatar in the piece has its own account on a platform: use it.
3. Leave out accounts pinned to another avatar unless the person names them.
4. One account left per platform: use it. Several and none pinned to this avatar: ask which, by
   handle.
5. Pass the result as `connection_ids`. Name the accounts by platform and handle, never by id.

## 4. publish_post

Sends a post out. It is public and cannot be taken back from here. It does what the Approve
button in the review queue does, so the person's yes in chat IS the review: call it only after a
yes that names the post, the accounts and the time.

| Field | What it takes |
|---|---|
| `clip_id` | The post's id from `create_post` (or `list_posts`) |
| `mode` | `now`, `schedule` or `queue`. ALWAYS pass it |
| `scheduled_for` | `"HH:mm"`, for `schedule` |

| Mode | What happens |
|---|---|
| `now` | Handed to the platforms at once. It goes live as soon as each platform takes it |
| `schedule` | At `scheduled_for`; without it, at the post's own time; without either, at 21:30. Read in the post's `timezone` |
| `queue` | The brand's next free posting slot, from its posting schedule. Refused when the brand has none |

- It works on a post that is `pending_review` or `approved`, and again on a post left
  `scheduled` by a failed hand-off (that is the retry). Anything else is refused.
- Left without `mode`, it is `schedule`: at `scheduled_for` from the call, else the post's own
  time, else 21:30. Always pass the `mode` the person chose.
- A `draft` post goes to the TikTok app's inbox instead of the audience (status `draft_sent`).
  It reaches no one until the person posts it there, so a short yes is enough.
- The answer: `status`, `mode`, `channels`, `scheduled_for`, `timezone`, and `goes_out`: one
  sentence saying when and where. Pass it on in your own words.
  - `status` is `published` right after `now` (`draft_sent` for a draft), and `scheduled` after
    `schedule` or `queue`.
  - After `queue`, `scheduled_for` is the slot the queue gave, a date and time in UTC
    ("2026-10-15 16:00 UTC" in `goes_out`). Say it in the post's zone: "Thursday at 19:00
    Istanbul time".
  - When `goes_out` says the default time was taken, say that the person can move it in
    Schedule (https://app.creatorline.io/publish).

## 5. The review queue

https://app.creatorline.io/review?activeBrand=<brand id> shows the brand's posts waiting for a
person. The page may not be in the app's menu, so the link is the way in: always give it.

- **Approve** sends the post out at its own `scheduled_for` time on the day it is approved, or at
  21:30 when it has none, in its `timezone`. So give it a time the person will approve before,
  and say so: "approve it before 19:00 and it goes out at 19:00".
- **Edit** changes the caption, hashtags, AI label and draft setting, then approves.
- **Decline** takes a reason; the post becomes `rejected`.
- Once a post is scheduled, Schedule (https://app.creatorline.io/publish) moves it to another
  day or time, edits its caption, or cancels it.

## 6. Statuses and list_posts

`list_posts` takes `brand_id`, `status` and `limit` (newest first). Each row: `id`, `status`,
`caption`, `channels`, `urls` (live links, once a platform confirms), `scheduled_for` and
`timezone` (before it goes out), `error` (why it did not go out), `draft`, `made_with_ai`.
There is no title: find a post by the start of its caption and its channels. A queued post's
`scheduled_for` is a full date and time in UTC: say it in the brand's zone.

| `status` | Meaning | Tell the person |
|---|---|---|
| `pending_review` | In the review queue; not public | "Waiting for your approval" with the review link |
| `approved` | Approved, being handed over | "On its way" |
| `scheduled` | Handed over; goes out at its time | "Scheduled for <time>" |
| `scheduled` with `error` | The hand-off failed; it stays scheduled | The reason; offer `publish_post` again (the retry) |
| `published` with `urls` | Live | One link per platform from `urls` |
| `published` without `urls` | Sent; the platforms have not shown it yet | "On its way, live in a few minutes" |
| `draft_sent` | In the TikTok app's inbox; final for Creatorline | "Finish it in the TikTok app" |
| `failed` | Did not go out (on some or all platforms) | The reason from `error`, per platform |
| `rejected` | Declined in the review queue | "It was declined in review" |

- After `now`, the platforms need a few minutes. Check once; with no `urls` yet, say it is on
  its way and to ask again in a few minutes.
- A `failed` post cannot be sent again. For the platforms that failed, make a new post with only
  those accounts (after the cause is fixed) and get a yes for it.

## 7. Refusals and fixes

The server's words start like the left column. Pass on what matters in plain words; never paste
the message.

| The answer says | Cause | Fix |
|---|---|---|
| "This brand has no connected channels" | No account can post | Connect one at https://app.creatorline.io/connections, then create the post again |
| "Connection @x (Platform) is not connected" | That account needs reconnecting | Reconnect it there, or post to the other accounts |
| "No connection ... on this brand" | Wrong id or another brand's account | `list_connections` with this `brand_id` |
| "Unknown channel ..." | A platform name not in the list | Use `IG`, `TikTok`, `YouTube` or `Telegram`, or `connection_ids` |
| "Pass `connection_ids` or `channels`, not both" | Both were sent | Send only `connection_ids` |
| "<Platform> does not support the <format> format" | The media does not fit (section 2) | Change the media or leave that platform out |
| "Photo format requires exactly 1 image", "Video format requires exactly 1 video" | Wrong count for the format | One video per post; photos as a carousel |
| "Carousel items must all be images" | A video in a carousel | Two posts |
| "Carousel needs 2-10 images ..." | Too few or too many photos | 2 to 10 |
| "<Platform> caption is too long" | Caption plus hashtags over that platform's limit | Shorten, drop hashtags, or a shorter caption for that platform |
| "Only TikTok can take a draft" | `draft` with other platforms | A draft for TikTok alone, or no draft |
| "`platform_settings` targets ..." | Settings for a platform the post does not go to | Drop them or add the account |
| "Unknown platform ... in `platform_settings`", "... is not a setting ... takes" | A wrong key | Keys are `IG`, `TikTok`, `YouTube`, `Telegram`; settings are `caption` and `scheduled_for`, plus `title` and `visibility` on `YouTube` |
| "`photo_cover_index` must be an integer between 0 and ..." | The cover points past the photos sent | A number from 0 to one less than the photo count |
| "One or more assets are missing, not yours, or have no media yet" | Unfinished run, wrong id, another workspace | `get_generation` until `succeeded`, or find it with `list_assets` |
| "A clip can only be published from pending_review or approved ..." | Already sent, live, failed or declined | `list_posts` to see where it stands |
| "This brand has no posting queue yet" | No posting schedule | `now` or a time; the schedule is set up in Schedule (https://app.creatorline.io/publish) |
| "The post could not be handed to the publisher: ..." | The platform or the account refused it | Say why. It stays scheduled; `publish_post` again is the retry, after a short yes. Reconnect the account first if the reason is about the login |
| "This API key is read-only" | A key without write access | House rules, section 8 |

A refusal about the plan, the free trial or the workspace: house rules, section 8.

## 8. Several posts

1. Find every piece and check each fit (section 2). Video Studio projects that still need an
   export: price all the exports together and get one yes before any of them starts.
2. Write each caption ([captions](captions.md)); vary the first lines and the specific hashtags.
3. Show one table: piece, accounts, the caption's first line, when. Ask one yes for the table.
4. One `create_post` per piece, in the order they should go out, then one `publish_post` each.
5. `mode: "queue"` spreads them over the brand's posting slots, one each; every answer says its
   slot. A time of day fits only one post per account.
6. Report once: one line per post with where and when, then one "What next?".

A piece that fails a check is left out of the batch and named; the rest go on.

## 9. Posting from the brand's phone

`physical_device: true` posts from a real phone bound to the brand, beside or instead of the
accounts. Use it only when the person asks for it. It needs the workspace to have the feature
and a phone bound to the brand; the answer says which is missing. Phone only: pass
`"channels": []` with it. It cannot be combined with `draft`.
