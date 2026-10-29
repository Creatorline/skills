# Sources

A swap copies its source, flaws included. Picking and preparing the clip matters more than any
setting.

## Contents

1. [Where a source comes from](#1-where-a-source-comes-from)
2. [The checklist](#2-the-checklist)
3. [Red flags and what to offer](#3-red-flags-and-what-to-offer)
4. [Length, the part you want, and cutting](#4-length-the-part-you-want-and-cutting)
5. [Telling the person what you see](#5-telling-the-person-what-you-see)

## 1. Where a source comes from

| The person gives | Do |
|---|---|
| A TikTok or Instagram post link | `import_asset` with `url`, `brand_id`, `title`. The post's video is copied into the library; keep `id` and `duration_sec`. A photo or carousel post is refused. |
| A direct link to a video file | `import_asset` the same way (up to 100 MB). |
| "The video in my library", "my last reshoot" | `list_assets` with `brand_id`, `file_type: "video"` and `search`; add `source: "generated"` for things made in Creatorline. |
| A YouTube link | It cannot be brought in from here. Ask for the same video's TikTok or Instagram link, or for the file, uploaded in the app's library (below). |
| A file on their device | They upload it in the app's library, then you find it with `list_assets`. |
| "A trend" with no link | Trends live in the app, where each trend has a Character Swap button. Ask them to copy the trend's link to you, or to press that button there. |

App pages, one brand at a time (add `?activeBrand=<brand id>` so the right brand opens, as in
house-rules.md, section 9):

- the library: https://app.creatorline.io/assets
- trends: https://app.creatorline.io/trending

Always import a post link first instead of passing it straight to `generate_character_swap`:
the import gives you the length you need for `duration`, and an asset you can look at.

## 2. The checklist

Look with `preview_assets` (the cover frame and the length). Ask the person one short question
only when the cover cannot tell you.

| Check | Good | Why it matters |
|---|---|---|
| Length | 4 to 30 s of the part they want | Under 4 s is refused; past 30 s only the first 30 are filmed |
| People | One clear main person, or exactly two for a two-avatar swap | The main person is picked by prominence; a third person stays as filmed |
| Face | Visible most of the time, often toward the camera, not a small figure far away | The likeness is rebuilt from what the face shows |
| Light | Even, bright enough, sharp | Dark or blurry frames lose the likeness first |
| Cover | Few hands, hair, masks or props across the face; few long stretches turned away | A hidden face drifts |
| Camera | Steady or moving gently | Fast whips and heavy blur break the edges |
| Build | A performer close to the avatar's build and hair length | The avatar follows the performer's body; a big mismatch shows |
| Frame | Vertical 9:16 for TikTok, Reels and Shorts | The result keeps the source's frame |
| Opening | Something happens in the first second | The swap keeps the source's pace; cut a slow start first |
| On-screen text | Clean, or text the person wants kept | Burned-in captions, stickers, logos and handles stay in the result |

## 3. Red flags and what to offer

Say a red flag in one line before the price, with one fix. Then do what the person picks.

| Red flag | Offer |
|---|---|
| Three or more people up front | Swap the two main ones; the rest stay as filmed |
| The target is not the most prominent person | Transfer with a direction that names them, or swap a part where they lead |
| Cuts between different people as the main subject | Swap one stretch with one lead |
| A tiny, dark, blurred or mostly hidden face | A closer, brighter part of the clip, or Reshoot (a new take of the idea) |
| They want their product, new lines or a new place throughout | Reshoot (`creatorline-reshoot`). A product the performer holds can also go in Transfer's `other_elements`. |
| They want the moves, not this footage | The motion route (`generate_motion_control`) |
| A child on screen | Do not use it (house-rules.md, section 7) |
| A real person's face offered as the second avatar | Only the person themselves, or with their permission; never a public figure |

Rights: the result keeps the source's footage and sound. For a paid ad, prefer a source the
brand owns or has licensed. For a trend post, the platform's own reuse rules apply.

## 4. Length, the part you want, and cutting

- `params.duration` is the source's `duration_sec`, rounded to a whole second, at most 30.
  Never leave it out: the default is 15, and 15 seconds are billed whatever the source's
  length.
- No `duration_sec` on the import or the library row: `preview_assets` says how long the video
  runs.
- Shorter costs less and holds the likeness better. When the person needs only the hook and
  the peak of a dance, suggest the strongest 6 to 15 seconds.
- A swap through `generate_character_swap` always starts at the source's first second. For a later
  part, or to skip a slow start, swap it in Video Studio (calls.md, section 6):
  1. `create_video` with one clip in `clips`: the source's `asset_id`, `trim_start` and
     `trim_end` in seconds of the source, and an `id` for the clip. Free.
  2. `swap_character_in_clip` with that `clip_id`, without `confirm` for the price; on yes,
     with `confirm: true`.
  3. `get_video` every 20 seconds or so until the clip is no longer `generating`.

  The part must be 5 to 30 s, and this route takes one avatar at standard quality, with no
  Outfit and no other elements. For any of those, cut the part with `export_video` instead
  (its own price, quoted together with the swap) and swap the exported file. The export is a
  vertical 1080 x 1920 video whose clips fill the frame, so a wide source loses its sides:
  check the cover with `preview_video` (free) before you export.
- A source under 4 s cannot be swapped. Offer a longer cut of the same video.

## 5. Telling the person what you see

One line before the plan, so they can correct you early:

> A 14 s vertical clip: one woman in a red jacket dancing in a bright kitchen, face to camera
> most of the time. A good source.

> A 40 s clip with two people; the man in the grey hoodie leads. I will use the first 30 s:
> Jack takes him, Mia takes the woman in the red jacket.

(Here Jack goes in `avatar_id`, because the leader is replaced by the first avatar, and Mia's
face goes in `character`.)
