import fs from "node:fs";

const baseUrl = process.env.THEME_PROBE_BASE_URL || "http://127.0.0.1:8787";
const themesSource = fs.readFileSync("src/themes.ts", "utf8");
const renderersSource = fs.readFileSync("src/theme-renderers.ts", "utf8");

const slugs = [...themesSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const familyPairs = [...renderersSource.matchAll(/"([^"]+)":\s*"([^"]+)"/g)];
const familyBySlug = new Map(familyPairs.map((match) => [match[1], match[2]]));
const routes = ["/", "/blog", "/archives", "/contact"];
const forbiddenPhrases = [
  "re-coding everyday Ryan is a digital",
  "Based on the supplied",
  "Application-style landing page",
  "A scenario report assembled",
  "Lightweight entries from Ryan",
  "Come for a stroll",
  "Downloaded entries from Ryan",
];
const canonicalHomeText = "Ryan is a startup founder focused on quantitative humanities research";
const requiredNavHrefs = ['href="/"', 'href="/blog"', 'href="/archives"', 'href="/contact"'];
const failures = [];

if (slugs.length !== 53) failures.push(`Expected 53 theme slugs, found ${slugs.length}.`);

try {
  const originalResponse = await fetch(new URL("/", baseUrl));
  const originalHtml = await originalResponse.text();

  if (!originalResponse.ok) {
    failures.push(`original / returned ${originalResponse.status}.`);
  }
  if (!originalHtml.includes('data-theme="original"')) {
    failures.push("original / is missing data-theme=\"original\".");
  }
  if (!originalHtml.includes("theme-original")) {
    failures.push("original / is missing theme-original class.");
  }
  if (!originalHtml.includes("family-aqua")) {
    failures.push("original / is missing family-aqua.");
  }
  if (originalHtml.includes("theme-spartan-essay-table")) {
    failures.push("original / incorrectly renders the spartan essay mimic theme.");
  }
  if (!originalHtml.includes("data-theme-reset")) {
    failures.push("original / is missing the remove theme control.");
  }
} catch (error) {
  failures.push(`original / failed to fetch from ${baseUrl}: ${error.message}`);
}

for (const slug of slugs) {
  const family = familyBySlug.get(slug);
  if (!family) {
    failures.push(`Missing renderer family mapping for ${slug}.`);
    continue;
  }

  for (const route of routes) {
    const url = new URL(route, baseUrl);
    url.searchParams.set("theme", slug);

    try {
      const response = await fetch(url);
      const html = await response.text();

      if (!response.ok) {
        failures.push(`${slug} ${route} returned ${response.status}.`);
        continue;
      }
      if (!html.includes(`data-theme="${slug}"`)) {
        failures.push(`${slug} ${route} is missing data-theme.`);
      }
      if (!html.includes(`theme-${slug}`)) {
        failures.push(`${slug} ${route} is missing theme class.`);
      }
      if (!html.includes(`family-${family}`)) {
        failures.push(`${slug} ${route} is missing family-${family}.`);
      }
      if (!html.includes("data-theme-reset")) {
        failures.push(`${slug} ${route} is missing the remove theme control.`);
      }
      if (!html.includes("Ryan Prendergast")) {
        failures.push(`${slug} ${route} is missing canonical Ryan identity content.`);
      }
      if (html.includes("family-aqua") && slug !== "aqua") {
        failures.push(`${slug} ${route} fell back to family-aqua.`);
      }
      if (route === "/" && !html.includes(canonicalHomeText)) {
        failures.push(`${slug} ${route} is missing the canonical home subheader.`);
      }
      for (const href of requiredNavHrefs) {
        if (!html.includes(href)) {
          failures.push(`${slug} ${route} is missing core nav link ${href}.`);
        }
      }
      for (const phrase of forbiddenPhrases) {
        if (html.includes(phrase)) {
          failures.push(`${slug} ${route} includes forbidden added content: ${phrase}`);
        }
      }
    } catch (error) {
      failures.push(`${slug} ${route} failed to fetch from ${baseUrl}: ${error.message}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      themes: slugs.length,
      routes: routes.length,
      probes: slugs.length * routes.length + 1,
    },
    null,
    2
  )
);
