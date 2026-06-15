import fs from "node:fs";

const themesSource = fs.readFileSync("src/themes.ts", "utf8");
const renderersSource = fs.readFileSync("src/theme-renderers.ts", "utf8");

const themeSlugs = [...themesSource.matchAll(/\["([^"]+)",\s*"[^"]+",\s*"[^"]+"\]/g)].map(
  (match) => match[1]
);
const mappedSlugs = new Set(
  [...renderersSource.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s*"(?:aqua|desktop|terminal|editor|hn|wiki|old-web|publishing|cards|catalog|grid|minimal|maximal|dashboard)",/gm)].map(
    (match) => match[1]
  )
);
const readyMatch = themesSource.match(/readyLayoutThemes = new Set\(\[([^\]]+)\]\)/);
const readySlugs = readyMatch
  ? [...readyMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
  : [];

const failures = [];

if (themeSlugs.length !== 100) {
  failures.push(`Expected 100 themes, found ${themeSlugs.length}.`);
}

for (const slug of themeSlugs) {
  if (!mappedSlugs.has(slug)) failures.push(`Theme ${slug} is missing a renderer-family mapping.`);
}

for (const slug of readySlugs) {
  if (!themeSlugs.includes(slug)) failures.push(`Ready theme ${slug} is not in the theme registry.`);
  if (!mappedSlugs.has(slug)) failures.push(`Ready theme ${slug} is not mapped to a renderer family.`);
}

if (readySlugs.length < 5) {
  failures.push(`Expected at least 5 layout-ready proof themes, found ${readySlugs.length}.`);
}

if (!themesSource.includes('status: readyLayoutThemes.has(slug) ? "ready"')) {
  failures.push("Theme registry is not deriving ready/layout-draft status from readyLayoutThemes.");
}

if (!renderersSource.includes("renderThemedPage")) {
  failures.push("Renderer entry point renderThemedPage is missing.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      themes: themeSlugs.length,
      mappedThemes: mappedSlugs.size,
      readyThemes: readySlugs,
    },
    null,
    2
  )
);
