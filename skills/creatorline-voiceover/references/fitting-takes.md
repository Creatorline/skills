# Fitting takes

How to make spoken words fill the seconds they are given, measure what came back, and decide
when a take passes. The length of a read is set by its words, so all the fitting happens in the
words, before and between takes. Every take is a paid run.

## Contents

1. [When fitting applies](#1-when-fitting-applies)
2. [Two ways to fit](#2-two-ways-to-fit)
3. [The bands a take must land in](#3-the-bands-a-take-must-land-in)
4. [Writing to the window](#4-writing-to-the-window)
5. [Locking the voice](#5-locking-the-voice)
6. [Measuring a take](#6-measuring-a-take)
7. [When a take misses](#7-when-a-take-misses)
8. [Scripts longer than one take](#8-scripts-longer-than-one-take)
9. [The per-line report](#9-the-per-line-report)
10. [When another skill calls this one](#10-when-another-skill-calls-this-one)

## 1. When fitting applies

Fitting is for words that have a window: a video's clips, a total length the person named ("a
30-second read"), or windows another skill hands over. Without a window there is nothing to
fit: long text, a chosen voice, or "just give me one audio file" is read once at its natural
length, and you report how long it came out.

## 2. Two ways to fit

| The windows | Way | Takes |
|---|---|---|
| Fixed: lines must land on cuts that cannot move (a real video's own cuts, footage that must keep its length, a line per clip on clips that must not change, windows another skill gave you) | **Per window** | One voiceover per window (`over` its clip, or `start`), each measured and fixed on its own |
| Flexible: photos, b-roll that can be trimmed, or only a total length asked | **Continuous** | One voiceover for the whole script, measured as one track; the visuals are fitted to it for free |

- Continuous is the default: one take is one price, and the cuts move to the voice for free.
- Per window costs one take per window: quote them all before the first one runs.
- In both ways the take must also pass the pause, pace and voice checks (section 3).

## 3. The bands a take must land in

For a 10-second window, the speech in the take (not the file around it) is judged like this:

| Speech | Share of the window | Verdict |
|---|---|---|
| 7.8 to 9.5 s | 78 to 95 % | Pass |
| 7.2 to 7.8 s | 72 to 78 % | Accept only after one retry has failed to reach the pass band |
| Under 7.2 s or over 9.5 s | Under 72 % or over 95 % | Fail: rewrite |

- Any other window uses the same shares: a 4 s window passes at 3.1 to 3.8 s of speech, a 30 s
  read at 23.4 to 28.5 s. A short last window of a video is scaled the same way.
- Keep the band this wide. Takes of the same words tend to come back in clusters about a second
  apart, so a narrow target (9.4 to 9.8 s of a 10 s window) falls between two clusters and burns
  retries.
- A take also fails, whatever its length, when:
  - it holds a silence of 0.8 s or more inside the speech (it sounds "pausey");
  - it runs over 2.9 words a second of speech (it sounds rushed);
  - it is in another voice than the locked one (section 5), or, for a voice line, made with
    another `model_id`.
- Continuous: the gate is the whole track against the target length, in the same shares, plus
  the pause, pace and voice checks.

## 4. Writing to the window

- **Start at 20 to 23 words per 10 seconds** of window. For an excited or kid-like delivery, 17
  to 21. Scale with the window (writing for voice, section 1, has the table).
- **At most two sentences per window line**, few commas, numbers written as words.
- **Count the dead air before you submit:**

| Mark | Silence it adds |
|---|---|
| A full stop | About 0.7 s |
| A comma | About 0.5 s |
| A performed tag (`[laughs]`, `[sighs]`, `[pauses]`) | About 1 s |

- **Words set the length, nothing else.** `add_voiceover` has no speed control, and the voice
  line's `params.speed` is never used to fit a window: no faster read, no stretching, no pitch
  change.
- **Mood comes from the words**, the job's one opening tag (section 5) and at most one feeling
  tag per sentence. Never from switching voices partway through a job.

## 5. Locking the voice

- Decide the voice once and name it in the plan: the avatar's `voice_id` (`get_avatar`, or
  `get_brand` for the default avatar), or the one the person picked. That choice is the lock.
- Before every take, take the `voice_id` from one place, never from memory: before the first
  take, `get_avatar`; after it, the first voiceover's `voice_id` in `get_video`.
- A voice settled in this conversation is not offered again. When a voice fails, do not swap in
  another on your own: tell the person, and let them pick.
- **One opening tag for the whole job, or none.** If the first take opens with `[cheerfully]`,
  every take of the job opens with exactly `[cheerfully]`. A line's own mood is one more tag
  inside the line. Use only the tags the video guide lists (writing for voice, section 4).
- Mixed voices across the takes of one video is the failure people notice first. Check every
  take's `voice_id` in `get_video` against the lock.
- The avatar has no voice and `list_voices` is down: leave `voice_id` out (the brand's default
  voice reads it) and say so in one line.

## 6. Measuring a take

| What | Where to read it | What it is worth |
|---|---|---|
| Take length | `end` minus `start` of the voiceover, in the `add_voiceover` answer or `get_video`; a voice line's `duration_sec` | The file's length. It can carry a short silence at each end, so judge a take within a few tenths of a band edge by its speech span when you have one |
| Speech span | `captions.lines` that fall inside the voiceover: the first line's `start` to the last line's `end` | Real speech, with no silence around it |
| Pauses | Between two lines inside the take: the next line's `start` minus this line's `end` | 0.8 s or more is a failing pause. Lines also break at shorter pauses (over about half a second), so a break alone is no failure |
| Pace | Words heard in the take divided by its speech span | Over 2.9 a second fails |
| Words | The heard words against the take's `text`, feeling tags removed | A missing or extra word means the read did not follow the text |

- Speech span, pauses, pace and words come only from captions: `write_captions` hears the
  voiceovers with real word times. Use them when captions are part of the plan (most narrated
  videos), or when the person agreed to pay the captions' one charge to check the read.
- Write the captions after the takes, read the numbers, and fix. A re-taken voiceover leaves
  the captions `out_of_date`; writing them again is free.
- A clip's own speech in the same seconds is heard too: measure a take only where it speaks
  alone.
- Without captions, never invent these numbers. Judge on the take's length, and say in one line
  that pauses and words were not checked.

## 7. When a take misses

| The take | Rewrite |
|---|---|
| Too long | Cut words or drop a clause; keep the meaning |
| Too short | Add real content (a fact, a reason, a number), never filler |
| Pausey | Make it one flowing clause: fewer full stops, no `[pauses]` |
| Too fast | Fewer words |
| Wrong voice, garbled, or the run failed | The same words again: the only case where identical text is resubmitted |

- New word count for a length miss: the old count times the band's middle (86.5 % of the window)
  divided by the measured speech.
- Never send identical words again to chase a length: they come back at about the same length.
- At most three attempts per line, and the third with changed words. Then stop and report the
  line, its attempts and its measurements (section 9). Never present the best failing take as a
  pass; it stays on the video only if the person says so.
- Takes that passed are frozen. Only failing lines are taken again: `add_voiceover` with that
  voiceover's `replace_id`.
- Continuous: at most two rewrites of the whole script, each rescaled by target over measured.
- Every new take is paid: quote it and ask. A yes to a retry budget you stated up front covers
  the retries inside it.
- A take still `generating` with no change for 20 minutes: stop waiting, report which lines are
  pending, and never start them again.

## 8. Scripts longer than one take

- One voiceover reads up to 2000 characters, a little over two minutes.
- Longer: split at paragraph ends into as few parts as possible, about 1800 characters each, in
  the same voice with the same opening tag. Place them back to back in reading order: each part
  `start`s at the previous part's `end`.
- Measure the whole as one track, the first `start` to the last `end`, against the target.
- One audio FILE over 2000 characters cannot be made here: a voice line holds 2000. Give the
  parts as separate files in order, or make the read a voiceover on a video.

## 9. The per-line report

For a per-window job, keep one row per line:

| Line | Window | Words now spoken | Measured | Verdict | Attempts |
|---|---|---|---|---|---|
| 1 | 0 to 3.5 s | "Three cold brew mistakes." | 2.9 s | Pass | 1 |
| 2 | 3.5 to 7 s | "One: hot water. It turns it bitter." (rewritten) | 3.1 s | Pass | 2 |

- Show the person only what changed: the lines whose words were rewritten, and any line that
  missed. The rest is one line: "All six lines fit their clips."
- Mark a length judged without captions as "length only" (section 6).
- The words now spoken are the script from here on: on-screen texts, the post caption and the
  captions must match them, not the first draft.

## 10. When another skill calls this one

Another skill (a faceless video, a host episode, a video edit) may hand you lines and windows.

- That skill owns the intake, the price question and the delivery. Ask the person nothing. What
  is missing goes back to it as one precise gap: "no words for window 3", "the avatar has no
  voice".
- Run inside the yes it already got. A retry outside that budget goes back to it to ask.
- Hand back the per-line report (section 9), the voiceovers placed, and the one-line disclosures
  (the default voice used, the original sound turned off, lengths judged without captions).
- Never show the result yourself, never add captions, never post.
