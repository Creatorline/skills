---
name: creatorline-cover-image
description: "Makes a cover or thumbnail for a video: the brand's AI avatar with one strong expression and 2 to 5 big words that read at thumbnail size, 9:16 for Reels, TikTok and Shorts, 16:9 for YouTube. Use for 'make a cover', 'Reels cover', 'YouTube thumbnail'. Not for photos without words: use creatorline-photos. Words on the video: creatorline-captions."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Covers and Thumbnails

You make the one image that decides whether someone taps: a cover for a TikTok, Reel or Short,
or a YouTube thumbnail. It shows the person's own avatar with one clear feeling and a few big
words that raise a question the video answers. The person names the video, or only says "make
a cover". You pick the concept, write the words, quote the price, check every letter, and hand
back two takes plus the step that gets the cover onto the post. The avatar is the same face
every time, so all of a brand's covers look like one creator.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask the way
[asking](references/asking.md) says. This file adds what is particular to covers.

## When to use

- A cover for a TikTok, Reel or Short: "make a cover for this", "a Reels cover that says 3
  MISTAKES".
- A thumbnail for a wide YouTube video.
- The first slide of a photo carousel, when it carries a few big words to win the swipe.
- Several covers to pick from, or one cover for every video of a batch or a series.
- One thing changed on a cover: one made here, or one the person sends as a file link or keeps
  in their Creatorline library.
- Cover words only, or a critique of a cover the person made: answer in text; nothing is spent.

## Not for

| The ask | Use |
|---|---|
| A photo or a photoshoot of the avatar with no words | `creatorline-photos` (one plain photo: `creatorline`) |
| A whole photo carousel (this skill makes only its first slide) | `creatorline-photos` |
| Words over the playing video: captions, a hook headline in the first seconds | `creatorline-captions` |
| Text, music or cuts in the video itself | `creatorline-video-studio` |
| Making the video | the format skill (`creatorline-talking-video`, `creatorline-product-video`, ...) |
| Hooks, titles and a script, nothing made | `creatorline-short-script` |
| Posting the video or the carousel | `creatorline-publish` |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| The video it is for | Only when nothing points to one and the brand has several | The video made in this conversation, or the one the person names. Otherwise offer the newest two or three by name (flow, step 5) |
| What the video is about | Only when there is no video and no topic | Read from the video |
| Where it goes | No | A TikTok, Reels or Shorts cover. "YouTube thumbnail" or a wide video: a thumbnail |
| Avatar | No | The avatar the video was made with: the one used in this conversation, or the one you see in the video (match it by name in `list_avatars`, with `get_avatar`'s `image_url` when unsure). Otherwise the brand's default avatar. Name it in the plan |
| The words | No | 2 to 5 words from the video's hook, in the brand's `language`. The person's own words win |
| Concept and expression | No | Picked from the video ([concepts](references/concepts.md), section 4) |
| Product photo | Only when the cover shows the product and no photo of it is in the library | [Product intake](references/product-intake.md). Last resort: the video's cover frame (`thumbnail_url` from `list_assets`), when the product is clear in it |
| How many | No | One concept, two takes (`count: 2`): a choice, and a spare if one take's words come out wrong |

## Pick the frame

| Where it goes | `aspect_ratio` |
|---|---|
| TikTok, Reels, Shorts (the default) | `9:16` |
| A YouTube video's thumbnail | `16:9` |
| The first slide of a photo carousel | the other slides' frame, `3:4` by default |

A cover and a thumbnail for the same video: one concept, two calls (each brief with its own
Frame and Keep clear lines), priced together.

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-cover-image"`.
2. **Orient** (house rules, section 1). From `get_brand`: `language` for the words, and
   `brand_voice.tone` for how loud the cover may be.
3. **Find the video**, all free:
   - made in this conversation: you already have it;
   - a Video Studio project: `list_videos` with `brand_id`, then `get_video` (its title, the
     hook text already on it, its clips); look at its opening with `preview_video`
     (`at: [0.5]`);
   - a generated or uploaded clip: `list_assets` with `brand_id`, `file_type: "video"` and
     `search`; a row's `prompt` says what it shows. Look at it with `preview_assets` (its cover
     frame): who is in it, the outfit, the place, the product.

   One clear match: name it in the plan instead of asking "this one?". No video yet: work from
   the topic.
4. **Decide**, without asking, with [concepts](references/concepts.md): the concept, the words,
   the expression, the word style, which side the face is on. Use the person's own words as
   given, unless they break the claim floor (concepts, section 7): then say so in the plan.
