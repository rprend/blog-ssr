# 100-Theme Site System Plan

## Goal

Build the site around one stable semantic content structure with many interchangeable visual skins. The visitor should be able to browse, preview, select, randomize, and persist a theme without changing the site's content model or routes.

The target is 100 themes, but the implementation should ship in phases so the system proves itself with 5-10 themes before scaling.

## Product Shape

The theme system should feel like a feature of the site, not a hidden preference.

- Add a `/themes` page that lists every available theme.
- Add a compact theme picker in the main navigation or sidebar.
- Persist the selected theme in `localStorage`.
- Support URL overrides like `?theme=win98` for sharing and testing.
- Add a random theme command.
- Add metadata for each theme: name, slug, category, description, status, tags, and optional preview image.
- Keep one canonical content experience so RSS, SEO, accessibility, and routes do not fragment.

## Core Principle

Do not build 100 separate sites.

Build one site with durable semantic primitives:

- `.site-shell`
- `.site-header`
- `.site-title`
- `.site-subtitle`
- `.site-nav`
- `.site-nav-link`
- `.site-main`
- `.site-sidebar`
- `.site-footer`
- `.post-list`
- `.post-card`
- `.post-title`
- `.post-meta`
- `.post-body`
- `.archive-list`
- `.theme-picker`
- `.theme-card`

Each theme should style those same primitives.

## Architecture

### 1. Theme Registry

Create a source-of-truth registry, likely in `src/themes.ts` or `src/build-outputs/themes.ts`.

Each theme should have this shape:

```ts
export interface SiteTheme {
  slug: string;
  name: string;
  category:
    | "retro-os"
    | "writing"
    | "old-web"
    | "terminal"
    | "minimal"
    | "brutalist"
    | "editorial"
    | "portfolio"
    | "novelty"
    | "seasonal";
  description: string;
  tags: string[];
  cssFile?: string;
  status: "planned" | "draft" | "ready";
  defaultDark?: boolean;
}
```

Start with a small hand-written registry. Generate the picker UI from this registry instead of hard-coding theme names in templates.

### 2. Theme Loading

Use a root attribute for theme selection:

```html
<html lang="en" data-theme="aqua">
```

Theme loading should follow this priority:

1. `?theme=<slug>` URL parameter
2. `localStorage.siteTheme`
3. default theme from registry, initially `aqua`

Use a tiny inline script in the base layout head to avoid a flash of the wrong theme:

```html
<script>
  (() => {
    const params = new URLSearchParams(location.search);
    const requested = params.get("theme");
    const saved = localStorage.getItem("siteTheme");
    document.documentElement.dataset.theme = requested || saved || "aqua";
  })();
</script>
```

The full picker script can run later at the end of the body.

### 3. CSS Organization

Keep the styling system layered:

```text
public/styles.css
public/themes/base.css
public/themes/aqua.css
public/themes/tufte.css
public/themes/win98.css
public/themes/system.css
public/themes/terminal.css
...
```

Recommended responsibilities:

- `base.css`: reset, accessibility defaults, semantic layout primitives, non-theme-specific behavior.
- Individual theme files: colors, type, layout treatment, borders, decorative details.
- `styles.css`: import base and active theme strategy, or remain the compiled/public entry file if the project does not add a bundling step.

For 100 themes, avoid one enormous file unless there is a deployment reason. Smaller theme files make ownership and review easier.

### 4. Loading Strategy

There are two viable approaches.

#### Option A: Load All Theme CSS

Use selectors like:

```css
:root[data-theme="aqua"] { ... }
:root[data-theme="win98"] { ... }
```

Pros:

- Very simple.
- Theme switches are instant.
- No dynamic stylesheet loading bugs.

Cons:

- 100 themes can make CSS heavy.
- More risk of selector collisions if themes are not disciplined.

Use this for the first 10-20 themes.

#### Option B: Dynamically Load Theme CSS

Keep base CSS always loaded, then switch a theme stylesheet:

```html
<link id="theme-css" rel="stylesheet" href="/themes/aqua.css">
```

Pros:

- Keeps initial CSS smaller.
- Easier to isolate each theme.
- Better long-term fit for 100 themes.

