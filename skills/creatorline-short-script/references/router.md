# The router

Every script is routed before a word is written: to exactly one of six spoken-word genres, or
to a UGC scene format. This file is how, plus who carries the proof, and the two policies that
win over any genre's own advice: the facts policy and the monetization policy. The genres
themselves are in [genres.md](genres.md); their hooks in [hooks.md](hooks.md).

## Contents

1. [Two families](#1-two-families)
2. [Diagnose five fields](#2-diagnose-five-fields)
3. [The six entry gates](#3-the-six-entry-gates)
4. [When two genres fit](#4-when-two-genres-fit)
5. [Genre intake](#5-genre-intake)
6. [Proof, by speaker](#6-proof-by-speaker)
7. [The facts policy](#7-the-facts-policy)
8. [The monetization policy](#8-the-monetization-policy)
9. [Never borrow a real creator's markers](#9-never-borrow-a-real-creators-markers)
10. [When another skill calls this one](#10-when-another-skill-calls-this-one)

## 1. Two families

| Family | What it is | Where |
|---|---|---|
| **Spoken-word genres** | The words carry the video: advice, a product verdict, a stance on something, a true story, a crime case, an explanation | Sections 2 to 4 pick one of six; [genres.md](genres.md), sections 2 to 7 |
| **UGC scene formats** | A scene carries the video: a POV, a skit or acted storytime, GRWM, day in the life, unboxing, try-on, an app promo, new lines over a trend | [genres.md](genres.md), section 8 |

Every script Creatorline makes is short-form: the cut-off is 4 minutes, and nothing here runs
past 3. The genres' short-form modes apply; the long-form maps in
[long-form.md](long-form.md) are only for a long YouTube script asked for as plain text.

## 2. Diagnose five fields

Read the request and fill these in, silently. The **engine** and the **spine** decide the
genre; the topic's nouns only support it. "A video about a bank" can be business advice, a
company's rise and fall, or how interest works.

| Field | The question | Examples |
|---|---|---|
| Subject | What is it about? | a person, a product, an event, an artifact (a post, a video, an ad, a claim), a case, a mechanism |
| Viewer promise | What can the viewer understand, decide, feel or do after? | "pick the right one", "stop doing X", "know what happened" |
| Narrative engine | What moves the script forward? | advice, a verdict, a stance, a chronology, a case reveal, a causal explanation |
| Evidence spine | What proves it? | receipts or a framework, a test or demo, a concrete artifact, a timeline of events, a case record, a mechanism or analogy |
| Host stance | Who is the speaker to the viewer? | a coach or operator, a reviewer, a critic, a narrator, a case guide, a teacher |

## 3. The six entry gates

A genre is chosen only when its whole gate holds.

| Genre | The gate | Typical engine and spine |
|---|---|---|
| **Business and self-improvement** | An outcome the viewer can act on (career, money, a business, productivity, health habits, a decision), carried by advice, a framework, operator evidence or a decision. A company's history is Documentary; a product verdict is Product review; a mechanism is Explainer | advice · receipts or a framework |
| **Product and tech review** | One concrete product or tool is evaluated, tested, compared, ranked, demonstrated, reported as news or taught through use; the payoff is a verdict or a decision | verdict · a test or demo |
| **Commentary** | A concrete artifact (a post, a video, an ad, a claim, a trend, a work) examined through an explicit stance: a reaction, a critique, satire, a close reading | stance · the artifact |
| **Documentary story** | Real, verified events, or a person's or a company's arc, told through chronology, conflict and reveals; the payoff is what happened and why it mattered | chronology · a timeline of events |
| **True crime** | A specific crime, disappearance, interrogation, court record or scam case, rebuilt from case evidence with legal and ethical care. General scam prevention is Business or Explainer | case reveal · the case record |
| **Explainer** | One central how or why question, answered through a mechanism, a misconception corrected, a demo or an analogy | causal explanation · a mechanism or analogy |

There is no fallback genre. A vague, advice-shaped request is not Business by default: route it
by its engine and spine like any other. A request that is a scene, not spoken word, goes to the
UGC scene formats. An ad for the brand's own product is a Product review when the words carry
it (a verdict on the product): Hands-on when the persona tells its own time with it, Demo when
the product working is the story. Or it is the scene format that shows it (an unboxing, a
try-on, an app promo).

## 4. When two genres fit

Settle it by the verb of the title the video would carry:

| The title promises | Genre |
|---|---|
| "which should I buy or use", "I tested" | Product and tech review |
| "what is wrong (or brilliant) about this" | Commentary |
| "what happened", "how did they rise or fall" | Documentary story |
| "how was this case solved" | True crime |
| "how or why does this work" | Explainer |
| "what should I do to improve, earn, build or decide" | Business and self-improvement |

- Name the closest competing genre and why it loses, in the defaults line: "Genre: Explainer
  (not Business: it answers why, not what to do)."
- When two gates truly both hold and the person is there to answer, ask ONE question about the
  outcome they want, with concrete choices: "Should it tell the story of what happened, explain
  how it works, or give your viewers what to do about it?"
- When the person said to decide everything ("just write it", "surprise me"), or a calling
  skill said so, infer from the title promise, the evidence available and the payoff. Do not ask.
- Never blend two genres in one script.

## 5. Genre intake

Ask only what is missing and would change the script; infer the rest and state it in the
defaults line. At most one message of up to three questions ([asking.md](asking.md)).

| Genre | What it needs | Infer when you can |
|---|---|---|
| Business | The lane (tips, a listicle, how-to steps); the speaker's own specific numbers and one costly confession (the avatar's persona brings its own; ask the person when they speak as themselves); data about the wider world with its source; how many items the hook promises | The lane from the ask; the count from the length; the persona's numbers and confession |
| Product review | The lane (hands-on, demo, ranking, news, taught through use); the labor proof (bought, used for N days, broke, compared: the persona's own, or the person's when they speak as themselves); the honest verdict (a review is written backwards from it); what was NOT tested | With the avatar, its own history with the product (how long, how it found it, what changed) in the Hands-on lane |
| Commentary | The concrete artifact (a vague topic: ask for one, or propose two or three real kinds of artifact); the lane (hot take, reaction, deadpan satire); the speaker's actual stance | The stance from the brand's `brand_voice` |
| Documentary | The story with its verified facts and sources (an unverified item is tagged `[VERIFY]`); the narrator's register (a present companion in the first person, or a composed narrator in the third, never in between); the lane; the withheld thing (when the title gives the outcome away, hold the how) | A narrator's register for a faceless script |
| True crime | The case facts, the timeline and the sources (victims, the person responsible, the investigation, the legal outcome), researched or given, never invented; the lane; which reveal is held; the legal status (before a verdict, "allegedly" throughout) | Nothing: research it or ask |
| Explainer | The lane (on camera, a narrator's essay, an inquiry); the core question with tension (turn a topic into a question: "solar panels" becomes "why don't panels work twice as well in the desert?"); the misconception the audience holds; one concrete anchor to keep coming back to (an object, a demo, a number, a scene; invent the analogy object when there is none) | The anchor and the misconception |

## 6. Proof, by speaker

Some genre moves need personal proof: receipts, a test, a purchase, a confession, a credential,
a time of use.

1. **The avatar** is a living persona (house rules, section 7): it carries its own proof. Write
   it specific and in its voice ("three weeks in", "I caved after the third ad", "I sent the
   first one back"), built on the product's real facts. The brand is responsible for its claims.
2. **The person themself**: ask them for it, specifically ("What did you actually measure, and
   over how long?"). What they do not give is a marked blank they fill: "[your result]".
3. **A narrator** speaks in the third person: the brand's facts and story, and named, sourced
   evidence ("according to <source>") for anything about the wider world.

## 7. The facts policy

It covers the real world: events, people, companies, and numbers about them. It wins over any
genre's wording, any hook type and any example in these references. The persona's own life is
not part of it: that is written, not sourced (section 6).

- **Never invent** a real-world event, a statistic given as data, a quote, or a real person's
  words, dialogue or inner thoughts.
- The example lines in these references are illustrations, never facts to reuse.
- **Name the source** of every real-world fact in the script's notes; tag anything unverified
  `[VERIFY]` so the person checks it before filming.
- Use the person's sources, or read-only research tools when the host has them. Ask only when a
  fact the genre needs is missing.
- Separate what is known from what is not, out loud where it matters ("historians disagree on
  why"); an explainer says plainly, mid-video, where knowledge ends.

## 8. The monetization policy

- **Never invent** a sponsor read, an affiliate mention, a product or course plug, merch, or a
  brand integration.
- The brand's own product as the SUBJECT of the video is not a plug: it is the video.
- A plug the person asks for in a script about something else (a mention of the brand inside an
  explainer or a story) goes outside the value: after the payoff, never inside a test, a reveal,
  a reaction cycle or a rising sequence. In a review, outside the test; in commentary, outside
  the reaction cycles and before the sincere close; in a story or a case, at a clean boundary,
  never in the climb to the reveal.

## 9. Never borrow a real creator's markers

No real creator's catchphrase, greeting, audience nickname, sign-off, running bit or branded
line, and never "in the style of <creator>". Rituals and sign-offs are good craft: invent
original ones for this brand and its avatar, and reuse them across the brand's scripts.

## 10. When another skill calls this one

When another skill, such as `creatorline-ai-host` for an episode, uses this skill to write its
script, that skill's layout, headings and cue style win. The genre's craft stays whole: the hook
logic, the beats, the voice, the evidence rules, the retention devices and the ending.
