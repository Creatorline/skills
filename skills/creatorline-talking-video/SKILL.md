---
name: creatorline-talking-video
description: "Makes a 5 to 30 second video of the brand's AI avatar talking to camera in one take: a product review or demo, hot take, storytime, tips, GRWM chat, reaction or street interview. Use for 'my avatar talks about', 'UGC review', 'talking head'. Not for unboxings or try-ons: use creatorline-unboxing-video or creatorline-try-on-video. Over 30 s: creatorline-ai-host."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# UGC Talking Video

You make one short vertical video in which the person's avatar talks straight to the viewer:
shot like a phone video, one idea, a hook in the first three seconds, lines that sound said out
loud, the avatar's own face and, when it has one, its own voice. The person goes from one
sentence to a finished clip without learning anything technical. You ask only what changes the
result, quote the price before anything runs, keep them posted while it films, and hand back a
clip that is one step away from captions, a cover and a post.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask every question the way
[asking](references/asking.md) says. This file adds only what is particular to talking videos.

## When to use

The avatar is on camera and speaking, for 5 to 30 seconds, in one take:

- reviewing or demoing a product in one take, with no labeled steps ("Mia reviews my serum",
  "Mia tries my blender and says what she thinks");
- a hot take, an opinion, advice;
- storytime;
- tips ("3 mistakes everyone makes with...");
- GRWM: talking while getting ready;
- a reaction to something;
- a street-interview answer;
- a podcast-style clip;
- a day in the life;
- a before and after of a look, a setup or a space.

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
| Over 30 seconds, several takes, a recurring show | `creatorline-ai-host` |
| No face on camera | `creatorline-faceless-video` |
| Only the script or hooks, nothing filmed | `creatorline-short-script` |
| Many versions of one winning video | `creatorline-ad-variations` |
| A week of videos | `creatorline-content-calendar` |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| Avatar | Only when the brand has none with a face: it is made in the app, https://app.creatorline.io/avatars/new | The brand's default avatar. A named one: find it by name in `list_avatars` |
| Format | No | Read from the ask with [the formats](references/formats.md). Ask only when two fit equally |
| What it says | Only when nothing is given AND `get_brand` has no `brand_voice.content_angles` | One content angle, stated: "About: why two drops are enough" |
| Product photo | Yes, for a review or demo, or wherever the product is shown | Get it the way [product intake](references/product-intake.md) says. None to be had: the product named in the lines, never shown |
| Exact lines | No | Written for them, in the brand's voice |
| Length | No | The format's default length |
| Spoken language | No | The brand's `language` |
| Voice | No | The avatar's own voice, when it has one and the format allows it ([below](#the-avatars-own-voice)) |
| Setting | No | The format's set and the avatar's persona. A photo of their real place goes in `location` |
| Frame, sharpness, look | No | `9:16`, `720p`, phone-shot |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-talking-video"`.
2. **Orient** (house rules, section 1). Then `get_avatar` on the avatar who will be on camera
   and read:
   - `voice_id`: whether the voice step can run;
   - `bio`, `tone`, `archetype`: the lines should sound like this person (the server adds the
     persona to the brief by itself, so never paste it in);
   - `image_url`: needed only for a second avatar in the same clip (step 5).
3. **Pick the format** in [the formats](references/formats.md): it gives the `ugc_style`, the
   default length, the beats, and whether the voice step fits.
