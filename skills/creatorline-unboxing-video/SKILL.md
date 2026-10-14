---
name: creatorline-unboxing-video
description: "Makes a creator-style unboxing video: the brand's AI avatar opens a package on camera, reveals the product, reacts and gives a first verdict. Covers PR boxes, hauls and ASMR unboxings. Use for unboxing, open the box, PR package, haul, first look. Not for hands-only reveals: use creatorline-product-video. Not for wearing it: use creatorline-try-on-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Unboxing video

You make a vertical unboxing video in which the brand's avatar opens a package on camera: the
sealed package, the open, the reveal, a first touch, a real reaction, one honest detail and a
verdict. It is filmed like a phone video at home, with the person's real product and the same
avatar face as every other video of the brand. The promise to the person: one short exchange,
a price before anything is made, a video they can watch, edit and post from the review queue.

## When to use

The ask has BOTH a person on camera AND a package being opened. An unboxing that does not say
who is on camera gets the brand's avatar: this skill.

- "unboxing", "open the box", "first look", "it just arrived", "out of the box";
- "PR package", "PR box", "launch box", "mailer", "the drop", "gifted";
- "haul", "everything in the order", "three things from the new collection";
- "ASMR unboxing", "satisfying unboxing", "no talking, just the sounds".

## Not for

| The person wants | Use |
|---|---|
| Only hands on camera ("POV", "no face"), with a voice over it | `creatorline-product-video`. Never add the avatar to make it fit. |
| No person at all and no voice: the product turning or a box opening by itself, as a clip | A one-off in `creatorline` (a still packshot: `creatorline-photos`) |
| The avatar reviewing a product already out of its box, talking to camera | `creatorline-talking-video` |
| Wearing it: outfits, shoes, jewelry, a fit check, a try-on haul | `creatorline-try-on-video` |
| How to use it, step by step | `creatorline-tutorial-video` |
| An unboxing video they found (a link) re-filmed with the avatar | `creatorline-reshoot` |
| A real unboxing video kept as it is, with the person swapped for the avatar | `creatorline-character-swap` |
| Only the script or hook ideas | `creatorline-short-script` |
| Many versions of a finished unboxing | `creatorline-ad-variations` |

## What you need

| Item | Ask? | If missing |
|---|---|---|
| A photo of the product (a file link, or an image in the library); for a haul, one per item | Hard gap: ask once | No photo, no unboxing. Offer the script meanwhile (`creatorline-short-script`). |
| What it is and how it is used | Only what the photo and page do not show | The product card (references/product-intake.md) |
| How the package looks | Optional question | A plain kraft shipping box with clear tape |
| Variant (classic, PR box, haul, quiet) | Never: read it from their words | Classic |
| Length | Ask with options when nothing hints at it | 15 s |
| Avatar | Never, unless they name one | The brand's default avatar. The brand has none: it is made in the app (references/house-rules.md, section 9) |
| Voice | Never | A natural voice filmed with the video. The avatar's own voice is a re-voice after it (Next steps) |
| Setting | Never | At home: a desk or kitchen counter for small items, the living room floor for big ones, window daylight |
| Reaction | Never | Natural, one peak at the reveal; the brand's tone can move it |
| Language | Never | The brand's `language` |
| Resolution | Never | `720p`; `1080p` only on request (about 2.5 times the price) |

## The flow

1. **Activation.** When `track_skill_activation` is in your tool list, call it once with
   `skill_name: "creatorline-unboxing-video"`. Never again for the same request.
2. **Orient** (references/house-rules.md, section 1): `list_brands`, `get_brand` (its
   `default_avatar_id`, `language`, `brand_voice`), then `get_avatar` on that avatar for its
   name (the defaults line uses it) and `voice_id`, or `list_avatars` when the person named
   another one; `get_credit_balance`. `free_trial: true`: nothing paid runs yet
   (references/house-rules.md, section 8); offer the brief and the script for free.
3. **Read the ask.** Pick the variant from the person's words (table in Craft). Note what they
   already gave: product, package, length, lines, tone. A script or beat list from them is
   followed beat for beat (references/asking.md, section 4).
4. **Intake, one message** (references/asking.md; use the host's question tool when your list
   has one). At most three questions, only the gaps, in this order: the product photo (if
   missing), the package, the length. Then one line of defaults. Example, product already
   given:

   > Love this one. Two quick things:
   > 1. The box: 1) a plain shipping box (recommended) 2) your own box or mailer: send a link to a photo of it, or add the photo to your Creatorline library and tell me its name
   > 2. Length: 1) 15 s, open, react, verdict (recommended) 2) 10 s, a quick reveal 3) 25 s, a full first look
   >
   > Defaults: Mia, 9:16, at her desk in daylight, a natural reaction, English, no music.

   For a PR or launch box, recommend their own box photo first. For health, supplement or
   skincare products add: "Anything it must or must never say about it?" If that makes four
   questions, drop the length question and state 15 s in the defaults. A photo attached in
   the chat does not reach Creatorline: ask for a link to the file, or for an upload in the
   app (references/product-intake.md, section 1).
