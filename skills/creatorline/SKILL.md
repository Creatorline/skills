---
name: creatorline
description: "Creatorline's front door: shows the workspace (brands, AI avatars, accounts), sends each request to the skill made for it, and makes quick one-offs itself: one photo of the avatar, a short clip, an animated photo. Use for get started, what can I make, help, or a failed or stuck run. Not for a named format: use its skill, such as creatorline-reshoot."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Creatorline

Creatorline makes short vertical videos and photos with a brand's AI avatar (a face, a voice
and a persona that stay the same in every piece) and posts them to TikTok, Instagram and
YouTube through a review queue. This skill is the front door. It shows the person where they
are and what they can make right now, sends each request to the skill built for it, makes
quick one-off pieces itself, and gets a failed or stuck run moving again. The promise: from
their first sentence to a finished, posted piece, the person always knows what is happening
and what comes next.

Tools in backticks are the Creatorline connector's tools. Every request follows
[references/house-rules.md](references/house-rules.md) (orient, ask little, price before
anything spends, wait and narrate, show, offer next steps), and every question follows
[references/asking.md](references/asking.md). Call `track_skill_activation` with `creatorline`
once per new request this skill takes on, never while waiting or retrying (house rules,
section 10).

## When to use

- The first message about Creatorline: a greeting, "get started", "what can I do", "help".
- A content ask that names no format yet: "make something for my brand", "I need a post".
- One simple piece with no format around it: a plain photo of the avatar (no product of
  theirs, no outfit to show), a picture with no one in it, a short clip of the avatar, a photo
  brought to life, a scene clip.
- Account questions: which brands, avatars and accounts there are, how many credits are left,
  what a piece would cost (`estimate_generation_cost`, free, starts nothing).
- A generation that failed, is stuck, or came out wrong. A post that failed to go out:
  `creatorline-publish`.

## Not for

A request that names a format or a finished deliverable goes straight to its skill (the routing
table below), with no welcome first. The ones most often mistaken for this skill:

- Several photos, a photoshoot, a carousel, or a photo with the person's own product or an
  outfit to show: `creatorline-photos`. One plain photo stays here.
- The avatar reviewing, demoing or explaining something on camera: `creatorline-talking-video`.
  A clip of the avatar doing something with no format around it stays here.
- Any voice work, a single voice line included: `creatorline-voiceover`.
- Words for a video not made yet (hooks, a script, a caption): `creatorline-short-script`. A
  caption for finished media: `creatorline-publish`.
- Posting or scheduling finished media: `creatorline-publish`.
- The same thing on repeat: `creatorline-workflows`.

Once this skill is making a one-off and the person adds a product photo or a voice line to it,
make that here with the fast path's rows instead of switching skills.

## Connecting

<!-- connect:start -->
No Creatorline tools in your list (no `list_brands`)? Connect the server first. You cannot sign
in for the person; tell them the step for the tool you are.

- **Claude Code**: run `claude mcp add --transport http creatorline https://api.creatorline.io/mcp`.
  The person then types `/mcp`, picks `creatorline` and signs in in the browser. If it is not
  listed yet, they restart the session first.
- **Codex**: run `codex mcp add creatorline --url https://api.creatorline.io/mcp`, then
  `codex mcp login creatorline`, which opens the browser to sign in.

They sign in with their own Creatorline account. Steps for chat apps and other tools are on
https://app.creatorline.io/agents.
<!-- connect:end -->

## First run: show them where they are

Do this once per conversation, before anything else, when the person opens with a greeting, a
question about what they can do, or a vague ask.

1. Call these free tools together: `get_credit_balance` (its `workspace` is the workspace's
   name), `list_brands`, `list_avatars`.
   - One brand: call `get_brand` and `list_connections` with its `brand_id`.
   - Several: ask which brand first, by name (asking.md), then call those two.
2. Send ONE short message: what is set up, then 3 or 4 things they can make right now. When a
   question tool is in your list (ChatGPT's `ask_user_input`), offer the options through it
   (asking.md, section 3); otherwise as a numbered list.

```
You're in **Studio**, on the brand **Glow Lab** (skincare).
Avatar: **Mia** · Accounts: TikTok @glowlab, Instagram @glow.mia · 1,240 credits

What should we make?
1. **A talking video**: Mia reviews a product to camera in 10 seconds. Send the product photo.
2. **A trend, re-filmed**: paste a TikTok or Reels link and Mia films her version.
3. **Photos for a carousel**: Mia with your product, ready to post.
4. **A week of posts**: planned from Glow Lab's content angles, then made one by one.
Or tell me in your own words.
```

- The avatar's name: the `list_avatars` row whose `id` is the brand's `default_avatar_id`
  (not on that page: `get_avatar` with that id). Name the brand's other avatars only when there
  are two or three; more: "and 4 more".
- Accounts: `platform` and `handle` from `list_connections`. Credits: `credit_balance`.
- Option 4 can quote one of the brand's own content angles (`brand_voice.content_angles` in
  `get_brand`) to show it knows the brand.

