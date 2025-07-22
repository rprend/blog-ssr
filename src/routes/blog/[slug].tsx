import { Title } from "@solidjs/meta";
import { createResource, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import Nav from "~/components/Nav";
import { getBlogPost, type BlogPost } from "~/lib/blog";

export default function BlogPost() {
  const params = useParams();
  const [post] = createResource(() => params.slug, getBlogPost);

  return (
    <div class="min-h-screen bg-background font-body">
      <Show when={post()} fallback={
        <>
          <Title>Post Not Found - Ryan Prendergast</Title>
          <Nav currentPage="/blog" />
          <main class="max-w-2xl px-4 pb-12 pt-6">
            <h1 class="text-3xl font-bold text-primary mb-8">Post Not Found</h1>
            <p class="text-primary">
              <a href="/blog" class="hover:opacity-80 underline transition-opacity">
                ← Back to Blog
              </a>
            </p>
          </main>
        </>
      }>
        {(postData) => (
          <>
            <Title>{postData.title} - Ryan Prendergast</Title>
            <Nav currentPage="/blog" />
            <main class="max-w-2xl px-4 pb-12 pt-6">
              <p class="text-secondary mb-4">
                <a href="/blog" class="hover:opacity-80 underline transition-opacity">
                  ← Back to Blog
                </a>
              </p>
              <h1 class="text-3xl font-bold text-primary mb-4">{postData.title}</h1>
              <p class="text-secondary text-sm mb-8">{postData.date}</p>
              <div 
                class="prose prose-primary max-w-none"
                innerHTML={postData.content}
              />
            </main>
          </>
        )}
      </Show>
    </div>
  );
}