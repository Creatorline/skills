---
name: creatorline-photos
description: "Makes photos of the brand's AI avatar and its products, and photo carousels: photoshoots, photo dumps, lifestyle, product in hand, outfits, packshots, pins, banners, ad images and restyles, in one look. Use for 'photoshoot', 'product photos', 'carousel'. Not for one plain photo: use creatorline. A cover with big words: creatorline-cover-image."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Photos and carousels

Make still photos with the brand's AI avatar that read like a real phone took them: a
photoshoot, a photo dump from a day out, lifestyle moments, the person's product in the
avatar's hand, an outfit, a mirror selfie, behind the scenes. Make product and scene photos with
no one in them. Plan 2 to 10 of them as one set and, when the person wants, post them as one
carousel. The promise: the same face in every frame, the product as it really is, one look
across the set, a price before anything is made, and nothing public without the person's yes.

## When to use

- "Photoshoot", "photo dump", "a few photos of Mia", "content for my feed", "a carousel".
- The person's product with the avatar: in hand, on a table beside them, in use.
- Outfit photos: an OOTD still, a mirror selfie, a lookbook, "3 ways to wear it".
- Photos with no person: the person's product (a packshot, a flat lay), or a set of scenes (a
  view, food, a background).
- A trending photo carousel recreated with the avatar (from screenshots of it).
- The avatar placed into a photo of a real place, or in place of a person in a photo.
- A product photoshoot: a studio shot for a shop, a lifestyle scene, a close-up with hands, a
  Pinterest pin, a website banner, a pack of ad images, a floating or splash concept shot, or
  an existing image restyled for a season or an aesthetic
  ([references/product-modes.md](references/product-modes.md)).

## Not for

| The person wants | Use |
|---|---|
| One plain photo with no product of theirs, no outfit to show and no set around it (a selfie, a moment, one place) | `creatorline` makes it with the same call. If this skill already took the request, make it here. |
| A cover or thumbnail whose job is a few big words | `creatorline-cover-image` |
| The avatar wearing the item in a video | `creatorline-try-on-video` |
| Photos joined into a reel with music, motion or text | `creatorline-video-studio` |
| One photo brought to life as a clip | `creatorline` (`generate_photo_to_video`) |
| A narrated video built from pictures | `creatorline-faceless-video` |
| Text slides: tips, quotes or a list laid over several photos | The app's slides editor (house-rules.md, section 9) |
| A new avatar, or a change to the avatar's own face | The app: https://app.creatorline.io/avatars/new to make one, https://app.creatorline.io/avatars to change one |
| Only a caption, hashtags or a posting time | `creatorline-publish` |

## What you need

| Item | Ask or default |
|---|---|
| The product or garment, when it must show | **Ask** (hard gap): a photo link or its name in the library (product-intake.md). Never invent it. |
| The job | Infer it: one photo, a shoot of different frames, or a carousel to post. |
| Avatar | The brand's default avatar, or the one the person names (found by name in `list_avatars`, passed as `avatar_id`). The brand has none: products and scenes still work; the avatar is made in the app (If it goes wrong). |
| How many | One photo: 1. A shoot: 4 frames. A carousel: 6. A photo dump: 8. State it; the price follows it. |
| Theme and place | From the ask; with nothing to go on, one of the brand's content angles (`brand_voice.content_angles` from `get_brand`). State it. |
| Frame | `3:4` for everything (Frames and models below). `9:16` only for a story or a still to animate. A product-shoot mode takes its own frame (Pick the tool). |
| Look | Casual phone photo, natural light. Polished only when asked, or in a product-shoot mode that is polished by nature (studio, pin, banner, concept, ad pack). |
| Size | `resolution: "2K"`. Never `4K`. |
| Options | Options to pick from are different briefs (another light, angle, setting or palette each). `count` 2 to 4 only for several takes of one hero frame. |
| Words in the picture | None, unless asked. A carousel may carry a hook of up to 6 words on its cover when the person wants one (Craft). |
| Posting | Only when they ask. A carousel goes to the review queue, never straight out. |

