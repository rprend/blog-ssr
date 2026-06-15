# User-Supplied Theme Implementation Plan

This is the active theme plan. It replaces every previous 100-theme/reference plan.

Source of truth:

- Raw supplied URLs: `docs/theme-references/user-supplied-sites.md`
- Per-site theme list and layout notes: `docs/theme-references/user-supplied-theme-plan.md`

Do not add other target sites. Do not revive the old abstract theme list. Do not use the old generic renderer-family implementation as the target architecture.

## Goal

Build a theme system where each theme directly mimics one of Ryan's supplied sites.

The site content remains the same:

- Home/linklog entries.
- Blog index.
- Blog posts.
- Archives.
- Contact.
- Guestbook.
- Theme picker.

Only the presentation, page structure, navigation, and interaction model change.

## Non-Negotiables

- The supplied URL list is authoritative.
- Theme names come from each site's visible vibe.
- Every built theme gets a dedicated renderer and CSS file.
- Shared helpers are allowed; shared visual templates are not.
- A theme is incomplete until it has captured references, route mapping notes, screenshots, and content-preservation checks.
- The old token-only themes should be removed from the picker or hidden behind a legacy/dev flag.

## Files To Create

```text
src/theme-mimics/
  registry.ts
  types.ts
  render.ts
  helpers.ts
  legacy-aqua/
    renderer.ts
    styles.css
  spartan-essay-table/
    renderer.ts
    styles.css
  monospace-manual/
    renderer.ts
    styles.css
  ...

docs/theme-references/sites/
  spartan-essay-table.md
  monospace-manual.md
  ...

docs/theme-references/screenshots/
  spartan-essay-table-desktop.png
  spartan-essay-table-mobile.png
  ...
```

## Registry Shape

```ts
export interface ThemeMimic {
  slug: string;
  name: string;
  targetUrl: string;
  status: "planned" | "referenced" | "built" | "blocked";
  vibe: string;
  renderer?: ThemeRenderer;
  stylesheet: string;
  referencePath: string;
  screenshots: {
    desktop?: string;
    mobile?: string;
  };
}
```

`src/theme-mimics/registry.ts` should be generated manually from `docs/theme-references/user-supplied-theme-plan.md` at first. Later, it can become data-driven.

## Renderer Contract

Each theme renderer owns its DOM.

```ts
export interface ThemeRenderer {
  shell: (props: ShellProps) => string;
  home: (model: HomeModel) => string;
  blogIndex: (model: BlogIndexModel) => string;
  blogPost: (model: BlogPostModel) => string;
  archives: (model: ArchiveModel) => string;
  contact: (model: GenericPageModel) => string;
  guestbook: (model: GuestbookModel) => string;
  themes: (model: ThemesModel) => string;
}
```

Fallbacks are allowed only while a theme is `planned` or `referenced`. A theme marked `built` cannot call the generic fallback renderer for primary routes.

## Canonical Models

Keep the current canonical model idea, but move it out of `src/worker.ts` into focused files:

```text
src/content-models/
  home.ts
  blog.ts
  archives.ts
  guestbook.ts
  generic.ts
```

This matters because each mimic must be able to restructure identical content without route handlers knowing about a specific target site.

## Implementation Phases

### Phase 1: Retire Old Theme Surface

1. Replace `src/themes.ts` with the supplied-site registry.
2. Remove old categories such as `retro-os`, `writing`, `old-web`, `terminal`, etc.
3. Keep the old Aqua design as `legacy-aqua` only if it remains useful as the default.
4. Update `/api/themes` to return:
   - slug
   - name
   - targetUrl
   - status
   - vibe
   - screenshots
5. Update `/themes` to show supplied-site targets, not abstract theme cards.

Definition of done:

- None of the old invented themes appear in `/themes`.
- The picker shows only the user-supplied targets.
- Every listed theme has a target URL from `user-supplied-sites.md`.

### Phase 2: Capture References

For each supplied site, create `docs/theme-references/sites/<slug>.md`.

