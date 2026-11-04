---
title: "Has AI Hit a Ceiling? The Next Revolution Lies Beyond LLMs"
summary: "How harnesses and decision models are shifting part of artificial intelligence's progress toward the systems that organize, verify and execute work."
date: "2026-11-04"
categories: [ia, engenharia]
cover: "/articles/harness-ai.png"
coverAlt: "Sign with the Anthropic name on the facade of an office building, with sunlight reflecting off it"
draft: false
---

In recent years, the progress of artificial intelligence has been framed as a race for scale. More data, more computing power and bigger models fed the expectation that each new generation would deliver an obvious leap in intelligence.

That logic put training at the center of the competition. The question was how large a model could become and which capabilities would emerge from that expansion.

But turning capability into work takes other pieces. A model can write a program without checking whether it runs. It can produce a convincing analysis from outdated information. It can solve individual steps of a project and lose important decisions before reaching the end.

This is where harnesses become relevant.

A harness is the software structure that organizes how a model operates: it connects tools, manages context, records progress and coordinates the cycle between decisions, actions and results.

The rise of this layer, along with the emergence of models specialized in decisions, suggests a change of direction. Part of AI's progress now depends on how its capabilities are organized during use.

This does not prove that LLMs have stopped improving. It shows that training a bigger model is only one way to build a better system.

## The Limits of the Race for Scale

The hypothesis that models have hit a definitive ceiling needs to be handled with care. There is no evidence that LLM progress has abruptly ended. There are constraints on continuing certain expansion strategies.