## Pick the tool

| In the frame | Tool | Inputs |
|---|---|---|
| The avatar, in any shot | `generate_photo_edit` | The avatar's face goes into `characters` by itself. A product, garment or style photo in `other_elements`; a photo of a real place in `location`. |
| The person's real product, nobody (packshot, flat lay) | `generate_photo_edit` | Product photos in `other_elements`; `include_avatar: false`. |
| Nothing real: a view, food, a room, a texture, a background | `generate_text_to_photo` | `prompt` only. Never `avatar_id`: it is refused. |
| Two avatars | `generate_photo_edit` | The second avatar's `image_url` from `get_avatar` in `characters` (used at once: it expires). |

- **Every picture of the avatar is `generate_photo_edit`.** `generate_text_to_photo` draws from
  words alone and cannot show the avatar.
- **A real product is never drawn from words.** No photo of it: name it in the caption and keep
  it out of the picture, or ask for the photo.

**Product shoots** have ten modes. Pick by what the person wants, and the more specific mode
wins (a pin of the product in a kitchen is a Pin; a banner of it in use is a Banner; a carousel
of it in scenes is a Carousel). Modes, frames, the interview, brief words and recipes:
[references/product-modes.md](references/product-modes.md).

| Mode | Frame | Mode | Frame |
|---|---|---|---|
| Studio shot | `1:1` (`4:5` for Instagram) | Carousel | `3:4` |
| Lifestyle scene | `3:4` | Ad pack | `1:1`, `4:5`, `9:16` |
| Close-up with a person | `3:4` or `4:5` | Try-on | `3:4`, `2:3` for one full body |
| Pin | `2:3` | Concept (floating, splash) | `4:5` or `1:1` |
| Banner | `16:9` | Restyle | the image's own |

## Frames and models

Leave `model` out unless the frame needs one of the others. Values are exact; check them in
the `generate_photo_edit` tool's schema.

| The frame needs | `model` | `params` |
|---|---|---|
| The avatar's face at its best (default) | leave out (`nano-banana-pro-edit`) | `aspect_ratio: "3:4"` (also `4:5`, `2:3`, `1:1`), `resolution: "2K"` |
| Readable words in the picture | `gpt-image-v2-edit` | `aspect_ratio: "3:4"` or `"9:16"`, `resolution: "2K"`, `quality: "Medium"` |
| A product shot with nobody in it (studio, pin, banner, concept, ad pack) | `gpt-image-v2-edit` | the mode's `aspect_ratio`, `resolution: "2K"`, `quality: "Medium"`; a `4:5` frame, or a frame inside a set of avatar photos, stays on the set's model |
| A full 9:16 screen: a story, a frame to animate | `bytedance-seedream-v4-5-edit` | `image_size: "portrait_16_9"` (it takes no `aspect_ratio` or `resolution`) |
| A scene with nobody and nothing real in it | leave out on `generate_text_to_photo` | `aspect_ratio` as the rest of the set, `resolution: "2K"` |

- **One frame for a whole set.** `3:4` is the one every photo model offers (`portrait_4_3` on
  Seedream), it fills an Instagram feed and reads well on TikTok. `4:5` when it only goes to
  Instagram and every frame stays on the default model.
- The default model has no `9:16`. When the face matters most, prefer `3:4` on it to a 9:16
  frame on another model.
- On the default model `2K` costs the same as `1K`. Never `4K`, never `auto_4K`.
- `gpt-image-v2-edit` at `Medium` costs about what the default does at a vertical frame (more
  at `1:1` and the near-square frames) and softens skin a little: use it for words and for
  product shots with nobody in them. `High` costs several times `Medium`. Seedream costs about half the
  default and keeps skin texture, but may hold the face a little less closely than the default.
- `nano-banana-2-edit` only for a styled frame (a cartoon, anime, clay or illustrated avatar,
  shot types section 13), the job it is proven at; it has no `4:5`, so a styled set is `3:4`.
