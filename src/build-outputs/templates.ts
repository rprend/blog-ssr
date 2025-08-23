// Auto-generated template functions - do not edit manually

export const blogList = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <div style="display: flex; align-items: baseline; gap: 1.5rem">
    <h1 style="margin-bottom: 0.5rem">blog</h1>
    <div style="display: flex; align-items: baseline; gap: 0.75rem">
      <a
        href="/rss.xml"
        class="blog-title"
        style="font-size: 1.1rem; display: inline-flex; align-items: center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="margin-right: 0.25rem"
        >
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
        RSS Feed
      </a>
      <span style="font-size: 1.1rem; color: #666;">|</span>
      <a
        href="https://ryanprendergast.substack.com/?utm_campaign=pub&utm_medium=web"
        class="blog-title"
        style="font-size: 1.1rem; display: inline-flex; align-items: center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.25rem">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        Substack<span class="blog-arrow">→</span>
      </a>
    </div>
  </div>
  <p style="margin-top: 0; margin-bottom: 2rem; font-size: 1.3rem; color: #555">
    Ryan's mailbag: Essays and book reviews
  </p>

  <div>{{postsHtml}}</div>

  <div style="margin-top: 3rem">
    <iframe
      src="https://ryanprendergast.substack.com/embed"
      width="480"
      height="320"
      style="border: 1px solid #eee; background: white; max-width: 100%"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</section>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const blogPost = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <p><a href="/blog">← Back to Blog</a></p>
  <h1>{{title}}</h1>
  {{subtitle}}
  <p class="subtitle">{{date}}{{author}}</p>
  {{content}}
  
  <div style="margin-top: 3rem;">
    <a href="/blog" style="font-size: 1.4rem;">← Back to Blog</a>
  </div>
  
  <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e5e5;">
    <div>
      <iframe src="https://ryanprendergast.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white; max-width: 100%;" frameborder="0" scrolling="no"></iframe>
      <div style="margin-top: 1rem;">
        <a href="/rss.xml" class="blog-title" style="font-size: 1.1rem; display: inline-flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.25rem;">
            <path d="M4 11a9 9 0 0 1 9 9"></path>
            <path d="M4 4a16 16 0 0 1 16 16"></path>
            <circle cx="5" cy="19" r="1"></circle>
          </svg>
          RSS Feed<span class="blog-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</section>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const contact = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <h1>contact</h1>

  <p>Ryan Prendergast</p>
  <p>rprendergast1121 at gmail.com</p>

  <div class="contact-links">
    <a
      href="https://github.com/rprend"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
    >
      <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
      GitHub
    </a>

    <a
      href="https://linkedin.com/in/rprendergast"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
    >
      <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
      LinkedIn
    </a>

    <a
      href="https://instagram.com/r.prendie"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
    >
      <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
      Instagram
    </a>

    <a
      href="https://youtube.com/@rprend"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
    >
      <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
      YouTube
    </a>

    <a
      href="https://letterboxd.com/rprend"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
    >
      <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M13.281 0c-.5 0-.969.195-1.323.547L.547 11.958A1.867 1.867 0 0 0 0 13.281c0 .5.195.969.547 1.323L11.958 23.453c.354.352.823.547 1.323.547s.969-.195 1.323-.547L23.453 14.604A1.867 1.867 0 0 0 24 13.281c0-.5-.195-.969-.547-1.323L14.604.547A1.867 1.867 0 0 0 13.281 0zm0 2.5L21.5 10.719 13.281 18.938 5.062 10.719 13.281 2.5z"
        />
      </svg>
      Letterboxd
    </a>
  </div>
