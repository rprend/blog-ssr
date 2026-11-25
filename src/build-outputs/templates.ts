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
  let html = `<p class="blog-description">Writing from my work</p>
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
  <a href="/blog">&larr; Back to Writing</a>
</div>
<h2 class="blog-post-title">{{title}}</h2>
{{subtitle}}
<div class="entry-meta">{{date}}{{author}}</div>
<div class="blog-post-content">
  {{content}}
</div>
<div class="blog-post-footer">
  <a href="/blog">&larr; Back to Writing</a>
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
  <link rel="alternate" type="application/rss+xml" title="Ryan Prendergast: Writing" href="/rss.xml">

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
  <li><a href="/blog" class="{{blogActive}}">Writing</a></li>
  <li><a href="/photos" class="{{photosActive}}">Photography</a></li>
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

export const photoKhachkars = (data: Record<string, string> = {}): string => {
  let html = `<style>
.kh-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin:16px 0 8px;background:#111;border:2px solid #111}
@media(max-width:560px){.kh-grid{grid-template-columns:repeat(3,1fr)}}
.kh-grid button{position:relative;border:0;padding:0;margin:0;background:#111;cursor:pointer;display:block;width:100%;min-width:0;box-sizing:border-box;box-shadow:none;aspect-ratio:2/3;overflow:hidden;border-radius:0}
.kh-grid img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;margin:0;border:0;border-radius:0}
.kh-grid .co{opacity:0;transition:opacity .35s}.kh-grid button.on .co{opacity:1}
.kh-grid button:focus-visible{outline:2px solid #fff;outline-offset:-4px}
@media(prefers-reduced-motion:reduce){.kh-grid .co{transition:none}}
</style>
<p class="photo-premise">Carved cross-stones in Armenia, August 2026.</p>
<div class="kh-grid"><button type="button" aria-label="Stone 1, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b01.jpg" alt="Carved cross-stone 1" width="400" height="600"><img class="co" src="/photos/khachkars/c01.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 2, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b02.jpg" alt="Carved cross-stone 2" width="400" height="600"><img class="co" src="/photos/khachkars/c02.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 3, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b03.jpg" alt="Carved cross-stone 3" width="400" height="600"><img class="co" src="/photos/khachkars/c03.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 4, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b04.jpg" alt="Carved cross-stone 4" width="400" height="600"><img class="co" src="/photos/khachkars/c04.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 5, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b05.jpg" alt="Carved cross-stone 5" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c05.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 6, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b06.jpg" alt="Carved cross-stone 6" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c06.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 7, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b07.jpg" alt="Carved cross-stone 7" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c07.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 8, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b08.jpg" alt="Carved cross-stone 8" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c08.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 9, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b09.jpg" alt="Carved cross-stone 9" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c09.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 10, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b10.jpg" alt="Carved cross-stone 10" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c10.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 11, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b11.jpg" alt="Carved cross-stone 11" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c11.jpg" alt="" loading="lazy"></button><button type="button" aria-label="Stone 12, show in colour" aria-pressed="false"><img class="bw" src="/photos/khachkars/b12.jpg" alt="Carved cross-stone 12" width="400" height="600" loading="lazy"><img class="co" src="/photos/khachkars/c12.jpg" alt="" loading="lazy"></button></div>
<script>
document.querySelectorAll(".kh-grid button").forEach(b=>b.addEventListener("click",()=>{const on=b.classList.toggle("on");b.setAttribute("aria-pressed",String(on))}));
</script>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const photoLightTrails = (data: Record<string, string> = {}): string => {
  let html = `<style>
  .lt-set { max-width: 520px; margin: 16px 0 8px; }
  #lt-strip img { max-width: none; margin: 0; border: 0; border-radius: 0; }
  #lt-strip button { margin: 0; border-radius: 0; }
  /* The canvas is a little shorter than the frames so the camera's date stamp is cropped off the bottom. */
  #lt-canvas { position: relative; width: 100%; aspect-ratio: 8 / 9; background: #000; overflow: hidden; cursor: pointer; border: 0; padding: 0; margin: 0; display: block; border-radius: 0; }
  #lt-canvas img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; max-width: none; margin: 0; border: 0; border-radius: 0; mix-blend-mode: screen; opacity: 0; transition: opacity .9s; pointer-events: none; }
  #lt-canvas img.on { opacity: 1; }

  #lt-strip { display: grid; grid-template-columns: repeat(12, 1fr); gap: 4px; margin-top: 10px; }
  #lt-strip button { aspect-ratio: 1; padding: 0; border: 0; background: #000; cursor: pointer; overflow: hidden; }
  #lt-strip img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; opacity: .28; transition: opacity .3s; }
  #lt-strip button.on img { opacity: 1; }
  #lt-strip button:focus-visible, #lt-canvas:focus-visible { outline: 1px solid #777; outline-offset: 2px; }

  #lt-clear { margin-top: 12px; background: none; border: 0; padding: 0; color: #777; font: inherit; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; visibility: hidden; }
  #lt-clear.show { visibility: visible; }

  @media (max-width: 520px) { #lt-strip { grid-template-columns: repeat(6, 1fr); } }
  @media (prefers-reduced-motion: reduce) { #lt-canvas img, #lt-strip img { transition: none; } }
  #lt-clear { color: inherit; }
</style>
<p class="photo-premise">Slow exposures of street lights and traffic in Los Angeles in May 2026.</p>
<div class="lt-set">
  <button id="lt-canvas" type="button" aria-label="Add the next exposure"></button>
  <div id="lt-strip"></div>
  <button id="lt-clear" type="button">clear</button>
</div>
<script>
  const N = 12;
  const canvas = document.getElementById("lt-canvas");
  const strip = document.getElementById("lt-strip");
  const clear = document.getElementById("lt-clear");
  const layers = [], thumbs = [];

  for (let i = 1; i <= N; i++) {
    const src = "/photos/light-trails/" + String(i).padStart(2, "0") + ".jpg";
    const layer = new Image(); layer.src = src; layer.alt = "";
    canvas.append(layer); layers.push(layer);

    const thumb = document.createElement("button");
    thumb.type = "button"; thumb.setAttribute("aria-label", "Exposure " + i); thumb.setAttribute("aria-pressed", "false");
    const t = new Image(); t.src = src; t.alt = "";
    thumb.append(t); strip.append(thumb); thumbs.push(thumb);
    thumb.addEventListener("click", () => set(i - 1, !layers[i - 1].classList.contains("on")));
  }

  function set(i, on) {
    layers[i].classList.toggle("on", on);
    thumbs[i].classList.toggle("on", on);
    thumbs[i].setAttribute("aria-pressed", String(on));
    clear.classList.toggle("show", layers.some(l => l.classList.contains("on")));
  }

  // Tapping the canvas adds the next exposure that is not on yet; when all twelve are on, it starts over.
  canvas.addEventListener("click", () => {
    const next = layers.findIndex(l => !l.classList.contains("on"));
    if (next === -1) { layers.forEach((_, i) => set(i, false)); set(0, true); }
    else set(next, true);
  });
  clear.addEventListener("click", () => layers.forEach((_, i) => set(i, false)));

  set(0, true);
</script>
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
