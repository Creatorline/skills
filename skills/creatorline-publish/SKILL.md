---
name: creatorline-publish
description: "Turns a finished video or photos into a post: caption, hashtags and YouTube title in the brand's voice, the right accounts, the review queue, then posting or scheduling only on the person's yes. Also checks if a post went live. Use for post this, schedule it, a caption for this video. Not for making media: use creatorline. Words on the video: creatorline-captions."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Post and Schedule

You turn a finished video, photo or set of photos into a post: a caption that stops the scroll
and sounds like the brand, a few hashtags that help people find it, the right accounts, and the
right time. The post goes into the brand's review queue first, where nothing is public. It goes
out only when the person says yes to that exact post, on those accounts, at that time. Then you
tell them when it goes out, and later whether it went live. Posting uses no credits.

Run the session by [the house rules](references/house-rules.md) and ask every question the way
[asking](references/asking.md) says. This file adds only what is particular to posting.

## When to use

- "Post this", "put it on TikTok and Instagram", "schedule it for tonight", "send it to my
  TikTok drafts".
- "Write a caption for this post", "hashtags for this video", "a YouTube title": for media that
  is finished, even when no post is asked for yet (the words as text, step 7).
- A format skill just finished a piece and the person wants it out.
- "Did it post?", "is it live?", "why did my post fail?", "what is scheduled?".
- Several finished pieces to post at once (ad variations, a batch the person made).

## Not for

