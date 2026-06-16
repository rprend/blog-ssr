import { layout, nav } from "./build-outputs/templates";
import { defaultThemeSlug, getThemeBySlug, siteThemes, type SiteTheme } from "./themes";

export interface NavItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface LinkEntryModel {
  title: string;
  url: string;
  domain: string;
  date: string;
  rawDate: string;
  image: string | null;
  contentHtml: string;
}

export interface PostSummaryModel {
  slug: string;
  title: string;
  href: string;
  date: string;
  rawDate: string;
  excerpt?: string;
  readTime?: string;
}

export interface HomeModel {
  introHtml: string;
  links: LinkEntryModel[];
  recentPosts: PostSummaryModel[];
  aboutHtml: string;
}

export interface BlogIndexModel {
  description: string;
  postsByYear: Array<{ year: string; posts: PostSummaryModel[] }>;
  totalPosts: number;
  yearRange: [number, number] | null;
}

export interface BlogPostModel {
  title: string;
  subtitle?: string | null;
  author?: string | null;
  date: string;
  isoDate: string;
  contentHtml: string;
  backHref: string;
  backLabel: string;
}

export interface ArchiveModel {
  months: Array<{ key: string; label: string; posts: PostSummaryModel[] }>;
  totalPosts: number;
}

export interface GuestbookModel {
  entries: Array<{ name: string; message: string; date: string; rawDate: string }>;
  canSign: boolean;
}

export interface GenericPageModel {
  heading: string;
  contentHtml: string;
}

export interface ThemesModel {
  themes: SiteTheme[];
  categories: string[];
  categoryControlsHtml: string;
  selectOptionsHtml: string;
  themeSectionsHtml: string;
}

export type PageModel =
  | HomeModel
  | BlogIndexModel
  | BlogPostModel
  | ArchiveModel
  | GuestbookModel
  | GenericPageModel
  | ThemesModel;

export type RouteType =
  | "home"
  | "blog-index"
  | "blog-post"
  | "archives"
  | "guestbook"
  | "contact"
  | "themes"
  | "generic";

export interface RenderPageOptions<T extends PageModel> {
  theme: SiteTheme;
  title: string;
  currentPage: string;
  pageSubtitle?: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: string;
  canonicalUrl?: string;
  bodyClass?: string;
  routeType: RouteType;
  model: T;
}

type Renderer<T extends PageModel = PageModel> = (model: T, ctx: RenderContext) => string;

interface RenderContext {
  theme: SiteTheme;
  family: RendererFamily;
  navItems: NavItem[];
  pageSubtitle: string;
  currentPage: string;
}

const originalTheme: SiteTheme = {
  slug: "original",
  name: "Original",
  category: "supplied",
  description: "Original Ryan Prendergast site design.",
  tags: ["original"],
  status: "built",
  depth: "layout",
  targetUrl: "",
  vibe: "Original",
  stylesheet: "",
  referencePath: "",
  screenshots: {},
};

type RendererFamily =
  | "aqua"
  | "spartan"
  | "manual"
  | "scoreboard"
  | "archive-index"
  | "scrapbook"
  | "art-index"
  | "no-css"
  | "research-sidenotes"
  | "wordmark-studio"
  | "builder-notes"
  | "research-tools"
  | "art-library"
  | "studio-index"
  | "cargo-cv"
  | "artist-ledger"
  | "garden-notebook"
  | "fragment-journal"
  | "ucoz-archive"
  | "uncertainty"
  | "briefing"
  | "bookmaker-card"
  | "experimental-loop"
  | "taste-directory"
  | "writer-ledger"
  | "artist-menu"
  | "friendly-hub"
  | "games-cabinet"
  | "portal-gallery"
  | "design-repository"
  | "weblog-facets"
  | "research-lab"
  | "visual-culture"
  | "room-wall"
  | "book-microsite"
  | "download-index"
  | "visual-index"
  | "html-bulletin"
  | "consumption-digest"
  | "data-portfolio"
  | "internet-diagram"
  | "vernacular-essay"
  | "cheap-manifesto"
  | "poetic-article"
  | "feral-essay"
  | "performance-club"
  | "recurse-joy"
  | "forecast-report"
  | "forum-frontpage"
  | "essay-blogroll"
  | "now-directory"
  | "conversational-minimal"
  | "founder-index"
  | "grant-page"
  | "desktop"
  | "terminal"
  | "editor"
  | "hn"
  | "wiki"
  | "old-web"
  | "publishing"
  | "cards"
  | "catalog"
  | "grid"
  | "minimal"
  | "maximal"
  | "dashboard";

const navItemsBase: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/photos", label: "Photos" },
  { href: "/archives", label: "Archives" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/contact", label: "Contact" },
  { href: "/rss.xml", label: "RSS" },
];

const familyBySlug: Record<string, RendererFamily> = {
  "spartan-essay-table": "spartan",
  "monospace-manual": "manual",
  "plaintext-scoreboard": "scoreboard",
  "fashion-archive-index": "archive-index",
  "playful-climber-scrapbook": "scrapbook",
  "coordinates-art-index": "art-index",
  "no-css-club": "no-css",
  "annotated-research-sidenotes": "research-sidenotes",
  "spaced-wordmark-studio": "wordmark-studio",
  "intimate-builder-notes": "builder-notes",
  "research-tools-studio": "research-tools",
  "contemporary-art-library": "art-library",
  "idealist-studio-index": "studio-index",
  "lifeworks-cargo-cv": "cargo-cv",
  "artist-news-ledger": "artist-ledger",
  "latent-garden-notebook": "garden-notebook",
  "fragment-library-journal": "fragment-journal",
  "ucoz-folk-archive": "ucoz-archive",
  "empty-uncertainty-schema": "uncertainty",
  "transparent-news-briefing": "briefing",
  "graphic-bookmaker-card": "bookmaker-card",
  "experimental-publication-loop": "experimental-loop",
  "taste-directory": "taste-directory",
  "recent-writer-ledger": "writer-ledger",
  "artist-menu-works": "artist-menu",
  "friendly-nerd-hub": "friendly-hub",
  "playful-games-cabinet": "games-cabinet",
  "creativity-portal-gallery": "portal-gallery",
  "design-archive-repository": "design-repository",
  "weblog-topic-facets": "weblog-facets",
  "research-lab-index": "research-lab",
  "visual-culture-practice": "visual-culture",
  "room-wall-portfolio": "room-wall",
  "artist-book-microsite": "book-microsite",
  "cyberfeminist-download-index": "download-index",
  "nonfiction-visual-index": "visual-index",
  "personal-html-bulletin": "html-bulletin",
  "daily-consumption-digest": "consumption-digest",
  "data-graphics-portfolio": "data-portfolio",
  "internet-map-diagram": "internet-diagram",
  "vernacular-web-essay": "vernacular-essay",
  "cheap-web-manifesto": "cheap-manifesto",
  "poetic-computation-article": "poetic-article",
  "feral-web-essay": "feral-essay",
  "performance-club-index": "performance-club",
  "recurse-link-joy": "recurse-joy",
  "scenario-forecast-report": "forecast-report",
  "rationalist-forum-frontpage": "forum-frontpage",
  "blogroll-essay-archive": "essay-blogroll",
  "now-page-directory": "now-directory",
  "conversational-minimalist": "conversational-minimal",
  "founder-link-index": "founder-index",
  "ai-grant-application-page": "grant-page",
  "classic-mac": "desktop",
  win95: "desktop",
  win98: "desktop",
  "windows-xp": "desktop",
  "windows-7": "desktop",
  dos: "terminal",
  "commodore-64": "terminal",
  palmpilot: "cards",
  ipod: "catalog",
  tufte: "publishing",
  latex: "publishing",
  newspaper: "publishing",
  magazine: "grid",
  paperback: "publishing",
  "academic-journal": "publishing",
  "field-notes": "cards",
  "legal-brief": "publishing",
  encyclopedia: "wiki",
  "markdown-reader": "minimal",
  "html-1": "minimal",
  geocities: "old-web",
  blogger: "dashboard",
  myspace: "old-web",
  tumblr: "cards",
  craigslist: "catalog",
  "hacker-news": "hn",
  wikipedia: "wiki",
  "rss-reader": "dashboard",
  webring: "old-web",
  "green-terminal": "terminal",
  "amber-terminal": "terminal",
  "solarized-light": "editor",
  "solarized-dark": "editor",
  monokai: "editor",
  dracula: "editor",
  gruvbox: "editor",
  nord: "editor",
  catppuccin: "editor",
  "vim-help": "editor",
  "personal-blog": "dashboard",
  "digital-garden": "wiki",
  "public-wiki": "wiki",
  cv: "catalog",
  portfolio: "grid",
  "now-page": "minimal",
  "uses-page": "catalog",
  colophon: "publishing",
  guestbook: "cards",
  "personal-portal": "dashboard",
  receipt: "catalog",
  "index-cards": "cards",
  "filing-cabinet": "desktop",
  notebook: "cards",
  corkboard: "cards",
  whiteboard: "grid",
  blueprint: "grid",
  calendar: "catalog",
  map: "grid",
  "museum-label": "grid",
  "government-form": "catalog",
  "university-page": "dashboard",
  "library-catalog": "catalog",
  "airline-departures": "catalog",
  "diner-menu": "catalog",
  "record-store": "grid",
  "art-gallery": "grid",
  "hardware-manual": "publishing",
  "financial-terminal": "terminal",
  "classified-ads": "catalog",
  "plain-html": "minimal",
  brutalist: "maximal",
  "swiss-grid": "grid",
  monochrome: "minimal",
  "high-contrast": "minimal",
  print: "publishing",
  "large-type": "minimal",
  "no-css": "minimal",
  "reader-mode": "publishing",
  "low-bandwidth": "minimal",
  "sticker-sheet": "maximal",
  "badge-wall": "old-web",
  "tiled-background": "old-web",
  "pixel-art": "maximal",
  vaporwave: "maximal",
  cyberpunk: "terminal",
  scrapbook: "maximal",
  collage: "maximal",
  arcade: "maximal",
  "toy-ui": "maximal",
  winter: "publishing",
  summer: "grid",
  midnight: "editor",
  sunrise: "publishing",
  birthday: "maximal",
  "launch-day": "grid",
  "archive-mode": "catalog",
  "random-chaos": "maximal",
  "secret-mode": "terminal",
  "theme-museum": "grid",
};

export function resolveThemeFromRequest(request: Request): SiteTheme {
  const url = new URL(request.url);
  const requested = url.searchParams.get("theme");
  if (requested) return getThemeBySlug(requested);

  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\s*)siteTheme=([^;]+)/);
  return match ? getThemeBySlug(decodeURIComponent(match[1])) : originalTheme;
}

