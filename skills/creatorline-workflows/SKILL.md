---
name: creatorline-workflows
description: "Builds, runs and changes Creatorline workflows: saved pipelines of photo, video, voice, caption and post steps that run again on demand or every week. Use for a recipe to repeat, a pipeline rebuilt from another tool or a screenshot, or exact prompts run word for word. Not for one piece made once: use its format skill. Many versions now: creatorline-ad-variations."
license: MIT
metadata:
  author: creatorline
  version: "2.1"
---

# Workflows

A workflow is a saved pipeline of generation steps wired into each other, often ending in a
publish step that puts the piece in the brand's review queue. It runs again on one ask or on a
weekly schedule. This skill turns an idea, a recipe, exact prompts or another tool's pipeline
into a graph that runs on Creatorline with nothing lost. The promise: the plan and the price of
one run before anything spends, and every run ends in something to watch, post or run again.

Tools in backticks are the Creatorline connector's tools. Follow
[references/house-rules.md](references/house-rules.md) (orient, ask little, price first, wait
and narrate, show, offer next steps) and [references/asking.md](references/asking.md). Call
`track_skill_activation` with `creatorline-workflows` once per new request (house rules,
section 10).

## When to use

- "Make this every Monday", "a pipeline I can run again", "save this as a workflow".
- A pipeline from another tool, a screenshot of a node graph, or a written recipe to rebuild.
- Exact prompts that must reach the model word for word. `create_generation` always rewrites
  its prompt; only a workflow step with Enhance off runs a prompt as written.
- A saved workflow to run again (a new topic, a new product photo) or to change.

## Not for

| They want | Use |
|---|---|
| One finished piece, once | That format's skill (`creatorline-talking-video`, `creatorline-product-video`, `creatorline-reshoot`, `creatorline-character-swap`, ...) or a quick one-off in `creatorline` |
| Several versions of one video now | `creatorline-ad-variations` |
| A week of different posts, planned | `creatorline-content-calendar` (it may hand a repeating format back here) |
| A long video cut into shorts | `creatorline-long-to-shorts` (that tool cannot be a workflow step) |
| Editing one video by hand | `creatorline-video-studio` |
| A photoshoot or a carousel, once | `creatorline-photos` |
| Posting media that already exists | `creatorline-publish` |

Offer a workflow only when the work has connected steps or will repeat. One prompt and one
result is a single run in the format's skill.

## Connecting

<!-- connect:start -->
No Creatorline tools in your list (no `get_workflow_catalog`)? The person connects the server
first; you cannot sign in for them.

- **Claude Code**: `claude mcp add --transport http creatorline https://api.creatorline.io/mcp`,
  then `/mcp`, pick `creatorline` and sign in in the browser.
- **Codex**: `codex mcp add creatorline --url https://api.creatorline.io/mcp`, then
  `codex mcp login creatorline`.
- **With an API key** (scripts, CI): add `--header "Authorization: Bearer $CREATORLINE_API_KEY"`
  to the Claude Code command. Keys are made at https://app.creatorline.io/settings/api. Saving
  and running need the `write` scope; a `read` key can still read the catalog, call
  `validate_workflow` and get a run's price (`run_workflow` without `confirm`).

Steps for chat apps are on https://app.creatorline.io/agents.
<!-- connect:end -->

## What you need

| Item | Hard gap? | Default when not given |
|---|---|---|
| What the workflow makes: the recipe, the source pipeline or the idea | Yes | |
| Media every run needs: a product photo, a source clip to swap or re-film | Yes, when the recipe uses it | |
| What changes between runs | No | One input: a `text` node for the topic or line, an `image` node for the product |
| Where it ends | No | A publish step when the ask or the source posts; otherwise the finished media only |
| How often | No | On demand. A schedule only on a yes that covers it (step 9) |
| Avatar | No | The brand's default avatar; another only when the person names one |
| Prompts | No | Their prompts word for word (Enhance off); otherwise idea-level briefs with Enhance on |
| Frame, length, look | No | 9:16, 10 s, phone style; a port keeps the source's settings |
| Video model and sharpness | No | The best model that fits ([references/catalog.md](references/catalog.md)), 720p; 1080p only when asked or in the source |

