---
name: creatorline-app-promo-video
description: "Makes a UGC promo for an app, website, online store or SaaS: the brand's AI avatar talks to camera while the person's real screenshots pop up as cards on the lines that name them. Use for app ads, website promos, SaaS UGC, site or app tours. Not for a physical product with no page on screen: use creatorline-talking-video. A trend link to re-film: creatorline-reshoot."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# App Promo Video

Make a short vertical promo for the person's app, website, online store or SaaS. Their avatar
stays on camera and talks in one continuous take, and their REAL screenshots pop up over the
talk as cards, each on the words that name it. The person gets a captioned 9:16 video, an
editable Video Studio project they can open and change, and a post ready for the review queue.
The promise: real screens only, never drawn ones; one short exchange before the work; one
price and one yes for the whole job; the finished video shown with links and next steps.

## When to use

- "Make a UGC ad for my app", "a promo for our website with my avatar", "a TikTok that shows
  our SaaS", "a tour of our online store", "my avatar talks about our site while the
  screenshots show".
- A product page link, when the page itself should appear on screen.
- "Show how to do X in our app": a walkthrough, one step per screen (Craft, "Walkthroughs").
- An app promo already under way here, when the person then brings a trend to copy: the
  Reshoot path in [references/other-paths.md](references/other-paths.md). A request that opens
  with a trend link goes to `creatorline-reshoot`, even when the app is in it.

## Not for

| The ask | Use |
|---|---|
| A physical product held, used or reviewed on camera, its page not shown | `creatorline-talking-video` (or `creatorline-product-video` when the product is the hero) |
| A how-to for a physical product or a technique, in labeled steps | `creatorline-tutorial-video` |
| Only a script, an outline, hooks, a walkthrough plan or a caption | `creatorline-short-script` |
| A screen recording with a voice over it and no face | `creatorline-voiceover` |
| Editing a video project that already exists | `creatorline-video-studio` |
| A real promo video with a real person, to put the avatar in | `creatorline-character-swap` |
| A trend link to re-film, with or without the app in it | `creatorline-reshoot` |
| Changing the website itself | Not something Creatorline does |

We never capture websites and never draw an app's screens. No screenshots: offer the
talking-only version ([references/other-paths.md](references/other-paths.md), section 3).

## What you need

| Need | If it is missing |
|---|---|
| What the app is: its name, plus its page link (the brand's `website` from `get_brand` when it is the brand's own) or one line on what it does and for whom | Hard gap, unless the screenshots show it. Ask once. |
| Real screenshots: 6 to 10, one per section of the site or app, at least 3 usable | Hard gap. Ask once; offer "make it without the site" as option 2. |
| Length | Asked when not given: 15 s (recommended), 10 s, 30 s or 45 s. |
| Captions | Asked when not given: Both (recommended: the hook at the top, captions below), Subtitles, or Hook only. |
| The avatar | Silent default: the brand's default avatar. |
| The script | You write it from the page, the screenshots and `brand_voice`, and show it in the plan. |
| Look | Silent default: `Auto`, phone-shot, medium framing, 9:16, 720p. |
| Setting | Silent default, from the site type ([promo-scripts.md](references/promo-scripts.md), section 11). |
| Call to action | Silent default: `brand_voice.call_to_action` from `get_brand`, else "<App>: link in bio", as on-screen text and in the post caption. |
| Language | Silent default: the brand's `language`. |
| Approved claims | Optional, never asked for as a condition: when given, kept word for word. |
| A product photo (an online store) | Optional: the avatar lifts it into frame in the closing line. |

Never offer drawn screens, scrolling screens, full-screen screens, a choice of model, frame or
sound, or a number of takes. Never ask the person to record their screen.

## The flow

1. **Start.** Call `track_skill_activation` with `creatorline-app-promo-video` (house-rules.md,
   section 10). Orient once: brand, avatar, the brand's voice and `website`, balance
   (house-rules.md, section 1). `get_video_guide` once (free): `credits.captions` and
   `credits.export` for the quote.
2. **Bring the screenshots in** (free), when the person already sent or named them.
   - Links to image files: `import_asset` with `url`, the `brand_id` and a `title` such as
     "Fernly 2: categories".
   - Files on the person's device, or images attached in this chat: ask them to drop the files
     at https://app.creatorline.io/assets?activeBrand=<brand id> and say "done", then find
     them with `list_assets` (`brand_id`, `file_type: "image"`, `source: "upload"`).
   - Already in the library: `list_assets` with `brand_id`, `file_type` and `search`.
   - A screen recording the person brings: use it the way
     [references/screen-layouts.md](references/screen-layouts.md), section 9, says.