export function renderThemedPage<T extends PageModel>(options: RenderPageOptions<T>): string {
  const family = familyBySlug[options.theme.slug] || "aqua";
  const ctx: RenderContext = {
    theme: options.theme,
    family,
    currentPage: options.currentPage,
    pageSubtitle: options.pageSubtitle || "",
    navItems: navItemsBase.map((item) => ({ ...item, active: item.href === options.currentPage })),
  };
  const content = renderRoute(options.routeType, options.model, ctx);

  if (family === "aqua") {
    return renderAquaShell(options, content);
  }

  if (family === "no-css") {
    return renderNoCssShell(options, content, ctx);
  }

  return renderCustomShell(options, content, ctx);
}

function renderRoute(routeType: RouteType, model: PageModel, ctx: RenderContext): string {
  if (routeType === "home") return renderHome(model as HomeModel, ctx);
  if (routeType === "blog-index") return renderBlogIndex(model as BlogIndexModel, ctx);
  if (routeType === "blog-post") return renderBlogPost(model as BlogPostModel, ctx);
  if (routeType === "archives") return renderArchives(model as ArchiveModel, ctx);
  if (routeType === "guestbook") return renderGuestbook(model as GuestbookModel, ctx);
  if (routeType === "themes") return renderThemes(model as ThemesModel, ctx);
  if (ctx.family === "archive-index") return renderArchiveIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "wordmark-studio") return renderWordmarkGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "builder-notes") return renderBuilderNotesGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "manual") return renderManualGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "art-library") return renderArtLibraryGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "studio-index") return renderStudioIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "cargo-cv") return renderCargoCvGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "artist-ledger") return renderArtistLedgerGeneric(model as GenericPageModel, ctx);
  return `<article class="theme-generic"><h2>${escapeHtml((model as GenericPageModel).heading)}</h2>${(model as GenericPageModel).contentHtml}</article>`;
}

function renderAquaShell<T extends PageModel>(options: RenderPageOptions<T>, content: string): string {
  const navData = {
    homeActive: options.currentPage === "/" ? "active" : "",
    blogActive: options.currentPage === "/blog" ? "active" : "",
    photosActive: options.currentPage === "/photos" ? "active" : "",
    archivesActive: options.currentPage === "/archives" ? "active" : "",
    guestbookActive: options.currentPage === "/guestbook" ? "active" : "",
    contactActive: options.currentPage === "/contact" ? "active" : "",
    themesActive: options.currentPage === "/themes" ? "active" : "",
    sidebarExtra: "",
  };

  return layout({
    title: options.title,
    nav: nav(navData),
    content: `${content}${renderMiniThemePicker(options.theme)}`,
    pageSubtitle: options.pageSubtitle || "",
    description: options.description || "Ryan Prendergast's personal website and blog",
    ogType: options.ogType || "website",
    canonicalUrl: options.canonicalUrl || `https://ryan-prendergast.com${options.currentPage}`,
    ogImage: options.ogImage || "",
    twitterImage: options.ogImage || "",
    structuredData: options.structuredData || "",
    bodyClass: `theme-rendered theme-${options.theme.slug} family-aqua ${options.bodyClass || ""}`,
  }).replace('data-theme="aqua"', `data-theme="${escapeHtml(options.theme.slug)}"`);
}

function renderNoCssShell<T extends PageModel>(options: RenderPageOptions<T>, content: string, ctx: RenderContext): string {
  const description = options.description || "Ryan Prendergast's personal website and blog";
  return `<!DOCTYPE html>
<html lang="en" data-theme="${escapeHtml(options.theme.slug)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(options.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(options.canonicalUrl || `https://ryan-prendergast.com${options.currentPage}`)}">
  ${options.structuredData || ""}
</head>
<body class="theme-layout theme-${escapeHtml(options.theme.slug)} family-${ctx.family} ${options.bodyClass || ""}">
  <header>
    <h1><a href="/">Ryan Prendergast</a></h1>
    <nav>${ctx.navItems.map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join(" | ")}</nav>
    <hr>
  </header>
  <main>${content}</main>
  <hr>
  <footer><p><a href="/rss.xml">RSS</a></p></footer>
  <div style="position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #000;padding:8px;z-index:9999">${renderMiniThemePicker(options.theme)}</div>
  <script src="/theme-system.js" defer></script>
</body>
</html>`;
}

function renderCustomShell<T extends PageModel>(options: RenderPageOptions<T>, content: string, ctx: RenderContext): string {
  const description = options.description || "Ryan Prendergast's personal website and blog";
  const canonicalUrl = options.canonicalUrl || `https://ryan-prendergast.com${options.currentPage}`;
  const navHtml = ctx.navItems
    .map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("");
  const picker = renderMiniThemePicker(options.theme);
  const shellChrome = renderShellChrome(ctx);

  return `<!DOCTYPE html>
<html lang="en" data-theme="${escapeHtml(options.theme.slug)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(options.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="Ryan Prendergast">
  <link rel="icon" href="/favicon.ico">
  <link href="/styles.css" rel="stylesheet">
  <meta property="og:title" content="${escapeHtml(options.title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="${escapeHtml(options.ogType || "website")}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:site_name" content="Ryan Prendergast">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" type="application/rss+xml" title="Ryan Prendergast's Blog RSS" href="/rss.xml">
  <meta name="robots" content="index, follow">
  ${options.structuredData || ""}
</head>
<body class="site-shell theme-layout theme-${escapeHtml(options.theme.slug)} family-${ctx.family} ${options.bodyClass || ""}">
  ${shellChrome.before}
  <div class="theme-shell-frame">
    <main class="theme-shell-main">${content}</main>
    <footer class="theme-shell-footer theme-utility-footer">
      <div>
        <span>Ryan Prendergast</span>
        <span>${escapeHtml(options.theme.name)}</span>
      </div>
      <nav class="theme-shell-nav">${navHtml}</nav>
    </footer>
  </div>
  ${picker}
  ${shellChrome.after}
  <script src="/theme-system.js" defer></script>
</body>
</html>`;
}

function renderShellChrome(ctx: RenderContext): { before: string; after: string } {
  if (ctx.family === "desktop") {
    return {
      before: `<div class="desktop-icons"><a href="/">Home</a><a href="/blog">Posts</a></div>`,
      after: `<div class="theme-taskbar"><span>Start</span><span>${escapeHtml(ctx.theme.name)}</span><time>RyanOS</time></div>`,
    };
  }
  if (ctx.family === "terminal" || ctx.family === "editor") {
    return {
      before: `<div class="terminal-status">ryan@site:~$ open ${escapeHtml(ctx.currentPage || "/")}</div>`,
      after: "",
    };
  }
  if (ctx.family === "old-web") {
    return {
      before: `<div class="old-web-marquee">WELCOME TO RYAN PRENDERGAST WORLDWIDE - BEST VIEWED ANYWHERE</div>`,
      after: `<div class="old-web-badges"><span>88x31</span><span>RSS</span><span>WEBRING</span><span>HTML</span></div>`,
    };
  }
  return { before: "", after: "" };
}

function renderMiniThemePicker(theme: SiteTheme): string {
  const options = [`<option value="original"${theme.slug === "original" ? " selected" : ""}>Original</option>`, ...siteThemes
    .map((candidate) => `<option value="${candidate.slug}"${candidate.slug === theme.slug ? " selected" : ""}>${escapeHtml(candidate.name)}</option>`)
  ].join("");
  return `<div class="mini-theme-picker sticky-theme-picker"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${options}</select><button type="button" data-theme-random>Random</button><button type="button" data-theme-reset>Remove theme</button></div>`;
}

function renderCanonicalHomeHeader(model: HomeModel): string {
  return `<header class="canonical-home-header"><nav class="canonical-site-nav"><a href="/">Linkblog</a><a href="/blog">Blog</a><a href="/photos">Photos</a><a href="/archives">Archives</a><a href="/guestbook">Guestbook</a><a href="/contact">Contact</a><a href="/rss.xml">RSS</a></nav><h2>Ryan Prendergast</h2>${model.introHtml}</header>`;
}

