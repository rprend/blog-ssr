// Auto-generated template functions - do not edit manually

export const blogList = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <h1>Blog</h1>
  <p>Ryan's mailbag: Essays and book reviews</p>
  <p>
    [<a href="/rss.xml">RSS Feed</a>]
    [<a href="https://ryanprendergast.substack.com/?utm_campaign=pub&utm_medium=web">Substack</a>]
  </p>
  <hr>

  <div>{{postsHtml}}</div>

  <hr>
  <p><i>Subscribe via <a href="https://ryanprendergast.substack.com/embed">Substack</a> for email updates.</i></p>
</section>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const blogPost = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <p>[<a href="/blog">Back to Blog</a>]</p>
  <h1>{{title}}</h1>
  {{subtitle}}
  <p><i>{{date}}{{author}}</i></p>
  <hr>
  {{content}}

  <hr>
  <p>[<a href="/blog">Back to Blog</a>] | [<a href="/rss.xml">RSS Feed</a>]</p>
</section>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const contact = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <h1>Contact</h1>
  <hr>

  <p><b>Ryan Prendergast</b></p>
  <p>Email: rprendergast1121 at gmail.com</p>

  <h2>Links</h2>
  <ul>
    <li><a href="https://github.com/rprend" target="_blank" rel="noopener noreferrer">GitHub</a></li>
    <li><a href="https://linkedin.com/in/rprendergast" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
    <li><a href="https://instagram.com/r.prendie" target="_blank" rel="noopener noreferrer">Instagram</a></li>
    <li><a href="https://youtube.com/@rprend" target="_blank" rel="noopener noreferrer">YouTube</a></li>
    <li><a href="https://letterboxd.com/rprend" target="_blank" rel="noopener noreferrer">Letterboxd</a></li>
  </ul>
</section>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};

export const home = (data: Record<string, string> = {}): string => {
  let html = `<section>
  <h1>Ryan Prendergast</h1>
  <hr>

  <p>
    I'm Ryan. I'm currently working on
    <a href="https://zenobiapay.com" target="_blank" rel="noopener noreferrer"
      >Zenobia Pay</a
    >. Our mission is to make it 3x cheaper to transact online.
  </p>

  <p>
    I make
    <a
      href="https://www.youtube.com/playlist?list=PL-evJxq7wCJNhu6jh8QCcj_4PiycBDEOW"
      target="_blank"
      rel="noopener noreferrer"
      >films</a
    >. I've played
    <a
      href="https://www.youtube.com/playlist?list=PL-evJxq7wCJPwhV7P91uooPOauMSX-UbE"
      target="_blank"
      rel="noopener noreferrer"
      >electric guitar and sang</a
    >
    in a couple bands. I like to <a href="/blog">write</a>.
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
  <div class="page-wrapper">
    <div class="main-content">
      <article>
        {{content}}
      </article>
    </div>
    <div class="sidebar">
      {{nav}}
    </div>
  </div>
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
  <h3>Navigation</h3>
  <hr>
  <ul>
    <li><a href="/" class="{{homeActive}}">Home</a></li>
    <li><a href="/blog" class="{{blogActive}}">Blog</a></li>
    <li><a href="/guestbook" class="{{guestbookActive}}">Guestbook</a></li>
    <li><a href="/contact" class="{{contactActive}}">Contact</a></li>
  </ul>
  <hr>
  <p><small><i>Est. 2024</i></small></p>
</nav>
`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
};
