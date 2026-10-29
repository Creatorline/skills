---
name: creatorline-ad-variations
description: "Makes numbered versions of one existing video that change what was asked and keep the rest: product, outfit, background, colour, on-screen text, hook, avatar, voice or language. Use for 'variations of this ad', 'test 3 hooks', 'put my new product in this video', 'this ad on 3 backgrounds'. Not for a new video: use creatorline."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Ad variations

Take one video that already exists and return N numbered versions of it, in the order the person
asked. Each version changes only what they named (the product in her hand, the background, a
colour, the hook, who presents it, the voice) and keeps everything else of the original: the
moves, the performance, the camera, the cuts, the light, the length, the frame, the sound, and
every text nobody named. The person gets one plan, one price for the whole set, one yes, then
every version with a name that says what it changed, ready for the review queue or an ads
manager. When the set is an A/B test, the original runs beside it as the control.

## When to use

- "Make 5 variations of this ad", "A/B test this video", "test 3 hooks on my best post".
- "Put our new serum in this video instead of the old bottle", "one version per flavor".
- "This ad on a beach, in a city and in the snow", "her sweater in red, then in camel".
- "Change the price on the sign to $19", "remove the cup on the table".
- "The same video with my other avatars", "Mia in this video wearing our new jacket".
- "This ad in Spanish and German", "test a deeper voice", "two caption styles".

There is ONE source video: a Creatorline creation, a library file, or a link to the person's own
post.

## Not for

| The ask | Use |
|---|---|
| One new video from an idea or a product | `creatorline-talking-video`, `creatorline-product-video` |
| One quick change to one video for the whole clip (a background, a colour), no product of theirs | `creatorline` (its fast path) |
| Re-film someone else's trending video | `creatorline-reshoot` |
| One person swap in one video, no versions | `creatorline-character-swap` |
| Cuts, order or text overlays on one video | `creatorline-video-studio` |
| Captions on one video | `creatorline-captions` |
| One voiceover, re-voice or other language for one video | `creatorline-voiceover` |
| A week of different posts | `creatorline-content-calendar` |
| Shorts cut from a long video | `creatorline-long-to-shorts` |
| The same set on every future winner | `creatorline-workflows` |
| Posting the versions | `creatorline-publish` (step 12 hands off) |

## Which tool makes each change

Each row is the original plus one change. The calls are in
[variant-recipes.md](references/variant-recipes.md) (section in brackets).

| Code | The change | Made with |
|---|---|---|
| P | A product, object or prop: replaced, added or removed | `generate_video_edit` (keeps the footage) or `generate_reshoot` with `inputs.objects` (films it again) [9] |
| O | Clothing on the same person | `generate_video_edit` (one garment) or `generate_character_swap` Replace with `inputs.outfit` [8] |
| B | The background or the place | `generate_video_edit` [10] |
| C | A colour, a material, the season, the time of day | `generate_video_edit` [10] |
| W | Words in the filmed picture: a sign, a label, a price | `generate_video_edit` [10] |
| A | Who presents it | `generate_character_swap` (Transfer), then `generate_change_voice` [7] |
| H | The hook: a line on screen, a new opener, hook plus captions | Video Studio `add_text` or `add_hook`, or `generate_hook_captions` [3-5] |
| E | The call to action on screen at the end | Video Studio `add_text` [6] |
| L | Spoken lines | `generate_text_to_speech` in the avatar's voice, then `generate_lipsync` [11] |
| V | The voice | `generate_change_voice` [12] |
| T | The language | `generate_text_to_speech` and `generate_lipsync`, or a Video Studio voiceover [11, 13] |
| S | The caption look | Video Studio `write_captions`, one `style` per export [14] |

Hooks, end text and caption looks are the cheapest rows. `generate_video_edit`, swaps and
reshoots cost the most: they are priced on the video's seconds, and 1080p costs about 2.5 times
720p.

