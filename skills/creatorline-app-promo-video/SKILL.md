---
name: creatorline-app-promo-video
description: "Makes a UGC promo for an app, website, online store or SaaS: the AI avatar talks to camera while the person's real screenshots or screen recording show as cards, a split screen or cutaways. Use for app ads, website promos, SaaS demos, app walkthroughs. Not for a physical product: use creatorline-talking-video. A trend link to re-film: creatorline-reshoot."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# App Promo Video

Make a short vertical promo for the person's app, website, online store or SaaS. Their avatar
talks to camera in one take, and their REAL screens (screenshots or a screen recording) come
in over the talk at the moment a line names them. The person gets a captioned 9:16 video, an
editable Video Studio project they can open and change, and a post ready for the review queue.
The promise: real screens only, never drawn ones; one short exchange before the work; one
price and one yes for the whole job; the finished video shown with links and next steps.

## When to use

- "Make a UGC ad for my app", "a promo for our website with my avatar", "a TikTok that shows
  our SaaS", "my avatar talks about our online store while the screenshots show".
- "Show how to do X in our app": a walkthrough, one screen per step (Craft, "Walkthroughs").
- The person has screenshots or a screen recording, can send them, or they are already in the
  brand's library.
- An app promo already under way here, when the person then brings a trend to copy: the Reshoot
  path in [references/other-paths.md](references/other-paths.md). A request that opens with a
  trend link goes to `creatorline-reshoot`, even when the app is in it.

## Not for

| The ask | Use |
|---|---|
| A physical product held, used or reviewed on camera | `creatorline-talking-video` (or `creatorline-product-video` when the product is the hero) |
| A how-to for a physical product or a technique, in labeled steps | `creatorline-tutorial-video` |
| Only a script, hooks or a caption | `creatorline-short-script` |
| A screen recording with a voice over it and no face | `creatorline-voiceover` |
| Editing a video project that already exists | `creatorline-video-studio` |
| A real promo video with a real person, to put the avatar in | `creatorline-character-swap` |
| A trend link to re-film, with or without the app in it | `creatorline-reshoot` (it carries a screen recording into the new take) |

We never capture websites or draw an app's screens. If the person has no screens, offer the
talking-only version ([references/other-paths.md](references/other-paths.md), section 3).

## What you need

| Need | If it is missing |
|---|---|
| What the app is: its name, plus its page link or one line on what it does and for whom | Hard gap, unless the screenshots show it. Ask once. |
| Real screens: 2 to 6 screenshots, or one screen recording, or both | Hard gap. Ask once; offer the talking-only version as option 2. |
| The avatar | Silent default: the brand's default avatar. |
| Length | Silent default: 15 s (10 s for one screen, 20 to 30 s for a walkthrough). |
| Layout | Silent default, from the screens (the table under Craft). |
| The script | You write it from the app's page, the screens and `brand_voice`, and show it in the plan. |
| Look | Silent default: the `Talking head` template, phone-shot, 9:16, 720p. |
| Captions | Silent default: on, `hormozi` style. They also time the screens. |
| Call to action | Silent default: `brand_voice.call_to_action` from `get_brand`, else "<App>: link in bio", as on-screen text and in the post caption. |
| Language | Silent default: the brand's `language`. |
| Voice | Silent default: the voice the take is filmed with. When the person asks for the avatar's own voice, see Next steps, "The avatar's own voice". |

## The flow

1. **Start.** Call `track_skill_activation` with `creatorline-app-promo-video` (house-rules.md,
   section 10). Orient once: brand, avatar, the brand's voice, balance (house-rules.md,
   section 1).
2. **Bring the screens in** (free), when the person already sent or named them.
   - Links to image or video files: `import_asset` with `url`, the `brand_id` and a `title`
     such as "Fernly screen 2: categories". A TikTok or Instagram link to a posted screen
     recording works too.
   - Files on the person's device, or images attached in this chat: ask them to drop the files
     at https://app.creatorline.io/assets?activeBrand=<brand id> and say "done", then find
     them with `list_assets` (`brand_id`, `file_type` `image` or `video`, `source: "upload"`).
   - Already in the library: `list_assets` with `brand_id`, `file_type` and `search`.
   - Look at every screen with `preview_assets` (up to 8 ids a call) and note what each shows.
     A recording shows only its first frame there; read its length (`duration_sec`).
     Set aside a screen with a cookie banner, an error, a half-loaded page, or personal data
     (real names, emails, messages, balances): ask for a version with demo data.
