# Scenarios

Routing and behavior cases for every skill: a prompt, the skill that must take it, and the
first tool calls expected. Each skill also has one near miss, a prompt that sounds close but
must go to another skill. Run them by hand in a fresh session with the plugin installed and
the Creatorline connection signed in, before a release and after any change to a description.

## Contents

- [How to run and score](#how-to-run-and-score)
- [creatorline](#creatorline)
- [Videos with your avatar](#videos-with-your-avatar): talking video, product video, unboxing,
  try-on, tutorial, app promo, AI host, faceless
- [From videos that already exist](#from-videos-that-already-exist): reshoot, Character
  Swap, ad variations, clips from long videos
- [Finishing touches](#finishing-touches): Video Studio, captions, voiceover
- [Photos](#photos): photos and carousels, covers
- [Planning and posting](#planning-and-posting): script, content plan, publish, workflows

## How to run and score

**The workspace:** one brand with a default avatar (a face and a voice), a second avatar, a
few photos and videos in its library, and no social account connected unless a case needs
one. Answer intake questions the obvious way; say yes to a price when the case runs a paid
step.

**The columns:**

- **Skill**: the skill that must handle the request.
- **First calls**: the tool calls expected, in order, up to the first answer that needs the
  person. Two calls are left out of every row:
  - `track_skill_activation` with the skill's name, once, first;
  - orientation, written "orient": `list_brands` (and asking which brand when there are
    several), then `get_brand` or `list_avatars`. It happens once per conversation, so a
    second case in the same conversation skips it.
- A paid call written "no `confirm`" must come back `needs_approval` with the price; the agent
  tells the person the credits and the balance and stops for a yes.

**Pass:** the right skill, the calls in that order (extra read-only calls are fine), one
intake message at most, a price and a yes before anything is spent, a delivery card with
readable links, two or three next steps, names and never ids, the person's language.
**Fail:** the wrong skill, a paid call with `confirm: true` before a yes, a question asked
one at a time across several turns, an id shown, an engine or vendor named.

## creatorline

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | What can you make for me with Creatorline? | `creatorline` | orient, `list_connections`, `get_credit_balance`. One compact message: brand, default avatar, accounts, credits, three things to try. |
| 2 | Avatarımın mutfakta kahve içerken bir fotoğrafını yap. | `creatorline` (one plain photo; a set, or a photo with their product or an outfit, is `creatorline-photos`) | orient, `create_generation` (tool `photo-edit`, no `confirm`) |
| 3 | The video you made earlier failed. Why, and can you try again? | `creatorline` | `get_generation` (reads the failure), then `create_generation` again with no `confirm`: says it was refunded, what changes on the retry, and asks before spending. |
| 4 | Instagram hesabımı buradan bağlayabilir miyim? | `creatorline` | `list_connections`. Says connecting is done in the app and gives the Connections page link; nothing else is called. |
| Near miss | Make a 20 second video of my avatar reviewing this moisturizer. | `creatorline-talking-video` | The root skill hands off; it does not run the format itself. |

## Videos with your avatar

### creatorline-talking-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Make a 15 second UGC video of my avatar reviewing this serum: https://cdn.example.com/serum.jpg | `creatorline-talking-video` | orient, `import_asset` (the photo link), `create_generation` (tool `ugc-video`, no `confirm`) |
| 2 | Avatarım kameraya baksın ve yapay zekâ araçları hakkında 10 saniyelik sert bir yorum yapsın. | `creatorline-talking-video` | orient, `create_generation` (tool `ugc-video`, no `confirm`) |
| 3 | A storytime from my avatar about how she started her bakery, filmed like a phone video. | `creatorline-talking-video` | orient, one intake message (length, the key line), `create_generation` (tool `ugc-video`, no `confirm`). Her own story, told in the first person. |
| 4 | A review of our serum with my avatar. https://cdn.example.com/serum.jpg | `creatorline-talking-video` | orient, `import_asset` (the photo link), `create_generation` (tool `ugc-video`, no `confirm`). Review mode, the avatar's honest take in its own voice, the lines shown with the price. No approved-claims list asked for. |
| Near miss | Avatarım kutuyu açsın ve içinden çıkan ürüne tepki versin. | `creatorline-unboxing-video` | Opening a package is an unboxing. |

### creatorline-product-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | A product video for our new water bottle: no face, just hands and a voiceover. | `creatorline-product-video` | orient, `list_assets` (the product photo), `create_generation` (no `confirm`) |
| 2 | Kahve çekirdeklerimiz için ürünün öne çıktığı, dış sesli 10 saniyelik bir video. | `creatorline-product-video` | orient, `list_assets`, `create_generation` (no `confirm`) |
| 3 | Show our sneakers on a table while a voice lists three features. Photo: https://cdn.example.com/sneaker.png | `creatorline-product-video` | orient, `import_asset`, `create_generation` (no `confirm`) |
| Near miss | Make my avatar hold the bottle and talk about it to camera. | `creatorline-talking-video` | The avatar speaking on camera is a talking video. |

### creatorline-unboxing-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | My avatar unboxes our PR package and reacts, 15 seconds. | `creatorline-unboxing-video` | orient, `list_assets` (the product and the package), `create_generation` (tool `ugc-video`, no `confirm`) |
| 2 | Avatarım yeni kulaklığımızın kutusunu açsın, heyecanlı bir tepki versin. | `creatorline-unboxing-video` | orient, `list_assets`, `create_generation` (tool `ugc-video`, no `confirm`) |
| 3 | A haul: my avatar opens three orders from our store, one reveal each. | `creatorline-unboxing-video` | orient, one intake message (the three products), then the whole batch priced together before any of it starts |
| Near miss | Just hands opening the box on a table, no face, with a voiceover. | `creatorline-product-video` | Hands only, no creator on camera. |

### creatorline-try-on-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Fit check: my avatar wears this dress and turns for the camera. https://cdn.example.com/dress.jpg | `creatorline-try-on-video` | orient, `import_asset`, `create_generation` (tool `photo-edit`, no `confirm`) for the look |
| 2 | Avatarım bu ceketi giysin, bir OOTD videosu yap. | `creatorline-try-on-video` | orient, `list_assets` (the jacket), `create_generation` (tool `photo-edit`, no `confirm`) |
| 3 | Here is a real try-on clip. Put my avatar in it wearing our hoodie instead. | `creatorline-try-on-video` | orient, `import_asset` (clip and hoodie), `create_generation` (tool `character-swap`, model `character-swap-replace`, the hoodie in `inputs.outfit`, no `confirm`) |
| Near miss | Swap the dancer in this video with my avatar and keep her clothes. | `creatorline-character-swap` | Keeping the video and its clothes is a swap, not a try-on. |

### creatorline-tutorial-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | A how-to: my avatar shows three steps to use our face mask, each step labeled. | `creatorline-tutorial-video` | orient, `list_assets`, the takes priced together (`create_generation`, tool `ugc-video`, no `confirm`) |
| 2 | Avatarım kahve makinemizin nasıl kullanıldığını adım adım göstersin. | `creatorline-tutorial-video` | orient, one intake message (the steps), `create_generation` (no `confirm`) |
| 3 | Teach my followers how to tie a scarf three ways, with on-screen labels. | `creatorline-tutorial-video` | orient, `create_generation` (no `confirm`), later `get_video_guide` and `create_video` for the labels |
| Near miss | My avatar reviews the face mask and says if it is worth it. | `creatorline-talking-video` | An opinion, not steps. |

### creatorline-app-promo-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | A UGC promo for our budgeting app. Screenshots: https://cdn.example.com/s1.png https://cdn.example.com/s2.png | `creatorline-app-promo-video` | orient, `import_asset` (each screenshot), `create_generation` (tool `ugc-video`, no `confirm`) |
| 2 | Web sitemiz için avatarımla bir tanıtım videosu yap, ekran kaydı kütüphanede. | `creatorline-app-promo-video` | orient, `list_assets` (file type video), `create_generation` (no `confirm`) |
| 3 | Make an ad for our online store with my avatar talking over the product page. | `creatorline-app-promo-video` | orient, `get_video_guide`; the one intake message asks for screenshots only (6 to 10, as file links or dropped in the library; option 2: make it without the site), never for a screen recording; it does not capture websites |
| Near miss | Write a 30 second script for our app promo. Do not make it yet. | `creatorline-short-script` | Writing only. |

### creatorline-ai-host

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Start a weekly 60 second news recap series with my avatar as the host. | `creatorline-ai-host` | orient, one intake message (topic, tone, episode length), the episode's takes priced together |
| 2 | Avatarımla 90 saniyelik podcast tarzı bir bölüm: üç konu, araya görüntüler. | `creatorline-ai-host` | orient, `create_generation` for the takes (no `confirm`, priced as one batch) |
| 3 | Episode 4 of my avatar's "Money Mondays", same intro as last time. | `creatorline-ai-host` | orient, `list_videos` (the earlier episodes), then the new takes priced together |
| 4 | Write the script for a 90 second episode of my show. Do not film it yet. | `creatorline-ai-host` (an episode script over 60 s; up to 60 s is `creatorline-short-script`) | orient. The script in parts; no paid call: it stops before the quote. |
| Near miss | A 10 second hot take from my avatar. | `creatorline-talking-video` | One short clip, not an episode. |

### creatorline-faceless-video

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | A 45 second faceless history video about the Bosphorus, narrated, with captions. | `creatorline-faceless-video` | orient (with `get_video_guide`), then the look asked alone, ending the turn; the next round asks what is still missing and the voice comes last (`list_voices`); then the whole video priced (the look reference `create_generation` tool `text-to-photo`, the pictures tool `photo-edit` with `include_avatar: false`, both no `confirm`) before any of it starts |
| 2 | Yüzsüz bir motivasyon videosu: stok görüntüler, dış ses ve altyazı. | `creatorline-faceless-video` | orient, `list_stock_clips`, `list_voices` |
| 3 | A top five list video with AI pictures and a voiceover, nobody on screen. | `creatorline-faceless-video` | orient, the look asked alone, the rest, the voice last; then priced: only the look reference is `create_generation` tool `text-to-photo` (no `confirm`); every roster and shot picture is tool `photo-edit` with `include_avatar: false` and the look reference attached (no `confirm`) |
| Near miss | My avatar narrates this story on camera. | `creatorline-talking-video` | A face on camera. |

## From videos that already exist

### creatorline-reshoot

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Reshoot this TikTok with my avatar: https://www.tiktok.com/@someone/video/7400000000000000000 | `creatorline-reshoot` | orient, `create_generation` (tool `reshoot`, the link in `inputs.source`, no `confirm`) |
| 2 | Bu Reels'i avatarımla yeniden çek ama elinde bizim serum olsun. | `creatorline-reshoot` | orient, `list_assets` (the serum), `create_generation` (tool `reshoot`, the serum in `inputs.objects`, no `confirm`) |
| 3 | Recreate this trending video with my avatar and new lines about our app. | `creatorline-reshoot` | orient; asks for the link if none was given, then `create_generation` (tool `reshoot`, the new lines in the direction, no `confirm`) |
| 4 | Make this TikTok an ad for our app, with our screen recording in it: https://www.tiktok.com/@someone/video/7400000000000000001 | `creatorline-reshoot` (a trend link to copy; with no link, an app promo is `creatorline-app-promo-video`) | orient, `list_assets` (the recording), `create_generation` (tool `reshoot`, the recording in `inputs.source_video`, no `confirm`) |
| Near miss | Keep this dance video exactly as it is and just put my avatar in place of the dancer. | `creatorline-character-swap` | The exact performance kept is a swap. |

### creatorline-character-swap

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Swap the guy in this video with my avatar and keep everything else. https://www.instagram.com/reel/ABC123/ | `creatorline-character-swap` | orient, `create_generation` (tool `character-swap`, model `character-swap-transfer`, no `confirm`) |
| 2 | Bu skeçteki iki kişiyi Jack ve Mia avatarlarımla değiştir. | `creatorline-character-swap` | orient, `list_avatars`, `get_avatar` (the second avatar's image), `create_generation` (tool `character-swap`, no `confirm`) |
| 3 | Put my avatar in this dance video wearing this outfit: https://cdn.example.com/outfit.png | `creatorline-character-swap` | orient, `import_asset`, `create_generation` (tool `character-swap`, model `character-swap-replace`, `inputs.outfit`, no `confirm`) |
| 4 | Make my avatar do this dance on its own, in front of a plain wall. | `creatorline-character-swap` (the motion route) | orient, `create_generation` (tool `motion-control`, no `confirm`) |
| Near miss | Film this trend again with my avatar in a new place, holding our product. | `creatorline-reshoot` | A new take of the idea, not the same video. |

### creatorline-ad-variations

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Make five versions of my best ad, each with a different hook. | `creatorline-ad-variations` | orient, `list_assets` (the source), then all five priced as one batch (`get_video_guide` for the export price) before any starts |
| 2 | Bu reklamın üç versiyonunu farklı avatarlarla yap. | `creatorline-ad-variations` (people change through Character Swap, never `video-edit`) | orient, `list_assets` (the ad), `list_avatars`, `create_generation` (tool `character-swap`, Transfer, `params.duration` set, no `confirm`) for each, priced together |
| 3 | Make Spanish and German versions of this ad in the same voice. | `creatorline-ad-variations` | orient, `list_voices`, the voice and language variants priced together (no `confirm`) |
| 4 | Make 3 versions of my serum video, each with one of our new serums in her hand instead of the old bottle: https://cdn.example.com/a.png https://cdn.example.com/b.png https://cdn.example.com/c.png | `creatorline-ad-variations` | orient, `list_assets` (the video), `import_asset` (each photo), one intake message (720p or 1080p only), then `create_generation` (tool `video-edit`, one photo in `inputs.image_urls`, the edit written word for word, no `confirm`) for each, priced together. Three outputs in the photos' order; no 9 combinations. |
| 5 | Bu videonun iki versiyonunu yap: biri sahilde, biri karlı bir dağ evinde. | `creatorline-ad-variations` | orient, `list_assets` (the video), one intake message (photos of the places or words, 720p or 1080p), then `create_generation` (tool `video-edit`, no `avatar_id`, no `confirm`) for each, priced together. Delivered as 1 and 2 in that order, with the status line. |
| Near miss | Make one new video about the same product. | `creatorline-talking-video` | One new video, not variants of a source. |

### creatorline-long-to-shorts

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Cut this podcast into shorts: https://www.youtube.com/watch?v=dQw4w9WgXcQ | `creatorline-long-to-shorts` | orient, `create_generation` (tool `short-clip`, `source_url`, no `confirm`) |
| 2 | Bu uzun videodan altyazılı kısa videolar çıkar, kütüphanedeki en yeni video. | `creatorline-long-to-shorts` | orient, `list_assets` (file type video), `create_generation` (tool `short-clip`, `inputs.source_video`, no `confirm`) |
| 3 | Turn my 20 minute interview into vertical clips with karaoke captions. | `creatorline-long-to-shorts` | orient, `create_generation` (tool `short-clip`, `caption_style` karaoke, no `confirm`) |
| Near miss | Trim the first three seconds off this short. | `creatorline-video-studio` | An edit, not clipping. |

## Finishing touches

### creatorline-video-studio

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Put my last three clips together, trim the first one, add "Wait for it" over the start, and show me. | `creatorline-video-studio` | orient, `get_video_guide`, `list_assets`, `create_video`, `preview_video` (all free) |
| 2 | Bu videoya bölünmüş ekran ekle: solda avatar, sağda ürün. | `creatorline-video-studio` | `list_videos`, `get_video`, `edit_video` (`set_split_screen`), `preview_video` |
| 3 | Add a hook clip from the stock library before my video, then export it. | `creatorline-video-studio` | `list_stock_clips` (library hooks), `edit_video` (`add_hook`), `preview_video`, `export_video` (no `confirm`) |
| Near miss | Add word by word captions to this video. | `creatorline-captions` | Speech captions. |

### creatorline-captions

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Add word-timed captions to my Video Studio video in the hormozi style. | `creatorline-captions` | `list_videos`, `write_captions` (style hormozi, no `confirm`) |
| 2 | Videoya kanca başlığı ve altyazı ekle, tek seferde. | `creatorline-captions` | orient, `list_assets`, `create_generation` (tool `hook-captions`, no `confirm`) |
| 3 | Captions at the bottom of the frame, kept clear of the app buttons. | `creatorline-captions` | `get_video`, `write_captions` (position bottom, no `confirm`), then `preview_video` with the safe area shown |
| Near miss | Translate these caption lines into Turkish. | none | A plain text task: answered directly, no tool. |

### creatorline-voiceover

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Add this narration to my video: "Three things nobody tells you about cold brew." | `creatorline-voiceover` | `list_videos`, `get_video`, `list_voices`, `add_voiceover` (no `confirm`) |
| 2 | Bu videoyu avatarımın sesiyle yeniden seslendir. | `creatorline-voiceover` | orient, `list_assets`, `create_generation` (tool `change-voice`, no `confirm`) |
| 3 | A two voice dialogue between a coach and a client, about 20 seconds. | `creatorline-voiceover` | orient, `list_voices`, `create_generation` (tool `dialogue`, no `confirm`) |
| 4 | Lip-sync this clip to this audio file. | `creatorline-voiceover` | `list_assets`, `create_generation` (tool `lipsync`, no `confirm`) |
| 5 | Make my avatar's talking video in Spanish. | `creatorline-voiceover` (one language; two or more, or versions to compare, are `creatorline-ad-variations`) | orient, `list_assets` (the video), `create_generation` (tool `text-to-speech`, no `confirm`) and `estimate_generation_cost` (tool `lipsync`), priced together |
| 6 | Mia saying "Welcome back, friends" as an audio file. | `creatorline-voiceover` (every voice line, also when it is the only thing asked) | orient, `create_generation` (tool `text-to-speech`, `params.voice_id` the avatar's, no `confirm`) |
| Near miss | Write the voiceover script, I will record it myself. | `creatorline-short-script` | Writing only. |

## Photos

### creatorline-photos

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | A photoshoot of my avatar in Paris, four photos. | `creatorline-photos` | orient, `create_generation` (tool `photo-edit`, no `confirm`) |
| 2 | Avatarımın elinde ürünümüzle 5 fotoğraflık bir carousel yap ve paylaşıma hazırla. | `creatorline-photos` | orient, `list_assets` (the product), the five photos priced together, later `create_post` (format carousel) |
| 3 | A flat lay of our three best sellers on marble, no person. | `creatorline-photos` | orient, `list_assets` (the products), `create_generation` (tool `photo-edit`, `include_avatar: false`, the products in `inputs.other_elements`, no `confirm`) |
| 4 | One photo of my avatar holding our serum: https://cdn.example.com/serum.jpg | `creatorline-photos` (their product is in it; one plain photo is `creatorline`) | orient, `import_asset`, `create_generation` (tool `photo-edit`, the serum in `inputs.other_elements`, no `confirm`) |
| Near miss | A YouTube thumbnail with big text "I quit". | `creatorline-cover-image` | Text on a cover. |

### creatorline-cover-image

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Make a cover for my reel: my avatar looking shocked, text "I tried it for 30 days". | `creatorline-cover-image` | orient, `create_generation` (tool `photo-edit`, no `confirm`). The words used as given. |
| 2 | YouTube videom için 16:9 kapak görseli, büyük ve okunaklı yazıyla. | `creatorline-cover-image` | orient, one intake message (the words), `create_generation` (tool `photo-edit`, no `confirm`) |
| 3 | Three cover options for this video so I can pick one. | `creatorline-cover-image` | orient, `get_video` or `list_assets` (the video), the three priced together |
| Near miss | A photo of my avatar at the beach. | `creatorline` | One plain photo, no text. |

## Planning and posting

### creatorline-short-script

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Write five hooks and a 30 second script for our protein bar. | `creatorline-short-script` | orient (`get_brand` for the brand's voice). No paid call. |
| 2 | Ürünümüz için 20 saniyelik bir senaryo yaz, sadece yazı. | `creatorline-short-script` | orient. No paid call. |
| 3 | Give me a script with on-screen text for each beat, 15 seconds, about our new flavour. | `creatorline-short-script` | orient. No paid call; offers to film it as the next step. |
| Near miss | Write the script and film it with my avatar. | `creatorline-talking-video` | Production, not writing only. |

### creatorline-content-calendar

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Plan next week's posts for my brand and make them. | `creatorline-content-calendar` | orient (`get_brand` for the content angles), `list_connections`, `list_posts`; the calendar first, then the whole batch priced before anything starts |
| 2 | Markam için iki haftalık içerik takvimi hazırla. | `creatorline-content-calendar` | orient, `list_connections`. The calendar only; nothing is made until the person says which posts. |
| 3 | Seven posts for launch week: two reshoots, three talking videos, two carousels. | `creatorline-content-calendar` | orient, one intake message, then every piece priced as one batch |
| Near miss | Schedule this video for Friday evening. | `creatorline-publish` | One post. |

### creatorline-publish

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Post my newest video to Instagram and TikTok at 18:00 with a caption. | `creatorline-publish` | orient, `list_assets`, `list_connections`, `create_post`; `publish_post` only after a yes that names the post, the accounts and the time |
| 2 | Bu videoya açıklama ve hashtag yaz, onay kuyruğuna koy. | `creatorline-publish` | orient (`get_brand` for the brand's voice), `create_post`. No `publish_post`. |
| 3 | Did my post go out? It says failed. | `creatorline-publish` | `list_posts` (status failed, reads the error) |
| 4 | Write a caption and hashtags for the video you just made. Do not post it. | `creatorline-publish` (a caption for finished media; words for a video not made yet are `creatorline-short-script`) | orient (`get_brand` for the brand's voice). The words as text to copy; no `create_post`, posting offered as the first next step. |
| Near miss | Make a video of my avatar announcing our sale, then post it. | `creatorline-talking-video` | The video is made first; posting comes after. |

### creatorline-workflows

| # | Prompt | Skill | First calls |
| --- | --- | --- | --- |
| 1 | Recreate this pipeline as a Creatorline workflow (a screenshot of a node graph). | `creatorline-workflows` | `get_workflow_catalog`, `validate_workflow` |
| 2 | Her pazartesi ürün reklamı üreten bir workflow kur. | `creatorline-workflows` | orient, `get_workflow_catalog`, `validate_workflow`, `create_workflow` (the weekly schedule only after the person agrees to it running on its own) |
| 3 | Run my product ad workflow again with the new photo. | `creatorline-workflows` | `list_workflows`, `get_workflow`, `run_workflow` (no `confirm`) |
| Near miss | Make one product ad video now. | `creatorline-product-video` | One video, not a pipeline. |
