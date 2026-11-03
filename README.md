# Incident Copilot

Incident Copilot is a demo assistant for investigating customer incidents using fictional incident data. It brings together mock tickets, logs, deployments, and account details to help an incident commander understand what happened and prepare a clear customer update.

> **Demo only:** All business records and connected systems are mock data. The language model is real. This project does not access or modify production systems. Saving a drafted customer reply to the mock outbox requires explicit approval.

## What it can do

- Investigate the sample incidents **INC-1042** (Acme Retail checkout) and **INC-1043** (Northstar Health dashboard).
- Gather related tickets, logs, deployment history, and account information from mock systems.
- Summarize findings for an incident commander.
- Draft customer communications and, with approval, save them to a mock outbox.

## Tech stack

- [eve](https://eve.dev) agent framework
- Next.js, React, and TypeScript
- Mock-systems MCP connection for demo incident records

## Run locally

Requires Node.js 24 and pnpm.

```bash
pnpm install
pnpm dev
```

This starts the Next.js app. To run the agent in eve's interactive development interface instead, use:

```bash
pnpm dev:eve
```

## Useful commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the web app locally. |
| `pnpm dev:eve` | Start the eve agent development interface. |
| `pnpm build` | Build the web app. |
| `pnpm build:eve` | Build the eve agent. |
| `pnpm test` | Run the test suite. |
| `pnpm typecheck` | Check TypeScript types. |
| `pnpm eval` | Run agent evaluations. |
| `pnpm deploy` | Deploy the agent with eve. |

## Project layout

- `agent/` — agent definition, instructions, tools, connections, and channels.
- `app/` — Next.js application and API routes.
- `evals/` — agent evaluations.
- `tests/` — automated tests.

## Learn more

- [eve documentation](https://eve.dev/docs)
- [Build an eve agent](https://eve.dev/docs/tutorial/first-agent)
- [Deploy with eve](https://eve.dev/docs/guides/deployment/vercel)
