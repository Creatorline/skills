---
name: creatorline-talking-video
description: "Makes a 5 to 30 second video of the brand's AI avatar talking to camera in one take: a story or review with a product, hot take, storytime, tips, GRWM chat or reaction. Use for 'my avatar talks about', 'UGC video of my product', 'talking head'. Not for unboxings or try-ons: use creatorline-unboxing-video or creatorline-try-on-video. Over 30 s: creatorline-ai-host."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# UGC Talking Video

You make one short vertical video in which the person's avatar talks straight to the viewer:
shot like a phone video, one idea, a hook in the first second, lines that sound said out loud,
the avatar's own face and, when it has one, its own voice. The person goes from one sentence to
a finished clip without learning anything technical. You ask only what changes the result,
show the words and the price before anything runs, keep them posted while it films, and hand
back a clip that is one step away from captions, a cover and a post.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask every question the way
[asking](references/asking.md) says. This file adds only what is particular to talking videos.

## When to use

The avatar is on camera and speaking, for 5 to 30 seconds, in one take:

- a video of the avatar with the person's product, with or without the word "review";
- reviewing or demoing a product in one take, with no labeled steps;
- a hot take, an opinion, advice; tips ("3 mistakes everyone makes with...");
- storytime, a POV story;
- GRWM: talking while getting ready;
- a reaction to something;
- a street-interview answer, a podcast-style clip;
- a day in the life; a before and after of a look, a setup or a space.

A product is optional. With no product in the ask, it is a creator-led video: never ask for
one.

## Not for

| The ask | Use |
|---|---|
| Opening a package, a haul, a PR drop | `creatorline-unboxing-video` |
| Wearing and showing clothes, shoes, a bag, jewelry | `creatorline-try-on-video` |
| A how-to in labeled steps | `creatorline-tutorial-video` |
| An app, website or online store shown on screen | `creatorline-app-promo-video` |
| The product as the hero, the voice off screen | `creatorline-product-video` |
| Re-filming a specific viral video with the avatar | `creatorline-reshoot` |
| Keeping a real video and swapping the person in it | `creatorline-character-swap` |
| Editing a video that already exists | `creatorline-video-studio` |
| Over 30 seconds, several takes, a recurring show | `creatorline-ai-host` |
| No face on camera | `creatorline-faceless-video` |
| Only the script or hooks, nothing filmed | `creatorline-short-script` |
| Many versions of one winning video | `creatorline-ad-variations` |
| A week of mixed formats | `creatorline-content-calendar` |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| Avatar | Only when the brand has none with a face: it is made in the app, https://app.creatorline.io/avatars/new | The brand's default avatar. A named one: find it by name in `list_avatars` |
| Length | Yes, unless given: 10 s, 15 s or 30 s, the format's pick marked recommended | "Just do it": the format's pick |
| Product photo | Yes, when a product is named and will be shown | Get it the way [product intake](references/product-intake.md) says. None to be had: the product named, never shown. No product named: none asked |
| Format and mode | No | Read from the ask ([formats](references/formats.md), [story mode](references/story-mode.md)), stated in the plan for veto |
| What it says | Only when nothing is given AND `get_brand` has no `brand_voice.content_angles` | One content angle, stated |
| Exact lines | No | You write them all, in the brand's voice, and show them with the price |
| Spoken language, accent | No | The brand's `language`; English in the accent of the brand's `country` (American when none) |
| Accent or a quirk | Offered only when the ask names an origin or wants "weird", "viral" energy | Neutral, no quirk |
| Voice | No | The avatar's own voice, when it has one and the format allows it ([below](#the-avatars-own-voice)) |
| Setting | No | By the product's category ([staging](references/staging.md), section 5), in neutral daylight. A photo of their real place goes in `location` |
| Frame, sharpness, look | Never ask | `9:16`, `720p`, phone-shot |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-talking-video"`.
2. **Orient** (house rules, section 1). Then `get_avatar` on the avatar who will be on camera:
   `voice_id` (can the voice step run), `bio`, `tone`, `archetype` (the lines should sound like
   this person; the server adds the persona by itself, so never paste it in), `image_url`
   (only for a second avatar, step 6).
3. **The gate**, before any question ([the persona and the gate](references/truth-and-safety.md)):
   who is on camera, what is promoted. A failure means no video and no way around it: say what
   you can make instead. A real person's consent unclear: ask once.
