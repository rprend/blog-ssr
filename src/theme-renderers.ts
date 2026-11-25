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
  image?: string | null;
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
  { href: "/links", label: "Links" },
  { href: "/blog", label: "Blog" },
  { href: "/photos", label: "Photography" },
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
  if (requested === "original") return originalTheme;
  if (requested) return getThemeBySlug(requested);

  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\s*)siteTheme=([^;]+)/);
  if (!match || decodeURIComponent(match[1]) === "original") return originalTheme;
  return getThemeBySlug(decodeURIComponent(match[1]));
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

  if (family === "spartan") {
    return renderSpartanShell(options, content, ctx);
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
  if (ctx.family === "scoreboard") return renderScoreboardGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "research-tools") return renderResearchToolsGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "studio-index") return renderStudioIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "cargo-cv") return renderCargoCvGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "artist-ledger") return renderArtistLedgerGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "garden-notebook") return renderGardenGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "fragment-journal") return renderFragmentGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "art-index") return renderArtIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "ucoz-archive") return renderUcozPage(ctx, (model as GenericPageModel).heading, `<article class="ucoz-file-page"><div class="ucoz-file-head"><h2>${escapeHtml((model as GenericPageModel).heading)}</h2></div><div class="ucoz-copy">${(model as GenericPageModel).contentHtml}</div></article>`, [["Home", "/"], [(model as GenericPageModel).heading, ctx.currentPage]]);
  if (ctx.family === "uncertainty") return renderUncertaintyGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "briefing") return renderBriefingGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "bookmaker-card") return renderBookmakerPage(ctx, `<section class="bookmaker-info"><h1>${escapeHtml((model as GenericPageModel).heading)}</h1><div class="bookmaker-copy">${(model as GenericPageModel).contentHtml}</div></section>`);
  if (ctx.family === "experimental-loop") return renderExperimentalLoopPage(ctx, `<article class="experimental-loop-article"><header><h1>${escapeHtml((model as GenericPageModel).heading)}</h1></header><div class="experimental-loop-copy">${(model as GenericPageModel).contentHtml}</div></article>`);
  if (ctx.family === "taste-directory") return renderTasteDirectoryPage(ctx, `${renderTasteSectionHead((model as GenericPageModel).heading, "", "")}<article class="taste-card taste-page-card"><div class="taste-card-body">${(model as GenericPageModel).contentHtml}</div></article>`, "Browse");
  if (ctx.family === "writer-ledger") return renderWriterLedgerGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "visual-culture") return renderVisualCultureGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "artist-menu") return renderArtistMenuGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "friendly-hub") return renderFriendlyHubGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "games-cabinet") return renderGamesCabinetGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "portal-gallery") return renderPortalGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "design-repository") return renderDesignRepositoryGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "weblog-facets") return renderWeblogFacetsPage(ctx, renderWeblogFacetsGeneric(model as GenericPageModel, ctx));
  if (ctx.family === "research-lab") return renderResearchLabGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "research-sidenotes") return renderResearchSidenoteGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "room-wall") return renderRoomWallGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "book-microsite") return renderBookMicrositeGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "download-index") return renderDownloadIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "visual-index") return renderVisualIndexGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "html-bulletin") return renderHtmlBulletinGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "consumption-digest") return renderConsumptionDigestGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "data-portfolio") return renderDataPortfolioGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "internet-diagram") return renderInternetDiagramWindow(ctx, (model as GenericPageModel).heading, `<div class="internet-diagram-copy">${(model as GenericPageModel).contentHtml}</div>`);
  if (ctx.family === "vernacular-essay") return renderVernacularGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "cheap-manifesto") return renderCheapManifestoGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "performance-club") return renderPerformanceClubGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "forum-frontpage") {
    const generic = model as GenericPageModel;
    return renderForumFrontpageShell(ctx, `<article class="forum-frontpage-page"><h1>${escapeHtml(generic.heading)}</h1><div class="forum-frontpage-copy">${generic.contentHtml}</div></article>`, generic.heading);
  }
  if (ctx.family === "essay-blogroll") {
    const generic = model as GenericPageModel;
    return renderEssayBlogrollPage(
      ctx,
      `<article class="essay-blogroll-entry essay-blogroll-article"><h2>${escapeHtml(generic.heading)}</h2><div class="essay-blogroll-copy">${generic.contentHtml}</div></article>`,
    );
  }
  if (ctx.family === "recurse-joy") {
    const generic = model as GenericPageModel;
    return renderRecurseJoyPage(ctx, `<article class="recurse-joy-page"><header class="recurse-joy-page-head"><h2>${escapeHtml(generic.heading)}</h2></header><div class="recurse-joy-copy">${generic.contentHtml}</div></article>`, "Page");
  }
  if (ctx.family === "forecast-report") return renderForecastReportGeneric(model as GenericPageModel, ctx);
  if (ctx.family === "poetic-article") return renderPoeticArticlePage(ctx, (model as GenericPageModel).heading, `<div class="poetic-copy">${(model as GenericPageModel).contentHtml}</div>`);
  if (ctx.family === "feral-essay") return renderFeralPage(ctx, (model as GenericPageModel).heading, `<div class="feral-copy">${(model as GenericPageModel).contentHtml}</div>`, "Page");
  if (ctx.family === "conversational-minimal") {
    const generic = model as GenericPageModel;
    return renderConversationalMinimalPage(ctx, `<article><h2>${escapeHtml(generic.heading)}</h2><div class="conversational-minimal-copy">${generic.contentHtml}</div></article>`);
  }
  if (ctx.family === "founder-index") {
    const generic = model as GenericPageModel;
    return renderFounderIndexPage(ctx, `<article class="founder-index-article"><h2>${escapeHtml(generic.heading)}</h2><div class="founder-index-copy">${generic.contentHtml}</div></article>`);
  }
  if (ctx.family === "grant-page") {
    const generic = model as GenericPageModel;
    return renderGrantPage(ctx, `<article class="grant-article"><h2>${escapeHtml(generic.heading)}</h2><div class="grant-copy">${generic.contentHtml}</div></article>`);
  }
  if (ctx.family === "now-directory") {
    const generic = model as GenericPageModel;
    return renderNowDirectoryPage(ctx, `<article><h2>${escapeHtml(generic.heading)}</h2>${generic.contentHtml}</article>`);
  }
  if (ctx.family === "no-css") {
    const generic = model as GenericPageModel;
    return `<article><h2>${escapeHtml(generic.heading)}</h2>${generic.contentHtml}</article>`;
  }
  return `<article class="theme-generic"><h2>${escapeHtml((model as GenericPageModel).heading)}</h2>${(model as GenericPageModel).contentHtml}</article>`;
}

function renderAquaShell<T extends PageModel>(options: RenderPageOptions<T>, content: string): string {
  const navData = {
    homeActive: options.currentPage === "/" ? "active" : "",
    linksActive: options.currentPage === "/links" ? "active" : "",
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
  const navigation = [
    { href: "/", label: "Home" },
    { href: "/links", label: "Links" },
    { href: "/blog", label: "Writing" },
    { href: "/photos", label: "Photography" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/contact", label: "Contact" },
  ].map((item) => ({ ...item, active: item.href === ctx.currentPage }));
  return `<!DOCTYPE html>
<html lang="en" data-theme="${escapeHtml(options.theme.slug)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(options.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(options.canonicalUrl || `https://ryan-prendergast.com${options.currentPage}`)}">
  ${options.structuredData || ""}
  <style>img{max-width:100%;height:auto}body{padding-bottom:56px}</style>
</head>
<body class="theme-layout theme-${escapeHtml(options.theme.slug)} family-${ctx.family} ${options.bodyClass || ""}">
  <header>
    <h1><a href="/">Ryan Prendergast</a></h1>
    <nav aria-label="Core site areas">
      <ul>
        ${navigation.map((item) => `<li><a${item.active ? ` aria-current="page"` : ""} href="${item.href}">${escapeHtml(item.label)}</a></li>`).join("")}
      </ul>
    </nav>
    <hr>
  </header>
  <main>${content}</main>
  <hr>
  <footer>
    <p><a href="/rss.xml">RSS</a></p>
  </footer>
  <div style="position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #000;padding:8px;z-index:9999">${renderMiniThemePicker(options.theme)}</div>
  <script src="/theme-system.js" defer></script>
</body>
</html>`;
}

function renderSpartanShell<T extends PageModel>(options: RenderPageOptions<T>, content: string, ctx: RenderContext): string {
  const description = options.description || "Ryan Prendergast's personal website and blog";
  const canonicalUrl = options.canonicalUrl || `https://ryan-prendergast.com${options.currentPage}`;
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
<body class="site-shell theme-layout theme-${escapeHtml(options.theme.slug)} family-${ctx.family} ${options.bodyClass || ""}" bgcolor="#ffffff" text="#000000" link="#000099" vlink="#464646">
  <table class="pg-shell" border="0" cellspacing="0" cellpadding="0">
    <tbody>
      <tr valign="top">
        <td class="pg-sidebar">${renderSpartanSidebar(ctx)}</td>
        <td class="pg-gutter"><img src="/favicon.ico" alt="" width="1" height="1"></td>
        <td class="pg-main-cell">
          <main class="theme-shell-main">${content}</main>
          <footer class="pg-copyright">&copy; mmxxvi Ryan Prendergast</footer>
        </td>
      </tr>
    </tbody>
  </table>
  ${renderMiniThemePicker(options.theme)}
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
  if (ctx.family === "scrapbook") {
    const items = [
      ["/", "\u{1F3E0} home"],
      ["/links", "\u{1F517} links"],
      ["/blog", "\u{1F4DD} pieces"],
      ["/photos", "\u{1F4F7} photography"],
      ["/guestbook", "\u{1F4D6} guestbook"],
      ["/contact", "\u{2709}\u{FE0F} contact"],
    ] as Array<[string, string]>;
    const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
    return {
      before: `<header class="scrapbook-top"><h1><a href="/">Ryan Prendergast</a> \u{1F44B}</h1><nav aria-label="Primary">${items.map(([href, label]) => `<a class="${href === current ? "is-active" : ""}" href="${href}">${label}</a>`).join(" ")}</nav></header>`,
      after: "",
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

function renderUcozPage(ctx: RenderContext, title: string, contentHtml: string, crumbs: Array<[string, string]>, sidebarHtml = ""): string {
  const active = (href: string) => (ctx.currentPage === href ? " class=\"is-active\"" : "");
  const nav = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as const;
  const breadcrumb = crumbs.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join(" » ");
  const sidebar = sidebarHtml;

  return `<section class="ucoz-archive" aria-label="${escapeHtml(title)}">
    <table class="ucoz-layout" cellspacing="0" cellpadding="0">
      <tbody>
        <tr><td colspan="2" class="ucoz-cap">ryan-prendergast.com</td></tr>
        <tr><td colspan="2" class="ucoz-banner"><a href="/">Ryan Prendergast</a></td></tr>
        <tr>
          <td class="ucoz-left">
            <nav class="ucoz-module ucoz-site-menu" aria-label="Site menu"><b>Site menu</b>${nav.map(([href, label]) => `<a${active(href)} href="${href}">${label}</a>`).join("")}</nav>
            ${sidebar}
          </td>
          <td class="ucoz-main">
            <div class="ucoz-breadcrumb">${breadcrumb}</div>
            ${contentHtml}
          </td>
        </tr>
      </tbody>
    </table>
  </section>`;
}

function renderUcozStats(first: string, second: string): string {
  return `<div class="ucoz-module ucoz-stats"><b>Statistics</b><span>${escapeHtml(first)}</span>${second ? `<span>${escapeHtml(second)}</span>` : ""}</div>`;
}

function renderUcozFileEntry(title: string, href: string, source: string, date: string, detail: string, index: number): string {
  return `<div class="ucoz-file"><div class="ucoz-file-title"><img src="/favicon.ico" alt="" width="16" height="16"><a href="${href}">${escapeHtml(title)}</a></div><div class="ucoz-file-meta">Category: ${escapeHtml(source)} | Date: ${escapeHtml(date)}</div>${detail ? `<div class="ucoz-file-desc">${escapeHtml(detail)}</div>` : ""}</div>`;
}

function renderMiniThemePicker(theme: SiteTheme): string {
  const options = [`<option value="original"${theme.slug === "original" ? " selected" : ""}>Original</option>`, ...siteThemes
    .map((candidate) => `<option value="${candidate.slug}"${candidate.slug === theme.slug ? " selected" : ""}>${escapeHtml(candidate.name)}</option>`)
  ].join("");
  return `<div class="mini-theme-picker sticky-theme-picker"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${options}</select><button type="button" data-theme-random>Random</button></div>`;
}

function renderSpartanSidebar(ctx: RenderContext): string {
  const links = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
  const title = ctx.currentPage === "/" || ctx.currentPage === "/links" ? "" : `<a class="pg-sidebar-title" href="/">Ryan<br>Prendergast</a>`;
  return `<div class="pg-sidebar-card">${title}${links
    .map(([href, label]) => `<a class="${current === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`)
    .join("")}</div>`;
}

function renderSpartanNotice(label: string, html: string, className: string): string {
  return `<table class="pg-notice ${className}" border="0" cellspacing="0" cellpadding="0" width="410"><tbody><tr><td><font size="2"><b>${escapeHtml(label)}</b> ${html}</font></td></tr></tbody></table>`;
}

function renderCanonicalHomeHeader(model: HomeModel): string {
  return `<header class="canonical-home-header"><h2>Ryan Prendergast</h2>${model.introHtml}</header>`;
}

function renderHtmlBulletinNav(ctx: RenderContext): string {
  return `<p class="html-bulletin-nav">${renderIndexBatchNavLinks(ctx, { "/": "home", "/links": "links", "/blog": "writing", "/photos": "photography", "/guestbook": "guestbook", "/contact": "contact" })}</p>`;
}

function renderHtmlBulletinPage(ctx: RenderContext, title: string, contentHtml: string, introHtml = ""): string {
  return `<section class="html-bulletin">
    <h2><a href="/">Ryan Prendergast</a></h2>
    ${introHtml}
    ${renderHtmlBulletinNav(ctx)}
    <h3>${escapeHtml(title)}</h3>
    ${contentHtml}
  </section>`;
}

function renderHtmlBulletinGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderHtmlBulletinPage(ctx, model.heading, `<div class="html-bulletin-copy">${model.contentHtml}</div>`);
}

function renderCheapManifestoNav(ctx: RenderContext): string {
  const primary = [
    ["/", "home = ryan"],
    ["/links", "links ≠ feed"],
    ["/blog", "writing ≠ content"],
    ["/photos", "photography ≠ polish"],
    ["/guestbook", "guestbook = hello"],
    ["/contact", "contact = email"],
  ] as Array<[string, string]>;
  return `<ul>${primary.map(([href, label]) => `<li><a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul>`;
}

// sidebarHtml: extra "✧" lists for the sidebar (the reference lists small-web sites there); only real links are passed in.
function renderCheapManifestoPage(ctx: RenderContext, title: string, contentHtml: string, introHtml = "", sidebarHtml = ""): string {
  const isHome = title === "Ryan Prendergast";
  return `<section class="cheap-manifesto">
    <div class="cheap-manifesto-hearts" aria-hidden="true">♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡♥♡</div>
    <div class="cheap-manifesto-layout">
      <aside class="cheap-manifesto-sidebar" aria-label="Core site areas">
        ${renderCheapManifestoNav(ctx)}
        ${sidebarHtml ? `<div class="cheap-manifesto-extra">${sidebarHtml}</div>` : ""}
      </aside>
      <main class="cheap-manifesto-main">
        ${isHome ? "" : `<p class="cheap-manifesto-home"><a href="/">Ryan Prendergast</a> is home of the...</p>`}
        <h1>☃︎ ${escapeHtml(title)}</h1>
        ${introHtml ? `<div class="cheap-manifesto-intro">${introHtml}</div>` : ""}
        ${contentHtml}
      </main>
    </div>
  </section>`;
}

function renderCheapManifestoGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderCheapManifestoPage(ctx, model.heading, `<div class="cheap-manifesto-copy">${model.contentHtml}</div>`);
}

function renderPerformanceClubNav(ctx: RenderContext): string {
  const links = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="performance-club-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderPerformanceClubPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="performance-club">
    <header class="performance-club-top">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${renderPerformanceClubNav(ctx)}
    </header>
    ${contentHtml}
  </section>`;
}

function renderPerformanceClubBlock(title: string, contentHtml: string, className = ""): string {
  return `<section class="performance-club-block ${className}">
    <h2>${escapeHtml(title)}</h2>
    ${contentHtml}
  </section>`;
}

function renderPerformanceClubRow(cells: string[]): string {
  return `<tr>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
}

function renderPerformanceClubLinkRow(link: LinkEntryModel, index: number): string {
  return renderPerformanceClubRow([
    `<span class="performance-club-rank">${index + 1}.</span>`,
    `<a href="${link.url}">${escapeHtml(link.domain)}</a>`,
    `<a href="${link.url}">${escapeHtml(link.title)}</a><div class="performance-club-note">${link.contentHtml}</div>`,
    `${escapeHtml(link.date)}`,
  ]);
}

function renderPerformanceClubPostRow(post: PostSummaryModel, label: string, index: number): string {
  return renderPerformanceClubRow([
    `<span class="performance-club-rank">${index + 1}.</span>`,
    ...(label ? [escapeHtml(label)] : []),
    `<a href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? `<div class="performance-club-note">${escapeHtml(post.excerpt)}</div>` : ""}`,
    escapeHtml(post.date),
  ]);
}

function renderPerformanceClubTable(headings: string[], rows: string, label: string): string {
  return `<table class="performance-club-table" aria-label="${escapeHtml(label)}">
    <thead><tr>${headings.map((heading) => `<th>${escapeHtml(heading)}</th>`).join("")}</tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderPerformanceClubGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderPerformanceClubPage(
    ctx,
    renderPerformanceClubBlock(model.heading, `<div class="performance-club-copy">${model.contentHtml}</div>`, "performance-club-page"),
  );
}

function renderRecurseJoyNav(ctx: RenderContext): string {
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="recurse-joy-nav" aria-label="Primary">${items.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderRecurseJoyPage(ctx: RenderContext, bodyHtml: string, _eyebrow = ""): string {
  return `<section class="recurse-joy">
    <header class="recurse-joy-masthead">
      <div>
        <h1><a href="/">Ryan Prendergast</a></h1>
      </div>
      ${renderRecurseJoyNav(ctx)}
    </header>
    ${bodyHtml}
  </section>`;
}

function renderRecurseJoyEntry(href: string, title: string, date: string, source: string, summaryHtml = ""): string {
  return `<article class="recurse-joy-entry">
    <time>${escapeHtml(date)}</time>
    <div>
      <h2><a href="${href}">${escapeHtml(title)}</a></h2>
      ${source ? `<p class="recurse-joy-source">${escapeHtml(source)}</p>` : ""}
      ${summaryHtml ? `<div class="recurse-joy-summary">${summaryHtml}</div>` : ""}
    </div>
  </article>`;
}

function renderForecastReportNav(ctx: RenderContext): string {
  const sectionLinks = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  const link = ([href, label]: [string, string]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
  return `<header class="forecast-report-top">
    ${ctx.currentPage === "/" ? "" : `<a class="forecast-report-brand" href="/">Ryan Prendergast</a>`}
    <nav class="forecast-report-sections" aria-label="Core site areas">${sectionLinks.map(link).join("")}</nav>
  </header>`;
}

function renderForecastReportPage(ctx: RenderContext, title: string, bodyHtml: string, options: { kicker?: string; meta?: string; subtitleHtml?: string; tocHtml?: string } = {}): string {
  return `<section class="forecast-report">
    ${renderForecastReportNav(ctx)}
    <div class="forecast-report-layout${options.tocHtml ? "" : " forecast-report-layout-plain"}">
      ${options.tocHtml ? `<aside class="forecast-report-rail"><p>Contents</p>${options.tocHtml}</aside>` : ""}
      <article class="forecast-report-document">
        ${options.kicker ? `<div class="forecast-report-kicker">${escapeHtml(options.kicker)}</div>` : ""}
        <h1>${escapeHtml(title)}</h1>
        ${options.subtitleHtml ? `<div class="forecast-report-dek">${options.subtitleHtml}</div>` : ""}
        ${options.meta ? `<div class="forecast-report-meta"><span>${escapeHtml(options.meta)}</span></div>` : `<div class="forecast-report-rule"></div>`}
        ${bodyHtml}
      </article>
    </div>
  </section>`;
}

function renderForecastReportEntry(href: string, title: string, label: string, summary = "", index = 0): string {
  return `<article class="forecast-report-entry">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <div>
      ${label ? `<p>${escapeHtml(label)}</p>` : ""}
      <h2>${href ? `<a href="${href}">${escapeHtml(title)}</a>` : escapeHtml(title)}</h2>
      ${summary ? `<div class="forecast-report-entry-summary">${summary}</div>` : ""}
    </div>
  </article>`;
}

function renderForecastReportGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderForecastReportPage(ctx, model.heading, `<div class="forecast-report-copy">${model.contentHtml}</div>`);
}

function renderPoeticNav(ctx: RenderContext): string {
  const item = (href: string, label: string) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
  return `<nav class="poetic-menu" aria-label="Core site areas">
    <div>${item("/", "home")}${item("/links", "links")}${item("/blog", "writing")}</div>
    <div>${item("/photos", "photography")}${item("/guestbook", "guestbook")}${item("/contact", "contact")}</div>
  </nav>`;
}

function renderPoeticWordmark(): string {
  return `<a class="poetic-wordmark" href="/" aria-label="Ryan Prendergast">
    <span>Ryan</span>
    <span>Prendergast</span>
  </a>`;
}

// One menu (top left, as on the reference) and the stacked wordmark; the home page carries the name as its title instead.
function renderPoeticPageChrome(ctx: RenderContext, contentHtml: string, showWordmark = true): string {
  return `<section class="poetic-site${showWordmark ? "" : " poetic-site-home"}">
    ${renderPoeticNav(ctx)}
    ${showWordmark ? renderPoeticWordmark() : ""}
    ${contentHtml}
  </section>`;
}

function renderPoeticArticlePage(ctx: RenderContext, title: string, bodyHtml: string, section = "", metaHtml = ""): string {
  const kickerHref = ctx.currentPage === "/photos" ? "/" : "/blog";
  return renderPoeticPageChrome(
    ctx,
    `<article class="poetic-article">
      ${section ? `<a class="poetic-kicker" href="${kickerHref}">${escapeHtml(section)}</a>` : ""}
      <h1>${escapeHtml(title)}</h1>
      ${metaHtml}
      ${bodyHtml}
    </article>`,
    title !== "Ryan Prendergast",
  );
}

function renderPoeticLink(link: LinkEntryModel): string {
  const image = link.image ? `<figure><img src="${link.image}" alt="" loading="lazy"></figure>` : "";
  return `<article class="poetic-entry">
    ${image}
    <h2><a href="${link.url}">${escapeHtml(link.title)}</a></h2>
    <p class="poetic-meta">${escapeHtml(link.date)} <a href="${link.url}">${escapeHtml(link.domain)}</a></p>
    <div class="poetic-copy">${link.contentHtml}</div>
  </article>`;
}

function renderPoeticPost(post: PostSummaryModel): string {
  return `<article class="poetic-entry poetic-post-row">
    <h2><a href="${post.href}">${escapeHtml(post.title)}</a></h2>
    <p class="poetic-meta">${escapeHtml(post.date)}${post.readTime ? ` ${escapeHtml(post.readTime)}` : ""}</p>
    ${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}
  </article>`;
}

function renderFeralNav(ctx: RenderContext): string {
  const links = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="feral-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderFeralPage(ctx: RenderContext, title: string, bodyHtml: string, section = "Writing", metaHtml = ""): string {
  return `<section class="feral-essay">
    <header class="feral-topbar">
      <a class="feral-publication" href="/">Ryan Prendergast</a>
      ${renderFeralNav(ctx)}
    </header>
    <div class="feral-layout">
      <article class="feral-article">
        ${section ? `<p class="feral-kicker">${escapeHtml(section)}</p>` : ""}
        ${title ? `<h1>${escapeHtml(title)}</h1>` : ""}
        ${metaHtml}
        ${bodyHtml}
      </article>
    </div>
  </section>`;
}

function renderFeralLink(link: LinkEntryModel): string {
  const image = link.image ? `<figure><img src="${link.image}" alt="" loading="lazy"></figure>` : "";
  return `<article class="feral-entry">
    ${image}
    <h2><a href="${link.url}">${escapeHtml(link.title)}</a></h2>
    <p class="feral-meta">${escapeHtml(link.date)} · <a href="${link.url}">${escapeHtml(link.domain)}</a></p>
    <div class="feral-copy">${link.contentHtml}</div>
  </article>`;
}

function renderFeralPost(post: PostSummaryModel): string {
  return `<article class="feral-entry feral-post-row">
    <h2><a href="${post.href}">${escapeHtml(post.title)}</a></h2>
    <p class="feral-meta">${escapeHtml(post.date)}${post.readTime ? ` · ${escapeHtml(post.readTime)}` : ""}</p>
    ${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}
  </article>`;
}

function renderVernacularNav(ctx: RenderContext): string {
  const links = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<p class="vernacular-nav">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join(" / ")}</p>`;
}

function renderVernacularPage(ctx: RenderContext, title: string, contentHtml: string): string {
  return `<article class="vernacular-essay">
    ${renderVernacularNav(ctx)}
    <center><img class="vernacular-figure" src="/favicon.ico" alt="" width="32" height="32">${title === "Ryan Prendergast" ? "" : `<p class="vernacular-author"><a href="/">Ryan Prendergast</a></p>`}<h1>${escapeHtml(title)}</h1></center>
    ${contentHtml}
  </article>`;
}

function renderVernacularLink(link: LinkEntryModel, index: number): string {
  const note = stripHtml(link.contentHtml);
  return `<p><a name="observation-${index + 1}"></a><font size="2">[${index + 1}] ${escapeHtml(link.date)} / ${escapeHtml(link.domain)}</font><br><a href="${link.url}">${escapeHtml(link.title)}</a>${note ? `<br>${note}` : ""}</p>`;
}

function renderVernacularPost(post: PostSummaryModel, index: number): string {
  const note = post.excerpt || post.readTime || "";
  return `<p><a name="text-${index}"></a><font size="2">[${index}] ${escapeHtml(post.date)}</font><br><a href="${post.href}">${escapeHtml(post.title)}</a>${note ? `<br>${escapeHtml(note)}` : ""}</p>`;
}

function renderVernacularGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderVernacularPage(ctx, model.heading, `<hr><div class="vernacular-body">${model.contentHtml}</div>`);
}

function renderConsumptionDigestNav(ctx: RenderContext): string {
  const links = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<nav class="consumption-digest-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join(" ")}</nav>`;
}

function renderConsumptionDigestPage(ctx: RenderContext, contentHtml: string, introHtml = ""): string {
  return `<section class="consumption-digest">
    <header class="consumption-digest-mast">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${introHtml ? `<div class="consumption-digest-about">${introHtml}</div>` : ""}
      ${renderConsumptionDigestNav(ctx)}
    </header>
    ${contentHtml}
  </section>`;
}

function renderConsumptionDigestDay(label: string, groups: Array<{ label: string; html: string }>): string {
  return `<section class="consumption-digest-day">
    <h2>${escapeHtml(label)}</h2>
    ${groups.filter((group) => group.html.trim()).map((group) => `<div class="consumption-digest-group">${group.label ? `<span>${escapeHtml(group.label)}</span>` : ""}<div>${group.html}</div></div>`).join("")}
  </section>`;
}

function renderConsumptionDigestLink(link: LinkEntryModel): string {
  const note = stripHtml(link.contentHtml);
  const showDomain = link.domain && link.domain.toLowerCase() !== link.title.toLowerCase();
  return `<p><a href="${link.url}">${escapeHtml(link.title)}</a>${showDomain ? ` - ${escapeHtml(link.domain)}` : ""}${note ? `<small>${note}</small>` : ""}</p>`;
}

function renderConsumptionDigestPost(post: PostSummaryModel): string {
  const detail = [post.date, post.readTime].filter(Boolean).join(", ");
  return `<p><a href="${post.href}">${escapeHtml(post.title)}</a>${detail ? ` - ${escapeHtml(detail)}` : ""}</p>`;
}

function renderConsumptionDigestGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderConsumptionDigestPage(ctx, renderConsumptionDigestDay(model.heading, [{ label: "", html: `<div class="consumption-digest-copy">${model.contentHtml}</div>` }]));
}

function indexBatchPlainText(value: string): string {
  return stripHtml(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;|&apos;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function renderIndexBatchNavLinks(ctx: RenderContext, labels: Record<string, string> = {}): string {
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return items
    .map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(labels[href] || label)}</a>`)
    .join(" ");
}

function renderResearchLabNav(ctx: RenderContext): string {
  return `<header class="research-lab-top">
    <a class="research-lab-brand" href="/">Ryan Prendergast</a>
    <nav class="research-lab-primary" aria-label="Site">${renderIndexBatchNavLinks(ctx)}</nav>
  </header>`;
}

function renderResearchLabPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="research-lab">${renderResearchLabNav(ctx)}${contentHtml}</section>`;
}

function renderResearchLabCard(href: string, title: string, category: string, date: string, detail: string, featured = false): string {
  return `<article class="research-lab-card ${featured ? "is-featured" : ""}">
    <a href="${href}"><span>${escapeHtml(category)}</span>${date ? `<time>${escapeHtml(date)}</time>` : ""}<h3>${escapeHtml(title)}</h3>${detail ? `<p>${escapeHtml(detail)}</p>` : ""}</a>
  </article>`;
}

function renderResearchLabPublicationRow(href: string, date: string, category: string, title: string): string {
  return `<a class="research-lab-publication" href="${href}"><span>${escapeHtml(date)}</span><span>${escapeHtml(category)}</span><strong>${escapeHtml(title)}</strong></a>`;
}

function renderVisualCultureNav(ctx: RenderContext): string {
  return `<nav class="visual-culture-nav" aria-label="Site">${renderIndexBatchNavLinks(ctx)}</nav>`;
}

function renderVisualCulturePage(ctx: RenderContext, subheading: string, contentHtml: string, sectionClass = ""): string {
  return `<section class="visual-culture ${sectionClass}">
    <h1><a href="/">Ryan Prendergast</a><br>${escapeHtml(subheading)}</h1>
    ${renderVisualCultureNav(ctx)}
    <main>${contentHtml}</main>
  </section>`;
}

function renderVisualCultureWork(href: string, title: string, meta: string, detail = ""): string {
  return `<p class="visual-culture-work"><span style="font-weight:bolder"><a href="${href}">${escapeHtml(title)}</a></span>${meta ? ` (${escapeHtml(meta)})` : ""}${detail ? `<br>${escapeHtml(detail)}` : ""}</p>`;
}

function renderRoomWallNav(ctx: RenderContext): string {
  return `<header class="room-wall-top">
    <p><a href="/">Ryan Prendergast</a></p>
    <nav aria-label="Site">${renderIndexBatchNavLinks(ctx, { "/": "home", "/links": "links", "/blog": "writing", "/photos": "photography", "/guestbook": "guestbook", "/contact": "contact" })}</nav>
  </header>`;
}

function renderRoomWallPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="room-wall">${renderRoomWallNav(ctx)}<main>${contentHtml}</main></section>`;
}

function renderRoomWallWork(href: string, title: string, year: string, medium: string): string {
  const detail = [medium, year].filter(Boolean).join(", ");
  return `<p class="room-wall-work"><a href="${href}">${escapeHtml(title)}</a>${detail ? ` <span>${escapeHtml(detail)}</span>` : ""}</p>`;
}

function renderRoomWallGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderRoomWallPage(ctx, `<article class="room-wall-article"><h1>${escapeHtml(model.heading)}</h1><div class="room-wall-copy">${model.contentHtml}</div></article>`);
}

function renderVisualCultureGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderVisualCulturePage(
    ctx,
    model.heading,
    `<div class="visual-culture-intro visual-culture-copy">${model.contentHtml}</div>`,
    "visual-culture-page",
  );
}

function renderResearchLabHome(model: HomeModel, ctx: RenderContext): string {
  const linkCards = model.links
    .map((link, index) => renderResearchLabCard(link.url, link.title, link.domain || "Link", link.date, indexBatchPlainText(link.contentHtml), index === 0))
    .join("");
  const publicationRows = model.recentPosts
    .map((post) => renderResearchLabPublicationRow(post.href, post.date, post.readTime || "Writing", post.title))
    .join("");
  return renderResearchLabPage(
    ctx,
    `<section class="research-lab-hero">
      <h1>Links</h1>
      <div class="research-lab-intro">${model.introHtml}</div>
    </section>
    <section class="research-lab-feature-grid" aria-label="Links">${linkCards}</section>
    <section class="research-lab-publications">
      <h2>Recent writing</h2>
      <div class="research-lab-publication-head"><span>Date</span><span>Length</span><span>Title</span></div>
      <div class="research-lab-publication-list">${publicationRows}</div>
      <p class="research-lab-more"><a href="/blog">All writing</a></p>
    </section>`,
  );
}

function renderResearchLabIndex(model: BlogIndexModel, ctx: RenderContext): string {
  const posts = model.postsByYear.flatMap((group) => group.posts);
  const rows = posts.map((post) => renderResearchLabPublicationRow(post.href, post.date, post.readTime || "Writing", post.title)).join("");
  const cards = posts
    .slice(0, 3)
    .map((post, index) => renderResearchLabCard(post.href, post.title, post.readTime || "Writing", post.date, post.excerpt || "", index === 0))
    .join("");
  return renderResearchLabPage(ctx, `<section class="research-lab-section-title"><h1>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h1><p>${escapeHtml(model.description)}</p></section><section class="research-lab-feature-grid is-short">${cards}</section><section class="research-lab-publications"><h2>All writing</h2><div class="research-lab-publication-head"><span>Date</span><span>Length</span><span>Title</span></div><div class="research-lab-publication-list">${rows}</div></section>`);
}

function renderResearchLabArticle(model: BlogPostModel, ctx: RenderContext): string {
  const meta = `${escapeHtml(model.date)}${model.author ? ` - ${escapeHtml(model.author)}` : ""}`;
  return renderResearchLabPage(
    ctx,
    `<article class="research-lab-article">
      <a class="research-lab-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a>
      <header><p>${meta}</p><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<div>${escapeHtml(model.subtitle)}</div>` : ""}</header>
      <div class="blog-post-content research-lab-copy">${model.contentHtml}</div>
    </article>`,
  );
}

function renderResearchLabArchives(model: ArchiveModel, ctx: RenderContext): string {
  const rows = model.months
    .flatMap((month) => month.posts.map((post) => renderResearchLabPublicationRow(post.href, post.date || month.label, month.label, post.title)))
    .join("");
  return renderResearchLabPage(ctx, `<section class="research-lab-section-title"><h1>Archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></section><section class="research-lab-publications"><div class="research-lab-publication-head"><span>Date</span><span>Month</span><span>Title</span></div><div class="research-lab-publication-list">${rows}</div></section>`);
}

function renderResearchLabGuestbook(model: GuestbookModel, ctx: RenderContext, button: string): string {
  const rows = model.entries.length
    ? model.entries.map((entry) => `<div class="research-lab-publication"><span>${escapeHtml(entry.date)}</span><span>${escapeHtml(entry.name)}</span><strong>${escapeHtml(entry.message)}</strong></div>`).join("")
    : `<p class="research-lab-empty">No entries yet. Be the first to sign the guestbook!</p>`;
  return renderResearchLabPage(ctx, `<section class="research-lab-section-title"><h1>Guestbook</h1><div><p>${model.entries.length} ${model.entries.length === 1 ? "entry" : "entries"}.</p>${button}</div></section><section class="research-lab-publications research-lab-guestbook"><div class="research-lab-publication-head"><span>Date</span><span>Name</span><span>Message</span></div><div class="research-lab-publication-list">${rows}</div></section>`);
}

function renderResearchLabGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderResearchLabPage(ctx, `<article class="research-lab-article research-lab-generic"><header><h1>${escapeHtml(model.heading)}</h1></header><div class="research-lab-copy">${model.contentHtml}</div></article>`);
}

function renderGardenNav(ctx: RenderContext): string {
  const items = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
  return `<header class="garden-head"><a class="garden-name" href="/">Ryan Prendergast</a><nav class="garden-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a class="${href === current ? "is-active" : ""}" href="${href}">${label}</a>`).join(" ")}</nav></header>`;
}

function renderGardenPage(ctx: RenderContext, contentHtml: string): string {
  return `<article class="garden-notebook">${renderGardenNav(ctx)}${contentHtml}</article>`;
}

function renderBookmakerNav(ctx: RenderContext): string {
  const links = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="bookmaker-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderBookmakerIntro(ctx: RenderContext, introHtml = "", detail = ""): string {
  return `<header class="bookmaker-head">
    <div class="bookmaker-title">
      <h1><a href="/">Ryan Prendergast</a></h1>
    </div>
    ${renderBookmakerNav(ctx)}
    ${introHtml ? `<section class="bookmaker-more"><h2>More info?</h2><div>${introHtml}</div>${detail ? `<div>${detail}</div>` : ""}</section>` : ""}
  </header>`;
}

function renderBookmakerPage(ctx: RenderContext, contentHtml: string, introHtml = "", detail = ""): string {
  return `<section class="bookmaker-card">${renderBookmakerIntro(ctx, introHtml, detail)}${contentHtml}<a class="bookmaker-top" href="#">Top page</a></section>`;
}

function renderBookmakerWorkRow(href: string, title: string, kind: string, date: string, detail = ""): string {
  return `<article class="bookmaker-work"><h3>. <a href="${href}">${escapeHtml(title)}</a></h3><p>${escapeHtml(kind)}${date ? ` [${escapeHtml(date)}]` : ""}</p>${detail ? `<div>${detail}</div>` : ""}</article>`;
}

function renderExperimentalLoopNav(ctx: RenderContext): string {
  const links = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="experimental-loop-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderExperimentalLoopPage(ctx: RenderContext, contentHtml: string, isHome = false): string {
  const identity = isHome ? "" : `<p class="experimental-loop-identity"><a href="/">Ryan Prendergast</a></p>`;
  return `<section class="experimental-loop">${renderExperimentalLoopNav(ctx)}${identity}${contentHtml}</section>`;
}

function renderExperimentalLoopStatement(introHtml: string): string {
  return `<header class="experimental-loop-statement"><h1><a href="/">Ryan Prendergast</a></h1><div>${introHtml}</div></header>`;
}

function renderExperimentalLoopUnit(href: string, title: string, medium: string, context: string, date = "", detail = ""): string {
  const meta = [medium, context, date].filter(Boolean).join(", ");
  return `<a class="experimental-loop-unit" href="${href}"><span>${escapeHtml(meta)}</span><strong>${escapeHtml(title)}</strong>${detail ? `<em>${escapeHtml(detail)}</em>` : ""}</a>`;
}

function renderExperimentalLoopHome(model: HomeModel, ctx: RenderContext): string {
  const linkUnits = model.links.map((link) => renderExperimentalLoopUnit(link.url, link.title, "link", link.domain, link.date, linkCommentaryText(link.contentHtml))).join("");
  const postUnits = model.recentPosts.map((post) => renderExperimentalLoopUnit(post.href, post.title, "writing", post.readTime || "", post.date, post.excerpt || "")).join("");
  if (ctx.currentPage === "/links") {
    return renderExperimentalLoopPage(
      ctx,
      `<header class="experimental-loop-section-head"><h1>Links</h1><p>${model.aboutHtml}</p></header>
      <h2 class="experimental-loop-contents">Contents ↓</h2>
      <div class="experimental-loop-units">${linkUnits}</div>`,
    );
  }
  return renderExperimentalLoopPage(
    ctx,
    `${renderExperimentalLoopStatement(model.introHtml)}
    <h2 class="experimental-loop-contents">Contents ↓</h2>
    <div class="experimental-loop-units">${postUnits}${linkUnits}</div>`,
    true,
  );
}

function renderGardenPostList(posts: PostSummaryModel[]): string {
  return `<ul class="garden-list">${posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <small>${escapeHtml(post.date)}</small>` : ""}</li>`).join("")}</ul>`;
}

function renderGardenLinkList(links: LinkEntryModel[]): string {
  return `<ul class="garden-list garden-link-list">${links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a>${link.domain ? ` <small>${escapeHtml(link.domain)}</small>` : ""}${link.contentHtml ? `<div class="garden-note">${link.contentHtml}</div>` : ""}</li>`).join("")}</ul>`;
}

function renderGardenGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderGardenPage(ctx, `<h1>${escapeHtml(model.heading)}</h1><div class="garden-copy">${model.contentHtml}</div>`);
}

function renderManualHeader(ctx: RenderContext, title: string, descriptionHtml: string, rows: Array<[string, string]> = []): string {
  const meta = rows.length ? `<table class="manual-meta"><tbody>${rows.map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${value}</td></tr>`).join("")}</tbody></table>` : "";
  return `<header class="manual-header"><h1>${escapeHtml(title)}</h1>${descriptionHtml ? `<div class="manual-lede">${descriptionHtml}</div>` : ""}${meta}<nav class="manual-nav" aria-label="Site">${b1Nav(ctx)}</nav></header>`;
}

function renderManualRule(): string {
  return `<hr class="manual-rule">`;
}

function renderManualToc(items: Array<[string, string]>): string {
  return `<section class="manual-toc" aria-labelledby="manual-contents"><h2 id="manual-contents">Contents</h2><ol>${items.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ol></section>`;
}

function renderScoreboardHeader(ctx: RenderContext, title: string, state = ""): string {
  return `<header class="scoreboard-header" id="top"><h1><a href="/">Ryan Prendergast</a></h1><nav class="scoreboard-leagues" aria-label="Site">${b1Nav(ctx)}</nav><p class="scoreboard-pager"><strong>${escapeHtml(title)}</strong></p>${state ? `<p class="scoreboard-state">${escapeHtml(state)}</p>` : ""}</header>`;
}

function renderScoreboardBox(lines: string[], href: string): string {
  const width = 24;
  const top = `+-${"-".repeat(width)}-+`;
  const body = lines.map((line) => `| ${line.slice(0, width).padEnd(width, " ")} |`);
  return `<a class="scoreboard-box" href="${href}"><pre>${[top, ...body, top].map(escapeHtml).join("\n")}</pre></a>`;
}

function renderScoreboardTable(headers: string[], rows: string[][], extraClass = ""): string {
  return `<table class="scoreboard-table ${extraClass}"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
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
    return `<table class="pg-home" border="0" cellspacing="0" cellpadding="0" width="410"><tbody><tr><td><div class="pg-title-block">${homeHeader}</div>${renderSpartanNotice("New:", model.recentPosts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join(" | "), "pg-new")}<br><table class="pg-link-table" border="0" cellspacing="0" cellpadding="0" width="410"><tbody>${model.links.map((link) => `<tr><td><a href="${link.url}">${escapeHtml(link.title)}</a><br><font size="1" color="#666666">${escapeHtml(link.domain)} / ${escapeHtml(link.date)}</font></td></tr>`).join("")}</tbody></table></td></tr></tbody></table>`;
  }

  if (ctx.family === "manual") {
    return b1ManualHome(model, ctx);
  }

  if (ctx.family === "scoreboard") {
    return b1ScoreboardHome(model, ctx);
  }

  if (ctx.family === "no-css") {
    const linkList = `<ul>${model.links.map((link) => `<li><p><a href="${link.url}">${escapeHtml(link.title)}</a></p><p><small>${escapeHtml(link.domain)} / ${escapeHtml(link.date)}</small></p>${link.contentHtml}</li>`).join("")}</ul>`;
    if (ctx.currentPage === "/links") {
      return `<article>
      <h2>Links</h2>
      <p>${model.aboutHtml}</p>
      ${linkList}
    </article>`;
    }
    return `<article>
      ${model.introHtml}
      <h2>Links</h2>
      ${linkList}
      <h2>Recent Writing</h2>
      <ul>${model.recentPosts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <small>${escapeHtml(post.date)}</small>` : ""}${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul>
    </article>`;
  }

  if (ctx.family === "archive-index") {
    return b1ArchiveIndexHome(model, ctx);
  }

  if (ctx.family === "scrapbook") {
    const linkItems = model.links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a> <span>${escapeHtml(link.domain)}, ${escapeHtml(link.date)}</span><div>${link.contentHtml}</div></li>`).join("");
    const postItems = model.recentPosts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a> <span>${escapeHtml(post.date)}</span></li>`).join("");
    return `<section class="scrapbook"><div class="scrapbook-intro">${model.introHtml}</div><section class="scrapbook-section"><h3>\u{1F517} Links</h3><ol>${linkItems}</ol></section><section class="scrapbook-section"><h3>\u{1F4DD} Writing</h3><ol>${postItems}</ol></section></section>`;
  }

  if (ctx.family === "art-index") {
    const isLinksPage = ctx.currentPage === "/links";
    const workRows = model.links
      .map((link) => renderArtIndexRow(getArtIndexYearLabel(link.rawDate || link.date), link.url, link.title, isLinksPage ? [link.domain, linkCommentaryText(link.contentHtml)].filter(Boolean).join(" - ") : link.domain))
      .join("");
    const writingRows = model.recentPosts
      .map((post) => renderArtIndexRow(getArtIndexYearLabel(post.rawDate || post.date), post.href, post.title, post.readTime || "text"))
      .join("");
    if (isLinksPage) {
      return `<section class="art-index">${renderArtIndexHeader(ctx)}<h2>links</h2><div class="art-index-chronology">${workRows}</div>${renderArtIndexFooter(`<p>${model.aboutHtml}</p>`)}</section>`;
    }
    return `<section class="art-index">${renderArtIndexHeader(ctx, model.introHtml)}<h2>selected links</h2><div class="art-index-chronology">${workRows}</div><h2>selected text</h2><div class="art-index-chronology">${writingRows}</div></section>`;
  }

  if (ctx.family === "research-sidenotes") {
    const newest = model.recentPosts.map((post) => renderResearchSidenoteListItem(post.href, post.title, post.date, post.readTime || "")).join("");
    const links = model.links.map((link) => renderResearchSidenoteListItem(link.url, link.title, link.domain, link.date, link.contentHtml)).join("");
    if (ctx.currentPage === "/links") {
      return renderResearchSidenotePage(
        ctx,
        "Links",
        `<section class="research-abstract"><p>${model.aboutHtml}</p></section>
        <section id="links" class="research-section"><ul>${links}</ul></section>`,
        `<p><strong>${model.links.length}</strong> links</p>`,
      );
    }
    return renderResearchSidenotePage(
      ctx,
      "Ryan Prendergast",
      `<section class="research-abstract">${model.introHtml}</section>
      <section id="newest" class="research-section"><h2><a href="/blog">Writing</a></h2><ul>${newest}</ul></section>
      <section id="links" class="research-section"><h2><a href="/links">Links</a></h2><ul>${links}</ul></section>`,
      `<p><strong>${model.recentPosts.length}</strong> recent writing</p><p><strong>${model.links.length}</strong> links</p>`,
    );
  }

  if (ctx.family === "wordmark-studio") {
    return b1WordmarkHome(model, ctx);
  }

  if (ctx.family === "builder-notes") {
    return b1BuilderHome(model, ctx);
  }

  if (ctx.family === "research-tools") {
    return b1ResearchToolsHome(model, ctx);
  }

  if (ctx.family === "art-library") {
    return b1ArtLibraryHome(model, ctx);
  }

  if (ctx.family === "studio-index") {
    const projects = model.links.map((link) => renderStudioIndexProject(link)).join("");
    const recent = model.recentPosts
      .map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.readTime || "Writing", index))
      .join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, model.introHtml, "Index")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Interface", "Systems", "Writing", "Images", "References"])}<div class="studio-index-content"><section class="studio-index-manifesto">${model.aboutHtml}</section><div class="studio-index-grid">${projects}</div><section class="studio-index-panel"><div class="studio-index-panel-title">Studies</div><div class="studio-index-list">${recent}</div></section></div></div></section>`;
  }

  if (ctx.family === "cargo-cv") {
    const lifeworks = [
      ...model.recentPosts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a> <span>${escapeHtml(post.date)}</span>`),
      ...model.links.map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a> <span>${escapeHtml(link.domain)}</span>`),
    ];
    return renderCargoCvPage(ctx, "Info", `<section class="cargo-cv-profile cargo-cv-lead">${model.introHtml}</section><h2>Lifeworks:</h2>${renderCargoCvList(lifeworks)}`);
  }

  if (ctx.family === "artist-ledger") {
    const latest = model.recentPosts[0]
      ? `<a href="${model.recentPosts[0].href}">${escapeHtml(model.recentPosts[0].title)}</a>`
      : "";
    const news = model.recentPosts
      .map((post) => renderArtistLedgerRow(post.date, post.href, post.title, post.readTime || "Writing"))
      .join("");
    const work = model.links
      .map((link) => renderArtistLedgerRow(link.date, link.url, link.title, link.domain, "", link.contentHtml))
      .join("");
    return `<section class="artist-ledger"><div class="artist-ledger-latest"><span>Latest writing</span>${latest}</div>${renderArtistLedgerHeader(ctx)}<section id="about" class="artist-ledger-about"><div>${model.introHtml}</div><div>${model.aboutHtml}</div></section><section id="news" class="artist-ledger-section"><h2>Writing</h2><div class="artist-ledger-list">${news}</div></section><section id="work" class="artist-ledger-section artist-ledger-work"><h2>Links</h2><div class="artist-ledger-list">${work}</div></section></section>`;
  }

  if (ctx.family === "garden-notebook") {
    return renderGardenPage(
      ctx,
      `<div class="garden-intro">${model.introHtml}</div><h2>Writing</h2>${renderGardenPostList(model.recentPosts)}<h2>Links</h2>${renderGardenLinkList(model.links)}`,
    );
  }

  if (ctx.family === "fragment-journal") {
    return renderFragmentPage(
      ctx,
      `<header class="fragment-hero"><h1><a href="/">Ryan Prendergast</a></h1><div class="fragment-intro">${model.introHtml}</div></header><section class="fragment-latest" aria-label="Latest posts and notes"><div><h2>latest writing</h2>${renderFragmentPostList(model.recentPosts)}</div><div><h2>latest links</h2>${renderFragmentLinkList(model.links)}</div></section>`,
    );
  }
  if (ctx.family === "ucoz-archive") {
    const linkFiles = model.links
      .map((link, index) => renderUcozFileEntry(link.title, link.url, link.domain, link.date, linkCommentaryText(link.contentHtml), index + 1))
      .join("");
    const postFiles = model.recentPosts
      .map((post, index) => renderUcozFileEntry(post.title, post.href, "Writing", post.date, post.excerpt || post.readTime || "", index + 1))
      .join("");
    if (ctx.currentPage === "/links") {
      return renderUcozPage(
        ctx,
        "Links",
        `<div class="ucoz-section-title">Links</div>${linkFiles}`,
        [["Home", "/"], ["Links", "/links"]],
        renderUcozStats(`${model.links.length} links`, ""),
      );
    }
    return renderUcozPage(
      ctx,
      "Home",
      `<div class="ucoz-welcome">${model.introHtml}</div><div class="ucoz-section-title">New writing</div>${postFiles}<div class="ucoz-section-title">Links</div>${linkFiles}`,
      [["Home", "/"]],
      renderUcozStats(`${model.links.length} links`, `${model.recentPosts.length} recent writing`),
    );
  }
  if (ctx.family === "uncertainty") {
    const isLinksPage = ctx.currentPage === "/links";
    const works = model.links
      .map((link) => renderUncertaintyLine(link.title, link.url, link.domain, link.date, isLinksPage ? linkCommentaryText(link.contentHtml) : ""))
      .join("");
    const writing = model.recentPosts
      .map((post) => renderUncertaintyLine(post.title, post.href, post.readTime || "", post.date))
      .join("");
    if (isLinksPage) {
      return renderUncertaintyPage(ctx, "Links", `<p>${model.aboutHtml}</p>`, `<section class="uncertainty-group" aria-label="Links">${works}</section>`);
    }
    return renderUncertaintyPage(
      ctx,
      "Ryan Prendergast",
      `<div class="uncertainty-intro">${model.introHtml}</div>`,
      `<section class="uncertainty-group" aria-label="Writing"><h2>Writing</h2>${writing}</section><section class="uncertainty-group" aria-label="Links"><h2>Links</h2>${works}</section>`,
    );
  }
  if (ctx.family === "briefing") {
    return renderBriefingHome(model, ctx);
  }
  if (ctx.family === "bookmaker-card") {
    const selectedLinks = model.links
      .map((link) => renderBookmakerWorkRow(link.url, link.title, link.domain, link.date, link.contentHtml))
      .join("");
    const selectedPosts = model.recentPosts
      .map((post) => renderBookmakerWorkRow(post.href, post.title, post.readTime || "", post.date, post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""))
      .join("");
    if (ctx.currentPage === "/links") {
      return renderBookmakerPage(ctx, `<section class="bookmaker-selected"><h1>Links:</h1><p class="bookmaker-note">${model.aboutHtml}</p>${selectedLinks}</section>`);
    }
    return renderBookmakerPage(
      ctx,
      `<section class="bookmaker-selected"><h2>Selected writing:</h2>${selectedPosts}</section><section class="bookmaker-selected"><h2>Selected links:</h2>${selectedLinks}</section>`,
      model.introHtml,
    );
  }
  if (ctx.family === "experimental-loop") {
    return renderExperimentalLoopHome(model, ctx);
  }
  if (ctx.family === "taste-directory") {
    const posts = model.recentPosts.map((post, index) => renderTastePostCard(post, index, "answered")).join("");
    const links = model.links.map((link, index) => renderTasteLinkCard(link, index)).join("");
    return renderTasteDirectoryPage(
      ctx,
      ctx.currentPage === "/links"
        ? `${renderTasteSectionHead("Links", stripHtml(model.aboutHtml), `${model.links.length} links`)}<div class="taste-feed">${links}</div>`
        : `<section class="taste-hero"><div class="taste-intro">${model.introHtml}</div></section>${renderTasteFeedHead("Writing", model.recentPosts.length)}<div class="taste-feed">${posts}</div>${renderTasteFeedHead("Links", model.links.length)}<div class="taste-feed">${links}</div>`,
      "Rising",
    );
  }
  if (ctx.family === "writer-ledger") {
    const isLinksPage = ctx.currentPage === "/links";
    const recent = [
      ...model.recentPosts.slice(0, 2).map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`),
      ...model.links.slice(0, 1).map((link) => `<a href="${link.url}">${escapeHtml(link.title)}</a>`),
    ].join(", ");
    const postRows = model.recentPosts.map((post) => renderWriterLedgerRow(post.title, post.href, post.readTime ? `Writing, ${post.readTime}` : "Writing", post.date)).join("");
    const linkRows = model.links.map((link) => renderWriterLedgerRow(link.title, link.url, link.domain, link.date)).join("");
    const essays = `<section class="writer-ledger-work"><h2><span>Writing</span> <span>Medium</span> <span>Date ↓</span></h2><div class="writer-ledger-table">${postRows}</div><p class="writer-ledger-more">( <a href="/blog">all writing</a> )</p></section>`;
    const links = `<section class="writer-ledger-work"><h2><span>Links</span> <span>Source</span> <span>Date ↓</span></h2><div class="writer-ledger-table">${linkRows}</div></section>`;
    if (isLinksPage) {
      return `<section class="writer-ledger">${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-info"><h1>Links</h1><p>${model.aboutHtml}</p></section>${links}</section>`;
    }
    return `<section class="writer-ledger">${renderWriterLedgerHeader(ctx)}${renderWriterLedgerRecent(recent)}<section class="writer-ledger-info">${model.introHtml}</section>${essays}${links}</section>`;
  }

  if (ctx.family === "artist-menu") {
    const isLinksPage = ctx.currentPage === "/links";
    const essays = model.recentPosts.map((post) => renderArtistMenuWork(post.href, post.title, post.date)).join("");
    const links = model.links.map((link) => renderArtistMenuWork(link.url, link.title, link.domain)).join("");
    const linksSection = `<section class="artist-menu-works" aria-labelledby="artist-menu-links-title">
        <h2 id="artist-menu-links-title">Links</h2>
        <div class="works-list works-list-columns">${links}</div>
      </section>`;
    if (isLinksPage) {
      return renderArtistMenuPage(
        ctx,
        `<section class="artist-menu-works artist-menu-index"><h1>Links</h1><p>${model.aboutHtml}</p><div class="works-list works-list-columns">${links}</div></section>`,
      );
    }
    return renderArtistMenuPage(
      ctx,
      `<header class="artist-menu-home">
        <div class="artist-menu-intro">${model.introHtml}</div>
      </header>
      <section class="artist-menu-works" aria-labelledby="artist-menu-works-title">
        <h2 id="artist-menu-works-title">Writing</h2>
        <div class="works-list">${essays}</div>
        <p class="artist-menu-more"><a href="/blog">All writing</a></p>
      </section>
      ${linksSection}`,
    );
  }

  if (ctx.family === "friendly-hub") {
    const writing = model.recentPosts
      .map((post) => renderFriendlyHubEntry(post.href, post.title, post.date, escapeHtml(post.excerpt || post.readTime || "")))
      .join("");
    const linklog = model.links
      .map((link) => renderFriendlyHubEntry(link.url, link.title, `${link.domain}, ${link.date}`, stripHtml(link.contentHtml)))
      .join("");
    if (ctx.currentPage === "/links") {
      return renderFriendlyHubPage(
        ctx,
        `<article class="friendly-hub-intro">
        <h1>🔗 Links</h1>
        <div class="friendly-hub-copy"><p>${model.aboutHtml}</p></div>
        <div class="friendly-hub-list">${linklog}</div>
      </article>`,
      );
    }
    return renderFriendlyHubPage(
      ctx,
      `<article class="friendly-hub-intro">
        <h1>Hi, I’m Ryan! ▲✱▣</h1>
        <div class="friendly-hub-copy">${model.introHtml}</div>
        <h3>✍️ Writing</h3>
        <div class="friendly-hub-list">${writing}</div>
        <p class="friendly-hub-more"><a href="/blog">All writing →</a></p>
        <h3>🔗 Links</h3>
        <div class="friendly-hub-copy"><p>${model.aboutHtml}</p></div>
        <div class="friendly-hub-list">${linklog}</div>
      </article>`,
    );
  }
  if (ctx.family === "games-cabinet") {
    const works = model.links.map((link, index) => renderGamesCabinetWork(link.url, link.title, link.date, link.contentHtml, null, index, true)).join("");
    const writing = model.recentPosts.map((post, index) => renderGamesCabinetWork(post.href, post.title, [post.date, post.readTime].filter(Boolean).join(", "), post.excerpt || "", null, index + model.links.length)).join("");
    const linksShelf = `<section class="games-cabinet-shelf" aria-labelledby="games-cabinet-links-title">
        <h2 id="games-cabinet-links-title">${renderGamesCabinetWavyText("Links")}</h2>
        <p class="games-cabinet-note">${model.aboutHtml}</p>
        <div class="games-cabinet-list">${works}</div>
      </section>`;
    if (ctx.currentPage === "/links") return renderGamesCabinetPage(ctx, linksShelf);
    return renderGamesCabinetPage(
      ctx,
      `<section class="games-cabinet-intro">
        <div class="games-cabinet-deck">${model.introHtml}</div>
      </section>
      <section class="games-cabinet-shelf" aria-labelledby="games-cabinet-work-title">
        <h2 id="games-cabinet-work-title">${renderGamesCabinetWavyText("Writing")}</h2>
        <div class="games-cabinet-list">${writing}</div>
        <p class="games-cabinet-more"><a href="/blog">all writing</a></p>
      </section>
      ${linksShelf}`,
    );
  }
  if (ctx.family === "portal-gallery") {
    const links = model.links.map((link, index) => renderPortalTile(link.url, link.title, link.domain, link.date, stripHtml(link.contentHtml), index, true)).join("");
    const posts = model.recentPosts.map((post, index) => renderPortalTile(post.href, post.title, post.readTime || "writing", post.date, post.excerpt || "", index + 2)).join("");
    if (ctx.currentPage === "/links") {
      return renderPortalPage(ctx, `<header class="portal-section-head"><h1>Links</h1><p>${model.aboutHtml}</p></header><section class="portal-gallery-wall" aria-label="Links">${links}</section>`);
    }
    return renderPortalPage(
      ctx,
      `<header class="portal-landing">
        <div class="portal-intro">${model.introHtml}</div>
      </header>
      <h2 class="portal-wall-title"><a href="/blog">Writing</a></h2>
      <section class="portal-gallery-wall" aria-label="Writing">${posts}</section>
      <h2 class="portal-wall-title"><a href="/links">Links</a></h2>
      <section class="portal-gallery-wall" aria-label="Links">${links}</section>`,
    );
  }
  if (ctx.family === "design-repository") {
    const linkRecords = model.links.map((link, index) => renderDesignRepositoryRecord(index + 1, link.title, link.url, link.domain, link.date, stripHtml(link.contentHtml), null, "Link", true)).join("");
    const postRecords = model.recentPosts.map((post, index) => renderDesignRepositoryRecord(index + 1, post.title, post.href, post.readTime || "", post.date, post.excerpt || "", null, "Writing")).join("");
    if (ctx.currentPage === "/links") {
      return renderDesignRepositoryPage(
        ctx,
        `<header class="design-repository-section-head"><h1>Links</h1><p>${model.aboutHtml}</p><span>${model.links.length} records</span></header>
        <ol class="design-repository-records">${linkRecords}</ol>`,
      );
    }
    return renderDesignRepositoryPage(
      ctx,
      `<h2 class="design-repository-shelf" id="writing"><a href="/blog">§writing</a></h2>
      <ol class="design-repository-records">${postRecords}</ol>
      <h2 class="design-repository-shelf" id="links"><a href="/links">§links</a></h2>
      <section class="design-repository-note">${model.aboutHtml}</section>
      <ol class="design-repository-records">${linkRecords}</ol>`,
      model.introHtml,
    );
  }
  if (ctx.family === "weblog-facets") {
    if (ctx.currentPage === "/links") {
      return renderWeblogFacetsPage(
        ctx,
        `<section class="weblog-facets-index">
          <header class="weblog-facets-section-head"><h1>Links</h1><p>${model.aboutHtml}</p></header>
          <div class="weblog-facets-main">
            <section class="weblog-facets-feed" aria-label="Links">${model.links.map((link) => renderWeblogFacetsLink(link)).join("")}</section>
            ${renderWeblogFacetsSidebar(model.links, [])}
          </div>
        </section>`,
      );
    }
    const entries = [
      ...model.recentPosts.map((post) => renderWeblogFacetsPost(post)),
      ...model.links.slice(0, 10).map((link) => renderWeblogFacetsLink(link)),
    ].join("");
    return renderWeblogFacetsPage(
      ctx,
      `<section class="weblog-facets-home">
        <div class="weblog-facets-intro">${model.introHtml}</div>
        <div class="weblog-facets-main">
          <section class="weblog-facets-feed" aria-label="Recent entries">${entries}<p class="weblog-facets-more"><a href="/links">All ${model.links.length} links</a> · <a href="/blog">All writing</a></p></section>
          ${renderWeblogFacetsSidebar(model.links, [])}
        </div>
      </section>`,
    );
  }
  if (ctx.family === "research-lab") {
    return renderResearchLabHome(model, ctx);
  }
  if (ctx.family === "visual-culture") {
    const archive = model.links.map((link) => renderVisualCultureWork(link.url, link.title, [link.domain, link.date].filter(Boolean).join(", "), indexBatchPlainText(link.contentHtml))).join("");
    const writing = model.recentPosts.map((post) => renderVisualCultureWork(post.href, post.title, post.date, post.readTime || "")).join("");
    return renderVisualCulturePage(
      ctx,
      "Linklog",
      `<div class="visual-culture-intro">${model.introHtml}</div>
      <div class="visual-culture-contact">
        <p>Links:</p>
        ${archive}
      </div>
      <div class="visual-culture-contact">
        <p>Recent writing:</p>
        ${writing}
      </div>`,
      "visual-culture-home",
    );
  }

  if (ctx.family === "room-wall") {
    const links = model.links.map((link) => renderRoomWallWork(link.url, link.title, link.date, link.domain)).join("");
    const posts = model.recentPosts.map((post) => renderRoomWallWork(post.href, post.title, post.date, post.readTime || "")).join("");
    return renderRoomWallPage(
      ctx,
      `<header class="room-wall-statement">
        <div class="room-wall-intro">${model.introHtml}</div>
      </header>
      <section class="room-wall-works" aria-label="Links"><h2>links</h2>${links}</section>
      <section class="room-wall-works" aria-label="Writing"><h2>recent writing</h2>${posts}</section>`,
    );
  }
  if (ctx.family === "book-microsite") {
    const publication = renderBookMicrositeTitlePage(
      ctx,
      model.introHtml,
      `<p>${model.links.length} links and ${model.recentPosts.length} recent writing.</p>`,
    );
    const contents = [
      ...model.links.map((link) => ({ href: link.url, label: link.date, title: link.title })),
      ...model.recentPosts.map((post) => ({ href: post.href, label: post.date, title: post.title })),
    ];
    return renderBookMicrositePage(
      ctx,
      `${publication}${renderBookMicrositeContents(contents)}`,
      "/blog",
    );
  }
  if (ctx.family === "download-index") {
    const rows = [
      ...model.links.map((link, index) => renderDownloadIndexRow(index + 1, link.title, link.url, link.domain, link.date, link.contentHtml)),
      ...model.recentPosts.map((post, index) => renderDownloadIndexRow(model.links.length + index + 1, post.title, post.href, post.readTime || "writing", post.date, post.excerpt || "")),
    ].join("");
    return renderDownloadIndexPage(
      ctx,
      "Ryan Prendergast",
      `<div class="download-index-intro">${model.introHtml}</div>`,
      `<section class="download-index-table" aria-label="Index records">${rows}</section>`,
      `${model.links.length + model.recentPosts.length} records`,
    );
  }
  if (ctx.family === "visual-index") {
    const records = [
      ...model.links.map((link) => ({ href: link.url, title: link.title, date: link.rawDate || link.date, label: link.domain || "Link" })),
      ...model.recentPosts.map((post) => ({ href: post.href, title: post.title, date: post.rawDate || post.date, label: post.readTime || "Writing" })),
    ];
    return renderVisualIndexPage(
      ctx,
      `<section class="visual-index-intro">${model.introHtml}</section>
      ${renderVisualIndexGroupedSection("", records)}`,
    );
  }
  if (ctx.family === "html-bulletin") {
    const updates = [
      ...model.links.map((link) => `<div class="html-bulletin-entry"><p><a href="${link.url}">${escapeHtml(link.title)}</a> <small>${escapeHtml(link.date)}</small></p>${link.contentHtml ? `<div class="html-bulletin-note">${link.contentHtml}</div>` : ""}</div>`),
    ].join("");
    const essays = model.recentPosts
      .map((post) => `<div class="html-bulletin-entry"><p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p></div>`)
      .join("");
    return `<section class="html-bulletin">
      <h2>Ryan Prendergast</h2>
      ${model.introHtml}
      ${renderHtmlBulletinNav(ctx)}
      <p>last update: ${escapeHtml(model.links[0]?.date || model.recentPosts[0]?.date || "")}</p>
      <div class="html-bulletin-note">${model.aboutHtml}</div>
      <h3>bulletin</h3>
      ${updates}
      <h3>recent writing</h3>
      ${essays}
    </section>`;
  }
  if (ctx.family === "consumption-digest") {
    const linkGroups = new Map<string, LinkEntryModel[]>();
    for (const link of model.links) {
      const key = link.date || "undated";
      linkGroups.set(key, [...(linkGroups.get(key) || []), link]);
    }
    const days = Array.from(linkGroups.entries())
      .map(([date, dayLinks]) => renderConsumptionDigestDay(date, [{ label: "links", html: dayLinks.map(renderConsumptionDigestLink).join("") }]))
      .join("");
    if (ctx.currentPage === "/links") return renderConsumptionDigestPage(ctx, days);
    const recentEssays = model.recentPosts.length
      ? renderConsumptionDigestDay("recent writing", [{ label: "text", html: model.recentPosts.map(renderConsumptionDigestPost).join("") }])
      : "";
    return renderConsumptionDigestPage(ctx, `${recentEssays}${days}`, model.introHtml);
  }
  if (ctx.family === "data-portfolio") {
    const records = model.links.map((link, index) => renderDataPortfolioProject(link.url, link.title, link.domain, link.date, link.contentHtml, null, index)).join("");
    if (ctx.currentPage === "/links") {
      return renderDataPortfolioPage(
        ctx,
        `<header class="data-portfolio-section-head"><h1>Links</h1><p>${model.aboutHtml}</p></header>
        <section class="data-portfolio-grid" aria-label="Links">${records}</section>`,
      );
    }
    return renderDataPortfolioPage(
      ctx,
      `<header class="data-portfolio-intro">
        <div>${model.introHtml}</div>
      </header>
      ${renderDataPortfolioViewToggle()}
      ${renderDataPortfolioTicker(model.recentPosts.map((post) => [post.title, post.href]))}
      <section class="data-portfolio-grid" aria-label="Links">${records}</section>`,
    );
  }
  if (ctx.family === "internet-diagram") {
    const nodes = model.links.map((link) => renderInternetDiagramNode(link.url, link.title, `${link.title} (${link.domain})`));
    const isLinks = ctx.currentPage === "/links";
    const indexRows = isLinks
      ? model.links.map((link) => renderInternetDiagramIndexRow(link.url, link.title, `${link.domain} / ${link.date}`)).join("")
      : model.recentPosts.map((post) => renderInternetDiagramIndexRow(post.href, post.title, post.date)).join("");
    return renderInternetDiagramPage(
      ctx,
      `<section class="internet-diagram-home">
        <div class="internet-diagram-side">
          ${isLinks ? "" : `<aside class="internet-diagram-modal internet-diagram-info">
            <div class="internet-diagram-postcard" aria-hidden="true"><span>you are here</span></div>
            <div>${model.introHtml}</div>
          </aside>`}
          <aside class="internet-diagram-index" aria-label="${isLinks ? "Link index" : "Recent writing"}">
            <h3>${isLinks ? "index of links" : "recent writing"}</h3>
            <div>${indexRows}</div>
          </aside>
        </div>
        ${renderInternetDiagramMap(nodes)}
      </section>`,
    );
  }
  if (ctx.family === "vernacular-essay") {
    const links = model.links.map((link, index) => renderVernacularLink(link, index)).join("");
    if (ctx.currentPage === "/links") {
      return renderVernacularPage(ctx, "Links", `<div class="vernacular-about">${model.aboutHtml}</div><hr>${links}`);
    }
    const contents = [`<a href="#links">recent observations</a>`, `<a href="#writing">texts</a>`].join("<br>");
    const posts = model.recentPosts.map((post, index) => renderVernacularPost(post, index + 1)).join("");
    return renderVernacularPage(
      ctx,
      "Ryan Prendergast",
      `<table class="vernacular-front" cellspacing="0" cellpadding="0"><tbody><tr><td class="vernacular-title-cell">${model.introHtml}</td><td class="vernacular-contents">${contents}</td></tr></tbody></table>
      <hr>
      <div class="vernacular-about">${model.aboutHtml}</div>
      <h2 id="links">recent observations</h2>
      ${links}
      <h2 id="writing">texts</h2>
      ${posts}
      <p><a href="/blog">all writing</a></p>`,
    );
  }
  if (ctx.family === "cheap-manifesto") {
    const recent = model.recentPosts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></li>`).join("");
    const seenDomains = new Set<string>();
    const explore = model.links
      .filter((link) => link.domain && !seenDomains.has(link.domain) && Boolean(seenDomains.add(link.domain)))
      .map((link) => `<li><a href="${link.url}">${escapeHtml(link.domain)}</a></li>`)
      .join("");
    const sidebar = `<h3>✧ Explore</h3><ul>${explore}</ul><h3>✧ Read</h3><ul>${model.recentPosts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title.toLowerCase())}</a></li>`).join("")}</ul>`;
    if (ctx.currentPage === "/links") {
      return renderCheapManifestoPage(ctx, "Links", `<div class="cheap-manifesto-list">${links}</div>`, `<p>${model.aboutHtml}</p>`, sidebar);
    }
    return renderCheapManifestoPage(
      ctx,
      "Ryan Prendergast",
      `<h2 id="links">links ≠ feed</h2>
      <div class="cheap-manifesto-list">${links}</div>
      <h2 id="writing">writing ≠ content</h2>
      <ul>${recent}</ul>`,
      model.introHtml,
      sidebar,
    );
  }
  if (ctx.family === "poetic-article") {
    const recent = model.recentPosts.map(renderPoeticPost).join("");
    if (ctx.currentPage === "/links") {
      return renderPoeticArticlePage(ctx, "Links", `<p class="poetic-lede">${model.aboutHtml}</p><section class="poetic-section">${model.links.map(renderPoeticLink).join("")}</section>`);
    }
    return renderPoeticArticlePage(
      ctx,
      "Ryan Prendergast",
      `<div class="poetic-intro">${model.introHtml}</div>
      <section class="poetic-section"><h2>Links</h2>${model.links.map(renderPoeticLink).join("")}</section>
      <section class="poetic-section"><h2>Recent Writing</h2>${recent}</section>`,
    );
  }
  if (ctx.family === "feral-essay") {
    if (ctx.currentPage === "/links") {
      return renderFeralPage(
        ctx,
        "Links",
        `<p class="feral-lede">${model.aboutHtml}</p>
        <section class="feral-section">${model.links.map(renderFeralLink).join("")}</section>`,
        "Linklog",
        `<p class="feral-byline">${model.links.length} links</p>`,
      );
    }
    return renderFeralPage(
      ctx,
      "",
      `<div class="feral-lede feral-home-lede">${model.introHtml}</div>
      <section class="feral-section"><h2><a href="/blog">Recent writing</a></h2>${model.recentPosts.map(renderFeralPost).join("")}</section>
      <section class="feral-section"><h2><a href="/links">Links</a></h2>${model.links.map(renderFeralLink).join("")}</section>`,
      "",
    );
  }
  if (ctx.family === "performance-club") {
    const linkRows = model.links.map(renderPerformanceClubLinkRow).join("");
    const postRows = model.recentPosts.map((post, index) => renderPerformanceClubPostRow(post, "", index)).join("");
    const linkTable = renderPerformanceClubTable(["#", "site", "entry", "date"], linkRows, "Links");
    if (ctx.currentPage === "/links") {
      return renderPerformanceClubPage(
        ctx,
        `${renderPerformanceClubBlock("Links", `<p class="performance-club-lede">${model.aboutHtml}</p><p class="performance-club-count">${model.links.length} entries.</p>`, "performance-club-manifesto")}
        ${renderPerformanceClubBlock("All links", linkTable)}`,
      );
    }
    return renderPerformanceClubPage(
      ctx,
      `<section class="performance-club-hero">
        <div class="performance-club-intro">${model.introHtml}</div>
      </section>
      ${renderPerformanceClubBlock("Recent writing", renderPerformanceClubTable(["#", "entry", "date"], postRows, "Recent writing"))}
      ${renderPerformanceClubBlock("Links", linkTable)}`,
    );
  }
  if (ctx.family === "recurse-joy") {
    const linkFeed = model.links
      .map((link) => renderRecurseJoyEntry(link.url, link.title, link.date, link.domain, link.contentHtml))
      .join("");
    const writing = model.recentPosts
      .map((post) => renderRecurseJoyEntry(post.href, post.title, post.date, post.readTime || "", escapeHtml(post.excerpt || "")))
      .join("");
    if (ctx.currentPage === "/links") {
      return renderRecurseJoyPage(
        ctx,
        `<header class="recurse-joy-page-head"><h2>Links</h2><p>${model.aboutHtml}</p><p><a href="/rss.xml">RSS feed</a> · ${model.links.length} links</p></header>
        <div class="recurse-joy-stream">${linkFeed}</div>`,
      );
    }
    return renderRecurseJoyPage(
      ctx,
      `<section class="recurse-joy-intro">${model.introHtml}</section>
      <div class="recurse-joy-feed-head">
        <h2><a href="/blog">Recent writing</a></h2>
        <a href="/rss.xml">RSS feed</a>
      </div>
      <div class="recurse-joy-stream">${writing}</div>
      <div class="recurse-joy-feed-head">
        <h2><a href="/links">Links</a></h2>
      </div>
      <div class="recurse-joy-stream">${linkFeed}</div>`,
    );
  }
  if (ctx.family === "forecast-report") {
    const linkEntries = model.links.map((link, index) => renderForecastReportEntry(link.url, link.title, `${link.domain} / ${link.date}`, link.contentHtml, index)).join("");
    const writing = model.recentPosts
      .map((post, index) => renderForecastReportEntry(post.href, post.title, post.date, post.excerpt ? escapeHtml(post.excerpt) : post.readTime || "", index))
      .join("");
    if (ctx.currentPage === "/links") {
      return renderForecastReportPage(ctx, "Links", `<section class="forecast-report-panel">${linkEntries}</section>`, {
        meta: `${model.links.length} links`,
        subtitleHtml: `<p>${model.aboutHtml}</p>`,
      });
    }
    return renderForecastReportPage(
      ctx,
      "Ryan Prendergast",
      `<section class="forecast-report-panel" id="writing"><h2><a href="/blog">Recent writing</a></h2>${writing}</section>
      <section class="forecast-report-panel" id="links"><h2><a href="/links">Links</a></h2>${linkEntries}</section>`,
      {
        subtitleHtml: model.introHtml,
        tocHtml: `<a href="#writing">Recent writing</a><a href="#links">Links</a>`,
      },
    );
  }
  if (ctx.family === "forum-frontpage") {
    return renderForumFrontpageHome(model, ctx);
  }
  if (ctx.family === "essay-blogroll") {
    const recentPosts = model.recentPosts.map(renderEssayBlogrollSummary).join("");
    const linkPosts = model.links.map((link) => renderEssayBlogrollEntry(link.url, link.title, `${link.date} · ${link.domain}`, link.contentHtml)).join("");
    const sidebar = renderEssayBlogrollHomeSidebar(model.links, model.recentPosts);
    if (ctx.currentPage === "/links") {
      return renderEssayBlogrollPage(
        ctx,
        `<section class="essay-blogroll-posts">
          <article class="essay-blogroll-entry essay-blogroll-pagehead"><h2>Links</h2><p>${model.aboutHtml}</p><p class="essay-blogroll-meta">${model.links.length} links</p></article>
          ${linkPosts}
        </section>`,
        sidebar,
      );
    }
    return renderEssayBlogrollPage(
      ctx,
      `<section class="essay-blogroll-posts">
        <article class="essay-blogroll-entry essay-blogroll-home">
          <div class="essay-blogroll-copy">${model.introHtml}</div>
        </article>
        <h3 class="essay-blogroll-section-title"><a href="/blog">Recent Writing</a></h3>
        ${recentPosts}
        <h3 class="essay-blogroll-section-title"><a href="/links">Links</a></h3>
        ${linkPosts}
      </section>`,
      sidebar,
    );
  }
  if (ctx.family === "now-directory") {
    const isLinks = ctx.currentPage === "/links";
    const linkList = `<ul>${model.links.map((link) => `<li><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><small>${escapeHtml(link.domain)} / ${escapeHtml(link.date)}</small><div>${link.contentHtml}</div></li>`).join("")}</ul>`;
    if (isLinks) {
      return renderNowDirectoryPage(ctx, `<article><h2>Links</h2><p>${model.aboutHtml}</p>${linkList}</article>`);
    }
    return renderNowDirectoryPage(
      ctx,
      `<article>
        <div class="now-directory-lead">${model.introHtml}</div>
        <h2>Recent Writing</h2>
        <ul>${model.recentPosts.map((post) => `<li><h3><a href="${post.href}">${escapeHtml(post.title)}</a></h3><small>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</small>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul>
        <p><a href="/blog">All writing</a></p>
        <h2>Links</h2>
        ${linkList}
      </article>`,
    );
  }
  if (ctx.family === "conversational-minimal") {
    const isLinks = ctx.currentPage === "/links";
    const linkList = `<dl class="conversational-minimal-projects">${model.links.map((link) => `<dt><a href="${link.url}">${escapeHtml(link.title)}</a> <span>${escapeHtml(link.domain)}</span></dt><dd>${link.contentHtml}</dd>`).join("")}</dl>`;
    if (isLinks) {
      return renderConversationalMinimalPage(ctx, `<section><h2>links</h2><p>${model.aboutHtml}</p>${linkList}</section>`);
    }
    return renderConversationalMinimalPage(
      ctx,
      `<section>
        <h2>me in 10 seconds</h2>
        <div class="conversational-minimal-copy">${model.introHtml}</div>
      </section>
      <section>
        <h2>newest articles</h2>
        <ul class="conversational-minimal-list">${model.recentPosts.map((post) => `<li>${post.date ? `<time>${escapeHtml(post.date)}</time> ` : ""}<a href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul>
        <p>... and <a href="/blog">more here</a>.</p>
      </section>
      <section>
        <h2>links</h2>
        <p>${model.aboutHtml}</p>
        ${linkList}
      </section>`,
    );
  }
  if (ctx.family === "founder-index") {
    const isLinks = ctx.currentPage === "/links";
    const linkList = `<ul>${model.links.map((link) => renderFounderIndexLink(link)).join("")}</ul>`;
    if (isLinks) {
      return renderFounderIndexPage(ctx, `<article class="founder-index-article"><h2>Links</h2><p>${model.aboutHtml}</p>${linkList}</article>`);
    }
    return renderFounderIndexPage(
      ctx,
      `<section class="founder-index-home">
        <div class="founder-index-intro">${model.introHtml}</div>
        <div class="founder-index-columns">
          <section>
            <h2><a href="/blog">Writing</a></h2>
            <ul>${model.recentPosts.map((post) => renderFounderIndexPost(post)).join("")}</ul>
          </section>
          <section>
            <h2><a href="/links">Links</a></h2>
            ${linkList}
          </section>
        </div>
      </section>`,
    );
  }
  if (ctx.family === "grant-page") {
    const isLinks = ctx.currentPage === "/links";
    const linkSection = `<section class="grant-section">
        <h2>Links</h2>
        ${isLinks ? `<p>${model.aboutHtml}</p>` : ""}
        <ul>${model.links.map((link) => renderGrantLinkItem(link)).join("")}</ul>
      </section>`;
    if (isLinks) {
      return renderGrantPage(ctx, linkSection);
    }
    return renderGrantPage(
      ctx,
      `<section class="grant-section">
        <h2>Recent Writing</h2>
        <ul>${model.recentPosts.map((post) => renderGrantPostItem(post)).join("")}</ul>
      </section>
      ${renderGrantRule()}
      ${linkSection}`,
      `<div class="grant-hero">${model.introHtml}</div>`,
    );
  }

  if (ctx.family === "hn") {
    return `<section class="hn-feed"><div class="hn-intro">${homeHeader}</div><table><tbody>${model.links
      .map((link, index) => `<tr><td class="rank">${index + 1}.</td><td><a href="${link.url}">${escapeHtml(link.title)}</a><span class="sitebit"> (${escapeHtml(link.domain)})</span><div class="subtext">${escapeHtml(link.date)} | ${stripHtml(link.contentHtml)}</div></td></tr>`)
      .join("")}</tbody></table><div class="hn-recent"><strong>Recent Writing</strong>${posts}</div></section>`;
  }

  if (ctx.family === "desktop") {
    return `<section class="desktop-window is-main"><div class="window-title">Linklog</div><div class="window-body">${homeHeader}<div class="file-grid">${links}</div></div></section><section class="desktop-window"><div class="window-title">Recent Writing</div><div class="window-body">${posts}</div></section>`;
  }

  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<section class="terminal-output"><p class="prompt">$ cat about.txt</p>${homeHeader}<p class="prompt">$ tail -n ${model.links.length} links.log</p>${links}<p class="prompt">$ ls recent-writing</p>${posts}</section>`;
  }

  if (ctx.family === "wiki") {
    return `<article class="wiki-article"><aside class="wiki-toc"><a href="#about">About</a><a href="#links">Links</a><a href="#posts">Recent posts</a></aside><section id="about">${homeHeader}</section><h2 id="links">External links</h2>${links}<h2 id="posts">Recent posts</h2>${posts}</article>`;
  }

  // Default theme: links live on their own page, the home page is the bio alone.
  if (ctx.currentPage === "/links") return `<p class="links-description">Sometimes, I save the link of an interesting institution, project, company, essay, or other website on the internet that I recommend.</p><section class="theme-link-list">${links}</section>`;
  return `<section class="theme-home-intro">${model.introHtml}</section>`;
}

function renderBlogIndex(model: BlogIndexModel, ctx: RenderContext): string {
  if (ctx.currentPage === "/photos" && ctx.theme.slug === "original") {
    const items = model.postsByYear
      .flatMap((group) => group.posts)
      .map((post) => `<a class="photo-collection" href="${post.href}">${post.image ? `<img src="${escapeHtml(post.image)}" alt="" loading="lazy">` : ""}<span class="photo-collection-text"><span class="photo-collection-title">${escapeHtml(post.title)}</span>${post.excerpt ? `<span class="photo-collection-premise">${escapeHtml(post.excerpt)}</span>` : ""}</span></a>`)
      .join("");
    return `<section class="photo-collections">${items}</section>`;
  }
  const groups = model.postsByYear
    .map((group) => `<section class="theme-year-group"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderPostSummary(post, index, ctx)).join("")}</section>`)
    .join("");
  if (ctx.family === "spartan") {
    return `<table class="pg-home pg-essay-list" border="0" cellspacing="0" cellpadding="0" width="410"><tbody><tr><td><h2>Writing</h2>${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a><br><font size="1" color="#666666">${escapeHtml(post.date)}</font></p>`)).join("")}</td></tr></tbody></table>`;
  }
  if (ctx.family === "manual") {
    return b1ManualBlog(model, ctx);
  }
  if (ctx.family === "essay-blogroll") {
    const posts = model.postsByYear
      .map((group) => `<section class="essay-blogroll-year" id="year-${escapeHtml(group.year)}"><h3>${escapeHtml(group.year)}</h3>${group.posts.map(renderEssayBlogrollSummary).join("")}</section>`)
      .join("");
    return renderEssayBlogrollPage(
      ctx,
      `<section class="essay-blogroll-posts"><article class="essay-blogroll-entry essay-blogroll-pagehead"><h2>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h2><p>${escapeHtml(model.description)}</p><p class="essay-blogroll-meta">${model.totalPosts} entries${model.yearRange ? `, ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}</p></article>${posts}</section>`,
      renderEssayBlogrollSidebar([["Archives", model.postsByYear.map((group) => [`#year-${group.year}`, `${group.year} (${group.posts.length})`] as [string, string])]]),
    );
  }
  if (ctx.family === "now-directory") {
    const entries = model.postsByYear
      .map((group) => `<h2>${escapeHtml(group.year)}</h2><ul>${group.posts.map((post) => `<li><h3><a href="${post.href}">${escapeHtml(post.title)}</a></h3><small>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</small>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul>`)
      .join("");
    return renderNowDirectoryPage(ctx, `<article><h2>Writing</h2><p>${escapeHtml(model.description)}</p><p>${model.totalPosts} entries${model.yearRange ? ` from ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}. <a href="/archives">Browse by month</a>.</p>${entries}</article>`);
  }
  if (ctx.family === "conversational-minimal") {
    const groups = model.postsByYear
      .map((group) => `<section><h2>${escapeHtml(group.year)}</h2><ul class="conversational-minimal-list">${group.posts.map((post) => `<li>${post.date ? `<time>${escapeHtml(post.date)}</time> ` : ""}<a href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul></section>`)
      .join("");
    return renderConversationalMinimalPage(ctx, `<h2>articles</h2><p>${escapeHtml(model.description)}</p><p>${model.totalPosts} entries${model.yearRange ? ` from ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}. <a href="/archives">Browse by month</a>.</p>${groups}`);
  }
  if (ctx.family === "founder-index") {
    const groups = model.postsByYear
      .map((group) => `<section class="founder-index-year"><h2>${escapeHtml(group.year)}</h2><ul>${group.posts.map((post) => renderFounderIndexPost(post)).join("")}</ul></section>`)
      .join("");
    return renderFounderIndexPage(ctx, `<article class="founder-index-article"><h2>Writing</h2><p>${escapeHtml(model.description)}</p><p>${model.totalPosts} entries${model.yearRange ? ` from ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}. <a href="/archives">Browse by month</a>.</p>${groups}</article>`);
  }
  if (ctx.family === "grant-page") {
    const groups = model.postsByYear
      .map((group) => `<section class="grant-section"><h2>${escapeHtml(group.year)}</h2><ul>${group.posts.map((post) => renderGrantPostItem(post)).join("")}</ul></section>`)
      .join(renderGrantRule());
    return renderGrantPage(ctx, `<article class="grant-article"><h2>Writing</h2><p>${escapeHtml(model.description)}</p><p>${model.totalPosts} entries${model.yearRange ? ` from ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}. <a href="/archives">Browse by month</a>.</p></article>${renderGrantRule()}${groups}`);
  }
  if (ctx.family === "no-css") {
    return `<section>
      <h2>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h2>
      <p>${escapeHtml(model.description)}</p>
      ${model.postsByYear.map((group) => `<h3>${escapeHtml(group.year)}</h3><ul>${group.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</small>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`).join("")}</ul>`).join("")}
    </section>`;
  }
  if (ctx.family === "scoreboard") {
    return b1ScoreboardBlog(model, ctx);
  }
  if ((ctx.family as string) === "research-tools") {
    return b1ResearchToolsBlog(model, ctx);
  }
  if (ctx.family === "archive-index") {
    return b1ArchiveIndexBlog(model, ctx);
  }
  if (ctx.family === "art-index") {
    return `<section class="art-index">${renderArtIndexHeader(ctx)}<h2>selected text</h2><div class="art-index-chronology">${model.postsByYear.map((group) => `<div class="art-index-year">${escapeHtml(group.year)}</div>${group.posts.map((post) => renderArtIndexRow(group.year, post.href, post.title, [post.date, post.readTime].filter(Boolean).join(" - "))).join("")}`).join("")}</div>${renderArtIndexFooter(`<p>${escapeHtml(model.description)}</p>`)}</section>`;
  }
  if (ctx.family === "research-sidenotes") {
    return renderResearchSidenotePage(
      ctx,
      "Writing",
      `<section class="research-abstract"><p>${escapeHtml(model.description)}</p></section>${model.postsByYear
        .map((group) => `<section class="research-section"><h2 id="${slugify(group.year)}"><a href="#${slugify(group.year)}">${escapeHtml(group.year)}</a></h2><ul>${group.posts.map((post) => renderResearchSidenoteListItem(post.href, post.title, post.date, post.readTime || "")).join("")}</ul></section>`)
        .join("")}`,
      `<p>${model.totalPosts} pieces</p>${model.yearRange ? `<p>${model.yearRange[0]}-${model.yearRange[1]}</p>` : ""}`,
    );
  }
  if (ctx.family === "wordmark-studio" || ctx.family === "studio-index") {
    if (ctx.family === "wordmark-studio") {
      return b1WordmarkBlog(model, ctx);
    }
    const studyRows = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ ...post, year: group.year })));
    const posts = studyRows.map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.year, index)).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, model.description, "Studies")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Writing", "Notes", "Archive"])}<div class="studio-index-content"><div class="studio-index-list studio-index-list-large">${posts}</div></div></div></section>`;
  }
  if (ctx.family === "builder-notes" || ctx.family === "garden-notebook") {
    if (ctx.family === "builder-notes") {
      return b1BuilderBlog(model, ctx);
    }
    return renderGardenPage(ctx, `<h1>Writing</h1><p>${escapeHtml(model.description)}</p>${model.postsByYear.map((group) => `<section class="garden-year"><h2>${escapeHtml(group.year)}</h2>${renderGardenPostList(group.posts)}</section>`).join("")}`);
  }
  if (ctx.family === "research-tools" || ctx.family === "artist-ledger") {
    if (ctx.family === "artist-ledger") {
      return `<section class="artist-ledger">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>Writing</h2><div class="artist-ledger-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => renderArtistLedgerRow(post.date, post.href, post.title, group.year, post.readTime || ""))).join("")}</div></section></section>`;
    }
    return `<section class="${ctx.family}"><h2>Publications</h2><div class="ledger-list">${model.postsByYear.flatMap((group) => group.posts.map((post) => `<p><time>${escapeHtml(post.date)}</time> <a href="${post.href}">${escapeHtml(post.title)}</a></p>`)).join("")}</div></section>`;
  }
  if (ctx.family === "art-library") {
    return b1ArtLibraryBlog(model, ctx);
  }
  if (ctx.family === "cargo-cv") {
    const items = model.postsByYear.flatMap((group) => group.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a> <span>${escapeHtml(post.date)}</span>`));
    return renderCargoCvPage(ctx, "Writing", `<h2>Writing:</h2>${renderCargoCvList(items)}<p class="cargo-cv-note">${escapeHtml(model.description)}</p>`);
  }
  if (["fragment-journal", "writer-ledger", "experimental-loop"].includes(ctx.family)) {
    if (ctx.family === "fragment-journal") {
      return renderFragmentPage(
        ctx,
        `<header class="fragment-page-head"><h1>writing</h1><p>${escapeHtml(model.description)}</p></header>${model.postsByYear.map((group) => `<section class="fragment-year"><h2>${escapeHtml(group.year)}</h2>${renderFragmentPostList(group.posts)}</section>`).join("")}`,
      );
    }
    if (ctx.family === "experimental-loop") {
      const entries = model.postsByYear.flatMap((group) => group.posts.map((post) => renderExperimentalLoopUnit(post.href, post.title, "writing", post.readTime || "", post.date, post.excerpt || ""))).join("");
      return renderExperimentalLoopPage(ctx, `<header class="experimental-loop-section-head"><h1>${escapeHtml(ctx.pageSubtitle || "Writing")}</h1><p>${escapeHtml(model.description)}</p></header><h2 class="experimental-loop-contents">Contents ↓</h2><div class="experimental-loop-units">${entries}</div>`);
    }
    return `<section class="writer-ledger">${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-info"><h1>Writing</h1><p>${escapeHtml(model.description)}</p></section><section class="writer-ledger-work"><h2><span>Title</span> <span>Medium</span> <span>Date ↓</span></h2><div class="writer-ledger-table">${model.postsByYear.flatMap((group) => group.posts.map((post) => renderWriterLedgerRow(post.title, post.href, post.readTime ? `Writing, ${post.readTime}` : "Writing", post.date || group.year))).join("")}</div></section></section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return renderUcozPage(
      ctx,
      ctx.pageSubtitle || "Writing",
      `<div class="ucoz-section-title">${escapeHtml(ctx.pageSubtitle || "Writing")}</div>${model.postsByYear
        .flatMap((group) => group.posts.map((post, index) => renderUcozFileEntry(post.title, post.href, group.year, post.date, post.excerpt || post.readTime || "", index + 1)))
        .join("")}`,
      [["Home", "/"], [ctx.pageSubtitle || "Writing", ctx.currentPage]],
      renderUcozStats(`${model.totalPosts} posts`, `${model.postsByYear.length} years`),
    );
  }
  if (ctx.family === "uncertainty") {
    return renderUncertaintyPage(
      ctx,
      ctx.pageSubtitle || "Writing",
      `<p>${escapeHtml(model.description)}</p>`,
      model.postsByYear
        .map((group) => `<section class="uncertainty-group"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post) => renderUncertaintyLine(post.title, post.href, post.readTime || "Text", post.date)).join("")}</section>`)
        .join(""),
    );
  }
  if (ctx.family === "briefing") {
    return renderBriefingIndex(model, ctx);
  }
  if (ctx.family === "bookmaker-card") {
    const rows = model.postsByYear
      .flatMap((group) => group.posts.map((post) => renderBookmakerWorkRow(post.href, post.title, group.year, post.date, post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : "")))
      .join("");
    return renderBookmakerPage(ctx, `<section class="bookmaker-selected"><h1>${escapeHtml(ctx.pageSubtitle || "Writing")}:</h1>${rows}</section>`);
  }
  if (ctx.family === "taste-directory") {
    const posts = model.postsByYear.flatMap((group) => group.posts.map((post, index) => renderTastePostCard(post, index, group.year))).join("");
    return renderTasteDirectoryPage(ctx, `${renderTasteSectionHead(ctx.pageSubtitle || "Writing", model.description, `${model.totalPosts} posts`)}<div class="taste-feed">${posts}</div>`, "Browse");
  }
  if (ctx.family === "design-repository") {
    const records = model.postsByYear
      .flatMap((group) => group.posts.map((post, index) => renderDesignRepositoryRecord(index + 1, post.title, post.href, post.readTime || "", post.date || group.year, post.excerpt || "", null, "Writing", false, index === 0 ? `y-${slugify(group.year)}` : "")))
      .join("");
    const years = model.postsByYear.map((group) => `<a href="#y-${slugify(group.year)}">§${escapeHtml(group.year)}</a>`).join("");
    return renderDesignRepositoryPage(
      ctx,
      `<header class="design-repository-section-head"><h1>Writing</h1><p>${escapeHtml(model.description)}</p><span>${model.totalPosts} records</span></header><nav class="design-repository-availability" aria-label="Years">${years}</nav><ol class="design-repository-records">${records}</ol>`,
    );
  }
  if (ctx.family === "artist-menu") {
    const works = model.postsByYear
      .flatMap((group) => group.posts.map((post) => renderArtistMenuWork(post.href, post.title, post.date || group.year)))
      .join("");
    return renderArtistMenuPage(ctx, `<section class="artist-menu-works artist-menu-index"><h1>Writing</h1><p>${escapeHtml(model.description)}</p><div class="works-list">${works}</div></section>`);
  }
  if (ctx.family === "friendly-hub") {
    const groups = model.postsByYear
      .map((group) => `<section class="friendly-hub-year"><h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => renderFriendlyHubEntry(post.href, post.title, post.date, escapeHtml(post.excerpt || post.readTime || ""))).join("")}</section>`)
      .join("");
    return renderFriendlyHubPage(ctx, `<article><h1>✍️ Writing</h1><p>${escapeHtml(model.description)}</p>${groups}</article>`);
  }
  if (ctx.family === "games-cabinet") {
    const entries = model.postsByYear.flatMap((group, groupIndex) => group.posts.map((post, postIndex) => renderGamesCabinetWork(post.href, post.title, [post.date || group.year, post.readTime].filter(Boolean).join(", "), post.excerpt || "", null, groupIndex + postIndex))).join("");
    return renderGamesCabinetPage(ctx, `<section class="games-cabinet-page-head"><h1>${renderGamesCabinetWavyText("Writing")}</h1><p>${escapeHtml(model.description)}</p></section><div class="games-cabinet-list">${entries}</div>`);
  }
  if (ctx.family === "portal-gallery") {
    const entries = model.postsByYear
      .flatMap((group, groupIndex) => group.posts.map((post, postIndex) => renderPortalTile(post.href, post.title, post.readTime || "", post.date || group.year, post.excerpt || "", groupIndex + postIndex)))
      .join("");
    return renderPortalPage(ctx, `<header class="portal-section-head"><h1>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h1><p>${escapeHtml(model.description)}</p></header><section class="portal-gallery-wall">${entries}</section>`);
  }
  if (ctx.family === "research-lab") {
    return renderResearchLabIndex(model, ctx);
  }
  if (ctx.family === "visual-culture") {
    const posts = model.postsByYear
      .flatMap((group) => group.posts.map((post) => renderVisualCultureWork(post.href, post.title, post.date, post.readTime || "")))
      .join("");
    return renderVisualCulturePage(
      ctx,
      ctx.currentPage === "/photos" ? "Photography" : "Writing",
      `<div class="visual-culture-intro"><p>${escapeHtml(model.description)}</p></div><div class="visual-culture-contact">${posts}</div>`,
      "visual-culture-index",
    );
  }
  if (ctx.family === "room-wall") {
    const posts = model.postsByYear
      .flatMap((group) => group.posts.map((post) => renderRoomWallWork(post.href, post.title, post.date, post.readTime || "")))
      .join("");
    return renderRoomWallPage(ctx, `<h1>${ctx.currentPage === "/photos" ? "photography" : "writing"}</h1><p>${escapeHtml(model.description)}</p><section class="room-wall-works">${posts}</section>`);
  }
  if (ctx.family === "html-bulletin") {
    const groups = model.postsByYear
      .map((group) => `<h4>${escapeHtml(group.year)}</h4>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? `<br><small>${escapeHtml(post.date)}</small>` : ""}</p>`).join("")}`)
      .join("");
    return renderHtmlBulletinPage(ctx, ctx.currentPage === "/photos" ? "photography" : "writing", `<p>${escapeHtml(model.description)}</p>${groups}`);
  }
  if (ctx.family === "consumption-digest") {
    const days = model.postsByYear
      .map((group) => renderConsumptionDigestDay(group.year, [{ label: "text", html: group.posts.map(renderConsumptionDigestPost).join("") }]))
      .join("");
    return renderConsumptionDigestPage(ctx, days, `<p>${escapeHtml(model.description)}</p>`);
  }
  if (ctx.family === "vernacular-essay") {
    const rows = model.postsByYear
      .map((group) => `<h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderVernacularPost(post, index + 1)).join("")}`)
      .join("");
    return renderVernacularPage(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p>${escapeHtml(model.description)}</p><hr>${rows}`);
  }
  if (ctx.family === "cheap-manifesto") {
    const groups = model.postsByYear
      .map((group) => `<h2>${escapeHtml(group.year)}</h2><ul>${group.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <small>${escapeHtml(post.date)}</small>` : ""}${post.excerpt ? `<br><span>${escapeHtml(post.excerpt)}</span>` : ""}</li>`).join("")}</ul>`)
      .join("");
    return renderCheapManifestoPage(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p>${escapeHtml(model.description)}</p>${groups}`);
  }
  if (ctx.family === "poetic-article") {
    const groups = model.postsByYear
      .map((group) => `<section class="poetic-section"><h2>${escapeHtml(group.year)}</h2>${group.posts.map(renderPoeticPost).join("")}</section>`)
      .join("");
    return renderPoeticArticlePage(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p class="poetic-lede">${escapeHtml(model.description)}</p>${groups}`);
  }
  if (ctx.family === "feral-essay") {
    const groups = model.postsByYear
      .map((group) => `<section class="feral-section"><h2>${escapeHtml(group.year)}</h2>${group.posts.map(renderFeralPost).join("")}</section>`)
      .join("");
    return renderFeralPage(ctx, "Writing", `<p class="feral-lede">${escapeHtml(model.description)}</p>${groups}`, "Archive", `<p class="feral-byline">${model.totalPosts} posts</p>`);
  }
  if (ctx.family === "performance-club") {
    let rowIndex = 0;
    const rows = model.postsByYear
      .flatMap((group) => group.posts.map((post) => renderPerformanceClubPostRow(post, group.year, rowIndex++)))
      .join("");
    return renderPerformanceClubPage(
      ctx,
      `${renderPerformanceClubBlock(ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p class="performance-club-lede">${escapeHtml(model.description)}</p><p class="performance-club-count">${model.totalPosts} entries${model.yearRange ? ` from ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}.</p>`, "performance-club-manifesto")}
      ${renderPerformanceClubBlock("All entries", renderPerformanceClubTable(["#", "year", "entry", "date"], rows, "Writing"))}`,
    );
  }
  if (ctx.family === "recurse-joy") {
    const entries = model.postsByYear
      .map((group) => `<section class="recurse-joy-year"><h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => renderRecurseJoyEntry(post.href, post.title, post.date, post.readTime || "", escapeHtml(post.excerpt || ""))).join("")}</section>`)
      .join("");
    return renderRecurseJoyPage(
      ctx,
      `<header class="recurse-joy-page-head"><h2>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h2><p>${escapeHtml(model.description)}</p><p><a href="/rss.xml">RSS feed</a> · ${model.totalPosts} posts${model.yearRange ? `, ${model.yearRange[0]}-${model.yearRange[1]}` : ""}</p></header>${entries}`,
      "Writing",
    );
  }
  if (ctx.family === "forecast-report") {
    const entries = model.postsByYear
      .map((group) => `<section class="forecast-report-panel" id="year-${escapeHtml(group.year)}"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderForecastReportEntry(post.href, post.title, post.date, post.excerpt ? escapeHtml(post.excerpt) : post.readTime || "", index)).join("")}</section>`)
      .join("");
    return renderForecastReportPage(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", entries, {
      meta: `${model.totalPosts} entries${model.yearRange ? `, ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}`,
      subtitleHtml: `<p>${escapeHtml(model.description)}</p>`,
      tocHtml: model.postsByYear.map((group) => `<a href="#year-${escapeHtml(group.year)}">${escapeHtml(group.year)}</a>`).join(""),
    });
  }
  if (ctx.family === "forum-frontpage") {
    const years = model.postsByYear
      .map((group) => `<h2 class="forum-frontpage-heading">${escapeHtml(group.year)}</h2><section class="forum-frontpage-feed">${group.posts.map(renderForumFrontpageSummary).join("")}</section>`)
      .join("");
    return renderForumFrontpageShell(
      ctx,
      `${renderForumFrontpageHead(ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p>${escapeHtml(model.description)}</p><p class="forum-frontpage-meta">${model.totalPosts} entries${model.yearRange ? `, ${model.yearRange[0]} to ${model.yearRange[1]}` : ""}</p>`)}${years}`,
      "Writing",
    );
  }
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture", "room-wall", "book-microsite", "download-index", "visual-index", "html-bulletin", "consumption-digest", "data-portfolio", "internet-diagram", "vernacular-essay", "cheap-manifesto", "poetic-article", "feral-essay", "performance-club", "recurse-joy", "forecast-report", "forum-frontpage", "essay-blogroll", "now-directory", "conversational-minimal", "founder-index", "grant-page"].includes(ctx.family)) {
    if (ctx.family === "book-microsite") {
      const posts = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ href: post.href, label: post.date, title: post.title })));
      return renderBookMicrositePage(
        ctx,
        `${renderBookMicrositeTitlePage(ctx, `<p>${escapeHtml(model.description)}</p>`, `<p>${model.totalPosts} entries${model.yearRange ? `, ${model.yearRange[0]}-${model.yearRange[1]}` : ""}.</p>`, ctx.currentPage === "/photos" ? "Photography" : "Writing")}${renderBookMicrositeContents(posts)}`,
        posts[0]?.href || "/photos",
      );
    }
    if (ctx.family === "weblog-facets") {
      const posts = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ ...post, year: group.year })));
      return renderWeblogFacetsPage(
        ctx,
        `<section class="weblog-facets-index">
          <header class="weblog-facets-section-head"><h1>Writing</h1><p>${escapeHtml(model.description)}</p></header>
          <div class="weblog-facets-main">
            <section class="weblog-facets-feed" aria-label="Posts">${posts.map((post) => renderWeblogFacetsPost(post)).join("")}</section>
            ${renderWeblogFacetsSidebar([], posts)}
          </div>
        </section>`,
      );
    }
    if (ctx.family === "download-index") {
      const rows = model.postsByYear
        .flatMap((group) => group.posts)
        .map((post, index) => renderDownloadIndexRow(index + 1, post.title, post.href, post.readTime || "writing", post.date, post.excerpt || ""))
        .join("");
      return renderDownloadIndexPage(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p>${escapeHtml(model.description)}</p>`, `<section class="download-index-table" aria-label="Writing records">${rows}</section>`, `${model.totalPosts} records`);
    }
    if (ctx.family === "visual-index") {
      const records = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ href: post.href, title: post.title, date: post.rawDate || post.date, label: post.readTime || group.year })));
      return renderVisualIndexPage(
        ctx,
        `<section class="visual-index-intro"><p>${escapeHtml(model.description)}</p></section>
        ${renderVisualIndexGroupedSection("", records)}`,
      );
    }
    if (ctx.family === "internet-diagram") {
      const years = model.postsByYear
        .map((group) => `<h2>${escapeHtml(group.year)}</h2>${group.posts.map((post) => renderInternetDiagramIndexRow(post.href, post.title, [post.date, post.readTime].filter(Boolean).join(" / "))).join("")}`)
        .join("");
      return renderInternetDiagramWindow(ctx, ctx.currentPage === "/photos" ? "Photography" : "Writing", `<p>${escapeHtml(model.description)}</p>${years}`);
    }
    if (ctx.family === "data-portfolio") {
      const records = model.postsByYear
        .flatMap((group) => group.posts.map((post, index) => renderDataPortfolioProject(post.href, post.title, post.readTime || "", post.date, escapeHtml(post.excerpt || ""), null, 1)))
        .join("");
      return renderDataPortfolioPage(
        ctx,
        `<header class="data-portfolio-section-head"><h1>${ctx.currentPage === "/photos" ? "Photography" : "Writing"}</h1><p>${escapeHtml(model.description)}</p></header>
        <section class="data-portfolio-grid" aria-label="Writing">${records}</section>`,
      );
    }
    return `<section class="${ctx.family}"><h2>Index</h2>${model.postsByYear.map((group) => `<section><h3>${escapeHtml(group.year)}</h3>${group.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a> <small>${escapeHtml(post.date)}</small></p>`).join("")}</section>`).join("")}</section>`;
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
    return `<table class="pg-home pg-article" border="0" cellspacing="0" cellpadding="0" width="410"><tbody><tr><td><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2><font size="1" color="#666666">${meta}</font>${model.subtitle ? `<p><i>${escapeHtml(model.subtitle)}</i></p>` : ""}<br>${model.contentHtml}</td></tr></tbody></table>`;
  }
  if (ctx.family === "room-wall") {
    return renderRoomWallPage(
      ctx,
      `<article class="room-wall-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h1>${escapeHtml(model.title)}</h1>
        <p class="room-wall-meta">${meta}</p>
        ${model.subtitle ? `<p><i>${escapeHtml(model.subtitle)}</i></p>` : ""}
        <div class="room-wall-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "friendly-hub") {
    return renderFriendlyHubPage(
      ctx,
      `<article class="friendly-hub-post">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h1>${escapeHtml(model.title)}</h1>
        <p class="friendly-hub-updated">${meta}</p>
        ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        <div class="friendly-hub-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "games-cabinet") {
    return renderGamesCabinetPage(
      ctx,
      `<article class="games-cabinet-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h1>${escapeHtml(model.title)}</h1>
        <p class="games-cabinet-meta">${meta}</p>
        ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        <div class="games-cabinet-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "visual-index") {
    return renderVisualIndexPage(
      ctx,
      `<article class="visual-index-article">
        <p class="visual-index-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <header>
          <h2>${escapeHtml(model.title)}</h2>
          <p>${meta}</p>
          ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        </header>
        <div class="visual-index-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "poetic-article") {
    return renderPoeticArticlePage(
      ctx,
      model.title,
      `${model.subtitle ? `<p class="poetic-lede">${escapeHtml(model.subtitle)}</p>` : ""}
      <div class="poetic-copy blog-post-content">${model.contentHtml}</div>
      <p class="poetic-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`,
      ctx.currentPage === "/photos" ? "photography" : "writing",
      `<p class="poetic-meta">written by ${escapeHtml(model.author || "Ryan Prendergast")}</p><p class="poetic-meta">${escapeHtml(model.date)}</p>`,
    );
  }
  if (ctx.family === "feral-essay") {
    return renderFeralPage(
      ctx,
      model.title,
      `${model.subtitle ? `<p class="feral-lede">${escapeHtml(model.subtitle)}</p>` : ""}
      <div class="feral-copy blog-post-content">${model.contentHtml}</div>
      <p class="feral-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`,
      ctx.currentPage === "/photos" ? "" : "Writing",
      `<p class="feral-date">${escapeHtml(model.date)}</p>`,
    );
  }
  if (ctx.family === "artist-menu") {
    return renderArtistMenuPage(
      ctx,
      `<article class="artist-menu-post">
        <p class="artist-menu-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h1>${escapeHtml(model.title)}</h1>
        <p class="artist-menu-meta">${meta}</p>
        ${model.subtitle ? `<p class="artist-menu-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}
        <div class="blog-post-content">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "manual") {
    return b1ManualPost(model, ctx);
  }
  if (ctx.family === "scoreboard") {
    return b1ScoreboardPost(model, ctx);
  }
  if (ctx.family === "art-index") {
    return `<article class="art-index art-index-record">${renderArtIndexHeader(ctx)}<p class="art-index-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2><p class="art-index-meta">${meta}</p>${model.subtitle ? `<p class="art-index-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<div class="blog-post-content">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "archive-index") {
    return b1ArchiveIndexPost(model, ctx);
  }
  if (ctx.family === "weblog-facets") {
    return renderWeblogFacetsPage(
      ctx,
      `<article class="weblog-facets-article">
        <p class="weblog-facets-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h1>${escapeHtml(model.title)}</h1>
        <p class="weblog-facets-date">${meta}</p>
        ${model.subtitle ? `<p class="weblog-facets-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}
        <div class="blog-post-content weblog-facets-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "research-lab") {
    return renderResearchLabArticle(model, ctx);
  }
  if (ctx.family === "visual-culture") {
    return renderVisualCulturePage(
      ctx,
      model.title,
      `<article class="visual-culture-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <p>${meta}</p>
        ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        <div class="blog-post-content visual-culture-copy">${model.contentHtml}</div>
      </article>`,
      "visual-culture-post",
    );
  }
  if (ctx.family === "html-bulletin") {
    return renderHtmlBulletinPage(
      ctx,
      model.title,
      `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
      <p>${meta}</p>
      ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
      <div class="blog-post-content html-bulletin-copy">${model.contentHtml}</div>`,
    );
  }
  if (ctx.family === "internet-diagram") {
    return renderInternetDiagramWindow(
      ctx,
      model.title,
      `<p class="internet-diagram-meta">${meta} / <a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}<div class="blog-post-content internet-diagram-copy">${model.contentHtml}</div>`,
    );
  }
  if (ctx.family === "consumption-digest") {
    return renderConsumptionDigestPage(
      ctx,
      renderConsumptionDigestDay(model.date, [
        {
          label: "",
          html: `<article class="consumption-digest-article"><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2><p>${meta}</p>${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}<div class="blog-post-content consumption-digest-copy">${model.contentHtml}</div></article>`,
        },
      ]),
    );
  }
  if (ctx.family === "data-portfolio") {
    return renderDataPortfolioPage(
      ctx,
      `<article class="data-portfolio-article">
        <p class="data-portfolio-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <header>
          <p class="data-portfolio-meta">${meta}</p>
          <h1>${escapeHtml(model.title)}</h1>
          ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        </header>
        <div class="blog-post-content data-portfolio-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "vernacular-essay") {
    return renderVernacularPage(
      ctx,
      model.title,
      `<p class="vernacular-meta">${meta}</p>
      <p class="vernacular-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
      ${model.subtitle ? `<p class="vernacular-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}
      <hr>
      <div class="blog-post-content vernacular-body">${model.contentHtml}</div>`,
    );
  }
  if (ctx.family === "cheap-manifesto") {
    return renderCheapManifestoPage(
      ctx,
      model.title,
      `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
      <p>${meta}</p>
      ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
      <div class="blog-post-content cheap-manifesto-copy">${model.contentHtml}</div>`,
    );
  }
  if (ctx.family === "performance-club") {
    return renderPerformanceClubPage(
      ctx,
      `${renderPerformanceClubBlock(model.title, `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><p class="performance-club-count">${escapeHtml(model.date)}</p>${model.subtitle ? `<p class="performance-club-lede">${escapeHtml(model.subtitle)}</p>` : ""}`, "performance-club-manifesto")}
      <article class="blog-post-content performance-club-copy performance-club-article">${model.contentHtml}</article>`,
    );
  }
  if (ctx.family === "recurse-joy") {
    return renderRecurseJoyPage(
      ctx,
      `<article class="recurse-joy-post">
        <p class="recurse-joy-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <header>
          <time>${escapeHtml(model.date)}</time>
          <h2>${escapeHtml(model.title)}</h2>
          ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        </header>
        <div class="blog-post-content recurse-joy-copy">${model.contentHtml}</div>
      </article>`,
      "Writing",
    );
  }
  if (ctx.family === "forecast-report") {
    return renderForecastReportPage(
      ctx,
      model.title,
      `<div class="blog-post-content forecast-report-copy">${model.contentHtml}</div>
      <p class="forecast-report-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`,
      {
        kicker: ctx.currentPage === "/photos" ? "" : "Writing",
        meta: model.date,
        subtitleHtml: model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : "",
      },
    );
  }
  if (ctx.family === "forum-frontpage") {
    return renderForumFrontpageShell(
      ctx,
      `<article class="forum-frontpage-page forum-frontpage-article">
        <h1>${escapeHtml(model.title)}</h1>
        <p class="forum-frontpage-meta">${escapeHtml(model.date)}</p>
        ${model.subtitle ? `<p class="forum-frontpage-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}
        <div class="blog-post-content forum-frontpage-copy">${model.contentHtml}</div>
        <p class="forum-frontpage-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
      </article>`,
      model.title,
    );
  }
  if (ctx.family === "essay-blogroll") {
    return renderEssayBlogrollPage(
      ctx,
      `<article class="essay-blogroll-entry essay-blogroll-article">
        <p class="essay-blogroll-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h2>${escapeHtml(model.title)}</h2>
        <p class="essay-blogroll-meta">${escapeHtml(model.date)}</p>
        ${model.subtitle ? `<p class="essay-blogroll-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}
        <div class="blog-post-content essay-blogroll-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "no-css") {
    // The photo page's markup carries its own title and home link, which only make sense with its stylesheet.
    const plainContent = model.contentHtml.replace(/<a class="raw-back"[^>]*>[\s\S]*?<\/a>/, "").replace(/<h2 class="raw-title"[^>]*>[\s\S]*?<\/h2>/, "");
    return `<article><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2><p>${meta}</p>${plainContent}</article>`;
  }
  if (ctx.family === "research-sidenotes") {
    return renderResearchSidenotePage(
      ctx,
      model.title,
      `<article class="research-article"><p class="research-meta">${escapeHtml(model.date)}</p>${model.subtitle ? `<p class="research-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<div class="blog-post-content research-copy">${model.contentHtml}</div></article>`,
      `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`,
    );
  }
  if (ctx.family === "wordmark-studio") {
    return b1WordmarkPost(model, ctx);
  }
  if (ctx.family === "studio-index") {
    return `<article class="studio-index studio-index-article">${renderStudioIndexHeader(ctx, "", "Studies")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Writing", "Notes", "Archive"])}<div class="studio-index-content"><a class="studio-index-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header class="studio-index-article-head"><h2>${escapeHtml(model.title)}</h2><p>${meta}</p></header><div class="blog-post-content studio-index-copy">${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}${model.contentHtml}</div></div></div></article>`;
  }
  if (ctx.family === "builder-notes") {
    return b1BuilderPost(model, ctx);
  }
  if (ctx.family === "research-tools") {
    return b1ResearchToolsPost(model, ctx);
  }
  if (ctx.family === "art-library") {
    return b1ArtLibraryPost(model, ctx);
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
  if (ctx.family === "garden-notebook") {
    return renderGardenPage(ctx, `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="garden-meta">${meta}</p><div class="blog-post-content garden-copy">${model.contentHtml}</div>`);
  }
  if (ctx.family === "fragment-journal") {
    return renderFragmentPage(
      ctx,
      `<article class="fragment-article"><a class="fragment-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header class="fragment-page-head"><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<time>${meta}</time></header><div class="blog-post-content fragment-copy">${model.contentHtml}</div></article>`,
    );
  }
  if (ctx.family === "ucoz-archive") {
    return renderUcozPage(
      ctx,
      model.title,
      `<article class="ucoz-file-page"><div class="ucoz-file-head"><h2>${escapeHtml(model.title)}</h2><span>${meta}</span></div>${model.subtitle ? `<p class="ucoz-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<div class="blog-post-content ucoz-copy">${model.contentHtml}</div></article>`,
      model.backHref === "/" ? [["Home", "/"], [model.title, ctx.currentPage]] : [["Home", "/"], ["Writing", model.backHref], [model.title, ctx.currentPage]],
      "",
    );
  }
  if (ctx.family === "uncertainty") {
    return renderUncertaintyPage(
      ctx,
      model.title,
      `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<p>${meta}</p>`,
      `<article class="blog-post-content uncertainty-copy">${model.contentHtml}</article>`,
    );
  }
  if (ctx.family === "briefing") {
    return renderBriefingPage(
      ctx,
      `<article class="briefing-article">
        <a class="briefing-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a>
        <header>
          <span>${meta}</span>
          <h1>${escapeHtml(model.title)}</h1>
          ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        </header>
        <div class="blog-post-content briefing-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "bookmaker-card") {
    return renderBookmakerPage(
      ctx,
      `<article class="bookmaker-article"><a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="bookmaker-meta">${meta}</p><div class="blog-post-content bookmaker-copy">${model.contentHtml}</div></article>`,
    );
  }
  if (ctx.family === "experimental-loop") {
    return renderExperimentalLoopPage(
      ctx,
      `<article class="experimental-loop-article"><a class="experimental-loop-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><header><span>${meta}</span><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}</header><div class="blog-post-content experimental-loop-copy">${model.contentHtml}</div></article>`,
    );
  }
  if (ctx.family === "taste-directory") {
    return renderTasteDirectoryPage(
      ctx,
      `<article class="taste-card taste-article-card"><div class="taste-author"><span class="taste-avatar" aria-hidden="true">RP</span><div><time>${meta}</time></div></div><header><a class="taste-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}</header><div class="blog-post-content taste-card-body">${model.contentHtml}</div></article>`,
      "Browse",
    );
  }
  if (ctx.family === "design-repository") {
    return renderDesignRepositoryPage(
      ctx,
      `<article class="design-repository-article">
        <p class="design-repository-back"><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <header>
          <h1>${escapeHtml(model.title)}</h1>
          <p>${meta}</p>
          ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        </header>
        <div class="blog-post-content design-repository-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "writer-ledger") {
    return `<article class="writer-ledger writer-ledger-article">${renderWriterLedgerHeader(ctx)}<header class="writer-ledger-article-head"><p>( <a href="${model.backHref}">${escapeHtml(model.backLabel)}</a> )</p><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<time>${meta}</time></header><div class="blog-post-content writer-ledger-copy">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "portal-gallery") {
    return renderPortalPage(
      ctx,
      `<article class="portal-article">
        <a class="portal-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a>
        <header><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<time>${meta}</time></header>
        <div class="blog-post-content portal-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "book-microsite") {
    return renderBookMicrositePage(
      ctx,
      `<article class="book-microsite-entry">
        <a class="book-microsite-back" href="${model.backHref}">${escapeHtml(model.backLabel)}</a>
        <header>
          <p>${meta}</p>
          <h1>${escapeHtml(model.title)}</h1>
          ${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}
        </header>
        <div class="blog-post-content book-microsite-copy">${model.contentHtml}</div>
      </article>`,
      model.backHref,
    );
  }
  if (ctx.family === "download-index") {
    return renderDownloadIndexPage(
      ctx,
      model.title,
      `<p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<p>${meta}</p>`,
      `<article class="blog-post-content download-index-article">${model.contentHtml}</article>`,
      "text record",
    );
  }
  if (ctx.family === "terminal" || ctx.family === "editor") {
    return `<article class="terminal-output"><p class="prompt">$ man ${escapeHtml(slugify(model.title))}</p><h2>${escapeHtml(model.title)}</h2><p class="terminal-comment"># ${meta}</p><div class="article-body">${model.contentHtml}</div><a class="terminal-line" href="${model.backHref}">cd ..</a></article>`;
  }
  if (ctx.family === "wiki") {
    return `<article class="wiki-article"><h2>${escapeHtml(model.title)}</h2><p class="wiki-meta">${meta}</p><aside class="wiki-infobox">${model.subtitle ? escapeHtml(model.subtitle) : "Personal essay"}</aside><div class="article-body">${model.contentHtml}</div></article>`;
  }
  if (ctx.family === "now-directory") {
    return renderNowDirectoryPage(ctx, `<article><p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<small>${meta}</small><div class="blog-post-content">${model.contentHtml}</div></article>`);
  }
  if (ctx.family === "conversational-minimal") {
    return renderConversationalMinimalPage(
      ctx,
      `<article class="conversational-minimal-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h2>${escapeHtml(model.title)}</h2>
        ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        <p><small>${meta}</small></p>
        <div class="blog-post-content">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "founder-index") {
    return renderFounderIndexPage(
      ctx,
      `<article class="founder-index-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h2>${escapeHtml(model.title)}</h2>
        ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        <p><small>${meta}</small></p>
        <div class="blog-post-content founder-index-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  if (ctx.family === "grant-page") {
    return renderGrantPage(
      ctx,
      `<article class="grant-article">
        <p><a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>
        <h2>${escapeHtml(model.title)}</h2>
        ${model.subtitle ? `<p><em>${escapeHtml(model.subtitle)}</em></p>` : ""}
        <p><small>${meta}</small></p>
        <div class="blog-post-content grant-copy">${model.contentHtml}</div>
      </article>`,
    );
  }
  return `<article class="theme-post"><a class="back-link" href="${model.backHref}">${escapeHtml(model.backLabel)}</a><h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="entry-meta">${meta}</p><div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function renderArchives(model: ArchiveModel, ctx: RenderContext): string {
  if (ctx.family === "spartan" || ctx.family === "no-css") {
    if (ctx.family === "spartan") {
      return `<table class="pg-home pg-archive" border="0" cellspacing="0" cellpadding="0" width="410"><tbody><tr><td><h2>Archives</h2>${model.months.map((month) => `<h3>${escapeHtml(month.label)}</h3><ul>${month.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a></li>`).join("")}</ul>`).join("")}</td></tr></tbody></table>`;
    }
    return `<h2>Archives</h2>${model.months.map((month) => `<h3>${escapeHtml(month.label)}</h3><ul>${month.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a></li>`).join("")}</ul>`).join("")}`;
  }
  if (ctx.family === "manual") {
    return b1ManualArchives(model, ctx);
  }
  if (ctx.family === "scoreboard") {
    return b1ScoreboardArchives(model, ctx);
  }
  if (ctx.family === "now-directory") {
    const months = model.months
      .map((month) => `<h2>${escapeHtml(month.label)}</h2><ul>${month.posts.map((post) => `<li><h3><a href="${post.href}">${escapeHtml(post.title)}</a></h3><small>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</small></li>`).join("")}</ul>`)
      .join("");
    return renderNowDirectoryPage(ctx, `<article><h2>Archives</h2><p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}</article>`);
  }
  if (ctx.family === "conversational-minimal") {
    const months = model.months
      .map((month) => `<section id="${slugify(month.label)}"><h2>${escapeHtml(month.label)}</h2><ul class="conversational-minimal-list">${month.posts.map((post) => `<li>${post.date ? `<time>${escapeHtml(post.date)}</time> ` : ""}<a href="${post.href}">${escapeHtml(post.title)}</a>${post.readTime ? ` <small>${escapeHtml(post.readTime)}</small>` : ""}</li>`).join("")}</ul></section>`)
      .join("");
    return renderConversationalMinimalPage(ctx, `<h2>archives</h2><p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
  }
  if (ctx.family === "founder-index") {
    const months = model.months
      .map((month) => `<section class="founder-index-year" id="${slugify(month.label)}"><h2>${escapeHtml(month.label)}</h2><ul>${month.posts.map((post) => renderFounderIndexPost(post)).join("")}</ul></section>`)
      .join("");
    return renderFounderIndexPage(ctx, `<article class="founder-index-article"><h2>Archives</h2><p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}</article>`);
  }
  if (ctx.family === "grant-page") {
    const months = model.months
      .map((month) => `<section class="grant-section" id="${slugify(month.label)}"><h2>${escapeHtml(month.label)}</h2><ul>${month.posts.map((post) => renderGrantPostItem(post)).join("")}</ul></section>`)
      .join(renderGrantRule());
    return renderGrantPage(ctx, `<article class="grant-article"><h2>Archives</h2><p>${model.totalPosts} entries across ${model.months.length} months.</p></article>${renderGrantRule()}${months}`);
  }
  if (ctx.family === "archive-index") {
    return b1ArchiveIndexArchives(model, ctx);
  }
  if (ctx.family === "art-index") {
    return `<section class="art-index">${renderArtIndexHeader(ctx)}<h2>archive</h2><div class="art-index-chronology">${model.months.map((month) => `<div class="art-index-year" id="${slugify(month.label)}">${escapeHtml(month.label)}</div>${month.posts.map((post) => renderArtIndexRow(getArtIndexYearLabel(month.label), post.href, post.title, post.date || "")).join("")}`).join("")}</div>${renderArtIndexFooter(`<p>${model.totalPosts} entries across ${model.months.length} months.</p>`)}</section>`;
  }
  if (ctx.family === "research-sidenotes") {
    return renderResearchSidenotePage(
      ctx,
      "Archive",
      `<section class="research-abstract"><p>${model.totalPosts} entries across ${model.months.length} months.</p></section>${model.months
        .map((month) => `<section class="research-section"><h2 id="${slugify(month.label)}"><a href="#${slugify(month.label)}">${escapeHtml(month.label)}</a></h2><ul>${month.posts.map((post) => renderResearchSidenoteListItem(post.href, post.title, post.date, post.readTime || "")).join("")}</ul></section>`)
        .join("")}`,
      `<p>${model.months.length} months</p><p>${model.totalPosts} entries</p>`,
    );
  }
  if (ctx.family === "research-tools") {
    return b1ResearchToolsArchives(model, ctx);
  }
  if (ctx.family === "wordmark-studio") {
    return b1WordmarkArchives(model, ctx);
  }
  if (ctx.family === "builder-notes") {
    return b1BuilderArchives(model, ctx);
  }
  if (ctx.family === "studio-index") {
    const months = model.months.map((month, index) => renderStudioIndexTextRow(month.label, `#${slugify(month.label)}`, `${month.posts.length} ${month.posts.length === 1 ? "post" : "posts"}`, month.key, index)).join("");
    const records = model.months.map((month) => `<section id="${slugify(month.label)}" class="studio-index-month"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post, index) => renderStudioIndexTextRow(post.title, post.href, post.date, post.readTime || "Post", index)).join("")}</section>`).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, `${model.totalPosts} entries across ${model.months.length} months.`, "Index")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Months", "Posts", "Chronology"])}<div class="studio-index-content"><div class="studio-index-list">${months}</div>${records}</div></div></section>`;
  }
  if (["research-tools", "artist-ledger", "garden-notebook"].includes(ctx.family)) {
    if (ctx.family === "artist-ledger") {
      return `<section class="artist-ledger">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>Archive</h2>${model.months.map((month) => `<section class="artist-ledger-month"><h3>${escapeHtml(month.label)}</h3><div class="artist-ledger-list">${month.posts.map((post) => renderArtistLedgerRow(post.date || month.key, post.href, post.title, month.label)).join("")}</div></section>`).join("")}</section></section>`;
    }
    if (ctx.family === "garden-notebook") {
      return renderGardenPage(ctx, `<h1>Archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p>${model.months.map((month) => `<section class="garden-year"><h2>${escapeHtml(month.label)}</h2>${renderGardenPostList(month.posts)}</section>`).join("")}`);
    }
    if (ctx.family === "briefing") {
      return renderBriefingPage(
        ctx,
        `<header class="briefing-section-head"><span>${model.totalPosts} entries</span><h1>Archives</h1></header><div class="briefing-topic-columns">${model.months
          .map((month) => `<section><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderBriefingSmallCard(post.href, post.title, post.date, post.readTime || "Writing")).join("")}</section>`)
          .join("")}</div>`,
      );
    }
    if (ctx.family === "bookmaker-card") {
      return renderBookmakerPage(
        ctx,
        `<section class="bookmaker-selected"><h1>Archive</h1>${model.months.map((month) => `<section class="bookmaker-month"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderBookmakerWorkRow(post.href, post.title, month.key, post.date || "", post.readTime ? `<p>${escapeHtml(post.readTime)}</p>` : "")).join("")}</section>`).join("")}</section>`,
        "",
        `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`,
      );
    }
    return `<section class="${ctx.family}"><h2>Archive</h2>${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("")}</section>`;
  }
  if (ctx.family === "art-library") {
    return b1ArtLibraryArchives(model, ctx);
  }
  if (ctx.family === "cargo-cv") {
    const items = model.months.map((month) => `<a href="#${slugify(month.label)}">${escapeHtml(month.label)}</a> <span>${month.posts.length} ${month.posts.length === 1 ? "entry" : "entries"}</span>`);
    const months = model.months.map((month) => `<section id="${slugify(month.label)}" class="cargo-cv-month"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a></p>`).join("")}</section>`).join("");
    return renderCargoCvPage(ctx, "Archive", `<h2>Archive:</h2>${renderCargoCvList(items)}<div class="cargo-cv-small-list">${months}</div>`);
  }
  if (["fragment-journal", "writer-ledger", "experimental-loop", "briefing", "taste-directory", "bookmaker-card", "uncertainty"].includes(ctx.family)) {
    if (ctx.family === "fragment-journal") {
      return renderFragmentPage(
        ctx,
        `<header class="fragment-page-head"><h1>archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header>${model.months.map((month) => `<section class="fragment-year"><h2>${escapeHtml(month.label)}</h2>${renderFragmentPostList(month.posts)}</section>`).join("")}`,
      );
    }
    if (ctx.family === "briefing") {
      return renderBriefingPage(
        ctx,
        `<header class="briefing-section-head"><span>${model.totalPosts} entries</span><h1>Archives</h1></header><div class="briefing-topic-columns">${model.months
          .map((month) => `<section><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderBriefingSmallCard(post.href, post.title, post.date, post.readTime || "")).join("")}</section>`)
          .join("")}</div>`,
      );
    }
    if (ctx.family === "bookmaker-card") {
      return renderBookmakerPage(
        ctx,
        `<section class="bookmaker-selected"><h1>Archive</h1>${model.months.map((month) => `<section class="bookmaker-month"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderBookmakerWorkRow(post.href, post.title, post.readTime || "", post.date || "")).join("")}</section>`).join("")}</section>`,
        "",
        `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`,
      );
    }
    if (ctx.family === "uncertainty") {
      return renderUncertaintyPage(
        ctx,
        "Archive",
        `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`,
        model.months
          .map((month) => `<section class="uncertainty-group"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderUncertaintyLine(post.title, post.href, post.readTime || "Entry", post.date)).join("")}</section>`)
          .join(""),
      );
    }
    if (ctx.family === "experimental-loop") {
      const entries = model.months.flatMap((month) => month.posts.map((post) => renderExperimentalLoopUnit(post.href, post.title, month.label, post.readTime || "", post.date, ""))).join("");
      return renderExperimentalLoopPage(ctx, `<header class="experimental-loop-section-head"><h1>Archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header><h2 class="experimental-loop-contents">Contents ↓</h2><div class="experimental-loop-units">${entries}</div>`);
    }
    if (ctx.family === "taste-directory") {
      const cards = model.months
        .map((month, index) => `<section class="taste-month"><h2>${escapeHtml(month.label)}</h2><div class="taste-feed">${month.posts.map((post, postIndex) => renderTastePostCard(post, index + postIndex, month.key)).join("")}</div></section>`)
        .join("");
      return renderTasteDirectoryPage(ctx, `${renderTasteSectionHead("Archive", `${model.totalPosts} entries across ${model.months.length} months.`, "")}<div class="taste-archive">${cards}</div>`, "Browse");
    }
    return `<section class="writer-ledger">${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-info"><h1>Archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></section><section class="writer-ledger-work"><h2><span>Title</span> <span>Medium</span> <span>Month ↓</span></h2><div class="writer-ledger-table">${model.months.flatMap((month) => month.posts.map((post) => renderWriterLedgerRow(post.title, post.href, post.readTime || "Entry", month.label))).join("")}</div></section></section>`;
  }
  if (ctx.family === "ucoz-archive") {
    return renderUcozPage(
      ctx,
      "Archive",
      `<div class="ucoz-section-title">Archive</div>${model.months
        .map((month) => `<div class="ucoz-category"><div class="ucoz-category-head"><a id="${slugify(month.label)}" href="#${slugify(month.label)}">${escapeHtml(month.label)}</a><span>${month.posts.length}</span></div>${month.posts.map((post, index) => renderUcozFileEntry(post.title, post.href, month.label, post.date, post.readTime || "Post", index + 1)).join("")}</div>`)
        .join("")}`,
      [["Home", "/"], ["Archive", "/archives"]],
      renderUcozStats(`${model.totalPosts} posts`, `${model.months.length} months`),
    );
  }
  if (ctx.family === "artist-menu") {
    const works = model.months
      .flatMap((month) => month.posts.map((post) => renderArtistMenuWork(post.href, post.title, month.label)))
      .join("");
    return renderArtistMenuPage(ctx, `<section class="artist-menu-works artist-menu-index"><h1>Archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p><div class="works-list">${works}</div></section>`);
  }
  if (ctx.family === "friendly-hub") {
    return renderFriendlyHubPage(
      ctx,
      `<article><h1>🗂 Archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p>${model.months.map((month) => `<section class="friendly-hub-year"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => renderFriendlyHubEntry(post.href, post.title, post.date, escapeHtml(post.readTime || ""))).join("")}</section>`).join("")}</article>`,
    );
  }
  if (ctx.family === "games-cabinet") {
    const entries = model.months.flatMap((month, monthIndex) => month.posts.map((post, postIndex) => renderGamesCabinetWork(post.href, post.title, [month.label, post.readTime].filter(Boolean).join(", "), "", null, monthIndex + postIndex))).join("");
    return renderGamesCabinetPage(ctx, `<section class="games-cabinet-page-head"><h1>${renderGamesCabinetWavyText("Archives")}</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></section><div class="games-cabinet-list">${entries}</div>`);
  }
  if (ctx.family === "portal-gallery") {
    const entries = model.months
      .flatMap((month, monthIndex) => month.posts.map((post, postIndex) => renderPortalTile(post.href, post.title, post.readTime || "", post.date || month.label, "", monthIndex + postIndex)))
      .join("");
    return renderPortalPage(ctx, `<header class="portal-section-head"><h1>Archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header><section class="portal-gallery-wall">${entries}</section>`);
  }
  if (ctx.family === "design-repository") {
    const records = model.months
      .flatMap((month) => month.posts.map((post, index) => renderDesignRepositoryRecord(index + 1, post.title, post.href, post.readTime || "", post.date || month.label, "", null, "Writing", false, index === 0 ? `m-${slugify(month.key)}` : "")))
      .join("");
    const months = model.months.map((month) => `<a href="#m-${slugify(month.key)}">§${escapeHtml(month.label)}</a>`).join("");
    return renderDesignRepositoryPage(
      ctx,
      `<header class="design-repository-section-head"><h1>Archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header><nav class="design-repository-availability" aria-label="Months">${months}</nav><ol class="design-repository-records">${records}</ol>`,
    );
  }
  if (ctx.family === "research-lab") {
    return renderResearchLabArchives(model, ctx);
  }
  if (ctx.family === "visual-culture") {
    const months = model.months
      .map((month) => `<div class="visual-culture-month"><p><span style="font-weight:bolder">${escapeHtml(month.label)}</span></p>${month.posts.map((post) => renderVisualCultureWork(post.href, post.title, post.date, post.readTime || "")).join("")}</div>`)
      .join("");
    return renderVisualCulturePage(
      ctx,
      "Archive",
      `<div class="visual-culture-intro"><p>${model.totalPosts} entries across ${model.months.length} months.</p></div><div class="visual-culture-contact">${months}</div>`,
      "visual-culture-archive",
    );
  }
  if (ctx.family === "room-wall") {
    const months = model.months
      .map((month) => `<section class="room-wall-month"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderRoomWallWork(post.href, post.title, post.date, post.readTime || "")).join("")}</section>`)
      .join("");
    return renderRoomWallPage(ctx, `<h1>archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
  }
  if (ctx.family === "html-bulletin") {
    const months = model.months
      .map((month) => `<h4>${escapeHtml(month.label)}</h4>${month.posts.map((post) => `<p><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? `<br><small>${escapeHtml(post.date)}</small>` : ""}</p>`).join("")}`)
      .join("");
    return renderHtmlBulletinPage(ctx, "archives", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
  }
  if (ctx.family === "consumption-digest") {
    const days = model.months
      .map((month) => renderConsumptionDigestDay(month.label, [{ label: "text", html: month.posts.map(renderConsumptionDigestPost).join("") }]))
      .join("");
    return renderConsumptionDigestPage(ctx, days);
  }
  if (ctx.family === "vernacular-essay") {
    const months = model.months
      .map((month) => `<h2>${escapeHtml(month.label)}</h2>${month.posts.map((post, index) => renderVernacularPost(post, index + 1)).join("")}`)
      .join("");
    return renderVernacularPage(ctx, "Archives", `<p>${model.totalPosts} entries across ${model.months.length} months.</p><hr>${months}`);
  }
  if (ctx.family === "cheap-manifesto") {
    const months = model.months
      .map((month) => `<h2>${escapeHtml(month.label)}</h2><ul>${month.posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <small>${escapeHtml(post.date)}</small>` : ""}</li>`).join("")}</ul>`)
      .join("");
    return renderCheapManifestoPage(ctx, "Archives", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
  }
  if (ctx.family === "poetic-article") {
    const months = model.months
      .map((month) => `<section class="poetic-section"><h2>${escapeHtml(month.label)}</h2>${month.posts.map(renderPoeticPost).join("")}</section>`)
      .join("");
    return renderPoeticArticlePage(ctx, "Archives", `<p class="poetic-lede">${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
  }
  if (ctx.family === "feral-essay") {
    const months = model.months
      .map((month) => `<section class="feral-section"><h2>${escapeHtml(month.label)}</h2>${month.posts.map(renderFeralPost).join("")}</section>`)
      .join("");
    return renderFeralPage(ctx, "Archives", `<p class="feral-lede">${model.totalPosts} entries across ${model.months.length} months.</p>${months}`, "Archive");
  }
  if (ctx.family === "performance-club") {
    let rowIndex = 0;
    const rows = model.months
      .flatMap((month) => month.posts.map((post) => renderPerformanceClubPostRow(post, month.label, rowIndex++)))
      .join("");
    return renderPerformanceClubPage(
      ctx,
      `${renderPerformanceClubBlock("Archives", `<p class="performance-club-lede">${model.totalPosts} entries across ${model.months.length} months.</p>`, "performance-club-manifesto")}
      ${renderPerformanceClubBlock("By month", renderPerformanceClubTable(["#", "month", "entry", "date"], rows, "Archive entries"))}`,
    );
  }
  if (ctx.family === "recurse-joy") {
    const months = model.months
      .map((month) => `<section class="recurse-joy-month" id="${slugify(month.label)}"><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => renderRecurseJoyEntry(post.href, post.title, post.date, post.readTime || "")).join("")}</section>`)
      .join("");
    return renderRecurseJoyPage(
      ctx,
      `<header class="recurse-joy-page-head"><h2>Archive</h2><p>${model.totalPosts} entries across ${model.months.length} months. <a href="/rss.xml">RSS feed</a></p></header>${months}`,
      "Archive",
    );
  }
  if (ctx.family === "forecast-report") {
    const months = model.months
      .map((month) => `<section class="forecast-report-panel" id="${slugify(month.label)}"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post, index) => renderForecastReportEntry(post.href, post.title, post.date, post.readTime || "", index)).join("")}</section>`)
      .join("");
    return renderForecastReportPage(ctx, "Archives", months, {
      meta: `${model.totalPosts} entries across ${model.months.length} months`,
      tocHtml: model.months.map((month) => `<a href="#${slugify(month.label)}">${escapeHtml(month.label)}</a>`).join(""),
    });
  }
  if (ctx.family === "forum-frontpage") {
    const months = model.months
      .map((month) => `<h2 class="forum-frontpage-heading" id="${slugify(month.label)}">${escapeHtml(month.label)}</h2><section class="forum-frontpage-feed">${month.posts.map(renderForumFrontpageSummary).join("")}</section>`)
      .join("");
    return renderForumFrontpageShell(ctx, `${renderForumFrontpageHead("Archives", `<p class="forum-frontpage-meta">${model.totalPosts} entries across ${model.months.length} months</p>`)}${months}`, "Archives");
  }
  if (["artist-menu", "friendly-hub", "games-cabinet", "portal-gallery", "design-repository", "weblog-facets", "research-lab", "visual-culture", "room-wall", "book-microsite", "download-index", "visual-index", "html-bulletin", "consumption-digest", "data-portfolio", "internet-diagram", "vernacular-essay", "cheap-manifesto", "poetic-article", "feral-essay", "performance-club", "recurse-joy", "forecast-report", "forum-frontpage", "essay-blogroll", "now-directory", "conversational-minimal", "founder-index", "grant-page"].includes(ctx.family)) {
    if (ctx.family === "essay-blogroll") {
      const months = model.months
        .map((month) => `<section class="essay-blogroll-year" id="${slugify(month.label)}"><h3>${escapeHtml(month.label)}</h3>${month.posts.map(renderEssayBlogrollSummary).join("")}</section>`)
        .join("");
      return renderEssayBlogrollPage(
        ctx,
        `<section class="essay-blogroll-posts"><article class="essay-blogroll-entry essay-blogroll-pagehead"><h2>Archives</h2><p class="essay-blogroll-meta">${model.totalPosts} entries across ${model.months.length} months</p></article>${months}</section>`,
        renderEssayBlogrollSidebar([["Archives", model.months.map((month) => [`#${slugify(month.label)}`, `${month.label} (${month.posts.length})`] as [string, string])]]),
      );
    }
    if (ctx.family === "book-microsite") {
      const months = model.months.map((month) => ({ href: `#${slugify(month.label)}`, label: "", title: `${month.label} (${month.posts.length})` }));
      const records = model.months
        .map((month) => `<section id="${slugify(month.label)}" class="book-microsite-section"><h2>${escapeHtml(month.label)}</h2>${renderBookMicrositeContents(month.posts.map((post) => ({ href: post.href, label: post.date, title: post.title })), false)}</section>`)
        .join("");
      return renderBookMicrositePage(
        ctx,
        `${renderBookMicrositeTitlePage(ctx, `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`, "", "Archives")}${renderBookMicrositeContents(months)}${records}`,
        months[0]?.href || "/blog",
      );
    }
    if (ctx.family === "weblog-facets") {
      return renderWeblogFacetsPage(
        ctx,
        `<section class="weblog-facets-index">
          <header class="weblog-facets-section-head"><h1>Archive</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header>
          <div class="weblog-facets-months">${model.months.map((month) => `<section><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderWeblogFacetsPost(post)).join("")}</section>`).join("")}</div>
        </section>`,
      );
    }
    if (ctx.family === "download-index") {
      const rows = model.months
        .flatMap((month) => month.posts.map((post) => ({ post, month })))
        .map(({ post, month }, index) => renderDownloadIndexRow(index + 1, post.title, post.href, month.label, post.date, post.readTime || ""))
        .join("");
      return renderDownloadIndexPage(ctx, "Archives", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>`, `<section class="download-index-table" aria-label="Archive records">${rows}</section>`, `${model.totalPosts} records`);
    }
    if (ctx.family === "visual-index") {
      const records = model.months.flatMap((month) => month.posts.map((post) => ({ href: post.href, title: post.title, date: post.rawDate || post.date, label: month.label })));
      return renderVisualIndexPage(
        ctx,
        `<section class="visual-index-intro"><p>${model.totalPosts} entries across ${model.months.length} months.</p></section>
        ${renderVisualIndexGroupedSection("", records)}`,
      );
    }
    if (ctx.family === "internet-diagram") {
      const months = model.months
        .map((month) => `<h2>${escapeHtml(month.label)}</h2>${month.posts.map((post) => renderInternetDiagramIndexRow(post.href, post.title, post.date)).join("")}`)
        .join("");
      return renderInternetDiagramWindow(ctx, "Archives", `<p>${model.totalPosts} entries across ${model.months.length} months.</p>${months}`);
    }
    if (ctx.family === "data-portfolio") {
      const months = model.months
        .map((month) => `<section class="data-portfolio-month"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post, index) => renderDataPortfolioListRow(post.href, post.title, post.date, post.readTime || "", index)).join("")}</section>`)
        .join("");
      return renderDataPortfolioPage(
        ctx,
        `<header class="data-portfolio-section-head"><h1>Archives</h1><p>${model.totalPosts} entries across ${model.months.length} months.</p></header>
        <section class="data-portfolio-list" aria-label="Archive">${months}</section>`,
      );
    }
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
    return b1ManualGuestbook(model, ctx);
  }
  if (ctx.family === "scoreboard") {
    return b1ScoreboardGuestbook(model, ctx);
  }
  if (ctx.family === "archive-index") {
    return b1ArchiveIndexGuestbook(model, ctx);
  }
  if (ctx.family === "builder-notes") {
    return b1BuilderGuestbook(model, ctx);
  }
  if (ctx.family === "research-tools") {
    return b1ResearchToolsGuestbook(model, ctx);
  }
  if (ctx.family === "wordmark-studio") {
    return b1WordmarkGuestbook(model, ctx);
  }
  if (ctx.family === "art-library") {
    return b1ArtLibraryGuestbook(model, ctx);
  }
  if (ctx.family === "art-index") {
    const rows = model.entries.length
      ? model.entries.map((entry) => `<div class="art-row art-row-entry"><span>${escapeHtml(entry.rawDate.slice(0, 4) || entry.date)}</span><strong>${escapeHtml(entry.name)}</strong><em>${escapeHtml(entry.message)}</em></div>`).join("")
      : `<p class="art-index-meta">No entries yet. Be the first to sign the guestbook!</p>`;
    return `<section class="art-index">${renderArtIndexHeader(ctx)}<h2>guestbook</h2><section class="guestbook-header art-index-action">${button}</section><div class="art-index-chronology">${rows}</div></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "experimental-loop") {
    const loopEntries = model.entries.length
      ? model.entries.map((entry) => `<div class="experimental-loop-unit"><span>${escapeHtml(entry.date)}</span><strong>${escapeHtml(entry.name)}</strong><em>${escapeHtml(entry.message)}</em></div>`).join("")
      : `<div class="experimental-loop-unit"><em>No entries yet. Be the first to sign the guestbook!</em></div>`;
    return `${renderExperimentalLoopPage(ctx, `<header class="experimental-loop-section-head"><h1>Guestbook</h1><p>${model.entries.length} entries.</p>${button ? `<p class="experimental-loop-sign">${button}</p>` : ""}</header><div class="experimental-loop-units">${loopEntries}</div>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "bookmaker-card") {
    const bookmakerEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="bookmaker-work"><h3>. ${escapeHtml(entry.name)}</h3><p>[${escapeHtml(entry.date)}]</p><div><p>${escapeHtml(entry.message)}</p></div></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderBookmakerPage(ctx, `<section class="bookmaker-selected"><h1>Guestbook:</h1>${button ? `<p class="bookmaker-sign">${button}</p>` : ""}${bookmakerEntries}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "briefing") {
    const briefingEntries = model.entries.length
      ? model.entries.map((entry) => `<article><span>${escapeHtml(entry.date)}</span><h3>${escapeHtml(entry.name)}</h3><p>${escapeHtml(entry.message)}</p></article>`).join("")
      : `<article><p>No entries yet. Be the first to sign the guestbook!</p></article>`;
    return `${renderBriefingPage(ctx, `<header class="briefing-section-head"><span>${model.entries.length} entries</span><h1>Guestbook</h1>${button ? `<p class="briefing-sign">${button}</p>` : ""}</header><div class="briefing-grid">${briefingEntries}</div>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "ucoz-archive") {
    const ucozEntries = model.entries.length
      ? model.entries.map((entry) => `<div class="ucoz-file"><div class="ucoz-file-title">${escapeHtml(entry.name)}</div><div class="ucoz-file-meta">Date: ${escapeHtml(entry.date)}</div><div class="ucoz-file-desc">${escapeHtml(entry.message)}</div></div>`).join("")
      : `<div class="ucoz-file"><div class="ucoz-file-desc">No entries yet. Be the first to sign the guestbook!</div></div>`;
    return `${renderUcozPage(
      ctx,
      "Guestbook",
      `<div class="ucoz-section-title">Guestbook</div>${button ? `<div class="ucoz-file ucoz-sign">${button}</div>` : ""}${ucozEntries}`,
      [["Home", "/"], ["Guestbook", "/guestbook"]],
      renderUcozStats(`${model.entries.length} entries`, ""),
    )}${guestbookModalScript()}`;
  }
  if (ctx.family === "studio-index") {
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, "", "Guestbook")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Guestbook", "Messages"])}<div class="studio-index-content"><header class="studio-index-article-head"><h2>Guestbook</h2></header><section class="guestbook-header">${button}</section><div class="studio-index-list studio-index-entries">${entries}</div></div></div></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "cargo-cv") {
    const cargoEntries = model.entries.length
      ? model.entries.map((entry) => `<strong>${escapeHtml(entry.name)}</strong> ${escapeHtml(entry.message)} <span>${escapeHtml(entry.date)}</span>`)
      : [`<span>No entries yet. Be the first to sign the guestbook!</span>`];
    return `${renderCargoCvPage(ctx, "Guestbook", `<h2>Guestbook:</h2>${renderCargoCvList(cargoEntries)}<section class="guestbook-header">${button}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "artist-ledger") {
    const rows = model.entries.length
      ? model.entries.map((entry) => `<article class="artist-ledger-row artist-ledger-entry"><time>${escapeHtml(entry.date)}</time><div><p>${escapeHtml(entry.message)}</p></div><span>${escapeHtml(entry.name)}</span></article>`).join("")
      : `<p class="text-muted">No entries yet. Be the first to sign the guestbook!</p>`;
    return `<section class="artist-ledger artist-ledger-page">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>Guestbook</h2><section class="guestbook-header">${button}</section><div class="artist-ledger-list">${rows}</div></section></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "fragment-journal") {
    return `${renderFragmentPage(ctx, `<header class="fragment-page-head"><h1>guestbook</h1></header><section class="guestbook-header">${button}</section><div class="fragment-entries">${entries}</div>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "garden-notebook") {
    return `${renderGardenPage(ctx, `<h1>Guestbook</h1><section class="guestbook-header">${button}</section><div class="garden-entries">${entries}</div>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "uncertainty") {
    const lines = model.entries.length
      ? model.entries.map((entry) => `<article class="uncertainty-entry"><time>${escapeHtml(entry.date)}</time><p>${escapeHtml(entry.message)}</p><strong>${escapeHtml(entry.name)}</strong></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderUncertaintyPage(ctx, "Guestbook", `<p>${model.entries.length} entries.</p>${button}`, `<section class="uncertainty-group">${lines}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "taste-directory") {
    const tasteEntries = model.entries.length
      ? model.entries.map((entry, index) => `<article class="taste-card"><div class="taste-author"><span class="taste-avatar" aria-hidden="true">${escapeHtml(entry.name.slice(0, 2).toUpperCase())}</span><div><span>${escapeHtml(entry.name)}</span><time>${escapeHtml(entry.date)}</time></div></div><div class="taste-card-body"><p>${escapeHtml(entry.message)}</p></div></article>`).join("")
      : `<article class="taste-card"><div class="taste-card-body"><p>No entries yet. Be the first to sign the guestbook!</p></div></article>`;
    return `${renderTasteDirectoryPage(ctx, `${renderTasteSectionHead("Guestbook", `${model.entries.length} entries.`, "")}<section class="guestbook-header taste-signup">${button}</section><div class="taste-feed">${tasteEntries}</div>`, "Browse")}${guestbookModalScript()}`;
  }
  if (ctx.family === "writer-ledger") {
    const ledgerEntries = model.entries.length
      ? model.entries.map((entry) => `<div class="writer-ledger-row writer-ledger-entry"><span>${escapeHtml(entry.message)}</span><span>${escapeHtml(entry.name)}</span><span>${escapeHtml(entry.date)}</span></div>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `<section class="writer-ledger">${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-info"><h1>Guestbook</h1>${model.canSign ? `<p class="writer-ledger-sign">( ${button} )</p>` : ""}</section><section class="writer-ledger-work"><h2><span>Message</span> <span>From</span> <span>Date ↓</span></h2><div class="writer-ledger-table">${ledgerEntries}</div></section></section>${guestbookModalScript()}`;
  }
  if (ctx.family === "friendly-hub") {
    const hubEntries = model.entries.length
      ? model.entries.map((entry) => `<p class="friendly-hub-entry friendly-hub-guest"><strong>${escapeHtml(entry.name)}</strong> – ${escapeHtml(entry.message)} <span>${escapeHtml(entry.date)}</span></p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderFriendlyHubPage(ctx, `<article><h1>📖 Guestbook</h1><p class="friendly-hub-action">${button}</p><div class="friendly-hub-list">${hubEntries}</div></article>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "design-repository") {
    const repositoryEntries = model.entries.length
      ? model.entries.map((entry, index) => renderDesignRepositoryRecord(index + 1, entry.name, "", "", entry.date, entry.message, null, "Guestbook")).join("")
      : `<li class="design-repository-record"><p class="design-repository-meta"></p><div><p>No entries yet. Be the first to sign the guestbook!</p></div></li>`;
    return `${renderDesignRepositoryPage(ctx, `<header class="design-repository-section-head"><h1>Guestbook</h1><span>${model.entries.length} records</span>${model.canSign ? `<p class="design-repository-action">${button}</p>` : ""}</header><ol class="design-repository-records">${repositoryEntries}</ol>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "weblog-facets") {
    const weblogEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="weblog-facets-entry weblog-facets-guest"><h2>${escapeHtml(entry.name)}</h2><p class="weblog-facets-date">${escapeHtml(entry.date)}</p><p>${escapeHtml(entry.message)}</p></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderWeblogFacetsPage(ctx, `<section class="weblog-facets-index"><header class="weblog-facets-section-head"><h1>Guestbook</h1><p>${model.entries.length} entries.</p>${model.canSign ? `<p class="weblog-facets-action">${button}</p>` : ""}</header><section class="weblog-facets-feed" aria-label="Guestbook entries">${weblogEntries}</section></section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "games-cabinet") {
    const cabinetEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="games-cabinet-item games-cabinet-guest"><div><h3>${escapeHtml(entry.name)}</h3><div class="games-cabinet-detail">${escapeHtml(entry.message)}</div><ul><li>${escapeHtml(entry.date)}</li></ul></div></article>`).join("")
      : `<p class="games-cabinet-note">No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderGamesCabinetPage(ctx, `<section class="games-cabinet-page-head"><h1>${renderGamesCabinetWavyText("Guestbook")}</h1><p>${model.entries.length} entries.</p>${button}</section><div class="games-cabinet-list">${cabinetEntries}</div>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "artist-menu") {
    const artistEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="artist-menu-entry"><p>${escapeHtml(entry.message)}</p><small>${escapeHtml(entry.name)}, ${escapeHtml(entry.date)}</small></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderArtistMenuPage(ctx, `<section class="artist-menu-works artist-menu-index"><h1>Guestbook</h1><div class="artist-menu-action">${button}</div><div class="artist-menu-entries">${artistEntries}</div></section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "portal-gallery") {
    const portalEntries = model.entries.length
      ? model.entries.map((entry, index) => renderPortalTile("", entry.name, entry.date, "", entry.message, index)).join("")
      : `<p class="portal-empty">No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderPortalPage(ctx, `<header class="portal-section-head"><h1>Guestbook</h1><p>${model.entries.length} entries.</p>${button}</header><section class="portal-gallery-wall">${portalEntries}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "research-lab") {
    return `${renderResearchLabGuestbook(model, ctx, button)}${guestbookModalScript()}`;
  }
  if (ctx.family === "download-index") {
    const rows = model.entries.length
      ? model.entries.map((entry, index) => renderDownloadIndexRow(index + 1, entry.name, "", "", entry.date, escapeHtml(entry.message))).join("")
      : `<p class="download-index-empty">No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderDownloadIndexPage(ctx, "Guestbook", button, `<section class="download-index-table" aria-label="Guestbook records">${rows}</section>`, `${model.entries.length} records`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "book-microsite") {
    const notes = model.entries.length
      ? `<ol class="book-microsite-contents book-microsite-notes">${model.entries.map((entry, index) => `<li><span>${index + 1}:</span> ${escapeHtml(entry.message)} <em>${escapeHtml(entry.name)}, ${escapeHtml(entry.date)}</em></li>`).join("")}</ol>`
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderBookMicrositePage(ctx, `<article class="book-microsite-entry"><header><h1>Guestbook</h1><p>${model.entries.length} ${model.entries.length === 1 ? "entry" : "entries"}.</p>${button}</header>${notes}</article>`, "/contact")}${guestbookModalScript()}`;
  }
  if (ctx.family === "visual-culture") {
    const notes = model.entries.length
      ? model.entries.map((entry) => `<p class="visual-culture-work"><span style="font-weight:bolder">${escapeHtml(entry.name)}</span> (${escapeHtml(entry.date)})<br>${escapeHtml(entry.message)}</p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderVisualCulturePage(ctx, "Guestbook", `<div class="visual-culture-intro"><p>${model.entries.length} ${model.entries.length === 1 ? "entry" : "entries"}.</p>${button}</div><div class="visual-culture-contact">${notes}</div>`, "visual-culture-guestbook")}${guestbookModalScript()}`;
  }
  if (ctx.family === "room-wall") {
    const notes = model.entries.length
      ? model.entries.map((entry) => `<p class="room-wall-work">${escapeHtml(entry.message)}<br><span>${escapeHtml(entry.name)}, ${escapeHtml(entry.date)}</span></p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderRoomWallPage(ctx, `<h1>guestbook</h1><p>${button}</p><section class="room-wall-works">${notes}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "visual-index") {
    const records = model.entries.length
      ? model.entries.map((entry) => ({ href: "/guestbook", title: entry.name, date: entry.rawDate || entry.date, label: entry.message }))
      : [{ href: "/guestbook", title: "No entries yet. Be the first to sign the guestbook!", date: "", label: "Guestbook" }];
    return `${renderVisualIndexPage(
      ctx,
      `<section class="visual-index-intro"><p>${model.entries.length} ${model.entries.length === 1 ? "entry" : "entries"}.</p>${button}</section>${renderVisualIndexGroupedSection("", records)}`,
    )}${guestbookModalScript()}`;
  }
  if (ctx.family === "html-bulletin") {
    const bulletinEntries = model.entries.length
      ? model.entries.map((entry) => `<p><strong>${escapeHtml(entry.name)}</strong><br>${escapeHtml(entry.message)}<br><small>${escapeHtml(entry.date)}</small></p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderHtmlBulletinPage(ctx, "guestbook", `<p>${button}</p>${bulletinEntries}`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "no-css") {
    // No stylesheet here, so the shared modal (hidden by a CSS class) cannot be used: the form sits in a <details>.
    const plainEntries = model.entries.length
      ? `<ul>${model.entries.map((entry) => `<li><p>${escapeHtml(entry.message)}</p><p><b>${escapeHtml(entry.name)}</b> <small>${escapeHtml(entry.date)}</small></p></li>`).join("")}</ul>`
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    const form = model.canSign
      ? `<details><summary>Sign the guestbook</summary><form id="guestbookForm"><p><label for="name">Name</label><br><input id="name" name="name" type="text" required maxlength="50"></p><p><label for="message">Message</label><br><textarea id="message" name="message" required maxlength="500" rows="4" cols="40"></textarea></p><p><button type="submit">Submit</button></p></form></details><script>document.getElementById('guestbookForm').addEventListener('submit',async function(e){e.preventDefault();try{var r=await fetch('/api/guestbook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('name').value,message:document.getElementById('message').value})});if(r.ok){window.location.reload()}else{alert('Failed to submit entry. Please try again.')}}catch(err){alert('Failed to submit entry. Please try again.')}});</script>`
      : "";
    return `<section><h2>Guestbook</h2>${form}${plainEntries}</section>`;
  }
  if (ctx.family === "internet-diagram") {
    const diagramEntries = model.entries.length
      ? model.entries.map((entry) => `<div class="internet-diagram-index-row"><span>${escapeHtml(entry.message)}</span><em>${escapeHtml(entry.name)} / ${escapeHtml(entry.date)}</em></div>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderInternetDiagramWindow(ctx, "Guestbook", `${button ? `<p class="internet-diagram-action">${button}</p>` : ""}${diagramEntries}`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "data-portfolio") {
    const portfolioEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="data-portfolio-project"><p class="data-portfolio-source">${escapeHtml(entry.name)}</p><p class="data-portfolio-date">${escapeHtml(entry.date)}</p><p class="data-portfolio-note">${escapeHtml(entry.message)}</p></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderDataPortfolioPage(
      ctx,
      `<header class="data-portfolio-section-head"><h1>Guestbook</h1>${button ? `<p class="data-portfolio-action">${button}</p>` : ""}</header>
      <section class="data-portfolio-grid" aria-label="Guestbook entries">${portfolioEntries}</section>`,
    )}${guestbookModalScript()}`;
  }
  if (ctx.family === "consumption-digest") {
    const guestbookEntries = model.entries.length
      ? model.entries.map((entry) => `<p><strong>${escapeHtml(entry.name)}</strong> - ${escapeHtml(entry.message)} <small>${escapeHtml(entry.date)}</small></p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderConsumptionDigestPage(ctx, renderConsumptionDigestDay("guestbook", [{ label: "notes", html: `<div class="consumption-digest-action">${button}</div>${guestbookEntries}` }]))}${guestbookModalScript()}`;
  }
  if (ctx.family === "vernacular-essay") {
    const guestbookEntries = model.entries.length
      ? model.entries.map((entry, index) => `<p><a name="entry-${index + 1}"></a><b>${escapeHtml(entry.name)}</b><br><font size="2">${escapeHtml(entry.date)}</font><br>${escapeHtml(entry.message)}</p>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderVernacularPage(ctx, "Guestbook", `<p>${button}</p><hr>${guestbookEntries}`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "cheap-manifesto") {
    const cheapEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="cheap-manifesto-entry"><p>${escapeHtml(entry.message)}</p><p><strong>${escapeHtml(entry.name)}</strong> <small>${escapeHtml(entry.date)}</small></p></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderCheapManifestoPage(ctx, "Guestbook", `${button ? `<p class="cheap-manifesto-action">${button}</p>` : ""}${cheapEntries}`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "poetic-article") {
    const poeticEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="poetic-entry"><h2>${escapeHtml(entry.name)}</h2><p class="poetic-meta">${escapeHtml(entry.date)}</p><p>${escapeHtml(entry.message)}</p></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderPoeticArticlePage(ctx, "Guestbook", `${button ? `<p class="poetic-action">${button}</p>` : ""}<section class="poetic-section">${poeticEntries}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "feral-essay") {
    const feralEntries = model.entries.length
      ? model.entries.map((entry) => `<article class="feral-entry"><h2>${escapeHtml(entry.name)}</h2><p class="feral-meta">${escapeHtml(entry.date)}</p><p>${escapeHtml(entry.message)}</p></article>`).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderFeralPage(ctx, "Guestbook", `<p class="feral-guestbook-action">${button}</p><section class="feral-section">${feralEntries}</section>`, "Community")}${guestbookModalScript()}`;
  }
  if (ctx.family === "recurse-joy") {
    return `${renderRecurseJoyPage(ctx, `<header class="recurse-joy-page-head"><h2>Guestbook</h2><p>${model.entries.length} entries.</p>${button ? `<p class="recurse-joy-sign">${button}</p>` : ""}</header><div class="recurse-joy-stream">${model.entries.length ? model.entries.map((entry) => `<article class="recurse-joy-entry"><time>${escapeHtml(entry.date)}</time><div><h2>${escapeHtml(entry.name)}</h2><div class="recurse-joy-summary"><p>${escapeHtml(entry.message)}</p></div></div></article>`).join("") : entries}</div>`, "Community")}${guestbookModalScript()}`;
  }
  if (ctx.family === "forecast-report") {
    const reportEntries = model.entries.length
      ? model.entries.map((entry, index) => renderForecastReportEntry("", entry.name, entry.date, `<p>${escapeHtml(entry.message)}</p>`, index)).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderForecastReportPage(ctx, "Guestbook", `${button ? `<p class="forecast-report-sign">${button}</p>` : ""}<section class="forecast-report-panel">${reportEntries}</section>`, { meta: `${model.entries.length} entries` })}${guestbookModalScript()}`;
  }
  if (ctx.family === "research-sidenotes") {
    const noteEntries = model.entries.length
      ? `<ul>${model.entries.map((entry) => renderResearchSidenoteListItem("", entry.name, entry.date, "", `<p>${escapeHtml(entry.message)}</p>`)).join("")}</ul>`
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderResearchSidenotePage(ctx, "Guestbook", `${button ? `<p class="research-sign">${button}</p>` : ""}<section class="research-section research-guestbook">${noteEntries}</section>`, `<p><strong>${model.entries.length}</strong> entries</p>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "essay-blogroll") {
    const blogrollEntries = model.entries.length
      ? model.entries.map((entry) => renderEssayBlogrollEntry("", entry.name, entry.date, `<p>${escapeHtml(entry.message)}</p>`)).join("")
      : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderEssayBlogrollPage(ctx, `<section class="essay-blogroll-posts"><article class="essay-blogroll-entry essay-blogroll-pagehead"><h2>Guestbook</h2><p class="essay-blogroll-meta">${model.entries.length} entries</p>${button ? `<p class="essay-blogroll-sign">${button}</p>` : ""}</article>${blogrollEntries}</section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "forum-frontpage") {
    const forumEntries = model.entries.length
      ? model.entries.map((entry) => renderForumFrontpagePost("", entry.name, entry.date, `<p>${escapeHtml(entry.message)}</p>`)).join("")
      : `<p class="forum-frontpage-meta">No entries yet. Be the first to sign the guestbook!</p>`;
    return `${renderForumFrontpageShell(ctx, `${renderForumFrontpageHead("Guestbook", `<p class="forum-frontpage-meta">${model.entries.length} entries</p>${button ? `<p class="forum-frontpage-sign">${button}</p>` : ""}`)}<section class="forum-frontpage-feed">${forumEntries}</section>`, "Guestbook")}${guestbookModalScript()}`;
  }
  if (ctx.family === "performance-club") {
    const rows = model.entries
      .map((entry, index) => renderPerformanceClubRow([`<span class="performance-club-rank">${index + 1}.</span>`, escapeHtml(entry.name), escapeHtml(entry.message), escapeHtml(entry.date)]))
      .join("");
    return `${renderPerformanceClubPage(
      ctx,
      `${renderPerformanceClubBlock("Guestbook", `<p class="performance-club-count">${model.entries.length} entries.</p>${button ? `<p class="performance-club-sign">${button}</p>` : ""}`, "performance-club-manifesto")}
      ${model.entries.length ? renderPerformanceClubBlock("Entries", renderPerformanceClubTable(["#", "name", "message", "date"], rows, "Guestbook entries")) : `<p class="performance-club-lede">No entries yet. Be the first to sign the guestbook!</p>`}`,
    )}${guestbookModalScript()}`;
  }
  if (ctx.family === "now-directory") {
    return `${renderNowDirectoryPage(ctx, `<article class="now-directory-guestbook"><h2>Guestbook</h2><p>${model.entries.length} entries.</p><p>${button}</p><ul>${model.entries.length ? model.entries.map((entry) => `<li><h3>${escapeHtml(entry.name)}</h3><small>${escapeHtml(entry.date)}</small><p>${escapeHtml(entry.message)}</p></li>`).join("") : `<li><p>No entries yet. Be the first to sign the guestbook!</p></li>`}</ul></article>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "conversational-minimal") {
    return `${renderConversationalMinimalPage(ctx, `<section class="conversational-minimal-guestbook"><h2>guestbook</h2><p>${model.entries.length} entries.</p><p>${button}</p><ul class="conversational-minimal-list">${model.entries.length ? model.entries.map((entry) => `<li><strong>${escapeHtml(entry.name)}</strong> <time>${escapeHtml(entry.date)}</time><p>${escapeHtml(entry.message)}</p></li>`).join("") : `<li>No entries yet. Be the first to sign the guestbook!</li>`}</ul></section>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "founder-index") {
    return `${renderFounderIndexPage(ctx, `<article class="founder-index-article"><h2>Guestbook</h2><p>${model.entries.length} entries.</p><p>${button}</p><ul>${model.entries.length ? model.entries.map((entry) => `<li><strong>${escapeHtml(entry.name)}</strong> <small>${escapeHtml(entry.date)}</small><p>${escapeHtml(entry.message)}</p></li>`).join("") : `<li>No entries yet. Be the first to sign the guestbook!</li>`}</ul></article>`)}${guestbookModalScript()}`;
  }
  if (ctx.family === "grant-page") {
    return `${renderGrantPage(ctx, `<article class="grant-article"><h2>Guestbook</h2><p>${model.entries.length} entries.</p><p>${button}</p><ul>${model.entries.length ? model.entries.map((entry) => `<li><strong>${escapeHtml(entry.name)}</strong> <small>${escapeHtml(entry.date)}</small><p>${escapeHtml(entry.message)}</p></li>`).join("") : `<li>No entries yet. Be the first to sign the guestbook!</li>`}</ul></article>`)}${guestbookModalScript()}`;
  }
  return `<section class="guestbook-header"><h2>Guestbook</h2>${button}</section>${entries}${guestbookModalScript()}`;
}

function renderThemes(model: ThemesModel, ctx: RenderContext): string {
  if (ctx.family === "founder-index") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<li><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <small>${theme.slug === ctx.theme.slug ? "active" : `${escapeHtml(theme.status)} / ${escapeHtml(theme.vibe)}`}</small></li>`)
      .join("");
    return renderFounderIndexPage(
      ctx,
      `<article class="founder-index-article">
        <h2><a href="/themes">Themes</a></h2>
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
        <form class="themes-console founder-index-console"><p><label for="theme-select">Theme</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>Previous</button> <button type="button" data-theme-random>Random</button> <button type="button" data-theme-next>Next</button></p></form>
        <ul>${rows}</ul>
      </article>`,
    );
  }
  if (ctx.family === "grant-page") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<li><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> — ${theme.slug === ctx.theme.slug ? "active" : `${escapeHtml(theme.status)} / ${escapeHtml(theme.vibe)}`}</li>`)
      .join("");
    return renderGrantPage(
      ctx,
      `<article class="grant-article">
        <h2><a href="/themes">Themes</a></h2>
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
        <form class="themes-console grant-console"><p><label for="theme-select">Theme</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>Previous</button> <button type="button" data-theme-random>Random</button> <button type="button" data-theme-next>Next</button></p></form>
        <ul>${rows}</ul>
      </article>`,
    );
  }
  if (ctx.family === "conversational-minimal") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<li><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <small>${theme.slug === ctx.theme.slug ? "active" : `${escapeHtml(theme.status)} / ${escapeHtml(theme.vibe)}`}</small></li>`)
      .join("");
    return renderConversationalMinimalPage(
      ctx,
      `<h2><a href="/themes">themes</a></h2>
      <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console conversational-minimal-console"><p><label for="theme-select">Theme</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>Previous</button> <button type="button" data-theme-random>Random</button> <button type="button" data-theme-next>Next</button></p></form>
      <ul class="conversational-minimal-list">${rows}</ul>`,
    );
  }
  if (ctx.family === "cheap-manifesto") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<li><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <small>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)} / ${escapeHtml(theme.vibe)}</small></li>`)
      .join("");
    return renderCheapManifestoPage(
      ctx,
      "Themes",
      `<p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console cheap-manifesto-console"><label for="theme-select">theme:</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>previous</button> <button type="button" data-theme-random>random</button> <button type="button" data-theme-next>next</button></form>
      <h2>themes ≠ costume</h2>
      <ul>${rows}</ul>`,
    );
  }
  if (ctx.family === "vernacular-essay") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<tr><td><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a></td><td>${escapeHtml(theme.vibe)}</td><td>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)}</td></tr>`)
      .join("");
    return renderVernacularPage(
      ctx,
      "Themes",
      `<p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console vernacular-theme-form"><label for="theme-select">version:</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>previous</button> <button type="button" data-theme-random>random</button> <button type="button" data-theme-next>next</button></form>
      <table class="vernacular-table" cellspacing="0" cellpadding="4"><tbody><tr><th>theme</th><th>vibe</th><th>status</th></tr>${rows}</tbody></table>`,
    );
  }
  if (ctx.family === "poetic-article") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<article class="poetic-entry"><h2><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a></h2><p class="poetic-meta">${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)} ${escapeHtml(theme.category)}</p><p>${escapeHtml(theme.description)}</p></article>`)
      .join("");
    return renderPoeticArticlePage(
      ctx,
      "Themes",
      `<p class="poetic-lede">${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console poetic-theme-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></form>
      <div class="theme-filters poetic-theme-filters">${model.categoryControlsHtml}</div>
      <section class="poetic-section">${rows}</section>`,
      "newsletter",
    );
  }
  if (ctx.family === "feral-essay") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<article class="feral-entry"><h2><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a></h2><p class="feral-meta">${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)} · ${escapeHtml(theme.category)}</p><p>${escapeHtml(theme.description)}</p></article>`)
      .join("");
    return renderFeralPage(
      ctx,
      "Themes",
      `<p class="feral-lede">${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console feral-theme-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></form>
      <div class="theme-filters feral-theme-filters">${model.categoryControlsHtml}</div>
      <section class="feral-section">${rows}</section>`,
      "Platform",
    );
  }
  if (ctx.family === "recurse-joy") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => renderRecurseJoyEntry(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, theme.description))
      .join("");
    return renderRecurseJoyPage(
      ctx,
      `<header class="recurse-joy-page-head"><h2>Themes</h2><p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p></header>
      <form class="themes-console recurse-joy-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></form>
      <div class="theme-filters recurse-joy-filters">${model.categoryControlsHtml}</div>
      <div class="recurse-joy-stream">${rows}</div>`,
      "Themes",
    );
  }
  if (ctx.family === "forecast-report") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme, index) => renderForecastReportEntry(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, escapeHtml(theme.description), index))
      .join("");
    return renderForecastReportPage(
      ctx,
      "Themes",
      `<section class="forecast-report-summary"><p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p></section>
      <form class="themes-console forecast-report-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></form>
      <div class="theme-filters forecast-report-filters">${model.categoryControlsHtml}</div>
      <section class="forecast-report-panel">${rows}</section>`,
      { kicker: "Report Display", meta: ctx.theme.name },
    );
  }
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
  if (ctx.family === "art-index") {
    const rows = model.themes.map((theme) => renderArtIndexRow(theme.status, `?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.vibe)).join("");
    return `<section class="art-index">${renderArtIndexHeader(ctx)}<h2>themes</h2><div class="themes-console art-index-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div></div><div class="theme-filters">${model.categoryControlsHtml}</div><div class="art-index-chronology">${rows}</div></section>`;
  }
  if (ctx.family === "studio-index") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme, index) => renderStudioIndexTextRow(theme.name, `?theme=${theme.slug}`, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, index)).join("");
    return `<section class="studio-index">${renderStudioIndexHeader(ctx, `<p>${model.themes.length} layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>`, "Information")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Built", "Planned", "Reference"])}<div class="studio-index-content"><div class="themes-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="studio-index-list">${rows}</div></div></div></section>`;
  }
  if (ctx.family === "artist-menu") {
    const rows = model.themes.map((theme) => renderArtistMenuWork(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status)).join("");
    return renderArtistMenuPage(
      ctx,
      `<section class="artist-menu-works artist-menu-index">
        <h1>Themes</h1>
        <div class="themes-console artist-menu-theme-console">
          <label for="theme-select">Theme</label>
          <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select>
          <button type="button" data-theme-prev>Previous</button>
          <button type="button" data-theme-random>Random</button>
          <button type="button" data-theme-next>Next</button>
        </div>
        <div class="works-list">${rows}</div>
      </section>`,
    );
  }
  if (ctx.family === "cargo-cv") {
    const items = model.themes.map((theme) => `<a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <span>${escapeHtml(theme.status)}</span>`);
    return renderCargoCvPage(ctx, "Themes", `<h2>Lifeworks:</h2><div class="themes-console cargo-cv-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>${renderCargoCvList(items)}`);
  }
  if (ctx.family === "garden-notebook") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    return renderGardenPage(ctx, `<h1>Themes</h1><p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p><div class="themes-console garden-theme-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}`);
  }
  if (ctx.family === "uncertainty") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme) => renderUncertaintyLine(theme.name, `?theme=${theme.slug}`, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.vibe)).join("");
    return renderUncertaintyPage(
      ctx,
      "Themes",
      `<p>${model.themes.length} layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p><div class="themes-console uncertainty-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>`,
      `<section class="uncertainty-group">${rows}</section>`,
    );
  }
  if (ctx.family === "taste-directory") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme, index) => `<article class="taste-card"><div class="taste-author"><span class="taste-avatar">${String(index + 1).padStart(2, "0")}</span><div><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a><time>${escapeHtml(theme.category)}</time></div><strong>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)}</strong></div><div class="taste-card-body"><h2><a href="?theme=${theme.slug}">${escapeHtml(theme.vibe)}</a></h2><p>${escapeHtml(theme.description)}</p></div></article>`)
      .join("");
    return renderTasteDirectoryPage(
      ctx,
      `${renderTasteSectionHead("Themes", `${model.themes.length} layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.`, "Theme: Taste Directory")}<div class="themes-console taste-theme-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div><div class="theme-filters taste-theme-filters">${model.categoryControlsHtml}</div><div class="taste-feed">${rows}</div>`,
      "Browse",
    );
  }
  if (ctx.family === "writer-ledger") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme) => renderWriterLedgerRow(theme.name, `?theme=${theme.slug}`, theme.status, theme.category)).join("");
    return `<section class="writer-ledger">${renderWriterLedgerRecent(`${model.themes.length} layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.`)}${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-theme-tools themes-console"><label for="theme-select">( theme )</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></section><section class="writer-ledger-work"><h2>Title <span>Status</span> <span>Category</span> <span>↓</span></h2><div class="writer-ledger-table">${rows}</div></section></section>`;
  }
  if (ctx.family === "games-cabinet") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme, index) => renderGamesCabinetWork(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.description, null, index)).join("");
    return renderGamesCabinetPage(
      ctx,
      `<section class="games-cabinet-page-head">
        <h1>Themes</h1>
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
        <div class="themes-console games-cabinet-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>
      </section>
      <div class="games-cabinet-list">${rows}</div>`,
    );
  }
  if (ctx.family === "portal-gallery") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme, index) => renderPortalTile(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, theme.description, index))
      .join("");
    return renderPortalPage(
      ctx,
      `<header class="portal-section-head">
        <h1>Themes</h1>
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
        <div class="themes-console portal-theme-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>
      </header>
      <div class="theme-filters portal-theme-filters">${model.categoryControlsHtml}</div>
      <section class="portal-gallery-wall">${rows}</section>`,
    );
  }
  if (ctx.family === "visual-culture") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes.map((theme) => renderVisualCultureWork(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category)).join("");
    return renderVisualCulturePage(
      ctx,
      "Themes",
      `<div class="visual-culture-intro"><p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p></div>
      <div class="themes-console visual-culture-theme-console">
        <label for="theme-select">Theme</label>
        <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select>
        <button type="button" data-theme-prev>Previous</button>
        <button type="button" data-theme-random>Random</button>
        <button type="button" data-theme-next>Next</button>
      </div>
      <div class="theme-filters visual-culture-filters">${model.categoryControlsHtml}</div>
      <div class="visual-culture-contact">${rows}</div>`,
      "visual-culture-themes",
    );
  }
  if (ctx.family === "download-index") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme, index) => renderDownloadIndexRow(index + 1, theme.name, `?theme=${theme.slug}`, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, theme.vibe))
      .join("");
    return renderDownloadIndexPage(
      ctx,
      "Themes",
      `<p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <div class="themes-console download-index-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>`,
      `<div class="theme-filters download-index-filters">${model.categoryControlsHtml}</div><section class="download-index-table" aria-label="Theme records">${rows}</section>`,
      `${model.themes.length} records`,
    );
  }
  if (ctx.family === "visual-index") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const records = model.themes.map((theme) => ({
      href: `?theme=${theme.slug}`,
      title: theme.name,
      date: theme.slug === ctx.theme.slug ? "2026-06-16" : "",
      label: theme.slug === ctx.theme.slug ? "active" : theme.status,
    }));
    return renderVisualIndexPage(
      ctx,
      `<section class="visual-index-intro">
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
        <div class="themes-console visual-index-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>
      </section>
      <div class="theme-filters visual-index-filters">${model.categoryControlsHtml}</div>
      ${renderVisualIndexGroupedSection("Themes", records)}`,
    );
  }
  if (ctx.family === "no-css") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<li><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> <small>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)} / ${escapeHtml(theme.vibe)}</small></li>`)
      .join("");
    return `<section>
      <h2>Themes</h2>
      <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <form class="themes-console"><p><label for="theme-select">Theme</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>Previous</button> <button type="button" data-theme-random>Random</button> <button type="button" data-theme-next>Next</button></p></form>
      <ul>${rows}</ul>
    </section>`;
  }
  if (ctx.family === "html-bulletin") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<p><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a><br><small>${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)}</small></p>`)
      .join("");
    return renderHtmlBulletinPage(
      ctx,
      "themes",
      `<p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      <div class="themes-console html-bulletin-console"><label for="theme-select">Theme</label> <select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select> <button type="button" data-theme-prev>Previous</button> <button type="button" data-theme-random>Random</button> <button type="button" data-theme-next>Next</button></div>
      ${rows}`,
    );
  }
  if (ctx.family === "consumption-digest") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme) => `<p><a href="?theme=${theme.slug}">${escapeHtml(theme.name)}</a> - ${theme.slug === ctx.theme.slug ? "active" : escapeHtml(theme.status)} <small>${escapeHtml(theme.vibe)}</small></p>`)
      .join("");
    return renderConsumptionDigestPage(
      ctx,
      renderConsumptionDigestDay("themes", [
        {
          label: "picker",
          html: `<div class="themes-console consumption-digest-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div>`,
        },
        { label: "text", html: rows },
      ]),
      `<p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>`,
    );
  }
  if (ctx.family === "data-portfolio") {
    const builtCount = model.themes.filter((theme) => theme.status === "built").length;
    const rows = model.themes
      .map((theme, index) => renderDataPortfolioProject(`?theme=${theme.slug}`, theme.name, theme.slug === ctx.theme.slug ? "active" : theme.status, theme.category, escapeHtml(theme.description), null, index))
      .join("");
    return renderDataPortfolioPage(
      ctx,
      `<header class="data-portfolio-section-head">
        <h1>Themes</h1>
        <p>${model.themes.length} direct layouts from Ryan's reference list. ${builtCount} themes are currently built with dedicated layout treatment.</p>
      </header>
      <div class="themes-console data-portfolio-theme-console"><label for="theme-select">Theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div>
      <div class="theme-filters data-portfolio-filters">${model.categoryControlsHtml}</div>
      ${renderDataPortfolioViewToggle()}
      <section class="data-portfolio-grid" aria-label="Theme records">${rows}</section>`,
    );
  }
  const builtCount = model.themes.filter((theme) => theme.status === "built").length;
  return `<section class="themes-hero"><div><p class="themes-eyebrow">Supplied Site Mimics</p><h2>${model.themes.length} direct layouts from Ryan's reference list.</h2><p>The content stays stable while each theme mimics one supplied target site. ${builtCount} themes are currently built with dedicated layout treatment; planned themes remain visible as implementation targets.</p></div><div class="themes-console"><label for="theme-select">Current theme</label><select id="theme-select" data-theme-select>${model.selectOptionsHtml}</select><div class="theme-picker-controls"><button type="button" data-theme-prev>Previous</button><button type="button" data-theme-random>Random</button><button type="button" data-theme-next>Next</button></div><p>Selected: <strong data-theme-current>${escapeHtml(ctx.theme.name)}</strong></p></div></section><div class="theme-filters">${model.categoryControlsHtml}</div>${model.themeSectionsHtml}`;
}

