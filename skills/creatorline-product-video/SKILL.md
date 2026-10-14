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
as hands, a first-person forearm, a body cropped below the face, or a small figure far away.

The promise to the person: one product photo in, a postable clip out, in one short exchange. You
ask only what changes the result, show the words and the price before anything runs, keep them
posted while it films, and hand back a clip that is one step from captions, a cover and a post.

Run the session by [the house rules](references/house-rules.md) and ask the way
[asking](references/asking.md) says. Get the product in by [product intake](references/product-intake.md)
and write the brief by [video briefs](references/video-briefs.md). This file adds only what is
particular to product-first videos.

## When to use

The ask is casual, creator-style AND product-first (no face, no talking head):

- "A video of my product", "product only", "no face", "just hands", "faceless product ad".
- "Show how it works, hands only", "POV of using it", "a kitchen / bathroom / car shot of it".
- "Product b-roll with a voiceover", "bring my product photo to life and say why it's good".
- A hands-only reveal of the product coming out of its box, with no one reacting on camera.
- A clothing item, shoe or bag shown on its own: a flat lay, a hanger, a cropped torso smoothing it.
- A brand made for faceless content that sells a physical product.

No face alone is not enough: a polished studio commercial is the `Cinematic` look, only when the
person asks for it. A missing product photo or length is a question, never a refusal.

## Not for

| The ask | Use |
|---|---|
| The avatar on camera talking about the product | `creatorline-talking-video` |
| The avatar opening a package and reacting | `creatorline-unboxing-video` |
| The avatar wearing and showing clothes, shoes, a bag, jewelry | `creatorline-try-on-video` |
| A how-to with every step labeled on screen | `creatorline-tutorial-video` |
| An app, a website, an online store | `creatorline-app-promo-video` |
| A silent product clip, or a product photo animated with no voice | `creatorline` (a one-off generation) |
| Product photos or a carousel | `creatorline-photos` |
| Narration over pictures with no product in them | `creatorline-faceless-video` |
| Only the script or the voiceover text | `creatorline-short-script` |
| Editing a video that already exists | `creatorline-video-studio` |
| Re-filming a viral product video | `creatorline-reshoot` |
| Many versions of a product video that works | `creatorline-ad-variations` |
| Their product put into a video that already exists, the rest kept | `creatorline-ad-variations` (a video edit) |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Product photo | Yes. A real photo of the real product | None. The product is on screen the whole time, so nothing runs without one; never a stock, generated or described stand-in |
| Length | Yes, asked together with the photo: 8 s, 16 s, 24 s, or about 45 s | "Just do it": 8 s |
| How it is used | Only when the photo and page cannot tell (how it opens, where it goes) | Read from the photo, the page and the category |
| Who is in frame | No | One pair of hands, no face ([shot grammar](references/shot-grammar.md), section 12) |
| Voice | No | Off screen, made in the same pass as the picture; the default avatar's gender and tone, locked for the whole video; the brand's `language`, English in the accent of the brand's `country` (American when none) |
| Words | No | You write them ([voiceover](references/voiceover.md)) and show them word for word with the price |
| Setting | No | By category ([shot lists](references/shot-lists.md)): a real room, neutral daylight from one window |
| Claims | One optional question: "Anything you must say, or must never say?" | Written freely from the label's and the page's facts, in the avatar's own voice ([the persona and the gate](references/truth-and-safety.md)) |
| Music | No | None: the voice and the product's own sounds |
| Text on screen | No | None in the clip; offered after the result |
| Frame | Never ask | 9:16, 720p, phone style |

## Pick the path

Start on path A unless the ask points elsewhere. The paths and the model ids are for you only:
tell the person what they get ("no face, the product and a pair of hands"), never the path
letter or the model.

| The ask | Path | What runs |
|---|---|---|
| A clip with a few shots and the hands doing the demo (the default) | A. No-face clip | `ugc-video` on its no-face model, the product in `image_urls` |
| The product alone: only it, the light and the camera | A, with a brief that puts nothing else in frame | same |
| One unbroken take (a pour, a spray), or the look approved before any motion | B. Still, then motion | `photo-edit` with no avatar, then `photo-to-video` |
| Up to 30 s as one flowing take | B on the longer photo-to-video model | same, `model: "bytedance-seedance-2-5-image-to-video"` |
| The person's own avatar as the hands and body (first person, in a car), face out of frame | C. Avatar, face out of frame | `ugc-video` on its default model with the avatar |
| About 45 s, or words that must be exact | D. Assemble | clips from A, B or C, joined in Video Studio under one voiceover |

