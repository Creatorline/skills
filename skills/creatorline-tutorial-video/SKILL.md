---
name: creatorline-tutorial-video
description: "Makes a short step-by-step how-to video with the brand's AI avatar: 3 to 5 steps of using a product or a technique, each labeled on screen, captioned and ready to post. Use for tutorials, how to use it, routines, recipes, step by step. Not for reviews: use creatorline-talking-video. Not for app or website walkthroughs: use creatorline-app-promo-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Tutorial video

You make a short vertical how-to: the brand's avatar shows 3 to 5 steps of using a product (or
doing a technique), each step labeled on screen ("Step 2: Two drops"), with captions, exported
and ready to post. The promise to the person: one sentence from them, a script they can read
and change before anything is spent, and a finished video they can post or open in Creatorline
and adjust. The avatar keeps the same face and persona in every tutorial, so a brand can run a
recognizable how-to series.

Follow [house-rules.md](references/house-rules.md) for the session, consent before spending,
waiting, showing results, safety and refusals. Ask the way [asking.md](references/asking.md)
says.

## When to use

- "Show how to use our serum", "a how-to for the blender", "a tutorial", "step by step".
- A routine with a product: morning skincare, a hair routine, a coffee ritual.
- A recipe or a technique in steps: "how to make whipped coffee", "3 ways to tie a scarf".
- The avatar is on camera and the steps are the point of the video.

## Not for

| The person wants | Use |
|---|---|
| An opinion, a review or a demo with no steps | `creatorline-talking-video` |
| Opening a package and reacting | `creatorline-unboxing-video` |
| Wearing and showing an outfit (fit check, OOTD, haul) | `creatorline-try-on-video` |
| Steps inside an app or a website, with its screens | `creatorline-app-promo-video` |
| Hands only or the product alone, with a narrator | `creatorline-product-video` |
| A how-to as photo slides or a carousel | `creatorline-photos` |
| A narrated explainer with no face on camera | `creatorline-faceless-video` |
| An episode over a minute, or a recurring show with a host | `creatorline-ai-host` |
| An existing tutorial video re-filmed with the avatar | `creatorline-reshoot` |
| Only the script, nothing filmed | `creatorline-short-script` |
| Labels or captions on a video that already exists | `creatorline-video-studio`, `creatorline-captions` |

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| A photo of the product (product tutorials) | Yes ([product-intake.md](references/product-intake.md)) | none |
| A photo of each object a technique needs (a sheet to fold, a pan) | Yes, for a technique with no product | Ask for it, or offer a plain one made with `text-to-photo`, priced with the rest |
| What the viewer learns | Only when the ask does not say | "How to use <product>" |
| The steps | Only when the product's use cannot be read off the photo, the label or the page (a machine, a device, a kit) | You draft them; the person reads them in the plan |
| Photos of other handheld objects the steps need | No | Steps built around the product and the hands (see Craft) |
| Avatar | No | The brand's default avatar |
| Number of steps | No | 4; 3 when the use is simple; 5 at most |
| Length | No | 3 steps 15 s, 4 steps 20 s, 5 steps 26 s |
| Build | No | One take |
| Setting | No | From the category ([steps-and-script.md](references/steps-and-script.md), section 13) |
| Template (`ugc_style`) | No | `Auto` |
| Spoken language | No | The brand's `language` |
| Step labels | No | `Step 1: Heading` on the top row, size `m`, the look that fits the product ([assembly.md](references/assembly.md), section 3) |
| Captions | No | On, at the bottom, in the style that goes with the labels (assembly.md, section 3) |
| Title and end text | No | A title over the hook; the brand's call to action, or "Save this for later", over the last 2 s |
| Frame and sharpness | No | `9:16`, `720p` |

The person gave a step list or a script: follow it beat for beat, in their order, with their
words (asking.md, section 4). Change only what cannot be filmed or breaks the claim floor, and
say what you changed.

## The flow

1. **Start.** When `track_skill_activation` is in your tool list, call it once for this
   request with `skill_name: "creatorline-tutorial-video"` (house-rules.md, section 10).
