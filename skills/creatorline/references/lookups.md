# Looking things up, and avatars

Free, and they start nothing.

| The ask | Use |
|---|---|
| "Which avatars do I have?", "find Mia", "the fitness ones" | `list_avatars`: `search` (words in the name, archetype, bio, tone or voice name), `brand_id` for one brand's avatars and the shared ones. `total` says how many match; when `has_more`, pass `next_cursor` back as `cursor` with the same filters. Never say "these are all" from one page |
| "What have I made?", "my last videos", "that kitchen clip from last week" | `list_creations`: everything generated, newest first, the same paging. Narrow it: `file_type`, `tool` (what made it: `character-swap`, `reshoot`, `ugc-video`, `photo-edit`, ...; a row's own `tool` shows the slug), and a span of days with `created_after` and `created_before` (`2026-11-10`, UTC; `created_before` takes in that whole day). The filters combine. `search` finds one brand's creations by words in the prompt (it needs `brand_id`). A row's `id` is an asset id. An avatar's own pictures are not here: `list_avatar_looks` |
| Uploads too, or any file to pick for a new piece | `list_assets` |
| "Rename her", "make her older", "give him this voice" | `update_avatar`: only the fields given change (name, gender, age, archetype, bio, tone, voice). A voice comes from `list_voices`, with its name. The face is not changed here: a new look is made on the avatar's page in the app |
| "Delete this avatar" | `delete_avatar`. It cannot be undone, so call it first WITHOUT `confirm`: nothing is deleted, and the answer names the avatar and what goes with it (the accounts it is pinned to, a brand it is the default of). Say exactly that, ask, and only on the person's yes call it again with `confirm: true`. What was made with the avatar stays |

## An avatar's looks

An avatar holds several LOOKS: pictures of the same person or animal in another outfit, setting
or pose. One of them is the COVER, the face every run casts. Nothing is edited in place: a new
cover is a new look version, and what was already made does not change.

| The ask | Use |
|---|---|
| "Show me her looks", "which picture is she using?" | `list_avatar_looks`: every look with a `url`, the cover marked `cover: true`. Show the pictures |
| "Add this outfit as a look", "keep this photo of her" | `add_avatar_look` with `image_asset_id`: an image from `list_creations`, `list_assets`, `create_upload` or `import_asset`. It joins the gallery; the cover does not change |
| "Make this her new look", "use this face from now on" | `add_avatar_look` with `make_cover: true`, or `set_avatar_cover` with a `look_id` already in the gallery. Every later video and photo of the avatar changes with it: say so and ask first |
| "Remove that look" | `remove_avatar_look`. The cover cannot be removed: make another look the cover first |

Making a new look: `generate_photo_edit` with the avatar (it goes in by itself, so the face
stays the same) and a prompt for the outfit or the setting. Show the picture, and on the
person's yes add it. Never add a picture of somebody else as a look: the avatar would become a
different person in every run after it.

A place is not a look. A photo of a place goes into the take that should be set there (the
`location` input of the tools that have one), each time.

Name an avatar back before changing or deleting it ("Mia, the fitness coach on Glow Lab?")
when a search matched more than one.