function renderManualHeader(ctx: RenderContext, title: string, description: string, rows: Array<[string, string]> = []): string {
  const nav = ctx.navItems
    .map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("");
  const metaRows = [
    ["Title", escapeHtml(title)],
    ["Author", "Ryan Prendergast"],
    ["Section", escapeHtml(ctx.currentPage || "/")],
    ...rows,
  ];
  const descriptionHtml = description ? `<p>${escapeHtml(description)}</p>` : "";
  return `<header class="manual-header"><h1>${escapeHtml(title)}</h1>${descriptionHtml}<table class="manual-meta"><tbody>${metaRows.map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${value}</td></tr>`).join("")}</tbody></table><label class="manual-debug-toggle"><input type="checkbox" disabled> Debug mode</label><nav class="manual-nav" aria-label="Core site areas">${nav}<a class="${ctx.currentPage === "/themes" ? "is-active" : ""}" href="/themes">Themes</a></nav></header>`;
}

function renderManualRule(): string {
  return `<hr class="manual-rule">`;
}

function renderManualToc(items: Array<[string, string]>): string {
  return `<section class="manual-toc" aria-labelledby="manual-contents"><h2 id="manual-contents">Contents</h2><ol>${items.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ol></section>`;
}

function renderScoreboardHeader(ctx: RenderContext, title: string, state = ""): string {
  const loaded = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "Home"],
    ["/blog", "Blog"],
    ["/photos", "Photos"],
    ["/archives", "Archives"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
    ["/rss.xml", "RSS"],
  ] as Array<[string, string]>;
  return `<header class="scoreboard-header" id="top"><p>Page loaded: ${escapeHtml(loaded)}</p><p>Data loaded: ${escapeHtml(loaded)}</p><h1><a href="/">Ryan Prendergast</a></h1><div class="scoreboard-modes"><span>Dark Mode</span> <span>Light Mode</span></div><nav class="scoreboard-pager" aria-label="Date pager"><a href="/archives">&lt; Archives</a><strong>${escapeHtml(title)}</strong><a href="/blog">Blog &gt;</a></nav><nav class="scoreboard-leagues" aria-label="Core site areas"><span>Leagues:</span>${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}<a class="${active("/themes")}" href="/themes">Themes</a></nav>${state ? `<p class="scoreboard-state">${escapeHtml(state)}</p>` : ""}</header>`;
}

function renderScoreboardBox(lines: string[], href: string): string {
  const width = Math.max(14, ...lines.map((line) => line.length));
  const top = `+-${"-".repeat(width)}-+`;
  const body = lines.map((line) => `| ${line.padEnd(width, " ")} |`);
  return `<a class="scoreboard-box" href="${href}"><pre>${[top, ...body, top].map(escapeHtml).join("\n")}</pre></a>`;
}

function renderScoreboardTable(headers: string[], rows: string[][]): string {
  return `<table class="scoreboard-table"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function renderManualLinkEntry(link: LinkEntryModel, index: number): string {
  const image = link.image ? `<figure class="manual-media"><img src="${link.image}" alt="" loading="lazy"><figcaption>${escapeHtml(link.title)}</figcaption></figure>` : "";
  return `<article class="manual-entry"><h3 id="link-${index + 1}"><a href="${link.url}">${escapeHtml(link.title)}</a></h3><table><tbody><tr><th>Source</th><td>${escapeHtml(link.domain)}</td></tr><tr><th>Date</th><td>${escapeHtml(link.date)}</td></tr></tbody></table>${image}<div class="manual-entry-body">${link.contentHtml}</div></article>`;
}

function renderManualPostSummary(post: PostSummaryModel, index: number): string {
  return `<article class="manual-entry"><h3 id="post-${index + 1}"><a href="${post.href}">${escapeHtml(post.title)}</a></h3><table><tbody><tr><th>Date</th><td>${escapeHtml(post.date)}</td></tr>${post.readTime ? `<tr><th>Read time</th><td>${escapeHtml(post.readTime)}</td></tr>` : ""}</tbody></table>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</article>`;
}

function renderHome(model: HomeModel, ctx: RenderContext): string {
  const links = model.links.map((link, index) => renderLinkEntry(link, index, ctx)).join("");
  const posts = model.recentPosts.map((post, index) => renderPostSummary(post, index, ctx)).join("");
  const homeHeader = renderCanonicalHomeHeader(model);

  if (ctx.family === "spartan") {
    return `<table class="pg-home"><tbody><tr><td>${homeHeader}<p><b>New:</b> ${model.recentPosts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" | ")}</p><hr><p>${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("<br>")}</p></td></tr></tbody></table>`;
  }

  if (ctx.family === "manual") {
    return `<article class="manual-page">${renderManualHeader(ctx, "Ryan Prendergast", stripHtml(model.introHtml), [["Version", "linklog"], ["Links", String(model.links.length)], ["Recent essays", String(model.recentPosts.length)]])}${renderManualToc([["#links", "Links"], ["#essays", "Recent Essays"], ["#navigation", "Navigation"]])}${renderManualRule()}<section id="links"><h2>Links</h2>${model.links.map((link, index) => renderManualLinkEntry(link, index)).join("")}</section>${renderManualRule()}<section id="essays"><h2>Recent Essays</h2>${model.recentPosts.map((post, index) => renderManualPostSummary(post, index)).join("")}</section><figure id="navigation" class="manual-ascii"><pre>Ryan Prendergast
-- Home
-- Blog
-- Photos
-- Archives
-- Guestbook
-- Contact
-- RSS</pre></figure></article>`;
  }

  if (ctx.family === "scoreboard") {
    const boxes = model.links.slice(0, 8).map((link, index) => renderScoreboardBox([`${String(index + 1).padStart(2, "0")} ${link.date}`, link.title.slice(0, 18), link.domain.slice(0, 18)], link.url)).join("");
    const rows = model.links.map((link, index) => [String(index + 1), escapeHtml(link.date), `<a href="${link.url}">${escapeHtml(link.title)}</a>`, escapeHtml(link.domain)]);
    return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Monday, June 15", `${model.links.length} link entries · ${model.recentPosts.length} recent essays`)}<section class="scoreboard-identity"><h2>Ryan Prendergast</h2><div>${model.introHtml}</div></section><h3>Linkblog</h3><nav class="scoreboard-subnav"><a href="/">Schedule</a><a href="/archives">Standings</a><a href="/blog">Teams</a></nav><div class="scoreboard-box-grid">${boxes}</div><h3>Entries</h3>${renderScoreboardTable(["#", "Date", "Entry", "Source"], rows)}<h3>Recent Essays</h3>${renderScoreboardTable(["Date", "Essay", "Status"], model.recentPosts.map((post) => [escapeHtml(post.date), `<a href="${post.href}">${escapeHtml(post.title)}</a>`, escapeHtml(post.readTime || "Final")]))}</section>`;
  }

  if (ctx.family === "archive-index") {
    const sourceCounts = countBy(model.links.map((link) => link.domain));
    const linkRows = model.links.map((link) => renderArchiveIndexRow(link.title, link.url, link.domain, link.date, stripHtml(link.contentHtml))).join("");
    const postRows = model.recentPosts.map((post) => renderArchiveIndexRow(post.title, post.href, "Ryan Prendergast", post.date, post.readTime || "")).join("");
    return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Ryan Prendergast", model.introHtml, `${model.links.length} links / ${model.recentPosts.length} essays`)}${renderArchiveIndexFilters("All")}<section class="archive-index-directory"><div><h2>All Sources</h2>${renderArchiveIndexNames(sourceCounts)}</div><div><h2>Recent Posts</h2><div class="archive-index-list">${postRows}</div></div></section><section class="archive-index-feed"><h2>All Entries</h2><div class="archive-index-list">${linkRows}</div></section></section>`;
  }

  if (ctx.family === "scrapbook") {
    const climbWords = stripHtml(model.introHtml).split(/\s+/).filter(Boolean).slice(0, 18);
    const wordField = climbWords.map((word, index) => `<span style="--step:${index % 7}">${escapeHtml(word)}</span>`).join("");
    const linkItems = model.links.map((link, index) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a>${index % 3 === 1 ? ` <span>${escapeHtml(link.domain)}</span>` : ""}<div>${link.contentHtml}</div></li>`).join("");
    const postItems = model.recentPosts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.readTime ? ` <span>${escapeHtml(post.readTime)}</span>` : ""}</li>`).join("");
    return `<section class="scrapbook"><div class="scrapbook-word-field" aria-hidden="true">${wordField}</div>${homeHeader}<section class="scrapbook-section"><h3>Linkblog</h3><ol>${linkItems}</ol></section><section class="scrapbook-section"><h3>Blog</h3><ol>${postItems}</ol></section></section>`;
  }

  if (ctx.family === "art-index") {
    return `<section class="art-index"><p>LAT: 40.7128 LNG: -74.0060</p>${homeHeader}${model.links.map((link, index) => `<div class="art-row"><span>${2026 - (index % 8)}</span><a href="${link.url}">𓁹 ${escapeHtml(link.title)}</a><em>${escapeHtml(link.domain)}</em></div>`).join("")}</section>`;
  }

  if (ctx.family === "research-sidenotes") {
    return `<article class="research-page">${homeHeader}<h3>Links</h3>${model.links.map((link, index) => `<p><a href="${link.url}">${escapeHtml(link.title)}</a><label for="sn-${index}" class="sidenote-number"></label><span class="sidenote">${escapeHtml(link.domain)} · ${escapeHtml(link.date)}</span></p>`).join("")}<h3>Recent Essays</h3>${posts}</article>`;
  }

  if (ctx.family === "wordmark-studio") {
    const linkProjects = model.links
      .map((link) => `<a class="wordmark-project" href="${link.url}"><span>${escapeHtml(link.title)}</span><small>${escapeHtml(link.domain)}</small></a>`)
      .join("");
    const writingProjects = model.recentPosts
      .map((post) => `<a class="wordmark-project" href="${post.href}"><span>${escapeHtml(post.title)}</span><small>${escapeHtml(post.date)}${post.readTime ? ` · ${escapeHtml(post.readTime)}` : ""}</small></a>`)
      .join("");
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${renderWordmarkHero(model.introHtml)}<section id="work" class="wordmark-panel wordmark-overview"><div><p>${model.links.length} links</p><p>${model.recentPosts.length} recent posts</p></div><div>${model.aboutHtml}</div><a href="/contact">Inquiries</a></section><section id="grid" class="wordmark-section"><div class="wordmark-section-head"><h2>Grid</h2><a href="/archives">Archive</a></div><div class="wordmark-grid">${linkProjects}</div></section><section class="wordmark-section"><div class="wordmark-section-head"><h2>Writing</h2><a href="/blog">All writing</a></div><div class="wordmark-grid">${writingProjects}</div></section></section>`;
  }

  if (ctx.family === "builder-notes") {
    return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<header class="builder-notes-intro"><h1>Ryan Prendergast</h1><div class="builder-notes-lede">${model.introHtml}</div></header><section class="builder-notes-now">${model.aboutHtml}</section><section class="builder-notes-section"><h2>writing</h2>${model.recentPosts.map((post) => renderBuilderNotesPostLine(post)).join("")}</section><section class="builder-notes-section"><h2>links</h2>${model.links.map((link) => renderBuilderNotesLinkLine(link)).join("")}</section></section>`;
  }

  if (ctx.family === "research-tools") {
    return `<section class="research-tools">${renderResearchToolsHeader(ctx, model.introHtml)}<div class="research-tools-practice">${model.aboutHtml}</div><section class="research-tools-section"><h2>tools</h2><ul class="research-tools-list">${model.links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a> <span>${escapeHtml(stripHtml(link.contentHtml))}</span></li>`).join("")}</ul></section><section class="research-tools-section"><h2>articles</h2><ul class="research-tools-articles">${model.recentPosts.map((post) => `<li><a href="${post.href}"><time>${escapeHtml(post.rawDate || post.date)}</time> ${escapeHtml(post.title)}${post.excerpt ? ` <span>${escapeHtml(post.excerpt)}</span>` : ""}</a></li>`).join("")}</ul></section></section>`;
  }

  if (ctx.family === "art-library") {
    return `<section class="art-library">${renderArtLibraryHeader(ctx, "Library", model.introHtml)}${renderArtLibraryCategories(["Links", "Writing", "Archive", "Photos", "Contact"])}${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], model.links.map((link) => [`<a href="${link.url}">${escapeHtml(link.title)}</a>`, escapeHtml(link.domain), escapeHtml(link.date), "Link"]))}<section class="art-library-info">${model.aboutHtml}</section></section>`;
  }

  if (ctx.family === "studio-index") {
    const projects = model.links.map((link, index) => renderStudioIndexProject(link.title, link.url, link.domain, link.date, link.image, index)).join("");
    const recent = model.recentPosts
      .map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.readTime || "Essay", index))
      .join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, model.introHtml, "Index")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Interface", "Systems", "Writing", "Images", "References"])}<div class="studio-index-content"><section class="studio-index-manifesto">${model.aboutHtml}</section><div class="studio-index-grid">${projects}</div><section class="studio-index-panel"><div class="studio-index-panel-title">Studies</div><div class="studio-index-list">${recent}</div></section></div></div></section>`;
  }

  if (ctx.family === "cargo-cv") {
    const lifeworks = [
      `<span class="cargo-cv-info">${model.introHtml}</span>`,
      ...model.recentPosts.slice(0, 3).map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a> <span>${escapeHtml(post.readTime || post.date)}</span>`),
      ...model.links.slice(0, 5).map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a> <span>${escapeHtml(link.domain)}</span>`),
    ];
    return renderCargoCvPage(ctx, "Info", `<h2>Lifeworks:</h2>${renderCargoCvList(lifeworks)}<section class="cargo-cv-profile">${model.aboutHtml}</section>`);
  }

  if (ctx.family === "artist-ledger") {
    const latest = model.recentPosts[0]
      ? `<a href="${model.recentPosts[0].href}">${escapeHtml(model.recentPosts[0].title)}</a>`
      : `<a href="/archives">Ryan's linklog</a>`;
    const news = model.recentPosts
      .map((post) => renderArtistLedgerRow(post.date, post.href, post.title, post.readTime || "Writing"))
      .join("");
    const work = model.links
      .map((link) => renderArtistLedgerRow(link.date, link.url, link.title, link.domain, stripHtml(link.contentHtml)))
      .join("");
    return `<section class="artist-ledger"><div class="artist-ledger-latest"><span>Latest News</span>${latest}</div>${renderArtistLedgerHeader(ctx)}<section id="about" class="artist-ledger-about"><div>${model.introHtml}</div><div>${model.aboutHtml}</div></section><section id="news" class="artist-ledger-section"><h2>News</h2><div class="artist-ledger-list">${news}</div></section><section id="work" class="artist-ledger-section artist-ledger-work"><h2>Work</h2><div class="artist-ledger-list">${work}</div></section></section>`;
  }

  if (ctx.family === "garden-notebook") {
    return `<section class="garden-notebook">${homeHeader}<div class="garden-beds">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "fragment-journal") {
    return `<section class="fragment-journal">${homeHeader}<nav>about playlists journal notes library poetry archive</nav><div class="latest-columns"><section><h3>latest posts</h3>${posts}</section><section><h3>latest notes</h3>${links}</section></div></section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return `<section class="ucoz-archive"><div class="ucoz-top">narod.ru ucoz.ru blogspot.ru</div><nav>Главная | Каталог файлов | Регистрация | Вход</nav>${homeHeader}<h3>Каталог файлов</h3>${links}</section>`;
  }
  if (ctx.family === "uncertainty") {
    return `<section class="uncertainty"><div class="uncertain-content">${homeHeader}${links}</div></section>`;
  }
  if (ctx.family === "briefing") {
    return `<section class="briefing"><nav>Home Politics Business Technology Energy</nav>${homeHeader}<div class="brief-grid">${model.links.map((link) => `<article><span>THE NEWS</span><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "bookmaker-card") {
    return `<section class="bookmaker-card">${homeHeader}<address><a href="/contact">contact</a> · <a href="/blog">writing</a> · <a href="/archives">archive</a></address></section>`;
  }
  if (ctx.family === "experimental-loop") {
    return `<section class="experimental-loop">${homeHeader}${links}</section>`;
  }
  if (ctx.family === "taste-directory") {
    return `<section class="taste-directory"><nav>Rising Browse</nav>${homeHeader}<div class="taste-cats">Links · Writing · Archives</div>${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${escapeHtml(link.domain)}</p></article>`).join("")}</section>`;
  }
  if (ctx.family === "writer-ledger") {
    return `<section class="writer-ledger">${homeHeader}<h3>recently...</h3>${model.recentPosts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}${model.links.slice(0, 8).map((link) => `<p><a href="${link.url}">${escapeHtml(link.title)}</a></p>`).join("")}</section>`;
  }

  if (ctx.family === "artist-menu") {
    return `<section class="artist-menu"><button>Menu</button>${homeHeader}<nav>Projects & Collaborations Publications About Contact</nav><div class="works-list">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "friendly-hub") {
    return `<section class="friendly-hub">${homeHeader}<nav>Hi · writing · links · contact</nav>${links}</section>`;
  }
  if (ctx.family === "games-cabinet") {
    return `<section class="games-cabinet">${homeHeader}<nav>blog all work about</nav><div class="game-grid">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "portal-gallery") {
    return `<section class="portal-gallery"><nav>gallery index links</nav>${homeHeader}<div class="portal-grid">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "design-repository") {
    return `<section class="design-repository">${homeHeader}<nav>links · writing · archive</nav>${links}</section>`;
  }
  if (ctx.family === "weblog-facets") {
    const tags = ["ai", "security", "tools", "links", "books", "web"];
    return `<section class="weblog-facets">${homeHeader}<nav>About Subscribe TILs Tools</nav><div class="tag-cloud">${tags.map((tag, index) => `<a href="/blog">${tag} ${300 - index * 23}</a>`).join("")}</div>${posts}${links}</section>`;
  }
  if (ctx.family === "research-lab") {
    return `<section class="research-lab"><nav>Research Learn News</nav>${homeHeader}<div class="research-grid">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "visual-culture") {
    return `<section class="visual-culture">${homeHeader}${links}</section>`;
  }

  if (ctx.family === "room-wall") {
    return `<section class="room-wall"><nav>work contact instagram cv</nav>${homeHeader}<div class="wall-links">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "book-microsite") {
    return `<section class="book-microsite"><p class="next">NEXT</p>${homeHeader}<div class="credit-grid"><span>entries</span><b>${model.links.length}</b></div>${links}</section>`;
  }
  if (ctx.family === "download-index") {
    return `<section class="download-index">${homeHeader}<table><tbody>${model.links.map((link, index) => `<tr><td>${String(index + 1).padStart(4, "0")}</td><td><a href="${link.url}">${escapeHtml(link.title)}</a></td><td>${escapeHtml(link.domain)}</td><td>${escapeHtml(link.date)}</td></tr>`).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "visual-index") {
    return `<section class="visual-index">${homeHeader}<div class="visual-rows">${model.links.map((link, index) => `<a href="${link.url}"><span>${2026 - (index % 6)}</span><strong>${escapeHtml(link.title)}</strong><em>${escapeHtml(link.domain)}</em></a>`).join("")}</div></section>`;
  }
  if (ctx.family === "html-bulletin") {
    return `<section class="html-bulletin">${homeHeader}<p>last updated: ${model.recentPosts[0]?.date || ""}</p><h3>bulletin</h3><ul>${model.links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a> - ${escapeHtml(link.domain)}</li>`).join("")}</ul></section>`;
  }
  if (ctx.family === "consumption-digest") {
    return `<section class="consumption-digest">${homeHeader}${model.links.map((link) => `<article><time>${escapeHtml(link.date)}</time><a href="${link.url}">${escapeHtml(link.title)}</a><p>${escapeHtml(link.domain)}</p></article>`).join("")}</section>`;
  }
  if (ctx.family === "data-portfolio") {
    return `<section class="data-portfolio"><header>${homeHeader}<nav>projects writing links</nav></header><div class="view-toggle">grid / list</div><div class="data-grid">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "internet-diagram") {
    return `<section class="internet-diagram"><nav>random labels info index</nav>${homeHeader}<div class="node-map">${model.links.slice(0, 12).map((link, index) => `<a style="--x:${(index * 17) % 83}%;--y:${(index * 29) % 76}%;" href="${link.url}">${escapeHtml(link.domain)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "vernacular-essay") {
    return `<article class="vernacular-essay"><nav>english / print</nav>${homeHeader}<hr>${model.links.map((link) => `<p><a href="${link.url}">${escapeHtml(link.title)}</a><br>${stripHtml(link.contentHtml)}</p>`).join("")}</article>`;
  }
  if (ctx.family === "cheap-manifesto") {
    return `<section class="cheap-manifesto">${homeHeader}${links}</section>`;
  }
  if (ctx.family === "poetic-article") {
    return `<article class="poetic-article"><nav>blog newsletter</nav>${homeHeader}<div class="article-links">${links}</div></article>`;
  }
  if (ctx.family === "feral-essay") {
    return `<article class="feral-essay">${homeHeader}${posts}</article>`;
  }
  if (ctx.family === "performance-club") {
    return `<section class="performance-club">${homeHeader}<table><tbody>${model.links.map((link) => `<tr><td><a href="${link.url}">${escapeHtml(link.domain)}</a></td><td>${escapeHtml(link.title)}</td><td>${escapeHtml(link.date)}</td></tr>`).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "recurse-joy") {
    return `<section class="recurse-joy"><nav>Home About Subscribe Atom</nav>${homeHeader}${model.links.map((link) => `<article><time>${escapeHtml(link.date)}</time><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</section>`;
  }
  if (ctx.family === "forecast-report") {
    return `<article class="forecast-report"><nav>summary research forecast</nav>${homeHeader}<ol>${model.links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a></li>`).join("")}</ol></article>`;
  }
  if (ctx.family === "forum-frontpage") {
    return `<section class="forum-frontpage"><aside>Recent Recommended Concepts Library</aside><main>${homeHeader}${model.links.map((link, index) => `<article><span>${index + 1}</span><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p>${escapeHtml(link.domain)} · ${escapeHtml(link.date)}</p></article>`).join("")}</main></section>`;
  }
  if (ctx.family === "essay-blogroll") {
    return `<section class="essay-blogroll"><main>${homeHeader}${posts}${links}</main><aside><h3>Posts</h3><a href="/blog">Archives</a><a href="/rss.xml">Feed</a><h3>Links</h3>${model.links.slice(0, 6).map((link) => `<a href="${link.url}">${escapeHtml(link.domain)}</a>`).join("")}</aside></section>`;
  }
  if (ctx.family === "now-directory") {
    return `<section class="now-directory">${homeHeader}${links}</section>`;
  }
  if (ctx.family === "conversational-minimal") {
    return `<section class="conversational-minimal">${homeHeader}<nav>essays books projects now contact</nav>${posts}${links}</section>`;
  }
  if (ctx.family === "founder-index") {
    return `<section class="founder-index">${homeHeader}<nav>advice blog bookshelf culture labs progress questions</nav><div class="founder-columns">${["Writing", "Links", "Projects"].map((heading) => `<section><h3>${heading}</h3>${links}</section>`).join("")}</div></section>`;
  }
  if (ctx.family === "grant-page") {
    return `<section class="grant-page">${homeHeader}<a class="grant-cta" href="/contact">Contact</a><div class="grant-grid">${model.links.slice(0, 6).map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "hn") {
    return `<section class="hn-feed"><div class="hn-intro">${homeHeader}</div><table><tbody>${model.links
      .map((link, index) => `<tr><td class="rank">${index + 1}.</td><td><a href="${link.url}">${escapeHtml(link.title)}</a><span class="sitebit"> (${escapeHtml(link.domain)})</span><div class="subtext">${escapeHtml(link.date)} | ${stripHtml(link.contentHtml)}</div></td></tr>`)
      .join("")}</tbody></table><div class="hn-recent"><strong>Recent Essays</strong>${posts}</div></section>`;
  }

  if (ctx.family === "desktop") {
    return `<section class="desktop-window is-main"><div class="window-title">Linklog</div><div class="window-body">${homeHeader}<div class="file-grid">${links}</div></div></section><section class="desktop-window"><div class="window-title">Recent Essays</div><div class="window-body">${posts}</div></section>`;
  }

  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<section class="terminal-output"><p class="prompt">$ cat about.txt</p>${homeHeader}<p class="prompt">$ tail -n ${model.links.length} links.log</p>${links}<p class="prompt">$ ls recent-essays</p>${posts}</section>`;
  }

  if (ctx.family === "wiki") {
    return `<article class="wiki-article"><aside class="wiki-toc"><a href="#about">About</a><a href="#links">Links</a><a href="#posts">Recent posts</a></aside><section id="about">${homeHeader}</section><h2 id="links">External links</h2>${links}<h2 id="posts">Recent posts</h2>${posts}</article>`;
  }

  return `<section class="theme-home-intro">${homeHeader}</section><section class="theme-link-list">${links}</section><section class="theme-recent-posts"><h2>Recent Essays</h2>${posts}</section>`;
}

function renderBlogIndex(model: BlogIndexModel, ctx: RenderContext): string {
  const groups = model.postsByYear
    .map((group) => `<section class="theme-year-group"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderPostSummary(post, index, ctx)).join("")}</section>`)
    .join("");
  if (ctx.family === "spartan") {
    return `<table class="pg-home"><tbody><tr><td><h2>Essays</h2>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a><br><font size="2">${escapeHtml(post.date)}</font></p>`)).join("")}</td></tr></tbody></table>`;
  }
  if (ctx.family === "manual") {
    return `<article class="manual-page">${renderManualHeader(ctx, "Blog Index", model.description, [["Entries", String(model.totalPosts)], ["Years", model.yearRange ? `${model.yearRange[0]}-${model.yearRange[1]}` : ""]])}${renderManualToc(model.postsByYear.map((group) => [`#year-${group.year}`, group.year]))}${renderManualRule()}<pre>find ./essays -type f</pre>${model.postsByYear.map((group) => `<section id="year-${group.year}" class="manual-year"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderManualPostSummary(post, index)).join("")}</section>`).join("")}</article>`;
  }
  if (ctx.family === "scoreboard") {
    const yearTables = model.postsByYear
      .map((group) => {
        const rows = group.posts.map((post) => [escapeHtml(post.date), `<a href="${post.href}">${escapeHtml(post.title)}</a>`, escapeHtml(post.readTime || "Final")]);
        return `<h3>${escapeHtml(group.year)}</h3>${renderScoreboardTable(["Date", "Title", "Read"], rows)}`;
      })
      .join("");
    return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Blog", `${model.totalPosts} entries`)}<h2>Blog League Schedule</h2><nav class="scoreboard-subnav"><a href="/blog">Schedule</a><a href="/archives">Standings</a><a href="/rss.xml">Teams</a></nav>${yearTables}</section>`;
  }
  if (ctx.family === "archive-index") {
    const posts = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ ...post, year: group.year })));
    const yearCounts = countBy(posts.map((post) => post.year));
    return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "All Posts", `<p>${escapeHtml(model.description)}</p>`, `${model.totalPosts} posts`)}${renderArchiveIndexFilters("Authors")}<section class="archive-index-directory"><div><h2>Years</h2>${renderArchiveIndexNames(yearCounts)}</div><div><h2>Titles</h2><div class="archive-index-list">${posts.map((post) => renderArchiveIndexRow(post.title, post.href, post.year, post.date, post.readTime || "")).join("")}</div></div></section></section>`;
  }
  if (ctx.family === "art-index") {
    return `<section class="art-index"><h2>SELECTED TEXTS</h2>${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<div class="art-row"><span>${escapeHtml(group.year)}</span><a href="${post.href}">𓆓 ${escapeHtml(post.title)}</a></div>`).join("")}`).join("")}</section>`;
  }
  if (ctx.family === "no-css") {
    return `<h2>Blog</h2>${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3><ul>${group.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a> (${escapeHtml(post.date)})</li>`).join("")}</ul>`).join("")}`;
  }
  if (ctx.family === "research-sidenotes") {
    return `<article class="research-page"><h2>Essays</h2><p>${escapeHtml(model.description)}</p>${model.postsByYear.map((group) => `<section><h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a><span class="sidenote">${escapeHtml(post.date)} · ${post.readTime || ""}</span></p>`).join("")}</section>`).join("")}</article>`;
  }
  if (ctx.family === "wordmark-studio" || ctx.family === "studio-index") {
    if (ctx.family === "wordmark-studio") {
      return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Grid</p><h2>Writing</h2><span>${escapeHtml(model.description)}</span></header><div class="wordmark-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}"><span>${escapeHtml(post.title)}</span><small>${escapeHtml(group.year)} · ${escapeHtml(post.date)}</small></a>`)).join("")}</div></section>`;
    }
    const studyRows = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ ...post, year: group.year })));
    const posts = studyRows.map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.year, index)).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, model.description, "Studies")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Essays", "Notes", "Archive"])}<div class="studio-index-content"><div class="studio-index-list studio-index-list-large">${posts}</div></div></div></section>`;
  }
  if (ctx.family === "builder-notes" || ctx.family === "garden-notebook") {
    if (ctx.family === "builder-notes") {
      return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>writing</h1>${model.postsByYear.map((group) => `<section class="builder-notes-section"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post) => renderBuilderNotesPostLine(post)).join("")}</section>`).join("")}</section>`;
    }
    return `<section class="${ctx.family}"><h2>writing</h2>${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p>`).join("")}`).join("")}</section>`;
  }
  if (ctx.family === "research-tools" || ctx.family === "artist-ledger") {
    if (ctx.family === "artist-ledger") {
      return `<section class="artist-ledger">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>News</h2><div class="artist-ledger-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => renderArtistLedgerRow(post.date, post.href, post.title, group.year, post.readTime || ""))).join("")}</div></section></section>`;
    }
    return `<section class="${ctx.family}"><h2>Publications</h2><div class="ledger-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><time>${escapeHtml(post.date)}</time> <a href="${post.href}">${escapeHtml(post.title)}</a></p>`)).join("")}</div></section>`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library">${renderArtLibraryHeader(ctx, "Blog", model.description)}${renderArtLibraryCategories(model.postsByYear.map((group) => group.year))}${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], model.postsByYear.flatMap((group) => group.posts.map((post) => [`<a href="${post.href}">${escapeHtml(post.title)}</a>`, "Ryan Prendergast", escapeHtml(post.date), escapeHtml(group.year)])))}</section>`;
  }
  if (ctx.family === "cargo-cv") {
    const items = model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a> <span>${escapeHtml(group.year)} ${escapeHtml(post.date)}</span>`));
    return renderCargoCvPage(ctx, "Writing", `<h2>Lifeworks:</h2>${renderCargoCvList(items)}<p class="cargo-cv-note">${escapeHtml(model.description)}</p>`);
  }
  if (["fragment-journal", "writer-ledger", "experimental-loop"].includes(ctx.family)) {
    return `<section class="${ctx.family}"><h2>${ctx.family === "writer-ledger" ? "recently..." : "journal"}</h2>${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p>`).join("")}`).join("")}</section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return `<section class="ucoz-archive"><nav>Главная | Каталог файлов | Блог</nav><h2>Материалы сайта</h2>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<div class="ucoz-file"><a href="${post.href}">${escapeHtml(post.title)}</a><br><small>${escapeHtml(post.date)} / ${escapeHtml(group.year)}</small></div>`)).join("")}</section>`;
  }
  if (ctx.family === "uncertainty") {
    return `<section class="uncertainty"><h2>Index</h2>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`)).join("")}</section>`;
  }
  if (ctx.family === "briefing") {
    return `<section class="briefing"><h2>Briefings</h2><div class="brief-grid">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<article><span>${escapeHtml(group.year)}</span><h3><a href="${post.href}">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.date)}</p></article>`)).join("")}</div></section>`;
  }
  if (ctx.family === "bookmaker-card") {
    return `<section class="bookmaker-card"><h2>Writing</h2>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> — ${escapeHtml(post.date)}</p>`)).join("")}</section>`;
  }
  if (ctx.family === "taste-directory") {
    return `<section class="taste-directory"><h2>Browse Writing</h2><div class="taste-cats">Essays · Reviews · Notes · Archives</div>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<article><a href="${post.href}">${escapeHtml(post.title)}</a><p>${escapeHtml(group.year)}</p></article>`)).join("")}</section>`;
  }
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture", "room-wall", "book-microsite", "download-index", "visual-index", "html-bulletin", "consumption-digest", "data-portfolio", "internet-diagram", "vernacular-essay", "cheap-manifesto", "poetic-article", "feral-essay", "performance-club", "recurse-joy", "forecast-report", "forum-frontpage", "essay-blogroll", "now-directory", "conversational-minimal", "founder-index", "grant-page"].includes(ctx.family)) {
    return `<section class="${ctx.family}"><h2>${ctx.family === "research-lab" ? "Research" : "Index"}</h2>${model.postsByYear.map((group) => `<section><h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<section class="terminal-output"><p class="prompt">$ find ./blog -type f</p>${model.postsByYear
      .map((group) => `<div class="terminal-dir">./${group.year}</div>${group.posts.map((post) => `<a class="terminal-line" href="${post.href}">${escapeHtml(post.rawDate)} ${escapeHtml(post.title)}</a>`).join("")}`)
      .join("")}</section>`;
  }
  if (ctx.family === "catalog") {
    return `<section class="catalog-table"><header><span>Title</span><span>Date</span><span>Year</span></header>${model.postsByYear
      .flatMap((group) => group.posts.map((post) => `<a href="${post.href}"><span>${escapeHtml(post.title)}</span><span>${escapeHtml(post.date)}</span><span>${escapeHtml(group.year)}</span></a>`))
      .join("")}</section>`;
  }
  return `<section class="theme-index"><p>${escapeHtml(model.description)}</p>${groups}</section>`;
}

