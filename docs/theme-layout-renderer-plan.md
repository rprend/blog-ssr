# Theme Layout Renderer Plan

## Problem

The first implementation made 100 themes mostly by changing design tokens: color, typography, borders, and surface treatments. That proves the picker and registry, but it does not satisfy the real idea.

The real idea is:

- The content is identical between themes.
- The layout and interaction model can change radically between themes.
- Hacker News should look and scan like Hacker News.
- Windows 98 should look like a desktop/window system.
- Tufte should look like a longform essay page.
- Terminal should feel like a command-line interface.
- GeoCities should feel like an old personal homepage.

The fix is to separate **canonical content** from **theme renderers**.

## Core Principle

Do not make themes style the same DOM forever.

Instead:

1. Build one canonical content model for each route.
2. Pass that content model into a selected theme renderer.
3. Let each theme renderer produce different HTML structure.
4. Keep URLs, SEO, RSS, metadata, and content source stable.

This is closer to a newspaper using the same article wire copy in many different page templates than to a CSS color switcher.

## Target Architecture

```text
route handler
  -> load canonical content model
  -> choose active theme
  -> choose renderer for route + theme
  -> render HTML
  -> wrap in document shell
```

Example:

```ts
app.get("/blog", async (c) => {
  const model = await getBlogIndexModel();
  return renderThemedPage(c, {
    routeType: "blog-index",
    title: "Blog - Ryan Prendergast",
    currentPage: "/blog",
    model,
    seo,
  });
});
```

Then:

```ts
renderThemedPage(context, page) {
  const theme = resolveTheme(context.req);
  const renderer = getRenderer(theme.slug, page.routeType);
  const content = renderer(page.model);
  return layoutRenderer(theme.layoutShell, content, page.seo);
}
```

## Canonical Content Models

The content models are the contract. Themes can rearrange them, but cannot invent different content.

### Site Model

```ts
interface SiteModel {
  title: "Ryan Prendergast";
  subtitle?: string;
  navItems: NavItem[];
  footerLinks: NavItem[];
  theme: SiteTheme;
}
```

### Home / Linklog Model

```ts
interface HomeModel {
  intro: HtmlBlock[];
  links: LinkEntryViewModel[];
  recentPosts: PostSummary[];
  aboutText: HtmlBlock[];
}
```

Themes can render this as:

- Current Aqua two-column blog.
- Hacker News-style ranked list.
- Windows desktop folder of links.
- RSS reader split pane.
- GeoCities portal.
- Newspaper front page.

The link entries stay identical.

### Blog Index Model

```ts
interface BlogIndexModel {
  description: string;
  postsByYear: Array<{
    year: string;
    posts: PostSummary[];
  }>;
  totalPosts: number;
  yearRange: [number, number];
}
```

Themes can render this as:

- Archive list.
- HN item list.
- Library catalog.
- Filing cabinet.
- Terminal `ls -R`.
- Calendar/timeline.

### Blog Post Model

```ts
interface BlogPostModel {
  title: string;
  subtitle?: string;
  author?: string;
  date: string;
  isoDate: string;
  contentHtml: string;
  backHref: string;
  relatedPosts?: PostSummary[];
}
```

Themes can render this as:

- Essay article.
- LaTeX paper.
- Man page.
- Newspaper column.
- Wiki page.
- Printed memo.

### Archive Model

```ts
interface ArchiveModel {
  months: Array<{
    key: string;
    label: string;
    posts: PostSummary[];
  }>;
  totalPosts: number;
}
```

Themes can render this as:

- Month sections.
- Calendar grid.
- File tree.
- Library shelf.
- Terminal directory listing.
- Spreadsheet.

### Guestbook Model

```ts
interface GuestbookModel {
  entries: GuestbookEntry[];
  canSign: boolean;
}
```

Themes can render this as:

- Old-web guestbook.
- Bulletin board.
- Corkboard notes.
- Terminal message log.
- Museum comment cards.

## Renderer Layers

### 1. Document Shell Renderer

This controls the outer page frame.

Examples:

- `aquaShell`: top Aqua nav, main column, sidebar.
- `hnShell`: orange top bar, centered table-like page.
- `win98Shell`: desktop background, taskbar, draggable-looking windows.
- `terminalShell`: full-screen console.
- `tufteShell`: centered article with sidenote column.
- `geocitiesShell`: tiled background, badge rail, visitor counter.

The shell receives:

```ts
interface ShellProps {
  site: SiteModel;
  pageTitle: string;
  contentHtml: string;
  sidebarHtml?: string;
  structuredData?: string;
}
```

### 2. Route Renderer

This controls how a specific route's model is arranged.

```ts
interface ThemeRenderer {
  shell: ShellRenderer;
  routes: {
    home: Renderer<HomeModel>;
    blogIndex: Renderer<BlogIndexModel>;
    blogPost: Renderer<BlogPostModel>;
    archives: Renderer<ArchiveModel>;
    guestbook: Renderer<GuestbookModel>;
    contact: Renderer<ContactModel>;
    themes: Renderer<ThemesModel>;
  };
}
```

