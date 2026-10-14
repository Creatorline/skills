---
name: creatorline-ad-variations
description: "Makes numbered versions of one winning video for an A/B test, each changing one thing: hook, avatar, outfit, product, lines, voice, language or caption look. Use for 'make variations of this ad', 'test hooks on my best video', 'same video with my other avatars', 'this ad in three languages'. Not for one new video, swap or edit: use creatorline."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Ad variations

Take one video that already works (the winner) and make a numbered set of versions of it for an
A/B test. Each version is the original with ONE change: the hook, who presents it, the outfit, the
product, the spoken lines, the voice, the language or the caption look. The person gets a plan
table, one price for the whole set, one yes, then every version with a name that says what it
tests, ready for the review queue or an ads manager. The original stays in the test as the
control, so every version is measured against it.

## When to use

- "Make 5 variations of this ad", "A/B test this video", "test 3 hooks on my best post".
- "The same video with my other avatars", "one version with Jade, one with Leo".
- "Same ad with our new flavor", "try it with a different offer line".
- "Make this ad in Spanish and German", "test a deeper voice against this one".
- "Same video with different caption styles".

There is ONE source video: a Creatorline creation, a library file, or a link to the person's own
post.

## Not for

| The ask | Use |
|---|---|
| One new video from an idea or a product | `creatorline-talking-video`, `creatorline-product-video` |
| Re-film someone else's trending video | `creatorline-reshoot` |
| One swap of one video, no test | `creatorline-character-swap` |
| One edit of one video (a cut, a text, a new opener) | `creatorline-video-studio` |
| Captions on one video | `creatorline-captions` |
| One voiceover, one re-voice or one other language for one video | `creatorline-voiceover` |
| A week of different posts | `creatorline-content-calendar` |
| Several shorts cut from one long video | `creatorline-long-to-shorts` |
| The same set of versions on every future winner | `creatorline-workflows` |
| Posting and scheduling the versions | `creatorline-publish` (step 10 hands off) |

## What you need

| Need | Hard gap or default |
|---|---|
| The source video | Hard gap. Find it by name in the library, or take a link. |
| What to change | Default: the hook (the cheapest change, and often the biggest effect). |
| The values | Hooks and lines: you write them in the brand's voice. Avatars: offered by name from `list_avatars` (rows whose `brand_id` is this brand, or none: shared). Products (a photo each, product-intake.md) and languages: hard gap. |
| How many | One per value named; else 3 versions plus the control. |
| Length | The source's own. Swaps and reshoots take 4 to 30 s. |
| Resolution | `720p`. |
| Post caption | One caption for every version, ideally the original's, so the video is the only difference. |

## The flow

1. **Track.** When `track_skill_activation` is in your tool list, call it once with
   `skill_name: "creatorline-ad-variations"` (house-rules.md, section 10).
2. **Orient.** House-rules.md, section 1: the brand, its default avatar, its voice and language,
   the balance.
3. **Find the source.**
   - In the library: `list_assets` with `brand_id`, `file_type: "video"` and `search` (words from
     its title or idea). Look at the likely ones with `preview_assets`.
   - A link: `import_asset` with `url`, `brand_id` and a `title`. A TikTok or Instagram post link
     works.
   - Note its `duration_sec`. For a creation, its `prompt` says what it was made from.
   - Check it fits the changes asked for ("When the source does not fit").
4. **Intake.** One message (asking.md): at most 3 questions, each with options and the
   recommended one first: which video (only when you are unsure), what to test, how many. Say
   what the person already gave as a statement. Close with one line of defaults. "Just make
   variations" means hook versions on autopilot: ask nothing but the price.
5. **Plan.** One row per version, each the original plus one change (the matrix below), named
   for the test (test-design.md). Show it as a table.
6. **Price the whole set.** Get every row's price without starting anything
   ([variant-recipes.md](references/variant-recipes.md), section 2), add them up, and ask ONE
   yes for the total, with the balance. Not enough credits: offer fewer versions or cheaper rows.
   Never drop a row without saying so.