3. **Build the section map** (free). Look at every screenshot with `preview_assets` (up to 8
   ids a call), note what each shows and its `ratio`, and put them in the page's order, hero
   first ([references/screen-layouts.md](references/screen-layouts.md), section 6). Set aside
   any with a cookie banner, an error, a half-loaded page, another company's app, or personal
   data (real names, emails, messages, balances). Fewer than 3 usable: ask the one question in
   other-paths.md, section 3. Never search the web for screens or logos.
4. **Intake.** One message, only the gaps, at most 3 questions (asking.md). Restate what they
   gave as facts, then the defaults in one line. When nothing is missing, go straight to step
   5. Example:

   > Happy to make it. Fernly, from your site. Three quick things:
   > 1. Screenshots: send 6 to 10 of your app (the home screen, the main features, reviews,
   >    pricing), as links to the files or dropped at <assets link> with "done" (recommended).
   >    Or 2) make it without the site.
   > 2. Length: 1) 15 s (recommended) 2) 10 s 3) 30 s 4) 45 s
   > 3. Captions: 1) Both: the hook at the top, captions below (recommended) 2) Captions only
   >    3) The hook only
   >
   > Defaults: Mia at her desk, "Fernly: link in bio" at the end, English.
5. **Script and card map.** Hook, body, closer; one body beat per card, the first one naming
   the app with the hero card; every line inside the word budget; then the hook, script and
   brief checks. Details and an example:
   [references/promo-scripts.md](references/promo-scripts.md).
6. **Plan and price: one yes for the whole job.**
   - The take: `create_generation` WITHOUT `confirm`: `tool: "ugc-video"`, `brand_id`,
     `avatar_id` (only when not the default), `prompt` (the brief, below), `params:
     {ugc_style: "Auto", duration: 15, aspect_ratio: "9:16", resolution: "720p"}`. Pass no
     screenshots in `inputs`: they go on top in the edit. Only an online store's closing
     product goes in, as `inputs: {objects: [<product photo>]}`.
   - Captions (`credits.captions`, also in Hook mode: they time the cards) and the export
     (`credits.export`).
   - One short message: what you will make (one line), the lines with the card each one
     carries, the three prices, the total and the balance. Ask for a yes (promo-scripts.md,
     section 14). `sufficient: false`: house-rules.md, section 2.
7. **Film.** On yes, the same `create_generation` call plus `confirm: true`. Then
   `get_generation` with `wait_seconds: 45`, again until `status` is `succeeded` or `failed`.
   Say once: "Filming Mia at her desk now; a 15-second take usually takes a few minutes."
8. **Build the project** (free). `create_video` with `brand_id`, `title: "<App> promo"` and
   `operations: [{"op": "add_clip", "asset_id": "<the take>", "id": "talk"}]`, where the take
   is `output[0].asset_id` from `get_generation`.