When the first message is already a real request, make the same calls quietly, open with one
line ("Working on Glow Lab with Mia."), and go straight to the request.

**Adapt the welcome to what you found:**

| You find | Say, in one line | Offer |
|---|---|---|
| No brand | Creatorline works per brand: create the first at https://app.creatorline.io/brands/new | nothing else until it exists |
| No avatar for the brand | Make the avatar (face, voice, persona) at https://app.creatorline.io/avatars/new | a narrated faceless video, photos without a person, a script |
| No connected account | Posting needs one, connected at https://app.creatorline.io/connections; making works now | the usual options |
| An account with `can_publish: false` | "TikTok @glowlab needs reconnecting" with the connections link | the usual options |
| `free_trial: true` | The trial answer (house-rules.md, section 8): nothing that uses credits runs until the plan starts | a script, a week planned, the avatar's face made in the app |
| Not the workspace they meant | They switch it (house-rules.md, section 8) | |

## Route the request

Pick the skill by what the person wants to end up with. Hand off at once; the skill runs its own
intake.

| The person wants | Skill |
|---|---|
| The avatar talking to camera: a product review or demo, a hot take, a story, tips, a GRWM chat, a reaction, a street-interview bit (5 to 30 s, one take) | `creatorline-talking-video` |
| The product as the hero with a voice over it; a person only as hands or a point of view | `creatorline-product-video` |
| An unboxing, a haul or a PR package opened, with the avatar's reaction | `creatorline-unboxing-video` |
| An outfit, shoes, a bag or jewelry on the avatar: OOTD, fit check, try-on haul | `creatorline-try-on-video` |
| A step-by-step how-to with the avatar, each step labeled on screen | `creatorline-tutorial-video` |
| A promo for an app, website, online store or software, with real screenshots or a screen recording (no trend link to copy) | `creatorline-app-promo-video` |
| A TikTok, Reels or Shorts link re-filmed with the avatar: same beats and sound, new performer, maybe their product or app | `creatorline-reshoot` |
| A real video kept exactly, with one or two people in it replaced by avatars; or the avatar doing a dance's moves | `creatorline-character-swap` |
| Many versions of one video to compare: other avatars, hooks, products, voices, two or more languages | `creatorline-ad-variations` |
| A longer episode (30 to 120 s) or a recurring series with the avatar as host; an episode script over 60 s | `creatorline-ai-host` |
| A narrated video with no face on camera: a story, an explainer, a list, history, motivation | `creatorline-faceless-video` |
| Editing a video: cuts, trims, order, text on screen, split screen, a stock hook clip, sound, export (a hook line among other edits) | `creatorline-video-studio` |
| Captions of what is said, a hook headline, or both, burned onto a finished video and nothing else changed | `creatorline-captions` |
| Any voice: narration over a video, a voice line, a re-voice in the avatar's voice, one video in another language, a dialogue, lip sync | `creatorline-voiceover` |
| A photoshoot of the avatar, any photo with their product or an outfit to show, a photo dump, a carousel | `creatorline-photos` |
| A cover or thumbnail with a few words on it | `creatorline-cover-image` |
| Words only for a video not made yet: hooks, a script (up to 60 s), a caption, nothing filmed | `creatorline-short-script` |
| A podcast, YouTube video or long talk cut into several shorts | `creatorline-long-to-shorts` |
| A week or two of posts, planned and then made | `creatorline-content-calendar` |
| Finished media into a post: its caption and hashtags (also as text only), accounts, time; a post's status | `creatorline-publish` |
| A pipeline that runs again and again, or one rebuilt from another tool | `creatorline-workflows` |

**Look-alikes** (more cases in [references/routing.md](references/routing.md)):

- **Reshoot, Character Swap or motion control.** The same idea and beats performed again by the
  avatar, maybe with the person's product and new lines: Reshoot. The real video kept exactly
  (moves, camera, cuts, sound) with only the people changed: Character Swap. Only the moves of
  a dance or gesture, performed by the avatar from its photo: motion control, inside the
  Character Swap skill. Reshoot needs one main person in the source; two people: Character Swap.