One of them is data availability. In a study updated in 2024, Epoch AI researchers estimated that, if certain trends hold, training datasets could reach the size of the available stock of public human-generated text between 2026 and 2032. The work also discusses ways to keep advancing, such as synthetic data and improvements in learning efficiency. ([Villalobos et al.](https://arxiv.org/abs/2211.04325))

The problem, then, is how to sustain progress when scaling up resources requires new solutions.

There is also a gap between technical performance and economic usefulness. A system that solves a task after many attempts may be interesting as a demonstration, but it has to justify its cost before it becomes part of everyday operations.

For a company, that gap shows up as a concrete question: how much does it cost to deliver the correct result, counting time, review and rework?

This perspective widens the competition. Beyond the model's capability, what matters now includes the information available, the selection of tools and the way the system identifies and corrects errors.

## Harnesses as Execution Infrastructure

When a model requests a search, some piece of software has to perform it. When it asks to run code, an environment has to be provided. When a tool returns an error, that result has to go back to the model to guide the next step.

The harness coordinates this process.

In a description of its infrastructure for agents, Anthropic defines this layer as the mechanism that calls the model and routes its tool requests to the corresponding infrastructure. ([Anthropic](https://www.anthropic.com/research/managed-agents))

In practice, this makes it possible to turn an interaction into a sequence of work.

Imagine a request to analyze financial documents. The system can locate files, extract data, run calculations, compare periods and check whether the conclusions are supported by the sources.

Each step requires coordination. A missing document may call for a new search. An inconsistent table may need review. A conclusion without evidence has to be flagged before delivery.

The observed performance comes to depend on the combination of the model and this process.

In an account of programming agents, Anthropic described problems such as trying to implement an entire project at once or declaring a task complete before meeting all the requirements. The approach it presented used environment setup, incremental work and logs that allowed progress to be resumed across sessions. ([Anthropic](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents))

The advance, in this case, lies in creating the conditions for existing capabilities to be used continuously.

### Tools: How the Model's Response Becomes an Action

In a text interaction, an LLM receives information and generates an output in the form of text or structured content. It can write a command, produce code or request a tool. Execution depends on the software connected to the model.

This distinction helps explain how agents work. Writing an instruction to read a file does not mean the file was read. For that, the harness has to receive the request, perform the operation and return the result to the model.

This is where *tools* come in: functions that let the model search the internet, read documents, query databases, run calculations or edit files. The model requests an operation; the system executes it and returns information to guide the next decision. This cycle is a central part of the infrastructure Anthropic describes for its agents. ([Anthropic](https://www.anthropic.com/research/managed-agents))

Imagine a sales analysis. The model can request the records for a given period. One tool queries the database, another runs the calculations, and the model interprets the results to write the analysis.

The ability to act emerges from this integration. The text generated by the LLM takes part in a process controlled by software, with access to resources and execution criteria.

This explanation comes with a caveat: there are multimodal models capable of processing or generating images, audio and other modalities. Even in those cases, carrying out operations in external systems depends on an integration that executes the requested actions.

### Subagents: How to Divide the Work

*Subagents* make it possible to distribute parts of a task across different runs of a model. Each one can receive a bounded objective, its own context and tools suited to its role.

A main agent can, for example, coordinate a research effort while subagents examine different documents. The results then come back for comparison and for drafting the answer. A subagent does not necessarily require a different model: the same LLM can be used in several runs with different responsibilities.

This division can be useful when the activities are independent. Analyzing separate sets of documents allows work to be distributed without requiring each participant to keep track of all the others' decisions.

But coordination has a cost too. Results have to be passed along, checked and integrated. When one step depends heavily on the previous one, splitting the execution can add delay and lose context. Akita is critical of the automatic adoption of architectures with many agents, arguing that complexity has to be justified by the problem and by the observed result. ([Akita](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

Tools and subagents help make AI's change of direction concrete. Progress now involves decisions about which resources to use, how to distribute tasks and how to verify what was done. The model remains essential, while the harness organizes the conditions for turning its outputs into completed work.

## Fábio Akita and the Difference Between Capability and Results

Fábio Akita offers a relevant reading of this shift. In reporting on his own training experiment, he argues for a future of smaller, specialized models, supported by agents capable of searching for information and using tools as they work.

In this view, a model can concentrate its capability in one domain and consult documents, recent data and external resources when needed. Akita also acknowledges the distance between generating plausible code and operating reliably within a project. ([Akita, "Treinei meu próprio modelo de IA"](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/))

His position, however, includes a critique of the enthusiasm around harnesses. In another article, he questions turning well-known software practices into new disciplines and recommends demanding evidence of gains before adding layers of orchestration. ([Akita, "Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit"](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

This caveat helps frame the debate. A harness's value has to show up in the result: fewer failures, better continuity or lower cost. The number of components and the design of the architecture, on their own, do not prove progress.

## Jev and the Rise of Decision Models

Jev, introduced by TypeSafe AI in September 2026, represents another piece of this transformation.

Its proposal is to produce structured decisions from a context and bounded questions. Instead of writing an open-ended explanation, it can choose among options, assign a score or estimate the probability of a statement.

The company presents this type of system as a *System One* model, geared toward quick judgments that software can use directly. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

This approach addresses a recurring need of agents. Many steps in a process require choosing a tool, classifying a request or deciding whether the available evidence is sufficient.

In customer service, for example, the system may need to identify whether a message is about billing, technical support or cancellation. Drafting the reply can be left to a generative model, while classification is assigned to a specialized component.

Jev is a model that can take part in the harness. The harness remains responsible for organizing the flow and determining what happens after the decision.

There is an important limitation: an answer within the permitted format can still be wrong. Akita highlights this distinction in his analysis of TypeSafe, acknowledging the usefulness of fast classification while questioning the link between structured output and the absence of errors. ([Akita, "Por que coisas como TypeSafe IA não me interessam"](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/))

## Clef, Clef-flash and AgentDecision-4B

The emergence of other models shows that this proposal is starting to form a category.

In October 2026, Cloudflare announced Clef and Clef-flash, decision models released with open weights under the Apache 2.0 license. The company describes uses such as classification, request routing and decisions based on probabilities. ([Cloudflare](https://blog.cloudflare.com/clef-decision-models/))

The relevance of this approach lies in the division of labor. A system can use conventional code for exact rules, a specialized model for classification and an LLM for open-ended interpretation and generation tasks.

The JevAgentHarness research explores this division. The authors propose delegating certain choices to decision models, keeping the LLM as a fallback when confidence is insufficient. The work also presents AgentDecision-4B, trained to handle states encountered while agents run.

In scenarios similar to the training data evaluated, the researchers reported cost reductions between 81.1% and 89.0% and speedups of up to 2.5 times, with a drop of less than three percentage points in success rate. These are results from a preprint under specific conditions, and they should be distinguished from a general guarantee of performance. ([Zhu et al.](https://arxiv.org/abs/2610.21412))

The same study found a drop in success when decisions were delegated without properly adjusting the confidence criteria. Specialization requires coordination and evaluation of the entire process.

## From Training to System Design

These examples support one interpretation: part of the frontier of AI progress is shifting to the system that uses the models.

Training remains essential. Jev, Clef and AgentDecision-4B are also products of training, with their own objectives. The change is in widening the unit of optimization: beyond the isolated model, the combination of models, tools, memory and decision criteria is now being improved.

Another front is the use of compute at inference time. Research by Charlie Snell and collaborators showed that allocating additional resources at that stage can improve results, depending on the difficulty of the task. Under certain conditions studied, a smaller model was able to outperform one 14 times larger. ([Snell et al.](https://arxiv.org/abs/2408.03314))

This suggests a future in which the system decides where to concentrate effort. A simple classification can get a quick solution. An ambiguous problem may call for more extensive analysis, new searches or human review.

As a consequence, evaluating AI will require looking at completed work: its quality, its cost and how often it needs correction.

This is the change of direction that harnesses make visible. The capability available inside a model has to find a structure capable of putting it to good use.

## Conclusion

LLMs have no demonstrated definitive ceiling. But the limits of relying solely on scaling up models make the search for other forms of progress more relevant.

Harnesses organize execution. Decision models, such as Jev, Clef and Clef-flash, make it possible to specialize parts of the process. Research like JevAgentHarness investigates how to combine these components without compromising the result.

The next phase of AI may advance through the sum of these improvements: more capable models, more efficient decisions and processes that can verify their own work.

In the end, the competition will be measured by the ability to turn available intelligence into reliable results.

## References

AKITA, Fábio. [*Treinei meu próprio modelo de IA (Spoiler: é só pra estudo).*](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/) AkitaOnRails, Oct. 14, 2026.

AKITA, Fábio. [*Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit.*](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/) AkitaOnRails, Aug. 18, 2026.

AKITA, Fábio. [*Por que coisas como TypeSafe IA não me interessam.*](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/) AkitaOnRails, Sep. 16, 2026.

ANTHROPIC. [*Effective harnesses for long-running agents.*](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) Nov. 26, 2025.

ANTHROPIC. [*Scaling Managed Agents: Decoupling the brain from the hands.*](https://www.anthropic.com/research/managed-agents) Apr. 8, 2026.

CHEN, Michelle; RENEAU, Alex; FLANSBURG, Kevin. [*Introducing Clef: our open-source decision models, and new RL fine-tuning platform.*](https://blog.cloudflare.com/clef-decision-models/) Cloudflare, Oct. 1, 2026.

SNELL, Charlie et al. [*Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters.*](https://arxiv.org/abs/2408.03314) arXiv, 2024.

TYPESAFE AI. [*Introducing System One Models & Jev.*](https://typesafe.ai/blog/introducing-system-one-models-and-jev) Sep. 15, 2026.

VILLALOBOS, Pablo et al. [*Will we run out of data? Limits of LLM scaling based on human-generated data.*](https://arxiv.org/abs/2211.04325) arXiv, updated version in 2024.

ZHU, Kunlun et al. [*JevAgentHarness: Benchmarking, Deploying and Training Decision Models That Share Control with LLMs.*](https://arxiv.org/abs/2610.21412) arXiv, preprint, Oct. 15, 2026.
