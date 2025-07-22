import { Title } from "@solidjs/meta";
import Nav from "~/components/Nav";

export default function Home() {
  return (
    <div class="min-h-screen bg-background font-body relative">
      <Title>Ryan Prendergast</Title>
      <Nav currentPage="/" />
      <main class="max-w-2xl px-4 pb-12 pt-12">
        <h1 class="text-4xl md:text-6xl font-bold text-primary leading-tight tracking-wide pb-8">
          RYAN PRENDERGAST
        </h1>
        <p class="text-lg text-primary mb-4">
          Hi! I'm Ryan. I'm currently working on{" "}
          <a
            href="https://zenobiapay.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-primary hover:opacity-70 transition-opacity"
          >
            Zenobia Pay
          </a>
          . Our mission is to end the Visa / Mastercard duopoly, and make it 3x
          cheaper to transact online.
        </p>
        <p class="text-lg text-primary mb-4">
          Some hobbies that I enjoy and like to talk about. I enjoy{" "}
          <a
            href="https://www.youtube.com/playlist?list=PL-evJxq7wCJNhu6jh8QCcj_4PiycBDEOW"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-primary hover:opacity-70 transition-opacity"
          >
            amateur filmmaking
          </a>
          . I've played{" "}
          <a
            href="https://www.youtube.com/playlist?list=PL-evJxq7wCJPwhV7P91uooPOauMSX-UbE"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-primary hover:opacity-70 transition-opacity"
          >
            electric guitar and sang
          </a>{" "}
          in a couple bands. I like to write. To describe my writing in a
          sentence: "alien dropped on earth writes a movie review to remember
          what he sees."
        </p>
        <p class="text-lg text-primary mb-4">
          I like to meet new people, and I'm especially interested in people
          with niche problems or professions. My calendar is open at{" "}
          <a
            href="https://calendly.com/rprendergast1121/ryan"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-primary hover:opacity-70 transition-opacity"
          >
            calendly.com/rprendergast1121/ryan
          </a>
          .
        </p>
      </main>

      {/* Right-side asterisk element */}
      <div class="fixed right-6 top-1/2 transform -translate-y-1/2">
        <div class="w-6 h-6 bg-gray-800 flex items-center justify-center rounded-sm">
          <span class="text-yellow-400 text-sm font-bold">*</span>
        </div>
      </div>
    </div>
  );
}