3. **Intake.** One message, only the hard gaps (asking.md). Restate what they gave as facts,
   then the defaults in one line. When nothing is missing, go straight to step 4. Example,
   when only the screens are missing:

   > Happy to make it. Fernly, from your site. One thing I need: your app's real screens.
   > 1. Send 2 to 6 screenshots or a short screen recording (links to the files, or drop them
   >    at <assets link> and say "done") (recommended)
   > 2. Make it without screens: Mia talks, the app's name shows as text
   >
   > Defaults: Mia, 15 s, phone style, captions on, "Fernly: link in bio" at the end.
4. **Script and screen map.** Write four beats: the problem (hook), the app moment, the result,
   the verdict, with the call to action as on-screen text. Every line within the speech budget,
   every feature line tied to a screen that shows it. Details and examples:
   [references/promo-scripts.md](references/promo-scripts.md).
5. **Plan and price: one yes for the whole job.**
   - The take: `create_generation` WITHOUT `confirm`: `tool: "ugc-video"`, `brand_id`,
     `avatar_id` (only when not the default), `prompt` (the brief, below), `params:
     {ugc_style: "Talking head", duration: 15, aspect_ratio: "9:16"}` (`duration` is the
     length you picked, 4 to 30 for one take). Pass no screens in `inputs`: the avatar goes in
     by itself, and the screens go on top in the edit.
   - Captions and export: `get_video_guide` once (free) gives `credits.captions` and
     `credits.export`.
   - One short message: what you will make (one line), the spoken lines with the screen each
     one carries, then the three prices, the total and their balance. Ask for a yes
     (promo-scripts.md, section 9, has the message). `sufficient: false`: house-rules.md,
     section 2.
6. **Film.** On yes, the same `create_generation` call plus `confirm: true`. Then
   `get_generation` with `wait_seconds: 45`, again until `status` is `succeeded` or `failed`.
   Say once: "Filming Mia at her desk now; a 15-second take usually takes a few minutes."
7. **Build the project** (free). `create_video` with `brand_id`, `title: "<App> promo"` and
   `operations: [{"op": "add_clip", "asset_id": "<the take>", "id": "talk"}]`, where the take
   is `output[0].asset_id` from `get_generation`.
