# Unboxing craft

What separates an unboxing people watch to the end from one they scroll past. Use it while
you write the brief. The brief carries the idea and the facts; the server's writer turns them
into shots (video-briefs.md, section 1), so describe what happens, never camera settings.

## Contents

1. [The beats in depth](#1-the-beats-in-depth)
2. [The package](#2-the-package)
3. [How each package opens](#3-how-each-package-opens)
4. [Holding it for its size](#4-holding-it-for-its-size)
5. [Hands and the phone](#5-hands-and-the-phone)
6. [The reaction](#6-the-reaction)
7. [Hooks](#7-hooks)
8. [Honest details and what the avatar never says](#8-honest-details-and-what-the-avatar-never-says)
9. [Variants in practice](#9-variants-in-practice)

## 1. The beats in depth

1. **The sealed package (the hook).** The first frame is already moving: fingers at the tape, the
   box sliding a few centimetres toward the camera, a knuckle tapping the lid. The product is
   not visible yet: the not-knowing is the hook. The package rests on the table; it is never
   tossed or carried around.
2. **The open.** One clear action (tape, flap, lid, sleeve). The moment it goes from closed to
   open falls between two shots, so the cut hides it. Tissue paper shows for a moment as the
   flaps fall open.
3. **The reveal.** The one real peak of the video. The product comes up from box level toward
   the chest, label to camera. The box drifts to the frame's edge or out of it.
4. **First touch.** One physical thing that proves it is real in the hand: a cap unscrewed, a
   case clicked open, a strap pulled, fabric rubbed between finger and thumb. One action only.
5. **Reaction.** One human-sized moment: a small gasp, a laugh, a hand to the chest, a slow
   head shake. It belongs to the reveal or right after it, never spread over every beat.
6. **One honest detail.** One specific, true observation (section 8). It is what makes an
   unboxing feel like a person and not an ad.
7. **Verdict.** The product held beside the face or at chest height, chest-up framing, a
   short verdict. Nothing new is claimed here. The call to action ("link in bio", a code)
   belongs in the caption or as on-screen text.

## 2. The package

| The person has | Do |
|---|---|
| A photo of their real package (shipping box, mailer, gift box, retail box) | Find it with `list_assets` or bring it in with `import_asset`, and pass it second in `objects`, after the product, so it is `@Object2`. Write in the brief how it opens. Show only what the photo shows: tape, tissue or a card only when the photo has them. |
| No photo | A plain kraft-brown shipping box a little bigger than the product, clear tape across the top, tissue inside. No logos, labels or stickers. |
| A soft product (clothing, a scarf, a bag) and no photo | A padded mailer or a plain mailer box instead of a carton. |
| The product's own retail box is the package | Only with a photo of that box (a packshot showing product and box together can serve as both: say "@Object1 comes out of its own box"). Without one, a plain box: a retail box written from words comes out with invented print. |

- Never invent branding on a box. A generated logo comes out garbled and pretends to be the
  brand. When the box must carry the brand, it comes from their photo.
- A big logo on a real box can come out slightly off: warn once (product-intake.md,
  section 5).
- An insert card or a note: keep it face down, or show it only from their photo. Readable
  words inside the video are never exact.

**Tissue colour,** only for a plain box or when their photo shows tissue:

| The product is mostly | Tissue |
|---|---|
| Pink or red | Blush pink |
| Blue or green | Pale aqua |
| Black or dark | Cream or warm grey |
| White or pastel | A soft pastel that contrasts with it |
| Many colours, or unsure | Cream |

The tissue is background: it shows for a moment when the box opens and is never the subject.

## 3. How each package opens

Name the action in the brief so the hands do one believable thing.

| Package | The opening action |
|---|---|
| Taped shipping box | Peels the clear tape off in one long strip, folds the flaps back |
| Padded mailer | Tears along the top strip |
| Mailer box with a tuck flap | Lifts the front flap up and back |
| Lift-off lid | Lifts the lid straight up with both hands |
| Magnetic flap | Swings the flap open; it lets go with a soft click |
| Sleeve over a tray | Slides the sleeve off sideways |
| Drawer box | Pulls the tray out by its ribbon or tab |
| Zip pouch | Unzips it along the top |

Read the opening off their photo when you can. When you cannot tell, ask once inside the
intake, or choose the simplest action the photo allows. Peeling tape is safer on camera than a
blade.

## 4. Holding it for its size

Decide the class before you write. When in doubt, choose the heavier one.

| Class | Examples | How it comes out and is held | Surface |
|---|---|---|---|
| Tiny | Ring, earrings, lipstick, earbuds | Between thumb and two fingers, brought toward the lens at chest height | Desk, vanity, bedside table |
| Light | Serum, phone case, a folded tee, a candle | One hand; the other hand is free for a gesture | Desk, kitchen counter |
| Bulky but light | Sneakers in their box, a pillow, a plush toy | Two hands, no strain | Table or bed |
| Heavy | Kitchen appliance, cast-iron pan, a large bottle | Two hands, a small lean as it comes up, set down on the table before the reaction, with real delight on the face | A sturdy table |
| Big | Chair, bike, a large appliance | Stays on the floor; the avatar kneels beside it and opens the box where it stands | Living room floor |

- A pair (shoes, earrings) counts as one product.
- Real scale: the product is as big as it really is. A small thing comes closer to the lens; it
  never grows.
- The surface fits a real home and stays tidy: light wood, white counter, a clean rug. Only the
  package and the product are on it, so nothing can be mistaken for a second product.

## 5. Hands and the phone

- Default: the phone is propped on the table facing the avatar, so both hands are free. One
  hand steadies the box, the other opens it.
- A selfie angle leaves one hand: use it only for a tiny product that opens one-handed.
- One hand action per beat. Opening, lifting and turning the product are three beats, not one.
- A hand that has nothing to do rests on the table or on the box. Say so when two hands are
  busy in the beat before.

## 6. The reaction

Pick the register from the person's words first, then the brand's tone (`brand_voice.tone`).

| Register | When | The reveal | The lines |
|---|---|---|---|
| Natural (default) | Most brands | A small gasp or a laugh, a hand to the chest | Short and warm |
| Excited | The person says hyped, excited, high energy, or the brand is loud | A bigger gasp, a quick lean toward the lens | Faster, louder, still short |
| Calm | Luxury, skincare, tech; a quiet brand | A slow breath out, a soft "oh", a long look | Few words, slow hands |
| Silent (ASMR) | ASMR, satisfying, no talking | A small smile | None |

One peak per video. A reaction on every beat reads as acting. Avoid screaming and staged shock:
the most believable reaction is a person who likes what they see.

## 7. Hooks

The first line is the most specific moment, already happening. No greeting, and never open on
"so", "okay", "wait" or "hey guys".

| Shape | Example line |
|---|---|
| The weight | "This box is heavier than it has any right to be." |
| The arrival | "It's here. First look at the new Glow C Serum." |
| The size gap | "Why is the box this big?" |
| The drop | "The whole spring drop, in one box." |
| The question | "What do you think fits in a box this small?" |
| The sound (quiet variant) | No words: the tape coming off in one long pull |

Give the writer the hook line in quotes when you want it word for word; otherwise give its
shape and let the writer word it in the avatar's voice.

## 8. Honest details and what the avatar never says

**One honest detail** is a true, specific thing the camera shows or the label prints, said in
the present tense. Pick one.

| Kind | Example |
|---|---|
| Size in the hand | "It's smaller than you'd think. It fits in my palm." |
| Weight | "It's heavy. It feels solid." |
| Material or finish | "The cap is metal, not plastic." |
| How it works | "The lid closes with a magnet. Listen." |
| What is in the box | "It comes with a pouch and a spare tip." |
| A label fact | "Unscented, it says so right here." |
| A small quirk, only when the brand is fine with it | "The box is way bigger than it needs to be." |

Never: a result over time ("my skin cleared"), a use history ("I've had it for weeks"), a
rating, a comparison with another brand, a health or income promise, or a review or comment
on screen that the person did not supply. The full list is house-rules.md, section 7.

**PR and gifted framing.** A PR box is a look (a curated mailer, tissue, a card), not a claim.
The avatar never says a brand "sent" or "gifted" it something unless that is true for the
account that posts it, and then the post's caption discloses it (#ad, or #gifted when it was
a gift). On the brand's own account, frame it as the brand's own launch: "the new launch box",
"first look at the spring drop".

## 9. Variants in practice

**Classic.** The seven beats at 15 s. One product, one reveal.

**PR or launch box.** 15-20 s. Their own box photo makes it: the brand's real mailer is the
star of the first two beats. Tissue, a card face down, the product presented like something
special. The verdict can mention when it launches only if the person gave the date.

**Quiet (ASMR).** 10-15 s. Write "@Avatar1 stays quiet; the tape, the tissue and the lid are
the only sounds." and, as the Sound line, "room sound only: the tape, the tissue paper and the
lid". Slower hands, longer holds; the reveal still lands as a peak, with a smile.

**Full first look.** 20-25 s, one take. After the first touch, one short first use that the
camera can show at once: earbuds go in, a lipstick swatch on the back of the hand, a mug
filled. Nothing that needs time to show a result. A real step-by-step belongs to
`creatorline-tutorial-video`.

**Haul.** One item per take, 8-12 s each, joined in Video Studio with numbered item labels
(multi-take-assembly.md). Take 1 opens the package; later takes start with the box already
open and lift out the next item.