function renderArchiveIndexHeader(ctx: RenderContext, title: string, detailHtml: string, countLabel: string, titleClass = ""): string {
  const brand = title === "Ryan Prendergast" ? "" : `<a class="archive-index-brand" href="/">Ryan Prendergast</a>`;
  return `<header class="archive-index-header"><div class="archive-index-topline">${brand}<nav class="archive-index-nav" aria-label="Site">${b1Nav(ctx)}</nav>${countLabel ? `<span class="archive-index-count">${escapeHtml(countLabel)}</span>` : ""}</div><div class="archive-index-title ${titleClass}"><h1>${escapeHtml(title)}</h1>${detailHtml ? `<div class="archive-index-detail">${detailHtml}</div>` : ""}</div></header>`;
}

function renderArchiveIndexNames(counts: Map<string, number>, hrefFor: (label: string) => string = () => "/"): string {
  const entries = Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b));
  return `<div class="archive-index-names">${entries.map(([label, count]) => `<a href="${hrefFor(label)}"><span>${escapeHtml(label)}</span><em>${count}</em></a>`).join("")}</div>`;
}

function renderResearchSidenoteNav(ctx: RenderContext): string {
  const navigation = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<header class="research-masthead">
    ${ctx.currentPage === "/" ? "" : `<a class="research-wordmark" href="/">Ryan Prendergast</a>`}
    <nav aria-label="Core site areas">${navigation.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>
  </header>`;
}

function renderResearchSidenotePage(ctx: RenderContext, title: string, contentHtml: string, marginHtml = ""): string {
  return `<article class="research-page">
    ${renderResearchSidenoteNav(ctx)}
    <div class="research-layout">
      <main class="research-main">
        <h1>${escapeHtml(title)}</h1>
        ${contentHtml}
      </main>
      ${marginHtml ? `<aside class="research-margin" aria-label="Page notes">${marginHtml}</aside>` : ""}
    </div>
  </article>`;
}

function renderResearchSidenoteListItem(href: string, title: string, meta: string, note = "", detailHtml = ""): string {
  const annotation = [meta, note].filter(Boolean).join(" · ");
  return `<li>
    ${href ? `<a href="${href}">${escapeHtml(title)}</a>` : `<strong>${escapeHtml(title)}</strong>`}
    ${annotation ? `<span class="sidenote">${escapeHtml(annotation)}</span>` : ""}
    ${detailHtml ? `<div class="research-detail">${detailHtml}</div>` : ""}
  </li>`;
}

function renderResearchSidenoteGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderResearchSidenotePage(
    ctx,
    model.heading,
    `<section class="research-section research-generic">${model.contentHtml}</section>`,
  );
}

function renderArchiveIndexRow(title: string, href: string, source: string, date: string, detail: string): string {
  return `<a class="archive-index-row" href="${href}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(source)}</span><time>${escapeHtml(date)}</time>${detail ? `<small>${escapeHtml(detail)}</small>` : ""}</a>`;
}

function renderArchiveIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="archive-index archive-index-article">${renderArchiveIndexHeader(ctx, model.heading, "", "")}<div class="archive-index-copy">${model.contentHtml}</div></article>`;
}

function renderArtIndexHeader(ctx: RenderContext, introHtml = ""): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<header class="art-index-header"><a class="art-index-coordinates" href="https://www.google.com/maps?q=40.7128,-74.0060">LAT: 40.7128 LNG: -74.0060</a><h1><a href="/">Ryan Prendergast</a></h1>${introHtml ? `<div class="art-index-intro">${introHtml}</div>` : ""}<nav class="art-index-nav" aria-label="Core site areas">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav></header>`;
}

