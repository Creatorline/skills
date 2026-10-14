# Direction recipes

The Direction is the `prompt` of a Reshoot run. It is optional, short, and read twice: by the
planner (which moments the cut keeps, how lines are rewritten for a new product) and by the
video model (the intent of the reshoot, next to the storyboard).

## Contents

1. [What it can and cannot do](#1-what-it-can-and-cannot-do)
2. [Rules](#2-rules)
3. [Recipes](#3-recipes)
4. [Weak and strong](#4-weak-and-strong)

## 1. What it can and cannot do

| It can | It cannot |
|---|---|
| Keep a moment in the cut | Change the words without a product photo |
| Say what the product photo replaces | Open a link (a URL in it is never read) |
| Say where an app recording or footage appears | Change the frame shape or the length (`duration` does) |
| Set the claims and the tone of rewritten lines | Reliably change the avatar's clothes |
| Ask for a short middle so the hook and the payoff fit | Add a second person or replace one |

Empty is valid and often best: the same video, with the avatar in the lead.

## 2. Rules

- One to four plain sentences. Lines to be spoken are not written here: the planner
  rewrites them from the source, and only when a product photo is attached.
- Name each attachment by what it is ("the product photo", "the app recording"), and say what
  it is for. Required whenever `objects` or `source_video` is attached.
- Say what should be there, never what should not ("label to camera", not "don't hide the
  label").
- Facts in words: the product's name and the claims allowed. Never a link.
- Leave out camera, lens and light (the plan copies the video's own), the avatar's looks (from
  the avatar), and the old product's brand.
- Claims: only what the label prints or the person approved (product-intake section 4). The
  avatar has no past, so when the source tells a personal result, say what the new lines say
  instead (see the recipe below).
- On a retry, change one thing.

## 3. Recipes

**Plain reshoot.** Leave `prompt` out.

**Keep a moment the cut might drop.**

```
Keep the moment she opens the box and her reaction at the very end.
```

**Their product in place of the video's.** With the product photo in `objects`:

```
The product photo replaces the energy drink can she holds. Keep every moment she drinks
from it and the close-up of the can at the end.
```

**Their product, with the claims set.** For skincare, supplements, food or anything with
claims:

```
The product photo replaces the face cream jar in her hands. New lines say what it is and how
she uses it, and say only what the label says: fragrance free, for dry skin.
```

**A source that tells a personal result.** The creator says "it cleared my skin in a week":
left alone, the rewrite would have the avatar say the same about the new product.

```
The product photo replaces the serum she holds. New lines describe what the serum is and how
she uses it, in the present tense, and say only what the label says: fragrance free.
```

**Keep the delivery of the rewritten lines.**

```
The product photo replaces the protein bar. Keep her dry, deadpan delivery in the new lines
and the joke in the last line.
```

**An app or website shown in the video.** With a screen recording in `source_video`:

```
The app screen recording plays on the phone she holds up to the camera in the last shot,
where the original shows her own screen.
```

**Product footage as a cutaway.** With the clip in `source_video`:

```
Use the product footage as the close-up where the original cuts to her hands pouring.
```

**A tighter cut from a long source.** With `duration` set lower:

```
Keep the hook and the reveal at the end; the middle can be short.
```

## 4. Weak and strong

**Weak:**

```
Make it cinematic and viral, use my serum from https://shop.example/serum, she should wear a
red dress, no logos, and make her say it changed her skin.
```

- "Cinematic" fights the phone camera the plan copies; "viral" says nothing.
- The link is never opened, and there is no product photo, so no product is swapped in.
- The dress is unreliable in Reshoot; "no logos" invites one.
- "It changed her skin" is a personal result: the avatar has none to tell.

**Strong**, with the serum photo in `objects` and `change_voice: true` (the avatar has a voice):

```
The product photo replaces the serum bottle she holds. Keep the moment she puts two drops on
her hand and the final close-up with the bottle. New lines say only what the label says:
15% vitamin C, for dull skin.
```
