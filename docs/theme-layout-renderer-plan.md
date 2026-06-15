# Site-Mimic Theme Plan

## Hard Reset

The previous 100-theme direction failed because most themes were abstractions: "old web", "terminal", "portfolio", "magazine", "institutional", and so on. Those categories are too lossy. They produce the same page with different colors and a few generic layout gestures.

The new rule is stricter:

- Keep the original Ryan site theme as `legacy-aqua`.
- Delete or demote every other old theme.
- Every new theme must mimic one specific existing site.
- A theme is not valid unless it names one target site URL.
- A theme may not be described as "inspired by", "borrowing from", "incorporating elements", or "in the vein of".
- The content stays Ryan's content, but the layout, page structure, navigation, density, typography, and interaction patterns must directly mimic the target site.

This is closer to making 100 alternate frontends for the same database than making 100 CSS skins.

## What Counts As A Theme

A theme is a mimic package:

```ts
interface SiteMimicTheme {
  slug: string;
  name: string;
  status: "legacy" | "planned" | "built" | "retired";
  target: {
    siteName: string;
    url: string;
    captureDate: string;
    allowedPages: string[];
  };
  routes: {
    home: MimicRouteSpec;
    blogIndex: MimicRouteSpec;
    blogPost: MimicRouteSpec;
    archives: MimicRouteSpec;
    themes: MimicRouteSpec;
    contact: MimicRouteSpec;
    guestbook: MimicRouteSpec;
  };
  assets: {
    screenshots: string[];
    notes: string[];
  };
}

interface MimicRouteSpec {
  targetPageUrl: string;
  layoutContract: string[];
  forbiddenShortcuts: string[];
}
```

Each theme gets its own renderer directory:

```text
src/site-mimics/
  legacy-aqua/
    renderer.ts
    styles.css
    references.md
  hacker-news/
    renderer.ts
    styles.css
    references.md
```

Shared helpers are allowed for escaping HTML, formatting dates, and loading content. Shared visual renderer families are not allowed as the primary implementation. If two sites look similar, they still get separate renderers because their navigation, spacing, affordances, and page hierarchy are different.

## Preserve The Old Site

`legacy-aqua` is the only retained old theme.

Target:

- Site: Ryan Prendergast's original Aqua-era site
- URL: current repository implementation before the mimic reset
- Status: `legacy`

Obligations:

- Keep the original Aqua top bar.
- Keep the two-column main/sidebar structure.
- Keep the current typography and yellow sidebar boxes.
- This is the default theme until the first mimic theme is better than it.

## Implementation Architecture

The app should still use canonical content models. That part was correct.

```text
route handler
  -> build canonical content model
  -> resolve selected site-mimic theme
  -> call that theme's route renderer
  -> wrap with that theme's document shell
```

The difference is that renderer lookup is by concrete target site:

```ts
const theme = getSiteMimicTheme(slug);
const html = theme.renderers[routeType](model, {
  target: theme.target,
  currentRoute,
});
```

No renderer may say "use the generic catalog renderer" or "use the old-web family". A renderer may call tiny helpers, but it must own its DOM.

## Build Order

### Phase 1: Reset Registry

Replace `src/themes.ts` with a new registry:

- `legacy-aqua`
- 99 planned mimic themes

Fields:

- `slug`
- `name`
- `targetSiteName`
- `targetUrl`
- `status`
- `captureDate`
- `notes`

Remove the old category system from the product UI. Categories can exist in docs, but the picker should present themes as a list of target sites.

Definition of done:

- `/api/themes` returns mimic targets, not abstract categories.
- `/themes` shows target site, status, and capture date.
- No theme except `legacy-aqua` claims to be complete before it has a renderer and screenshots.

### Phase 2: Screenshot And Reference Capture

For each theme:

1. Open the target site.
2. Capture desktop screenshot.
3. Capture mobile screenshot.
4. Save notes for navigation, layout grid, typography, content density, list structure, and page transitions.
5. Store references under `docs/theme-references/<slug>.md`.

Definition of done:

- Every planned mimic has a reference note file.
- Built themes have screenshots checked into `docs/theme-references/screenshots/`.

### Phase 3: Build 5 Proof Mimics

Build these first because they are obviously different and easy to judge:

1. `legacy-aqua` mimics the original Ryan site.
2. `hacker-news` mimics [Hacker News](https://news.ycombinator.com/).
3. `craigslist` mimics [Craigslist](https://www.craigslist.org/).
4. `wikipedia` mimics [Wikipedia](https://www.wikipedia.org/).
5. `anthropic-news` mimics [Anthropic News](https://www.anthropic.com/news).

Definition of done:

- Same Ryan content appears in all five.
- The five DOM structures are materially different.
- Each route has a target-page mapping.
- The screenshots make it obvious which site is being mimicked.

### Phase 4: Build In Batches Of 10

Do not build 100 at once. Build 10 mimic themes per batch.

Each batch must include:

- 3 text/list-heavy sites.
- 3 portfolio/editorial sites.
- 2 app/product sites.
- 1 weird web/art site.
- 1 utility/institutional site.

At the end of each batch:

- Run content-preservation checks.
- Capture screenshots.
- Mark built themes as `built`.
- Keep unbuilt themes as `planned`.

### Phase 5: Picker UX

The picker should make mimicry explicit.

Each card shows:

- Ryan theme name.
- Target site name.
- Target URL.
- Status: `legacy`, `planned`, or `built`.
- "View target" link.
- "Preview Ryan content in this mimic" link.

The picker must not use words like "mood", "vibe", "inspired by", or "elements".

## Content Invariants

For every built theme:

- Home route includes all linklog entries.
- Blog index includes every blog post title and date.
- Blog post route includes exact post title and body HTML.
- Archives include every archive month and post title.
- Contact includes the same contact content.
- Guestbook entries remain available.
- `/themes` remains usable.

The order may change only when the target site demands it. Missing content is a failure.

## Mimic QA

For each built theme, answer these before marking it `built`:

- Can a person identify the target site without reading the theme name?
- Does the navigation structure mimic the target?
- Does the density mimic the target?
- Does the list/card/article structure mimic the target?
- Does the mobile layout mimic the target's mobile behavior?
- Does Ryan's content remain complete?
- Are target-specific details implemented in HTML structure, not only CSS?

## 100 Direct Site Targets

These are the planned mimic themes. Each one has exactly one target site. If a better target is chosen later, replace the target, do not blend it with another site.

| # | Slug | Theme name | Direct target |
| --- | --- | --- | --- |
| 1 | `legacy-aqua` | Legacy Aqua | Original Ryan Prendergast site |
| 2 | `hacker-news` | Hacker News | [Hacker News](https://news.ycombinator.com/) |
| 3 | `craigslist` | Craigslist | [Craigslist](https://www.craigslist.org/) |
| 4 | `wikipedia` | Wikipedia | [Wikipedia](https://www.wikipedia.org/) |
| 5 | `anthropic-news` | Anthropic News | [Anthropic News](https://www.anthropic.com/news) |
| 6 | `anthropic-engineering` | Anthropic Engineering | [Anthropic Engineering](https://www.anthropic.com/engineering) |
| 7 | `framer-gallery` | Framer Gallery | [Framer Gallery](https://www.framer.com/gallery/) |
| 8 | `framer-portfolio` | Framer Portfolio Category | [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) |
| 9 | `cargo-community` | Cargo Community | [Cargo Community](https://cargo.site/community) |
| 10 | `cargo-templates` | Cargo Templates | [Cargo Templates](https://cargo.site/templates) |
| 11 | `are-na-channel` | Are.na Channel | [Are.na Portfolio & Personal Websites](https://www.are.na/husani-barnwell/portfolio-personal-websites) |
| 12 | `are-na-board` | Are.na Board | [Are.na Radical Web Design](https://www.are.na/julien-bidoret/radical-web-design) |
| 13 | `read-cv` | Read.cv | [read.cv](https://read.cv/) |
| 14 | `daring-fireball` | Daring Fireball | [Daring Fireball](https://daringfireball.net/) |
| 15 | `simon-willison` | Simon Willison | [Simon Willison](https://simonwillison.net/) |
| 16 | `gwern` | Gwern | [Gwern](https://gwern.net/) |
| 17 | `maggie-appleton` | Maggie Appleton | [Maggie Appleton](https://maggieappleton.com/) |
| 18 | `andy-matuschak-notes` | Andy Matuschak Notes | [Andy Matuschak Notes](https://notes.andymatuschak.org/) |
| 19 | `tom-critchlow-wiki` | Tom Critchlow Wiki | [Tom Critchlow Wiki](https://tomcritchlow.com/wiki/) |
| 20 | `nownownow` | Now Now Now | [nownownow](https://nownownow.com/) |
| 21 | `uses-tech` | Uses.tech | [uses.tech](https://uses.tech/) |
| 22 | `brutalist-websites` | Brutalist Websites | [Brutalist Websites](https://brutalistwebsites.com/) |
| 23 | `camerons-world` | Cameron's World | [Cameron's World](https://www.cameronsworld.net/) |
| 24 | `neocities` | Neocities | [Neocities](https://neocities.org/) |
| 25 | `internet-archive` | Internet Archive | [Internet Archive](https://archive.org/) |
| 26 | `archive-wayback` | Wayback Machine | [Wayback Machine](https://web.archive.org/) |
| 27 | `github-readme` | GitHub README | [GitHub](https://github.com/) |
| 28 | `github-docs` | GitHub Docs | [GitHub Docs](https://docs.github.com/) |
| 29 | `apple` | Apple | [Apple](https://www.apple.com/) |
| 30 | `apple-developer` | Apple Developer | [Apple Developer](https://developer.apple.com/) |
| 31 | `stripe-docs` | Stripe Docs | [Stripe Docs](https://docs.stripe.com/) |
| 32 | `stripe` | Stripe | [Stripe](https://stripe.com/) |
| 33 | `linear` | Linear | [Linear](https://linear.app/) |
| 34 | `notion` | Notion | [Notion](https://www.notion.com/) |
| 35 | `figma` | Figma | [Figma](https://www.figma.com/) |
| 36 | `openai` | OpenAI | [OpenAI](https://openai.com/) |
| 37 | `openai-docs` | OpenAI Docs | [OpenAI Docs](https://platform.openai.com/docs) |
| 38 | `perplexity` | Perplexity | [Perplexity](https://www.perplexity.ai/) |
| 39 | `vercel` | Vercel | [Vercel](https://vercel.com/) |
| 40 | `vercel-docs` | Vercel Docs | [Vercel Docs](https://vercel.com/docs) |
| 41 | `cloudflare-docs` | Cloudflare Docs | [Cloudflare Docs](https://developers.cloudflare.com/) |
| 42 | `tailwind-docs` | Tailwind CSS Docs | [Tailwind CSS Docs](https://tailwindcss.com/docs) |
| 43 | `react-docs` | React Docs | [React Docs](https://react.dev/) |
| 44 | `mdn` | MDN | [MDN Web Docs](https://developer.mozilla.org/) |
| 45 | `govuk` | GOV.UK | [GOV.UK](https://www.gov.uk/) |
| 46 | `govuk-design-system` | GOV.UK Design System | [GOV.UK Design System](https://design-system.service.gov.uk/) |
| 47 | `uswds` | USWDS | [U.S. Web Design System](https://designsystem.digital.gov/) |
| 48 | `nytimes` | New York Times | [The New York Times](https://www.nytimes.com/) |
| 49 | `new-yorker` | The New Yorker | [The New Yorker](https://www.newyorker.com/) |
| 50 | `the-atlantic` | The Atlantic | [The Atlantic](https://www.theatlantic.com/) |
| 51 | `guardian` | The Guardian | [The Guardian](https://www.theguardian.com/) |
| 52 | `bloomberg` | Bloomberg | [Bloomberg](https://www.bloomberg.com/) |
| 53 | `ft` | Financial Times | [Financial Times](https://www.ft.com/) |
| 54 | `the-verge` | The Verge | [The Verge](https://www.theverge.com/) |
| 55 | `wired` | WIRED | [WIRED](https://www.wired.com/) |
| 56 | `pitchfork` | Pitchfork | [Pitchfork](https://pitchfork.com/) |
| 57 | `letterboxd` | Letterboxd | [Letterboxd](https://letterboxd.com/) |
| 58 | `goodreads` | Goodreads | [Goodreads](https://www.goodreads.com/) |
| 59 | `discogs` | Discogs | [Discogs](https://www.discogs.com/) |
| 60 | `bandcamp` | Bandcamp | [Bandcamp](https://bandcamp.com/) |
| 61 | `substack` | Substack | [Substack](https://substack.com/) |
| 62 | `medium` | Medium | [Medium](https://medium.com/) |
| 63 | `tumblr` | Tumblr | [Tumblr](https://www.tumblr.com/) |
| 64 | `wordpress` | WordPress.com | [WordPress.com](https://wordpress.com/) |
| 65 | `blogger` | Blogger | [Blogger](https://www.blogger.com/) |
| 66 | `pinboard` | Pinboard | [Pinboard](https://pinboard.in/) |
| 67 | `delicious` | Delicious Archive | [Delicious on Wikipedia](https://en.wikipedia.org/wiki/Delicious_(website)) |
| 68 | `lobsters` | Lobsters | [Lobsters](https://lobste.rs/) |
| 69 | `slashdot` | Slashdot | [Slashdot](https://slashdot.org/) |
| 70 | `reddit-old` | Old Reddit | [Old Reddit](https://old.reddit.com/) |
| 71 | `reddit-new` | Reddit | [Reddit](https://www.reddit.com/) |
| 72 | `product-hunt` | Product Hunt | [Product Hunt](https://www.producthunt.com/) |
| 73 | `dribbble` | Dribbble | [Dribbble](https://dribbble.com/) |
| 74 | `behance` | Behance | [Behance](https://www.behance.net/) |
| 75 | `awwwards` | Awwwards | [Awwwards](https://www.awwwards.com/) |
| 76 | `siteinspire` | Siteinspire | [Siteinspire](https://www.siteinspire.com/) |
| 77 | `one-page-love` | One Page Love | [One Page Love](https://onepagelove.com/) |
| 78 | `special-fish` | Special Fish | [Special Fish](https://special.fish/) |
| 79 | `mmm-page` | mmm.page | [mmm.page](https://mmm.page/) |
| 80 | `wiby` | Wiby | [Wiby](https://wiby.me/) |
| 81 | `search-marginalia` | Marginalia Search | [Marginalia Search](https://search.marginalia.nu/) |
| 82 | `textfiles` | textfiles.com | [textfiles.com](http://textfiles.com/) |
| 83 | `motherfucking-website` | Motherfucking Website | [Motherfucking Website](http://motherfuckingwebsite.com/) |
| 84 | `best-motherfucking-website` | Better Motherfucking Website | [Better Motherfucking Website](http://bettermotherfuckingwebsite.com/) |
| 85 | `txti` | txti | [txti](https://txti.es/) |
| 86 | `tufte-css` | Tufte CSS | [Tufte CSS](https://edwardtufte.github.io/tufte-css/) |
| 87 | `latex-css` | LaTeX.css | [LaTeX.css](https://latex.vercel.app/) |
| 88 | `terminal-css` | Terminal CSS | [Terminal CSS](https://terminalcss.xyz/) |
| 89 | `98-css` | 98.css | [98.css](https://jdan.github.io/98.css/) |
| 90 | `xp-css` | XP.css | [XP.css](https://botoxparty.github.io/XP.css/) |
| 91 | `7-css` | 7.css | [7.css](https://khang-nd.github.io/7.css/) |
| 92 | `system-css` | System.css | [System.css](https://sakofchit.github.io/system.css/) |
| 93 | `nes-css` | NES.css | [NES.css](https://nostalgic-css.github.io/NES.css/) |
| 94 | `puppertino` | Puppertino | [Puppertino](https://codedgar.github.io/Puppertino/) |
| 95 | `geocities-gallery` | Geocities Gallery | [Geocities Gallery](https://geocities.restorativland.org/) |
| 96 | `yahoo-directory` | Yahoo Directory | [Yahoo Directory on Wikipedia](https://en.wikipedia.org/wiki/Yahoo!_Directory) |
| 97 | `google-search` | Google Search | [Google](https://www.google.com/) |
| 98 | `google-docs` | Google Docs | [Google Docs](https://docs.google.com/) |
| 99 | `airtable` | Airtable | [Airtable](https://www.airtable.com/) |
| 100 | `basecamp` | Basecamp | [Basecamp](https://basecamp.com/) |

## Per-Theme Reference File Template

Each target gets a reference file:

```md
# hacker-news

Target: https://news.ycombinator.com/
Capture date: YYYY-MM-DD
Status: planned

## Required Mimicry

- Top navigation must mimic the orange HN bar.
- Home must mimic ranked story rows.
- Blog index must mimic story listing rows.
- Blog post must mimic an item discussion page, with Ryan essay as the linked text/content.
- Archives must mimic paginated HN lists.
- Theme picker must mimic a HN-style table.

## Screenshots

- desktop:
- mobile:

## Rejection Criteria

- Generic orange page.
- Cards.
- Modern spacing.
- Missing rank numbers.
```

## Rejection Criteria For The Whole Project

Reject the implementation if:

- Themes share a generic renderer that only changes variables.
- Theme names are categories rather than target sites.
- A theme has no target URL.
- `/themes` hides whether a theme is built or planned.
- The mimic cannot be identified from a screenshot.
- Ryan content disappears to satisfy the mimic.