**People go to Character Swap.** Any change to who a person is (another avatar, another face) is
a Character Swap row, never `generate_video_edit`: it works better for people. It covers the
whole video, every appearance. "Swap her only for the first 3 seconds" is not offered: ask
whether she is swapped for the whole video, or only something about her changes (a garment, a
hair colour) for those seconds. Adding or removing a person is not offered.
[edit-mapping.md](references/edit-mapping.md), section 7, has the modes and who owns the look.

**A product: keep the footage or film it again.**

| `generate_video_edit` | `generate_reshoot` with the product |
|---|---|
| The take stays frame for frame; only the product changes | Every frame is filmed again around the new product |
| The source shows an AI face or no face | One main person; a real person is filmed again as the avatar |
| The same kind, size and handling (a bottle for a bottle) | Any kind: the moves are made to fit it |
| The sound is kept: a line that names the old product still names it | Lines and text that name the old product are rewritten |

**`generate_video_edit` takes AI faces only.** A real person's face anywhere in the source is
refused (and refunded). Its sources are the brand's own creations and footage with no face: hands, a product,
a place. On a real creator's video, a product version is Reshoot and a person version is
Character Swap.

## What you need

| Need | Hard gap or default |
|---|---|
| The source video | Hard gap. Find it by name in the library, or take a link. 4 to 30 s for `generate_video_edit`, swaps and reshoots. |
| 1. The change and the versions | Hard gap: what changes, and the ordered list of values or how many. "Just make variations": three hooks, nothing asked but the price. |
| 2. Reference images | Asked when a version puts something in: all, some or none. A product needs its photo (product-intake.md); a place, a colour or a season can be words. |
| 3. Sharpness | Asked for `generate_video_edit`, swap and reshoot rows: 720p (faster, recommended) or 1080p. Otherwise 720p. |
| Avatars | By name from `list_avatars` (this brand's, or shared). |
| Hooks and lines | You write them in the brand's voice. |
| Post caption | One caption for every version, ideally the original's. |

## The flow

1. **Track.** When `track_skill_activation` is in your tool list, call it once with
   `skill_name: "creatorline-ad-variations"` (house-rules.md, section 10).
2. **Orient.** House-rules.md, section 1: the brand, its default avatar, its voice and language,
   the balance.
3. **Bring the source in once.** Every version uses the same asset id.
   - In the library: `list_assets` with `brand_id`, `file_type: "video"` and `search`. Look at
     the likely ones with `preview_assets`.
   - A link: `import_asset` with `url`, `brand_id` and a `title`. TikTok and Instagram post
     links work.
   - Note its `duration_sec` and `ratio`. For a creation, its `prompt` says what it shows.
   - Check it fits ("When the source does not fit"). Never trim, loop or slow it to fit.
4. **Intake.** One message with whatever is still missing of the three fields above (asking.md,
   [edit-mapping.md](references/edit-mapping.md), section 2), at most 3 questions, the
   recommended option first. Say back what the person gave as facts; never ask it again.
   Close with one line of defaults.
   - Images promised ("I'll send the photos"): wait for them. Nothing paid starts before.
   - Anything ambiguous (which item, which time, which image goes where, which value in which
     version): ONE bundled mapping question with your best reading recommended
     ([edit-mapping.md](references/edit-mapping.md), sections 4 to 6).
5. **Plan.** One row per version, in the order asked, each with its name and its change in plain
   words. Zip lists, never cross them. Settle every choice here, so no prompt carries an "if".
6. **Write the edits** (`generate_video_edit` rows): one prompt per version from
   [edit-contract.md](references/edit-contract.md), then its checks (section 10). A prompt that
   fails twice drops only its version: say so.
7. **Price the whole set.** Every row without `confirm` (variant-recipes.md, section 2), add them
   up, and ask ONE yes for the total, with the balance. Short: offer fewer versions, 720p, or
   cheaper rows. Never drop a row without saying so.
8. **Run.** On yes, start every row in plan order, each with `confirm: true` and the same
   arguments you quoted.
   - Long renders first (edits, swaps, reshoots, new speech), then build and export the Video
     Studio rows while they render.
   - Runs over the workspace's limit show `queued` and start by themselves. Say so once.
   - A two-step row (a swap, then its re-voice) starts its second step once the first lands,
     after a quote at the same price.
9. **Wait and narrate.** `get_generation` with `wait_seconds: 45` on the earliest unfinished
   run, then `wait_seconds: 0` on the others; `get_video` for exports. One line between calls:
   "2 of 4 ready. The beach and snow versions are still rendering." A set of edits often takes
   10 minutes or more: say about how long, what to ask, then end the turn. Never start a run
   twice.
10. **Check** every version ([edit-checks.md](references/edit-checks.md), section 2).
11. **Show** the set as one numbered list in the order asked, with the status line.
12. **Next.** Offer 2-3 next steps. Posting: `create_post`, one post per version, the same
    `caption` and `hashtags` on each, `made_with_ai: true`. Nothing goes public without its own
    yes (house-rules.md, section 2).

## By example

The person: "Put our three new serums in my Glow serum video instead of the old bottle," with
three product photos.

Intake (only the sharpness is missing; with a question tool, the same as its question):

> Your video: "Glow serum review" (12 s, Mia at her sink, the amber dropper bottle in her right
> hand). Three versions, one per serum, in your order: Rose Dew, Night Repair, Vitamin C. All
> three are dropper bottles like the old one, so only the bottle changes.
> Sharpness? 1) 720p, faster (recommended) 2) 1080p, sharper, about 2.5 times the price
>
> Defaults: same length, frame and sound; every caption stays as it is.