If a theme does not implement a route renderer, it falls back to a compatible base renderer.

### 3. CSS Theme File

CSS becomes supporting presentation, not the whole theme.

For example:

```text
src/theme-renderers/hacker-news.ts
public/themes/hacker-news.css
```

The HTML shape and CSS are paired.

## File Structure

Recommended structure:

```text
src/content-models/
  home.ts
  blog.ts
  archives.ts
  guestbook.ts
  site.ts

src/theme-renderers/
  index.ts
  types.ts
  base/
    shell.ts
    home.ts
    blog-index.ts
    blog-post.ts
    archives.ts
  aqua/
    index.ts
    shell.ts
    home.ts
    blog-index.ts
    blog-post.ts
  hacker-news/
    index.ts
    shell.ts
    home.ts
    blog-index.ts
    blog-post.ts
  win98/
    index.ts
    shell.ts
    home.ts
    blog-index.ts
  tufte/
    index.ts
  terminal/
    index.ts

public/themes/
  base.css
  aqua.css
  hacker-news.css
  win98.css
  tufte.css
  terminal.css
```

The current `src/templates/*.html` approach should be replaced gradually by render functions that receive typed models.

## Theme Registry Changes

The registry needs to describe renderer capability, not only visual metadata.

```ts
interface SiteTheme {
  slug: string;
  name: string;
  category: ThemeCategory;
  description: string;
  tags: string[];
  status: "planned" | "draft" | "ready";
  renderer: string;
  cssFile: string;
  layoutMode:
    | "blog"
    | "feed"
    | "desktop"
    | "terminal"
    | "document"
    | "portal"
    | "catalog"
    | "dashboard"
    | "experimental";
  implementedRoutes: RouteType[];
}
```

Example:

```ts
{
  slug: "hacker-news",
  name: "Hacker News",
  renderer: "hackerNews",
  cssFile: "/themes/hacker-news.css",
  layoutMode: "feed",
  implementedRoutes: ["home", "blog-index", "blog-post", "archives"],
}
```

## Concrete Theme Examples

### Hacker News

Must not just be orange.

Shell:

- Centered page at roughly HN width.
- Orange top bar.
- Tiny typography.
- Login/new/comments-like links in top nav.
- Main content as compact rows.

Home:

- Linklog entries become ranked HN-style items.
- Title line includes domain.
- Commentary becomes subtext/comment excerpt.
- Date becomes points/comment-style metadata.

Blog index:

- Posts become item rows.
- Year grouping becomes separator rows or `More` pages.

Blog post:

- Article becomes an HN discussion page: title row, metadata row, body as first text block, replies area optionally replaced by links/notes.

### Windows 98

Must not just be teal and gray.

Shell:

- Desktop background.
- Top-level site sections become desktop icons.
- Main content appears inside one or more windows.
- Sidebar modules become smaller utility windows.
- Footer becomes taskbar.

Home:

- Intro in an "About Ryan.txt" window.
- Linklog in an "Internet Links" explorer window.
- Recent posts in a small "Recent Essays" window.

Blog post:

- Render as a document window with title bar controls.
- Back link is an explorer breadcrumb or toolbar button.

### Tufte

Must not just be serif.

Shell:

- Wide reading canvas.
- Main article column with sidenote gutter.
- Minimal nav.

Home:

- Intro is a short preface.
- Linklog becomes annotated reading list.

Blog post:

- Content gets longform article treatment.
- Existing footnotes, blockquotes, images, and headings get careful essay layout.

### Terminal

Must not just be monospace.

Shell:

- Full-screen console.
- Prompt header.
- Navigation represented as commands.

Home:

- Intro appears after `cat about.txt`.
- Links appear after `ls links/`.
- Entries appear as command output.

Blog index:

- `ls blog/2026`
- Posts listed as file names with dates.

Blog post:

- `cat blog/title.md`
- Body rendered as terminal text with preserved readable HTML.

### GeoCities

Must not just be bright.

Shell:

- Tiled/patterned background.
- Badge rail.
- Visitor-counter style element.
- "Under construction" style accents.

Home:

- Personal intro as homepage welcome.
- Linklog as a hand-curated links page.
- Blogroll/webring modules prominent.

### Newspaper

Must not just use serif.

Shell:

- Masthead.
- Date line.
- Multi-column editorial grid.

Home:

- Latest linklog entry as lead story.
- Remaining links as smaller columns.
- Recent posts as side rail.

Blog post:

- Article page with deck, byline, drop cap, columns when appropriate.

## Migration Plan

### Phase 1: Extract Content Models

Keep the current visual output, but stop building HTML directly inside route handlers.

Do this first:

- `getHomeModel()`
- `getBlogIndexModel()`
- `getBlogPostModel(slug)`
- `getArchiveModel()`
- `getSiteModel(currentPage)`

The existing Aqua templates can consume these models to preserve current behavior.

