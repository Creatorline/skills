---
name: creatorline-try-on-video
description: "Makes try-on videos: the brand's AI avatar wears the person's clothes, shoes, bag or jewelry in a fit check, OOTD, outfit reveal or haul try-on, filmed from a styled photo or swapped into a real try-on clip. Use for 'try-on', 'fit check', 'OOTD', 'show it on my avatar'. Not for the item alone: use creatorline-product-video. Outfit photos: creatorline-photos."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Try-on videos

Put the person's garment, shoes, bag or jewelry on the brand's AI avatar in a vertical try-on
video: a fit check, an OOTD, a GRWM in a new outfit, a reveal or a haul. Two ways in: a quick
photo of the avatar in the item first, then the video; or a real try-on clip with the avatar,
dressed in the item, in the main person's place. The promise: the person sees the item on their
avatar before a video is filmed, the fit is shown honestly, and the clip comes back ready to
caption and post.

## When to use

- "Fit check", "OOTD", "try-on", "try this on", "GRWM in this dress", "outfit reveal", "haul
  try-on", "show it on my avatar", "how does it look on".
- Anything worn: tops, dresses, skirts, bottoms, outerwear, shoes, bags, jewelry, hats, glasses.
- A real try-on video (theirs, their brand's, or a trending one) re-cast with the avatar wearing
  their item.

## Not for

| The person wants | Use |
|---|---|
| The item alone: a flat lay, a hanger spin, hands only, a voiceover | creatorline-product-video |
| Packages opened and reacted to, not worn | creatorline-unboxing-video |
| The avatar talking about the item while holding it, or a GRWM chat with no outfit to show | creatorline-talking-video |
| Outfit photos only: a lookbook, a photo dump, a carousel | creatorline-photos |
| A real video kept exactly, the avatar in the video's own clothes | creatorline-character-swap |
| A trending video's idea and lines re-filmed, not its exact moves | creatorline-reshoot |
| Many versions of one try-on at once: colours, avatars, hooks | creatorline-ad-variations |
| A script or shot list only, nothing filmed | creatorline-short-script |
| Text, captions or edits on a finished try-on | creatorline-captions, creatorline-video-studio |

## What you need

| Item | Ask or default |
|---|---|
| A photo of the item | **Ask** (product-intake.md). Best: a flat lay, a hanger or a mannequin shot, front on, plain background. Next best: worn by a model, cropped below the chin. |
| Route B only: the try-on clip | **Ask**: a TikTok or Instagram link, a direct link to the video file, or a video in their library. At least 4 s, one main person. Only its first 30 s can be used. |
| Avatar | The brand's default avatar, or the one the person names. |
| Format | Fit check (table under Route A). |
| Length | 10 s; 12 s for a dress or a full outfit; 15 s with a back view and a detail. |
| Setting | A bright bedroom or hallway, window daylight, the phone propped at hip height. |
| Lines | A few short lines in the brand's voice and `language`. |
| Size, fabric, price, sizes offered | Only what the person gives. Otherwise none of it is said. |
| Frame | 9:16, `720p`. |
| Text on screen | None. Offered after. |

An item photo where a model's face shows is fine for Route B. For Route A it can pull that face
into the look, and the default video model takes AI faces only. Ask once for a flat lay or a
cropped shot; without one, film from the locked look (If it goes wrong).

A full outfit (OOTD): up to 4 item photos, top to bottom. Route B's Outfit slot holds one image:
make the look photo first and use it as the outfit.

## Pick the route

| | A. Generate (default) | B. Real clip |
|---|---|---|
| Starts from | The item photo | The item photo and a real try-on clip |
| You get | A new phone-style clip of the avatar in the item, with lines | The clip's own moves, camera, cuts and sound, with the avatar in the item |
| Tools | `photo-edit`, then `ugc-video` (or `photo-to-video`) | `character-swap`, model `character-swap-replace`, the `outfit` slot |
| Best when | No footage; a GRWM, a reveal, lines in the brand's voice | They have a clip, or found a trend whose moves they want |

Pick B when the person sends a video. Otherwise A.

## The flow

1. **Start.** If `track_skill_activation` is in your tools, call it once with
   `creatorline-try-on-video`. Orient as house-rules.md section 1 says: brand, avatar, balance.
2. **Intake.** One message, at most 3 questions (asking.md). Ask only what is missing: usually
   the item photo, the format, and "anything to say or never say about it (sizes, fabric,
   price)?". The item and the format already given: ask nothing but the price. Example:

   > Love it. Two quick things:
   > 1. The dress: a link to its photo (a flat lay or hanger shot works best), or its name if
   >    it is in your Creatorline library.
   > 2. Which video? 1) Fit check: Mia already in it, a turn, the details, her verdict
   >    (recommended) 2) Reveal: her own outfit, a cut, then the dress 3) A try-on clip you have,
   >    with Mia swapped in (send the link)
   >
   > Defaults: Mia, 12 s, 9:16, a bright bedroom, a few lines in English in your brand's voice.

