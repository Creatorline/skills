# Product intake

How to get the person's product into a run once, and keep it right in every video and photo
after that.

## Contents

1. [Get a real photo](#1-get-a-real-photo)
2. [A good product photo](#2-a-good-product-photo)
3. [Write the product card once](#3-write-the-product-card-once)
4. [Claims](#4-claims)
5. [Logos and printed text](#5-logos-and-printed-text)
6. [Where the product goes](#6-where-the-product-goes)
7. [Apps and websites](#7-apps-and-websites)

## 1. Get a real photo

The product must be the real one, from a photo. Never generate a stand-in, never use a stock
image, never describe it from memory.

| The person gives | Do |
|---|---|
| A product already in Creatorline | `list_assets` with `brand_id`, `file_type: "image"` and `search` (the product name). Look at the likely ones with `preview_assets`, then confirm by name. |
| A link to the image file itself | `import_asset` with the `url`, the `brand_id` and a `title` (the product name). Use the returned asset in the slot; it stays in the library for next time. |
| A product page link | Put the URL in the brief: the writer reads the page for facts. A slot still needs an image FILE: ask once for a photo, or for the image's own address (open the image, copy its address). |
| A TikTok or Instagram video of the product | `import_asset` takes a video post link. Use it as a reference clip or a source, never as the product photo. |
| A file on their device | Only links reach `import_asset`. Ask them to drop the file into https://app.creatorline.io/assets, then find it with `list_assets`. |
| Nothing | Ask once, inside the intake message. Without a photo, offer a version where the product is named but never shown. |

- A web page link in an image slot is refused before anything is charged.
- `import_asset` takes images up to 25 MB, videos up to 100 MB, audio up to 50 MB. Photo and
  carousel posts are refused.

## 2. A good product photo

- The product alone, filling most of the frame, front label facing the camera.
- Even light, sharp, a plain or simple background. The store's packshot usually works.
- No hands, no other products, no price stickers.
- One photo is usually enough. Add another angle only when a shot needs the back or side; the
  model invents any side it has not seen.

## 3. Write the product card once

Before the first brief, write a short card from the photo, the page and the person's words.
Reuse its picture lines word for word in every brief, so the product stays the same across
videos.

```
Product: <name as printed>
What it is: <the exact category, one line: vitamin C serum, cordless stick vacuum>
Tier: <luxury / premium / everyday, read from the packaging, never from a price>
How it is used: <how it opens and works: pump, dropper, twist cap, zipper, a tap on the screen>
Mechanism: <one fixed phrase: which part is where, what moves, where the product comes out>
Size: <against a hand, plus centimetres: "fits in one palm, about 10 cm tall">
Side we have: <what the photo shows: "front label only", "front and back">
Has only: <what it lacks, said as what is there: "a plain screw cap", "the trigger is the only control">
Stands out by: <what makes it different, said positively: strapless, seamless, refillable>
Mark of use: <one honest sign it is real, when it fits: a fingerprint on the glass, a crease in the tube>
Label: <what the front shows>
Claims: <the person's approved claims, word for word, when they give a list>
```

- **Where each line goes.** Into the brief's picture sentences, word for word every time: the
  plain noun from What it is, Size, How it is used, Mechanism, Has only, Mark of use. Into the
  spoken lines only: Product (its name), Stands out by, Label facts, Claims. Tier and Side we
  have steer the setting and the camera.
- **No looks in the card.** Colour, material, finish and logo come from the photo; words about
  them make the model redraw the product (video-briefs.md, section 11).
- **Mechanism** is written once and reused in every shot that touches the product: a mechanism
  that changes between shots changes the product.
- **Has only.** A feature named only as missing ("no buttons") comes back in the render. Say
  what is there instead, in the card and in the shot that would show it.
- **Side we have.** The model invents any side it has not seen: keep the camera on the sides the
  photo shows.
- **Tier** sets the room: a calm, polished bathroom for luxury, an ordinary lived-in one for
  everyday.
- **Mark of use.** A spotless product reads as a render. A product just unboxed is new: at most
  a fingerprint.

Ask only what you cannot see or read. Size and how it opens are the two facts most often wrong
when guessed.

## 4. Claims

- **Facts are a source, not a limit.** The label, the product page and the person's words tell
  you what the product is and does: use them freely, numbers included (15% vitamin C, 20 g
  protein). Write them specific.
- **An approved-claims list is an option.** When the person gives one, use it word for word and
  keep to it; to keep a page's own claims out, write in the brief "Say only these claims: ...".
  Without one, write freely. Never ask for a list as a condition.
- **Words to avoid** the person names are a hard rule, like a brand's don'ts.
- **Exact on screen.** A number or a claim that must read exactly (a price, an offer, a
  percentage) goes in Video Studio text or the caption (section 5): printed text in a generated
  frame comes out garbled. Spoken, it is fine.
- **Health and money** (house-rules.md, section 7): no promise that it cures, treats or
  prevents a disease, and no guaranteed income or return.
- One optional intake question covers it: "Anything you must say, or must never say, about it?"

## 5. Logos and printed text

- A large, readable logo or wordmark on the product often comes out garbled. Warn once and let
  the person choose: keep it and accept small errors, or use a photo where it is smaller or
  angled.
- Small print never renders exactly. Words that must be exact (a price, an offer, the product
  name) go in Video Studio text or the caption, not in the generated picture.
- Never put another brand's logo or product in the scene.

## 6. Where the product goes

| Tool | Slot | Note |
|---|---|---|
| `ugc-video` | `objects` | Name it with a plain noun and `@Object1` ("the serum (@Object1)") and say what the avatar does with it |
| `photo-edit` | `other_elements` | A product shot without the avatar: `include_avatar: false` |
| `reshoot` | `objects` | Replaces the product in the source video; say so in the Direction |
| `character-swap`, Transfer | `other_elements` | Say in the Direction what it is for |
| `character-swap`, Replace | `outfit` | Clothing only: the main avatar wears it |
| `photo-to-video` | the start image | Make the still with the product first (`photo-edit`), then animate it |

Check slot keys in `list_models` before the first run; they differ per model.

## 7. Apps and websites

- Real screens only: screenshots or a screen recording from the person, as links or library
  files. We do not capture websites, and generated screens are never shown as the real app.
- **Screens go on only in Video Studio**, as cards or layers (a split screen included), over or
  beside the avatar's take. Never put a screenshot or a screen recording into `source_video` (or
  any other slot) on `ugc-video`: the model redraws it as a made-up screen.
- The take itself shows the avatar, never a phone, laptop or screen in hand: the real screens
  are added on top.
- The page URL in the brief gives the writer facts (what it does, for whom), not pictures.
- A line that points the viewer at a feature on screen needs a screen that shows it; a feature
  without one is said, not pointed at.
