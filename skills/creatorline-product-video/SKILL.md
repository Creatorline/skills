---
name: creatorline-product-video
description: "Makes a short product video: the product is the hero, a voice speaks off screen, and a person appears only as hands or a first-person view, shot like a phone video. Use for 'product video', 'just hands', 'faceless product ad', 'product b-roll with a voiceover'. Not for the avatar on camera: use creatorline-talking-video. Silent clips: creatorline."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Product Video

You make one short vertical video where the product is the star. It sits somewhere real, a hand
opens it and uses it the way it is really used, and a voice off screen says why it matters. It
looks like a phone video a customer shot, not an ad. No face is on camera: a person shows up only
as hands, a first-person view, or a body cropped below the face.

The promise to the person: one product photo in, a postable clip out, in one short exchange. You
ask only what changes the result, show the words and the price before anything runs, keep them
posted while it films, and hand back a clip that is one step from captions, a cover and a post.

Run the session by [the house rules](references/house-rules.md) and ask the way
[asking](references/asking.md) says. Get the product in by [product intake](references/product-intake.md)
and write the brief by [video briefs](references/video-briefs.md). This file adds only what is
particular to product-first videos.

## When to use

- "A video of my product", "product only", "no face", "just hands", "faceless product ad".
- "Show how it works, hands only", "POV of using it", "a kitchen / bathroom / car shot of it".
- "Product b-roll with a voiceover", "bring my product photo to life and say why it's good".
- A hands-only reveal of the product coming out of its box, with no one reacting on camera.
- A clothing item, shoe or bag shown on its own: a flat lay, a hanger, a hand opening the box.
- A brand made for faceless content that sells a physical product.

## Not for

| The ask | Use |
|---|---|
| The avatar on camera talking about the product | `creatorline-talking-video` |
| The avatar opening a package and reacting | `creatorline-unboxing-video` |
| The avatar wearing clothes, shoes, a bag, jewelry | `creatorline-try-on-video` |
| A how-to with every step labeled on screen | `creatorline-tutorial-video` |
| An app, a website, an online store | `creatorline-app-promo-video` |
| A silent product clip, or a product photo animated with no voice | `creatorline` (a one-off generation) |
| Product photos or a carousel | `creatorline-photos` |
| Narration over pictures with no product in them | `creatorline-faceless-video` |
| Re-filming a viral product video | `creatorline-reshoot` |
| Many versions of a product video that works | `creatorline-ad-variations` |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Product photo | Yes. A real photo of the real product | None. The product is on screen the whole time, so nothing runs without one, and the "named but never shown" fallback in product intake does not apply here |
| How it is used | Only when the photo and page cannot tell (how it opens, where it goes) | Read from the photo, the page and the category |
| Length | No | 8 s, two shots |
| Who is in frame | No | One pair of hands, no face |
| Voice | No | Off screen, in the brand's `language`, the default avatar's gender and tone |
| Words | No | You write them from the product card and `brand_voice`, and show them with the price |
| Setting | No | By category ([shot lists](references/shot-lists.md)): a real room, one window or ceiling light |
| Claims | One optional question: "Anything you must say, or must never say?" | Label facts and what the frame shows |
| Music | No | None: the voice and the product's own sounds |
| Frame | Never ask | 9:16, 720p, phone style |

## Pick the path

Start on path A at 8 seconds unless the ask points elsewhere. The paths and the model ids are for
you only: tell the person what they get ("no face, the product and a pair of hands"), never the
path letter or the model.