3. **Bring the item in** (product-intake.md): `list_assets` with `brand_id`,
   `file_type: "image"` and `search`, then `preview_assets`; or `import_asset` with the file
   link, the `brand_id` and the item's name as `title`. Write the **wardrobe line** (Craft) and
   the **setting line** once.
4. **Check the slots once:** `list_models` with `tool: "photo-edit"`, `"ugc-video"`,
   `"photo-to-video"` or `"character-swap"`. Never guess a key or a value.
5. **Plan and price.** One or two lines of plan, then the price as its own short message.
   - Route A: write both briefs, then call the look and the video with `create_generation`
     without `confirm`. Both can be quoted now: the video takes the item photo, not the look.
     Add them up and ask one yes for both. Say the look comes first and you film only if it
     shows the item right.
   - A call whose input does not exist yet (the look photo, for a look in motion or a locked
     look): price it with `estimate_generation_cost`, same tool and params, and count it in the
     total.
   - Route B: the swap without `confirm` (Route B below), plus the re-voice if they want one.
6. **Run** on yes: the same calls with `confirm: true`, in order. A call priced by an estimate
   is called once more without `confirm` when its input exists: the same price, confirm it
   without asking again; a higher one, tell the person and ask.
7. **Wait and narrate.** `get_generation` with `wait_seconds: 20` for photos and `45` for
   videos, again until `succeeded` or `failed`. One line between calls: "Making two photos of
   Mia in the dress." "Filming the fit check now, usually a few minutes." A swap often takes
   longer.
8. **Check** (Check before you show it), **show** (Show the result), offer **next steps**.

### Route A: the look photo, then the video

**The look photo** is the cheap rehearsal: it proves the item reads on this avatar before the
video spends more. It also becomes the cover or a carousel slide, the start frame of a look in
motion, and the base of the locked look. Skip it only when the person says "just the video".

```
create_generation {
  tool: "photo-edit", brand_id, avatar_id (only when one was named),
  inputs: { other_elements: [<item asset ids, top to bottom>] },
  params: { aspect_ratio: "2:3", resolution: "2K" },
  count: 2,
  prompt: <look brief>
}
```

- The avatar's face goes into `characters` by itself (`@Avatar1`). The items go in
  `other_elements` (`@Input1`, `@Input2` in the brief).
- The default photo model keeps the face best but has no 9:16; `2:3` holds a full body. On it,
  `2K` costs the same as `1K`. Never `4K`.
- A 9:16 still (to animate it, or to post as is): `model: "gpt-image-v2-edit"` with
  `aspect_ratio: "9:16"`. It draws a little differently from the default.
- Jewelry and close pieces: `aspect_ratio: "3:4"`, chest-up (references/shot-lists.md).

Look brief. The room and light are the **setting line**, written once and reused in the video
brief, so the look, the video and a locked-look retry all match:

```
@Avatar1 wearing <wardrobe line> from @Input1. Full body, feet in frame, weight on one leg,
arms a little away from the sides so the cut shows, hands relaxed. <setting line>. Their own
face and hair. The item exactly as in @Input1, fitted as cut. Casual phone photo.
```

