# Captions

How to write the words that go out with a post: the caption, the hashtags and a YouTube title.
The video carries the content; the caption makes people stop, find it and act on it.

## Contents

1. [The shape](#1-the-shape)
2. [The first line](#2-the-first-line)
3. [The body](#3-the-body)
4. [The call to action](#4-the-call-to-action)
5. [Hashtags](#5-hashtags)
6. [Words people search](#6-words-people-search)
7. [Per platform](#7-per-platform)
8. [The brand's voice](#8-the-brands-voice)
9. [The persona and disclosure](#9-the-persona-and-disclosure)
10. [Language and style](#10-language-and-style)
11. [Worked examples](#11-worked-examples)
12. [A first comment](#12-a-first-comment)
13. [Checklist](#13-checklist)

## 1. The shape

```
<first line: the hook, under about 100 characters>
<1 to 3 short lines: the one detail that makes it useful>
<one call to action>
```

Then 3 to 6 hashtags in `hashtags` (bare words, no `#`). The server adds them after a blank line
at the end of the caption, skips any tag the caption already holds, and counts them toward each
platform's limit.

Short wins. A caption is read in two seconds while the video plays. When in doubt, cut a line.

## 2. The first line

Most viewers see only the first line before "more". It decides whether they read on, comment or
search for more. It should continue the video's hook, not repeat the words already on screen.

| Pattern | Example |
|---|---|
| The payoff, named | "The 20-second fix for flat roots." |
| A number and a promise | "3 things that don't belong in a carry-on." |
| The viewer's problem, in their words | "If your serum pills under makeup, it's the order." |
| A take against the grain | "You don't need a 10-step routine." |
| The situation (POV) | "POV: the package finally came." |
| A question the video answers | "Why does iced coffee taste better at home?" |
| A tease of the last second | "Wait for the label." |

- The promise must be kept by the video. A first line the video does not pay off loses the
  viewer and their trust.
- Under about 100 characters, so it shows whole on a phone.
- Never: "Check this out", "You won't believe this", "Wait for it" with nothing at the end, a line
  in all capitals, a line that is only emoji.

## 3. The body

One to three short lines, each on its own line. Pick what helps the viewer most:

- how it is used ("Two drops, on dry skin, before moisturizer.");
- the avatar's opinion, in its own voice ("The one I keep reaching for.");
- what it is, in plain words ("A protein bar with 20 g of protein and no added sugar." only when
  the label says so);
- where or when ("Packed for three days in Lisbon.");
- the one step people get wrong.

Never retell the whole video. A fact about the product (what is in it, a number) comes from the
person, the label or the brand document.

## 4. The call to action

One, matched to what the post is for. With `brand_voice.call_to_action`, use it unless the post
is not about the product.

| Goal | Call to action | Example |
|---|---|---|
| Comments | A question people answer in a few words | "Morning or night routine?" |
| Saves | A reason to come back | "Save it for your next trip." |
| Follows | A next part that exists | "Part 2 tomorrow: the night routine." |
| Clicks | Where the link is | "Link in bio." |
| Sales | The offer exactly as the person gave it | "20% off with GLOW20 until Sunday." |

- "Part 2" only when a part 2 is planned. "Link in bio" only when the bio has the link: ask once
  if you do not know.
- No bait: "Comment YES and I'll DM you", "Like if you agree", "Tag 3 friends". Platforms show
  posts that beg for engagement to fewer people.
- Never invent an offer, a code, a deadline or a stock level.

## 5. Hashtags

3 to 6, chosen to describe the post, so the platform knows who to show it to.

| Kind | How many | Example |
|---|---|---|
| Broad: the category | 1 | `skincare` |
| Specific: the product type, the problem, the format | 2 or 3 | `vitamincserum`, `morningroutine` |
| The brand | 1, when the brand uses one | `glowlab` |
| A community or a moment the post truly belongs to | 0 or 1 | `booktok`, `backtoschool` |

- Instagram: at most 5. It prefers a few relevant tags.
- No filler that describes nothing (`fyp`, `foryou`, `viral`).
- No other brand's tag, no trend the post is not part of, no tag unrelated to the video.
- Letters, digits and underscores only, no spaces. `CamelCase` reads better for long ones
  (`MorningRoutine`).
- In the language people search in. A brand posting in Turkish for Turkey uses Turkish tags; an
  English category tag beside them is fine.
- Rotate the specific ones across posts. The same six on every post look automated.

## 6. Words people search

TikTok and Instagram search reads captions. In the first two lines, say in plain words:

- the product type ("vitamin C serum", not "this little bottle");
- the problem ("dry skin in winter");
- who it is for ("for beginners", "for small kitchens");
- the place when it matters ("Istanbul", "at home").

A keyword in the caption beats the same word as a hashtag. Write it naturally once; never stuff
a list of keywords.

## 7. Per platform

One caption usually serves every platform. Write a separate one with
`platform_settings.<channel>.caption` only when a platform needs it (Telegram's limit, a
YouTube description with more detail). `hashtags` are added to every platform's caption.

| Platform | Notes |
|---|---|
| TikTok | The first line shows over the video. Keywords matter most here. 2,200 characters. `made_with_ai: true` turns on TikTok's AI label. To add a sound from TikTok's own library, post it as a draft (`draft: true`): it lands in the TikTok app's inbox, where the person picks the sound and posts it. A photo carousel takes `auto_add_music` (on unless set to false) and `photo_cover_index` (which photo is the cover, from 0). |
| Instagram | About the first 125 characters show before "more". At most 5 hashtags. 2,200 characters. No AI label is sent from here: for a realistic avatar, offer a short "Made with AI." line in the caption. |
| YouTube | Video only. Always write a title in `platform_settings.YouTube.title`: at most 100 characters, the topic in the first words, no clickbait. The caption is the description, up to 5,000 characters. `visibility`: `public` (default), `unlisted` (only people with the link) or `private`. `made_with_ai: true` sets YouTube's synthetic-content flag. A vertical video goes out as a Short. |
| Telegram | 1,024 characters, hashtags included: the tightest limit. Hashtags are optional there. A link the person gave can go in the caption. |

YouTube title patterns: "How to <result> in <time>", "<Number> <things> for <who>", "<Product type>:
<the one surprising fact>". Never all capitals.

## 8. The brand's voice

`get_brand` returns `brand_voice` when the brand document has one. Use every field it has:

| Field | Use it for |
|---|---|
| `summary` | What the brand is: the caption never contradicts it |
| `tone` | The register: word choice, emoji or none, punctuation, formal or casual |
| `dos` | Follow each one |
| `donts` | Never write any of them. A don't is a hard rule, even when the person's draft has it: say so |
| `call_to_action` | The default call to action |
| `content_angles` | How the first line frames the post |
| `audience` | Who "you" is in the caption |
| `format_notes` | Any rule about captions, hashtags or emoji it states |
| `positioning` (`product`, `benefits`, `problem_solved`, `differentiation` and more) | Facts the body may state |

No `brand_voice`: plain, warm and direct, no slang, at most one emoji. Say in one line that
the brand document in the app makes captions sound more like the brand.

The person's own caption wins over all of this. Use it as written; fix only a broken limit, a
don't or a Safety rule (house rules, section 7), and say what you changed.

## 9. The persona and disclosure

- **The persona** (house rules, section 7) speaks in captions as it does in the video, in its
  own voice: a review in its own words, its opinions, its reactions.
- **The brand's figures as given:** a price, discount, code, deadline, stock level, award,
  customer count or rating only as the person or the brand gave it: a wrong code fails at
  checkout. When the person gave an approved-claims list, keep to it.
- **Sensitive products** (health, supplements, skincare actives, finance): never a promise that
  it cures, treats or prevents a disease, or guarantees income or a return.
- **Sponsored posts.** When someone other than the account's owner paid for the post (a
  sponsor, a client, an affiliate link), open the caption with "#ad". Not buried among the
  hashtags. A brand posting its own product on its own account needs none. If you cannot tell,
  ask once.
- **AI.** `made_with_ai: true` on every post with AI-made media: it sets the platforms'
  AI-content label. "Honest review" in the persona's voice is fine; "not sponsored" never on a
  post that carries "#ad". Never present the avatar as a real, named person or a real brand's
  official account.
- **People and brands.** No @mention of a person or a brand that has not agreed. No other
  brand's name or tag.

## 10. Language and style

- The caption is in the brand's `language` unless the person asks for another. A bilingual
  caption only when asked.
- Talk to the person in their own language, whatever language the caption is in.
- Digits for numbers ("3 things", "20 seconds").
- Sentence case. No dashes as pauses: a period or a colon reads cleaner.
- No stock phrases that read as machine-written: "game changer", "elevate your", "unlock",
  "dive into", "look no further".
- Emoji: what the tone allows, at most two, never as the whole first line.

## 11. Worked examples

**A talking review, TikTok and Instagram** (skincare, brand voice: warm, simple, no slang; call to
action: questions).

```json
{
  "caption": "Two drops is the whole routine.\nThe one I keep reaching for.\nWhat's your step one?",
  "hashtags": ["skincare", "vitamincserum", "morningroutine", "glowlab"],
  "made_with_ai": true
}
```

**A photo carousel, Instagram and TikTok** (fashion, 6 photos).

```json
{
  "caption": "One linen shirt, five ways to wear it.\nSwipe to the last one: it works for dinner too.\nWhich one would you wear?",
  "hashtags": ["linenshirt", "capsulewardrobe", "outfitideas", "summerstyle"],
  "made_with_ai": true,
  "auto_add_music": true,
  "photo_cover_index": 0
}
```

**A tips video on YouTube and TikTok** (a budgeting app; positioning: "see every subscription in
one place").

```json
{
  "caption": "3 subscriptions most people forget they pay for.\nThe app finds them in one screen.\nFollow for part 2: the yearly ones.",
  "hashtags": ["moneytips", "budgeting", "subscriptions", "personalfinance"],
  "made_with_ai": true,
  "platform_settings": {
    "YouTube": { "title": "3 subscriptions you forgot you pay for", "visibility": "public" }
  }
}
```

**A narrated list video, TikTok** (faceless, no avatar on screen; the script named the three
inventions).

```json
{
  "caption": "3 inventions that started as accidents.\nNumber 2 is in your kitchen.\nWhich one surprised you?",
  "hashtags": ["inventions", "didyouknow", "sciencefacts", "history"],
  "made_with_ai": true
}
```

**A sponsored product on an avatar's creator account** (Instagram, the person said it is a paid
partnership and gave the code).

```json
{
  "caption": "#ad Ice at the start of the trail. Ice at the top.\nThe label says 24 hours cold.\nCode MIA15 for 15% off, link in bio.",
  "hashtags": ["hikinggear", "waterbottle", "outdoors"],
  "made_with_ai": true
}
```

The first line works only because the video shows the ice at both ends; without those shots it
goes. The 24 hours come from the label, the code from the person.

## 12. A first comment

You cannot post comments. When it helps, give the person one line to pin under the post
themselves: the answer to the question people will ask ("Shade: 02 Warm"), or the detail that did
not fit. Offer it once, as text, after the post is made.

## 13. Checklist

- The first line is under about 100 characters and the video keeps its promise.
- 1 to 3 short body lines, one call to action.
- 3 to 6 hashtags, at most 5 with Instagram, none of them filler or another brand's.
- Caption plus hashtags fits every platform's limit.
- The brand's language and voice; no `donts` item.
- No price, offer, code or brand figure the person did not give.
- `made_with_ai: true` on AI-made media; "#ad" first when someone other than the account's
  owner paid for the post.
- YouTube: a title of at most 100 characters and a visibility.
