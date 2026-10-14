# Steps and script

How to turn "show how to use it" into steps a viewer can copy, labels that read at a glance,
lines that fit the seconds, and a brief the server's writer can film. The general brief rules
are in video-briefs.md; this file adds what a tutorial needs on top.

## Contents

1. [Where the steps come from](#1-where-the-steps-come-from)
2. [Good steps](#2-good-steps)
3. [How products are used by hand](#3-how-products-are-used-by-hand)
4. [Where it goes on the body](#4-where-it-goes-on-the-body)
5. [Keeping the state straight](#5-keeping-the-state-straight)
6. [Objects and props](#6-objects-and-props)
7. [The labels](#7-the-labels)
8. [The spoken lines](#8-the-spoken-lines)
9. [Hook and ending](#9-hook-and-ending)
10. [Timing](#10-timing)
11. [The brief: one take](#11-the-brief-one-take)
12. [The brief: step takes](#12-the-brief-step-takes)
13. [Settings by category](#13-settings-by-category)
14. [Worked example](#14-worked-example)

## 1. Where the steps come from

Trust these in order:

1. **The person's own steps or script.** Keep their order and their words. Change only what
   cannot be filmed or breaks the claim floor, and say what you changed.
2. **The label, the printed instructions or the product page.** Read what you can reach. Put
   the page URL in the brief too: the writer reads it for facts.
3. **How the category is really used** (section 3).

Never invent a step the product cannot do, and never a feature the photo, the label or the
page does not show. When you cannot tell how it opens or works (a machine, a device, a kit
with several parts), ask for the steps in the one intake message.

## 2. Good steps

- **3 to 5 steps.** Only two real ones: open with a true preparation step (start on dry
  skin, shake the bottle, rinse the cup) or close on the finished result. Six or more: fold
  small actions that sit next to each other into one step.
- **One visible action per step**, with one product interaction: one press, one scoop, one
  swipe, one pour. A small gesture beside it is fine; a second action is not.
- **A state can change across a cut.** Closing a bottle, setting a tool down or a pan heating
  up can happen between two steps; the next step starts in the new state.
- **Every step changes something the camera sees.** A step that only talks is not a step.
- **In the order the product is used.**
- **The proof step gets more time.** The step where the product visibly works (the foam
  rising, the drops landing, the machine pouring) gets a second more than the others.
- **Waiting is said, not shown.** "Leave it for ten minutes" becomes a line over the next
  action, never a shot of someone waiting.

## 3. How products are used by hand

Write the hands' sequence into each step's action. One row's sequence may spread over two
steps; never pack two rows into one step.

| Product | What the hands do |
|---|---|
| Dropper bottle | Unscrew the top; the dropper comes up with it. Squeeze the bulb once. Drops land on the fingertips. Press into the skin. |
| Pump bottle | Lift the cap off if there is one. One press down into the palm. |
| Jar | Twist the lid off and set it down. One fingertip scoops. Smooth it on. |
| Squeeze tube | Flip the cap open. Squeeze a short line onto one fingertip. |
| Spray or mist | Lift the cap straight off. One press, aimed at the target. |
| Lipstick or balm stick | Pull the cap off. Twist the base up. One swipe. |
| Wand (mascara, gloss) | Unscrew. Draw the wand out slowly. One sweep. |
| Compact or palette | Open the hinged lid; it stays attached. Tap the brush. One sweep. |
| Sheet mask or sachet | Tear at the notch. Unfold. Lay it on and smooth it flat. |
| Powder with a scoop | Open the lid. One level scoop. Tip it into the glass or shaker. |
| Can or bottled drink | Open it in one motion. One sip. |
| Kitchen appliance | Set it on the counter (two hands when heavy). Load it. Press one button. Show what comes out. |
| Gadget or device | Hold it. Point to the part that matters. Press one button. Leave out cables and small connectors: they draw badly. |
| Scarf, belt, laces | One fold, loop or pull per step, both hands, slow. |

Weight: a heavy item (an appliance, a big bottle) is lifted with both hands and a little
effort; a light one with one relaxed hand; a tiny one is pinched between two fingers near the
camera. A pair (earrings, two shoes) is one per hand, never both balanced on one palm.

## 4. Where it goes on the body

| Product | Goes on |
|---|---|
| Fragrance | The inside of the wrist or the side of the neck |
| Serum, cream, lotion | The fingertips first, then the cheeks and forehead, pressed or smoothed |
| Lipstick, balm, gloss | The lips |
| Blush, bronzer, highlighter | The cheekbones, with a brush |
| Mascara | The lashes |
| Eyeliner | The lash line |
| Hair oil, cream, spray | The mid-lengths to the ends |
| Food and drink | The mouth: one bite or one sip |

If the person names a wrong spot (perfume on the palm), use the right one in the brief and say
so in one line.

## 5. Keeping the state straight

- The cap comes off as its own action before anything comes out. Once off, it stays off, set
  on the counter, until a step puts it back or the next step opens with it closed (a change
  across a cut).
- An opened product is never shown with its factory seal again.
- Write each step's starting state into its action: "the bottle already open in the left
  hand, the cap on the counter".
- One hero product in the frame. No look-alikes and no second bottle of it.
- When both hands are busy, say which hand holds what. The phone is propped, so both hands are
  free.
- No repeat-motion words in an action: again, keeps, repeatedly, back and forth, over and
  over. They read as a loop. A quantity belongs in the line ("two drops") while the action
  shows one squeeze.
- No fingers held up to count the steps. The labels count.
- No mirror in the setting. The avatar looks into the phone as if it were the mirror.
- The product keeps the size the product card gives it against a hand. To make the label
  readable, bring the camera closer; never grow the product.

## 6. Objects and props

The server's writer puts in the frame only what the inputs show. A cup, a towel, a brush or a
shaker that a step needs must come in as a photo:

- in `objects`, after the product. Say in the brief what each one is for: "@Object2 is the
  glass the powder goes into".
- or in `location`: a photo of the place where the object already stands.

No photo of it:

- build the step around the product and the hands only (the usual answer); or
- offer to make a plain photo of the object with `create_generation`, tool `text-to-photo`,
  nothing branded on it. It is one more paid run in the same batch: price the photo with
  `create_generation` without `confirm`, and the video that will use it with
  `estimate_generation_cost` (same `tool` and `params`; the photo does not exist yet). One
  yes covers both. Make the photo first and put its `asset_id` in `objects`. Then call
  `create_generation` for the video without `confirm` once more: the same price, start it;
  a different one, ask.

A garment the avatar only wears (an apron) is wardrobe: write it in a Wardrobe line. A garment
that is the product being shown (the scarf being tied) is a product: its photo goes in
`objects`, and the brief says the avatar wears it. Never another brand's product or logo as a
prop.

## 7. The labels

- **Format:** `Step 1: Heading`. A colon after the number, never a dash. For alternatives
  ("3 ways to tie a scarf"): `Way 1: Heading`.
- **Heading:** 1 to 3 words, a verb or the amount first: "Shake well", "Two drops", "Pat in",
  "Press start", "Loop and pull".
- **Names what to do, never a result or a claim:** "Pat in", not "Instant glow".
- **One line:** at most 26 characters for the whole label at size `m`. Shorten the heading
  rather than wrap it.
- **The spoken language:** "Adım 2: İki damla", "Paso 2: Dos gotas".
- **The same look and size on every label.**
- **Title:** what the viewer learns, at most two short lines at size `l` (about 20 characters
  a line): "Glow C serum\nin 4 steps". No claim in it.
- **End text:** the brand's `call_to_action` from `brand_voice` when it fits in 26 characters,
  else "Save this for later".
- Words that must be exact (a product name, an amount) go in labels and captions, never in the
  generated picture.

## 8. The spoken lines

- **You write them**, one per step, and pass them quoted with "say these lines as written, in
  this order". The person reads them in the plan, and the captions later find each step by
  its first word.
- **Each step's line opens with its own order word**, all different: First, Then, Next, Last.
  Five steps: First, Then, Next, After that, Last. In another language, that language's own
  order words. Keep those words out of every other line (the hook, the verdict, the middle of
  a step's line): a stray "then" makes a label jump early.
- **Calm and clear**, like showing a friend across the counter: the instruction plus one
  specific (how much, how long, where, which finger). "Then two drops on your fingertips,
  not your palm."
- **Word budget while the hands work:** 3 s holds 7 to 9 words, 4 s 9 to 12, 5 s 12 to 16.
  Too few leaves silence; too many gets rushed.
- **Amounts and times only from the label or the instructions.** No results, no history, no
  "I've used this for months" (the claim floor in house-rules.md).
- Contractions and short sentences. No filler ("literally", "game changer").

## 9. Hook and ending

The hook is the first 3 s: already in motion, no greeting, no intro. Hooks that work for a
how-to:

| Kind | What it looks and sounds like |
|---|---|
| The result first | The finished latte held up to camera: "Café foam from a jar and a whisk. Here's how." |
| The step people skip | "The second step is the one everyone skips." |
| Count and time | "Four steps, about a minute." Only when it is true. |
| The problem | "Serum just sitting on your skin? Put it on in this order." |

Open by naming the count when the video is over 20 s ("four steps"), so the viewer knows how
long the road is.

The ending is the last 2 to 3 s: the result on camera, chest-up, and a calm verdict on what was
shown. "That's the whole routine, start to finish." No new claim, no spoken call to action:
the end text and the post caption carry it.

## 10. Timing

**One take.** Plan one shot per step; every shot needs 3 s or more.

| Steps | Length | Hook | Each step | Ending | Words in all |
|---|---|---|---|---|---|
| 3 | 15 s | 3 s | 3 s | 3 s | 30 to 40 |
| 4 | 20 s | 3 s | 3.5 s | 3 s | 45 to 55 |
| 5 | 26 s | 3 s | 4 s | 3 s | 55 to 65 |

- Up to 30 s fits one take. Over 20 s the writer builds the video in short sections joined
  by a spoken hand-off; your quoted lines keep the order words in place.
- The writer lands each cut near the planned second, not on it. That is why the labels follow
  the captions, not the plan.

**Step takes.** Each take is whole seconds and at least 4 s.

| Take | Length | Holds |
|---|---|---|
| Hook | 4 s | The finished result and the hook line |
| Each step | 4 to 5 s | One step and its line |
| Last step | 5 to 6 s | The last step, then the verdict |

## 11. The brief: one take

Plain sentences in this order, in English; the quoted lines in the spoken language.

```
Idea: A step-by-step how-to. @Avatar1 shows how to <goal> with <product> (@Object1) in <N> steps at <place>. Each step is one clear hand action the viewer can copy.
Hook: <what the first 3 s show>. Line: "<hook line>"
Steps, in order, one shot each:
1. <the action, which hand, the state it starts in>. Line: "First, ..."
2. <...>. Line: "Then, ..."
3. <...>. Line: "Next, ..."
4. <...>. Line: "Last, ..."
Ending: <the result on camera, chest-up>. Line: "<verdict>"
Lines: say the quoted lines as written, in this order.
Product: <the product card from product-intake.md>. Page: <url, when there is one>
Other objects: <@Object2 is ..., only when given>
Setting: <place, light>, the phone propped at chest height so both hands are free.
Wardrobe: <only when it matters>
Language: <spoken language>
Sound: voice and room sound only. The picture stays clean: step labels and captions are added in the edit.
```

`params`: `ugc_style: "Auto"`, `duration` from section 10, `aspect_ratio: "9:16"`,
`resolution: "720p"`. `1080p` only when the person asks for sharper; it costs about 2.5 times
as much.

## 12. The brief: step takes

Every take is a fresh render. Only the words hold the room and the clothes together, so the
Product, Setting and Wardrobe lines are the same in every take, word for word. Open every take
on the avatar's face with the product in frame, then go to the hands: a take that is only
hands loses the face and the outfit first.

```
Idea: Step <k> of <N> of a how-to for <product> (@Object1). @Avatar1, chest-up with @Object1 in frame, then <the action, which hand>. It continues from the step before: <the state at the start>.
Line: "<the step's line>" Say it as written.
Product: <the same product card>
Setting: <the same words in every take>
Wardrobe: <the same words in every take>
Ending: the action finished, <the state it ends in>.
Language: <spoken language>
Sound: voice and room sound only. The picture stays clean: step labels and captions are added in the edit.
```

- The hook take: "Idea: The opening of a how-to for <product>. @Avatar1 holds <the finished
  result> to the camera." plus the hook line.
- The last take adds the verdict after the last step's line.
- `duration` per take from section 10; the other `params` as in section 11.

## 13. Settings by category

| Category | Setting |
|---|---|
| Skincare, makeup, hair | A bright bathroom by the sink, morning daylight |
| Food, drinks, kitchen tools | A clean kitchen counter, daylight from a window |
| Fitness, supplements | A living-room floor or a home-gym corner, daylight |
| Tech, gadgets, home goods | A desk or a living-room table, daylight |
| Fashion techniques (tying, folding) | A bedroom against a plain wall, daylight |
| Cleaning products | The surface being cleaned, daylight |

Always: the phone propped at chest height, no mirror in the frame, available light. Never a
studio set or film words (video-briefs.md, section 5).

## 14. Worked example

The ask: "Show how to use our Glow C serum, step by step." Mia is the default avatar; the serum
photo is in the library.

Plan: 4 steps, 20 s, one take, `ugc_style: "Auto"`, the serum photo in `objects`.

```
Idea: A step-by-step how-to. @Avatar1 shows how to put on Glow C Serum (@Object1) in 4 steps at her bathroom sink. Each step is one clear hand action the viewer can copy.
Hook: @Avatar1 faces the camera, the serum already in her right hand, label to camera. Line: "Here's the order to put your serum on. Four steps."
Steps, in order, one shot each:
1. Her face bare and dry, she unscrews the dropper top from the bottle in her right hand. Line: "First, start with clean skin that's completely dry."
2. The dropper already out, she squeezes the bulb once and drops land on the fingertips of her left hand. Line: "Then two drops on your fingertips, not your palm."
3. The closed bottle stands on the counter; she presses her fingertips into her cheeks and forehead. Line: "Next, press it into your cheeks and forehead, gently."
4. She picks the bottle up from the counter and holds it beside her face, label to camera. Line: "Last, give it a minute before your moisturizer."
Ending: @Avatar1 chest-up, the bottle beside her face, a calm smile. Line: "That's the whole routine, start to finish."
Lines: say the quoted lines as written, in this order.
Product: Glow C Serum. A vitamin C face serum in an amber glass dropper bottle that fits in one palm, white label on the front. Opens with a screw-top dropper.
Setting: a bright bathroom sink in morning daylight, the phone propped at chest height so both hands are free.
Language: English.
Sound: voice and room sound only. The picture stays clean: step labels and captions are added in the edit.
```

Labels: `Step 1: Dry skin`, `Step 2: Two drops`, `Step 3: Press in`, `Step 4: Let it settle`.
Title: `Glow C serum\nin 4 steps`. End text: "Save this for later". Look: skincare reads calm,
so `tiktokTranslucent` labels and `minimal` captions (assembly.md, section 3).