## The flow

1. **Orient** (house rules, section 1). Then, free and together:
   - `list_workflows` with the `brand_id`: a saved workflow may already do this. Offer to run or
     change it before building a new one (a package holds a set number of workflows, and
     deleting one is done in the app).
   - `get_avatar` on the avatar when any step speaks: its `voice_id` (rule 5).
   - `list_connections` when it ends in a post: which platforms are connected.
2. **Intake.** Hard gaps only, at most 3 questions in one message (asking.md). The ones that
   usually matter: what changes each run, whether it ends in a post, how often. Close with the
   defaults in one line. For "set up a weekly product ad for my matcha":

   ```
   Happy to. Two quick things:
   1. The matcha photo: send a link, or tell me its name in your Creatorline library.
   2. What changes each week? 1) The topic line (recommended) 2) The product photo 3) Nothing
   Defaults: Mia, 9:16, 10 s, phone style, a TikTok post in your review queue, Mondays 09:00.
   ```

3. **Read the vocabulary.** `get_workflow_catalog` with `stage` for every stage you will use.
   Copy stage ids, model ids, slot keys, param keys and values from it; never from memory.
4. **Design the graph.** Start from the closest shape in Craft below and its example file.
   Porting: inventory every source node and map it with
   [references/porting-playbook.md](references/porting-playbook.md). Shapes and fields:
   [references/graph-grammar.md](references/graph-grammar.md).
   - Media: an asset id from `list_assets`, or `import_asset` with a public file link or a
     TikTok / Instagram post link (free). A file on the person's device is uploaded at
     https://app.creatorline.io/assets first.
5. **Validate.** `validate_workflow` with `nodes`, `edges`, `brand_id` (and `avatar_id` when
   named) until `ok` is true, fixing every error it names. `estimated_credits` = one run.
6. **Plan and price, one question.** Show the plan (below) with the price of one run and the
   balance, then ask once: save and run it now, save only, or change something.
7. **Save.** `create_workflow` with a short `name`, a one-line `description`, `brand_id`
   (without it no avatar joins and a publish step has no accounts), the validated `nodes` and
   `edges`, and `avatar_id` only when the person named an avatar. Saving is free.
8. **Run** (when they said run). `run_workflow` without `confirm`: the answer is
   `status: "needs_approval"` with `credits`, `credit_balance`, `sufficient` and the `plan`.
   If `credits` matches what you quoted and `sufficient` is true, the yes already covers it:
   call again with the same arguments and `confirm: true`. If the price moved, quote again.
9. **Schedule** (only on a yes that covers it). Say the days and times, the price of one run,
   the runs per week, the weekly total, that each run spends with no further question, and that
   each post waits for approval. When the ask named a cadence, this is a line of the plan
   message and that yes covers it; otherwise offer it after the first run. On yes: `schedule`
   on `create_workflow` or `update_workflow` (`enabled`, an IANA `timezone`, `days` with
   `"HH:mm"` slots). Ask the city or time zone in plain words if you do not know it.
