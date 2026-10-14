# Timing

When a post goes out, and how to say it to the person.

## Contents

1. [The four ways a post goes out](#1-the-four-ways-a-post-goes-out)
2. [Time of day and time zone](#2-time-of-day-and-time-zone)
3. [Another day](#3-another-day)
4. [Good hours by brand category](#4-good-hours-by-brand-category)
5. [Spacing](#5-spacing)

## 1. The four ways a post goes out

| The person wants | You do | It goes out |
|---|---|---|
| To look at it first, or said nothing about posting | `create_post` with `scheduled_for` and `timezone`; no `publish_post` | When they approve it in the review queue: at its time that day, or at 21:30 without one |
| To post now | `create_post`, then on a yes `publish_post` `mode: "now"` | As soon as each platform takes it, usually within minutes |
| A time today ("tonight at 8") | `create_post` with `scheduled_for: "20:00"` and `timezone`, then on a yes `publish_post` `mode: "schedule"`, `scheduled_for: "20:00"` | At that time in that zone |
| "Whenever is best", "in my usual slot" | `create_post` with `timezone`, then on a yes `publish_post` `mode: "queue"` | The brand's next free posting slot; the answer names it, in UTC |

Which one to recommend:

- They asked to post and named no time: the next good hour still ahead today (section 4). None
  left today: the next posting slot.
- They did not ask to post, or someone else approves: the review queue.
- They named a time: no recommendation, one yes for that time.

Never leave out `mode`: without it the post is scheduled at its own time, or at 21:30 when it
has none, which is rarely what anyone meant.

## 2. Time of day and time zone

- `scheduled_for` is a time of day only: `"HH:mm"`, 24-hour ("8 pm" is `"20:00"`). It carries no
  date: it is that time on the day the post is approved or published.
- `timezone` is an IANA zone, set on `create_post`. `publish_post` has no time zone field: the
  post's own is used. Set it every time, even for `now` and `queue`, so a later approval or
  reschedule reads the time right.
- The zone: where the person said they are, or the city they named ("9 am New York time"). Else
  the main zone of the brand's `country` (`get_brand`, a two-letter code). State it in the plan:
  "19:00 Istanbul time". Ask only when nothing hints at a zone.

| `country` | Zone |
|---|---|
| `US` | `America/New_York` (say "New York time"; others on request: `America/Chicago`, `America/Denver`, `America/Los_Angeles`) |
| `CA` | `America/Toronto` |
| `GB` | `Europe/London` |
| `DE` | `Europe/Berlin` |
| `FR` | `Europe/Paris` |
| `ES` | `Europe/Madrid` |
| `IT` | `Europe/Rome` |
| `NL` | `Europe/Amsterdam` |
| `PT` | `Europe/Lisbon` |
| `TR` | `Europe/Istanbul` |
| `AE` | `Asia/Dubai` |
| `IN` | `Asia/Kolkata` |
| `ID` | `Asia/Jakarta` |
| `BR` | `America/Sao_Paulo` |
| `MX` | `America/Mexico_City` |
| `AU` | `Australia/Sydney` |
| Any other one-zone country | Its zone (`PL` is `Europe/Warsaw`) |

- A time that has already passed today in that zone: do not schedule it. Offer `now`, a later
  time today, or the next posting slot.
- A queue slot comes back in UTC ("2026-10-15 16:00 UTC"): convert it before you say it.
- Say times the way the person does (12-hour or 24-hour), with the zone's city name.

## 3. Another day

"Friday at 9", "tomorrow morning", "next week": a time from here cannot carry a date. Offer, in
one question:

1. **The review queue, timed for 09:00 (recommended).** `create_post` with `scheduled_for:
   "09:00"` and `timezone`, no `publish_post`. On Friday the person approves it in the app before
   9, or tells you "post it" and you call `publish_post` with `mode: "schedule"`. Nothing goes out
   before then.
2. **The next posting slot** (`mode: "queue"`). It may not be Friday; the answer says which day
   and time it took.
3. **Scheduled now, then moved** to Friday at 9 on the calendar in Schedule
   (https://app.creatorline.io/publish?activeBrand=<brand id>), where a post takes a date. Say
   plainly that until they move it, it goes out today.

Never schedule today at 9 and hope. Say plainly that the day itself is set in the app or by a
word to you on that day.

## 4. Good hours by brand category

Each brand's posting schedule starts from these local hours, picked by its `vertical` (from
`get_brand`). Use them to suggest a time today. The brand's own queue (`mode: "queue"`) may
already be tuned to its audience.

| `vertical` | Good hours | Days |
|---|---|---|
| `health-fitness` | 06:00 and 18:00 | Mon, Wed, Fri |
| `skincare-beauty` | 18:00 to 19:00; Saturday 12:00 | Tue to Sat |
| `apparel-fashion` | 18:00 to 19:00 on weekdays; 11:00 on weekends | Tue, Thu, Fri, weekend |
| `food-beverage` | 12:00 and 18:00; 11:00 on weekends | Every day |
| `pet-care` | 12:00 and 18:00; 11:00 on weekends | Every day |
| `betting-gaming` | 20:00 to 22:00; Saturday 14:00 | Wed to Sun |
| `anime-fandom` | 20:00 to 21:00; Saturday 12:00 | Wed to Sun |
| `music-media` | 19:00 to 21:00; Saturday 14:00 | Wed to Sun |
| `entertainment-memes` | 20:00 to 22:00 | Tue, Thu, Fri, Sat |
| `lifestyle-vlog` | 19:00 to 20:00; Saturday 12:00 | Wed to Sun |
| `trading-investing` | 08:00 | Weekdays |
| `fintech` | 09:00; Wednesday 17:00, Friday 12:00 | Weekdays |
| `ai-productivity` | 10:00 and 14:00 | Tue to Thu |
| `marketing-saas` | 10:00 and 15:00 | Tue to Thu |
| `mental-health-habits` | 08:00 and 21:00 | Mon, Wed, Thu, Sun |
| `travel-hospitality` | 12:00 and 17:00; Sunday 10:00 | Mon, Wed to Fri, Sun |
| `parenting-kids` | 08:00, 13:00, 20:30 | Weekdays |
| `education-coaching` | 07:00 and 20:00; Sunday 10:00 | Mon, Wed, Sun |
| `automotive-mobility` | 16:00; weekends 11:00 to 14:00 | Tue to Thu, weekend |
| Any other, or none | 10:00 and 18:00; Saturday 11:00 | Tue, Thu, Sat |

An older brand may carry a plain niche word instead ("beauty", "fitness"): use the row it
matches. These are starting points from broad studies of when audiences scroll, not promises.
Say "a good time for <the category>", never "the best time".

## 5. Spacing

- One account, one post at a time: leave a few hours between two posts on the same account so
  each gets its first hour of attention.
- 2 to 5 posts a week per account is a healthy pace for most brands; food and entertainment can
  go daily.
- A batch goes through the queue (`mode: "queue"`), one slot each, in the order the person wants.
- The same video on several platforms at the same time is fine: each platform is its own
  audience.
