# Planning the week

How to turn what the brand already knows into a calendar the person can read in ten seconds:
what to read, how to pick topics and formats, how to order them, the hooks, the days and
times, and the card you show.

## Contents

1. [What to read, and what it gives you](#1-what-to-read-and-what-it-gives-you)
2. [Angles](#2-angles)
3. [The format menu](#3-the-format-menu)
4. [The mix](#4-the-mix)
5. [Order](#5-order)
6. [Hooks](#6-hooks)
7. [Days and times](#7-days-and-times)
8. [Where each format can go](#8-where-each-format-can-go)
9. [Special weeks](#9-special-weeks)
10. [The calendar card](#10-the-calendar-card)
11. [Calendar only](#11-calendar-only)

## 1. What to read, and what it gives you

All of these are free. Read them before you ask anything, so you never ask what a tool can
answer.

| Call | Take from it |
|---|---|
| `get_brand` | `brand_voice.content_angles`: the topics. `tone`, `dos`, `donts`: how hooks and captions sound (a don't is a hard rule). `audience`: who each hook speaks to. `call_to_action`: the end of every caption. `positioning`: product facts and what sets it apart. `format_notes`: formats the brand prefers or avoids (they beat the defaults below). `language`: spoken lines and captions. `country`: the time zone. `vertical`: the niche, for times and formats. |
| `list_avatars`, `get_avatar` | Who appears. `bio`, `tone`, `archetype`: what this person would credibly post. `voice_id`: whether the own-voice step can run. |
| `list_connections` with `brand_id` | Where the week goes: `platform` and `handle` of each account with `can_publish: true`. An `avatar_id` on an account means that account posts that avatar. |
| `list_posts` with `brand_id`, `limit: 50` | Newest first. Captions of recent posts: topics not to repeat. Posts `pending_review`, `approved` or `scheduled`: the week is already partly filled; a dated `scheduled_for` takes its day. |
| `list_assets` with `brand_id`, `file_type: "image"`, `search` | The product photo (look at it with `preview_assets` before you use it). |
| `list_assets` with `brand_id`, `file_type: "video"`, `source: "generated"` | Recent videos made for the brand. One that may never have gone out is a possible free row: name it in the intake and let the person say. |
| `get_credit_balance` | The balance for the quote, and `free_trial`. |

## 2. Angles

- Take three to five angles from `brand_voice.content_angles`. Each post serves one.
- Spread them: a five-post week touches at least three angles, none more than twice, never the
  same angle two days running.
- An angle is a direction; a post is one idea inside it. "Ingredient facts" becomes "why
  vitamin C goes on before moisturizer", "what 15% on the label means", "the one ingredient
  not to mix with it".
- No angles on the brand: name three yourself from its `bio`, `vertical` and `positioning`
  (one that teaches, one that shows the product, one the audience relates to), state them under
  the calendar, and say they can be saved in the brand document in the app (house rules,
  section 9) so every week starts from them.

## 3. The format menu

Say the left column to the person. The skill does the making.

| Format | Skill | Needs from the person | Fits | Weight |
|---|---|---|---|---|
| Talking video: a tip, hot take, review, storytime, GRWM, day in the life, reaction, street interview, a before and after of a look | `creatorline-talking-video` | The product photo when it is shown | Trust, teaching, opinions: the backbone of most weeks | Medium |
| Trend reshoot | `creatorline-reshoot` | One TikTok or Reels link per row, with one main person | Reach: a structure that already works, with the avatar and the product | Medium to heavy |
| Character Swap | `creatorline-character-swap` | A link; the real video is kept, its people replaced | Dances, skits, two-person trends | Heavy |
| Carousel, 2 to 10 photos | `creatorline-photos` | The product photo when it appears | Saves and shares | Light |
| Product video | `creatorline-product-video` | The product photo | The product working: a pour, a texture, in use, close-ups led by its own sound | Medium |
| Unboxing | `creatorline-unboxing-video` | The product photo; a packaging photo helps | Drops, launches, gifts | Medium |
| Try-on | `creatorline-try-on-video` | A photo of the garment, shoes, bag or jewelry | Fashion and accessories | Medium to heavy |
| Tutorial | `creatorline-tutorial-video` | The product and its steps | How-tos people save | Heavy: several takes and an edit |
| App promo | `creatorline-app-promo-video` | Real screenshots or a screen recording | Apps, websites, online stores | Medium, plus an edit |
| Faceless video | `creatorline-faceless-video` | Nothing | Brands with no face on camera: lists, stories, explainers | Medium |
| Clips from a long video | `creatorline-long-to-shorts` | A long video they own | Several rows from one source | Light per clip |
| Episode | `creatorline-ai-host` | An idea for the show | A weekly series | Heavy |

"Weight" is the relative pull on credits, for fitting a budget. The quote gives the numbers.

## 4. The mix

The person's own mix always wins. Otherwise pick by the week's goal and the number of posts.

**Growing the audience** (the default):

| Posts | Mix |
|---|---|
| 3 | Talking video (tip), trend reshoot (or a hot take without a link), carousel |
| 5 | Two talking videos (a tip, a hot take or storytime), trend reshoot, carousel, product video |
| 7 | Three talking videos, two trend reshoots, carousel, product video |

**Selling a product:**

| Posts | Mix |
|---|---|
| 3 | Talking video (review or demo), product video, carousel with the product in hand |
| 5 | Talking review, product video, unboxing or try-on, carousel, trend reshoot with the product swapped in |
| 7 | Two talking videos (review, the question everyone asks), product video, unboxing or try-on, two carousels, trend reshoot with the product |

**A launch:** see section 9. **No face on camera:** faceless videos, carousels without a
person, product videos with hands only.

Fit the niche: fashion gets try-on rows; beauty gets GRWM and a before and after of a look;
food and drink get product videos (the pour, the plate, the texture) and a recipe tutorial;
apps and websites get app promos; fitness gets tutorials and a day in the life. `format_notes`
beats all of these.

**No two rows share a concept.** Seeds to start from:

| Format | Concepts |
|---|---|
| Talking video | Three mistakes with X; the one thing to know before buying X; an unpopular opinion; the question everyone asks about X, answered; how to choose the right X; two of the brand's own products side by side; X, the honest review |
| Storytime | A moment the audience knows ("when your friend borrows your X"); the avatar's first reaction to X |
| Carousel | What's in the bag; before you buy X, read this; X in five steps; this or that; a photo dump of the avatar's week |
| Product video | The pour; the texture up close; in use in eight seconds; the sound it makes, no words |
| Unboxing | What came in the box; the gift version; the restock |
| Trend reshoot | The trend as it is with the avatar; the trend with the product swapped in; the trend with new lines |

## 5. Order

- Open the week with something easy to watch: a tip, a trend. Not the hardest sell.
- Value before the sell: on a selling week, the product shows up from the second post.
- The strongest piece (the sharpest hook, usually the trend) goes on the niche's best day.
- Never the same format, the same angle or the same hook type two days running.
- One avatar for the week, unless accounts are pinned to different avatars or the person asks.

## 6. Hooks

Write one concrete hook for every row now. The format skill uses it as the first line or the
first three seconds; the calendar shows it so the person can judge the week.

| Type | Pattern | Example |
|---|---|---|
| A number | "3 things ..." | "3 things your serum label is telling you." |
| A mistake | "Stop ...", "You're doing X wrong" | "Stop putting serum on wet skin." |
| A hot take | "Unpopular opinion: ..." | "Unpopular opinion: ten steps is too many." |
| The audience's question | "Is X worth it?", "Why does X ...?" | "Why does vitamin C go first?" |
| Result first | The finished thing at second 0, then how | The poured latte, then the first step |
| A moment people know | "When ...", "POV: ..." | "POV: your friend asks what's in your bag." |
| A result | "X minutes, start to finish", "Watch what X does" | "Eleven minutes, start to finish." |
| A choice | "This or that?" between two of the brand's own things | "Matte or glow for a first date?" |

- Rotate the type: no two rows in a row with the same one.
- Spoken hooks fit the first three seconds: about 7 to 11 words. Start on the point itself:
  never "hi guys", never "today I'll show you", never the brand's name.
- A carousel's hook is the first photo's idea: a promise the next photos keep.
- A reshoot keeps the trend's own opening; new words only when the person wants them.
- With approved claims from the person, keep to them. The brand's don'ts are hard rules.

## 7. Days and times

**How often.** Three to five posts a week is the sweet spot for most niches; daily suits food,
pets and entertainment. Fewer, better posts beat a post a day made in a hurry.

**When.** These are the hours Creatorline pre-fills in a new brand's posting schedule, by
niche, in the brand's market time. A week sent into the posting schedule usually lands close
to them.

| Niche | Best days | Times |
|---|---|---|
| Fitness, health | Mon, Wed, Fri | 06:00, 18:00 |
| Beauty, skincare | Tue to Fri, Sat | 19:00 (Fri 18:00), Sat 12:00 |
| Fashion | Tue, Thu, Fri, weekend | 19:00 (Fri 18:00), weekend 11:00 |
| Food, drink | Every day | 12:00, 18:00, weekend 11:00 |
| Finance, trading | Weekdays | 08:00 to 09:00, a 17:00 recap midweek |
| Tech, software, marketing | Tue to Thu | 10:00, 14:00 to 15:00 |
| Gaming, anime, music | Wed to Sun | 20:00 to 22:00, Sat afternoon |
| Entertainment | Tue, Thu, Fri, Sat | 20:00 to 22:00 |
| Travel | Mon, Wed, Thu, Fri, Sun | 12:00, 17:00, Sun 10:00 |
| Wellness | Mon, Wed, Thu, Sun | 08:00, 21:00 |
| Parenting | Weekdays | 08:00, 13:00, 20:30 |
| Education | Mon, Wed, Sun | 07:00, 20:00, Sun 10:00 |
| Pets | Every day | 12:00, 18:00 |
| Lifestyle | Mon, Wed, Fri, weekend | 19:00, weekend 11:00 |
| Anything else | Tue, Thu, Sat | 10:00, 18:00, Sat 11:00 |

- **Time zone:** the brand's market, from `country`, a two-letter code (`TR`:
  `Europe/Istanbul`; `DE`: `Europe/Berlin`; `GB`: `Europe/London`). A country with several
  zones: its main one (`US`: `America/New_York`; `CA`: `America/Toronto`; `AU`:
  `Australia/Sydney`), said with the city's name; ask only if posts will be timed from this
  chat and the person hints at another.
- **Start tomorrow**, not today: making a week takes a while. Skip days that already hold a
  scheduled post.
- One time per post for all its accounts keeps the week easy to follow.

## 8. Where each format can go

Read the brand's accounts from `list_connections` and give each row only the ones that take it.

| Format | TikTok | Instagram | YouTube | Telegram |
|---|---|---|---|---|
| Video | Yes | Yes (Reels) | Yes (Shorts) | Yes |
| Carousel, 2 to 10 images | Yes | Yes | No | Yes |
| One photo | No | Yes | No | Yes |

A carousel never goes to YouTube; one photo never goes to TikTok. Captions must fit each
platform: Instagram and TikTok 2,200 characters, YouTube 5,000, Telegram 1,024, hashtags
included.

## 9. Special weeks

**A launch** (seven posts; five drop the problem and the recap):

| Day | Post |
|---|---|
| 1 | Tease: a close-up of the box or a detail, no reveal (product video) |
| 2 | The problem it solves, as a tip (talking video) |
| 3 | The reveal (unboxing) |
| 4 | It working (product video or tutorial) |
| 5 | How to use it, step by step (tutorial or carousel) |
| 6 | The questions people will ask, answered (talking video) |
| 7 | The recap (carousel) |

The avatar's own reaction and review are welcome on any day. A rating or a review screenshot
goes on as Video Studio text, never generated into the picture.

**A sale.** The offer's exact words come from the person. They go in the caption or as on-screen
text added in Video Studio, never as spoken lines you made up.

**No avatar, or no face wanted.** Faceless videos, carousels without a person, product videos
with hands only. Say the avatar is made at https://app.creatorline.io/avatars/new.

**Two weeks.** One table per week. Recommend making week 1 now and week 2 next week, so it can
ride trends that appear in between.

**Several avatars.** When accounts are pinned to different avatars, give each account's rows
its own avatar. Otherwise keep one face for the week.

**Finished pieces in the library.** A recent video the person says never went out fills a row
for free. Name it in the intake; the row then skips straight to filing.

## 10. The calendar card

- A header line: the brand, the dates, how many posts, the avatar, the accounts.
- One table with these columns: Day, Format, Hook, Avatar, Where, Time. The day as "Mon 20";
  the format in plain words with its kind ("Talking video, tip"); the hook in quotes, under
  about 12 words; "Voice only" or "Hands only" when no face is on camera; the platforms as the
  person knows them (TikTok, Reels, Shorts, Instagram).
- Under it: the angles by day in one line; anything still needed from the person in one line;
  then the price line (plan and make) or the choice (calendar only).
- The card is in the person's language. Hooks are in the spoken language.
- A two-week plan: one table per week, under "Week 1" and "Week 2".

SKILL.md, card 1, shows a full example.

## 11. Calendar only

When the person asked for the calendar, an idea list or "just the plan":

- Make no paid call and quote nothing yet.
- End with one choice: "Make all five, pick the ones you want, or change a row?"
- When they pick, run the batch flow for those rows only: quote, one yes, make.
- In a free trial this is all that runs; say once that making starts when the plan is started
  in the app.