10. **Wait and narrate.** `get_workflow_run` with the `run_id` answers at once: call it every
    10 to 30 seconds, one short line between calls ("Filming the talking take now."). A photo
    step takes under a minute, a video step several minutes, Reshoot and Character Swap
    longer. For a long pipeline, say about how long and what to ask ("ask me if it is ready in
    five minutes"), then end the turn. Never start the run a second time.
11. **Check, show, offer next steps** (sections below).

**The plan message** (step 6), in plain words, no ids and no model names:

```
**Matcha product ad**, a workflow for Glow Lab with Mia
1. Talking take: Mia picks up the can and says one line about it (10 s, vertical)
2. Captions burned in
3. A TikTok post, waiting in your review queue (nothing goes public on its own)
Changes each run: the topic (matcha latte, cold brew).
One run: about <N> credits. You have <M>. Saving is free.
Schedule: Mondays at 09:00 Istanbul time: about <N> credits a week, each run on this yes.

1. Save it, run it once now, keep the schedule (recommended)
2. Save it and run it once, no schedule yet
3. Change something
```

Leave the schedule line and its option out when no cadence was asked for.

### Run a saved workflow again

1. `list_workflows`, find it by name, then `get_workflow` for its graph and inputs.
2. Collect only what this run changes. A new topic or line: add it to the `text` node's
   `values` and point `activeIndex` at it. A new product photo: its asset id (`list_assets`
   or `import_asset`) into the `image` node's `values`, with `activeIndex` on it. A new source
   clip: its asset id in the step's `slotBindings`. A run takes no input values, so a change
   is an edit: `validate_workflow` on the edited graph, then ONE question that names the edit
   and the price ("Switch the topic to cold brew and run it: <N> credits?"). On yes:
   `update_workflow` with the whole `nodes` and `edges`, then step 8.
3. Another avatar for one run: `avatar_id` on `run_workflow`. Voice steps keep the voice they
   name, so when the workflow speaks, change the workflow instead: `update_workflow` with
   `avatar_id` and the voice steps' `voice_id` together (rule 5).
4. The same inputs again: straight to step 8.
5. Several runs (every topic in the list): quote the total, get one yes, then edit and kick
   off one at a time. A run copies the graph at its start, so the next edit does not touch it.

### Change a saved workflow

`get_workflow`, change only what was asked, keep every other node and id (the canvas keeps
their positions), `validate_workflow`, then say the change and the new price of a run in one
line and get a yes: `update_workflow` replaces the whole graph (pass `nodes` and `edges`
together). Rename it, rebind the brand, change the avatar (`avatar_id: null` returns to the
brand's default) or pause the schedule (`schedule.enabled: false`; `schedule: null` removes
it) without sending the graph.

### Redo one step

A failed or weak step: `run_workflow` with `reuse_from_run_id` (that run) and
`only_node_ids` (the step). Steps that did not change are served from that run at no charge;
the quote's `plan.reused` and `plan.will_run` show which. Same price loop as step 8.

## Hard rules

1. **Finished prompts run verbatim.** When the person brings final prompts, or a port's
   prompts are final, set `params.enhance: false` on every generation step that has a prompt
   and pass it exactly as given: no typo fixes, no translation, no "improving". Enhance stays
   on (the default) only for idea-level prompts, or where the source had its own AI
   prompt-writer step: drop that step and give its input to this one. Reshoot, motion control
   and Character Swap write their own model prompt: no `enhance` key. Reshoot and Character
   Swap Transfer read the step's prompt as an optional Direction; Replace reads none.
2. **The best path, not the longest.** Fewest steps: Character Swap already cuts the source to
   length, `caption-burn` already transcribes, writes the hook and burns captions, and the
   avatar joins every character slot by itself. The best model that meets the brief's hard
   limits (take length, resolution, inputs), from [references/catalog.md](references/catalog.md).
   Upscalers, resizers, converters, seed and sampler nodes, previews and routing glue go.
3. **Never invent vocabulary.** Node and edge fields are strict, so a wrong one is refused.
   Param keys are not checked by name: a misspelled key is dropped without a word. Copy every
   key and value from `get_workflow_catalog`.
4. **Bind media the way the runner does.**
   - Step to step: an edge. Set `targetHandle` on every edge into a step with several slots of
     one kind (`characters`, `location`, `objects` on reference video; `image_url` and
     `end_image_url` on photo to video). Left out, an image lands in the first image slot,
     which on reference video is the avatar's.
   - A fixed file every run: `slotBindings: { "<slot>": "<asset id>" }`.
   - A file or words the person switches between runs: an `image` node wired into the slot
     (images only; a source video is switched by editing `slotBindings`), or a `text` node
     read as `@name` in a prompt or caption (never wired).
   - The face: nothing to add. The workflow's avatar (the brand's default unless `avatar_id`)
     joins every `role: "character"` slot. `dropCharacterAvatar: true` keeps it out of a
     photo edit step (a product-only still). An `image` node wired into the character slot
     replaces the avatar.
   - Feed every slot the catalog marks `required`: `validate_workflow` does not check it. The
     reference video `characters` slot is one, so a product-only clip is photo to video from
     the product photo.