- The tool's schema also shows a `num_images` param. Leave it out: `count` sets the number of
  options and the server overwrites `num_images` with it.
- Per-model values and the slot tokens: [references/models-and-frames.md](references/models-and-frames.md).

## The flow

1. **Start.** If `track_skill_activation` is in your tools, call it once with
   `creatorline-photos`. Orient as house-rules.md section 1 says: brand, `get_brand` (its voice
   and `language`), the avatar, the balance.
2. **Read the ask.** Which job (one photo, a shoot, a carousel, product only, a scene) and
   which shot types ([references/shot-types.md](references/shot-types.md)), or, for a product
   shoot, which mode (product-modes.md, section 2). Several shot types in one ask are normal: a
   photo dump mixes selfies, details and views.
3. **Intake.** One message, only hard gaps (asking.md), with labelled options; for a product
   shoot, the questions of its situation (product-modes.md, section 3). Usually just the
   product photo, or nothing. A request with no gap goes straight to the plan. Example:

   > Love it. One thing first, the serum:
   > 1. Send a link to a photo of it (the image itself, not the shop page)
   > 2. Or tell me its name if it is already in your Creatorline library
   > 3. Or drop the photo at https://app.creatorline.io/assets and tell me when it is there
   >
   > Defaults: 6 photos of Mia's morning routine with it, one look, portrait 3:4 for
   > Instagram and TikTok. Say if you want another number or another idea.

4. **Bring the product in** (product-intake.md): `list_assets` with `brand_id`,
   `file_type: "image"` and `search`, then `preview_assets`; or `import_asset` with the file
   link, the `brand_id` and the product's name as `title`. Write the product card, or for
   clothes the wardrobe line (Craft), once.
5. **Write the shot list.** One line per frame: shot type, what happens, tool. For two or more
   frames also write the look card (Craft) and reuse it in every brief. A carousel follows
   [references/carousels.md](references/carousels.md).
6. **Price.** The frame's tool with every argument and no `confirm`: nothing starts, and
   the answer is `needs_approval` with `credits`, `credit_balance` and `sufficient`. Frames with
   the same tool, model, `params` and `count` cost the same, so price each distinct setup once
   and add them up. One short message, then wait for a yes:

   > 6 photos of Mia's morning with Glow C, one look:
   > 1. Cover: Mia at the vanity, serum beside her cheek
   > 2. Two drops on her fingertips, close
   > 3. ...
   >
   > 6 photos, <N> credits; you have <M>. Go ahead?

   Short balance (`sufficient: false`): say how many frames fit, or offer the whole set on the
   cheaper model (`bytedance-seedream-v4-5-edit`, about half). Tell the person what it does
   ("cheaper, may hold the face a little less closely"), never its name. Asked "how much?"
   before the details exist: the tool without `confirm` for one photo, times the frames.
7. **Run.** On yes, each frame's call with `confirm: true`, one call per frame, one after
   another. Over the workspace's parallel limit they wait and start by themselves.
8. **Wait and narrate.** `get_generation` with `wait_seconds: 30` on each `generation_id` in
   turn, again until `succeeded` or `failed`. One line between calls: "Making the six photos
   now, about half a minute each." "Four done, two to go."
9. **Check** every result (Check before you show it), then **show** them and offer **next
   steps**.
10. **Post** only when asked or agreed: the carousel goes to the review queue
    ([references/carousels.md](references/carousels.md), section 8). `publish_post` needs its
    own yes (creatorline-publish).

### Call shapes

Examples here use Mia, a woman avatar: write he, she or they to match the avatar's `gender`
(`get_avatar`). They use the brand's default avatar; for another one, add `"avatar_id"`.

The avatar, a moment (`generate_photo_edit`):

