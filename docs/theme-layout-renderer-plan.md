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

## Fresh Search Notes

These are the specific references found in the latest search pass and should drive the actual renderer work.

### Framer Findings

Use Framer for polished portfolio, personal, large-type, grid, dark, minimal, and animated portfolio patterns.

- [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) currently surfaces portfolio examples including Taliahhh, Mostly Sunny, Uthinh Pham, ISAKMOOSA, Ian Aldous, Zuza Wozniczka, Hiartem, Adiel Vasquez, Jaime Carrasco, onyourtiptoes, Clemence Guillemot, Loli Laboureau, Eugene Serpokrylov, Nrthview, Irakli Sadgobelashvili, Ayush Wanjari, Julia Oleksy, Flair Studio, Anastasia Kozhushna, FLER Studio, Pawel Wojtaszak, YanXin Zhang, DaveOS - Personal WebOS, and Paula Lu.
- [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) currently surfaces Taliahhh, Uthinh Pham, Zuza Wozniczka, Tracy Lou, Nrthview, Bohdan Skrypda, Perplexity x CR7, Ayush Wanjari, Maria Nigmatullina, Anastasia Kozhushna, YanXin Zhang, DaveOS - Personal WebOS, Nitin Sangwan, Adam Lambert '98, Jackie Zhang, Sofie Viola, Italo Santorsula, etienne.studio, Saurabh, TRAF, Janar Siniloo, and Solenne.
- [Framer UX portfolio article](https://www.framer.com/blog/portfolio-website-examples/) specifically calls out renderer-relevant patterns: Meris Imamovic for minimal neat navigation, Claudio Guglieri for interactive carousel hero, aimpie for bold/vibrant animation, Antoine Enault for interactive typography, Analogue Agency for visual-first navigation, Jessica Wells and Diana Lu for horizontal scroll, SEB for draggable image work, Vishal Krishna for hover previews and loading state, Elly Hsieh for subtle product-design polish, Chris Lund for mixed typography, ashcamp for bold header typography, Crazy Creative for playful color, Alejandro Mejias for project descriptions, and Jon Hanlan for vibrant grid.

### Cargo Findings

Use Cargo for artist/designer portfolio layouts, sparse gallery presentation, unusual grids, shop/object hybrids, and raw creative community energy.

- [Cargo community](https://cargo.site/community) currently surfaces creative sites and profiles including madonnapopstar12, Logan John, Tacto Editora, Violeta Araujo Bofill, Nicholas Gleeson, Theresa Hattinger, Rana Wassef, Liam Gillick, 00123, Daryan Knoblauch, Adrien Guillet, Jiayu Cheng, Braulio Amado, Lakis Sobyra, Ten Buttons, QUINN, Agustin Pina, Darian Zahedi, Carola Monteleone, Rafik Greiss, Matthew Vlach, Sasyk, Weiran Liang, Office MTTH, Fakewhale STUDIO, Temple Office, and many artist/shop hybrids.
- [Cargo templates](https://cargo.site/templates) should be used for graphic, blank, and populated portfolio structures rather than only for color styling.
- [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective) gives a useful filtered view of older and newer Cargo/Cargo Collective patterns, with examples including Lynn Sohn, Folkert Gorter, Santiago Jaramillo, 32Round, Trademark, I Am Pelle, Always With Honor, Marcus Fuchs, Christopher Brand, Pieternel Kok, Idrawallday, Icarus Frames, Graeme Pereira, Bernet Fourtet, Julien Pacaud, and Goodbye Galaxy/Khristian Mendoza.
- [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) lists a smaller curated set: Behen Bhai Book Club, Joost Huver, Lauren Gallagher, Pedro del Corro, National Park Typeface, Luke Fenech, Folkert Gorter, and Jon Kyle.

### Anthropic Findings

Use Anthropic for calm research/editorial/product-announcement patterns, not for generic AI gradients.

- [Anthropic engineering](https://www.anthropic.com/engineering) uses a featured-article editorial structure with a clear section header, featured card, article grid, and sober product/research positioning.
- [How we contain Claude across products](https://www.anthropic.com/engineering/how-we-contain-claude) is a strong article-page reference: direct title, published date, concise deck, and longform technical narrative.
- [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) is relevant for implementation/writeup pages and code-heavy technical posts.
- [Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) is a launch-day reference: announcement title, date, image, product explanation, section headings, and concrete use cases.
- [Claude Opus release pages](https://www.anthropic.com/news/claude-opus-4-8) are useful for quote/testimonial blocks, benchmark sections, logo/testimonial grids, and appendix-like availability sections.
- [Geist's Anthropic case study](https://geist.co/work/anthropic) is the best brand-system reference for museum-label, institutional, and calm AI publication styling.

### Are.na Findings

Use Are.na as a source of curated web-design channels, not just as a generic bookmarking app.

- [Portfolio & Personal Websites](https://www.are.na/husani-barnwell/portfolio-personal-websites) is a direct portfolio/personal-site reference channel.
- [One-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) surfaces one-page examples including Martin Borst, everythingandsomethingelse.com, Elena Borisova, amanda.zip, elizabethvandegriend, and Thomas van Ryzewyk.
- [design: portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios) surfaces design/portfolio references including 8 Brilliant Portfolios from Spotify Product Designers, Sam Seurynck Design, WANG Yang, and student portfolio references.
- [personal websites named after an idea rather than the human](https://www.are.na/norman-o-hagan/personal-websites-named-after-an-idea-rather-than-the-human) is important for concept-led personal site naming and portal themes.
- [Radical web design](https://www.are.na/julien-bidoret/radical-web-design), [Brutalist](https://www.are.na/tg-z/brutalist-sovikz7jxas), and [Nu-Brutalism](https://www.are.na/consumer-aesthetics-research-institute/nu-brutalism-cycennj0uv8) should drive brutalist, collage, random-chaos, and maximal modes.
- [Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) should drive UI-metaphor research, including desktop, terminal, and odd navigation patterns.
- [Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) is especially useful for low-bandwidth, library-catalog, public-wiki, and quiet personal knowledge themes.

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

Every theme should carry references in the registry. The point is not to copy assets or brands; it is to make each renderer auditable against a real visual/layout tradition. The rows below have been updated after the live Framer, Cargo, Anthropic, and Are.na search pass; use those searched sources as layout direction, not just mood boards.

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
| `aqua` | [Puppertino](https://codedgar.github.io/Puppertino/), [Puppertino repo](https://github.com/codedgar/Puppertino), Apple Aqua/macOS HIG screenshots, [Framer Personal Gallery DaveOS listing](https://www.framer.com/gallery/categories/personal) | glossy top chrome, Lucida-style UI, soft panels, early-2000s Mac blog energy; DaveOS validates a personal site as an OS metaphor |
| `classic-mac` | [System.css](https://sakofchit.github.io/system.css/), [System.css repo](https://github.com/sakofchit/system.css), [System 7 CSS recreation](https://bbenchoff.github.io/pages/system7.html), [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | monochrome menu bar, desktop/windows, Chicago/Geneva feel, black-and-white document panels |
| `win95` | Windows 95 screenshots, [98.css](https://jdan.github.io/98.css/) as close component base, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | teal desktop, gray beveled windows, taskbar, Start-button-like footer, explorer/document metaphors |
| `win98` | [98.css](https://jdan.github.io/98.css/), [98.css notes](https://notes.jordanscales.com/98-dot-css), [Framer Personal Gallery DaveOS listing](https://www.framer.com/gallery/categories/personal) | authentic Windows 98 window chrome, title bars, inset controls, desktop/file explorer layout |
| `windows-xp` | [XP.css](https://botoxparty.github.io/XP.css/), [XP.css repo](https://github.com/botoxparty/XP.css/), [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | Luna blue title bars, green Start/taskbar, rounded XP panels, desktop icons |
| `windows-7` | [7.css](https://khang-nd.github.io/7.css/), [7.css repo](https://github.com/khang-nd/7.css/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) | Aero glass, translucent windows, command bar, taskbar-like footer, calmer Vista/7 spacing |
| `dos` | [BOOTSTRA.386](https://github.com/kristopolous/BOOTSTRA.386), DOS/Turbo Vision screenshots, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | full-screen text mode, command rows, menu hotkeys, no decorative cards |
| `commodore-64` | C64 BASIC screen references, [retro-css index](https://github.com/matt-auckland/retro-css), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | blue screen, chunky monospaced type, prompt/output structure, 8-bit borders |
| `palmpilot` | Palm OS launcher and Memo Pad screenshots, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | tiny grayscale PDA viewport, compact lists, stylus-era controls, minimal icon grid |
| `ipod` | iPod Classic menu UI screenshots, [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | centered device-like menu, stark white panels, chrome highlights, list selection focus |

### Writing And Publishing

| Theme | References | Layout checks |
| --- | --- | --- |
| `tufte` | [Tufte CSS](https://edwardtufte.github.io/tufte-css/), [Edward Tufte](https://www.edwardtufte.com/), [Gwern design](https://gwern.net/design), [Anthropic technical engineering posts](https://www.anthropic.com/engineering/how-we-contain-claude) | narrow reading column, sidenote gutter, quiet navigation, integrated figures/captions |
| `latex` | [LaTeX.css](https://latex.vercel.app/), [LaTeX.css repo](https://github.com/vincentdoerig/latex-css), [Anthropic longform engineering posts](https://www.anthropic.com/engineering/harness-design-long-running-apps) | title/author/date block, abstract-like intro, theorem/table styling, centered paper width |
| `newspaper` | NYT print front page, broadsheet layouts, [Anthropic engineering](https://www.anthropic.com/engineering), [How we contain Claude](https://www.anthropic.com/engineering/how-we-contain-claude) | masthead, date line, lead story, columns, headlines/decks/bylines |
| `magazine` | [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio), [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/), [Awwwards Portfolio Gallery](https://www.awwwards.com/websites/portfolio/) | editorial hero, large art-directed typography, feature modules, asymmetric project/story sections; check Claudio Guglieri, aimpie, Antoine Enault, ashcamp |
| `paperback` | Penguin Classics, paperback page spreads, book interior design, [Cargo community](https://cargo.site/community) | book-cover title page, chapter-like posts, narrow measure, running-head/folio details |
| `academic-journal` | JSTOR/PDF journal pages, [Anthropic science blog](https://www.anthropic.com/research/introducing-anthropic-science), [Anthropic engineering](https://www.anthropic.com/engineering) | abstract, sections, citations-like metadata, restrained institutional typography |
| `field-notes` | Field Notes notebooks, pocket notebook scans, [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) | ruled paper, short field-entry modules, date stamps, margin annotations |
| `legal-brief` | Court pleading paper, legal memo templates, [Anthropic policy/news pages](https://www.anthropic.com/news/claude-design-anthropic-labs) | line numbers or pleading margin, formal headings, exhibit/list structure, all-business typography |
| `encyclopedia` | [Wikipedia](https://www.wikipedia.org/), Britannica pages, [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | table-of-contents, reference article, sidebar infobox, dense internal links |
| `markdown-reader` | GitHub README rendering, GitHub docs, [Anthropic longform engineering posts](https://www.anthropic.com/engineering/harness-design-long-running-apps) | README-like article body, code blocks, simple file/document framing |

### Old Web

| Theme | References | Layout checks |
| --- | --- | --- |
| `html-1` | early HTML pages, browser-default pages, [low-tech personal web channels on Are.na](https://www.are.na/rodrigo-tello/one-page-personal-websites) | almost raw tags, simple lists, no app chrome, default link hierarchy |
| `geocities` | [Cameron's World](https://www.cameronsworld.net/), [Neocities](https://neocities.org/), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | tiled backgrounds, badge rail, guestbook/webring emphasis, under-construction energy |
| `blogger` | early Blogger/Blogspot templates, [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal), [Are.na Portfolio & Personal Websites](https://www.are.na/husani-barnwell/portfolio-personal-websites) | dated posts, archive sidebar, blogroll, narrow central blog column |
| `myspace` | MySpace profile pages, [Cargo community](https://cargo.site/community), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | profile header, friends/top modules, heavily customized panels, music/profile-box structure |
| `tumblr` | Tumblr dashboard/blog themes, [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio), [Cargo community](https://cargo.site/community) | post cards, notes/reblog-like metadata, infinite-feed rhythm |
| `craigslist` | [Craigslist](https://www.craigslist.org/), [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective) | classified columns, blue links, region/category navigation, almost no decoration |
| `hacker-news` | [Hacker News](https://news.ycombinator.com/), [Anthropic engineering](https://www.anthropic.com/engineering) | centered table-like feed, orange top bar, ranked rows, tiny subtext metadata; use Anthropic index only as a modern article-list contrast |
| `wikipedia` | [Wikipedia](https://www.wikipedia.org/), [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | tabs, left navigation, article header, table of contents and infobox |
| `rss-reader` | NetNewsWire, Google Reader, Feedly references, [Anthropic engineering index](https://www.anthropic.com/engineering) | split-pane feed reader, unread-style lists, article preview pane, feed controls |
| `webring` | IndieWeb webrings, old badge pages, [Are.na personal websites named after ideas](https://www.are.na/norman-o-hagan/personal-websites-named-after-an-idea-rather-than-the-human) | previous/next/random links, badge wall, outbound links as first-class content |

### Terminal And Editor

| Theme | References | Layout checks |
| --- | --- | --- |
| `green-terminal` | green phosphor CRT terminal references, [Terminal CSS](https://terminalcss.xyz/), [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | full-screen console, prompt lines, command output, phosphor glow optional |
| `amber-terminal` | amber terminal screenshots, [Terminal.css](https://panr.github.io/terminal-css/), [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | amber-on-dark output, command history, box-drawing where useful |
| `solarized-light` | [Solarized](https://ethanschoonover.com/solarized/), [Anthropic longform engineering posts](https://www.anthropic.com/engineering/harness-design-long-running-apps) | editor-document hybrid, file tabs, low-contrast code palette |
| `solarized-dark` | [Solarized](https://ethanschoonover.com/solarized/), [Anthropic engineering](https://www.anthropic.com/engineering) | dark editor shell, sidebar file tree, syntax-color accents |
| `monokai` | Monokai/Sublime Text screenshots, [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | dark editor window, code-like lists, bright syntax accents |
| `dracula` | [Dracula Theme](https://draculatheme.com/), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | purple-black editor shell, file tree/nav, neon code accents |
| `gruvbox` | Gruvbox Vim screenshots, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | warm terminal/editor page, earthy syntax colors, retro code buffer structure |
| `nord` | [Nord](https://www.nordtheme.com/), [Anthropic engineering](https://www.anthropic.com/engineering) | cool editor panels, arctic palette, calm code/document mix |
| `catppuccin` | [Catppuccin](https://catppuccin.com/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) | pastel editor shell, tabbed panes, soft dark surfaces |
| `vim-help` | Vim `:help` pages, [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | help-buffer layout, tags/anchors, monospace docs, keyboard-command navigation |

### Personal Site Archetypes

| Theme | References | Layout checks |
| --- | --- | --- |
| `personal-blog` | [Daring Fireball](https://daringfireball.net/), [Simon Willison](https://simonwillison.net/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) | reverse chronological posts, RSS prominence, archive/sidebar, strong author voice |
| `digital-garden` | [Andy Matuschak notes](https://notes.andymatuschak.org/), [Maggie Appleton](https://maggieappleton.com/), [Digital Garden inventory](https://medium.com/@raysims/a-digital-garden-inventory-d6450fe74b4), [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | backlinks, note status, graph/trail navigation, non-chronological browsing |
| `public-wiki` | [Tom Critchlow wiki](https://tomcritchlow.com/wiki/), [Wikipedia](https://www.wikipedia.org/), [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | wiki index, breadcrumbs, topic pages, cross-links and categories |
| `cv` | [read.cv](https://read.cv/), [Brittany Chiang](https://brittanychiang.com/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal), [Are.na design portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios) | experience timeline, skills/projects, concise contact, hiring-friendly hierarchy |
| `portfolio` | [Lynn Fisher](https://lynnandtonic.com/), [Bruno Simon](https://bruno-simon.com/), [Cargo community](https://cargo.site/community), [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective), [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | project grid, selected work, case-study modules, strong first-screen point of view; check Lynn Sohn, Folkert Gorter, SEB, Jessica Wells, Diana Lu |
| `now-page` | [nownownow](https://nownownow.com/), [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) | single current-status page, last-updated marker, current projects/focus |
| `uses-page` | [uses.tech](https://uses.tech/), [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) | categorized tool inventory, product/setup notes, why-this-tool explanations |
| `colophon` | [IndieWeb colophon](https://indieweb.org/colophon), [Gwern design](https://gwern.net/design), [Anthropic engineering](https://www.anthropic.com/engineering) | build notes, typography/stack credits, principles, version/history |
| `guestbook` | Neocities guestbooks, [Are.na personal website channels](https://www.are.na/husani-barnwell/portfolio-personal-websites) | sign form, visitor entries, old-web social proof, date/name/message cards |
| `personal-portal` | Yahoo/old portals, startpages, [Are.na collection web design](https://www.are.na/kalli-retzepi/collection-web-design) | widgets/modules, current status, links, latest posts, dashboard scanning |

### Physical Metaphors

| Theme | References | Layout checks |
| --- | --- | --- |
| `receipt` | thermal receipts, POS receipts, [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) | narrow paper strip, itemized rows, totals/date stamps, monospaced compression |
| `index-cards` | library index cards, card catalogs, [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | card stacks, tabs, compact metadata, physical browsing order |
| `filing-cabinet` | file folders, Windows/Mac file explorers, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | folder tabs, drawer/folder hierarchy, archive labels |
| `notebook` | notebooks, ruled-paper scans, [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites), [Cargo community](https://cargo.site/community) | ruled paper, margin, handwritten-note cues, dated entries |
| `corkboard` | corkboard/pinned notes, [Cargo community](https://cargo.site/community), [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | pinned cards, overlapping notes, thumbtack/tape metaphors; use SEB draggable-image behavior as interaction reference |
| `whiteboard` | whiteboard planning walls, [Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs), [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | marker-like headings, boxes/arrows, open planning space |
| `blueprint` | architectural blueprints, [Geist Anthropic case study](https://geist.co/work/anthropic), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | grid paper, annotation labels, white/blue line drawing |
| `calendar` | wall calendars, iCal/Google Calendar month views, [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) | month/week grid, date cells, archive as schedule |
| `map` | atlases, paper maps, transit maps, [Are.na personal websites named after ideas](https://www.are.na/norman-o-hagan/personal-websites-named-after-an-idea-rather-than-the-human) | route lines, labels, legends, geography-like navigation |
| `museum-label` | gallery wall labels, exhibition catalogs, [Anthropic/Geist brand work](https://geist.co/work/anthropic), [Cargo community](https://cargo.site/community) | quiet white-wall labels, accession metadata, object-caption hierarchy |

### Institutional And Utility

| Theme | References | Layout checks |
| --- | --- | --- |
| `government-form` | [GOV.UK Design System](https://design-system.service.gov.uk/), [USWDS](https://designsystem.digital.gov/), [Anthropic policy/news pages](https://www.anthropic.com/news/claude-design-anthropic-labs) | civic form layout, labels/help text, high clarity, no expressive fluff |
| `university-page` | university department sites, research lab pages, [Anthropic engineering](https://www.anthropic.com/engineering), [Anthropic longform engineering posts](https://www.anthropic.com/engineering/harness-design-long-running-apps) | department header, news/research sections, faculty-like profile modules |
| `library-catalog` | WorldCat/OPAC catalogs, library search results, [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | record rows, call-number-like metadata, filters/facets |
| `airline-departures` | airport departure boards, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | split-flap/board rows, time/status columns, terminal/gate style metadata |
| `diner-menu` | laminated diner menus, [Cargo templates](https://cargo.site/templates) | sectioned menu, prices-like metadata, specials boxes |
| `record-store` | record store bins, Discogs, [Cargo community](https://cargo.site/community), [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) | crate/browse structure, artist/album-like metadata, sticker labels |
| `art-gallery` | gallery websites, [Cargo community](https://cargo.site/community), [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective), [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) | sparse white space, artwork/project grid, minimal captions |
| `hardware-manual` | IBM/Apple manuals, service manuals, [Anthropic technical engineering posts](https://www.anthropic.com/engineering/how-we-contain-claude) | numbered procedures, diagrams/figures, caution/notes blocks |
| `financial-terminal` | Bloomberg terminal, stock dashboards, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | dense columns, ticker rows, high-contrast data modules |
| `classified-ads` | newspaper classifieds, Craigslist, [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective) | small listing blocks, category headers, compact contact/action links |

### Minimal Modes

| Theme | References | Layout checks |
| --- | --- | --- |
| `plain-html` | browser defaults, no-style HTML pages, [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) | raw semantic order, minimal shell, browser-native controls |
| `brutalist` | [Brutalist Websites](https://brutalistwebsites.com/), [Are.na Brutalist](https://www.are.na/tg-z/brutalist-sovikz7jxas), [Are.na Nu-Brutalism](https://www.are.na/consumer-aesthetics-research-institute/nu-brutalism-cycennj0uv8) | hard borders, raw structure, visible grids, anti-polish |
| `swiss-grid` | International Typographic Style, Swiss posters, [Geist Anthropic case study](https://geist.co/work/anthropic), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | strict grid, asymmetric type, red/black accents, disciplined spacing |
| `monochrome` | black-and-white editorial sites, classic print, [Cargo community](https://cargo.site/community), [Siteinspire Cargo category](https://www.siteinspire.com/websites/category/cargo-collective) | one-color hierarchy, no hue dependence, strong typographic contrast |
| `high-contrast` | Windows high contrast, accessibility references, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | large focus states, maximum contrast, clear controls |
| `print` | print stylesheets, newspaper proofs, [Anthropic longform engineering posts](https://www.anthropic.com/engineering/how-we-contain-claude) | print-first layout, hidden chrome, page-break-aware content |
| `large-type` | accessible large-type reader sites, [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | large measure, strong hierarchy, touch-friendly controls; check ashcamp and Antoine Enault typography patterns |
| `no-css` | no-CSS personal pages, low-tech web, [Are.na one-page personal websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) | default flow, source-order clarity, no dependence on visual layout |
| `reader-mode` | Safari/Firefox reader mode, [Anthropic technical engineering posts](https://www.anthropic.com/engineering/how-we-contain-claude) | article-only presentation, hidden distractions, calm line length |
| `low-bandwidth` | low-tech/txti-style sites, [Are.na librarians' personal websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | tiny payload, no imagery requirement, text-first navigation |

### Maximal Modes

| Theme | References | Layout checks |
| --- | --- | --- |
| `sticker-sheet` | sticker sheets, zines, [Cargo community](https://cargo.site/community), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | overlapping labels, playful modules, collected-object feel |
| `badge-wall` | 88x31 web buttons, old blogroll badges, [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | badge grid/rail, outbound links as artifacts, compact modules |
| `tiled-background` | old-web tiled GIF backgrounds, [Cameron's World](https://www.cameronsworld.net/), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | repeated background pattern, loud page framing, old-web modules |
| `pixel-art` | [NES.css](https://nostalgic-css.github.io/NES.css/), pixel UI/game screens, [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | chunky borders, pixel shadows, game-like panels |
| `vaporwave` | vaporwave net art, Windows 95/VHS references, [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design), [Cargo community](https://cargo.site/community) | neon grid/sunset, surreal color, retro-future collage |
| `cyberpunk` | HUDs, terminal dashboards, sci-fi interfaces, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279) | warning colors, data panels, dark grid, high-energy navigation |
| `scrapbook` | scanned scrapbooks, zine pages, [Cargo community](https://cargo.site/community), [Are.na Portfolio & Personal Websites](https://www.are.na/husani-barnwell/portfolio-personal-websites) | cut paper, tape/pins, irregular placement, handmade feel |
| `collage` | [Cameron's World](https://www.cameronsworld.net/), [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design) | non-linear composition, overlapping images/text, web-art energy |
| `arcade` | arcade cabinets, high-score screens, [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | score/status header, cabinet frame, bright game controls |
| `toy-ui` | toy packaging, playful Framer portfolios, [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/), [Cargo community](https://cargo.site/community) | chunky controls, bright physical affordances, playful scale; check Crazy Creative and aimpie for playful motion |

### Seasonal And Easter Eggs

| Theme | References | Layout checks |
| --- | --- | --- |
| `winter` | holiday cards, snow-day editorial, [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | cool palette, quiet card/postcard layout, seasonal but readable |
| `summer` | travel postcards, summer zines, [Cargo community](https://cargo.site/community), [One Page Love Cargo examples](https://onepagelove.com/tag/cargo) | bright postcard modules, sunlit palette, relaxed spacing |
| `midnight` | night-mode readers, dark editorial sites, [Anthropic engineering](https://www.anthropic.com/engineering), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | dark article shell, low glare, late-night reading mode |
| `sunrise` | morning editorial/landing pages, [Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs), [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) | warm gradient, calm announcement feel, soft hierarchy |
| `birthday` | party invitations, confetti sites, [Framer portfolio examples](https://www.framer.com/blog/portfolio-website-examples/) | celebratory modules, invitation-like header, playful decoration |
| `launch-day` | Product Hunt/startup launch pages, [Anthropic engineering](https://www.anthropic.com/engineering), [Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs), [Claude Opus release page](https://www.anthropic.com/news/claude-opus-4-8) | announcement hero, changelog/product sections, CTA-like links without marketing bloat |
| `archive-mode` | Internet Archive, library preservation pages, [Are.na Librarians' Personal Websites](https://www.are.na/librarians-on-are-na/librarians-personal-websites) | muted archival shell, preservation metadata, old-document framing |
| `random-chaos` | net-art, glitch pages, [Are.na Radical web design](https://www.are.na/julien-bidoret/radical-web-design), [Are.na Nu-Brutalism](https://www.are.na/consumer-aesthetics-research-institute/nu-brutalism-cycennj0uv8), [Cargo community](https://cargo.site/community) | intentionally unstable composition, but required content remains present |
| `secret-mode` | dossier/hidden terminal/spy file references, [Are.na Interface Research](https://www.are.na/viktor-bezic/interface-research-1516303279), [Anthropic technical engineering posts](https://www.anthropic.com/engineering/how-we-contain-claude) | hidden-room palette, classified-file framing, restrained mystery |
| `theme-museum` | museum/exhibition catalogs, [Cargo community](https://cargo.site/community), [Framer Gallery](https://www.framer.com/gallery/) | exhibit cards, curatorial labels, theme previews as collection objects |