2. **Orient** once per conversation (house-rules.md, section 1): `list_brands`, `get_brand`
   (`default_avatar_id`, `language`, `brand_voice`), `list_avatars` for the avatar's name (the
   default, or the one the person named), `get_credit_balance`. Also call `get_video_guide`
   once (free): it gives the text looks, the caption styles, and `credits.captions` and
   `credits.export` for the quote. No avatar on the brand: say so and link
   https://app.creatorline.io/avatars/new; nothing can be filmed until there is one.
3. **Get the product** (product-intake.md). In the library: `list_assets` with `brand_id`,
   `file_type: "image"` and `search` (the product's name), then `preview_assets` on the likely
   ones and confirm by name. From a file link: `import_asset` with `url`, `brand_id`, `title`.
   Write the product card once. No product (a technique): skip this step.
4. **Intake, only if needed.** One message, at most 3 questions, numbered options with the
   recommended one first (asking.md). Ask only the hard gaps: the product photo, and the steps
   when the use cannot be read. End with one line of defaults. For example:

   > Two quick things before I write the steps:
   > 1. The kettle: send a link to a photo of it, or tell me its name if it is already in your
   >    Creatorline library.
   > 2. The steps: 1) I write them from your product page (recommended) 2) You send your own
   >
   > Defaults: Mia, 4 steps, about 20 s, one take in her kitchen, captions on, labels at the
   > top, English. Say if you want any changed.

5. **Draft the steps and the script**
   ([steps-and-script.md](references/steps-and-script.md)): 3 to 5 real steps in the order
   the product is used, a label per step, a spoken line per step that opens with its own order
   word (First, Then, Next, Last), a hook and an ending.
6. **Pick the build.**

   | Build | When | Labels are timed by |
   |---|---|---|
   | One take (default) | 3 to 5 steps in one place, 15 to 30 s in all | The captions: each step's order word |
   | Step takes | A step happens in another place, or the product changes state too much for one shot; over 30 s; the person wants each step filmed on its own | Each step's own clip (`over`) |

   Step takes are fresh renders: the room, the outfit and the voice can shift a little between
   them. Prefer one take.
7. **Write the brief** for each take ([steps-and-script.md](references/steps-and-script.md),
   sections 11 and 12, on top of [video-briefs.md](references/video-briefs.md)).
8. **Price the whole video at once.** For each take, call `create_generation` WITHOUT
   `confirm`:

   ```
   create_generation {
     tool: "ugc-video",
     brand_id: <brand>,
     avatar_id: <only for an avatar other than the brand's default>,
     prompt: <the brief>,
     inputs: { objects: [<product asset id>, <other object photos>] },
     params: { ugc_style: "Auto", duration: 20, aspect_ratio: "9:16", resolution: "720p" }
   }
   ```

   Each answer is `needs_approval` with `credits`, `credit_balance` and `sufficient`. A run
   whose input does not exist yet (a take that needs an object photo still to be made) is
   priced with `estimate_generation_cost` (same `tool`, `params` and the `inputs` you have;
   it takes no brand, avatar or prompt). Add `credits.captions` and
   `credits.export` from the guide (captions are charged once per video, the export every
   time). Then one message: the title, the numbered steps (label and line), the length, the
   avatar, the setting, and the total against the balance (the plan and price example below).
   `sufficient: false`: say what is missing and offer a shorter version (fewer steps, 15 s);
   house-rules.md, section 2. The person changes a step or a line: rewrite the brief and quote
   again before anything starts.
9. **Film.** On yes, call `create_generation` again for each take with the same arguments
   plus `confirm: true`. Step takes: start all of them; extra ones wait for a free slot on
   their own. Then `get_generation` with `generation_id` and `wait_seconds: 45` until `status`
   is `succeeded` or `failed`. Between calls, one short line: "Filming the four steps now,
   about two to four minutes." Keep each take's `output[0].asset_id`.