- **Talking video or AI host.** One clip of 5 to 30 seconds in one take: talking video. Longer,
  several takes, or an episode of a series: AI host.
- **Captions or voiceover.** Words the viewer reads: captions. A voice the viewer hears:
  voiceover. Both on a silent video: voiceover first, captions last.
- **Photos or cover image.** Photos posted as they are: photos. One image made to win the tap,
  with a few large words: cover image.
- **Clips from long videos or Video Studio.** A long recording cut into several shorts by topic,
  automatically: long-to-shorts. One video edited by hand: Video Studio.
- **Talking video or product video.** The avatar's face speaking on camera: talking video. The
  product filling the frame, the voice off screen: product video.
- **Voiceover or ad variations.** One new voice or one other language on one video: voiceover.
  Two or more versions to compare: ad variations.
- **Captions or Video Studio.** Speech captions, a hook headline or both, nothing else: captions.
  Cuts, order, labels, layers, music or the export, a hook line among them: Video Studio.
- **Short script or publish.** A caption for media that is finished: publish (text only when
  that is all they want). Words for a video not made yet: short script.

**Hand off well:**

1. Tell the person the format in plain words ("Let's make a talking video."). Never name a skill.
2. Carry over what you know (brand, avatar, product photo, link, length, lines), so the next
   skill never asks again.
3. Load the skill and follow it. If it is not available in this session, call `get_guide` with
   its name without `creatorline-` as `topic` (`talking-video`) and follow that text.
4. A request that spans skills ("make it, caption it, post it tonight"): start with the one that
   makes the media. Price every paid step you can before any of it starts
   (`estimate_generation_cost` prices a later generation from partial inputs) and ask one yes
   for the total (house rules, section 2). A step that has a price only once the media exists
   (captions, an export) gets its own quote and yes when you reach it.
5. Two still fit: ask ONE question about the outcome, not about tools: "Keep the original video
   and only change who is in it, or film it again with Mia?"
6. A preset, effect or feature from another app ("money rain", "glow-up effect"): a hint about
   the outcome. Make the closest thing through the fitting skill and say so in one line.

## Fast path: quick one-off pieces

Use it when the person wants one simple piece and no format fits. Ask only a hard gap (the
photo to animate, the words to say, the product photo they mentioned), in the same message
that states the defaults:

> A photo of Mia at the beach: casual phone look, portrait frame, one photo. Should she hold
> your sunscreen? If so, send me its photo.

| They want | `tool` | What goes in |
|---|---|---|
| A photo of the avatar: a selfie, a moment, an outfit, holding something | `photo-edit` | a `prompt` that says "the avatar ..."; a product or prop photo in `inputs.other_elements` |
| Their own product alone, no person | `photo-edit` | the product photo in `inputs.other_elements`; `include_avatar: false` |
| A picture with no avatar: a place, a background, food, a mood | `text-to-photo` | `prompt` only; never `avatar_id` |
| A short clip of the avatar doing or saying something | `ugc-video` | `prompt`: the brief |
| A photo brought to life | `photo-to-video` | the photo in `inputs.image_url` (asset id or file link); `prompt`: only what moves |
| Their product moving on its own (a spin, a pour, a reveal), no person, no voice | `photo-to-video` | the product photo in `inputs.image_url`; `prompt`: the motion and one camera move |
| A clip with no avatar: b-roll, a place, an establishing shot | `text-to-video` | `prompt`: one scene, fully described |
| A voice line | `text-to-speech` | `prompt`: the exact words (up to 2,000 characters); `params.voice_id`: the avatar's `voice_id` from `get_avatar` |

- **Every picture of the avatar is `photo-edit`.** `text-to-photo` draws from words alone: it
  cannot show the avatar and refuses `avatar_id`.
- **Voice:** `text-to-speech` uses a stock voice unless `params.voice_id` is passed. Always pass
  the avatar's (or the brand's `voice_id` from `get_brand` when there is no avatar). To give a
  finished clip the avatar's voice, run `change-voice` on it (its own price, its own result)
  rather than setting `change_voice` on `ugc-video`, whose re-voiced copy is a separate run that
  `get_generation` does not return.
- **The exact look in motion:** get the still right with `photo-edit` first (cheap and quick to
  redo), get a yes on it, then animate it once with `photo-to-video`. Make that still 9:16 (the
  photo frame row below) so the clip fills the screen. For the avatar talking or acting across
  several shots, go straight to `ugc-video`.
