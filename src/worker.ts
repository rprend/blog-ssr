import { Hono } from 'hono';
import { getBlogPosts, getBlogPost } from './lib/blog';
import { layout, nav, home, blogList, blogPost, contact } from './lib/templates';

interface Bindings {
  GUESTBOOK_DB: any; // D1Database
  ASSETS: any; // Fetcher
}

const app = new Hono<{ Bindings: Bindings }>();

// Helper function to render page with navigation
function renderPage(title: string, content: string, currentPage: string = '') {
  const navData = {
    homeActive: currentPage === '/' ? 'underline active' : 'inactive',
    blogActive: currentPage === '/blog' ? 'underline active' : 'inactive',
    guestbookActive: currentPage === '/guestbook' ? 'underline active' : 'inactive',
    contactActive: currentPage === '/contact' ? 'underline active' : 'inactive',
  };
  
  return layout({
    title,
    nav: nav(navData),
    content
  });
}

// Home Page
app.get('/', (c) => {
  const content = home();
  return c.html(renderPage('Ryan Prendergast', content, '/'));
});

// Blog List Page
app.get('/blog', async (c) => {
  const posts = await getBlogPosts();
  
  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach(post => {
    const year = new Date(post.date.split('-').reverse().join('-')).getFullYear().toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });
  
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    return `${parts[0]}-${parts[1]}`;
  };
  
  let postsHtml = '';
  Object.keys(postsByYear).sort((a, b) => b.localeCompare(a)).forEach(year => {
    postsHtml += `
      <div class="pt-8 pb-2">
        <h2 class="text-xl font-bold font-headline text-primary">${year}</h2>
      </div>
    `;
    postsByYear[year].forEach(post => {
      postsHtml += `
        <div class="py-3 flex items-baseline">
          <span class="text-primary w-16 pl-2 flex-shrink-0 whitespace-nowrap">
            ${formatDate(post.date)}
          </span>
          <div class="group flex items-center min-w-0">
            <a href="/blog/${post.slug}" class="text-primary hover:underline">
              ${post.title}
            </a>
            <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary flex-shrink-0">
              →
            </span>
          </div>
        </div>
      `;
    });
  });
  
  const content = blogList({ postsHtml });
  return c.html(renderPage('Blog | Ryan Prendergast', content, '/blog'));
});

// Individual Blog Post Page
app.get('/blog/:slug', async (c) => {
  const slug = c.req.param('slug');
  const post = await getBlogPost(slug);
  
  if (!post) {
    const content = `
      <main class="max-w-2xl px-4 pb-12 pt-6">
        <h1 class="text-3xl font-bold font-headline text-primary mb-8">Post Not Found</h1>
        <p class="text-primary">
          <a href="/blog" class="hover:opacity-80 underline transition-opacity">
            ← Back to Blog
          </a>
        </p>
      </main>
    `;
    return c.html(renderPage('Post Not Found - Ryan Prendergast', content, '/blog'));
  }
  
  const content = blogPost({
    title: post.title,
    date: post.date,
    content: post.content
  });
  
  return c.html(renderPage(`${post.title} - Ryan Prendergast`, content, '/blog'));
});

// Guestbook API endpoints
app.get('/api/guestbook', async (c) => {
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

app.post('/api/guestbook', async (c) => {
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
app.get('/guestbook', async (c) => {
  try {
    const { results } = await c.env.GUESTBOOK_DB.prepare(
      "SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
    ).all() as { results: Array<{ name: string, message: string, created_at: string }> };
    
    let entriesHtml = '';
    if (!results || results.length === 0) {
      entriesHtml = `
        <div class="text-center py-8">
          <p class="text-secondary">
            No entries yet. Be the first to sign the guestbook!
          </p>
        </div>
      `;
    } else {
      results.forEach(entry => {
        const date = new Date(entry.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        entriesHtml += `
          <div class="border-b border-gray-200 pb-4">
            <div class="flex justify-between items-start mb-2">
              <span class="text-sm text-secondary">${date}</span>
            </div>
            <p class="text-primary font-medium">${entry.message}</p>
            <p class="text-primary">— ${entry.name}</p>
          </div>
        `;
      });
    }
    
    const content = `
      <main class="max-w-2xl px-4 pb-12 pt-6">
        <div class="flex justify-between items-start mb-8">
          <h1 class="text-4xl md:text-5xl font-bold font-headline text-primary">guestbook</h1>
          <button onclick="showGuestbookModal()" class="px-4 py-2 bg-primary text-white rounded hover:opacity-80 transition-opacity">
            Sign Guestbook
          </button>
        </div>
        <div class="space-y-4">
          ${entriesHtml}
        </div>
      </main>
      
      <!-- Guestbook Modal -->
      <div id="guestbookModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-background border border-gray-200 rounded-lg max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold font-headline text-primary">Sign Guestbook</h2>
            <button onclick="hideGuestbookModal()" class="text-secondary hover:text-primary transition-colors">✕</button>
          </div>
          <form id="guestbookForm" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-primary mb-1">Name *</label>
              <input id="name" name="name" type="text" required maxlength="50"
                     class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary bg-white text-primary">
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-primary mb-1">Message *</label>
              <textarea id="message" name="message" required maxlength="500" rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary bg-white text-primary resize-none"></textarea>
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" onclick="hideGuestbookModal()"
                      class="flex-1 px-4 py-2 border border-gray-300 text-primary rounded hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit"
                      class="flex-1 px-4 py-2 bg-primary text-white rounded hover:opacity-80 transition-opacity">
                Submit
              </button>
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
    
    return c.html(renderPage('Guestbook - Ryan Prendergast', content, '/guestbook'));
  } catch (error) {
    console.error("Error loading guestbook:", error);
    const content = `
      <main class="max-w-2xl px-4 pb-12 pt-6">
        <h1 class="text-4xl md:text-5xl font-bold font-headline text-primary mb-8">guestbook</h1>
        <p class="text-red-600">Failed to load guestbook entries. Please try again later.</p>
      </main>
    `;
    return c.html(renderPage('Guestbook - Ryan Prendergast', content, '/guestbook'));
  }
});

// Contact Page
app.get('/contact', (c) => {
  const content = contact();
  return c.html(renderPage('Contact - Ryan Prendergast', content, '/contact'));
});

// Serve static assets (CSS, images, etc.)
app.get('/styles.css', async (c) => {
  return c.env.ASSETS.fetch(new Request('https://dummy/styles.css'));
});

// Fallback to serve other static assets
app.get('/*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;