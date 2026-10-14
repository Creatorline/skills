---
name: creatorline-try-on-video
description: "Makes try-on videos: the brand's AI avatar wears the person's clothes, shoes, bag or jewelry: a before shot, the reveal with a twirl, the details. Fit checks, OOTDs, haul try-ons, or a real try-on clip with the avatar swapped in. A missing item photo is asked for, not refused. Not for a script only, the item alone (creatorline-product-video) or photos (creatorline-photos)."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Try-on videos

Put the person's garment, shoes, bag or jewelry on the brand's AI avatar in a vertical try-on
video: the avatar in a plain home outfit with a shopping bag, a cut, then the item worn with a
twirl, the fabric up close, the back, and a styled pose in another room. Three ways in: a photo of
the avatar in the item first, then the video (the default); a real try-on clip with the avatar,
dressed in the item, in the main person's place; or a still for every shot, then the video. The
promise: the item looks like itself in every shot, its cut and drape show as they are, and the
clip comes back ready to caption and post.

## When to use

- "Fit check", "OOTD", "try-on", "try this on", "GRWM in this dress", "outfit reveal", "haul
  try-on", "show it on my avatar", "a video of my avatar wearing it".
- Anything worn: tops, dresses, skirts, bottoms, outerwear, shoes, bags, jewelry, hats, glasses.
- A real try-on video (theirs, their brand's, or a trending one) re-cast with the avatar wearing
  their item.

A missing item photo, length or avatar is something to ask for, never a reason to decline.

## Not for

| The person wants | Use |
|---|---|
| The item alone: a flat lay, a hanger spin, hands only, a voiceover | creatorline-product-video |
| Packages opened and reacted to, not worn | creatorline-unboxing-video |
| The avatar talking about the item while holding it, with no try-on | creatorline-talking-video |
| How to wear or style it, step by step | creatorline-tutorial-video |
| Outfit photos only: a lookbook, a photo dump, a carousel | creatorline-photos |
| A real video kept exactly, the avatar in the video's own clothes | creatorline-character-swap |
| A trending video's idea and lines re-filmed, not its exact moves | creatorline-reshoot |
| Many versions of one try-on at once: colours, avatars, hooks | creatorline-ad-variations |
| A script, outline, shot list or styling advice, even one that says OOTD or try-on | creatorline-short-script |
| Text, captions or edits on footage they already have | creatorline-captions, creatorline-video-studio |

## The gate

Before any question or run, check all four. Decline plainly what fails; never quietly turn a
declined request into a different outfit.

1. **An adult on camera.** `get_avatar` gives the avatar's `age`: a try-on uses an avatar of 21
   or older. Younger, or no age and it reads young: ask the person to pick another avatar. A real
   person's own face only through their own avatar, made with their consent; never a public
   figure; never a supplied person's voice.
2. **General-audience fashion.** Decline lingerie, underwear, intimate apparel, fetish wear,
   sheer or see-through pieces, sexualized styling or poses, nudity, and any focus on intimate
   anatomy. Swimwear only as styled beachwear in a relaxed pose; a content check may still stop
   it (refunded). Kidswear is never worn on camera: offer creatorline-product-video.
3. **Allowed promotion.** Decline anything on the Never promoted list (house-rules.md,
   section 7).
4. **No impersonation.** The avatar speaks in its own voice
   ([The persona: fit and voice](#the-persona-fit-and-voice)). It never claims to be a real,
   named person or speaks as a real brand's official account (house-rules.md, section 7).

## What you need

| Item | Ask or default |
|---|---|
| A photo of the item | **Ask** (product-intake.md). Best: a flat lay, a hanger or a mannequin shot, front on, plain background. Next best: worn by a model, cropped below the chin. |
| Length | **Ask** unless given: 10, 15 (recommended), 30 or 45 s. |
| Route B only: the try-on clip | **Ask**: a TikTok or Instagram link, a direct link to the video file, or a video in their library. At least 4 s, one main person; only its first 30 s are used. |
| Avatar | The brand's default avatar, or the one the person names (the gate's age check). |
| Accent, a habit or mannerism | Only when the person hints at it (says where the avatar is from, mentions a quirk). Never invented. |
| Fabric, price, sizes offered | From the person, the label or the page (a price nobody gave is left out). |
| Register | From their words only; natural by default (references/performance.md, section 1). |
| Setting | The home the avatar's own image shows, else a bright bedroom; neutral window daylight. |
| Language | The brand's `language`; English lines in an American accent unless the brand's `country` or the person says otherwise. |
| Music, text on screen | None. The text question is asked once, at the end. |
| Model, aspect, resolution, number of shots, transitions, voice | Never asked: 9:16, `720p`. |

An item photo where a model's face shows is fine for Route B. For Route A it can pull that face
into the look, and the default video model takes AI faces only: ask once for a flat lay or a
cropped shot; without one, film from the locked look (If it goes wrong). A full outfit (OOTD): up
to 4 item photos, top to bottom; Route B's Outfit slot holds one image, so make the look photo
first and use it as the outfit.

## Pick the route

| | A. Generate (default) | B. Real clip | C. Frame first |
|---|---|---|---|
| Starts from | The item photo | The item photo and a real try-on clip | The item photo |
| You get | A new phone-style video on the try-on arc, with lines | The clip's own moves, camera, cuts and sound, the avatar in the item | The try-on arc, every shot drawn and checked as a still first |
| Tools | `photo-edit`, then `ugc-video` | `character-swap`, model `character-swap-replace`, the `outfit` slot | `photo-edit` per shot, then `ugc-video` with `Keyframes` |
| Best when | No footage | They sent a clip, or found a trend whose moves they want | A shot-by-shot plan to follow exactly, or Route A lost the item twice |

Pick B when the person sends a video, C when they hand you a shot list or A failed twice the
same way, A otherwise. C: references/frame-first.md.

## The flow

1. **Start.** If `track_skill_activation` is in your tools, call it once with
   `creatorline-try-on-video`. Orient as house-rules.md section 1 says: brand (with `language`,
   `country`, `brand_voice`), avatar (`get_avatar`: `age`, `voice_id`), balance. Run the gate.
2. **Read the ask once.** Note what is given: item, length, avatar, room, mood words, accent,
   claims, lines, text wishes. Then the detail level (asking.md, section 4): a few words is
   autopilot; a few sentences of tone, keep their tone and build the shots; a shot list, map it
   one to one, in their order, changing only what is unsafe, and keeping the house laws (the
   change only on a cut, the bag only in the first shot, no mirrors). Say what you changed.
3. **Intake.** One message, at most 3 questions (asking.md), only what is missing: usually the
   item photo, the length, and "anything to say or never say about it (sizes, fabric, price)?".
   Everything given: ask nothing but the price. Example:

   > Love it. Two quick things:
   > 1. The dress: a link to its photo (a flat lay or hanger shot works best), or its name if
   >    it is in your Creatorline library.
   > 2. Length: 1) 15 s, bag, reveal with a twirl, the details, a pose (recommended) 2) 10 s, a
   >    quick reveal 3) 30 s, plus a tour of the house 4) 45 s, plus a walk outside
   >
   > Defaults: Mia, 9:16, at home in daylight, a few lines in English in your brand's voice.