Then `preview_assets` with both output asset ids and judge them yourself (Check before you show
it). At least one shows the item right: keep the closer one, show both in one line with a link
to each ("Here is Mia in the dress: Look 1, Look 2. Filming now.") and go on with the video the
yes already covered. Neither does: stop before the video, say what is off, and offer one retry
(a new paid run: ask).

**The video:**

```
create_generation {
  tool: "ugc-video", brand_id, avatar_id (only when one was named),
  inputs: { objects: [<item asset ids>] },
  params: { ugc_style: <from the table>, duration: <s>, aspect_ratio: "9:16", resolution: "720p" },
  prompt: <video brief>
}
```

The avatar fills `characters` by itself (`@Avatar1`); the item is `@Object1`. There is no
try-on template, so the `Beats` and `Wardrobe` lines carry the format (video-briefs.md for the
rest of the brief):

```
Idea: fit check. @Avatar1 shows how <item name> (@Object1) fits and moves, in <setting>.
Hook: <what the first 3 s show, already moving> and "<first line>"
Beats: <one plain line per shot, from references/shot-lists.md, no seconds>
Wardrobe: @Avatar1 wears <wardrobe line> (@Object1) in every shot, fitted as cut.
Lines: "<exact words>" (only when the person gave them)
Setting: <setting line>, phone propped at hip height facing @Avatar1.
Ending: a calm verdict, full body or three-quarter.
Language: <the brand's language>
Sound: voice and room sound only.
```

| Format | What happens | `ugc_style` | Length |
|---|---|---|---|
| Fit check (default) | In the item from frame one: a turn, the fit, a detail, the back, a verdict | `Auto` | 10 to 15 s |
| GRWM | Talks while finishing small things (sleeves, a tuck, a clasp), ends on the full look | `GRWM` | 12 to 20 s |
| Reveal | Their own outfit, a cut, then wearing the item | `Before & after` | 8 to 12 s |
| Look in motion | One continuous take from a 9:16 look photo: a step, a turn, a settle | `photo-to-video` tool | 5 to 8 s |
| Haul try-on | 2 to 4 items, one short clip each, joined with item labels | per item, then Video Studio | 15 to 30 s |

- **GRWM:** the template leans toward a bathroom mirror. Keep the setting line with the propped
  phone.
- **Look in motion:** `create_generation` with `tool: "photo-to-video"`, the 9:16 look in
  `inputs.image_url`, `params.duration`, and a brief that says only what moves (video-briefs.md
  section 14). No cuts.
- **Haul:** one look and one clip per item, all with the same setting line so it reads as one
  session, then joined in Video Studio. Price the whole haul, captions and export included,
  before any of it starts (references/worked-examples.md, section 4).
- **Reveal:** the avatar's own image is the "before" outfit; the brief puts the change on the
  cut between shot 1 and shot 2.

### Route B: a real try-on clip, Replace mode

1. Get the clip in: `import_asset` with the link (a TikTok or Instagram post works), the
   `brand_id` and a `title`; or find it with `list_assets` (`file_type: "video"`). Read its
   `duration_sec`, and look at its cover with `preview_assets`.
2. Check it: one main person, full body most of the time, moves that show fit (turns, a walk),
   and clothes of a similar cut and length to the item (a dress clip for a dress). Under 4 s is
   refused. Only the first `duration` seconds are filmed.
3. Price it, then run it on yes:

```
create_generation {
  tool: "character-swap", brand_id, avatar_id (only when one was named),
  model: "character-swap-replace",
  inputs: { source_video: <clip asset id>, outfit: <item asset id> },
  params: { duration: <whole seconds of the clip, at most 30>, resolution: "720p" }
}
```

- No prompt: Replace takes no direction.
- Always set `duration`. Left out, 15 s is billed even for a shorter clip.
- The avatar replaces the main person: the avatar's face and body, the outfit photo's clothes.
  Whatever the outfit photo does not show stays as in the clip: a top alone keeps the clip's
  trousers and shoes.
