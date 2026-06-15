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
  contact,
  archives,
  memory,
} from "./build-outputs/templates";
import {
  defaultThemeSlug,
  getThemesByCategory,
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
  type ThemesModel,
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
    href: `${hrefPrefix}/${post.slug}`,
    date: formatDateReadable(post.date),
    rawDate: post.date,
    excerpt: post.excerpt,
    readTime: post.readTime,
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

  return `
    <article class="theme-card" data-theme-card="${theme.slug}" data-theme-category="${theme.category}">
      <div class="theme-card-preview" aria-hidden="true">
        <span>${escapeHtml(theme.name)}</span>
      </div>
      <div class="theme-card-body">
        <div class="theme-card-kicker">${formatCategory(theme.category)}</div>
        <h2 class="theme-card-title">${escapeHtml(theme.name)}</h2>
        <p class="theme-card-description">${escapeHtml(theme.description)}</p>
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
    blogActive: currentPage === "/blog" ? "active" : "",
    photosActive: currentPage === "/photos" ? "active" : "",
    archivesActive: currentPage === "/archives" ? "active" : "",
    guestbookActive: currentPage === "/guestbook" ? "active" : "",
    contactActive: currentPage === "/contact" ? "active" : "",
    themesActive: currentPage === "/themes" ? "active" : "",
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

// Home Page (Linklog)
app.get("/", async (c) => {
  const links = await getLinkEntries();
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos");
  const model: HomeModel = {
    introHtml: `
      <div class="homepage-intro">
        <p>Ryan is a startup founder focused on quantitative humanities research at <a href="https://alpharesearch.nyc" target="_blank" rel="noopener noreferrer">Alpha Research</a>. Previously, he built <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer">Zenobia Pay</a>, a bank transfer payment network for luxury goods, and <a href="https://dolphinmade.com" target="_blank" rel="noopener noreferrer">Dolphin Made</a>, a web app builder focused on one shotting entire startups.</p>
        <p>He works to orchestrate AI for difficult or impossible workflows, and he is open to collaborate or network with people with unique and difficult problems they want to solve with AI.</p>
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
      "name": "Ryan Prendergast's Linklog",
      "url": "https://ryan-prendergast.com",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Ryan Prendergast", model, "/", "home", {
      pageSubtitle: "Linklog",
      description:
        "Links, commentary, and things I find interesting. A linklog by Ryan Prendergast.",
      structuredData,
    })
  );
});

// Photos List Page
app.get("/photos", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section === "photos");

  const model: BlogIndexModel = {
    description: "Photos by Ryan Prendergast",
    postsByYear: [
      {
        year: "Photos",
        posts: posts.map((post) => toPostSummary(post, "/photos")),
      },
    ],
    totalPosts: posts.length,
    yearRange: null,
  };

  return c.html(
    renderThemePage(c.req.raw, "Photos - Ryan Prendergast", model, "/photos", "blog-index", {
      pageSubtitle: "Photos",
      description: "Photos by Ryan Prendergast",
    })
  );
});

// Individual Photo Post Page
app.get("/photos/:slug", async (c) => {
  const slug = c.req.param("slug");
  const post = await getBlogPost(slug);

  if (!post || post.section !== "photos") {
    const content = `
      <div class="blog-post-nav">
        <a href="/photos">&larr; Back to Photos</a>
      </div>
      <h2 class="blog-post-title">Post Not Found</h2>
      <p>The photo post you're looking for doesn't exist.</p>
    `;
    return c.html(
      renderPage("Post Not Found - Ryan Prendergast", content, "/photos", {
        pageSubtitle: "Photos",
      })
    );
  }

  const parts = post.date.split("-");
  const model: BlogPostModel = {
    title: post.title,
    subtitle: post.subtitle,
    author: post.author,
    date: formatDateReadable(post.date),
    isoDate: `${parts[2]}-${parts[0]}-${parts[1]}`,
    contentHtml: post.content,
    backHref: "/photos",
    backLabel: "Back to Photos",
  };

  return c.html(
    renderThemePage(c.req.raw, `${post.title} - Ryan Prendergast`, model, "/photos", "blog-post", {
      pageSubtitle: "Photos",
      description: post.excerpt || `${post.title} by Ryan Prendergast`,
      ogType: "article",
      canonicalUrl: `https://ryan-prendergast.com/photos/${post.slug}`,
      bodyClass: "raw-page",
    })
  );
});

