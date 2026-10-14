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
Reuse it word for word in every brief, so the product stays the same across videos.

```
Product: <name as printed>
What it is: <one line>
How it is used: <how it opens and works: pump, dropper, twist cap, zipper, a tap on the screen>
Looks: <shape, material, colour, finish>
Size: <against a hand: fits in one palm / held in two hands / stands on the floor>
Label: <what the front shows>
Stands out by: <what makes it different, said positively: strapless, seamless, refillable>
Claims: <approved claims, word for word>
```

Ask only what you cannot see or read. Size and how it opens are the two facts most often wrong
when guessed.

## 4. Claims

- Use only claims the person gives you, or that the label in frame prints. An approved-claims list
  is the complete list: each claim word for word, never stronger, never combined, never turned
  into a number.
- No list: no numbers, rankings, comparisons, health, medical or result claims. Say what it is,
  how it is used and what the camera sees.
- A product page in the brief lets the writer use the page's facts. If the person wants only some
  claims, write in the brief: "Say only these claims: ...".
- Never invent reviews, ratings, sales counts, awards, certifications or expert approval.
- Health, supplements, skincare actives, finance: label facts and approved claims only.
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
| `ugc-video` | `objects` | Name it `@Object1` in the brief and say what the avatar does with it |
| `photo-edit` | `other_elements` | A product shot without the avatar: `include_avatar: false` |
| `reshoot` | `objects` | Replaces the product in the source video; say so in the Direction |
| `character-swap`, Transfer | `other_elements` | Say in the Direction what it is for |
| `character-swap`, Replace | `outfit` | Clothing only: the main avatar wears it |
| `photo-to-video` | the start image | Make the still with the product first (`photo-edit`), then animate it |

Check slot keys in `list_models` before the first run; they differ per model.

## 7. Apps and websites

- Real screens only: screenshots or a screen recording from the person, as links or library
  files. We do not capture websites, and generated screens are never shown as the real app.
- A screen recording goes in `source_video` on `ugc-video` to be shown in the clip, or onto a
  Video Studio layer or split screen. Screenshots go in as Video Studio layers.
- The page URL in the brief gives the writer facts (what it does, for whom), not pictures.
- Never claim a feature the screens do not show.