Cons:

- Need preload/fallback logic.
- Theme switching can briefly flash if not handled carefully.

Use this once the theme count grows beyond the first tranche.

### 5. Theme Picker UI

Add a `/themes` page with:

- Search/filter input.
- Category tabs or segmented controls.
- Theme cards with name, category, tags, and status.
- Apply button.
- Preview link using `?theme=<slug>`.
- Random theme button.
- Current theme indicator.

Add a compact picker in the sidebar or nav:

- Current theme name.
- Previous/next controls.
- Random button.
- Link to full `/themes` page.

The picker should work without requiring a framework. A small script can read embedded registry JSON or a generated JS module.

### 6. Theme Preview Images

Phase one can skip screenshots and use live preview links.

Phase two should generate preview thumbnails:

- Start dev server.
- Visit key pages with each theme parameter.
- Capture screenshots with Playwright.
- Save to `public/theme-previews/<slug>.png`.
- Display those thumbnails on `/themes`.

Key pages to capture:

- Home
- Blog list
- Blog post
- Archives

### 7. Accessibility Requirements

Every theme should meet baseline usability requirements:

- Body text remains readable at mobile and desktop widths.
- Keyboard focus is visible.
- Links are distinguishable without relying only on color.
- Theme picker controls are buttons/selects with labels.
- No theme blocks core content.
- Motion-heavy themes respect `prefers-reduced-motion`.
- Dark themes use sufficient contrast.
- Print output remains usable, even if it falls back to a print theme.

Create a short review checklist and run it for every theme before marking it `ready`.

## Theme Taxonomy

The 100 themes should be organized so they feel intentionally curated instead of random.

### Retro OS

1. Aqua
2. Classic Mac
3. Windows 95
4. Windows 98
5. Windows XP
6. Windows 7
7. DOS
8. Commodore 64
9. PalmPilot
10. iPod

### Writing and Publishing

11. Tufte
12. LaTeX
13. Newspaper
14. Magazine
15. Paperback
16. Academic Journal
17. Field Notes
18. Legal Brief
19. Encyclopedia
20. Markdown Reader

### Old Web

21. HTML 1.0
22. GeoCities
23. Blogger
24. MySpace
25. Tumblr
26. Craigslist
27. Hacker News
28. Wikipedia
29. RSS Reader
30. Webring

### Terminal and Editor

31. Green Terminal
32. Amber Terminal
33. Solarized Light
34. Solarized Dark
35. Monokai
36. Dracula
37. Gruvbox
38. Nord
39. Catppuccin
40. Vim Help

### Personal Site Archetypes

41. Personal Blog
42. Digital Garden
43. Public Wiki
44. CV
45. Portfolio
46. Now Page
47. Uses Page
48. Colophon
49. Guestbook
50. Personal Portal

### Physical Metaphors

51. Receipt
52. Index Cards
53. Filing Cabinet
54. Notebook
55. Corkboard
56. Whiteboard
57. Blueprint
58. Calendar
59. Map
60. Museum Label

### Institutional and Utility

61. Government Form
62. University Page
63. Library Catalog
64. Airline Departures
65. Diner Menu
66. Record Store
67. Art Gallery
68. Hardware Manual
69. Financial Terminal
70. Classified Ads

### Minimal Modes

71. Plain HTML
72. Brutalist
73. Swiss Grid
74. Monochrome
75. High Contrast
76. Print
77. Large Type
78. No CSS
79. Reader Mode
80. Low Bandwidth

### Maximal Modes

81. Sticker Sheet
82. Badge Wall
83. Tiled Background
84. Pixel Art
85. Vaporwave
86. Cyberpunk
87. Scrapbook
88. Collage
89. Arcade
90. Toy UI

### Seasonal and Easter Eggs

91. Winter
92. Summer
93. Midnight
94. Sunrise
95. Birthday
96. Launch Day
97. Archive Mode
98. Random Chaos
99. Secret Mode
100. Theme Museum

## First 10 Themes

Build these first because they validate the widest range of layout and styling requirements:

