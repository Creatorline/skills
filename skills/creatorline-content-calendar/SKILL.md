---
name: creatorline-content-calendar
description: "Turns a brand into one or two weeks of posts: topics from its content angles, a 7 or 14 day calendar of formats, hooks and times, then each piece made with its format skill and filed for review. Use for a content calendar, a week of posts, what to post this week, a launch week. Not for one video or photo: use its format skill. Finished media: creatorline-publish."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Content Calendar

You turn a brand into a week (or two) of posts the person can take in at a glance, then make
them. Topics come from the brand's own content angles. The calendar mixes formats so the feed
never repeats itself: the avatar talking to camera, a trending video re-filmed, a carousel, the
product at work. The whole week is priced as one number before anything runs. Every piece is
made by the format skill built for it, checked, and filed in the review queue with its caption.
The person answers one short message, says yes once, watches the week fill up, and decides with
a second yes how it goes out. Nothing public happens without that second yes.

Run the session by [the house rules](references/house-rules.md) and ask the way
[asking](references/asking.md) says. Briefs follow [video briefs](references/video-briefs.md);
the product comes in once, the way [product intake](references/product-intake.md) says. This
file adds what is particular to a plan: reading the brand, building the calendar, pricing and
running a batch, and getting a week of posts out.

## When to use

- "Plan my week", "a content calendar", "a week of posts", "what should I post this week",
  "two weeks of content", "launch week", "fill my feed".
- The person names the mix: "seven posts for launch week: two reshoots, three talking videos,
  two carousels".
- The calendar only ("just the plan", "ideas for the week"): free, nothing is made until they
  pick posts.
- Picking up a week started earlier in this conversation: "how's my week going?", "make the
  rest", "post Thursday's".

A month is planned two weeks at a time: plan the first two, make week 1, come back for the rest.

## Not for

| The ask | Use |
|---|---|
| One talking video, one reshoot, one carousel, one product video | `creatorline-talking-video`, `creatorline-reshoot`, `creatorline-photos`, `creatorline-product-video` (any other single piece: `creatorline` picks the skill) |
| Posting or scheduling media that is already made | `creatorline-publish` |
| Hooks or a script for one video, nothing filmed | `creatorline-short-script` |
| One recipe saved to run again, on demand or on a weekly schedule | `creatorline-workflows` (offer it after a week is made) |
| Many versions of one video | `creatorline-ad-variations` |
| A long video cut into shorts | `creatorline-long-to-shorts` (it can also fill rows of a plan) |
| A recurring show of longer episodes | `creatorline-ai-host` |

## What you need

| Item | Hard gap? | Default, stated in one line |
|---|---|---|
| Brand | Only with several and no hint | The only brand |
| Calendar only, or calendar and making | No | Not said: the calendar with the week's total under it; one yes makes it |
| How many posts | No (one optional question) | 5 posts over 7 days; 10 over 14 |
| What the week is for | No (one optional question) | Growing the audience |
| Topics | No | The brand's `brand_voice.content_angles`; without them, three angles you name from its bio and niche |
| Avatar | No | The brand's default avatar. An account pinned to another avatar posts that avatar |
| Product photo | Yes, when a row shows the product and the library has none | Found with `list_assets` |
| A link per trend reshoot | Yes, for reshoot rows only | No link: that row becomes a talking video, said in the calendar |
| Screens (app promo), garment photos (try-on) | Yes, for those rows only | Leave those formats out |
| Where | No | Every connected account with `can_publish: true` |
| Days and times | No | From tomorrow, at the niche's usual hours in the brand's market time ([planning](references/planning.md), section 7) |
| Language | No | The brand's `language` |
| Length, frame, look | Never ask | Each format skill's default: videos 9:16 at 720p, carousel photos 3:4, all shot like a phone |
| Captions on videos with speech | No | On |

## The flow

1. **Activate.** When `track_skill_activation` is in your tool list, call it once with
   `skill_name: "creatorline-content-calendar"`. The format skills run inside this request: never
   call it again for them, for a poll or for a retry.
