# Cloud TUI website

This is the standalone Next.js product website for Cloud TUI. It is separate
from the terminal application's Bun package and is not included in the
published CLI package.

## Run locally

From this directory:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The App Router page is
server-rendered and hydrated as a React client component. The context,
worktree, approval, task-plan, and session-picker demos use React state in
the browser.

## Production check

```bash
bun run typecheck
bun run build
bun run start
```

`bun run build` creates Next's `.next/` production output. The Next route at
`/` is the website entry point.

## Deploy to Vercel

Import the repository into Vercel and set the project's **Root Directory** to
`website`. Vercel will detect Next.js from this package and use the committed
`website/bun.lock` to install its dependencies.

Leave the output directory unset—Next.js manages `.next/` itself. No
environment variables or `vercel.json` configuration are required for this
site.

## Structure

```text
app/
├── globals.css             # Global visual system and responsive layout
├── layout.tsx              # Metadata and document shell
├── page.tsx                # App Router route
└── product-site.tsx        # React JSX and client-side product demos
```
