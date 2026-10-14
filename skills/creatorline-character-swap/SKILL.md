---
name: creatorline-character-swap
description: "Swaps one or two people in a real video for AI avatars, keeping every move, the camera, the cuts and the sound, or has an avatar dance a video's moves on its own. Use for 'put my avatar in this TikTok', 'swap the dancer for Mia', 'replace both people'. Not for a new take with new lines or a product: use creatorline-reshoot. Try-ons: creatorline-try-on-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Character Swap

Character Swap keeps a real video as it was shot (every move, the camera, the cuts, the
setting, the sound) and puts the person's avatar in place of the person on screen, or two
avatars in place of two people. It is the fastest way to ride a trend with the exact
performance that made it work, or to give a proven video a new face. Your promise to the
person: their avatar in that video, looking as if it was filmed there, at a price they agreed
to before anything ran.

## When to use

- "Put my avatar in this video", "swap the dancer for Mia", "replace both people in this skit
  with Jack and Mia", "Mia in this exact dance, wearing this jacket".
- A trend dance, a skit, a reaction, a walk-in, a lip-sync clip: any video where the exact
  performance is the point.
- "My avatar does this dance on its own" or "in front of a plain wall": the motion route in
  [Pick the route](#pick-the-route).

## Not for

| The person wants | Hand off to |
|---|---|
| The trend's idea filmed again with their product, new lines or a new place | `creatorline-reshoot` |
| Only a product or object changed, the person kept as filmed | Not possible here: a swap always replaces a person. `creatorline-reshoot` films it again with their product. |
| Several versions of one video (other avatars, hooks, voices, languages) | `creatorline-ad-variations` |
| A try-on, fit check or OOTD video, where the outfit is the content | `creatorline-try-on-video` |
| A new video of the avatar from an idea or a script | `creatorline-talking-video` |
| A new voice on a video, with no swap | `creatorline-voiceover` |
| The avatar in a photo | `creatorline-photos` |
| Three or more people swapped, or a crowd | Not possible: two people at most. Offer the two main ones. |

## Pick the route

| Route | Kept from the video | The avatar brings | Pick it when |
|---|---|---|---|
| **Transfer** (`character-swap-transfer`, the default) | Moves, camera, cuts, setting, sound, and the performer's clothes | Face, hair, body | "Put my avatar in this video." Most requests. |
| **Replace** (`character-swap-replace`) | Moves, camera, cuts, setting, sound | Face, hair, body, and the clothes in its own image or in an Outfit image | "As she looks", "in her own clothes", "wearing this outfit" |
| **Motion** (tool `motion-control`) | Only the moves: the footage itself is not kept | Its photo, clothes and all, in the video's setting or the photo's own background | "Do this dance on its own", "on a plain background". One person only. |
| **Reshoot** (`creatorline-reshoot`) | The idea, the beats, the cut rhythm, the sound | A new take: their product, new lines, a new place | They want their own version, not this footage |

Tell the person what a route does, never its id: "Mia takes her place and wears her outfit."
A swap copies only the moves that are in the clip. Anything new needs Reshoot or a new video.

## What you need

| Item | Hard gap? | Default, stated and not asked |
|---|---|---|
| The source video | Yes | None. A TikTok or Instagram post link, a direct video file link, or a video in their library. A YouTube link or a file on their device goes through the app ([references/sources.md](references/sources.md)). |
| Who goes in | No | The brand's default avatar takes the main person (the biggest, most central one doing the main action). An avatar they name is found by name. |
| A second person swapped | Only when they asked for two and named no second avatar | Nobody: the second person stays as filmed. |
| Mode | No | Transfer. Replace when they want the avatar's own look or give an outfit. |
| Which seconds | No | From the start, the whole clip, up to 30 s. |
| Quality | No | `720p`. `480p` to test a risky source cheaply, `1080p` for a final ad. |
| Voice | No | The video's own sound. A re-voice in the avatar's voice is a follow-up ([The voice](#the-voice)). |

## The flow

1. **Activate.** If `track_skill_activation` is in your tools, call it once with
   `skill_name: "creatorline-character-swap"`. Never while waiting or retrying.
2. **Orient** once per conversation (house-rules.md, section 1): the brand, its default avatar,
   the balance.
3. **Intake, only when something is missing** ([references/asking.md](references/asking.md)).
   The source is the one hard gap. One message, options, then the defaults line:
   > Send me the video to swap:
   > 1. A TikTok or Instagram link (recommended)
   > 2. A video already in your Creatorline library: tell me its name
   > 3. A file on your device: upload it to your library (link) and tell me when it is there
   >
   > Defaults: Mia takes the main person and wears the clip's outfit; the original sound stays.

   The library link is https://app.creatorline.io/assets with `?activeBrand=<brand id>`
   (house-rules.md, section 9). Ask who plays the second person only when they asked for two
   and did not say.
4. **Bring the source in.**
   - A post link or a direct file link: `import_asset` with `url`, `brand_id` and a short
     `title`. Keep `id` and `duration_sec`.
   - A library video: `list_assets` with `brand_id`, `file_type: "video"` and `search`. Keep
     `id` and `duration_sec`.
   - A YouTube link, a file on their device, "that trend": [references/sources.md](references/sources.md),
     section 1.
5. **Look at it.** `preview_assets` with `asset_ids: [<source id>]` shows the cover frame and
   the length. Count the people, find the main one, check the face and the light against
   [references/sources.md](references/sources.md), section 2.
6. **Gather the rest** (only what the request needs):
   - A second avatar: find it by name in `list_avatars`, read its `image_url` with
     `get_avatar`, bring that link in with `import_asset` (title "<Name> face") and keep the
     asset id. The link expires; the asset does not, so the price and the run use the same id.
   - Transfer extras (a place, a garment, a product): `import_asset` or `list_assets`, for
     `inputs.other_elements` (up to 6).
   - A Replace outfit: `import_asset` or `list_assets`, for `inputs.outfit` (one image).
7. **Plan and price.** Call `create_generation` WITHOUT `confirm`
   ([references/calls.md](references/calls.md) has every shape):
   - `tool: "character-swap"`, `model`: the mode's id, `brand_id`, and `avatar_id` when it is
     not the brand's default;
   - `inputs.source_video`: the source's asset id; `inputs.character`: the second avatar's
     asset id, only when there is one;
   - `params.duration`: ALWAYS set it, to the source's `duration_sec` rounded, at most 30. Left
     out, it is 15, and 15 seconds are billed even for a 6-second clip;
   - `params.resolution`: `720p` unless the person chose otherwise;
   - `prompt`: Transfer's optional direction only ([references/directions.md](references/directions.md)).

   Then one message: what you see, what will happen, and the price from the answer
   (`credits`, `credit_balance`).
   > A 14 s vertical clip: a woman in a red jacket dancing in a kitchen. Mia takes her place
   > and wears the red jacket; the moves, the kitchen and the song stay (or she wears her own
   > clothes: just say). <N> credits; you have <M>. Go ahead?

   - Speech in the clip: add that the voice stays the original's and a re-voice can follow.
   - A batch (a trim, a re-voice, several swaps): price every item, then ask one yes for the
     total ([references/calls.md](references/calls.md), section 9).
   - Short balance (`sufficient: false`): offer `480p` or fewer seconds.
   - A refusal: house-rules.md, section 8, and [If it goes wrong](#if-it-goes-wrong).
8. **Run.** On yes, the same call with `confirm: true`. Keep the `generation_id`.
9. **Wait and narrate.** `get_generation` with `wait_seconds: 45`, again until `succeeded` or
   `failed`. A swap takes several minutes. One short line between calls: "Studying the clip:
   who is in it and every move." "Filming Mia into the kitchen." A run still `queued` is
   waiting for a free slot: say so. Never start it a second time.
10. **Check** (below), **show** the card, offer **next steps**.

## Craft

### The source decides the result

The swap copies what the clip has, good and bad. The best sources have one clear main person
(or two, for a two-avatar swap), a face that is visible most of the time and not tiny in the
frame, even light, a steady or gently moving camera, a vertical frame, and something happening
in the first second. The checklist and the red flags are in
[references/sources.md](references/sources.md). When a source has a red flag, say it in one
line before the price, with one fix: a cleaner part of the clip, the motion route, or Reshoot.

### Length and quality

- The swap films the source's first `duration` seconds: 4 to 30. A source under 4 s cannot be
  swapped.
- A later part of a long video: cut it out in Video Studio and swap it there
  ([references/sources.md](references/sources.md), section 4).
- The price follows `duration` and quality: `480p` costs about half of `720p`, `1080p` about
  2.4 times. Shorter is cheaper and holds the likeness better: the best 6 to 15 seconds of a
  trend usually carry it.
- Asked what a swap would cost before there is a clip: `estimate_generation_cost` with
  `tool: "character-swap"` and the `duration` and `resolution` they have in mind.
- The result keeps the source's frame: a landscape source gives a landscape video. There is no
  aspect setting.

### Who is who

The first avatar (`avatar_id`, or the brand's default) replaces the main person. A second
avatar replaces the next most prominent person. The first avatar goes in by itself; the second
goes in `inputs.character` as ONE asset id. Two ids there plus the first avatar make three
faces, and the run fails.

Name both people from the cover by role, place and clothes, and put the casting in the price
message: "Mia takes the woman in red on the left, Jack the man in the grey hoodie." To flip
them, swap the avatar in `avatar_id` with the one in `character`. In Transfer, also write the
casting in the direction ([references/directions.md](references/directions.md)).

### Transfer: the direction

Most Transfer swaps need no `prompt`. Write one (1 to 3 sentences) only to say who is who,
dress the avatar in its own clothes or one new garment, give each `other_elements` image its
role (a new place, a product that replaces what the performer holds), or protect a detail.
Name inputs `@Avatar1`, `@Avatar2`, `@Object1`... Never ask for new moves, new words, a new
camera or another length: the clip decides those.

### Replace: three levers, no prompt

Replace ignores `prompt`: leave it out. Steer it with:

1. **Order.** The first avatar takes the main person.
2. **The avatar's image.** Its clothes come along. A waist-up image brings only the top; what
   it does not show stays as filmed.
3. **The Outfit image** (`inputs.outfit`, the main avatar only). Clothes only, from a flat
   lay, a mannequin or anyone wearing them. Show the whole outfit to change all of it. Prints
   and logos may not carry over.

### The voice

A swap keeps the video's sound, so a talking clip still speaks in the original performer's
voice. For one avatar whose `get_avatar` has a `voice_id`, offer a re-voice once the swap is
done: `create_generation` with `tool: "change-voice"`, the swap's output in
`inputs.video_url`, and `params.voice_id` set to that `voice_id`. Always pass it: left out, a
stock voice can be used. It needs one clear voice: music under the speech or two speakers come
out garbled, so never offer it on a dance with music or a two-avatar swap. Leave the swap's own
`change_voice` param out: its charge is not in the swap's price, and its result is a separate
run you cannot follow.

### The motion route

For "my avatar does this dance on its own": the same flow with `tool: "motion-control"` and the
dance clip in `inputs.motion_video`. The avatar's photo performs the moves as a new video, in
the photo's clothes. `params.scene_control`: `video` (the default) puts it in the clip's own
setting; `image` keeps the photo's background, the answer to "in front of a plain wall" when
the photo has one. It takes no prompt and is priced per second of the clip, so trim the clip
to the moves first. One person only. Shapes and the custom-backdrop trick:
[references/calls.md](references/calls.md), section 7.

## Check before you show it

- `get_generation` says `succeeded`, and `output` has a `url`.
- `preview_assets` on the output's `asset_id`: the avatar's face is where the right person was.
- The output's `duration_sec`, when given, matches the `duration` you set.
- Tell the person what to watch in motion: the face during turns, hands in fast moves, and with
  two avatars, that the two faces never blend.

## If it goes wrong

A failed run is refunded (house-rules.md, section 5). Change one thing per retry and ask before
each new paid run. The same flaw twice on one source means the source is the problem: change
the source or the part of it, not the settings.

| What happened | Why | Fix |
|---|---|---|
| `Missing required input "source_video"` | No source passed | Bring one in (step 4) |
| `Missing required input "character"` | The avatar has no face yet | Another avatar, or make one at https://app.creatorline.io/avatars/new |
| A link "serves a web page" | A page link (YouTube, a profile) | A TikTok or Instagram post link, a direct file link, or an upload in the app |
| `Unknown parameter "aspect_ratio"` | The swap has no frame setting | Drop it: the source decides the frame |
| `Unknown input "outfit"` or `"other_elements"` | That slot belongs to the other mode | Outfit is Replace, other elements are Transfer |
| `"duration" must be >= 4` or `<= 30` | Out of range | 4 to 30 whole seconds |
| Failed: `too-many-avatars` | Two ids in `character` plus the first avatar | One id in `character` |
| Failed on a content check | The source or an image tripped it | Another source; nothing explicit |
| "The video engine is unavailable right now" | Our side, not theirs | Wait and try later; never retry in a loop |
| The wrong person was replaced | The main person is picked by prominence | Transfer: name them in the direction. Replace: flip the avatar order. Or swap a part where the target leads. |
| The face drifts or looks pasted on | Small face, dark, fast blur, face covered | A closer, brighter part of the clip; `1080p` for a sharper face |
| Wrong clothes | Transfer keeps the video's outfit | A direction, or Replace with an Outfit image |
| Only part of the video came back | `duration` shorter than the source, or a source over 30 s | Set `duration`; swap a later part in Video Studio |
| `run_video_ai`: the clip "needs at least 5 s" or "films at most 30 s" | The Video Studio clip is too short or too long | Change its `trim_start` / `trim_end` with `edit_video` |
| Still the original voice | The sound is kept by design | Re-voice it ([The voice](#the-voice)) |

## Show the result

Use the house card:

```
**Character Swap: Mia in the kitchen dance**: 14 s, Mia takes the dancer, original sound.
[Watch the video](<output url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Put a hook line over the first two seconds
2. Make versions with your other avatars
3. Send it to the review queue for TikTok and Reels
```

The media link expires; the Creatorline link stays. A swap made in Video Studio
([references/sources.md](references/sources.md), section 4) is shown at the video's
`studio_url`; look at it first with `preview_video` (free). Its clip's new `asset_id` can be
posted as it is, or exported once text or captions are added.

## Next steps to offer

Pick the 2 or 3 that fit, one line each:

- **Re-voice** in the avatar's voice: one speaker, no music ([The voice](#the-voice)).
- **Hook or captions**: word captions on a talking clip (`creatorline-captions`), a hook line
  as on-screen text over a dance (`creatorline-video-studio`).
- **Post it**: caption, accounts and time, into the review queue (`creatorline-publish`).
- **More versions** with other avatars or outfits (`creatorline-ad-variations`).
- **Final quality**: the same swap at `1080p` once a `480p` test looks right.
- **A cover** for the post (`creatorline-cover-image`).

## References

- [references/calls.md](references/calls.md): the exact call for every case, the limits,
  pricing a batch.
- [references/sources.md](references/sources.md): finding, checking and cutting a source.
- [references/directions.md](references/directions.md): Transfer directions, Replace levers,
  two avatars.
- [references/house-rules.md](references/house-rules.md): the session, consent, waiting,
  delivery, safety.
- [references/asking.md](references/asking.md): the intake in one message.
- [references/video-briefs.md](references/video-briefs.md): the other video tools, when a swap
  is not the answer.
- [references/product-intake.md](references/product-intake.md): bringing a product or garment
  photo in.
