# Creatorline for your AI assistant

Say what you want. Your assistant builds the pipeline, tells you what it costs, and runs it.

Creatorline turns AI creators into finished video and photo content. This skill teaches your
assistant how to drive it, so you describe the result instead of wiring up a canvas.

## Things to ask for

- *"Make a 16 second stadium build time-lapse, demolition to opening night."*
- *"Recreate this pipeline on Creatorline"* — paste a screenshot from another tool
- *"A weekly product ad for the matcha account, going out Mondays."*
- *"Take my last workflow and make the hero shot sharper."*

It knows every model, what each one costs and which one suits the job. It picks, it prices it,
and it waits for your yes before spending anything.

## Add it

**1. Connect your account.** Copy your key from **Settings → API** in the studio. In the
Claude app, open **Settings → Connectors → Add custom connector**, name it Creatorline and
paste this as the URL, with your key on the end:

```text
https://api.creatorline.io/mcp/YOUR_API_KEY
```

**2. Add the skill.**

```bash
npx skills add Creatorline/skills --skill creatorline-workflows
```

That is it. Ask for something and watch it build.

Keep that URL to yourself, the way you would a password: it contains your key. If it ever
gets out, revoke that key in **Settings → API** and paste a new URL.

## Nothing publishes itself

Finished posts land in your review queue. A person approves them in the studio before anything
reaches an audience.
