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

**1. Connect your account.** Copy your API key from **Settings → API** in the studio, then run:

```bash
claude mcp add --transport http creatorline https://api.creatorline.io/mcp \
  --header "Authorization: Bearer YOUR_API_KEY"
```

**2. Add the skill.**

```bash
npx skills add Creatorline/skills --skill creatorline-workflows
```

That is it. Ask for something and watch it build.

On Cursor or another assistant, the same two things go into its MCP settings: the address
above and your key. The Claude and ChatGPT apps cannot connect yet.

## Nothing publishes itself

Finished posts land in your review queue. A person approves them in the studio before anything
reaches an audience.
