# Shot types

What each kind of photo is, how a phone would take it, and a brief to start from. Every brief
below is a starting point: put the person's place, product and wording in, keep it to 40 to 100
words, and add the look card when the photo belongs to a set.

The examples use a woman avatar: write he, she or they to match the avatar's `gender`
(`get_avatar`).

## Contents

1. [Phone-real grammar](#1-phone-real-grammar)
2. [Photo dump](#2-photo-dump)
3. [Lifestyle](#3-lifestyle)
4. [Product in hand](#4-product-in-hand)
5. [Outfit](#5-outfit)
6. [Mirror selfie](#6-mirror-selfie)
7. [Flat lay and packshot](#7-flat-lay-and-packshot)
8. [Behind the scenes](#8-behind-the-scenes)
9. [Scenes without the avatar](#9-scenes-without-the-avatar)
10. [The avatar in a real place or photo](#10-the-avatar-in-a-real-place-or-photo)
11. [A photo trend recreated](#11-a-photo-trend-recreated)
12. [Two avatars in one frame](#12-two-avatars-in-one-frame)
13. [Styled, not a photo](#13-styled-not-a-photo)

## 1. Phone-real grammar

**Shot size: pick it by what the frame is about.**

| The frame is about | Shot size | Write |
|---|---|---|
| Her face, a reaction | Close | "chest-up", "face and shoulders" |
| Her with the product, a conversation feel | Middle | "waist-up" |
| The outfit, the place | Full | "full body, feet in frame" |
| Hands, the product, food, texture | Detail | "close on her hands", "close on the label" |
| Where she is | Wide | "wide, she is small in the frame, the street around her" |

**Angle.** Eye level is the default and reads as real. A selfie sits slightly above the eyes.
Overhead is for flat lays, food and desks. Low angles and tilted frames only when the person
asks for drama.

**Who holds the phone** decides the angle, the distance and how candid it feels. A selfie has
one arm leaving the frame; a friend's photo catches her mid-moment and not looking; a propped
phone gives a steady full body; a mirror puts the phone in the shot.

**Light.** Name one source the place really has: a window and which side it is on, the room's
overhead light, golden hour sun, open shade, a lamp, the phone's flash at night (bright face,
dark background, hard shadow behind her).

**Realism cues.** One or two per photo, never all: everything in focus, light grain, a crop
that cuts the top of the head or an elbow, a horizon a few degrees off, a hand a little blurred
in motion, a bit of the room's own clutter, a flash glare on a window at night.

**Expressions.** A soft smile at the lens; mid-laugh, looking away; focused on what her hands
do; squinting in the sun; a calm, neutral look; a grin she is holding back; eyes closed, face
to the sun. One per frame.

**Kept out of UGC photos:** studio lighting, softbox, bokeh, shallow depth of field, 8K,
ultra detailed, masterpiece, hyperreal, cinematic, editorial. They turn a phone photo into an
ad.

## 2. Photo dump

A loose set from one day, trip or event, posted as a carousel: half of it her, half of it what
she saw. It works because it feels unplanned.

- **Mix:** 2 or 3 of her (a selfie, a candid, one full body), 1 or 2 details (hands, food, the
  product on a table), 1 or 2 views, maybe a flash photo at night.
- **One day, one outfit.** The same look card in every frame; the light moves through the day.
- Views and food with nothing real in them: `text-to-photo`. The product on a table:
  `photo-edit` with `include_avatar: false`.

```
Selfie at arm's length, slight high angle. @Avatar1 squints into the sun with a half smile, wind
in her hair, a harbour with white boats behind her. <look card>. Light grain, horizon a little
tilted.
```

```
Night, the phone's flash on. @Avatar1 laughs at a small bar table, a glass of something orange
in her hand, the room dark behind her. <look card>. Hard flash, a slight glare on the glass.
```

## 3. Lifestyle

Her in an ordinary moment that fits the brand: morning coffee, a desk, a walk, cooking, the
gym, reading. Candid beats posed: she is doing something, not looking at a camera.

- Middle shot, eye level, taken by a friend or propped. One action per frame.
- The brand's product can sit in the scene without being held: "the candle from @Input1 burns
  on the table beside her".

```
Waist-up, taken by a friend at eye level. @Avatar1 stirs a pan on a small apartment stove,
looking down at it, a tea towel over her shoulder. Warm overhead kitchen light, evening, steam
in the light. Casual phone photo, the kitchen's own clutter on the counter.
```

## 4. Product in hand

The person's real product, held by the avatar. The product photo goes in `other_elements`
(`@Input1`), and its card line goes in the brief (product-intake.md).

- **The grip is how it is really used:** a bottle by its body, a dropper above an open palm, a
  jar in the palm with the lid off, a phone case on the back of a phone, a bag on the shoulder,
  a drink by the glass.
- **Its true size** from the card ("fits in one palm"), held at chest or cheek height, label to
  the camera, fingers below the label.
- **One product per hand**, the other hand relaxed or doing one thing.
- Frames for a set: hero (held to the lens), in use (applying, sipping, opening), in place (on
  the counter next to her), detail (close on the label in her hand).

```
Chest-up selfie at arm's length. @Avatar1 holds the iced coffee can from @Input1 up beside her
face in her left hand, label to the camera, condensation on the can, a playful look at the
lens. A sunny park bench, open shade. Product: <card line>. Casual phone photo.
```

**Claim floor in photos.** No result on the avatar (clear skin, a flat stomach, longer lashes as
a before and after), no fake review card, no badge or award that was not supplied
(house-rules.md, section 7).

## 5. Outfit

The person's garment, shoes, bag or jewelry on the avatar. The garment photo in
`other_elements` (a flat lay or hanger shot, cropped below any model's chin), the wardrobe
line in the brief.

- **Full body, feet in frame**, weight on one leg, arms a little away from the body so the cut
  shows. `3:4` holds it; `2:3` for a single photo that is all outfit.
- Pieces from top to bottom as `@Input1`, `@Input2`, `@Input3` (up to a whole outfit), each
  named: "the jacket from @Input1 over the dress from @Input2".
- A lookbook set: front, side mid-step, back over the shoulder, a detail (the buttons, the bag
  strap, the shoe).
- Honest by default: the item fits as cut, no slimmer or taller body, no size claims the person
  did not give.

```
Full body, feet in frame, taken by a friend at eye level a few steps away. @Avatar1 walks toward
the camera mid-step on a quiet street, wearing <wardrobe line> from @Input1, one hand on the bag
strap. Open shade, late afternoon. Casual phone photo.
```

## 6. Mirror selfie

The outfit photo everyone recognises. Keep mirrors to photos (in a video they double bodies
and arms), and check the reflection in the result.

- The phone at chest height or held low to one side, so **her face is fully visible above
  it**; a phone in front of the face hides the identity that makes it hers.
- One mirror, one reflection: a full-length bedroom mirror, a lift, a gym, a shop fitting room.
- Write what the reflection shows and nothing about a second person.

```
Mirror selfie in a full-length bedroom mirror. @Avatar1 holds her phone low at hip height, her
face fully visible, a small smile, weight on one leg, wearing <wardrobe line> from @Input1. A
bed with white sheets behind her, daylight from a window on the right. Casual phone photo, a
bit of the room's clutter.
```

## 7. Flat lay and packshot

The person's real products with nobody in the frame: `photo-edit`, `include_avatar: false`,
the product photos in `other_elements`.

- **Flat lay:** shot straight down, a surface that fits the brand (marble, linen, oak, a
  bathroom shelf), a few props that belong with it, labels up, room between the items.
- **Packshot:** the product alone, front on, on a plain or simple surface, soft even light.
- **In place:** the product where it lives (a shelf, a gym bag, a desk), at eye level.
- Every product goes in from its photo. A prop that is not theirs stays generic: "a white mug",
  never another brand.

```
Shot straight down: the three products from @Input1, @Input2 and @Input3 laid out on a beige
linen cloth with a folded towel and two lemons, labels up and readable, space between them.
Soft daylight from the top left. Every product exactly as in its photo.
```

## 8. Behind the scenes

The making-of: her packing orders, planning at a desk, setting up a shot, sketching, a launch
being prepared. Wider and messier than the rest, which is what makes it believable.

- The product in progress or in boxes: their photos in `other_elements`.
- Real places only from their photos (`location`). Never invent a factory, a team, a store or
  customers that were not given.

```
Wide, taken from the doorway at eye level. @Avatar1 sits on the floor of a small studio packing
the candles from @Input1 into kraft boxes, tissue paper and tape around her, focused on her
hands. Afternoon window light. Casual phone photo, the room's own clutter.
```

## 9. Scenes without the avatar

Views, food, a room, a sky, a texture, a background for text: `text-to-photo`, `prompt` only.
Describe one scene fully: the subject, the place, the light, the time, how it was taken. In a
set, the same look card's place, light and palette. Nothing real (their product, their shop)
is drawn from words: those need `photo-edit` with their photos.

```
A window seat in a small cafe at golden hour, a half-finished cappuccino and an open paperback
on the ledge, the street outside in warm light. Casual phone photo, slightly tilted.
```

## 10. The avatar in a real place or photo

- **A real place they send** (their shop, their kitchen, a hotel room): the photo in
  `location`, and the brief says what she does there: "@Avatar1 stands behind the counter of
  the shop in @Location1". Say the key things in words too ("the long white counter, the
  plants on the left"); a place photo alone can put her in the wrong spot.
- **Her in place of a person in their photo:** the photo in `other_elements`, "replace the
  person in @Input1 with @Avatar1, keep the pose, the clothes, the place and the light". Only
  for a photo that is theirs, never of a public figure or someone who has not agreed.

## 11. A photo trend recreated

A trending photo carousel or photo post. `import_asset` refuses photo and carousel posts, so
ask for screenshots as image file links (or a drop at https://app.creatorline.io/assets).

- Each screenshot goes in `other_elements` for its own frame only: "the pose, framing and
  setting of @Input1, with @Avatar1 as the person".
- Take the idea and the framing, not their photo: a new place, her own outfit, the brand's
  product. Their words never get copied onto the frames.
- A screenshot with a person can bring that face in: frame closer on the avatar, or describe the
  pose in words and leave the screenshot out.

## 12. Two avatars in one frame

- The brand's avatar goes in by itself as `@Avatar1`; the second avatar's `image_url` from
  `get_avatar` goes in `characters` as `@Avatar2`. Use it right away: the link expires.
- Place each one: "@Avatar1 on the left on the sofa, @Avatar2 on the right holding the
  popcorn, both laughing at the TV".
- Faces hold best at middle distance or closer. The slot takes up to 4 images; keep it to two
  avatars per frame, since every extra face is one more to get right.

## 13. Styled, not a photo

"Me as a cartoon", a clay figure, an anime still, an ink sketch: `photo-edit` with a style
sentence, the same avatar.

- Generic style words only: "a soft clay stop-motion figure", "hand-painted anime with a
  painted background", "black ink cross-hatching", "a flat, minimal illustration". Never a
  studio, a show, a film, an artist or a toy brand.
- The style carries the look; the brief adds only what she does, her expression and the
  setting.

```
@Avatar1 as a soft clay stop-motion figure, the same face shape and hair colour, sitting on a
tiny clay sofa with a clay coffee cup, smiling. A warm, handmade miniature set.
```
