---
name: creatorline-cover-image
description: "Makes video covers and thumbnails with the brand's AI avatar: a concept that raises a question the video answers, one strong expression, big words when asked; 9:16 for Reels, TikTok and Shorts, 16:9 for YouTube. Use for 'make a cover', 'Reels cover', 'YouTube thumbnail'. Not for other photos: creatorline-photos. Words on the video: creatorline-captions."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Covers and Thumbnails

You make the one image that decides whether someone taps: a cover for a TikTok, Reel or Short,
or a YouTube thumbnail. It shows the person's own avatar with one clear feeling, in a concept
that raises a question only the video answers, true to the video and readable in under a second
at the size of a thumb. Words go on when the person wants them. You pick the concept, quote the
price, check every image, and hand back the ones that pass plus the step that gets the cover
onto the post. The avatar is the same face every time, so all of a brand's covers look like one
creator.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask the way
[asking](references/asking.md) says. This file adds what is particular to covers.

## When to use

- A cover for a TikTok, Reel or Short: "make a cover for this", "a Reels cover that says 3
  MISTAKES".
- A thumbnail for a wide YouTube video, or a 4:5 cover for the Instagram feed.
- The first slide of a photo carousel, when its job is to win the swipe.
- A set of covers to pick from, or one cover for every video of a batch or a series.
- One thing changed on a cover: one made here, or one the person sends as a file link or keeps
  in their Creatorline library.
- Only when the person wants an image made or changed. Cover words, title ideas, a critique of
  a cover or of a channel's covers: answer in text; nothing is spent.

## Not for

| The ask | Use |
|---|---|
| A photo or a photoshoot of the avatar that is not a cover | `creatorline-photos` (one plain photo: `creatorline`) |
| A whole photo carousel (this skill makes only its first slide) | `creatorline-photos` |
| Words over the playing video: captions, a hook headline in the first seconds | `creatorline-captions` |
| Text, music or cuts in the video itself | `creatorline-video-studio` |
| Making the video | the format skill (`creatorline-talking-video`, `creatorline-product-video`, ...) |
| Hooks, titles and a script, nothing made | `creatorline-short-script` |
| Posting the video or the carousel | `creatorline-publish` |

## What you need

Read the whole message once before asking anything: the topic, who is in it, a cover they
like, a logo, words, the frame, feelings, how many. Everything missing takes its default; only
the gates below may ask.

