# Routing in detail

How to tell which Creatorline skill a request belongs to when the table in SKILL.md is not
enough: example requests, the look-alikes, requests that chain several skills, and what cannot
be done from a chat at all.

## Contents

1. [Example requests](#1-example-requests)
2. [Fast path or a format skill](#2-fast-path-or-a-format-skill)
3. [Look-alikes, settled](#3-look-alikes-settled)
4. [Requests that chain skills](#4-requests-that-chain-skills)
5. [When you still cannot tell](#5-when-you-still-cannot-tell)
6. [Names of things we do not have](#6-names-of-things-we-do-not-have)
7. [Not possible from a chat](#7-not-possible-from-a-chat)

## 1. Example requests

| The person says | Skill |
|---|---|
| "Mia reviews my serum", "a hot take about cold plunges", "storytime about my first client", "3 tips for new runners", "GRWM while talking about my day" | `creatorline-talking-video` |
| "have Mia read this script", "Mia presents our quarterly update, here is the text", "a green screen Mia to put over my gameplay", "a 2 minute explainer, word for word" | `creatorline-talking-head` |
| "a video of my candle with a voiceover", "hands pouring the protein shake", "product B-roll with narration" | `creatorline-product-video` |
| "Mia unboxes the PR package", "a haul video", "first look at the new drop" | `creatorline-unboxing-video` |
| "Mia wearing this dress", "a fit check", "OOTD with these sneakers" | `creatorline-try-on-video` |
| "how to use the curling wand, step by step", "a 4-step routine with each step on screen" | `creatorline-tutorial-video` |
| "a promo for my app", "Mia talks about our website while the screenshots show", "a SaaS demo for TikTok" | `creatorline-app-promo-video` |
| a TikTok, Reels or Shorts link with "make this with Mia", "recreate this", "do this trend" | `creatorline-reshoot` |
| "put Mia in this video instead of the girl", "swap both people for my avatars", "Mia does this dance" | `creatorline-character-swap` |
| "5 versions of this ad", "the same video with each of my avatars", "test 4 hooks", "this video in Spanish and German" | `creatorline-ad-variations` |
| "put our new bottle in this video instead of the old one", "this ad on a beach and in the snow", "change the price on the sign" | `creatorline-ad-variations` (`generate_video_edit`); one quick change for the whole clip, no product of theirs: the fast path |
| "a weekly 60-second show with Mia", "episode 3 of our series", "a 90-second explainer hosted by Mia", "the script for a 2-minute episode" | `creatorline-ai-host` |
| "a faceless story video", "a history explainer with narration", "top 5 facts with a voiceover" | `creatorline-faceless-video` |
| "cut the first 2 seconds", "add text over the second clip", "put a stock hook in front", "split screen with gameplay", "export it" | `creatorline-video-studio` |
| "add captions", "burn subtitles in", "put a hook headline on it" | `creatorline-captions` |
| "narrate this video", "make it Mia's voice", "this video in Spanish", "Mia saying hi, as an audio file", "a dialogue between two voices", "make her lips match this audio" | `creatorline-voiceover` |
| "a photoshoot of Mia", "6 photos for a carousel", "a photo dump from her weekend", "Mia holding my serum", "a flat lay of our products" | `creatorline-photos` |
| "a cover for this Reel", "a YouTube thumbnail", "a cover with the words 3 MISTAKES" | `creatorline-cover-image` |
| "write me 10 hooks", "a 30-second script about X", "a voiceover script I will record myself" | `creatorline-short-script` |
| "turn my podcast into shorts", "clips from this YouTube video", "the best moments of my livestream" | `creatorline-long-to-shorts` |
| "content for next week", "a 14-day plan", "what should I post this month, then make it" | `creatorline-content-calendar` |
| "post it to TikTok at 6 pm", "schedule this", "did my post go out?", "a caption and hashtags for this video" | `creatorline-publish` |
| "do this every Monday", "a reusable pipeline", "rebuild my ComfyUI flow here", "run my saved workflow" | `creatorline-workflows` |

## 2. Fast path or a format skill

The fast path in SKILL.md covers one simple piece with no format around it. A format word moves
the request to its skill, because the skill knows the format's beats, hooks and checks. Two
things always start in their skill: a photo with the person's own product or an outfit to show
(`creatorline-photos`) and any voice work, a single voice line included (`creatorline-voiceover`).
When one comes up inside a one-off this skill is already making, the fast path makes it.

| Request | Where | Why |
|---|---|---|
| "a photo of Mia at the beach" | fast path, `generate_photo_edit` | one plain photo, no format |
| "a photo of Mia holding my serum" | `creatorline-photos` | their product is in it: it needs the product intake |
| "8 photos of Mia at the beach for a carousel" | `creatorline-photos` | a set that has to work together, then a carousel post |
| "a clip of Mia walking her dog" | fast path, `generate_ugc_video` | a moment, no format |
| "a clip of Mia reviewing my dog shampoo" | `creatorline-talking-video` | a review is a format with its own beats |
| "animate this photo" | fast path, `generate_photo_to_video` | one photo, one continuous take |
| "turn these 5 photos into a reel with music" | `creatorline-video-studio` | several pieces assembled, then exported |
| "voiceover for my video" | `creatorline-voiceover` | the voice has to fit the video's timing |
| "a sunset over Lisbon, as a clip" | fast path, `generate_text_to_video` | one scene, no avatar |
| "my candle turning slowly on a table, no voice" | fast path, `generate_photo_to_video` from the product photo | one product moment, no person |
| "my candle with a voiceover about the scent" | `creatorline-product-video` | a voice over the product is a format |
| "a 40-second narrated video about Lisbon" | `creatorline-faceless-video` | narration, several visuals, captions |
| "make the wall behind her green in this clip" | fast path, `generate_video_edit` | one change in an existing video, the rest kept; their product, a timed change or several versions go to `creatorline-ad-variations` |

## 3. Look-alikes, settled

**Reshoot, Character Swap, motion control or a video edit.** All four start from another video.

| The person wants | Use | Skill |
|---|---|---|
| The idea, beats and sound of a video, performed again by the avatar, maybe with their product and new lines | Reshoot | `creatorline-reshoot` |
| The real video kept exactly (moves, camera, cuts, sound), with one or two people in it replaced | Character Swap | `creatorline-character-swap` |
| Only the moves (a dance, a gesture) performed by the avatar, starting from the avatar's photo | motion control | `creatorline-character-swap` |
| The real video kept, with a thing in it changed (a product, an object, the clothes, the background, a colour, words in the picture) and no person changed | video edit | fast path `generate_video_edit`; several versions or their product: `creatorline-ad-variations` |

Reshoot needs one main person in the source. Two people who both have to change is Character
Swap. A person who changes is always Character Swap, never a video edit. A video edit takes AI
faces only: a real person's video with their product swapped is Reshoot. If the person's words fit two rows, ask one question about the outcome: "Keep the original
video exactly and only change who is in it, or film it again with Mia?"

**Talking video, talking head or AI host.** One clip, 5 to 30 seconds, lines you write, with
actions and cuts: talking video. The person's own script said word for word in one steady
frame, up to 3 minutes, or a green screen presenter: talking head. Several takes with a set and
cutaways, or one episode of a recurring show: AI host.

**Captions or voiceover.** Words the viewer reads: captions. A voice the viewer hears:
voiceover. A silent video that needs both: voiceover first, captions last, because captions are
heard from the speech.

**Photos or cover image.** Photos posted as they are, alone or as a carousel: photos. One image
whose job is to win the tap, with a few large words on it: cover image.

**Clips from long videos or Video Studio.** A long recording cut into several shorts by topic,
with captions, automatically: long-to-shorts. One video edited by hand (this cut, that text,
this order): Video Studio.

**Talking video or product video.** The avatar's face on camera, speaking: talking video. The
product fills the frame and the voice is off screen: product video.

**Unboxing, try-on, tutorial or talking video.** The arc decides. Package, open, reveal,
reaction: unboxing. Wearing it and showing the fit: try-on. Steps in order, each labeled:
tutorial. Anything else said to camera about a product: talking video.

**Reshoot or ad variations.** One re-film of one source: reshoot. Several versions of one video,
each changing one thing: ad variations.

**Short script or a production skill.** "Write", "hooks", "script" and nothing to film: short
script. "Make", "film", "create a video": the production skill, which writes its own script.

**Content plan or one format.** Several posts across days: content plan. One piece: its format.

**Reshoot or app promo.** The request comes with a TikTok, Reels or Shorts link to copy: Reshoot,
even when their app is in it (a screen recording rides along in the new take). No link, the
app's own screens shown as they are: app promo. An app promo that later borrows a trend uses the
Reshoot path inside `creatorline-app-promo-video`.

**Try-on or Character Swap.** The outfit is the point (a fit check, an OOTD, a real try-on clip
re-cast in their item): try-on. The performance is the point (a dance, a skit) and the clothes
are a detail: Character Swap.

**Product video or faceless video.** A physical product to sell, the voice off screen: product
video. A story, a topic or a list with no product of theirs: faceless video.

**Voiceover or ad variations.** One new voice or one other language on one video: voiceover.
Two or more voices or languages, or versions to compare: ad variations.

**Captions or Video Studio.** Speech captions, a hook headline or both, and nothing else
changed: captions. Cuts, order, labels, layers, music or the export, with a hook line among
them: Video Studio, which writes the captions last in the same pass.

**Short script or publish.** A caption, hashtags or a title for media that is finished:
publish, as text to copy when that is all they want. Words for a video not made yet: short
script.

**Short script or AI host.** A script of up to 60 seconds, nothing filmed: short script. The
script of an episode over 60 seconds: AI host, which writes it first and stops before the quote
when the words are all they want.

**Workflows or a format.** "Every week", "automate", "pipeline", "reuse this", a saved workflow
by name, or a recipe from another tool: workflows. A single piece, even a complex one: its
format.

## 4. Requests that chain skills

Start with the skill that makes the media. It offers the next ones as next steps. When the
person asked for the whole chain up front ("make it, caption it and post it"), price every paid
step first and ask one yes for the total (house-rules.md, section 2).

| Request | Order |
|---|---|
| "a TikTok of Mia with captions, posted tonight" | `creatorline-talking-video`, then `creatorline-captions`, then `creatorline-publish` |
| "this photo as a reel with my music" | fast path `generate_photo_to_video`, then `creatorline-video-studio` (the person's audio under it, export), then `creatorline-publish` |
| "a carousel of Mia with my product" | `creatorline-photos` (it posts the carousel) |
| "repurpose my podcast for the week" | `creatorline-long-to-shorts`, then `creatorline-cover-image`, then `creatorline-publish` |
| "recreate this trend with my product, and a cover" | `creatorline-reshoot`, then `creatorline-cover-image` |
| "the same video in three languages" | `creatorline-ad-variations` |
| "a script first, then film it" | `creatorline-short-script`, then the production skill with that script |

## 5. When you still cannot tell

- Ask ONE question about the outcome, never about skills or tools, with the likely readings as
  options and the most likely first (asking.md).
- Good: "What should people see: 1) Mia talking to camera about it (recommended) 2) the product
  up close with Mia's voice over it 3) Mia unboxing it?"
- Bad: "Do you want talking-video, product-video or unboxing-video?"
- "Make a video" with nothing else: offer the welcome options for this brand (SKILL.md, first
  run) instead of a question.

## 6. Names of things we do not have

A request may name a preset, an effect, a template or a feature from another app ("money rain",
"the glow-up effect", "a 3D product spin"). Treat the name as a hint about the outcome:

1. Work out the outcome it points at (what the viewer sees).
2. Make the closest thing our tools do, through the skill that fits.
3. Say in one line what you are making instead: "We don't have that effect as a button; I'll film
   Mia with cash falling around her as part of the clip."

Never answer only "that does not exist". A model the person names: check the tool's schema
(its `model` list); if the tool offers it, pass it as `model`; if not, say what we have that does
the same job, in plain words.

## 7. Not possible from a chat

Say so in one line, give the way that works, and go on with what you can do.

| They ask for | What to say |
|---|---|
| Music or sound effects made by AI | Not available. They bring an audio file (a direct file link through `import_asset`, or an upload in the app) and it goes under the video in Video Studio. The stock library holds hook clips and green screen clips, no music. |
| Screenshots of a website or app taken for them | They send the screenshots or a screen recording (links or uploads). |
| A file from their device sent through the chat | They drop it at https://app.creatorline.io/assets, then you find it with `list_assets`. |
| Trends, analytics or inbox data | In the app: https://app.creatorline.io/trending, https://app.creatorline.io/analytics, https://app.creatorline.io/inbox. A trend's link can come back here for a reshoot. |
| Approving a post, editing its caption after it was made, deleting a post or a file | In the app: https://app.creatorline.io/review and https://app.creatorline.io/library. |
| A post on a specific date | Posts take a time of day here. For a date, the calendar in the app: https://app.creatorline.io/publish. |
| A new brand, a new avatar, a voice clone, editing the brand's voice | In the app: https://app.creatorline.io/brands/new, https://app.creatorline.io/avatars/new; the brand document in Settings, Brands. |
| A carousel with text laid over photos | In the app's slides editor: https://app.creatorline.io/brands/BRAND_ID/generate/slides (the brand's id in place of BRAND_ID). |
| Approving a workflow's script while it runs | On the workflow canvas in the app (`creatorline-workflows` says where). |
| A real person's face or voice without their consent, a public figure, a minor | Never (house-rules.md, section 7). |
