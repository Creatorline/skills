# Posting the week

How each finished piece becomes a post in the review queue, and how a whole week of posts goes
out on its days with one clear yes.

## Contents

1. [Filing each piece](#1-filing-each-piece)
2. [Captions and hashtags](#2-captions-and-hashtags)
3. [Why later days carry no time](#3-why-later-days-carry-no-time)
4. [The three ways out](#4-the-three-ways-out)
5. [Checking on the week](#5-checking-on-the-week)
6. [Making it repeatable](#6-making-it-repeatable)

## 1. Filing each piece

File a piece as soon as it passes its checks, not at the end of the week: what is filed is safe
in the review queue even if the chat stops. `create_post` is free and makes nothing public.

| Field | Value |
|---|---|
| `brand_id` | The brand |
| `asset_ids` | The finished file: the captioned or exported video (the last step's output, or `export.asset_id` from `get_video`), never the raw take when a finished one exists. A carousel: 2 to 10 photo ids, the cover first |
| `caption` | Section 2 |
| `hashtags` | 3 to 5 bare words, no `#` |
| `made_with_ai` | `true`, on every post |
| `channels` | The row's platforms (`IG`, `TikTok`, `YouTube`, `Telegram`) when the brand has one account on each |
| `connection_ids` | Instead of `channels`, never with it: the exact accounts, when the brand has several on one platform or the row goes to an account pinned to its avatar |
| `timezone` | The brand's market zone, such as `Europe/Istanbul` |
| `scheduled_for` | Only for a post meant for today: `"HH:mm"`. Section 3 |
| `platform_settings` | `{"YouTube": {"title": "<the hook, short>"}}` when YouTube is a target. A key must be a platform the post goes to |
| `photo_cover_index`, `auto_add_music` | TikTok carousels only: the cover photo (0 is the first) and TikTok's own music (on unless turned off) |

`format` can stay out: one video makes a video post, 2 or more photos a carousel, one photo a
photo post. Keep each answer's `clip_id` with its row and set the row to "In your review queue".

**When it is refused:**

| The answer says | Do this |
|---|---|
| The brand has no connected channels | Keep the piece in the library. Accounts are connected at https://app.creatorline.io/connections; file it after. |
| An account is not connected, or `can_publish` is false | It must be reconnected at the same page. File the post to the other accounts now, if the person agrees. |
| A platform does not take the format | Drop that platform for this post: YouTube takes video only, TikTok takes no single photo. |
| A caption is too long | Shorten it, or give that platform its own words in `platform_settings.<platform>.caption`. |

## 2. Captions and hashtags

Write each caption from `brand_voice`, in the brand's `language` unless the person asked for
another.

- **Line 1** says the hook again in other words: it is what shows before "more".
- **Then** one or two short lines of value or context: the tip, the step, what to look at.
- **Last**, the brand's `call_to_action`. Calls to action live in the caption, never in the
  spoken lines.
- **Voice:** keep to `tone` and `dos`; the `donts` are hard rules.
- **Facts:** only the product card, the label and approved claims. Offer words, prices and
  dates only as the person gave them.
- **The week as a set:** every caption opens differently, and no two posts share their
  hashtags exactly.
- **Hashtags:** one or two for the niche, one or two for the topic, the brand's own tag if it
  uses one. No other brand's name, nothing unrelated to the post.
- **Limits** (hashtags count): Instagram and TikTok 2,200 characters, YouTube 5,000, Telegram
  1,024.

## 3. Why later days carry no time

`scheduled_for` on `create_post` takes a time of day, `"HH:mm"`, and no date. Creatorline reads
it as that time on the day the post is approved or published, in the post's time zone. A
Thursday post filed on Monday with `"19:00"` and approved on Monday would go out on Monday at
19:00.

So:

- a post meant for today gets `scheduled_for` and `timezone`;
- every later post gets `timezone` only. Its day comes from one of the three ways out below.

A post without a time that is approved in the app joins the brand's posting schedule, which is
what a week wants.

## 4. The three ways out

Offer them in the week card, the first as recommended. `publish_post` is public and cannot be
taken back: call it only after a yes that names the posts, the accounts and the timing.

| Way | Fits when | What you do |
|---|---|---|
| 1. Into the posting schedule (recommended) | The person wants it done from here | One yes for the list. Then `publish_post` with `clip_id` and `mode: "queue"` for each post, in calendar order: each takes the brand's next free posting slot. Read back each answer's `goes_out`: a slot comes in UTC ("2026-10-23 16:00 UTC"), so say it in the brand's time ("Thursday 19:00, Istanbul time") and put that on the board. |
| 2. In the app | The person wants to look first, or to pick exact days | Give the review queue, https://app.creatorline.io/review, and the calendar, https://app.creatorline.io/publish, each with `?activeBrand=<brand id>`. An approved post joins the posting schedule; any post can be moved to another day in the calendar. Nothing for you to call. |
| 3. One a day from here | The person wants exact times and will come back | On the day, when they ask, get a yes for that post, its accounts and its time, then `publish_post` with `mode: "schedule"` and `scheduled_for: "HH:mm"` (or `mode: "now"`). Read `goes_out` back. |

The yes for way 1, in one message:

> Send these five to TikTok @glowlab and Instagram @glow.mia, each into the next free slot of
> Glow Lab's posting schedule, Monday's first? Each goes public in its slot, and I'll tell you
> the day and time of each. Yes to all five?

- Always pass `mode`. Left out, a post is scheduled for 21:30.
- A yes covers exactly the posts, accounts and timing it named. A post added later needs its
  own yes.
- The schedule decides the slots, not the calendar you drew. When a slot lands far from the
  planned day, say so; the person can move it in the app's calendar.
- `queue` refused ("This brand has no posting queue yet"): the posting schedule is set in the
  app's calendar, https://app.creatorline.io/publish. Offer way 2 or 3 meanwhile.
- A TikTok-only post can be filed as a draft (`draft: true` on `create_post`): it goes to the
  TikTok app's inbox, where the person finishes it (a sound, for example) and posts it
  themself. It reaches no one until then.

## 5. Checking on the week

`list_posts` with `brand_id` (and `status` to narrow it) gives each post's state:

| `status` | Tell the person |
|---|---|
| `pending_review` | Waiting in the review queue |
| `approved`, `scheduled` | On its way; `scheduled_for` says when, when known |
| `published` | Live; its `urls` are the links |
| `draft_sent` | In the platform app's inbox, for them to post |
| `failed` | It did not go out: pass on `error` in plain words |

A post whose hand-off failed stays `scheduled` with an `error`; `publish_post` again retries it,
after a yes. Live posts are at https://app.creatorline.io/published and results at
https://app.creatorline.io/analytics (both with `?activeBrand=<brand id>`; Analytics depends on
the workspace's package).

## 6. Making it repeatable

Offer it once the week is filed: "Want this talking video saved as a recipe, so next week's is
one ask away?"

- Hand it to `creatorline-workflows`. It builds one workflow per repeating format: the
  generation step, the topic as an input, and a publish step that files into the review queue.
  Nothing a workflow makes goes public on its own.
- **A new topic is a new run.** A run uses the topic the workflow holds at that moment; it does
  not move on to the next one by itself. So the usual rhythm is on demand: "run my tip video
  with this week's topic", priced and approved like any run.
- **A weekly `schedule`** (days with `"HH:mm"` slots and a time zone) makes the same recipe on
  every slot, with the topic it holds, and uses credits on every run with no further yes. Offer
  it only for a format that should repeat as it is. Get one run's price first and the person's
  explicit yes to the repeat (house rules, section 2).
- What repeats well: talking videos and product videos. A reshoot needs a new link every time,
  so it stays a chat job; the workflows skill says which other formats a workflow can make.
- A workspace without workflows gets the server's own message and link. Offer to make next
  week's calendar here instead.
