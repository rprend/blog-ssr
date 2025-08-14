import { blogPosts, type BlogPost } from "./posts-data";

export type { BlogPost };

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(p => p.slug === slug);
  return post || null;
}