function renderArtIndexRow(year: string, href: string, title: string, detail = "", badge = ""): string {
  return `<a class="art-row" href="${href}"><span>${escapeHtml(year)}</span><strong>${escapeHtml(title)}</strong>${detail ? `<em>${escapeHtml(detail)}</em>` : "<em></em>"}${badge ? `<small>${escapeHtml(badge)}</small>` : ""}</a>`;
}

function renderArtIndexFooter(detailHtml = ""): string {
  return detailHtml ? `<footer class="art-index-footer"><div>${detailHtml}</div></footer>` : "";
}

// Plain text of a link's commentary: tags stripped and the common entities decoded, so escapeHtml does not double-escape them.
function linkCommentaryText(html: string): string {
  return stripHtml(html)
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function renderArtIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="art-index art-index-record">${renderArtIndexHeader(ctx)}<h2>${escapeHtml(model.heading)}</h2><div class="blog-post-content">${model.contentHtml}</div></article>`;
}

function getArtIndexYearLabel(value: string): string {
  return value.match(/\b(20\d{2}|19\d{2})\b/)?.[1] || "ongoing";
}

function countBy(values: string[]): Map<string, number> {
  return values.reduce((counts, value) => {
    const key = value || "Unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map<string, number>());
}

function renderWordmarkNav(ctx: RenderContext): string {
  const brand = ctx.currentPage === "/" ? "" : `<a class="wordmark-brand" href="/">Ryan Prendergast</a>`;
  return `<header class="wordmark-top">${brand}<nav class="wordmark-primary" aria-label="Site">${b1Nav(ctx)}</nav></header>`;
}

function renderResearchToolsHeader(ctx: RenderContext, introHtml = ""): string {
  return `<header class="research-tools-header"><a class="research-tools-mark" href="/">Ryan Prendergast</a><nav class="research-tools-nav" aria-label="Site">${b1Nav(ctx, true)}</nav>${introHtml ? `<div class="research-tools-copy">${introHtml}</div>` : ""}</header>`;
}

function renderBuilderNotesNav(ctx: RenderContext): string {
  const home = ctx.currentPage === "/" ? `<a class="is-active" href="/" aria-current="page">home</a>` : `<a class="builder-notes-name" href="/">Ryan Prendergast</a>`;
  return `<nav class="builder-notes-nav" aria-label="Site">${home}${b1Nav(ctx, true, true)}</nav>`;
}

function renderArtLibraryHeader(ctx: RenderContext, section: string, detailHtml: string): string {
  return `<header class="art-library-header"><a class="art-library-brand" href="/">Ryan Prendergast</a><nav class="art-library-primary" aria-label="Site">${b1Nav(ctx)}</nav><nav class="art-library-hours" aria-label="Catalogue"><span>Catalogue</span><a class="${ctx.currentPage === "/archives" ? "is-active" : ""}" href="/archives">Archive by month</a><a href="/rss.xml">RSS feed</a></nav><div class="art-library-section"><h1>${escapeHtml(section)}</h1>${detailHtml ? `<div class="art-library-detail">${detailHtml}</div>` : ""}</div></header>`;
}

function renderArtLibraryCategories(categories: Array<[string, string, boolean]>): string {
  return `<nav class="art-library-categories" aria-label="Catalogue sections">${categories.map(([label, href, active]) => `<a class="${active ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderArtLibraryTable(headers: string[], rows: string[][]): string {
  const body = rows.length
    ? rows.map((row) => `<tr>${row.map((cell) => `<td><span class="bordered">${cell}</span></td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${headers.length}"><span class="bordered">No Records Found</span></td></tr>`;
  return `<div class="art-library-table-wrap"><table class="art-library-table"><thead><tr>${headers.map((header) => `<th><span class="bordered">${escapeHtml(header)}</span></th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderBuilderNotesPostLine(post: PostSummaryModel): string {
  return `<p class="builder-note-line"><a href="${post.href}">${escapeHtml(post.title)}</a><br><small>${escapeHtml(post.date)}${post.readTime ? ` · ${escapeHtml(post.readTime)}` : ""}</small></p>`;
}

function renderBuilderNotesLinkLine(link: LinkEntryModel): string {
  return `<article class="builder-note-line"><p><a href="${link.url}">${escapeHtml(link.title)}</a> <small>${escapeHtml(link.domain)} · ${escapeHtml(link.date)}</small></p><div>${link.contentHtml}</div></article>`;
}

function renderWordmarkHero(introHtml: string): string {
  return `<header class="wordmark-hero"><h1><span>Ryan</span> <span>Prendergast</span></h1><div class="wordmark-hero-copy">${introHtml}</div></header>`;
}

function renderWordmarkGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="wordmark-studio wordmark-article">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader("", model.heading)}<div class="wordmark-copy">${model.contentHtml}</div></article>`;
}

function renderBuilderNotesGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="builder-notes builder-notes-article">${renderBuilderNotesNav(ctx)}<header><h1>${escapeHtml(model.heading.toLowerCase())}</h1></header><div class="builder-notes-copy">${model.contentHtml}</div></article>`;
}

function renderManualGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="manual-page manual-document">${renderManualHeader(ctx, model.heading, "", [])}${renderManualRule()}<section class="manual-entry-body manual-copy">${model.contentHtml}</section></article>`;
}

function renderArtLibraryGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="art-library art-library-record">${renderArtLibraryHeader(ctx, model.heading, "")}<div class="art-library-copy">${model.contentHtml}</div></article>`;
}

// ===== Batch 1 families: manual, scoreboard, archive-index, wordmark-studio, builder-notes, research-tools, art-library =====

const b1NavLinks: Array<[string, string]> = [
  ["/", "Home"],
  ["/links", "Links"],
  ["/blog", "Writing"],
  ["/photos", "Photography"],
  ["/guestbook", "Guestbook"],
  ["/contact", "Contact"],
];

function b1Nav(ctx: RenderContext, lowercase = false, skipHome = false): string {
  return b1NavLinks
    .filter(([href]) => !(skipHome && href === "/"))
    .map(([href, label]) => {
      const current = ctx.currentPage === href;
      return `<a class="${current ? "is-active" : ""}" href="${href}"${current ? ' aria-current="page"' : ""}>${lowercase ? label.toLowerCase() : label}</a>`;
    })
    .join("");
}

// Plain text of an HTML fragment with entities decoded, so it can be escaped exactly once.
function b1Text(html: string): string {
  return stripHtml(html)
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function b1Plain(html: string): string {
  return escapeHtml(b1Text(html));
}

function b1ShortDate(date: string): string {
  const match = date.match(/^([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})$/);
  return match ? `${match[1]} ${match[2].padStart(2, "0")}, ${match[3]}` : date;
}

function b1IndexTitle(ctx: RenderContext): string {
  return ctx.currentPage === "/photos" ? "Photography" : "Writing";
}

function b1SignButton(model: GuestbookModel): string {
  return model.canSign ? `<button type="button" onclick="showGuestbookModal()">Sign Guestbook</button>` : "";
}

function b1Wrap(text: string, width: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= width) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word.length > width ? `${word.slice(0, width - 1)}…` : word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    const last = kept[maxLines - 1];
    kept[maxLines - 1] = `${last.length > width - 1 ? last.slice(0, width - 1) : last}…`;
    return kept;
  }
  while (lines.length < maxLines) lines.push("");
  return lines;
}

// ----- manual -----

function b1ManualHome(model: HomeModel, ctx: RenderContext): string {
  const links = `<section id="links"><h2>Links</h2>${model.links.map((link, index) => renderManualLinkEntry(link, index)).join("")}</section>`;
  const updated = escapeHtml(model.links[0]?.date || "");
  if (ctx.currentPage === "/links") {
    return `<article class="manual-page">${renderManualHeader(ctx, "Links", `<p>${model.aboutHtml}</p>`, [["Author", "Ryan Prendergast"], ["Entries", String(model.links.length)], ["Updated", updated]])}${renderManualRule()}${links}</article>`;
  }
  const essayRows = model.recentPosts
    .map((post) => `<tr><td>${escapeHtml(b1ShortDate(post.date))}</td><td><a href="${post.href}">${escapeHtml(post.title)}</a></td><td>${escapeHtml(post.readTime || "")}</td></tr>`)
    .join("");
  const essays = `<section id="writing"><h2>Recent Writing</h2><table class="manual-list"><thead><tr><th>Date</th><th>Title</th><th>Length</th></tr></thead><tbody>${essayRows}</tbody></table><p><a href="/blog">All writing</a></p></section>`;
  return `<article class="manual-page">${renderManualHeader(ctx, "Ryan Prendergast", model.introHtml, [["Links", String(model.links.length)], ["Recent writing", String(model.recentPosts.length)], ["Updated", updated]])}${renderManualToc([["#writing", "Recent Writing"], ["#links", "Links"]])}${renderManualRule()}${essays}${renderManualRule()}${links}</article>`;
}

function b1ManualBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const title = b1IndexTitle(ctx);
  const rows: Array<[string, string]> = [["Author", "Ryan Prendergast"], ["Entries", String(model.totalPosts)]];
  if (model.yearRange) rows.push(["Years", `${model.yearRange[0]}-${model.yearRange[1]}`]);
  const sections = model.postsByYear
    .map((group) => `<section id="year-${slugify(group.year)}" class="manual-year"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post, index) => renderManualPostSummary(post, index)).join("")}</section>`)
    .join("");
  const seeAlso = ctx.currentPage === "/blog" ? `<p>See also: <a href="/archives">archive tree</a>.</p>` : "";
  return `<article class="manual-page">${renderManualHeader(ctx, title, `<p>${escapeHtml(model.description)}</p>`, rows)}${renderManualToc(model.postsByYear.map((group) => [`#year-${slugify(group.year)}`, group.year]))}${renderManualRule()}${sections}${seeAlso}</article>`;
}