| The ask | Path | What runs |
|---|---|---|
| A clip with a few shots and the hands doing the demo (the default) | A. No-face clip | `ugc-video` on its no-face model, the product in `image_urls` |
| The product alone: only it, the light and the camera move | A, with a brief that puts nothing else in frame | same |
| One unbroken take (a pour, a spray, pick it up and use it), or the look approved before any motion | B. Still, then motion | `photo-edit` with no avatar, then `photo-to-video` |
| Up to 30 s as one flowing take | B on the longer photo-to-video model | same, `model: "bytedance-seedance-2-5-image-to-video"` |
| The person's own avatar as the hands and body (first person, car, mirror), face out of frame | C. Avatar, face out of frame | `ugc-video` on its default model with the avatar |
| 24 s with several moments, or words that must be exact | D. Assemble | 2 or 3 clips from A, B or C, joined in Video Studio under one voiceover |

Why path A names a model: the default `ugc-video` model needs a person image in `characters`.
With `include_avatar: false` and nothing there it refuses ("Missing required input
\"characters\""). Its no-face model, `veo3-1-reference-to-video`, takes 1 to 3 plain images in
`image_urls` and never adds the avatar. Its `duration` moves in steps of 8 (8, 16, 24):
`list_models` shows the bounds but not the step, so pass a multiple of 8. Past 8 s it films
8-second takes and joins them, and the voice can change at each join (Voice options, below).

Why path B names a photo model: the default `photo-edit` model has no 9:16 frame;
`gpt-image-v2-edit` does.

If a call is refused over a slot or a value, read `list_models` with that `tool` and fix the call:
it is the live list of slots, values and bounds.

## The flow

1. **Activate.** When `track_skill_activation` is in your tool list, call it with
   `skill_name: "creatorline-product-video"` once per new request (house rules, section 10).
2. **Orient** (house rules, section 1). From `get_brand` keep `language`, `voice_id`,
   `default_avatar_id` and `brand_voice` (do's, don'ts, positioning, audience). `get_avatar` on
   the default avatar gives `gender` and `tone` for the voice.
3. **Get the product** ([product intake](references/product-intake.md)): `list_assets` with
   `brand_id`, `file_type: "image"`, `search`, then `preview_assets` and confirm by name; or
   `import_asset` with `url`, `brand_id`, `title`. A photo on their phone or computer goes into
   https://app.creatorline.io/assets first (with `?activeBrand=`, house rules, section 9).
   Write the product card once; its "How it is used" line is your **use line**: how it opens,
   how it is used, where it goes ([shot grammar](references/shot-grammar.md), sections 6 and 7).
   A location photo is optional: find or import it the same way.
4. **Intake.** One message, only the gaps (see the example below). State the defaults in one
   line.
5. **Build it.** Pick the path, the setting and 2 or 3 props ([shot lists](references/shot-lists.md)),
   the shots ([shot grammar](references/shot-grammar.md)) and the words ([voiceover](references/voiceover.md)).
   Write the brief (below).
6. **Price.** Call each paid step without `confirm` and add them up (house rules, section 2):
   - A or C: `create_generation` without `confirm` answers `needs_approval` with `credits`.
   - B: `photo-edit` without `confirm`, plus `estimate_generation_cost` with
     `tool: "photo-to-video"` and the `params` you will pass.
   - Path A at 16 or 24 s, or the brand's own voice: add `estimate_generation_cost` with
     `tool: "change-voice"` (Voice options, below), and say in the plan that it keeps one voice.
   - D: each clip, plus the Video Studio steps from `get_video_guide` `credits` (voiceover,
     export, captions if wanted).

   Then one message: what you will make, the voiceover word for word, one line per paid step,
   the total, the balance, "Go ahead?" ([asking](references/asking.md), section 6).
7. **Run.** On yes, the same calls with `confirm: true`, in order. A step whose input only exists
   after an earlier one (the animation of the picked still, a re-voice of the finished clip):
   call it once without `confirm` when its input is ready. Same price as quoted: go on with
   `confirm: true`. A different price: tell the person and ask again. Path B: show the stills,
   take the person's pick (or pick the best yourself when they said "just do it"), then animate
   it. The yes covered one animation; a second one is a new quote.
8. **Wait and narrate.** `get_generation` with `generation_id` and `wait_seconds: 45`, again
   until `succeeded` or `failed`. One short line between calls: "Filming the counter shot and the
   pour now." "Still filming; the voice is made in the same pass." A video often takes a few
   minutes.
