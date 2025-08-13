// Auto-generated template functions - do not edit manually

export const blogList = (data: Record<string, string> = {}): string => {
  let html = `<main class="max-w-2xl px-4 pb-12 pt-4">
  <h1 class="text-4xl md:text-5xl font-bold font-headline text-primary mb-8">blog</h1>
  <div>{{postsHtml}}</div>
</main>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const blogPost = (data: Record<string, string> = {}): string => {
  let html = `<main class="max-w-2xl px-4 pb-12 pt-6">
  <p class="text-secondary mb-4">
    <a href="/blog" class="hover:opacity-80 underline transition-opacity">
      ← Back to Blog
    </a>
  </p>
  <h1 class="text-3xl font-bold font-headline text-primary mb-4">{{title}}</h1>
  <p class="text-secondary text-sm mb-8">{{date}}</p>
  <div class="prose prose-primary max-w-none">
    {{content}}
  </div>
</main>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const contact = (data: Record<string, string> = {}): string => {
  let html = `<main class="max-w-2xl px-4 pb-12 pt-6">
  <h1 class="text-4xl md:text-5xl font-bold font-headline text-primary mb-8">
    contact
  </h1>
  <div class="space-y-6">
    <p class="text-lg text-primary">Ryan Prendergast</p>
    <p class="text-lg text-primary">rprendergast1121 at gmail.com</p>
    
    <div class="space-y-4">
      <div>
        <a href="https://github.com/rprendergast" target="_blank" rel="noopener noreferrer"
           class="text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
      
      <div>
        <a href="https://linkedin.com/in/ryan-prendergast" target="_blank" rel="noopener noreferrer"
           class="text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
      
      <div>
        <a href="https://instagram.com/rprendergast" target="_blank" rel="noopener noreferrer"
           class="text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>
      </div>
      
      <div>
        <a href="https://youtube.com/@rprendergast" target="_blank" rel="noopener noreferrer"
           class="text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </a>
      </div>
      
      <div>
        <a href="https://letterboxd.com/rprendergast" target="_blank" rel="noopener noreferrer"
           class="text-lg text-primary hover:opacity-80 transition-opacity flex items-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.281 0c-.5 0-.969.195-1.323.547L.547 11.958A1.867 1.867 0 0 0 0 13.281c0 .5.195.969.547 1.323L11.958 23.453c.354.352.823.547 1.323.547s.969-.195 1.323-.547L23.453 14.604A1.867 1.867 0 0 0 24 13.281c0-.5-.195-.969-.547-1.323L14.604.547A1.867 1.867 0 0 0 13.281 0zm0 2.5L21.5 10.719 13.281 18.938 5.062 10.719 13.281 2.5z"/>
          </svg>
          Letterboxd
        </a>
      </div>
    </div>
  </div>
</main>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const home = (data: Record<string, string> = {}): string => {
  let html = `<main class="max-w-2xl px-4 pb-12">
  <h1 class="text-4xl md:text-6xl font-bold font-headline text-primary leading-tight tracking-wide pb-8">
    RYAN PRENDERGAST
  </h1>
  <p class="text-lg text-primary mb-4">
    Hi! I'm Ryan. I'm currently working on 
    <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer" 
       class="underline text-primary hover:opacity-70 transition-opacity">
      Zenobia Pay
    </a>. Our mission is to end the Visa / Mastercard duopoly, and make it 3x
    cheaper to transact online.
  </p>
  <p class="text-lg text-primary mb-4">
    Some hobbies that I enjoy and like to talk about. I enjoy 
    <a href="https://www.youtube.com/playlist?list=PL-evJxq7wCJNhu6jh8QCcj_4PiycBDEOW" target="_blank" rel="noopener noreferrer"
       class="underline text-primary hover:opacity-70 transition-opacity">
      amateur filmmaking
    </a>. I've played 
    <a href="https://www.youtube.com/playlist?list=PL-evJxq7wCJPwhV7P91uooPOauMSX-UbE" target="_blank" rel="noopener noreferrer"
       class="underline text-primary hover:opacity-70 transition-opacity">
      electric guitar and sang
    </a> in a couple bands. I like to write essays.
  </p>
  <p class="text-lg text-primary mb-4">
    I like to meet new people, and I'm especially interested in people
    with niche problems or professions. My calendar is open at 
    <a href="https://calendly.com/rprendergast1121/ryan" target="_blank" rel="noopener noreferrer"
       class="underline text-primary hover:opacity-70 transition-opacity">
      calendly.com/rprendergast1121/ryan
    </a>.
  </p>
</main>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const layout = (data: Record<string, string> = {}): string => {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{title}}</title>
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
  <link href="/styles.css" rel="stylesheet">
</head>
<body>
  <div class="min-h-screen bg-background font-body">
    {{nav}}
    {{content}}
  </div>
</body>
</html>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const nav = (data: Record<string, string> = {}): string => {
  let html = `<header class="px-4 py-8">
  <nav class="flex items-center gap-6">
    <a href="/" class="text-primary hover:underline text-sm lowercase px-2 {{homeActive}}">home</a>
    <a href="/blog" class="text-primary hover:underline text-sm lowercase px-2 {{blogActive}}">blog</a>
    <a href="/guestbook" class="text-primary hover:underline text-sm lowercase px-2 {{guestbookActive}}">guestbook</a>
    <a href="/contact" class="text-primary hover:underline text-sm lowercase px-2 {{contactActive}}">contact</a>
  </nav>
</header>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};
