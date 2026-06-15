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

  // Extract domain from URL for display
  function extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }

  let linksHtml = "";
  links.forEach((link) => {
    const imageHtml = link.image
      ? `<div class="linklog-image"><img src="${link.image}" alt="" loading="lazy"></div>`
      : "";
    linksHtml += `
      <div class="linklog-entry">
        <div class="linklog-header">
          <div class="linklog-title"><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a></div>
          <span class="linklog-domain">${extractDomain(link.url)}</span>
          <span class="linklog-meta">${formatDateReadable(link.date)}</span>
        </div>
        ${imageHtml}
        <div class="linklog-commentary">${link.content}</div>
      </div>
    `;
  });

  const content = home({ linksHtml });

  // Sidebar: recent blog posts + link count
  const posts = (await getBlogPosts()).filter((post) => post.section !== "photos");
  const recentPosts = posts
    .slice(0, 5)
    .map(
      (p) =>
        `<div style="margin-bottom: 6px;"><a href="/blog/${p.slug}" style="font-size: 12px;">${p.title}</a></div>`
    )
    .join("");

  const sidebarExtra = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Recent Essays</h3>
      <div class="sidebar-text">${recentPosts}</div>
    </div>
    <div class="sidebar-box">
      <h3 class="sidebar-header">About</h3>
      <div class="sidebar-text">
        A linklog by Ryan Prendergast. Links, commentary, and things I find interesting.
        <br><br>
        <a href="/contact">Get in touch &rarr;</a>
      </div>
    </div>
  `;

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
    renderPage("Ryan Prendergast", content, "/", {
      pageSubtitle: "Linklog",
      description:
        "Links, commentary, and things I find interesting. A linklog by Ryan Prendergast.",
      structuredData,
      sidebarExtra,
    })
  );
});

// Photos List Page
app.get("/photos", async (c) => {
  const posts = (await getBlogPosts()).filter((post) => post.section === "photos");

  let photosHtml = "";
  posts.forEach((post) => {
    photosHtml += `
      <div class="blog-post-item">
        <a href="/photos/${post.slug}" class="blog-title">${post.title}</a>
        <div class="blog-date">${formatDateReadable(post.date)}</div>
      </div>
    `;
  });

  const sidebarExtra = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Photos</h3>
      <div class="sidebar-text">${posts.length} ${posts.length === 1 ? "post" : "posts"}.</div>
    </div>
  `;

  return c.html(
    renderPage("Photos - Ryan Prendergast", photosList({ photosHtml }), "/photos", {
      pageSubtitle: "Photos",
      description: "Photos by Ryan Prendergast",
      sidebarExtra,
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

  return c.html(
    renderPage(`${post.title} - Ryan Prendergast`, post.content, "/photos", {
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

  let postsHtml = "";
  Object.keys(postsByYear)
    .sort((a, b) => b.localeCompare(a))
    .forEach((year) => {
      postsHtml += `<h2 class="blog-year">${year}</h2>`;
      postsByYear[year].forEach((post) => {
        postsHtml += `
        <div class="blog-post-item">
          <a href="/blog/${post.slug}" class="blog-title">${post.title}</a>
          <div class="blog-date">${formatDateReadable(post.date)}</div>
        </div>
      `;
      });
    });

  const content = blogList({ postsHtml });

  // Sidebar summary
  const totalPosts = posts.length;
  const years = Object.keys(postsByYear).sort();
  const sidebarExtra = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Summary</h3>
      <div class="sidebar-text">
        ${totalPosts} posts from ${years[0]} to ${years[years.length - 1]}.
        <br><br>
        <a href="/archives">Browse the archives &rarr;</a>
      </div>
    </div>
  `;

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
    renderPage("Blog - Ryan Prendergast", content, "/blog", {
      pageSubtitle: "Blog",
      description: "Essays and book reviews",
      structuredData,
      sidebarExtra,
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

  const content = blogPost({
    title: post.title,
    date: formatDateReadable(post.date),
    subtitle: post.subtitle ? `<p class="subtitle">${post.subtitle}</p>` : "",
    author: post.author ? ` &mdash; ${post.author}` : "",
    content: post.content,
  });

  // Parse date for structured data
  const parts = post.date.split("-");
  const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

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
    renderPage(`${post.title} - Ryan Prendergast`, content, "/blog", {
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

  let archiveSections = "";
  Object.keys(postsByMonth)
    .sort((a, b) => b.localeCompare(a))
    .forEach((key) => {
      const group = postsByMonth[key];
      archiveSections += `<section class="archive-section">`;
      archiveSections += `<div class="archive-month-header">${group.label}<span class="month-count">${group.posts.length} ${group.posts.length === 1 ? "entry" : "entries"}</span></div>`;
      group.posts.forEach((post) => {
        archiveSections += `
          <div class="link-entry">
            <div class="entry-title"><a href="/blog/${post.slug}">${post.title}</a></div>
            <div class="entry-meta">${formatDateReadable(post.date)}</div>
          </div>
        `;
      });
      archiveSections += `</section>`;
    });

  const content = archives({ archiveSections });

  // Build calendar for the most recent month
  const sortedKeys = Object.keys(postsByMonth).sort((a, b) =>
    b.localeCompare(a)
  );
  let calendarHtml = "";
  if (sortedKeys.length > 0) {
    const latestKey = sortedKeys[0];
    const [calYear, calMonth] = latestKey.split("-").map(Number);
    const monthLabel = postsByMonth[latestKey].label;

    // Get dates that have entries
    const entryDays = new Set<number>();
    postsByMonth[latestKey].posts.forEach((post) => {
      entryDays.add(parseDate(post.date).getDate());
    });

    const firstDay = new Date(calYear, calMonth - 1, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth, 0).getDate();
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === calYear && today.getMonth() + 1 === calMonth;

    calendarHtml = `
      <div class="sidebar-box">
        <h3 class="sidebar-header">${monthLabel}</h3>
        <table class="calendar-widget">
          <thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead>
          <tbody>
    `;
    let day = 1;
    for (let week = 0; week < 6 && day <= daysInMonth; week++) {
      calendarHtml += "<tr>";
      for (let dow = 0; dow < 7; dow++) {
        if ((week === 0 && dow < firstDay) || day > daysInMonth) {
          calendarHtml += "<td></td>";
        } else {
          const classes: string[] = [];
          if (entryDays.has(day)) classes.push("has-entry");
          if (isCurrentMonth && today.getDate() === day)
            classes.push("today");
          calendarHtml += `<td${classes.length ? ` class="${classes.join(" ")}"` : ""}>${day}</td>`;
          day++;
        }
      }
      calendarHtml += "</tr>";
    }
    calendarHtml += `</tbody></table></div>`;
  }

  // Summary sidebar
  const totalPosts = posts.length;
  const monthCount = sortedKeys.length;
  const summaryHtml = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Summary</h3>
      <div class="sidebar-text">
        Browsing ${totalPosts} posts across ${monthCount} months.
        <br><br>
        <a href="/blog">&larr; Back to blog</a>
      </div>
    </div>
  `;

  const sidebarExtra = calendarHtml + summaryHtml;

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
    renderPage("Archives - Ryan Prendergast", content, "/archives", {
      pageSubtitle: "Archives",
      description: "Browse all posts by date",
      structuredData,
      sidebarExtra,
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

  const content = `
    <section class="themes-hero">
      <div>
        <p class="themes-eyebrow">Theme Museum</p>
        <h2>100 ways to read the same personal site.</h2>
        <p>The content stays stable while the visual system changes around it. Pick a skin, randomize the wardrobe, or share a URL with a theme parameter.</p>
      </div>
      <div class="themes-console">
        <label for="theme-select">Current theme</label>
        <select id="theme-select" data-theme-select>${selectOptions}</select>
        <div class="theme-picker-controls">
          <button type="button" data-theme-prev>&lsaquo; Previous</button>
          <button type="button" data-theme-random>Random</button>
          <button type="button" data-theme-next>Next &rsaquo;</button>
        </div>
        <p>Selected: <strong data-theme-current>Aqua</strong></p>
      </div>
    </section>
    <div class="theme-filters" aria-label="Theme categories">${categoryControls}</div>
    ${themeSections}
  `;

  const sidebarExtra = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Theme System</h3>
      <div class="sidebar-text">
        ${siteThemes.length} ready themes across ${categories.length} categories.
        <br><br>
        URL sharing works with <code>?theme=win98</code>.
      </div>
    </div>
  `;

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
    renderPage("Themes - Ryan Prendergast", content, "/themes", {
      pageSubtitle: "Themes",
      description: "Browse and apply 100 visual themes for Ryan Prendergast's personal site.",
      structuredData,
      sidebarExtra,
    })
  );
});

app.get("/themes/random", (c) => {
  const index = Math.floor(Math.random() * siteThemes.length);
  const theme = siteThemes[index] || siteThemes[0];
  return c.redirect(`/themes?theme=${theme.slug}`, 302);
});

app.get("/colophon", (c) => {
  const content = `
    <article class="colophon-page">
      <h2 class="blog-post-title">Colophon</h2>
      <p>This site is built as a small Cloudflare Worker that renders semantic HTML templates and serves static assets from the repository.</p>
      <p>The visual layer is now a 100-theme system. A single theme registry in source code defines the available skins, the <a href="/themes">theme museum</a> renders from that registry, and the same page structure is reused across the site.</p>
      <p>Theme selection is stored locally in the browser, can be shared with a URL parameter such as <code>?theme=win98</code>, and can be changed from the sidebar picker or the full theme gallery.</p>
      <p>The default skin is <strong>Aqua</strong>, preserving the early-2000s Apple-inspired design that was already here before the theme system was added.</p>
    </article>
  `;

  const sidebarExtra = `
    <div class="sidebar-box">
      <h3 class="sidebar-header">Build Notes</h3>
      <div class="sidebar-text">
        Worker-rendered HTML, static CSS, a small JavaScript picker, and 100 theme tokens.
        <br><br>
        <a href="/themes">Open the theme museum &rarr;</a>
      </div>
    </div>
  `;

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
    renderPage("Colophon - Ryan Prendergast", content, "/colophon", {
      pageSubtitle: "Colophon",
      description: "How Ryan Prendergast's personal site is built, including the 100-theme system.",
      structuredData,
      sidebarExtra,
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

    let entriesHtml = "";
    if (!results || results.length === 0) {
      entriesHtml = `
        <div class="text-center" style="padding: 20px 0;">
          <p class="text-muted">No entries yet. Be the first to sign the guestbook!</p>
        </div>
      `;
    } else {
      results.forEach((entry) => {
        const date = new Date(entry.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        entriesHtml += `
          <div class="guestbook-entry">
            <div class="guestbook-date">${date}</div>
            <div class="guestbook-message">${entry.message}</div>
            <div class="guestbook-name">&mdash; ${entry.name}</div>
          </div>
        `;
      });
    }

    const content = `
      <div class="guestbook-header">
        <h2>Guestbook</h2>
        <button onclick="showGuestbookModal()">Sign Guestbook</button>
      </div>
      ${entriesHtml}

      <div id="guestbookModal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Sign Guestbook</h2>
            <button onclick="hideGuestbookModal()" class="modal-close">&times;</button>
          </div>
          <form id="guestbookForm">
            <div class="form-group">
              <label for="name" class="form-label">Name *</label>
              <input id="name" name="name" type="text" required maxlength="50" class="form-input">
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message *</label>
              <textarea id="message" name="message" required maxlength="500" rows="4" class="form-textarea"></textarea>
            </div>
            <div class="form-actions">
              <button type="button" onclick="hideGuestbookModal()">Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <script>
        function showGuestbookModal() {
          document.getElementById('guestbookModal').classList.remove('hidden');
        }
        function hideGuestbookModal() {
          document.getElementById('guestbookModal').classList.add('hidden');
        }
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') hideGuestbookModal();
        });

        document.getElementById('guestbookForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = document.getElementById('name').value;
          const message = document.getElementById('message').value;

          try {
            const response = await fetch('/api/guestbook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, message })
            });

            if (response.ok) {
              window.location.reload();
            } else {
              alert('Failed to submit entry. Please try again.');
            }
          } catch (error) {
            alert('Failed to submit entry. Please try again.');
          }
        });
      </script>
    `;

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
      renderPage("Guestbook - Ryan Prendergast", content, "/guestbook", {
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
  const content = contact();
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
    renderPage("Contact - Ryan Prendergast", content, "/contact", {
      pageSubtitle: "Contact",
      description:
        "Get in touch with Ryan Prendergast. Connect via email or social media.",
      structuredData,
    })
  );
});

// Memory Page (Flashcards with Spaced Repetition)
app.get("/memory", (c) => {
  const content = memory();
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
    renderPage("Memory - Ryan Prendergast", content, "/memory", {
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
