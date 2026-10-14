# Posting the shorts

A caption, hashtags and a title for every short, then the shorts into the review queue, then out
on a schedule the person agrees to. All of it is free; only `publish_post` makes anything
public, and it needs an explicit yes. Scheduling past what is here: `creatorline-publish`.

## Contents

1. [Know each short first](#1-know-each-short-first)
2. [The caption](#2-the-caption)
3. [Hashtags](#3-hashtags)
4. [The YouTube title](#4-the-youtube-title)
5. [Show them for one OK](#5-show-them-for-one-ok)
6. [Into the review queue](#6-into-the-review-queue)
7. [Sending them out](#7-sending-them-out)
8. [Covers](#8-covers)
9. [Disclosure and the speaker's words](#9-disclosure-and-the-speakers-words)

## 1. Know each short first

- **What it is about.** Its headline, read on its first frame with `preview_assets` (the
  check step in SKILL.md). The headline is the subject; you have not heard the rest, so never
  quote a line you did not read.
- **Language.** The language spoken in the short (the headline is usually written in it),
  else the brand's `language` from `get_brand`. The person's own request wins.
- **Voice.** `brand_voice` from `get_brand`: its tone, its do's (keep them), its don'ts (never
  write them), its `call_to_action`.
- **Where.** `list_connections` with `brand_id`. Only accounts with `can_publish: true` can
  post; one that needs reconnecting, or none at all, is fixed at
  https://app.creatorline.io/connections?activeBrand=BRAND_ID.

## 2. The caption

Three short lines at most. The feed shows the first line or two before "more", so the first
line does the work.

1. **The promise.** The short's subject, taken from its headline, turned into a question or a
   promise of what the viewer will learn, under about 80 characters. Add an angle rather than
   repeating the headline word for word: it is already on screen. Use the speaker's own words
   only when the person gave them to you.
2. **Context, when it helps.** Where the moment comes from: "From episode 12 of our show." Only
   facts the person gave or the source's own title; never invent a guest's name or title.
3. **The next step.** The brand's `call_to_action`, else one plain line to the full recording:
   "Full episode on our YouTube."

A question that invites an answer is fine. A bare "comment YES" as the payoff is not. No
emoji walls; one or two where the brand's tone has them.

## 3. Hashtags

- 3 to 5, as bare words without `#` in `hashtags`; they are added to the caption when the post
  goes out.
- One or two for the brand's niche (`vertical` and `business_categories` from `get_brand`),
  two or three for the short's own subject.
- Vary the subject tags from short to short; the same five on every post reads as spam.
- No tags unrelated to the short, and no other brand's name.

## 4. The YouTube title

When YouTube is one of the destinations, give each short a title in `platform_settings`:
the headline or a sharper version of it, under 100 characters, in the spoken language.

## 5. Show them for one OK

A caption can only be changed in the app once the post exists, so show them first, all in one
message, and ask once:

```
Here is what each post will say. OK, or tell me what to change.

1. Why your first price is always too low (0:48)
   "Too cheap is not humble, it is a guess. Here is how to set a real number."
   #pricing #smallbusiness #founders #startuptips
2. The question to ask before any discount (1:12)
   "Before you discount, ask this one question."
   #pricing #sales #smallbusiness #customerservice
...
To: TikTok (@yourshop) and Instagram (@yourshop). Into your review queue: nothing is public yet.
```

## 6. Into the review queue

On their OK, one `create_post` per short. Never two shorts in one post.

```json
{
  "brand_id": "BRAND_ID",
  "asset_ids": ["SHORT_ASSET_ID"],
  "caption": "Before you discount, ask this one question.\nFull episode on our YouTube.",
  "hashtags": ["pricing", "sales", "smallbusiness"],
  "channels": ["TikTok", "IG", "YouTube"],
  "platform_settings": { "YouTube": { "title": "The question to ask before any discount" } },
  "made_with_ai": false
}
```

- `channels`: leave it out to post on every connected platform (the first account on each).
  When the brand has two accounts on one platform, pass `connection_ids` from
  `list_connections` instead.
- `platform_settings` keys must be platforms the post goes to.
- Each answer is a `clip_id` with `status: "pending_review"`. Nothing is public.
- The shorts now wait at https://app.creatorline.io/review?activeBrand=BRAND_ID, where the
  person can approve, edit or decline each one.

## 7. Sending them out

`publish_post` is public and cannot be taken back. One explicit yes that names the posts, the
accounts and the time (house rules, section 2). Always pass `mode`:

| The person wants | Call |
|---|---|
| One a day, or "spread them out" | `mode: "queue"` for each short, best first: each takes the brand's next free posting slot. Refused when the brand has no posting queue: then `schedule`, or the calendar in the app |
| All at a time of day | `mode: "schedule"` with `scheduled_for` `"HH:mm"`: a time of day, not a date |
| Now | `mode: "now"` |
| To approve them in the app | Nothing more: they wait in the review queue |
| Exact dates over the coming days | The calendar at https://app.creatorline.io/publish?activeBrand=BRAND_ID |

"Best first": the short whose headline makes the sharpest promise leads; without a clear one,
the order they came in. Read each answer's `goes_out` back to the person in one line per short.

## 8. Covers

- A post sent from Creatorline cannot carry a separate cover image. The platform shows the
  short's opening, and every short already opens on its headline, so the grid reads well as
  it is.
- A designed cover (`creatorline-cover-image`) is for setting by hand in the platform's own
  app, or as the thumbnail of the full episode on YouTube (16:9). Offer it for the best one or
  two shorts, not all ten.

## 9. Disclosure and the speaker's words

- `made_with_ai: false` for shorts cut from a real recording: the footage is real, only cut
  and captioned. `true` when the recording itself shows an avatar or AI-made video.
- The speaker is a real person, so a caption never puts words in their mouth: no result,
  credential, number or promise they did not state on camera (house rules, section 7, Real
  people). For health, money and supplements, no cure or income promise in the caption.
- Only post recordings the person made or has the rights to.