5. **Voices are set, never assumed.** In a workflow, `text-to-speech` and `change-voice` speak
   in a stock voice unless `params.voice_id` is set, and `dialogue` needs `voice_a` and
   `voice_b`. Use the avatar's `voice_id` from `get_avatar` (the brand's from `get_brand` when
   the avatar has none), or a voice from `list_voices` the person picked. To give a video take
   the avatar's voice, add a `change-voice` step after it: the `change_voice` switch on
   reference video, Reshoot and Character Swap has no effect in a workflow.
6. **Verbatim reference video names every input.** With `enhance: false` on a model whose
   catalog says `prompt.tokens_bind_inputs: true`, an input reaches the model only through its
   token in the prompt: `@Image1`, `@Video1`, `@Audio1` in slot order, or `@step3` for step 3's
   output. An input the prompt never names is ignored. Numbering:
   [references/graph-grammar.md](references/graph-grammar.md), section 4.
7. **Publish never publishes.** A publish step puts the post in the review queue as
   `pending_review`. Say so; never promise a workflow will post. Set
   `postSettings.videoMadeWithAi: true` on every publish step (AI disclosure, house rules,
   section 7).
8. **Keep their structure.** Their node names as `title`, their order, their variables as
   `text` nodes. Short ids (`n1`, `hero`, `post`).

## Minimal graph

```json
{
  "name": "Matcha product ad",
  "brand_id": "<brand id from list_brands>",
  "nodes": [
    { "id": "topic", "kind": "text", "name": "topic", "values": ["matcha latte", "cold brew"] },
    { "id": "product", "kind": "image", "values": ["<asset id of the product photo>"] },
    {
      "id": "clip", "kind": "generation", "stageId": "video-ref",
      "modelId": "bytedance-seedance-2-5-reference-to-video",
      "prompt": "@Image1 holds @Image2 up to a phone camera at her kitchen counter and says: \"okay, the @topic is actually worth it\". One continuous handheld shot, natural window light.",
      "params": { "enhance": false, "duration": 10, "resolution": "720p", "aspect_ratio": "9:16" }
    },
    { "id": "post", "kind": "publish", "prompt": "morning ritual #ugc", "publishFormat": "video", "publishChannels": ["TikTok"], "postSettings": { "videoMadeWithAi": true } }
  ],
  "edges": [
    { "source": "product", "target": "clip", "targetHandle": "objects" },
    { "source": "clip", "target": "post" }
  ]
}
```

`@Image1` is the avatar (it fills `characters`, the first image slot), `@Image2` the product
in `objects`. With Enhance on, the prompt would be a brief ("She shows the @topic").

## Craft

**Shapes that work.** Start from one; each example file is validated against the registry.

| Shape | Steps | File |
|---|---|---|
| Product ad on repeat | product `image` node → reference video → captions → publish | [examples/ugc-product-ad.json](examples/ugc-product-ad.json) |
| One still, one hero clip | photo → photo edit (the avatar placed in it, 9:16) → photo to video → publish | [examples/photo-to-hero-video.json](examples/photo-to-hero-video.json) |
| Exact words, exact lips | text to speech + a silent take → lipsync → captions → publish | [examples/spoken-take-lipsync.json](examples/spoken-take-lipsync.json) |
| A short story in shots | three reference takes (later shots read step 1) → merge → publish | [examples/three-shot-merge.json](examples/three-shot-merge.json) |
| A real clip, the avatar in it | Character Swap → change voice → captions → publish | [examples/scene-swap-revoice.json](examples/scene-swap-revoice.json) |
| A carousel | 2 to 10 photo or photo edit steps → one publish step with `publishFormat: "carousel"` | |
| A trend re-filmed | Reshoot with the source bound to `source` → change voice (when the avatar speaks) → captions → publish | |
| An edit no step makes (split screen, picture in picture, zoom and pan, transitions, moving text, a ducked music bed) | the steps that make the media → `montage` (one ffmpeg command) → publish | [references/montage.md](references/montage.md) |

