<div align="center">

# Incident Copilot

**A calmer, clearer way to investigate customer incidents.**

An AI-powered incident-response demo that brings mock tickets, logs, deployments, and account context together to help incident commanders understand what happened and prepare customer updates.

[Try the live demo](https://zackseal89s-projects-agent.vercel.app) · [Report a bug](https://github.com/zackseal89/incident-copilot/issues)

</div>

> [!IMPORTANT]
> **Demo environment only.** All customer records and connected systems are fictional mock data. The language model is real, but this project does not access or modify production systems. Saving a drafted reply to the mock outbox requires explicit human approval.

## At a glance

- **Investigate sample incidents:** INC-1042 (Acme Retail checkout) and INC-1043 (Northstar Health dashboard).
- **Gather evidence:** Retrieve related tickets, logs, deployments, and account information from mock systems.
- **Summarize clearly:** Turn incident details into concise findings for an incident commander.
- **Prepare customer updates:** Draft a reply in chat; save it to the mock outbox only with approval.

## See it in action

Ask the copilot to investigate **INC-1042** or **INC-1043**. It gathers the associated mock records and summarizes the available evidence. You can then ask it to draft a customer update; the outbox action is approval-gated.

## Run locally

**Requirements:** Node.js 24 and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local address printed by Next.js. To start the agent in eve's interactive development interface instead:

```bash
pnpm dev:eve
```

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the Next.js app locally. |
| `pnpm dev:eve` | Run the eve agent development interface. |
| `pnpm build` | Build the web app. |
| `pnpm build:eve` | Build the eve agent. |
| `pnpm test` | Run automated tests. |
| `pnpm typecheck` | Check TypeScript types. |
| `pnpm eval` | Run agent evaluations. |
| `pnpm deploy` | Deploy the agent with eve. |

## Built with

[Next.js](https://nextjs.org/) · [React](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [eve](https://eve.dev/)

## Project structure

```text
agent/   Agent definition, instructions, tools, and connections
app/     Next.js application and API routes
evals/   Agent evaluations
tests/   Automated tests
```

## Learn more

- [eve documentation](https://eve.dev/docs)
- [Build an eve agent](https://eve.dev/docs/tutorial/first-agent)
- [Deploy with eve](https://eve.dev/docs/guides/deployment/vercel)
