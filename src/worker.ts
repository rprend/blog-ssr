import { Hono } from "hono";
import { getBlogPosts, getBlogPost } from "./build-outputs/blog";
import { getLinkEntries } from "./build-outputs/links";
import {
  layout,
  nav,
  home,
  blogList,
  blogPost,
  photosList,
  photoLightTrails,
  photoKhachkars,
  contact,
  archives,
} from "./build-outputs/templates";
import {
  defaultThemeSlug,
  siteThemes,
  type SiteTheme,
} from "./themes";
import {
  renderThemedPage,
  resolveThemeFromRequest,
  type ArchiveModel,
  type BlogIndexModel,
  type BlogPostModel,
  type GenericPageModel,
  type HomeModel,
  type LinkEntryModel,
  type PostSummaryModel,
} from "./theme-renderers";

interface Bindings {
  GUESTBOOK_DB: any; // D1Database
  ASSETS: any; // Fetcher
}

const app = new Hono<{ Bindings: Bindings }>();

// Helper: format date from MM-DD-YYYY to a readable string
function formatDateReadable(dateStr: string): string {
  const parts = dateStr.split("-");
  const date = new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

// Helper: parse MM-DD-YYYY to Date object
function parseDate(dateStr: string): Date {
  const parts = dateStr.split("-");
  return new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCategory(category: string): string {
  if (category === "supplied") return "Supplied Sites";
  if (category === "retro-os") return "Retro OS";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function toPostSummary(post: Awaited<ReturnType<typeof getBlogPosts>>[number], hrefPrefix = "/blog"): PostSummaryModel {
  return {
    slug: post.slug,
    title: post.title,
    href: post.externalUrl || `${hrefPrefix}/${post.slug}`,
    date: formatDateReadable(post.date),
    rawDate: post.date,
    excerpt: post.excerpt,
    readTime: post.readTime,
    image: post.image,
  };
}

function toLinkEntryModel(link: Awaited<ReturnType<typeof getLinkEntries>>[number]): LinkEntryModel {
  return {
    title: link.title,
    url: link.url,
    domain: extractDomain(link.url),
    date: formatDateReadable(link.date),
    rawDate: link.date,
    image: link.image,
    contentHtml: link.content,
  };
}

function renderThemePage<T>(
  request: Request,
  title: string,
  content: T,
  currentPage: string,
  routeType: Parameters<typeof renderThemedPage>[0]["routeType"],
  seoData: {
    description?: string;
    ogType?: string;
    ogImage?: string;
    structuredData?: string;
    canonicalUrl?: string;
    pageSubtitle?: string;
    bodyClass?: string;
  } = {}
) {
  return renderThemedPage({
    theme: resolveThemeFromRequest(request),
    title,
    currentPage,
    routeType,
    model: content as any,
    pageSubtitle: seoData.pageSubtitle || "",
    description: seoData.description,
    ogType: seoData.ogType,
    ogImage: seoData.ogImage,
    structuredData: seoData.structuredData,
    canonicalUrl: seoData.canonicalUrl,
    bodyClass: seoData.bodyClass,
  });
}

function renderThemeCard(theme: SiteTheme): string {
  const tags = theme.tags
    .map((tag) => `<span class="theme-tag">${escapeHtml(tag)}</span>`)
    .join("");
  const statusLabel =
    theme.status === "built"
      ? "Built"
      : theme.status === "referenced"
        ? "Referenced"
        : theme.status === "blocked"
          ? "Blocked"
          : "Planned";

  return `
    <article class="theme-card" data-theme-card="${theme.slug}" data-theme-category="${theme.category}">
      <div class="theme-card-preview" aria-hidden="true">
        <span>${escapeHtml(theme.name)}</span>
      </div>
      <div class="theme-card-body">
        <div class="theme-card-kicker">${formatCategory(theme.category)} / ${statusLabel}</div>
        <h2 class="theme-card-title">${escapeHtml(theme.name)}</h2>
        <p class="theme-card-description">${escapeHtml(theme.description)}</p>
        <p class="theme-card-target"><a href="${theme.targetUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(theme.targetUrl)}</a></p>
        <div class="theme-card-tags">${tags}</div>
        <div class="theme-card-actions">
          <button type="button" data-theme-apply="${theme.slug}">Apply</button>
          <a href="?theme=${theme.slug}" data-theme-preview="${theme.slug}">Preview URL</a>
        </div>
      </div>
    </article>
  `;
}

// Helper function to render page with navigation and SEO data
function renderPage(
  title: string,
  content: string,
  currentPage: string = "",
  seoData: {
    description?: string;
    ogType?: string;
    ogImage?: string;
    structuredData?: string;
    canonicalUrl?: string;
    pageSubtitle?: string;
    sidebarExtra?: string;
    bodyClass?: string;
  } = {}
) {
  const navData = {
    homeActive: currentPage === "/" ? "active" : "",
    linksActive: currentPage === "/links" ? "active" : "",
    blogActive: currentPage === "/blog" ? "active" : "",
    photosActive: currentPage === "/photos" ? "active" : "",
    archivesActive: currentPage === "/archives" ? "active" : "",
    guestbookActive: currentPage === "/guestbook" ? "active" : "",
    contactActive: currentPage === "/contact" ? "active" : "",
    themesActive: "",
    sidebarExtra: seoData.sidebarExtra || "",
  };

  const baseUrl = "https://ryan-prendergast.com";

  return layout({
    title,
    nav: nav(navData),
    content,
    pageSubtitle: seoData.pageSubtitle || "",
    description:
      seoData.description || "Ryan Prendergast's personal website and blog",
    ogType: seoData.ogType || "website",
    canonicalUrl: seoData.canonicalUrl || `${baseUrl}${currentPage}`,
    ogImage: seoData.ogImage || "",
    twitterImage: seoData.ogImage || "",
    structuredData: seoData.structuredData || "",
    bodyClass: seoData.bodyClass || "",
  });
}

// Home page and Links page share one model; the default theme shows the bio on "/" and the links on "/links".
async function renderHomeOrLinks(c: any, currentPage: "/" | "/links") {
  const links = await getLinkEntries();
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos" && !post.unlisted);
  const model: HomeModel = {
    introHtml: `
      <div class="homepage-intro">
        <p>Ryan is a startup founder building <a href="https://withmethod.ai" target="_blank" rel="noopener noreferrer">Method</a> in the agent improvement space. He works with vertical teams (AI for legal, accounting, etc) to measure, benchmark, and improve agents. Previously, he built <a href="https://alpharesearch.nyc" target="_blank" rel="noopener noreferrer">Alpha Research</a>, quantitative humanities research; <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer">Zenobia Pay</a>, a bank transfer payment network for luxury goods; and <a href="https://dolphinmade.com" target="_blank" rel="noopener noreferrer">Dolphin Made</a>, a web app builder focused on one shotting entire startups.</p>
      </div>
    `,
    links: links.map(toLinkEntryModel),
    recentPosts: posts.slice(0, 5).map((post) => toPostSummary(post)),
    aboutHtml: "A linklog by Ryan Prendergast. Links, commentary, and things I find interesting.",
  };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Ryan Prendergast",
      "url": "https://ryan-prendergast.com",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  const isLinks = currentPage === "/links";
  return c.html(
    renderThemePage(c.req.raw, isLinks ? "Links - Ryan Prendergast" : "Ryan Prendergast", model, currentPage, "home", {
      pageSubtitle: isLinks ? "Links" : "",
      description: isLinks
        ? "Links Ryan Prendergast found interesting."
        : "Ryan Prendergast is a startup founder building Method.",
      structuredData,
    })
  );
}

app.get("/", (c) => renderHomeOrLinks(c, "/"));
app.get("/links", (c) => renderHomeOrLinks(c, "/links"));

// Photos List Page
app.get("/photos", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section === "photos");

  const model: BlogIndexModel = {
    description: "I started taking photos as a teenager, doing street photography around my hometown of Chicago. I shoot on a Panasonic Lumix G7 and a Canon PowerShot SD1200 IS. Lately I love to capture motion and movement.",
    postsByYear: [
      {
        year: "Photography",
        posts: posts.map((post) => toPostSummary(post, "/photos")),
      },
    ],
    totalPosts: posts.length,
    yearRange: null,
  };

  return c.html(
    renderThemePage(c.req.raw, "Photography - Ryan Prendergast", model, "/photos", "blog-index", {
      pageSubtitle: "Photography",
      description: "Photography by Ryan Prendergast",
    })
  );
});

// Collections whose page is an interactive piece: the markup comes from a template and sits inside the normal post layout.
const photoSetPages: Record<string, (() => string) | undefined> = {
  "light-trails": photoLightTrails,
  "khachkars": photoKhachkars,
};

// Individual Photo Post Page
app.get("/photos/:slug", async (c) => {
  const slug = c.req.param("slug");
  const post = await getBlogPost(slug);

  if (!post || post.section !== "photos") {
    const content = `
      <div class="blog-post-nav">
        <a href="/photos">&larr; Back to Photography</a>
      </div>
      <h2 class="blog-post-title">Post Not Found</h2>
      <p>The photo post you're looking for doesn't exist.</p>
    `;
    return c.html(
      renderPage("Post Not Found - Ryan Prendergast", content, "/photos", {
        pageSubtitle: "Photography",
      })
    );
  }

  const photoSet = photoSetPages[slug];
  const parts = post.date.split("-");
  const model: BlogPostModel = {
    title: post.title,
    subtitle: post.subtitle,
    author: post.author,
    date: formatDateReadable(post.date),
    isoDate: `${parts[2]}-${parts[0]}-${parts[1]}`,
    contentHtml: photoSet ? photoSet() : post.content,
    backHref: "/photos",
    backLabel: "Photography",
  };

  return c.html(
    renderThemePage(c.req.raw, `${post.title} - Ryan Prendergast`, model, "/photos", "blog-post", {
      pageSubtitle: "Photography",
      description: post.excerpt || `${post.title} by Ryan Prendergast`,
      ogType: "article",
      canonicalUrl: `https://ryan-prendergast.com/photos/${post.slug}`,
      ogImage: post.image ? `<meta property="og:image" content="https://ryan-prendergast.com${post.image}">` : undefined,
      bodyClass: photoSet ? "" : "raw-page",
    })
  );
});

// Blog List Page
app.get("/blog", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos" && !post.unlisted);

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach((post) => {
    const date = parseDate(post.date);
    const year = date.getFullYear().toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  const sortedYears = Object.keys(postsByYear)
    .sort((a, b) => b.localeCompare(a))
  const yearsAscending = Object.keys(postsByYear).sort();
  const model: BlogIndexModel = {
    description: "Writing from my work",
    postsByYear: sortedYears.map((year) => ({
      year,
      posts: postsByYear[year].map((post) => toPostSummary(post)),
    })),
    totalPosts: posts.length,
    yearRange: yearsAscending.length
      ? [Number(yearsAscending[0]), Number(yearsAscending[yearsAscending.length - 1])]
      : null,
  };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Writing",
      "description": "Writing from my work",
      "url": "https://ryan-prendergast.com/blog",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Writing - Ryan Prendergast", model, "/blog", "blog-index", {
      pageSubtitle: "Writing",
      description: "Writing from my work",
      structuredData,
    })
  );
});

