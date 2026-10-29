# Sources, framing and price

How a long recording comes in, how the `generate_short_clip` tool chooses and builds the
shorts, how long it takes, how its price is put together, and the questions people ask about it.

## Contents

1. [Where the recording comes from](#1-where-the-recording-comes-from)
2. [The one-line check before the price](#2-the-one-line-check-before-the-price)
3. [How the topics are chosen](#3-how-the-topics-are-chosen)
4. [How each short is built](#4-how-each-short-is-built)
5. [Timing](#5-timing)
6. [How the price is built](#6-how-the-price-is-built)
7. [Questions people ask](#7-questions-people-ask)

## 1. Where the recording comes from

The tool takes exactly one source: a YouTube link in `source_url`, or a library video in
`inputs.source_video`. Never both.

| Source | How it goes in | Notes |
|---|---|---|
| YouTube link: `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/live/...` | `source_url` | Public videos only. Its length is read from the link for the price, without downloading it, so no file size limit applies. Any other website's link fails. When the quote refuses links (SKILL.md, step 5), use a file. |
| A video in the brand's library | `inputs.source_video` with the asset `id` from `list_assets` | `duration_sec` on the row is the length the price uses. Videos made in Creatorline count too. |
| A direct link to a video file | `import_asset` with `url`, `brand_id`, `title`, then `inputs.source_video` with its `id` | Up to 100 MB. Import first: the answer gives `duration_sec`, so the price is real, and the file can be reused for Video Studio. |
| A file on their device or attached in the chat | Uploaded at https://app.creatorline.io/assets?activeBrand=BRAND_ID, then `list_assets` | Up to 100 MB. A chat attachment never reaches Creatorline by itself. |
| A TikTok or Instagram post link | `import_asset` takes it (the video is copied) | Almost always too short for this tool. Offer captions or a trim instead. |
| A cloud-drive share page, a page with an embedded player, a meeting recording's share page | Refused: a page is not a file | Ask for an upload, or a YouTube link. |

When a file is over 100 MB: a public YouTube link of the same recording, or only the part
with the conversation as its own file. 100 MB holds only a few minutes of 720p (often 5 to
15), and a lower resolution makes blurry shorts (section 4), so cut the length, not the
sharpness. A long show can go in as several parts, each its own run and its own quote.

"My podcast", "my latest episode" with no link: `list_assets` with `brand_id` and
`file_type: "video"`. Pick the newest long one (`duration_sec` of several minutes); when two
fit, name both by title and length and let them pick.

## 2. The one-line check before the price

Before you quote, tell the person in one line what you are about to cut and anything that will
hold it back. You cannot watch the recording, so state what you assume:

- the length, in minutes, from `duration_sec` (from the import, the library row, or the
  `needs_approval` answer for a link);
- under about 2 minutes: too short to choose between topics, offer Video Studio or captions;
- over about an hour: topics come only from roughly the first hour (section 3), yet every
  second is priced. Say so, and offer the part that matters as its own file;
- a music video, gameplay, a vlog with little talk: likely no shorts (`no-transcript` or
  `no-clips-found`), say so and let them decide;
- a wide shot of two people side by side: the vertical frame holds one face at a time, so
  the other drops out of frame;
- a wide file under 1080p: the shorts will look soft;
- someone else's video: only with the rights to it.

Good: "Your 48-minute interview 'Pricing your first product': each short will follow whoever is
talking." Bad: three questions about the recording they already sent.

## 3. How the topics are chosen

1. The whole recording is turned into text with times: from the video's own captions when a
   YouTube video has them, otherwise by speech recognition on its sound. No speech, no shorts
   (`no-transcript`). Only the first 1,200 lines of that text are read for topics: about an
   hour of talk, often more for an upload. Later topics of a longer show are never picked.
2. The text is split into the distinct subjects the speakers work through: questions,
   stories, arguments, tips. Intros, outros, sponsor reads, housekeeping, filler and flat
   stretches are left out.
3. For each subject worth a short, the single best window is picked:
   - it opens on the sentence that introduces the subject, which has to work as a hook in the
     first 3 seconds (a sharp question, a number, a confession, a strong opinion);
   - it carries the whole arc, setup to payoff, and ends on the conclusion, never mid-thought;
   - it stands alone: no "as I said" or "he" pointing back to something outside the short;
   - no two shorts cover the same subject or overlap; a subject that comes back later gets one
     short, its best moment;
   - start and end fall where a line of speech starts and ends, never inside a word.
4. Lengths follow the subject: 5 to 100 seconds, most 20 to 90.
5. Each short is scored for its hook, its completeness and how much it packs in. With more
   than 10 subjects, the 10 best are kept. None found: `no-clips-found`.
6. Each gets a headline of up to 60 characters that names its subject in a way that pulls the
   viewer in ("What nobody tells you about pricing").

Nothing steers this: there is no prompt, no niche, no count. The same recording run twice can
pick slightly different moments, and the second run is charged again.

## 4. How each short is built

1. **The cut.** Exactly at the chosen times, not rounded to the nearest keyframe.
2. **The frame.** Vertical, 9:16. Still frames taken every 1 to 3 seconds are judged for
   what they show:
   - a person is the main subject: the crop follows the face of the person speaking (or the
     most prominent one), moving smoothly within a shot and jumping at a cut;
   - slides, text, a screen recording, or b-roll with no clear person: the picture is kept
     whole, with bars above and below, never cut. In a short that mixes these with people,
     each person scene gets one still crop on the face instead of a moving one;
   - a wide shot of two people side by side: only one face fits the frame, and the crop moves
     to whoever looks like the speaker in the stills, so it can lag a quick exchange or rest
     on the listener;
   - a vertical source: nothing to crop;
   - when the judging fails: a plain center crop. Framing can make a short better, never fail
     it.

   The crop keeps about a third of a wide picture's width, scaled up to 1080 x 1920: a 1080p
   source gives sharp shorts, 720p soft ones, anything lower blurry ones.
3. **The captions.** The short's own speech is heard again for exact word timing, then shown a
   few words at a time in the lower part of the frame, in the chosen look.
4. **The headline.** At the top, over the first 2.5 seconds, in every caption look.
5. **The cover.** The short's first frame, which shows the headline.
6. **Delivery.** Each short is saved to the brand's project the moment it is done, so the
   project page (`studio_url`) fills up one by one. A short that fails to build is dropped and
   the others still arrive; the run fails only when every short fails (`all-clips-failed`).
   `get_generation` lists them all in `output` once the run has finished.

Everything is burned into the picture: the captions, the headline. The sound is the
recording's own.

## 5. Timing

- It downloads and hears the whole recording, picks the topics, then builds up to three shorts
  at a time. Expect several minutes; a long recording with many topics takes longer.
- A run over the workspace's parallel limit waits as `queued` and starts on its own (house
  rules, section 3).
- `get_generation` answers `processing` until every short is done. The project page shows them
  arriving before that: give its link while they wait.

## 6. How the price is built

- The price follows the SOURCE's length in seconds, whatever comes out of it.
- The first charge, the `credits` in the `needs_approval` answer, covers up to 3 shorts.
- Each short past the third adds about a seventh of that first charge (also by the source's
  length). It is charged during the run, once the number of topics is known, and it is charged
  even when the balance runs below zero; a balance below zero stops the next run until credits
  are added.
- So 4 shorts come to about 1.15 times the quote, 7 to about 1.6 times, and the full 10 to
  about twice.
  Quote the range; never only the first number.
- The caption look does not change the price.
- Extra shorts are counted when the topics are found, before any is cut. A run that delivered
  shorts is not refunded for a short that dropped out on the way.
- A run that ends with no shorts gets its first charge back. When it failed after the topics
  were found (`all-clips-failed`), an extra-shorts charge already made stays: say so.
- "How much would my hour-long podcast be?": `generate_short_clip` without `confirm`, with the
  link in `source_url` (or `inputs.source_video`). Nothing starts. Without the source the
  answer is an estimate for a few seconds of video, not a price.

## 7. Questions people ask

| They ask | Answer |
|---|---|
| "Can I choose how many shorts?" | No: one per topic, up to 10. A recording on many subjects gives more. |
| "Can I pick the moments?" | Not with this tool. Give the times and the moment is cut in Video Studio ([one-moment.md](one-moment.md)). |
| "Can I change the captions afterwards?" | No: they are burned in. A new look is a new run, charged again. For one short, Video Studio from the source file. |
| "Can I have them without captions or the headline?" | Not with this tool. Video Studio, from the source file. |
| "Square or wide versions?" | No: every short is 9:16, for TikTok, Reels and Shorts. |
| "Can it translate them?" | No: the captions are what is said, in the language spoken. |
| "Can my avatar be in them?" | Not here: the shorts are the real recording. The avatar can re-film one short's moment as its own take (`creatorline-reshoot`). |
| "Can it run every week by itself?" | Not as a workflow. Send next week's link and it is the same few steps. |
| "Why only 4?" | The recording held 4 subjects that stand alone. |
| "Can it cut my 3-hour stream?" | Topics come only from roughly its first hour, and every second is priced. Better: the part that matters as its own file, or several parts, one run each. |
| "Is the price per short?" | The quote covers the first 3; each one past that adds about a seventh. |