7. **Run.** On yes, start every row in plan order, each with `confirm: true` and the same
   arguments you quoted.
   - Long renders first (swaps, reshoots, new speech), then build and export the edit-only rows
     while they render.
   - The workspace runs a set number of renders at once; the rest show `queued` and start by
     themselves. Say so once.
   - Every version is made from the ORIGINAL, never from another version.
   - A two-step row (a swap, then its re-voice; new speech, then the lip sync) starts its second
     step once the first lands. Call that step once without `confirm` first: the quoted price,
     go on; a higher one, ask.
8. **Wait and narrate.** `get_generation` with `wait_seconds: 45` on the earliest unfinished run,
   then `wait_seconds: 0` on the others; `get_video` for Video Studio exports. Between calls, one
   line: "2 of 4 ready. Jade and Leo are still rendering." A set of swaps or reshoots often takes
   10 minutes or more: say about how long and what to ask, then end the turn. When they come
   back, read every unfinished run once. Never start one twice.
9. **Check, then show** (sections below), as one numbered list in plan order.
10. **Next.** Offer 2-3 next steps. Posting: `create_post`, one post per version, the same
    `caption` and `hashtags` on each, `made_with_ai: true`. Nothing goes public without its own
    yes (house-rules.md, section 2).

## The experiment matrix

Each row changes one thing and keeps the rest. The exact calls are in
[variant-recipes.md](references/variant-recipes.md).

| Code | Change | What stays | Made with | Cost |
|---|---|---|---|---|
| H | Hook line on screen (0-3 s) | Everything else | Video Studio: `add_text`, `export_video` | Lowest: an export |
| H | Hook opener (a new first shot) | The rest of the video | Video Studio: `add_hook` with a stock hook clip | Lowest: an export |
| H | Hook plus captions in one pass | Picture and sound | Tool `hook-captions`, `hook_mode: "manual"` | Low, flat |
| E | Call to action on screen (end) | Everything else | Video Studio: `add_text` over the last seconds | Lowest: an export |
| A | Avatar (who presents) | Moves, words, cuts, clothes, set | Tool `character-swap` (Transfer), then `change-voice` for the avatar's voice | High, per second, plus a low re-voice |
| O | Outfit (same avatar, new clothes) | Moves, words, sound, cuts, set | `character-swap` with `model: "character-swap-replace"` and `inputs.outfit` | High, per second |
| P | Product shown | Structure, beats, avatar | Tool `reshoot` with `inputs.objects` | High, per second |
| L | Spoken lines (offer, angle, spoken call to action) | The picture | `text-to-speech` in the avatar's voice, then `lipsync` | Medium: two runs |
| V | Voice | Picture, words, timing | Tool `change-voice` | Low |
| T | Language, a face speaks | The picture | `text-to-speech`, then `lipsync` | Medium: two runs |
| T | Language, voiceover-led | The picture | Video Studio: muted clip, `add_voiceover`, `write_captions` | Low |
| S | Caption look | Picture and sound | Video Studio: `write_captions` once, a `style` per export | Low |

Rules for the matrix:

- **One change per version.** If a request changes two things (another avatar AND another
  outfit), say so and split it, or label that row "combined".
- **Zip lists, never cross them.** "Jade, Leo and Ana" is 3 versions. "2 avatars and 3 hooks" is
  5 versions, each against the control, not 6 combinations. Build combinations only when the
  person asks, and say a combined version cannot tell which change worked.
- **The control is the original** (code `00`), delivered with the set. When every version gets
  the same finishing (captions, a hook line), the control gets it too, as its own row.
- **Some rows change more than their one thing.** Reshoot films every frame again (P). New
  speech is in the avatar's own voice, which may not be the voice in the original (L). For a
  clean read, offer a matching control made the same way with nothing changed (test-design.md,
  section 1). It is one more row in the price.
- **A mixed set is fine** as long as each row changes one thing against the control.

## By example

The person: "Make variations of my serum video."

Intake (one message; with a question tool, the same as its questions):

> Your winner: "Glow serum review" (15 s, Mia at her sink). Two quick picks:
> 1. What should the versions test? 1) The hook, the first 3 seconds (recommended) 2) Who
>    presents it 3) The product or the offer line 4) The voice or the language
> 2. How many? 1) 3 plus the original (recommended) 2) 5 plus the original
>
> Defaults: same video and length, hooks written in your brand's voice, one caption for all.

Plan and price (its own message, after the quotes):

