import { Title } from "@solidjs/meta";
import Nav from "~/components/Nav";
import BlogList from "~/components/BlogList";

export default function Blog() {
  console.log("blog");
  return (
    <div class="min-h-screen bg-background font-body">
      <Title>Blog | Ryan Prendergast</Title>
      <Nav currentPage="/blog" />
      <main class="max-w-2xl px-4 pb-12 pt-4">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-8">blog</h1>
        <BlogList />
      </main>
    </div>
  );
}
