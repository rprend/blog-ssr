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
  { href: "/themes", label: "Themes" },
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
  return getThemeBySlug(match ? decodeURIComponent(match[1]) : defaultThemeSlug);
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
    content,
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
<body>
  <header>
    <h1><a href="/">Ryan Prendergast</a></h1>
    <p>No CSS Club mimic of <a href="${ctx.theme.targetUrl}">${ctx.theme.targetUrl}</a></p>
    <nav>${ctx.navItems.map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join(" | ")}</nav>
    <hr>
  </header>
  <main>${content}</main>
  <hr>
  <footer><p><a href="/themes">Themes</a> | <a href="/rss.xml">RSS</a></p></footer>
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
    <header class="theme-shell-header">
      <div>
        <p class="theme-shell-kicker">${escapeHtml(options.theme.name)} / ${escapeHtml(ctx.family)}</p>
        <h1><a href="/">Ryan Prendergast</a></h1>
        ${ctx.pageSubtitle ? `<p>${escapeHtml(ctx.pageSubtitle)}</p>` : ""}
      </div>
      ${picker}
    </header>
    <nav class="theme-shell-nav">${navHtml}</nav>
    <main class="theme-shell-main">${content}</main>
    <footer class="theme-shell-footer">
      <span>Ryan Prendergast Worldwide</span>
      <a href="/colophon">Colophon</a>
      <a href="/themes">Themes</a>
      <a href="/rss.xml">RSS</a>
    </footer>
  </div>
  ${shellChrome.after}
  <script src="/theme-system.js" defer></script>
