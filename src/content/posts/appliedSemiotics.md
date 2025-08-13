---
title: "Applied Semiotics: Psychoanalysis for computers"
date: "01-07-2025"
author: "Ryan Prendergast"
slug: "applied-semiotics"
---

In the future I'd like to start a company called Applied Semiotics. "Applied Semiotics: Psychoanalysis for computers". The goal: put an LLM through the mirror stage.

The impetus is a mish mash of ideas and books that have been on my mind for close to a decade. The map and the territory. The "consideration" model of political polling (Zaller). Sign and signifier (Saussure). The bicameral mind theory of consciousness (Jaynes). The mirror stage theory of consciousness (Lacan). The unconscious as signifying chains (Freud, Lacan).

Postmodern theory and research is full of discoveries like "language describes meaning, but also language itself shapes how that meaning is constructed." Language, language, language. And in the past four years, we have been blown away by the sudden intelligence of a simple architecture *language* model. LLMs work as next token predictors, but the exact mechanisms for what it is doing is opaque— ie how specific model weights convert to beliefs and ideas.

There is research into understanding what model interpretability. However as far as I know, nobody is specifically applying postmodern and psychoanalytical theory. To start, I'd like to run these experiments.

**Consideration Generation**

In "The Nature and Origin of Mass Opinion", Zaller writes about the public opinions poll results. He found that the addition / removal / wording of the context preceding the question, affected the result dramatically. His theory was that statements map to "Considerations" in the brain— word images with positive or negative connotations. Rather than answer a question by considering it literally, people conjure the 5-10 closest considerations garnered from the question, sum up the positive/negative connotations, and answer the poll accordingly.

He made no attempt to study considerations themselves, only hoping to show that they exist and affect polls. We pick up where he left off.

**Experiment 1: Considerations Generator**

- Give a trained model (GPT or Claude, eg) a public opinion poll. Tell it to answer it directly and give straight answers. The public poll should either have boolean answers (yes/no), or ideally 1-5 answers (highly unlikely to highly likely)
- Before the poll, prepend a statement. This is the consideration.
- Run the model on the poll with the control consideration. Call this process P(c) where P is running the public poll input with c the consideration prepended.
- Train a secondary model to 1. Generate a consideration c. 2. Run P(c) for that consideration 3. Calculate loss from the target result (which we define as giving 5s to every question). 4. Modify the consideration c according to that loss.
- Finally, given a secondary model which generates a specific consideration for a s

**Experiment 2: Personality Generator**

We can follow the same model as above with a personality test, to train a model with a configurable personality (defined by the Big 5).

The experiment:

- Give a trained model a full personality test. Use a professional Big Five.
- Give the model a context statement before the personality test. As a control, use an empty string.
- For each of the big five traits, fine tune which context statement alters that axis the most to the RIGHT. (Eg: What context statement will get a result

**Towards The Mirror Stage**

In the above experiments, we trained a model to generate considerations that prepend LLM inputs. These experiments alone have a number of practical applications— for any quantitative "Test" (any type of personality test, a political compass test, etc), we can create a Chatbot with the personality of a specific score on that test. Imagine 5 inputs for each of the Big Five personality test, and you can drag each and then chat with a model with that combination of personalities. High consciousness, low neuroticism.

However, I think we can go further. Two more experiments, that I haven't fleshed out, but would be the next step.

**Experiment 3: Explicit Signs and Signifiers**

When we consider the realms of the symbolic, the real, and the imaginary, clearly "a token context" is the unit of the symbolic. What, however, consists the real and the imaginary? For this, fix a particular token as input to inference. Take a snapshot of the parameter activations. Consider these signs! We have a real number mapping of 0-1 of parameters, condense these to a binary sign activation of activated or not. Now sweep across an input state…

I need to do a literature review of model interpretability, because I seem to be rediscovering basic concepts here.

**Experiment 4: Crossing the Bar of Metaphor**

To be determined. The basic idea is: Can we explicitly encode metaphorical substitution in models? Substitute one parameter-cluster for another which is topologically similar in activation-space to another? Perhaps a first experiment in this relies on an interpretability analysis of certain isolatable English words. Take two English words with identifiable activation-centers in a heatmap of the model, and swap the parameters of one for the other. Ie swap the "France" activations for "America" and … see what happens??

**Experiment 5: The Mirror Stage**

The mirror stage is part of the Lacanian theory on the origins of consciousness. A baby sees himself in the mirror and recognizes himself as both himself and not himself. That is to say, he recognizes the image in the mirror as an image of himself, crossing the bar of metaphor for the first time. He substitutes the concept of Me with a symbol (the image of me), and in this substitution begins to understand the world.

If you have more free time than myself, please run these experiments. I'm happy to support any way I can.