| The ask | Use |
|---|---|
| Making the video or photos first | the format skill (`creatorline` routes it) |
| Words burned onto the video (speech captions, a hook headline) | `creatorline-captions` |
| A cover or thumbnail image | `creatorline-cover-image` |
| A week of posts, planned and made | `creatorline-content-calendar` (it files its own posts) |
| A script, hooks or a caption for a video not made yet | `creatorline-short-script` |
| Someone else's video re-made with the avatar | `creatorline-reshoot` |
| Connecting an account, editing, moving, cancelling or deleting a post already made, analytics | the app ([below](#what-only-the-app-does)) |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| The media | Only when nothing in the conversation or the library fits | The piece just made in this conversation |
| Brand | Only with several brands and no hint | The brand the media was made for |
| Accounts | Only when no account can post, or several share a platform and none is pinned to the avatar | One account per platform, `can_publish: true`, the avatar's own account first |
| Caption, hashtags, YouTube title | No | Written by you in the brand's voice; the person's own text used as written |
| When | One question, unless they already said | Follows the ask (step 7) |
| Time zone | No | Theirs when known, else the main zone of the brand's `country` ([timing](references/timing.md), section 2) |
| AI label | No | `made_with_ai: true` on anything made or voiced with AI |
| Language | No | The brand's `language` |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-publish"`.
2. **Orient** (house rules, section 1). Posting spends nothing, so skip the balance unless an
   export is needed (step 3). Keep from `get_brand`: `brand_voice`, `language`, `country` and
   `vertical`.
3. **Find the media.** Use the first source that fits:

   | Where it is | How to get its asset id |
   |---|---|
   | Made in this conversation, finished | `get_generation`: `output[].asset_id` of a `succeeded` run |
   | Made in this conversation, still running | `get_generation` with `wait_seconds: 45` until `succeeded`; one short line between calls ("Still rendering, about a minute left.") |
   | A Video Studio project | `list_videos` with `brand_id` (find it by title), then `get_video`: `export.asset_id` when `export.status` is `done` and `up_to_date` is true |
   | A Video Studio project not exported, or edited since | `export_video` spends credits: call it without `confirm`, tell the person the credits and their balance, and on a yes call it with `confirm: true`. Read `get_video` every 10 to 30 seconds until `export.status` is `done`, with one line between reads ("Exporting the final video.") |
   | Made earlier | `list_assets` with `brand_id`, `file_type` and `search` (words from what it shows); `preview_assets` to look; name it back to the person |
   | A link to a file | `import_asset` with `url` and `brand_id` |
   | A file on their device | They drop it on https://app.creatorline.io/assets; then `list_assets` |

   Only media the brand made or owns. Someone else's TikTok or Reel is never reposted as it is:
   offer to re-film it with the avatar (`creatorline-reshoot`). When you did not make the piece
   in this conversation, look at it first with `preview_assets` and say in one line what it is.
4. **Pick the accounts.** `list_connections` with `brand_id`.
   - Use only rows with `can_publish: true`. A row with `false`: name it ("TikTok @glowlab needs
     reconnecting") with https://app.creatorline.io/connections?activeBrand=<brand id>.
   - An account whose `avatar_id` is the avatar in the piece is that avatar's own account: pick
     it. Leave out an account pinned to a different avatar unless the person names it.
   - Several accounts on one platform and none pinned to this avatar: ask which, by handle, in
     the same message as step 7.
   - No account can post: stop here. Connecting happens in the app (link above). Offer to write
     the caption now; the media waits in the library.
5. **Check the fit** before you write anything ([the posting reference](references/posting-reference.md),
   section 2):

   | Media | TikTok | Instagram | YouTube | Telegram |
   |---|---|---|---|---|
   | One video | yes | yes | yes | yes |
   | One photo | no | yes | no | yes |
   | 2 to 10 photos (carousel) | yes | yes | no | yes |
   | A video and photos together | no | no | no | no |

   A single photo for TikTok: add a second photo for a carousel, or animate it into a clip
   first. A video with photos: make them two posts. Leave out a platform the media cannot go
   to, and say so in one line.
6. **Write the post** with [captions](references/captions.md):
   - `caption`: the hook line first, then 1 to 3 short lines, then one call to action;
   - `hashtags`: 3 to 6 bare words, no `#` (at most 5 when Instagram is in);
   - a YouTube title (at most 100 characters) and visibility (`public` unless asked);
   - from `brand_voice`: its tone, its `call_to_action`, never a `donts` item;
   - the person's own caption: use it as written; change only what breaks a limit or the claim
     floor, and say what you changed.
7. **Show the post and ask when it goes out**, in one message: the post as a short block, then
   one question (plus the account question from step 4, if any). With a question tool, the
   questions go in the tool (asking.md, section 3); otherwise as a numbered list. The
   recommended option comes first and depends on the ask:

   | The person said | Recommended option |
   |---|---|
   | "Post it" with no time | The next good hour later today ([timing](references/timing.md), section 4); none left today: the next posting slot |
   | A time today ("tonight at 8") or "now" | No question: one yes that names the post, the accounts and that time |
   | Nothing about posting, "get it ready", or a teammate approves | The review queue |
   | Another day ("Friday at 9") | The review queue, timed for that hour ([timing](references/timing.md), section 3) |
   | Only the words ("write a caption") | No question: give the caption, hashtags and title as text to copy, and offer posting as the first next step. Create nothing |

   The person asked to post it, with no time:

   > **TikTok @glowlab and Instagram @glow.mia**: the serum video, AI label on
   > Caption: "Two drops is the whole routine. Goes on before moisturizer, on dry skin. What's
   > your step one?"
   > Hashtags: #skincare #vitamincserum #morningroutine #glowlab
   >
   > When should it go out?
   > 1. Today at 19:00 Istanbul time on both, a good evening hour for beauty (recommended)
   > 2. Right now on both
   > 3. In the brand's next posting slot on both
   > 4. Into your review queue: it waits for your approval in the app, then goes out at 19:00
   >    on the day you approve it
8. **Create the post.** `create_post` with every field the choice needs (all free):

   ```json
   {
     "brand_id": "<brand id>",
     "asset_ids": ["<the video's asset id>"],
     "caption": "Two drops is the whole routine.\nGoes on before moisturizer, on dry skin.\nWhat's your step one?",
     "hashtags": ["skincare", "vitamincserum", "morningroutine", "glowlab"],
     "connection_ids": ["<id of TikTok @glowlab>", "<id of Instagram @glow.mia>"],
     "timezone": "Europe/Istanbul",
     "scheduled_for": "19:00",
     "made_with_ai": true
   }
   ```

   - Always `connection_ids` (the exact accounts the person saw) and `timezone`.
     `publish_post` takes no time zone: the post's own is used.
   - `scheduled_for` ("HH:mm", 24-hour) with the time you offered, the review queue included: a
     post approved in the app goes out at its own time that day, or at 21:30 when it has none.
   - YouTube: `"platform_settings": {"YouTube": {"title": "...", "visibility": "public"}}`.
   - TikTok draft (they finish it in the TikTok app): `"draft": true`, TikTok accounts only.
   - Read the answer back: `channels`, `connection_ids`, `draft` and `made_with_ai` must match
     what the person saw. If not, stop and say what differs.
9. **Publish, only on a yes** that names this post, these accounts and when. Picking an option
   that spells all three out is that yes. A yes given before the person saw the final caption
   ("make it and post it tonight") is intent: confirm once with the post in front of them.

   ```json
   {"clip_id": "<clip_id from create_post>", "mode": "schedule", "scheduled_for": "19:00"}
   ```

   - ALWAYS pass `mode`: `now`, `schedule` (with `scheduled_for`) or `queue`. Left out, it is
     `schedule`: at the post's own time, or 21:30 when it has none.
   - Pass on `goes_out` from the answer in your own words. A queue slot comes back in UTC
     ("2026-10-15 16:00 UTC"): say it in the brand's zone ("Thursday at 19:00 Istanbul time").
   - The review queue was picked: do not call `publish_post`. Show the review card (below).
10. **Show** (below), then offer next steps.
11. **Status, when asked** ("did it post?"): `list_posts` with `brand_id`, newest first. Find
    the post by its caption and channels, then read its `status` with
    [the posting reference](references/posting-reference.md), section 6. After `now` the post
    reads `published` at once, and its live links (`urls`) follow once each platform shows it,
    usually within a few minutes: check once, then say when to ask again.

## Craft

The full craft, with examples, is in [captions](references/captions.md). The core:

- **The first line is the post.** Most viewers see only it before "more". It continues the
  video's hook instead of repeating the words on screen.
- **Short.** One hook line, 1 to 3 short lines, one call to action. Line breaks, not a paragraph.
- **One call to action**, matched to the goal: a question people can answer in a few words, a
  reason to save, "follow for part 2" only when there is a part 2, "link in bio" only when the
  bio has the link.
- **Say the searchable words.** Name the thing, the problem and the place plainly: captions are
  searched on TikTok and Instagram.
- **Hashtags that describe**, not filler: 1 broad, 2 or 3 specific, 1 for the brand. Never
  another brand's tag or a trend the post is not part of.
- **The claim floor holds in captions too.** The avatar has no history: no "I've used it for
  months", no invented reviews, results, prices or discounts (house rules, section 7).
- **Disclose.** `made_with_ai: true` sets the AI label where the platform has one (TikTok,
  YouTube). A sponsored post opens with "#ad".

## Check before you post

- The media is finished, is the one the person meant, and you looked at it.
- Every account has `can_publish: true` and takes this format.
- Caption plus hashtags fits each platform's limit (Telegram 1,024 characters; TikTok and
  Instagram 2,200; YouTube 5,000). One shared caption has to fit the smallest.
- Nothing from `brand_voice.donts`; no claim beyond the label and what the video shows; no other
  brand's name, handle or tag; no @mention of a real person without their consent.
- `made_with_ai` is set; `timezone` is set; a time today has not already passed in that zone.
- The yes names the post, the accounts and the time, and `mode` matches it.

## If it goes wrong

| What happened | Do this |
|---|---|
| "This brand has no connected channels" | Connect one at https://app.creatorline.io/connections?activeBrand=<brand id>; then create the post again |
| "Connection @x (TikTok) is not connected" | That account needs reconnecting (same link); post to the others now if the person wants |
| "TikTok does not support the photo format", "YouTube does not support ..." | Fix the fit (step 5) and create it again without that platform |
| "... caption is too long" | Shorten the caption or drop hashtags; Telegram is the tightest |
| "One or more assets are missing, not yours, or have no media yet" | The run is not finished or the id is wrong: check `get_generation` or `list_assets` |
| "This brand has no posting queue yet" | Offer `now` or a time today; the posting schedule is set up in Schedule (https://app.creatorline.io/publish?activeBrand=<brand id>) |
| "The post could not be handed to the publisher: ... stays scheduled" | Say why in plain words; `publish_post` again on the same post is the retry (one short yes) |
| "A clip can only be published from pending_review or approved ..." | It already went out, failed or was declined: `list_posts` shows which |
| `list_posts` shows `failed` with `error` | Pass on the reason. It cannot be published again: offer a new post for the platforms that failed |
| A wrong caption on a post already created | It is edited in the app while the post has not gone out: the review queue, or Schedule once it is scheduled |
| A refusal about the plan, the trial or the workspace | House rules, section 8 |

Every refusal and its fix: [the posting reference](references/posting-reference.md), section 7.

## Show the result

**In the review queue** (`create_post`, no publish):

```
**Ready for review**: Mia's serum review, a 12-second video for TikTok @glowlab and Instagram @glow.mia
"Two drops is the whole routine." · goes out at 19:00 Istanbul time on the day you approve it
[Open your review queue](https://app.creatorline.io/review?activeBrand=<brand id>)
Nothing is public yet. No credits used.

What next?
1. Post it now, or at 19:00 today, on both accounts
2. Three versions with other hooks, to see which one works
3. The next video in the same style
```

The review page may not be in the app's menu: always give this link.

**Scheduled or posted** (`publish_post`):

```
**Scheduled**: Mia's serum review on TikTok @glowlab and Instagram @glow.mia
Goes out today at 19:00, Istanbul time.
[See your schedule](https://app.creatorline.io/publish?activeBrand=<brand id>)
No credits used.

What next?
1. Ask me after 19:00 whether it went live
2. Three versions with other hooks, to see which one works
3. Plan the rest of the week
```

After `now`, the first line is "**Posted**" and the second "Live on both in a few minutes." When
the post needed a paid export first, the credits line names that export's credits and the
balance left.

**Live** (from `list_posts`): one link per platform from `urls`, named by the platform in the
link ("Watch on TikTok"). **Failed**: what failed, on which platform, the reason from `error`,
and the one fix you suggest.

## Next steps to offer

| After | Offer |
|---|---|
| Review queue | post it now or at a time; versions with other hooks (`creatorline-ad-variations`); the next piece |
| Scheduled or posted | "Ask me later if it went live"; versions with other hooks (`creatorline-ad-variations`); a week of posts (`creatorline-content-calendar`) |
| Live | the next video in the same style; the same piece on a platform it did not go to; results in Analytics (https://app.creatorline.io/analytics) |
| A TikTok draft | open the TikTok app's inbox to add a sound and post it |

## Several posts at once

Pieces from ad variations or a batch the person made: write each post, then show one table
(piece, accounts, caption first line, when). One yes covers the table as shown. If any piece
still needs an export, price all the exports together first and get one yes for them.

- One `create_post` per piece, in the order they should go out.
- `mode: "queue"` for each spreads them over the brand's posting slots, one per slot, and each
  answer says its slot. A time today fits only one of them.
- Never two posts at the same time on one account.
- Report once at the end: one line per post with its time, then one "What next?".

## What only the app does

| Task | Where |
|---|---|
| Connect or reconnect an account, pin an avatar to it | https://app.creatorline.io/connections |
| Approve, edit or decline a post waiting for review | https://app.creatorline.io/review |
| Move a scheduled post to another day or time, edit its caption, cancel it; the posting schedule | https://app.creatorline.io/publish |
| Live posts | https://app.creatorline.io/published |
| Take down a post that is live | on the platform itself |

Each of these pages shows one brand at a time: add `?activeBrand=<brand id>` to the link.

## References

- [Captions](references/captions.md): caption shape, hook lines, calls to action, hashtags,
  per-platform notes, the brand's voice, disclosure, worked examples.
- [Posting reference](references/posting-reference.md): every `create_post` and `publish_post`
  field, the media and platform rules, accounts, statuses, refusals and fixes, batches.
- [Timing](references/timing.md): the four ways a post goes out, time zones, another day, good
  hours by brand category.
- [House rules](references/house-rules.md): the session, consent, the result card, safety, the
  server's refusals, what only the app does.
- [Asking](references/asking.md): how to ask, and how little.