2. **Orient and read the brand** (house rules, section 1). Brand not known yet: `list_brands`
   first (several: ask which, by name). One line to the person ("Reading Glow Lab's angles and
   what's already posted."), then these free calls together:
   - `get_brand`: `brand_voice` (content angles, tone, do's and don'ts, audience, call to
     action, positioning, format notes), `language`, `country`, `vertical`, `default_avatar_id`;
   - `list_avatars`, then `get_avatar` on each avatar the week will use (`voice_id`, persona);
   - `list_connections` with `brand_id`: the accounts that `can_publish`, and any pinned
     `avatar_id`;
   - `list_posts` with `brand_id` and `limit: 50`: recent topics not to repeat, and posts
     already waiting or scheduled;
   - `list_assets` with `brand_id`, `file_type: "image"` and the product's name as `search`
     (from `positioning.product` or the person's words); again with `file_type: "video"` and
     `source: "generated"` for recent videos that may never have gone out;
   - `get_credit_balance`.

   What each answer gives the plan: [planning](references/planning.md), section 1.
3. **Intake.** Only the gaps, in ONE message, at most three questions, the recommended option
   first, then one line of defaults. With a question tool in your list, use it (asking.md,
   section 3).

   > Let's line up Glow Lab's week. Three quick things:
   > 1. How many posts? 1) 5 across the week (recommended) 2) 7, one a day 3) 3
   > 2. What is the week for? 1) Growing the audience (recommended) 2) Selling the Glow C serum 3) A launch
   > 3. A trend to re-film with Mia? 1) None this week: a talking video takes that day
   >    (recommended) 2) Yes: paste the TikTok or Reels links
   >
   > Defaults: Mia, from tomorrow, TikTok and Instagram, evenings Istanbul time, captions on,
   > in Turkish, the serum photo from your library. Say if you want any changed.

   "Just do it" or a mix already given: skip the questions you can default and go on.
4. **Build the calendar** ([planning](references/planning.md)): angles, then the mix, the
   order, one concrete hook per row, days and times, the accounts each format can go to. Run
   the calendar checks below, then show the calendar card (Show the result, card 1).
   - **Calendar only** asked, or `free_trial: true`: end with "Make all five, pick some, or
     change a row?". Nothing is priced until they pick.
   - **Plan and make** asked, or not said: price it first (step 5) and put the total under
     the calendar.
5. **Price the whole week** ([batch production](references/batch-production.md), sections 1
   to 3). Quote every paid call of every row with nothing confirmed: each generation's
   `generate_*` tool without `confirm` (an estimate while the row's inputs are not there yet,
   the exact price once they are), `get_video_guide` `credits` for Video Studio steps. Add them up.
   One message: each row's credits, the total, the balance, one question. `sufficient: false` or a
   budget: offer a lighter week (fewer posts, more carousels, shorter clips), never a partial
   start.
6. **Make it** ([batch production](references/batch-production.md), sections 4 to 9). On yes:
   - keep up to three rows in production at a time, in calendar order;
   - each row runs its format skill from its brief step (orientation, questions and price are
     already done), with the row's hook, angle, avatar, product card and language carried
     over. When that skill is not available to you and `get_guide` is in your tools, call it
     with the skill's name minus `creatorline-` as `topic` and follow that;
   - the person's yes covers each row at its quoted price. Before each paid call, read its price
     without `confirm`; at or under the row's quote, call again with `confirm: true`; above it,
     pause that row and ask;
   - wait with `get_generation` and `wait_seconds: 45`; one short line between calls; show the
     progress board (card 2) when a row lands;
   - check each take with its skill's checks, then finish it as quoted: the avatar's own voice
     first, captions last (they are read from the final speech).
7. **File each piece as soon as it passes** ([posting the week](references/posting-the-week.md),
   sections 1 to 3): `create_post` with `brand_id`, `asset_ids`, a caption in the brand's voice,
   `hashtags`, `made_with_ai: true`, the row's `channels` or `connection_ids`, and `timezone`.
   Set `scheduled_for` ONLY on a post meant for today: it takes a time and no date, read as
   that time on the day of approval, so a Thursday post filed with "19:00" and approved today
   would go out today.