1. `aqua` - preserve and polish the current site identity.
2. `tufte` - activate the existing Tufte direction for longform writing.
3. `latex` - academic paper style.
4. `win98` - Windows 98 desktop/blog portal.
5. `system` - classic Mac monochrome UI.
6. `terminal` - command-line text interface.
7. `geocities` - old-web maximal mode.
8. `brutalist` - hard borders, default links, raw structure.
9. `newspaper` - editorial archive and article layout.
10. `plain` - semantic HTML baseline / no-frills fallback.

## Implementation Phases

### Phase 1: Foundation

- Refactor layout markup to stable semantic primitives.
- Preserve current visual design as the `aqua` theme.
- Add root `data-theme`.
- Add theme persistence script.
- Add a small theme registry.
- Add `/themes` route.
- Add simple picker UI.
- Implement `aqua`, `plain`, and `terminal`.

### Phase 2: First Real Theme Set

- Add `tufte`, `latex`, `win98`, `system`, `geocities`, `brutalist`, and `newspaper`.
- Add category filtering to `/themes`.
- Add random theme button.
- Add `?theme=` share links.
- Add theme status badges.
- Create manual QA checklist.

### Phase 3: Preview and QA Automation

- Add Playwright screenshot generation.
- Generate theme thumbnails.
- Add a script to test every ready theme across mobile and desktop.
- Check for horizontal overflow.
- Check that theme picker controls remain visible.
- Add accessibility checks where practical.

### Phase 4: Scale to 30-40 Themes

- Move to dynamic CSS loading if CSS size becomes unwieldy.
- Add theme tags.
- Add favorites/recent themes if the picker gets crowded.
- Add keyboard shortcuts.
- Add theme-of-the-day logic.

### Phase 5: Scale to 100 Themes

- Batch themes by taxonomy category.
- Keep each theme small and focused.
- Require every theme to pass the visual QA checklist.
- Add a `/themes/<slug>` detail page if previews and notes become substantial.
- Consider a "theme museum" page explaining the references behind each theme.

## Route Changes

Likely route additions:

- `/themes` - picker and gallery.
- `/themes/random` - optional redirect to a random `?theme=` URL.
- `/colophon` - should mention the theme system and current theme architecture.

Existing routes should continue to work without theme-specific variants.

## Content and Markup Requirements

To make 100 themes possible, pages need consistent markup. Avoid page-specific ad hoc class names unless they map to reusable roles.

Recommended content blocks:

- Hero/site identity block.
- Navigation block.
- Recent posts block.
- Archive block.
- Sidebar module block.
- Link list block.
- Article body block.
- Metadata block.
- Footer block.

Each block should be styleable without rewriting templates per theme.

## External CSS Pack Strategy

Use external packs as references or adapters, not as uncontrolled global resets.

Good candidates:

- `98.css` for Windows 98.
- `XP.css` for Windows XP.
- `7.css` for Windows 7.
- `System.css` for classic Mac.
- `Tufte CSS` for longform writing.
- `LaTeX.css` for academic mode.
- `Terminal CSS` for terminal mode.
- `NES.css` or `PSone.css` only for novelty modes.

If imported, isolate them behind a theme-specific stylesheet and adapt the site primitives to their component expectations.

## Risks

- CSS collisions between themes.
- Theme picker becoming too busy.
- External theme packs forcing awkward HTML.
- Accessibility regressions in novelty themes.
- Mobile layouts breaking in desktop-metaphor themes.
- 100 themes becoming a maintenance burden.

Mitigations:

- Keep semantic primitives stable.
- Use a registry and status field.
- Mark experimental themes as `draft`.
- Add screenshot QA early.
- Keep `plain` as a reliable fallback.
- Avoid modifying content templates for one-off visual jokes.

## Definition of Done for the System

The theme system is ready when:

- A visitor can choose, randomize, and persist a theme.
- Theme choice works across routes.
- `?theme=<slug>` works for sharing.
- `/themes` lists all available themes.
- At least 10 themes are implemented and marked ready.
- The current site design is preserved as `aqua`.
- Mobile and desktop screenshots pass for all ready themes.
- The implementation can scale by adding a registry entry and a CSS file.

