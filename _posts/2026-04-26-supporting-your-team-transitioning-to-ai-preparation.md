---
layout: 	post
title:  	"Supporting your team transitioning to AI: Preparation"
description:  "Remember the 7Ps: Proper Planning and Preparation Prevents Poor Performance"
date:   	2026-04-26 19:45:00
categories: ai copilot leadership
comments: false
page-type: article
hero-image: /assets/2026-04-28-ai-banner.jpg
tile-image: /assets/2026-04-28-ai-tile.jpg
---

**TL;DR**: When used correctly AI can be a powerful force multiplier at the level of each individual in your team. But thoughtlessly directing your teams could cause more problems and long term damage than you're expecting. In this post I take you through some of the ways that you can prepare yourself and your teams to introduce AI.

* Table of contents here
{:toc}

This blog post begins with a story...

## Once upon a time...

In the dying days of 2025 the Engineering Manager came to the conclusion that his teams needed help, and the help that they needed was AI. And it was decided that the best way to do this was through AI Assisted Spec Driven Development (though to be honest, the specific methodology is unimportant).

The Engineering Manager and his Team Leads held meetings with the teams where the virtues of AI were extolled. When asked _how_ they should apply this new tool the teams were told...

![AI ??? Profit!!!](/assets/2026-04-26-profit-meme.jpg)

And so teams asked for help and guidance. They were told they shouldn't need guidance because they should be keeping up with the latest developments in AI. Youtube videos were found and when the team tried the techniques described none of it worked.

Productivity suffered, and much time was spent with developers trying to help developers get their heads around this new way of working.

As time progressed and the team got to grips with the new tool it became apparent that speeding up development created problems elsewhere.

Unfortunately I have seen this exact scenario played out, with all of the consequences described and more.

The reasons why these teams ended up in this position are many, and beyond the scope of this blog post. But what I will describe here are _some_ of the ways that those teams could have been helped by their leaders, and how you can help your teams.

## AI is just a(nother) tool

In the same way that a good leader can be a force multiplier for a team, AI has the ability to be a powerful force multiplier for individual developers. Not only does it speed individuals up, but it can also imbue them with new skills, rapidly. In the last few months I have used AI to:

* Help me understand and visualise the interactions, control and data flows of complex systems.
* Generate documentation to work on changes for myself and others.
* Generate and test a new feature in under an hour, that would previously have taken a far better developer than me around a week to complete.

But as with previous tool transitions such as the move to Cloud Computing, and the tools that that caused to change, the introduction of improved more widespread CI/CD pipelines, containerisation, docker and kubernetes, and Infrastructure as Code, those who take a breath and think before diving in both feet first _might_ end up best placed to benefit and advance. In the same way that you would plan to introduce any other new tool, you should plan to introduce AI into your team. But...

## What is it you want, and why?

Without a clear answer to this question, even well-intentioned leaders fall back on jargon. Imagine one of your team members comes to you and asks: "But Steve, why are we doing this?"

If your answer sounds like:

"It's the next big thing. We need to stay ahead of the curve. The industry is moving fast and we need to move with it."

...your team member will walk away none the wiser. They don't know what to do differently tomorrow, or why. They don't know what success looks like. They don't know how to prioritise AI over their existing work. But if your answer was more like:

"Our deployment pipeline takes too long and our boilerplate code is slowing us down. I want us to use AI to cut the needless busywork, so we can spend more of our time on the hard problems that actually require our expertise."

Now your team member will be enthused, they can act on your request to use more AI. They know where to start, they know what the goal is, and they can come back with ideas of their own. And they will help you to bring the whole of the team along on the journey.

So what _are_ some of the real reasons why you might want your development teams to use AI?

### Reducing "Developer Toil" and improving delivery velocity