function renderBlogPost(model: BlogPostModel, ctx: RenderContext): string {
  const meta = `${escapeHtml(model.date)}${model.author ? ` - ${escapeHtml(model.author)}` : ""}`;
  if (ctx.family === "spartan") {
    return `<table class="pg-home"><tbody><tr><td><h2>${escapeHtml(model.title)}</h2><font size="2">${meta}</font>${model.subtitle ? `<p><i>${escapeHtml(model.subtitle)}</i></p>` : ""}<br>${model.contentHtml}<p><a href="${model.backHref}">Back</a></p></td></tr></tbody></table>`;
  }
  if (ctx.family === "manual") {
    return `<article class="manual-page manual-document">${renderManualHeader(ctx, model.title, model.subtitle || "Ryan Prendergast essay", [["Date", meta], ["Path", escapeHtml(model.backHref)]])}${renderManualToc([["#document", "Document"]])}${renderManualRule()}<section id="document" class="manual-entry-body"><h2>Document</h2>${model.contentHtml}</section><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p></article>`;
  }
  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Box Score", meta)}<h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="scoreboard-state">${escapeHtml(model.subtitle)}</p>` : ""}${renderScoreboardTable(["Field", "Value"], [["Title", escapeHtml(model.title)], ["Date", meta], ["Back", `<a href="${model.backHref}">${escapeHtml(model.backLabel)}</a>`]])}<article class="scoreboard-article">${model.contentHtml}</article></section>`;
  }
  if (ctx.family === "art-index") {
    return `<article class="art-index"><p>LAT: 40.7128 LNG: -74.0060</p><h2>𓁹 ${escapeHtml(model.title)}</h2><p>${meta}</p>${model.contentHtml}</article>`;
  }
  if (ctx.family === "archive-index") {
    return `<article class="archive-index archive-index-article">${renderArchiveIndexHeader(ctx, model.title, model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : `<p>${meta}</p>`, meta)}${renderArchiveIndexFilters("Authors")}<div class="archive-index-record-meta"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a><span>Ryan Prendergast</span><time>${escapeHtml(model.date)}</time></div><div class="blog-post-content archive-index-copy">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "no-css") {
    return `<article><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2><p>${meta}</p>${model.contentHtml}</article>`;
  }
  if (ctx.family === "research-sidenotes") {
    return `<article class="research-page"><h2>${escapeHtml(model.title)}</h2><p>${meta}</p><aside>${model.subtitle ? escapeHtml(model.subtitle) : "Ryan Prendergast essay"}</aside>${model.contentHtml}</article>`;
  }
  if (ctx.family === "wordmark-studio") {
    return `<article class="wordmark-studio wordmark-article">${renderWordmarkNav(ctx)}<a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header class="wordmark-page-header"><p>${meta}</p><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<span>${escapeHtml(model.subtitle)}</span>` : ""}</header><div class="blog-post-content">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "studio-index") {
    return `<article class="studio-index studio-index-article">${renderStudioIndexHeader(ctx, model.subtitle ? escapeHtml(model.subtitle) : meta, "Studies")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Essays", "Notes", "Archive"])}<div class="studio-index-content"><a class="studio-index-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header class="studio-index-article-head"><h2>${escapeHtml(model.title)}</h2><p>${meta}</p></header><div class="blog-post-content studio-index-copy">${model.contentHtml}</div></div></div></article>`;
  }
  if (ctx.family === "builder-notes") {
    return `<article class="builder-notes builder-notes-article">${renderBuilderNotesNav(ctx)}<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><header><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p>${meta}</p></header><div class="blog-post-content">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "art-library") {
    return `<article class="art-library art-library-record">${renderArtLibraryHeader(ctx, "Record", `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`)}${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], [[escapeHtml(model.title), "Ryan Prendergast", meta, "Essay"]])}<div class="blog-post-content">${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "publishing") {
    return `<article class="publishing-article"><a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="article-meta">${meta}</p></header><div class="article-body">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "cargo-cv") {
    return renderCargoCvPage(ctx, "Writing", `<article class="cargo-cv-post"><a class="cargo-cv-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="entry-meta">${meta}</p><div class="blog-post-content">${model.contentHtml}</div></article>`);
  }
  if (ctx.family === "artist-ledger") {
    return `<article class="artist-ledger artist-ledger-page">${renderArtistLedgerHeader(ctx)}<a class="artist-ledger-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header class="artist-ledger-article-head"><time>${escapeHtml(model.date)}</time><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}</header><div class="blog-post-content artist-ledger-copy">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<article class="terminal-output"><p class="prompt">$ man ${escapeHtml(slugify(model.title))}</p><h2>${escapeHtml(model.title)}</h2><p class="terminal-comment"># ${meta}</p><div class="article-body">${model.contentHtml}</div><a class="terminal-line" href="${model.backHref}">cd ..</a></article>`;
  }
  if (ctx.family === "wiki") {
    return `<article class="wiki-article"><h2>${escapeHtml(model.title)}</h2><p class="wiki-meta">${meta}</p><aside class="wiki-infobox">${model.subtitle ? escapeHtml(model.subtitle) : "Personal essay"}</aside><div class="article-body">${model.contentHtml}</div></article>`;
  }
  return `<article class="theme-post"><a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="entry-meta">${meta}</p><div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function renderArchives(model: ArchiveModel, ctx: RenderContext): string {
  if (ctx.family === "spartan" || ctx.family === "no-css") {
    return `<h2>Archives</h2>${model.months.map((month) => `<h3>${escapeHtml(month.label)}</h3><ul>${month.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a></li>`).join("")}</ul>`).join("")}`;
  }
  if (ctx.family === "manual") {
    return `<article class="manual-page">${renderManualHeader(ctx, "Archive Tree", "", [["Entries", String(model.totalPosts)], ["Months", String(model.months.length)]])}${renderManualToc(model.months.map((month) => [`#${month.key}`, month.label]))}${renderManualRule()}<pre>${model.months.map((month) => `${month.key}/\\n${month.posts.map((post) => `  ${post.slug}.html`).join("\\n")}`).join("\\n")}</pre>${model.months.map((month) => `<section id="${month.key}" class="manual-year"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post, index) => renderManualPostSummary(post, index)).join("")}</section>`).join("")}</article>`;
  }
  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Archives", `${model.totalPosts} archived posts`)}<h2>Archive Standings</h2><nav class="scoreboard-subnav"><a href="/archives">Schedule</a><a href="/blog">Standings</a><a href="/rss.xml">Teams</a></nav>${renderScoreboardTable(["Month", "Posts", "Entries"], model.months.map((month) => [escapeHtml(month.label), String(month.posts.length), month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" ")]))}</section>`;
  }
  if (ctx.family === "archive-index") {
    const monthCounts = new Map(model.months.map((month) => [month.label, month.posts.length]));
    return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Archive", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`, `${model.totalPosts} records`)}${renderArchiveIndexFilters("All")}<section class="archive-index-directory"><div><h2>Months</h2>${renderArchiveIndexNames(monthCounts, (label) => `#${slugify(label)}`)}</div><div><h2>Records</h2>${model.months.map((month) => `<section id="${slugify(month.label)}" class="archive-index-month"><h3>${escapeHtml(month.label)}</h3><div class="archive-index-list">${month.posts.map((post) => renderArchiveIndexRow(post.title, post.href, month.label, post.date, post.readTime || "")).join("")}</div></section>`).join("")}</div></section></section>`;
  }
  if (ctx.family === "art-index") {
    return `<section class="art-index"><h2>CHRONOLOGY</h2>${model.months.map((month) => `<div class="art-row"><span>${escapeHtml(month.key)}</span><strong>${escapeHtml(month.label)}</strong><em>${month.posts.length} works</em></div>`).join("")}</section>`;
  }
  if (ctx.family === "research-sidenotes") {
    return `<article class="research-page"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a><span class="sidenote">${escapeHtml(month.key)}</span></p>`).join("")}</section>`).join("")}</article>`;
  }
  if (ctx.family === "wordmark-studio") {
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Archive</p><h2>Chronology</h2><span>${model.totalPosts} entries across ${model.months.length} months</span></header><div class="wordmark-archive">${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("")}</section>`).join("")}</div></section>`;
  }
  if (ctx.family === "builder-notes") {
    return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>archive</h1>${model.months.map((month) => `<section class="builder-notes-section"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderBuilderNotesPostLine(post)).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "studio-index") {
    const months = model.months.map((month, index) => renderStudioIndexTextRow(month.label, `#${slugify(month.label)}`, `${month.posts.length} posts`, month.key, index)).join("");
    const records = model.months.map((month) => `<section id="${slugify(month.label)}" class="studio-index-month"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.readTime || "Post", index)).join("")}</section>`).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, `${model.totalPosts} entries across ${model.months.length} months.`, "Index")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Months", "Posts", "Chronology"])}<div class="studio-index-content"><div class="studio-index-list">${months}</div>${records}</div></div></section>`;
  }
  if (["research-tools", "artist-ledger", "garden-notebook"].includes(ctx.family)) {
    if (ctx.family === "artist-ledger") {
      return `<section class="artist-ledger">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>Archive</h2>${model.months.map((month) => `<section class="artist-ledger-month"><h3>${escapeHtml(month.label)}</h3><div class="artist-ledger-list">${month.posts.map((post) => renderArtistLedgerRow(post.date || month.key, post.href, post.title, month.label)).join("")}</div></section>`).join("")}</section></section>`;
    }
    return `<section class="${ctx.family}"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library">${renderArtLibraryHeader(ctx, "Archive", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`)}${renderArtLibraryCategories(model.months.slice(0, 8).map((month) => month.label))}${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], model.months.flatMap((month) => month.posts.map((post) => [`<a href="${post.href}">${escapeHtml(post.title)}</a>`, escapeHtml(month.label), escapeHtml(post.date), "Archive"])))}</section>`;
  }
  if (ctx.family === "cargo-cv") {
    const items = model.months.map((month) => `<a href="#${slugify(month.label)}">${escapeHtml(month.label)}</a> <span>${month.posts.length} entries</span>`);
    const months = model.months.map((month) => `<section id="${slugify(month.label)}" class="cargo-cv-month"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("");
    return renderCargoCvPage(ctx, "Archive", `<h2>Lifeworks:</h2>${renderCargoCvList(items)}<div class="cargo-cv-small-list">${months}</div>`);
  }
  if (["fragment-journal", "writer-ledger", "experimental-loop", "briefing", "taste-directory", "bookmaker-card", "uncertainty"].includes(ctx.family)) {
    return `<section class="${ctx.family}"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return `<section class="ucoz-archive"><h2>Архив файлов</h2>${model.months.map((month) => `<div class="ucoz-file"><b>${escapeHtml(month.label)}</b><br>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("<br>")}</div>`).join("")}</section>`;
  }
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture", "room-wall", "book-microsite", "download-index", "visual-index", "html-bulletin", "consumption-digest", "data-portfolio", "internet-diagram", "vernacular-essay", "cheap-manifesto", "poetic-article", "feral-essay", "performance-club", "recurse-joy", "forecast-report", "forum-frontpage", "essay-blogroll", "now-directory", "conversational-minimal", "founder-index", "grant-page"].includes(ctx.family)) {
    return `<section class="${ctx.family}"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "desktop") {
    return `<section class="file-grid">${model.months.map((month) => `<article class="file-folder"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("")}</article>`).join("")}</section>`;
  }
  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<section class="terminal-output"><p class="prompt">$ tree archives</p>${model.months.map((month) => `<div class="terminal-dir">${escapeHtml(month.key)}/</div>${month.posts.map((post) => `<a class="terminal-line" href="${post.href}">${escapeHtml(post.title)}</a>`).join("")}`).join("")}</section>`;
  }
  return `<section class="theme-archives">${model.months.map((month) => `<section class="archive-section"><h2>${escapeHtml(month.label)} <span>${month.posts.length}</span></h2>${month.posts.map((post, index) => renderPostSummary(post, index, ctx)).join("")}</section>`).join("")}</section>`;
}

function renderGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const entries = model.entries.length
    ? model.entries.map((entry) => `<article class="guestbook-entry"><time>${escapeHtml(entry.date)}</time><p>${escapeHtml(entry.message)}</p><strong>${escapeHtml(entry.name)}</strong></article>`).join("")
    : `<p class="text-muted">No entries yet. Be the first to sign the guestbook!</p>`;
  const button = model.canSign ? `<button onclick="showGuestbookModal()">Sign Guestbook</button>` : "";
  if (ctx.family === "manual") {
    const manualEntries = model.entries.length
      ? model.entries.map((entry, index) => `<article class="manual-entry"><h3 id="entry-${index + 1}">${escapeHtml(entry.name)}</h3><table><tbody><tr><th>Date</th><td>${escapeHtml(entry.date)}</td></tr><tr><th>Name</th><td>${escapeHtml(entry.name)}</td></tr></tbody></table><p>${escapeHtml(entry.message)}</p></article>`).join("")
      : `<p class="text-muted">No entries yet. Be the first to sign the guestbook!</p>`;
    return `<article class="manual-page">${renderManualHeader(ctx, "Guestbook", "", [["Entries", String(model.entries.length)]])}${renderManualToc([["#entries", "Entries"], ["#sign", "Sign"]])}${renderManualRule()}<section id="entries"><h2>Entries</h2>${manualEntries}</section><section id="sign" class="manual-form"><h2>Sign</h2>${button}</section></article>${guestbookModalScript()}`;
  }
  if (ctx.family === "wordmark-studio") {
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Inquiries</p><h2>Guestbook</h2></header><section class="guestbook-header">${button}</section><div class="wordmark-entries">${entries}</div></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library">${renderArtLibraryHeader(ctx, "Guestbook", "")}<section class="guestbook-header">${button}</section>${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], model.entries.map((entry) => [escapeHtml(entry.message), escapeHtml(entry.name), escapeHtml(entry.date), "Guestbook"]))}</section>${guestbookModalScript()}`;
  }
  if (ctx.family === "studio-index") {
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, `<p>${model.entries.length} entries</p>`, "Information")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Guestbook", "Messages"])}<div class="studio-index-content"><section class="guestbook-header">${button}</section><div class="studio-index-list">${entries}</div></div></div></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "cargo-cv") {
    const cargoEntries = model.entries.length
      ? model.entries.map((entry) => `<span><strong>${escapeHtml(entry.name)}</strong> ${escapeHtml(entry.message)} <span>${escapeHtml(entry.date)}</span></span>`)
      : [`<span>No entries yet. Be the first to sign the guestbook!</span>`];
    return `${renderCargoCvPage(ctx, "Guestbook", `<h2>Lifeworks:</h2>${renderCargoCvList(cargoEntries)}<section class="guestbook-header">${button}</section>`)}${guestbookModalScript()}`;
  }
  return `<section class="guestbook-header"><h2>Guestbook</h2>${button}</section>${entries}${guestbookModalScript()}`;
}

