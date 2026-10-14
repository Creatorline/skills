---
name: creatorline-unboxing-video
description: "Makes a creator-led unboxing video: the brand's AI avatar opens a sealed package, reveals the product, reacts and lands a verdict. PR boxes, hauls, ASMR, longer first looks. Use for unboxing, open the box, PR package, haul; a missing photo is asked for, not refused. Not for a script only, hands-only reveals (creatorline-product-video) or wearing it (creatorline-try-on-video)."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Unboxing video

You make a vertical unboxing video in which the brand's avatar opens a package on camera in four
beats: the sealed box, the reveal, the product up close, and settled satisfaction. It is filmed
like a phone video at home, with the person's real product and the same avatar face as every
other video of the brand. The promise to the person: one short exchange, a price before anything
is made, a video they can watch, edit and post from the review queue.

## When to use

Two things together: a person performing on camera AND a package being opened. An unboxing that
does not say who is on camera gets the brand's avatar: this skill.

- "unboxing", "open the box", "first look", "it just arrived", "out of the box";
- "PR package", "PR box", "launch box", "mailer", "the drop", "gifted";
- "haul", "everything in the order", "three things from the new collection";
- "ASMR unboxing", "satisfying unboxing", "no talking, just the sounds".

A missing product photo, length or avatar is something to ask for, never a reason to decline.

## Not for

| The person wants | Use |
|---|---|
| Only hands on camera ("POV", "no face"), with a voice over it | `creatorline-product-video`. Never add the avatar to make it fit. |
| A package or product with no person and no voice: a box opening by itself, a packshot | A one-off in `creatorline` (a still: `creatorline-photos`) |
| The avatar reviewing a product already out of its box, talking to camera | `creatorline-talking-video` |
| Wearing it: outfits, shoes, jewelry, a fit check, a try-on haul | `creatorline-try-on-video` |
| How to use it, step by step | `creatorline-tutorial-video` |
| An unboxing video they found (a link) re-filmed with the avatar | `creatorline-reshoot` |
| A real unboxing video kept as it is, with the person swapped for the avatar | `creatorline-character-swap` |
| A script, an outline or a shot list only, even one that says "unboxing" | `creatorline-short-script` |
| Edits to footage they already have | `creatorline-video-studio` |
| Many versions of a finished unboxing | `creatorline-ad-variations` |
| Their product put into an unboxing video that already exists, the rest kept | `creatorline-ad-variations` (a video edit) |

## What you need

| Item | Ask? | If missing |
|---|---|---|
| A photo of the product (a file link, or an image in the library); for a haul, one per item | Hard gap: ask once | Nothing is filmed without it. Offer the script meanwhile (`creatorline-short-script`). |
| Length | Ask with options unless the words give it | 15 s |
| Whether they have a photo of their real package | Ask once, in the same message | The plain brown box (references/unboxing-craft.md, section 3) |
| What it is and how it is used | Only what the photo and page do not show | The product card (references/product-intake.md) |
| Anything it must or must never say | Optional, one question for health, supplement or skincare products; never a condition | Write freely: the label, the page and the persona's own story; a list they give is kept word for word |
| Accent | Only when they hint at one (say where the avatar is from) | None named |
| A habit or mannerism | Only when they mention one | None |
| Avatar | Never, unless they name one | The brand's default avatar. The brand has none: it is made in the app (references/house-rules.md, section 9) |
| Variant (classic, PR box, quiet, haul) | Never: read it from their words | Classic |
| Register | Never: read it from their words | Natural, one peak at the reveal |
| Setting | Never | At home; the surface by the product's size; neutral window daylight |
| Voice, music, on-screen text | Never during intake | A natural voice filmed with the video; no music; no text (asked once at the end) |
| Model, aspect, resolution, transitions, number of shots | Never | 9:16, `720p` (`1080p` only on request, about 2.5 times the price) |
| Language | Never | The brand's `language`; English lines in an American accent unless the brand's `country` says otherwise |

