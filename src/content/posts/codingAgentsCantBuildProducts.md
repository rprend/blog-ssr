---
title: "Coding agents can't build products"
date: "12-02-2025"
author: "Ryan Prendergast"
slug: "coding-agents-cant-build-products"
original: "https://dolphinmade.com/blog/architecture/"
originalSite: "Dolphin"
---

Coding agents fail when you ask them to build products.

I told a coding agent to "make Twitter." It made something that looked like Twitter. The code was a disaster. Half didn't work; the other half was a tangled mess that would take days to untangle. The agent made dozens of architectural decisions on the fly:

-   What framework?
-   How do you store state on the client? On the server?
-   How do you load state onto the page, and when?
-   Where are the types? Do they already exist? Should I make new ones?
-   How can the user interact with this page?
-   What happens when the user makes a change?
-   Where is the UI state? Should I create new state objects?
-   How are changes saved to the database? How are they updated on the client?

When I code with Claude Code, I don't have this problem. I make the architectural decisions. I give technically-specced instructions, something like:

> On this page, create a SolidJS resource that calls the /load endpoint to load the page data (put the fetch call in apiClient.ts and add the types to request-response-schemas). Wrap the page content in a Show that displays a skeleton state while the resource is loading. Then create a pageContext.tsx file, set it up the same way we have dashboardContext.ts, and wrap the page content component in a provider. Pass the loadPageData response into the context as a prop and use that to initialize a createStore. The context provider should have: store, actions, and derived. Leave actions and derived empty for now; have store initialized with the data from /load. Great.

I decide the architecture. That's the only way it works.

## II.

Previously, I worked at Bubble, the world's most complicated web app: a web app that builds any other web app. Teddy and I have spent thousands of hours making web apps between us.

When you spend that much time solving the same kinds of problems, you develop opinions. Really, it's a bag of tricks. You encounter a new problem, you fit it to your bag of tricks.

Our thesis when we started Dolphin: vibe-coding working products requires a builder with opinions. It needs to architect the thing itself. To achieve this, we don't send user prompts directly to a coding agent. Prompts go through a two-step Planner/Coder system.

![Planner Chat](/dolphin-planner-chat.png)

The planner chat talks with you at a high level, asks follow-up questions, and when it has sufficient information, it writes a Task. A Task is a technical spec; it reads like what I would send to Claude Code.

Our builder isn't general purpose. It can only build apps in the Dolphin architecture. This architecture is the best architecture for building a SaaS startup, which is why Dolphin is a startup in a box.

## III. What is the Dolphin Architecture?

You might think tech stack. MEAN stack. Hono + Cloudflare workers. Next.js + Vercel. These are part of an architecture, sure. But we mean something more basic.

**The Dolphin Architecture is a bag of tricks.**

To define it precisely: a trick is any descriptive statement that's either true or false. A trick is a lint script. A trick is a lint script that takes some files and returns true or false.

The Dolphin Architecture is a list of opinions based on our experience building web apps. Here's a sample: opinions for modifying a dashboard page called Dashboard:

1.  Dashboard is a folder in the client directory with an index.html, an index.tsx, and a DashboardContext.tsx.
2.  There is a single /load endpoint that loads all state for the page.
3.  On page load, a skeleton state shows while get-session is called. We handle auth redirects. Another skeleton shows while /load fetches. The data from /load is passed as a prop to a context. The context has a SolidJS store with the loaded state.
4.  Every fetch call lives in dashboardApiClient.ts. Each fetch goes through checkResponse, which shows a toast on any unexpected response codes.
5.  Every fetch call has a FetchRequest and FetchResponse type in request-response-schemas.
6.  The only fetch calls in the page are /load and /save.
7.  There's an AutosaveService that takes an event definition via an emitEvent function, debounces, then calls the /save handler.
8.  Events are serialized data. There's a pageEvents file on the backend with the types for each event and a handler for that event type.
9.  There are no types in subcomponents. Everything is imported from our types primitives and shared types folder.
10. There is no state defined in subcomponents. All state lives in the store.

We enforce these opinions with a combination of scaffolding, skills, and lint scripts.

## IV. How to make a startup in a box

### Scaffolds

Every page in a Dolphin app is scaffolded with a CLI tool. There are about ten page types. The CLI scaffolds the files for the client UI, AutoSave, the ApiClient. It inserts load/save endpoints to the backend routes file, adds the route to the vite config, and so on.

A page type is the most abstracted purpose of a page:

-   A **dashboard page** has a load and a save; the UI comes with a sidebar.
-   A **feed page** has load and save endpoints; load takes an optional cursor; the UI has infinite scroll with lazy load.
-   A **gallery page** has just a load (no save) and defaults to a grid layout.
-   An **item page** requires an ?id= search parameter, with load and save endpoints.
-   A **static page** has no JavaScript, just HTML.

We templated and scaffolded as much as we could. This improves accuracy because the code self-documents. When a coding agent modifies a file, it first reads that file and mimics existing structures.

Here's a typical vibe-coding problem: "I want every endpoint to ignore errors because they'll bubble up to the shared Hono error handler. But the coding agent wraps everything in a try/catch anyway."

Self-documented code solves this. The agent mimics how it was done before.

### Skills

The next problem: conditional context.

Here's a typical example. I'm about to kick off Claude Code. If it's likely to modify the database schema, I want to include a line: "after schema changes, always run the migration script with pnpm run db:migrate:dev." But if I include that line and it doesn't modify the schema, the context was irrelevant and slightly confusing. It might even run the migration script anyway — LLMs are advanced toasters, and it did read "always run the migration script."

There are thousands of things like this. Every task only needs 20% of the prompt, but it's a different 20%. If you pollute the prompt with too much irrelevant context, things go off the rails.

Anthropic solved this problem with Skills.md. When the planner creates a task, it assigns one of a few dozen types: modify-database-schema, create-dashboard-page, modify-dashboard-page, etc. Each task type corresponds to a Skill.md that conditionally injects the relevant context.

### Lints

We've begun turning our opinions into lint scripts. These aren't general-purpose. They're heuristics based on syntax, encoding opinions like "every fetch call lives in dashboardApiClient.ts" and "each fetch goes through checkResponse." They're small and Bun-based and fast. We can run hundreds of them.

## V. The long run

We use planning, scaffolding, conditional prompting, and linting to force Claude Code to have our opinions. It is incredible. Dolphin builds products as complex as Twitter in one shot.

The future of the coding agent is for those opinions to live on the model itself. Claude Code should come in flavors. One such flavor? Dolphin.

This is what we plan to do. Since our tricks are lint scripts, we have a boolean ruleset for whether code matches or doesn't. We can use that as a judge for post-training an open-source coding model. The resulting model would have our opinions baked in.

Another research direction: building the best eval for product correctness using browser-use agents. Our event-driven approach for user interaction means we have a list of everything a user can do on a page, which gives us a natural test suite.