Why path A names a model: the default `ugc-video` model needs a person image in `characters`.
With `include_avatar: false` and nothing there it refuses ("Missing required input
\"characters\""). Its no-face model, `veo3-1-reference-to-video`, takes 1 to 3 plain images in
`image_urls` and never adds the avatar. Its `duration` moves in steps of 8 (8, 16, 24):
`list_models` shows the bounds but not the step, so pass a multiple of 8. Past 8 s it films
8-second takes and joins them, and the voice can change at each join (Voice options, below).
A length the person names that is not a multiple of 8 (10, 15 or 30 s): round it to 8, 16 or 24
on path A and say so in the plan, or, when the exact length matters, path C or B.
Why path B names a photo model: the default `photo-edit` model has no 9:16 frame;
`gpt-image-v2-edit` does.

If a call is refused over a slot or a value, read `list_models` with that `tool` and fix the call:
it is the live list of slots, values and bounds. Never move to another model on your own when a
model refuses the take or is unavailable: say what happened, and a different model is a new
quote and a new yes.

## The flow

1. **Activate.** When `track_skill_activation` is in your tool list, call it with
   `skill_name: "creatorline-product-video"` once per new request (house rules, section 10).
2. **Orient** (house rules, section 1). From `get_brand` keep `language`, `country`, `voice_id`,
   `default_avatar_id` and `brand_voice`. `get_avatar` on the default avatar gives `gender` and
   `tone` for the voice.
3. **The gate** ([the persona and the gate](references/truth-and-safety.md)): the brand's own
   product, what is promoted, whose hands or photo. A failure means no video: say what you can
   make instead.
4. **Read the ask.** Collect what it gives: product photo or page, length, voice language and
   accent, words they must say or never say, music, setting, the demo action. Then how detailed
   it is: 1 to 5 words is autopilot; 1 to 3 sentences of tone or flow, keep their tone and build
   the shots; 4 or more sentences or a shot list, their beats one for one in order, changing
   only an action that is unsafe or cannot be filmed. Their concrete details beat every default;
   only the gate beats them.
5. **Get the product** ([product intake](references/product-intake.md)): `list_assets` with
   `brand_id`, `file_type: "image"`, `search`, then `preview_assets` and confirm by name; or
   `import_asset` with `url`, `brand_id`, `title`. A page with no usable image: ask once for a
   photo or another link; never a stand-in. A big readable logo: warn once (product intake,
   section 5). Write the product card once, finished for video
   ([shot grammar](references/shot-grammar.md), section 1).
6. **Intake.** One message: the photo and the length together, then the defaults in one line.

   > Let's make it. Two quick things:
   > 1. The product photo: a link to the image, or its name in your Creatorline library. A photo
   >    on your phone goes into your library first: https://app.creatorline.io/assets
   > 2. Length: 1) 8 s (recommended) 2) 16 s 3) 24 s 4) about 45 s
   >
   > Defaults: hands only, no face; a woman's voice off screen in English, warm and quick, in
   > your brand's tone; a bathroom counter in daylight; phone style, 9:16. Say if you want any
   > changed.

   The photo in hand, the length given, or "just do it": ask nothing and go to the price.
7. **Build it.** Pick the path, the setting and 2 or 3 props ([shot lists](references/shot-lists.md)),
   the moments and shots (Craft, below, and [shot grammar](references/shot-grammar.md)) and the
   words ([voiceover](references/voiceover.md)). Write every brief before any price: path D's
   clips all at once. Run the brief check ([checklists](references/checklists.md), section 1).
8. **Price.** Call each paid step without `confirm` and add them up (house rules, section 2):
   - A or C: `create_generation` without `confirm` answers `needs_approval` with `credits`.
   - B: `photo-edit` without `confirm`, plus `estimate_generation_cost` with
     `tool: "photo-to-video"` and the `params` you will pass.
   - Path A at 16 or 24 s, or the brand's own voice: add `estimate_generation_cost` with
     `tool: "change-voice"` (Voice options, below), and say in the plan that it keeps one voice.
   - D: each clip, plus the Video Studio steps from `get_video_guide` `credits` (voiceover,
     export, captions if wanted).

   Then one message: what you will make, the voiceover word for word (a label number marked
   "from your label"), one line per paid step, the total, the balance, "Go ahead?". The yes
   approves the words too.
