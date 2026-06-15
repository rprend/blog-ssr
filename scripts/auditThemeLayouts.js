import fs from "node:fs";

const sourceList = fs.readFileSync("docs/theme-references/user-supplied-sites.md", "utf8");
const plan = fs.readFileSync("docs/theme-references/user-supplied-theme-plan.md", "utf8");
const themesSource = fs.readFileSync("src/themes.ts", "utf8");
const renderersSource = fs.readFileSync("src/theme-renderers.ts", "utf8");

const suppliedUrls = sourceList
  .split("\n")
  .map((line) => line.match(/https?:\/\/\S+/)?.[0])
  .filter(Boolean);

const plannedRows = plan
  .split("\n")
  .filter((line) => line.startsWith("| ") && /^\d+$/.test(line.split("|")[1].trim()));

const registryUrls = [...themesSource.matchAll(/targetUrl:\s*"([^"]+)"/g)].map((match) => match[1]);
const registrySlugs = [...themesSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const builtSlugs = [...new Set([...themesSource.matchAll(/"([^"]+)",/g)]
  .map((match) => match[1])
  .filter((slug) =>
    [
      "spartan-essay-table",
      "monospace-manual",
      "plaintext-scoreboard",
      "fashion-archive-index",
      "playful-climber-scrapbook",
      "coordinates-art-index",
      "no-css-club",
      "annotated-research-sidenotes",
    ].includes(slug)
  ))];

const failures = [];

if (suppliedUrls.length !== 53) failures.push(`Expected 53 supplied URLs, found ${suppliedUrls.length}.`);
if (plannedRows.length !== 53) failures.push(`Expected 53 planned theme rows, found ${plannedRows.length}.`);
if (registryUrls.length !== 53) failures.push(`Expected 53 registry URLs, found ${registryUrls.length}.`);

for (const url of suppliedUrls) {
  if (!registryUrls.includes(url)) failures.push(`Supplied URL missing from registry: ${url}`);
}

for (const slug of registrySlugs) {
  if (!plan.includes(`\`${slug}\``)) failures.push(`Registry slug missing from supplied plan: ${slug}`);
  if (!fs.existsSync(`docs/theme-references/sites/${slug}.md`)) {
    failures.push(`Missing reference file for ${slug}.`);
  }
}

for (const oldSlug of ["hacker-news", "win98", "tufte", "aqua", "theme-museum"]) {
  if (registrySlugs.includes(oldSlug)) failures.push(`Old invented theme still present: ${oldSlug}`);
}

for (const slug of builtSlugs) {
  if (!renderersSource.includes(`"${slug}":`) && !renderersSource.includes(`${slug}:`)) {
    failures.push(`Built theme ${slug} is missing a renderer mapping.`);
  }
}

if (!renderersSource.includes("family-spartan") && !renderersSource.includes('"spartan"')) {
  failures.push("Spartan renderer family is missing.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      suppliedUrls: suppliedUrls.length,
      plannedRows: plannedRows.length,
      registryThemes: registryUrls.length,
      builtThemes: builtSlugs,
    },
    null,
    2
  )
);