4. **Intake.** One message: at most 3 questions, only hard gaps, each with numbered options
   and a recommended one, then one line of defaults.

   > Happy to. One thing first: a photo of the serum. Send a link to the image itself, give
   > me its name if it is already in your Creatorline library, or drop it into
   > [your library](https://app.creatorline.io/assets?activeBrand=BRAND_ID) and tell me
   > when it is there.
   > Defaults: Mia, a 12-second phone-shot review at her bathroom sink, in English, in Mia's
   > own voice. Say if you want any of it changed.

   No topic given and no content angles to take one from: offer topics from the brand's
   niche.

   > What should Mia talk about?
   > 1. Why two drops of serum are enough (recommended)
   > 2. The skincare step most people skip
   > 3. Your own topic
   >
   > Defaults: a 10-second hot take, phone-shot, in English, in Mia's own voice.

   A photo pasted into the chat has no link the tools can read: ask for the library or a link,
   as above (BRAND_ID is the brand's id, so the right brand's library opens). With the product
   photo in hand and a clear ask, ask nothing and go to the plan.
5. **Write the brief.** Use the template in [video briefs](references/video-briefs.md)
   (section 3), the format's beats in [the formats](references/formats.md) and the line craft in
   [monologue craft](references/monologue-craft.md). Then:
   - count the spoken words against the length (video briefs, section 7) and fix it now;
   - put the person's own lines in quotes, with "use these lines as written";
   - write `Language: <language>` when it is not English;
   - write `Sound: voice and room sound only` when the voice step will run or music comes later;
   - a second avatar on camera (a podcast clip, an interview): pass its `image_url` from
     `get_avatar` in `inputs.characters` and call it `@Avatar2` in the brief, with its role. The
     avatar on camera goes in first by itself as `@Avatar1`.
6. **Plan and price.** Make the call without `confirm`:

   ```json
   {
     "tool": "ugc-video",
     "brand_id": "<brand>",
     "avatar_id": "<the avatar on camera>",
     "prompt": "<the brief>",
     "params": { "ugc_style": "Product ad", "duration": 12 },
     "inputs": { "objects": ["<product asset id>"] }
   }
   ```

   Leave out `model` (the default films AI faces, up to 30 s in one take), `aspect_ratio`
   (`9:16`) and `resolution` (`720p`) unless the person asked. The answer is
   `needs_approval` with `credits`, `credit_balance` and `sufficient`; nothing has started.
   When the voice step is planned, price it too, before the take exists:
   `estimate_generation_cost` with
   `{ "tool": "change-voice", "params": { "voice_id": "<the avatar's voice_id>" } }`.
   Then one short message: what you will make, each part's credits, the total, the balance,
   one question.

   > A 12-second review: Mia at her bathroom sink with the serum, three shots, ending on the
   > label. The video is <N> credits and Mia's own voice <M>, <total> in all. You have
   > <balance>. Go ahead?

   `sufficient: false`: follow house rules, section 2. Offer 8 to 10 seconds, or the clip
   without the voice step. A free trial or any other refusal: house rules, section 8.
7. **Run.** On yes, the same call with `confirm: true`.
8. **Wait and narrate.** `get_generation` with `wait_seconds: 45`, again and again until
   `status` is `succeeded` or `failed`. A talking video takes about 1 to 5 minutes. One line
   between calls, about this clip: "Writing Mia's lines." "Filming the three shots." "Nearly
   there." Never paste the status.
9. **Check the take** ([below](#check-before-you-show-it)). When a check fails, stop: show it,
   say what is off and what you would change (house rules, section 5), and say the voice step
   did not run and cost nothing.
10. **Voice step**, when planned, on the checked take:

    ```json
    {
      "tool": "change-voice",
      "brand_id": "<brand>",
      "avatar_id": "<the avatar on camera>",
      "inputs": { "video_url": "<the take's asset_id>" },
      "params": { "voice_id": "<the avatar's voice_id>" }
    }
    ```

    First without `confirm`. If the price is the one you quoted, call again with
    `confirm: true`: the yes covered it. If it differs, ask again. Wait as in step 8 ("Putting
    Mia's own voice on it.").
11. **Show** the card ([below](#show-the-result)) and offer the next steps.

## The avatar's own voice

The video model gives every take a voice of its own. It suits the face, but it is not the
avatar's saved voice, and it differs from video to video. To make every video sound like the
same person, re-voice the kept take with `change-voice` in the avatar's `voice_id` (step 10).
The words, timing, lip movement and delivery stay; only the voice changes.

| Run it when | Skip it when |
|---|---|
| `get_avatar` shows a `voice_id` | The avatar has no `voice_id`. Say once that a voice is added on the avatar's page, https://app.creatorline.io/avatars (house rules, section 9) |
| One person speaks | Two people speak (a podcast clip, an interviewer asking out loud): both would get one voice |
| The take is voice and room sound | Music is under the speech: it comes out badly distorted |
| | A real person is on camera: never give them someone else's voice |

- Always pass `avatar_id` and the avatar's voice as `params.voice_id`. Without `avatar_id`
  the run takes the brand's default avatar's voice, or a stock voice when that has none.
- It is a charge of its own: quote it with the video (step 6) and add the two.
- `params.change_voice: true` on the video call does the same thing by itself once the take
  lands. Avoid it here: its charge is NOT in the video's `needs_approval` price; the re-voiced
  clip arrives as a second clip in the project, which `get_generation` on the video does not
  return (it is under the same `studio_url`); it runs on a take nobody checked; and for an
  avatar without a voice it re-voices in the brand's default avatar's voice. Use it only when
  the person wants one call and has heard all four.

## Real people

- **A real person's photo instead of the avatar** (the person themself, or someone who agreed
  to it): `model: "bytedance-seedance-2-0-reference-to-video"`, `include_avatar: false`, the
  photo in `inputs.characters`, `duration` at most 15. The default model refuses real faces and
  this tool has no automatic fallback.
- **The person's own recorded voice** saying the lines: the audio file in `inputs.audio_urls`
  (a link to the file, or `import_asset` first), `duration` matched to the recording, and
  "@Avatar1 says @Audio1" in the brief, with the words not written out. Only their own voice,
  or one they have permission to use. No voice step after it.
- Never a public figure, a celebrity or anyone who did not agree (house rules, section 7).

## Craft

The short version. The long one, with hook patterns and examples, is
[monologue craft](references/monologue-craft.md).

- **One idea, one takeaway**, said out loud in full. Write the takeaway first, then the hook
  that earns it.
- **Hook in 0 to 3 s**: already mid-sentence or mid-action, the most specific line of the clip.
  No greeting, no name, no logo, no "So" or "Okay".
- **Payoff at half to three quarters**: the answer to the hook, with something not said yet.
  **Ending**: a verdict. A call to action goes in the caption or as on-screen text, never in
  the speech.
- **Words fit the seconds**: about 2.5 per second, fewer when the hands are busy.
- **Alive, not recited**: the hands have a task, the eyes a target, the energy written as what
  shows ("leans in, voice drops"), never as a label ("excited").
- **Phone-shot by default.** `Cinematic` only when the person asks for a polished film.
- **The claim floor** (house rules, section 7): the avatar says and shows what the product does
  now, never a result it had. `Product ad` is a demo, not a testimonial, whatever its label
  in the catalog says.
- **Our edge**: the same avatar, face and voice in every video, so a series builds a recognizable
  creator. Keep the setting and the energy consistent across a brand's videos unless the person
  wants variety.

## Check before you show it

1. `status` is `succeeded` with one video, and its `duration_sec`, when given, is the length
   you asked for, within a second.
2. `preview_assets` with the take's `asset_id` shows you one frame of it, its cover. Check:
   the right avatar (one person, or two for a two-person format), the product in frame when the
   hook needs it, a vertical frame, the setting you briefed, no stray text.
3. You cannot hear the take. Never tell the person the lines are right: show it and ask.
4. After the voice step: one video again, the same length.

## If it goes wrong

A failed run is refunded. Change one thing per retry and quote every retry (house rules,
section 5).

| What the person sees | Likely cause | Change |
|---|---|---|
| Rushed, mumbled or cut-off lines | More words than seconds | Cut words, or add seconds (quote again) |
| Silence, a line said twice, babble | Too few words for the seconds | Add a line, or shorten the clip |
| Different words than asked | Lines not quoted, or over budget | Quote them with "use these lines as written"; trim to fit |
| Lips off the words | Long lines, a moving head, two people talking at once | Shorter lines, one speaker per shot |
| The face changes between shots | Too much happening per shot | Fewer beats, one action per shot |
| Wooden, dead eyes | Nothing to do, nobody to talk to | A task for the hands, a target for the eyes |
| Looks staged, like an ad film | Film words in the brief, or `Cinematic` | Remove them; phone-shot |
| Wrong product, garbled label | A big logo, a weak photo | [Product intake](references/product-intake.md); exact words go in Video Studio text |
| A stranger, or a second copy of the avatar | Another person, not described | Describe them by role and clothing, or set the scene with no one else |
| A prop from nowhere (a mic, a mug) | Named in the brief, not supplied | Supply its photo in `objects`, or leave it out |
| Wrong language | Language not stated | `Language: <language>` in the brief |
| The spoken call to action is gone | The writer turns it into a verdict | Put it in the caption or as on-screen text |
| The re-voiced clip sounds distorted | Music or a second voice under the speech | Re-film with "voice and room sound only", re-voice, add music in Video Studio |
| Stopped by a content check | A risky word, a real name, another brand | Rephrase as `next` suggests. Nothing risky, and the face may be a real person's photo: [Real people](#real-people) |
| Refused for a real face | A real person's photo on the default model | [Real people](#real-people) |
| Refused before it starts: no face for the avatar slot | The brand's avatar has no face yet | Nothing was charged. The face is made in the app, https://app.creatorline.io/avatars/new |

## Show the result

```
**Mia's serum review**: 12 s, Mia at her bathroom sink, label to camera, in her own voice
[Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next? Or tell me what to change.
1. Add word-by-word captions
2. Make a cover for it
3. Put it in your review queue as a TikTok post
```

- After the voice step, link the re-voiced clip (its own `get_generation` output). The first
  take stays in the same project, under the same `studio_url`.
- `<N>` is everything this request spent: the video plus the voice step.
- Media links expire: always add the `studio_url`.
- One question only (asking, section 7). Turn vague feedback into one concrete change, say
  it, and quote the re-run.

## Next steps to offer

Pick the 2 or 3 that fit this clip:

| Offer | Skill |
|---|---|
| Captions under the words | `creatorline-captions` |
| A hook line on screen, a call to action, music, a split screen with what the avatar reacts to | `creatorline-video-studio` |
| A cover image | `creatorline-cover-image` |
| Another hook, avatar or language of the same video | `creatorline-ad-variations` |
| The same idea as a longer episode or a series | `creatorline-ai-host` |
| A caption, hashtags and a post in the review queue | `creatorline-publish` |

When the person wants text, captions or music on it, the clip goes into a Video Studio project
first: `create_video` with `brand_id`, a `title` and one `add_clip` operation with the take's
`asset_id` (free). The sibling skill takes it from there.

## References

- [Formats](references/formats.md): each talking format with its `ugc_style`, length, beats,
  inputs, pitfalls and an example brief.
- [Monologue craft](references/monologue-craft.md): hooks, lines, word density, performance cues,
  staging and the claim floor per format.
- [House rules](references/house-rules.md): the session, consent before spending, waiting,
  results, failures, safety, what only the app does.
- [Asking](references/asking.md): how to run the intake.
- [Video briefs](references/video-briefs.md): the brief template, templates, speech budget,
  inputs and defaults.
- [Product intake](references/product-intake.md): getting the product photo in, the product card,
  claims and logos.