Definition of done:

- Current site looks the same.
- Route handlers mostly assemble models and call `renderThemedPage`.
- No theme-specific content logic lives in route handlers.

### Phase 2: Build Renderer Interface

Add:

- `src/theme-renderers/types.ts`
- `src/theme-renderers/index.ts`
- `src/theme-renderers/base`
- `src/theme-renderers/aqua`

Make `aqua` the first real renderer and move current layout into it.

Definition of done:

- `aqua` renders from content models.
- Theme registry maps `aqua` to the Aqua renderer.
- Existing `/themes` picker still works.

### Phase 3: Implement 5 Real Layout Themes

Do not implement all 100 at once. Build five radically different renderer families first:

1. `aqua` - current blog shell.
2. `hacker-news` - feed/table layout.
3. `win98` - desktop/window layout.
4. `tufte` - document/essay layout.
5. `terminal` - command-line layout.

These five prove the abstraction because they require genuinely different HTML.

Definition of done:

- Same home/blog/archive/post content appears in all five.
- DOM structure differs substantially per renderer.
- Theme screenshots are visibly different in layout, not only color.

### Phase 4: Add Renderer Families

Do not create 100 totally unique renderers. Create 10-15 renderer families, then assign themes to families.

Families:

- `blogClassic`
- `feedCompact`
- `desktopOs`
- `terminalConsole`
- `longformDocument`
- `oldWebPortal`
- `wikiReference`
- `catalogCards`
- `dashboardPanels`
- `editorialMagazine`
- `physicalArtifact`
- `minimalRaw`
- `maximalCollage`

Then themes can share a renderer family while having different CSS and small renderer options.

Example:

- `hacker-news`, `craigslist`, and `rss-reader` use `feedCompact` with different options.
- `win95`, `win98`, `windows-xp`, and `classic-mac` use `desktopOs`.
- `tufte`, `latex`, `paperback`, and `academic-journal` use `longformDocument`.

### Phase 5: Renderer Options

Give families options so themes can differ without duplicating full renderers.

```ts
interface FeedCompactOptions {
  rankItems: boolean;
  showDomains: boolean;
  topBarLabel: string;
  metadataStyle: "hn" | "rss" | "classifieds";
}
```

```ts
interface DesktopOptions {
  desktopIcons: boolean;
  taskbar: boolean;
  windowChrome: "win98" | "xp" | "classic-mac";
  startMenuLabel?: string;
}
```

### Phase 6: Preview and QA

Generate screenshots for each theme and route:

- `/`
- `/blog`
- one blog post
- `/archives`
- `/themes`

Automated checks:

- Theme registry has 100 themes.
- Every theme maps to a renderer family.
- Every theme has CSS.
- Every ready renderer supports required route types.
- No route falls back accidentally unless marked in registry.
- Screenshots exist for every ready theme.

Manual checks:

- Does this look like the named reference?
- Is the layout meaningfully different?
- Is the content identical?
- Is the page readable on mobile?

## Implementation Rule

A theme is not "ready" unless it changes at least one of:

- Shell structure.
- Navigation pattern.
- Content grouping.
- Post/list rendering.
- Sidebar/module placement.
- Page metaphor.

Changing only color, font, radius, or border style is a `skin`, not a `theme`.

The registry should distinguish this:

```ts
status: "skin" | "layout-draft" | "ready"
```

or:

```ts
depth: "token" | "layout" | "interaction"
```

Only `layout` or `interaction` themes count toward the 100-theme goal.

## How To Preserve Identical Content

Use content-model equality tests.

For each route:

1. Generate canonical model once.
2. Render it through multiple themes.
3. Extract text content from rendered HTML.
4. Compare normalized text for required content.

The text does not need to be in the same order for every theme, but no required item should disappear.

Example invariant:

- Every linklog entry title exists.
- Every linklog entry URL exists.
- Every blog post title exists on `/blog`.
- The blog post body HTML exists on post pages.
- Archive month labels and post titles exist.

## First Rewrite Target

The next implementation should replace the current token-only system with this minimum real version:

- Keep all 100 theme names in registry.
- Mark most as `layout-draft`.
- Implement 5 layout-real themes:
  - `aqua`
  - `hacker-news`
  - `win98`
  - `tufte`
  - `terminal`
- Keep token-only themes available only as drafts or skins.
- Update `/themes` to show "Layout", "Skin", or "Draft" status.
- Add screenshots/previews for the 5 real themes.

This gets the project back on the right conceptual track without pretending 100 real layouts exist yet.

## Success Criteria

The redesign is successful when:

- The same content model can render through multiple layouts.
- Hacker News looks like a compact HN-style feed.
- Windows 98 looks like a desktop/window UI.
- Tufte looks like a longform document.
- Terminal looks like a console.
- Aqua preserves the existing site.
- Theme selection still persists and works with `?theme=`.
- `/themes` communicates which themes are real layout themes vs planned/draft skins.
- Tests or audits prove content is not lost between theme renderers.

