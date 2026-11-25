---
title: "Every Bug Report Has Four Parts"
date: "02-07-2026"
author: "Ryan Prendergast"
slug: "four-parts-of-a-bug-report"
original: "https://dolphinmade.com/blog/four-parts-of-a-bug-report/"
originalSite: "Dolphin"
---

There are always four parts to a bug report.

I learned this by watching someone fail to use my software. We're building Dolphin, an AI coding agent for non-technical business owners. A user had a bug: when he opened the sidebar, the main content shifted rightward and he didn't want it to. His report to Dolphin was: "its accordioning and I don't like it. Change that."

The AI made assumptions about what "it" referred to, what "accordioning" meant, and what "change that" implied. It assumed incorrectly on all counts. The bug persisted; the user got frustrated.

The user wasn't wrong to describe it that way. "Accordioning" is a perfectly vivid metaphor for what he saw. The problem is that vivid metaphors are terrible for bug reports. When you say a webpage is "accordioning," you're invoking a mental model. But the AI doesn't have your mental model. It has to reconstruct what you're seeing from the words you give it, and metaphors leave too many degrees of freedom.

## II.

So I needed to add a thinking layer to Dolphin that could recognize when it didn't have enough information to file a bug report. But that raised a prior question: what counts as "enough information"?

A friend in law school once showed me a passage from a textbook that claimed there are only four ways to disagree with someone in academic discourse:

1.  Show where the person is uninformed.
2.  Show where the person is misinformed.
3.  Show where the person is illogical.
4.  Show where the person's analysis is incomplete.

Every legitimate academic objection fits one of these categories. The framework stuck with me because it promises completeness: a finite list that exhausts the space of possibilities.

I wanted a similar thing for bug reports. What are the necessary and sufficient components?

## III.

Here's what I came up with:

1.  **Where does this happen?** Which webpage, and where on that page. This sounds obvious but people omit it constantly. "The button doesn't work" is not sufficient; "the button that says 'submit' on the checkout page" is.

2.  **What conditions were present before the bug appeared?** In principle, this means every mouse click and keyboard press from page load to the moment of failure. In practice, it means enough of a reproduction path that someone else could trigger the same bug.

3.  **What happened, described in physical terms?** No analogies. No "accordioning." You can say "the left edge of the content box moved to the left" or "the text turned red." You cannot say "it got weird" or "it broke." Physical vocabulary only: things a camera could record.

4.  **What should have happened?** Same format as #3, but describing correct behavior. "The left edge of the content box should have stayed fixed" or "the text should have remained black."

That's it. Four parts. A bug report missing any of these is incomplete; a bug report containing all four is (in principle) actionable.

## IV.

What makes this framework useful isn't that it's surprising. None of these four components will shock anyone who's filed bugs before. What makes it useful is that it's exhaustive and checkable.

When my user typed "its accordioning and I don't like it," he failed on three of four counts. He had #4 (implicit: "I want it to stop"). But he was missing #1 (where exactly?), #2 (what triggers it?), and he violated the physical-description requirement of #3.

The AI couldn't have known this without a rubric. Now it has one. When any of the four components is missing, Dolphin can ask specifically for that component instead of guessing.

Whether this generalizes beyond bug reports is an interesting question. The academic-disagreement framework suggests these exhaustive decompositions might exist in more domains than we expect. When you're trying to communicate a problem to a system (human or AI) that lacks your context, maybe the answer is always: specify the location, the conditions, the physical reality, and the desired state. But I don't have a good sense yet of where the boundaries are.