> Every version is your video with one change; the original runs alongside as the control.
>
> | # | What changes | Name | Credits |
> |---|---|---|---|
> | Control | Nothing | glow-serum_00_control | 0 |
> | 1 | Hook: "Your serum is wasted without this" | glow-serum_H1_problem | n |
> | 2 | Hook: "Why does your serum stop working?" | glow-serum_H2_question | n |
> | 3 | Hook: "Oily skin? This one is for you" | glow-serum_H3_callout | n |
>
> Total: N credits; you have M. Make all three?

## Craft

**What to test first.** The order that teaches the most for the least:

1. The hook: the first 3 seconds decide whether anyone watches the rest.
2. Who presents it: the face the audience trusts.
3. The offer, the lines or the product: what is said and shown.
4. Voice and language: for new markets.
5. The caption look: the smallest effect; test it last.

When the person asks for "variations" with no direction, propose hooks and say why in one line.

**How many.** 3 to 5 versions plus the control per round. Each version needs its own views to be
read; more versions spread the same audience thinner. More than 6: suggest two rounds.

**Hook versions** ([hook-variants.md](references/hook-variants.md)): each hook takes a different
angle (problem, curiosity, call-out, bold opinion, number), so the test says which angle works.
3 to 8 words, in the brand's voice and language, true to what the first seconds show, inside the
claim floor.

**Avatar versions.** Pick avatars that differ in a way the audience notices (age, style, energy)
and that all fit the brand. Transfer keeps the video's outfit and set, so only the person
changes. The swap keeps the source's voice: re-voice each one in its avatar's own voice, or none
of them, so voice does not ride along as a second change.

**Product versions.** Reshoot films the source again with the same avatar, structure and beats,
and rewrites the lines that name the product. Write each product's card once (product-intake.md)
and reuse it. The source must show the product being handled.

**Lines versions.** New words in the avatar's voice, lip-synced to the original picture. Change
only the line this test is about; keep the rest of the script word for word and the total no
longer than the original when spoken (video-briefs.md, speech budget).

**Language versions.** You need the exact words first: the person's script, or a transcript
([variant-recipes.md](references/variant-recipes.md), section 15). Translate for speech, not word
for word, and keep it no longer than the original when spoken. Text burned into the picture stays
in the old language: use a clean source, then caption each version.

**Clean master.** Changes land best on the version before captions and text were burned in. For
a Creatorline creation, that is the original generation in `list_assets`
(`source: "generated"`). Then give every version, and the control, the same finishing.

**Naming.** Every row gets a code and a short label: `<base>_<code><n>_<label>`, such as
`glow-serum_H2_question` or `glow-serum_A1_jade`. Codes are in the matrix above; `00` is the
control. Use the name as the Video Studio `title`, in the plan table and in the delivery list, so
the person can paste it into an ads manager. Details in
[test-design.md](references/test-design.md).

**Same finishing everywhere.** The post caption, hashtags, posting hour and account stay the same
for every version. Otherwise the test measures the caption, not the video.

## When the source does not fit

| The source | What to do |
|---|---|
| Longer than 30 s | Swaps and reshoots take up to 30 s. Offer: the first 30 s, the best 30 s cut first in Video Studio (recipes, section 16), or edit-only versions (hook, captions, end text) on the full video, up to 180 s. |
| Shorter than 4 s | No swap or reshoot. Edit-only and voice versions only. |
| Two main people | Avatar versions work (the second person stays as is). Product and lines versions need one main person: offer a new video instead (`creatorline-product-video`). |
| No person on screen | Avatar, outfit, product and lip-synced rows do not apply. Hooks, voice, voiceover language and caption looks do. |
| Captions or text already burned in | Caption-look versions cannot be made from it, and a new hook line may sit on old text. Ask for the clean master. |
| Someone else's video | Not a source for versions. Re-film the idea with `creatorline-reshoot`, then test versions of that. |
| A real person who is not the person you are talking to | Only with their permission (house-rules.md, section 7). A swap keeps their voice: re-voice it in the avatar's voice. |

## Check before you show it

- Every version is there, in plan order, with its name.
- Lengths match the control within about a second, except a version with a new opener.
- Generated versions: `preview_assets` on the outputs' `asset_id`s shows the right avatar, the
  product in frame, nothing else changed in the cover frame.
