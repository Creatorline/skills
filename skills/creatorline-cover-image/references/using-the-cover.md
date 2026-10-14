# Using the cover

A cover only helps once it is where people see it. This file says what a Creatorline post can
carry, how the cover gets onto each platform, and how to put exact words on it without drawing
them.

## Contents

1. [What a post can carry](#1-what-a-post-can-carry)
2. [By destination](#2-by-destination)
3. [The cover as the video's first frame](#3-the-cover-as-the-videos-first-frame)
4. [Exact words without drawing them](#4-exact-words-without-drawing-them)
5. [What to tell the person](#5-what-to-tell-the-person)

## 1. What a post can carry

- `create_post` has no field for a video's cover. `photo_cover_index` only picks which image
  of a TikTok photo carousel is its cover. The Creatorline app has no cover picker for video
  posts either: a video post goes out without a chosen cover, and each platform picks one.
- When no cover is chosen, Instagram and TikTok usually show the video's first frame. YouTube
  picks a frame for a Short by itself.
- So a cover reaches a video post in one of three ways:
  1. **As the video's first frame**, built in Video Studio (section 3). Works for every video
     posted through Creatorline.
  2. **Chosen by the person in the platform's own app.** A TikTok draft (`draft: true` on
     `create_post`) lands in the TikTok app's inbox, where they finish the post and pick its
     cover. On other platforms, only where the platform's own app lets them change the cover.
  3. **Uploaded as a YouTube video's thumbnail** in YouTube Studio.
- A carousel's cover is its first image: put the cover first in `asset_ids`. On TikTok,
  `photo_cover_index` can name another image instead.

## 2. By destination

| Destination | Frame | How the cover gets there | You |
|---|---|---|---|
| TikTok video, posted through Creatorline | `9:16` | the first frame; or a TikTok draft, cover picked in TikTok | section 3, or `creatorline-publish` with `draft: true` |
| Instagram Reel, posted through Creatorline | `9:16` | the first frame | section 3 |
| YouTube Short | `9:16` | YouTube picks a frame; a strong first frame helps; the person can pick another in the YouTube app | section 3 |
| YouTube video (long, wide) | `16:9` | the person uploads it as the thumbnail in YouTube Studio | give the link (section 5) |
| Photo carousel | the slides' frame, `3:4` by default | the first image | `creatorline-publish`, the cover first in `asset_ids` |
| A video the person posts themselves | what they need | they set it in the app | give the link |

## 3. The cover as the video's first frame

The picked cover becomes a short still at the very start of the video, so the post opens on it
and the apps that show the first frame show the cover. Editing is free; the new export is paid.

**Asked for together** ("make a cover and put it on my video"): price both before either runs.
The cover's price comes from `create_generation` without `confirm`. The export's comes from
`export_video` without `confirm` on the project the cover will go into: every export of a video
costs the same, so the quote holds after the cover is added. A clip that is not in a project
yet: make the project first with `create_video` and the clip alone (free), then quote. One yes
for the total; then make the cover, get the pick, and continue below without asking again.

1. **The cover first.** Make it, check it, get the person's pick. Use the `9:16` version: it
   fills the video's 1080 x 1920 frame exactly, and a wide cover would lose its sides.
2. **Find the video.**
   - A Video Studio project: `get_video` right before you edit it, so you build on the latest
     version (the person may be editing it).
   - A finished clip (a generation or an upload): its `asset_id`.
3. **Put the cover in front.**
   - A project, with `edit_video`:

     ```json
     {
       "video_id": "<video id>",
       "operations": [
         { "op": "add_clip", "asset_id": "<cover asset id>", "index": 0, "duration": 0.5, "id": "cover" }
       ]
     }
     ```

     Inserting a clip moves the later texts, layers and voiceovers along with it. A project you
     made for the quote (above) takes this call too.
   - A clip with no project yet, with `create_video`:

     ```json
     {
       "brand_id": "<brand id>",
       "title": "<the video's title>",
       "operations": [
         { "op": "add_clip", "asset_id": "<cover asset id>", "duration": 0.5, "id": "cover" },
         { "op": "add_clip", "asset_id": "<video asset id>", "id": "main" }
       ]
     }
     ```

     A `create_video` call that failed or timed out: check `list_videos` before you call it
     again, because each call makes a new video.
4. **How long.** `duration: 0.5` by default; the shortest a clip can be is 0.3 s. Up to 1 s
   when the cover's words are also the video's hook. Longer holds back the video's own opening.
5. **Look.** `preview_video` with `at: [0.2]` and `show_safe_area: true` (free): the face and the
   words sit outside the shaded bands.
6. **Captions.** If the video had captions, they now read `out_of_date`. Writing them again is
   free, and the export hears them again by itself.
7. **Export.** `export_video` without `confirm` for the price, then the person's yes, then the
   same call with `confirm: true`. Already covered by a batch yes: `confirm: true` straight
   away. Read `get_video` every 10 to 30 seconds until `export.status` is `done`, with one line
   meanwhile ("Exporting the video with the cover in front.").
8. **Post.** `export.asset_id` is the finished MP4: it goes to `create_post`
   (`creatorline-publish`).

Anything more on that video (hook text, music, a split screen) is `creatorline-video-studio`.

## 4. Exact words without drawing them

The image model draws words well, but not always letter for letter. When the words must be
exact (a name, a long word, letters with marks, a number with units), type them instead.

- **On a video's cover frame.** Make the cover without words: the same brief with the Words line
  replaced by "Open space on the <left>, kept for a headline that is added later; the picture
  itself is clean". Put it in front of the video (section 3), then type the words over it in the
  same `edit_video` or `create_video` call:

  ```json
  { "op": "add_text", "text": "3 MISTAKES", "start": 0, "end": 2, "position": "top", "size": "xl", "look": "tiktokOutline" }
  ```

  The words stay on through the first 2 seconds, so they work as the hook too. Typed texts stay
  inside the apps' safe area by themselves.
- **The video's own first frame, no new image.** When the video already opens on the avatar's
  face, the same `add_text` at `start: 0` turns its first frame into the cover. Nothing is
  generated; only the export is paid. Look at the opening with `preview_video` first: a blink
  or a blur there makes a poor cover. When its answer says `exact: false`, the picture is the
  clip's cover frame, not its first frame: say you could not check the opening.
- **On a still.** The app's slides page types words onto a photo and saves it as a PNG, in
  vertical (`9:16`, `3:4`, `4:5`) or square frames, not `16:9`:
  https://app.creatorline.io/brands/<brand id>/generate/slides. Give it as a link named
  "Slides page", with the clean cover's name; the person adds the words there.

## 5. What to tell the person

Say how the cover gets used in one or two lines, in plain words, and offer the step that
finishes it.

- **A Reel or TikTok posted through Creatorline:** "Instagram and TikTok usually use a video's
  first frame as its cover, and Creatorline can't attach a separate one. Want me to put this
  cover at the very start of the video, for half a second? That needs a new export: <N>
  credits."
- **TikTok, their choice:** "Or I can send the video to your TikTok inbox as a draft, and you
  pick the cover in TikTok before it goes live."
- **A long YouTube video:** "Here is your thumbnail" with the image link named "Thumbnail",
  then: "Upload it as the video's thumbnail in YouTube Studio. The link expires, but the image
  stays in your Creatorline library."
- **A carousel:** "I'll put it first in the carousel, so it is the cover."
- Never promise how a platform will show it. "Usually" is the honest word for the first frame.
- The post went out with another frame as its cover: offer the TikTok draft next time, or the
  cover held for 1 s instead of 0.5 s.
