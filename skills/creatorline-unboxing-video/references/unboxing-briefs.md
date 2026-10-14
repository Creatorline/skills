# Unboxing briefs, worked

Six briefs, one per situation, each with the exact `create_generation` call. The products and
brands are made up. Ids in angle brackets come from `list_brands`, `list_assets` or
`import_asset`; never show them to the person. Call first WITHOUT `confirm` to get the price,
then again with `confirm: true` after the yes.

## Contents

1. [Classic, plain box, 15 s](#1-classic-plain-box-15-s)
2. [Their own box, calm, 15 s](#2-their-own-box-calm-15-s)
3. [Launch box on the brand's own account, 20 s](#3-launch-box-on-the-brands-own-account-20-s)
4. [Quiet unboxing, 12 s](#4-quiet-unboxing-12-s)
5. [Full first look, 25 s](#5-full-first-look-25-s)
6. [Haul takes, one item each](#6-haul-takes-one-item-each)

## 1. Classic, plain box, 15 s

The person: "Make an unboxing of Mia with our vitamin C serum." Product photo in the library,
no package photo.

```
Idea: @Avatar1 unboxes the Glow C Serum at her desk: a plain box, one careful reveal, a calm first verdict.
Hook: "It's here. First look at the Glow C Serum." Her fingers are already at the tape.
Package: a plain kraft-brown shipping box a little bigger than the serum, clear tape across the top, cream tissue inside.
Opening: she peels the tape off in one long strip; the box opens on a cut. After the reveal the empty box sits at the edge of the desk.
Reveal: @Avatar1 lifts @Object1 out with her right hand, label to camera.
First touch: she unscrews the dropper and holds it above the bottle.
Honest detail: it is smaller than you'd think and fits in her palm.
Product: Glow C Serum (@Object1), 15% vitamin C printed on the label, glass dropper bottle that fits in one palm.
Setting: her desk by a window, daylight; phone propped on the desk, both hands free.
Reaction: natural, one small gasp at the reveal.
Ending: a calm verdict, bottle at chest height, label to camera.
Language: English.
Sound: voice and room sound only.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<serum photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 15 }
}
```

## 2. Their own box, calm, 15 s

The person: "Unboxing of our Ember candle, it comes in a black magnetic box, here's a photo of
both." A premium product: the calm register.

```
Idea: @Avatar1 opens the Ember candle's gift box on a light oak table in the evening: slow, quiet, a little luxurious.
Hook: "This is the box it comes in." Her hand rests on the closed lid.
Package: @Object2, a matte black box with a magnetic flap. She swings the flap open; the box opens on a cut. After the reveal the open box sits at the edge of the table.
Reveal: @Avatar1 lifts @Object1 out with both hands and turns the label to camera.
First touch: she lifts the candle's wooden lid off and sets it beside the jar.
Honest detail: the lid is solid wood.
Product: Ember Candle (@Object1), amber glass jar with a wooden lid, "fig and cedar" printed on the label, held in two hands.
Setting: a light oak table, warm lamp light; phone propped on the table, both hands free.
Reaction: calm: a slow breath out and a soft smile at the reveal.
Ending: a quiet verdict, the candle held at chest height, label to camera.
Language: English.
Sound: voice and room sound only.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<candle photo asset id>", "<box photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 15 }
}
```

The product goes first in `objects`, the package second, so they are `@Object1` and
`@Object2`.

## 3. Launch box on the brand's own account, 20 s

The person: "PR box style unboxing of our new Cloud Slides, it's going on our own TikTok."
The brand's own account, so the framing is the brand's own launch, never a gift
(unboxing-craft.md, section 8). They sent a photo of the mailer and of a room in their studio.

```
Idea: @Avatar1 opens the Nori Studio spring launch box: the new Cloud Slides, presented like something special.
Hook: "First look at the spring launch box." She taps the lid twice with her knuckles.
Package: @Object2, a white mailer box with a tuck flap and pale aqua tissue inside. She lifts the front flap up and back; the box opens on a cut. A small card lies face down on the tissue.
Reveal: @Avatar1 lifts the pair of @Object1 out with both hands and holds them toward the camera, soles down.
First touch: she presses her thumb into the footbed to show how soft it is.
Honest detail: they are lighter than they look.
Product: Cloud Slides (@Object1), one pair of sage green foam slides with a thick footbed, held in two hands.
Setting: @Location1, daylight; phone propped on the table, both hands free.
Reaction: natural, a laugh at the reveal.
Ending: a warm verdict, the slides held at chest height.
Language: English.
Sound: voice and room sound only.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": {
    "objects": ["<slides photo asset id>", "<mailer photo asset id>"],
    "location": ["<studio room photo asset id>"]
  },
  "params": { "ugc_style": "Unboxing", "duration": 20 }
}
```

Avatar, product, mailer and room are four images: the most the writer looks at.

## 4. Quiet unboxing, 12 s

The person: "ASMR unboxing of our lipstick, no talking." No box photo, so the box is plain:
never the brand's retail box drawn from imagination.

```
Idea: @Avatar1 unboxes the Velvet lipstick at her vanity and stays silent the whole time: slow hands, satisfying sounds.
Hook: no words; the first frame is her fingers sliding the sleeve off the box.
Package: a plain matte white sleeve box over a small tray, a little bigger than the lipstick. The sleeve comes off on a cut.
Reveal: @Avatar1 lifts @Object1 out between her thumb and two fingers and brings it toward the lens at chest height.
First touch: she pulls the cap off with a soft click.
Product: Velvet Lipstick (@Object1), a gold metal tube with a rose bullet.
Setting: a white vanity, soft daylight; phone propped on the vanity, both hands free.
Reaction: @Avatar1 stays quiet and smiles at the reveal.
Ending: the open lipstick held beside her face, chest-up.
Sound: room sound only: the sleeve, the tissue paper and the cap.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<lipstick photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 12 }
}
```

## 5. Full first look, 25 s

The person: "Unbox our earbuds and try them, first impressions."

```
Idea: @Avatar1 unboxes the Pulse earbuds at a kitchen counter and tries them on the spot.
Hook: "What do you think fits in a box this small?" Her hands already rest on the box.
Package: a plain kraft-brown shipping box a little bigger than the earbuds' case, clear tape across the top, light grey tissue inside.
Opening: she peels the tape off; the box opens on a cut. After the reveal the box leaves the frame.
Reveal: @Avatar1 lifts @Object1 out between two fingers and holds it toward the lens at chest height.
First touch: she clicks the case open.
First use: she puts one earbud in her right ear and listens for a moment.
Honest detail: the case closes with a magnet.
Product: Pulse Earbuds (@Object1), a matte white pill-shaped case that fits in one palm, two white earbuds inside. Page: <the product page link the person gave>
Setting: a white kitchen counter, morning daylight; phone propped on the counter, both hands free.
Reaction: natural, a grin when the case clicks open.
Ending: a short verdict, one earbud in, the case held at chest height.
Language: English.
Sound: voice and room sound only.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<earbuds photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 25 }
}
```

The page link lets the writer read real facts; the slot still needs the photo file.

## 6. Haul takes, one item each

The person: "A haul of the three pieces from our summer drop: linen shirt, canvas tote, silk
scarf." One take per item, joined in Video Studio (multi-take-assembly.md). The Setting and
Wardrobe lines are the same, word for word, in every take. Each piece is lifted out and shown,
not worn: a haul where she puts each piece on is a try-on (`creatorline-try-on-video`).

Take 1 (12 s, opens the package and reveals the first item):

```
Idea: @Avatar1 opens a summer drop mailer on her bed and pulls out the first piece, the linen shirt.
Hook: "The whole summer drop, in one bag." Her fingers are at the mailer's tear strip.
Package: a plain padded mailer. She tears along the top strip; it opens on a cut. After the reveal the open mailer lies at the edge of the bed.
Reveal: @Avatar1 lifts @Object1 out with both hands and lets it unfold toward the camera.
Honest detail: the linen is soft, not stiff.
Product: Linen Shirt (@Object1), an off-white relaxed linen shirt with wooden buttons.
Setting: a made bed with white sheets, daylight from a window; phone propped at the foot of the bed.
Wardrobe: a fitted black tank top.
Reaction: natural, a small gasp at the reveal.
Ending: the shirt held up against her chest, a short verdict.
Language: English.
Sound: voice and room sound only.
```

Take 2 (8 s, the next item from the open mailer; take 3 is the same with the scarf):

```
Idea: @Avatar1 pulls the second piece, the canvas tote, out of the already open mailer on her bed.
Hook: "Number two." She is already lifting it out.
Reveal: @Avatar1 lifts @Object1 out by its handles with her right hand, front to camera.
Honest detail: the inside has a zip pocket.
Product: Canvas Tote (@Object1), a natural canvas tote with long black handles.
Setting: a made bed with white sheets, daylight from a window; phone propped at the foot of the bed.
Wardrobe: a fitted black tank top.
Reaction: natural, a grin.
Ending: the tote held up at chest height by its handles, a short verdict.
Language: English.
Sound: voice and room sound only.
```

```json
{
  "tool": "ugc-video",
  "brand_id": "<brand id>",
  "prompt": "<take 2's brief>",
  "inputs": { "objects": ["<tote photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 8 }
}
```

Each take holds one item in `objects`. Price all three takes and the export before any of
them starts, and ask once for the total.