// Individual Blog Post Page
app.get("/blog/:slug", async (c) => {
  const slug = c.req.param("slug");
  const post = await getBlogPost(slug);

  if (!post) {
    const content = `
      <div class="blog-post-nav">
        <a href="/blog">&larr; Back to Writing</a>
      </div>
      <h2 class="blog-post-title">Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
    `;
    return c.html(
      renderPage("Post Not Found - Ryan Prendergast", content, "/blog", {
        pageSubtitle: "Writing",
      })
    );
  }

  if (post.section === "photos") {
    return c.redirect(`/photos/${post.slug}`);
  }

  if (post.externalUrl) {
    return c.redirect(post.externalUrl);
  }

  // Parse date for structured data
  const parts = post.date.split("-");
  const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
  const model: BlogPostModel = {
    title: post.title,
    subtitle: post.subtitle,
    author: post.author,
    date: formatDateReadable(post.date),
    isoDate,
    contentHtml: post.content,
    backHref: "/blog",
    backLabel: "Back to Writing",
  };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${post.title.replace(/"/g, '\\"')}",
      "description": "${(post.excerpt || "").replace(/"/g, '\\"')}",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      },
      "publisher": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      },
      "datePublished": "${isoDate}",
      "dateModified": "${isoDate}",
      "url": "https://ryan-prendergast.com/blog/${post.slug}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ryan-prendergast.com/blog/${post.slug}"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, `${post.title} - Ryan Prendergast`, model, "/blog", "blog-post", {
      pageSubtitle: "Writing",
      description: post.excerpt || `${post.title} by Ryan Prendergast`,
      ogType: "article",
      canonicalUrl: `https://ryan-prendergast.com/blog/${post.slug}`,
      structuredData,
    })
  );
});