4. **Bring the item in** (product-intake.md): `list_assets` with `brand_id`,
   `file_type: "image"` and `search`, then `preview_assets`; or `import_asset` with the file
   link, the `brand_id` and the item's name as `title`. Write the **wardrobe line** (Craft) and
   the **setting line** once.
5. **Check the slots once:** `list_models` with `tool: "photo-edit"`, `"ugc-video"`,
   `"photo-to-video"` or `"character-swap"`. Never guess a key or a value.
6. **Write every brief first** (the look, the video, each section or take), then run them
   against [Check before you quote](#check-before-you-quote).
7. **Plan and price.** One or two lines of plan, then the price as its own short message.
   - Route A: the look and the video with `create_generation` without `confirm`. Both can be
     quoted now: the video takes the item photo, not the look. One yes for the total. Say the
     look comes first and you film only if it shows the item right.
   - A call whose input does not exist yet (a look in motion, the locked look, Route C's later
     frames): `estimate_generation_cost`, same tool and params, counted in the total.
   - Route B: the swap without `confirm`, plus the re-voice if they want one.
8. **Run** on yes: the same calls with `confirm: true`, in order. A call priced by an estimate
   is called once more without `confirm` when its input exists: the same price is covered
   by the yes, so confirm it; a higher one, tell the person and ask.
9. **Wait and narrate.** `get_generation` with `wait_seconds: 20` for photos and `45` for
   videos, until `succeeded` or `failed`. One line between calls: "Making two photos of Mia in
   the dress." "Filming the try-on now, usually a few minutes." A swap often takes longer.
10. **Check, show, ask** the text question, offer next steps.

### Route A: the look photo, then the video

**The look photo** is the cheap rehearsal: it proves the item reads on this avatar before the
video spends more. It also becomes the cover, a carousel slide, the start of a look in motion,
the base of the locked look, or Route C's Wearing frame. Skip it only on "just the video".

```
create_generation {
  tool: "photo-edit", brand_id, avatar_id (only when one was named),
  inputs: { other_elements: [<item asset ids, top to bottom>] },
  params: { aspect_ratio: "2:3", resolution: "2K" },
  count: 2,
  prompt: "@Avatar1 wearing <wardrobe line> from @Input1. Full body, feet in frame, weight on one leg, arms a little away from the sides so the cut shows, hands relaxed. <setting line>. Their own face and hair. The item exactly as in @Input1, fitted as cut. Casual phone photo."
}
```

- The default photo model keeps the face best but has no 9:16; `2:3` holds a full body, and
  `2K` costs the same as `1K` on it. Never `4K`. A 9:16 still: `model: "gpt-image-v2-edit"` with
  `aspect_ratio: "9:16"`. Jewelry: `3:4`, chest-up (references/shot-lists.md).
- `preview_assets` on both outputs. At least one shows the item right: keep the closer one, show
  both in one line with a link each, and film. Neither: stop before the video, say what is off,
  offer one retry (a new paid run: ask).

**The video:**

```
create_generation {
  tool: "ugc-video", brand_id, avatar_id (only when one was named),
  inputs: { objects: [<item asset ids>] },
  params: { ugc_style: <from the table>, duration: <s>, aspect_ratio: "9:16", resolution: "720p" },
  prompt: <video brief>
}
```

There is no try-on template: the `Beats` and `Wardrobe` lines carry the format.

```
Idea: a try-on. @Avatar1 shows how <item name> (@Object1) fits and moves, at home.
Register: <natural | hyped | calm> (<the words that set it>).
Hook: <the Before shot, already moving> and "<first line; its first word is hook content>".
Beats: 1) Before: <phone in hand, waist-up, the plain tee and lounge pants, the closed kraft bag by one handle>. 2) On the cut, the longest shot: <propped, full body in @Object1, one twirl, the bag gone>. 3) The shortest shot: <in hand, close, hands-free, one passive cue; her voice goes on over it>. 4) <propped, the turn>. 5) <another room, the styled pose, ending mid-phrase>.
Wardrobe: from shot 2 on, @Avatar1 wears <wardrobe line> (@Object1), fitted as cut, the same in every shot.
Hands: <each hand's job where it matters; the idle hand parked>.
Setting: <setting line>, a plain wall behind her; <where the phone is propped>.
Lines: "<line>" / "<line>" (within the word band; the wordiest on the detail shot)
Language: <language, accent>.
Sound: voice and room sound only: <every sound to be heard>.
<the item's absent feature said positively, once more>
```

| Format | What happens | `ugc_style` | Length |
|---|---|---|---|
| Try-on (default) | The arc: Before, the reveal with a twirl, the details, the turn, the style pose | `Auto` (`Before & after` at 10 s and under) | 10 to 15 s |
| Long try-on | The arc, then later sections: a house tour, outside in light rain, a seated verdict | `Auto` | 30 or 45 s (references/try-on-arc.md, section 3) |
| Already wearing | No Before shot: the person asks to skip the reveal, or the locked look | `Auto` | 10 to 15 s |
| GRWM | Talks while finishing small things (sleeves, a tuck, a clasp), ends on the full look; calm register | `GRWM` | 12 to 20 s |
| Look in motion | One continuous take from a 9:16 look photo: a step, a turn, a settle | `photo-to-video` tool | 5 to 8 s |
| Haul try-on | 2 to 4 items, one short clip each, joined with item labels | per item, then Video Studio | 15 to 30 s |

- **GRWM:** the template leans toward a bathroom mirror. Keep the propped phone and a plain wall.
- **Look in motion:** `tool: "photo-to-video"`, the 9:16 look in `inputs.image_url`,
  `params.duration`, and a brief that says only what moves (video-briefs.md section 14). No cuts.
- **Long and haul:** over 30 s, one take per section; a haul, one look and one clip per item.
  Both are joined in Video Studio and priced whole, captions and export included, before any of
  it starts (references/worked-examples.md, section 4).

### Route B: a real try-on clip, Replace mode

1. Get the clip in: `import_asset` with the link (a TikTok or Instagram post works), the
   `brand_id` and a `title`; or `list_assets` (`file_type: "video"`). Read its `duration_sec`;
   look at its cover with `preview_assets`.
2. Check it: one main person, full body most of the time, moves that show fit (turns, a walk),
   clothes of a similar cut and length to the item, and no mirror shots. Under 4 s is refused.
3. Price it, then run it on yes:

```
create_generation {
  tool: "character-swap", brand_id, avatar_id (only when one was named),
  model: "character-swap-replace",
  inputs: { source_video: <clip asset id>, outfit: <item asset id> },
  params: { duration: <whole seconds of the clip, at most 30>, resolution: "720p" }
}
```

- No prompt: Replace takes no direction. Always set `duration`: left out, 15 s is billed even
  for a shorter clip. `480p` is a cheaper first check of a risky clip.
- The avatar replaces the main person: the avatar's face and body, the outfit photo's clothes.
  What the outfit photo does not show stays as in the clip.
- `run_video_ai` has no Outfit slot: this route goes through `create_generation`. Trending
  videos are on the app's Trends page (https://app.creatorline.io/trending, on plans that
  include it).
