# Unboxing briefs, worked

Six briefs, one per situation, each with the exact `generate_ugc_video` arguments. The
products and brands are made up. Ids in angle brackets come from `list_brands`, `list_assets`
or `import_asset`; never show them to the person. Call first WITHOUT `confirm` to get the price,
then again with `confirm: true` after the yes. A 30-second first look is worked in
after-the-reveal.md, section 5.

## Contents

1. [Classic, plain box, 15 s](#1-classic-plain-box-15-s)
2. [Their own box, calm, 15 s](#2-their-own-box-calm-15-s)
3. [Launch box on the brand's own account, 15 s](#3-launch-box-on-the-brands-own-account-15-s)
4. [Quiet unboxing, 12 s](#4-quiet-unboxing-12-s)
5. [Quick reveal, 10 s](#5-quick-reveal-10-s)
6. [Haul takes, one item each](#6-haul-takes-one-item-each)

## 1. Classic, plain box, 15 s

The person: "Make an unboxing of Mia with our vitamin C serum." Product photo in the library,
no package photo, so the plain box (Case A) with the cutter.

```
Idea: @Avatar1 unboxes the Glow C Serum at her desk: a plain box, one careful reveal, a warm first verdict.
Register: natural.
Hook: "It's here. First look at the Glow C Serum." Her fingers are already at the tape edge.
Package: a plain brown cardboard delivery box with tape across the top, a little bigger than the serum, plain sides, crumpled blush tissue inside; a small box cutter lies beside it.
Beat 1, sealed: waist-up, phone propped on the desk, frame still. Her left hand steadies the box where it rests; her right hand picks up the cutter, slices along the tape once and sets it down.
Beat 2, reveal, the longest beat: on the cut, chest-up. She lifts @Object1 out with her right hand, label to camera, up from box level toward her chest; a sharp gasp, her left hand flies to her chest. The open box sits at the edge of the desk, tissue at the flaps.
Beat 3, product focus, the shortest beat: tight on the bottle near the lens, only her fingers and her chin in frame; she unscrews the dropper and holds it above the bottle.
Beat 4, satisfaction: on the cut, she holds the phone at arm's length, the desk and the window behind her, the bottle at chest height; a settled smile, ending mid-gesture.
Product: Glow C Serum (@Object1), 15% vitamin C printed on the label, a glass dropper bottle that fits in one palm, about 9 cm tall.
Setting: a light oak desk by a window, neutral daylight, a plain wall behind her.
Lines: "It's here. First look at the Glow C Serum." / "Oh... it's TINY." / "It fits in my palm." / "Dropper's glass, label's right here." / "This one's staying right here on my desk."
Language: English, American accent.
Sound: voice and room sound only: the slice of the tape, the flaps, the tissue, a sharp gasp, the dropper's twist.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<serum photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 15 }
}
```

30 words: inside the 28-35 band for 15 s. One CAPS word, one sentence that breaks off at the
peak (performance.md, section 8).

## 2. Their own box, calm, 15 s

The person: "Unboxing of our Ember candle, it comes in a black magnetic box, here's a photo of
both." Their own package (Case B), and the person said "quiet luxury": the calm register.

```
Idea: @Avatar1 opens the Ember candle's box on a marble table: slow, quiet, a little luxurious.
Register: calm (the person asked for quiet luxury).
Hook: "This is the box it comes in." Her fingertips already rest on the closed flap.
Package: @Object2, a matte black box with a magnetic flap, exactly as in the photo: no tape, no tissue.
Beat 1, sealed: waist-up, phone propped on the table, frame still. Two slow knuckle taps on the lid, a small smile, she slides the box a few centimetres toward the lens, then swings the flap open; it lets go with a soft click.
Beat 2, reveal, the longest beat: on the cut, chest-up. She lifts @Object1 out with both hands and turns the label to camera; a slow breath out, a long look. The open box sits at the edge of the table.
Beat 3, product focus, the shortest beat: tight on the jar near the lens, only her hands in frame; she lifts the wooden lid off and sets it beside the jar.
Beat 4, satisfaction: on the cut, three-quarter, phone still propped; she sits back with the candle beside her on the table, the room behind her.
Product: Ember Candle (@Object1), an amber glass jar with a wooden lid, "fig and cedar" printed on the label, held in two hands, about 10 cm tall.
Setting: a white marble table, neutral daylight from one window, a plain wall behind her.
Language: English, American accent.
Sound: voice and room sound only: the knuckle taps, the magnet's click, a slow breath, the wooden lid set down.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<candle photo asset id>", "<box photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 15 }
}
```

The product goes first in `objects`, the package second, so they are `@Object1` and
`@Object2`. The calm register softens the build-up of Case B; it never adds tape or tissue the
photo does not show.

## 3. Launch box on the brand's own account, 15 s

The person: "PR box style unboxing of our new Cloud Slides, it's going on our own TikTok." The
brand's own account, so the framing is the brand's own launch, not a gift from itself
(unboxing-craft.md, section 11). They sent a photo of the mailer and of a room in their studio.

```
Idea: @Avatar1 opens the Nori Studio spring launch box: the new Cloud Slides, presented like something special.
Register: natural.
Hook: "First look at the spring launch box." Her knuckles are already tapping the lid.
Package: @Object2, a white mailer box with a tuck flap and pale aqua tissue inside, exactly as in the photo; a small card lies face down on the tissue.
Beat 1, sealed: waist-up, phone propped on the table. Three quick knuckle taps, a shoulder wiggle, a grin with her brows lifting, a playful slide of the box a few centimetres; then she lifts the front flap up and back.
Beat 2, reveal, the longest beat: on the cut, chest-up. She lifts the pair of @Object1 out with both hands, soles down, toward the camera; she leans back, caught mid-recoil, and laughs. The open mailer sits at the edge of the table.
Beat 3, product focus, the shortest beat: tight on one slide near the lens; her thumb presses into the footbed.
Beat 4, satisfaction: on the cut, she holds the phone at arm's length, the studio behind her, the other slide held at chest height; ending mid-gesture.
Product: Cloud Slides (@Object1), one pair of sage green foam slides with a thick footbed, held one in each hand, about 27 cm long.
Setting: @Location1, neutral daylight, a plain wall behind her.
Language: English, American accent.
Sound: voice and room sound only: the knuckle taps, the flap, the tissue, a laugh.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": {
    "objects": ["<slides photo asset id>", "<mailer photo asset id>"],
    "location": ["<studio room photo asset id>"]
  },
  "params": { "ugc_style": "Unboxing", "duration": 15 }
}
```

Avatar, product, mailer and room are four images: the most the writer looks at.

## 4. Quiet unboxing, 12 s

The person: "ASMR unboxing of our lipstick, no talking." No box photo, so the plain box: never
the brand's retail box drawn from imagination. A tiny product, so beat 1 may be a selfie, but a
cutter needs two hands: keep the phone propped.

```
Idea: @Avatar1 unboxes the Velvet lipstick at her vanity and stays quiet the whole time: slow hands, satisfying sounds.
Register: silent.
Hook: no words; the first frame is the blade already sliding along the tape.
Package: a small plain brown cardboard box with tape across the top, a little bigger than the lipstick, plain sides, crumpled blush tissue inside; a small box cutter lies beside it.
Beat 1, sealed: waist-up, phone propped on the vanity, frame still. Her left hand steadies the box; her right hand slices the tape once, slowly, and sets the cutter down.
Beat 2, reveal: on the cut, chest-up. She pinches @Object1 out between thumb and two fingers and brings it toward the lens; a smile and a breath out.
Beat 3, product focus: tight on the lipstick near the lens; she pulls the cap off.
Beat 4, satisfaction: on the cut, three-quarter, the open lipstick held beside her face, the vanity and the room behind her.
Product: Velvet Lipstick (@Object1), a gold metal tube with a rose bullet, about 8 cm long.
Setting: a white lacquer vanity, neutral daylight from one window, a plain wall behind her.
Sound: room sound only: the slice of the tape, the flaps, the tissue, the cap's soft click, a breath.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<lipstick photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 12 }
}
```

## 5. Quick reveal, 10 s

The person: "A quick 10 second unboxing of our water bottle." Three shots: the product focus
folds into the reveal. A 1 L bottle is heavy: both hands, a lean, real delight.

```
Idea: @Avatar1 opens a plain box on the kitchen counter and lifts out the Tide 1 L bottle.
Register: natural.
Hook: "Why is this box so heavy?" Her hands already grip the box's sides.
Package: a plain brown cardboard delivery box with tape across the top, a little bigger than the bottle, plain sides, crumpled sky blue tissue inside; a small box cutter lies beside it.
Beat 1, sealed: waist-up, phone propped on the counter. Her left hand steadies the box; her right hand slices the tape once and sets the cutter down.
Beat 2, reveal, the longest beat: on the cut, chest-up. She lifts @Object1 out with both hands, its front to the lens as in the photo: a lean forward, jaw set, a controlled breath out breaking into a grin.
Beat 3, satisfaction: on the cut, three-quarter, the bottle set on the counter beside her, her hand on it, ending mid-gesture.
Product: Tide Bottle (@Object1), a 1 L brushed steel bottle with a blue lid, held in two hands, about 28 cm tall.
Setting: a white quartz kitchen counter, neutral daylight from one window, a plain wall behind her.
Lines: about 16 words in all.
Language: English, American accent.
Sound: voice and room sound only: the slice of the tape, the flaps, the tissue, a breath out.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<bottle photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 10 }
}
```

## 6. Haul takes, one item each

The person: "A haul of the three pieces from our summer drop: linen shirt, canvas tote, silk
scarf." One take per item, joined in Video Studio (multi-take-assembly.md). The Setting,
Wardrobe, Register and Language lines are the same, word for word, in every take. Each piece is
lifted out and shown, not worn: a haul where she puts each piece on is a try-on
(`creatorline-try-on-video`).

Take 1 (12 s, the four beats with the first item):

```
Idea: @Avatar1 opens a summer drop box on her bed and pulls out the first piece, the linen shirt.
Register: natural.
Hook: "The whole summer drop, in one box." Her fingers are already at the tape edge.
Package: a plain brown cardboard delivery box with tape across the top, plain sides, crumpled cream tissue inside; a small box cutter lies beside it.
Beat 1, sealed: waist-up, phone propped at the foot of the bed. Her left hand steadies the box on the bed; her right hand slices the tape once and sets the cutter down.
Beat 2, reveal: on the cut, chest-up. She lifts @Object1 out with both hands and lets it unfold toward the camera; a small gasp. The open box sits at the edge of the bed.
Beat 3, product focus: tight on the wooden buttons near the lens, only her hands in frame.
Beat 4, satisfaction: on the cut, three-quarter, the shirt held up against her, the bedroom behind her.
Product: Linen Shirt (@Object1), an off-white relaxed linen shirt with wooden buttons.
Setting: a made bed with white sheets, neutral daylight from one window, a plain wall behind her.
Wardrobe: a cream crew-neck tee and light jeans.
Language: English, American accent.
Sound: voice and room sound only: the slice of the tape, the flaps, the tissue, a small gasp.
```

Take 2 (8 s, the next item from the open box; take 3 is the same with the scarf):

```
Idea: @Avatar1 pulls the second piece, the canvas tote, out of the already open box on her bed.
Register: natural.
Hook: "Number two." She is already lifting it out.
Beat 1, reveal: chest-up, phone propped at the foot of the bed. She lifts @Object1 out by its handles with her right hand, front to camera. The open box sits at the edge of the bed.
Beat 2, satisfaction: on the cut, three-quarter, the tote on her shoulder, a short verdict, ending mid-gesture.
Product: Canvas Tote (@Object1), a natural canvas tote with long black handles, an inside zip pocket.
Setting: a made bed with white sheets, neutral daylight from one window, a plain wall behind her.
Wardrobe: a cream crew-neck tee and light jeans.
Language: English, American accent.
Sound: voice and room sound only.
```

```json
{
  "brand_id": "<brand id>",
  "prompt": "<take 2's brief>",
  "inputs": { "objects": ["<tote photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 8 }
}
```

Each take holds one item in `objects`. Write all three briefs, then price all three takes and
the export before any of them starts, and ask once for the total.
