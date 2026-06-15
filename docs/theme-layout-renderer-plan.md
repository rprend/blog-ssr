# User-Supplied Theme Implementation Plan

This is the active plan. It replaces the old 100-theme idea and the older abstract theme packs.

Source of truth:

- Raw URLs: `docs/theme-references/user-supplied-sites.md`
- Per-site theme list: `docs/theme-references/user-supplied-theme-plan.md`
- Runtime registry: `src/themes.ts`
- Runtime renderers: `src/theme-renderers.ts`
- Audit: `scripts/auditThemeLayouts.js`

## Goal

Build a theme picker where Ryan's site can switch between direct mimics of the supplied reference sites.

The content stays identical across themes:

- Home intro and linklog entries.
- Blog index.
- Blog posts.
- Archives.
- Contact.
- Guestbook.
- Theme picker.

Only the shell, navigation, layout hierarchy, density, typography, route structure, and styling change.

## Current Status

All 53 user-supplied themes are in `src/themes.ts` and marked `built`.

All 53 slugs are mapped in `src/theme-renderers.ts` to a renderer family that outputs target-specific DOM for the primary routes:

- Home.
- Blog index.
- Archives.
- Blog post shell where applicable.

The picker now uses only the supplied-site registry. The old invented theme categories are not part of the active theme list.

## Implementation Shape

The implementation currently uses one renderer module, `src/theme-renderers.ts`, with one `RendererFamily` per supplied-site mimic. This keeps the shared content model stable while allowing each theme to restructure the same data differently.

Each built theme must have:

- A slug in `src/themes.ts`.
- A target URL from `docs/theme-references/user-supplied-sites.md`.
- A `familyBySlug` mapping in `src/theme-renderers.ts`.
- A target-specific home layout branch.
- A target-specific blog index or shared direct-mimic family branch.
- A target-specific archive or shared direct-mimic family branch.
- CSS selectors in `public/styles.css`.
- A reference file at `docs/theme-references/sites/<slug>.md`.

## Completed Batches

Batch 1:

- `spartan-essay-table`
- `monospace-manual`
- `plaintext-scoreboard`
- `fashion-archive-index`
- `playful-climber-scrapbook`
- `coordinates-art-index`
- `no-css-club`
- `annotated-research-sidenotes`

Batch 2:

- `spaced-wordmark-studio`
- `intimate-builder-notes`
- `research-tools-studio`
- `contemporary-art-library`
- `idealist-studio-index`
- `lifeworks-cargo-cv`
- `artist-news-ledger`
- `latent-garden-notebook`

Batch 3:

- `fragment-library-journal`
- `ucoz-folk-archive`
- `empty-uncertainty-schema`
- `transparent-news-briefing`
- `graphic-bookmaker-card`
- `experimental-publication-loop`
- `taste-directory`
- `recent-writer-ledger`

Batch 4:

- `artist-menu-works`
- `friendly-nerd-hub`
- `playful-games-cabinet`
- `creativity-portal-gallery`
- `design-archive-repository`
- `weblog-topic-facets`
- `research-lab-index`
- `visual-culture-practice`

Batch 5:

- `room-wall-portfolio`
- `artist-book-microsite`
- `cyberfeminist-download-index`
- `nonfiction-visual-index`
- `personal-html-bulletin`
- `daily-consumption-digest`
- `data-graphics-portfolio`
- `internet-map-diagram`

Batch 6:

- `vernacular-web-essay`
- `cheap-web-manifesto`
- `poetic-computation-article`
- `feral-web-essay`
- `performance-club-index`
- `recurse-link-joy`
- `scenario-forecast-report`
- `rationalist-forum-frontpage`

Batch 7:

- `blogroll-essay-archive`
- `now-page-directory`
- `conversational-minimalist`
- `founder-link-index`
- `ai-grant-application-page`

## Verification

Run these after theme changes:

```sh
npm run audit:themes
npx tsc --noEmit
npm run build
npx wrangler deploy --dry-run --outdir /tmp/ryan-theme-worker
```

`npm run audit:themes` must confirm:

- 53 supplied URLs.
- 53 planned rows.
- 53 registry themes.
- All registry URLs come from the supplied URL list.
- All registry slugs exist in the plan.
- No old invented slugs are in the active registry.
- Every built slug has a renderer mapping.
- Every built slug has a reference file.

## Remaining Hardening

These are follow-up quality steps, not blockers for the current 53-theme implementation:

- Capture desktop and mobile screenshots for every target site and save them under `docs/theme-references/screenshots/`.
- Expand each `docs/theme-references/sites/<slug>.md` from a stub into a detailed visual checklist.
- Add automated page probes that request `/`, `/blog`, and `/archives` with every `?theme=<slug>` and assert the response contains the expected `family-...` class.
- Consider splitting `src/theme-renderers.ts` into `src/theme-mimics/<slug>/renderer.ts` modules if the central file becomes hard to maintain.
