# Directions and who is who

How to steer a swap: Transfer's optional direction, Replace's three levers, and the casting of
two avatars.

## Contents

1. [What Transfer does with no direction](#1-what-transfer-does-with-no-direction)
2. [When to write a direction](#2-when-to-write-a-direction)
3. [How to write it](#3-how-to-write-it)
4. [Weak and strong](#4-weak-and-strong)
5. [Replace: no direction, three levers](#5-replace-no-direction-three-levers)
6. [Two avatars, step by step](#6-two-avatars-step-by-step)

## 1. What Transfer does with no direction

Before filming, our server watches the clip and the avatar images and writes the instructions
the swap is filmed from. By default it:

- picks the main performer (the biggest, most central person doing the main action) and puts
  the first avatar in their place, with the avatar's face, hair, skin tone and build;
- puts a second avatar, when there is one, in place of the next most prominent person;
- dresses the avatar in the performer's outfit, garment by garment;
- keeps everything else: each move, gesture and expression, the camera, the cuts, the
  setting, the other people, the light, the sound.

That is what most people want. Leave `prompt` empty unless section 2 applies.

## 2. When to write a direction

| The person wants | Direction (the `prompt`) |
|---|---|
| Who is who made explicit (two people, or a target who is not the most prominent) | `@Avatar1 replaces the woman in the red jacket on the left.` |
| The avatar in the clothes of its own photo | `@Avatar1 wears the outfit from her own photo.` (or use Replace) |
| One garment changed | `@Avatar1 wears the jacket in @Object1; the rest of the outfit stays as in the video.` |
| A new place | `@Object1 is the new setting; keep the camera and every move.` |
| A product swapped in | `@Object2 is our bottle: it replaces the cup she drinks from.` |
| A detail that must stay | `Keep the neon sign behind her exactly as in @Video1.` |

The direction wins over the defaults, so write only what should differ from them.

## 3. How to write it

- One to three short sentences.
- Name the inputs by their @-names: `@Video1` the source, `@Avatar1` the first avatar (the
  main person), `@Avatar2` the second avatar, `@Object1`, `@Object2`... the `other_elements`
  images in the order you passed them.
- Name performers by role, place and clothes ("the man in the grey hoodie on the right"),
  never by their face, their body or a real name.
- Give every `other_elements` image a role. An image with no role gets a guessed one.
- Say what is there, not what is not: "a plain grey t-shirt", not "no logo".
- The person's own language is fine: the server reads any language.
- Never ask for what the clip decides: new moves, a new camera, other spoken words, another
  length, a polished film look. Those need Reshoot or a new video.
- Never describe the avatar's face: its image carries it.

## 4. Weak and strong

Weak:

> Make it cinematic, she should spin at the end and say our brand name, and no logo on the
> shirt.

The swap cannot add a spin, new words or a new look, and "no logo" puts a logo in mind.

Strong, two avatars and a product in `other_elements`:

> @Avatar1 replaces the woman in the red jacket on the left and @Avatar2 the man in the grey
> hoodie. @Object1 is our cold brew can: it replaces the cup the woman holds.

Strong, one avatar in its own look:

> @Avatar1 wears the outfit from her own photo; everything else stays as in the video.

## 5. Replace: no direction, three levers

Replace films from a fixed set of instructions, filled in with notes on the images: the
avatar's face first, then its body and clothes, the video kept as it is. It reads no `prompt`
(and a Video Studio swap in `replace` mode refuses one). Steer it with:

1. **Order.** The first avatar takes the main person, the second the other one. To flip who
   replaces whom, swap the avatar in `avatar_id` with the one in `character`.
2. **The avatar's image.** Its clothes come along. A waist-up image brings only the top; what
   it does not show (trousers, shoes) stays as the performer wore it in the video. When the
   whole outfit should change, add an Outfit image that shows it top to shoes.
3. **The Outfit image** (`inputs.outfit`, worn by the main avatar only).
   - Clothes only: its face, pose and background are ignored. A flat lay, a mannequin, a
     product shot or anyone wearing it works.
   - Show every piece that should change; what it does not show stays as filmed.
   - Text and graphics on it are ignored, and that can include a print on the garment: a plain
     garment carries over most faithfully. Check printed logos in the result.
   - A garment photo with a big logo: warn once (product-intake.md, section 5).

## 6. Two avatars, step by step

1. Look at the cover (`preview_assets`). Name both people by role, place and clothes.
2. The main person is the bigger, more central one doing the main action. When the cover
   cannot tell, ask in the intake message, with your guess as the recommended option.
3. The avatar for the main person goes in `avatar_id` (or is the brand's default). For the
   other one: `get_avatar` for its `image_url`, `import_asset` with that link, and the
   returned id as the ONE entry in `inputs.character`.
4. Put the casting in the price message: "Mia takes the woman in red on the left, Jack the man
   in the grey hoodie."
5. Transfer: write the same casting in the direction. Replace: the order is all there is.
6. Two avatars need `create_generation`: a Video Studio swap takes one avatar only.
7. No re-voice on a two-avatar swap: one voice cannot speak for two people.
8. A recurring pair (a skit series) keeps the same two avatars in the same order in every
   episode, so the audience knows who is who.