- **Product with a voice over it** is a format: `creatorline-product-video`.
- Other models, slots and values: `list_models` with the `tool`. Never guess a key or a value.

**Defaults, stated in one line, never asked** ("Mia, vertical, 10 seconds, shot like a phone
video."):

| Setting | Default |
|---|---|
| Avatar | the brand's default avatar; another only when the person names one (`avatar_id`) |
| Video frame | `aspect_ratio: "9:16"` (the video tools' default) |
| Photo frame | `aspect_ratio: "3:4"` on `photo-edit`, whose default model has no 9:16. A still that must fill a 9:16 screen (a story, a frame to animate): `model: "gpt-image-v2-edit"` with `aspect_ratio: "9:16"`. `text-to-photo` defaults to 9:16. |
| Look | phone-native UGC: leave `ugc_style` on `Auto`; `Cinematic` only when asked |
| Video length | 10 seconds (the default `duration`) |
| Video sharpness | `720p` (the default); `1080p` costs about 2.5 times as much, only when asked and only where `list_models` lists it (the default `photo-to-video` model has 720p alone) |
| Photo size | `resolution: "2K"`; never `4K` unless asked |
| Photos per run | 1; `count` 2 to 4 when they want options |
| Spoken language | the brand's `language` from `get_brand`, written into the brief |

**The flow:**

1. Plan in one line: "A 10-second vertical clip: Mia pours coffee at her kitchen counter and
   says one line about slow mornings."
2. Price: `create_generation` with every argument and no `confirm`. The answer is
   `status: "needs_approval"` with `credits`, `credit_balance` and `sufficient`. Say: "That's
   <N> credits; you have <M>. Go ahead?" Nothing has started. With `sufficient: false`, say how
   many are missing and offer a cheaper version instead (house rules, section 2).
3. On yes: the same call with `confirm: true`. The answer has `generation_id`, `studio_url`,
   `credits_charged` and the `credit_balance` left (the card's "Used" and "left").
4. Wait: `get_generation` with `wait_seconds: 45`, again and again until `status` is `succeeded`
   or `failed`. One short line between calls ("Filming the clip now."). A photo takes under a
   minute, a video 1 to 5 minutes. Past about 5 minutes, give `studio_url` and say they can ask
   "is it ready?" any time.
5. Check it, show it, offer next steps (below).

```json
{"tool": "photo-edit", "brand_id": "<brand id>",
 "prompt": "The avatar sits at a sunny cafe window holding the iced latte from @Input1 in both hands, laughing at something off camera. Casual phone photo, natural window light.",
 "inputs": {"other_elements": ["<asset id of the drink photo>"]},
 "params": {"aspect_ratio": "3:4", "resolution": "2K"}}
```

```json
{"tool": "photo-to-video", "brand_id": "<brand id>",
 "inputs": {"image_url": "<asset id of the photo>"},
 "prompt": "She lifts the cup, takes a slow sip and smiles at the camera. Steam drifts up. The camera pushes in slowly."}
```

```json
{"tool": "text-to-speech", "brand_id": "<brand id>",
 "prompt": "[excited] Three things I pack for every weekend away. The last one always gets asked about.",
 "params": {"voice_id": "<voice_id from get_avatar>"}}
```

**Briefs that work.** The server's writer turns the `prompt` into the model's prompt. Give it the
idea and the facts it cannot invent; it does the filmmaking ([references/video-briefs.md](references/video-briefs.md)).

- **Photo of the avatar:** "the avatar", where, doing what, holding what, the light. A person
  appears only when the brief asks for one. Casual: "casual phone photo, natural light".
- **Clip:** the idea in a sentence, the hook for the first 3 seconds, the one takeaway, exact
  lines in quotes. About 2.5 spoken words a second: 22 to 30 words for 10 seconds.
- **Animated photo:** only what moves, one camera move, one continuous take. Never re-describe
  what the photo shows; never ask for a cut.
- **Scene clip:** the subject, the place and light, one action, one camera move, the sound.
- **Voice line:** the words exactly as spoken. Tags such as `[excited]`, `[whispers]` and
  `[laughs]` set the feeling.
- Describe what is there, never "no X". The avatar is synthetic: no personal results, no
  history with a product, no credentials (house rules, section 7).

## Check before you show it

- `preview_assets` with `asset_ids` set to the output's `asset_id` shows you the photo or a
  video's cover. Check the avatar is there and looks like the avatar, the product shows, the
  frame is right.
- A video: `duration_sec` matches the ask; the words fit the seconds. A voice line: you passed
  the avatar's `voice_id`.
- Something is off: say so plainly with what you would change, and give the take one verdict
  (house rules, section 5) before any new spend.

## Show the result

The delivery card (house rules, section 4), with the media link and `studio_url`:

```
**Mia at the cafe**: a portrait photo, Mia laughing with the iced latte
[See the photo](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Bring it to life: a short clip that starts on this photo
2. Three more like it, for a carousel
3. Post it to Instagram
```

Media links expire; `studio_url` stays. Several photos: one line each with its own link, then one
"What next?".

## Next steps to offer

Pick the 2 or 3 that fit, one line each, and run the chosen one through its skill.

| What was made | Offer |
|---|---|
| A photo | animate it (`photo-to-video`, here); more like it for a carousel (`creatorline-photos`); a cover with words (`creatorline-cover-image`); post it (`creatorline-publish`) |
| A clip | captions (`creatorline-captions`); a hook, text or more clips (`creatorline-video-studio`); versions with other hooks (`creatorline-ad-variations`); post it |
| A voice line | put it under a video (`creatorline-voiceover`); have the avatar say it on camera (lip sync, `creatorline-voiceover`) |
| A scene clip | b-roll in a narrated video (`creatorline-faceless-video`) or in Video Studio |

## If it goes wrong

Every failed run is refunded automatically: say so. The full table is
[references/troubleshooting.md](references/troubleshooting.md).

| What happened | Do this |
|---|---|
| A video with a real person's photo or face failed | The default video model takes AI faces only. With that person's consent, run `ugc-video` again (after a yes) with `model: "bytedance-seedance-2-0-reference-to-video"`; one take holds 15 s. |
| The avatar is missing from a photo | It was `text-to-photo`, `include_avatar: false`, or a brief with no person in it. Redo on `photo-edit` with "the avatar ..." in the brief. |
| The voice is not the avatar's | Pass `params.voice_id` from `get_avatar` (`voice_a` on `dialogue`). For a finished clip: `change-voice` with `inputs.video_url` = its `asset_id` and that `voice_id`. |
| `queued` for a while | The workspace runs a set number of generations at once; this one waits for a free slot and starts by itself. Keep waiting; never start it again. |
| A paid call timed out | It may have started. Check (`get_generation`, `list_assets` with `source: "generated"`, `list_videos`) before calling again. |
| Captions show `out_of_date` | The clips changed after captions were written: `write_captions` again, free and with no yes needed. |
| An account has `can_publish: false` | Reconnect it at https://app.creatorline.io/connections. |
| A free-trial answer, only `get_plan_requirement`, or only `list_workspaces` | House-rules.md, section 8: pass on the server's words and only the links its answer gave. |

After three paid tries at the same thing, stop and offer ways on: keep the best take, change the
idea, or reach the goal another way.

## What only the app does

Say it in one line with the link; never pretend to do it from here. The full list is in
house-rules.md, section 9.

| Task | Where |
|---|---|
| Create a brand | https://app.creatorline.io/brands/new |
| Create an avatar (face, voice, persona) | https://app.creatorline.io/avatars/new |
| Connect or reconnect a social account | https://app.creatorline.io/connections |
| Browse trends to re-film | https://app.creatorline.io/trending |
| Approve, edit or decline a post waiting for review | https://app.creatorline.io/review |
| The posting calendar, rescheduling, cancelling | https://app.creatorline.io/publish |
| Analytics | https://app.creatorline.io/analytics |
| Upload a file from the person's device | https://app.creatorline.io/assets, then find it with `list_assets` |

Pages that show one brand at a time open on the right brand with `?activeBrand=<brand id>`
added to the link. Trends and analytics depend on the workspace's package: a locked page means it
is not included.

## References

- [references/routing.md](references/routing.md): example requests for every skill, the
  look-alikes settled, requests that chain skills, and what is not possible from a chat.
- [references/troubleshooting.md](references/troubleshooting.md): every refusal, failure and
  wrong result, with its fix.
- [references/house-rules.md](references/house-rules.md): the session, consent before spending,
  waiting, the delivery card, safety, the server's refusals, the app-only list.
- [references/asking.md](references/asking.md): how to ask, and how little.
- [references/video-briefs.md](references/video-briefs.md): how to write a brief the server's
  writer turns into a strong video or photo.
