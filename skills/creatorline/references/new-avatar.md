# A new avatar, and a file from the person's machine

## 1. Ask once

One message, with defaults: the avatar's name, gender and age (18 to 80), the brand it
belongs to (the active one by default), and where the face comes from:

1. **Their own photo** (a face, well lit, looking at the camera): no cost.
2. **Generated options** like a ready-made look, or from a description: a few credits each.

A voice is optional: offer two or three from `list_voices` that fit, or none (runs then use the
brand's voice). Cloning a voice and a persona from named accounts are app-only
(https://app.creatorline.io/avatars/new).

## 2. The face

**A photo they have.**
- A link to the image file: `import_asset` with the `url` and the `brand_id`.
- A file on their machine, when `create_upload` is offered: `create_upload` with the file's
  name, MIME type and exact size in bytes (`wc -c < file`), then run the `curl` line it returns
  from the folder that holds the file (fix the path if needed; the link lasts 5 minutes), then
  `complete_upload` with the `asset_id`. A chat app has no `create_upload`: they drop the file at
  https://app.creatorline.io/assets and you find it with `list_assets`.
- Already in Creatorline: `list_assets` with `file_type: "image"`, then `preview_assets`.

**Generated options.**
1. Optional: `list_avatar_templates` (narrow by `gender`), show the pictures, let them pick a
   look. Its `id` is the `template_id`.
2. `generate_avatar_faces` with `template_id` and/or `description` (plus `gender`, `age`,
   `traits`), `count` 2 by default, WITHOUT `confirm`: it answers with the price. Tell them the
   credits and the balance, and wait for a yes.
3. On the yes, the same call with `confirm: true`. It answers at once with `take_ids`.
4. `get_avatar_faces` with the `take_ids` and `wait_seconds: 45`, again until `done`
   (one to four minutes). Show every ready picture, numbered, and let them pick one.
5. None fits: change the description and ask again, with its price.

A workspace in its free trial can make ONE face: `count: 1`.

## 3. Create it

`create_avatar` with `name`, `gender`, `age`, `face_asset_id` (the take's id or the image's
id), `brand_id`, and `voice_id` plus `voice_name` when one was picked. Free. Its persona is
written in the background within a minute.

Show it: **the name**, one line (brand, voice), the picture, and the app link (`studio_url`).
Offer next: a first photo of it, a talking video, or setting it as the brand's default avatar
in the app.

## 4. Refusals

| Answer | Do |
|---|---|
| "The workspace holds N avatars, as many as its plan allows." | Say so with the link the answer gives; offer an existing avatar. |
| "That upload is not complete" / "The file has not arrived" | Run the `curl` line, then `complete_upload`; past 5 minutes, `create_upload` again. |
| "That face take is still generating" | `get_avatar_faces` with `wait_seconds`. |
| "That file is not an image" | The face must be a photo. |
| A take `failed`, none came back | The credits came back; offer another try with its price. |