// Blog List Page
app.get("/blog", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos");

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
    description: "Ryan's mailbag: Essays and book reviews",
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
      "name": "Ryan's Mailbag",
      "description": "Essays and book reviews",
      "url": "https://ryan-prendergast.com/blog",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Blog - Ryan Prendergast", model, "/blog", "blog-index", {
      pageSubtitle: "Blog",
      description: "Essays and book reviews",
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
        <a href="/blog">&larr; Back to Blog</a>
      </div>
      <h2 class="blog-post-title">Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
    `;
    return c.html(
      renderPage("Post Not Found - Ryan Prendergast", content, "/blog", {
        pageSubtitle: "Blog",
      })
    );
  }

  if (post.section === "photos") {
    return c.redirect(`/photos/${post.slug}`);
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
    backLabel: "Back to Blog",
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
      pageSubtitle: "Blog",
      description: post.excerpt || `${post.title} by Ryan Prendergast`,
      ogType: "article",
      canonicalUrl: `https://ryan-prendergast.com/blog/${post.slug}`,
      structuredData,
    })
  );
});

// Archives Page
app.get("/archives", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos");

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

// Theme Gallery
app.get("/themes", (c) => {
  const themesByCategory = getThemesByCategory();
  const categories = Object.keys(themesByCategory);
  const categoryControls = [
    `<button type="button" class="theme-filter is-active" data-theme-filter="all">All 100</button>`,
    ...categories.map(
      (category) =>
        `<button type="button" class="theme-filter" data-theme-filter="${category}">${formatCategory(category)}</button>`
    ),
  ].join("");

  const selectOptions = siteThemes
    .map((theme) => `<option value="${theme.slug}">${escapeHtml(theme.name)}</option>`)
    .join("");

  const themeSections = categories
    .map((category) => {
      const themes = themesByCategory[category as keyof typeof themesByCategory];
      return `
        <section class="theme-category-section">
          <div class="theme-category-heading">
            <h2>${formatCategory(category)}</h2>
            <span>${themes.length} themes</span>
          </div>
          <div class="theme-grid">
            ${themes.map(renderThemeCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  const model: ThemesModel = {
    themes: siteThemes,
    categories,
    categoryControlsHtml: categoryControls,
    selectOptionsHtml: selectOptions,
    themeSectionsHtml: themeSections,
  };

  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Theme Museum",
      "description": "Browse 100 visual themes for Ryan Prendergast's personal site",
      "url": "https://ryan-prendergast.com/themes",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Themes - Ryan Prendergast", model, "/themes", "themes", {
      pageSubtitle: "Themes",
      description: "Browse and apply 100 visual themes for Ryan Prendergast's personal site.",
      structuredData,
    })
  );
});

app.get("/themes/random", (c) => {
  const index = Math.floor(Math.random() * siteThemes.length);
  const theme = siteThemes[index] || siteThemes[0];
  return c.redirect(`/themes?theme=${theme.slug}`, 302);
});

app.get("/colophon", (c) => {
  const contentHtml = `
    <article class="colophon-page">
      <h2 class="blog-post-title">Colophon</h2>
      <p>This site is built as a small Cloudflare Worker that renders semantic HTML templates and serves static assets from the repository.</p>
      <p>The visual layer is now a 100-theme layout renderer system. A shared content model feeds different shells and route renderers, so a theme can act like Hacker News, Windows 98, a terminal, a wiki, or a portfolio without changing the underlying content.</p>
      <p>Theme selection is stored locally and in a cookie, can be shared with a URL parameter such as <code>?theme=win98</code>, and can be changed from the picker or the full theme gallery.</p>
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
      description: "How Ryan Prendergast's personal site is built, including the 100-theme system.",
      structuredData,
    })
  );
});

// Guestbook API endpoints
app.get("/api/guestbook", async (c) => {
  try {
    const { results } = await c.env.GUESTBOOK_DB.prepare(
      "SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
    ).all();

    return c.json(results);
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
      entries: (results || []).map((entry) => ({
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

// Memory Page (Flashcards with Spaced Repetition)
app.get("/memory", (c) => {
  const model: GenericPageModel = { heading: "Memory", contentHtml: memory() };
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Memory",
      "description": "Anki-like flashcards with spaced repetition for learning",
      "url": "https://ryan-prendergast.com/memory",
      "applicationCategory": "EducationalApplication",
      "author": {
        "@type": "Person",
        "name": "Ryan Prendergast"
      }
    }
    </script>
  `;

  return c.html(
    renderThemePage(c.req.raw, "Memory - Ryan Prendergast", model, "/memory", "generic", {
      pageSubtitle: "Memory",
      description:
        "Anki-like flashcards with spaced repetition algorithm for effective learning and memorization.",
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
  const posts = await getBlogPosts();
  const baseUrl = "https://ryan-prendergast.com";

  const staticPages = [
    { url: "", changefreq: "weekly", priority: "1.0" },
    { url: "/blog", changefreq: "weekly", priority: "0.9" },
    { url: "/archives", changefreq: "weekly", priority: "0.8" },
    { url: "/themes", changefreq: "monthly", priority: "0.8" },
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
    <loc>${baseUrl}/blog/${post.slug}</loc>
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
        <p><a href="/">&larr; Go home</a> or <a href="/blog">browse the blog</a></p>
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
      <p><a href="/">&larr; Go home</a> or <a href="/blog">browse the blog</a></p>
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