// Archives Page
app.get("/archives", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos" && !post.unlisted);

  // Group posts by month-year
  const postsByMonth: {
    [key: string]: { label: string; posts: typeof posts };
  } = {};
  posts.forEach((post) => {
    const date = parseDate(post.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    if (!postsByMonth[key]) postsByMonth[key] = { label, posts: [] };
    postsByMonth[key].posts.push(post);
  });

  const sortedKeys = Object.keys(postsByMonth).sort((a, b) =>
    b.localeCompare(a)
  );
  const model: ArchiveModel = {
    months: sortedKeys.map((key) => ({
      key,
      label: postsByMonth[key].label,
      posts: postsByMonth[key].posts.map((post) => toPostSummary(post)),
    })),
    totalPosts: posts.length,
  };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Archives",
      "description": "Browse all posts by date",
      "url": "https://ryan-prendergast.com/archives",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Archives - Ryan Prendergast", model, "/archives", "archives", {
      pageSubtitle: "Archives",
      description: "Browse all posts by date",
      structuredData,
    })
  );
});

// Theme Registry API
app.get("/api/themes", (c) => {
  return c.json({
    defaultTheme: defaultThemeSlug,
    count: siteThemes.length,
    themes: siteThemes,
  });
});

app.get("/themes", (c) => {
  const url = new URL(c.req.url);
  return c.redirect(`/${url.search}`, 302);
});