4. **Read the ask.** Collect what it already gives: product, length, setting, outfit, mood,
   props, language, accent, music, approved claims when they give a list, text on screen. Then
   how detailed it is:

   | The ask is | You do |
   |---|---|
   | 1 to 5 words ("Mia, my serum") | Autopilot: mode, shape, lines and staging are yours |
   | 1 to 3 sentences of tone or rough flow | Keep their tone and direction; build the beats yourself |
   | 4 or more sentences, a scenario, a shot list | Their beats one for one, in their order; change only what cannot be filmed or breaks the gate |

   Any concrete detail they give beats every default here; only the gate beats them. Pick the
   format ([formats](references/formats.md)) and, with a product, the mode: review mode for a
   review or a demo, story mode for a story; no hint, the one that suits the product
   ([story mode](references/story-mode.md), section 1).
5. **Intake.** One message: the hard gaps only, each with numbered options and a recommended
   one, then one line of defaults that names the mode and shape for veto.

   > Happy to. Two things first:
   > 1. A photo of the serum: a link to the image itself, its name in your Creatorline library,
   >    or drop it into [your library](https://app.creatorline.io/assets?activeBrand=BRAND_ID).
   > 2. Length: 1) 15 s (recommended) 2) 10 s 3) 30 s
   >
   > Defaults: Mia at her bathroom sink in daylight, a short story where the serum is one step
   > of her morning, in English, in Mia's own voice. Say if you want any of it changed.

   A photo pasted into the chat has no link the tools can read: ask for the library or a link
   (BRAND_ID is the brand's id, so the right brand's library opens). No topic and no content
   angles: offer three topics from the brand's niche as the first question.
6. **Write it.** All of it is yours unless they gave it:
   - the monologue, every line, by [monologue craft](references/monologue-craft.md): one hook
     pattern, the word band for this length, the banned openers and words, the register;
   - the staging by [staging](references/staging.md): phone position and distance per shot,
     each hand's job, when the product is in frame, setting, wardrobe;
   - a hook headline of at most 6 words, kept for captions;
   - the brief by [video briefs](references/video-briefs.md), section 3, with the lines under
     `Lines:` and "Use these lines as written.", `Language:` when not English, and
     `Sound: voice and room sound only` when the voice step will run or music comes later;
   - a second avatar on camera: its `image_url` from `get_avatar` in `inputs.characters`,
     `@Avatar2` in the brief with its role; the avatar on camera goes in first as `@Avatar1`.

   Then run the brief check ([checklists](references/checklists.md), section 1) and fix what
   fails before you quote.
7. **Plan and price.** Make the call without `confirm`:

   ```json
   {
     "tool": "ugc-video",
     "brand_id": "<brand>",
     "avatar_id": "<the avatar on camera>",
     "prompt": "<the brief>",
     "params": { "ugc_style": "GRWM", "duration": 15 },
     "inputs": { "objects": ["<product asset id>"] }
   }
   ```

   Leave out `model`, `aspect_ratio` (`9:16`) and `resolution` (`720p`) unless the person asked.
   The answer is `needs_approval` with `credits`, `credit_balance` and `sufficient`. When the
   voice step is planned, price it too: `estimate_generation_cost` with
   `{ "tool": "change-voice", "params": { "voice_id": "<the avatar's voice_id>" } }`. Then one
   message: what you will make (mode or format, shape, length, avatar, setting), the lines word
   for word, each part's credits, the total, the balance, one question.

   > A 15-second story: Mia is running late, the serum is the one step she keeps, verdict at
   > the sink. She says: "<the lines>". The video is <N> credits and Mia's own voice <M>,
   > <total> in all. You have <balance>. Go ahead?

   The yes approves the words too: what the lines say is what the clip says.
   `sufficient: false`: house rules, section 2; offer 10 seconds, or the clip without the voice
   step. A free trial or any other refusal: house rules, section 8.
8. **Run.** On yes, the same call with `confirm: true`.
9. **Wait and narrate.** `get_generation` with `wait_seconds: 45`, again and again until
   `status` is `succeeded` or `failed`. A talking video takes about 1 to 5 minutes. One line
   between calls, about this clip: "Filming Mia at the sink." "Nearly there." Never paste the
   status.
