# Review, retries and repairs

Every check an episode passes, in the order they come up, then how to retry, how to repair, and
the full failure table. SKILL.md carries the short list.

## Contents

1. [The gates in order](#1-the-gates-in-order)
2. [Before any spend](#2-before-any-spend)
3. [Script integrity](#3-script-integrity)
4. [Brief self-check](#4-brief-self-check)
5. [Checking a finished part](#5-checking-a-finished-part)
6. [Trims and words](#6-trims-and-words)
7. [Build readback](#7-build-readback)
8. [The frame review](#8-the-frame-review)
9. [The final checks](#9-the-final-checks)
10. [Creative review](#10-creative-review)
11. [Repairs](#11-repairs)
12. [Retries](#12-retries)
13. [Lost answers and interruptions](#13-lost-answers-and-interruptions)
14. [Saying what was checked](#14-saying-what-was-checked)
15. [If it goes wrong](#15-if-it-goes-wrong)

## 1. The gates in order

| When | Gate | Section |
|---|---|---|
| Before the quote | The tools are there; the script is whole | 2, 3 |
| Before each paid call | The brief or prompt passes its self-check | 4 |
| Part 1 done, then each part | Same host, outfit and set; the right length | 5 |
| After captions | Every word is there; trims are safe | 6 |
| After the build | The video matches the picture plan | 7 |
| Before export | Frames, safe areas, seams, then the final checks | 8, 9 |
| Before delivery | Creative review; what was and was not checked | 10, 14 |

## 2. Before any spend

- Your tool list has what the flow uses: `create_generation`, `get_generation`,
  `create_video`, `edit_video`, `write_captions`, `run_video_ai`, `preview_video` and
  `export_video` (plus `create_workflow` and `run_workflow` for studio takes). One missing:
  say what cannot be done and stop before any quote. Never improvise a missing step with
  another paid tool.
- `list_models` with `tool: "ugc-video"` once: the take's duration range and its slots. Never
  rely on remembered limits.
- Music the person called required is in the library before anything is spent
  (supplied-media.md, section 8).

## 3. Script integrity

- Joined in order, the parts' lines are the whole script: every word once, nothing added,
  nothing reordered, no second copy anywhere.
- A script the person gave stays word for word through the cut into parts, the briefs and the
  edit. Only a line that breaks the house rules changes, and you say which and why.
- A fact about the world you could not back (a number, a headline, a date) is out of the
  host's mouth and off the screen, and listed for the person in the plan.

## 4. Brief self-check

Before each part's paid call, read its brief once more:

- its lines are its share of the script, complete and in order;
- its opening framing is one size wider than the last part's ending (host-continuity.md,
  section 7);
- every input is in the right slot and named in the brief (`@Avatar1`, `@Location1`,
  `@Object1`), and the duration is inside the range `list_models` gave;
- the continuity lines are word for word the kit's;
- no placeholders left, no ids, no part numbers, no notes to the person, and no word about
  captions, texts, cards, cutaways or split screens.

Studio takes have their own check (studio-takes.md, section 12).

## 5. Checking a finished part

`preview_assets` on the part's output next to part 1 (and the set photo). Look in this order;
the first one drifts first:

1. Hair: the same volume and texture. A change here is the first sign the model is drawing the
   host from words.
2. The face: its weight and shape, the head against the neck.
3. The outfit: the same garments.
4. The set: the room from the set photo, its light.
5. Nothing extra: no text, no camera gear, no second person.

Then `duration_sec` against the planned `duration`. The words are checked from the captions
(section 6). Part 1 passing is what lets the other parts film without a question.

## 6. Trims and words

- Every trim keeps 0 ≤ `trim_start` < `trim_end` ≤ the clip's `source_duration`, and every
  word the part must say stays inside it.
- Trim only idle air at the start and end: keep the first sound, the last word's tail and the
  pauses inside. Never change a clip's `speed` to make the episode fit.
- A word the captions misheard: fix the caption (`edit_caption`), never the script, and never
  re-film for it.
- A line the host really left out or garbled: that is a take defect (section 12).

## 7. Build readback

After the build, read `get_video` against the picture plan, row by row:

- every planned id is there, over the right clip, starting on its anchor's line;
- the host clip is live under every layer, and no layer hides the face for longer than the
  plan says;
- each item has a real time on screen (at least its hold, section 5 of picture-plan.md), and
  items of a list each start on their own words;
- when an item ends, the picture is what the plan meant.

The readback proves places and times. Only pictures show clipped words, overlaps and wrong
looks: section 8.

## 8. The frame review

`preview_video` takes up to 9 moments a call (`at`); call it as often as needed:

- for each treatment: its first moment, its middle and its last;
- every seam, 0.3 s before and after;
- the first second, and the sign-off;
- once with `show_safe_area: true`.

`exact: false` means a clip is shown by its cover frame: judge places, overlaps and
readability, not what the host is doing. You cannot hear the video: speech, the voice match and
any music are checked by the person in the studio when they matter.

## 9. The final checks

`get_video` before `export_video`:

- `ready_to_export` is true and `warnings` is empty (a "Nothing is heard" warning means every
  sound is off);
- `captions.status` is `ready`;
- the length is what the measured cut gives, under 180 s. Never pad, speed up or cut words to
  reach a target length; report the real one.

After the export: `export.status` is `done` and `up_to_date` is true. The frame is always
1080 x 1920. Frame rate and bit depth cannot be read here: never claim them.

## 10. Creative review

Seven questions, answered with a reason each:

1. Attention: at every moment, is the right thing owning the picture (picture-plan.md,
   section 2), for a reason of meaning?
2. Value: does each treatment tell the viewer something the words alone do not?
3. Action: does each item do what the plan says it does on screen, not just carry a label?
4. Progression: do recurring things (labels, cards) build as the episode goes on?
5. Contrast and restraint: do the quiet stretches have a reason?
6. Coherence: does it read as one episode in one style?
7. Fidelity: is it what was promised, made the way the tools allow?

- An episode with no cutaways: test it against the strongest picture you rejected.
- Every failure gets a named, beat-specific fix ("a card of the real invoice on 'the fee
  nobody checks'"), never "more motion".
- Counts are hints, not limits. One review round; never pay for a new take to settle a matter
  of taste.

## 11. Repairs

- Collect every concrete defect first, then fix them together in one `edit_video` call.
- Look again at what changed and at the seams next to it. Look wider only when clips, shared
  items or the timing of the whole video changed.
- A preview taken before a change never clears the video after it.

## 12. Retries

- Never start a part again while it is `queued` or `processing`, or after it succeeded: read it
  with `get_generation` first.
- A call refused before anything started (a wrong value, a missing input): fix the cause and
  send that one call again.
- A part that FAILED was refunded. Run it once more, corrected if the error says why: the
  yes still covers that part. Say so in one line. A second failure needs the person.
- A part that finished with a real flaw (a different face, missing or garbled words, the room
  changed) is a replacement: say what is wrong and what you will change, quote it, and wait for
  a yes. Keep the first take. Put the
  new one in its place (`replace_clip`), then hear the captions again and re-time what sat
  over it.
- Never re-film for a caption that misheard a word, or because an answer came back without a
  link: read it again, or find it with `list_assets`.
- Change one thing per retry. After three paid tries at the same part, stop and offer: keep the
  best take, change the idea, or cover the line another way (assembly.md, section 11).

## 13. Lost answers and interruptions

- A paid call that gave no answer may still have started. Never send it again blind: wait, then
  look for the take with `list_assets` (`brand_id`, newest first) or for the video with
  `list_videos`. Never make up an id, a link or a status.
- A part that failed does not undo the parts that succeeded.
- After a break in the conversation, read what this conversation already holds (the tool
  answers, the picks the person made) and the brand's newest videos and assets before doing
  anything again. Never re-run something to rebuild what you lost track of.
- Say the person's picks back in plain words as you go ("Set: the oak desk, style: Minimal"),
  so the state is in the chat, not only in tool answers.

## 14. Saying what was checked

- Name what you checked and how ("cover frames of all parts", "frames at every seam") and what
  you could not ("I can't hear the voice match").
- Never call something reviewed that you did not look at, never call your check independent,
  and never give a link, an id or a number you did not get from a tool.
- The person may accept an episode with a known limit; say the limit plainly.

## 15. If it goes wrong

| What you see | Why | Fix |
|---|---|---|
| A part shows a different face, hair or outfit | Each part is its own render | Section 12; meanwhile cover the seam with a cutaway. If it repeats: a shorter part, fewer actions, or the stronger lock (host-continuity.md, section 11) |
| The room or light changes between parts | No set photo, or the set words differ | The same set photo in `location`, the same set and light sentences |
| The set has a person in it, and the host turned into them | The set photo was not empty | A new, empty set photo; re-film |
| Parts sound like different people | Every take makes its own voice | Voice match every part (`run_video_ai`, `change_voice`, the same `voice_id`) |
| The voice match sounds garbled | Music or a second voice in the take | Re-film the part with "voice and room sound only" and the host alone |
| Lines reworded, cut or rushed | Too many words for the seconds | More seconds (the duration rule); for exact words, the voice-first route |
| Delivery slow and stretched | Too much silence in `duration` | The duration rule: 0.4 s of air, not more |
| A prop appears from nowhere or floats | Takes show only props the set photo shows | Put it in the set photo, or drop it from the brief |
| The product took the host's place | Inputs named or slotted wrong | Fix the names and slots (host-continuity.md, section 4); re-film |
| Product failures | | supplied-media.md, section 6 |
| The music drowns the host | `set_sound` is not turned down under speech | `remove_sound`, or a quieter track |
| Captions show `out_of_date` | The clips changed after captions | `write_captions` again (free), wait for `ready` |
| A text or cutaway sits on the wrong words after a trim | Texts, layers and voiceovers keep their times | Re-time from the new caption lines (`update_text`, `update_layer`), then preview |
| "Add a clip first" | A text or layer came before any clip in the call | Put the `add_clip` operations first |
| Export refused | Something is generating or captions are being written | `get_video` until nothing runs, then export |
| "being changed somewhere else, nothing was saved" | The person is editing the same video | `get_video`, redo the change; ask them to close the editor while you work |
| A second copy of the episode | `create_video` was sent twice | `list_videos` before retrying; remove a copy only with a yes (`delete_video`) |
| A supplied intro runs the wrong length | Its length was guessed | Read `source_duration` from the answer |
| A file they gave is missing from the episode | It was never given a route | Section 4 of supplied-media.md: place it or name the reason |
| A whole clip plays where a moment was meant | No window chosen | `trim_start` and `trim_end` per beat |
| The episode grew longer than planned | Extra material added without a slot | Take it out, or ask for the extra seconds |
| Cutaway sound fights the host | A layer with sound on | `update_layer` `sound: false` |
| The episode runs over 180 s | Video Studio's limit | Cut a part, or make two episodes |
| A part with a real person's face | The default model is for AI faces | With that person's consent, the real-face route: video-briefs.md, section 12 |

A failed run is refunded automatically (house-rules.md, section 5).