9. **Captions, which are also the clock.** Say "Writing the captions; they also tell me when
   each screenshot comes in." `write_captions` with `video_id`, `style: "bold"`, `position:
   "auto"`, `confirm: true` (covered by the yes). Read `get_video` every 20 seconds until
   `captions.status` is `ready`.
10. **Dead air** (free). The first word should land within 0.4 s: trim the start and the
    silent tail with `update_clip`, then `write_captions` again (free, no approval) and wait
    for `ready` (screen-layouts.md, section 2).
11. **Correct the words** (free): `edit_caption` so the lines match the script, the app's name
    first, numbers as digits. In Both mode, take the hook's own lines out (screen-layouts.md,
    section 3). Do it after the last hearing: a new hearing replaces your corrections.
12. **Put the screenshots in** (free). Say "Putting your screenshots in." One `edit_video`
    call: a card per beat, 1.4 s each on its cue word, then the hook plate and the call to
    action text, and `remove_captions` last in Hook mode. Sizes and timing:
    [references/screen-layouts.md](references/screen-layouts.md).
13. **Look and fix** (free). `preview_video` with `at` set to the hook, the middle of each card
    and the last second (up to 9 a call), and `show_safe_area: true`; with `exact: true`, also
    two or three moments mid-sentence. `get_video`: `warnings` empty. Fix with `edit_video`,
    look again.
14. **Export.** Say "Exporting the final video." `export_video` with `video_id` and
    `confirm: true` (covered by the yes). Read `get_video` every 10 to 30 seconds until
    `export.status` is `done`.
15. **Show** the result card, then ask once whether to post it, and **offer the next steps**
    (below).

**The brief for the take** (the rules are in promo-scripts.md, section 10; a full example in
section 13):

```
Idea: @Avatar1 talks to camera about <App>, <what it does> for <who>, in one continuous take, like talking to a friend, not like a narrator or a voiceover.
Framing: a medium shot from mid-torso up, @Avatar1 about two thirds of the frame, head centred left to right and top to bottom, eyes into the lens, hands gesturing in the upper part of the frame.
Setting: the phone propped on a stand on <place>, <light>, the same place all the way through.
Delivery: natural hand gestures, <accent>, quicker through the connecting lines, slower on <the number> and the last line, most energy on the hook. Her hands are empty and free.
Hook: "<the hook>"
Lines (say these as written, in this order; the edit shows what each one names): "<line 1>" "<line 2>" ...
Takeaway: <the concrete thing the app does>
Product: <App>, <one line>; its real screens are added in the edit. Page: <url>
Ending: <the closer's action>, a calm verdict with eye contact.
Language: <spoken language>
Sound: her voice and the room's own quiet sound, close and slightly compressed like a phone's front microphone; voice and room sound only.
```

## Craft

**The voice is the spine.** One continuous take carries every word, and the avatar never cuts
away. The cards come and go over it, so nothing she says is ever cut. The face sells the hook
and lands the closer; the cards prove the middle.

**Cards** (screen-layouts.md):
- Inset over the talk, never full screen, never scrolling, nothing blurred or coloured behind
  them. Each fits inside 0.78 of the frame's width and 0.60 of its height, centred: `width`
  0.48 for a phone screenshot, 0.78 for anything wider, `row: "middle"`, rounded corners.
- None during the hook or the closer (the last 15 % or so). Each shows 1.4 s, with 0.3 to
  0.5 s of face between two. About 6 in 15 s, up to 10 in a longer video: more cards come from
  more screenshots and more beats, never from longer windows.
- The hero card (logo and navigation bar) first, on the beat that names the site; then the
  page's own order: the product or features, the app at work, reviews, specs, the price.
- Every card shows whose site it is, and is used whole, exactly as the person sent it.

**The script** (promo-scripts.md):
- Hook 8 to 12 % of the runtime, body about 70 %, closer about 15 %.
- The hook: one clause, at most 8 words, about 2 s, with a number, price, percentage, time,
  contrast or named result in its first breath: the app's facts from the page or the
  screenshots, or a personal result from the persona's own use ("it saved me 10 hours"). Never
  opened with "This is", "Here's", "Meet", "I found", "Let me show you", "Say hello to" or a
  filler ("OK", "So", "Wait", "Um", "Well", "Like").
- Words: 22 to 26 for 10 s, 35 to 40 for 15 s, 40 at most; 70 to 80 for 30 s. An overfull
  script is what makes a take talk too fast.
- Each body beat talks about the card that is up. A number is said only while its card shows.
- The closer: a concrete result, then a short verdict. The call to action is on-screen text and
  in the post caption, never a spoken line (our writer turns it into a verdict).
- Alive: contractions, one or two connectors ("ok so", "honestly"), short and long lines mixed,
  one imperfect moment, the speed changing inside the take, one performed peak.

**The take.** `Auto`, with the Framing, Setting and Delivery lines doing the work: a propped
phone, a medium shot, empty hands, a lived-in room that fits the site type, a natural accent.
No screen, phone, laptop or product in the picture before the closer: a filmed screen comes
out redrawn with garbled text. Keep it phone-shot; `Cinematic` only when the person asks for a
polished brand film.

**Walkthroughs.** "How to do X in our app": 3 to 5 steps, one or two cards per step, 20 to
30 s. Each step gets a label on the top row over its stretch, `Step 1 – Snap the Receipt`, in
the same look and size every time (screen-layouts.md, section 8).

**Claims.** The avatar is a living persona (house-rules.md, section 7): how long it has used
the app ("I've used it every day since March"), what it got from it ("it saved me 10 hours
last month") and a testimonial in its own words are welcome, and a personal result makes a
strong hook. The app's own facts (a rating, a review or download count, a ranking, an award, a
price) come from the screenshots, the page or the person; a number said while a card is up
matches that card. "This app changed my life" is weak because it is vague: say what changed.
An approved-claims list, when given, is kept word for word. Finance and health apps: no
guaranteed income or return, and no promise that it cures, treats or prevents a disease.

## Check before you show it

- The take is the right avatar (`preview_assets` on the take shows its cover frame) and close
  to the length asked (`duration_sec`).
- The first word lands within 0.4 s.
- `captions.lines` holds every scripted line; the app's name is spelled right and numbers are
  digits after the last hearing. Both mode: the hook shows only in the plate.
- The hero card comes first; each card starts on its cue word and shows 1.4 s; none in the hook
  or the closer; face between cards.
- With `exact: true` frames: one person, at most two hands, the same face throughout, a clean
  mouth, no drawn screen or phone, no product before the closer, no text in the picture.
- With `show_safe_area: true`, nothing to read sits under the apps' bands or the right-hand
  button column, and no text sits on a card's own words.
- `get_video`: `warnings` empty, `ready_to_export` true, `captions.status` `ready` (or no
  captions in Hook mode).
- No card shows personal data or another company's app, nor, when the person gave an
  approved-claims list, a claim off it.

## If it goes wrong

| What happened | What to do |
|---|---|
| `import_asset`: the URL serves a page (`text/html`) | It is a share page, not the file. Ask for the image's own address, or for the files dropped at /assets. |
| A file over the limit (images 25 MB, video 100 MB) | Ask for a smaller file. |
| Fewer than 3 usable screenshots | Ask once: send more, or make it without the site (other-paths.md, section 3). Never retry on your own or look elsewhere. |
| The take talks far too fast | The script was over the word budget: cut a beat and offer one re-take, quoted first. |
| The take says the app's name wrong | Fix the caption with `edit_caption`. For the voice, offer one re-take with the name spelled as it sounds. A re-take is paid: quote it first. |
| A line is missing or changed | The writer softens a fact it cannot see on camera, and squeezes lines over the budget. Place the card on the line that carries the idea; if a line matters, shorten it and offer one re-take. |
| The take shows a phone, a laptop or a made-up screen | Cover that moment with a real card. Re-take only on a yes, with the visual lines rewritten as what is there (a couch, a lamp, empty hands). |
| The product shows up before the closer | Re-take with the Ending line saying where it waits until the last line; or drop the product photo. |
| The take with a product photo was refused | It was refunded. Never send the same inputs again: offer the same take without the product photo, the closer as a gesture. |
| Wrong face, or the face drifts | Check the avatar picked, then offer one re-take. |
| The run failed or was refused | It was refunded. Say what failed in plain words; rephrase the brief (no real person's or other brand's name) before a paid retry. |
| `captions.status` is `failed` | Call `write_captions` again. |
| The app's name is wrong again after a change | A new hearing replaced your corrections: `edit_caption` again. |
| "being changed somewhere else" | Read `get_video`, redo the edit. Ask the person to leave the studio tab alone while you work. |
| `export_video` refused | Read `warnings`: something still generating, captions still writing, or too long. |
| A card hides the face in the hook | Move its `start` after the hook. |
| Changes after the export | The new version needs its own export, charged again: ask first. |

House-rules.md, section 5, has the verdict table for any take and the three-attempt stop.

## Show the result

```
**Fernly promo**: 15 s, Mia talks about Fernly at her desk; four of your screenshots pop up as she names them; captions on, the hook at the top.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

