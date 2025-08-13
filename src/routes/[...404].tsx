import { Title } from "@solidjs/meta";
import Nav from "~/components/Nav";

export default function NotFound() {
  return (
    <div class="min-h-screen bg-background font-body">
      <Title>404 - Page Not Found - Ryan Prendergast</Title>
      <Nav currentPage="" />
      <main class="max-w-2xl px-4 pb-12 pt-6">
        <h1 class="text-3xl font-bold font-headline text-primary mb-8">Page Not Found</h1>
        <p class="text-lg text-primary mb-4">
          The page you're looking for doesn't exist.
        </p>
        <p class="text-primary">
          <a href="/" class="hover:opacity-80 underline transition-opacity">
            ← Back to Home
          </a>
        </p>
      </main>
    </div>
  );
}
