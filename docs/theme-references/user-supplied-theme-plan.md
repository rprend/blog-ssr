# User-Supplied Site Theme Plan

This plan uses only the URLs in `docs/theme-references/user-supplied-sites.md`. Do not add outside targets unless Ryan supplies them.

Rules:

- Each theme directly mimics its target site.
- Theme names describe the site's observable vibe.
- Ryan's content model stays identical across themes.
- A theme is not done until screenshots are captured and its renderer reproduces the target's structure, not just its colors.
- If a site cannot be fetched later, keep the URL but mark the theme as blocked until a screenshot/reference is captured.

## Implementation Checklist For Every Theme

Before a theme can be marked built:

1. Create `docs/theme-references/sites/<slug>.md`.
2. Capture desktop and mobile screenshots.
3. Add `src/theme-mimics/<slug>/renderer.ts`.
4. Add `src/theme-mimics/<slug>/styles.css`.
5. Implement route renderers for home, blog index, blog post, archives, contact, guestbook, and themes.
6. Map all canonical Ryan content into the target site's layout pattern.
7. Run content-preservation checks.
8. Compare screenshots against the target reference.

No theme can be marked built if it shares the generic renderer from another site.

## Theme List

| # | Theme name | Slug | Target | Layout plan |
| --- | --- | --- | --- | --- |
| 1 | Spaced Wordmark Studio | `spaced-wordmark-studio` | https://jarcos.work/ | Mimic JARCOS: sparse studio header, large spaced-out wordmark typography, tight work/grid navigation, minimal inquiry link, portfolio entries treated as brand/digital projects. |
| 2 | Intimate Builder Notes | `intimate-builder-notes` | https://www.jia.build/ | Mimic Jia: direct first-person homepage, small nav for about/friends/writing, low-ceremony personal text, visible age/background/work notes, writing links as plain personal artifacts. |
| 3 | Monospace Manual | `monospace-manual` | https://owickstrom.github.io/the-monospace-web/ | Mimic The Monospace Web: single-column monospaced manual, metadata table at top, contents list, sectioned docs, ASCII drawings, tables/forms styled as text UI. |
| 4 | Research Tools Studio | `research-tools-studio` | https://those.tools/ | Mimic those.tools: tiny studio mark, editorial/software practice copy, sparse contact/social links, project descriptions for arts/social-science software, restrained typographic rhythm. |
| 5 | Contemporary Art Library | `contemporary-art-library` | https://www.midwayart.org/library/ | Mimic Midway library: institutional art nav, library/catalog framing, title/name rows, opening-hours utility, archive/library page density. |
| 6 | Plaintext Scoreboard | `plaintext-scoreboard` | https://plaintextsports.com/ | Mimic Plain Text Sports: timestamped page state, dark/light toggle, date pager, league filters, dense text tables for entries and archives. |
| 7 | Fashion Archive Index | `fashion-archive-index` | https://www.032carchive.com/ | Mimic 032c archive: huge archive premise, all/authors/photographers/stylists/talent filters, alphabetized names with counts, archive-first rather than blog-first navigation. |
| 8 | Idealist Studio Index | `idealist-studio-index` | https://www.workbyland.com/ | Mimic LAND: studio manifesto header, index/studies/information/object tabs, project filtering by discipline, large calm editorial project grid. |
| 9 | Playful Climber Scrapbook | `playful-climber-scrapbook` | https://ashimashiraishi.com/ | Mimic Ashima Shiraishi: cheerful emoji-heavy intro, personal contact line, loose list of climbs/projects, art/craft/climbing mix, handmade personal energy. |
| 10 | Lifeworks Cargo CV | `lifeworks-cargo-cv` | https://tamikaabakawood.com/ | Mimic Tamika Abaka-Wood: Cargo-like sidebar/title, numbered lifework roles, CV/profile as a dense life-practice list, minimal chrome. |
| 11 | Artist News Ledger | `artist-news-ledger` | https://tegabrain.com/ | Mimic Tega Brain: latest-news strip, artist name nav, about/news/work sections, exhibition/project announcements as compact dated ledger entries. |
| 12 | Latent Garden Notebook | `latent-garden-notebook` | https://www.nomad.garden/ | Mimic Nomad Garden: personal garden intro, casual image/caption lead, AI/semiotics research notes, loose posts arranged like a cultivated personal notebook. |
| 13 | Fragment Library Journal | `fragment-library-journal` | https://winnielim.org/ | Mimic Winnie Lim: menu for about/playlists/journal/notes/library/poetry/archive, latest posts and notes, fragments expressed as a whole, soft literary index. |
| 14 | Spartan Essay Table | `spartan-essay-table` | https://paulgraham.com/ | Mimic Paul Graham: almost bare HTML, small centered page, simple top "New" links, essay list with minimal typography, no modern cards. |
| 15 | Coordinates Art Index | `coordinates-art-index` | https://jonrafman.com/ | Mimic Jon Rafman: lat/lng header, artist title, year-grouped selected works, cryptic symbols, gallery-representation note, dense artwork chronology. |
| 16 | Ucoz Folk Archive | `ucoz-folk-archive` | https://mopppoppp.moy.su/load/rybalka/o_rybalka/ehduard_uspenskij_k_cheloveku_boris_mikhajlov/3-1-0-32 | Mimic uCoz/Russian file catalog: old portal chrome, registration/catalog links, nested category breadcrumbs, small text modules, file-entry page structure. |
| 17 | Empty Uncertainty Schema | `empty-uncertainty-schema` | https://schemasofuncertainty.com/ | Mimic Schemas of Uncertainty: extreme minimal blankness, title-as-object, page as conceptual pause, content surfaced with large negative space. |
| 18 | Transparent News Briefing | `transparent-news-briefing` | https://www.semafor.com/ | Mimic Semafor because it is user-supplied: global nav, briefing sections, headline/dek cards, news-column density, clear topic rails. |
| 19 | Graphic Bookmaker Card | `graphic-bookmaker-card` | https://virginiegauthier.info/ | Mimic Virginie Gauthier: compact graphic-designer/book-maker identity card, contact-forward layout, plain personal details, light interactive reload/hello flavor. |
| 20 | Experimental Publication Loop | `experimental-publication-loop` | https://re-coding.technology/ | Mimic re-coding: repeated publication statement, digital/experimental/hybrid framing, unusual input/output media, article modules as experimental publication units. |
| 21 | Taste Directory | `taste-directory` | https://www.pi.fyi/ | Mimic PI.FYI: theme toggle, rising/browse nav, categories for music/film/TV/books/etc., recommendation directory made from Ryan's links/posts. |
| 22 | Recent Writer Ledger | `recent-writer-ledger` | https://rmorrislevine.info/ | Mimic R Morris Levine: "recently..." heading, short linked activity list, writer bio minimalism, essays/events as chronological notes. |
| 23 | Artist Menu Works | `artist-menu-works` | https://setarehshahbazi.com/ | Mimic Setareh Shahbazi: simple artist home, menu overlay feel, projects/publications/about/contact sections, works listed as title-forward archive. |
| 24 | Friendly Nerd Hub | `friendly-nerd-hub` | https://visakanv.com/ | Mimic Visa: emoji-rich personal hub, "Hi, I'm..." intro, many self-links, bookshelf/email/mentions/pics/contribute nav, warm maximal personality. |
| 25 | Playful Games Cabinet | `playful-games-cabinet` | https://eieio.games/ | Mimic eieio.games: playful personal game/work cabinet, meta-controls, media/speaking/blog/all-work/about nav, game-like text distortion/interaction. |
| 26 | Creativity Portal Gallery | `creativity-portal-gallery` | https://www.enterportal.xyz/ | Mimic Enter Portal: gallery/uncovered/curate-together nav, "garden of human creativity" landing, portal-like browsing of collected work. |
| 27 | Design Archive Repository | `design-archive-repository` | https://archives.design/ | Mimic archives.design: digital archive description, availability filters, repository/list browsing, graphic-design archive records. |
| 28 | Weblog With Topic Facets | `weblog-topic-facets` | https://simonwillison.net/ | Mimic Simon Willison: weblog title, About/Subscribe/TILs/Tools nav, topic tag counts, chronological posts with utility/tool density. |
| 29 | Research Lab Index | `research-lab-index` | https://www.anthropic.com/research | Mimic Anthropic Research because it is user-supplied: sober research landing, policy/learn/news nav, research-team intro, report/article grid. |
| 30 | Visual Culture Practice | `visual-culture-practice` | https://paradyme.zone/ | Mimic PARADYME: practice title, merged-collaborative studio statement, visual-culture framing, archive of practice/projects. |
| 31 | Room Wall Portfolio | `room-wall-portfolio` | https://www.nataliajordanova.com/index.htm | Mimic Natalia Jordanova: old-school personal artist page, contact/social/CV row, poetic statement, sparse artwork/project text. |
| 32 | Artist Book Microsite | `artist-book-microsite` | https://barbaraforever.everyoceanhughes.com/ | Mimic Barbara Forever: book/microsite landing, NEXT navigation, editor/designer credit block, publication-object structure. |
| 33 | Cyberfeminist Download Index | `cyberfeminist-download-index` | https://cyberfeminismindex.com/ | Mimic Cyberfeminism Index: entry download logs, index/database framing, dense records, activist archive tone, timestamped data traces. |
| 34 | Nonfiction Visual Index | `nonfiction-visual-index` | https://www.maxkohler.com/ | Mimic Max Kohler: name + "Non-Fiction Visual Communication", project index by year/month, compact client/work rows, utilitarian portfolio list. |
| 35 | Personal HTML Bulletin | `personal-html-bulletin` | https://cynnality.com/index.html | Mimic cynnality: simple HTML homepage, "collecting, making, sharing", last-update note, personal links, work-in-progress bulletin board. |
| 36 | Daily Consumption Digest | `daily-consumption-digest` | https://consumed.today/ | Mimic consumed.today: daily digest of food/media, date headings, categorized consumed items, lightweight diary/archive structure. |
| 37 | Data Graphics Portfolio | `data-graphics-portfolio` | https://www.ashleycai.com/ | Mimic Ashley Cai: data/graphics journalist intro, CV/social/collections links, view toggles, project thumbnails/list as reporting portfolio. |
| 38 | Internet Map Diagram | `internet-map-diagram` | https://diagram.website/ | Mimic Diagram Website: random mode/labels/info/submit/index/roadmap controls, internet map framing, link nodes and index browsing. |
| 39 | Vernacular Web Essay | `vernacular-web-essay` | https://art.teleportacia.org/observation/vernacular/ | Mimic Olia Lialina essay: old web academic essay, language/version links, long illustrated essay structure, blue-link historical web style. |
| 40 | Cheap Web Manifesto | `cheap-web-manifesto` | https://potato.cheap/ | Mimic The Cheap Web: decorative text hearts, manifesto definitions, small-web link exploration, playful low-cost web philosophy. |
| 41 | No CSS Club | `no-css-club` | https://nocss.club/ | Mimic No CSS Club: browser-default HTML, anti-modern-web manifesto, club/list membership, no styling beyond semantic structure. |
| 42 | Poetic Computation Article | `poetic-computation-article` | https://sfpc.study/blog/cellular-automata | Mimic SFPC blog: school nav, donate/store/newsletter links, article title with experimental-school framing, playful institutional blog layout. |
| 43 | Feral Web Essay | `feral-web-essay` | https://paragraph.com/@austinwadesmith/queer-servers-and-feral-webs | Mimic Paragraph article: publication article shell, title-first essay, readable longform, newsletter/platform article affordances. |
| 44 | Performance Club Index | `performance-club-index` | https://250kb.club/ | Mimic 250KB Club: club manifesto, lightweight website directory, values statement, member/list table with performance-oriented framing. |
| 45 | Recurse Link Joy | `recurse-link-joy` | https://joy.recurse.com/ | Mimic Joy of Computing: daily community link, home/about/subscribe/RC nav, weekday post stream, Atom feed prominence. |
| 46 | Scenario Forecast Report | `scenario-forecast-report` | https://ai-2027.com/ | Mimic AI 2027: report nav, summary/research/forecast sections, author/date block, PDF/listen/watch affordances, long scenario document. |
| 47 | Rationalist Forum Frontpage | `rationalist-forum-frontpage` | https://www.lesswrong.com/ | Mimic LessWrong: forum app shell, quick takes/recent/recommended nav, concepts/library links, dense post feed. |
| 48 | Blogroll Essay Archive | `blogroll-essay-archive` | https://slatestarcodex.com/ | Mimic Slate Star Codex: WordPress-like blog header, top-post/archive/comment/feed nav, blogroll sidebar sections, chronological essay list. |
| 49 | Annotated Research Sidenotes | `annotated-research-sidenotes` | https://gwern.net/ | Mimic Gwern: categorized essay index, warnings/feature notes, sidenotes/link annotations/backlinks feel, dense research typography. |
| 50 | Now Page Directory | `now-page-directory` | https://nownownow.com/about | Mimic nownownow about: explanatory personal-web copy, now-page concept, directory framing, simple centered text links. |
| 51 | Conversational Minimalist | `conversational-minimalist` | https://sive.rs/ | Mimic Derek Sivers: centered personal intro, compact self-description, simple nav links, essay/book/course list with conversational tone. |
| 52 | Founder Link Index | `founder-link-index` | https://patrickcollison.com/ | Mimic Patrick Collison: bare personal nav, concise section links, link index of advice/blog/bookshelf/culture/labs/progress/questions. |
| 53 | AI Grant Application Page | `ai-grant-application-page` | https://aigrant.com/ | Mimic AI Grant because it is user-supplied: accelerator landing page, grant amount hero, credits/summit/advisor details, application CTA structure. |

## Build Order

1. `spartan-essay-table` because it is structurally simple and will prove the canonical-content model can become a bare personal essay site.
2. `monospace-manual` because it requires tables, section navigation, ASCII-like framing, and form/control styling.
3. `plaintext-scoreboard` because it transforms the same posts/links into date and league-like rows.
4. `fashion-archive-index` because it forces archive filters and counted entity lists.
5. `playful-climber-scrapbook` because it forces a high-personality personal portfolio rather than another list.
6. `coordinates-art-index` because it forces year-based art chronology and cryptic work-index styling.
7. `no-css-club` because it gives a true no-CSS baseline.
8. `annotated-research-sidenotes` because it forces high-density research reading with sidenotes.

## Per-Site Reference Capture

For each theme, create `docs/theme-references/sites/<slug>.md` before implementation:

```md
# Theme Name

Target: URL
Captured: YYYY-MM-DD

## Visible Structure

- Header:
- Navigation:
- Homepage layout:
- Index/list pattern:
- Article/detail pattern:
- Archive pattern:
- Mobile behavior:

## Ryan Content Mapping

- Home/linklog:
- Blog index:
- Blog post:
- Archives:
- Contact:
- Themes:

## Rejection Criteria

- ...
```