5. **Intake**, only for a hard gap, in one message. Use the host's question tool when it has
   one (asking, section 3). Two common cases:

   > Happy to make a cover. Which video is it for?
   > 1. "3 mistakes new runners make" (made today, recommended)
   > 2. "My 6 AM run routine"
   > 3. Another one, or no video yet: tell me the topic
   >
   > Defaults: Mia, vertical for TikTok, Reels and Shorts, big white words from the video's
   > hook, two takes to pick from.

   > Happy to. What is the video about, in a line? If you already have the words for the
   > cover, send them too.
   > Defaults: Mia, vertical for TikTok, Reels and Shorts, big white words, two takes to pick
   > from.

6. **Write the brief** with [cover briefs](references/cover-briefs.md): the template, the word
   style, and the frame's Keep clear line.
7. **Plan and price.** Make the call without `confirm`:

   ```json
   {
     "tool": "photo-edit",
     "model": "gpt-image-v2-edit",
     "brand_id": "<brand id>",
     "avatar_id": "<the avatar in the video>",
     "prompt": "<the cover brief>",
     "params": { "aspect_ratio": "9:16", "resolution": "2K", "quality": "Medium" },
     "count": 2
   }
   ```

   - Always pass `model: "gpt-image-v2-edit"`: it draws words best and has the `9:16` and
     `16:9` frames, which the tool's default model lacks. Never name it to the person.
   - The product photo goes in `inputs.other_elements`. No person on the cover:
     `include_avatar: false`. No person and no image at all: `text-to-photo` (cover briefs,
     section 8).
   - Then one short message: what the cover shows, the words, the takes, the credits, the
     balance, one question. The person may change the words in the same reply as the yes.

   > A vertical cover for "3 mistakes new runners make": Mia close up on the right, eyes wide,
   > "3 MISTAKES" in big white letters on red. Two takes to pick from: <N> credits; you have
   > <M>. Go ahead, or other words?

8. **Run.** On yes, the same call with `confirm: true`. New words in that same reply: ask the
   price again without `confirm` (free); the same price runs on that yes, any other price
   goes back to the person. A change of frame, takes or quality: quote again.
9. **Wait.** `get_generation` with `wait_seconds: 45` until `status` is `succeeded` or
   `failed`; a cover takes about half a minute to a minute. One line meanwhile: "Drawing the
   two takes."
