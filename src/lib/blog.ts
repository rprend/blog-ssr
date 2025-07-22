import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [
    {
      slug: "contraThematicAnalysis",
      title: "Contra Thematic Analysis",
      date: "2024-03-15",
      excerpt: "A deep dive into thematic analysis and its limitations...",
      readTime: "5 min read"
    },
    {
      slug: "fragility",
      title: "On Fragility", 
      date: "2024-02-28",
      excerpt: "Exploring the concept of fragility in modern systems...",
      readTime: "7 min read"
    },
    {
      slug: "lacanBookReview",
      title: "Lacan Book Review",
      date: "2024-01-20", 
      excerpt: "A critical examination of Lacanian psychoanalysis...",
      readTime: "12 min read"
    },
    {
      slug: "bookReviews",
      title: "Book Reviews",
      date: "2023-12-10",
      excerpt: "Collection of book reviews and literary analysis...",
      readTime: "8 min read"
    },
    {
      slug: "bookshelf",
      title: "My Bookshelf",
      date: "2023-11-05",
      excerpt: "A curated list of influential books and recommendations...",
      readTime: "3 min read"
    }
  ];

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // In a static build, we'd need to import these at build time
    // For now, return mock data with the slug
    const posts = await getBlogPosts();
    const post = posts.find(p => p.slug === slug);
    
    if (!post) return null;

    // Mock content - in real implementation would read from markdown files
    const content = `# ${post.title}

This is the content for ${post.title}.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Section Header

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

- List item 1
- List item 2  
- List item 3

**Bold text** and *italic text* for emphasis.

> This is a blockquote with some interesting insight.

More content continues here...`;

    return {
      ...post,
      content: await marked(content)
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}