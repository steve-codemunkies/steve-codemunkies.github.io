---
layout: 	post
title:  	"AI from scratch: How to start a project using GitHub SpecKit"
description:  "From zero to ai hero."
date:   	2026-03-18 20:00:00
categories: ai dotnet
comments: false
page-type: article
hero-image: /assets/2019-01-07-elite-hacking.jpg
tile-image: /assets/2019-01-07-elite-hacking-tile.jpg
---

## TL;DR

This blog post investigates how to setup [SpecKit](https://github.com/github/spec-kit), then working through generating a [(relatively) small project](https://github.com/steve-codemunkies/dotnet-tool-experiment). The opinionated spec kit will take you through a version of a SDLC, gathering and verifying user input, allowing movement backwards and forwards through the lifecycle.

For those setting out the rich, highly opinionated nature of the kit is a boon, providing a comprehensive starting point. Whether the kit remains a positive asset as projects are built out remains to be seen.

## Introduction

Recently at work we have been moving towards a more multi-agentic driven workflow, and some of the advances have been amazing. (Some of the missteps have also been truly astonishing, more on those another time.)

Doing this has opened up some new itches, while also reminding me of old itches. But where on earth to start? At work some of this has already been considered, and effort has been put in to create instructions for the AI, and they have been evolving over time. But here at home...

![Nope, nothing done](/assets/2026-03-18-nope.gif)

And this is a problem. To get the best ot of AI you need to provide context. Sure, you can tell the AI to `build me a dotnet tool`, but what exactly will you get out of the process, and almost as importantly (unless you're flinging it away) what kind of state will it be in?

What to do? Well ask AI (Gemini) of course! `I am using vs code and want to build a dotnet tool from scratch use multiple AI agents and spec driven development, how do i start?`


## Getting started

Gemini provided a whole set of instructions, but unfortunately they weren't coherent. They were not instructions that can be followed from 1-10 and ge to the end. But the response did provide some clues, the main one being to use [GitHub SpecKit](https://github.com/github/spec-kit).

When working on my own machine I much prefer to experiment in a [devcontainer](https://containers.dev/), and setting up a devcontainer for this was straight forward.

1. Open VS Code in a new directory
2. Access the Command Pallette (Ctrl+Shift+P) and search for `Dev Containers: Add Dev Container Configuration Files...`
3. Personalise the file, and restart in the dev container

Gemini recommended [some extensions](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/d5b08c92340d6eab4dbb43ef48425cdb006ff620/.devcontainer/devcontainer.json#L30-L39) that I configured in:

```json
    // Configure tool-specific properties.
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-dotnettools.csharp",
                "ms-windows-ai-studio.windows-ai-studio",
                "GitHub.copilot",
                "github.copilot-chat"
            ]
        }
    }
```

Getting _SpecKit_ installed took a little more work, but hardly the stuff of nightmares.

1) Install the [uv](https://docs.astral.sh/uv/) package manager [via a](https://github.com/jsburckhardt/devcontainer-features) [devcontainer feature](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/d5b08c92340d6eab4dbb43ef48425cdb006ff620/.devcontainer/devcontainer.json#L10-L12):

```json
    "features": {
        "ghcr.io/jsburckhardt/devcontainer-features/uv:1": {
            "version": "latest"
        }
    }
```

2) Create a [script](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/main/.devcontainer/postCreateCommand.sh) that will be run after the container is created:

```sh
#!/bin/sh

VERSION=${VERSION:-latest}
REPO="git+https://github.com/github/spec-kit.git"

if [ "$VERSION" = "latest" ]; then
    uv tool install specify-cli --from "$REPO"
else
    uv tool install specify-cli --from "${REPO}@${VERSION}"
fi
```

3) [Configure](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/d5b08c92340d6eab4dbb43ef48425cdb006ff620/.devcontainer/devcontainer.json#L16) the script as a post create script:

```json
    "postStartCommand": "chmod +x ./.devcontainer/postCreateCommand.sh && ./.devcontainer/postCreateCommand.sh"
```

**Note**: Because of the well behaved way Windows deals with file permissions I've found it easiest to simply configure the required permissions on the script before executing. YMMV.

## Setting up SpecKit

Using SpecKit itself is reasonably simple, I started by initialising a new project at the command prompt (I was within the repository):

```sh
specify init .
```

As part of the init process you'll be asked to select your AI tool and select a model. Depending on how you use the tool the model may or may not be relevant. Certainly using it within VS Code the model I select in the chat windows is the one used.

When you've run the init tool you'll be wondering what you've allowed into you dev tool. [SpecKit brings _a lot_ of friends to the party](https://github.com/steve-codemunkies/dotnet-tool-experiment/commit/4b1a3e906fb4ba6a328643df9f18605fa3d2e5c9#diff-49b6e775f0bf0a39ae0e3be926c12d6bc6b7a6f00964fe5d1ce4a89c80b94486). But actually, even with a moments reflection this is why we're here. We need to outsource this early thought to a toolkit, and when that toolkit is aimed at AI it is verbose.

## Using SpecKit

Using SpecKit is easy. The first thing to setup is the [constitution](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/main/.specify/memory/constitution.md). (`/speckit.constitution` in the copilot chat window.) This defines _how_ the project works, it doesn't go near what the project is for.

During the process brief guidance is offered and I gave the tool some keywords based in part on the prompt (I think they were something like `CLI Driven, Test-First and Semantic Versioning`). SpecKit has then taken that input and [spun it into some good rules](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/d5b08c92340d6eab4dbb43ef48425cdb006ff620/.specify/memory/constitution.md?plain=1#L53-L66):

> ### I. CLI-Driven Design
> All core functionality must be accessible and fully operable through command-line interfaces. Features are designed CLI-first; UI/API layers are secondary. Command arguments, options, and  output formats (text and JSON) must support both human operators and automation scripts.
>
> ### II. Test-First Development (NON-NEGOTIABLE)
> Test-driven development is mandatory. Tests are written and approved BEFORE implementation begins. The Red-Green-Refactor cycle is strictly enforced: tests fail → implementation → tests pass → refactor. All public APIs require accompanying contract tests; integration tests validate cross-component workflows.
>
> ### III. Semantic Versioning
> All releases follow Semantic Versioning (MAJOR.MINOR.PATCH). MAJOR version increments indicate breaking changes; MINOR for new backward-compatible features; PATCH for bug fixes and clarifications. All breaking changes require explicit changelog entries and migration guidance.

## My First (AI) Spec

After creating the constitution the tooling then guides you to create your first spec, the prompt I used was similar to `/speckit.specify I want to build a dotnet tool that will load a solution and display the projects and classes in it`. And once more copilot guided by [speckit came up with a very comprehensive spec](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/main/specs/001-solution-loading/spec.md).

Here things can get a bit interesting as the two options you are offered (certainly within VSCode) are to build the spec, or plan the building of the spec. I took the slightly wimpy (but no less enlightening) route of issuing a `/speckit.plan plan an implementation of the spec you have just created`.

The first plan I created was comprehensive, but was also very long on reinventing the wheel. I issued a course correction via the constitution: `/speckit.constitution always use roslyn to work with code, projects and solutions` and a new principle was added:

> ### IV. Roslyn-Powered .NET Analysis
> All analysis of .NET solutions, projects, and source code MUST use the Roslyn Compiler Platform (Microsoft.CodeAnalysis and related NuGet packages such as Microsoft.CodeAnalysis.Workspaces.MSBuild and Microsoft.Build.Locator). Direct text-based or regex parsing of .sln, .csproj, or .cs files is prohibited. Roslyn APIs provide semantic correctness, proper symbol resolution, and IDE-grade fidelity that text parsing cannot reliably deliver. Any feature performing static analysis, class discovery, or project structure inspection MUST open a Roslyn Workspace and operate on the semantic model.

## My First (AI) Implementation Plan

Again, SpecKit makes things easy, two potential hand-offs are provided:

* `/speckit.clarify` - which identifies underspecified areas in the current feature spec by asking up to 5 highly targeted clarification questions and encoding answers back into the spec.
* `/speckit.plan` - which executes the implementation planning workflow using the plan template to generate design artifacts.

In this instance I was interested in planning out the implementation, and [what a plan!](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/306b81666af9911d244faee87a6082a85b7f11f3/specs/001-solution-loading/plan.md) I've had some previous experience with using AI to plan work. Asking the AI to analyse a spec and then plan out the implementation tickets, with a prompt similar to the following:

```text
Analyse the attached spec, and other attached context, and determine how best to implement the spec. Each step on the process should be small, with a maximum of 15 files modified. After each step leave the code in a buildable and deployable state. 
```

Except... This never really worked, and needed to be iterated on multiple times. This time though the plan is comprehensive and well thought through, cross referencing the project constitution, describing the strucutre and code that will be created, implementation phases and testing strategies. But at the [same time](https://github.com/steve-codemunkies/dotnet-tool-experiment/commit/306b81666af9911d244faee87a6082a85b7f11f3#diff-789a6d6cfe4c58fd9c632312e2d7dc2609d39bedc04d396cd2e810e806afeb7a) lots of other information was created:

* [A document detailing the CLI contract](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/306b81666af9911d244faee87a6082a85b7f11f3/specs/001-solution-loading/contracts/cli-contract.md)
* [A document detailing the project data model](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/306b81666af9911d244faee87a6082a85b7f11f3/specs/001-solution-loading/data-model.md)
* [A research document](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/306b81666af9911d244faee87a6082a85b7f11f3/specs/001-solution-loading/research.md)
* and lastly a [quickstart guide](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/306b81666af9911d244faee87a6082a85b7f11f3/specs/001-solution-loading/quickstart.md)

## But what's next?

And this is where things got slightly stuck for me. The two options that SpecKit were not expected:

* `/speckit.tasks` - which generates an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
* `/speckit.checklist` - which generates a custom checklist for the current feature based on user requirements.

A minute or two reading the agent definitions showed that I wanted to run `/speckit.tasks` which created a [very detailed, granular implementation plan](https://github.com/steve-codemunkies/dotnet-tool-experiment/commit/8faa45fc88db200af869aab692fc7dd848497160). And from there `/speckit.implement` was the obvious choice.

## Was it worth it?

For around an hours invested time this was absolutely a worthwhile endeavour.

The agents themselves take you through the lifecycle of a feature, or project, in a structured way. Beyond finding the `specify init .` command in the [SpecKit Readme](https://github.com/github/spec-kit#1-install-specify-cli) everything else I worked out simply by looking in the agent files.

I have a tendency to create many commits as I work, and whether using Spec Kit, or another framework have found this to be incredibly useful. It has allowed me to understand what and how the AI is doing, but it also makes it simple to reverse out changes that are wrong.

If you have knowledge and/or experience of AI and want to go down the Spec Driven Development route, but haven't invested in setting up agents then Github SpecKit is absolutely worthwhile investigating. As with many things from Microsoft it is thorough. And in the world of AI thorough (in my experience) is better than brief.

Analysing the supplied agents and other tools and documents with copilot reveals that SpecKit provides a coherent, highly opinionated SDLC pipeline that is easy to implement. Ask the right questions and AI will make multiple recommendations on how the kit can be improved. The [constitution.md](https://github.com/steve-codemunkies/dotnet-tool-experiment/blob/main/.specify/memory/constitution.md) is picked out as a particularly strong document.

And to be honest right now, for me, this is the point. SpecKit provides a starting point. It's all text that is easily read and understood. And when you do that you can work out what you don't like and begin to change it. Of course how you might re-use those modifications is a different story.
