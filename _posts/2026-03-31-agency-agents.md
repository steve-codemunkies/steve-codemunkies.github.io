---
layout: 	post
title:  	"The Agency Agents: A pre-built agent library"
description:  "Incorporating AI agents when you're not at the start."
date:   	2026-03-31 20:00:00
categories: ai copilot jekyll
comments: false
page-type: article
hero-image: /assets/2019-01-07-elite-hacking.jpg
tile-image: /assets/2019-01-07-elite-hacking-tile.jpg
---

## TL;DR

This post looks at using [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) — a library of 150+ pre-built AI agent definitions — on an existing project. I picked a handful of the relevant agents and used them with GitHub Copilot to add category pages and redesign how post lists are displayed on this very site.

Copilot did both jobs competently enough, and there are hints the agents shaped the output in useful ways. Whether that's down to the agents or just Copilot is genuinely hard to say. If you've got an existing codebase and haven't yet put much thought into AI agents, this library is a decent starting point. If you've already built your own out, you'll likely find limited value here.

## Introduction

[Last time]({% post_url 2026-03-19-ai-from-scratch %}) I looked at starting a new project using [GitHub SpecKit](https://github.com/github/spec-kit). And the results were impressive. This time I decided to use [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) on an existing project. This website in fact!

I came across agency-agents in a [(gated) medium story](https://medium.com/coding-nexus/someone-built-a-full-ai-agency-with-61-specialists-for-claude-code-its-free-8a3858410635). Reading that article, doing a little research and reading the repository this looked like an approach I was more used to, rather than the SpecKit approach. Agents defined in markdown files, that can be altered as your needs.

## Getting started

And honestly, this is the hardest part. At the time writing there are 150+ agents defined in the repository. And while many have an IT/Development focussed bent, there are a lot that don’t, Sales, Marketing and Academic divisions for example.

The repository does supply [instructions](https://github.com/msitarzewski/agency-agents#tool-specific-instructions) on how to get the agents into your repository, but the question you need to ask is “do I really need that many?” The answer (almost inevitably) is no, no I do not. If, like me, you’re using copilot then cherry picking the agents you’re interested in is easy:

1. Using the links in the front readme, locate the agent (or agents) you are interested in
2. Copy them to your .github/agents folder
3. Rename from `<agent name>.md` to `<agent name>.agent.md`
4. Use!

## Choices. So many choices

The changes that I had in mind to make were to introduces pages for the categories in posts, and surface those in the site. And to redesign the way lists are displayed. Based on this I selected the following agents:

| Agent | Specialty | When to Use |
|-------|-----------|-------------|
| 👔 [Senior Project Manager](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/project-manager-senior.agent.md) | Realistic scoping, task conversion | Converting specs to tasks, scope management |
| 🎭 [Agents Orchestrator](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/agents-orchestrator.agent.md) | Multi-agent coordination, workflow management | Complex projects requiring multiple agent coordination |
| 🎯 [UI Designer](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/design-ui-designer.agent.md) | Visual design, component libraries, design systems | Interface creation, brand consistency, component design |
| 🔍 [UX Researcher](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/design-ux-researcher.agent.md) | User testing, behavior analysis, research | Understanding users, usability testing, design insights |
| 🏛️ [UX Architect](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/design-ux-architect.agent.md) | Technical architecture, CSS systems, implementation | Developer-friendly foundations, implementation guidance |
| ✨ [Whimsy Injector](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/design-whimsy-injector.agent.md) | Personality, delight, playful interactions | Adding joy, micro-interactions, Easter eggs, brand personality |
| 🎨 [Frontend Developer](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/agents/engineering-frontend-developer.md) | React/Vue/Angular, UI implementation, performance | Modern web apps, pixel-perfect UIs, Core Web Vitals optimization |

### Categories. So many categories

The first thing I did was create a set of [requirements](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/display-categories/requirements.md) on how I wanted categories to work. And because AI (like humans) loves context I also provided the [transcript of a previous conversation](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/display-categories/copilot-chat.md).

I asked copilot to generate a plan to implement the requirement, [which it did](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/display-categories/plan.md). Because I'd asked for options on how the categories should be displayed in the page I was given [three options](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/display-categories/plan.md#task-7--display-categories-on-the-post-page-) prefering to go with option 2.

Copilot [implemented my requested changes](https://github.com/steve-codemunkies/steve-codemunkies.github.io/pull/10) competently and after giving them a quick try locally I merged the PR.

### But the lists!

Buoyed by this success I created a new [set of requirements](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/redesign-lists/requirements.md). In the GitHub UI on my phone.

![Showing off](/assets/2026-03-31-showing-off.gif)

Again I asked copilot for a plan, which it [obliged me with](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/plans/redesign-lists/requirements.md), but immediately rolled on to do the implementation. I was half-expecting this, as it's happened a few times that AI has been more eager than I'd like. The good thing that copilot did though is it created it's own branch and [pr](https://github.com/steve-codemunkies/steve-codemunkies.github.io/pull/11). And truthfully I could have merged the branches down without too much bother.

However cowardice won the day and I tested on a laptop before finishing up. And truthfully I'm glad I did. As I've so often seen in the past what I _really_ wanted wasn't _quite_ what I wrote down in the requirements. But it wasn't until the work had been done that I realised my error. Because this was such a trivial problem it was easy to refine the flow and display of the tiles over a few prompts that took around five minutes. And thus we have vibe-coded.

## Was it worth it?

Unlike my experiment with SpecKit, this time it is harder to say. Copilot has done the things I've asked. But those things are not directly comparable to my [previous experiment](https://github.com/steve-codemunkies/dotnet-tool-experiment). It is not obvious that the agent defintions have impacted the outcomes, but it is striking that the UI designer agent contains [this line](https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/08da9f94a32712ce79cc1395612f4b913b0419f7/.github/agents/design-ui-designer.agent.md?plain=1#L22):

> Develop component libraries with consistent visual language and interaction patterns

Without explicitly specifying it in the list redesign requirements the categories displayed on the tiles match the design on the pages. And the tiles also match that same "design language". Do the categories and tiles match the rest of the site? Questionable...

Unlike SpecKit this library of agents doesn't claim to be opinionated, it's entirely up to you how you use the agents. But inevitably the agents themselves contain opinions, and these will be expressed in the AI output.

Ultimately, for me, this librayr is a starting point. It is good for those with existing code bases who have not yet put much effort into AI or AI adoption, or are perhaps unsure where to start. However if you already have agents, and your are building your own agents and skills libraries then this library may be of limited value to you.