8. **Captions, which are also the clock.** Say "Writing the captions; they also tell me when
   each screen comes in." `write_captions` with `video_id`, `style: "hormozi"`, `position:
   "auto"`, `confirm: true` (covered by the yes). Read `get_video` every 20 seconds until
   `captions.status` is `ready`. `captions.lines` gives every spoken phrase with its `start`
   and `end`.
9. **Final cut, in one `edit_video` call** (free). Skip it when nothing changes.
   - Dead air: when the first line starts after about 0.5 s, or the last ends well before the
     clip does, trim with `update_clip` (`id: "talk"`, `trim_start`, `trim_end`).
   - Split-screen layout: the `split_clip` operations at the lines about the app, in seconds
     AFTER the trim (screen-layouts.md, section 6).
   - Then `write_captions` again (free, no approval) and wait for `ready`. These are the
     final times.
10. **Correct the words** (free). Fix a misheard word, the app's name above all, with
    `edit_video` `edit_caption` (`index`, `text`). Do it after the last hearing: a new hearing
    replaces your corrections.
11. **Put the screens in** (free). Say "Putting your screens in." One `edit_video` call: the
    screens in the layout you chose (cards, cutaways, or `set_split_screen` on the pieces),
    then the hook text and the call to action text. Exact operations, sizes and timing:
    [references/screen-layouts.md](references/screen-layouts.md).
12. **Look and fix** (free). `preview_video` with `at` set to the hook, the middle of each
    screen's window and the last second (up to 9 a call), and `show_safe_area: true`.
    `get_video`: `warnings` empty, `captions.status` `ready`. Fix with `edit_video`, look again.
13. **Export.** Say "Exporting the final video." `export_video` with `video_id` and
    `confirm: true` (covered by the yes). Read `get_video` every 10 to 30 seconds until
    `export.status` is `done`.
14. **Show** the result card, then **offer the next steps** (below).

**The brief for the take** (video-briefs.md has the rules; promo-scripts.md a full example):

```
Idea: @Avatar1 talks to camera, hands free, about <App>, <what it does> for <who>, at <setting>.
Hook: "<line 1>"
Lines (use these lines as written; the edit shows what each one names): "<line 1>" "<line 2>" "<line 3>" "<line 4>"
Takeaway: <the concrete thing the app does>
Product: <App>, <one line>. Page: <url>
Setting: <place>, daylight from a window.
Ending: a calm verdict with eye contact.
Language: <spoken language>
Sound: voice and room sound only.
```

Leave phones, laptops and screens out of the brief: the writer adds no prop the inputs do not
supply, and a screen the model films is redrawn with wrong text.

## Craft

**The voice is the spine.** One take carries every word. The screens come and go over it, so
nothing the avatar says is ever cut. The face sells the hook and lands the verdict; the screens
prove the middle.

**Pick the layout from the screens** (sizes and operations in screen-layouts.md):

| The person gave | Layout | How |
|---|---|---|
| Screenshots | Cards | `add_layer` with the photo, rounded corners and a white edge, 1.5 to 3 s each |
| A phone screen recording | Full-screen cutaways | `add_layer` with `fill: true` and `trim_start`, 2 to 4 s each |
| A desktop (wide) recording or site | Split screen | `split_clip` at the lines, then `set_split_screen` on that piece: the screen on top, the face below |
| A mix | Cards for the stills, a cutaway for the recording | Same windows rule |

**Timing that reads.**
- No screen during the hook (about the first 1.5 to 2 s) or the verdict (the last 2 s). The
  exception: a result-first opener, when the finished result is the most striking picture.
- Each screen arrives on the line that names it, a moment before the word.
- Leave 0.3 to 0.5 s of face between two screens; push the later one back if they collide.
- About one screen per 3 to 4 seconds of middle. More screens need more lines, not shorter
  windows.
- The first screen identifies the app (its home or a screen with its name or logo) and lands
  on the line that names it. Then the feature screens in the order the lines mention them,
  then the result screen.

**The script.** Problem, app moment, result, then the call to action as text. Name the app
once, early in the middle, never as the first word. Every feature line says what its screen
shows, in the present tense. The spoken ending is a verdict about the app, never an order to
the viewer: the writer turns a spoken call to action into a verdict anyway. The call to action
goes on screen and in the post caption.

**Walkthroughs.** "How to do X in our app": 3 to 5 steps, one line and one screen per step, 20
to 30 s. Each step gets a short label on the top row while its screen shows ("1. Snap the
receipt"), in the same look and size every time (screen-layouts.md, section 8).

**Claims.** Only what the screens show, what the page states, and opinions. No ratings,
review counts, download counts, rankings, awards or time and money saved unless the person
gives them as approved claims, and then word for word. Never "this app changed my life" or
"I've used it for months": the avatar has no past (house-rules.md, section 7). Finance and
health apps: page facts only, no income, savings or health promises.

**Screens that work.**
- The app's own screens, from the person's own app or one they are allowed to promote. Never
  another company's app, never a made-up rating badge, notification or review.
- Demo data only. Cropped, sharp, no cookie banner, no half-loaded page.
- A phone screenshot reads as a narrow card; a desktop screenshot as a wide card or a split
  screen. Small desktop text is unreadable on a phone: prefer the phone version of a site when
  the person has it.

**The take.** `Talking head` fits nearly every app promo. `Reaction` fits a "look at this"
promo where the face reacts and the screen shows what she reacts to. Pick the setting by the
app: a home desk or kitchen table for work, money and productivity tools; a couch or a kitchen
counter for lifestyle, food, fitness and shopping apps. Keep it phone-shot; `Cinematic` only
when the person asks for a polished brand film.

## Check before you show it

- The take is the right avatar (`preview_assets` on the take shows its cover frame) and close
  to the length asked (`duration_sec`).
- `captions.lines` holds every scripted line, and the app's name is spelled right after the
  last hearing.
- Each screen starts within about half a second of the line that names it.
- The hook and the verdict show the face (unless you chose a result-first opener).
- With `show_safe_area: true`, nothing to read sits under the apps' bands or the right-hand
  button column.
- No text overlaps the captions' row or the important part of a screen.
- `get_video`: `warnings` empty, `ready_to_export` true, `captions.status` `ready`.
- No screen shows personal data, another company's app or a claim the person did not approve.

## If it goes wrong

| What happened | What to do |
|---|---|
| `import_asset`: the URL serves a page (`text/html`) | It is a share page, not the file. Ask for the image's own address, or for the files dropped at /assets. |
| A file over the limit (images 25 MB, video 100 MB) | Ask for a shorter recording or a smaller file. |
| A photo or carousel post link is refused | `import_asset` takes post videos only. Ask for the image files. |
| The take says the app's name wrong | Fix the caption with `edit_caption`. For the voice, offer one re-take with the name spelled as it sounds. A re-take is paid: quote it first. |
| A line is missing or changed | The writer softens a fact it cannot see on camera, and squeezes lines over the budget. Place the screen on the line that carries the idea; if a line matters, shorten it and offer one re-take. |
| The take shows a made-up phone screen | Cover that moment with a real screen (a cutaway or a card). |
| Wrong face, or the face drifts | Check the avatar picked, then offer one re-take. |
| The run failed or was refused | It was refunded. Say what failed in plain words; rephrase the brief (no real person's or other brand's name) before a paid retry. |
| `captions.status` is `failed` | Call `write_captions` again. |
| The app's name is wrong again after a change | A new hearing replaced your corrections: `edit_caption` again. |
| "being changed somewhere else" | Read `get_video`, redo the edit. Ask the person to leave the studio tab alone while you work. |
| `export_video` refused | Read `warnings`: something still generating, captions still writing, or too long. |
| A card hides the face in the hook | Move its `start` after the hook line. |
| A wide recording loses its sides in the split | Use `share: "third"`, or move `focus` to the part that matters, or use a wide card. |
| The split screen's recording starts too early | A split screen plays its video from the start: use a cutaway layer with `trim_start` instead. |
| Changes after the export | The new version needs its own export, charged again: ask first. |

House-rules.md, section 5, has the verdict table for any take and the three-attempt stop.

## Show the result

```
**Fernly promo**: 15 s, Mia talks about Fernly at her desk; your three screens come in as she names them; captions on.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Post it to TikTok and Instagram (it waits in your review queue first)
2. Make a cover for it
3. Try a second hook or another avatar to test against this one
```

The video link may expire; the Creatorline link stays. When the video has no screens (the
talking-only version), say so in the first line.

## Next steps to offer

- **Post it**: `creatorline-publish`, with `export.asset_id`, a caption in the brand's voice
  that repeats the call to action, and `made_with_ai: true`.
- **A cover**: `creatorline-cover-image`, the avatar with a few words from the hook.
- **Variations to test**: `creatorline-ad-variations`: another hook, another avatar, another
  language, each a new take on the same screens.
- **The avatar's own voice**: when the avatar has a voice of its own (`get_avatar`
  `voice_id`), `run_video_ai` with `action: "change_voice"` and that `voice_id` on each clip
  that carries speech (one per piece in a split-screen video). Price all of them and the new
  export together, ask once, then `write_captions` again (free), fix the app's name again, and
  export. Asked for up front: say in the plan that it is priced once the take exists. After
  step 7, call it on the one `talk` clip without `confirm` for the price, ask, run it with
  `confirm: true`, and read `get_video` until the clip is no longer `generating`. Then step 8.
- **More screens or a new order**: free edits in Video Studio, then a new export.

## References

- [references/screen-layouts.md](references/screen-layouts.md): the three layouts as exact
  operations, sizes for phone and desktop screens, the captions clock, hook, step and call to
  action texts, the look-before-export checks.
- [references/promo-scripts.md](references/promo-scripts.md): beats by length, hook angles for
  apps, the claims list, the brief with a full example, the script-to-screen map.
- [references/other-paths.md](references/other-paths.md): a trend re-filmed as an app promo,
  the phone-in-hand shot, the talking-only version, what to ask for when there are no screens.
- [references/house-rules.md](references/house-rules.md): the session, consent before spending,
  waiting, the result card, failures, safety, what only the app does.
- [references/asking.md](references/asking.md): how to ask the intake question.
- [references/video-briefs.md](references/video-briefs.md): how the server's writer reads the
  brief, templates, speech budget, the claim floor.
- [references/product-intake.md](references/product-intake.md): getting media in, claims, apps
  and websites.