**Enhance on or off.** On, the prompt is a brief and the writer builds the shots, the lines,
the persona and the template (`ugc_style`); write it the way
[references/video-briefs.md](references/video-briefs.md) says. Off, the prompt is the model's
prompt as written; write it the way
[references/verbatim-prompts.md](references/verbatim-prompts.md) says. Voice lines
(`text-to-speech`, `dialogue`) and a manual hook (`caption-burn` with `hook_mode: "manual"`)
are words, not briefs: Enhance off.

**Phone-native by default.** 9:16, one phone in a real room, available light. Film language
only when the person asks for a polished look (`ugc_style: "Cinematic"` with Enhance on).

**Keep the look across steps.** The avatar carries the face. For an outfit or a set that must
match, wire the first shot into the next shot's `source_video` and say "same outfit as
`@step1`". For a precise look in motion, get the still right first, then animate it: a photo
is cheap to redo, a video is not. Photo to video follows the frame's shape: make the frame
with `photo` or `gpt-image-v2-edit` at 9:16 (the default photo edit model has no 9:16).

**Draft, then final.** For a new or untested recipe, run once on the stage defaults at 720p,
check it, then move the steps that matter to the hero model and run with
`reuse_from_run_id` so unchanged steps are not paid twice.

**Schedules repeat their inputs.** A scheduled run uses the active values every time; text
nodes do not rotate. With Enhance on, the writer writes a new script each run, so the takes
differ while the idea stays. With Enhance off the prompt repeats, so expect near repeats unless
the active value changes between runs. Every scheduled post waits in review, so someone has to
approve each one in the app.

**Real faces.** The hero reference video model takes AI faces only. A step that films a real
person's photo (with their consent) uses `bytedance-seedance-2-0-reference-to-video`; one take
holds 15 s.

## Check before you show it

- `get_workflow_run`: every step `succeeded`, or say which did not and why (`error`).
- `preview_assets` with `asset_ids` set to the last step's `asset_id`: the avatar is there and
  looks like the avatar, the product shows, the frame is vertical, any text reads.
- A spoken step: the lines fit the seconds (about 2.5 words a second) and the voice is the
  avatar's.
- A publish step: `list_posts` with `status: "pending_review"` and the `brand_id` finds the post.

## If it goes wrong

Failed steps are refunded automatically; say so. A rerun is paid: quote it first.

