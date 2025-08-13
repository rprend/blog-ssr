import { Title } from "@solidjs/meta";
import { createSignal, Show, For, ErrorBoundary } from "solid-js";
import {
  query,
  createAsync,
  type RouteDefinition,
  revalidate,
} from "@solidjs/router";
import Nav from "~/components/Nav";
import GuestbookModal from "~/components/GuestbookModal";
import {
  getGuestbookEntries,
  submitGuestbookEntry,
  formatDate,
  type GuestbookEntry,
} from "~/lib/guestbook";

const getGuestbookData = query(async () => {
  return await getGuestbookEntries();
}, "guestbook");

export const route = {
  preload: () => getGuestbookData(),
} satisfies RouteDefinition;

export default function Guestbook() {
  console.log("guestbook");
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const entries = createAsync(() => getGuestbookData());

  const handleSubmit = async (name: string, message: string) => {
    try {
      await submitGuestbookEntry(name, message);
      // Revalidate the query cache to refresh the data
      await revalidate("guestbook");
      // Close the modal after successful submission
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit entry:", error);
      // The error will be handled by the modal component
      throw error;
    }
  };

  return (
    <div class="min-h-screen bg-background font-body">
      <Title>Guestbook - Ryan Prendergast</Title>
      <Nav currentPage="/guestbook" />
      <main class="max-w-2xl px-4 pb-12 pt-6">
        <div class="flex justify-between items-start mb-8">
          <h1 class="text-4xl md:text-5xl font-bold font-headline text-primary">guestbook</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            class="px-4 py-2 bg-primary text-white rounded hover:opacity-80 transition-opacity"
          >
            Sign Guestbook
          </button>
        </div>

        <ErrorBoundary
          fallback={
            <div class="text-center py-8">
              <p class="text-red-600">
                Failed to load guestbook entries. Please try again later.
              </p>
            </div>
          }
        >
          <Show
            when={entries()}
            fallback={
              <div class="space-y-4">
                {Array(4)
                  .fill(0)
                  .map(() => (
                    <div class="border-b border-gray-200 pb-4 animate-pulse">
                      <div class="flex justify-between items-start mb-2">
                        <div class="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div class="h-4 bg-gray-200 rounded mb-2"></div>
                      <div class="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  ))}
              </div>
            }
          >
            <div class="space-y-4">
              <For each={entries()}>
                {(entry) => (
                  <div class="border-b border-gray-200 pb-4">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-sm text-secondary">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <p class="text-primary font-medium">{entry.message}</p>
                    <p class="text-primary">— {entry.name}</p>
                  </div>
                )}
              </For>

              <Show when={entries()?.length === 0}>
                <div class="text-center py-8">
                  <p class="text-secondary">
                    No entries yet. Be the first to sign the guestbook!
                  </p>
                </div>
              </Show>
            </div>
          </Show>
        </ErrorBoundary>
      </main>

      <GuestbookModal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