8. **Get the week out** ([posting the week](references/posting-the-week.md), section 4). Offer
   three ways in the week card (card 3): into the brand's posting schedule (recommended), the
   person approves and picks days in the app, or one a day from this chat. `publish_post` only
   after a yes that names the posts, the accounts and the timing. For the schedule:
   `publish_post` with `mode: "queue"` for each post, in calendar order; read each `goes_out`
   back (a slot comes in UTC: say it in the brand's time) and put the real day and time on the
   board.
9. **Close** with the next steps below.

## Craft

The long form, with tables and examples, is [planning](references/planning.md).

- **One idea per post, one angle per idea.** An angle is a direction ("ingredient facts"); a
  post is one concrete idea inside it ("why vitamin C goes on before moisturizer"). Spread the
  week over three or more angles, none more than twice.
- **Mix formats, never repeat one two days running.** Talking videos carry trust, re-filmed
  trends carry reach, carousels get saved, product pieces show the thing working.
- **Write every hook now**, specific and already in motion: a number, a mistake, a hot take, a
  question the audience asks, the result shown first, the avatar's own verdict. Rotate the type
  through the week.
- **Value before the sell.** Open the week with something easy to watch; the product shows up
  from the second post, and a launch week builds tease, reveal, demo, how to use, questions.
- **Fewer, better posts.** Three to five a week beats one, and quality beats daily for most
  niches; daily suits food, pets and entertainment.
- **Post when the niche watches,** in the brand's market time: the hours Creatorline pre-fills
  in a new brand's posting schedule, so a week sent to the schedule lands close to the plan.
- **One look for the whole week:** the same avatar, the same product card word for word in
  every brief, the same caption voice.

## Check before you show it

**The calendar**, before you show it:

- every row has one concrete hook in the brand's language, and no two hooks open alike;
- angles are spread; nothing repeats a topic from the recent posts in `list_posts`;
- no format two days running; the strongest piece sits on the niche's best day;
- every row's inputs exist or are asked for in the intake (product photo, trend link, screens);
- every row's format suits its accounts: YouTube takes video only, TikTok takes no single
  photo, a carousel holds 2 to 10 images;
- hooks keep to Safety (house rules, section 7) and the brand's don'ts.

**The week as a set**, before you file the last post:

- the same avatar face in every piece (look at covers with `preview_assets`);
- the product looks the same everywhere: label, colour, size in hand;
- every piece passed its own skill's checks; lengths match the calendar;
- captions open differently and keep the brand's voice; `made_with_ai` is on every post.

## If it goes wrong

Every failed run is refunded automatically: say so. The batch cases are in
[batch production](references/batch-production.md), section 9.

| What happened | Do this |
|---|---|
| `free_trial: true` | Show the calendar (free), price nothing, and say nothing that uses credits runs until the plan is started in the app (house rules, section 8). Offer each row's script with `creatorline-short-script`. |
| No avatar on the brand | A faceless week: narrated videos, carousels without a person, product videos. The avatar is made at https://app.creatorline.io/avatars/new. |
| No connected account, or none with `can_publish` | Make the week anyway; it waits in the library. Accounts are connected at https://app.creatorline.io/connections; then file the posts. |
| `sufficient: false` on the week | Name the shortfall, pass on the server's line about credits, and offer a lighter week. Start nothing. |
| A row's live price is above its quote | Pause that row only, say the difference, ask. The others go on. |
| A take fails its check | Give it one verdict (house rules, section 5). If the same flaw would hit the rest of that format (wrong product look), hold those rows and ask before more spend. |
| A run failed | Refunded. Say which row, what you would change; a retry is a new yes. Ask once for all failed rows together. |
| No link for a reshoot row | Swap it for a talking video on the same angle and say so. To find a trend, the app's Trends page: https://app.creatorline.io/trending with `?activeBrand=<brand id>` (not every workspace has it). |
| `publish_post` with `queue` refused: no posting queue | The posting schedule is set in the calendar at https://app.creatorline.io/publish. Meanwhile offer the other two ways. |
| The chat ended mid-week | Rebuild the board: `list_posts` (`status: "pending_review"`, `brand_id`), `list_assets` (`brand_id`, `source: "generated"`), `list_videos` (`brand_id`). Never start a row twice. |

## Show the result

Three cards. Names only, never ids; media links expire, so add the Creatorline link each time.

**1. The calendar** (one table; a two-week plan gets a table per week):

```
**Glow Lab, Mon 20 to Sun 26 Oct** · 5 posts · Mia · TikTok and Instagram

| Day | Format | Hook | Avatar | Where | Time |
|---|---|---|---|---|---|
| Mon 20 | Talking video, tip | "Two drops. That's the whole routine." | Mia | TikTok, Reels | 19:00 |
| Tue 21 | Trend reshoot, your "shelf tour" link | The trend's opening, with the serum | Mia | TikTok, Reels | 19:00 |
| Thu 23 | Carousel, 6 photos | "What goes on first, and why" | Mia | Instagram, TikTok | 19:00 |
| Fri 24 | Product video | The dropper drawing up serum, up close | Voice only | TikTok, Reels | 18:00 |
| Sat 25 | Talking video, hot take | "Unpopular opinion: ten steps is too many." | Mia | TikTok, Reels | 12:00 |

Angles: ingredient facts (Mon, Fri), routine (Tue, Thu), myths (Sat).
All five: <total> credits; you have <balance>. Each one waits in your review queue; nothing
posts without you. Make them?
```

**2. The progress board**, when a row lands or a turn ends mid-batch:

```
**Making your week**: 2 of 5 ready
| Day | Piece | Now |
|---|---|---|
| Mon | Tip video | In your review queue |
| Tue | Trend reshoot | Filming |
| Thu | Carousel | Making the photos |
| Fri | Product video | Next |
| Sat | Hot take video | Next |
Used <N> of the <total> credits quoted.
```

**3. The week card**, when every row is filed:

```
**Your week is made**: 5 posts for Glow Lab, waiting in your review queue
1. Mon, tip video: [Watch the video](<url>) · [Open in Creatorline](<studio_url>)
2. Tue, trend reshoot: [Watch the video](<url>) · [Open in Creatorline](<studio_url>)
3. Thu, carousel: [See the photos](<url>) · [Open in Creatorline](<studio_url>)
4. Fri, product video: [Watch the video](<url>) · [Open in Creatorline](<studio_url>)
5. Sat, hot take video: [Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

How should they go out?
1. Into Glow Lab's posting schedule, in this order (recommended): one yes, I tell you each day and time
2. You approve them and pick the days: [Review queue](<review link>) · [Calendar](<publish link>)
3. One a day: ask me each day and I post that day's
```

The review and calendar links are https://app.creatorline.io/review and
https://app.creatorline.io/publish, each with `?activeBrand=<brand id>` so the right brand opens.

## Next steps to offer

Once the week is on its way, pick two or three, one line each:

| Offer | Through |
|---|---|
| Make it repeatable: a format that worked, saved as a workflow that makes the next one on one ask | `creatorline-workflows` ([posting the week](references/posting-the-week.md), section 6) |
| Covers for the videos | `creatorline-cover-image` |
| Versions of the best post once it has run (other hooks, avatars, languages) | `creatorline-ad-variations` |
| Next week's calendar, with new trends | this skill |
| How the posts did | Analytics in the app: https://app.creatorline.io/analytics with `?activeBrand=<brand id>` |

## References

- [references/planning.md](references/planning.md): reading the brand, angles, the format
  menu, mixes by goal, order, hooks, days and times, where each format can go, special weeks,
  the calendar card.
- [references/batch-production.md](references/batch-production.md): quoting the week, budgets,
  the run order, handing rows to the format skills, checks, the board, resuming, failures.
- [references/posting-the-week.md](references/posting-the-week.md): filing posts, captions and
  hashtags, why later days carry no time, the three ways out, checking later, saving a format
  as a workflow.
- [references/house-rules.md](references/house-rules.md): the session, consent before
  spending, waiting, the result card, failures, safety, the server's refusals, app-only tasks.
- [references/asking.md](references/asking.md): how to ask, and how little.
- [references/video-briefs.md](references/video-briefs.md): the brief each video row is made
  from.
- [references/product-intake.md](references/product-intake.md): the product photo and the
  product card every row reuses.
