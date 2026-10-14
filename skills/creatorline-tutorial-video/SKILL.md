---
name: creatorline-tutorial-video
description: "Makes a step-by-step how-to video with the brand's AI avatar: four real steps of using a product or technique per 15 seconds, each labeled on screen. Use for tutorials, how to use it, routines, recipes, step by step. Not for reviews: use creatorline-talking-video. Not for app or website walkthroughs: use creatorline-app-promo-video."
license: MIT
metadata:
  author: creatorline
  version: "2.0"
---

# Tutorial video

You make a short vertical how-to: the brand's avatar shows the real steps of using a product
(or doing a technique), four steps for every 15 seconds, each labeled on screen
("Step 2 – Two Drops"), exported and ready to post. The promise to the person: one short
exchange, a script they can read and change before anything is spent, and a finished video
they can post or open in Creatorline and adjust. The avatar keeps the same face and persona in
every tutorial, so a brand can run a recognizable how-to series.

Follow [house-rules.md](references/house-rules.md) for the session, consent before spending,
waiting, showing results, safety and refusals. Ask the way [asking.md](references/asking.md)
says.

## When to use

The ask is a how-to, a tutorial or step by step, and the avatar is on camera doing it:

- "Show how to use our serum", "a how-to for the blender", "a tutorial", "step by step".
- A routine with a product: morning skincare, a hair routine, a coffee ritual.
- A recipe or a technique in steps: "how to make whipped coffee", "3 ways to tie a scarf".

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
| Length | Asked when not given | Options: 15 s with 4 steps (recommended), 10 s with 3, 30 s with 8, 45 s with 12 |
| The steps | Only when the use cannot be read off the photo, the label or the page (a machine, a device, a kit) | You draft them from the instructions, the label or the page; the person reads them in the plan |
| Extra text on the video | Asked last when not given | None: the step labels and the end text only. Other options: captions, a hook line, both |
| What the viewer learns | Only when the ask does not say | "How to use <product>" |
| Avatar | No | The brand's default avatar |
| Template (`ugc_style`) | No | `Auto` |
| Setting | No | From the category ([steps-and-script.md](references/steps-and-script.md), section 6) |
| Wardrobe | No | Stated in every brief, the same in every shot |
| Spoken language | No | The brand's `language` |
| Step labels | No | `Step 1 – Heading` on the top row, Title Case, size `m`, the look that fits the category ([assembly.md](references/assembly.md), section 3) |
| End text | No | The brand's call to action, else "Link in bio" when there is a product link, else "Save this for later" |
| Frame and sharpness | No | `9:16`, `720p` |

Never ask about the model, the frame, the resolution, the sound, takes or transitions. Offer
an accent or a quirk only when the ask already mentions one.

**How detailed the ask is** decides how much you write
([steps-and-script.md](references/steps-and-script.md), section 1): 1 to 5 words or a product
name, you work out the steps; 1 to 3 sentences, keep their tone and build the rest; 4 or more
sentences or a step list, map it one to one in their order, changing only what is unsafe or
cannot be filmed, and say which.

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
   Write the product card once, with the tutorial's additions
   ([hands-and-props.md](references/hands-and-props.md), section 10). No product (a
   technique): skip this step.
4. **Intake, only if needed.** One message, at most 3 questions, numbered options with the
   recommended one first (asking.md). Ask only the gaps: the product photo, the length, the
   steps when the use cannot be read, and last, the extra text. With four gaps, drop the extra
   text question and state its default. End with one line of defaults. For example:

   > Three quick things before I write the steps:
   > 1. The kettle: send a link to a photo of it, or tell me its name if it is already in your
   >    Creatorline library.
   > 2. Length: 1) 15 s, 4 steps (recommended) 2) 10 s, 3 steps 3) 30 s, 8 steps 4) 45 s, 12 steps
   > 3. Text on the video besides the step labels: 1) None (recommended) 2) Captions 3) A hook
   >    line at the top 4) Both
   >
   > Defaults: Mia, steps from your product page, in her kitchen, English. Say if you want any
   > changed.

5. **Plan the steps and write the script**
   ([steps-and-script.md](references/steps-and-script.md)): the steps in the order the
   product is really used, in sets of four, one label and one quoted line per step, each line
   after the first with its own cue word, the opening and the closing tail.
