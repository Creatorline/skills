# Checks

The gates a faceless video passes, in order, the script check before anything is priced, what
to do when a run fails, and the last look before delivery. A gate that fails stops the run at
that point: fix what it names, and only that, then pass it again.

## Contents

1. [The gates in order](#1-the-gates-in-order)
2. [The script check](#2-the-script-check)
3. [The rewrite pass](#3-the-rewrite-pass)
4. [Before the pictures, before the motion, before the finish](#4-before-the-pictures-before-the-motion-before-the-finish)
5. [A finished shot is final](#5-a-finished-shot-is-final)
6. [When a run fails: the retry ladder](#6-when-a-run-fails-the-retry-ladder)
7. [Picture story checks](#7-picture-story-checks)
8. [The last look](#8-the-last-look)
9. [Saying what went differently](#9-saying-what-went-differently)

## 1. The gates in order

| Gate | Passes when |
|---|---|
| 0. Intake | Format, look, topic, length, pictures, captions, cover, mascot and voice are all answered or defaulted ([intake.md](intake.md)) |
| 1. Script | The script check (section 2) passes; then the rewrite pass (section 3) |
| 2. Price | One yes for the whole video (narration-and-assembly.md, section 4) |
| 3. Look reference | It exists and shows the look ([visual-style.md](visual-style.md), section 3) |
| 4. Roster | Every figure, place, second angle and prop the script uses is made. A shot is never made before the asset it needs |
| 5. Pictures | Every shot picture passes [visual-style.md](visual-style.md), section 13 |
| 6. Narration | Exactly N takes, each passing the measure (narration-and-assembly.md, section 6), one voice |
| 7. Assembly | The last look (section 8) |

## 2. The script check

Run it on your own script before you price it. Rewrite only the lines it flags, then run it
again.

**Lines**

- [ ] Exactly N blocks (length / 10, rounded half up, at least 3).
- [ ] Every line 20 to 23 words (a block that measured long may go to 17 to 19), at most two
      sentences.
- [ ] No digits in any line: numbers in words.
- [ ] No run of five or more words appears in two blocks.
- [ ] Block 1's first sentence is 8 words or fewer (Explainer, History, Top-N).
- [ ] Every number, date and name has a source (full URL) or is marked for the person to check.

**Shots** (Animated and Stock footage)

- [ ] Every shot has a size and an angle, and the two differ from the shot before.
- [ ] A wide establishing shot opens only the first block in a new place.
- [ ] Over the shoulder only with a named figure in the foreground.
- [ ] No shot description of 8 or more words repeated word for word.
- [ ] No two blocks with the same place and the same assets in the same order.
- [ ] At most 2 blocks in a row in one place.
- [ ] At most 7 references per shot picture.
- [ ] The thread object is in every block, in a new state.
- [ ] Every shot stages a noun its block's line names.

**Shape**

- [ ] The arc is there: cold open, stakes, building blocks, a turn, a payoff.
- [ ] The thread is chosen, grows in one direction and resolves in the payoff.

## 3. The rewrite pass

Before you show the script, read it as the viewer:

- The hook works with no context at all.
- Every number traces back to the research.
- One idea per block, and every shot serves it.
- The building blocks escalate: swapping two of them loses something.
- The turn surprises; it is not a summary.
- The kicker echoes the hook and resolves the thread.
- Line lengths and the humor fit the format's tone.
- No recurring action beat back to back, or more than twice.

## 4. Before the pictures, before the motion, before the finish

- **Before any shot picture:** the look reference and the whole roster exist.
- **Before any motion (Animated):** the look reference, N lines, every shot picture, one voice
  and N passing narration takes. The narration goes first so a line that must change is fixed
  before motion is paid for.
- **Before captions and export:** every shot in place in order (no missing or duplicate shot
  ids), every block 10 seconds, every voiceover centred in its block.

## 5. A finished shot is final

Redo a shot only when its run failed or when it breaks a named check: off the look compared with
the roster, words or a recognizable face in the picture, the wrong frame, a figure that does not
match its roster picture, a still opening on a moving take. Collect the whole wave before
deciding on any redo. Never redo a shot because another take might be nicer. A paid redo of a
shot that succeeded is quoted and asked for (house rules, section 2).

## 6. When a run fails: the retry ladder

A failed run is refunded. For one picture or take that fails:

1. Attempts 2 and 3: the same call again, unchanged.
2. After that: change the shot's framing or staging.
3. About 8 attempts on one shot: stop. Tell the person which shot failed and what was tried.
   An Animated shot then drops out (narration-and-assembly.md, section 7, step 5); a Picture
   story frame takes the frame before it for its slot.

- A run refused by the content check is not retried: tell the person which shot it was and
  offer another picture for that beat.
- The references stay the same on every attempt.
- Never drop a whole block, leave a gap, or put a neighbour's picture in a failed shot's place.
- The look reference failing the whole ladder stops the run: nothing is made without it.
- Retrying a failed item of the approved video spends nothing extra: it was refunded and is
  charged once, when it succeeds. Narration retakes follow their own limit of 3 per line
  (narration-and-assembly.md, section 6).
- A run with no change of status for 20 minutes: stop waiting, tell the person which part is
  stuck, and ask them to check back. Never loop silently, and never start it twice.

## 7. Picture story checks

Before `export_video`, from `get_video`:

- [ ] Frames are in slot order, `f001` upward, with no gap and no number twice (a frame placed in
      the order it finished is the most common assembly mistake).
- [ ] Every frame is the 2:3 picture of this run (a frame in another shape means a roster
      picture slipped in).
- [ ] No frame is on screen longer than 1.5 seconds.
- [ ] The frames add up to the narration's length within 1.5 seconds.
- [ ] At least the narration's seconds divided by 1.5 frames, and the variations really differ
      from each other by their one detail.
- [ ] Every variation is an edit of the frame before it. Variations that look like separate
      photos of the moment mean roster pictures were attached: make them again as edits.

## 8. The last look

- [ ] One video, from one Video Studio project, never parts or loose clips.
- [ ] N blocks, complete and in order; the length is N x 10 seconds within a second (Picture
      story: the narration's length).
- [ ] Every shot in the look of the look reference; every figure matches its roster picture.
- [ ] No figure talks or moves its lips; no words inside a picture.
- [ ] One voice, a narration line in every block, each centred in its block, and the video
      opens moving from its first second.
- [ ] `get_video`: no `warnings`, every voiceover `ready`, `captions.status` `ready`.
- [ ] Captions: the script's words, names and numbers spelled right, clear of the subject.
- [ ] `preview_video` with `show_safe_area: true`: titles and labels clear of the covered bands
      and of the captions row.
- [ ] The cover, when made, comes from this run's look reference.
- [ ] No brand, studio, film, comic or creator name anywhere in what was made.
- [ ] `export.status` is `done` and `export.up_to_date` is true.

## 9. Saying what went differently

Never deliver a lesser result silently. One line each, when it happened:

- the captions could not be written, so the video has none;
- there was no music track, so the video has narration alone;
- a shot dropped out after its retries, so its block has four shots;
- a narration line could not be fitted after three tries (which one, and its length);
- the cover's words came out wrong, so the cover has none.

Never say a run is progressing when nothing is running, never give a time estimate you do not
have, and never say the person approved something they were not shown.
