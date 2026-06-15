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
const failures = [];

if (slugs.length !== 53) failures.push(`Expected 53 theme slugs, found ${slugs.length}.`);

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
      if (!html.includes("Ryan Prendergast")) {
        failures.push(`${slug} ${route} is missing canonical Ryan identity content.`);
      }
      if (html.includes("family-aqua") && slug !== "aqua") {
        failures.push(`${slug} ${route} fell back to family-aqua.`);
      }
      if (route === "/" && !html.includes(canonicalHomeText)) {
        failures.push(`${slug} ${route} is missing the canonical home subheader.`);
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
      probes: slugs.length * routes.length,
    },
    null,
    2
  )
);