</section>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const home = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <style>
    .logo-img {
      height: 4rem;
      width: 4rem;
    }
    @media (max-width: 768px) {
      .logo-img {
        height: 5rem;
        width: 5rem;
      }
    }
  </style>
  <div
    style="
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    "
  >
    <img src="/logo.svg" alt="Logo" class="logo-img" />
    <h1 style="margin: 0">Ryan Prendergast</h1>
  </div>

  <p>
    I'm Ryan. I'm currently working on
    <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer"
      >Zenobia Pay</a
    >. Our mission is to end the Visa / Mastercard duopoly, and make it 3x
    cheaper to transact online.
  </p>

  <p>
    Some hobbies that I enjoy: I enjoy
    <a
      href="https://www.youtube.com/playlist?list=PL-evJxq7wCJNhu6jh8QCcj_4PiycBDEOW"
      target="_blank"
      rel="noopener noreferrer"
      >filmmaking</a
    >. I've played
    <a
      href="https://www.youtube.com/playlist?list=PL-evJxq7wCJPwhV7P91uooPOauMSX-UbE"
      target="_blank"
      rel="noopener noreferrer"
      >electric guitar and sang</a
    >
    in a couple bands. I like to <a href="/blog">write essays</a>.
  </p>

  <p>
    If you think we should work together, my calendar is open at
    <a
      href="https://calendly.com/rprendergast1121/ryan"
      target="_blank"
      rel="noopener noreferrer"
      >calendly.com/rprendergast1121/ryan</a
    >.
  </p>