Unfortunately a lot of development is writing code that is the software equivalent of food prep in a kitchen, or wood prep in carpentry. It's necessary to make the software work, and the process work efficiently, but that doesn't mean you like doing it. As [Scott Hanselman wrote](https://www.hanselman.com/blog/do-they-deserve-the-gift-of-your-keystrokes):

> There are a finite number of keystrokes left in your hands before you die.

And this applies as much to writing boiler plate as it does to writing e-mails. And because boilerplate is so ubiquitous on the internet and in your codebases AI is very good at making this go much faster.

By reducing the boilerplate that your team is churning out they will be better placed to deliver new functionality, faster. Being the first to market can have its [advantages](https://en.wikipedia.org/wiki/First-mover_advantage). Over the last fifteen or so years various Minimum Viable Product and Lean methodologies have been adopted to try and gain this first mover advantage. Again AI really helps here by allowing faster development of features, automation of qa on those features and even more rapid prototyping.

### Improving software quality and reliability 

Arguably harder than creating the software in the first place is keeping it upright: "[prevention is better than cure](https://dictionary.cambridge.org/dictionary/english/prevention-is-better-than-cure)". What do [CrowdStrike](https://www.theguardian.com/technology/article/2024/jul/19/what-is-crowdstrike-microsoft-windows-outage), the [NHS](https://www.theregister.com/2018/10/12/nhs_wannacry_update/) and [the Post Office](https://www.theregister.com/Tag/Fujitsu/) have in common? Faulty software causing chaos and misery.

But once more, AI can lend a hand; helping to detect bugs before they slip in to the wild by detecting code smells and vulnerabilities before they leave the developers machine. By reducing the Mean Time to Repair (MTTR) in incidents with quicker diagnosis and fix suggestions. And by assisting developers with complex refactorings. In fact I have experienced this last one myself recently, when I built a new feature. The AI created the code and a fantastic test suite. But the code sucked mightily. The prompt I supplied the AI went something like: 
  
> This code does not look good, and is not extendable. We already know that we are going to need to extend the code to further markets in the near future. Please refactor the code using the Strategy pattern and to be more SOLID.

Within 10 minutes ~500 lines of code had been transformed and reduced, and a markdown file created detailing how to extend the functionality. Even on my best days you'd be hard pressed to get the documentation out of me 😂. 

### Managing and understanding complexity

If the production of something like a [pencil](https://markmargolis.me/2025/04/16/complexity-from-simplicity/) is mind-shatteringly complex, then modern software systems deal in complexity orders of magnitude greater. It is all but impossible for any normal, well adjusted person to hold the entirety of a complex system in their head. And yet we try to do it (see my comment above about documentation).

AI is able to help here as well, digesting, understanding and simplifying reams of code to regurgitate in your preferred format.

### Filling skill and people gaps

Perhaps the most contentious reason for adopting AI. A lot of [people have concerns around AI replacing jobs](https://www.theguardian.com/technology/ng-interactive/2026/feb/20/ai-future-work-technology-white-collar), whether they are coming into IT or are already in IT. The more widespread adoption of AI will have an impact on careers in IT. Will it all be positive? No. Will some people lose their jobs? Probably, yes. But this cycle has been seen before, for example with off-shoring. And now companies are looking at bringing jobs back in house so that they are under their sole control. IT has always been about change, and will continue to be about change.

Software developers, Solution and Technical Architects, UI/UX developers and Designers, and everyone else involved in your software lifecycle are both expensive and scarce. It's typically extremely hard to make a team of developers appear, and even if you do you have to have someone (or more likely someones) to support them. AI can help here as well, allowing developers and others to quickly upskill and apply skills from one area to another (even I can say "I want a page that looks like that, but in purple and green").

## Invite your team into the change

Hopefully coming across here is _purpose_: purpose in the reasons for wanting to adopt AI. This purpose can then be translated into meaningful actions by your teams. By scraping away the shiny surface and understanding why _you_ want a change you help your teams come to terms with the change, and make change quicker.  Without articulating your purpose, your teams may be left:

* Unsure why you want them to adopt AI.
* Unsure how they should adopt AI, what guardrails and constraints they have to operate within.
* Unhappy and demoralised.

I was very careful above to use the phrase "make change quicker". By taking your team through the change that you want and your reasoning you are inviting the team in, and they will be encouraged to contribute. And this may take you and your team down different routes. This is healthy and normal.

## So what does success look like?

Our Engineering Manager decided that the right measures are the number of premium requests used and the number of lines of code changed. Going down this route reveals that, despite years of evidence, the Engineering Manager (and presumably his seniors) value quantity of output over and above quality and outcomes.

Measuring success in this way creates harmful incentives: as sure as night follows day the developers are incentivised to "burn" (literally and figuratively) expensive premium requests; the generation of reams of questionable code is lauded - all fulfilling [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law).

> When a measure becomes a target, it ceases to be a good measure.

Another problem with this approach is that those most likely to succeed are the ones you maybe want to be watching more closely - junior developers who don't know better and the happy cavalier developers who will push anything to prod safe in the knowledge it's not their issue. And this then knocks on, with your conscientious developers fighting a rising tide of [AI Slop](https://en.wikipedia.org/wiki/AI_slop), and being vilified for it.

### Using your "why" to define success

So again we're left with the question "What does success look like?". Happily you've worked out your what and your why, so you have already started working this out by defining the _purpose_ for this change.

Let's say that you're asking your team to use AI because you want to improve software quality and reliability. There are **hard facts** that you can use to quantify the before and after:

* The time it takes to get a PR reviewed and implemented.
* The number of errors that are being logged per '000 API calls/events processed.
* The number of incidents requiring resolution that are being raised.

And you doubtless have plenty more metrics that can be used as well. Because they have _purpose_, the other scenarios should also suggest within them how you will be able to track the successful adoption of AI, or otherwise.

### Team health and wellbeing

But humans are not cold, hard, ~~merciless,~~ unfeeling machines, unlike AI. So you need to keep an eye on that side of success. Good leaders will be following their teams confidence, stress and workload, and be ready to jump in if it all starts heading south.

## How do you get to success?

You know why you want your team to adopt or accelerate their adoption of AI. You've considered what success looks like, both in terms of hard metrics and team health and happiness. You're good to go. Right? Well no, unfortunately, there's still an awful lot to work out before you send the team off.

### People and Skills

As a leader your team's health and happiness is one of your primary concerns, because you know that a happy team is a performing team. It's also your team (ultimately) who will decide whether the plan actually works; you can present to your peers and seniors as much as you like, but if you don't consider and consult with your team nothing much that you want will happen.

Your first step should be assessing your teams current adoption of AI tools. There are multiple ways to assess the readiness of your team, but I like the [six levels of individual adoption by engineers](https://medium.com/@strv/the-six-levels-of-ai-adoption-engineers-go-through-cc232da8291a):

1. The Skeptic - has limited hands on experience.
2. The tourist - uses AI occasionally, but not in a daily workflow.
3. The Assisted Coder - using AI in the IDE for autocomplete and boilerplate.
4. The Prompt Driver - delegates well defined tasks via prompts.
5. The AI Native - AI-first, reviewing output over production.
6. AI Architect - Designs systems with AI as a first class participant.

It's easy to assess yourself and your teams against these descriptions, and it will help you get an idea where people are. However it won't be straight forward. For example I feel that I fall into The Prompt Driver, The AI Native and the AI Architect depending on the precise task I'm working on, and even occasionally I drop all the way back to being The Skeptic (usually driven by an inability to get AI to do anything). Your purpose in adopting AI will drive where you think you need to get your team to in terms of their skills.

### Tools

If you want your team to go all in and become AI Natives and AI Architects, leaning on free plans is, frankly, not going to get you very far. At the same time [tools are getting more expensive](https://www.theregister.com/2026/03/12/users_protest_as_google_antigravity/) and [providers are finding new ways to manage demand](https://www.theregister.com/2026/03/26/anthropic_tweaks_usage_limits/). Just this last week I became aware of developers on a Claude Code pilot using half ($50!) of their credits in one(!) afternoon, because they were unaware of the constraints and were using the newest Opus 4.7 model for everything.

The other thing that I see happening is that restrained, well behaved users are burning through their limits as they become more adept at applying AI to their workflows. You will need to consider what happens as teams _approach_ their usage limits, will they be able to get more tokens? How will they get those tokens? Who will make the decision? What will the criteria for the decision be? And this needs to be ironed out at the start, as those free models are pretty unusable once you've used the newer models, especially in terms of speed and quality of output.

Finally one more thing that you as an experienced leader will already have considered is your organisational constraints. It's great telling your teams that you are going to use `super-whizzy-coder-17b` for everything, but unless your security and legal teams are happy you could end up in some serious hot water. And what about all that code generated by the AI? How are you going to identify that to your legal team? Comments around modified sections? Header comments?

### Processes

When everything works (you are a good leader with good teams working for you, after all) you will suddenly realise that the new workflows are causing strains within existing processes. If you're in a nimble, light touch environment changes will have been made as you progress, and in reality you won't see much of this.

But if you're working in a rigid system, with responsibilities clearly demarcated, as I have been seeing, then there will be struggles. The best thing to do is to understand how those systems actually look and work on the ground; not how they are described in wiki pages.

Up front (ideally with your team) you will have understood how your internal processes will be stressed, and how the team can adapt. But also talk to your external stakeholders, understand their constraints. Communicate how you are intending to change and the effects you hope to see.

## Plan for success

As a successful leader you know that success doesn't usually happen by accident. Usually it involves lots of preparation and planning. It also involves the skill to adapt and take your team with you, as well as a dollop of good luck. Once you've got your plan, you (and your teams) need to execute it. We'll look at this in the next post.
