# A new avatar, and a file from the person's machine

## Contents

1. Ask once
2. The persona
3. The photo
4. The character sheet
5. Create it
6. Refusals

A new avatar always starts from its **character sheet**: one picture with three photos side by
side (a chest-up close-up, the full body from the front, the full body from the back) on a plain
light grey background. It is what keeps the avatar's face, build, hair and clothes the same in
every photo and video made with it. The person's own photo is only the reference the sheet is
made from; it never becomes the avatar's picture by itself. `create_avatar` refuses anything
that is not a sheet.

An avatar can be a person or an animal (a pet, a mascot animal): for an animal, pass its
`species` ("Siamese cat", "borzoi").

## 1. Ask once

One message, with defaults: the avatar's name, a person or an animal (and which animal),
gender, age (a person 18 to 80, an animal 0 to 40), the brand it belongs to (the active one by
default), and where the look comes from:

1. **A photo they have** of the person or animal (the face clear, the body visible if possible).
2. **Generated options** like a ready-made look, or from a description (a person only).

A voice is optional: offer two or three from `list_voices` that fit, or none (runs then use the
brand's voice). Cloning a voice and a persona from named accounts are app-only
(https://app.creatorline.io/avatars/new).

## 2. The persona

The persona decides every script the avatar says, so settle it before creating the avatar. Ask
in the same message as section 1, or right after it. Draft each answer yourself from what you
already know (the brief, the bio, the account it will post on, the brand from `get_brand`), so
the person mostly confirms or corrects:

| Ask | Goes to `persona.` |
|---|---|
| Who is it, in two or three sentences (its bio, personality, story)? | `who`, and 2 to 4 words of it as `archetype` |
| Who does it talk to? | `audience` |
| How does it talk (a few words: dry, warm, hyped, deadpan)? | `tone` |
| What does it post about (3 to 5 topics)? | `content_angles` |
| What should viewers do (follow, comment, visit the link)? | `cta` |
| Anything it never says or does? | `donts` |

`format_notes` (how its videos are built: length, hooks, pacing) is optional; never name a fixed
place or set. Show the draft as a short list and ask "anything to change?". What they skip is
written for it to fit the rest. Anything else they said about it goes to `about`.

## 3. The photo

**A photo they have.**
- A link to the image file: `import_asset` with the `url` and the `brand_id`.
- A file on their machine, when `create_upload` is offered: `create_upload` with the file's
  name, MIME type and exact size in bytes (`wc -c < file`), then run the `curl` line it returns
  from the folder that holds the file (fix the path if needed; the link lasts 5 minutes), then
  `complete_upload` with the `asset_id`. A chat app has no `create_upload`: they drop the file at
  https://app.creatorline.io/assets and you find it with `list_assets`.
- Already in Creatorline: `list_assets` with `file_type: "image"`, then `preview_assets`.

**Check the face before the sheet.** The sheet copies the face from this photo, so look at it
first: open the file when it is on their machine, or `preview_assets` with its id. The face is
clear when it faces the camera or is turned at most three quarters, fills a fair part of the
frame, is sharp and well lit, and nothing covers it (dark sunglasses, a hand, a mask, hair, a
cap's shadow). For an animal, the same holds for its face.

When it is not clear, say so BEFORE anything is priced or made, in one line that names what is
wrong, and offer the ways on:

- "The face is not clear in this photo (it shows the back of the head / the side / it is too
  small / it is blurry / sunglasses cover the eyes). The sheet would have to invent the face."
- Options: another photo where the face shows; generated options from a description instead
  (a person only); or go ahead with this one, knowing the face is made up.

Go ahead only on their explicit yes, and say again in the sheet's price line that the face is
invented. A photo that shows only part of the body (chest up) is fine: say the sheet will
invent the rest (legs, shoes).

**Generated options** (no photo yet, a person only).
1. Optional: `list_avatar_templates` (narrow by `gender`), show the pictures, let them pick a
   look. Its `id` is the `template_id`.
2. `generate_avatar_faces` with `template_id` and/or `description` (plus `gender`, `age`,
   `traits`), `count` 2 by default, WITHOUT `confirm`: it answers with the price. Tell them the
   credits and the balance, and wait for a yes.
3. On the yes, the same call with `confirm: true`. It answers at once with `take_ids`.
4. `get_avatar_faces` with the `take_ids` and `wait_seconds: 45`, again until `done`
   (one to four minutes). Show every ready picture, numbered, and let them pick one. The picked
   take's id is the photo for the sheet.
5. None fits: change the description and ask again, with its price.

## 4. The character sheet

`generate_avatar_faces` with `photo_asset_id` (the photo's id, or the picked take's id),
`gender`, `species` for an animal, and `brand_id`, WITHOUT `confirm`: it answers with the price
(about 6 credits). Say what it is ("a character sheet of Miso: a close-up, the front and the
back, side by side"), the credits and the balance, and wait for a yes. Then the same call with
`confirm: true`, and `get_avatar_faces` with its `take_ids` and `wait_seconds: 45` until `done`.

Show the sheet and ask if it looks right: the same face, build, hair (or coat) and clothes as
the photo, three clean panels. If a panel is off, make another (with its price). Do not add a
`description` or `template_id`: the sheet is made from the photo alone.

The server sends the sheet's prompt word for word. Never make the sheet with
`generate_photo_edit` instead: that tool rewrites its prompt, and its pictures are not sheets
`create_avatar` accepts. For reference, a man's sheet is asked for like this (a woman's says
"woman" and "her", an animal's names it and keeps its coat and markings):

> Character reference sheet of the man in the first reference image: three photos placed
> directly side by side, filling the whole image edge to edge, separated only by a narrow plain
> white gap. No frames, no borders, no outer margin, no mat or card around the panels.
>
> Left: chest-up close-up portrait, facing the camera, neutral relaxed expression.
>
> Middle: full-body front view, standing straight, arms relaxed at his sides, head to shoes in
> frame.
>
> Right: full-body back view, same pose, head to shoes in frame.
>
> Keep his exact face, build, hair and outfit from the first image, identical and consistent
> across all three photos.
>
> Plain seamless light grey studio background in each photo, soft even lighting, even spacing
> and framing, clean silhouette, consistent alignment.
>
> Photorealistic, DSLR, muted tones. No text.

A workspace in its free trial: its credits cover one face option, not a sheet. The avatar is
made once the plan starts (house rules, section 8).

## 5. Create it

`create_avatar` with `name`, `gender`, `age`, `face_asset_id` (the sheet's take id), `brand_id`,
`persona` (section 2), `about`, `species` for an animal, and `voice_id` plus `voice_name` when
one was picked. Free. The persona fields given are written as given; the rest are written in
the background within a minute to fit them.

Show it: **the name**, one line (brand, voice), the sheet, and the app link (`studio_url`).
Offer next: a first photo of it, a talking video, or setting it as the brand's default avatar
in the app.

## 6. Refusals

| Answer | Do |
|---|---|
| "A new avatar starts from its character sheet, not a photo." | Make the sheet (section 4) from that photo, then `create_avatar` with the sheet's id. |
| "The workspace holds N avatars, as many as its plan allows." | Say so with the link the answer gives; offer an existing avatar. |
| "That upload is not complete" / "The file has not arrived" | Run the `curl` line, then `complete_upload`; past 5 minutes, `create_upload` again. |
| "That face take is still generating" / "That face option is still generating" | `get_avatar_faces` with `wait_seconds`. |
| "That file is not an image" | The sheet is made from a photo. |
| A take `failed`, none came back | The credits came back; offer another try with its price. |