function renderThemes(model: ThemesModel, ctx: RenderContext): string {
  if (ctx.family === "manual") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    return `<article class="manual-page">${renderManualHeader(ctx, "Themes", "", [["Themes", String(model.themes.length)], ["Built", String(builtCount)]])}${renderManualToc([["#select", "Current Theme"], ["#catalog", "Catalog"]])}${renderManualRule()}<section id="select" class="manual-form"><h2>Current Theme</h2><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></section><section id="catalog"><h2>Catalog</h2><table><thead><tr><th>Theme</th><th>Vibe</th><th>Status</th></tr></thead><tbody>${model.themes.map((theme) => `<tr><td><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a></td><td>${escapeHtml(theme.vibe)}</td><td>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)}</td></tr>`).join("")}</tbody></table></section></article>`;
  }
  if (ctx.family === "wordmark-studio") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Themes</p><h2>Theme Grid</h2><span>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</span></header><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}</section>`;
  }
  if (ctx.family === "catalog") {
    return `<section class="catalog-table theme-catalog"><header><span>Theme</span><span>Category</span><span>Status</span></header>${model.themes.map((theme) => `<a href="?theme=${theme.slug}"><span>${escapeHtml(theme.name)}</span><span>${escapeHtml(theme.category)}</span><span>${theme.slug === ctx.theme.slug ? "active" : "ready"}</span></a>`).join("")}</section>`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library">${renderArtLibraryHeader(ctx, "Themes", `<p>${model.themes.length} layouts from Ryan's reference list.</p>`)}<div class="themes-console art-library-search"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div></div>${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], model.themes.map((theme) => [`<a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a>`, escapeHtml(theme.vibe), theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status), escapeHtml(theme.category)]))}</section>`;
  }
  if (ctx.family === "studio-index") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme, index) => renderStudioIndexTextRow(theme.name, `?theme=${theme.slug}`, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, index)).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, `<p>${model.themes.length} layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>`, "Information")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Built", "Planned", "Reference"])}<div class="studio-index-content"><div class="themes-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="studio-index-list">${rows}</div></div></div></section>`;
  }
  if (ctx.family === "cargo-cv") {
    const items = model.themes.map((theme) => `<a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <span>${escapeHtml(theme.status)}</span>`);
    return renderCargoCvPage(ctx, "Themes", `<h2>Lifeworks:</h2><div class="themes-console cargo-cv-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>${renderCargoCvList(items)}`);
  }
  const builtCount = model.themes.filter((theme) => theme.status === "built").length;
  return `<section class="themes-hero"><div><p class="themes-eyebrow">Supplied Site Mimics</p><h2>${model.themes.length} direct layouts from Ryan's reference list.</h2><p>The content stays stable while each theme mimics one supplied target site. ${builtCount} themes are currently built with dedicated layout treatment; planned themes remain visible as implementation targets.</p></div><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div></section><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}`;
}