Each reference file must include:

- Target URL.
- Capture date.
- Desktop screenshot path.
- Mobile screenshot path.
- Header/navigation notes.
- Home page structure.
- Index/list structure.
- Article/detail structure.
- Archive structure.
- Mobile behavior.
- Rejection criteria.

Definition of done:

- All 53 themes have reference files.
- All available sites have desktop and mobile screenshots.
- Unavailable sites are marked `blocked` with the failure reason.

### Phase 3: Build First Eight Themes

Build in this order:

1. `spartan-essay-table` from `https://paulgraham.com/`
2. `monospace-manual` from `https://owickstrom.github.io/the-monospace-web/`
3. `plaintext-scoreboard` from `https://plaintextsports.com/`
4. `fashion-archive-index` from `https://www.032carchive.com/`
5. `playful-climber-scrapbook` from `https://ashimashiraishi.com/`
6. `coordinates-art-index` from `https://jonrafman.com/`
7. `no-css-club` from `https://nocss.club/`
8. `annotated-research-sidenotes` from `https://gwern.net/`

Why these first:

- They are structurally different.
- They cover bare essay, monospaced manual, data table, archive index, playful personal site, artist chronology, no-CSS HTML, and dense research essay.
- If these still look the same, the architecture is wrong.

Definition of done:

- Each has its own renderer directory.
- Each route has target-specific DOM, not only target-specific CSS.
- Screenshots prove visual difference.
- Content-preservation tests pass.

### Phase 4: Build Remaining Themes In Batches

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

Every batch must end with:

- `npm run build`
- TypeScript check
- theme registry audit
- screenshot capture for built themes
- content-preservation audit

## Per-Theme Implementation Requirements

The detailed target-specific plans live in `docs/theme-references/user-supplied-theme-plan.md`. The implementation must preserve those layout plans. Examples:

- `spartan-essay-table` must look like a bare Paul Graham-style essay/index site, not a generic serif blog.
- `monospace-manual` must use the target's manual structure: metadata table, contents, monospace sections, ASCII/table feeling.
- `plaintext-scoreboard` must transform posts/links into scoreboard-like dated rows with league/filter affordances.
- `fashion-archive-index` must use counted archive entities and filter tabs.
- `no-css-club` must genuinely use browser-default/semantic HTML as the main effect.
- `annotated-research-sidenotes` must support dense reading, sidenotes, link annotations/backlink-like affordances.

## Tests And Audits

Add scripts:

```text
scripts/auditSuppliedThemes.js
scripts/captureThemeScreenshots.js
scripts/auditThemeContent.js
```

`auditSuppliedThemes.js` checks:

- Registry contains exactly the URLs from `user-supplied-sites.md`.
- Every registry slug appears in `user-supplied-theme-plan.md`.
- No old invented theme slugs remain.
- Built themes have renderer, stylesheet, reference file, and screenshots.

`auditThemeContent.js` checks built themes:

- Every home link title appears.
- Every blog index post title appears.
- Blog post title and body appear.
- Archive month labels and post titles appear.
- Contact content appears.
- Theme picker remains usable.

`captureThemeScreenshots.js` captures:

- `/`
- `/blog`
- one blog post
- `/archives`
- `/themes`

At desktop and mobile widths.

## Rejection Criteria

Reject a theme if:

- It looks like the current generic family renderer.
- It could be renamed to another target without obvious mismatch.
- It changes colors but keeps the same DOM structure.
- It hides Ryan content.
- It has no screenshot comparison.
- It has no reference file.
- It uses any target not present in `user-supplied-sites.md`.

## Current Next Step

Implement Phase 1:

1. Create `src/theme-mimics/registry.ts` from the 53 supplied URLs.
2. Update `/api/themes` and `/themes` to use that registry.
3. Hide or remove old `src/themes.ts` categories from the picker.
4. Keep `legacy-aqua` only as the default rendering fallback while the first supplied-site mimic is built.
