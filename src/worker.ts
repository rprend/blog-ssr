import { Hono } from "hono";
import { getBlogPosts, getBlogPost } from "./build-outputs/blog";
import {
  layout,
  nav,
  home,
  blogList,
  blogPost,
  contact,
  memory,
} from "./build-outputs/templates";

interface Bindings {
  GUESTBOOK_DB: any; // D1Database
  ASSETS: any; // Fetcher
}

const app = new Hono<{ Bindings: Bindings }>();

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
  } = {}
) {
  const navData = {
    homeActive: currentPage === "/" ? "active" : "",
    blogActive: currentPage === "/blog" ? "active" : "",
    guestbookActive: currentPage === "/guestbook" ? "active" : "",
    contactActive: currentPage === "/contact" ? "active" : "",
  };

  const baseUrl = "https://ryan-prendergast.com";

  return layout({
    title,
    nav: nav(navData),
    content,
    description:
      seoData.description || "Ryan Prendergast's personal website and blog",
    ogType: seoData.ogType || "website",
    canonicalUrl: seoData.canonicalUrl || `${baseUrl}${currentPage}`,
    ogImage: seoData.ogImage || "",
    twitterImage: seoData.ogImage || "",
    structuredData: seoData.structuredData || "",
  });
}

// Home Page
app.get("/", (c) => {
  const content = home();
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ryan Prendergast",
      "url": "https://ryan-prendergast.com",
      "sameAs": [
        "https://github.com/rprend",
        "https://linkedin.com/in/rprendergast",
        "https://instagram.com/r.prendie",
        "https://youtube.com/@rprend",
        "https://letterboxd.com/rprend"
      ],
      "jobTitle": "Co founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Zenobia Pay"
      }
    }
    </script>
  `;

  return c.html(
    renderPage("Ryan Prendergast", content, "/", {
      description:
        "Ryan Prendergast is the co-founder of Zenobia Pay, with interests in filmmaking, music, and writing.",
      ogType: "profile",
      structuredData,
    })
  );
});

// Blog List Page
app.get("/blog", async (c) => {
  const posts = await getBlogPosts();

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach((post) => {
    // Parse MM-DD-YYYY format to YYYY-MM-DD for proper Date parsing
    const parts = post.date.split("-");
    const year = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
      .getFullYear()
      .toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    return `${parts[0]}-${parts[1]}`;
  };

  let postsHtml = "";
  Object.keys(postsByYear)
    .sort((a, b) => b.localeCompare(a))
    .forEach((year) => {
      postsHtml += `<h2 class="blog-year">${year}</h2>`;
      postsByYear[year].forEach((post) => {
        postsHtml += `
        <div class="blog-post-item">
          <span class="blog-date">${formatDate(post.date)}</span>
          <a href="/blog/${post.slug}" class="blog-title">
            ${post.title}<span class="blog-arrow">→</span>
          </a>
        </div>
      `;
      });
    });

  const content = blogList({ postsHtml });
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
    renderPage("Ryan's Mailbag", content, "/blog", {
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
      <section>
        <p><a href="/blog">← Back to Blog</a></p>
        <h1>Post Not Found</h1>
        <p>The post you're looking for doesn't exist.</p>
      </section>
    `;
    return c.html(
      renderPage("Post Not Found - Ryan Prendergast", content, "/blog")
    );
  }

  const content = blogPost({
    title: post.title,
    date: post.date,
    subtitle: post.subtitle ? `<p class="subtitle">${post.subtitle}</p>` : "",
    author: post.author ? ` • ${post.author}` : "",
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
      description: post.excerpt || `${post.title} by Ryan Prendergast`,
      ogType: "article",
      canonicalUrl: `https://ryan-prendergast.com/blog/${post.slug}`,
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

    let entriesHtml = "";
    if (!results || results.length === 0) {
      entriesHtml = `
        <div class="text-center py-2">
          <p class="text-muted">No entries yet. Be the first to sign the guestbook!</p>
        </div>
      `;
    } else {
      results.forEach((entry) => {
        const date = new Date(entry.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        entriesHtml += `
          <div class="guestbook-entry">
            <div class="guestbook-date">${date}</div>
            <div class="guestbook-message">${entry.message}</div>
            <div class="guestbook-name">— ${entry.name}</div>
          </div>
        `;
      });
    }

    const content = `
      <section>
        <div class="guestbook-header">
          <h1>guestbook</h1>
          <button onclick="showGuestbookModal()">Sign Guestbook</button>
        </div>
        ${entriesHtml}
      </section>
      
      <div id="guestbookModal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Sign Guestbook</h2>
            <button onclick="hideGuestbookModal()" class="modal-close">✕</button>
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
              <button type="button" onclick="hideGuestbookModal()" class="button-secondary">Cancel</button>
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
        description:
          "Sign Ryan Prendergast's guestbook and see messages from visitors",
        structuredData,
      })
    );
  } catch (error) {
    console.error("Error loading guestbook:", error);
    const content = `
      <section>
        <h1>guestbook</h1>
        <p>Failed to load guestbook entries. Please try again later.</p>
      </section>
    `;
    return c.html(
      renderPage("Guestbook - Ryan Prendergast", content, "/guestbook")
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
    { url: "/contact", changefreq: "monthly", priority: "0.7" },
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
    // Try to fetch the static asset first
    const response = await c.env.ASSETS.fetch(c.req.raw);

    // If the asset is not found (404), show our custom 404 page
    if (response.status === 404) {
      const content = `
        <section>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <p><a href="/">← Go home</a> or <a href="/blog">browse the blog</a></p>
        </section>
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

    // Return the static asset if it exists
    return response;
  } catch (error) {
    // If there's an error fetching the asset, also show 404
    const content = `
      <section>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p><a href="/">← Go home</a> or <a href="/blog">browse the blog</a></p>
      </section>
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
