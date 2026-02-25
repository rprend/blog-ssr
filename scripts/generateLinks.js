import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const linksDir = path.join(__dirname, '../src/content/links');
const outputFile = path.join(__dirname, '../src/build-outputs/links-data.ts');

// Read all markdown files and process them
const files = fs.readdirSync(linksDir).filter(file => file.endsWith('.md'));
const links = [];

for (const file of files) {
  const filePath = path.join(linksDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(fileContent);

  // Convert markdown to HTML
  const htmlContent = await marked(markdownContent);

  const baseFilename = file.replace('.md', '');
  const slug = data.slug || baseFilename;

  const link = {
    slug,
    title: data.title || baseFilename,
    url: data.url || '',
    date: data.date || new Date().toISOString().split("T")[0],
    image: data.image || null,
    content: htmlContent
  };

  links.push(link);
}

// Sort by date (newest first) - dates in MM-DD-YYYY format
links.sort((a, b) => {
  const parseDate = (dateStr) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
    }
    return new Date(dateStr);
  };
  return parseDate(b.date).getTime() - parseDate(a.date).getTime();
});

// Generate TypeScript file
let content = '// Auto-generated file - do not edit manually\n\n';
content += 'export interface LinkEntry {\n';
content += '  slug: string;\n';
content += '  title: string;\n';
content += '  url: string;\n';
content += '  date: string;\n';
content += '  image: string | null;\n';
content += '  content: string;\n';
content += '}\n\n';

content += 'export const linkEntries: LinkEntry[] = ';
content += JSON.stringify(links, null, 2);
content += ';\n';

// Only write if content has changed
let shouldWrite = true;
if (fs.existsSync(outputFile)) {
  const existingContent = fs.readFileSync(outputFile, 'utf-8');
  if (existingContent === content) {
    shouldWrite = false;
  }
}

if (shouldWrite) {
  fs.writeFileSync(outputFile, content);
  console.log(`Generated ${outputFile} with ${links.length} links`);
} else {
  console.log(`Links data is up to date (${links.length} links)`);
}
