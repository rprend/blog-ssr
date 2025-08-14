import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../src/content/posts');
const outputFile = path.join(__dirname, '../src/build-outputs/posts-data.ts');

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractExcerpt(content, maxLength = 150) {
  // Remove markdown formatting
  const plainText = content
    .replace(/^#+\s+/gm, "") // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links
    .replace(/[*_~`]/g, "") // Remove emphasis
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + "...";
}

// Read all markdown files and process them
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
const posts = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(fileContent);
  
  // Convert markdown to HTML
  const htmlContent = await marked(markdownContent);
  
  // Extract filename without extension for slug
  const baseFilename = file.replace('.md', '');
  const slug = data.slug || baseFilename;
  
  const post = {
    slug,
    title: data.title || baseFilename,
    date: data.date || new Date().toISOString().split("T")[0],
    author: data.author || null,
    subtitle: data.subtitle || null,
    excerpt: data.excerpt || extractExcerpt(markdownContent),
    readTime: calculateReadTime(markdownContent),
    content: htmlContent
  };
  
  posts.push(post);
}

// Sort by date (newest first)
posts.sort((a, b) => {
  // Parse dates in MM-DD-YYYY format
  const parseDate = (dateStr) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      // MM-DD-YYYY format
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
    }
    // Fallback to standard date parsing
    return new Date(dateStr);
  };

  return parseDate(b.date).getTime() - parseDate(a.date).getTime();
});

// Generate TypeScript file
let content = '// Auto-generated file - do not edit manually\n\n';
content += 'export interface BlogPost {\n';
content += '  slug: string;\n';
content += '  title: string;\n';
content += '  date: string;\n';
content += '  author: string | null;\n';
content += '  subtitle: string | null;\n';
content += '  excerpt: string;\n';
content += '  readTime: string;\n';
content += '  content: string;\n';
content += '}\n\n';

content += 'export const blogPosts: BlogPost[] = ';
content += JSON.stringify(posts, null, 2);
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
  console.log(`Generated ${outputFile} with ${posts.length} posts`);
} else {
  console.log(`Posts data is up to date (${posts.length} posts)`);
}