Want me to post it? It waits in your review queue first.

What next?
1. Post it to TikTok and Instagram
2. Make a cover for it
3. Try a second hook or another avatar to test against this one
```

The video link may expire; the Creatorline link stays. Say the length in the first line. When
the video has no screenshots (the talking-only version), say so in the first line. Never name
the model, a job id or the internal steps.

## Next steps to offer

- **Post it**: `creatorline-publish`, with `export.asset_id`, a caption in the brand's voice
  that repeats the call to action, and `made_with_ai: true`. It goes to the review queue;
  `publish_post` only on an explicit yes naming the post, the accounts and the time.
- **A cover**: `creatorline-cover-image`, the avatar with a few words from the hook.
- **Variations to test**: `creatorline-ad-variations`: another hook, another avatar, another
  language, each a new take with the same cards.
- **The avatar's own voice**: when the avatar has a voice of its own (`get_avatar`
  `voice_id`), `run_video_ai` with `action: "change_voice"` and that `voice_id` on the `talk`
  clip. Price it and the new export together, ask once, then `write_captions` again (free), fix
  the words again, and export. Asked for up front: say in the plan that it is priced once the
  take exists. After step 8, call it without `confirm` for the price, ask, run it with
  `confirm: true`, and read `get_video` until the clip is no longer `generating`. Then step 9.
- **More screenshots or a new order**: free edits in Video Studio, then a new export.

## References

- [references/promo-scripts.md](references/promo-scripts.md): the shape and word budget by
  length, the hook and its angles, one beat per card, the closer, sounding alive, claims, the
  brief, settings by site type, the checks, a full example.
- [references/screen-layouts.md](references/screen-layouts.md): the order of work, the captions
  clock and the three caption modes, card size, timing and order, the hook plate and call to
  action, walkthrough labels, a screen recording the person brings, the look-before-export
  checks.
- [references/other-paths.md](references/other-paths.md): a trend re-filmed as an app promo,
  why we never film a screen, the talking-only version, what to ask for.
- [references/house-rules.md](references/house-rules.md): the session, consent before spending,
  waiting, the result card, failures, safety, what only the app does.
- [references/asking.md](references/asking.md): how to ask the intake question.
- [references/video-briefs.md](references/video-briefs.md): how the server's writer reads the
  brief, templates, speech budget, the persona.
- [references/product-intake.md](references/product-intake.md): getting media in, claims, apps
  and websites.