## The flow

1. **Activation.** When `track_skill_activation` is in your tool list, call it once with
   `skill_name: "creatorline-unboxing-video"`. Never again for the same request.
2. **Gates.** Format: does the ask have a person performing a reveal? If not, route it (Not for)
   and never invent a creator to make it fit. Safety: real people only with consent, adults only,
   no product the house rules decline (references/house-rules.md, section 7). Decline plainly;
   never quietly change the request into something else.
3. **Orient** (references/house-rules.md, section 1): `list_brands`, `get_brand` (its
   `default_avatar_id`, `language`, `country`, `brand_voice`), then `get_avatar` on that avatar
   for its name and `voice_id`, or `list_avatars` when the person named another one;
   `get_credit_balance`. `free_trial: true`: nothing paid runs yet (references/house-rules.md,
   section 8); offer the brief and the script for free.
4. **Read the ask once.** Note what is already given: product, package, length, lines, tone
   words, accent, location or look. Then the detail level (references/asking.md, section 4):
   - a few words: autopilot, you decide beats and lines;
   - a few sentences of tone: keep their tone, build the beats yourself;
   - a beat list or script: map it one to one onto the beats, in their order. Change only what
     is unsafe or cannot render, and keep the house laws: the opening falls on a cut, the box
     never returns, one product. Say what you changed.
5. **Intake, one message** (references/asking.md; use the host's question tool when your list
   has one). Only the gaps, at most three questions, in this order: the product photo (if
   missing), the package, the length. Then one line of defaults:

   > Love this one. Two quick things:
   > 1. The box: 1) a plain shipping box (recommended) 2) your own box or mailer: send a link to a photo of it, or add it to your Creatorline library and tell me its name
   > 2. Length: 1) 15 s, open, react, verdict (recommended) 2) 10 s, a quick reveal 3) 30 s, unbox and try it 4) 45 s, a full first look
   >
   > Defaults: Mia, 9:16, at her desk in daylight, a natural reaction, English, no music.

   For a PR or launch box, recommend their own box photo. For health, supplement or skincare
   products add "Anything it must or must never say about it?"; with four questions, drop the
   length and state 15 s. A photo attached in the chat does not reach Creatorline: ask for a
   link to the file, or an upload in the app (references/product-intake.md, section 1). They
   say a package photo is coming but none arrives: ask once for the file and wait; a "yes" is
   not a photo.
6. **Get the product in** (references/product-intake.md): `list_assets` with `brand_id`,
   `file_type: "image"` and `search`, or `import_asset` for a file link; the same for a package
   photo. Write the product card once, plus four unboxing lines: the weight class, the size
   against the hand with a rough measure in cm, how the package opens, and what the product
   is known for lacking, said positively (references/unboxing-craft.md, sections 4 and 7).
7. **Write every brief** before pricing anything: one brief, or one per take for a haul or a
   video over 30 s. Template below; worked versions in references/unboxing-briefs.md. Then run
   the checklist in [Check before you quote](#check-before-you-quote).
8. **Plan and price.** Call `create_generation` WITHOUT `confirm`:

   ```json
   {
     "tool": "ugc-video",
     "brand_id": "<brand id>",
     "prompt": "<the brief>",
     "inputs": { "objects": ["<product asset id>", "<package asset id, when given>"] },
     "params": { "ugc_style": "Unboxing", "duration": 15 }
   }
   ```

   - Leave out `model`, `aspect_ratio` and `resolution` unless asked. Add `avatar_id` only for
     an avatar that is not the brand's default.
   - Optional `inputs.location`: a photo of the person's own room. Keep to four images in all
     (avatar, product, package, place): the writer looks at four.
   - Leave `change_voice` off: it runs as a separate charged step that this quote does not
     include and `get_generation` does not return. For the avatar's own voice (`get_avatar`
     shows a `voice_id`), re-voice the finished video as its own run (`creatorline-voiceover`).
   - A real person on camera instead of an avatar, with their consent: references/video-briefs.md,
     section 12.

   The answer is `status: "needs_approval"` with `credits`, `credit_balance` and `sufficient`.
   Say the plan in one or two lines, then the price, then ask:

   > A 15-second unboxing: Mia slices open a plain box at her desk, lifts out the Glow C Serum
   > with a gasp, shows the dropper up close, and settles with it at arm's length.
   > <N> credits; you have <M>. Go ahead?

   `sufficient: false`: do not confirm; say how many credits are missing and offer 10 s
   (references/house-rules.md, section 2). A free-trial refusal or any other "no": pass on the
   server's words (references/house-rules.md, section 8).