function renderArchiveIndexHeader(ctx: RenderContext, title: string, detailHtml: string, countLabel: string): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "All"],
    ["/blog", "Authors"],
    ["/photos", "Photographers"],
    ["/archives", "Stylists"],
    ["/guestbook", "Talent"],
    ["/contact", "Contact"],
    ["/rss.xml", "RSS"],
  ] as Array<[string, string]>;
  return `<header class="archive-index-header"><div class="archive-index-topline"><a class="archive-index-brand" href="/">Ryan Prendergast</a><span>${escapeHtml(countLabel)}</span></div><nav class="archive-index-nav" aria-label="Core site areas">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}<a class="${active("/themes")}" href="/themes">Themes</a></nav><div class="archive-index-title"><h1>${escapeHtml(title)}</h1><div>${detailHtml}</div></div></header>`;
}

function renderArchiveIndexFilters(activeLabel: string): string {
  const filters = ["All", "Authors", "Photographers", "Stylists", "Talent"];
  return `<nav class="archive-index-filters" aria-label="Archive filters">${filters.map((filter) => `<a class="${filter === activeLabel ? "is-active" : ""}" href="/archives">${filter}</a>`).join("")}</nav>`;
}

function renderArchiveIndexNames(counts: Map<string, number>, hrefFor: (label: string) => string = () => "/"): string {
  const entries = Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b));
  return `<div class="archive-index-names">${entries.map(([label, count]) => `<a href="${hrefFor(label)}"><span>${escapeHtml(label)}</span><em>${count}</em></a>`).join("")}</div>`;
}