6. **Pick the build.**

   | Build | When | Labels are timed by |
   |---|---|---|
   | One take (default) | Every length offered, steps in one place | The captions: each step's cue word |
   | Step takes | A step happens in another place, or the person wants each step filmed on its own | Each step's own clip (`over`) |

   45 s is still one call: the server joins takes, and each join can shift the face a little.
   Step takes are fresh renders each: the room, the outfit and the voice can shift between
   them. Prefer one take.
7. **Write the brief** for each take ([steps-and-script.md](references/steps-and-script.md),
   sections 11 and 12, on top of [video-briefs.md](references/video-briefs.md)) and run the
   check in section 13 there, claims included.
8. **Price the whole video at once.** For each take, call `create_generation` WITHOUT
   `confirm`:

   ```
   create_generation {
     tool: "ugc-video",
     brand_id: <brand>,
     avatar_id: <only for an avatar other than the brand's default>,
     prompt: <the brief>,
     inputs: { objects: [<product asset id>, <other object photos>] },
     params: { ugc_style: "Auto", duration: 15, aspect_ratio: "9:16", resolution: "720p" }
   }
   ```

   Each answer is `needs_approval` with `credits`, `credit_balance` and `sufficient`. A run
   whose input does not exist yet (a take that needs an object photo still to be made) is
   priced with `estimate_generation_cost` (same `tool`, `params` and the `inputs` you have;
   it takes no brand, avatar or prompt). Add `credits.captions` (always: the captions time the
   labels) and `credits.export` from the guide. Then one message: the title, the numbered
   steps (label and line), the length, the avatar, the setting, the extra text, and the total
   against the balance (example below). `sufficient: false`: say what is missing and offer a
   shorter version (10 s, 3 steps); house-rules.md, section 2. The person changes a step or a
   line: rewrite the brief and quote again before anything starts.
9. **Film.** On yes, call `create_generation` again for each take with the same arguments
   plus `confirm: true`. Step takes: start all of them; extra ones wait for a free slot on
   their own. Then `get_generation` with `generation_id` and `wait_seconds: 45` until `status`
   is `succeeded` or `failed`. Between calls, one short line: "Filming the four steps now,
   about two to four minutes." Keep each take's `output[0].asset_id`.
