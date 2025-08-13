import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, '../src/templates');
const outputFile = path.join(__dirname, '../src/lib/templates.ts');

// Simple template function generator
function generateTemplateFunction(name, htmlContent) {
  return `export const ${name} = (data: Record<string, string> = {}): string => {
  let html = \`${htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  
  // Replace {{variable}} with data.variable
  return html.replace(/\\{\\{(\\w+)\\}\\}/g, (match, key) => {
    return data[key] || '';
  });
};`;
}

// Read all HTML template files
const files = fs.readdirSync(templatesDir).filter(file => file.endsWith('.html'));
const templates = [];

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  const templateName = file.replace('.html', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  templates.push(generateTemplateFunction(templateName, htmlContent));
}

// Generate TypeScript file
let content = '// Auto-generated template functions - do not edit manually\n\n';
content += templates.join('\n\n');
content += '\n';

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
  console.log(`Generated ${outputFile} with ${templates.length} templates`);
} else {
  console.log(`Templates are up to date (${templates.length} templates)`);
}