function b1ManualPost(model: BlogPostModel, ctx: RenderContext): string {
  const rows: Array<[string, string]> = [["Author", escapeHtml(model.author || "Ryan Prendergast")], ["Date", escapeHtml(model.date)], ["Back", `<a href="${model.backHref}">${escapeHtml(model.backLabel)}</a>`]];
  return `<article class="manual-page manual-document">${renderManualHeader(ctx, model.title, model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : "", rows)}${renderManualRule()}<section class="manual-entry-body manual-copy">${model.contentHtml}</section></article>`;
}

function b1ManualArchives(model: ArchiveModel, ctx: RenderContext): string {
  const tree = model.months
    .map((month) => `${escapeHtml(month.key)}/\n${month.posts.map((post) => `  <a href="${post.href}">${escapeHtml(post.slug)}</a>`).join("\n")}`)
    .join("\n");
  const sections = model.months
    .map((month) => `<section id="month-${slugify(month.key)}" class="manual-year"><h2>${escapeHtml(month.label)}</h2>${month.posts.map((post, index) => renderManualPostSummary(post, index)).join("")}</section>`)
    .join("");
  return `<article class="manual-page">${renderManualHeader(ctx, "Archive Tree", "", [["Author", "Ryan Prendergast"], ["Entries", String(model.totalPosts)], ["Months", String(model.months.length)]])}${renderManualToc(model.months.map((month) => [`#month-${slugify(month.key)}`, month.label]))}${renderManualRule()}<pre>${tree}</pre>${sections}</article>`;
}

