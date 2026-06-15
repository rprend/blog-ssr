export type ThemeCategory =
  | "retro-os"
  | "writing"
  | "old-web"
  | "terminal"
  | "personal"
  | "physical"
  | "institutional"
  | "minimal"
  | "maximal"
  | "seasonal";

export interface SiteTheme {
  slug: string;
  name: string;
  category: ThemeCategory;
  description: string;
  tags: string[];
  status: "ready" | "layout-draft" | "skin";
  depth: "layout" | "token" | "interaction";
}

const readyLayoutThemes = new Set(["aqua", "hacker-news", "win98", "tufte", "green-terminal"]);

const themeGroups: Array<{
  category: ThemeCategory;
  tags: string[];
  themes: Array<[string, string, string]>;
}> = [
  {
    category: "retro-os",
    tags: ["retro", "operating system"],
    themes: [
      ["aqua", "Aqua", "Early-2000s Apple blog chrome with glassy navigation."],
      ["classic-mac", "Classic Mac", "Monochrome System-era windows and crisp document panels."],
      ["win95", "Windows 95", "Gray beveled panels and utilitarian desktop controls."],
      ["win98", "Windows 98", "Sharper classic Windows shell with blue title-bar energy."],
      ["windows-xp", "Windows XP", "Friendly blue and green desktop gloss."],
      ["windows-7", "Windows 7", "Translucent Aero-inspired polish and calm gradients."],
      ["dos", "DOS", "Black screen, bright text, command-line density."],
      ["commodore-64", "Commodore 64", "Blue 8-bit home-computer console styling."],
      ["palmpilot", "PalmPilot", "Tiny grayscale PDA notes and compact controls."],
      ["ipod", "iPod", "White plastic, chrome hints, and click-wheel-era simplicity."],
    ],
  },
  {
    category: "writing",
    tags: ["writing", "publishing"],
    themes: [
      ["tufte", "Tufte", "Bookish longform layout with warm paper and serif text."],
      ["latex", "LaTeX", "Academic paper typography and formal document rhythm."],
      ["newspaper", "Newspaper", "Columned editorial page with masthead drama."],
      ["magazine", "Magazine", "Bold editorial hierarchy for a personal publication."],
      ["paperback", "Paperback", "Compact novel-like pages with soft paper tones."],
      ["academic-journal", "Academic Journal", "Dense research archive with citation-like metadata."],
      ["field-notes", "Field Notes", "Pocket notebook colors and ruled-paper details."],
      ["legal-brief", "Legal Brief", "Formal pleading-paper structure and restrained typography."],
      ["encyclopedia", "Encyclopedia", "Reference-book hierarchy and cross-link emphasis."],
      ["markdown-reader", "Markdown Reader", "Clean rendered Markdown with README-like defaults."],
    ],
  },
  {
    category: "old-web",
    tags: ["old web", "internet history"],
    themes: [
      ["html-1", "HTML 1.0", "Almost raw browser defaults with barely any decoration."],
      ["geocities", "GeoCities", "Maximal old-web color, tiled-feeling surfaces, and badges."],
      ["blogger", "Blogger", "Early hosted-blog layout with simple modules."],
      ["myspace", "MySpace", "Profile-page panels with saturated personality."],
      ["tumblr", "Tumblr", "Microblog cards and reblog-era compact post rhythm."],
      ["craigslist", "Craigslist", "Plain classified listings and blue-link utility."],
      ["hacker-news", "Hacker News", "Dense orange-tinted link feed styling."],
      ["wikipedia", "Wikipedia", "Reference page with tabs, sidebars, and serif content."],
      ["rss-reader", "RSS Reader", "Feed-reader panes and scan-first item lists."],
      ["webring", "Webring", "Community portal with badges, rings, and outward links."],
    ],
  },
  {
    category: "terminal",
    tags: ["terminal", "editor"],
    themes: [
      ["green-terminal", "Green Terminal", "Phosphor green command-line interface."],
      ["amber-terminal", "Amber Terminal", "Amber CRT glow and dark shell surfaces."],
      ["solarized-light", "Solarized Light", "Low-contrast editor palette in light mode."],
      ["solarized-dark", "Solarized Dark", "Low-contrast editor palette in dark mode."],
      ["monokai", "Monokai", "Saturated code-editor dark mode."],
      ["dracula", "Dracula", "Purple-black editor theme with bright accents."],
      ["gruvbox", "Gruvbox", "Warm retro editor colors with earthy contrast."],
      ["nord", "Nord", "Arctic blue-gray editor calm."],
      ["catppuccin", "Catppuccin", "Soft pastel code-editor palette."],
      ["vim-help", "Vim Help", "Text manual layout inspired by editor help buffers."],
    ],
  },
  {
    category: "personal",
    tags: ["personal site", "archetype"],
    themes: [
      ["personal-blog", "Personal Blog", "Classic reverse-chronological personal publishing."],
      ["digital-garden", "Digital Garden", "Notes, links, and evergreen knowledge fragments."],
      ["public-wiki", "Public Wiki", "Personal knowledge base with reference-site structure."],
      ["cv", "CV", "Credential-forward resume and experience presentation."],
      ["portfolio", "Portfolio", "Selected work grid and case-study polish."],
      ["now-page", "Now Page", "Current-focus page with update-oriented clarity."],
      ["uses-page", "Uses Page", "Tools and setup inventory styling."],
      ["colophon", "Colophon", "Site-making notes and technical credits."],
      ["guestbook", "Guestbook", "Visitor-note energy and community artifacts."],
      ["personal-portal", "Personal Portal", "Dashboard of links, status, posts, and modules."],
    ],
  },
  {
    category: "physical",
    tags: ["physical metaphor"],
    themes: [
      ["receipt", "Receipt", "Narrow thermal-paper strip and transaction-like metadata."],
      ["index-cards", "Index Cards", "Stacked cards, labels, and catalog notes."],
      ["filing-cabinet", "Filing Cabinet", "Folders, tabs, and office archive organization."],
      ["notebook", "Notebook", "Ruled-paper writing surface and margin cues."],
      ["corkboard", "Corkboard", "Pinned notes and warm board texture."],
      ["whiteboard", "Whiteboard", "Marker-like headings and clean planning space."],
      ["blueprint", "Blueprint", "Technical drawing lines on deep blue."],
      ["calendar", "Calendar", "Date-grid structure and planning interface."],
      ["map", "Map", "Cartographic labels, route-like rules, and terrain colors."],
      ["museum-label", "Museum Label", "Gallery wall label precision and quiet captions."],
    ],
  },
  {
    category: "institutional",
    tags: ["institutional", "utility"],
    themes: [
      ["government-form", "Government Form", "Plain civic form design with official structure."],
      ["university-page", "University Page", "Academic department homepage styling."],
      ["library-catalog", "Library Catalog", "Search-result records and catalog-card hierarchy."],
      ["airline-departures", "Airline Departures", "Airport board timing and travel-system density."],
      ["diner-menu", "Diner Menu", "Laminated menu typography and friendly categories."],
      ["record-store", "Record Store", "Crate labels and music-shop browsing."],
      ["art-gallery", "Art Gallery", "White-wall exhibition text and spare grids."],
      ["hardware-manual", "Hardware Manual", "Industrial diagrams and instruction-sheet structure."],
      ["financial-terminal", "Financial Terminal", "Market-screen data density and bright figures."],
      ["classified-ads", "Classified Ads", "Small-print listings and newspaper ad blocks."],
    ],
  },
  {
    category: "minimal",
    tags: ["minimal", "accessibility"],
    themes: [
      ["plain-html", "Plain HTML", "Browser-default inspired baseline."],
      ["brutalist", "Brutalist", "Hard lines, raw structure, and no softness."],
      ["swiss-grid", "Swiss Grid", "Modernist grid, red accents, and disciplined type."],
      ["monochrome", "Monochrome", "Black, white, and controlled grayscale."],
      ["high-contrast", "High Contrast", "Large accessible contrast and loud focus states."],
      ["print", "Print", "Ink-first layout optimized for paper."],
      ["large-type", "Large Type", "Oversized readable text and spacious rhythm."],
      ["no-css", "No CSS", "Deliberately reduced styling while preserving function."],
      ["reader-mode", "Reader Mode", "Calm longform reading with minimal chrome."],
      ["low-bandwidth", "Low Bandwidth", "Small, fast, and low-decoration design."],
    ],
  },
  {
    category: "maximal",
    tags: ["maximal", "expressive"],
    themes: [
      ["sticker-sheet", "Sticker Sheet", "Layered labels and playful collected graphics."],
      ["badge-wall", "Badge Wall", "Web badges, buttons, and compact modules."],
      ["tiled-background", "Tiled Background", "Pattern-heavy page inspired by early sites."],
      ["pixel-art", "Pixel Art", "Chunky borders, crisp shadows, and game-screen color."],
      ["vaporwave", "Vaporwave", "Neon sunset palette and retro-future contrast."],
      ["cyberpunk", "Cyberpunk", "High-voltage dark UI with warning accents."],
      ["scrapbook", "Scrapbook", "Cut-paper sections and handmade layering."],
      ["collage", "Collage", "Asymmetric clipped panels and mixed textures."],
      ["arcade", "Arcade", "Cabinet-like color and score-display details."],
      ["toy-ui", "Toy UI", "Chunky friendly controls and playful scale."],
    ],
  },
  {
    category: "seasonal",
    tags: ["seasonal", "easter egg"],
    themes: [
      ["winter", "Winter", "Cool paper, pale blue shadows, and quiet contrast."],
      ["summer", "Summer", "Bright sunlit colors and relaxed spacing."],
      ["midnight", "Midnight", "Deep night palette with soft reading contrast."],
      ["sunrise", "Sunrise", "Warm morning gradients and gentle accents."],
      ["birthday", "Birthday", "Confetti-like color and celebratory details."],
      ["launch-day", "Launch Day", "Product-launch polish with announcement energy."],
      ["archive-mode", "Archive Mode", "Muted preservation palette for old posts."],
      ["random-chaos", "Random Chaos", "Intentionally unruly layout accents."],
      ["secret-mode", "Secret Mode", "Hidden-room dark palette and quiet mystery."],
      ["theme-museum", "Theme Museum", "Curated exhibit styling for the theme system itself."],
    ],
  },
];

export const siteThemes: SiteTheme[] = themeGroups.flatMap((group) =>
  group.themes.map(([slug, name, description]) => ({
    slug,
    name,
    category: group.category,
    description,
    tags: [...group.tags],
    status: readyLayoutThemes.has(slug) ? "ready" as const : "layout-draft" as const,
    depth: "layout" as const,
  }))
);

export const defaultThemeSlug = "aqua";

export function getThemeBySlug(slug: string | null | undefined): SiteTheme {
  return siteThemes.find((theme) => theme.slug === slug) || siteThemes[0];
}

export function getThemesByCategory(): Record<ThemeCategory, SiteTheme[]> {
  return siteThemes.reduce(
    (groups, theme) => {
      groups[theme.category].push(theme);
      return groups;
    },
    {
      "retro-os": [],
      writing: [],
      "old-web": [],
      terminal: [],
      personal: [],
      physical: [],
      institutional: [],
      minimal: [],
      maximal: [],
      seasonal: [],
    } as Record<ThemeCategory, SiteTheme[]>
  );
}