```json
{"brand_id": "<brand id>",
 "prompt": "Waist-up, eye level, taken by a friend across the table. @Avatar1 sits at a small marble cafe table by the window, mid-laugh, looking off to the left, one hand around a glass of iced coffee. Oversized cream knit sweater. Soft morning window light. Casual phone photo, everything in focus, natural colours.",
 "params": {"aspect_ratio": "3:4", "resolution": "2K"}}
```

Product in hand (`generate_photo_edit`; the product card line comes from product-intake.md):

```json
{"brand_id": "<brand id>",
 "inputs": {"other_elements": ["<product asset id>"]},
 "prompt": "Chest-up selfie at arm's length, slight high angle. @Avatar1 holds the serum from @Input1 beside her cheek in her right hand, label to the camera, fingers below the label, a soft smile at the lens. Bathroom vanity, white tiles, morning light from a window on the left. Product: Glow C Serum, amber glass dropper bottle that fits in one palm, white label. Casual phone photo, natural skin texture.",
 "params": {"aspect_ratio": "3:4", "resolution": "2K"}}
```

Product only, nobody (`generate_photo_edit`; a product-shoot mode, so the product model):

```json
{"brand_id": "<brand id>", "include_avatar": false,
 "model": "gpt-image-v2-edit",
 "inputs": {"other_elements": ["<product 1>", "<product 2>", "<product 3>"]},
 "prompt": "Shot straight down: a flat lay on a white marble counter. @Input1, @Input2 and @Input3 in a loose diagonal, labels up and readable, a folded linen towel and a sprig of eucalyptus beside them. Soft daylight from the top left, gentle shadows. Every product exactly as in its photo.",
 "params": {"aspect_ratio": "3:4", "resolution": "2K", "quality": "Medium"}}
```

A scene with nothing real in it (`generate_text_to_photo`):

```json
{"brand_id": "<brand id>",
 "prompt": "An empty cobbled street in Lisbon at golden hour, a yellow tram stop, pastel houses, long warm shadows. Casual phone photo, horizon a little tilted.",
 "params": {"aspect_ratio": "3:4", "resolution": "2K"}}
```

A 9:16 frame: `"model": "bytedance-seedream-v4-5-edit"` and `"params": {"image_size":
"portrait_16_9"}`. Words in it: `"model": "gpt-image-v2-edit"` with
`"params": {"aspect_ratio": "3:4", "resolution": "2K", "quality": "Medium"}` and the words in
quotes in the brief. Options of one frame: `"count": 3`.

## Craft

**The brief.** The server's writer turns it into the image prompt and adds the avatar's
persona (video-briefs.md, section 15). Give it the frame and the facts; keep it to 40 to 100
words, in this order, because the front weighs most:

1. The frame: shot size, angle, who holds the phone.
2. What the avatar does: the action, the pose, the hands, the expression.
3. What the avatar wears, when it matters.
4. The place and the light.
5. The product card line, when a product is in frame.
6. The look: "casual phone photo" plus one or two of the cues below.

- **Describe what changes, never the face.** The face, hair, skin and body come from the
  avatar's image. Words about them pull the face away from it.
- **The avatar's image carries over.** Sunglasses, a hat or a logo tee in the avatar's own
  image turn up in every photo unless the brief puts something else there: "a bare head", "a
  plain white tee".
- **Name each input's job.** "@Avatar1 holds @Input1." "@Avatar1 sits in the room from
  @Location1." An input with no job gets a guessed one.
- **Positives** (video-briefs.md, section 9): "an empty street", not "no people".
- **A person only when asked.** A brief about a product, a place or food comes out with nobody
  in it. Say "@Avatar1" whenever the avatar should be there; for a frame with nobody, also pass
  `include_avatar: false` so the avatar's image is not sent at all.
- **The brief stays yours.** Never paste it back to the person unless they ask: they want the
  photos.