</section>
`;
  
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
  <meta name="description" content="{{description}}">
  <meta name="author" content="Ryan Prendergast">
  <link rel="icon" href="/favicon.ico">
  
  <!-- Preload fonts -->
  <link rel="preload" href="/et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff" as="font" type="font/woff" crossorigin>
  <link rel="preload" href="/et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff" as="font" type="font/woff" crossorigin>
  
  <!-- Stylesheets -->
  <link href="/tufte.css" rel="stylesheet">
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
  <link rel="alternate" type="application/rss+xml" title="Ryan Prendergast's Blog RSS" href="/rss.xml">
  
  <!-- Additional SEO meta tags -->
  <meta name="robots" content="index, follow">
  <meta name="language" content="en">
  <meta name="revisit-after" content="7 days">
  
  <!-- Structured data will be injected here -->
  {{structuredData}}
</head>
<body>
  <div class="nav-container">
    {{nav}}
  </div>
  <article>
    {{content}}
  </article>
  
</body>
</html>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const memory = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <h1>memory</h1>

  <p class="stats-bar">
    New: <span id="newCount">0</span> · Learning:
    <span id="learningCount">0</span> · Review:
    <span id="reviewCount">0</span> · Streak: <span id="streakCount">0</span>
  </p>

  <div id="flashcard" class="flashcard">
    <p id="frontContent" class="question">Loading...</p>
    <p id="backContent" class="answer hidden">Loading...</p>
  </div>

  <p class="controls">
    <a href="#" id="flipBtn" onclick="return false;">show answer</a>
  </p>

  <p id="answerButtons" class="answer-buttons invisible">
    <a href="#" data-quality="0" onclick="return false;">
      again <span class="time-hint">(< 1min)</span>
    </a>
    ·
    <a href="#" data-quality="1" onclick="return false;">
      hard <span class="time-hint">(6min)</span>
    </a>
    ·
    <a href="#" data-quality="2" onclick="return false;">
      good <span class="time-hint">(10min)</span>
    </a>
    ·
    <a href="#" data-quality="3" onclick="return false;">
      easy <span class="time-hint">(4d)</span>
    </a>
  </p>

  <p class="deck-controls">
    <a href="#" id="startBtn" onclick="return false;">next card</a> ·
    <a href="#" id="addCardBtn" onclick="return false;">add card</a> ·
    <a href="#" id="resetBtn" onclick="return false;">reset progress</a>
  </p>

  <!-- Add Card Modal -->
  <div id="addCardModal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2>add new card</h2>
        <a
          href="#"
          class="modal-close"
          onclick="closeAddCardModal(); return false;"
          >×</a
        >
      </div>
      <form id="addCardForm">
        <div class="form-group">
          <label for="cardFront">Question / Front</label>
          <textarea id="cardFront" required rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="cardBack">Answer / Back</label>
          <textarea id="cardBack" required rows="3"></textarea>
        </div>
        <div class="form-actions">
          <a href="#" onclick="closeAddCardModal(); return false;">cancel</a>
          <span class="control-separator">·</span>
          <button type="submit" class="link-button">add card</button>
        </div>
      </form>
    </div>
  </div>
</section>

<style>
  .stats-bar {
    font-size: 0.9rem;
    opacity: 0.6;
  }

  .flashcard {
    margin: 3rem 0;
    min-height: 100px;
    position: relative;
  }

  .question {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .answer {
    font-size: 1.1rem;
    line-height: 1.6;
    font-style: italic;
    margin-top: 2rem;
  }

  .hidden {
    display: none;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  /* .answer-buttons {
    transition: opacity 0.2s ease;
  } */

  .controls a,
  .answer-buttons a,
  .deck-controls a {
    text-decoration: underline;
  }

  .controls a:hover,
  .answer-buttons a:hover,
  .deck-controls a:hover {
    opacity: 0.7;
  }

  .controls a[disabled] {
    opacity: 0.3;
    pointer-events: none;
    text-decoration: none;
  }

  .time-hint {
    font-size: 0.85rem;
    opacity: 0.6;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal.hidden {
    display: none;
  }

  .modal-content {
    max-width: 500px;
    width: 90%;
    padding: 2rem;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-close {
    color: var(--text-color, #333);
    text-decoration: none;
    font-size: 1.5rem;
    opacity: 0.6;
  }

  .modal-close:hover {
    opacity: 1;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
  }

  .form-actions {
    text-align: right;
  }

  .form-actions a {
    color: var(--text-color, #333);
    text-decoration: underline;
  }

  .form-actions a:hover {
    opacity: 0.7;
  }

  .link-button {
    background: none;
    border: none;
    color: var(--text-color, #333);
    text-decoration: underline;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .link-button:hover {
    opacity: 0.7;
  }
</style>

<script>
  // Spaced Repetition Algorithm (simplified SM-2)
  class SpacedRepetition {
    constructor() {
      this.cards = this.loadCards();
      this.currentCard = null;
      this.isFlipped = false;
      this.streak = 0;
    }

    loadCards() {
      const stored = localStorage.getItem("memoryCards");
      if (stored) {
        return JSON.parse(stored);
      }

      // Default cards to get started
      return [
        {
          id: 1,
          front: "What is the capital of France?",
          back: "Paris",
          interval: 0,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date().toISOString(),
          lastReview: null,
        },
        {
          id: 2,
          front: "What year did World War II end?",
          back: "1945",
          interval: 0,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date().toISOString(),
          lastReview: null,
        },
        {
          id: 3,
          front: "What is the chemical symbol for gold?",
          back: "Au",
          interval: 0,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date().toISOString(),
          lastReview: null,
        },
      ];
    }

    saveCards() {
      localStorage.setItem("memoryCards", JSON.stringify(this.cards));
    }

    getDueCards() {
      const now = new Date();
      return this.cards.filter((card) => new Date(card.nextReview) <= now);
    }

    getNextCard() {
      const dueCards = this.getDueCards();
      if (dueCards.length === 0) return null;

      // Random selection from due cards
      const index = Math.floor(Math.random() * dueCards.length);
      return dueCards[index];
    }

    updateCard(cardId, quality) {
      // quality: 0 = again, 1 = hard, 2 = good, 3 = easy
      const card = this.cards.find((c) => c.id === cardId);
      if (!card) return;

      const now = new Date();
      card.lastReview = now.toISOString();

      if (quality < 2) {
        // Failed - reset
        card.repetitions = 0;
        card.interval = 0;
        this.streak = 0;
      } else {
        // Passed
        card.repetitions += 1;
        this.streak += 1;

        if (card.repetitions === 1) {
          card.interval = 1; // 1 day
        } else if (card.repetitions === 2) {
          card.interval = 6; // 6 days
        } else {
          card.interval = Math.round(card.interval * card.easeFactor);
        }

        // Adjust ease factor
        card.easeFactor = Math.max(
          1.3,
          card.easeFactor +
            (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
        );
      }

      // Calculate next review time
      const intervals = [1, 6, 10, 5760]; // minutes: 1min, 6min, 10min, 4 days
      const intervalMinutes =
        quality < 2 ? intervals[quality] : card.interval * 1440;

      const nextReview = new Date(now.getTime() + intervalMinutes * 60000);
      card.nextReview = nextReview.toISOString();

      this.saveCards();
    }

    addCard(front, back) {
      const newCard = {
        id: Date.now(),
        front,
        back,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        nextReview: new Date().toISOString(),
        lastReview: null,
      };

      this.cards.push(newCard);
      this.saveCards();
      return newCard;
    }

    resetProgress() {
      this.cards.forEach((card) => {
        card.interval = 0;
        card.repetitions = 0;
        card.easeFactor = 2.5;
        card.nextReview = new Date().toISOString();
        card.lastReview = null;
      });
      this.streak = 0;
      this.saveCards();
    }

    getStats() {
      const now = new Date();
      const newCards = this.cards.filter((c) => c.repetitions === 0).length;
      const learningCards = this.cards.filter(
        (c) => c.repetitions > 0 && c.interval < 7
      ).length;
      const reviewCards = this.cards.filter(
        (c) => c.interval >= 7 && new Date(c.nextReview) <= now
      ).length;

      return {
        new: newCards,
        learning: learningCards,
        review: reviewCards,
        streak: this.streak,
      };
    }
  }

  // Initialize the app
  let sr = new SpacedRepetition();

  // DOM elements
  const flashcard = document.getElementById("flashcard");
  const frontContent = document.getElementById("frontContent");
  const backContent = document.getElementById("backContent");
  const flipBtn = document.getElementById("flipBtn");
  const answerButtons = document.getElementById("answerButtons");
  const startBtn = document.getElementById("startBtn");
  const addCardBtn = document.getElementById("addCardBtn");
  const resetBtn = document.getElementById("resetBtn");
  const addCardModal = document.getElementById("addCardModal");
  const addCardForm = document.getElementById("addCardForm");

  // Update stats display
  function updateStats() {
    const stats = sr.getStats();
    document.getElementById("newCount").textContent = stats.new;
    document.getElementById("learningCount").textContent = stats.learning;
    document.getElementById("reviewCount").textContent = stats.review;
    document.getElementById("streakCount").textContent = stats.streak;
  }

  // Show next card
  function showNextCard() {
    sr.currentCard = sr.getNextCard();

    if (!sr.currentCard) {
      frontContent.textContent = "No cards due for review!";
      backContent.textContent = "Add more cards or come back later";
      backContent.classList.remove("hidden");
      flipBtn.setAttribute("disabled", "true");
      flipBtn.textContent = "no cards due";
      return;
    }

    frontContent.textContent = sr.currentCard.front;
    backContent.textContent = sr.currentCard.back;

    // Reset card state
    backContent.classList.add("hidden");
    sr.isFlipped = false;
    flipBtn.removeAttribute("disabled");
    flipBtn.textContent = "show answer";
    answerButtons.classList.add("invisible");

    updateStats();
  }

  // Flip card
  function flipCard() {
    if (!sr.currentCard) return;

    sr.isFlipped = !sr.isFlipped;

    if (sr.isFlipped) {
      backContent.classList.remove("hidden");
      flipBtn.textContent = "hide answer";
      answerButtons.classList.remove("invisible");
    } else {
      backContent.classList.add("hidden");
      flipBtn.textContent = "show answer";
      answerButtons.classList.add("invisible");
    }
  }

  // Handle answer quality
  function handleAnswer(quality) {
    if (!sr.currentCard) return;

    sr.updateCard(sr.currentCard.id, quality);
    showNextCard();
  }

  // Modal functions
  function openAddCardModal() {
    addCardModal.classList.remove("hidden");
  }

  function closeAddCardModal() {
    addCardModal.classList.add("hidden");
    document.getElementById("cardFront").value = "";
    document.getElementById("cardBack").value = "";
  }

  // Event listeners
  flipBtn.addEventListener("click", (e) => {
    e.preventDefault();
    flipCard();
  });

  flashcard.addEventListener("click", flipCard);

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showNextCard();
  });

  addCardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openAddCardModal();
  });

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone."
      )
    ) {
      sr.resetProgress();
      updateStats();
      showNextCard();
    }
  });

  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const front = document.getElementById("cardFront").value;
    const back = document.getElementById("cardBack").value;

    sr.addCard(front, back);
    closeAddCardModal();
    updateStats();
    alert("Card added successfully!");
  });

  // Answer button listeners
  document.querySelectorAll("#answerButtons a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const quality = parseInt(e.currentTarget.dataset.quality);
      handleAnswer(quality);
    });
  });

  // Initialize on load
  updateStats();
  showNextCard(); // Automatically show first card
</script>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const nav = (data: Record<string, string> = {}): string => {
  let html = `<nav>
  <a href="/" class="{{homeActive}}">home</a>
  <a href="/blog" class="{{blogActive}}">blog</a>
  <a href="/guestbook" class="{{guestbookActive}}">guestbook</a>
  <a href="/contact" class="{{contactActive}}">contact</a>
</nav>`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};