function renderArchiveIndexRow(title: string, href: string, source: string, date: string, detail: string): string {
  return `<a class="archive-index-row" href="${href}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(source)}</span><time>${escapeHtml(date)}</time>${detail ? `<small>${escapeHtml(detail)}</small>` : ""}</a>`;
}

function renderArchiveIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="archive-index archive-index-article">${renderArchiveIndexHeader(ctx, model.heading, `<p>${escapeHtml(ctx.currentPage || "/")}</p>`, "page record")}${renderArchiveIndexFilters("All")}<div class="archive-index-copy">${model.contentHtml}</div></article>`;
}

function countBy(values: string[]): Map<string, number> {
  return values.reduce((counts, value) => {
    const key = value || "Unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map<string, number>());
}

function renderWordmarkNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  return `<header class="wordmark-top"><nav class="wordmark-primary" aria-label="Primary"><a class="${active("/")}" href="/">Work</a><a class="${active("/blog")}" href="/blog">Grid</a><a class="${active("/contact")}" href="/contact">Inquiries</a></nav><nav class="wordmark-secondary" aria-label="Core site areas">${ctx.navItems.map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`).join("")}<a class="${active("/themes")}" href="/themes">Themes</a></nav></header>`;
}

function renderResearchToolsHeader(ctx: RenderContext, introHtml = ""): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  return `<header class="research-tools-header"><a class="research-tools-mark" href="/" aria-label="Ryan Prendergast">rp</a><nav class="research-tools-contact" aria-label="Contact and feeds"><a class="${active("/contact")}" href="/contact">@ Contact</a><a href="/rss.xml">RSS</a></nav><div class="research-tools-copy">${introHtml}</div><nav class="research-tools-nav" aria-label="Core site areas">${ctx.navItems.map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`).join("")}<a class="${active("/themes")}" href="/themes">Themes</a></nav></header>`;
}

function renderBuilderNotesNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  return `<nav class="builder-notes-nav" aria-label="Primary"><a class="${active("/")}" href="/">Ryan Prendergast</a><a class="${active("/contact")}" href="/contact">about</a><a class="${active("/blog")}" href="/blog">writing</a><a class="${active("/")}" href="/">links</a><a class="${active("/photos")}" href="/photos">photos</a><a class="${active("/archives")}" href="/archives">archive</a><a class="${active("/guestbook")}" href="/guestbook">guestbook</a><a href="/rss.xml">rss</a></nav>`;
}

function renderArtLibraryHeader(ctx: RenderContext, section: string, detailHtml: string): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "Linkblog"],
    ["/blog", "Blog"],
    ["/photos", "Photos"],
    ["/archives", "Archives"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<header class="art-library-header"><a class="art-library-brand" href="/">Ryan Prendergast</a><nav class="art-library-primary" aria-label="Core site areas">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}<a href="/rss.xml">RSS</a></nav><nav class="art-library-hours" aria-label="Utility"><a class="${active("/contact")}" href="/contact">Contact</a><a href="/rss.xml">RSS</a><a class="${active("/themes")}" href="/themes">Themes</a></nav><div class="art-library-section"><h2>${escapeHtml(section)}</h2>${detailHtml}</div></header>`;
}

function renderArtLibraryCategories(categories: string[]): string {
  const unique = Array.from(new Set(categories.filter(Boolean)));
  return `<div class="art-library-categories" aria-label="Catalog categories">${unique.map((category, index) => `<span class="${index === 0 ? "is-active" : ""}">${escapeHtml(category)}</span>`).join("")}</div>`;
}

