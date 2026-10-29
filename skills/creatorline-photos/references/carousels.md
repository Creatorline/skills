# Carousels

A carousel is 2 to 10 photos posted as one post that people swipe through. Over the connector
you build it frame by frame with `generate_photo_edit` (and `generate_text_to_photo` for scenes),
then post the frames together with `create_post`. The app's one-click carousel is not on the
connector; this file does the same job by hand.

The examples use Mia, a woman avatar: write he, she or they to match the avatar's `gender`
(`get_avatar`).

## Contents

1. [When a carousel fits](#1-when-a-carousel-fits)
2. [Plan it](#2-plan-it)
3. [Recipes](#3-recipes)
4. [Keep it one look](#4-keep-it-one-look)
5. [Make and price the set](#5-make-and-price-the-set)
6. [Put it in order](#6-put-it-in-order)
7. [Words on the frames](#7-words-on-the-frames)
8. [Post it](#8-post-it)
9. [Worked example](#9-worked-example)

## 1. When a carousel fits

- A day, a trip, a routine, an outfit from several sides, a product from several angles, a
  making-of: anything that is better seen in a few frames than in one.
- On TikTok a photo post must be a carousel: one photo alone is not taken there.
- Many frames of words (tips, a list, quotes on photos) are a slides job for the app's editor;
  this skill makes the photos those slides can sit on.

## 2. Plan it

Write the plan before any price. It has four parts.

**How many.** 6 by default; 8 for a photo dump; 4 or 5 for a product set; 10 at most (the most a
post takes here). Fewer, stronger frames beat a long set with two weak ones.

**Roles.** Every frame has one job:

| Frame | Job | Usually |
|---|---|---|
| 1, the cover | Stop the scroll and promise the set | Her face, close or middle, eye contact or mid-laugh; the clearest view of the product; the hook in words if any |
| Middle frames | Deliver it, one idea each | Alternate sizes: a detail after a middle shot, a view after a close one; alternate her and no-person frames |
| Last frame | Land it | A calm wide, the product hero shot, or her best candid: the one people save |

**The look card**, one line that every frame's brief carries word for word (section 4).

**The frame:** one `aspect_ratio` for every frame. `3:4` by default; `4:5` for Instagram only
when every frame stays on the default model.

Show the plan to the person as a numbered list, one short line per frame, with the price as its
own line after it (asking.md, section 6).

## 3. Recipes

Starting shot lists. Swap in the brand's world; keep the rhythm.

**Photo dump, 8** ("my weekend in Lisbon"): 1 selfie with the view; 2 food from above; 3 her
candid mid-laugh at a cafe table; 4 the street, nobody; 5 a detail (her hand, a ticket, the
product in a bag); 6 full body on a staircase; 7 the sunset, nobody; 8 a flash photo at night.

**A day in the life, 6:** 1 morning, coffee by the window; 2 getting ready, the product in
use; 3 out the door, full body; 4 at work or the gym, wide; 5 a detail of the afternoon; 6
evening, a calm close frame.

**Product routine, 5** ("my morning with the serum"): 1 cover, the product held beside her
face; 2 in use; 3 the product alone where it lives; 4 the next step of the routine with it in
the background; 5 the finished look, calm, the product on the counter.

**Outfit lookbook, 6** ("3 ways to wear the blazer"): 1 cover, the hero look full body; 2 and 3
look one front and detail; 4 look two full body; 5 look three full body; 6 all three items as a
flat lay. Three looks means three wardrobe lines; the place and light stay the same.

**What's in my bag, 5:** 1 her with the bag on the shoulder; 2 the bag open from above; 3 to 5
each item close, the person's products from their photos, any other item generic.

**Behind the launch, 6:** 1 her at the desk with the product; 2 the product in boxes; 3 a sketch
or a moodboard on the wall; 4 packing, close on her hands; 5 the shelf of finished products; 6
her holding the first one, smiling.

## 4. Keep it one look

The thing that makes a set read as a set. In order of strength:

1. **The look card**, the same line in every brief:

   ```
   Look: oversized cream knit, light jeans, white sneakers · a bright Lisbon apartment and its street · soft morning light turning golden · cream, terracotta, pale blue · casual phone photo
   ```

2. **One model for every avatar frame.** Mixing models changes skin, colour and grain. A frame
   that needs words is the one exception: keep it to the cover.
3. **The same `aspect_ratio` and `resolution`** for every frame.
4. **One outfit per day or place**, unless the set is about outfits.
5. **The locked look**, when the outfit must be identical in every frame: make frame 1 first
   and get a yes on it, then make the rest with `include_avatar: false` and frame 1's
   `asset_id` in `characters`, briefed "the same woman as @Avatar1, in the same outfit, now
   ...". The face can drift a little from the avatar's own image, so use it only when the
   outfit matters more. It is two rounds of paid runs: quote both together.

A frame that still looks off: redo it with one change, or drop it. Never ship a set where one
face differs.

## 5. Make and price the set

1. Write every frame's call first: the same `brand_id`, `model` and `params` for every frame;
   only `prompt`, `inputs` and `include_avatar` change. Scene frames with nothing real in them
   are `generate_text_to_photo` calls with the same `aspect_ratio` and `resolution`.
2. Price: the frame's tool without `confirm` once for each distinct setup (tool, model,
   `params`, `count`); frames with the same setup cost the same. Add them up and ask one yes
   for the whole set. A frame added or changed after the yes is quoted again.
3. On yes, send every frame's call with `confirm: true`, one after another. Runs over the
   workspace's parallel limit wait in line and start by themselves: say so if they queue.
4. `get_generation` with `wait_seconds: 30` on each, in turn, until each is `succeeded` or
   `failed`. Narrate in one line: "Four of six done."
5. A failed frame is refunded. Say which one, and offer one retry with one change (a new paid
   run: ask) or posting without it.

## 6. Put it in order

After `preview_assets` (up to 8 at a time):

- The strongest frame first, even if the plan said otherwise: the face clear, the light good,
  the product readable.
- Never two frames of the same size or angle side by side.
- Her frames and no-person frames alternate where they can.
- A story set (morning to night, unboxed to in use) keeps its order after the cover.
- The last frame is calm and complete.

## 7. Words on the frames

- Words on the cover only, up to 6, when the set needs a hook: `gpt-image-v2-edit` with the
  words in quotes and where they sit (SKILL.md, Craft). Same `aspect_ratio` as the set.
- The rest of the story goes in the caption.
- Words on several frames (a tips list, numbered steps): the app's slides editor, at
  https://app.creatorline.io/brands/BRAND_ID/generate/slides (the brand's id in place of
  BRAND_ID). Make the photos here first: the editor picks them from the brand's assets.

## 8. Post it

Only when the person asks, or said yes to posting. Nothing here is public.

**Where a photo post can go:**

| Platform (`channels` value) | One photo | Carousel |
|---|---|---|
| `IG` | yes | 2 to 10 |
| `TikTok` | no | 2 or more (10 here) |
| `Telegram` | yes | 2 to 10 |
| `YouTube` | no | no |

`create_post` takes at most 10 `asset_ids`, all images for a carousel (no video mixed in).

**The calls:**

1. `list_connections` with `brand_id`. Keep the accounts on photo platforms with
   `can_publish: true`. None: connecting is in the app, https://app.creatorline.io/connections.
   An account with `can_publish: false` needs reconnecting there first.
2. Write the caption from `get_brand`'s `brand_voice`, in the brand's `language`: a first line
   that works as a hook, one or two lines on what the set shows, the brand's
   `call_to_action` when it has one. Keep to its do's; never write its don'ts. A few hashtags
   as bare words. Caption and hashtags together stay under 2,200 characters (1,024 when
   Telegram is one of the platforms). Show the caption to the person before `create_post`.
3. `create_post`:

```json
{"brand_id": "<brand id>",
 "asset_ids": ["<cover>", "<frame 2>", "<frame 3>", "<frame 4>", "<frame 5>", "<frame 6>"],
 "format": "carousel",
 "channels": ["IG", "TikTok"],
 "caption": "<caption>",
 "hashtags": ["morningroutine", "skincare", "glowlab"],
 "made_with_ai": true}
```

- **Always pass `channels`** (or `connection_ids`). Left out, the brand's connected platforms
  are used, and one that takes no photos (YouTube) makes the whole call fail.
- Several accounts on one platform: `connection_ids` from `list_connections` instead of
  `channels`, never both.
- **TikTok:** `photo_cover_index` picks the cover (0-based, into `asset_ids`; leave it out when
  the cover is first). `auto_add_music` is on by default: TikTok adds a sound. `draft: true`
  hands it to the TikTok app's inbox to finish there, and only works when every channel is
  TikTok.
- `made_with_ai: true` on every post with AI images (house-rules.md, section 7).
- A single photo: one `asset_id`, `format: "photo"`, Instagram or Telegram only.

4. Say it is in the review queue and not public. Sending it out (now, at a time, or the next
   queue slot) needs the person's explicit yes naming the post, the accounts and the time, then
   `publish_post` with `mode` (creatorline-publish).

## 9. Worked example

The person: "Make a 6-photo carousel of Mia with our new candle for Instagram and TikTok."

1. Orient: brand Glow Home, avatar Mia, accounts IG and TikTok. `list_assets` finds "Fig &
   Cedar candle"; `preview_assets` confirms it. Product card written.
2. No gap left, so no questions. Plan and price, one message:

   > 6 photos of Mia's slow Sunday with the Fig & Cedar candle, one look, 3:4:
   > 1. Cover: Mia on the sofa, candle held up beside her face, soft smile
   > 2. Lighting it, close on her hands and the match
   > 3. The candle on the coffee table with a book and tea, nobody
   > 4. Mia reading by the window, the candle glowing beside her
   > 5. Close on the label in warm light
   > 6. Evening wide: the room in lamp light, Mia under a blanket
   >
   > 6 photos, <N> credits; you have <M>. Go ahead?

3. Look card: "Look: oatmeal knit lounge set, hair loosely up · a small warm living room with a
   linen sofa and an oak coffee table · soft afternoon window light into lamp light · oatmeal,
   olive, amber · casual phone photo".
4. On yes: six `generate_photo_edit` calls with `confirm: true` (frames 3 and 5 with
   `include_avatar: false`), the candle in `other_elements` on all six, `aspect_ratio: "3:4"`,
   `resolution: "2K"`.
5. Wait, check, order, show the card with six named links, offer: post it, animate the cover,
   a talking video about the candle.
6. On "post it": `list_connections`, caption in the brand's voice, `create_post` with
   `format: "carousel"`, `channels: ["IG", "TikTok"]`, `made_with_ai: true`. Then ask when it
   should go out.
