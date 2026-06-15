(function () {
  const storageKey = "siteTheme";
  const root = document.documentElement;
  let themes = [];

  function getRequestedTheme() {
    try {
      return new URLSearchParams(window.location.search).get("theme");
    } catch {
      return null;
    }
  }

  function getCurrentSlug() {
    return root.dataset.theme || localStorage.getItem(storageKey) || "aqua";
  }

  function findTheme(slug) {
    return themes.find((theme) => theme.slug === slug) || themes[0];
  }

  function updateUi(theme) {
    if (!theme) return;

    document.querySelectorAll("[data-theme-current]").forEach((node) => {
      node.textContent = theme.name;
    });

    document.querySelectorAll("[data-theme-card]").forEach((card) => {
      card.classList.toggle("is-active", card.getAttribute("data-theme-card") === theme.slug);
    });

    const select = document.querySelector("[data-theme-select]");
    if (select) select.value = theme.slug;
  }

  function setTheme(slug, options) {
    const theme = findTheme(slug);
    if (!theme) return;

    root.dataset.theme = theme.slug;
    localStorage.setItem(storageKey, theme.slug);
    updateUi(theme);

    if (options && options.updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("theme", theme.slug);
      history.replaceState({}, "", url);
    }
  }

  function shiftTheme(direction) {
    if (!themes.length) return;
    const current = getCurrentSlug();
    const currentIndex = Math.max(0, themes.findIndex((theme) => theme.slug === current));
    const nextIndex = (currentIndex + direction + themes.length) % themes.length;
    setTheme(themes[nextIndex].slug, { updateUrl: false });
  }

  function randomTheme() {
    if (!themes.length) return;
    const current = getCurrentSlug();
    const pool = themes.filter((theme) => theme.slug !== current);
    const next = pool[Math.floor(Math.random() * pool.length)] || themes[0];
    setTheme(next.slug, { updateUrl: false });
  }

  function bindControls() {
    document.querySelectorAll("[data-theme-apply]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(button.getAttribute("data-theme-apply"), { updateUrl: true });
      });
    });

    document.querySelectorAll("[data-theme-preview]").forEach((link) => {
      link.addEventListener("click", () => {
        const slug = link.getAttribute("data-theme-preview");
        if (slug) localStorage.setItem(storageKey, slug);
      });
    });

    document.querySelectorAll("[data-theme-prev]").forEach((button) => {
      button.addEventListener("click", () => shiftTheme(-1));
    });

    document.querySelectorAll("[data-theme-next]").forEach((button) => {
      button.addEventListener("click", () => shiftTheme(1));
    });

    document.querySelectorAll("[data-theme-random]").forEach((button) => {
      button.addEventListener("click", randomTheme);
    });

    document.querySelectorAll("[data-theme-select]").forEach((select) => {
      select.addEventListener("change", () => {
        setTheme(select.value, { updateUrl: true });
      });
    });

    document.querySelectorAll("[data-theme-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-theme-filter");
        document.querySelectorAll("[data-theme-filter]").forEach((other) => {
          other.classList.toggle("is-active", other === button);
        });
        document.querySelectorAll("[data-theme-card]").forEach((card) => {
          const visible = filter === "all" || card.getAttribute("data-theme-category") === filter;
          card.hidden = !visible;
        });
      });
    });
  }

  fetch("/api/themes")
    .then((response) => response.json())
    .then((data) => {
      themes = data.themes || [];
      const requested = getRequestedTheme();
      const current = requested || localStorage.getItem(storageKey) || data.defaultTheme || "aqua";
      setTheme(current, { updateUrl: false });
      bindControls();
    })
    .catch(() => {
      updateUi({ slug: getCurrentSlug(), name: getCurrentSlug() });
      bindControls();
    });
})();

