# Test design

How to set up a set of versions so the result teaches something, and how to help the person run
and read the test. The person's audience decides the winner; you design a fair race.

## Contents

1. [The control](#1-the-control)
2. [One change per version](#2-one-change-per-version)
3. [What to test first](#3-what-to-test-first)
4. [How many versions](#4-how-many-versions)
5. [Names](#5-names)
6. [Running the test](#6-running-the-test)
7. [Reading the results](#7-reading-the-results)
8. [The next round](#8-the-next-round)

## 1. The control

- The original is part of every test, under the code `00`. Each version is compared with it.
- The winner is usually already posted. As ads, the original runs as one of the ads, beside the
  versions. As organic posts, its own first days are the baseline: post only the versions, and
  compare the same span after posting.
- When the versions get finishing the original lacks (a hook line, captions), the control gets
  the same finishing as its own row. Otherwise the test measures the finishing.

**A matching control.** Some rows change more than their one thing, and then the original is not
a fair control for them. Offer a control made the same way with nothing changed, as its own row,
and say in the plan which rows it is the control for:

| Rows | What else changes | Matching control |
|---|---|---|
| Product (Reshoot) | Every frame is filmed again | A plain Reshoot of the source, `<base>_00_reshoot` |
| Spoken lines, when the original voice is not the avatar's | The voice | The original words through the same speech and lip sync, `<base>_00_revoiced` |
| Outfit, when the source does not show this avatar | The person | A plain Replace with no outfit, `<base>_00_replace` |

Product rows can also be compared only with each other: they share the same re-filming.

## 2. One change per version

- Each version differs from the control in one thing only. Then a win can be traced to it.
- A version that changes two things (a new avatar AND a new hook) can win, but nobody can say
  why. Build one only when the person asks, and label it "combined".
- Lists are paired one to one, never multiplied. Three avatars are three versions.
- Keep everything else equal: the length, the post caption, the hashtags, the posting hour, the
  account, the audience and budget of an ad.

## 3. What to test first

| Round | Test | Why first |
|---|---|---|
| 1 | The hook | The first seconds decide if the rest is seen. The cheapest change, the biggest swings. |
| 2 | The presenter (avatar) | The face the audience trusts carries the message. |
| 3 | The offer, the lines, the product | What is said and shown, once people stay to hear it. |
| 4 | Voice and language | Mostly for new markets and new audiences. |
| 5 | Caption look, end text | Small effects; worth it once the big ones are settled. |

A person can start anywhere. When they ask for "variations" with no direction, propose hooks.

## 4. How many versions

- 3 to 5 versions plus the control per round.
- Every version needs its own audience. Organic posts spread over days; ads split one budget.
  Fewer versions give a clear answer sooner.
- More than 6 asked for: suggest the strongest 4 now and the rest as round two.
- Hooks and caption looks are cheap; avatars and products cost the most per version, new speech
  sits between. Say this in one line when the person picks a large number of the costly kind.

## 5. Names

Every version gets a name that says what it tests, used everywhere: the plan table, the Video
Studio `title`, the delivery list, and the ad name if they run it as an ad.

`<base>_<code><n>_<label>`

- `<base>`: the winner in two or three lowercase words with hyphens: `glow-serum`.
- `<code>`: H hook, A avatar, O outfit, P product, L lines, V voice, T language, S caption look,
  E end text. `00` is the control (no number after it).
- `<n>`: 1, 2, 3 within that code in this batch. Round two continues the numbers (H4, H5).
- `<label>`: one or two words for the value: `problem`, `jade`, `mango`, `spanish`, `karaoke`.

Examples: `glow-serum_00_control`, `glow-serum_H2_question`, `glow-serum_A1_jade`,
`glow-serum_T1_spanish`.

In the chat, say the readable form: "H2, the question hook".

## 6. Running the test

**In Creatorline.** One post per version with `create_post`: the version's asset, the SAME
`caption` and `hashtags` for every one (the original's, when the person has it),
`made_with_ai: true`. They land in the review queue in the order created; the queue does not
show the names, so give the person the list in that order. Publishing and timing go through
`creatorline-publish`, with its own yes.

**Organic posts.** Same account, same hour, one version a day. A control with new finishing
(captions or a hook line the original lacked) is a new video too: post it like a version.
Posting near-identical videos on one account on the same day can make the platform show each of
them to fewer people. The posting days should be alike (no holiday against a weekday).

**As ads.** Every version as its own ad in one ad set, with the same audience and an even budget,
named with the version's name. The MP4 links are in the delivery list; the files also stay in
the brand's library in the app (https://app.creatorline.io/library).

Never present an avatar's video as a real customer's review, in the post or in the ad (house
rules, safety).

## 7. Reading the results

What to compare, version against the control:

| Measure | Tells you |
|---|---|
| Views in the first hours, and how many watched past the first 3 seconds | Whether the hook stops people |
| Average watch time, or the share who watched to the end | Whether the rest holds them |
| Clicks, saves, shares, follows, sales | Whether it does the job the video is for |

- Compare over the same span after posting (the first 48 hours of each, say).
- Wait until each version has a fair number of views (around a thousand or more for organic
  posts) before calling it. A few percent apart on small numbers is chance.
- The numbers for posts made through Creatorline are on the Analytics page
  (https://app.creatorline.io/analytics, with `?activeBrand=<brand id>` so the right brand
  opens). If the page is locked, it is not on the workspace's plan.
- Say what the numbers show, never what they will do: "H2 held more viewers past 3 seconds",
  not "H2 will go viral".

## 8. The next round

- The winner becomes the new control. Write the lesson in one line ("problem-first hooks beat
  questions for this audience") and offer the next rung of the ladder on the winner.
- A big surprise win: test it once more before rebuilding everything on it.
- No clear winner: the change did not matter to this audience. Keep the original and test a
  bigger change.
- Offer to save the winning recipe as a workflow for future videos (`creatorline-workflows`).
