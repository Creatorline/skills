---
name: creatorline-talking-head
description: "Makes a video of the AI avatar reading the person's script to camera word for word, up to 3 minutes, optionally on green screen. Use for 'say this script', 'teleprompter', 'presenter'. Not for a short clip you write: use creatorline-talking-video. A show: creatorline-ai-host."
license: MIT
metadata:
  author: creatorline
  version: "2.1"
---

# Talking Head

You make one vertical video in which the person's avatar says the person's own script straight
to camera: every word as written, in one steady frame, up to three minutes, in the avatar's
voice. It is the presenter's format: an explainer, an announcement, a lesson, a founder's note,
a long answer, or a green screen presenter who will stand over gameplay, slides or a screen
recording. The person brings the words (or asks you to write them), sees the price, says yes,
and gets back one clip, ready for captions, a layer in Video Studio, or a post.

Run the session by [the house rules](references/house-rules.md) (orient, consent before
spending, waiting, the result card, failures, safety) and ask every question the way
[asking](references/asking.md) says. This file adds only what is particular to talking heads.

## When to use

- "Have my avatar say this", with a script pasted or attached.
- A teleprompter read, a presenter, a talking head with a fixed frame.
- An explainer, an announcement, a course lesson, a founder or CEO message, an FAQ answer.
- Anything spoken to camera from 5 seconds up to 3 minutes in one take.
- A green screen avatar to put over another video (gameplay, slides, a screen recording, a
  product demo).

## Not for

| The ask | Use |
|---|---|
| A 5 to 30 s UGC clip whose lines you write: a review, a hot take, a GRWM, with actions and cuts | `creatorline-talking-video` |
| An episode or series with several takes, cutaways, a set and an edit style | `creatorline-ai-host` |
| A voice with no face on camera | `creatorline-voiceover` or `creatorline-faceless-video` |
| A new voice or lip sync on a video that already exists | `creatorline-voiceover` |
| Only the words, nothing filmed | `creatorline-short-script` |
| Cutting, layering or adding text to a finished video | `creatorline-video-studio` |
| Captions on a finished video | `creatorline-captions` |
| The same kind of talking head on repeat, or a talking head as one step of a pipeline | `creatorline-workflows` (the `talking-head` stage) |

A script with no product and no actions is still this skill. When the person wants the avatar
to show or use something while talking, that is a talking video.

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| Brand | Only with several brands and no hint | The only brand |
| Avatar | Only when the brand has none with a face: it is made in the app, https://app.creatorline.io/avatars/new | The brand's default avatar. A named one: find it by name in `list_avatars` |
| The script | Yes, unless they ask you to write it | Written by you in the brand's voice (`get_brand`, `brand_voice`), at the length they name, and shown before the quote |
| Length | No: the script decides it | About 150 words a minute. 3 minutes (about 450 words) at most |
| Voice | No | The avatar's own voice. Another one: `list_voices`, then `params.voice_id` |
| Scene | No | The avatar's photo as it is: its own setting and light |
| A place | Only offered when they mention one | `params.location`: a short description ("a bright home office") |
| Microphone | No | Off. `params.microphone: true` for a handheld mic (interview, podcast feel) |
| Green screen | No | Off. `params.green_screen: true` when the avatar will stand over another video |
| Quality | No | `params.resolution: "768P"`, said as "standard". `480P` for a cheap draft, `1080P` for the sharpest (it costs more) |

A place, a microphone or a green screen makes a new scene from the avatar's photo first, inside
the same run; it adds to the price, and the quote says how much. Leave all three out and the
avatar's own photo is the frame.

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once for this request
   with `skill_name: "creatorline-talking-head"`.
2. **Orient** (house rules, section 1): the brand, its default avatar, a named avatar. The
   avatar must have a face; `get_avatar` tells you its `voice_id` too.
3. **Get the words.** Their script, as given. No script: write one ([script craft](references/script-craft.md)),
   in the brand's voice and the person's language, and show it with the plan.
4. **Polish without rewriting.** Keep every word of a given script in its order. Fix only
   typos and punctuation, break a run-on sentence where a speaker breathes, and add a few
   emotion tags ([script craft](references/script-craft.md), section 2). Show what you
   changed in one line; any rewrite of their words needs their yes.