function b1ManualGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const entries = model.entries.length
    ? model.entries.map((entry) => `<article class="manual-entry"><table><tbody><tr><th>Name</th><td>${escapeHtml(entry.name)}</td></tr><tr><th>Date</th><td>${escapeHtml(entry.date)}</td></tr></tbody></table><p>${escapeHtml(entry.message)}</p></article>`).join("")
    : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
  return `<article class="manual-page">${renderManualHeader(ctx, "Guestbook", "", [["Site", "Ryan Prendergast"], ["Entries", String(model.entries.length)]])}${renderManualRule()}<section id="sign" class="manual-form">${b1SignButton(model)}</section><section id="entries"><h2>Entries</h2>${entries}</section></article>${guestbookModalScript()}`;
}

// ----- scoreboard -----

function b1ScoreboardHome(model: HomeModel, ctx: RenderContext): string {
  const linksOnly = ctx.currentPage === "/links";
  const rows = model.links.map((link, index) => [
    String(index + 1),
    escapeHtml(b1ShortDate(link.date)),
    `<a href="${link.url}">${escapeHtml(link.title)}</a><span class="scoreboard-note">${b1Plain(link.contentHtml)}</span>`,
    escapeHtml(link.domain),
  ]);
  const table = renderScoreboardTable(["#", "Date", "Entry", "Source"], rows, "scoreboard-links");
  if (linksOnly) {
    return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Links", `${model.links.length} entries`)}<p class="scoreboard-identity">${model.aboutHtml}</p>${table}</section>`;
  }
  const boxes = model.recentPosts
    .map((post) => renderScoreboardBox([b1ShortDate(post.date), ...b1Wrap(post.title, 24, 2), post.readTime || ""], post.href))
    .join("");
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Home", `${model.links.length} links · ${model.recentPosts.length} recent writing`)}<section class="scoreboard-identity">${model.introHtml}</section><h2>Recent Writing</h2><div class="scoreboard-box-grid">${boxes}</div><p><a href="/blog">All writing &gt;</a></p><h2>Links</h2>${table}</section>`;
}