- **The voice.** The clip's sound stays, so a spoken line is still the original person's voice,
  usable only with their permission. For one avatar, one clear speaker and no music, offer a
  re-voice after the swap: `tool: "change-voice"`, the swap's output in `inputs.video_url`,
  `params.voice_id` set to the avatar's `voice_id` (always pass it). Price it with the swap
  (`estimate_generation_cost`). Leave the swap's own `change_voice` param out. No avatar voice,
  or music: mute the clip in Video Studio and add a voiceover (creatorline-voiceover).

## Craft

The details live in references/try-on-arc.md (the arc, camera, hands, the item's lock) and
references/performance.md (reaction, lines, voice). The core:

**The arc.** Before (plain tee and lounge pants, the closed kraft bag, the item unseen), the cut,
Wearing (full body, the one real peak, one twirl), front pose, texture close, turn, second
detail, style pose in another room, final look. Every shot is at least 3 s, so fold it: 10 s
holds Before / Wearing / Final look; 15 s holds Before / Wearing / Texture close / Turn / Style
pose. The reveal and the style pose hold longest, the detail shortest.

**The wardrobe line.** One sentence, written once from the item card and reused word for word in
the look, every video brief and the caption: category, colour, print, fabric, cut, length,
neckline or collar, closures by position (named once, the same phrase every time), the one
detail it sells on, and what it lacks said positively. "Sage green linen midi dress, square
neckline, buttons down the front, ties at the back of the waist, hits mid-calf." Say
"strapless", "open back", "seamless", never "no straps".

**The laws.**

1. The change happens on the cut after the Before shot: never dressing, zipping, opening the
   bag or lifting the item out on camera. The bag and the Before outfit never return.
2. Neighbouring shots differ in where the phone is, in distance and in action.
3. No mirrors or reflections of any kind; no mirror selfie; the phone never in frame.
4. Two hands, one job each, the idle one parked; in a selfie one hand is the phone.
5. Details are hands-free: the fabric shows through how it hangs, the light and the breath.
6. The item is identical in every shot, fitted as cut; nothing that looks like it nearby.
7. One twirl, on the Wearing beat of the first section; the words pause while the back is turned.
8. On-camera shots lip-sync; the detail shot carries voice-over and the wordiest line.
9. Every shot starts mid-motion; the first word or sound within 0.4 s.
10. One peak at the reveal in the natural register, as a body event, never a mood word.
11. Neutral daylight, never golden hour; no camera move unless asked.
12. No call to action in the lines; the end loops (mid-phrase, or back to the first framing).

## The persona: fit and voice

The avatar speaks in its own voice, and the item is shown on its body. Use both:

- **How it sits on the body** is a strong line when the shot shows it: "it hits right at
  mid-calf", "the waist sits right where it should". The video shows how the item is cut and
  moves.
- **A reason it matters now is the proven opening:** an occasion ("for a summer wedding"), a gap
  it fills, or plain anticipation ("It's here. Trying it on.").
- **How it looks on her is her opinion** ("these make my legs look a mile long"). A vague line
  ("flattering on everyone") is weak because it is vague: say what it does, on one place on the
  body, and describe the cut in the wardrobe line so the render shows it.
- **The item's facts** (sizes offered, fabric content, price) come from the person, the label
  or the page; a number that must read exactly goes in the caption or on-screen text.
- `Before & after` is an outfit change on camera, never a body change: one take cannot show
  weeks passing.
- Posts carry `made_with_ai: true` (house-rules.md, section 7).

## Check before you quote

Read every brief against this list:

- The Before shot first, with the bag closed and the item unseen; the item worn from the cut on;
  the bag and the Before outfit never after shot 1.
- No dressing, zipping or bag-opening described; no mirror, glass, puddle or phone in frame; no
  "mirror selfie" or "holding the phone up"; no handheld, shake, drift or sway in a propped shot.
- Neighbouring shots differ in phone, distance and action; every shot mid-motion.
- The detail shot hands-free with one passive cue, carrying voice-over; the twirl only once.
- The wardrobe line identical everywhere; absences said positively twice; closures by position.
- Each hand's job named where it matters; no three jobs at once.
- Lines inside the word band; no banned first word, AI-sounding phrase or call to action
  (references/performance.md, sections 7 and 8). A line pointing at something to see has a shot
  that shows it.
- No age words (girl, boy, kid, young, teen); the avatar's face never described.
- Register, Accent and Setting lines identical in every section and take; the end loops.

## Check before you show it

- **Look photos:** `preview_assets` with the output ids. The colour, length, neckline,
  closures, print and hardware match the item photo; one of each piece; the face is the avatar's;
  hands look right; the full body is in frame (feet for shoes).
- **Video:** `duration_sec` close to the length; `preview_assets` on its cover: the avatar and the
  item. When it goes into Video Studio anyway, `preview_video` at the middle of each shot and two
  moments mid-sentence shows more, unless its `note` says clips were shown by their cover.
- Then name the checkpoints for the person in one line: the item the same in every shot; the
  bag only in the first shot; no mirror; at most two hands; the detail shot hands-free; the face
  and hair steady; the lips clean on the words.

## If it goes wrong

| What went wrong | Fix |
|---|---|
| The look gets the item wrong (colour, length, details) | Sharpen the wardrobe line on the wrong detail; use a flat-lay photo; one retry (ask first) |
| A model's face from the item photo shows up | A flat lay or a photo cropped below the chin; or Route B, whose Outfit slot takes clothes only |
| The video changes or loses the item between shots | Fewer, longer shots; or the **locked look**: `include_avatar: false`, the kept look photo in `characters`, the item in `objects`, the already-wearing beats (references/worked-examples.md, section 6); twice the same: Route C |
| The outfit change happens on camera, or the bag stays | "On the cut" in shot 2, the bag named only in shot 1 |
| The video run is refused or fails on the item photo | Refunded. The photo likely shows a real face: drop it from `objects` and use the locked look |
| Failed twice the same way on the same inputs | Never send them a third time: change the photo or the wording, or offer another of the brand's avatars; never switch avatar or model without asking |
| The avatar holds the item instead of wearing it | "From shot 2 on, @Avatar1 wears ..."; use the locked look |
| Extra hands, doubled bodies | Remove any mirror, window or glossy surface; a propped phone; one job per hand |
| Swap: pieces the outfit photo does not show are wrong | A photo of the whole outfit (or the look photo), or a clip whose other pieces suit it |
| Swap: the item fights the clip's movement | A clip in a similar cut and length |
| Swap: the best part of the clip starts after 30 s | Trim it in Video Studio and export it as a new clip (creatorline-video-studio), then use that |
| The person wants themselves, not an avatar | Their own avatar, made from their photo at https://app.creatorline.io/avatars/new. A real face needs `model: "bytedance-seedance-2-0-reference-to-video"` on `ugc-video` (one take up to 15 s) |

Re-run only the shot, section or take that failed. Three paid tries at the same thing and still
wrong: stop and offer the best take, another route, or another format (house-rules.md section 5).

## Show the result

```
**Try-on: Mia in the Sage linen dress**: 15 s, phone-style, the bag, a twirl in the dress, the linen up close, the tie at the back, a pose on the window seat.
[Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Look photos: [Look 1](<url>) · [Look 2](<url>)
Used <N> credits. <M> left.

Text on the video? 1) Captions 2) A hook headline 3) Both 4) No text (as it is now)
```

`<N>` is every run of the request added up; `<M>` is the last `credit_balance`. Ask the text
question once, at the end, if it was not answered already; captions, a hook or both go through
creatorline-captions (price first), and the clean video stays beside the captioned one. Then two
or three next steps, one line each.

## Next steps to offer

- Post it: creatorline-publish. A caption from the wardrobe line and the size line the person
  gave, 3 to 5 hashtags, a line for them to pin as the first comment, a note on how it loops,
  `made_with_ai: true`.
- A cover from the look photo: creatorline-cover-image.
- The same video in another colour or for the next item: swap the item photo and the wardrobe
  line, keep the brief. Many versions at once: creatorline-ad-variations.
- The look photos as an outfit carousel: creatorline-photos.
- The avatar's own voice on the lines, when it has one: creatorline-voiceover.

## References

Read a reference when you reach its step; use only this skill's own references.

- [references/try-on-arc.md](references/try-on-arc.md): the eight beats, fitting them into shots,
  later sections, the change on the cut, camera, hands, keeping the item the same, voice-over on
  details, light, endings.
- [references/performance.md](references/performance.md): register, expressions, peaks, small
  human moments, the hook, the lines, banned words, delivery, accent.
- [references/shot-lists.md](references/shot-lists.md): shots, passive cues, look poses and lines
  per item type.
- [references/worked-examples.md](references/worked-examples.md): full calls for each format and
  route, the locked look, a haul assembled in Video Studio.
- [references/frame-first.md](references/frame-first.md): Route C, a still for every shot, then
  the video.
- [references/house-rules.md](references/house-rules.md): session, consent, waiting, results,
  safety.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): writing the brief, templates, speech
  budget.
- [references/product-intake.md](references/product-intake.md): getting the item photo in, the
  item card, claims.
