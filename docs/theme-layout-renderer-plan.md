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
  taliahhh/
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

Build these first because they are specific personal/portfolio sites with visibly different structures:

1. `legacy-aqua` mimics the original Ryan site.
2. `taliahhh` mimics [Taliahhh](https://taliahhh.com/), found through Framer Gallery.
3. `daveos` mimics [DaveOS](https://daveos.fun/), found through Framer Gallery.
4. `folkert-gorter` mimics [Folkert Gorter](https://folkert.link/), found through Siteinspire and Cargo.
5. `lynn-sohn` mimics [Lynn Sohn](https://lynnsohn.com/), found through Siteinspire and Cargo.

Definition of done:

- Same Ryan content appears in all five.
- The five DOM structures are materially different.
- Each route has a target-page mapping.
- The screenshots make it obvious which site is being mimicked.

### Phase 4: Build In Batches Of 10

Do not build 100 at once. Build 10 mimic themes per batch.

Each batch must include:

- 4 individual designer/developer portfolios.
- 2 artist/photographer portfolios.
- 2 studio portfolios.
- 1 weird/personal-web portfolio.
- 1 writing-heavy personal site or blog.

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

These are the planned mimic themes. Each one has exactly one target person or studio site. The source column records where the site was found, prioritizing curated galleries and channels over generic search. If the row links to a gallery detail page instead of the live site, it is a research placeholder: the build cannot start until the live target URL is captured in that row's `docs/theme-references/<slug>.md`.

Research sources used for this reset:

- [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) and [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal), which list named portfolio/personal sites such as Taliahhh, Uthinh Pham, Zuza Wozniczka, DaveOS, Paula Lu, and others.
- [Cargo Community](https://cargo.site/community), which lists named artist/designer portfolios and handles including Jiayu Cheng, Braulio Amado, Agustin Pina, Rafik Greiss, Matthew Vlach, Sasyk, Weiran Liang, Violeta Araujo Bofill, and others.
- [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective), plus individual Siteinspire pages for Folkert Gorter and Lynn Sohn.
- [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) and [Are.na design portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios).
- [Godly](https://godly.website/), [Awwwards](https://www.awwwards.com/), and [One Page Love](https://onepagelove.com/) portfolio/person-site listings.

| # | Slug | Theme name | Direct target | Curated source |
| --- | --- | --- | --- |
| 1 | `legacy-aqua` | Legacy Aqua | Original Ryan Prendergast site | Repository baseline |
| 2 | `taliahhh` | Taliahhh | [taliahhh.com](https://taliahhh.com/) | [Framer Gallery detail](https://www.framer.com/gallery/taliahhhcom) |
| 3 | `daveos` | DaveOS | [daveos.fun](https://daveos.fun/) | [Framer Gallery detail](https://www.framer.com/gallery/daveosfun) |
| 4 | `guangxi-cai` | Guangxi Cai | [caiguangxi.com](https://caiguangxi.com/) | [Framer Gallery detail](https://www.framer.com/gallery/guangxi-cai) |
| 5 | `sebastian-martinez` | SEB Portfolio | [sebastian-martinez.com](https://sebastian-martinez.com/) | [Framer Gallery detail](https://www.framer.com/gallery/sebastian-martinezcom) |
| 6 | `framer-uthinh-pham` | Uthinh Pham | Uthinh Pham portfolio, live URL to capture | [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) |
| 7 | `framer-zuza-wozniczka` | Zuza Wozniczka | Zuza Wozniczka portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 8 | `framer-tracy-lou` | Tracy Lou | Tracy Lou digital designer portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 9 | `framer-ayush-wanjari` | Ayush Wanjari | Ayush Wanjari portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 10 | `framer-maria-nigmatullina` | Maria Nigmatullina | Maria Nigmatullina portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 11 | `framer-anastasia-kozhushna` | Anastasia Kozhushna | Anastasia Kozhushna portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 12 | `framer-yanxin-zhang` | YanXin Zhang | YanXin Zhang portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 13 | `framer-nitin-sangwan` | Nitin Sangwan | Nitin Sangwan portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 14 | `framer-jackie-zhang` | Jackie Zhang | Jackie Zhang portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 15 | `framer-sofie-viola` | Sofie Viola | Sofie Viola portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 16 | `framer-italo-santorsula` | Italo Santorsula | Italo Santorsula portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 17 | `framer-janar-siniloo` | Janar Siniloo | Janar Siniloo portfolio, live URL to capture | [Framer Personal Gallery](https://www.framer.com/gallery/categories/personal) |
| 18 | `framer-paula-lu` | Paula Lu | Paula Lu brand/digital designer portfolio, live URL to capture | [Framer Portfolio Gallery](https://www.framer.com/gallery/categories/portfolio) |
| 19 | `folkert-gorter` | Folkert Gorter | [folkert.link](https://folkert.link/) | [Siteinspire Folkert Gorter](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 20 | `lynn-sohn` | Lynn Sohn | [lynnsohn.com](https://lynnsohn.com/) | [Siteinspire Lynn Sohn](https://www.siteinspire.com/website/11108-lynn-sohn) |
| 21 | `graeme-pereira` | Graeme Pereira | Graeme Pereira portfolio, live URL to capture | [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective) |
| 22 | `bernet-fourtet` | Bernet Fourtet | Bernet Fourtet portfolio, live URL to capture | [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective) |
| 23 | `julien-pacaud` | Julien Pacaud | Julien Pacaud portfolio, live URL to capture | [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective) |
| 24 | `khristian-mendoza` | Goodbye Galaxy / Khristian Mendoza | Goodbye Galaxy / Khristian Mendoza portfolio, live URL to capture | [Siteinspire Cargo Collective](https://www.siteinspire.com/websites/category/cargo-collective) |
| 25 | `santiago-jaramillo` | Santiago Jaramillo | Santiago Jaramillo portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 26 | `tessa-van-den-berg` | tessa van den berg | tessa van den berg portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 27 | `vincent-lowe` | Studio of Vincent Lowe | Studio of Vincent Lowe portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 28 | `pawel-achtelik` | Pawel Achtelik | Pawel Achtelik portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 29 | `antoine-corbineau` | Antoine Corbineau | Antoine Corbineau portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 30 | `victoria-gee` | Victoria Gee | Victoria Gee portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 31 | `edoardo-lunardi` | Edoardo Lunardi | Edoardo Lunardi portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 32 | `jin-su-park` | Jin Su Park | Jin Su Park portfolio, live URL to capture | [Siteinspire Folkert similar sites](https://www.siteinspire.com/website/10877-folkert-gorter) |
| 33 | `jiayu-cheng` | Jiayu Cheng | Jiayu Cheng portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 34 | `braulio-amado` | Braulio Amado | Braulio Amado portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 35 | `lakis-sobyra` | Lakis Sobyra | Lakis Sobyra portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 36 | `agustin-pina` | Agustin Pina | [pinagustin.com](https://pinagustin.com/) | [Cargo Community](https://cargo.site/community) |
| 37 | `darian-zahedi` | Darian Zahedi | Darian Zahedi photography portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 38 | `carola-monteleone` | Carola Monteleone | Carola Monteleone portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 39 | `rafik-greiss` | Rafik Greiss | [rafikgreiss.com](https://rafikgreiss.com/) | [Cargo Community](https://cargo.site/community) |
| 40 | `matthew-vlach` | Matthew Vlach | [matthewvla.ch](https://matthewvla.ch/) | [Cargo Community](https://cargo.site/community) |
| 41 | `sasyk` | Sasyk | [sasyk.com](https://sasyk.com/) | [Cargo Community](https://cargo.site/community) |
| 42 | `weiran-liang` | Weiran Liang | [weiran.design](https://weiran.design/) | [Cargo Community](https://cargo.site/community) |
| 43 | `violeta-araujo-bofill` | Violeta Araujo Bofill | [araujovioleta.com](https://araujovioleta.com/) | [Cargo Community](https://cargo.site/community) |
| 44 | `daryan-knoblauch` | Daryan Knoblauch | Daryan Knoblauch portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 45 | `adrien-guillet` | Adrien Guillet | Adrien Guillet portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 46 | `theresa-hattinger` | Theresa Hattinger | Theresa Hattinger portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 47 | `rana-wassef` | Rana Wassef | Rana Wassef portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 48 | `andres-casas` | Andres Casas | Andres Casas portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 49 | `marina-guscetti` | Marina Guscetti | Marina Guscetti portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 50 | `constance-blackaller` | Constance Blackaller | Constance Blackaller portfolio, live URL to capture | [Cargo Community](https://cargo.site/community) |
| 51 | `martin-borst` | Martin Borst | Martin Borst one-page personal site, live URL to capture | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 52 | `everything-and-something-else` | everythingandsomethingelse.com | [everythingandsomethingelse.com](https://everythingandsomethingelse.com/) | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 53 | `elena-borisova` | Elena Borisova | Elena Borisova one-page personal site, live URL to capture | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 54 | `amanda-zip` | amanda.zip | [amanda.zip](https://amanda.zip/) | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 55 | `elizabeth-van-de-griend` | elizabethvandegriend | Elizabeth van de Griend personal site, live URL to capture | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 56 | `thomas-van-ryzewyk` | Thomas van Ryzewyk | Thomas van Ryzewyk one-page personal site, live URL to capture | [Are.na One-page Personal Websites](https://www.are.na/rodrigo-tello/one-page-personal-websites) |
| 57 | `sam-seurynck` | Sam Seurynck Design | Sam Seurynck portfolio, live URL to capture | [Are.na design portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios) |
| 58 | `wang-yang` | WANG Yang | WANG Yang designer portfolio, live URL to capture | [Are.na design portfolios and studios](https://www.are.na/www-nana/design-portfolios-and-studios) |
| 59 | `daniel-sun` | Daniel Sun | Daniel Sun portfolio, live URL to capture | [Godly Daniel Sun](https://godly.website/website/daniel-sun-1011) |
| 60 | `camille-mormal` | Camille Mormal | Camille Mormal portfolio, live URL to capture | [Godly Camille Mormal](https://godly.website/website/camille-mormal-866) |
| 61 | `edward-hinrichsen` | Edward Hinrichsen | Edward Hinrichsen portfolio, live URL to capture | [Godly Edward Hinrichsen](https://godly.website/website/edward-hinrichsen-744) |
| 62 | `linus-rogge` | Linus Rogge | Linus Rogge portfolio, live URL to capture | [Godly Linus Rogge](https://godly.website/website/linus-rogge-878) |
| 63 | `mike-matas` | Mike Matas | Mike Matas portfolio, live URL to capture | [Godly Mike Matas](https://godly.website/website/mike-matas-959) |
| 64 | `carl-beaverson` | Carl Beaverson | Carl Beaverson portfolio, live URL to capture | [Godly Carl Beaverson](https://godly.website/website/carl-beaverson-946) |
| 65 | `lorenzo-rodriguez` | Lorenzo Rodriguez | Lorenzo Rodriguez portfolio, live URL to capture | [Godly Lorenzo Rodriguez](https://godly.website/website/lorenzo-rodriguez-600) |
| 66 | `maelan-le-meur` | Maelan Le Meur | Maelan Le Meur portfolio, live URL to capture | [Godly Maelan Le Meur](https://godly.website/website/maelan-le-meur-930) |
| 67 | `dennis-snellenberg` | Dennis Snellenberg | Dennis Snellenberg portfolio, live URL to capture | [Godly Dennis Snellenberg](https://godly.website/website/dennis-snellenberg-697) |
| 68 | `mark-vogelaar` | Mark Vogelaar | Mark Vogelaar personal design portfolio, live URL to capture | [Awwwards Personal Design Portfolio](https://www.awwwards.com/sites/personal-design-portfolio) |
| 69 | `maciej-baska` | Maciej Baska | Maciej Baska personal portfolio, live URL to capture | [Awwwards Personal Portfolio](https://www.awwwards.com/sites/personal-portfolio-2) |
| 70 | `botond-raduly` | Botond Raduly | Botond Raduly personal portfolio, live URL to capture | [Awwwards Personal Portfolio Site](https://www.awwwards.com/sites/personal-portfolio-site) |
| 71 | `arkon-digital` | Arkon Digital | Arkon Digital personal portfolio, live URL to capture | [Awwwards AD Personal Portfolio](https://www.awwwards.com/sites/ad-personal-portfolio) |
| 72 | `rumman-amin` | Rumman Amin | Rumman Amin personal portfolio, live URL to capture | [Awwwards Personal Portfolio](https://www.awwwards.com/sites/personal-portfolio) |
| 73 | `igor-mahr` | Igor Mahr | Igor Mahr personal portfolio, live URL to capture | [Awwwards Igor Mahr](https://www.awwwards.com/sites/igor-mahr-personal-portfolio) |
| 74 | `oleksandr-krasovskyi` | Oleksandr Krasovskyi | Oleksandr Krasovskyi personal portfolio, live URL to capture | [Awwwards Personal Portfolio O.K.](https://www.awwwards.com/sites/personal-portfolio-o-k) |
| 75 | `alex-nikiforov` | Alex Nikiforov | Alex Nikiforov mobile product designer portfolio, live URL to capture | [Awwwards Personal Website](https://www.awwwards.com/sites/personal-website) |
| 76 | `lucabazuka` | lucabazuka | lucabazuka personal portfolio, live URL to capture | [Awwwards Personal Portfolio MacBook](https://www.awwwards.com/sites/personal-portfolio-macbook-1) |
| 77 | `abdul-wahab` | Abdul Wahab | Abdul Wahab portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 78 | `dillen-verschoor` | Dillen Verschoor | Dillen Verschoor personal portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 79 | `faris-kassim` | Faris Kassim | Faris Kassim portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 80 | `michael-uloth` | Michael Uloth | Michael Uloth music portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 81 | `barlas-apaydin` | Barlas Apaydin | Barlas Apaydin portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 82 | `mohammed-bilal` | Mohammed Bilal | Mohammed Bilal portfolio, live URL to capture | [One Page Love Portfolio Filter](https://onepagelove.com/tag/portfolio-filter) |
| 83 | `joost-huver` | Joost Huver | Joost Huver portfolio, live URL to capture | [One Page Love Cargo](https://onepagelove.com/tag/cargo) |
| 84 | `lauren-gallagher` | Lauren Gallagher | Lauren Gallagher portfolio, live URL to capture | [One Page Love Cargo](https://onepagelove.com/tag/cargo) |
| 85 | `pedro-del-corro` | Pedro del Corro | Pedro del Corro portfolio, live URL to capture | [One Page Love Cargo](https://onepagelove.com/tag/cargo) |
| 86 | `luke-fenech` | Luke Fenech | Luke Fenech portfolio, live URL to capture | [One Page Love Cargo](https://onepagelove.com/tag/cargo) |
| 87 | `jon-kyle` | Jon Kyle | Jon Kyle personal portfolio, live URL to capture | [One Page Love Cargo](https://onepagelove.com/tag/cargo) |
| 88 | `aristide-benoist` | Aristide Benoist | Aristide Benoist freelance developer portfolio, live URL to capture | [Awwwards portfolio element](https://www.awwwards.com/inspiration/portfolio-of-aristide-benoist-freelance-developer) |
| 89 | `davide-developer` | Davide Developer | Davide developer portfolio, live URL to capture | [Awwwards Aristide related element](https://www.awwwards.com/inspiration/portfolio-of-aristide-benoist-freelance-developer) |
| 90 | `theud` | Theud | Theud portfolio, live URL to capture | [Awwwards Aristide related element](https://www.awwwards.com/inspiration/portfolio-of-aristide-benoist-freelance-developer) |
| 91 | `bruno-simon` | Bruno Simon | [bruno-simon.com](https://bruno-simon.com/) | Curated portfolio reference retained from prior research |
| 92 | `lynn-fisher` | Lynn Fisher | [lynnandtonic.com](https://lynnandtonic.com/) | Curated personal portfolio reference retained from prior research |
| 93 | `brittany-chiang` | Brittany Chiang | [brittanychiang.com](https://brittanychiang.com/) | Curated personal portfolio reference retained from prior research |
| 94 | `rauno-freiberg` | Rauno Freiberg | [rauno.me](https://rauno.me/) | Curated personal/product designer portfolio reference retained from prior research |
| 95 | `maggie-appleton` | Maggie Appleton | [maggieappleton.com](https://maggieappleton.com/) | Personal site/digital garden reference |
| 96 | `andy-matuschak` | Andy Matuschak | [notes.andymatuschak.org](https://notes.andymatuschak.org/) | Personal notes/portfolio reference |
| 97 | `simon-willison` | Simon Willison | [simonwillison.net](https://simonwillison.net/) | Personal blog/portfolio reference |
| 98 | `daring-fireball` | John Gruber / Daring Fireball | [daringfireball.net](https://daringfireball.net/) | Personal writing site reference |
| 99 | `gwern` | Gwern | [gwern.net](https://gwern.net/) | Personal writing/research site reference |
| 100 | `tom-critchlow` | Tom Critchlow | [tomcritchlow.com](https://tomcritchlow.com/) | Personal wiki/site reference |

## Per-Theme Reference File Template

Each target gets a reference file:

```md
# taliahhh

Target: https://taliahhh.com/
Capture date: YYYY-MM-DD
Status: planned

## Required Mimicry

- Home must mimic Taliahhh's actual landing structure.
- Blog index must map Ryan posts into Taliahhh's work-list or project-index pattern.
- Blog post must map one Ryan essay into Taliahhh's project-detail structure.
- Archives must use the same navigation and spacing system as the target.
- Theme picker must look like an internal page from the same target site, not a generic gallery.

## Screenshots

- desktop:
- mobile:

## Rejection Criteria

- Generic portfolio grid.
- Any layout that could belong to another Framer portfolio.
- Reusing a shared portfolio renderer.
- Missing target-specific navigation, spacing, or typography.
```

## Rejection Criteria For The Whole Project

Reject the implementation if:

- Themes share a generic renderer that only changes variables.
- Theme names are categories rather than target sites.
- A theme has no target URL.
- `/themes` hides whether a theme is built or planned.
- The mimic cannot be identified from a screenshot.
- Ryan content disappears to satisfy the mimic.
