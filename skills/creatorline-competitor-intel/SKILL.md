---
name: creatorline-competitor-intel
description: "Reads what works for a brand's tracked competitors: their posts that beat their own usual reach and the ads they keep running on Meta and TikTok, then writes a short brief and offers to remake the best one with the avatar. Use for what are my competitors doing, what works in my niche, which ads keep running, a weekly digest. Not for making the video: use creatorline-reshoot."
license: MIT
metadata:
  author: creatorline
  version: "1.0"
---

# Competitor Intel

Creatorline already tracks each brand's competitors: the brand research found them, their own
accounts are read every 4 hours, and their Meta and TikTok ads are kept, with how long each has
run. You read that, say what matters in a few lines, and offer one thing to make from it. The
promise to the person: what is working for your competitors right now, in plain words, and your
own version of the best of it, with your avatar.

Run the session by [the house rules](references/house-rules.md) and ask every question the way
[asking](references/asking.md) says. This file adds only what is particular to reading
competitors.

## When to use

- "What are my competitors doing?", "what's working for them?", "what's working in my niche?"
- "Which ads do they keep running?", "show me their best ads", "anything new from Weave?"
- "A weekly competitor digest", "what changed this week?"
- "Find me something to reshoot", "give me an idea from what works".
- "Download this TikTok", "save their ad as an MP4": a post's or an ad's video file.
- Before a content calendar, when the person wants it built on what works for competitors.

## Not for

| The person wants | Use instead |
|---|---|
| A post or ad they found re-filmed with the avatar | `creatorline-reshoot` (hand it the link) |
| The real footage kept with the person swapped for the avatar | `creatorline-character-swap` |
| Several versions of one of their own videos | `creatorline-ad-variations` |
| A week or two of posts, planned and made | `creatorline-content-calendar` (it may use this skill first) |
| Their own posts' numbers | the app's Analytics (house rules, section 9) |
| Adding or removing a competitor | the Brand page in the app (house rules, section 9) |

## The tools

| Tool | What it reads | Spends |
|---|---|---|
| `list_competitors` | The brand's competitors, their accounts and followers, how many ads each runs and how many the plan shows, the last scan | nothing |
| `list_trending_posts` | The followed accounts' posts, by default the biggest breakouts first (`times_their_usual`), each with `post_url` | nothing |
| `list_competitor_ads` | The competitors' ads as the plan shows them, new since the last scan first, then the longest running, each with `days_running`, `versions`, `cover_url` and `video_url` | nothing |
| `get_trend`, `get_competitor_ad` | One post or ad by its `id`, with the link to download its video (made on the first ask when a list gave none, up to a minute) | nothing |
| `scan_competitor_ads` | Reads every competitor's ads again (the app's "Find new ads"); once per brand every 12 hours | credits: price first |

If `list_competitors` is not in your tools, this connection does not have them yet: say that
Trends and Ad Intelligence are in the app (https://app.creatorline.io/trending and
https://app.creatorline.io/ad-intelligence) and stop.

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-competitor-intel"`.
2. **Orient** (house rules, section 1): the brand. Reading spends nothing, so skip the balance.
3. **Read the competitors.** `list_competitors` with `brand_id`. None tracked: say so, and that
   the brand research finds them and the Brand page adds them; stop.
4. **Read their posts.** `list_trending_posts` with `brand_id` (20 is enough; `competitor_id`
   when the person named one). A free trial or a plan without Trends is told so: pass on the
   answer's words (house rules, section 8) and carry on with the ads.
5. **Read their ads.** `list_competitor_ads` with `brand_id`. It says when they were last
   scanned. Older than a week, or the person asks for new ads: offer a scan (step 8) after the
   brief, never before it.
6. **Write the brief** with [the digest](references/digest.md), reading the numbers the way
   [reading signals](references/reading-signals.md) says:
   - the three things that matter first, each with the competitor, the platform and the date;
   - what you saw apart from what you think it means, the second marked as yours;
   - patterns across competitors over single posts;
   - the plan's limit said once, in the answer's own words, when it hides ads.
7. **Offer one thing to make**, the strongest item of the brief, as the first of 2 or 3 next
   steps: "Make your version of Weave's 41-day ad with Mia" (Reshoot, its `video_url`), "Film
   Knowt's 9x post with your avatar" (Reshoot, its `post_url`), or "Keep the dance, swap the
   dancer" (Character Swap). An ad with no `video_url` in the list: `get_competitor_ad` gives it.
   On a yes, hand off to that skill with the link: it prices the run and asks before anything is
   spent.
8. **Scan for new ads, only when asked or offered and accepted.** `scan_competitor_ads` without
   `confirm` gives the price or why it cannot run now (one is running, or the next one can start
   at a given time). Tell the person the credits and the balance, and on a yes call it with
   `confirm: true`. It takes a few minutes: `list_competitors` shows `scan_running` until it
   ends; then `list_competitor_ads` with `only_new: true`, and say what came in.

## Downloading a post's video

The person wants the file of a post or ad: a competitor's post or ad the tools list is
`get_trend` / `get_competitor_ad` (a direct MP4, our own copy). Any other social link
(TikTok, Instagram, YouTube, X, Facebook): download it with yt-dlp, installed after the
person's yes, where you can run commands. Every step, the commands and the rules:
[downloading posts](references/downloading-posts.md). To only remake a post with the avatar,
no download is needed: its link goes straight into create_generation.

## A weekly digest

Asked for a digest or "what changed": the same flow, with posts from the last 7 days
(`order: "new"`) and the ads with `is_new`. A competitor with nothing new gets the line
"nothing new this week". The first time, say it is the starting point: next week's digest
compares against it. A repeating digest can be a workflow (`creatorline-workflows`) or a
reminder the person sets; nothing here runs on its own.

## Rules

- **Make the brand's own version.** Never copy a competitor's name, logo, product claims or
  script word for word into anything made. Reshoot keeps the idea and the beats and makes it the
  brand's.
- **Say only what the data shows.** No guess about a competitor's revenue, budget or results
  beyond the numbers the tools give. "Running for 41 days" is a fact; "it makes them money" is a
  reading, marked as one.
- **Names, not ids.** Competitors, accounts and platforms by name; ids only for the next call.
- **The plan's limit is the server's words.** When ads are hidden, pass on the answer's line and
  its link as they are (house rules, section 8). Never make a link to a plan page yourself.
- **Links are the tools'.** Give `post_url` to open a post; `video_url` and `cover_url` are for
  the next tool or to show, and are not the person's to repost.
