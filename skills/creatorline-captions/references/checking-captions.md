# Checking captions

How to make sure the captions say what was said, spelled the way the brand spells it, on the
right moments, readable, before anything is burned in. The hearing gives the timing; you give
the words you already know.

## Contents

1. [Words from what you know, times from the hearing](#1-words-from-what-you-know-times-from-the-hearing)
2. [The cleanest sound to hear](#2-the-cleanest-sound-to-hear)
3. [The word check](#3-the-word-check)
4. [When nothing is known to check against](#4-when-nothing-is-known-to-check-against)
5. [Looking at the lines before the export](#5-looking-at-the-lines-before-the-export)
6. [Letters a look may not draw](#6-letters-a-look-may-not-draw)
7. [Captions out of step](#7-captions-out-of-step)
8. [Never hold the video back for its captions](#8-never-hold-the-video-back-for-its-captions)
9. [What to say in one line](#9-what-to-say-in-one-line)
10. [When another skill calls this one](#10-when-another-skill-calls-this-one)

## 1. Words from what you know, times from the hearing

- Captions are timed ONLY by hearing the final sound: write them after the clips and the
  voiceovers are final. A script gives the words, never the times, even when the person or a
  calling skill asks for timing from the script.
- Never stand in for captions with texts (an `add_text` per line): only `write_captions` and
  the export burn them, with each look's own size, grouping and word highlight.
- When the words are known, the hearing is only the clock. Every word shown is the known word,
  spelled the known way: brand and product names, numbers, foreign words.
- Known words, by how sure they are:

| Source | Sure? |
|---|---|
| A voiceover's `text` in `get_video` (feeling tags removed) | Yes: a voiceover is read exactly as written |
| A script the person recorded or gave as read word for word | Yes, as far as they say |
| Lines you wrote for a generated talking clip | No: the take may have changed words. Check spelling only |
| Names from `get_brand` and from the person | Yes, for how they are spelled |

## 2. The cleanest sound to hear

The clearer the speech, the fewer words are missed.

| Speech | How well it is heard |
|---|---|
| Narration as a voiceover: heard on its own, its words known | Best |
| A clip with one clear speaker and little else | Good |
| Speech over music or noise in the same clip | Worst |

- Music the person adds goes under the video with `set_sound`: it is never heard, so it cannot
  blur the words.
- A clip whose sound is only music or noise: leave it out with `clip_ids`.

## 3. The word check

Read `captions.lines` from `get_video`. Lowercase both sides, drop punctuation, and count a
number as the same whether written in digits or words. Then:

1. **Similarity.** The share of the known words that were heard, in order. At 0.90 or more,
   fix the misspellings (step 3) and go on.
2. **Below 0.90:**
   - Over a voiceover, the voice read the text exactly, so the hearing slipped: retype the lines
     with the known words. A known word the hearing missed goes back into the line where it is
     said.
   - Over a generated talking clip, the take may not have said the script. Never paste the
     script over what was said: tell the person which lines differ, and offer a new take (the
     skill that made it) or captions of what was said.
3. **Fix** with `edit_caption`, all in one `edit_video` call, highest `index` first (calls.md,
   section 4).
4. **Count.** When only known words are spoken (a voiceover over silent clips), all the lines
   together hold exactly the known word count. One more or one fewer means a word is doubled
   or lost: find it and fix it.
5. **Coverage.** Every sentence of the known words appears in the lines, in order.

## 4. When nothing is known to check against

- The hearing is then the only source. Say once that the captions are heard from the speech and
  a quiet word can be missed.
- Far fewer words than the talking time holds (people speak about 2.5 words a second) means
  words were missed. Do not export as if all is well: tell the person the captions look
  incomplete, and offer to put in the missing words they tell you (`edit_caption`), or to
  export as they are.
- Spell names the way `get_brand` and the person spell them, whatever the hearing wrote.

## 5. Looking at the lines before the export

Free, with `preview_video` and `show_safe_area: true`:

- **Three moments**: the middle of the first line, of a line half way through, and of the last
  line (`at`: each line's start plus end, halved). At each, check:
  - the words are there, on their row, and are the words said at that moment;
  - they read at phone size;
  - they sit inside the frame and outside the shaded bands;
  - they do not cover the face, the product while it is shown, or text already in the video.
- **The sides.** A common rule for vertical video keeps captions about 11 % of the width
  (about 120 px) clear of each side. A line reaching closer, or wrapping onto a second row, is
  too wide for its look: move to a smaller one (TikTok, Minimal and Bold are smaller than
  Hormozi).
- The preview draws caption words in a stand-in font: trust it for place and size, not for the
  exact letters.
- After the export, `preview_assets` shows only a cover frame: the burned words cannot be read
  back. The checks above are the last look before they are burned in.

## 6. Letters a look may not draw

- The looks' fonts are made for Latin letters. For a language written in other letters
  (Cyrillic, Greek, Arabic, Hebrew, Hindi, Chinese, Japanese, Korean, Thai), no free check shows
  whether they are drawn. Say so in one line, and ask the person to watch the first seconds of
  the export before posting.
- **Turkish and Azerbaijani in Hormozi**, the all-capitals look: the capital of i is İ, and the
  look's own capitals may write I. Write the lines with an i in capitals yourself with
  `edit_caption` (İ for i, I for ı), keeping each line's word count; or pick a look that keeps
  letters as written.

## 7. Captions out of step

| What is seen | Why | Fix |
|---|---|---|
| Every word early or late by the same amount | The cut changed after the hearing (an opener added, a trim at the start, a voiceover moved or taken again) | `write_captions` again (free), then check the words again |
| In step at the start, further off as the video goes | A clip's speed changed, or clips were reordered, after the hearing | The same |
| Off over one clip only | That clip was trimmed or replaced | The same |

`get_video` shows all of these as `captions.status: "out_of_date"`.

## 8. Never hold the video back for its captions

A caption failure is not a failed video.

- Nothing is said: no captions (it was refunded). Offer a voiceover or the hook alone.
- Captions failed, and failed again on the one retry the person agreed to: take them off
  (`remove_captions`), export the video without them, and say why in one line.
- Route B failed on captions: offer the video as it was, with route A or no captions.

## 9. What to say in one line

Under the delivery card, only when true:

- the look you used because nobody named one (and that the brand keeps it from now on);
- captions heard from the speech with nothing to check against: a quiet word may be missing;
- lines changed to the script's spelling or words;
- a language whose letters the look may not draw (section 6);
- captions left off, and why (section 8).

## 10. When another skill calls this one

A production skill (a talking video, a faceless video, a video edit) may hand you its video at
the end.

- That skill owns the intake, the price question and the delivery. It passes the look (its own,
  or the brand's): ask the person nothing. With no look passed, use Hormozi and say so.
- Write the captions inside the yes it already got, check them (sections 3 to 6), and hand
  back: the status, the lines you fixed, the one-line notes (section 9), and any failure with
  its reason. Export only when the calling skill asked for it.
- Never post, never delete the original, never touch another video.
