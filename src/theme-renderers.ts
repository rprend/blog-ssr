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
  if (ctx.family === "wordmark-studio") return renderWordmarkGeneric(model as GenericPageModel, ctx);
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

function renderHome(model: HomeModel, ctx: RenderContext): string {
  const links = model.links.map((link, index) => renderLinkEntry(link, index, ctx)).join("");
  const posts = model.recentPosts.map((post, index) => renderPostSummary(post, index, ctx)).join("");
  const homeHeader = renderCanonicalHomeHeader(model);

  if (ctx.family === "spartan") {
    return `<table class="pg-home"><tbody><tr><td>${homeHeader}<p><b>New:</b> ${model.recentPosts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" | ")}</p><hr><p>${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("<br>")}</p></td></tr></tbody></table>`;
  }

  if (ctx.family === "manual") {
    return `<article class="manual-page">${homeHeader}<table><tbody><tr><th>Version</th><td>linklog</td></tr><tr><th>Author</th><td>Ryan Prendergast</td></tr></tbody></table><h3>Contents</h3><ol><li><a href="#links">Links</a></li><li><a href="#essays">Recent Essays</a></li></ol><h3 id="links">Links</h3>${links}<h3 id="essays">Recent Essays</h3>${posts}</article>`;
  }

  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard"><div class="scorebar">${escapeHtml(model.links[0]?.date || "")}</div>${homeHeader}<div class="league-tabs">LINKS BLOG ARCHIVES</div><table><tbody>${model.links.map((link) => `<tr><td>${escapeHtml(link.date)}</td><td><a href="${link.url}">${escapeHtml(link.title)}</a></td><td>${escapeHtml(link.domain)}</td></tr>`).join("")}</tbody></table></section>`;
  }

  if (ctx.family === "archive-index") {
    return `<section class="archive-index">${homeHeader}<nav>All · Sources · Posts · Links</nav><div class="name-counts">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.domain)} <span>1</span></a>`).join("")}</div></section>`;
  }

  if (ctx.family === "scrapbook") {
    return `<section class="scrapbook">${homeHeader}<div class="scrap-list">${model.links.map((link) => `<article><span>🌀</span><a href="${link.url}">${escapeHtml(link.title)}</a><div>${link.contentHtml}</div></article>`).join("")}</div></section>`;
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
    return `<section class="builder-notes"><nav>about writing links</nav>${homeHeader}<h3>writing</h3>${posts}<h3>links</h3>${links}</section>`;
  }

  if (ctx.family === "research-tools") {
    return `<section class="research-tools">${homeHeader}<div class="tool-list">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${escapeHtml(link.domain)}</p></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "art-library") {
    return `<section class="art-library">${homeHeader}<table><thead><tr><th>Title</th><th>Name</th><th>Date</th></tr></thead><tbody>${model.links.map((link) => `<tr><td><a href="${link.url}">${escapeHtml(link.title)}</a></td><td>${escapeHtml(link.domain)}</td><td>${escapeHtml(link.date)}</td></tr>`).join("")}</tbody></table></section>`;
  }

  if (ctx.family === "studio-index") {
    return `<section class="studio-index">${homeHeader}<nav>Index Studies Information Objects All</nav><div class="studio-studies">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><span>${escapeHtml(link.domain)}</span></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "cargo-cv") {
    return `<section class="cargo-cv"><aside>Ryan Prendergast<br>Info</aside><main>${homeHeader}<h3>Selected links</h3>${links}</main></section>`;
  }

  if (ctx.family === "artist-ledger") {
    return `<section class="artist-ledger"><p class="latest">Latest: ${model.recentPosts[0] ? `<a href="${model.recentPosts[0].href}">${escapeHtml(model.recentPosts[0].title)}</a>` : "Ryan's linklog"}</p>${homeHeader}<nav>ABOUT NEWS WORK</nav><div class="ledger-list">${model.links.map((link) => `<p><time>${escapeHtml(link.date)}</time> <a href="${link.url}">${escapeHtml(link.title)}</a></p>`).join("")}</div></section>`;
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
    return `<article class="manual-page"><h2>Blog Index</h2><pre>find ./essays -type f</pre>${groups}</article>`;
  }
  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard"><h2>Blog League Schedule</h2><table><tbody>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<tr><td>${escapeHtml(post.date)}</td><td><a href="${post.href}">${escapeHtml(post.title)}</a></td><td>${escapeHtml(group.year)}</td></tr>`)).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "archive-index") {
    return `<section class="archive-index"><h2>all posts</h2><nav>All · Years · Titles · Dates</nav><div class="name-counts">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)} <span>${escapeHtml(group.year)}</span></a>`)).join("")}</div></section>`;
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
    return `<section class="${ctx.family}"><h2>Studies Index</h2><div class="work-grid">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}"><span>${escapeHtml(post.title)}</span><small>${escapeHtml(group.year)} · ${escapeHtml(post.date)}</small></a>`)).join("")}</div></section>`;
  }
  if (ctx.family === "builder-notes" || ctx.family === "garden-notebook") {
    return `<section class="${ctx.family}"><h2>writing</h2>${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p>`).join("")}`).join("")}</section>`;
  }
  if (ctx.family === "research-tools" || ctx.family === "artist-ledger") {
    return `<section class="${ctx.family}"><h2>${ctx.family === "artist-ledger" ? "NEWS" : "Publications"}</h2><div class="ledger-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><time>${escapeHtml(post.date)}</time> <a href="${post.href}">${escapeHtml(post.title)}</a></p>`)).join("")}</div></section>`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library"><table><thead><tr><th>Title</th><th>Year</th><th>Date</th></tr></thead><tbody>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<tr><td><a href="${post.href}">${escapeHtml(post.title)}</a></td><td>${escapeHtml(group.year)}</td><td>${escapeHtml(post.date)}</td></tr>`)).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "cargo-cv") {
    return `<section class="cargo-cv"><aside>Writing</aside><main>${model.postsByYear.map((group) => `<h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => `<p>${index + 1} <a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}`).join("")}</main></section>`;
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
    return `<article class="manual-page"><h2>${escapeHtml(model.title)}</h2><table><tbody><tr><th>Date</th><td>${meta}</td></tr><tr><th>Path</th><td>${escapeHtml(model.backHref)}</td></tr></tbody></table><h3>Document</h3>${model.contentHtml}</article>`;
  }
  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard"><h2>Box Score</h2><table><tbody><tr><td>Title</td><td>${escapeHtml(model.title)}</td></tr><tr><td>Date</td><td>${meta}</td></tr></tbody></table><article>${model.contentHtml}</article></section>`;
  }
  if (ctx.family === "art-index") {
    return `<article class="art-index"><p>LAT: 40.7128 LNG: -74.0060</p><h2>𓁹 ${escapeHtml(model.title)}</h2><p>${meta}</p>${model.contentHtml}</article>`;
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
  if (ctx.family === "publishing") {
    return `<article class="publishing-article"><a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="article-meta">${meta}</p></header><div class="article-body">${model.contentHtml}</div></article>`;
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
    return `<article class="manual-page"><h2>Archive Tree</h2><pre>${model.months.map((month) => `${month.key}/\\n${month.posts.map((post) => `  ${post.slug}.html`).join("\\n")}`).join("\\n")}</pre>${model.months.map((month) => `<h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}`).join("")}</article>`;
  }
  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard"><h2>Archive Standings</h2><table><tbody>${model.months.map((month) => `<tr><td>${escapeHtml(month.label)}</td><td>${month.posts.length}</td><td>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" · ")}</td></tr>`).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "archive-index") {
    return `<section class="archive-index"><h2>every post ever archived</h2><nav>All · Months · Titles</nav><div class="name-counts">${model.months.map((month) => `<a href="#${month.key}">${escapeHtml(month.label)} <span>${month.posts.length}</span></a>`).join("")}</div>${model.months.map((month) => `<section id="${month.key}"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
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
  if (["studio-index", "research-tools", "artist-ledger", "builder-notes", "garden-notebook"].includes(ctx.family)) {
    return `<section class="${ctx.family}"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "art-library") {
    return `<section class="art-library"><table><thead><tr><th>Month</th><th>Entries</th><th>Titles</th></tr></thead><tbody>${model.months.map((month) => `<tr><td>${escapeHtml(month.label)}</td><td>${month.posts.length}</td><td>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("<br>")}</td></tr>`).join("")}</tbody></table></section>`;
  }
  if (ctx.family === "cargo-cv") {
    return `<section class="cargo-cv"><aside>Archive</aside><main>${model.months.map((month, index) => `<p>${index + 1} ${escapeHtml(month.label)} — ${month.posts.length} entries</p>`).join("")}</main></section>`;
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
  if (ctx.family === "wordmark-studio") {
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Inquiries</p><h2>Guestbook</h2></header><section class="guestbook-header">${button}</section><div class="wordmark-entries">${entries}</div></section>${guestbookModalScript()}`;
  }
  return `<section class="guestbook-header"><h2>Guestbook</h2>${button}</section>${entries}${guestbookModalScript()}`;
}