Plan and price (its own message, after the quotes):

> | # | Version | Name | Credits |
> |---|---|---|---|
> | 1 | The Rose Dew bottle in her hand | glow-serum_P1_rose-dew | n |
> | 2 | The Night Repair bottle in her hand | glow-serum_P2_night-repair | n |
> | 3 | The Vitamin C bottle in her hand | glow-serum_P3_vitamin-c | n |
>
> Total: N credits; you have M. Make all three?

## Craft

**N counts finished videos.** Never people, images or edits. "Rose Dew, Night Repair and
Vitamin C" is 3. Lists are zipped: "2 products on 2 backgrounds" is 2 versions, not 4. Every
combination only when the person asks for it in those words, each labeled combined (code X). One
version may carry several edits when asked ("the new bottle and a beach behind her").

**For a test, one change per version.** Then a win can be traced to it. A version that changes
two things can win, but nobody can say why: say so when the person asks for one. A set that is
not a test ("one video per new serum") skips the control.

**What to test first** ([test-design.md](references/test-design.md), section 3): the hook, then
who presents it, then the offer, the lines or the product, then the setting or the look, then
voice and language, then the caption look. "Variations" with no direction: propose hooks, and say
why in one line.

**How many.** 3 to 5 versions plus the control per round. More than 6: suggest two rounds.

**Edits that stay where you put them** ([edit-contract.md](references/edit-contract.md)). The
prompt goes to the engine word for word, so it is a complete spec:

- One operation per target: "Replace only <X> in @Video1 with <Y> from @Image1", "Modify only
  <X> so that ...", "Remove only <X> and rebuild the area to match its surroundings", "Add only
  <X> at <place>". Name the target so it points at one thing.
- `@Video1` is the source; `@Image1`, `@Image2` are that version's images in order. Each image
  is used once; no links or ids in the prompt; at most 3,900 characters; no "if", no options.
