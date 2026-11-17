// Auto-generated template functions - do not edit manually

export const archives = (data: Record<string, string> = {}): string => {
  let html = `{{archiveSections}}
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const blogList = (data: Record<string, string> = {}): string => {
  let html = `<p class="blog-description">Ryan's mailbag: Essays and book reviews</p>
<div class="blog-rss-link">
  <a href="/rss.xml">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;">
      <path d="M4 11a9 9 0 0 1 9 9"></path>
      <path d="M4 4a16 16 0 0 1 16 16"></path>
      <circle cx="5" cy="19" r="1"></circle>
    </svg>RSS Feed
  </a>
</div>
{{postsHtml}}
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const blogPost = (data: Record<string, string> = {}): string => {
  let html = `<div class="blog-post-nav">
  <a href="/blog">&larr; Back to Essays</a>
</div>
<h2 class="blog-post-title">{{title}}</h2>
{{subtitle}}
<div class="entry-meta">{{date}}{{author}}</div>
<div class="blog-post-content">
  {{content}}
</div>
<div class="blog-post-footer">
  <a href="/blog">&larr; Back to Essays</a>
  <span class="footer-separator">|</span>
  <a href="/rss.xml">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;">
      <path d="M4 11a9 9 0 0 1 9 9"></path>
      <path d="M4 4a16 16 0 0 1 16 16"></path>
      <circle cx="5" cy="19" r="1"></circle>
    </svg>RSS Feed
  </a>
</div>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const contact = (data: Record<string, string> = {}): string => {
  let html = `<p><b>Ryan Prendergast</b></p>
<p>Email: rprendergast1121 at gmail.com</p>

<h3 class="sidebar-header" style="margin-top: 25px;">Elsewhere</h3>
<ul class="nav-list" style="margin-bottom: 0;">
  <li><a href="https://withmethod.ai" target="_blank" rel="noopener noreferrer">Method</a></li>
  <li><a href="https://x.com/ryan_prend" target="_blank" rel="noopener noreferrer">X</a></li>
  <li><a href="https://github.com/rprend" target="_blank" rel="noopener noreferrer">GitHub</a></li>
  <li><a href="https://linkedin.com/in/rprendergast" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
  <li><a href="https://youtube.com/@rprend" target="_blank" rel="noopener noreferrer">YouTube</a></li>
  <li><a href="https://letterboxd.com/rprend" target="_blank" rel="noopener noreferrer">Letterboxd</a></li>
</ul>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const home = (data: Record<string, string> = {}): string => {
  let html = `<div class="homepage-intro">
  <p>Ryan is a startup founder building <a href="https://withmethod.ai" target="_blank" rel="noopener noreferrer">Method</a> in the agent improvement space. He works with vertical teams (AI for legal, accounting, etc) to measure, benchmark, and improve agents. Previously, he built <a href="https://alpharesearch.nyc" target="_blank" rel="noopener noreferrer">Alpha Research</a>, quantitative humanities research; <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer">Zenobia Pay</a>, a bank transfer payment network for luxury goods; and <a href="https://dolphinmade.com" target="_blank" rel="noopener noreferrer">Dolphin Made</a>, a web app builder focused on one shotting entire startups.</p>
</div>

{{linksHtml}}
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const layout = (data: Record<string, string> = {}): string => {
  let html = `<!DOCTYPE html>
<html lang="en" data-theme="aqua">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  <meta name="author" content="Ryan Prendergast">
  <link rel="icon" href="/favicon.ico">

  <script>
    (() => {
      const fallback = "aqua";
      try {
        const params = new URLSearchParams(window.location.search);
        const requested = params.get("theme");
        const saved = window.localStorage.getItem("siteTheme");
        document.documentElement.dataset.theme = requested || saved || fallback;
      } catch {
        document.documentElement.dataset.theme = fallback;
      }
    })();
  </script>

  <!-- Stylesheets -->
  <link href="/styles.css" rel="stylesheet">

  <!-- Open Graph meta tags for social sharing -->
  <meta property="og:title" content="{{title}}">
  <meta property="og:description" content="{{description}}">
  <meta property="og:type" content="{{ogType}}">
  <meta property="og:url" content="{{canonicalUrl}}">
  <meta property="og:site_name" content="Ryan Prendergast">
  {{ogImage}}

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{{title}}">
  <meta name="twitter:description" content="{{description}}">
  {{twitterImage}}

  <!-- Canonical URL -->
  <link rel="canonical" href="{{canonicalUrl}}">

  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="Ryan Prendergast: Essays" href="/rss.xml">

  <!-- Additional SEO meta tags -->
  <meta name="robots" content="index, follow">
  <meta name="language" content="en">
  <meta name="revisit-after" content="7 days">

  <!-- Structured data will be injected here -->
  {{structuredData}}
</head>
<body class="site-shell {{bodyClass}}">
  <div class="aqua-bar" aria-hidden="true"></div>
  <div class="main-container">
    <header class="site-header">
      <h1 class="site-title">Ryan Prendergast</h1>
      <span class="site-subtitle">{{pageSubtitle}}</span>
    </header>
    <div class="content-wrapper">
      <main class="main-content-area">
        {{content}}
      </main>
      <aside class="sidebar">
        {{nav}}
      </aside>
    </div>
    <footer class="site-footer">
      <a href="/colophon">Colophon</a>
      <a href="/rss.xml">RSS</a>
      <br><br>
      &copy; 2026 Ryan Prendergast
    </footer>
  </div>
  <script src="/theme-system.js" defer></script>
</body>
</html>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const nav = (data: Record<string, string> = {}): string => {
  let html = `<ul class="nav-list">
  <li><a href="/" class="{{homeActive}}">Home</a></li>
  <li><a href="/links" class="{{linksActive}}">Links</a></li>
  <li><a href="/blog" class="{{blogActive}}">Essays</a></li>
  <li><a href="/photos" class="{{photosActive}}">Photos</a></li>
  <li><a href="/guestbook" class="{{guestbookActive}}">Guestbook</a></li>
  <li><a href="/contact" class="{{contactActive}}">Contact</a></li>
</ul>
{{sidebarExtra}}
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const photosList = (data: Record<string, string> = {}): string => {
  let html = `<p class="blog-description">Photos</p>
{{photosHtml}}
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};
