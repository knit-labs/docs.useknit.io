# Knit API Documentation

This repository powers [docs.useknit.io](https://docs.useknit.io), the public
documentation for the Knit API platform. It is a Nextra-based (Next.js) site
that explains how to integrate with our Collections, API Wallets, Payouts,
Business API Services Wallet, and webhook infrastructure.

## Prerequisites

- Node.js 18+
- `pnpm` (preferred) or `npm`

## Local Development

```bash
pnpm install
pnpm dev
```

The docs site will be available at `http://localhost:3000`. Content lives under
`/pages`; any `.mdx` file automatically becomes a route.

## Linting & Builds

- `pnpm build` — runs the Next.js production build
- `pnpm start` — serves the already-built site

## Conventions

- Keep prose in Markdown/MDX and component overrides in `components/`
- Navigation is driven by the `_meta.json` files inside each directory
- Reuse shared callouts/components so that request/response examples stay
  consistent with the API implementation in `useknit-api`

## Deployment

Deploys are handled by Vercel. Pushes to the default branch trigger an automatic
build. Preview deployments are available for pull requests.

## License

MIT
