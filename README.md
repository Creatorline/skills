# Creatorline agent skills

Skills in the [Agent Skills](https://agentskills.io/specification) format, installable with
the [`skills` CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add Creatorline/skills --skill creatorline-workflows
```

or, from a checkout, `npx skills add ./creatorline-workflows`.

| Skill | What it teaches an agent |
| --- | --- |
| [`creatorline-workflows`](creatorline-workflows/SKILL.md) | Build, replicate, port and modify Creatorline workflows through the MCP server: the graph grammar, the Enhance-off rule for finished prompts, the quality ladder per stage, cost checks and a porting playbook from other pipeline tools. |

Every example graph under a skill's `examples/` is validated against Creatorline's live model
registry, so a catalog change that would break an example fails that build rather than
reaching an agent.
