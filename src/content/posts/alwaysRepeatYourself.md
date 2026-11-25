---
title: "ARY: Always Repeat Yourself"
date: "02-04-2026"
author: "Ryan Prendergast"
slug: "ary-always-repeat-yourself"
original: "https://dolphinmade.com/blog/ary-always-repeat-yourself/"
originalSite: "Dolphin"
---

Every programmer learns DRY (Don't Repeat Yourself). If you're writing the same code in three places, abstract it into a function. The reasoning is solid: code changes, and when it does, you want to change it once, not hunt down three separate copies and pray you updated them identically.

When you're building with AI coding agents, DRY is terrible.

At Dolphin, we're building an opinionated AI engineer, which means I spend a lot of time tinkering with how to architect code so that agents succeed more often. One lesson I keep relearning is counterintuitive: for AI-maintained codebases, you want the opposite of DRY. Call it ARY: Always Repeat Yourself.

## II.

Suppose you're building a social media app. You have a main feed page where users scroll through posts, and a dashboard page where they manage their profile and settings. These pages share some DNA. Both need to fetch user data, both render lists, both handle loading states.

The DRY instinct screams: abstract the shared logic! Create a unified data layer! Build reusable components!

What I've found, repeatedly, is that keeping these pages as entirely separate code paths (separate frontend folders, separate backend handlers, separate request-response types) produces better outcomes when an AI agent is iteratively building up the product. Even when the event handlers do almost the same thing.

Why? The most important property of AI-maintained code isn't code elegance; it's that failures are obvious.

## III.

Abstractions, when they break, break in opaque ways. You change something in the shared data layer, and suddenly the profile page throws a cryptic error. But you've been working on the feed page for the last hour, so you have no idea the two are connected.

Repeated code breaks differently. If the feed page and profile page are genuinely separate, then changing one can only break that one. The cause is obvious. You fix it and move on.

This matters more for AI agents than for human programmers. A skilled human can hold the abstraction in their head, trace the dependencies, reason about the system holistically. An AI agent is stupider. A heuristic that I use: "could I personally figure this out exhausted, drunk, or hungover?". When code is self-contained and naive, hungover me or the AI agent succeeds. When that code is a thin layer over a web of abstractions, the agent hallucinates fixes that don't fix anything.

## IV.

You might object: doesn't this mean your codebase becomes a sprawling mess of duplicated logic? What happens when you actually need to change something everywhere, like a security fix or a data format migration?

Fair point. The answer is that you're trading one kind of difficulty for another. Yes, you'll occasionally need to update the same logic in multiple places. But that failure mode is obvious and mechanical. You grep for the pattern, you update each instance, you verify each one works. Compare that to the failure mode of broken abstractions: subtle, invisible, discovered thirty minutes after the actual mistake, with no clear trail back to the cause.

For AI-maintained code, take the obvious problem over the subtle one.

## V.

The general principle: if an abstraction isn't 100% airtight, you're better off with the naive solution.

This doesn't mean abandoning all abstractions. We still use package managers, TypeScript, SolidJS: the bedrock stuff that's been battle-tested by millions of developers. But the code the agent writes on top of that bedrock should be as non-abstract as possible, as naive as possible, and as close to the simplest possible implementation as you can get.

DRY was wisdom for an era when humans maintained code. In the era of AI agents, the new wisdom might be: if in doubt, repeat yourself.