app.get("/themes/random", (c) => {
  const index = Math.floor(Math.random() * siteThemes.length);
  const theme = siteThemes[index] || siteThemes[0];
  return c.redirect(`/?theme=${theme.slug}`, 302);
});

app.get("/colophon", (c) => {
  const contentHtml = `
    <article class="colophon-page">
      <h2 class="blog-post-title">Colophon</h2>
      <p>This site is built as a small Cloudflare Worker that renders semantic HTML templates and serves static assets from the repository.</p>
      <p>The visual layer is a theme system. A shared content model feeds different shells and route renderers, so a theme can act like Hacker News, Windows 98, a terminal, a wiki, or a portfolio without changing the underlying content.</p>
      <p>Theme selection is stored locally and in a cookie, can be shared with a URL parameter such as <code>?theme=win98</code>, and can be changed from the picker at the bottom of each page.</p>
      <p>The default skin is <strong>Aqua</strong>, preserving the early-2000s Apple-inspired design that was already here before the theme system was added.</p>
    </article>
  `;
  const model: GenericPageModel = { heading: "Colophon", contentHtml };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Colophon",
      "description": "How Ryan Prendergast's personal site is built",
      "url": "https://ryan-prendergast.com/colophon",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Colophon - Ryan Prendergast", model, "/colophon", "generic", {
      pageSubtitle: "Colophon",
      description: "How Ryan Prendergast's personal site is built, including the theme system.",
      structuredData,
    })
  );
});

// Guestbook spam guard: real visitors leave a short note; spam carries a link.
function looksLikeSpam(name: string, message: string): boolean {
  return /https?:\/\/|www\.|<\s*a\b|\.(com|org|net|ru|xyz|top|info)\b/i.test(`${name} ${message}`);
}

// Guestbook API endpoints
app.get("/api/guestbook", async (c) => {
  try {
    const { results } = await c.env.GUESTBOOK_DB.prepare(
      "SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
    ).all();

    return c.json((results || []).filter((entry: any) => !looksLikeSpam(entry.name || "", entry.message || "")));
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return c.json({ error: "Failed to fetch entries" }, 500);
  }
});

app.post("/api/guestbook", async (c) => {
  try {
    const body = await c.req.json();
    const { name, message } = body;

    if (!name || !message) {
      return c.json({ error: "Name and message are required" }, 400);
    }

    if (looksLikeSpam(String(name), String(message))) {
      return c.json({ error: "Links are not allowed in guestbook entries" }, 400);
    }

    const result = await c.env.GUESTBOOK_DB.prepare(
      "INSERT INTO guestbook_entries (name, message) VALUES (?, ?)"
    )
      .bind(name, message)
      .run();

    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return c.json({ error: "Failed to create entry" }, 500);
  }
});