5. **Plan in one message** (asking.md): the avatar, the scene (as it is, or the place, mic or
   green screen), the voice, the quality, the script as it will be said, and about how long it
   runs. Ask only a real gap.
6. **Price.** `create_generation` with every argument and no `confirm`:

   ```json
   {"tool": "talking-head", "brand_id": "<brand id>",
    "prompt": "<the script, tags included>",
    "params": {"resolution": "768P"}}
   ```

   Add `avatar_id` for a named avatar and the scene params only when asked. The answer is
   `status: "needs_approval"` with `credits`, `credit_balance`, `sufficient` and `duration_sec`
   (the script's estimated length). Say: "About 40 seconds, <N> credits; you have <M>. Go
   ahead?" The charge settles to the length actually spoken once it is filmed.
7. **On yes:** the same call with `confirm: true`. Keep `generation_id` and `studio_url`.
8. **Wait.** `get_generation` with `wait_seconds: 45`, again until `succeeded` or `failed`. A
   long script takes several minutes: it is spoken and filmed part by part, then joined. One
   short line between polls ("Filming the second half now."). Past about 5 minutes, give the
   `studio_url` and say they can ask "is it ready?" any time.
9. **Check it, show it, offer next steps** (below).

## Green screen: putting the avatar over a video

The take comes back on a flat green background. To stand the avatar over another video,
build it in Video Studio (free; the export and captions have their own price there):

```json
{"brand_id": "<brand id>", "title": "<title>",
 "operations": [
   {"op": "add_clip", "asset_id": "<the main video's asset id>"},
   {"op": "add_layer", "asset_id": "<the talking head's asset id>", "kind": "green_screen",
    "column": "left", "row": "bottom", "width": 0.45, "over": "video", "sound": true}
 ]}
```

Send that to `create_video`. The green comes off and the avatar stands bottom left. Bottom right
or a bigger presenter: change `column` or `width`. A main video shorter than the talking head
cuts the layer at its end, so pick one at least as long, or add clips after it with
`edit_video`. Then `preview_video` to look, and `creatorline-video-studio` for the rest.

## Check before you show it

- `duration_sec` is close to the estimate. Much shorter: words went missing; say so.
- `preview_assets` on the output's `asset_id`: the avatar is the avatar, the mouth is visible,
  the frame is 9:16, a green screen is flat green.
- The voice is the one you planned (the avatar's own unless you set `voice_id`).

## If it goes wrong

| What happened | Do this |
|---|---|
| Refused: the script "has nothing to say" | Only tags or symbols were sent. Send the words. |
| Refused: the script "takes about N seconds" | Over 3 minutes. Cut it (say what you cut), or split it into two videos priced together. |
| Refused: no face image | The avatar has no face yet: make it at https://app.creatorline.io/avatars/new, or name another avatar. Nothing was charged. |
| Failed: "a sentence is too long to say in one breath" | Refunded. Break that sentence with a full stop, quote again, ask. |
| Failed for another reason | Refunded automatically: say so. Say what you will change, quote, and ask before running again. |
| The voice is wrong | Pass `params.voice_id` from `get_avatar` or `list_voices`. |
| Wrong language or accent | The voice speaks what is written: write the script in that language, or pick a voice of that accent in `list_voices`. |

## Show the result

```
**Spring launch announcement**: 1 min 12 s, Mia at her desk, in her own voice
[Watch the video](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next? Or tell me what to change.
1. Captions of what she says
2. Put her over your product demo (green screen)
3. A post package: caption, hashtags, a comment to pin
```

Media links expire: always add the `studio_url`. One question only (asking, section 7).

## Next steps to offer

| Offer | Skill |
|---|---|
| Captions of what is said (they help a long talk most) | `creatorline-captions` |
| The avatar over another video, text, music, a hook line | `creatorline-video-studio` |
| A cover image | `creatorline-cover-image` |
| The same script in another language or voice | this skill again, with the translated script |
| Shorter cuts of a long take for Reels and TikTok | `creatorline-long-to-shorts` |
| The post itself | `creatorline-publish` |

## References

- [Script craft](references/script-craft.md): writing to be said, sentence length, the emotion
  tags and where they go, pacing by length, the polish rules.
- [House rules](references/house-rules.md), [asking](references/asking.md): shared by every
  skill.
