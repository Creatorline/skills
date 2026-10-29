# Product photoshoot modes

Brand-quality product photos: the ten kinds of product shoot, how to tell which one the person
wants, what to ask, how to write each one's brief, and three recipes (a restyle, an ad pack, a
launch set). Avatar photo asks with no product focus (a photo dump, an OOTD, a mirror selfie)
are the shot types in [shot types](shot-types.md), not modes.

## Contents

1. [The ten modes](#1-the-ten-modes)
2. [Picking the mode](#2-picking-the-mode)
3. [The interview](#3-the-interview)
4. [Writing each mode's brief](#4-writing-each-modes-brief)
5. [Options that differ](#5-options-that-differ)
6. [Restyle](#6-restyle)
7. [An ad image pack](#7-an-ad-image-pack)
8. [A launch set](#8-a-launch-set)

## 1. The ten modes

| Mode | The person wants | Frame by default | The call |
|---|---|---|---|
| Studio shot | The product alone on a clean, neutral or catalog background: a shop listing | `1:1`; `4:5` for Instagram | `generate_photo_edit`, `include_avatar: false`, the product in `other_elements` |
| Lifestyle scene | The product in a real place, in use, with atmosphere: a kitchen, outdoors, a cafe, a gym | `3:4` | `generate_photo_edit`; the avatar in it when a person belongs in the scene, otherwise `include_avatar: false` |
| Close-up with a person | A tight crop with hands or part of a face: applying, holding, showing | `3:4` or `4:5` | `generate_photo_edit` with the avatar, framed close on the hands |
| Pin | A vertical, moodboard-style image for Pinterest | `2:3` | `generate_photo_edit` |
| Banner | A wide header for a website, an email or a campaign | `16:9` (`21:9` for a slim strip) | `generate_photo_edit`; with the avatar in it, `3:2` on the default model, which has no `16:9` |
| Carousel | 3 to 10 connected slides | `3:4` | [carousels](carousels.md) |
| Ad pack | A coordinated set of static ad images for paid social | `1:1`, `4:5` and `9:16` | Section 7 |
| Try-on | The product worn or used by a person | `3:4`; `2:3` for one full-body photo | `generate_photo_edit` with the avatar wearing it ([shot types](shot-types.md), section 5) |
| Concept | A surreal or CGI-style product: floating, levitating, a splash, frozen motion, a sculpture | `4:5` or `1:1` | `generate_photo_edit`, `include_avatar: false`, the product photo |
| Restyle | An existing image with a new aesthetic, mood or season, its subject kept | The image's own frame | `generate_photo_edit`, the image in `other_elements` (section 6) |

- **The model.** A shot with no person in it (studio, pin, banner, concept, ad pack, a restyle
  of a product image) runs on `gpt-image-v2-edit`, `quality: "Medium"`: the model proven for
  product photos, and the one that draws words. It has no `4:5`: a 4:5 frame stays on the
  default model. A product frame inside a set of avatar photos (a photo dump, a carousel) stays
  on the set's model too, so the set keeps one look. A shot with the avatar in it stays on the default model
  (`nano-banana-pro-edit`, `model` left out), which keeps the face closest to the avatar.
- `resolution: "2K"` for every mode. Never `4K`.
- The person in a lifestyle, close-up or try-on photo is the brand's avatar: the same face
  across the whole product series. Another person is another avatar, picked by name from
  `list_avatars`; never a new face made up for the shoot.
- Exact frame values per model: [models and frames](models-and-frames.md), section 2.

## 2. Picking the mode

Pick by what the person wants, not by one word in the ask. When two modes could fit, the more
specific one wins.

| They say | Mode |
|---|---|
| neutral, clean, white, studio, catalog, shop listing, packshot | Studio shot |
| a scene, in use, in the kitchen, outdoors, at a cafe, at the gym | Lifestyle scene |
| hands holding, applying, demonstrating, close on my face with it | Close-up with a person |
| Pinterest, a pin | Pin |
| hero image, banner, website header, landing page, email header, wide | Banner |
| carousel, slides, swipeable, several in a row | Carousel |
| ads, an ad pack, paid social, Meta or TikTok ads | Ad pack |
| wearing it, try-on, on the body, lookbook, fashion shoot | Try-on |
| floating, levitating, a splash, frozen in mid-air, surreal, CGI, a sculpture | Concept |
| the same image with a new vibe, mood or season, the subject unchanged | Restyle |

Tie-breakers:

- **The platform wins.** "A Pinterest pin of my product on a kitchen counter" is a Pin.
- **The format wins.** "A banner showing my product in use" is a Banner.
- **Several slides win.** "A carousel of my product in different scenes" is a Carousel.
- **Otherwise the more specific genre.** "A close-up of someone applying my serum" is a
  Close-up with a person.

Never make up an eleventh mode. An ask that fits none is a shot type, or one plain photo.

## 3. The interview

Ask only what the message, the brand and the library do not already answer, in one message,
each question with labelled options (asking.md). At most three questions: the host's question
tool takes three, so a fourth gap becomes a stated default. When the mode is obvious and the
product photo is in hand, skip straight to the plan.

| The situation | Ask, only the gaps |
|---|---|
| A product photo and "make me photos" | How many? [1 / 3 / 5]. What style? [Clean studio / Lifestyle / Concept / With my avatar / Other]. Where will they go? [Shop / Instagram / Pinterest / Ads / Website]. Brand colours come from `get_brand`; ask only when it has none and the style needs them |
| A product photo and a named use ("ads", "a pin", "a banner") | How many (packs and carousels only). The offer, mood or hook. Anything to stress |
| No product photo | The photo first ([product intake](product-intake.md)): it is far truer than any description. A real product is never drawn from words; without a photo, keep it out of the picture or name it in the caption |
| An existing image to redo ("another vibe", "a Christmas version") | Restyle: the aesthetic [Clean girl / Cottagecore / Quiet luxury / Dark academia / Y2K / Other]; the season [Christmas / Valentine's / Halloween / Black Friday / None]; what to keep and what to change, only when unclear |
| Something to wear | Try-on: which avatar (two or three of the brand's, by name, that suit its audience); the place [Clean studio / Outdoors / Street / Editorial / Cosy home]; the framing [Full body / Three-quarter / Waist up / Close on the item] |
| Vague ("something cool for my brand") | Which product or topic; the goal [Sell in a shop / Awareness / Ads / Website]; a reference image? Then the matching row above |

Open-ended questions ("what is your brand about?") are never asked: `get_brand` answers them.

## 4. Writing each mode's brief

Creatorline's writer turns every brief into the image prompt, but it is a general writer, not
one per mode: so the brief carries the mode's photography. Order: the subject (the product and
its card line), the setting, the style, the camera (angle, distance), the light, the finish.
Under about 150 words. Say what is there, never "no X". On an edit or a restyle, describe the
change, never the input again.

| Mode | Words that carry it |
|---|---|
| Studio shot | "@Input1 front on, centred on a seamless <colour> backdrop, soft even light from both sides, a soft contact shadow, crisp edges, true colours, the label sharp and readable" |
| Lifestyle scene | "@Input1 in use in <place>, natural light from <side>, a lived-in surface, two or three props that belong there, in focus throughout" |
| Close-up with a person | "Close on @Avatar1's hands holding @Input1 at chest height, label to the camera, part of her face soft at the edge of the frame" |
| Pin | "A vertical moodboard image: @Input1 styled on <surface> with <props>, airy and soft, a palette of <two or three colours>, open space at the top" |
| Banner | "Wide: @Input1 on the right third, open space across the left for a headline, a calm background that runs to the edges, soft directional light" |
| Concept | "@Input1 floating in mid-air, <a splash of water / petals / its ingredients> frozen around it, every droplet sharp, a clean gradient background, a bright rim light" |
| Restyle | "Keep the subject of @Input1 exactly: its shape, label, colours and place in the frame. Change only the setting, light and palette to <aesthetic or season>" |

- Studio, pin, banner, concept and ad-pack photos may be polished: studio light, seamless
  backdrops and rim light belong there. The phone-real rules ([shot types](shot-types.md),
  section 1) are for the UGC frames: lifestyle with the avatar, close-ups, try-ons.
- Never show the brief to the person unless they ask for it: they want the photos.

## 5. Options that differ

- **Options to pick from are different briefs**, each changing one or two things: the light,
  the angle, the backdrop or setting, the palette. Three copies of one brief are not a choice.
- `count` 2 to 4 is for several takes of ONE frame (a hero shot to pick from), never for options.
- A carousel or an ad pack is one system: the same look card in every brief, the same model,
  the same `resolution` ([carousels](carousels.md), section 4).

## 6. Restyle

- The image goes in `other_elements` as `@Input1`. `include_avatar: false`, unless the avatar
  should now appear in it.
- **Keep**: the subject, its shape, label, colours and position. **Change**: the aesthetic,
  the mood, the season. Write both sides in the brief.

| Aesthetic | Write |
|---|---|
| Clean girl | clean, bright and minimal, glossy surfaces, white, cream and beige, soft daylight |
| Cottagecore | soft countryside light, wildflowers, linen, worn wood, warm greens and creams |
| Quiet luxury | muted neutrals, fine materials (stone, wool, brushed metal), soft shadows, restraint |
| Dark academia | warm, dim library light, dark wood, old books, brass, deep browns and greens |
| Y2K | glossy chrome, candy pink and baby blue, playful hard flash, shiny plastic |

- A season adds props and palette only: Christmas (fir, warm lights, red and gold),
  Valentine's (soft pinks and reds, petals), Halloween (dusk light, pumpkins, orange and
  black), Black Friday (bold black and one strong accent). No other brand's characters, and no
  discount on the image unless the person gave it.
- Keep the original's frame: pass its `aspect_ratio` when the model has it; otherwise the
  nearest one, and say so.

## 7. An ad image pack

1. **The layout is the one choice to ask** when the person has not said:
   [A headline over the product / Three bullet points / Us vs the usual way / The product
   alone, no words].
2. **Frames**: `1:1` and `4:5` for the feed, `9:16` for stories and reels. One look card for
   all of them. `1:1` and `9:16` run on `gpt-image-v2-edit`; `4:5` on the default model, which
   has that frame (section 1).
3. **Words**: exact, in double quotes; the brand's claims and the product's facts, and only the
   approved list's words when the person gave one ([product intake](product-intake.md),
   section 4); an offer only as the person gave it. "Us vs
   the usual way" sets the product beside a plain, unbranded alternative: never a competitor's
   product, name or logo.
4. **Test the hook first.** Four headlines on one image teach more than one headline on four
   images: vary the words, keep the picture.
5. Price the whole pack before any of it runs. Ads that run on other platforms are downloaded
   by the person; `create_post` posts only to the brand's own connected accounts.

## 8. A launch set

A product launch or a founder story in one batch:

1. Five lifestyle photos of the avatar with the product, one brief each (each changes the
   light, the angle or the place), one look card.
2. The person picks the best two.
3. Each of the two becomes a 5-second clip with `generate_photo_to_video` (the root skill,
   `creatorline`): the prompt is motion only, "the camera slowly pulls back", because the
   photo already holds the scene.

Price the five photos and the two clips together before anything runs; the clips run only
after the pick.
