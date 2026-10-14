# Checklists

Three checks: the brief before you quote, the cover before you show it, and the post package
after.

## Contents

1. [Before you quote: the brief](#1-before-you-quote-the-brief)
2. [Before you show it: the cover](#2-before-you-show-it-the-cover)
3. [The post package](#3-the-post-package)

## 1. Before you quote: the brief

Fix any line that fails, then quote. A fix after the run is a paid retry.

**Shape**
- The mode and the shape (or the format) are named; in story mode, the story stands with the
  product deleted, and the product enters at about 40 to 60 %.
- One hook pattern, written as staging; the first word or sound within 0.4 s; no banned opener.
- Every item the brief promises is written out ("3 tips" means three tips).
- The beats fit the shots for this length (story-mode.md, section 6); the second section of a
  30 s clip does not greet or re-introduce.
- The last shot ends in motion; the verdict is in it; no spoken call to action.

**Words**
- Every line is written out under `Lines:` with "Use these lines as written."
- The count sits in the right band for this clip (monologue-craft.md, section 6).
- None of the banned words; no stretched or respelled words; at most two capitalized words per
  line; no token inside speech; no dramatic pause written in.
- Bracketed sounds only at the very start, only in the natural or hyped register.
- None of the brand's don'ts or the words the person ruled out; an approved-claims list, when
  given, is kept; no cure, treatment or guaranteed-return promise (truth-and-safety.md, section 3).
- `Language:` is there when the speech is not English; an accent is described strongly.
- The hook headline (at most 6 words) is saved.

**Performance**
- The register matches the person's own energy words; the delivery line is one sentence.
- One or two peaks, each with one body move; a quirk never on a peak.
- At least one closed-mouth beat; one unguarded beat (unless deadpan); one goofy beat (unless
  calm or luxury).
- No "smiles at the camera", no "holds the product and talks".

**Staging**
- Every shot differs from its neighbour in phone position or distance.
- No handheld words in a propped shot.
- Each hand has one job; never more than two jobs; the idle hand is parked.
- The product is in frame only when the shot uses it, otherwise fully put away.
- One interaction with the product per shot; the cap coming off is written; the right place on
  the body.
- No wording that makes an action loop ("sprays again", "back and forth", "keeps pressing").
- Only props you supplied or the setting plainly holds.
- Neutral daylight is named; no film words; `Cinematic` only on request.
- A Music line only when asked; `Sound: voice and room sound only` when the voice step runs.

## 2. Before you show it: the cover

`preview_assets` with the take's `asset_id` shows one frame. Check what it can show:

- The right avatar; one person, or the people the format has.
- One of the product, and no look-alike copy beside it.
- At most two hands per person: look at the frame's edges.
- The product's size against the hand, as on the card.
- Caps, buttons and props in the state the brief gave them; features it lacks still absent.
- The label not garbled, mirrored or turned into another brand.
- No text or subtitles drawn into the frame.
- No doubled lip edges; the face matches the avatar.
- The setting and the light you briefed.

A failure here: give the take a verdict (house-rules.md, section 5) before any new spend. What
the cover cannot show (the lips through the clip, the voice, the cuts), tell the person to watch
for in one line.

## 3. The post package

Offered after the result, written in chat, free. Nothing of it is burned into the video.

- **Caption**: in the brand's voice, built to start comments: it ends on an open question or an
  open loop the video sets up.
- **3 to 5 hashtags.**
- **A comment to pin**: it answers the open loop, or adds one detail the camera showed. The
  person pins it themselves once the post is live; no tool does this.
- **Disclosure**: `#ad` opening the caption when someone other than the account's owner paid
  for the post; a brand's own product on its own account needs none. The person may switch it
  off (house-rules.md, section 7).
- **The loop note**: one line on why the ending runs back into the start.

Then, on a yes, `create_post` with the caption, the hashtags and `made_with_ai: true` (a
default the person may switch off): it lands
in the review queue (`creatorline-publish`).
