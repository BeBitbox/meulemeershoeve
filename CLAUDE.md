# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nuxt 3 static site for Meulemeershoeve (Belgian dog breeder, Berner Sennen + Golden Retriever). Content is in Dutch (`nl-BE`). Single-page app with one secondary route (`/fotos`).

## Commands

```bash
npm install            # bootstrap (yarn is blocked via engines)
npm run dev            # dev server at http://localhost:3000
npm run static-build   # SSG output to .output/public (what CI deploys)
npm run static         # SSG + serve locally to preview
npm run build          # SSR build (NOT used in production)
npm run preview        # preview SSR build
```

- npm engine is pinned to `>=8.0.0 <9.0.0`. CI uses Node 24.
- If `npm install` hangs, README notes disabling IPv6 as a workaround.
- No test runner, no linter, no formatter configured. Don't invent commands.

## Deploy

`.github/workflows/deploy-s3.yml` runs on every push to `main` (default branch): `npm run static-build` then syncs `.output/public/` to S3. There is no staging — pushing `main` ships to production.

## Architecture

**Content lives in S3, not the repo.** Pages fetch `https://s3.eu-west-3.amazonaws.com/be.meulemeershoeve/data.json` via `useFetch` at build time (SSG) and parse it client-side. Editing copy, photos, or planned litters (`nesten`) means editing that JSON, not Vue files. The shape used by `pages/index.vue`: `upperTitle.text`, `underTitle.text`, `aboutUs.text`, `vision.text`, `bernerSennen.text`, `goldenRetriever.text`, `fotos[]`, `nesten[]`.

**`composables/useTractor.ts` is load-bearing.** Every text block from `data.json` is HTML and goes through `replacerTractor()`, which:
1. `DOMPurify.sanitize()` (lazy-imported on mount — so SSR returns empty string, real content paints client-side)
2. Wraps the word `Meulemeershoeve` in `<span>` so SCSS can restyle it with `$detail-font` italic
3. Strips `<h1>`, `<p>`, `<br>` wrapper tags so the component's own template tags wrap the text

`tagChecker()` decides whether to render a block at all based on whether the raw input is wrapped in the expected tag. When adding new content slots, follow the same pattern: prop in → `tagChecker` gate + `replacerTractor` for `v-html`.

**Components are flat under `components/`** and auto-imported by Nuxt. `pages/index.vue` is a thin orchestrator passing sliced `siteData` into each section component. `layouts/default.vue` wraps everything with `Header` + `Footer` from `layouts/` (not auto-imported — explicitly imported).

**Styling**: global SCSS in `assets/style/` (`reset.scss`, `main.scss`) registered in `nuxt.config.ts`. Every component re-imports `~/assets/style/settings.scss` for variables (`$main-font`, `$gray`, `$title`, etc.). Keep that import when adding new components.

**Modules wired in `nuxt.config.ts`**:
- `@nuxt/ui` v3 (used mainly for `UNotifications` toaster in `app.vue`)
- `@vee-validate/nuxt` with custom component names (`VeeForm`, `VeeField`, etc.) — referenced by `Contact.vue`
- Pirsch analytics injected as a deferred `<script>` tag via `app.head.script` in `nuxt.config.ts` (no module)
- `colorMode.preference: 'light'` — dark mode is intentionally off
- `typescript.strict: false` — don't tighten this casually; existing `.vue` files rely on loose typing