function renderArtLibraryTable(headers: string[], rows: string[][]): string {
  const body = rows.length
    ? rows.map((row) => `<tr>${row.map((cell) => `<td><span class="bordered">${cell}</span></td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${headers.length}"><span class="bordered">No Records Found</span></td></tr>`;
  return `<div class="art-library-table-wrap"><table class="art-library-table"><thead><tr>${headers.map((header) => `<th><span class="bordered">${escapeHtml(header)}</span></th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderBuilderNotesPostLine(post: PostSummaryModel): string {
  return `<p class="builder-note-line"><a href="${post.href}">${escapeHtml(post.title)}</a>${post.readTime ? ` <small>${escapeHtml(post.readTime)}</small>` : ""}<br><small>${escapeHtml(post.date)}</small></p>`;
}

function renderBuilderNotesLinkLine(link: LinkEntryModel): string {
  return `<article class="builder-note-line"><p><a href="${link.url}">${escapeHtml(link.title)}</a> <small>${escapeHtml(link.domain)} · ${escapeHtml(link.date)}</small></p><div>${link.contentHtml}</div></article>`;
}

function renderWordmarkHero(introHtml: string): string {
  return `<header class="wordmark-hero"><div class="wordmark-hero-copy"><h1>Ryan Prendergast</h1><div>${introHtml}</div><div aria-hidden="true">${introHtml}</div></div></header>`;
}

function renderWordmarkGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="wordmark-studio wordmark-article">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Inquiries</p><h2>${escapeHtml(model.heading)}</h2></header><div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function renderBuilderNotesGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="builder-notes builder-notes-article">${renderBuilderNotesNav(ctx)}<header><h1>${escapeHtml(model.heading)}</h1></header><div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function renderManualGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="manual-page manual-document">${renderManualHeader(ctx, model.heading, "")}${renderManualToc([["#document", "Document"]])}${renderManualRule()}<section id="document" class="manual-entry-body"><h2>Document</h2>${model.contentHtml}</section></article>`;
}

function renderArtLibraryGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="art-library art-library-record">${renderArtLibraryHeader(ctx, model.heading, "")}${renderArtLibraryTable(["Title", "Name", "Publisher", "Category"], [[escapeHtml(model.heading), "Ryan Prendergast", escapeHtml(ctx.currentPage || "/"), "Page"]])}<div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function renderStudioIndexHeader(ctx: RenderContext, introHtml: string, activeTab: string): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const tabs = [
    ["/", "Index"],
    ["/blog", "Studies"],
    ["/contact", "Information"],
    ["/photos", "Objects"],
  ] as Array<[string, string]>;
  return `<header class="studio-index-header"><div class="studio-index-brand"><a href="/">Ryan Prendergast</a><div>${introHtml}</div></div><div class="studio-index-mode">Studio</div><nav class="studio-index-tabs" aria-label="Core site areas">${tabs.map(([href, label]) => `<a class="${active(href)} ${label === activeTab ? "is-current" : ""}" href="${href}">${label === activeTab ? `[ ${label} ]` : label}</a>`).join("")}<a class="${active("/archives")}" href="/archives">Archive</a><a class="${active("/guestbook")}" href="/guestbook">Guestbook</a><a href="/rss.xml">RSS</a><a class="${active("/themes")}" href="/themes">Themes</a></nav></header>`;
}

function renderStudioIndexFilters(filters: string[]): string {
  return `<aside class="studio-index-filters"><span>Type</span>${filters.map((filter, index) => `<a class="${index === 0 ? "is-active" : ""}" href="#">${index === 0 ? `[ ${escapeHtml(filter)} ]` : escapeHtml(filter)}</a>`).join("")}</aside>`;
}

function renderStudioIndexProject(title: string, href: string, source: string, date: string, image: string | null, index: number): string {
  const media = image
    ? `<img src="${image}" alt="" loading="lazy">`
    : `<div class="studio-index-placeholder" aria-hidden="true"><span>${String(index + 1).padStart(2, "0")}</span></div>`;
  return `<article class="studio-index-project"><a href="${href}">${media}<span>${escapeHtml(title)}</span></a><p>${escapeHtml(source)}</p><time>${escapeHtml(date)}</time></article>`;
}

function renderStudioIndexTextRow(title: string, href: string, date: string, type: string, index: number): string {
  return `<a class="studio-index-row" href="${href}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(type)}</small><time>${escapeHtml(date)}</time></a>`;
}

function renderStudioIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="studio-index studio-index-article">${renderStudioIndexHeader(ctx, `<p>${escapeHtml(ctx.currentPage || "/")}</p>`, "Information")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Information", "Contact", "Pages"])}<div class="studio-index-content"><header class="studio-index-article-head"><h2>${escapeHtml(model.heading)}</h2></header><div class="blog-post-content studio-index-copy">${model.contentHtml}</div></div></div></article>`;
}

function renderCargoCvPage(ctx: RenderContext, section: string, contentHtml: string): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = ctx.navItems
    .map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("");
  return `<section class="cargo-cv"><aside><a class="cargo-cv-title" href="/">Ryan Prendergast</a><a class="${active("/")}" href="/">Info</a><span>${escapeHtml(section)}</span><nav aria-label="Core site areas">${nav}<a class="${active("/themes")}" href="/themes">Themes</a></nav></aside><main>${contentHtml}</main></section>`;
}

function renderCargoCvList(items: string[]): string {
  return `<ol class="cargo-cv-lifeworks">${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;
}

function renderCargoCvGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderCargoCvPage(ctx, model.heading, `<h2>${escapeHtml(model.heading)}:</h2><div class="cargo-cv-profile">${model.contentHtml}</div>`);
}

function renderArtistLedgerHeader(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const primary = [
    ["/contact", "About"],
    ["/blog", "News"],
    ["/", "Work"],
    ["/archives", "Archive"],
  ] as Array<[string, string]>;
  const utility = [
    ["/photos", "Photos"],
    ["/guestbook", "Guestbook"],
    ["/rss.xml", "RSS"],
    ["/themes", "Themes"],
  ] as Array<[string, string]>;
  return `<header class="artist-ledger-header"><a class="artist-ledger-name" href="/">Ryan<br>Prendergast</a><nav class="artist-ledger-primary" aria-label="Primary">${primary.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}</nav><nav class="artist-ledger-utility" aria-label="Core site areas">${utility.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}</nav></header>`;
}

function renderArtistLedgerRow(date: string, href: string, title: string, type: string, detail = ""): string {
  const detailText = detail ? `<p>${escapeHtml(detail)}</p>` : "";
  return `<article class="artist-ledger-row"><time>${escapeHtml(date)}</time><div><a href="${href}">${escapeHtml(title)}</a>${detailText}</div><span>${escapeHtml(type)}</span></article>`;
}

function renderArtistLedgerGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="artist-ledger artist-ledger-page">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>${escapeHtml(model.heading)}</h2><div class="artist-ledger-copy">${model.contentHtml}</div></section></article>`;
}

function renderLinkEntry(link: LinkEntryModel, index: number, ctx: RenderContext): string {
  const image = link.image ? `<img src="${link.image}" alt="" loading="lazy">` : "";
  if (ctx.family === "catalog") return `<a class="catalog-row" href="${link.url}"><span>${index + 1}</span><strong>${escapeHtml(link.title)}</strong><span>${escapeHtml(link.domain)}</span><time>${escapeHtml(link.date)}</time></a>`;
  if (ctx.family === "cards" || ctx.family === "maximal" || ctx.family === "grid") return `<article class="theme-card-entry"><a href="${link.url}">${image}<h3>${escapeHtml(link.title)}</h3></a><p>${escapeHtml(link.domain)} / ${escapeHtml(link.date)}</p><div>${link.contentHtml}</div></article>`;
  if (ctx.family === "terminal" || ctx.family === "editor") return `<div class="terminal-line"><a href="${link.url}">${escapeHtml(link.title)}</a> -- ${escapeHtml(link.domain)} -- ${escapeHtml(link.date)}</div>`;
  return `<article class="linklog-entry"><div class="linklog-header"><div class="linklog-title"><a href="${link.url}">${escapeHtml(link.title)}</a></div><span class="linklog-domain">${escapeHtml(link.domain)}</span><span class="linklog-meta">${escapeHtml(link.date)}</span></div>${image ? `<div class="linklog-image">${image}</div>` : ""}<div class="linklog-commentary">${link.contentHtml}</div></article>`;
}

function renderPostSummary(post: PostSummaryModel, index: number, ctx: RenderContext): string {
  if (ctx.family === "hn") return `<div class="hn-item"><span>${index + 1}.</span><a href="${post.href}">${escapeHtml(post.title)}</a><small>${escapeHtml(post.date)}</small></div>`;
  if (ctx.family === "catalog") return `<a class="catalog-row" href="${post.href}"><span>${index + 1}</span><strong>${escapeHtml(post.title)}</strong><time>${escapeHtml(post.date)}</time></a>`;
  if (ctx.family === "cards" || ctx.family === "grid" || ctx.family === "maximal") return `<article class="theme-card-entry"><a href="${post.href}"><h3>${escapeHtml(post.title)}</h3></a><p>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</p>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</article>`;
  return `<div class="blog-post-item"><a href="${post.href}" class="blog-title">${escapeHtml(post.title)}</a><div class="blog-date">${escapeHtml(post.date)}</div></div>`;
}

function guestbookModalScript(): string {
  return `<div id="guestbookModal" class="modal hidden"><div class="modal-content"><div class="modal-header"><h2>Sign Guestbook</h2><button onclick="hideGuestbookModal()" class="modal-close">&times;</button></div><form id="guestbookForm"><div class="form-group"><label for="name" class="form-label">Name *</label><input id="name" name="name" type="text" required maxlength="50" class="form-input"></div><div class="form-group"><label for="message" class="form-label">Message *</label><textarea id="message" name="message" required maxlength="500" rows="4" class="form-textarea"></textarea></div><div class="form-actions"><button type="button" onclick="hideGuestbookModal()">Cancel</button><button type="submit">Submit</button></div></form></div></div><script>function showGuestbookModal(){document.getElementById('guestbookModal').classList.remove('hidden')}function hideGuestbookModal(){document.getElementById('guestbookModal').classList.add('hidden')}document.addEventListener('keydown',function(e){if(e.key==='Escape')hideGuestbookModal()});document.getElementById('guestbookForm').addEventListener('submit',async(e)=>{e.preventDefault();const name=document.getElementById('name').value;const message=document.getElementById('message').value;try{const response=await fetch('/api/guestbook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,message})});if(response.ok){window.location.reload()}else{alert('Failed to submit entry. Please try again.')}}catch(error){alert('Failed to submit entry. Please try again.')}});</script>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