5. **Get the product in** (references/product-intake.md): `list_assets` with `brand_id`,
   `file_type: "image"` and `search`, or `import_asset` for a file link. Do the same for a
   package photo. Write the product card, plus two lines this format needs: how it is held
   (its size class, references/unboxing-craft.md section 4) and how the package opens.
6. **Write the brief** (template below, worked versions in references/unboxing-briefs.md).
7. **Plan and price.** Call `create_generation` WITHOUT `confirm`:

   ```json
   {
     "tool": "ugc-video",
     "brand_id": "<brand id>",
     "prompt": "<the brief>",
     "inputs": { "objects": ["<product asset id>", "<package asset id, when given>"] },
     "params": { "ugc_style": "Unboxing", "duration": 15 }
   }
   ```

   - Leave out `model` (the tool's default films avatars), `aspect_ratio` (9:16) and
     `resolution` (720p) unless asked. Add `avatar_id` only for an avatar that is not the
     brand's default.
   - Optional `inputs.location`: a photo of the person's own room or desk. Keep to four images
     in all (avatar, product, package, place): the writer looks at four.
   - Leave `change_voice` off. It runs as a separate charged step after the video lands, is not
     in this quote, and its result is not returned by `get_generation`. When the person wants
     the avatar's own voice (`get_avatar` shows a `voice_id`), re-voice the finished video as
     its own run afterwards (`creatorline-voiceover`): priced, waited on and shown like this
     one.
   - A real person on camera instead of an avatar, with their consent: the model and limits in
     references/video-briefs.md, section 12.

   The answer is `status: "needs_approval"` with `credits`, `credit_balance` and `sufficient`.
   Say the plan in one or two lines, then the price, then ask:

   > A 15-second unboxing: Mia peels the tape off a plain box at her desk, lifts out the Glow C
   > Serum, unscrews the dropper, notices it fits in her palm, and ends on a calm verdict.
   > <N> credits; you have <M>. Go ahead?

   `sufficient: false`: do not confirm; say how many credits are missing and offer 10 s
   instead (references/house-rules.md, section 2). A free-trial refusal or any other "no":
   pass on the server's words (references/house-rules.md, section 8).
8. **Run.** On yes, the same call with `confirm: true`. Keep `credits_charged` and
   `credit_balance` from the answer for the card.
9. **Wait and narrate.** `get_generation` with `generation_id` and `wait_seconds: 45`, again
   while `status` is `queued` or `processing`: both mean it is still going (`queued` only means
   no output yet). One short line between calls: "Filming the box and the reveal now. Videos
   take 1 to 5 minutes." "Still filming." Stay until it ends. Never start it twice.
10. **Check** (Check before you show it), then **show** the card and the next steps.

Several items (a haul), or takes the person wants joined: one take per item, then one Video
Studio video. See [Several takes](#several-takes-hauls).

### The brief

Plain sentences, in this order; skip a line you have nothing for. Read
references/video-briefs.md before your first brief (template, speech budget, claim floor).

```
Idea: @Avatar1 unboxes <product> at <place>: <why it is worth watching, one line>.
Hook: "<first line>" with <the sealed package on the table, @Avatar1's fingers already at the tape>.
Package: <@Object2 and how it opens> or <a plain kraft-brown shipping box a little bigger than the product, clear tape across the top, cream tissue inside>.
Opening: the box opens on a cut. After the reveal the empty box sits at the edge of the <table>.
Reveal: @Avatar1 lifts @Object1 out <with one hand / with both hands / between two fingers>, label to camera.
First touch: <one physical action: unscrews the cap, clicks the case open, runs a thumb along the seam>.
Honest detail: <one true, specific, present-tense thing the camera can see or the label prints>.
Product: <product card>. Page: <url>
Setting: <place, light>; phone propped on the <table>, both hands free.
Wardrobe: <only when it matters; word for word in every take of a haul>.
Reaction: <natural, one small gasp at the reveal | calm and quiet | big and excited | silent>.
Ending: <the verdict or feeling>, product held at chest height, label to camera.
Language: <spoken language>
Sound: voice and room sound only.
```

## Craft

### The arc

| Beat | What the camera sees | What is said |
|---|---|---|
| 1. The sealed package (the hook, 0-3 s) | The package resting on the table, hands on the tape or the lid, already moving | The hook line. No greeting. |
| 2. The open | Tape coming off, a lid lifting. The change from closed to open falls on a cut | Little, or only the sound |
| 3. The reveal | The product lifted out, held for its size, label to camera; the box slides to the frame's edge | The product's name, a gut reaction |
| 4. First touch | One action: a cap, a click, a fold, a zip | Almost nothing: the action carries it |
| 5. Reaction | One human-sized peak: a small gasp, a laugh, a hand to the chest | An opinion, in present tense |
| 6. One honest detail | The detail brought toward the lens at chest height | One specific, true line |
| 7. Verdict and call to action | Chest-up, product beside the face, held | A verdict. The call to action goes in the caption or as on-screen text, never spoken |

| Length | Shots | Beats | Words spoken |
|---|---|---|---|
| 10 s | 2-3 | 1+2, 3+5, 7 | 16-24 |
| 15 s (default) | 3-5 | 1+2, 3, 4+5, 6, 7 | 25-35 |
| 20-25 s | 6-8 | all seven; the first touch can become a short first use | 35-55 |

Handling eats speech time, so these budgets sit below a talking video's; a quiet unboxing has
no spoken words at all. Over 25 s, an unboxing drags: offer the full first look at 25 s, or a
how-to after it (`creatorline-tutorial-video`). One take holds up to 30 s: prefer one take.

### What makes it work

1. **The opening happens on a cut.** Nothing goes from sealed to open inside one shot. Say
   "the box opens on a cut" and the writer places it.
2. **One product in frame.** One unit, nothing that looks like it on the table. After the
   reveal the box sits empty at the edge or leaves the frame, and never closes again.
3. **The package is real or plain.** With their photo: name it `@Object2` and say how it
   opens. Without: a plain kraft box with clear tape. Never invent a logo or print on a box.
4. **Held for its size.** A ring between two fingers, a serum in one hand, sneakers in two, an
   appliance in two with a small lean, a chair stays on the floor. Table in
   references/unboxing-craft.md, section 4.
5. **Both hands free.** The phone is propped on the table: one hand steadies the box, the
   other opens it. Name what each hand does in the open.
6. **Close, never macro.** Details come toward the lens at chest height; the ending is chest-up
   or wider. Tight close-ups on skin, liquid or texture come out worst.
7. **One peak.** A natural reaction with one peak at the reveal. Big energy only when the
   person or the brand's tone asks; calm and slow for premium products.
8. **Present tense only.** The avatar opens it now and notices things now. "It just came" is
   fine. "I've used it for a month", "it changed my skin" and "they sent me this for free"
   are not (references/house-rules.md, section 7; PR framing in references/unboxing-craft.md,
   section 8).
9. **The package is the soundtrack.** Tape, tissue paper and a lid are what an unboxing sounds
   like. Keep "voice and room sound only". Music added later in Video Studio plays at full
   level under the avatar's words, so it suits the quiet variant best.
10. **Exact words go in text.** A price, a code or a spelled-out name goes in the caption or as
    Video Studio text, never as print the video has to draw.

### Variants

| Variant | Their words | `ugc_style` | Length | What changes |
|---|---|---|---|---|
| Classic | unboxing, first look, just arrived | `Unboxing` | 15 s | The seven beats |
| PR or launch box | PR package, launch box, mailer, the drop, gifted | `Unboxing` | 15-20 s | Their own box photo strongly preferred; tissue, a card face down; honest framing (craft, section 8) |
| Quiet (ASMR) | ASMR, satisfying, no talking | `Unboxing` | 10-15 s | No spoken lines; Sound: "room sound only: the tape, the tissue paper and the lid"; slower hands |
| Full first look | unbox and try, first impressions | `Unboxing` | 20-25 s | The first touch becomes a short first use, still one take |
| Haul | haul, several items, everything in the drop | `Unboxing`, one take per item | 8-12 s per item | Each item lifted out and shown, joined in Video Studio with item labels (below). Wearing each piece is a try-on haul: `creatorline-try-on-video` |

A named template is followed hard. `Unboxing` builds one slow reveal at medium framing with the
hands and product in view; never switch it to `Cinematic` unless the person asks for a polished
brand film.

## Several takes (hauls)

Use several takes for 2 to 5 items (one item per take keeps each product true to its photo),
or when the person wants separate beats joined. One product never needs it: one take holds up
to 30 s, and every join is a fresh render where the face can drift a little.

1. Plan one take per item: take 1 opens the package and reveals item 1; later takes lift the
   next item out of the already open box. The same avatar, and the Setting and Wardrobe lines
   word for word in every brief.
2. Price the whole batch before anything starts: `create_generation` without `confirm` for
   every take, plus `get_video_guide` (`credits.export`, and `credits.captions` when captions
   are part of it). One line per item, the total, the balance, one yes.
3. On yes, start every take with `confirm: true`, then wait on each with `get_generation`.
   The workspace films a set number at once; the rest wait their turn and start on their own.
4. Build one video with `create_video` (an `add_clip` per take, in order), add a title and item
   labels with `edit_video`, look with `preview_video`, then captions if planned, then
   `export_video` with `confirm: true`.

Every operation, the polling and what to do when one take fails: references/multi-take-assembly.md.

## Check before you show it

- `status` is `succeeded` and `output[0].duration_sec` is close to the length asked.
- `preview_assets` with `asset_ids: [<the output's asset_id>]`: the cover shows the right
  avatar and the package or product.
- The cover is one frame: you do not see the motion. When a risk was known (a big printed
  logo, a package with several parts, a small product held close), name in one line what to
  watch for.
- A haul: every take has a verdict before you build, and `ready_to_export` is true with no
  `warnings` before you export.

## If it goes wrong

Give every take one verdict before any new spend (references/house-rules.md, section 5).
Change one thing per retry. A retry is a new paid run: quote it and ask.

| What happened | Likely cause | The one change |
|---|---|---|
| The product looks different (shape, colour, label) | Photo with hands, clutter or an angle; a big logo | A clean front-label photo; tighten the card's Looks and Size lines; logos: references/product-intake.md, section 5 |
| The box pops open by itself, or the product appears from nowhere | The opening asked for inside one shot | Keep "the box opens on a cut"; make the opening simpler (a lid that lifts off) |
| Two of the product, or the box closes again | The product placed in two spots in the brief | One unit named once; "the empty box sits at the edge of the table" |
| Extra or merged hands | Too many actions in a beat, or a selfie angle | "phone propped, both hands free"; one action per beat; say each hand's job |
| The reaction feels fake or too loud | Hype words in the brief or the brand tone | "a small gasp and a grin", or the calm register |
| Words rushed or cut off | Over the speech budget | Trim the lines (table above) or go longer |
| Music under the voice | No Sound line | "voice and room sound only" |
| Wrong language | No Language line | Add it |
| Failed: a content check | Words, a real name, another brand | Rephrase as `next` says; drop names and other brands |
| Failed: a real face refused | A real person in an input: a product or box photo with a model in it, or a real person's photo | A photo of the product alone; for a real person on camera, references/video-briefs.md, section 12 |
| Nearly right: a slow start, a long pause, an ending that runs on | | Trim it in Video Studio (`creatorline-video-studio`), no new take |
| A wrong or unwanted spoken line | The writer worded it | The exact line in quotes in the brief ("use these lines as written"), then a new take |

After three paid attempts at the same thing, stop and offer: keep the best take, change the
idea, or try another format.

## Show the result

```
**Unboxing: Glow C Serum**: 15 s, Mia opens a plain box at her desk, lifts out the serum, unscrews the dropper and ends on a calm verdict.
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <credits_charged> credits. <credit_balance> left.

What next?
1. Add a hook line and captions
2. Make a cover for it
3. Put it in the review queue for TikTok and Instagram
```

- The video link expires; the Creatorline link stays.
- A haul: the exported video's link (`export.url`) and its `studio_url`, the items in one line,
  and the batch's total credits.
- A failure: what failed in plain words, that it was refunded, the one change you would make,
  and a question before retrying.

## Next steps to offer

Pick the two or three that fit; one line each.

| Offer | Skill |
|---|---|
| A hook headline and word-timed captions | `creatorline-captions` |
| A cover image for the post | `creatorline-cover-image` |
| Post it: caption and hashtags in the brand's voice, into the review queue | `creatorline-publish` |
| The same unboxing with another avatar, hook or language | `creatorline-ad-variations` |
| What comes after the box: a how-to, or a try-on for clothing | `creatorline-tutorial-video`, `creatorline-try-on-video` |
| Edits: trims, text, music under it | `creatorline-video-studio` |
| The avatar's own voice on it (a re-voice) | `creatorline-voiceover` |
| The rest of the collection as a haul | this skill, several takes |

## References

- [references/unboxing-craft.md](references/unboxing-craft.md): beats in depth, packages and
  how they open, handling by size, reactions, hooks, honest details, PR framing.
- [references/unboxing-briefs.md](references/unboxing-briefs.md): worked briefs with the exact
  call for each variant.
- [references/multi-take-assembly.md](references/multi-take-assembly.md): hauls and joined
  takes in Video Studio, step by step.
- [references/house-rules.md](references/house-rules.md): the session, consent before
  spending, waiting, the result card, failures, safety, refusals, what only the app does.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): how the server writes the video
  from your brief, templates, speech budget, claim floor, inputs.
- [references/product-intake.md](references/product-intake.md): getting the product in and the
  product card.
