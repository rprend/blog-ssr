import { Hono } from "hono";
import { getBlogPosts, getBlogPost } from "./lib/blog";
import {
  layout,
  nav,
  home,
  blogList,
  blogPost,
  contact,
} from "./lib/templates";

interface Bindings {
  GUESTBOOK_DB: any; // D1Database
  ASSETS: any; // Fetcher
}

const app = new Hono<{ Bindings: Bindings }>();

// Helper function to render page with navigation
function renderPage(title: string, content: string, currentPage: string = "") {
  const navData = {
    homeActive: currentPage === "/" ? "active" : "",
    blogActive: currentPage === "/blog" ? "active" : "",
    guestbookActive: currentPage === "/guestbook" ? "active" : "",
    contactActive: currentPage === "/contact" ? "active" : "",
  };

  return layout({
    title,
    nav: nav(navData),
    content,
  });
}

// Home Page
app.get("/", (c) => {
  const content = home();
  return c.html(renderPage("Ryan Prendergast", content, "/"));
});

// Blog List Page
app.get("/blog", async (c) => {
  const posts = await getBlogPosts();

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach((post) => {
    const year = new Date(post.date.split("-").reverse().join("-"))
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
  return c.html(renderPage("Blog | Ryan Prendergast", content, "/blog"));
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
    subtitle: post.subtitle ? `<p class="subtitle">${post.subtitle}</p>` : '',
    author: post.author ? ` • ${post.author}` : '',
    content: post.content,
  });

  return c.html(
    renderPage(`${post.title} - Ryan Prendergast`, content, "/blog")
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

    return c.html(
      renderPage("Guestbook - Ryan Prendergast", content, "/guestbook")
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
  return c.html(renderPage("Contact - Ryan Prendergast", content, "/contact"));
});

// Serve static assets (CSS, images, etc.)
app.get("/styles.css", async (c) => {
  return c.env.ASSETS.fetch(new Request("https://dummy/styles.css"));
});

// Fallback to serve other static assets
app.get("/*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