- Whole clip by default. A range the person gave is used as given. A moment ("when she picks it
  up") snaps to a caption line's start or end; nothing measurable: ask. Whole seconds.
- Every prompt keeps every text nobody named, word for word, in place and on time.

**Keep it from spreading.** In the first live test a held serum bottle was replaced by an
over-ear headset. The face, the room, the gestures, the framing, the timing and the sound all
held, but the headset also sat on her head from the first frame, and the thing in her hand became
a single earcup. So:

1. Prefer a replacement of the same kind, size and handling: a bottle for a bottle, a tub for a
   tub. Another kind: say so in the plan, and offer Reshoot for it.
2. For another kind, say where it is and where it is not, positively: "only in her right hand,
   only while the bottle is in her hand; her head and hair stay exactly as in @Video1".
3. Say how it is held, copied from the source: grip, height, which side faces the camera.
4. Say what it is in a few plain words: "a black over-ear headset: two cushioned earcups joined
   by a headband".
5. Look at the first and last second of every version before you show it.

**Avatar versions.** Pick avatars that differ in a way the audience notices and that all fit the
brand. Transfer keeps the video's clothes and set, so only the person changes. Re-voice every
avatar row in its own voice, or none of them.

**Lines and language versions.** New words in the avatar's voice, lip-synced to the original
picture. Get the exact words first (variant-recipes.md, section 16); keep the rest word for word
and the total no longer than the original when spoken (video-briefs.md, speech budget).

**Clean master.** Changes land best on the version before captions and text were burned in: for
a creation, the original generation in `list_assets` (`source: "generated"`). Then give every
version, and the control, the same finishing.

**Naming.** `<base>_<code><n>_<label>`, such as `glow-serum_P1_rose-dew` or
`glow-serum_B2_snow`; `00` is the control. Use it as the Video Studio `title`, in the plan and in
the delivery list ([test-design.md](references/test-design.md), section 5).

**Same finishing everywhere.** The post caption, hashtags, posting hour and account stay the
same for every version, so the test measures the video.

**Never show the machinery.** Describe each version's change in plain words. Never paste a
prompt, a token or an id to the person; show a prompt only when they ask for it.

## When the source does not fit

| The source | What to do |
|---|---|
| Longer than 30 s | Say its length: edits, swaps and reshoots take up to 30 s. Offer a 30 s part they pick, cut first in Video Studio (variant-recipes.md, section 17), or the edit-only rows (hook, captions, end text) on the full video, up to 180 s. |
| Shorter than 4 s | No edit, swap or reshoot; never loop or freeze it. Hook, text, voice and caption rows only. |
| A real person's face in it | `generate_video_edit` refuses it. Product: Reshoot (the avatar takes the person's place too: say so). Person: Character Swap. Hook, text, voice and caption rows work. A real person only with their permission (house-rules.md, section 7). |
| A child or teen on screen | Not a source (house-rules.md, section 7). |
| Two main people | Edits and avatar versions work. Reshoot needs one main person. |
| No person on screen | Edits work (product, place, colour, words). Avatar, outfit and lip-sync rows do not apply. |
| The speech names the old product | A `generate_video_edit` keeps the sound, so the old name is still said. Offer Reshoot, or a lines step on the edit (variant-recipes.md, section 11). |
| Captions or text burned in | An edit keeps them word for word. A new hook line may sit on old text; caption-look rows need the clean master. |
| Someone else's video | Not a source for versions. Re-film the idea with `creatorline-reshoot`, then test versions of that. |

## Check before you show it

- Every version is there, in the order asked, with its name.
- Edits: the length matches the source's (`duration_sec`, within 0.1 s), the cover has the
  source's shape (`preview_assets`), the change is there, and nothing spread
  ([edit-checks.md](references/edit-checks.md), section 2). When `preview_video` answers
  `exact: false`, you saw covers only: tell the person to watch the first and last second.
- Swaps: the right person was replaced; a second person is untouched.
- Video Studio versions: `preview_video` at `[0.5, 2.5]` with `show_safe_area: true`: the hook
  reads and sits clear of the apps' buttons and of old text.
- Speech versions: the new speech ends before the picture does.
- Covers and frames are all you can see. Say so: "I checked lengths and covers; give each a quick
  watch before it goes out."

## If it goes wrong