- Video Studio versions: `preview_video` at `[0.5, 2.5]` with `show_safe_area: true`: the hook
  reads, sits clear of the apps' buttons, and does not overlap old text. When the answer says
  `exact: false`, clips show by their cover: judge the placement, not the picture.
- Speech versions: the new speech ends before the picture does; captions are in the new
  language.
- Swaps: the right person was replaced; a second person is untouched.
- Covers and frames are all you can see. Say so plainly: "I checked lengths and covers; give
  each a quick watch before it goes out."

## If it goes wrong

| What happened | Do |
|---|---|
| One version failed | The rest stand. It was refunded. Retry only that row, unchanged, after a yes for its price. |
| The same version failed twice | Change one thing that keeps the test fair (a calmer part of the source for every row, or drop the row) and ask. |
| A swap left the old face in some frames | The source has fast turns, hands over the face or many cuts. Retry on a calmer part of the video. |
| A reshoot failed | The source has two main people, heavy effects or smoking. Use Character Swap for avatar rows; product rows need a new video. |
| A re-voice sounds broken | The video has music or two voices. Use new speech plus lip sync, with the music added back, or drop the row. |
| Lips drift from the new words | The face is small, turned away or covered. Drop the row, or test the line as a voiceover-led version. |
| New speech runs past the picture | Shorten the words and make the speech again (a new paid run: ask), then lip sync. |
| Two sets of captions on screen | The source had burned captions. Use the clean master, or make hook versions in Video Studio instead of `hook-captions`. |
| A swap billed more seconds than the video has | `params.duration` was left out (it defaults to 15). Always set it to the source's whole seconds. |
| Export refused | Read `warnings` in `get_video`; wait for captions or a voiceover to finish. |
| `sufficient: false` on a quote | Fewer versions, `480p` for swaps (softer picture), or edit-only rows. Say the shortfall in one line. |
| `free_trial: true` | Nothing paid runs until the workspace's plan is started (house-rules.md, section 8). Offer the test table and the hook lines now; make the versions once it starts. |

After three paid attempts on one row, stop and offer to keep the set without it.

## Show the result

One card for the whole set (house-rules.md, section 4), the control first:

```
**Glow serum review: 3 hook tests**: 15 s, Mia, the same video with a new line on screen for the first 3 seconds.

Control: the original. [Watch](<url>)
1. **H1 Problem first**, "Your serum is wasted without this": tests whether naming the problem stops more scrollers. [Watch](<url>) · [Open in Creatorline](<studio_url>)
2. **H2 Question**, "Why does your serum stop working?": tests curiosity against the problem. [Watch](<url>) · [Open in Creatorline](<studio_url>)
3. **H3 Call-out**, "Oily skin? This one is for you": tests naming the audience. [Watch](<url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Put the three versions in your review queue with the original's caption, one a day at the same hour.
2. Make a cover for each one.
3. When one wins, test avatars on the winner.
```

- One line per version: the name, the change in plain words, what it tests, its links.
- `studio_url` comes from `get_generation` or the video; media links expire, so give both.
- A failed row stays in the list: "4. **A3 Ana**: failed and refunded. Retry it?"

## Next steps to offer

- Post every version into the review queue with the same caption and hashtags; timing and
  publishing with `creatorline-publish`.
- Run them as ads: the names are ready to paste as ad names
  ([test-design.md](references/test-design.md)).
- A cover per version (`creatorline-cover-image`), or captions on all (`creatorline-captions`).
- When results are in: the winner becomes the new control; test the next rung of the ladder.
- Save the recipe as a workflow to repeat it on every new winner (`creatorline-workflows`).

## References

- [variant-recipes.md](references/variant-recipes.md): the exact calls for every row, how to
  price the set, and how to get the words of a video.
- [test-design.md](references/test-design.md): the control, naming, how to post or run the test,
  how to read it.
- [hook-variants.md](references/hook-variants.md): hook angles, rules, placement on screen.
- [house-rules.md](references/house-rules.md): session, consent before spending, waiting,
  showing, safety.
- [asking.md](references/asking.md): how to ask, question tools, who wins.
- [video-briefs.md](references/video-briefs.md): speech budget, claim floor, real faces.
- [product-intake.md](references/product-intake.md): product photos, the product card, claims.