9. **Check** (below), **show** (below), **offer next steps** (below).

### The calls

Path A, no-face clip:

```json
{ "tool": "ugc-video", "model": "veo3-1-reference-to-video", "brand_id": "<brand>",
  "include_avatar": false,
  "inputs": { "image_urls": ["<product asset>", "<location asset, optional>"] },
  "params": { "duration": 8 },
  "prompt": "<the brief>" }
```

Path B, the still (2 to pick from; this model has a 9:16 frame):

```json
{ "tool": "photo-edit", "model": "gpt-image-v2-edit", "brand_id": "<brand>",
  "include_avatar": false, "count": 2,
  "inputs": { "other_elements": ["<product asset>"], "location": ["<location asset, optional>"] },
  "params": { "aspect_ratio": "9:16" },
  "prompt": "<a casual phone photo: the product in place, the light, a hand if wanted>" }
```

Path B, the motion (the default model takes 4 to 15 s; `end_image_url` is an optional last frame):

```json
{ "tool": "photo-to-video", "brand_id": "<brand>",
  "inputs": { "image_url": "<the picked still>" },
  "params": { "duration": 8 },
  "prompt": "<what moves, and the voiceover>" }
```

Path C, the avatar with the face out of frame (default model; the brand's default avatar goes in
by itself, or add `avatar_id` for the one the person named):

```json
{ "tool": "ugc-video", "brand_id": "<brand>",
  "inputs": { "objects": ["<product asset>"], "location": ["<location asset, optional>"] },
  "params": { "duration": 10 },
  "prompt": "<the brief, naming @Avatar1, @Object1, @Location1>" }
```

When the person's own photo already shows the product in place, upright and vertical, skip the
still and animate their photo. Full worked calls, briefs included, are in [examples](references/examples.md).

### Intake example

> Let's make it. Two quick things:
> 1. The product photo: a link to the image, or its name in your Creatorline library. A photo on
>    your phone goes into your library first: https://app.creatorline.io/assets
> 2. Length: 1) 8 s, two quick shots (recommended) 2) 16 s, four shots 3) 24 s, three clips under
>    one voiceover
>
> Defaults: hands only, no face; a voice off screen in English, warm and quick, in your brand's
> tone; a bathroom counter by a window; phone style, 9:16. Say if you want any changed.

The setting in the defaults line comes from the product's category ([shot lists](references/shot-lists.md)).
If the photo is already in hand and the person said "just do it", ask nothing and go to the
price.

## The brief

The `prompt` is the brief our server's writer turns into the shot list (video-briefs.md). Plain
sentences, English, this order, about 80 to 180 words (the product card and the voiceover take
most of them):

```
Format: a phone video of <product>, hands only: only the product and a pair of hands are in frame.
A <woman's / man's> voice speaks off screen, <tone>.
Product: <the product card>. Use: <the use line>. @Image1 is the product. Page: <url>
Setting: <place, surface, light, 2-3 props>. @Image2 is this place (when given).
Shots: 1 <the use, mid-action>. 2 <the result or the close mechanism>. (3 and 4 on longer clips)
Voiceover, word for word: "<the lines>"
Ending: <the product set down, label to the camera, the result in frame>
Sound: voice and room sound only, with the product's own sounds (<two sounds: a cap click, a pour>).
Language: <spoken language>
```

- **Name the inputs by the path.** Path A: `@Image1`, `@Image2`, `@Image3` in the order of
  `image_urls`. Path C: `@Avatar1`, `@Object1`, `@Location1`. Path B: no tokens at all; say
  "the product in the start frame".
- **Say who is in frame as a positive.** "Only a pair of hands and the product are in frame",
  "the counter holds only the candle and a match box". Path C: "the phone looks down from
  @Avatar1's eyes at her hands" or "framed from the shoulders down". The server's writer is
  built for presenters and also reads the brand's avatar persona: the Format line is what keeps
  faces out, so never drop it.