10. **Assemble in Video Studio** ([assembly.md](references/assembly.md)):
    1. `create_video` with `brand_id`, a `title` and the clips (step takes: the labels too,
       each `over` its step's clip).
    2. `write_captions` with the caption style from assembly.md section 3 and
       `position: "auto"`, without `confirm`. The price matches the quote: call again with
       `confirm: true` without asking again (the yes covered it). Different: ask. Say
       "Writing the captions." and read `get_video` about every 20 s until `captions.status`
       is `ready`. Fix a misheard word with `edit_video` and an `edit_caption` operation (free).
    3. One take: time each label from `captions.lines` (assembly.md, section 5), then one
       `edit_video` call adds the title, the labels and the end text.
    4. `preview_video` at the middle of each text, with `show_safe_area: true`. Fix with
       `edit_video`, look again.
    5. `get_video`: `ready_to_export` is true and `warnings` is empty. `export_video` without
       `confirm`, then with `confirm: true` when the price matches. Say "Exporting the final
       video." and read `get_video` every 10 to 30 s until `export.status` is `done`.
11. **Show** the result (below) and **offer the next step**.

### The plan and price message

> Here is the tutorial. Change any step or line before I film it.
>
> **Glow C serum in 4 steps** (about 20 s, Mia at her bathroom sink, one take)
> - Hook: "Here's the order to put your serum on. Four steps."
> - Step 1: Dry skin. "First, start with clean skin that's completely dry."
> - Step 2: Two drops. "Then two drops on your fingertips, not your palm."
> - Step 3: Press in. "Next, press it into your cheeks and forehead, gently."
> - Step 4: Let it settle. "Last, give it a minute before your moisturizer."
> - End: "That's the whole routine, start to finish." On screen: "Save this for later".
>
> The video, captions and export: <N> credits; you have <M>. Go ahead?

## Craft

The know-how lives in [steps-and-script.md](references/steps-and-script.md). The rules that
decide most results:

- **Shape.** Hook (the result or the reason, 0 to 3 s) then the steps then the result on
  camera with a calm verdict. Each step is one shot of 3 s or more.
- **Real steps.** In the order the product is really used. One visible action and one product
  interaction per step (one press, one scoop, one swipe). Never a step the product cannot do.
- **State.** The cap comes off as its own action before anything comes out, and stays off
  until a step or a cut puts it back. Each step starts where the last one ended, and its
  action says that state.
- **The right place on the body.** Fragrance on the wrist or neck, serum on the fingertips
  first, lip products on the lips. Put a wrong spot right in the brief and say so in one line.
- **Objects.** The server's writer only shows objects the inputs show. A cup, a towel or a
  brush the steps need comes in as a photo in `objects` (or a `location` photo where it
  stands). No photo: build the step around the product and the hands, or offer to make a plain
  photo of the object with `text-to-photo` (priced in the batch). A garment the avatar only
  wears is a Wardrobe line; a garment that IS the product (the scarf being tied) goes in
  `objects` like any product.
- **Labels.** `Step 1: Heading`: a colon, never a dash; a heading of 1 to 3 words that says
  what to do ("Two drops", "Press start"), never a result ("Instant glow"); at most 26
  characters in all so it holds one line at size `m`; in the spoken language. Alternatives
  ("3 ways") read `Way 1: Heading`. The labels do the counting: never ask for fingers held up.
- **Lines.** You write them, quoted, with "say these lines as written". Each step's line opens
  with its own order word, and no other line uses those words, so the captions can find where
  each step starts. Calm and specific: how much, how long, where. Amounts and times only from
  the label or the instructions.
- **No spoken call to action.** The writer turns one into a verdict anyway. The call to action
  is the end text and the post caption.
- **Template.** `Auto` for every tutorial: the brief already says it is a how-to. `GRWM` only
  when the person asks for a get-ready-with-me routine. Avoid `Talking head` (it pushes in on
  the face each sentence and the hands leave the frame) and `Cinematic` unless they ask for a
  polished look.
- **Setting.** A real room that fits the product, the phone propped at chest height so both
  hands are free, and no mirror in the frame.

## Check before you show it

- Every promised step is said, in order: you found each one in `captions.lines`.
- One label per step, numbered in order, same look and size, one line each, shown while its
  step plays. One text on the top row at a time.
- Captions sit at the bottom and match the script; nothing in the shaded bands of the preview.
- The right avatar and the right product, its label toward the camera at least once.
- No result claims in the labels, the lines or the end text (house-rules.md, section 7).
- `preview_video` answered `exact: false`: some clips show only their cover frame, so you have
  judged layout and words, not the action. Say so and ask the person to watch it.
- `warnings` is empty and the length is within a second or two of the plan.

## If it goes wrong

| What happened | Fix |
|---|---|
| A take failed | It was refunded. Say what failed in plain words; change one thing; ask before filming again (house-rules.md, section 5). |
| The whole take is off (steps missing, wrong product) | Re-film it with one change, quoted first. Put it in the same video: `replace_clip`, then `update_clip` with `trim_end` at the new take's `source_duration`, then `write_captions` (free: captions are paid once per video) and re-time the labels (assembly.md, section 5). A new video pays for captions again. |
| One step came out wrong (wrong hand action, wrong order) | Re-film only that step as a 4 to 6 s take and swap it in (assembly.md, section 9). Quote it first. |
| The same step fails twice | Make a still of the avatar mid-step with `photo-edit` (the product in `other_elements`), then animate it with `photo-to-video` (one continuous take; the brief says only what moves) and swap it in. Quote both runs together. |
| A step was skipped or two were merged | Too many beats for the seconds: add 5 s or drop a step, at most one step per 3.5 to 4 s. |
| Lines rushed or cut off | Over the word budget: shorten the lines (steps-and-script.md, section 8). |
| The voice differs between step takes | Offer to give every step clip the avatar's own voice: `run_video_ai` with `action: "change_voice"`, the clip's `clip_id` and the avatar's `voice_id` (from `get_avatar`), one call per clip, quoted together, before the captions (assembly.md, section 6). |
| A step's order word is missing from the captions | Look for its heading words in the lines around it; still nothing, place that label between its neighbours and check it with `preview_video` (assembly.md, section 5). |
| A label shows over the wrong moment | `update_text` with new `start` / `end`, read from `captions.lines`. |
| `captions.status` is `out_of_date` | The clips changed. `write_captions` again: free. |
| `captions.status` is `failed` | The captions credits came back. Call `write_captions` again: its price is the one already agreed, so it needs no new yes. Tell the person in one line. |
| The product looks different from the photo | A big printed logo garbles easily (product-intake.md, section 5). Keep exact words in labels and captions; retake with a cleaner photo only on a yes. |
| An object appeared badly or not at all | It was not in the inputs: add its photo to `objects`, or rewrite the step without it. |
| Room or outfit drifts between step takes | Same Setting and Wardrobe words in every brief, word for word; or film one take instead. |
| `export_video` is refused | `ready_to_export` is false: wait for the captions, clear the `warnings`, try again. |

Three paid attempts at the same thing: stop and offer to keep the best take, change the idea,
or try another tool.

## Show the result

```
**Glow C serum in 4 steps**: a 20 s tutorial, Mia at her bathroom sink, every step labeled, captions on.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Post it: I'll write the caption and hashtags in your brand's voice and put it in the review queue.
2. Make a cover with the title "Glow C serum in 4 steps".
3. Film the next tutorial in the series with the same look.
```

- `export.url` is the MP4 and expires; `studio_url` (from `get_video`) is the project, where
  labels can be dragged and words changed. Give both.
- Credits used: the sum of `credits_charged` across the takes, the captions and the export.
  Balance: `get_credit_balance`.

## Next steps to offer

Pick the 2 or 3 that fit:

- **Post it.** `create_post` with `export.asset_id`, a caption and hashtags from `brand_voice`
  (the call to action goes here), and `made_with_ai: true`. It lands in the review queue;
  `publish_post` only on an explicit yes naming the post, the accounts and the time
  (`creatorline-publish`).
- **A cover** with the title words: `creatorline-cover-image`.
- **A series.** The next product or the next routine, same labels, same look, same avatar:
  plan a week of them with `creatorline-content-calendar`.
- **One step as its own tip.** The most useful step as a 10 s talking clip:
  `creatorline-talking-video`.
- **Versions.** Another hook or another avatar on the same tutorial: `creatorline-ad-variations`.

## References

- [steps-and-script.md](references/steps-and-script.md): where steps come from, how products
  are used by hand, labels, lines, hooks, timing, the briefs, a worked example.
- [assembly.md](references/assembly.md): Video Studio operations for both builds, timing the
  labels from the captions, preview, export, swapping one step.
- [house-rules.md](references/house-rules.md): the session, consent, waiting, results, safety.
- [asking.md](references/asking.md): one intake message, options, who wins.
- [video-briefs.md](references/video-briefs.md): how the server's writer reads a brief,
  templates, speech budget, the claim floor.
- [product-intake.md](references/product-intake.md): getting the product photo in, the
  product card, claims, logos.
