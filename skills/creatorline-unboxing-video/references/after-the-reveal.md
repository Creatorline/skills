# After the reveal: unboxings over 15 seconds

The first 15 seconds are always the four beats (unboxing-craft.md, section 1). Everything after
them is post-reveal: the box is gone for good, and each further section is a small story of its
own with the product.

## Contents

1. [Sections by length](#1-sections-by-length)
2. [The four post-reveal shapes](#2-the-four-post-reveal-shapes)
3. [Rules for every later section](#3-rules-for-every-later-section)
4. [First use: mechanics that render](#4-first-use-mechanics-that-render)
5. [A 30-second brief](#5-a-30-second-brief)

## 1. Sections by length

| Length | Sections | How it is filmed |
|---|---|---|
| 4-15 s | 1: the four beats | One take |
| 16-19 s | 2 of equal length: the four beats, folded to fit, then one post-reveal shape | One take |
| 20-30 s | 2: the four beats (15 s), then one post-reveal section (the rest) | One take |
| 31-45 s | 3: 15 s, 15 s, the rest | One take per section, joined in Video Studio |
| 46-60 s | 4 | One take per section, joined |
| Over 60 s | One per 15 s, the last at least 4 s | One take per section, joined |

- Up to 30 s, write the sections into one brief as `Section 1:` and `Section 2:` lines: one take
  holds 30 s and has no joins.
- Over 30 s, each section is its own `generate_ugc_video` call with its own brief, joined in
  order with `create_video` (multi-take-assembly.md). A section that fails is filmed again on
  its own; the others stay.
- Each section is about 15 s and holds 4 shots of at least 3 s: introduce, develop, land.
- Words per section follow the same bands as the first: 28-35 for a 15 s section, 20-28 for
  11-12 s, 12-20 for 10 s or less.

## 2. The four post-reveal shapes

Each shape runs introduce, develop, land. Never use the same shape in two sections in a row.

| Shape | Introduce | Develop | Land |
|---|---|---|---|
| First use | In position to use it | The exact mechanic begins (section 4) | The visible result, then a verdict laugh with the result in frame |
| Wrong turn | The expected place to use it | It is carried somewhere unexpected but plausible; the twist is staged big | A deadpan look or a grin as the punchline |
| Close study | At arm's length | One detail up close, then a second detail from a new distance | A reaction |
| Show-off | A conspiratorial lean, the product half raised | Shown like a secret, then a tight detail | A wide beat of ownership |

Pick the shape the product can honestly show: First use for anything used on the spot
(cosmetics, earbuds, a mug), Close study for craftsmanship (a bag, a watch, a candle), Show-off
for something to be proud of, Wrong turn for a light, playful brand.

## 3. Rules for every later section

- **The box never returns.** No package, no tape, no tissue; the product is never packed again
  and no earlier frame is recreated.
- **One unit of the product,** as in the first section. Nothing of the same shape nearby.
- **Exactly one visual twist** per section: one thing the viewer did not expect to see. None is
  flat; two cannot be read.
- **Every beat reads from the picture alone.** If a beat only makes sense because of what is
  said, show more and say less.
- **Opens mid-thought.** No greeting, no opening sound, no naming the product again; the first
  word is already the next idea.
- **Denser, not faster.** A later section says more specific things in the same number of words.
- **Same room, same clothes, same voice.** Copy the Setting, Wardrobe, Register and Accent lines
  word for word from the first section's brief, with a new room only when the shape needs one
  (Wrong turn).
- **Seated, calm peaks** (a hand to the chest, a slow breath) suit a closing section; the big
  body events belong to the first.
- **The last section ends loopable:** mid-gesture (performance.md, section 11).

## 4. First use: mechanics that render

- **Fix the mechanism once and reuse it word for word** in every beat and section: "a pump on
  top, pressed straight down, the cream comes out of the nozzle onto her palm".
- **Cause before effect.** No result appears before the action that makes it is on camera.
- **Caps first.** A cap comes off as its own motion before anything comes out, and a removed cap
  is gone for the rest of the video. An opened product is never closed again in a later section.
- **One interaction per beat:** one press, one swipe, one sip. Several uses become several beats.
- **The right place on the body,** whatever the person's words said:

| Product | Goes on |
|---|---|
| Perfume, body mist | Wrist or neck, never the palm or the face |
| Cream, serum | Fingertips first, then the skin |
| Lipstick, lip product | Lips only |
| Powder | Cheek, with a brush |
| Mascara | Lashes |
| Eyeliner | The lash line |
| Hair product | The hair, mid-lengths to ends |
| Food, drinks | The mouth |
| Tech | Held, shown and pointed at; no cables and no button sequences |

- **Never write a loop:** "sprays again", "keeps spraying", "presses repeatedly", "taps twice",
  "back and forth", "opens and closes", "unscrews and screws back", "several coats". The model
  reads them as a motion that repeats forever.
- **Nothing that needs time, on camera.** A result that takes minutes or days (skin, hair
  growth, a battery charge) cannot be shown in one take. The persona may say it ("three weeks
  in, my skin's calmer"), or two takes are cut together in Video Studio.

## 5. A 30-second brief

The person: "A 30-second first look at our Pulse earbuds, unbox and try them." One take, two
sections.

```
Idea: @Avatar1 unboxes the Pulse earbuds at a kitchen counter, then tries them on the spot.
Register: natural.
Section 1, the unboxing (about 15 s):
Hook: "What do you think fits in a box this small?" Her fingers are already at the tape; a small box cutter lies beside the box.
Package: a plain brown cardboard delivery box with tape across the top, a little bigger than the case, plain sides, light grey tissue inside.
Beat 1, sealed: waist-up, phone propped on the counter. Her left hand steadies the box where it rests; her right hand picks up the cutter and slices along the tape once, sets it down.
Beat 2, reveal, the longest beat: on the cut, chest-up, she pinches @Object1 out between thumb and two fingers and brings it toward the lens; a soft gasp, her free hand to her chest. The open box sits at the edge of the counter.
Beat 3, product focus, the shortest: tight on the case near the lens, only her fingers and her chin in frame; she clicks it open.
Beat 4, satisfaction: on the cut, she holds the phone at arm's length; the counter and the room behind her, the case in her other hand, a settled grin.
Section 2, first use (about 15 s):
Introduce: three-quarter, phone propped again, she takes one earbud from the case.
Develop: chest-up, she puts it in her right ear and tilts her head, listening; her lips stay closed for a moment.
Twist: the music reaches her and she breaks into a small shoulder dance at the counter, the earbud staying put.
Land: waist-up, a verdict laugh, the case in her hand, ending mid-gesture.
Product: Pulse Earbuds (@Object1), a matte white pill-shaped case that fits in one palm, about 6 cm long, two white earbuds inside, a magnetic lid. Page: <the product page link the person gave>
Setting: a white kitchen counter, neutral daylight from one window, a plain wall behind her.
Lines: about 30 words in each section, no greeting in section 2.
Language: English, American accent.
Sound: voice and room sound only: the slice of the tape, the flaps, the tissue, the case's click, a soft gasp.
```

`generate_ugc_video`:

```json
{
  "brand_id": "<brand id>",
  "prompt": "<the brief above>",
  "inputs": { "objects": ["<earbuds photo asset id>"] },
  "params": { "ugc_style": "Unboxing", "duration": 30 }
}
```

The page link lets the writer read real facts; the slot still needs the photo file.