- **Path B says only what moves.** One continuous take: the action, one camera move (locked, a
  slow push-in, a slight handheld drift), the voiceover. Never a cut; never describe what the
  still already shows.
- **Template.** Leave `ugc_style` at `Auto` and name the format in the Format line. Two others
  fit: `Before & after` for a visible change across a cut (a cleaned surface), and `Cinematic`
  only when the person asks for a polished film. Never the rest here. `Product ad`,
  `Talking head`, `GRWM`, `Storytime`, `Street interview`, `Podcast clip`, `Reaction` and
  `Day in the life` frame a presenter, and `Unboxing` holds its last reveal on a chest-up frame,
  which brings a face in. For a hands-only reveal, stay on `Auto` and write "a hands-only
  unboxing" in the Format line. `photo-to-video` takes no `ugc_style`.
- **Words on screen** go in later as Video Studio text, never in the brief.

## Craft

**The arc.** Four moments: **intro** (the product at home, not in use yet), **use** (the real
use, already moving), **second use** (a different action, surface or angle, never just a closer
crop of the first), **result** (what the use did, or the product from a new angle). 8 s holds two
of them, 10 to 12 s three, 15 to 16 s all four. Each shot is 3 s or more. On path B the moments
are beats of one take.

**One camera, many distances.** Every shot sits at its own distance (wide, medium, close) and
every change is a cut. At least one close shot of the mechanism (the pump, the pour, the click).
Full grammar: [shot grammar](references/shot-grammar.md).

**Show the use honestly.** Open it before it is used. One interaction per shot. What is opened
stays open. The result is the result of what the clip showed. The right body place (fragrance on
the wrist, serum on a fingertip first). Its real size against a hand. Never a result that needs
time to appear: that is a claim the frame cannot prove.

**Hands.** A first-person shot shows one working hand; two-handed actions are a propped phone
with the hands cropped at the forearm. Say what each hand does. For a series, write one hand line
("a woman's hands, short natural nails, a thin silver ring") and reuse it like the product card.

**The voice.** It starts with the first frame, on a benefit, the mechanism, a sensory detail or a
label fact. One chunk of words per shot, no repeats, a verdict at the end, no spoken call to
action. Stay in the lower half of the speech budget: the picture carries half the message.
Details: [voiceover](references/voiceover.md).

**Voice options.**