| What happened | Do this |
|---|---|
| `validate_workflow` errors | Fix each one where it points: a model the stage does not offer (pick one from the catalog), a missing `targetHandle`, a slot fed by both an input and a step (one or the other), a cycle, a wired `text` node |
| The run is `partial` or `failed` | Read each failed step's `error`. Fix the cause, then redo only those steps (Redo one step); the quote shows only them |
| A step failed for a missing input | A required slot was left empty (rule 4). Wire or bind it, then redo that step |
| A step is `skipped` | A step before it failed. Fix that one |
| A step is `awaiting_script` | The step has `reviewScript: true` and waits for a person to approve its script on the canvas (https://app.creatorline.io/workflows/<workflow id>). Leave `reviewScript` off for runs started from chat |
| `queued` for a while | The workspace runs a set number of jobs at once; this run waits for a free slot and starts by itself. Never start it again |
| The avatar is missing from a step | `dropCharacterAvatar` is set, an `image` node feeds the character slot, the model has no character slot (photo to video, the plain-image reference models), or a verbatim prompt never names `@Image1` |
| An input was ignored | A verbatim reference video prompt did not name its token |
| The voice is not the avatar's | Set `params.voice_id` on the voice steps (rule 5) |
| The brand has no connected account | A publish step has nowhere to post: connect one at https://app.creatorline.io/connections, or leave the publish step out |
| Captions failed on a clip | `caption-burn` needs speech; a silent clip gets a manual hook only, or text in `creatorline-video-studio` |
| A real face was refused | Move that step to `bytedance-seedance-2-0-reference-to-video` (Craft, Real faces) |
| "Not enough credits ... the first wave of this run costs N" | House rules, section 8: the shortfall and a cheaper version (720p, shorter, fewer steps) |
| "Workflows are not part of this workspace's plan" or "... holds N workflows" | House rules, section 8, with the server's link. Offer the same job as single runs, or reuse and change a workflow they already hold |
| A free-trial answer | House rules, section 8: nothing that spends runs until the plan starts; building and validating are free |

After three paid attempts at the same thing, stop and offer ways on (house rules, section 5).

## Show the result

After a run, the card from house rules, section 4. Credits used = the sum of the steps'
`credits`; the balance from `get_credit_balance`.

```
**Matcha product ad, cold brew**: a 10-second talking video of Mia with the can, captioned
[Watch the video](<last step's url>) · [Open the workflow](https://app.creatorline.io/workflows/<workflow id>)
The TikTok post is waiting for your approval: [Review it](https://app.creatorline.io/review?activeBrand=<brand id>)
Used <N> credits. <M> left.

What next?
1. Run it again with the matcha latte
2. Put it on a schedule: Mondays and Thursdays at 09:00
3. Post it now (I'll ask before anything goes public)
```

- Show the finished media; the steps' in-between results only when asked or when one failed.
- Media links expire; the workflow link stays.
- After a port, add the mapping table (porting-playbook.md, section 5): their node, what it
  became, what was dropped and why.
- After a save without a run: the plan card, "Saved, nothing has run yet", the workflow link.

## Next steps to offer

| After | Offer |
|---|---|
| A first run | run it with the next value; put it on a schedule; post it (`creatorline-publish`) |
| A run whose piece needs a touch | text, a stock hook clip or a trim in `creatorline-video-studio`, then export |
| A winning piece | versions with other hooks or avatars (`creatorline-ad-variations`); a cover (`creatorline-cover-image`) |
| A port | run it once to compare with their original; swap a step to a sharper model |
| A schedule set | when the first run happens and where its post will wait |

## What a workflow cannot do (say it, never fake it)

- **Audio never posts.** `text-to-speech` and `dialogue` make audio: wire it into `lipsync`
  or `add-audio` (`audio_url`), never into a publish step.
- **Long video to shorts** makes many clips; a step passes on one. Use
  `creatorline-long-to-shorts`.
- **Photos with text on them (slides)** are made in the app; a carousel of generated photos
  is fine (Craft).
- **Branches, loops, conditions, retries.** A graph runs once per kickoff and has no cycles.
  A loop over values is a `text` node and one run per value; a branch is two workflows.
- **Values per run.** A run takes no input values; change the active value first.
- **From chat:** approving a parked script, deleting a workflow and uploading a local file are
  done in the app (house rules, section 9).

## References

- [references/graph-grammar.md](references/graph-grammar.md): node and edge fields, handles,
  tokens, publish fields, schedules, run options and run states.
- [references/catalog.md](references/catalog.md): every stage with its models, slots, key
  params and the quality ladder. A snapshot: `get_workflow_catalog` is the live truth.
- [references/porting-playbook.md](references/porting-playbook.md): source nodes to
  Creatorline steps, what collapses, and the mapping report.
- [references/verbatim-prompts.md](references/verbatim-prompts.md): prompts for Enhance off.
- [references/montage.md](references/montage.md): the `montage` node, its rules, recipes and
  failures.
- The example graphs in the Craft table: complete graphs to copy from.
- [references/house-rules.md](references/house-rules.md),
  [references/asking.md](references/asking.md),
  [references/video-briefs.md](references/video-briefs.md): the shared rules every Creatorline
  skill follows.