| What happened | Do |
|---|---|
| One version failed | The rest stand. It was refunded. Retry only that version, once, unchanged, after a yes for its price. Never restart one that is still running. |
| An edit spread (the new item on her head, in the background, from the first frame) | Rewrite with the spread rules above, or a same-kind product, or Reshoot for that version. Ask before the paid retry. |
| The held item came out as part of the new one | Describe the whole item in plain words and how it is held. |
| Refused: AI faces only | A real face in the source. Refunded. Reshoot for products, Character Swap for people. |
| Refused for its length | The message has the measured length. Offer the cut or edit-only rows. |
| "The sound could not be put back" | Refunded. Retry once, unchanged, after a yes. |
| A swap left the old face in some frames | Fast turns, hands over the face or many cuts. Retry on a calmer part of the video. |
| A re-voice sounds broken | Music or two voices under it. New speech plus lip sync, or drop the row. |
| Lips drift from the new words | The face is small or turned away. Drop the row, or test it as a voiceover. |
| Two sets of captions on screen | The source had burned captions. Use the clean master. |
| `sufficient: false` on a quote | Fewer versions, 720p, or edit-only rows. Say the shortfall in one line. |
| `free_trial: true` | Nothing paid runs until the plan is started (house-rules.md, section 8). Offer the version plan and the hook lines now; make the versions once it starts. |

More failures and their fixes: [edit-checks.md](references/edit-checks.md), section 5. After
three paid attempts on one version, stop and offer the set without it.

## Show the result

One card for the whole set (house-rules.md, section 4), the control first when it is a test:

```
**Glow serum review: 3 product versions**: 12 s, Mia at her sink, the same video with a new serum in her hand.

Control: the original. [Watch](<url>)
1. **P1 Rose Dew**: the Rose Dew bottle in her hand. [Watch](<url>) · [Open in Creatorline](<studio_url>)
2. **P2 Night Repair**: the Night Repair bottle in her hand. [Watch](<url>) · [Open in Creatorline](<studio_url>)
3. **P3 Vitamin C**: failed and refunded. Retry it?
3 asked · 2 done · 1 failed (refunded) · 0 waiting · 720p · source 12.4 s · original sound kept
Used <N> credits. <M> left.

What next?
1. Put both in your review queue with the original's caption, one a day at the same hour.
2. Make a cover for each one.
3. When one wins, make it the new original and test backgrounds on it.
```

- One line per version, numbered in the order asked: its name, the change in plain words, its
  links. `studio_url` comes from `get_generation` or the video; media links expire, so give both.
- The status line every time ([edit-checks.md](references/edit-checks.md), section 4): asked,
  done, failed, waiting, the resolution, the source's length, and "original sound kept" or "the
  source has no sound".
- When `show_media` is in your tool list, call it once at the end instead of the link lines:
  every version's `generation_id` (an export's `asset_id`) in the order asked, `labels` set to
  the names. Then write only the status line and the next steps (house-rules.md, cards in the
  chat).

## Next steps to offer

- Post every version into the review queue with the same caption and hashtags; timing and
  publishing with `creatorline-publish`.
- Run them as ads: the names are ready to paste as ad names
  ([test-design.md](references/test-design.md), section 6).
- A cover per version (`creatorline-cover-image`), or captions on all (`creatorline-captions`).
- When results are in: the winner becomes the new control; test the next rung on it.
- Save the recipe as a workflow to repeat it on every new winner (`creatorline-workflows`).

## References

- [edit-contract.md](references/edit-contract.md): the `generate_video_edit` prompt: tokens,
  the four operations, time scope, keeping an edit from spreading, the two templates, the
  checks, two worked prompts.
- [edit-mapping.md](references/edit-mapping.md): N and lists, the intake fields, which image
  goes where, people and Character Swap, clothes, text, where times come from.
- [edit-checks.md](references/edit-checks.md): what to check after an edit, retries, the
  status line, failures.
- [variant-recipes.md](references/variant-recipes.md): the exact calls for every row and how to
  price the set.
- [test-design.md](references/test-design.md): the control, naming, running and reading a test.
- [hook-variants.md](references/hook-variants.md): hook angles, rules, placement on screen.
- [house-rules.md](references/house-rules.md): session, consent before spending, waiting,
  showing, safety.
- [asking.md](references/asking.md): how to ask, question tools, who wins.
- [video-briefs.md](references/video-briefs.md): speech budget, the persona, real faces.
- [product-intake.md](references/product-intake.md): product photos, the product card, claims.