9. **Run.** On yes, the same call with `confirm: true`. Keep `credits_charged` and
   `credit_balance` for the card.
10. **Wait and narrate.** `get_generation` with `generation_id` and `wait_seconds: 45`, again
    while `status` is `queued` or `processing`. One short line between calls: "Filming the box
    and the reveal now. Videos take 1 to 5 minutes." "Still filming." Stay until it ends; never
    start it twice.
11. **Check** (Check before you show it), **show** the card, ask the on-screen text question,
    offer next steps.

Several items (a haul), a video over 30 s, or takes the person wants joined: one take each,
then one Video Studio video ([Several takes](#several-takes)). The person wants each beat drawn
exactly, or two takes broke the arc the same way: references/frame-first.md.

### The brief

Plain sentences, in this order; skip a line you have nothing for. Read
references/video-briefs.md before your first brief (speech budget, the persona, inputs).

```
Idea: @Avatar1 unboxes <product> at <place>: <why it is worth watching, one line>.
Register: <natural | excited | calm | silent> (<the words that set it>).
Hook: "<first line; its first word is already the hook>" with <beat 1's motion already happening>.
Package: <plain brown box, tape, tissue colour, the cutter beside it> or <@Object2 exactly as in the photo, how it opens>.
Beat 1, sealed: <framing, where the phone is>. <each hand's job>; <the slice, or the build-up and the package's own opening>.
Beat 2, reveal, the longest beat: on the cut, <framing>. <lifted per weight class>, label to camera; <the peak body event>. The open box sits at the edge of the <surface>.
Beat 3, product focus, the shortest beat: tight on <product> near the lens, only <hands / part of the face>; <one action>.
Beat 4, satisfaction: on the cut, <selfie at arm's length or propped wide>; <outfit and room in view>, ending <mid-gesture | on beat 1's framing>.
Product: <product card, with size against the hand in cm>. Page: <url>
Setting: <surface for its size, room>, neutral daylight from one window, a plain wall behind @Avatar1.
Wardrobe: <only when it matters; word for word in every take>.
Lines: "<line>" / "<line>" (when given, or when you wrote them; within the word band)
Language: <spoken language, accent>.
Sound: voice and room sound only: <every sound to be heard: the slice, the flaps, the tissue, a gasp>.
```

## Craft

The details live in the references: the beats, box, handling and camera in
references/unboxing-craft.md; reaction, words and voice in references/performance.md; anything
past 15 s in references/after-the-reveal.md.

### The four beats

| Beat | Camera | What happens | Words |
|---|---|---|---|
| 1. Sealed (the hook) | Propped, waist-up with box and room | Fingers already at the tape; the slice (plain box) or the knuckle-tap build-up (their box); no product in sight | The hook, first word within 0.4 s; no greeting; the purchase or the wait ("I've waited months for this") is a proven one |
| 2. Reveal (the one peak) | Propped, chest-up | On the cut: the product lifted as its weight class says, toward the chest; one body event; box at the edge | The product's name, a gut reaction |
| 3. Product focus | Propped, tight on the product | The product near the lens, hands and part of the face only; one action; box gone | Little: the action carries it |
| 4. Satisfaction | Selfie at arm's length, or propped wide | Settled ownership, outfit and room in view; box gone; ends loopable | A verdict in the persona's own voice; where it goes or how long it waited for it is welcome |

| Length | Shots | Beats | Words |
|---|---|---|---|
| 6-8 s | 2 | Sealed / reveal held into the verdict | 12-20 |
| 10 s | 3 | Sealed / reveal with the focus folded in / satisfaction | 12-20 |
| 12 s | 4 | All four, even | 20-28 |
| 15 s (default) | 4 | All four, weighted about 3.5 / 4.5 / 3 / 4 | 28-35 |
| 30 s | 4 + 4 | The four beats, then one post-reveal section, one take | 28-35 per section |
| 45 s | 3 takes | The four beats, then two post-reveal sections, joined | 28-35 per section |

Every shot holds at least 3 s, so under 6 s there is no room for the opening cut: offer 10 s.
The seconds are planning weights: in the brief say which beat is longest, never the seconds.

### The laws

1. **The opening happens on a cut** between beats 1 and 2, never inside a shot.
2. **The box is gone after the reveal.** Edge of frame in beat 2, then never again: no closing,
   no re-taping, no carrying, no packing the product back.
3. **One product unit.** Nothing with the same shape on the set; a pair counts as one.
4. **The box is real or plain.** Their photo shown exactly, or the plain brown box. Never a
   gift box, a retail box or a logo invented from words.
5. **Held for its weight.** Heavy: both hands, a lean, a set jaw with delight on the face.
   Tiny: pinched near the lens. Real scale only.
6. **Every beat already moving,** and every beat at a new distance.
7. **Hands named.** Each hand has one job per beat; three jobs grow a third arm.
8. **The phone is the camera.** Never in frame, no mirrors or reflections, no camera moves
   unless asked; a propped frame is still while the body moves.
9. **One peak** in the natural register, a body event at the reveal. The register comes from
   explicit words only.
10. **The persona has a story.** The purchase or the wait is the format's proven opening ("I
    caved", "I've waited months for this", "my order finally came"), and a use history or a
    result over time is welcome in the verdict or a later section (the persona,
    references/house-rules.md, section 7). Spoken, a story needs no beat; a line that tells the
    viewer to SEE something needs a beat that shows it.
11. **The package is the soundtrack.** Name every sound in the Sound line; no music unless
    asked.
12. **Exact words go in text.** A price, a code or a spelled-out name goes in the caption or as
    Video Studio text, never as print the video has to draw.
13. **The end loops and asks for nothing.** No spoken call to action: it goes in the caption.

### Variants

| Variant | Their words | `ugc_style` | Length | What changes |
|---|---|---|---|---|
| Classic | unboxing, first look, just arrived | `Unboxing` | 15 s | The four beats |
| PR or launch box | PR package, launch box, mailer, the drop, gifted | `Unboxing` | 15 s | Their own box photo strongly preferred, the build-up of beat 1, a card face down; a gift or a launch framing (unboxing-craft.md, section 11) |
| Quiet (ASMR) | ASMR, satisfying, no talking | `Unboxing` | 10-15 s | Silent register, slower hands, every sound named |
| Unbox and try | unbox and try, first impressions | `Unboxing` | 30 s | A First use section after the four beats (after-the-reveal.md) |
| Full first look | full first look, everything about it | `Unboxing` | 45 s | Three sections, one take each, joined |
| Haul | haul, several items, everything in the drop | `Unboxing`, one take per item | 8-15 s per item | Joined in Video Studio with item labels. Wearing each piece is a try-on haul: `creatorline-try-on-video` |

`Unboxing` builds one slow reveal with the hands and product in view. Never switch it to
`Cinematic` unless the person asks for a polished brand film.

## Several takes

Use several takes for a haul of 2 to 5 items (one item per take keeps each product true to its
photo), for one product over 30 s (one take per 15-second section), or when the person wants
separate beats joined. One product up to 30 s never needs it: each join is a fresh render where
the face can drift a little.

1. Plan the takes: take 1 runs the four beats; later takes start with the box open at the edge
   (a haul) or open mid-thought in a post-reveal shape (a long video). The same avatar, and the
   Setting, Wardrobe, Register and Language lines word for word in every brief.
2. Price the whole batch before anything starts: `create_generation` without `confirm` for
   every take, plus `get_video_guide` (`credits.export`, and `credits.captions` when captions
   are part of it). One line per take, the total, the balance, one yes.
3. On yes, start every take with `confirm: true`, then wait on each with `get_generation`.
   The workspace films a set number at once; the rest wait their turn and start on their own.
4. Build one video with `create_video` (an `add_clip` per take, in order), add labels with
   `edit_video`, look with `preview_video`, captions if planned, then `export_video` with
   `confirm: true`.

Every operation, the polling and what to do when one take fails: references/multi-take-assembly.md.

## Check before you quote

Read every brief against this list before the first `create_generation` call:

- The four beats in order; beat 1 shows no product, beat 4 no box; four different actions and
  four different distances.
- Every beat starts mid-motion; the hook's first word is hook content and not on the banned
  list (references/performance.md, section 7).
- The opening falls on the cut between beats 1 and 2; nothing crosses that cut.
- The cutter only with the plain box; tissue only with the plain box or when their photo shows it.
- The weight class written into the reveal; each hand's job named; no third job.
- One product action per beat (the slice counts as beat 1's); no loop words ("again",
  "repeatedly", "back and forth").
- No mirror, glass or phone in frame; no camera move unless asked; neutral daylight.
- Lines inside the word band; none of the banned words; no other brand named; no spoken call to
  action. A story, a time of use or a result is spoken; a line pointing at something to see has
  a beat that shows it.
- Register, Accent and Setting lines identical in every take; the last take ends loopable.
- No age words (girl, boy, kid, young, teen); the avatar's face never described.

## Check before you show it

- `status` is `succeeded` and `output[0].duration_sec` is close to the length asked.
- `preview_assets` with `asset_ids: [<the output's asset_id>]`: the cover shows the right avatar
  and the package or product.
- The cover is one frame. When the clip goes into Video Studio anyway (captions, labels),
  `preview_video` at a few seconds (the middle of each beat, two moments mid-sentence) shows
  more; if its `note` says the clips were shown by their cover, you cannot see inside.
- Then name the checkpoints for the person in one line: one product; at most two hands; the box
  gone after the reveal; the label and shape true to the photo; no stray text; the face steady;
  the lips clean on the words.
- A haul or a long video: every take has a verdict before you build, and `ready_to_export` is
  true with no `warnings` before you export.

## If it goes wrong

Give every take one verdict before any new spend (references/house-rules.md, section 5).
Change one thing per retry. A retry is a new paid run: quote it and ask. Re-run only the take
that failed.

| What happened | Likely cause | The one change |
|---|---|---|
| The product looks different (shape, colour, label) | Photo with hands, clutter or an angle; a big logo | A clean front-label photo; tighten the card's Looks and Size lines; logos: references/product-intake.md, section 5 |
| The box pops open by itself, or the product appears from nowhere | The opening asked for inside one shot | Keep "on the cut"; a simpler opening (a lid that lifts off); twice the same: references/frame-first.md |
| Two of the product, or the box comes back | The product or box placed in two spots in the brief | One unit named once; "the open box sits at the edge" only in beat 2 |
| The cutter looks wrong | A blade is hard to draw | Peel the tape in one long strip instead, no cutter in the brief |
| Extra or merged hands | Three jobs in a beat, or a selfie with a two-handed action | Phone propped; one action per beat; each hand's job named |
| Extra bodies, a doubled face | A mirror, a window or a glossy surface in the room | A plain wall behind the avatar |
| The reaction feels fake or too loud | Hype words, or several peaks | One body event at the reveal, or the calm register |
| Words rushed or cut off | Over the word band | Trim the lines or go longer |
| Music under the voice | No Sound line | "voice and room sound only" |
| Wrong language or accent | No Language line | Add it, word for word in every take |
| Failed: a content check | Words, a real name, another brand | Rephrase as `next` says; drop names and other brands |
| Failed twice on the same take | The inputs themselves | Never send them a third time: change the product photo or offer another of the brand's avatars; never switch avatar or model without asking |
| Failed: a real face refused | A real person in an input: a product or box photo with a model in it | A photo of the product alone; for a real person on camera, references/video-briefs.md, section 12 |
| Nearly right: a slow start, a long pause, an ending that runs on | | Trim it in Video Studio (`creatorline-video-studio`), no new take |
| A wrong or unwanted spoken line | The writer worded it | The exact line in quotes ("use these lines as written"), then a new take |

After three paid attempts at the same thing, stop and offer: keep the best take, change the
idea, or try another format.

## Show the result

```
**Unboxing: Glow C Serum**: 15 s, Mia slices open a plain box at her desk, lifts out the serum with a gasp, shows the dropper up close and settles with it at arm's length.
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <credits_charged> credits. <credit_balance> left.

Text on the video? 1) Captions 2) A hook headline 3) Both 4) No text (as it is now)
```

- The video link expires; the Creatorline link stays.
- Ask the text question once, at the end, if the person has not answered it already. Captions,
  a hook or both: `creatorline-captions`, price first. The clean video stays as it is beside the
  captioned one.
- Then two or three next steps (below), one line each.
- A haul or long video: the exported video's link (`export.url`) and its `studio_url`, the items
  or sections in one line, and the batch's total credits.
- A failure: what failed in plain words, that it was refunded, the one change you would make,
  and a question before retrying.

## Next steps to offer

| Offer | Skill |
|---|---|
| Post it: a caption in the brand's voice, 3 to 5 hashtags, a line for them to pin as the first comment, a note on how it loops; into the review queue | `creatorline-publish` |
| A cover image for the post | `creatorline-cover-image` |
| The same unboxing with another avatar, hook or language | `creatorline-ad-variations` |
| What comes after the box: a how-to, or a try-on for clothing | `creatorline-tutorial-video`, `creatorline-try-on-video` |
| Edits: trims, text, music under it | `creatorline-video-studio` |
| The avatar's own voice on it (a re-voice) | `creatorline-voiceover` |
| The rest of the collection as a haul | this skill, several takes |

## References

Read a reference when you reach its step; use only this skill's own references.

- [references/unboxing-craft.md](references/unboxing-craft.md): the four beats, lengths, the box
  contract, openings, the cutter or the build-up, surfaces, weight classes, camera, hands,
  props, the persona's story and details, PR framing.
- [references/performance.md](references/performance.md): register, expressions, the peak,
  small human moments, quirks, the hook, banned words, delivery, accent, endings, devices.
- [references/after-the-reveal.md](references/after-the-reveal.md): sections past 15 s, the four
  post-reveal shapes, first-use mechanics, a 30-second brief.
- [references/unboxing-briefs.md](references/unboxing-briefs.md): worked briefs with the exact
  call for each variant.
- [references/frame-first.md](references/frame-first.md): four stills first, then the video
  from them.
- [references/multi-take-assembly.md](references/multi-take-assembly.md): hauls and long videos
  joined in Video Studio, step by step.
- [references/house-rules.md](references/house-rules.md): the session, consent before
  spending, waiting, the result card, failures, safety, refusals, what only the app does.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): how the server writes the video
  from your brief, templates, speech budget, the persona, inputs.
- [references/product-intake.md](references/product-intake.md): getting the product in and the
  product card.