- `480p` makes a cheaper first check of a risky clip; `1080p` costs much more.
- `run_video_ai` has no Outfit slot: this route goes through `create_generation`.
- Trending videos are on the app's Trends page (https://app.creatorline.io/trending, on plans
  that include it). Copy a video's link from there.

**The voice.** The clip's own sound stays, so a spoken line is still the original person's
voice, usable only with their permission (house-rules.md section 7). For one avatar, one clear
speaker and no music, offer a re-voice after the swap: `create_generation` with
`tool: "change-voice"`, the swap's output in `inputs.video_url`, and `params.voice_id` set to the
avatar's `voice_id` from `get_avatar` (always pass it: left out, a stock voice is used). Price it
with the swap: `estimate_generation_cost` with the same tool and the clip in `inputs.video_url`.
Leave the swap's own `change_voice` param out: its charge is not in the swap's quote, and its
result is a run you cannot follow. No avatar voice, or music in the clip: mute the clip in Video
Studio and add a voiceover (creatorline-voiceover).

## Craft

**The wardrobe line.** One sentence, written once from the item card (product-intake.md) and
reused word for word in the look brief, the video brief and the caption, so the item stays the
same everywhere: colour, fabric, cut, length, neckline or collar, closures by position, the one
detail it sells on said positively. "Sage green linen midi dress, square neckline, buttons down
the front, ties at the back of the waist, hits mid-calf." Say "strapless", "open back",
"seamless", never "no straps".

**The beats.** A try-on shows five things: the hook already moving, the fit read, a detail, the
back or side, a verdict. Every shot needs at least 3 s, so 10 s holds 3 shots and 15 s holds 4
or 5. Per item type: references/shot-lists.md.