</body>
</html>`;
}

function renderShellChrome(ctx: RenderContext): { before: string; after: string } {
  if (ctx.family === "desktop") {
    return {
      before: `<div class="desktop-icons"><a href="/">Home</a><a href="/blog">Posts</a><a href="/themes">Themes</a></div>`,
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
  const options = siteThemes
    .map((candidate) => `<option value="${candidate.slug}"${candidate.slug === theme.slug ? " selected" : ""}>${escapeHtml(candidate.name)}</option>`)
    .join("");
  return `<div class="mini-theme-picker"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${options}</select><button type="button" data-theme-random>Random</button></div>`;
}

function renderHome(model: HomeModel, ctx: RenderContext): string {
  const links = model.links.map((link, index) => renderLinkEntry(link, index, ctx)).join("");
  const posts = model.recentPosts.map((post, index) => renderPostSummary(post, index, ctx)).join("");

  if (ctx.family === "spartan") {
    return `<table class="pg-home"><tbody><tr><td><h2>Ryan Prendergast</h2>${model.introHtml}<p><b>New:</b> ${model.recentPosts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" | ")}</p><hr><p>${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("<br>")}</p></td></tr></tbody></table>`;
  }

  if (ctx.family === "manual") {
    return `<article class="manual-page"><h2>Ryan Prendergast Manual</h2><table><tbody><tr><th>Version</th><td>linklog</td></tr><tr><th>Author</th><td>Ryan Prendergast</td></tr><tr><th>Target</th><td>${escapeHtml(ctx.theme.targetUrl)}</td></tr></tbody></table><h3>Contents</h3><ol><li><a href="#intro">Introduction</a></li><li><a href="#links">Links</a></li><li><a href="#essays">Recent Essays</a></li></ol><h3 id="intro">Introduction</h3>${model.introHtml}<h3 id="links">Links</h3>${links}<h3 id="essays">Recent Essays</h3>${posts}</article>`;
  }

  if (ctx.family === "scoreboard") {
    return `<section class="scoreboard"><div class="scorebar">Page loaded: ${new Date().toLocaleTimeString("en-US")} ET <span>Dark Mode</span> <span>Light Mode</span></div><h2>Ryan Prendergast Schedule</h2><div class="league-tabs">LINKS BLOG ARCHIVES THEMES</div><table><tbody>${model.links.map((link) => `<tr><td>${escapeHtml(link.date)}</td><td><a href="${link.url}">${escapeHtml(link.title)}</a></td><td>${escapeHtml(link.domain)}</td></tr>`).join("")}</tbody></table></section>`;
  }

  if (ctx.family === "archive-index") {
    return `<section class="archive-index"><h2>Ryan archive</h2><p>every link every essay every project ever mentioned</p><nav>All · Authors · Sources · Posts · Links</nav><div class="name-counts">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.domain)} <span>1</span></a>`).join("")}</div></section>`;
  }

  if (ctx.family === "scrapbook") {
    return `<section class="scrapbook"><h2>ようこそー Ryan's scrapbook ✨</h2>${model.introHtml}<p class="mail">if you want to get in touch, please use the contact page 📭</p><div class="scrap-list">${model.links.map((link) => `<article><span>🌀</span><a href="${link.url}">${escapeHtml(link.title)}</a><div>${link.contentHtml}</div></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "art-index") {
    return `<section class="art-index"><p>LAT: 40.7128 LNG: -74.0060</p><h2>RYAN PRENDERGAST</h2><p>selected work</p>${model.links.map((link, index) => `<div class="art-row"><span>${2026 - (index % 8)}</span><a href="${link.url}">𓁹 ${escapeHtml(link.title)}</a><em>${escapeHtml(link.domain)}</em></div>`).join("")}</section>`;
  }

  if (ctx.family === "research-sidenotes") {
    return `<article class="research-page"><h2>Essays and Links</h2><aside>Warning: JavaScript optional. Link annotations and sidenotes are simulated for Ryan's content.</aside>${model.introHtml}<h3>Annotated Links</h3>${model.links.map((link, index) => `<p><a href="${link.url}">${escapeHtml(link.title)}</a><label for="sn-${index}" class="sidenote-number"></label><span class="sidenote">${escapeHtml(link.domain)} · ${escapeHtml(link.date)}</span></p>`).join("")}<h3>Recent Essays</h3>${posts}</article>`;
  }

  if (ctx.family === "wordmark-studio") {
    return `<section class="wordmark-studio"><nav>Work Grid Inquiries</nav><h2>R Y A N&nbsp;&nbsp;P R E N D E R G A S T</h2><p class="studio-statement">${stripHtml(model.introHtml)}</p><div class="work-grid">${model.links.map((link) => `<a href="${link.url}"><span>${escapeHtml(link.title)}</span><small>${escapeHtml(link.domain)}</small></a>`).join("")}</div></section>`;
  }

  if (ctx.family === "builder-notes") {
    return `<section class="builder-notes"><nav>about friends writing</nav><h2>i'm ryan, and this is what i'm building.</h2>${model.introHtml}<h3>writing</h3>${posts}<h3>links i'm thinking about</h3>${links}</section>`;
  }

  if (ctx.family === "research-tools") {
    return `<section class="research-tools"><h2>tt</h2><p>software development and design for research, editorial, and publishing practices.</p>${model.introHtml}<div class="tool-list">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${escapeHtml(link.domain)}</p></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "art-library") {
    return `<section class="art-library"><header><strong>Midway Contemporary Art</strong><span>Library</span><span>11am-5pm</span></header><table><thead><tr><th>Title</th><th>Name</th><th>Date</th></tr></thead><tbody>${model.links.map((link) => `<tr><td><a href="${link.url}">${escapeHtml(link.title)}</a></td><td>${escapeHtml(link.domain)}</td><td>${escapeHtml(link.date)}</td></tr>`).join("")}</tbody></table></section>`;
  }

  if (ctx.family === "studio-index") {
    return `<section class="studio-index"><h2>LAND</h2><p>Center for Applied Experimentation.</p><nav>STUDIO [ Index ] Studies Information Objects Wabi Sabi Type [ All ]</nav><div class="studio-studies">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><span>${escapeHtml(link.domain)}</span></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "cargo-cv") {
    const roles = ["Founder", "Researcher", "Writer", "Builder", "Link collector", "Collaborator"];
    return `<section class="cargo-cv"><aside>Ryan Prendergast<br>Info</aside><main><h2>Lifeworks</h2>${roles.map((role, index) => `<p>${index + 1} ${escapeHtml(role)}</p>`).join("")}<h3>Selected links</h3>${links}</main></section>`;
  }

  if (ctx.family === "artist-ledger") {
    return `<section class="artist-ledger"><p class="latest">Latest: ${model.recentPosts[0] ? `<a href="${model.recentPosts[0].href}">${escapeHtml(model.recentPosts[0].title)}</a>` : "Ryan's linklog"}</p><h2>RYAN PRENDERGAST</h2><nav>ABOUT NEWS WORK</nav><div class="ledger-list">${model.links.map((link) => `<p><time>${escapeHtml(link.date)}</time> <a href="${link.url}">${escapeHtml(link.title)}</a></p>`).join("")}</div></section>`;
  }

  if (ctx.family === "garden-notebook") {
    return `<section class="garden-notebook"><figure><div class="garden-image">latent space</div><figcaption>Getting my notes signed by the internet</figcaption></figure><h2>Hi, I'm Ryan.</h2>${model.introHtml}<div class="garden-beds">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }

  if (ctx.family === "fragment-journal") {
    return `<section class="fragment-journal"><h2>Ryan Prendergast</h2><nav>about playlists journal notes library poetry archive</nav><div class="latest-columns"><section><h3>latest posts</h3>${posts}</section><section><h3>latest notes</h3>${links}</section></div></section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return `<section class="ucoz-archive"><div class="ucoz-top">narod.ru ucoz.ru blogspot.ru</div><nav>Главная | Каталог файлов | Регистрация | Вход</nav><h2>Каталог файлов</h2>${links}</section>`;
  }
  if (ctx.family === "uncertainty") {
    return `<section class="uncertainty"><h2>Schemas of Uncertainty</h2><div class="uncertain-content">${model.introHtml}${links}</div></section>`;
  }
  if (ctx.family === "briefing") {
    return `<section class="briefing"><nav>Home Politics Business Technology Energy</nav><h2>Ryan Briefing</h2><div class="brief-grid">${model.links.map((link) => `<article><span>THE NEWS</span><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "bookmaker-card") {
    return `<section class="bookmaker-card"><h2>Ryan Prendergast</h2><p>Graphic systems, essays, links, and AI work.</p><p>Based on the supplied Virginie Gauthier reference.</p><address><a href="/contact">contact</a> · <a href="/blog">writing</a> · <a href="/archives">archive</a></address></section>`;
  }
  if (ctx.family === "experimental-loop") {
    return `<section class="experimental-loop"><h2>re-coding everyday Ryan</h2><p>re-coding everyday Ryan is a digital / experimental / hybrid publication by a working group of one.</p><p>re-coding everyday Ryan is a digital / experimental / hybrid publication by a working group of one.</p>${links}</section>`;
  }
  if (ctx.family === "taste-directory") {
    return `<section class="taste-directory"><nav>Sign up / login Theme: Ryan Classic Rising Browse</nav><h2>A TASTE OF TASTE</h2><div class="taste-cats">Music · Film · TV · Books · Places · Links</div>${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${escapeHtml(link.domain)}</p></article>`).join("")}</section>`;
  }
  if (ctx.family === "writer-ledger") {
    return `<section class="writer-ledger"><h2>recently...</h2>${model.recentPosts.map((post) => `<p>an essay on <a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}${model.links.slice(0, 8).map((link) => `<p>notes on <a href="${link.url}">${escapeHtml(link.title)}</a></p>`).join("")}</section>`;
  }

  if (ctx.family === "artist-menu") {
    return `<section class="artist-menu"><button>Menu</button><h2>Ryan Prendergast</h2><nav>Projects & Collaborations Publications About Contact</nav><div class="works-list">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "friendly-hub") {
    return `<section class="friendly-hub"><h2>@ryanprendergast</h2><p>❤️ friendly, ambitious builder ⚡️</p><nav>Hi · bookshelf · email · mentions · pics · contribute</nav>${model.introHtml}${links}</section>`;
  }
  if (ctx.family === "games-cabinet") {
    return `<section class="games-cabinet"><div class="meta-controls">Meta Controls Controls</div><h2>ryan.games</h2><nav>media & speaking blog & all work what's my deal</nav><div class="game-grid">${model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`).join("")}</div></section>`;
  }
  if (ctx.family === "portal-gallery") {
    return `<section class="portal-gallery"><nav>gallery uncovered curate together</nav><h2>Come for a stroll through the garden of human creativity...</h2><div class="portal-grid">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "design-repository") {
    return `<section class="design-repository"><h2>archives.design</h2><p>A digital archive of Ryan-related items available on the internet.</p><nav>always_available · borrow_only · stream_only</nav>${links}</section>`;
  }
  if (ctx.family === "weblog-facets") {
    const tags = ["ai", "security", "tools", "links", "books", "web"];
    return `<section class="weblog-facets"><h2>Ryan Prendergast's Weblog</h2><nav>About Subscribe TILs Tools</nav><div class="tag-cloud">${tags.map((tag, index) => `<a href="/blog">${tag} ${300 - index * 23}</a>`).join("")}</div>${posts}${links}</section>`;
  }
  if (ctx.family === "research-lab") {
    return `<section class="research-lab"><nav>Research Policy Commitments Learn News</nav><h2>Research</h2><p>Research notes on AI systems, difficult workflows, and the humanities.</p><div class="research-grid">${model.links.map((link) => `<article><a href="${link.url}">${escapeHtml(link.title)}</a><p>${stripHtml(link.contentHtml)}</p></article>`).join("")}</div></section>`;
  }
  if (ctx.family === "visual-culture") {
    return `<section class="visual-culture"><h2>PARADYME</h2><p>Practice for Visual Culture</p><p>A unique and multi-angled view on contemporary visual culture, beyond a single medium.</p>${links}</section>`;
  }

  if (ctx.family === "hn") {
    return `<section class="hn-feed"><div class="hn-intro">${model.introHtml}</div><table><tbody>${model.links
      .map((link, index) => `<tr><td class="rank">${index + 1}.</td><td><a href="${link.url}">${escapeHtml(link.title)}</a><span class="sitebit"> (${escapeHtml(link.domain)})</span><div class="subtext">${escapeHtml(link.date)} | ${stripHtml(link.contentHtml)}</div></td></tr>`)
      .join("")}</tbody></table><div class="hn-recent"><strong>Recent Essays</strong>${posts}</div></section>`;
  }

  if (ctx.family === "desktop") {
    return `<section class="desktop-window is-main"><div class="window-title">Linklog</div><div class="window-body">${model.introHtml}<div class="file-grid">${links}</div></div></section><section class="desktop-window"><div class="window-title">Recent Essays</div><div class="window-body">${posts}</div></section>`;
  }

  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<section class="terminal-output"><p class="prompt">$ cat about.txt</p>${model.introHtml}<p class="prompt">$ tail -n ${model.links.length} links.log</p>${links}<p class="prompt">$ ls recent-essays</p>${posts}</section>`;
  }

  if (ctx.family === "wiki") {
    return `<article class="wiki-article"><aside class="wiki-toc"><a href="#about">About</a><a href="#links">Links</a><a href="#posts">Recent posts</a></aside><section id="about">${model.introHtml}</section><h2 id="links">External links</h2>${links}<h2 id="posts">Recent posts</h2>${posts}</article>`;
  }

  return `<section class="theme-home-intro">${model.introHtml}</section><section class="theme-link-list">${links}</section><section class="theme-recent-posts"><h2>Recent Essays</h2>${posts}</section>`;
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
    return `<section class="${ctx.family}"><h2>${ctx.family === "wordmark-studio" ? "W O R K" : "Studies Index"}</h2><div class="work-grid">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}"><span>${escapeHtml(post.title)}</span><small>${escapeHtml(group.year)} · ${escapeHtml(post.date)}</small></a>`)).join("")}</div></section>`;
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
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture"].includes(ctx.family)) {
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
  if (["wordmark-studio", "studio-index", "research-tools", "artist-ledger", "builder-notes", "garden-notebook"].includes(ctx.family)) {
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
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture"].includes(ctx.family)) {
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
  return `<section class="guestbook-header"><h2>Guestbook</h2>${button}</section>${entries}${guestbookModalScript()}`;
}

function renderThemes(model: ThemesModel, ctx: RenderContext): string {
  if (ctx.family === "catalog") {
    return `<section class="catalog-table theme-catalog"><header><span>Theme</span><span>Category</span><span>Status</span></header>${model.themes.map((theme) => `<a href="?theme=${theme.slug}"><span>${escapeHtml(theme.name)}</span><span>${escapeHtml(theme.category)}</span><span>${theme.slug === ctx.theme.slug ? "active" : "ready"}</span></a>`).join("")}</section>`;
  }
  const builtCount = model.themes.filter((theme) => theme.status === "built").length;
  return `<section class="themes-hero"><div><p class="themes-eyebrow">Supplied Site Mimics</p><h2>${model.themes.length} direct layouts from Ryan's reference list.</h2><p>The content stays stable while each theme mimics one supplied target site. ${builtCount} themes are currently built with dedicated layout treatment; planned themes remain visible as implementation targets.</p></div><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div></section><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}`;
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