function b1ScoreboardBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const yearTables = model.postsByYear
    .map((group) => {
      const rows = group.posts.map((post) => [escapeHtml(b1ShortDate(post.date)), `<a href="${post.href}">${escapeHtml(post.title)}</a>`, escapeHtml(post.readTime || "")]);
      return `<h2>${escapeHtml(group.year)}</h2>${renderScoreboardTable(["Date", "Title", "Length"], rows, "scoreboard-posts")}`;
    })
    .join("");
  const byMonth = ctx.currentPage === "/blog" ? `<p><a href="/archives">By month &gt;</a></p>` : "";
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, b1IndexTitle(ctx), `${model.totalPosts} entries`)}<p class="scoreboard-identity">${escapeHtml(model.description)}</p>${yearTables}${byMonth}</section>`;
}

function b1ScoreboardPost(model: BlogPostModel, ctx: RenderContext): string {
  const isPhotos = ctx.currentPage === "/photos";
  const fields = [["Date", escapeHtml(model.date)], ["Back", `<a href="${model.backHref}">&lt; ${escapeHtml(model.backLabel)}</a>`]];
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, isPhotos ? "Photography" : "Writing", "")}<h2>${escapeHtml(model.title)}</h2>${model.subtitle ? `<p class="scoreboard-state">${escapeHtml(model.subtitle)}</p>` : ""}${renderScoreboardTable(["Field", "Value"], fields, "scoreboard-fields")}<article class="scoreboard-article">${model.contentHtml}</article></section>`;
}

function b1ScoreboardArchives(model: ArchiveModel, ctx: RenderContext): string {
  const rows = model.months.map((month) => [escapeHtml(month.label), String(month.posts.length), month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("<br>")]);
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Archive", `${model.totalPosts} pieces · ${model.months.length} months`)}${renderScoreboardTable(["Month", "#", "Writing"], rows, "scoreboard-months")}<p><a href="/blog">&lt; Writing</a></p></section>`;
}

function b1ScoreboardGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const rows = model.entries.map((entry) => [escapeHtml(b1ShortDate(entry.date)), escapeHtml(entry.name), escapeHtml(entry.message)]);
  const table = rows.length ? renderScoreboardTable(["Date", "Name", "Message"], rows, "scoreboard-guestbook") : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, "Guestbook", `${model.entries.length} entries`)}<p class="scoreboard-action">${b1SignButton(model)}</p>${table}</section>${guestbookModalScript()}`;
}

function renderScoreboardGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<section class="scoreboard">${renderScoreboardHeader(ctx, model.heading, "")}<article class="scoreboard-article">${model.contentHtml}</article></section>`;
}

// ----- archive-index -----

function b1ArchiveIndexSection(title: string, count: number, bodyHtml: string, moreHtml = ""): string {
  return `<section class="archive-index-feed"><h2>${escapeHtml(title)}<sup>${count}</sup></h2><div class="archive-index-list">${bodyHtml}</div>${moreHtml}</section>`;
}

function b1ArchiveIndexHome(model: HomeModel, ctx: RenderContext): string {
  const linkRows = model.links.map((link) => renderArchiveIndexRow(link.title, link.url, link.domain, link.date, b1Text(link.contentHtml))).join("");
  const links = b1ArchiveIndexSection("Links", model.links.length, linkRows);
  if (ctx.currentPage === "/links") {
    return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Links", `<p>${model.aboutHtml}</p>`, `${model.links.length} entries`)}<section class="archive-index-feed"><div class="archive-index-list">${linkRows}</div></section></section>`;
  }
  const postRows = model.recentPosts.map((post) => renderArchiveIndexRow(post.title, post.href, post.readTime || "", post.date, "")).join("");
  const essays = b1ArchiveIndexSection("Writing", model.recentPosts.length, postRows, `<p class="archive-index-more"><a href="/blog">All writing</a></p>`);
  return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Ryan Prendergast", model.introHtml, `${model.links.length} links / ${model.recentPosts.length} pieces`)}${essays}${links}</section>`;
}

function b1ArchiveIndexBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const yearCounts = new Map(model.postsByYear.map((group) => [group.year, group.posts.length] as [string, number]));
  const records = model.postsByYear
    .map((group) => `<section id="y-${slugify(group.year)}" class="archive-index-month"><h3>${escapeHtml(group.year)}</h3><div class="archive-index-list">${group.posts.map((post) => renderArchiveIndexRow(post.title, post.href, post.readTime || "", post.date, post.excerpt || "")).join("")}</div></section>`)
    .join("");
  const more = ctx.currentPage === "/blog" ? `<p class="archive-index-more"><a href="/archives">By month</a></p>` : "";
  return `<section class="archive-index">${renderArchiveIndexHeader(ctx, b1IndexTitle(ctx), `<p>${escapeHtml(model.description)}</p>`, `${model.totalPosts} entries`)}<section class="archive-index-directory"><div><h2>Years</h2>${renderArchiveIndexNames(yearCounts, (label) => `#y-${slugify(label)}`)}${more}</div><div><h2>Titles</h2>${records}</div></section></section>`;
}

function b1ArchiveIndexPost(model: BlogPostModel, ctx: RenderContext): string {
  return `<article class="archive-index archive-index-article">${renderArchiveIndexHeader(ctx, model.title, model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : "", model.date, "is-long")}<div class="archive-index-record-meta"><a href="${model.backHref}">&larr; ${escapeHtml(model.backLabel)}</a></div><div class="archive-index-copy">${model.contentHtml}</div></article>`;
}

function b1ArchiveIndexArchives(model: ArchiveModel, ctx: RenderContext): string {
  const monthCounts = new Map(model.months.map((month) => [month.label, month.posts.length] as [string, number]));
  const records = model.months
    .map((month) => `<section id="${slugify(month.label)}" class="archive-index-month"><h3>${escapeHtml(month.label)}</h3><div class="archive-index-list">${month.posts.map((post) => renderArchiveIndexRow(post.title, post.href, post.readTime || "", post.date, "")).join("")}</div></section>`)
    .join("");
  return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Archive", `<p>${model.totalPosts} pieces across ${model.months.length} months.</p>`, `${model.totalPosts} records`)}<section class="archive-index-directory"><div><h2>Months</h2>${renderArchiveIndexNames(monthCounts, (label) => `#${slugify(label)}`)}</div><div><h2>Records</h2>${records}</div></section></section>`;
}

function b1ArchiveIndexGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const rows = model.entries.length
    ? model.entries.map((entry) => `<div class="archive-index-row"><strong>${escapeHtml(entry.name)}</strong><span></span><time>${escapeHtml(entry.date)}</time><small>${escapeHtml(entry.message)}</small></div>`).join("")
    : `<p class="archive-index-empty">No entries yet. Be the first to sign the guestbook!</p>`;
  return `<section class="archive-index">${renderArchiveIndexHeader(ctx, "Guestbook", b1SignButton(model), `${model.entries.length} entries`)}<section class="archive-index-feed"><div class="archive-index-list">${rows}</div></section></section>${guestbookModalScript()}`;
}

// ----- wordmark-studio -----

function b1WordmarkPageHeader(label: string, title: string, detail = ""): string {
  return `<header class="wordmark-page-header">${label ? `<p>${label}</p>` : ""}<h1>${escapeHtml(title)}</h1>${detail ? `<span>${detail}</span>` : ""}</header>`;
}

function b1WordmarkHome(model: HomeModel, ctx: RenderContext): string {
  const linkProjects = model.links
    .map((link) => `<a class="wordmark-project" href="${link.url}"><small>${escapeHtml(link.domain)} · ${escapeHtml(b1ShortDate(link.date))}</small><span>${escapeHtml(link.title)}</span><em>${b1Plain(link.contentHtml)}</em></a>`)
    .join("");
  const linkSection = `<section class="wordmark-section"><div class="wordmark-section-head"><h2>Links</h2><span>${model.links.length} entries</span></div><div class="wordmark-grid">${linkProjects}</div></section>`;
  if (ctx.currentPage === "/links") {
    return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader(`${model.links.length} entries`, "Links", model.aboutHtml)}<section class="wordmark-section"><div class="wordmark-grid">${linkProjects}</div></section></section>`;
  }
  const writingProjects = model.recentPosts
    .map((post) => `<a class="wordmark-project" href="${post.href}"><small>${escapeHtml(b1ShortDate(post.date))}${post.readTime ? ` · ${escapeHtml(post.readTime)}` : ""}</small><span>${escapeHtml(post.title)}</span>${post.excerpt ? `<em>${escapeHtml(post.excerpt)}</em>` : ""}</a>`)
    .join("");
  return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${renderWordmarkHero(model.introHtml)}<section class="wordmark-section"><div class="wordmark-section-head"><h2>Writing</h2><a href="/blog">All writing</a></div><div class="wordmark-grid">${writingProjects}</div></section>${linkSection}</section>`;
}

function b1WordmarkBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const rows = model.postsByYear
    .flatMap((group) => group.posts.map((post) => `<a href="${post.href}"><span>${escapeHtml(post.title)}</span><small>${escapeHtml(b1ShortDate(post.date))}${post.readTime ? ` · ${escapeHtml(post.readTime)}` : ""}</small></a>`))
    .join("");
  const more = ctx.currentPage === "/blog" ? `<p class="wordmark-more"><a href="/archives">By month</a></p>` : "";
  return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader(`${model.totalPosts} entries`, b1IndexTitle(ctx), escapeHtml(model.description))}<div class="wordmark-list">${rows}</div>${more}</section>`;
}

function b1WordmarkPost(model: BlogPostModel, ctx: RenderContext): string {
  return `<article class="wordmark-studio wordmark-article">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader(`<a href="${model.backHref}">&larr; ${escapeHtml(model.backLabel)}</a> · ${escapeHtml(model.date)}`, model.title, model.subtitle ? escapeHtml(model.subtitle) : "")}<div class="wordmark-copy">${model.contentHtml}</div></article>`;
}

function b1WordmarkArchives(model: ArchiveModel, ctx: RenderContext): string {
  return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader(`${model.totalPosts} entries`, "Archive", `Pieces across ${model.months.length} months`)}<div class="wordmark-archive">${model.months.map((month) => `<section><h3>${escapeHtml(month.label)}</h3>${month.posts.map((post) => `<a href="${post.href}">${escapeHtml(post.title)}</a>`).join("")}</section>`).join("")}</div></section>`;
}

function b1WordmarkGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const entries = model.entries.length
    ? model.entries.map((entry) => `<article class="wordmark-entry"><small>${escapeHtml(entry.name)} · ${escapeHtml(entry.date)}</small><p>${escapeHtml(entry.message)}</p></article>`).join("")
    : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
  return `<section class="wordmark-studio">${renderWordmarkNav(ctx)}${b1WordmarkPageHeader(`${model.entries.length} entries`, "Guestbook", b1SignButton(model))}<div class="wordmark-entries">${entries}</div></section>${guestbookModalScript()}`;
}

// ----- builder-notes -----

function b1BuilderHome(model: HomeModel, ctx: RenderContext): string {
  const links = model.links.map((link) => renderBuilderNotesLinkLine(link)).join("");
  if (ctx.currentPage === "/links") {
    return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>links</h1><p class="builder-notes-now">${model.aboutHtml}</p><section class="builder-notes-section">${links}</section></section>`;
  }
  return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<header class="builder-notes-intro"><h1>Ryan Prendergast</h1><div class="builder-notes-lede">${model.introHtml}</div></header><section class="builder-notes-section"><h2>writing</h2>${model.recentPosts.map((post) => renderBuilderNotesPostLine(post)).join("")}<p class="builder-note-more"><a href="/blog">all writing</a></p></section><section class="builder-notes-section"><h2>links</h2>${links}</section></section>`;
}

function b1BuilderBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const more = ctx.currentPage === "/blog" ? `<p class="builder-note-more"><a href="/archives">by month</a></p>` : "";
  return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>${b1IndexTitle(ctx).toLowerCase()}</h1><p class="builder-notes-now">${escapeHtml(model.description)}</p>${model.postsByYear.map((group) => `<section class="builder-notes-section"><h2>${escapeHtml(group.year)}</h2>${group.posts.map((post) => renderBuilderNotesPostLine(post)).join("")}</section>`).join("")}${more}</section>`;
}

function b1BuilderPost(model: BlogPostModel, ctx: RenderContext): string {
  return `<article class="builder-notes builder-notes-article">${renderBuilderNotesNav(ctx)}<header><h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p class="builder-notes-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="builder-notes-meta">${escapeHtml(model.date)} · <a href="${model.backHref}">${escapeHtml(model.backLabel.toLowerCase())}</a></p></header><div class="builder-notes-copy">${model.contentHtml}</div></article>`;
}

function b1BuilderArchives(model: ArchiveModel, ctx: RenderContext): string {
  return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>archive</h1>${model.months.map((month) => `<section class="builder-notes-section"><h2>${escapeHtml(month.label.toLowerCase())}</h2>${month.posts.map((post) => renderBuilderNotesPostLine(post)).join("")}</section>`).join("")}</section>`;
}

function b1BuilderGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const entries = model.entries.length
    ? model.entries.map((entry) => `<article class="builder-note-line"><p>${escapeHtml(entry.message)}</p><small>${escapeHtml(entry.name)} · ${escapeHtml(entry.date)}</small></article>`).join("")
    : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
  return `<section class="builder-notes">${renderBuilderNotesNav(ctx)}<h1>guestbook</h1><p class="builder-notes-action">${b1SignButton(model)}</p><section class="builder-notes-section">${entries}</section></section>${guestbookModalScript()}`;
}

// ----- research-tools -----

function b1ResearchToolsPage(ctx: RenderContext, title: string, bodyHtml: string, extraClass = ""): string {
  return `<section class="research-tools ${extraClass}">${renderResearchToolsHeader(ctx)}<h1>${escapeHtml(title)}</h1>${bodyHtml}</section>`;
}

function b1ResearchToolsLinks(model: HomeModel): string {
  return `<ul class="research-tools-list">${model.links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a> <span>${b1Plain(link.contentHtml)}</span> <small>${escapeHtml(link.domain)}, ${escapeHtml(b1ShortDate(link.date))}</small></li>`).join("")}</ul>`;
}

function b1ResearchToolsPosts(posts: PostSummaryModel[]): string {
  return `<ul class="research-tools-articles">${posts.map((post) => `<li><time>${escapeHtml(b1ShortDate(post.date))}</time> <a href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? ` <span>${escapeHtml(post.excerpt)}</span>` : ""}</li>`).join("")}</ul>`;
}

function b1ResearchToolsHome(model: HomeModel, ctx: RenderContext): string {
  if (ctx.currentPage === "/links") {
    return b1ResearchToolsPage(ctx, "links", `<p class="research-tools-practice">${model.aboutHtml}</p>${b1ResearchToolsLinks(model)}`);
  }
  return `<section class="research-tools">${renderResearchToolsHeader(ctx, model.introHtml)}<section class="research-tools-section"><h2>writing</h2>${b1ResearchToolsPosts(model.recentPosts)}<p class="research-tools-more"><a href="/blog">all writing</a></p></section><section class="research-tools-section"><h2>links</h2><p class="research-tools-practice">${model.aboutHtml}</p>${b1ResearchToolsLinks(model)}</section></section>`;
}

function b1ResearchToolsBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const more = ctx.currentPage === "/blog" ? `<p class="research-tools-more"><a href="/archives">by month</a></p>` : "";
  return b1ResearchToolsPage(ctx, b1IndexTitle(ctx).toLowerCase(), `<p class="research-tools-practice">${escapeHtml(model.description)}</p>${model.postsByYear.map((group) => `<section class="research-tools-section"><h2>${escapeHtml(group.year)}</h2>${b1ResearchToolsPosts(group.posts)}</section>`).join("")}${more}`);
}

function b1ResearchToolsPost(model: BlogPostModel, ctx: RenderContext): string {
  return `<article class="research-tools research-tools-article">${renderResearchToolsHeader(ctx)}<h1>${escapeHtml(model.title)}</h1>${model.subtitle ? `<p class="research-tools-subtitle">${escapeHtml(model.subtitle)}</p>` : ""}<p class="research-tools-meta">${escapeHtml(model.date)} · <a href="${model.backHref}">${escapeHtml(model.backLabel.toLowerCase())}</a></p><div class="research-tools-body">${model.contentHtml}</div></article>`;
}

function b1ResearchToolsArchives(model: ArchiveModel, ctx: RenderContext): string {
  return b1ResearchToolsPage(ctx, "archive", model.months.map((month) => `<section class="research-tools-section"><h2>${escapeHtml(month.label.toLowerCase())}</h2>${b1ResearchToolsPosts(month.posts)}</section>`).join(""));
}

function b1ResearchToolsGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  const entries = model.entries.length
    ? `<ul class="research-tools-list">${model.entries.map((entry) => `<li><span>${escapeHtml(entry.message)}</span> <small>${escapeHtml(entry.name)}, ${escapeHtml(entry.date)}</small></li>`).join("")}</ul>`
    : `<p>No entries yet. Be the first to sign the guestbook!</p>`;
  return `${b1ResearchToolsPage(ctx, "guestbook", `<p class="research-tools-action">${b1SignButton(model)}</p>${entries}`)}${guestbookModalScript()}`;
}

function renderResearchToolsGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return b1ResearchToolsPage(ctx, model.heading.toLowerCase(), `<div class="research-tools-body">${model.contentHtml}</div>`, "research-tools-article");
}

// ----- art-library -----

function b1ArtLibraryHome(model: HomeModel, ctx: RenderContext): string {
  const linksOnly = ctx.currentPage === "/links";
  const categories: Array<[string, string, boolean]> = [["All", "/", !linksOnly], ["Links", "/links", linksOnly], ["Writing", "/blog", false], ["Archive", "/archives", false]];
  const linkRows = model.links.map((link) => [`<a href="${link.url}">${escapeHtml(link.title)}</a><small>${b1Plain(link.contentHtml)}</small>`, escapeHtml(link.domain), escapeHtml(b1ShortDate(link.date)), "Link"]);
  const postRows = model.recentPosts.map((post) => [`<a href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? `<small>${escapeHtml(post.excerpt)}</small>` : ""}`, escapeHtml(post.readTime || ""), escapeHtml(b1ShortDate(post.date)), "Writing"]);
  const header = linksOnly ? renderArtLibraryHeader(ctx, "Links", `<p>${model.aboutHtml}</p>`) : renderArtLibraryHeader(ctx, "Library", model.introHtml);
  return `<section class="art-library">${header}${renderArtLibraryCategories(categories)}${renderArtLibraryTable(["Title", "Source", "Date", "Category"], linksOnly ? linkRows : [...postRows, ...linkRows])}</section>`;
}

function b1ArtLibraryBlog(model: BlogIndexModel, ctx: RenderContext): string {
  const categories: Array<[string, string, boolean]> = model.postsByYear.map((group) => [group.year, `#y-${slugify(group.year)}`, false]);
  const rows = model.postsByYear.flatMap((group) => group.posts.map((post, index) => [`<a${index === 0 ? ` id="y-${slugify(group.year)}"` : ""} href="${post.href}">${escapeHtml(post.title)}</a>${post.excerpt ? `<small>${escapeHtml(post.excerpt)}</small>` : ""}`, escapeHtml(post.readTime || ""), escapeHtml(b1ShortDate(post.date)), escapeHtml(group.year)]));
  return `<section class="art-library">${renderArtLibraryHeader(ctx, b1IndexTitle(ctx), `<p>${escapeHtml(model.description)}</p>`)}${renderArtLibraryCategories(categories)}${renderArtLibraryTable(["Title", "Length", "Date", "Year"], rows)}</section>`;
}

function b1ArtLibraryPost(model: BlogPostModel, ctx: RenderContext): string {
  return `<article class="art-library art-library-record">${renderArtLibraryHeader(ctx, model.title, `${model.subtitle ? `<p>${escapeHtml(model.subtitle)}</p>` : ""}<p>${escapeHtml(model.date)} · <a href="${model.backHref}">${escapeHtml(model.backLabel)}</a></p>`)}<div class="art-library-copy">${model.contentHtml}</div></article>`;
}

function b1ArtLibraryArchives(model: ArchiveModel, ctx: RenderContext): string {
  const categories: Array<[string, string, boolean]> = model.months.map((month) => [month.label, `#m-${slugify(month.key)}`, false]);
  const rows = model.months.flatMap((month) => month.posts.map((post, index) => [`<a${index === 0 ? ` id="m-${slugify(month.key)}"` : ""} href="${post.href}">${escapeHtml(post.title)}</a>`, escapeHtml(post.readTime || ""), escapeHtml(b1ShortDate(post.date)), escapeHtml(month.label)]));
  return `<section class="art-library">${renderArtLibraryHeader(ctx, "Archive", `<p>${model.totalPosts} pieces across ${model.months.length} months.</p>`)}${renderArtLibraryCategories(categories)}${renderArtLibraryTable(["Title", "Length", "Date", "Month"], rows)}</section>`;
}

function b1ArtLibraryGuestbook(model: GuestbookModel, ctx: RenderContext): string {
  return `<section class="art-library">${renderArtLibraryHeader(ctx, "Guestbook", b1SignButton(model))}${renderArtLibraryTable(["Message", "Name", "Date"], model.entries.map((entry) => [escapeHtml(entry.message), escapeHtml(entry.name), escapeHtml(b1ShortDate(entry.date))]))}</section>${guestbookModalScript()}`;
}

function renderStudioIndexHeader(ctx: RenderContext, introHtml: string, activeTab: string): string {
  const tabs = [
    ["/", "Index"],
    ["/links", "Links"],
    ["/blog", "Studies"],
    ["/photos", "Objects"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Information"],
  ] as Array<[string, string]>;
  const current = tabs.some(([href]) => href === ctx.currentPage)
    ? ctx.currentPage
    : (tabs.find(([, label]) => label === activeTab) || tabs[0])[0];
  return `<header class="studio-index-header"><div class="studio-index-brand"><a href="/">Ryan Prendergast</a></div><div class="studio-index-intro">${introHtml}</div><nav class="studio-index-tabs" aria-label="Core site areas">${tabs.map(([href, label]) => `<a class="${href === current ? "is-current" : ""}" href="${href}">${href === current ? `[ ${label} ]` : label}</a>`).join("")}</nav></header>`;
}

function renderStudioIndexFilters(_filters: string[]): string {
  return "";
}

function renderStudioIndexProject(link: LinkEntryModel): string {
  const media = link.image ? `<a class="studio-index-project-media" href="${link.url}"><img src="${link.image}" alt="" loading="lazy"></a>` : "";
  return `<article class="studio-index-project">${media}<h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p class="studio-index-project-meta"><span>${escapeHtml(link.domain)}</span><time>${escapeHtml(link.date)}</time></p><div class="studio-index-project-note">${link.contentHtml}</div></article>`;
}

function renderStudioIndexTextRow(title: string, href: string, date: string, type: string, index: number): string {
  return `<a class="studio-index-row" href="${href}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(type)}</small><time>${escapeHtml(date)}</time></a>`;
}

function renderStudioIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="studio-index studio-index-article">${renderStudioIndexHeader(ctx, "", "Information")}<div class="studio-index-layout">${renderStudioIndexFilters(["All", "Information", "Contact", "Pages"])}<div class="studio-index-content"><header class="studio-index-article-head"><h2>${escapeHtml(model.heading)}</h2></header><div class="blog-post-content studio-index-copy">${model.contentHtml}</div></div></div></article>`;
}

function renderCargoCvPage(ctx: RenderContext, _section: string, contentHtml: string): string {
  const items = [
    ["/", "Info"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
  const nav = items.map(([href, label]) => `<a class="${href === current ? "is-active" : ""}" href="${href}">${label}</a>`).join("");
  return `<section class="cargo-cv"><aside><a class="cargo-cv-title" href="/">Ryan Prendergast</a><nav aria-label="Core site areas">${nav}</nav></aside><main>${contentHtml}</main></section>`;
}

function renderCargoCvList(items: string[]): string {
  return `<ol class="cargo-cv-lifeworks">${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;
}

function renderCargoCvGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderCargoCvPage(ctx, model.heading, `<h2>${escapeHtml(model.heading)}:</h2><div class="cargo-cv-profile">${model.contentHtml}</div>`);
}

function renderArtistLedgerHeader(ctx: RenderContext): string {
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
  return `<header class="artist-ledger-header"><a class="artist-ledger-name" href="/">Ryan<br>Prendergast</a><nav class="artist-ledger-primary" aria-label="Primary">${items.map(([href, label]) => `<a class="${href === current ? "is-active" : ""}" href="${href}">${label}</a>`).join("")}</nav></header>`;
}

function renderArtistLedgerRow(date: string, href: string, title: string, type: string, detail = "", detailHtml = ""): string {
  const detailText = detailHtml ? `<div class="artist-ledger-detail">${detailHtml}</div>` : detail ? `<p>${escapeHtml(detail)}</p>` : "";
  return `<article class="artist-ledger-row"><time>${escapeHtml(date)}</time><div><a href="${href}">${escapeHtml(title)}</a>${detailText}</div><span>${escapeHtml(type)}</span></article>`;
}

function renderArtistLedgerGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="artist-ledger artist-ledger-page">${renderArtistLedgerHeader(ctx)}<section class="artist-ledger-section"><h2>${escapeHtml(model.heading)}</h2><div class="artist-ledger-copy">${model.contentHtml}</div></section></article>`;
}

function renderWriterLedgerRecent(contentHtml: string): string {
  if (!contentHtml) return "";
  return `<div class="writer-ledger-recent" aria-label="Recently"><p>recently... ${contentHtml}</p></div>`;
}

function renderWriterLedgerHeader(ctx: RenderContext): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const active = (href: string) => (current === href ? "is-active" : "");
  const nav = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<header class="writer-ledger-header"><p class="writer-ledger-name"><a href="/">Ryan Prendergast</a></p><nav aria-label="Site">( ${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join(" ")} )</nav></header>`;
}

function renderWriterLedgerRow(title: string, href: string, medium: string, year: string): string {
  return `<a class="writer-ledger-row" href="${href}"><span>${escapeHtml(title)}</span><span>${escapeHtml(medium)}</span><span>${escapeHtml(year)}</span></a>`;
}

function renderWriterLedgerGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="writer-ledger writer-ledger-page">${renderWriterLedgerHeader(ctx)}<section class="writer-ledger-info"><h1>${escapeHtml(model.heading)}</h1><div class="writer-ledger-copy">${model.contentHtml}</div></section></article>`;
}

function renderFragmentNav(ctx: RenderContext): string {
  const items = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  const current = ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage;
  const name = ctx.currentPage === "/" || ctx.currentPage === "/links" ? "" : `<a class="fragment-menu-name" href="/">Ryan Prendergast</a>`;
  return `<nav class="fragment-menu" aria-label="Core site areas">${name}${items.map(([href, label]) => `<a class="${href === current ? "is-active" : ""}" href="${href}">${label}</a>`).join("")}</nav>`;
}

function renderFragmentPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="fragment-journal">${renderFragmentNav(ctx)}${contentHtml}</section>`;
}

function renderFragmentPostList(posts: PostSummaryModel[]): string {
  return `<ol class="fragment-list">${posts.map((post) => `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <time>${escapeHtml(post.date)}</time>` : ""}</li>`).join("")}</ol>`;
}

function renderFragmentLinkList(links: LinkEntryModel[]): string {
  return `<ol class="fragment-list fragment-notes">${links.map((link) => `<li><a href="${link.url}">${escapeHtml(link.title)}</a>${link.domain ? ` <span>${escapeHtml(link.domain)}</span>` : ""}${link.contentHtml ? `<div>${link.contentHtml}</div>` : ""}</li>`).join("")}</ol>`;
}

function renderFragmentGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderFragmentPage(ctx, `<article class="fragment-article"><header class="fragment-page-head"><h1>${escapeHtml(model.heading)}</h1></header><div class="fragment-copy">${model.contentHtml}</div></article>`);
}

function renderNowDirectoryNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? ` aria-current="page"` : "");
  const items = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<nav class="now-directory-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a${active(href)} href="${href}">${escapeHtml(label)}</a>`).join(" ")}</nav>`;
}

function renderNowDirectoryPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="now-directory"><header><h1><a href="/">Ryan Prendergast</a></h1>${renderNowDirectoryNav(ctx)}</header>${contentHtml}</section>`;
}

function renderConversationalMinimalNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? ` aria-current="page"` : "");
  const items = [
    ["/", "me"],
    ["/links", "links"],
    ["/blog", "articles"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<nav class="conversational-minimal-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a${active(href)} href="${href}">${escapeHtml(label)}</a>`).join(" ")}</nav>`;
}

function renderConversationalMinimalPage(ctx: RenderContext, contentHtml: string): string {
  return `<div class="conversational-minimal">
    <header class="conversational-minimal-site-head">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${renderConversationalMinimalNav(ctx)}
    </header>
    ${contentHtml}
  </div>`;
}

function renderFounderIndexNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? ` aria-current="page"` : "");
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="founder-index-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a${active(href)} href="${href}">${escapeHtml(label)}</a>`).join(" ")}</nav>`;
}

function renderFounderIndexPage(ctx: RenderContext, contentHtml: string): string {
  return `<div class="founder-index">
    <header class="founder-index-site-head">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${renderFounderIndexNav(ctx)}
    </header>
    ${contentHtml}
  </div>`;
}

function renderFounderIndexPost(post: PostSummaryModel): string {
  return `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${post.date ? ` <small>${escapeHtml(post.date)}</small>` : ""}${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`;
}

function renderFounderIndexLink(link: LinkEntryModel): string {
  return `<li><a href="${link.url}">${escapeHtml(link.title)}</a>${link.domain ? ` <small>${escapeHtml(link.domain)}</small>` : ""}${link.contentHtml ? `<div>${link.contentHtml}</div>` : ""}</li>`;
}

function renderGrantNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? ` aria-current="page"` : "");
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="grant-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a${active(href)} href="${href}">${escapeHtml(label)}</a>`).join(" ")}</nav>`;
}

function renderGrantPage(ctx: RenderContext, contentHtml: string, heroHtml = ""): string {
  return `<div class="grant-page">
    <header class="grant-site-head${heroHtml ? " is-hero" : ""}">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${heroHtml}
      ${renderGrantNav(ctx)}
    </header>
    ${heroHtml ? renderGrantRule() : ""}
    ${contentHtml}
  </div>`;
}

function renderGrantRule(): string {
  return `<hr class="grant-rule">`;
}

function renderGrantPostItem(post: PostSummaryModel): string {
  const meta = [post.date, post.readTime].filter(Boolean).map((item) => escapeHtml(item || "")).join(" / ");
  return `<li><a href="${post.href}">${escapeHtml(post.title)}</a>${meta ? ` — ${meta}` : ""}${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}</li>`;
}

function renderGrantLinkItem(link: LinkEntryModel): string {
  const meta = [link.domain, link.date].filter(Boolean).map((item) => escapeHtml(item || "")).join(" / ");
  return `<li><a href="${link.url}">${escapeHtml(link.title)}</a>${meta ? ` — ${meta}` : ""}${link.contentHtml ? `<div>${link.contentHtml}</div>` : ""}</li>`;
}

function renderUncertaintyNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="uncertainty-nav" aria-label="Core site areas">${items.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderUncertaintyPage(ctx: RenderContext, title: string, introHtml = "", bodyHtml = ""): string {
  const intro = introHtml ? `<div class="uncertainty-note">${introHtml}</div>` : "";
  const body = bodyHtml ? `<div class="uncertainty-body">${bodyHtml}</div>` : "";
  const identity = title === "Ryan Prendergast" ? "" : `<p class="uncertainty-identity"><a href="/">Ryan Prendergast</a></p>`;
  return `<section class="uncertainty">${renderUncertaintyNav(ctx)}<header class="uncertainty-title">${identity}<h1>${escapeHtml(title)}</h1>${intro}</header>${body}</section>`;
}

function renderUncertaintyLine(title: string, href: string, type: string, date = "", detail = ""): string {
  return `<a class="uncertainty-line" href="${href}"><span>${escapeHtml(title)}</span><small>${escapeHtml([type, date].filter(Boolean).join(" / "))}</small>${detail ? `<em>${escapeHtml(detail)}</em>` : ""}</a>`;
}

function renderUncertaintyGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderUncertaintyPage(ctx, model.heading, "", `<div class="uncertainty-copy">${model.contentHtml}</div>`);
}

function renderBriefingNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const topics = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<header class="briefing-header">
    <div class="briefing-brand-row"><a class="briefing-brand" href="/">Ryan Prendergast</a></div>
    <nav class="briefing-topic-nav" aria-label="Core site areas">${topics.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>
  </header>`;
}

function renderBriefingPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="briefing">${renderBriefingNav(ctx)}${contentHtml}</section>`;
}

function renderBriefingSmallCard(href: string, title: string, meta: string, detail = ""): string {
  return `<article class="briefing-small-card"><a href="${href}">${escapeHtml(title)}</a><p>${escapeHtml([meta, detail].filter(Boolean).join(" / "))}</p></article>`;
}