10. **Check the take** ([below](#check-before-you-show-it)). When a check fails, stop: show it,
    say what is off and what you would change (house rules, section 5), and say the voice step
    did not run and cost nothing.
11. **Voice step**, when planned, on the checked take:

    ```json
    {
      "tool": "change-voice",
      "brand_id": "<brand>",
      "avatar_id": "<the avatar on camera>",
      "inputs": { "video_url": "<the take's asset_id>" },
      "params": { "voice_id": "<the avatar's voice_id>" }
    }
    ```

    First without `confirm`. The price you quoted: call again with `confirm: true`, the yes
    covered it. A different price: ask again. Wait as in step 9 ("Putting Mia's own voice on
    it.").
12. **Show** the card ([below](#show-the-result)) and offer the next steps.

Never switch to another model on your own. A model that refuses the take (a real face, a
content check) is reported plainly, and a different model is a new quote and a new yes.

## The avatar's own voice

The video model gives every take a voice of its own. It suits the face, but it is not the
avatar's saved voice, and it differs from video to video. To make every video sound like the
same person, re-voice the kept take with `change-voice` in the avatar's `voice_id` (step 11).
The words, timing, lip movement and delivery stay; only the voice changes.

| Run it when | Skip it when |
|---|---|
| `get_avatar` shows a `voice_id` | The avatar has no `voice_id`. Say once that a voice is added on the avatar's page, https://app.creatorline.io/avatars (house rules, section 9) |
| One person speaks | Two people speak: both would get one voice |
| The take is voice and room sound | Music is under the speech: it comes out badly distorted |
| | The clip carries an accent the person asked for: the saved voice replaces it |
| | Silent flex (no words) |
| | A real person is on camera: never give them someone else's voice |

- Always pass `avatar_id` and the avatar's voice as `params.voice_id`. Without `avatar_id`
  the run takes the brand's default avatar's voice, or a stock voice when that has none.
- It is a charge of its own: quote it with the video (step 7) and add the two.
- `params.change_voice: true` on the video call does the same by itself once the take lands.
  Avoid it here: its charge is NOT in the video's `needs_approval` price, its clip is not
  returned by `get_generation` on the video (it sits under the same `studio_url`), it runs on a
  take nobody checked, and for an avatar without a voice it uses the brand's default avatar's
  voice. Use it only when the person wants one call and has heard all four.

## Real people

- **A real person's photo instead of the avatar** (the person themself, or an adult who agreed
  to it): `model: "bytedance-seedance-2-0-reference-to-video"`, `include_avatar: false`, the
  photo in `inputs.characters`, `duration` at most 15. The default model refuses real faces and
  this tool has no automatic fallback. A photo is not permission: consent unclear, ask once.
- **The person's own recorded voice** saying the lines: the audio file in `inputs.audio_urls`
  (a link to the file, or `import_asset` first), `duration` matched to the recording, and
  "@Avatar1 says @Audio1" in the brief, with the words not written out. Only their own voice,
  or one they have permission to use; never imitate a voice from a clip. No voice step after.
- A real person on camera says words they agreed to say: show them the lines with the price.
- Never a public figure, a celebrity, a minor or anyone who did not agree.

## Craft

The short version. The long one: [story mode](references/story-mode.md),
[monologue craft](references/monologue-craft.md), [staging](references/staging.md).

- **Two modes with a product**: story mode (one scenario, stakes in the hook, one "but then",
  the product entering at about 40 to 60 % of the runtime; delete the product and the story
  still stands) and review mode (the avatar's own take, a demo).
  Read it from the ask; no hint, pick the one that suits the product.
- **The hook lands in 0.4 seconds**: shot 1 opens in motion, the first word (or a sound) at
  once, one hook pattern per video, none of the banned openers.
- **Words fit the clip**: talk-led clips at about 2.5 words a second; clips where the hands
  work (a demo, GRWM, a story with the product) in the lower band, which also protects the lips.
- **Natural energy by default**: one honest peak, hyped or calm only on the person's words, the
  energy written as what shows, a closed-mouth beat in every clip.
- **Every cut changes the picture**: phone held or propped, close, medium or wide, never the
  same on both sides of a cut, or the shots melt together.
- **Each hand has one job**, two jobs at most; the product is either needed in the shot or
  fully put away.
- **Phone-shot in neutral daylight.** `Cinematic` only when the person asks for a polished film.
- **The persona** ([the persona and the gate](references/truth-and-safety.md), section 4): the
  avatar speaks in its own voice, with its tone and opinions; write it specific.
- **Our edge**: the same avatar, face and voice in every video, so a series builds a
  recognizable creator ([series](references/series.md)).

## Check before you show it

1. `status` is `succeeded` with one video, and its `duration_sec`, when given, is the length
   you asked for, within a second.
2. `preview_assets` with the take's `asset_id` shows its cover frame. Check it against
   [checklists](references/checklists.md), section 2: the right avatar, one product and no copy
   of it, two hands at most per person, the product's size against the hand, the label not
   garbled or mirrored, no text drawn into the frame, the setting you briefed.
3. You see one frame and hear nothing. Never tell the person the lines are right: show it and
   say in one line what to watch for (the fastest line's lips, the label in the close shot).
4. After the voice step: one video again, the same length.

## If it goes wrong

A failed run is refunded. Change one thing per retry and quote every retry (house rules,
section 5).

| What the person sees | Likely cause | Change |
|---|---|---|
| Lips smeared, doubled or off the words | Too many words, or two people talking at once | Cut words first (the lower band), then shorter lines, one speaker per shot |
| Rushed, cut-off lines | More words than seconds | Cut words, or add seconds (quote again) |
| Silence, a line said twice, babble | Too few words for a talk-led clip | Add a line, or shorten the clip |
| Different words than asked | Lines not quoted, or over budget | `Lines:` with "Use these lines as written."; trim to fit |
| Shots melt into one, no cuts | Neighbouring shots look alike | Change phone position or distance at every cut ([staging](references/staging.md), section 4) |
| A third hand, an arm from nowhere | More hand jobs than hands | One job per hand, the product resting on a surface |
| The product half out of a bag, floating, or two of it | Visibility not set | In frame only when used, else fully put away; "exactly one <product>" |
| The face changes between shots | Too much happening per shot | Fewer beats, one action per shot |
| Wooden, dead eyes | Nothing to do, nobody to talk to | A task for the hands, a target for the eyes, the register's peak |
| Looks staged, golden or orange light | Film words, `Cinematic`, no light named | Remove them; "neutral daylight from a side window" |
| Wrong product, garbled label | A big logo, a weak photo | [Product intake](references/product-intake.md); exact words go in Video Studio text |
| Captions or words drawn into the frame | Often in ASMR or quiet clips | Same call once with "a clean frame with nothing written on it"; then keep it or change the brief |
| A stranger, or a second copy of the avatar | Another person, not described | Describe them by role and clothing, or set the scene with no one else |
| A prop from nowhere (a mic, a mug) | Named in the brief, not supplied | Supply its photo in `objects`, or leave it out |
| Wrong language, a lost accent | Not stated, or stated weakly | `Language:`; the accent described strongly; no voice step |
| The re-voiced clip sounds distorted | Music or a second voice under the speech | Re-film with "voice and room sound only", re-voice, add music in Video Studio |
| Stopped by a content check | A risky word, a real name, another brand | Rephrase as `next` suggests. The face may be a real person's photo: [Real people](#real-people) |
| Refused before it starts: no face for the avatar slot | The brand's avatar has no face yet | Nothing was charged. The face is made in the app, https://app.creatorline.io/avatars/new |

## Show the result

```
**Mia's morning serum**: 15 s, Mia at her bathroom sink, the serum as her one kept step, in her own voice
[Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next? Or tell me what to change.
1. Text on it: word captions, the hook line, both, or none
2. A post package: caption, hashtags, a comment to pin
3. A cover for it
```

- After the voice step, link the re-voiced clip (its own `get_generation` output). The first
  take stays in the same project, under the same `studio_url`.
- `<N>` is everything this request spent: the video plus the voice step.
- Media links expire: always add the `studio_url`.
- The person asked for captions or a hook line up front: they were part of the plan and its
  price; do not ask again.
- One question only (asking, section 7). Turn vague feedback into one concrete change, say it,
  and quote the re-run.

## Next steps to offer

Pick the 2 or 3 that fit this clip:

| Offer | Skill |
|---|---|
| Text on it: word captions, the hook headline, both (the clean take stays in the library) | `creatorline-captions` |
| A post package in chat ([checklists](references/checklists.md), section 3), then the post in the review queue | `creatorline-publish` |
| A call to action, music, a split screen with what the avatar reacts to | `creatorline-video-studio` |
| A cover image | `creatorline-cover-image` |
| Another hook, avatar or language of the same video | `creatorline-ad-variations` |
| More videos about the same product as a series | [series](references/series.md) |
| The same idea as a longer episode | `creatorline-ai-host` |

When the person wants text, captions or music on it, the clip goes into a Video Studio project
first: `create_video` with `brand_id`, a `title` and one `add_clip` operation with the take's
`asset_id` (free). The sibling skill takes it from there.

## References

- [Formats](references/formats.md): each talking format with its `ugc_style`, length, beats,
  pitfalls and an example brief with its lines.
- [Story mode](references/story-mode.md): story mode and review mode, the story shapes, the beats by length, where the product enters, quiet, silent and ASMR clips.
- [Monologue craft](references/monologue-craft.md): hook patterns, lines, word bands, banned
  openers and words, registers and performance, accents.
- [Staging](references/staging.md): phone position, hands, the product in frame, cuts,
  settings, wardrobe, casting, two people, the product card for video.
- [The persona and the gate](references/truth-and-safety.md): the gate, claims, the persona,
  disclosure.
- [Checklists](references/checklists.md): the brief check, the cover check, the post package.
- [Series](references/series.md): several talking videos about one product.
- [House rules](references/house-rules.md), [asking](references/asking.md),
  [video briefs](references/video-briefs.md), [product intake](references/product-intake.md):
  shared by every skill.