10. **Check** every take ([below](#check-before-you-show-it)) before you show any of them.
11. **Show** the card ([below](#show-the-result)): every take, the one you would use and why.
12. **Put it to use.** Say in a line how this cover reaches the post and offer that step
    ([using the cover](references/using-the-cover.md)). A video post cannot carry a separate
    cover: the way in is the video's first frame, or a TikTok draft.

## Options and batches

- **"Options", "a few to pick from"**: three different concepts, one call each with
  `count: 1`. Price all three without `confirm`, add them up, ask one yes for the total, then
  run them.
- **One concept, several feelings**: one call per expression; the briefs differ in one line.
  The order is in [concepts](references/concepts.md), section 6.
- **A cover for every video of a batch or a series**: one call per video with `count: 1`, all
  with the series brief (concepts, section 8), priced as one batch. Up to 8 covers at a time,
  so one `preview_assets` call checks them all.
- **The cover and the video's first frame, asked for together**: price the cover and the
  export as one batch before either runs ([using the cover](references/using-the-cover.md),
  section 3).
- `count` gives up to 4 takes of the SAME brief. A different brief is a different call.

## Changing one thing

The person likes a take but wants something different: run `photo-edit` on that take
([cover briefs](references/cover-briefs.md), section 7), quoted like any run. Turn vague
feedback into a concrete change first and say it: "more punch" becomes yellow words; "she looks
bored" becomes a shocked face.

- Words, colours, word style and where the words sit: up to two of these in one run.
- A new expression: a run of its own.
- More than that: run the original brief again with the changes written into it.

## Craft

The short version. The long one is in [concepts](references/concepts.md) and
[cover briefs](references/cover-briefs.md).

- **One glance.** One subject, one feeling, 2 to 5 words. If it does not read in a second at
  the size of a thumb, change the concept.
- **A question the video answers.** The face carries the feeling, the words name the topic;
  together they make someone want the answer. Never the full title.
- **Big.** The face fills about half of a 9:16 cover, a third of a 16:9 one. Letters at least a
  tenth of the frame's height on 9:16, a sixth on 16:9.
- **Contrast.** Light words with a thick dark outline, or dark words on a solid band. A plain
  background in a colour that is neither the skin nor the outfit.
- **Keep clear.** On 9:16 the apps cover the top, the bottom and the lower right side, and
  profile grids crop the top and bottom: the face and the words sit in the middle band. On
  16:9 the bottom-right corner stays plain (cover briefs, section 5).
- **Poster, not phone.** Unlike the videos, a cover may be bright, glossy and saturated. The
  person in it still wears what they wear in the video.
- **True.** Turn up the feeling, never the facts. The avatar has no past and no results. No
  fake reviews, comments or news banners; no other brand.
- **Consistent.** A series keeps one layout. Only the words, the face and the episode number
  change.

## Check before you show it

1. `status` is `succeeded` and `output` holds every take that was paid for.
2. `preview_assets` with every take's `asset_id` (up to 8 at a time). For each take:
   - **The words, letter by letter**: exactly what you briefed, in that order, and nothing else
     written anywhere: no extra words, logos or watermarks.
   - **The face**: one person (two on a two-avatar cover), the avatar from the video, the
     expression you asked for.
   - **Small**: imagine it a thumb wide. The feeling and the words still read.
   - **The frame**: vertical or wide as asked; the face and the words inside the keep-clear band.
   - **True to the video**: the same outfit, place and product.
3. Never recommend a take whose words are wrong. Every take wrong: show the best one, say
   plainly what is off, and offer the fixes below.
4. No picture came back, or you cannot see images: say you could not check the spelling, and
   ask the person to look before they use it.

## If it goes wrong

A failed run is refunded. Change one thing per retry, and quote every retry (house rules,
section 5).

| What you see | Likely cause | Change |
|---|---|---|
| A letter wrong, doubled or missing | Long or unusual words, letters with marks | Fewer, shorter words and one more take. Wrong twice: `quality: "High"` once (quote it), or type the words ([using the cover](references/using-the-cover.md), section 4) |
| Extra text, a made-up logo, a watermark | The brief never said the headline is the only text | Add "The headline is the only text in the image." |
| Words over the face or at the edge | No place given | Name the side and the band; add the Keep clear line |
| Words too small to read | Too many words | 2 or 3 words, "very large", one line |
| Not the avatar's face | `include_avatar: false`, or the brief never says "the avatar" | Leave `include_avatar` out; keep the identity sentence in the Person line |
| Flat, like a stock photo | A small face, a mild expression, a busy background | A bigger face, the expression written as what the face does, a plain colour |
| Cluttered | Several props, many words, two concepts at once | One subject, one prop, one concept |
| Refused before anything ran: "Invalid value for aspect_ratio" | `model` left out: the tool's default model has no `9:16` or `16:9` | Pass `model: "gpt-image-v2-edit"`, as in step 7 |
| Vertical when it should be wide | `aspect_ratio` left out: it falls back to `9:16` | Pass the frame's `aspect_ratio` |
| The product wrong, its label garbled | A weak photo, a big logo | [Product intake](references/product-intake.md); the cover words carry the name |
| A second person looks like the avatar | The other person was not described | Describe them by role, hair and clothing, or leave them out |
| Failed as refused by the content check | A celebrity, a real person or another brand in the brief | The avatar and plain, unbranded items |
| The face drifted after a few edits | Edits stacked on edits | Run the original brief again with the change written into it |

## Show the result

```
**Cover for "3 mistakes new runners make"**: vertical, Mia wide-eyed on the right, "3 MISTAKES" in white on red
[Take 1](<url>) · [Take 2](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

I'd use take 2: the words are sharper and her face reads better small.

What next?
1. Put take 2 at the start of the video, so the post opens on it
2. The same cover, wide, as a YouTube thumbnail
3. Change something: the words, the colour or her face
```

- One link per take, named by take or by concept ("Big face", "Product close up"), never by id.
- Media links expire: always add the `studio_url`, and say the cover stays in their Creatorline
  library.
- No second question after the card: the person answers with a number, the other take, or a
  change (asking, section 7).

## Next steps to offer

Pick the 2 or 3 that fit:

| Offer | How |
|---|---|
| The cover at the start of the video, so the post opens on it | [using the cover](references/using-the-cover.md), section 3 |
| A TikTok draft, to pick the cover in TikTok before it goes live | `creatorline-publish` with `draft: true` |
| The same cover in another frame (16:9 for YouTube, 3:4 for a carousel) | this skill: the same concept, the new frame's Frame and Keep clear lines, a new `aspect_ratio`, priced |
| One thing changed | this skill, [changing one thing](#changing-one-thing) |
| Covers for the rest of the series | this skill, the series brief |
| A hook headline or captions on the video | `creatorline-captions` |
| The post, or a carousel with the cover first | `creatorline-publish` |

## References

- [Concepts](references/concepts.md): the concepts, which one for which video, the words,
  faces, truth on a cover, a series.
- [Cover briefs](references/cover-briefs.md): the call, the brief line by line, word styles,
  where things go in each frame, examples, changing one thing, special cases.
- [Using the cover](references/using-the-cover.md): what a post can carry, each destination,
  the cover as the video's first frame, exact typed words.
- [House rules](references/house-rules.md): the session, consent before spending, waiting,
  results, failures, safety, what only the app does.
- [Asking](references/asking.md): how to run the intake.
- [Video briefs](references/video-briefs.md): photo briefs (section 15), positives instead of
  negatives (section 9).
- [Product intake](references/product-intake.md): getting the product photo in, claims, logos.
