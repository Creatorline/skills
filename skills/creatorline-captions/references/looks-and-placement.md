# Looks and placement

How each caption look reads, how to keep one look per brand, and where words go on a 9:16
frame so the apps do not cover them.

## Contents

1. [The six caption looks](#1-the-six-caption-looks)
2. [Picking a look](#2-picking-a-look)
3. [The brand's look](#3-the-brands-look)
4. [The frame and the safe area](#4-the-frame-and-the-safe-area)
5. [Caption rows](#5-caption-rows)
6. [The hook and other texts](#6-the-hook-and-other-texts)
7. [What is heard](#7-what-is-heard)
8. [Readability checklist](#8-readability-checklist)

## 1. The six caption looks

The same six looks serve Video Studio (`style`), `hook-captions` and `short-clip`
(`caption_style`). The person sees the names in the second column in the app.

| `style` | App name | Type | Colour | Edge | The word being said | Words at a time |
|---|---|---|---|---|---|---|
| `hormozi` | Hormozi | ALL CAPS, big and heavy | White | Thick black edge, shadow | Turns yellow | Up to 4 |
| `tiktok` | TikTok | Small, as written | White | Thin black edge, soft shadow | Stays white | Up to 4 |
| `minimal` | Minimal | Small, as written | White | No edge, shadow only | Stays white | Up to 4 |
| `sticker` | Sticker | Medium, as written | Black | Heavy white edge, no shadow | Stays black | Up to 4 |
| `bold` | Bold | Small, as written | White | Heavier black edge, shadow | Stays white | Up to 4 |
| `karaoke` | Karaoke | Medium, as written | White | Thin black edge | Fills with yellow as it is said | Up to 5 |

"As written" means the words keep the case the speech was written down in; only `hormozi`
turns everything into capitals. A line also ends at a pause in the speech, so some lines hold
fewer words. `hormozi` is the default when no look is given. A name outside these six is
refused with the list, before anything is charged.

## 2. Picking a look

| The video | Look |
|---|---|
| Energetic talking video, tips, an offer, a hot take | `hormozi` |
| Casual vlog, GRWM, a day in the life, anything meant to feel native | `tiktok` |
| Calm, aesthetic, dark or moody footage | `minimal` |
| Bright lifestyle, playful product, pastel sets | `sticker` |
| Busy background, outdoors in daylight, overexposed footage | `bold` |
| Storytime, narrated faceless video, a voiceover over b-roll | `karaoke` |

- Describe a look to the person by what it does ("big caps, the spoken word in yellow"), then
  its app name.
- A request in their words maps to the nearest look: "clean" is `tiktok`, "subtle" is
  `minimal`, "yellow" or "bold caps" is `hormozi`, "white outline" is `sticker`, "word by word
  highlight" is `hormozi` or `karaoke`.
- A colour, font or size the looks do not have (red captions, a script font, bigger words):
  say in one line that captions come in these six looks, and offer the nearest. Free-form
  styling belongs to texts in Video Studio (`creatorline-video-studio`), not to captions.
- A handwritten, storybook or torn-paper look does not exist here: say so in one line and offer
  Sticker (playful) or Minimal (soft).
- A request that would hurt reading (captions over the face, on the hook's row, or a long
  block of words): decline it in one line with the nearest that reads ("they'd cover your
  face; I'll keep them at the bottom").
- No emoji in captions: they are the words said.
- Karaoke is never the default; use it when it is named or the video is a storytime or a
  narrated faceless video.

## 3. The brand's look

- One caption look per brand, kept across its posts. The same for the hook: one text look, one
  size.
- The person's explicit ask always wins over the brand's look: a named look or place is used
  as it is, with no question.
- There is no brand setting for it. Read it off the brand's own videos: `list_videos` with
  `brand_id` and `limit: 5`, then `get_video` on the newest until one has `captions`; its
  `style` (and its `position`, when it is `top`, `middle` or `bottom`) is the brand's look.
  `custom` means someone dragged them in the studio: use `auto`. Its hook texts give the hook
  look and size.
- No captioned video yet, and the person is there to answer: ask the look question below, with
  the intake, before anything is priced.
- No captioned video yet, and nobody to ask (another skill called this one, a batch, "just do
  it"): `hormozi`, said in one line.
- The person changes it: use the new look, and say it is the brand's look from now on.
- Route B results are not Video Studio videos, so they cannot be read back this way. When a
  brand only ever used route B, ask the look question once; the person's answer is the brand's
  look for the rest of the conversation.

**The look question.** At most two quick questions, each with the recommended one first, and
none when the look was named, the brand has one, or nobody is there to answer.

> 1. Which caption look?
>    1. Hormozi: big capitals, the spoken word in yellow (recommended)
>    2. TikTok: small white words, like the app's own
>    3. Karaoke: each word fills with yellow as it is said
>    4. Sticker: black words in a thick white edge

Only when TikTok is picked, a second question:

> 2. Its edge?
>    1. A thin black edge (recommended)
>    2. A heavier black edge, for busy or bright footage (Bold)
>    3. No edge, a soft shadow only, for calm or dark footage (Minimal)

Never a second question after Hormozi, Karaoke or Sticker: they have no variants. A request
that already says the look ("clean captions", "big yellow ones") is the answer: map it
(section 2) and ask nothing.

## 4. The frame and the safe area

Every video is one vertical 1080 x 1920 px frame. TikTok and Reels draw their own interface over
parts of it; the stricter of the two on each side:

| Covered | Size |
|---|---|
| Top band | 250 px |
| Bottom band (the post's caption, the sound, the progress bar) | 420 px |
| Left edge | 70 px |
| Right edge | 55 px |
| Buttons column on the right | 194 px wide, from 958 px down |

- In Video Studio, texts and captions are kept inside what is left by themselves: the rows
  `top`, `middle` and `bottom` are rows inside it.
- Layers (pictures, video cards, green screen people) are not kept inside: check them with
  `preview_video` and `show_safe_area: true`.
- A wide clip fills the frame and loses its sides. Words burned into the sides of a wide
  source are cut off with them.
- A common rule for vertical video keeps captions clear of the bottom 16.7 % of the height and
  11 % of the width at each side (17 % and 7.5 % on a wide frame). Video Studio's bottom row
  sits above the 420 px band (21.9 %), clear of it. Route B burns about 18 to 20 % up from the
  bottom, also clear. The sides are the part to check, with `preview_video`
  (checking-captions.md, section 5).

## 5. Caption rows

| `position` | Where | When |
|---|---|---|
| `auto` (default) | `bottom`, or `middle` when a split screen or a picture low in the frame takes the bottom | Almost always |
| `bottom` | Just above the apps' bottom band | Talking videos, most of everything |
| `middle` | Across the frame's middle | A product shown low in the frame, a split screen |
| `top` | Just below the apps' top band | Only for a reason, and never with a hook on the top row |

Route B and `short-clip` place captions themselves, low in the frame. They sit a little lower
than Video Studio's bottom row, partly inside the band the apps cover, and cannot be moved. A
workflow's `caption-burn` step takes `caption_position` (`bottom`, `middle`, `top`), the same
rows as Video Studio's; it has no `auto`, so pick `middle` yourself for a split screen or a
product low in the frame.

## 6. The hook and other texts

- The hook takes the top row; captions the bottom or the middle. Two things to read never
  share a row, and never overlap.
- A face reads best in the upper middle of the frame. In a tight close-up, a two-line hook at
  `l` can cover the forehead: try `m`, one line, or the `tiktokHighlight` plate so it reads
  above the face.
- A video that already has words burned in at the top (a Reshoot's caption, a source's own
  text): no hook on that row. Skip the hook, or put it where nothing is.
- Labels, steps and a call to action are texts too; their placement craft lives in
  `creatorline-video-studio`. Keep each off the captions' row.

## 7. What is heard

- The clips' own sound joined in order at their speeds, and every voiceover where it starts:
  the words land on the video's own timeline. The language is detected by itself.
- A muted clip is still heard: muting hides its sound from viewers, not from the captions. To
  leave its words out, caption only the other clips (`clip_ids`).
- A split screen's second video is heard only when its sound is on.
- The sound laid under the whole video (`set_sound`) is never heard: music is not captioned.
- A song in a clip's own sound is heard like speech, so its lyrics become captions. Caption
  only the talking clips.
- Nothing said at all: the job fails with "Nothing is said in this video's clips or
  voiceovers" and the charge comes back.
- The words are heard from one cut. Changing the clips or the voiceovers afterwards leaves them
  `out_of_date`; texts, layers and the sound under the video do not.

## 8. Readability checklist

- Captions on one row, the hook on another, nothing else on either.
- The look fits the footage's brightness (section 2).
- Brand and product names spelled as the brand spells them; numbers as digits.
- The hook in two lines at most, readable at phone size in `preview_video`.
- No words inside the covered bands (`show_safe_area: true`).
- Captions never cover the product while it is being shown: move them to `middle` for that
  video. Never over the face.
- Captions stay small and out of the way: one look size for the whole video, a few words at a
  time, never a block of lines.
- Letters the look may not draw, and Turkish capitals in Hormozi: checking-captions.md,
  section 6.