9. **Run.** On yes, check each call before `confirm: true` (path A: the model, `include_avatar:
   false`, sound left on; path D clips: `generate_audio: false`), then run them in order. A step
   whose input only exists after an earlier one (the animation of the picked still, a re-voice):
   call it once without `confirm` when its input is ready; the quoted price goes on with
   `confirm: true`, a different one is asked again. Path B: show the stills, take the person's
   pick (or pick the best yourself when they said "just do it"), then animate it.
10. **Wait and narrate.** `get_generation` with `generation_id` and `wait_seconds: 45`, again
    until `succeeded` or `failed`. One short line between calls: "Filming the counter shot and
    the pour now." A clip that is done and checked is kept: a retry re-films only the clip that
    failed.
11. **Check** (below), **show** (below), **offer next steps** (below).

### The call

Path A, no-face clip (the other paths' full calls are in [examples](references/examples.md)):

```json
{ "tool": "ugc-video", "model": "veo3-1-reference-to-video", "brand_id": "<brand>",
  "include_avatar": false,
  "inputs": { "image_urls": ["<product asset>", "<location asset, optional>"] },
  "params": { "duration": 8 },
  "prompt": "<the brief>" }
```

- Path B: the still is `photo-edit` with `model: "gpt-image-v2-edit"`, `include_avatar: false`,
  `count: 2`, the product in `inputs.other_elements`, `params.aspect_ratio: "9:16"`; the motion is
  `photo-to-video` with the picked still in `inputs.image_url` (an optional `end_image_url` sets
  the last frame; the default model films 4 to 15 s).
- Path C: `ugc-video` with no `model`, the product in `inputs.objects`, a place in
  `inputs.location`, `avatar_id` for a named avatar.
- The person's own photo already shows the product in place, upright and vertical: skip the
  still and animate their photo.

## The brief

The `prompt` is the brief our server's writer turns into the shot list (video-briefs.md). Plain
sentences, English, this order, about 80 to 200 words:

```
Format: a casual iPhone video of <product>, hands only: only the product and a pair of hands
are in frame, real texture, nothing retouched. A <woman's / man's> voice speaks off screen
with <an American> accent, <tone>.
Idea: <one sentence: what happens, start to end>
Product: exactly one <product> in frame. <the card>. Use: <the use line>. @Image1 is the product.
Setting: <place, surface, neutral daylight from one window, 2-3 props>. @Image2 is this place.
Shots: 1 <distance and phone position>: <the moment, in motion, with 2-3 physical details>. 2 ...
Voiceover, word for word: "<the lines>"
Ending: <the result, or the product set down from a new angle, label to the camera>
Sound: voice and room sound only, with the product's own sounds (<two: a cap click, a pour>).
Language: <spoken language>
```

- **Name the inputs by the path.** Path A: `@Image1` to `@Image3` in the order of `image_urls`.
  Path C: `@Avatar1`, `@Object1`, `@Location1`. Path B: no tokens; "the product in the start
  frame".
- **Who is in frame, as a positive**: "only a pair of hands and the product are in frame", "the
  counter holds only the candle and a match box". Path C: "seen from @Avatar1's own eyes, looking
  down at her hands" or "framed from the shoulders down". The writer is built for presenters and
  reads the brand's avatar persona: the Format line keeps faces out, so never drop it.
- **Shots are motion, not captions.** A line that could caption a still photo gets rewritten as
  what moves. Name each shot's distance (wide, medium, close, tight close-up) and phone position
  (propped, first person); a first-person shot never mentions the phone, a mirror, a reflection
  or a screen; a propped shot never says handheld, shake, drift or sway.
- **Path B says only what moves.** One continuous take: the action, one camera move (locked, a
  slow push-in, a slight handheld drift), the voiceover. Never a cut; never what the still shows.
- **Template.** Leave `ugc_style` at `Auto` and name the format in the Format line. Two others
  fit: `Before & after` for a visible change across a cut (a cleaned surface), and `Cinematic`
  only when the person asks for a polished film. The rest frame a presenter (and `Unboxing`
  ends on a chest-up frame), which brings a face in. `photo-to-video` takes no `ugc_style`.
- **Music** only when asked: one line, "a soft instrumental bed, low under the voice, no
  singing", and never when `change-voice` will run (then it goes on in Video Studio).
- **Words on screen** go in later as Video Studio text, never in the brief.

## Craft

**The four moments.** **Intro**: the product at home in its place, not in use yet; nobody, or a
hand at the edge of the frame. **Use**: the product doing its job, first angle. **Second use**: a
visibly different action, target, surface or setting, never a closer crop of the first
([shot lists](references/shot-lists.md), section 21). **Result**: what the uses did, or the
product from an angle, scale or surface the intro did not have; never the intro's picture again.
The uses get the most time:

| Length | Seconds (intro / use / second use / result) | Shots (each 3 s or more, two moments at most per shot) |
|---|---|---|
| 4 s | 1 / 1.5 / 1 / 0.5 | 1: the use into the result (paths B, C) |
| 6 s | 1 / 2 / 1.5 / 1.5 | 2: intro into use; second use into result (paths B, C) |
| 8 s | 1.5 / 2.5 / 2 / 2 | 2 of 4 s: intro into use; second use into result |
| 10 s | 2 / 3 / 2.5 / 2.5 | 2 of 5 s, paired the same way (paths B, C) |
| 12 s | 2 / 3.5 / 3 / 3.5 | 3: intro into use; second use; result (paths B, C) |
| 15 s | 2.5 / 4.5 / 4 / 4 | 3: intro into use; second use; result (paths B, C) |
| 16 s and longer | 8 s per take or clip | Only the first take has the intro. Each later one opens where the last ended, adds new uses and angles that never repeat an earlier one, and never re-introduces; the last ends on the result |

On path B the moments are beats of one take with no cut. A shot that holds two moments keeps one
distance: a change of distance or phone position happens only on a cut.

**One camera, many distances.** The default order: propped wide, propped medium, a close detail
or first person, propped wide or medium. Every shot at its own distance, named in the brief;
with three shots or more at least one close, one medium and one wide. At least one close shot of
the mechanism (the pump, the pour, the click). Full grammar:
[shot grammar](references/shot-grammar.md).

**Show the use honestly.** Open it before it is used. One interaction and at most one change of
state per shot. A cap that comes off is gone; what is opened stays open. The result is the result
of what the clip showed. The right place on the body or surface. Its real size against a hand,
in centimetres. Never a result that needs time to appear in the frame: the picture shows now.

**Hands and people.** A first-person shot shows one working hand; two-handed actions are a
propped phone with the hands cropped at the forearm. Say what each hand does and park the other.
A person is never the subject: an adult's hands or cropped body, matched to the voice's gender,
the mouth closed whenever any of the face shows, no mirror anywhere.

**The voice.** It starts within 0.4 s of the first frame, on a benefit, the mechanism, a sensory
detail or a label fact. One phrase per moment, no repeats, a verdict at the end, no spoken call
to action. Up to 10 s: 12-20 words; 11-12 s: 20-28; 13-15 s: 28-35; longer: that band per take.
Details: [voiceover](references/voiceover.md).

**Voice options.**

| Want | Do |
|---|---|
| A natural voice, one 8 s clip (path A) or one take (B, C) | The video's own voice, described in the Format line. Nothing extra |
| One voice across a joined clip (path A at 16 or 24 s) | After the run, `change-voice` on the clip with `params.voice_id` |
| The brand's own voice | Same: `change-voice` with `get_brand`'s `voice_id` |
| Exact words, or about 45 s in one voice | Path D: film with `generate_audio: false`, then `add_voiceover` in Video Studio, which reads the words exactly as written |

`change-voice` is a paid run of its own: quote it with the clip, always with `params.voice_id`
(from `get_brand`, `get_avatar`, or `list_voices`), on one clear voice with no music. Prefer it to
the `change_voice` param, whose re-voiced clip comes back as a separate run `get_generation` does
not return. The call and path D's assembly are worked through in
[examples](references/examples.md), sections 5 and 6. Editing craft: `creatorline-video-studio`.

## Check before you show it

- Path B stills, before animating: `preview_assets` on each. The product matches its photo, the
  frame is upright, nobody's face is in it.
- `output[].duration_sec` matches the length you quoted.
- `preview_assets` with the output `asset_id` shows the cover frame: check it against
  [checklists](references/checklists.md), section 2 (one product and no clone, two hands at most,
  scale, cap and prop states, missing features still missing, the label not garbled or
  mirrored, no text drawn in, no face on paths A and B).
- You cannot hear the clip. Tell the person what to listen for in one line ("check the voice says
  'two pumps'"). If captions come next, compare `captions.lines` in `get_video` with your script.
- Give the take one verdict before any new spend (house rules, section 5).

## If it goes wrong

A failed run is refunded by itself. Every retry is a new paid run: say what you will change,
quote it, and wait for a yes (house rules, section 5).

| What you see | Do |
|---|---|
| "Missing required input \"characters\"" | You called the default `ugc-video` model with no avatar. Use path A's model, or path C |
| "\"duration\" must be <= 15" on `photo-to-video` | The default model films up to 15 s. Add `model: "bytedance-seedance-2-5-image-to-video"` (up to 30 s) and quote again |
| A face appears, or a mouth moves with the voice | Path C: offer to keep it as a talking video, or one more take on path A. Path A or B: the Format line first, "only a pair of hands", the crop below the face, the mouth closed |
| The product looks different, the label is garbled | A cleaner photo with a smaller logo (product intake, section 5), a second angle in `image_urls`, or path B: there the first frame is the still itself |
| The product turns and shows a side its photo lacks | Add that side's photo, or keep the product still and move the camera only on a cut |
| Two of the product, or a look-alike beside it | "Exactly one <product> in frame" in the brief; take look-alike props out |
| A cord, a button or a screen it does not have | The "Has only" line, written as what is there, in the card and in the shot |
| A third hand, an arm from nowhere | One job per hand; the product rests on the surface |
| It is used wrong (opened by the wrong part, on the wrong body place) | Write the use as a sequence, one action per shot (shot grammar, sections 7 to 10) |
| Shots melt into one, no cut | Neighbouring shots at different distances and phone positions |
| Golden, orange or moody light | "Neutral daylight from one window"; none of the words in shot grammar, section 2 |
| The voice changes at the 8-second join | `change-voice` over the clip with one `voice_id` |
| The voice starts late, says something else, or mispronounces the name | Fix in the edit: Video Studio, the clip's sound off, `add_voiceover` with the exact words |
| Music under the voice | "Voice and room sound only" in the Sound line; or fix in the edit as above |
| Words or gibberish drawn in the frame | Same call again once; then add the words as Video Studio text instead |
| A link refused because it "serves a web page or document" | The slot needs the image file itself (product intake, section 1) |
| A content check stopped it | Rephrase plainly: the product's category and use, nothing explicit, no other brand. Never a different model without a new yes |
| Not enough credits | A shorter clip, path B on its default model, or 8 s instead of 16 |

## Show the result

The card from the house rules, section 4:

```
**Glow C Serum, hands only**: 8 s, two drops onto a fingertip, pressed into the back of the hand
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Text on it: word captions, a hook line, both, or none
2. A post package: caption, hashtags, a comment to pin
3. Three variations: a new hook, a new setting, the other side of the bottle
```

- Path B: show the stills first, one line and one link each, and ask which one to animate
  (unless the person left it to you).
- Nothing about models, takes or paths: one clip, its length, its links.
- Captions or a hook asked for up front were in the plan and its price: do not ask again.
- With captions, both links: the captioned version and the clean clip, which stays in the
  library.

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- Text on it (word captions, the hook line, both): `creatorline-captions`.
- A post package in chat ([checklists](references/checklists.md), section 3), then the post in
  the review queue with `made_with_ai` set: `creatorline-publish`.
- A cover for the post: `creatorline-cover-image`.
- Variations that change one thing each (hook, setting, voice, language): `creatorline-ad-variations`.
- The same product with the avatar talking about it on camera: `creatorline-talking-video`.
- A longer cut from several clips under one voiceover: path D, `creatorline-video-studio`.
- A product clip every week from a list of products: `creatorline-workflows`.

## References

- [Shot grammar](references/shot-grammar.md): the video card, the phone camera, distances and
  cuts, hands and grips, safe actions, use sequences, body places, scale, keeping the product the
  same, what breaks a shot, sound, people in frame.
- [Shot lists](references/shot-lists.md): settings, props, shots and openings for 20 product
  categories, and pairs of first and second uses.
- [Voiceover](references/voiceover.md): word bands, the first second, the persona's voice and
  claims, lines that work.
- [The persona and the gate](references/truth-and-safety.md): the gate, claims, the persona's
  voice, people in frame, disclosure.
- [Checklists](references/checklists.md): the brief check, the cover check, the post package.
- [Examples](references/examples.md): complete calls and briefs for paths A, B, C and D.
- [House rules](references/house-rules.md), [asking](references/asking.md),
  [video briefs](references/video-briefs.md), [product intake](references/product-intake.md):
  shared by every skill.