**Picking the model.** Only the models in the tables above are picked without being asked. A
model or a look the person names ("the sharper one", "the cheaper one") stays for every
follow-up on the same work. Never drop to another model because its values look simpler; when
the frame forces a switch, say what changes in one line ("this frame uses the model that draws
words; skin comes out a little smoother"). A cheap draft first (Seedream, about half) only when
the person asks for one; then the final on the right model.

**Phone-real grammar** (detail and every shot type in
[references/shot-types.md](references/shot-types.md)):

| Who holds the phone | Write |
|---|---|
| She does (selfie) | "selfie at arm's length, slight high angle" |
| A friend | "taken by a friend at eye level, a few steps away" |
| Propped, a timer | "phone propped on a shelf at waist height, full body" |
| A mirror | "mirror selfie, phone at chest height, her face fully visible above it" |
| Overhead | "shot straight down from above" |

- Light that a phone meets: window light, an overhead room light, golden hour, open shade, the
  phone's own flash at night.
- Realism cues, one or two: everything in focus, light grain, a crop that cuts the top of the
  head, a horizon a few degrees off, a hand a little blurred in motion, the room's own clutter.
- Words that make a stock ad, kept out of UGC: studio lighting, bokeh, 8K, ultra detailed,
  masterpiece, cinematic. For a polished shot, name the light and the surface instead: "soft
  window light, light oak table".
- Expressions that read real: a soft smile at the lens, mid-laugh looking away, focused on the
  task, squinting in the sun, a calm neutral look, a held-back grin.

**The look card.** For any set, one line written once and pasted into every frame's brief, so
the frames belong together. Only the frame line, the action and the detail change.

```
Look: <outfit in one line> · <place> · <light and time of day> · <palette: 2 or 3 colours> · casual phone photo
```

**The product in frame.** Hold it the way it is really held (a bottle by its body, a jar in the
palm, a bag on the shoulder), at its true size from the card, label to the camera, fingers
below the label, one product per hand. Warn once about a large logo (product-intake.md, section
5). A before and after is two frames of a set, the same look card with one thing changed: one
picture shows one moment.

**Clothes.** The wardrobe line, written once and reused: colour, fabric, cut, length,
neckline, closures, the one detail it sells on. "Sage green linen midi dress, square neckline,
buttons down the front, ties at the back of the waist." The garment photo goes in
`other_elements`: a flat lay or a hanger shot; a photo with a model's face can pull that face
in, so ask for one cropped below the chin.

**Words in the picture.** Only when the person asks or agrees, up to 6 words, usually a hook on
a carousel's cover. `gpt-image-v2-edit`, the exact words in quotes, where they sit and how they look:
"across the upper third, bold white sans serif with a soft shadow, the exact words \"my 5 am
reset\"". Keep them off the bottom fifth, where TikTok's buttons and caption sit. A price, an
offer or anything that must be exact goes in the caption. Text on several frames: the app's
slides editor.

## Check before you show it

`preview_assets` with the output `asset_id`s (up to 8 per call) and look at each one:

- the face is the avatar's, and the same person in every frame of a set;
- hands: five fingers each, a natural grip, one product per hand;
- the product matches its photo: shape, colour, cap, label side (small print may blur; a
  garbled large logo is a miss);
- words spelled exactly as written;
- one person unless more were asked; a mirror shows one reflection;
- a set shares the outfit, the place, the light and the frame;
- nothing breaks Safety (house-rules.md, section 7).

Give each frame a verdict: keep, redo with one change (a paid run: ask), or drop. A carousel
can drop a weak frame instead of paying for it again. Say plainly what is off.

## If it goes wrong

| What went wrong | Fix |
|---|---|
| The face does not look like the avatar | Take every face, hair and body word out of the brief; frame closer (waist-up or chest-up); stay on the default model |
| The avatar twice, or a stranger in the frame | "@Avatar1 alone in the frame"; an input photo that shows a person (a garment on a model, a trend screenshot) brings them in: crop it or describe it in words |
| The product is wrong or the logo garbled | A cleaner product photo, front on; a smaller or angled logo; the product card line in the brief; one retry |
| Words misspelled | `gpt-image-v2-edit`, fewer words, in quotes; or put them in the caption |
| Looks like a stock ad | The phone-real cues; a phone holder in the frame line; remove polished words |
| The frames do not match each other | The same look card in every brief, the same model for every frame; redo the odd one out or drop it |
| A content check stopped it (refunded) | Rephrase: nothing revealing, no real person's or brand's name, no other brand's product |
| `avatar_id` refused on `generate_text_to_photo` | Use `generate_photo_edit`: it shows the avatar |
| An `aspect_ratio` value refused | The model does not offer it: the table above; Seedream takes `image_size` |
| `import_asset` refuses a photo or carousel post link | Ask for the image file's own link, screenshots as files, or a drop at https://app.creatorline.io/assets |
| `create_post` says a platform does not support the format | A carousel goes to Instagram, TikTok or Telegram; one photo to Instagram or Telegram. Pass `channels` (carousels.md, section 8) |
| The brand has no avatar yet | It is made in the app at https://app.creatorline.io/avatars/new. Meanwhile offer product shots and scenes with nobody in them |
| They want their own face, not an avatar | Their own avatar, made from their photo at https://app.creatorline.io/avatars/new; every shot here then works with it |
| `get_generation` still running after a long wait | A slow model | `get_generation` again on the same id; never start the run a second time, which charges twice |
| A model id refused as unknown | It is not in the catalog | Only ids from the tool's schema (its `model` list); never one made up or remembered |
| Product-shoot options all look alike | Several takes of one brief (`count`) | Different briefs: another light, angle, setting or palette each (product-modes.md, section 5) |

After three paid tries at the same frame, stop and offer the best take, another shot type, or
dropping the frame (house-rules.md, section 5).

## Show the result

The card from house-rules.md section 4, one line per photo. In ChatGPT the person sees only
the links, so name each one by what it shows. One photo gets one "See the photo" link beside
"Open in Creatorline". A set:

```
**Mia's morning with Glow C**: 6 photos, 3:4, one look, ready to post as a carousel.
1. [Cover: Mia laughing at the vanity, serum in hand](<url>)
2. [Two drops on her fingertips](<url>)
3. [The bottle on the windowsill](<url>)
4. [Mirror selfie, robe and towel](<url>)
5. [Coffee and the serum on the counter](<url>)
6. [Mia heading out, sunglasses on](<url>)
[Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Post it as one carousel to Instagram and TikTok (I'll write the caption)
2. Bring the cover photo to life as a 5-second clip
3. A 12-second talking video with the same look and the serum
```

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- **Post it**: a set as one carousel, here ([references/carousels.md](references/carousels.md),
  section 8); one photo to Instagram through creatorline-publish.
- **Bring a frame to life**: a few seconds of motion from one photo with `generate_photo_to_video`
  (creatorline). A `9:16` frame animates best.
- **A video with the same look**: the product reviewed on camera (creatorline-talking-video),
  the outfit in motion (creatorline-try-on-video).
- **A reel from the photos** with music and text: creatorline-video-studio.
- **A cover with words** from the best frame: creatorline-cover-image.
- **The same set again** for another product, outfit or avatar: keep the shot list and the
  look card, change one line.

## References

- [references/shot-types.md](references/shot-types.md): phone-real grammar and every shot type
  with a brief to start from.
- [references/carousels.md](references/carousels.md): planning a carousel, recipes,
  consistency, order, posting.
- [references/product-modes.md](references/product-modes.md): the ten product-shoot modes,
  picking one, the interview, brief words per mode, options that differ, restyles, an ad pack,
  a launch set.
- [references/models-and-frames.md](references/models-and-frames.md): each photo model's exact
  values, slots and tokens, and what changes the price.
- [references/house-rules.md](references/house-rules.md): session, consent, waiting, results,
  safety.
- [references/asking.md](references/asking.md): how to ask.
- [references/product-intake.md](references/product-intake.md): getting the product in, the
  product card, claims, logos.
- [references/video-briefs.md](references/video-briefs.md): how the server's writer reads a
  brief (section 15 for photos).