10. **Assemble in Video Studio** ([assembly.md](references/assembly.md)):
    1. `create_video` with `brand_id`, a `title` and the clips (step takes: the labels too,
       each `over` its step's clip).
    2. `write_captions` with `style: "hormozi"` and `position: "auto"`, without `confirm`. The
       price matches the quote: call again with `confirm: true` without asking again (the yes
       covered it). Different: ask. Say "Timing the steps." and read `get_video` about every
       20 s until `captions.status` is `ready`.
    3. The first line starts after 0.4 s: trim the take's start so speech begins at about
       0.3 s, then `write_captions` again (free).
    4. Time each label from `captions.lines` (assembly.md, section 6). One `edit_video` call
       adds the labels, the end text and the hook text if chosen, and removes the captions when
       the person chose None or Hook.
    5. `preview_video` at the middle of each text, with `show_safe_area: true`. With
       `exact: true`, also look at the middle of each step (assembly.md, section 8). Fix with
       `edit_video`, look again.
    6. `get_video`: `ready_to_export` is true and `warnings` is empty. `export_video` without
       `confirm`, then with `confirm: true` when the price matches. Say "Exporting the final
       video." and read `get_video` every 10 to 30 s until `export.status` is `done`.
11. **Show** the result (below) and **offer the next step**.

### The plan and price message

> Here is the tutorial. Change any step or line before I film it.
>
> **Glow C serum in 4 steps** (15 s, Mia at her bathroom sink, one take, labels only)
> - Step 1 – Dry Skin: "Start on skin that's completely dry."
> - Step 2 – Lift the Dropper: "Then lift the dropper straight out."
> - Step 3 – Two Drops: "Next, two drops on your fingertips, not your palm."
> - Step 4 – Press In: "Last, press it in. Don't rub." She points down at "Link in bio".
>
> The video, the captions pass that times the labels, and the export: <N> credits; you have
> <M>. Go ahead?

## Craft

The know-how lives in [steps-and-script.md](references/steps-and-script.md) and
[hands-and-props.md](references/hands-and-props.md). The rules that decide most results:

- **Sets of four.** Four steps for every 15 s (3 in a 10 s video, because a shot under 3 s gets
  merged). In each set: setup, the core action, the use up close, the result. The product's
  real order wins over those jobs. A person's own step list keeps its count.
- **Step 1 is the hook.** Its label is up from the first frame and the avatar is already
  mid-action, the first word within 0.4 s. A friction line ("most people use too much of
  this") or the persona's own story ("I almost returned this") beats excitement.
- **The face anchors.** Step 1 shows the face and torso with the product in frame; the last
  step shows the face again; in longer videos so does the first step of every set of four.
- **The camera changes with every step.** Propped medium, propped medium close-up, propped
  close on the hands, then an arm's-length selfie; one-handed steps may be selfies. No two
  neighbouring steps at the same distance.
- **Real hands.** One product interaction per step. The cap comes off as its own action and is
  gone for good; an opened product is never closed again. Cause before effect. The right place
  on the body (fragrance on the wrist or neck, never the palm). The real size and weight. No
  repeat-motion words in an action.
- **Objects.** The server's writer only shows objects the inputs show. A cup, a towel or a
  brush the steps need comes in as a photo in `objects` (or a `location` photo where it
  stands). No photo: build the step around the product and the hands, or offer to make a plain
  photo of the object with `text-to-photo` (priced in the batch).
- **Labels.** `Step 1 – Heading`: Title Case, 1 to 4 words that say what to do, never a
  result; one line at size `m` where possible, and when one label needs two lines, all break
  after the dash. In the spoken language. One look for every label, chosen by category.
- **Lines.** You write them, quoted, with "say these lines as written". About 2 words a
  second, with a quiet closed-mouth beat in each step; short of room, cut words, never a step.
  Calm and specific: how much, how long, where, from the label or the instructions, so the
  viewer copies it right. The persona's own history and results with it are welcome ("I've
  done it this way for months"; steps-and-script.md, section 8).
- **The ending.** The last step's final second: chest-up, a quick point down toward the bottom
  of the frame, and the call to action as end text there. Never a spoken call to action (our
  writer turns one into a verdict), never two.
- **Wardrobe and setting.** Always a Wardrobe line that says the outfit stays the same. A real
  room that fits the product, neutral daylight, the phone propped at chest height, no mirror.
- **Template.** `Auto` for every tutorial: the brief already says it is a how-to. `GRWM` only
  when the person asks for a get-ready-with-me routine. Avoid `Talking head` (it pushes in on
  the face each sentence and the hands leave the frame) and `Cinematic` unless they ask for a
  polished look.

## Check before you show it

- Every promised step is said, in order: you found each cue word in `captions.lines` (before
  any removal).
- One label per step, numbered in order across the whole video, same look, size and wrap, shown
  while its step plays. One text on the top row at a time.
- With `exact: true` frames: each step shows its own physical action, one product, at most two
  hands, a consistent cap and state, the same product size, a clean face and mouth, and no text
  in the picture but the product's label. With `exact: false`: say you judged layout and words
  only and ask the person to watch it.
- Captions, when kept, sit at the bottom, match the script, spell the product right and show
  numbers as digits.
- The right avatar and the right product, its label toward the camera.
- The claims pass (steps-and-script.md, section 10): the step amounts match the label or the
  instructions; when the person gave an approved list, every claim in the labels, lines and
  texts is on it word for word.
- `warnings` is empty and the length is within a second or two of the plan.

## If it goes wrong

| What happened | Fix |
|---|---|
| A take failed | It was refunded. Say what failed in plain words; change one thing; ask before filming again (house-rules.md, section 5). |
| The take was refused by moderation | Never send the same inputs again: the same inputs are refused the same way. Change the Wardrobe line to the most covered outfit (a fully buttoned shirt over a camisole, in colours that suit the room), say so, quote and ask. |
| The whole take is off (steps missing, wrong product) | Re-film it with one change, quoted first. Put it in the same video: `replace_clip`, then `update_clip` with `trim_end` at the new take's `source_duration`, then `write_captions` (free: captions are paid once per video) and re-time the labels (assembly.md, section 6). A new video pays for captions again. |
| One step came out wrong (wrong hand action, wrong order) | Re-film only that step as a 4 to 6 s take and swap it in (assembly.md, section 10). Quote it first. |
| The same step fails twice | Make a still of the avatar mid-step with `photo-edit` (the product in `other_elements`), then animate it with `photo-to-video` (one continuous take; the brief says only what moves) and swap it in. Quote both runs together. |
| A step was skipped or two were merged | Too many beats for the seconds: add 5 s or drop a step, at most one step per 3.5 to 4 s. |
| Lines rushed or cut off | Over the word budget: cut words from the lines (steps-and-script.md, section 8). |
| The cap is back on, or the product changed size between steps | The state or the size was not written into each step: add it to every action and re-film the step. |
| The voice differs between step takes | Offer to give every step clip the avatar's own voice: `run_video_ai` with `action: "change_voice"`, the clip's `clip_id` and the avatar's `voice_id` (from `get_avatar`), one call per clip, quoted together, before the captions (assembly.md, section 7). |
| A step's cue word is missing from the captions | Look for its heading words in the lines around it; still nothing, place that label between its neighbours and check it with `preview_video` (assembly.md, section 6). |
| A label shows over the wrong moment | `update_text` with new `start` / `end`, read from `captions.lines`. |
| A label crosses the face | No captions: move every label to `position: "bottom"`. With captions: every label to size `s`. |
| `captions.status` is `out_of_date` | The clips changed. `write_captions` again: free. |
| `captions.status` is `failed` | The captions credits came back. Call `write_captions` again: its price is the one already agreed, so it needs no new yes. Tell the person in one line. |
| The product looks different from the photo | A big printed logo garbles easily (product-intake.md, section 5). Keep exact words in labels and captions; retake with a cleaner photo only on a yes. |
| An object appeared badly or not at all | It was not in the inputs: add its photo to `objects`, or rewrite the step without it. |
| Room or outfit drifts between takes | Same Setting and Wardrobe words in every brief, word for word; or film one take instead. |
| `export_video` is refused | `ready_to_export` is false: wait for the captions, clear the `warnings`, try again. |

Three paid attempts at the same thing: stop and offer to keep the best take, change the idea,
or try another tool.

## Show the result

```
**Glow C serum in 4 steps**: a 15 s tutorial, Mia at her bathroom sink, every step labeled.
[Watch the video](<export.url>) · [Open in Creatorline](<studio_url>)
Used <N> credits. <M> left.

What next?
1. Post it: I'll write the caption, hashtags and a comment to pin, and put it in the review queue.
2. Make a cover with the title "Glow C serum in 4 steps".
3. Film the next tutorial in the series with the same look.
```

- `export.url` is the MP4 and expires; `studio_url` (from `get_video`) is the project, where
  labels can be dragged and words changed. Give both.
- Say the length in the first line. Credits used: the sum of `credits_charged` across the
  takes, the captions and the export. Balance: `get_credit_balance`.

## Next steps to offer

Pick the 2 or 3 that fit:

- **Post it.** Write the post package in the brand's voice (`brand_voice`): a caption with the
  call to action, 3 to 5 hashtags, a comment for the person to pin (the full step list works
  well), and, when the last frame leads back into the first, one line on why it loops. Then
  `create_post` with `export.asset_id`, the caption, the hashtags and `made_with_ai: true`. It
  lands in the review queue; `publish_post` only on an explicit yes naming the post, the
  accounts and the time (`creatorline-publish`). The pinned comment is for the person to post
  themselves.
- **A cover** with the title words: `creatorline-cover-image`.
- **A series.** The next product or the next routine, same labels, same look, same avatar:
  plan a week of them with `creatorline-content-calendar`.
- **One step as its own tip.** The most useful step as a 10 s talking clip:
  `creatorline-talking-video`.
- **Versions.** Another opener or another avatar on the same tutorial:
  `creatorline-ad-variations`.

## References

- [steps-and-script.md](references/steps-and-script.md): how detailed the ask is, where steps
  come from, how many, the camera per step, face and outfit, labels, lines, opening and ending,
  claims, the briefs, a worked example.
- [hands-and-props.md](references/hands-and-props.md): hands, how products are used by hand,
  where they go on the body, caps and state, size, weight, optional devices, the tutorial's
  product card.
- [assembly.md](references/assembly.md): Video Studio operations for both builds, the four
  extra-text choices, timing the labels from the captions, preview, export, swapping one step.
- [house-rules.md](references/house-rules.md): the session, consent, waiting, results, safety.
- [asking.md](references/asking.md): one intake message, options, who wins.
- [video-briefs.md](references/video-briefs.md): how the server's writer reads a brief,
  templates, speech budget, the persona.
- [product-intake.md](references/product-intake.md): getting the product photo in, the
  product card, claims, logos.
