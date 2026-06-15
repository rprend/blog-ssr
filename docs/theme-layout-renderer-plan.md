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

## Reference Research Pools

Use these pools when expanding the reference catalog. They are especially useful because they collect many real sites rather than only framework demos.

- [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) - polished portfolio references, especially animated and productized personal sites.
- [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) - personal sites, blogs, artist showcases, and profile pages.
- [Framer personal website examples](https://www.framer.com/blog/personal-website-examples/) - grouped examples for resume/CV, portfolio, storytelling, and content-forward sites.
- [Cargo](https://cargo.site/) - site builder for designers and artists; useful for artist/portfolio layout conventions.
- [Cargo templates](https://cargo.site/templates) - graphic, blank, and populated portfolio template structures.
- [Cargo community](https://cargo.site/community) - live Cargo sites and creative portfolios.
- [Siteinspire Cargo Collective category](https://www.siteinspire.com/websites/category/cargo-collective) - curated Cargo/Cargo Collective examples with filters for portfolio, grid, unusual layout, animation, and art.
- [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) - smaller curated set of Cargo-made one-page sites.
- [Anthropic research](https://www.anthropic.com/research), [Anthropic engineering](https://www.anthropic.com/engineering), and [Anthropic science blog announcement](https://www.anthropic.com/research/introducing-anthropic-science) - calm AI/research publication design with strong editorial hierarchy.
- [Anthropic digital brand work by Geist](https://geist.co/work/anthropic) - useful for Anthropic-inspired brand system cues.
- [Are.na](https://www.are.na/) - "playlists for ideas"; useful for building reference boards and collecting site concepts.
- [Are.na Portfolio & Personal Websites](https://www.are.na/husani-barnwell/portfolio-personal-websites)
- [Are.na design: portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios)
- [Are.na One-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites)
- [Are.na personal websites named after an idea rather than the human](https://www.are.na/norman-o-hagan/personal-websites-named-after-an-idea-rather-than-the-human)
- [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design)
- [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279)
- [Are.na Brutalist](https://www.are.na/tg-z/brutalist-sovikz7jxas)
- [Are.na Nu-Brutalism](https://www.are.na/consumer-aesthetics-research-institute/nu-brutalism-cycennj0uv8)
- [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites)

## Strong Portfolio And Personal Site References

These are good general sources for the overall project, independent of any one theme.

- [Lynn Fisher](https://lynnandtonic.com/) - personal site as recurring yearly design experiment; strong reference for making the site itself the work.
- [Bruno Simon](https://bruno-simon.com/) - portfolio as a playable 3D world; reference for a high-effort interaction theme.
- [Robby Leonardi interactive resume](https://www.rleonardi.com/interactive-resume/) - resume as side-scrolling game.
- [Brittany Chiang](https://brittanychiang.com/) - restrained engineer portfolio with strong hierarchy and detail.
- [Maggie Appleton](https://maggieappleton.com/) - personal site plus visual essays and digital garden thinking.
- [Andy Matuschak's notes](https://notes.andymatuschak.org/) - canonical digital garden/working notes interface.
- [Gwern](https://gwern.net/) and [Gwern design notes](https://gwern.net/design) - extreme longform/reference-site craft.
- [Paul Stamatiou](https://paulstamatiou.com/) - rich editorial/photo personal site.
- [Hakim El Hattab](https://hakim.se/) - creative developer portfolio and experiments.
- [Josh Comeau](https://www.joshwcomeau.com/) - educational personal site with polished interactions.
- [Nicky Case](https://ncase.me/) - interactive explanations as portfolio.
- [Bartosz Ciechanowski](https://ciechanow.ski/) - interactive essays with deep technical visualization.
- [Cameron's World](https://www.cameronsworld.net/) - canonical old-web collage reference.
- [Daring Fireball](https://daringfireball.net/) - classic personal link/blog publishing.
- [Simon Willison](https://simonwillison.net/) - content-heavy personal technical blog.
- [Awwwards Portfolio Gallery](https://www.awwwards.com/websites/portfolio/) - broad high-polish portfolio survey.
- [Siteinspire Portfolio category](https://www.siteinspire.com/websites/categories/portfolio) - useful filterable portfolio inspiration.
- [Creative Bloq portfolio examples](https://www.creativebloq.com/portfolios/examples-712368) - contemporary portfolio examples with rationale.

## Theme Reference Catalog

Every theme should carry references in the registry. The point is not to copy assets or brands; it is to make each renderer auditable against a real visual/layout tradition.

Suggested registry shape:

```ts
interface ThemeReference {
  label: string;
  url: string;
  notes: string;
}

interface SiteTheme {
  slug: string;
  name: string;
  references: ThemeReference[];
  layoutChecks: string[];
}
```

### Retro OS

| Theme | References | Layout checks |
| --- | --- | --- |
| `aqua` | [Puppertino](https://codedgar.github.io/Puppertino/), [Puppertino repo](https://github.com/codedgar/Puppertino), Apple Aqua/macOS HIG screenshots | glossy top chrome, Lucida-style UI, soft panels, early-2000s Mac blog energy |
| `classic-mac` | [System.css](https://sakofchit.github.io/system.css/), [System.css repo](https://github.com/sakofchit/system.css), [System 7 CSS recreation](https://bbenchoff.github.io/pages/system7.html) | monochrome menu bar, desktop/windows, Chicago/Geneva feel, black-and-white document panels |
| `win95` | Windows 95 screenshots, [98.css](https://jdan.github.io/98.css/) as close component base | teal desktop, gray beveled windows, taskbar, Start-button-like footer, explorer/document metaphors |
| `win98` | [98.css](https://jdan.github.io/98.css/), [98.css notes](https://notes.jordanscales.com/98-dot-css) | authentic Windows 98 window chrome, title bars, inset controls, desktop/file explorer layout |
| `windows-xp` | [XP.css](https://botoxparty.github.io/XP.css/), [XP.css repo](https://github.com/botoxparty/XP.css/) | Luna blue title bars, green Start/taskbar, rounded XP panels, desktop icons |
| `windows-7` | [7.css](https://khang-nd.github.io/7.css/), [7.css repo](https://github.com/khang-nd/7.css/) | Aero glass, translucent windows, command bar, taskbar-like footer, calmer Vista/7 spacing |
| `dos` | [BOOTSTRA.386](https://github.com/kristopolous/BOOTSTRA.386), DOS/Turbo Vision screenshots | full-screen text mode, command rows, menu hotkeys, no decorative cards |
| `commodore-64` | C64 BASIC screen references, [retro-css index](https://github.com/matt-auckland/retro-css) | blue screen, chunky monospaced type, prompt/output structure, 8-bit borders |
| `palmpilot` | Palm OS launcher and Memo Pad screenshots | tiny grayscale PDA viewport, compact lists, stylus-era controls, minimal icon grid |
| `ipod` | iPod Classic menu UI screenshots | centered device-like menu, stark white panels, chrome highlights, list selection focus |

### Writing And Publishing

| Theme | References | Layout checks |
| --- | --- | --- |
| `tufte` | [Tufte CSS](https://edwardtufte.github.io/tufte-css/), [Edward Tufte](https://www.edwardtufte.com/), [Gwern design](https://gwern.net/design) | narrow reading column, sidenote gutter, quiet navigation, integrated figures/captions |
| `latex` | [LaTeX.css](https://latex.vercel.app/), [LaTeX.css repo](https://github.com/vincentdoerig/latex-css) | title/author/date block, abstract-like intro, theorem/table styling, centered paper width |
| `newspaper` | NYT print front page, broadsheet layouts, [Anthropic research](https://www.anthropic.com/research) for sober article indexing | masthead, date line, lead story, columns, headlines/decks/bylines |
| `magazine` | [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio), [Awwwards Portfolio Gallery](https://www.awwwards.com/websites/portfolio/) | editorial hero, large art-directed typography, feature modules, asymmetric project/story sections |
| `paperback` | Penguin Classics, paperback page spreads, book interior design | book-cover title page, chapter-like posts, narrow measure, running-head/folio details |
| `academic-journal` | JSTOR/PDF journal pages, [Anthropic science blog](https://www.anthropic.com/research/introducing-anthropic-science) | abstract, sections, citations-like metadata, restrained institutional typography |
| `field-notes` | Field Notes notebooks, pocket notebook scans | ruled paper, short field-entry modules, date stamps, margin annotations |
| `legal-brief` | Court pleading paper, legal memo templates | line numbers or pleading margin, formal headings, exhibit/list structure, all-business typography |
| `encyclopedia` | [Wikipedia](https://www.wikipedia.org/), Britannica pages | table-of-contents, reference article, sidebar infobox, dense internal links |
| `markdown-reader` | GitHub README rendering, GitHub docs | README-like article body, code blocks, simple file/document framing |

### Old Web

| Theme | References | Layout checks |
| --- | --- | --- |
| `html-1` | early HTML pages, browser-default pages, [low-tech personal web channels on Are.na](https://www.are.na/rodrigo-tello/one-page-personal-websites) | almost raw tags, simple lists, no app chrome, default link hierarchy |
| `geocities` | [Cameron's World](https://www.cameronsworld.net/), [Neocities](https://neocities.org/), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | tiled backgrounds, badge rail, guestbook/webring emphasis, under-construction energy |
| `blogger` | early Blogger/Blogspot templates | dated posts, archive sidebar, blogroll, narrow central blog column |
| `myspace` | MySpace profile pages | profile header, friends/top modules, heavily customized panels, music/profile-box structure |
| `tumblr` | Tumblr dashboard/blog themes | post cards, notes/reblog-like metadata, infinite-feed rhythm |
| `craigslist` | [Craigslist](https://www.craigslist.org/) | classified columns, blue links, region/category navigation, almost no decoration |
| `hacker-news` | [Hacker News](https://news.ycombinator.com/) | centered table-like feed, orange top bar, ranked rows, tiny subtext metadata |
| `wikipedia` | [Wikipedia](https://www.wikipedia.org/) | tabs, left navigation, article header, table of contents and infobox |
| `rss-reader` | NetNewsWire, Google Reader, Feedly references | split-pane feed reader, unread-style lists, article preview pane, feed controls |
| `webring` | IndieWeb webrings, old badge pages, [Are.na personal websites named after ideas](https://www.are.na/norman-o-hagan/personal-websites-named-after-an-idea-rather-than-the-human) | previous/next/random links, badge wall, outbound links as first-class content |

### Terminal And Editor

| Theme | References | Layout checks |
| --- | --- | --- |
| `green-terminal` | green phosphor CRT terminal references, [Terminal CSS](https://terminalcss.xyz/) | full-screen console, prompt lines, command output, phosphor glow optional |
| `amber-terminal` | amber terminal screenshots, [Terminal.css](https://panr.github.io/terminal-css/) | amber-on-dark output, command history, box-drawing where useful |
| `solarized-light` | [Solarized](https://ethanschoonover.com/solarized/) | editor-document hybrid, file tabs, low-contrast code palette |
| `solarized-dark` | [Solarized](https://ethanschoonover.com/solarized/) | dark editor shell, sidebar file tree, syntax-color accents |
| `monokai` | Monokai/Sublime Text screenshots | dark editor window, code-like lists, bright syntax accents |
| `dracula` | [Dracula Theme](https://draculatheme.com/) | purple-black editor shell, file tree/nav, neon code accents |
| `gruvbox` | Gruvbox Vim screenshots | warm terminal/editor page, earthy syntax colors, retro code buffer structure |
| `nord` | [Nord](https://www.nordtheme.com/) | cool editor panels, arctic palette, calm code/document mix |
| `catppuccin` | [Catppuccin](https://catppuccin.com/) | pastel editor shell, tabbed panes, soft dark surfaces |
| `vim-help` | Vim `:help` pages | help-buffer layout, tags/anchors, monospace docs, keyboard-command navigation |

### Personal Site Archetypes

| Theme | References | Layout checks |
| --- | --- | --- |
| `personal-blog` | [Daring Fireball](https://daringfireball.net/), [Simon Willison](https://simonwillison.net/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) | reverse chronological posts, RSS prominence, archive/sidebar, strong author voice |
| `digital-garden` | [Andy Matuschak notes](https://notes.andymatuschak.org/), [Maggie Appleton](https://maggieappleton.com/), [Digital Garden inventory](https://medium.com/@raysims/a-digital-garden-inventory-d6450fe74b4) | backlinks, note status, graph/trail navigation, non-chronological browsing |
| `public-wiki` | [Tom Critchlow wiki](https://tomcritchlow.com/wiki/), [Wikipedia](https://www.wikipedia.org/) | wiki index, breadcrumbs, topic pages, cross-links and categories |
| `cv` | [read.cv](https://read.cv/), [Brittany Chiang](https://brittanychiang.com/), [Framer personal examples](https://www.framer.com/blog/personal-website-examples/) | experience timeline, skills/projects, concise contact, hiring-friendly hierarchy |
| `portfolio` | [Lynn Fisher](https://lynnandtonic.com/), [Bruno Simon](https://bruno-simon.com/), [Cargo](https://cargo.site/), [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective) | project grid, selected work, case-study modules, strong first-screen point of view |
| `now-page` | [nownownow](https://nownownow.com/) | single current-status page, last-updated marker, current projects/focus |
| `uses-page` | [uses.tech](https://uses.tech/) | categorized tool inventory, product/setup notes, why-this-tool explanations |
| `colophon` | [IndieWeb colophon](https://indieweb.org/colophon), [Gwern design](https://gwern.net/design) | build notes, typography/stack credits, principles, version/history |
| `guestbook` | Neocities guestbooks, [Are.na personal website channels](https://www.are.na/husani-barnwell/portfolio-personal-websites) | sign form, visitor entries, old-web social proof, date/name/message cards |
| `personal-portal` | Yahoo/old portals, startpages, [Are.na collection web design](https://www.are.na/kalli-retzepi/collection-web-design) | widgets/modules, current status, links, latest posts, dashboard scanning |

### Physical Metaphors

| Theme | References | Layout checks |
| --- | --- | --- |
| `receipt` | thermal receipts, POS receipts | narrow paper strip, itemized rows, totals/date stamps, monospaced compression |
| `index-cards` | library index cards, card catalogs | card stacks, tabs, compact metadata, physical browsing order |
| `filing-cabinet` | file folders, Windows/Mac file explorers | folder tabs, drawer/folder hierarchy, archive labels |
| `notebook` | notebooks, ruled-paper scans | ruled paper, margin, handwritten-note cues, dated entries |
| `corkboard` | corkboard/pinned notes | pinned cards, overlapping notes, thumbtack/tape metaphors |
| `whiteboard` | whiteboard planning walls | marker-like headings, boxes/arrows, open planning space |
| `blueprint` | architectural blueprints | grid paper, annotation labels, white/blue line drawing |
| `calendar` | wall calendars, iCal/Google Calendar month views | month/week grid, date cells, archive as schedule |
| `map` | atlases, paper maps, transit maps | route lines, labels, legends, geography-like navigation |
| `museum-label` | gallery wall labels, exhibition catalogs, [Anthropic/Geist brand work](https://geist.co/work/anthropic) | quiet white-wall labels, accession metadata, object-caption hierarchy |

### Institutional And Utility

| Theme | References | Layout checks |
| --- | --- | --- |
| `government-form` | [GOV.UK Design System](https://design-system.service.gov.uk/), [USWDS](https://designsystem.digital.gov/) | civic form layout, labels/help text, high clarity, no expressive fluff |
| `university-page` | university department sites, research lab pages | department header, news/research sections, faculty-like profile modules |
| `library-catalog` | WorldCat/OPAC catalogs, library search results | record rows, call-number-like metadata, filters/facets |
| `airline-departures` | airport departure boards | split-flap/board rows, time/status columns, terminal/gate style metadata |
| `diner-menu` | laminated diner menus | sectioned menu, prices-like metadata, specials boxes |
| `record-store` | record store bins, Discogs | crate/browse structure, artist/album-like metadata, sticker labels |
| `art-gallery` | gallery websites, [Cargo](https://cargo.site/), [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) | sparse white space, artwork/project grid, minimal captions |
| `hardware-manual` | IBM/Apple manuals, service manuals | numbered procedures, diagrams/figures, caution/notes blocks |
| `financial-terminal` | Bloomberg terminal, stock dashboards | dense columns, ticker rows, high-contrast data modules |
| `classified-ads` | newspaper classifieds, Craigslist | small listing blocks, category headers, compact contact/action links |

### Minimal Modes

| Theme | References | Layout checks |
| --- | --- | --- |
| `plain-html` | browser defaults, no-style HTML pages | raw semantic order, minimal shell, browser-native controls |
| `brutalist` | [Brutalist Websites](https://brutalistwebsites.com/), [Are.na Brutalist](https://www.are.na/tg-z/brutalist-sovikz7jxas), [Are.na Nu-Brutalism](https://www.are.na/consumer-aesthetics-research-institute/nu-brutalism-cycennj0uv8) | hard borders, raw structure, visible grids, anti-polish |
| `swiss-grid` | International Typographic Style, Swiss posters | strict grid, asymmetric type, red/black accents, disciplined spacing |
| `monochrome` | black-and-white editorial sites, classic print | one-color hierarchy, no hue dependence, strong typographic contrast |
| `high-contrast` | Windows high contrast, accessibility references | large focus states, maximum contrast, clear controls |
| `print` | print stylesheets, newspaper proofs | print-first layout, hidden chrome, page-break-aware content |
| `large-type` | accessible large-type reader sites | large measure, strong hierarchy, touch-friendly controls |
| `no-css` | no-CSS personal pages, low-tech web | default flow, source-order clarity, no dependence on visual layout |
| `reader-mode` | Safari/Firefox reader mode | article-only presentation, hidden distractions, calm line length |
| `low-bandwidth` | low-tech/txti-style sites, [Are.na librarians' personal websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | tiny payload, no imagery requirement, text-first navigation |

### Maximal Modes

| Theme | References | Layout checks |
| --- | --- | --- |
| `sticker-sheet` | sticker sheets, zines, Cargo artist portfolios | overlapping labels, playful modules, collected-object feel |
| `badge-wall` | 88x31 web buttons, old blogroll badges | badge grid/rail, outbound links as artifacts, compact modules |
| `tiled-background` | old-web tiled GIF backgrounds, [Cameron's World](https://www.cameronsworld.net/) | repeated background pattern, loud page framing, old-web modules |
| `pixel-art` | [NES.css](https://nostalgic-css.github.io/NES.css/), pixel UI/game screens | chunky borders, pixel shadows, game-like panels |
| `vaporwave` | vaporwave net art, Windows 95/VHS references | neon grid/sunset, surreal color, retro-future collage |
| `cyberpunk` | HUDs, terminal dashboards, sci-fi interfaces | warning colors, data panels, dark grid, high-energy navigation |
| `scrapbook` | scanned scrapbooks, zine pages | cut paper, tape/pins, irregular placement, handmade feel |
| `collage` | [Cameron's World](https://www.cameronsworld.net/), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | non-linear composition, overlapping images/text, web-art energy |
| `arcade` | arcade cabinets, high-score screens | score/status header, cabinet frame, bright game controls |
| `toy-ui` | toy packaging, playful Framer portfolios | chunky controls, bright physical affordances, playful scale |

### Seasonal And Easter Eggs

| Theme | References | Layout checks |
| --- | --- | --- |
| `winter` | holiday cards, snow-day editorial | cool palette, quiet card/postcard layout, seasonal but readable |
| `summer` | travel postcards, summer zines | bright postcard modules, sunlit palette, relaxed spacing |
| `midnight` | night-mode readers, dark editorial sites | dark article shell, low glare, late-night reading mode |
| `sunrise` | morning editorial/landing pages | warm gradient, calm announcement feel, soft hierarchy |
| `birthday` | party invitations, confetti sites | celebratory modules, invitation-like header, playful decoration |
| `launch-day` | Product Hunt/startup launch pages, [Anthropic engineering](https://www.anthropic.com/engineering) for modern product editorial | announcement hero, changelog/product sections, CTA-like links without marketing bloat |
| `archive-mode` | Internet Archive, library preservation pages | muted archival shell, preservation metadata, old-document framing |
| `random-chaos` | net-art, glitch pages, Are.na weird web channels | intentionally unstable composition, but required content remains present |
| `secret-mode` | dossier/hidden terminal/spy file references | hidden-room palette, classified-file framing, restrained mystery |
| `theme-museum` | museum/exhibition catalogs, [Cargo community](https://cargo.site/community), [Framer Gallery](https://www.framer.com/gallery/) | exhibit cards, curatorial labels, theme previews as collection objects |