function renderThemes(model: ThemesModel, ctx: RenderContext): string {
  if (ctx.family === "wordmark-studio") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Themes</p><h2>Theme Grid</h2><span>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</span></header><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}</section>`;
  }
  if (ctx.family === "catalog") {
    return `<section class="catalog-table theme-catalog"><header><span>Theme</span><span>Category</span><span>Status</span></header>${model.themes.map((theme) => `<a href="?theme=${theme.slug}"><span>${escapeHtml(theme.name)}</span><span>${escapeHtml(theme.category)}</span><span>${theme.slug === ctx.theme.slug ? "active" : "ready"}</span></a>`).join("")}</section>`;
  }
  const builtCount = model.themes.filter((theme) => theme.status === "built").length;
  return `<section class="themes-hero"><div><p class="themes-eyebrow">Supplied Site Mimics</p><h2>${model.themes.length} direct layouts from Ryan's reference list.</h2><p>The content stays stable while each theme mimics one supplied target site. ${builtCount} themes are currently built with dedicated layout treatment; planned themes remain visible as implementation targets.</p></div><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div></section><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}`;
}

function renderWordmarkNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  return `<header class="wordmark-top"><nav class="wordmark-primary" aria-label="Primary"><a class="${active("/")}" href="/">Work</a><a class="${active("/blog")}" href="/blog">Grid</a><a class="${active("/contact")}" href="/contact">Inquiries</a></nav><nav class="wordmark-secondary" aria-label="Core site areas">${ctx.navItems.map((item) => `<a class="${item.active ? "is-active" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`).join("")}<a class="${active("/themes")}" href="/themes">Themes</a></nav></header>`;
}

function renderWordmarkHero(introHtml: string): string {
  return `<header class="wordmark-hero"><div class="wordmark-hero-copy"><h1>Ryan Prendergast</h1><div>${introHtml}</div><div aria-hidden="true">${introHtml}</div></div></header>`;
}

function renderWordmarkGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="wordmark-studio wordmark-article">${renderWordmarkNav(ctx)}<header class="wordmark-page-header"><p>Inquiries</p><h2>${escapeHtml(model.heading)}</h2></header><div class="blog-post-content">${model.contentHtml}</div></article>`;
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
