import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "../src/content/posts");
const outputFile = path.join(__dirname, "../public/rss.xml");

// Read all markdown files and process them
const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
const posts = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdownContent } = matter(fileContent);

  // Convert markdown to HTML
  const htmlContent = await marked(markdownContent);

  // Extract filename without extension for slug
  const baseFilename = file.replace(".md", "");
  const slug = data.slug || baseFilename;

  const post = {
    slug,
    title: data.title || baseFilename,
    date: data.date || new Date().toISOString().split("T")[0],
    author: data.author || "Ryan Prendergast",
    subtitle: data.subtitle || null,
    excerpt: data.excerpt || extractExcerpt(markdownContent),
    content: htmlContent,
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

function extractExcerpt(content, maxLength = 250) {
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

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

function formatDateRFC822(dateStr) {
  const parts = dateStr.split("-");
  const date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
  return date.toUTCString();
}

// Generate RSS feed
let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ryan's Mailbag</title>
    <link>https://ryan-prendergast.com/blog</link>
    <description>Essays and book reviews</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://ryan-prendergast.com/rss.xml" rel="self" type="application/rss+xml" />
    <generator>Custom RSS Generator</generator>
    <webMaster>rprendergast1121@gmail.com (Ryan Prendergast)</webMaster>
    <managingEditor>rprendergast1121@gmail.com (Ryan Prendergast)</managingEditor>`;

// Add posts to RSS feed
posts.forEach((post) => {
  rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://ryan-prendergast.com/blog/${post.slug}</link>
      <guid isPermaLink="true">https://ryan-prendergast.com/blog/${
        post.slug
      }</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <author>rprendergast1121@gmail.com (${escapeXml(post.author)})</author>
      <pubDate>${formatDateRFC822(post.date)}</pubDate>
    </item>`;
});

rss += `
  </channel>
</rss>`;

// Write RSS feed to file
fs.writeFileSync(outputFile, rss);
console.log(`Generated RSS feed at ${outputFile} with ${posts.length} posts`);