| Want | Do |
|---|---|
| A natural voice, one 8 s clip (path A) or one take (B, C) | The video's own voice, described in the brief. Nothing extra |
| One voice across a joined clip (path A at 16 or 24 s) | After the run, `change-voice` on the clip with `params.voice_id` (below) |
| The brand's own voice | Same: `change-voice` with `get_brand`'s `voice_id` |
| Exact words, or 24 s in one voice | Path D: film with `generate_audio: false`, then `add_voiceover` in Video Studio, which reads the words exactly as written (the brand's voice by default) |

`change-voice` call: `{ "tool": "change-voice", "brand_id": "<brand>", "inputs": { "video_url":
"<clip asset>" }, "params": { "voice_id": "<voice_id>" } }`. It is a paid run of its own: quote it
with the clip. Always pass `voice_id` (from `get_brand`, `get_avatar`, or `list_voices`); left
out, a stock voice is used. It suits one clear voice and no music. Prefer it to the `change_voice`
param: the param's re-voiced clip comes back as a separate run that `get_generation` does not
return, and it does nothing when the avatar has no voice of its own.

**Path D, assembling.** Make 2 or 3 clips (each with its own arc moment), then `create_video`
with `brand_id`, `title` and `add_clip` operations in order (`set_all_clips_sound` with
`sound: false` when the clips were filmed with sound), `add_voiceover`, an optional hook with
`add_text`, then `export_video`. Worked through in [examples](references/examples.md), section 6.
The editing craft lives in `creatorline-video-studio`; captions in `creatorline-captions`.

## Check before you show it

- Path B stills, before animating: `preview_assets` on each. The product matches its photo, the
  frame is upright, nobody's face is in it.
- `output[].duration_sec` matches the length you quoted.
- `preview_assets` with the output `asset_id` shows the cover frame: the product is there, one of
  it, the right shape, colour and label side; no face on paths A and B; hands look natural.
- You cannot hear the clip. Tell the person what to listen for in one line ("check the voice says
  'two pumps'"). If captions are next anyway, `captions.lines` in `get_video` is the transcript.
- The words you sent kept the claim floor and the approved claims.
- Give the take one verdict before any new spend (house rules, section 5).

## If it goes wrong

A failed run is refunded by itself. Every retry is a new paid run: say what you will change,
quote it, and wait for a yes (house rules, section 5).

| What you see | Do |
|---|---|
| "Missing required input \"characters\"" | You called the default `ugc-video` model with no avatar. Use path A's model, or path C |
| "\"duration\" must be <= 15" on `photo-to-video` | The default model films up to 15 s. Add `model: "bytedance-seedance-2-5-image-to-video"` (up to 30 s) and quote again |
| A face appears | Path C: offer to keep it as a talking video, or one more take on path A. Path A or B: one more take with the Format line first and "only a pair of hands" in it |
| The product looks different, the label is garbled | A cleaner photo with a smaller logo (product intake, section 5), a second angle in `image_urls`, or path B: there the first frame is the still itself |
| Two of the product, or a look-alike beside it | "One <product>, the only object of its shape on the counter" in the brief; take look-alike props out |
| It is used wrong (opened by the wrong part, on the wrong body place) | Write the use line as a sequence, one action per shot (shot grammar, sections 6 and 7) |
| The voice changes at the 8-second join | `change-voice` over the clip with one `voice_id` |
| The voice says something else, or mispronounces the name | Fix in the edit: Video Studio, the clip's sound off, `add_voiceover` with the exact words |
| Music under the voice | "Voice and room sound only" in the Sound line; or fix in the edit as above |
| Words or gibberish drawn in the frame | Same call again once; then add the words as Video Studio text instead |
| A link refused because it "serves a web page or document" | The slot needs the image file itself (product intake, section 1) |
| A content check stopped it | Rephrase plainly: the product's category and use, nothing explicit, no other brand |
| Not enough credits | A shorter clip, path B on its default model, or 8 s instead of 16 |

## Show the result

The card from the house rules, section 4:

```
**Glow C Serum, hands only**: 8 s, two drops onto a fingertip, pressed into the back of the hand
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Add a hook line and captions
2. Make a cover for it
3. Three variations: a new hook, a new setting, the other side of the bottle
```

Path B: show the stills first, one line and one link each, and ask which one to animate (unless
the person left it to you).

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- A hook line on screen and word-timed captions: `creatorline-captions`.
- A cover for the post: `creatorline-cover-image`.
- Variations that change one thing each (hook, setting, voice, language): `creatorline-ad-variations`.
- The same product with the avatar talking about it on camera: `creatorline-talking-video`.
- A longer cut from two or three clips under one voiceover: path D, `creatorline-video-studio`.
- Post it to the review queue with `made_with_ai` set: `creatorline-publish`.
- A product clip every week from a list of products: `creatorline-workflows`.

## References

- [Shot grammar](references/shot-grammar.md): phone shot types, hands, use mechanics, body places, scale, what breaks.
- [Shot lists](references/shot-lists.md): settings, props, shots and opening ideas for 17 product categories.
- [Voiceover](references/voiceover.md): word budget, the first second, claims, lines that work.
- [Examples](references/examples.md): complete calls and briefs for paths A, B, C and D.
- [House rules](references/house-rules.md), [asking](references/asking.md),
  [video briefs](references/video-briefs.md), [product intake](references/product-intake.md): shared by every skill.
