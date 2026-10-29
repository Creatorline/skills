# Edit checks

What to check on a `generate_video_edit` version after it lands, how to retry, and how to report the
set. The checks before the quote are in [edit-contract.md](edit-contract.md), section 10.

## Contents

1. [What the server already guarantees](#1-what-the-server-already-guarantees)
2. [What you check on every version](#2-what-you-check-on-every-version)
3. [Retries](#3-retries)
4. [The status line](#4-the-status-line)
5. [Failures and fixes](#5-failures-and-fixes)

## 1. What the server already guarantees

- **The length window.** A source outside 4.0 to 30.0 s is refused at the quote, with its
  measured length; nothing is charged. Never trim, loop, slow or freeze a source to fit on
  your own: say its length and offer the choices (SKILL.md, "When the source does not fit").
- **The sound.** An edit of a source with sound is delivered only with the source's own sound
  back on it, at the source's exact length. When that fails, the run fails and is refunded: a
  silent version of a source with sound is never delivered. A silent source gives a silent
  edit.
- **Faces.** A source with a real person's face is refused and refunded.
- **No silent take reaches the person.** You never see or show the raw take.

## 2. What you check on every version

1. **Length.** The output's `duration_sec` in `get_generation` matches the source's
   `duration_sec`: within 0.1 s, or the same whole second when both are rounded. Shorter or
   longer: the version failed this check; say so and do not post it.
2. **Frame.** `preview_assets` with the outputs' `asset_id`s (up to 8 a call, free): each cover
   has the source's shape (`ratio` from `list_assets` or `import_asset`).
3. **The edit is there.** On the cover: the new item where it belongs, the right one changed.
4. **No spread.** Look at the first second, the middle and the last second for the edit where
   it should not be: the new item on a head, in the background, twice; a part of the new item
   instead of all of it; a garment changed that nobody named; text that moved or changed.
   - Start with the first version alone: one Video Studio project with it as its one clip
     (`create_video`, free, titled `<base>_check`), then `preview_video` with `at` set to its
     first, middle and last second.
   - `exact: true`: these are its real frames. Add the other versions as clips to the same
     project and look at each the same way.
   - `exact: false`: you see the clip's cover, not those seconds. Stop there; say so, and tell
     the person which seconds to watch before posting: "Watch the first and last second of
     each: that is where an edit can spread."
5. **Sound.** Nothing to check: section 1. In the status line say "original sound kept", or
   "the source has no sound".

## 3. Retries

- **Only a version that failed** (status `failed`, refunded) is retried. Once, with the same
  prompt, the same images and the same settings, after a yes for its price (house-rules.md,
  section 5).
- **Finished versions are frozen.** Never remake one that passed.
- **A version still running is never started again.** Read it with `get_generation`; report
  it as waiting.
- **A delivered version that spread** is a new paid run with a changed prompt: apply
  edit-contract.md, section 5 (same kind, where it is and is not, how it is held, what it is),
  show the person what changes in one line, and ask before the retry.
- The same flaw twice: change one thing (a same-kind product, a whole-clip scope instead of a
  window, Reshoot for that version), and ask. After three paid attempts on one version, stop
  and offer the set without it.

## 4. The status line

One line under the list, every time:

```
3 asked · 2 done · 1 failed (refunded) · 0 waiting · 720p · source 12.4 s · original sound kept
```

- `waiting` counts versions still running: say you will check them when asked, and never
  start them again.
- A silent source: "the source has no sound" in place of "original sound kept".
- Rows made by other tools (a hook, a swap) count in the same totals.

## 5. Failures and fixes

| What happened | Why | Do |
|---|---|---|
| The new item also appears elsewhere (on her head, in the background, from the first frame) | The edit spread: a different kind, or no "where it is not" | edit-contract.md, section 5; offer a same-kind product or Reshoot for that version |
| The held item came out as part of the new one (one earcup, a cap without its bottle) | The prompt named the item but not what it is | Describe the whole item in a few plain words, and how it is held |
| The wrong item changed | The anchor fit two things | Name it by place, colour and hand; settle it in the mapping question |
| Untouched text changed or moved | The text block missing, or the text was part of the target | Check the prompt against edit-contract.md, section 10; retry |
| A garment nobody named changed | The prompt described the clothes | Name only the garment asked for |
| Refused: AI faces only | A real person's face in the source | Refunded. Product: Reshoot with the product. Person: Character Swap. |
| Refused for its length | Outside 4 to 30 s; the message has the measured length | Offer a cut made first in Video Studio, or edit-only rows |
| "The source video could not be read" | The file link or upload is broken | Bring the source in again (`import_asset`, or the library), then quote again |
| "The edit was made, but the source video's sound could not be put back" | The sound restore failed | Refunded. Retry once, unchanged, after a yes |
| "The edit came back empty" | Refused by the engine | Refunded. A real face: as above. Otherwise retry once, then change one thing |
| The spoken lines still name the old product | The source's sound is kept as it was | Offer Reshoot (rewrites the lines), or a lines version on top (variant-recipes.md, section 11) |
