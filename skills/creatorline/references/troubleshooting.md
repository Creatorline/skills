# Troubleshooting

What to do when a Creatorline call is refused, a run fails, or a result comes out wrong. Each
row: what you see, why, what to do. Say the fix to the person in plain words; never paste the
raw error, and never repeat a model's or a company's name from it.

## Contents

1. [Refused before anything ran](#1-refused-before-anything-ran)
2. [A run that failed](#2-a-run-that-failed)
3. [A result that came out wrong](#3-a-result-that-came-out-wrong)
4. [Waiting and lost answers](#4-waiting-and-lost-answers)
5. [Video Studio](#5-video-studio)
6. [Posting](#6-posting)
7. [Access: trial, plan, workspace, sign-in](#7-access-trial-plan-workspace-sign-in)
8. [How to retry](#8-how-to-retry)

## 1. Refused before anything ran

A refusal before a run means nothing was charged.

| You see | Why | Do this |
|---|---|---|
| "Unknown tool", "Unknown parameter", "Unknown input" or "Invalid value ... Allowed: ..." | A guessed slug, key or value | Read that `generate_*` tool's schema and use the exact keys and values. The refusal lists the allowed ones. |
| `generate_text_to_photo` refuses `avatar_id` | It draws from words alone and has no place for a face | Use `generate_photo_edit`: the avatar's face goes in by itself. |
| A link in `inputs` is refused as a page or the wrong kind of file | A slot needs the media file itself | Use a direct link to the image, video or audio file, or an asset id from `list_assets`. A TikTok or Instagram post link works in a video slot only. A product page link goes in the `prompt` instead: the writer reads the page for facts. |
| A YouTube link is refused | Only the long-video cutter takes a page link, in `source_url` | That is `creatorline-long-to-shorts`. For another tool, the person uploads the video file. |
| Reference videos are over the combined length | `generate_ugc_video`'s `source_video` holds a limited total | Trim them, or re-film the video with `creatorline-reshoot`, which the refusal names. |
| "Missing required input" for the avatar slot | The brand's default avatar has no face yet | Make the avatar at https://app.creatorline.io/avatars/new, or pass another avatar's `avatar_id`. |
| "No such asset" | An id from another workspace, or a typo | Find the file again with `list_assets`. |
| "No such brand", "No such avatar", "No such video" | This person cannot reach it (members see only their brands) or it does not exist | List, by name, what they can reach (`list_brands`, `list_avatars`, `list_videos`). |
| "Not enough credits ..." | The balance is short | The shortfall in one line, the server's own line about where credits come from (house-rules.md, section 8), and a cheaper version: shorter, `720p`, fewer photos. |
| A file on the person's computer | Chats cannot send files to the tools | They drop it at https://app.creatorline.io/assets, then find it with `list_assets`. |

## 2. A run that failed

Every failed run is refunded automatically. Say so, every time.

| You see | Why | Do this |
|---|---|---|
| `status: "failed"` with an `error` | The run could not finish | Read `error` and the `next` hints from `get_generation`. Say what failed in plain words, name the one thing you will change, and ask before the paid retry. |
| A content check stopped it | The words or an input tripped the provider's filter | Rephrase: no real person's name, no brand the person did not give you, nothing explicit, no violence or weapons. Never send the same words again. |
| A video with a real person's photo, or a clip with a real face in `source_video`, failed | The default video model takes AI faces only | With that person's consent, run `generate_ugc_video` again with `model: "bytedance-seedance-2-0-reference-to-video"` (one take holds 15 s). Reshoot re-films a refused take on its own when it is 15 s or shorter; longer, pass `model: "reshoot-seedance-2-0"` and at most 15 s. |
| "The video engine is unavailable right now" | A problem on our side, not the person's | Refunded. Offer to try again later, or another tool for the same goal. |
| Long-video cutting failed with no transcript or no clips found | The source has too little clear speech | `creatorline-long-to-shorts` needs a talking video. Try a video with speech. |
| Captions or a hook burn failed with no speech | Nothing is said in the video | Add a voiceover first (`creatorline-voiceover`), or use a hook headline alone (`creatorline-captions`). |
| A re-voice came out garbled | Music or two voices under the speech | Re-voice only clips with one clear voice and no music; add music afterwards in Video Studio. |
| The same flaw twice | The brief or the input is wrong, not luck | Change the brief or the input (section 8). |

## 3. A result that came out wrong

Give the take one verdict first (house-rules.md, section 5): keep, fix in the edit, same call
again, or change the brief. A fix in Video Studio costs nothing until export.

| You see | Why | Do this |
|---|---|---|
| The avatar is missing from a photo | Made with `generate_text_to_photo`, or with `include_avatar: false`, or the brief never asked for a person | Redo with `generate_photo_edit` and a brief that says "the avatar ...". |
| A stranger instead of the avatar, or two look-alikes | An extra person in the brief with no description, or the wrong avatar | Describe other people by role and clothing, or leave them out; check `avatar_id`. |
| The voice is not the avatar's | `generate_text_to_speech`, `generate_change_voice` and `generate_dialogue` fall back to a stock voice unless told | Pass `params.voice_id` (on `generate_dialogue`, `params.voice_a`) with the avatar's `voice_id` from `get_avatar`. No voice there: the brand's `voice_id` from `get_brand`, or a fitting one from `list_voices`. |
| A finished clip speaks in the wrong voice | The video model makes its own voice | Run `generate_change_voice` on it: `inputs.video_url` = the clip's `asset_id`, `params.voice_id` = the avatar's. One clear voice, no music. Over this connection prefer that to `change_voice: true` on `generate_ugc_video`: that re-voice is a separate run whose result `get_generation` does not return and whose price is not in the first quote. |
| A voiceover in Video Studio has the wrong voice | It uses the brand's voice unless told | `add_voiceover` with `replace_id` and the right `voice_id`. |
| Lines rushed, cut or too sparse | The words do not fit the seconds | About 2.5 words a second: trim the lines or lengthen the clip (video-briefs.md, section 7). |
| The product is wrong, blurry or its label garbled | No clean product photo, or text expected from the model | Pass a clean, well-lit product photo in its slot. Words that must be exact go in Video Studio text or the post caption, never in the picture. |
| It looks like an ad film, not a phone video | Film words in the brief, or the `Cinematic` template | Remove the film words; keep `ugc_style` on `Auto` or the format's template (video-briefs.md, section 5). |
| The face drifts in a long video | Past one take, the clip is filmed in parts and joined | Keep it to one take (30 s on the default video model), or accept small drift at the joins. |
| A photo is the wrong shape | The default photo-edit model has no 9:16 | For a full-screen still, `model: "gpt-image-v2-edit"` with `aspect_ratio: "9:16"`. |
| An animated photo barely moves, or changes the scene | The brief re-described the photo instead of the motion | Say only what moves, plus one camera move (video-briefs.md, section 14). |

## 4. Waiting and lost answers

| You see | Why | Do this |
|---|---|---|
| `queued` for a while | The workspace runs a set number of generations at once; this one waits for a free slot and starts by itself | Tell the person it is waiting its turn. Keep calling `get_generation` with `wait_seconds`. Never start it again. |
| Still `processing` after several minutes | Videos take 1 to 5 minutes, Reshoot and Character Swap often longer | Keep waiting. Past about 5 minutes, say it is still generating, give `studio_url` to watch it in the app, and say to ask "is it ready?" any time. |
| A paid call timed out or its answer was lost | The call may have started anyway | Never call it again blindly. With a `generation_id`, call `get_generation`. Without one, look for it: `list_assets` (newest first), `list_videos`, `list_posts`. Start again only when nothing started. |
| `create_video` was sent twice | It is not repeatable: each call makes a new video | Check `list_videos` before retrying. |
| A media link no longer opens | Media links expire | Give `studio_url`, or call `get_generation` again for a fresh link. |

## 5. Video Studio

| You see | Why | Do this |
|---|---|---|
| `captions.status: "out_of_date"` | The clips changed after the captions were written | `write_captions` again: re-hearing costs nothing and needs no yes. The export also re-hears stale captions by itself. |
| Texts or layers sit over the wrong clip after a trim, a removal or a new clip order | They keep their times. Only an added clip moves them (a speed change also moves texts) | `update_text` or `update_layer` with `over` set to the clip, `move_voiceover` for a voiceover, then `preview_video`. |
| "This video is being changed somewhere else right now ..." | The person is editing it in the app at the same time | `get_video`, then make the change on what is there. Ask them not to edit it while you do. |
| The export is refused | Empty, longer than 180 s, or waiting on a voiceover or captions | Read `get_video`: `ready_to_export` and `warnings` say what to fix. |
| "Nothing is heard" warning | Every clip is muted and there is no sound or voiceover | Turn a clip's sound on, add a voiceover, or lay the person's audio under it. |
| An on-clip AI action is refused on a stock clip | AI actions work on the brand's own files only | Use one of the brand's clips, or make new footage with a `generate_*` tool. |

## 6. Posting

| You see | Why | Do this |
|---|---|---|
| An account has `can_publish: false`, or "Reconnect it" | The platform's sign-in ran out | Reconnect it at https://app.creatorline.io/connections. |
| "This brand has no connected channels" | No account is connected | Connect one at https://app.creatorline.io/connections. The post can wait in the meantime. |
| A post was refused for its format | TikTok takes a video or a carousel, YouTube a video only, an Instagram carousel 2 to 10 photos | Change the media or the accounts (`creatorline-publish`). |
| A post shows `failed` in `list_posts` | Its `error` says why | Pass the `error` on in plain words. A hand-off that failed stays `scheduled`, and `publish_post` again retries it, after the person's yes. |
| The person cannot find the post in the app | Posts made here wait in the review queue | https://app.creatorline.io/review, with the brand picked in the brand switcher. |

## 7. Access: trial, plan, workspace, sign-in

House-rules.md, section 8 has the words for each of these. In short:

| You see | Do this |
|---|---|
| "... is for paying customers. This workspace is in its free trial ...", or `free_trial: true` | Nothing that uses credits runs until the plan is started, by an owner or admin in the app. Nothing was charged. Offer free work: a script, a plan, edits of existing media. |
| Only `list_workspaces` exists | The account is in several workspaces and has not picked one for this app: call it and give its `choose_url`. |
| Only `get_plan_requirement` exists | Call it and say what it says. Give only the link it returns. |
| The person is in the wrong workspace | They switch at https://app.creatorline.io/choose-workspace?app=APP, where APP is `chatgpt`, `claude`, `claude-code`, `codex` or `other`. |
| "This API key is read-only" | Writing needs a key with the `write` scope: https://app.creatorline.io/settings/api. |
| "This connection is turned off" | Its owner turns it back on at https://app.creatorline.io/agents. |
| "This sign-in has expired or is not valid", or "has no Creatorline account yet" | Sign in again from the app's connector settings; a new person signs in at https://app.creatorline.io once first. |
| "Too many requests" | Wait a moment, then retry once. |

## 8. How to retry

1. Name the flaw in one line: what is wrong, not "it looks off".
2. Decide: unlucky take (same call again) or wrong brief (the same flaw twice, so change it).
3. Change one thing: a line of the brief, an input, the length, or the model for real faces.
4. Quote the new run and ask for a yes. A retry is a new paid run.
5. After three paid tries at the same thing, stop and offer three ways on: keep the best take,
   change the idea, or reach the goal another way (Video Studio, a different format).