// Guestbook Page
app.get("/guestbook", async (c) => {
  try {
    const { results } = (await c.env.GUESTBOOK_DB.prepare(
      "SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
    ).all()) as {
      results: Array<{ name: string; message: string; created_at: string }>;
    };

    const model = {
      entries: (results || []).filter((entry) => !looksLikeSpam(entry.name, entry.message)).map((entry) => ({
        name: entry.name,
        message: entry.message,
        rawDate: entry.created_at,
        date: new Date(entry.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })),
      canSign: true,
    };

    const structuredData = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Guestbook",
        "description": "Sign Ryan Prendergast's guestbook and see messages from visitors",
        "url": "https://ryan-prendergast.com/guestbook",
        "author": {
          "@type": "Person",
          "name": "Ryan Prendergast"
        }
      }
      </script>
    `;

    return c.html(
      renderThemePage(c.req.raw, "Guestbook - Ryan Prendergast", model, "/guestbook", "guestbook", {
        pageSubtitle: "Guestbook",
        description:
          "Sign Ryan Prendergast's guestbook and see messages from visitors",
        structuredData,
      })
    );
  } catch (error) {
    console.error("Error loading guestbook:", error);
    const content = `
      <h2 class="blog-post-title">Guestbook</h2>
      <p>Failed to load guestbook entries. Please try again later.</p>
    `;
    return c.html(
      renderPage("Guestbook - Ryan Prendergast", content, "/guestbook", {
        pageSubtitle: "Guestbook",
      })
    );
  }
});

// Contact Page
app.get("/contact", (c) => {
  const model: GenericPageModel = { heading: "Contact", contentHtml: contact() };
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Ryan Prendergast",
      "url": "https://ryan-prendergast.com/contact",
      "about": {
        "@type": "Person",
        "name": "Ryan Prendergast",
        "email": "rprendergast1121@gmail.com"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Contact - Ryan Prendergast", model, "/contact", "contact", {
      pageSubtitle: "Contact",
      description:
        "Get in touch with Ryan Prendergast. Connect via email or social media.",
      structuredData,
    })
  );
});

// RSS Feed
app.get("/rss.xml", async (c) => {
  return c.env.ASSETS.fetch(new Request("https://dummy/rss.xml"));
});

// SEO files
app.get("/robots.txt", (c) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://ryan-prendergast.com/sitemap.xml`;

  return c.text(robotsTxt, 200, {
    "Content-Type": "text/plain",
  });
});

app.get("/sitemap.xml", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => !post.unlisted && !post.externalUrl);
  const baseUrl = "https://ryan-prendergast.com";

  const staticPages = [
    { url: "", changefreq: "weekly", priority: "1.0" },
    { url: "/links", changefreq: "weekly", priority: "0.9" },
    { url: "/blog", changefreq: "weekly", priority: "0.9" },
    { url: "/contact", changefreq: "monthly", priority: "0.7" },
    { url: "/colophon", changefreq: "monthly", priority: "0.7" },
    { url: "/guestbook", changefreq: "weekly", priority: "0.6" },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach((page) => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add blog posts
  posts.forEach((post) => {
    const parts = post.date.split("-");
    const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    sitemap += `
  <url>
    <loc>${baseUrl}/${post.section === "photos" ? "photos" : "blog"}/${post.slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return c.text(sitemap, 200, {
    "Content-Type": "application/xml",
  });
});

// Serve static assets (CSS, images, etc.)
app.get("/styles.css", async (c) => {
  return c.env.ASSETS.fetch(new Request("https://dummy/styles.css"));
});

// Fallback handler for static assets and 404s
app.get("/*", async (c) => {
  try {
    const response = await c.env.ASSETS.fetch(c.req.raw);

    if (response.status === 404) {
      const content = `
        <h2 class="blog-post-title">404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <p><a href="/">&larr; Go home</a> or <a href="/blog">browse the writing</a></p>
      `;

      const structuredData = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "404 - Page Not Found",
          "description": "The requested page could not be found",
          "url": "https://ryan-prendergast.com${c.req.path}",
          "author": {
            "@type": "Person",
            "name": "Ryan Prendergast"
          }
        }
        </script>
      `;

      return c.html(
        renderPage("404 - Page Not Found | Ryan Prendergast", content, "", {
          description:
            "The requested page could not be found on Ryan Prendergast's website",
          structuredData,
        }),
        404
      );
    }

    return response;
  } catch (error) {
    const content = `
      <h2 class="blog-post-title">404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p><a href="/">&larr; Go home</a> or <a href="/blog">browse the writing</a></p>
    `;

    const structuredData = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "404 - Page Not Found",
        "description": "The requested page could not be found",
        "url": "https://ryan-prendergast.com${c.req.path}",
        "author": {
          "@type": "Person",
          "name": "Ryan Prendergast"
        }
      }
      </script>
    `;

    return c.html(
      renderPage("404 - Page Not Found | Ryan Prendergast", content, "", {
        description:
          "The requested page could not be found on Ryan Prendergast's website",
        structuredData,
      }),
      404
    );
  }
});

export default app;
