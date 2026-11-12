# Looking things up, and avatars

Free, and they start nothing.

| The ask | Use |
|---|---|
| "Which avatars do I have?", "find Mia", "the fitness ones" | `list_avatars`: `search` (words in the name, archetype, bio, tone or voice name), `brand_id` for one brand's avatars and the shared ones. `total` says how many match; when `has_more`, pass `next_cursor` back as `cursor` with the same filters. Never say "these are all" from one page |
| "What have I made?", "my last videos", "that kitchen clip from last week" | `list_creations`: everything generated, newest first, the same paging. `file_type` narrows; `search` finds one brand's creations by words in the prompt (it needs `brand_id`). A row's `id` is an asset id |
| Uploads too, or any file to pick for a new piece | `list_assets` |
| "Rename her", "make her older", "give him this voice" | `update_avatar`: only the fields given change (name, gender, age, archetype, bio, tone, voice). A voice comes from `list_voices`, with its name. The face is not changed here: a new look is made on the avatar's page in the app |
| "Delete this avatar" | `delete_avatar`. It cannot be undone, so call it first WITHOUT `confirm`: nothing is deleted, and the answer names the avatar and what goes with it (the accounts it is pinned to, a brand it is the default of). Say exactly that, ask, and only on the person's yes call it again with `confirm: true`. What was made with the avatar stays |

Name an avatar back before changing or deleting it ("Mia, the fitness coach on Glow Lab?")
when a search matched more than one.