**Framing.**
- A full body needs a propped phone: write where it sits ("propped on the dresser at hip
  height"). An arm's-length selfie only fits chest-up talking.
- Each shot opens on a different framing from the last: full body, then waist-up, then full body
  from the back.
- Details at waist-up or chest-up, never an extreme close-up. End no tighter than chest-up.
- Keep mirrors out of every shot: reflections are where extra arms and second bodies appear.
  Name the phone's place and a plain wall instead.

**Motion shows fit.** A step toward the phone, a weight shift, one slow turn, a walk past,
sitting on the bed edge. Movement and light sell the fabric: a knit shifts in the light with
each breath, linen creases at the elbow, satin flashes on a turn, a wide leg swings with a step.
One twirl at most, for a dress or skirt. One main action per shot.

**Hands.** Say what each hand does; one stays relaxed. A bag hangs from one hand or one
shoulder. Putting a piece on, zipping, opening a bag: only across a cut, never inside a shot.

**Hook.** Frame one is already moving (stepping back into view, mid-turn, the hem still
swinging) and the first line lands in the first second. An opinion or what the frame shows:
"This is the dress for every summer wedding." "Wide leg, high rise, and look how they move."
No greeting, no "OK so", no "you need this".

**Lines.** Opinions, what the frame shows, label facts the person gave. A shot with a move holds
about 2 words fewer than the speech budget (video-briefs.md section 7); never leave a shot
silent. The ending is a verdict; a call to action goes in the caption.

**Register.** Natural and warm by default. Hyped only when the person or the brand voice asks
for it; calm and minimal for luxury or quiet brands.

**Sound.** "Voice and room sound only" in the brief; music comes later in Video Studio.

## Fit, size and body: honest by default

- The avatar is a synthetic person with no real body or size. The video shows how the item is
  cut and moves, never how it fits a real person.
- Sizes, measurements, fabric content and prices only when the person gave them, word for word,
  in the caption or on-screen text. Never "true to size", "runs small", "fits every body" unless
  those are the brand's own words.
- No body claims: never "slimming", "flattering on everyone", "hides", "lifts", "snatched", "makes
  your legs look longer", nor any weight or shape change. Describe the cut instead.
- The item fits as cut: never ask for a slimmer, taller or idealized body, or a tighter or longer
  fit than the item photo shows.
- No history or purchase: never "I just bought", "my order came", "I've worn it all week".
- `Before & after` is an outfit change on camera, never a body change.
- Decline lingerie, underwear, sheer or intimate pieces and suggestive poses. Kidswear is never
  worn on camera (avatars are adults): offer creatorline-product-video. Swimwear only as styled
  beachwear in a relaxed pose; a content check may still stop it (refunded).
- Posts carry `made_with_ai: true`; never present the avatar as a customer (house-rules.md
  section 7).

## Check before you show it

- **Look photos:** `preview_assets` with the output ids. The colour, length, neckline,
  closures, print and hardware match the item photo; one of each piece; the face is the avatar's;
  hands look right; the full body is in frame (feet for shoes).
- **Video:** you cannot watch it. `preview_assets` shows its cover frame: check the avatar and the
  item there, and the length (`duration_sec`). Ask the person to watch the back view and the
  detail shot.
- **Words:** re-read the brief's lines against the section above before any run.

## If it goes wrong

| What went wrong | Fix |
|---|---|
| The look gets the item wrong (colour, length, details) | Sharpen the wardrobe line on the wrong detail; use a flat-lay photo; one retry (ask first) |
| A model's face from the item photo shows up | A flat lay or a photo cropped below the chin; or Route B, whose Outfit slot takes clothes only |
| The video changes or loses the item between shots | Fewer, longer shots; or the **locked look**: `include_avatar: false`, the kept look photo in `characters`, the item in `objects` (references/worked-examples.md, section 6) |
| The video run is refused or fails on the item photo | Refunded. The photo likely shows a real face: drop it from `objects` and use the locked look |
| The avatar holds the item instead of wearing it | The brief says "wears ... in every shot"; use the locked look |
| Extra hands, doubled bodies | Remove any mirror; a propped phone; one action per shot |
| Swap: pieces the outfit photo does not show are wrong | A photo of the whole outfit (or the look photo), or a clip whose other pieces suit it |
| Swap: the item fights the clip's movement | A clip in a similar cut and length |
| Swap: the best part of the clip starts after 30 s | Trim it in Video Studio and export it as a new clip (creatorline-video-studio), then use that |
| The person wants themselves, not an avatar | Their own avatar, made from their photo at https://app.creatorline.io/avatars/new. A real face needs `model: "bytedance-seedance-2-0-reference-to-video"` on `ugc-video` (one take up to 15 s) |
| Kidswear, lingerie, sheer pieces | Decline as above; offer a product-only video |

Three paid tries at the same thing and still wrong: stop and offer the best take, another route,
or another format (house-rules.md section 5).

## Show the result

Use the card from house-rules.md section 4. For a try-on:

```
**Fit check: Mia in the Sage linen dress**: 12 s, phone-style, a turn, the front buttons, the tie back, her verdict.
[Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Look photos: [Look 1](<url>) · [Look 2](<url>)
Used <N> credits. <M> left.

What next?
1. Put the dress's name and a hook line on screen, with captions
2. Make a cover from look 1
3. Post it to your review queue with a caption
```

`<N>` is every run of the request added up; `<M>` is the last `credit_balance`.

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- On-screen text (the item's name, a hook line) and word-timed captions: creatorline-captions,
  creatorline-video-studio.
- A cover from the look photo: creatorline-cover-image.
- The same video in another colour or for the next item: swap the item photo and the wardrobe
  line, keep the brief. Many versions at once: creatorline-ad-variations.
- The look photos as an outfit carousel: creatorline-photos.
- The avatar's own voice on the lines, when it has one: creatorline-voiceover.
- Post it: creatorline-publish. Caption from the wardrobe line, the size line the person gave,
  `made_with_ai: true`.

## References

- [references/shot-lists.md](references/shot-lists.md): shots, look poses and lines per item type.
- [references/worked-examples.md](references/worked-examples.md): full calls for each format and
  route, the locked look, a haul assembled in Video Studio.
- [references/house-rules.md](references/house-rules.md): session, consent, waiting, results,
  safety.
- [references/asking.md](references/asking.md): how to ask.
- [references/video-briefs.md](references/video-briefs.md): writing the brief, templates, speech
  budget.
- [references/product-intake.md](references/product-intake.md): getting the item photo in, the
  item card, claims.