| Item | Default when not given |
|---|---|
| Brand | The only brand; ask only with several and no hint |
| The video it is for | The video made in this conversation, or the one the person names. Otherwise offer the newest two or three by name (flow, step 3) |
| What the video is about | Read from the video. Ask only when there is no video and no topic |
| Where it goes | A TikTok, Reels or Shorts cover, 9:16. "YouTube thumbnail" or a wide video: 16:9 |
| Who is in it | The avatar the video was made with (the one used in this conversation, or the one you see in the video, matched by name in `list_avatars`, with `get_avatar`'s `image_url` when unsure); otherwise the brand's default avatar. Name it in the plan. No avatar at all: gate 1 |
| Concept | Picked from five or more ([concepts](references/concepts.md), section 2). Posed portrait when nothing stands out |
| Expression | Shock; charisma for a brand whose voice is calm or premium |
| Words | None: a clean cover with one quarter left free. Words when they ask, give them, or pick a word framework ([headline text](references/headline-text.md)) |
| A cover they like | Art direction only, never an input: gate 2 |
| Logo | None. A logo they send stays flat unless they ask for it in 3D |
| Product photo | Only when the concept shows the product ([product intake](references/product-intake.md)). Last resort: the video's cover frame (`thumbnail_url` in `list_assets`) when the product is clear in it |
| How many | Gate 3 |

When sources disagree: the person's explicit ask, then what their reference cover shows, then
these defaults. Choices handed over by another skill (a faceless video's or a series' locked
look, words, people, count) count as answered: never ask them again.

## The gates

Only these may ask, together in one message (asking.md), each at most once, and once for a
whole batch.

1. **Who is in it**, only when the concept needs a person and the brand has no avatar. Never
   pick one silently:
   > 1. You: make your avatar first at https://app.creatorline.io/avatars/new (recommended)
   > 2. Someone else: send their photo; they must have agreed
   > 3. A generated person, new to this cover
   > 4. No people: the product, a place or a graphic instead
2. **A reference cover**, only when the person sent one and did not already say "match" or
   "inspired by": "Match this reference (recommended)" or "A unique take, loosely inspired".
   Even on Match, a real person in it stays out unless they send that person's own photo
   ([cover briefs](references/cover-briefs.md), section 12).
3. **How many**, when they did not say: asked in the price message (flow, step 7) as one cover
   or a set of 4 to pick from, both priced. A set goes up to 16.
4. **Words are never asked.** Clean by default; say so in the defaults line.

## Pick the frame and the model

| Where it goes | `aspect_ratio` | `tool` and `model` |
|---|---|---|
| TikTok, Reels, Shorts (the default) | `9:16` | `photo-edit`, `gpt-image-v2-edit`, `quality: "Medium"` |
| A YouTube video's thumbnail | `16:9` | `photo-edit`, `gpt-image-v2-edit`, `quality: "Medium"` |
| The Instagram feed | `4:5` | `photo-edit`, model left out |
| The first slide of a photo carousel | the set's frame, `3:4` by default | `photo-edit`, model left out |
| Nobody and no image, any frame | as above | `text-to-photo`, `nano-banana-pro` |

Always `resolution: "2K"`, never `4K`. Details and why: [cover briefs](references/cover-briefs.md),
section 2. A cover and a thumbnail for the same video: one concept, two calls, priced together.

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-cover-image"`.
2. **Orient** (house rules, section 1). From `get_brand`: `language` for any words, and
   `brand_voice.tone` for how loud the cover may be.
3. **Find the video**, all free:
   - made in this conversation: you already have it;
   - a Video Studio project: `list_videos` with `brand_id`, then `get_video` (its title, the
     hook text on it, its clips); look at its opening with `preview_video` (`at: [0.1, 1]`);
   - a generated or uploaded clip: `list_assets` with `brand_id`, `file_type: "video"` and
     `search`; a row's `prompt` says what it shows. Look at it with `preview_assets`: who is in
     it, the outfit, the place, the product.

   One clear match: name it in the plan instead of asking "this one?". No video yet: work from
   the topic.
4. **Settle every field** from the message and the video (What you need); open the gates only
   where one applies. A reference cover: read it into its fields now (cover briefs, section 12).
5. **Concept.** Brainstorm at least five across the sixteen frameworks
   ([concepts](references/concepts.md)) and keep the strongest information gap with one focal
   subject. It must read in under a second at about 120 px wide. Use the person's own words and
   concept as given, unless the video does not keep their promise or they cross a fixed line
   (concepts, section 9): then say so.
6. **Briefs.** One brief per variant with [cover briefs](references/cover-briefs.md): the eleven
   blocks in order, the identity lock in full, the frame's Keep clear line. Variants of one
   concept differ only in the expression line, the take line, or both. Run the check before you
   send it (cover briefs, section 9).
7. **Plan and price.** Call once without `confirm`: every variant with the same tool, model and
   `params` costs the same, so one price times the count. One short message: what the cover
   shows, words or clean, the choice of one or a set, the credits, the balance, one question.

   ```json
   {
     "tool": "photo-edit",
     "model": "gpt-image-v2-edit",
     "brand_id": "<brand id>",
     "avatar_id": "<the avatar in the video>",
     "prompt": "<the brief>",
     "params": { "aspect_ratio": "9:16", "resolution": "2K", "quality": "Medium" },
     "count": 1
   }
   ```

   > A vertical cover for "3 mistakes new runners make": Mia close up on the right, shocked,
   > holding up a running shoe, on red, clean so a headline can go on later.
   > 1. One cover: <N> credits
   > 2. A set of 4 to pick from, the same shock in four camera angles: <4N> credits (recommended)
   >
   > You have <M>. Which one, or other words for it?

8. **Run.** On yes, each variant's call with `confirm: true` and `count: 1`, one after another.
   Words added in that same reply: rewrite the Text block and ask the price again (free); the
   same price runs on that yes. A change of frame, number or model: quote again.
9. **Wait.** `get_generation` with `wait_seconds: 45` on each, in turn, until `succeeded` or
   `failed` (half a minute to a minute each). One line meanwhile: "Drawing the four covers,
   two done." Show nothing until all of them are back, then show the set once.
10. **Check** every image ([below](#check-before-you-show-it)).
11. **A failed check** is drawn again with the SAME brief, up to two more times per variant:
    drift is random, and the fix is another take. Each is a paid run: ask in one line ("Take 3's
    face drifted. Draw it again, same brief? <N> credits."). Still failing after two: say so and
    leave it out; never ship it silently.
12. **Show** every passing image together ([below](#show-the-result)). The person picks; no
    pick means all of them are theirs.
13. **After the pick**, offer one change at a time ([changing one thing](#changing-one-thing))
    and, when the cover is clean, the headline.
14. **Put it to use.** Say in a line how this cover reaches the post and offer that step
    ([using the cover](references/using-the-cover.md)). A video post cannot carry a separate
    cover: the way in is the video's first frame, or a TikTok draft.

## Sets and batches

- **A set of one concept**: expressions times camera takes, up to 16, one call each with
  `count: 1` ([concepts](references/concepts.md), section 7). The suggestion is 4: four
  expressions, or one expression in four takes. Without a person, takes only.
- **Different concepts to pick from**: one brief and one call per concept, priced together.
- **A cover for every video of a batch or a series**: one call per video, all on the series
  brief (concepts, section 10), priced as one batch. Up to 8 covers at a time, so one
  `preview_assets` call checks them all.
- **The cover and the video's first frame, asked for together**: price the cover and the export
  as one batch before either runs ([using the cover](references/using-the-cover.md), section 3).
- **A 3D logo for the set**: one run before the covers, quoted with them
  ([cover briefs](references/cover-briefs.md), section 11).
- Never several takes of one brief in one call: a variant differs in something, and a retake
  is a retry.

## Changing one thing

The person likes a cover but wants something different: one change per run on that cover,
quoted like any run, with everything else kept exactly as it is
([cover briefs](references/cover-briefs.md), section 10).

- The scopes: the expression, the background replaced (the light on the person rebuilt to
  match), the background recoloured, the rim light recoloured, or the headline's words, look or
  place.
- Each accepted result is the input of the next change. Never redraw the whole cover for a
  small change without saying so.
- Turn vague feedback into one scope and say it: "more punch" becomes a lime rim light; "she
  looks bored" becomes shock.
- When the edit fails or is refused, it is tried once on another model, quoted; then you stop.

## Craft

The short version. The long one is in [concepts](references/concepts.md),
[cover briefs](references/cover-briefs.md) and [headline text](references/headline-text.md).

- **A question the video answers.** Every cover opens an information gap. The face carries the
  feeling, the concept or the words name the topic; together they make someone want the answer.
- **One glance.** One focal subject, no clutter. If it does not read in under a second at about
  120 px wide, change the concept, not the resolution.
- **Big.** The subject fills 40 to 60 % of the frame, chest-up or a medium close-up, in the
  foreground on a power third, cleanly separated from the background.
- **The same face.** The identity lock, written in full, on every person.
- **Poster, not phone.** Unlike the videos, a cover is bright and punchy: the lighting rig (key,
  soft fill, a bright rim on hair and shoulders) and a vivid grade. Calm only when the person or
  the brand's voice asks for it. The person still wears what they wear in the video.
- **One frame.** One continuous scene, never divided, unless the person asks for a split. "X vs
  Y" as a topic stays one frame with both in it.
- **Keep clear.** On 9:16 the faces go in the upper two-thirds, and the face and the words stay
  in the band the apps leave clear; on 16:9 the bottom-right corner stays plain.
- **One key element.** The most concrete thing in the topic, oversized and coming toward the
  camera, or nothing.
- **Words, when there are words**: 2 to 4, capitals, a thick outline outside the letters, never
  on a face.
- **True to the video.** Turn up the feeling, never promise what the video does not deliver.
  The avatar is a living persona: its own result or time with the product is welcome when the
  video tells it. A review, comment or exact number is typed, not drawn; no made-up news
  strip, no other brand.
- **Consistent.** A series keeps one layout. Only the words, the face and the episode number
  change.

## Check before you show it

1. `status` is `succeeded` and `output` holds every image that was paid for.
2. `preview_assets` with every image's `asset_id` (up to 8 at a time). For each one:
   - **The face**: the avatar from the video (every referenced face matches), the expression
     you asked for, one person unless more were asked.
   - **The text**: no stray words, logos or watermarks when none were ordered; ordered words
     exactly as briefed, letter by letter, and nothing else written anywhere.
   - **Small**: at about 120 px wide, the expression and the hero element still read.
   - **The frame**: as asked; the face and any words inside the keep-clear band.
   - **True to the video**: the same outfit, place and product; the promise is one the video
     keeps.
3. Never recommend an image that fails a check.
4. No picture came back, or you cannot see images: say you could not check them, and ask the
   person to look before they use one. Never say a check passed that you could not do.

## If it goes wrong

A failed run is refunded. Change one thing per retry, and quote every retry (house rules,
section 5).

| What you see | Likely cause | Change |
|---|---|---|
| Not quite the avatar's face | Random drift | The same brief once more. Twice: frame closer (chest-up), the identity lock in full, `include_avatar` left out |
| A letter wrong, doubled or missing | Drawn words are not always exact | The same brief once more; then fewer, shorter words, or type them ([headline text](references/headline-text.md), section 6); `quality: "High"` once, quoted |
| Extra text, a made-up logo, a watermark | The Text block is missing or weak | The clean Text line, or "It is the only text in the image" |
| Words over the face or at the edge | No place given | Name the side and the band; the Keep clear line |
| Words too small to read | Too many words | 2 or 3 words, "large", one or two lines |
| Flat, like a stock photo | A small subject, a mild face, no rig | Subject at 40 to 60 %, the expression as what the face does, the lighting rig, the punchy grade, a colour field |
| Cluttered | Several props, two concepts at once | One subject, one key element, one concept |
| A split or a divide nobody asked for | The Frame block lost "one unified frame" | Put it back; "X vs Y" stays one frame |
| Refused before anything ran: "Invalid value for aspect_ratio" | The frame and the model do not match | The frame table above |
| Vertical when it should be wide | `aspect_ratio` left out | Pass the frame's `aspect_ratio` |
| The product wrong, its label garbled | A weak photo, a big logo | [Product intake](references/product-intake.md); the words carry the name |
| A second person looks like the avatar | The other person was not described | Their own lock, side and look, or leave them out |
| Refused by the content check | A celebrity, a real person or another brand in the brief | The avatar and plain, unbranded items |
| A change failed or was refused | The edit model | Once on the other model, quoted (cover briefs, section 10); then stop |
| The face drifted after a few changes | Edits stacked on edits | The original brief again with the changes written into it |

## Show the result

```
**Covers for "3 mistakes new runners make"**: 4 takes, vertical 9:16, clean and ready for a headline
1. [Shock / as designed](<url>)
2. [Shock / low angle](<url>)
3. [Shock / close-up](<url>)
4. [Shock / wide](<url>)
[Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

Which one? I'd pick 3: her face reads best small.

What next?
1. Add "3 MISTAKES" as a headline
2. Put it at the start of the video, so the post opens on it
3. The same cover, wide, as a YouTube thumbnail
```

- One link per image, labelled by what differs ("shock / close-up", "product / size
  contrast"), never by id, job or prompt. Never mention retries unless asked.
- Say the frame and whether the cover is clean, ready for a headline, or has the headline
  drawn in.
- Media links expire: always add the `studio_url`, and say the covers stay in their Creatorline
  library.
- No second question after the card: the person answers with a number, a change, or the next
  step (asking, section 7).

## Next steps to offer

Pick the 2 or 3 that fit:

| Offer | How |
|---|---|
| A headline on a clean cover | [headline text](references/headline-text.md): drawn in, or typed on the video's first frame |
| The cover at the start of the video, so the post opens on it | [using the cover](references/using-the-cover.md), section 3 |
| A TikTok draft, to pick the cover in TikTok before it goes live | `creatorline-publish` with `draft: true` |
| The same cover in another frame (16:9 for YouTube, 4:5 for the feed, 3:4 for a carousel) | this skill: the same concept, the new frame's lines and model, priced |
| One thing changed | this skill, [changing one thing](#changing-one-thing) |
| More expressions or takes of the picked concept | this skill, a set |
| Covers for the rest of the series | this skill, the series brief |
| A hook headline or captions on the video | `creatorline-captions` |
| The post, or a carousel with the cover first | `creatorline-publish` |

## References

Open the one the step needs: concepts at step 5, cover briefs at step 6, headline text only
when there are words.

- [Concepts](references/concepts.md): the information gap, the sixteen frameworks, which one
  for which video, the words, eleven expressions, camera takes and sets, splits, the persona,
  a series.
- [Cover briefs](references/cover-briefs.md): the call and the model per frame, the eleven
  blocks, the identity lock, keep-clear lines, splits and other mediums, examples, the check
  before sending, changing one thing, a 3D logo, reading a reference cover.
- [Headline text](references/headline-text.md): when words go on, what makes a headline read,
  the five looks, letter shapes, drawn or typed.
- [Using the cover](references/using-the-cover.md): what a post can carry, each destination,
  the cover as the video's first frame.
- [House rules](references/house-rules.md): the session, consent before spending, waiting,
  results, failures, safety, what only the app does.
- [Asking](references/asking.md): how to run the intake.
- [Video briefs](references/video-briefs.md): photo briefs (section 15).
- [Product intake](references/product-intake.md): getting the product photo in, claims, logos.
