# Reading the signals

What each number the competitor tools give means, and what it does not.

## Contents

- [1. A post's breakout](#1-a-posts-breakout)
- [2. An ad's days running and versions](#2-an-ads-days-running-and-versions)
- [3. Patterns, not single items](#3-patterns-not-single-items)
- [4. What the plan shows](#4-what-the-plan-shows)
- [5. What not to conclude](#5-what-not-to-conclude)

## 1. A post's breakout

`times_their_usual` is the post's views over the median views of the same account's recent
posts. 4.2 means four times what that account usually gets.

- It is measured against the account's OWN usual, so a small account's 9x counts as much as a
  big account's 9x. That is why the list is in this order and not by raw views.
- From 1.5 it is worth a look, from 3 it is a breakout, past 10 it is rare: say "over 10 times
  their usual" rather than the exact figure.
- A post from the last two weeks says more about now than one from two months ago. Give the
  date with it.
- `views`, `likes` and `comments` are as last read (every 4 hours); call them "about".

## 2. An ad's days running and versions

- **Days running** is the strongest signal of an ad that works: a competitor keeps paying for an
  ad that pays back. Past 21 days is a proven ad; past 60 is a pillar of their advertising.
- **Versions** is how many versions of one ad they run (the same creative with other text, or
  the reverse). Many versions means they are testing that angle hard.
- **New** (`is_new`) is an ad first seen in the last scan: what they are trying now. A new ad
  has not proven itself yet; say "just launched", not "working".
- The same competitor with several long-running ads in one format (a talking video, a screen
  recording, a static image) shows the format that works for them.

## 3. Patterns, not single items

One post or one ad is an anecdote. Say a pattern only when several items share it:

- "4 of their 6 longest-running ads open with a question to camera" is a pattern.
- "Weave posted a video that did well" is an anecdote: give it only as an example of a pattern,
  or as one of the three things that matter, with its numbers.
- Count what you see: hook types (a question, a bold claim, a before and after, a reaction), the
  call to action (`cta`), an offer in the words (a free trial, a discount, a price), the format
  and the length.

## 4. What the plan shows

`list_competitor_ads` returns the ads the workspace's plan shows (`cap`) and says how many more
run (`hidden`). Read and count only what it returned, and say so: "of the 20 ads your plan
shows". The answer's own line names the plan that shows more; pass it on as it is.

## 5. What not to conclude

- Not their revenue, budget, sales or conversion: the tools give none of it.
- Not why an ad works: say what it does (opens on a question, shows the product in the first
  second) and mark any reason as your reading.
- Not that a competitor stopped advertising because no new ads came in: the ads are as of the
  last scan.
- Not a competitor's plans or intentions.