function renderBriefingHome(model: HomeModel, ctx: RenderContext): string {
  const linkCard = (link: LinkEntryModel) => `<article><span>${escapeHtml(link.domain)}</span><h3><a href="${link.url}">${escapeHtml(link.title)}</a></h3><p>${escapeHtml(linkCommentaryText(link.contentHtml))}</p><time>${escapeHtml(link.date)}</time></article>`;
  if (ctx.currentPage === "/links") {
    return renderBriefingPage(
      ctx,
      `<header class="briefing-section-head"><span>${model.links.length} links</span><h1>Links</h1><p>${model.aboutHtml}</p></header>
      <div class="briefing-grid">${model.links.map(linkCard).join("")}</div>`,
    );
  }
  const lead = model.links[0];
  const secondary = model.links.slice(1, 5);
  const rail = model.recentPosts;
  const moreLinks = model.links.slice(5);
  const leadHtml = lead
    ? `<article class="briefing-lead">
        <span>${escapeHtml(lead.domain)}</span>
        <h2><a href="${lead.url}">${escapeHtml(lead.title)}</a></h2>
        <p>${escapeHtml(linkCommentaryText(lead.contentHtml))}</p>
      </article>`
    : "";
  return renderBriefingPage(
    ctx,
    `<section class="briefing-hero">
      <div class="briefing-dateline"><span>${model.links.length} links</span><span>${model.recentPosts.length} recent writing</span></div>
      <div class="briefing-intro">${model.introHtml}</div>
    </section>
    <section class="briefing-front">
      ${leadHtml}
      <div class="briefing-secondary">${secondary.map((link) => renderBriefingSmallCard(link.url, link.title, link.domain, link.date)).join("")}</div>
      <aside class="briefing-rail"><h2>Writing</h2>${rail.map((post) => renderBriefingSmallCard(post.href, post.title, post.date, post.readTime || "")).join("")}</aside>
    </section>
    <section class="briefing-section-head"><span>Links</span><h2>Latest</h2></section>
    <div class="briefing-grid">${moreLinks.map(linkCard).join("")}</div>`,
  );
}

function renderForumFrontpageNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="forum-frontpage-sidebar" aria-label="Core site areas">${items.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderForumFrontpageShell(ctx: RenderContext, contentHtml: string, section = "Frontpage"): string {
  return `<section class="forum-frontpage">
    <header class="forum-frontpage-topbar">
      <a class="forum-frontpage-logo" href="/">Ryan Prendergast</a>
    </header>
    <div class="forum-frontpage-layout">
      ${renderForumFrontpageNav(ctx)}
      <main class="forum-frontpage-main" aria-label="${escapeHtml(section)}">${contentHtml}</main>
    </div>
  </section>`;
}

function renderForumFrontpagePost(href: string, title: string, meta: string, excerptHtml = ""): string {
  return `<article class="forum-frontpage-post">
    <h3>${href ? `<a href="${href}">${escapeHtml(title)}</a>` : escapeHtml(title)}</h3>
    ${meta ? `<p class="forum-frontpage-meta">${escapeHtml(meta)}</p>` : ""}
    ${excerptHtml ? `<div class="forum-frontpage-excerpt">${excerptHtml}</div>` : ""}
  </article>`;
}

function renderForumFrontpageSummary(post: PostSummaryModel): string {
  return renderForumFrontpagePost(post.href, post.title, [post.date, post.readTime].filter(Boolean).join(" · "), post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : "");
}

function renderForumFrontpageHead(title: string, bodyHtml = ""): string {
  return `<header class="forum-frontpage-page forum-frontpage-head"><h1>${escapeHtml(title)}</h1>${bodyHtml}</header>`;
}

function renderForumFrontpageHome(model: HomeModel, ctx: RenderContext): string {
  const posts = model.recentPosts.map(renderForumFrontpageSummary).join("");
  const links = model.links.map((link) => renderForumFrontpagePost(link.url, link.title, `${link.domain} · ${link.date}`, link.contentHtml)).join("");
  if (ctx.currentPage === "/links") {
    return renderForumFrontpageShell(
      ctx,
      `${renderForumFrontpageHead("Links", `<p>${model.aboutHtml}</p><p class="forum-frontpage-meta">${model.links.length} links</p>`)}
      <section class="forum-frontpage-feed">${links}</section>`,
      "Links",
    );
  }
  return renderForumFrontpageShell(
    ctx,
    `<section class="forum-frontpage-hero">${model.introHtml}</section>
    <h2 class="forum-frontpage-heading"><a href="/blog">Recent writing</a></h2>
    <section class="forum-frontpage-feed">${posts}</section>
    <h2 class="forum-frontpage-heading"><a href="/links">Links</a></h2>
    <section class="forum-frontpage-feed">${links}</section>`,
    "Frontpage",
  );
}

function renderWeblogFacetsPage(ctx: RenderContext, contentHtml: string): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const active = (href: string) => (current === href ? "is-active" : "");
  const nav = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<section class="weblog-facets">
    <header class="weblog-facets-header">
      <p class="weblog-facets-title"><a href="/">Ryan Prendergast</a></p>
      <nav aria-label="Site">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>
    </header>
    ${contentHtml}
  </section>`;
}

function renderDownloadIndexNav(ctx: RenderContext): string {
  return `<nav class="download-index-nav" aria-label="Site">${renderIndexBatchNavLinks(ctx, { "/": "Index" })}</nav>`;
}

function renderDownloadIndexPage(ctx: RenderContext, title: string, detailHtml: string, contentHtml: string, countLabel = ""): string {
  const isHome = title === "Ryan Prendergast";
  const hasTable = contentHtml.includes('class="download-index-table"');
  return `<section class="download-index">
    <header class="download-index-header">
      <div class="download-index-top">${isHome ? "<span>Linklog</span>" : `<a href="/">Ryan Prendergast</a>`}<span>${escapeHtml(countLabel || "")}</span></div>
      ${renderDownloadIndexNav(ctx)}
      <div class="download-index-title"><h1>${escapeHtml(title)}</h1><div>${detailHtml}</div></div>
    </header>
    ${hasTable ? `<div class="download-index-tools" aria-hidden="true"><span>No.</span><span>Title</span><span>Source</span><span>Date</span><span>Note</span></div>` : ""}
    ${contentHtml}
  </section>`;
}

function renderDownloadIndexRow(index: number, title: string, href: string, source: string, date: string, detail = ""): string {
  const compact = detail ? indexBatchPlainText(detail) : "";
  const cells = `<span>${String(index).padStart(4, "0")}</span>
    <strong>${escapeHtml(title)}</strong>
    <em>${escapeHtml(source)}</em>
    <time>${escapeHtml(date)}</time>
    <small>${escapeHtml(compact)}</small>`;
  return href ? `<a class="download-index-row" href="${href}">${cells}</a>` : `<div class="download-index-row">${cells}</div>`;
}

function renderDownloadIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderDownloadIndexPage(ctx, model.heading, "", `<article class="download-index-article">${model.contentHtml}</article>`, "page record");
}

interface VisualIndexRecord {
  href: string;
  title: string;
  date: string;
  label: string;
}

function visualIndexDateParts(date: string): { year: string; month: string; display: string } {
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      year: String(parsed.getUTCFullYear()),
      month: parsed.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      display: parsed.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", timeZone: "UTC" }),
    };
  }
  const year = (date.match(/\b(20\d{2}|19\d{2})\b/) || [])[0] || "Undated";
  return { year, month: date || "Now", display: date || "Undated" };
}

function renderVisualIndexNav(ctx: RenderContext): string {
  return `<nav class="visual-index-nav" aria-label="Site">${renderIndexBatchNavLinks(ctx)}</nav>`;
}

function renderVisualIndexPage(ctx: RenderContext, contentHtml: string): string {
  const sections: Record<string, string> = {
    "/": "Links and writing",
    "/links": "Links and writing",
    "/blog": "Writing",
    "/photos": "Photography",
    "/guestbook": "Guestbook",
    "/contact": "Contact",
    "/archives": "Archives",
  };
  const section = sections[ctx.currentPage] || "";
  return `<section class="visual-index">
    <header class="visual-index-header">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${section ? `<p>${escapeHtml(section)}</p>` : ""}
      ${renderVisualIndexNav(ctx)}
    </header>
    ${contentHtml}
  </section>`;
}

function renderVisualIndexGroupedSection(title: string, records: VisualIndexRecord[]): string {
  const groups = new Map<string, Map<string, VisualIndexRecord[]>>();
  for (const record of records) {
    const parts = visualIndexDateParts(record.date);
    if (!groups.has(parts.year)) groups.set(parts.year, new Map());
    const yearGroup = groups.get(parts.year);
    if (!yearGroup?.has(parts.month)) yearGroup?.set(parts.month, []);
    yearGroup?.get(parts.month)?.push(record);
  }

  const years = Array.from(groups.entries()).sort(([a], [b]) => Number(b) - Number(a));
  return `<section class="visual-index-section">
    ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
    ${years
      .map(
        ([year, months]) => `<section class="visual-index-year">
          <h3>${escapeHtml(year)}</h3>
          ${Array.from(months.entries())
            .map(
              ([month, monthRecords]) => `<section class="visual-index-month">
                <h4>${escapeHtml(month)}</h4>
                <ol>${monthRecords.map((record) => renderVisualIndexRow(record)).join("")}</ol>
              </section>`,
            )
            .join("")}
        </section>`,
      )
      .join("")}
  </section>`;
}

function renderVisualIndexRow(record: VisualIndexRecord): string {
  const date = visualIndexDateParts(record.date).display;
  const title = record.href && record.href !== "/guestbook" ? `<a href="${record.href}">${escapeHtml(record.title)}</a>` : `<span>${escapeHtml(record.title)}</span>`;
  return `<li>${title}<em>${escapeHtml(record.label)}</em><time>${escapeHtml(date)}</time></li>`;
}

function renderVisualIndexGeneric(model: GenericPageModel, ctx: RenderContext): string {
  const sectionShown = ["/contact", "/guestbook", "/archives", "/photos", "/blog"].includes(ctx.currentPage);
  return renderVisualIndexPage(ctx, `<article class="visual-index-article">${sectionShown ? "" : `<header><h2>${escapeHtml(model.heading)}</h2></header>`}<div class="visual-index-copy">${model.contentHtml}</div></article>`);
}

function renderWeblogFacetsSidebar(links: LinkEntryModel[], posts: PostSummaryModel[]): string {
  const tally = (values: string[]) => {
    const counts = new Map<string, number>();
    values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
    return Array.from(counts.entries());
  };
  const facet = (title: string, href: string, rows: Array<[string, number]>) =>
    rows.length ? `<h2>${title}</h2><div class="weblog-facets-tags">${rows.map(([tag, count]) => `<a href="${href}"><span>${escapeHtml(tag)}</span><em>${count}</em></a>`).join("")}</div>` : "";
  const sources = tally(links.map((link) => link.domain)).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const linkYears = tally(links.map((link) => (link.rawDate || link.date).match(/\d{4}/)?.[0] || "")).sort((a, b) => b[0].localeCompare(a[0]));
  const postYears = tally(posts.map((post) => (post.rawDate || post.date).match(/\d{4}/)?.[0] || "")).sort((a, b) => b[0].localeCompare(a[0]));
  return `<aside class="weblog-facets-sidebar" aria-label="Facets">
    ${facet("Writing by year", "/archives", postYears)}
    ${facet("Links by year", "/links", linkYears)}
    ${facet("Link sources", "/links", sources)}
    <h2>Elsewhere</h2>
    <a href="/archives">Archive</a>
    <a href="/rss.xml">RSS feed</a>
  </aside>`;
}

function renderWeblogFacetsPost(post: PostSummaryModel & { year?: string }): string {
  return `<article class="weblog-facets-entry">
    <h2><a href="${post.href}">${escapeHtml(post.title)}</a></h2>
    <p class="weblog-facets-date">${escapeHtml(post.date)}${post.readTime ? `, ${escapeHtml(post.readTime)}` : ""}</p>
    ${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}
  </article>`;
}

function renderWeblogFacetsLink(link: LinkEntryModel): string {
  return `<article class="weblog-facets-entry weblog-facets-link">
    <h2><a href="${link.url}">${escapeHtml(link.title)}</a></h2>
    <p class="weblog-facets-date">${escapeHtml(link.date)}, ${escapeHtml(link.domain)}</p>
    <div>${link.contentHtml}</div>
  </article>`;
}

function renderWeblogFacetsGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return `<article class="weblog-facets-article">
    <h1>${escapeHtml(model.heading)}</h1>
    <div class="blog-post-content weblog-facets-copy">${model.contentHtml}</div>
  </article>`;
}

function renderBookMicrositePage(ctx: RenderContext, contentHtml: string, nextHref = "/blog"): string {
  return `<section class="book-microsite">
    <header class="book-microsite-top">
      <nav class="book-microsite-core" aria-label="Site">${renderIndexBatchNavLinks(ctx)}</nav>
      <a class="book-microsite-next" href="${nextHref}">NEXT</a>
    </header>
    ${contentHtml}
  </section>`;
}

function renderBookMicrositeTitlePage(ctx: RenderContext, introHtml: string, creditHtml: string, title = "Ryan Prendergast"): string {
  const titleHtml = `<h1>${escapeHtml(title)}</h1>${title === "Ryan Prendergast" ? "" : `<p class="book-microsite-author"><a href="/">Ryan Prendergast</a></p>`}`;
  return `<div class="book-microsite-title-stack">
    <section class="book-microsite-title-card">
      ${titleHtml}
      <div class="book-microsite-intro">${introHtml}</div>
      <div class="book-microsite-credits">${creditHtml}</div>
    </section>
  </div>`;
}

function renderBookMicrositeContents(items: Array<{ href: string; label: string; title: string }>, withWrap = true): string {
  const list = `<ol class="book-microsite-contents">
    ${items.map((item, index) => `<li><a href="${item.href}"><span>${index + 1}:</span> ${escapeHtml(item.title)}${item.label ? ` <em>${escapeHtml(item.label)}</em>` : ""}</a></li>`).join("")}
  </ol>`;
  return withWrap ? `<nav class="book-microsite-index" aria-label="Publication contents">${list}</nav>` : list;
}

function renderBookMicrositeGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderBookMicrositePage(
    ctx,
    `<article class="book-microsite-entry">
      <header><h1>${escapeHtml(model.heading)}</h1></header>
      <div class="blog-post-content book-microsite-copy">${model.contentHtml}</div>
    </article>`,
    "/",
  );
}

function renderBriefingIndex(model: BlogIndexModel, ctx: RenderContext): string {
  const posts = model.postsByYear.flatMap((group) => group.posts.map((post) => ({ ...post, year: group.year })));
  return renderBriefingPage(
    ctx,
    `<header class="briefing-section-head"><span>${model.totalPosts} entries</span><h1>${escapeHtml(ctx.pageSubtitle || "Writing")}</h1><p>${escapeHtml(model.description)}</p></header>
    <div class="briefing-grid">${posts.map((post) => `<article><span>${escapeHtml(post.year)}</span><h3><a href="${post.href}">${escapeHtml(post.title)}</a></h3>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}<time>${escapeHtml(post.date)}${post.readTime ? ` / ${escapeHtml(post.readTime)}` : ""}</time></article>`).join("")}</div>`,
  );
}

function renderBriefingGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderBriefingPage(ctx, `<article class="briefing-article briefing-page"><header><h1>${escapeHtml(model.heading)}</h1></header><div class="briefing-copy">${model.contentHtml}</div></article>`);
}

function renderEssayBlogrollNav(ctx: RenderContext): string {
  const links = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="essay-blogroll-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${ctx.currentPage === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderEssayBlogrollPage(ctx: RenderContext, contentHtml: string, sidebarHtml = ""): string {
  return `<section class="essay-blogroll">
    <header class="essay-blogroll-header">
      <h1><a href="/">Ryan Prendergast</a></h1>
      ${renderEssayBlogrollNav(ctx)}
    </header>
    <div class="essay-blogroll-layout${sidebarHtml ? "" : " essay-blogroll-layout-single"}">
      <main class="essay-blogroll-main">${contentHtml}</main>
      ${sidebarHtml}
    </div>
  </section>`;
}

function renderEssayBlogrollSidebar(sections: Array<[string, Array<[string, string]>]>): string {
  const blocks = sections
    .filter(([, items]) => items.length)
    .map(([title, items]) => `<section><h3>${escapeHtml(title)}</h3><ul>${items.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul></section>`)
    .join("");
  return blocks ? `<aside class="essay-blogroll-sidebar" aria-label="Blog sidebar">${blocks}</aside>` : "";
}

function renderEssayBlogrollHomeSidebar(links: LinkEntryModel[], posts: PostSummaryModel[]): string {
  const seen = new Set<string>();
  const blogroll: Array<[string, string]> = [];
  for (const link of links) {
    const domain = link.domain || link.title;
    if (seen.has(domain)) continue;
    seen.add(domain);
    blogroll.push([link.url, domain]);
  }
  return renderEssayBlogrollSidebar([
    ["Recent Writing", posts.map((post) => [post.href, post.title] as [string, string])],
    ["Blogroll", blogroll],
  ]);
}

function renderEssayBlogrollEntry(href: string, title: string, meta: string, bodyHtml = ""): string {
  return `<article class="essay-blogroll-entry">
    <h2>${href ? `<a href="${href}">${escapeHtml(title)}</a>` : escapeHtml(title)}</h2>
    ${meta ? `<p class="essay-blogroll-meta">${escapeHtml(meta)}</p>` : ""}
    ${bodyHtml ? `<div class="essay-blogroll-body">${bodyHtml}</div>` : ""}
  </article>`;
}

function renderEssayBlogrollSummary(post: PostSummaryModel): string {
  return renderEssayBlogrollEntry(post.href, post.title, [post.date, post.readTime].filter(Boolean).join(" · "), post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : "");
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

function renderArtistMenuNav(ctx: RenderContext, className = "artist-menu-nav"): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const item = (href: string, label: string) => `<a class="${current === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
  return `<nav class="${className}" aria-label="Site">
    ${item("/", "Home")}
    ${item("/links", "Links")}
    ${item("/blog", "Writing")}
    ${item("/photos", "Photography")}
    ${item("/guestbook", "Guestbook")}
    ${item("/contact", "Contact")}
  </nav>`;
}

function renderArtistMenuPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="artist-menu">
    <input class="artist-menu-toggle" id="artist-menu-toggle" type="checkbox" aria-label="Menu">
    <header class="artist-menu-head">
      <a class="artist-menu-name" href="/">Ryan Prendergast</a>
      <label class="artist-menu-open" for="artist-menu-toggle"><span class="artist-menu-open-label">Menu</span><span class="artist-menu-close-label">Close</span></label>
      ${renderArtistMenuNav(ctx)}
    </header>
    ${contentHtml}
  </section>`;
}

function renderArtistMenuWork(href: string, title: string, meta = ""): string {
  return `<a href="${href}"><span>${escapeHtml(title)}</span>${meta ? `<small>${escapeHtml(meta)}</small>` : ""}</a>`;
}

function renderArtistMenuGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderArtistMenuPage(ctx, `<article class="artist-menu-post"><h1>${escapeHtml(model.heading)}</h1><div class="blog-post-content">${model.contentHtml}</div></article>`);
}

function renderFriendlyHubNav(ctx: RenderContext): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const links = [
    ["/", "🏠 home"],
    ["/links", "🔗 links"],
    ["/blog", "✍️ writing"],
    ["/photos", "📷 photography"],
    ["/guestbook", "📖 guestbook"],
    ["/contact", "📧 contact"],
  ] as Array<[string, string]>;
  return `<nav class="friendly-hub-menu" aria-label="Site"><ul>${links.map(([href, label]) => `<li><a class="${current === href ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul></nav>`;
}

function renderFriendlyHubPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="friendly-hub">
    <header class="friendly-hub-site-head">
      <h2><a href="/">Ryan Prendergast</a></h2>
    </header>
    ${renderFriendlyHubNav(ctx)}
    ${contentHtml}
  </section>`;
}

function renderFriendlyHubEntry(href: string, title: string, meta: string, detailHtml = ""): string {
  return `<p class="friendly-hub-entry"><a href="${href}">${escapeHtml(title)}</a>${detailHtml ? ` – ${detailHtml}` : ""}${meta ? ` <span>${escapeHtml(meta)}</span>` : ""}</p>`;
}

function renderFriendlyHubGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderFriendlyHubPage(ctx, `<article class="friendly-hub-post"><h1>${escapeHtml(model.heading)}</h1><div class="friendly-hub-copy">${model.contentHtml}</div></article>`);
}

function renderGamesCabinetNav(ctx: RenderContext): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const active = (href: string) => (current === href ? "is-active" : "");
  const nav = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as const;
  return `<header class="games-cabinet-header">
    <a class="games-cabinet-brand" href="/">Ryan Prendergast</a>
    <nav aria-label="Site">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>
  </header>`;
}

function renderGamesCabinetPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="games-cabinet">${renderGamesCabinetNav(ctx)}${contentHtml}</section>`;
}

function renderGamesCabinetWavyText(text: string): string {
  return text
    .split("")
    .map((char, index) => `<span style="--i:${index % 7}">${char === " " ? "&nbsp;" : escapeHtml(char)}</span>`)
    .join("");
}

function renderGamesCabinetWork(href: string, title: string, meta: string, detail: string, image: string | null, index: number, detailIsHtml = false): string {
  const thumbnail = image ? `<a class="games-cabinet-thumb" href="${href}" aria-hidden="true" tabindex="-1"><img src="${escapeHtml(image)}" alt="" loading="lazy"></a>` : "";
  const detailHtml = detailIsHtml ? detail : escapeHtml(detail);
  const external = /^https?:/.test(href);
  const linkLabel = external ? href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "") : "Read";
  return `<article class="games-cabinet-item${image ? " has-thumb" : ""}">
    ${thumbnail}
    <div>
      <h3><a href="${href}">${escapeHtml(title)}</a></h3>
      ${detail ? `<div class="games-cabinet-detail">${detailHtml}</div>` : ""}
      <ul>
        <li><a href="${href}">${escapeHtml(linkLabel)}</a></li>
        ${meta ? `<li>${escapeHtml(meta)}</li>` : ""}
      </ul>
    </div>
  </article>`;
}

function renderGamesCabinetGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderGamesCabinetPage(ctx, `<article class="games-cabinet-article"><header><h1>${escapeHtml(model.heading)}</h1></header><div class="games-cabinet-copy">${model.contentHtml}</div></article>`);
}

function renderPortalNav(ctx: RenderContext): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const active = (href: string) => (current === href ? "is-active" : "");
  const links = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<header class="portal-head"><a class="portal-brand" href="/">Ryan Prendergast</a><nav class="portal-nav" aria-label="Site">${links.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav></header>`;
}

function renderPortalPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="portal-gallery">${renderPortalNav(ctx)}${contentHtml}</section>`;
}

function renderPortalTile(href: string, title: string, meta: string, date: string, detail: string, index: number, detailIsHtml = false): string {
  const tone = ["sage", "rose", "sky", "paper", "moss", "clay"][index % 6];
  const safeDetail = detail ? `<p>${detailIsHtml ? detail : escapeHtml(detail)}</p>` : "";
  const metaLine = [meta, date].filter(Boolean).map((part) => escapeHtml(part)).join(" · ");
  const inner = `<strong>${escapeHtml(title)}</strong>${safeDetail}${metaLine ? `<span>${metaLine}</span>` : ""}`;
  return `<article class="portal-tile portal-tone-${tone}">${href ? `<a href="${href}">${inner}</a>` : `<div>${inner}</div>`}</article>`;
}

function renderPortalGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderPortalPage(ctx, `<article class="portal-article"><header><h1>${escapeHtml(model.heading)}</h1></header><div class="portal-copy">${model.contentHtml}</div></article>`);
}

function renderDesignRepositoryNav(ctx: RenderContext): string {
  const current = ctx.currentPage.startsWith("/photos") ? "/photos" : ctx.currentPage.startsWith("/blog") ? "/blog" : ctx.currentPage;
  const active = (href: string) => (current === href ? "is-active" : "");
  const items = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<nav class="design-repository-categories" aria-label="Site">${items.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("<span>::</span>")}</nav>`;
}

function renderDesignRepositoryPage(ctx: RenderContext, contentHtml: string, descriptionHtml = ""): string {
  return `<section class="design-repository">
    <header class="design-repository-intro${descriptionHtml ? " is-home" : ""}">
      <p class="design-repository-name"><a href="/">Ryan Prendergast</a></p>
      ${descriptionHtml ? `<div class="design-repository-description">${descriptionHtml}</div>` : ""}
    </header>
    ${renderDesignRepositoryNav(ctx)}
    ${contentHtml}
  </section>`;
}

function renderDesignRepositoryRecord(index: number, title: string, href: string, source: string, date: string, detail: string, image: string | null, kind: string, detailIsHtml = false, id = ""): string {
  const description = detail ? `<p>${detailIsHtml ? detail : escapeHtml(detail)}</p>` : "";
  const meta = [date, source, kind].filter(Boolean).map((part) => escapeHtml(part)).join(" :: ");
  const heading = href ? `<a href="${href}">${escapeHtml(title)}</a>` : escapeHtml(title);
  return `<li class="design-repository-record"${id ? ` id="${escapeHtml(id)}"` : ""}>
    <p class="design-repository-meta">${meta}</p>
    <div>
      <h2>${heading}</h2>
      ${description}
    </div>
  </li>`;
}

function renderDesignRepositoryGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderDesignRepositoryPage(
    ctx,
    `<article class="design-repository-article">
      <header><h1>${escapeHtml(model.heading)}</h1></header>
      <div class="design-repository-copy">${model.contentHtml}</div>
    </article>`,
  );
}

function renderDataPortfolioNav(ctx: RenderContext): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const links = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<nav class="data-portfolio-nav" aria-label="Core site areas">${links.map(([href, label]) => `<a class="${active(href)}" href="${href}">${escapeHtml(label)}</a>`).join("")}</nav>`;
}

function renderDataPortfolioPage(ctx: RenderContext, contentHtml: string): string {
  return `<section class="data-portfolio">
    <header class="data-portfolio-top">
      <a class="data-portfolio-name" href="/">Ryan Prendergast</a>
      ${renderDataPortfolioNav(ctx)}
    </header>
    ${contentHtml}
  </section>`;
}

function renderDataPortfolioViewToggle(): string {
  return `<div class="data-portfolio-view" aria-label="Jump to"><span>VIEW</span> <a href="#selected-projects">writing</a> <span>|</span> <a href="#project-list">links</a></div>`;
}

function renderDataPortfolioTicker(items: Array<[string, string]>): string {
  const links = items.length ? items.map(([title, href]) => `<a href="${href}">${escapeHtml(title)} -></a>`).join("") : `<a href="/blog">Writing -></a>`;
  return `<div class="data-portfolio-ticker" id="selected-projects">${links}</div>`;
}

function renderDataPortfolioProject(href: string, title: string, source: string, date: string, detail: string, image: string | null, index: number): string {
  // detail is HTML (already escaped); this theme is text-only, so no thumbnail slot and no placeholder tags.
  const safeDetail = stripHtml(detail).trim();
  return `<article class="data-portfolio-project"${index === 0 ? ` id="project-list"` : ""}>
    ${source ? `<p class="data-portfolio-source">${escapeHtml(source)}</p>` : ""}
    <h2><a href="${href}">${escapeHtml(title)}</a></h2>
    ${date ? `<p class="data-portfolio-date">${escapeHtml(date)}</p>` : ""}
    ${safeDetail ? `<p>${safeDetail}</p>` : ""}
  </article>`;
}

function renderDataPortfolioListRow(href: string, title: string, date: string, detail: string, index: number): string {
  return `<a class="data-portfolio-row" href="${href}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(title)}</strong><em>${escapeHtml(detail || date)}</em><time>${escapeHtml(date)}</time></a>`;
}

function renderDataPortfolioGeneric(model: GenericPageModel, ctx: RenderContext): string {
  return renderDataPortfolioPage(
    ctx,
    `<article class="data-portfolio-article">
      <header><h1>${escapeHtml(model.heading)}</h1></header>
      <div class="blog-post-content data-portfolio-copy">${model.contentHtml}</div>
    </article>`,
  );
}

function renderInternetDiagramPage(ctx: RenderContext, contentHtml: string): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "home"],
    ["/links", "links"],
    ["/blog", "writing"],
    ["/photos", "photography"],
    ["/guestbook", "guestbook"],
    ["/contact", "contact"],
  ] as Array<[string, string]>;
  return `<section class="internet-diagram">
    <header class="internet-diagram-key">
      <a class="internet-diagram-name" href="/">Ryan Prendergast</a>
      <nav class="internet-diagram-core" aria-label="Core site areas">
        ${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}
      </nav>
    </header>
    ${contentHtml}
  </section>`;
}

// A sub-page is one "window" floating on the map background.
function renderInternetDiagramWindow(ctx: RenderContext, title: string, bodyHtml: string): string {
  return renderInternetDiagramPage(
    ctx,
    `<section class="internet-diagram-sheet"><article class="internet-diagram-window"><h1>${escapeHtml(title)}</h1>${bodyHtml}</article></section>`,
  );
}

function renderInternetDiagramMap(nodes: string[]): string {
  const columns = 4;
  const rows = Math.max(1, Math.ceil(nodes.length / columns));
  return `<div class="internet-diagram-map" aria-label="Link map" style="--rows:${rows}">${nodes.map((node, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = 2 + column * 24.5 + ((index * 7) % 5);
    const y = ((row + 0.22 + ((index * 5) % 4) * 0.13) / rows) * 100;
    return `<div class="internet-diagram-node" style="--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%">${node}</div>`;
  }).join("")}</div>`;
}

function renderInternetDiagramNode(href: string, label: string, title: string): string {
  return `<a href="${href}" title="${escapeHtml(title)}">${escapeHtml(label)}</a>`;
}

function renderInternetDiagramIndexRow(href: string, title: string, detail: string): string {
  return `<a class="internet-diagram-index-row" href="${href}"><span>${escapeHtml(title)}</span><em>${escapeHtml(detail)}</em></a>`;
}

function guestbookModalScript(): string {
  return `<div id="guestbookModal" class="modal hidden"><div class="modal-content"><div class="modal-header"><h2>Sign Guestbook</h2><button onclick="hideGuestbookModal()" class="modal-close">&times;</button></div><form id="guestbookForm"><div class="form-group"><label for="name" class="form-label">Name *</label><input id="name" name="name" type="text" required maxlength="50" class="form-input"></div><div class="form-group"><label for="message" class="form-label">Message *</label><textarea id="message" name="message" required maxlength="500" rows="4" class="form-textarea"></textarea></div><div class="form-actions"><button type="button" onclick="hideGuestbookModal()">Cancel</button><button type="submit">Submit</button></div></form></div></div><script>function showGuestbookModal(){document.getElementById('guestbookModal').classList.remove('hidden')}function hideGuestbookModal(){document.getElementById('guestbookModal').classList.add('hidden')}document.addEventListener('keydown',function(e){if(e.key==='Escape')hideGuestbookModal()});document.getElementById('guestbookForm').addEventListener('submit',async(e)=>{e.preventDefault();const name=document.getElementById('name').value;const message=document.getElementById('message').value;try{const response=await fetch('/api/guestbook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,message})});if(response.ok){window.location.reload()}else{alert('Failed to submit entry. Please try again.')}}catch(error){alert('Failed to submit entry. Please try again.')}});</script>`;
}

function renderTasteDirectoryPage(ctx: RenderContext, contentHtml: string, activeTab: "Rising" | "Browse"): string {
  const active = (href: string) => (ctx.currentPage === href ? "is-active" : "");
  const nav = [
    ["/", "Home"],
    ["/links", "Links"],
    ["/blog", "Writing"],
    ["/photos", "Photography"],
    ["/guestbook", "Guestbook"],
    ["/contact", "Contact"],
  ] as Array<[string, string]>;
  return `<section class="taste-directory"><header class="taste-top"><a class="taste-wordmark" href="/"><span class="taste-stars" aria-hidden="true">* * * *</span> Ryan Prendergast</a></header><nav class="taste-core-nav" aria-label="Core site areas">${nav.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}</nav>${contentHtml}</section>`;
}

function renderTasteSectionHead(title: string, description: string, meta: string): string {
  return `<header class="taste-section-head">${meta ? `<span>${escapeHtml(meta)}</span>` : ""}<h1>${escapeHtml(title)}</h1>${description ? `<p>${escapeHtml(description)}</p>` : ""}</header>`;
}

function renderTasteFeedHead(label: string, count: number): string {
  return `<h2 class="taste-feed-head">${escapeHtml(label)} <span>${count}</span></h2>`;
}

function renderTastePostCard(post: PostSummaryModel, index: number, state: string): string {
  const excerpt = post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : "";
  return `<article class="taste-card"><div class="taste-author"><span class="taste-avatar" aria-hidden="true">RP</span><div><span>Writing</span><time>${escapeHtml(post.date)}</time></div>${post.readTime ? `<strong>${escapeHtml(post.readTime)}</strong>` : ""}</div><div class="taste-card-body"><h2><a href="${post.href}">${escapeHtml(post.title)}</a></h2>${excerpt}</div></article>`;
}

function renderTasteLinkCard(link: LinkEntryModel, index: number): string {
  const excerpt = linkCommentaryText(link.contentHtml);
  const image = link.image ? `<a class="taste-thumb" href="${link.url}"><img src="${link.image}" alt="" loading="lazy" onerror="this.parentElement.remove()"></a>` : "";
  return `<article class="taste-card taste-link-card"><div class="taste-author"><span class="taste-avatar" aria-hidden="true">${escapeHtml(link.domain.slice(0, 2).toUpperCase())}</span><div><span>${escapeHtml(link.domain)}</span><time>${escapeHtml(link.date)}</time></div><strong>link</strong></div>${image}<div class="taste-card-body"><h2><a href="${link.url}">${escapeHtml(link.title)}</a></h2>${excerpt ? `<p>${escapeHtml(excerpt)}</p>` : ""}</div></article>`;
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
