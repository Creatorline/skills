# Checklists

Three checks: the brief before you quote, the cover before you show it, and the post package
after.

## Contents

1. [Before you quote: the brief](#1-before-you-quote-the-brief)
2. [Before you show it: the cover](#2-before-you-show-it-the-cover)
3. [The post package](#3-the-post-package)

## 1. Before you quote: the brief

Fix any line that fails, then quote. A fix after the run is a paid retry.

**The moments**
- Intro, use, second use, result, in that order, paired into shots by length (SKILL.md, Craft).
- The second use is a different action, target, surface or setting, not a closer crop.
- The result is what the uses did, or the product from an angle, scale or surface the intro did
  not have; never the intro's picture.
- Later takes or clips bring new uses and angles and never re-introduce.

**The shots**
- Each shot names its distance and its phone position; with three shots or more, one close, one
  medium and one wide at least; no two neighbours alike.
- Each shot line is motion, with two or three physical details (a glint, a click, mist drifting,
  the carpet flattening), and at least one thing that changes inside it.
- Propped shots: no handheld, shake, drift or sway. First-person shots: no phone, mirror,
  reflection, screen or "over the shoulder".
- Neutral daylight is named; none of the words in shot-grammar.md, section 2.

**The product**
- "Exactly one <product> in frame"; nothing look-alike nearby.
- The card is the same in every brief: size against a hand and in centimetres, the mechanism
  phrase, the "Has only" line written as what is there.
- Each hand's job is named, two at most, the idle hand parked; the grip suits the weight.
- One interaction and at most one change of state per shot; the cap is gone once off; the
  product is opened on screen before anything comes out; the right place on the body or surface.
- Cause before effect: the result is what the uses acted on.
- No wording that makes an action repeat ("sprays again", "back and forth", "presses
  repeatedly").
- No mirror or reflective surface; the brand's name on the product only; no legible text on
  other props.

**The people**
- Hands or a cropped body only, described by function, the voice's gender, the mouth closed
  whenever any of the face shows.

**The words**
- The band for this length (voiceover.md, section 2); the first phrase in 0.4 s; no greeting or
  banned opener; one phrase per moment; nothing said twice; no bracketed sounds.
- The person's must-say and never-say words, and any approved list, are kept; no promise that it
  cures, treats or prevents a disease, or guarantees income or a return (truth-and-safety.md,
  section 3); none of the brand's don'ts.
- A line that points at something to see has the shot that shows it; the persona's own story
  needs none.
- Voice gender and accent in the Format line, the same for every take and clip.
- A Music line only when asked; `Language:` when not English.

**The call**
- Path A: `model: "veo3-1-reference-to-video"`, `include_avatar: false`, `duration` a multiple
  of 8, sound left on. Path C: no `model`, the product in `objects`. Path D clips:
  `generate_audio: false`. Path B: no `@` tokens and no `ugc_style`.

## 2. Before you show it: the cover

`preview_assets` with the output's `asset_id` shows one frame. Check what it can show:

- One of the product, no clone, nothing look-alike beside it.
- At most two hands per person: look at the frame's edges.
- The product's shape, colour, size against the hand, and only sides its photo shows.
- Caps, buttons and props in the state the brief gave them; the features it lacks still absent.
- The label not garbled, mirrored or turned into another brand; no other logo.
- No text or subtitles drawn into the frame.
- No face on paths A and B; on path C, no face above the crop.

A failure here: give the take a verdict (house-rules.md, section 5) before any new spend. What
the cover cannot show (the voice, the later shots), tell the person to watch for in one line.

## 3. The post package

Offered after the result, written in chat, free. Nothing of it is burned into the video.

- **Caption**: in the brand's voice, built to start comments: it ends on an open question or an
  open loop the video sets up.
- **3 to 5 hashtags.**
- **A comment to pin**: it answers the open loop, or adds one detail the camera showed. The
  person pins it themselves once the post is live; no tool does this.
- **Disclosure**: `#ad` opening the caption when someone other than the account's owner paid
  for the post (a brand's own product on its own account needs none); `made_with_ai: true` on
  the post. Both are defaults the person may switch off (house-rules.md, section 7).
- **The loop note**: one line on why the ending runs back into the start.

Then, on a yes, `create_post` with the caption, the hashtags and `made_with_ai: true`: it lands
in the review queue (`creatorline-publish`).
