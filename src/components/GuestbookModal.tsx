import { createSignal, Show, createEffect } from "solid-js";
import type { Component } from "solid-js";

export interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, message: string) => Promise<void>;
}

const GuestbookModal: Component<GuestbookModalProps> = (props) => {
  const [name, setName] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!name().trim() || !message().trim()) {
      setError("Name and message are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await props.onSubmit(name().trim(), message().trim());
      setName("");
      setMessage("");
      props.onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting()) {
      setName("");
      setMessage("");
      setError("");
      props.onClose();
    }
  };

  // Close on escape key
  createEffect(() => {
    if (props.isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isSubmitting()) {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  });

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-background border border-gray-200 rounded-lg max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold font-headline text-primary">Sign Guestbook</h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting()}
              class="text-secondary hover:text-primary transition-colors disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-primary mb-1"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                maxLength={50}
                disabled={isSubmitting()}
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary bg-white text-primary disabled:opacity-50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-primary mb-1"
              >
                Message *
              </label>
              <textarea
                id="message"
                value={message()}
                onInput={(e) => setMessage(e.currentTarget.value)}
                maxLength={500}
                rows={4}
                disabled={isSubmitting()}
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary bg-white text-primary disabled:opacity-50 resize-none"
                placeholder="Leave a message..."
              />
              <div class="text-xs text-secondary mt-1">
                {message().length}/500 characters
              </div>
            </div>

            <Show when={error()}>
              <div class="text-red-600 text-sm">{error()}</div>
            </Show>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting()}
                class="flex-1 px-4 py-2 border border-gray-300 text-primary rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting() || !name().trim() || !message().trim()}
                class="flex-1 px-4 py-2 bg-primary text-white rounded hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {isSubmitting() ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};

export default GuestbookModal;
