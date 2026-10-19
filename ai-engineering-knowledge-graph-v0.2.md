# The AI Engineering Knowledge Graph
### v0.2 — idea-first, not algorithm-first

---

## How to Read This Document

This is not a list of algorithms in the order someone decided to teach them. It is a **dependency graph of ideas**. Every node states:

- **Tier** — how deeply you need to know it
- **Industrial Frequency** — how often you'll actually touch it on the job
- **First-Principles Question** — the question that makes this node necessary
- **Mental Model** — a one-sentence intuition built for recall, not rigor
- **Why Now?** — why this sits at exactly this point in the sequence, citing the specific prior nodes that make it teachable rather than memorizable
- **Why It Exists** — the intellectual gap in the previous idea that forced this one into being (given only where it adds something beyond "Why Now?")
- **Requires** — the node(s) that must come before this one
- **Unlocks** — what this node makes possible next
- **Importance** — Industry / Research / Interview / Implementation, on a 5-dot scale (only given for the small set of anchor nodes worth highlighting — most nodes don't need this to be useful)
- **Note** — honest caveats: superseded techniques, open research questions, niche applicability

Nothing is introduced arbitrarily. If a node doesn't cite what it requires, it's a root node. If a node has no "unlocks," it's a leaf — awareness-only, safe to skip under time pressure.

---

## Tier Definitions

| Tier | Name | Bar to clear |
|---|---|---|
| **1** | Must Master | Derive it, implement it from scratch, debug it, explain it to a beginner *and* a researcher, know its failure modes. |
| **2** | Must Understand | Know when/why to reach for it, read papers/docs fluently, use library implementations correctly, know its assumptions. |
| **3** | Awareness | Know it exists, know the one-sentence idea, know when a project would require you to go deeper. |

## Industrial Frequency Scale

| Label | Meaning |
|---|---|
| **Daily** | You will touch this concept most working days as an AI engineer. |
| **Weekly** | Comes up regularly, but not every day. |
| **Occasionally** | Useful in specific project types; not a daily tool. |
| **Rare** | Mostly conceptual value today; real deployments are uncommon. |
| **Historical** | Kept for idea-teaching only — motivates something that replaced it. |

---

## The Big Picture

```
FOUNDATION A (Math) ─┐
FOUNDATION B (Programming) ─┼──▶ everything below assumes these four
FOUNDATION C (Computer Science) ─┤
FOUNDATION D (Data Engineering) ─┘
        │
        ▼
   PHASE 1 — Learning Theory
        │
   ┌────┼────────────┐
   ▼    ▼            ▼
PHASE 2 PHASE 3    PHASE 4
(Classical) (Bayesian) (Unsupervised)
   │    │            │
   └────┼────────────┘
        ▼
   PHASE 5 — Representation Learning & Neural Foundations
        │
        ▼
   PHASE 6 — Sequence, Structure & Attention
        │
        ▼
   PHASE 7 — Generative Modeling
        │
        ▼
   PHASE 8 — Cross-Cutting Paradigms (RL, SSL, Meta-Learning...) ─┐
        │                                                          │
        ▼                                                          │
   PHASE 9 — Modern AI Engineering (LLMs, RAG, Agents...) ◀────────┘
                                  ▲
                     Phase 8 feeds back into 5, 6, and 7 —
                     SSL and RL ideas keep reshaping earlier phases.
```

Foundations A–D are the root — every later phase cites them. Phases 2–4 are parallel branches emerging from Phase 1. Phase 5 is where all classical branches converge into one idea: **learned representations via differentiable composition**. Phases 6–9 are a linear spine, each impossible without the last, with Phase 8 constantly feeding back into 5–7.

---

## Foundation A — Mathematics

*Give every later node a common language. Nothing here is "AI" — it's the language AI is written in.*

### A.1 Linear Algebra

#### Vectors, Matrices, Tensors
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you represent 'data' as something math can operate on?"
- **Mental Model:** A vector is an arrow with direction and length; a matrix is a machine that transforms arrows.
- **Why Now?:** This is the root node — nothing is assumed before it except basic algebra.
- **Why It Exists:** Data must be represented numerically before any algorithm can touch it.
- **Requires (concepts):** none (root node)
- **Requires (math):** basic algebra
- **Unlocks:** everything
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●○○ | Implementation ●●●●●

#### Matrix Multiplication, Transpose, Rank, Inverse
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you apply the same transformation to many data points simultaneously?"
- **Mental Model:** Matrix multiplication is applying many linear transformations in a single sweep.
- **Why Now?:** Once data is a vector, you need the operations that combine and transform many vectors at once.
- **Requires:** Vectors/Matrices
- **Unlocks:** Linear models, PCA, backpropagation

#### Eigenvalues, Eigenvectors, SVD
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Does a transformation have directions it treats as 'special'?"
- **Mental Model:** Eigenvectors are the axes a transformation stretches without rotating.
- **Why Now?:** You now know how matrices transform space; eigenvectors ask which directions a transformation leaves unchanged in orientation.
- **Requires:** Matrix operations
- **Unlocks:** PCA, spectral clustering, low-rank adaptation (LoRA), recommender systems

#### Norms (L1, L2, L∞), Inner Product, Distance Metrics
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How 'big' is a vector, and how 'far apart' are two of them?"
- **Mental Model:** A norm is a ruler; a distance metric is a ruler applied to the gap between two points.
- **Why Now?:** With vectors defined, you need a way to measure their size and how far apart two of them are.
- **Requires:** Vectors
- **Unlocks:** Regularization, SVM margins, KNN, metric learning

### A.2 Calculus & Optimization Substrate

#### Derivatives, Partial Derivatives, Gradients, Jacobians, Hessians
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "If I nudge the inputs slightly, which way does the output move?"
- **Mental Model:** The gradient is a compass pointing toward the steepest increase.
- **Why Now?:** You have functions of vectors now (A.1); to improve them, you need to know which direction makes them better.
- **Requires:** functions of several variables
- **Unlocks:** Gradient Descent, backpropagation, second-order optimizers

#### Chain Rule (Scalar and Multivariate)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "If a function is built from smaller functions stacked together, how does a change ripple through?"
- **Mental Model:** Chain rule is passing a "blame signal" backward through a series of gears.
- **Why Now?:** Real models are functions built by composing simpler functions; you need a rule for differentiating compositions.
- **Requires:** Derivatives
- **Unlocks:** Backpropagation, directly

#### Convexity, Local vs. Global Minima, Saddle Points
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "When gradient descent stops moving, has it actually found the best answer?"
- **Mental Model:** A convex bowl has one bottom; a non-convex landscape has many false bottoms.
- **Why Now?:** Now that you can compute gradients, you need to know what a gradient of zero actually tells you.
- **Requires:** Derivatives, Hessians
- **Unlocks:** Understanding why deep nets still train despite non-convexity

#### Taylor Series (as Intuition for Optimization Steps)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I predict a function's value nearby using only its derivatives here?"
- **Mental Model:** Taylor series is approximating a curve with a straight line, then a parabola, for a better local guess.
- **Why Now?:** An optional refinement once you understand gradients — it explains why some optimizers use curvature, not just slope.
- **Requires:** Derivatives
- **Unlocks:** Newton's method, second-order intuition

### A.3 Probability & Statistics

#### Random Variables, Distributions, Expectation, Variance
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you describe an outcome that isn't fixed, but random?"
- **Mental Model:** A random variable is a numbered outcome from a process you don't fully control.
- **Why Now?:** Data is noisy; before modeling it you need language for uncertainty itself.
- **Requires:** none
- **Unlocks:** nearly every later probabilistic idea

#### Joint / Conditional / Marginal Probability, Bayes' Rule
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Given what I just observed, how should my belief about the cause change?"
- **Mental Model:** Bayes' Rule is updating your guess once new evidence narrows the possibilities.
- **Why Now?:** Single variables aren't enough — real data has many interacting variables, and you need to update beliefs given evidence.
- **Requires:** Random variables
- **Unlocks:** Naive Bayes, Bayesian methods, generative models, diffusion

#### MLE and MAP Estimation
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Out of all possible parameter settings, which one made my observed data most likely?"
- **Mental Model:** MLE picks the parameters that make the data you actually saw look least surprising.
- **Why Now?:** You know probability and calculus/optimization now — MLE is literally "use optimization to pick the most probable explanation of your data."
- **Requires:** Bayes' Rule, calculus (optimization)
- **Unlocks:** Loss functions, logistic regression, most of deep learning training

#### Entropy, Cross-Entropy, KL Divergence, Mutual Information
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you measure the distance between what a model believes and what's actually true?"
- **Mental Model:** Entropy is how many yes/no questions you'd need, on average, to guess an outcome.
- **Why Now?:** With probability and logarithms in hand, you can measure how "surprising" or "different" distributions are — this becomes almost every loss function later.
- **Requires:** probability, logarithms
- **Unlocks:** Loss functions, VAEs, information bottleneck, distillation

#### Common Distributions (Bernoulli, Gaussian, Categorical, Poisson, Exponential Family)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Does this kind of randomness look like a coin flip, a bell curve, or a count of rare events?"
- **Mental Model:** Distributions are pre-built templates for "what kind of randomness am I looking at."
- **Why Now?:** A toolkit of named shapes that recur constantly once you start assuming how noise or counts behave.
- **Requires:** Random variables
- **Unlocks:** GLMs, Bayesian models, diffusion noise models

#### Sampling & Monte Carlo Intuition
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "If I can't compute an expectation exactly, can I estimate it by repeated random draws?"
- **Mental Model:** Monte Carlo is answering a hard math question by rolling dice many times and averaging.
- **Why Now?:** Some probability questions have no clean formula — you need a way to estimate them by simulation.
- **Requires:** probability
- **Unlocks:** MCMC, VAEs, diffusion, RL

---

## Foundation B — Programming

*Turning the math in Foundation A into something that actually runs.*

#### Python + NumPy Fluency
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do I turn the vector/matrix math from A.1 into code that actually runs fast?"
- **Mental Model:** NumPy is doing linear algebra at C speed while writing in Python.
- **Why Now?:** Every "from scratch" implementation in this curriculum is written here — it's the shared language for turning math into code.
- **Requires:** none
- **Unlocks:** literally all "from scratch" implementations in this curriculum

#### Automatic Differentiation (Concept, then PyTorch/JAX Mechanics)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can a computer apply the chain rule for me, automatically, across a million operations?"
- **Mental Model:** Autodiff builds a record of every operation, then replays it backward to get exact gradients for free.
- **Why Now?:** You know chain rule by hand; autodiff is a system that applies it automatically across huge computational graphs so you never derive gradients manually again.
- **Requires:** Chain Rule, computational graphs, Python fluency
- **Unlocks:** training every neural network in this curriculum

---

## Foundation C — Computer Science

*The scaffolding that makes an ML system an engineering artifact, not just a notebook.*

#### Complexity / Big-O, Data Structures
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Will this approach still work when the dataset is 1000x bigger?"
- **Mental Model:** Big-O is asking "if the input doubles, does my runtime double, or explode?"
- **Why Now?:** Before writing any algorithm you need a language for whether it will actually scale to real data.
- **Requires:** none
- **Unlocks:** understanding scalability tradeoffs of every algorithm that follows

#### GPU / Parallel Compute Basics (Why Matrix Multiply Is Fast on GPU)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Why does the same matrix multiply run 100x faster on a GPU than a CPU?"
- **Mental Model:** A GPU is thousands of simple calculators doing the same tiny operation at once, instead of one fast one doing them in sequence.
- **Why Now?:** Matrix multiplication (A.1) is the core operation of deep learning — this explains why it can be made embarrassingly parallel.
- **Requires:** Matrix multiplication
- **Unlocks:** understanding scaling laws, training-cost intuition in Phase 9

---

## Foundation D — Data Engineering Basics
### *(new in v0.2)*

*Not ML concepts — but an AI engineer who can't do these things can't ship anything. This is the gap between "I trained a model in a notebook" and "I am employable."*

#### Git & Version Control (Branching, Merging, Commits, Pull Requests)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do multiple people change the same codebase without overwriting each other's work?"
- **Mental Model:** Git is a series of snapshots of your project, with branches letting you experiment without touching the main timeline.
- **Why Now?:** You're about to write real code across many sessions and, eventually, with a team — this has to exist before any collaborative workflow makes sense.
- **Why It Exists:** Code changes over time and often by more than one person; you need a system to track, merge, and reverse those changes safely.
- **Requires:** none (root node of Foundation D)
- **Unlocks:** collaborative ML engineering, CI/CD, reproducible experiments
- **Importance:** Industry ●●●●● | Research ●●●●○ | Interview ●●●●○ | Implementation ●●●●●

#### Linux / Command-Line Fluency (Shell, Permissions, Processes, Package Managers)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you control a machine that has no GUI — which is how almost all real ML training and serving happens?"
- **Mental Model:** The shell is a direct conversation with the operating system, one command at a time.
- **Why Now?:** Nearly every training server, cloud instance, and Docker container you'll touch is Linux with no GUI — you need this before touching real infrastructure.
- **Why It Exists:** Training and deploying models happens on remote servers, not a laptop GUI.
- **Requires:** none
- **Unlocks:** Docker, cloud deployment, remote GPU training, debugging production systems
- **Importance:** Industry ●●●●● | Research ●●●●○ | Interview ●●●○○ | Implementation ●●●●●

#### REST APIs & HTTP Fundamentals
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How does one program ask another program — possibly on a different machine — to do something?"
- **Mental Model:** An API is a menu of requests a service agrees to respond to, and HTTP is the language those requests are written in.
- **Why Now?:** Every model you train eventually needs to be called by something else — a website, an app, another service — and this is the shared protocol for that.
- **Why It Exists:** Software components need a standard way to talk to each other across machines.
- **Requires:** none
- **Unlocks:** FastAPI/model-serving endpoints, calling third-party LLM APIs, tool-calling and MCP (Phase 9)
- **Importance:** Industry ●●●●● | Research ●●●○○ | Interview ●●●●○ | Implementation ●●●●●

#### SQL & Relational Databases
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Where does the data you're about to model actually live, and how do you get exactly the slice you need out of it?"
- **Mental Model:** SQL is asking a very literal, very fast librarian for exactly the rows and columns you want.
- **Why Now?:** Before you can do any data science, you usually have to retrieve the data from somewhere structured — this is that somewhere, most of the time.
- **Why It Exists:** Most real-world data lives in relational databases, not clean CSVs handed to you.
- **Requires:** none
- **Unlocks:** feature engineering pipelines, data engineering for ML, analytics before modeling
- **Importance:** Industry ●●●●● | Research ●●●○○ | Interview ●●●●○ | Implementation ●●●●○

#### Docker & Containerization
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you make sure your code runs identically on your laptop, your teammate's laptop, and the production server?"
- **Mental Model:** A container is a shipping box for your code that includes everything it needs to run, so it behaves the same everywhere.
- **Why Now?:** Once you know Linux and have real dependencies (Python versions, CUDA, libraries), you need a way to freeze that environment and move it anywhere.
- **Why It Exists:** "Works on my machine" is not acceptable in production ML systems.
- **Requires:** Linux/CLI fluency
- **Unlocks:** reproducible ML pipelines, cloud deployment, MLOps (Phase 9)
- **Importance:** Industry ●●●●● | Research ●●●○○ | Interview ●●●○○ | Implementation ●●●●●

#### File Formats & Serialization (JSON, YAML, CSV, Parquet, Protobuf)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Once data leaves memory, what shape does it take on disk or over the network?"
- **Mental Model:** A file format is an agreed-upon way of writing structure to bytes, so anything reading it later can reconstruct that structure.
- **Why Now?:** Now that you can call APIs and query databases, you need to know the shapes the data actually arrives in.
- **Why It Exists:** Data must be serialized to move between processes, machines, or across time.
- **Requires:** REST APIs (for JSON context), SQL (for tabular export context)
- **Unlocks:** config management, model checkpoints, large-scale data pipelines (Parquet), API payloads (JSON)
- **Importance:** Industry ●●●●○ | Research ●●●○○ | Interview ●●●○○ | Implementation ●●●●●

#### Basic Networking (Client-Server Model, Ports, DNS, Latency)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "When your laptop 'calls an API,' what is physically happening between the two machines?"
- **Mental Model:** Networking is the postal system underneath every API call — addresses, routes, and delivery guarantees.
- **Why Now?:** A conceptual capstone to Foundation D: it explains why APIs sometimes fail, time out, or feel slow, connecting back to REST/HTTP above.
- **Why It Exists:** Distributed systems — which almost all production ML systems are — live and die by network behavior.
- **Requires:** REST APIs & HTTP
- **Unlocks:** debugging latency/timeouts in inference serving (Phase 9), distributed-training intuition

---

## Phase 1 — Learning Theory: What Does "Learning" Mean?

*The true starting point of ML — the ideas that make every algorithm in Phases 2–9 meaningful rather than arbitrary. The spine: Learning Theory → Loss → Optimization → Bias/Variance → Generalization → Regularization.*

#### The Learning Problem (Function Approximation from Data)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "What does it mathematically mean for a machine to 'learn'?"
- **Mental Model:** Learning is choosing a function from data instead of writing its rules by hand.
- **Why Now?:** Foundation A gave you the tools; now you need the actual question those tools serve.
- **Why It Exists:** Before any algorithm, you must define what "success" even means for a machine.
- **Requires:** Foundation A (probability, in particular)
- **Unlocks:** everything in Phases 2–9

#### Hypothesis Space, Model Capacity
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Out of every function I could pick, which ones is my model family even capable of representing?"
- **Mental Model:** Hypothesis space is the entire shelf of possible functions the model is allowed to pick from.
- **Why Now?:** Once you accept "learning = choosing a function from data," you need to ask which functions are even on the table.
- **Requires:** The Learning Problem
- **Unlocks:** Bias-variance, regularization, model selection

#### Loss Functions (MSE, MAE, Cross-Entropy, Hinge, Huber, 0-1 Loss)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you turn 'the model was wrong' into a number you can actually minimize?"
- **Mental Model:** A loss function is a single number that says "how bad was this guess," so smaller is always better.
- **Why Now?:** You now have Cross-Entropy/KL from A.3 — a loss function turns "how wrong is this guess" into a number optimization can minimize.
- **Requires:** Cross-Entropy/KL (A.3), Learning Problem
- **Unlocks:** every trainable model in this curriculum
- **Note:** This is the single most reused node in the entire graph — cite it constantly when teaching later nodes.

#### Empirical Risk Minimization (ERM)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Since I can't test on all possible data, is minimizing loss on my sample a legitimate substitute?"
- **Mental Model:** ERM is grading a model by its average homework score, then trying to improve that average.
- **Why Now?:** With a loss function defined, ERM is the formal principle of "pick the parameters that minimize average loss on the data you have."
- **Requires:** Loss functions
- **Unlocks:** Optimization, generalization theory

#### Optimization: Gradient Descent, SGD, Momentum, Adam/AdamW
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Given the slope of the loss, how do I actually move the parameters to make it smaller?"
- **Mental Model:** Gradient descent is walking downhill while blindfolded, feeling the slope under your feet.
- **Why Now?:** ERM defines the goal; gradients from A.2 tell you the direction — optimization is how you actually walk there step by step.
- **Requires:** Gradients, Chain Rule, ERM
- **Unlocks:** training of every parametric model, from linear regression to LLMs
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●●●

#### Bias-Variance Tradeoff
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Why can a model with zero training error still perform badly on new data?"
- **Mental Model:** Bias is a model too simple to see the pattern; variance is a model so flexible it memorizes the noise.
- **Why Now?:** Once you can minimize training loss, you need to explain why a model that fits it perfectly can still fail on new data.
- **Requires:** ERM, Loss functions
- **Unlocks:** Regularization, ensembles, model-capacity decisions

#### Generalization, VC Dimension / Rademacher Complexity (Conceptual)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can we put a number on 'how much a model is allowed to memorize' before it stops generalizing?"
- **Mental Model:** VC dimension is roughly "how many different labelings of points this model family could shatter."
- **Why Now?:** Bias-variance gave you intuition; this gives it a formal handle on capacity vs. overfitting risk.
- **Requires:** Bias-Variance, Hypothesis space
- **Unlocks:** Regularization theory, understanding why deep nets generalize
- **Note:** Open research question for deep nets — flagged honestly, not a closed-book result.

#### Overfitting / Underfitting, Train/Val/Test Splits, Cross-Validation
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do I know, in practice, whether my model overfit before it's too late?"
- **Mental Model:** A held-out test set is an exam the model has never seen the answer key for.
- **Why Now?:** Generalization theory tells you the risk exists; this is the practical toolkit for actually detecting it.
- **Requires:** Generalization
- **Unlocks:** all practical model evaluation

#### Regularization (L1/L2, Early Stopping, Dropout as a Preview)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I discourage a model from becoming too complex, without changing its hypothesis space outright?"
- **Mental Model:** Regularization is a tax on complexity, so the model only uses flexibility it can really justify.
- **Why Now?:** Now that you know high variance comes from excess capacity, regularization is the direct fix.
- **Requires:** Bias-Variance, Loss functions
- **Unlocks:** Ridge/Lasso (Phase 2), weight decay in deep learning (Phase 5)

#### Evaluation Metrics (Accuracy, Precision/Recall, F1, ROC-AUC, Calibration)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Is the number I'm optimizing (loss) the same number that actually matters to the business?"
- **Mental Model:** A metric is the scoreboard everyone outside the model actually cares about.
- **Why Now?:** Loss functions optimize training; metrics answer the separate, practical question of what "good" means to a stakeholder.
- **Requires:** Loss functions, probability
- **Unlocks:** practical model evaluation across the entire curriculum

#### No Free Lunch Theorem
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Historical
- **First-Principles Question:** "Is there one 'best' machine learning algorithm for everything?"
- **Mental Model:** No Free Lunch says there's no single algorithm that's best on every possible problem, averaged over all problems.
- **Why Now?:** A closing, humbling idea for Phase 1: it explains why Phases 2–4 need multiple model families instead of one universal winner.
- **Requires:** The Learning Problem
- **Note:** Idea-only — explains why we need many model families, motivating Phases 2–4.

---

## Phase 2 — Classical Function Approximators

*The first concrete instantiations of Phase 1's abstract ideas. Organized by what kind of decision boundary/function shape each model assumes.*

### 2.1 Linear Models

#### Linear Regression
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "What's the simplest possible function shape I could fit to data, and does it already work?"
- **Mental Model:** Linear regression draws the straight line (or plane) that best splits the difference across all your points.
- **Why Now?:** This is the first concrete instantiation of Phase 1: ERM + MSE loss + gradient descent, applied to the simplest possible function shape.
- **Requires:** ERM, MSE loss, Gradient Descent, linear algebra
- **Unlocks:** Logistic Regression, GLMs, understanding neurons as linear+nonlinearity

#### Logistic Regression
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you adapt a linear model to output 'probability of belonging to a class' instead of a raw number?"
- **Mental Model:** Logistic regression is linear regression whose output gets squeezed into a probability between 0 and 1.
- **Why Now?:** Linear regression predicts numbers; classification needs probabilities, so you squash the same linear score through a sigmoid.
- **Requires:** Linear Regression, Cross-Entropy, sigmoid/softmax
- **Unlocks:** neural network output layers, understanding classification generally

#### Regularized Linear Models (Ridge, Lasso, Elastic Net)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can regularization also tell me which features actually matter?"
- **Mental Model:** Ridge shrinks every coefficient a little; Lasso is willing to zero some out entirely.
- **Why Now?:** You now have both linear models and regularization theory from Phase 1 — this is where they combine directly.
- **Requires:** Regularization (Phase 1), Linear/Logistic Regression
- **Unlocks:** feature selection intuition, weight decay in deep learning

#### Generalized Linear Models (GLM)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Linear regression assumes Gaussian noise — what if my target is a count or a rate instead?"
- **Mental Model:** A GLM is "linear regression" with a different lens depending on what kind of number you're predicting.
- **Why Now?:** Logistic regression is one special case; GLMs generalize the recipe to any exponential-family output.
- **Requires:** Exponential family (A.3), Logistic Regression
- **Unlocks:** broader statistical modeling fluency

#### Perceptron (Historical)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Historical
- **First-Principles Question:** "Can a single straight decision boundary solve every classification problem?"
- **Mental Model:** The perceptron draws one straight line and can never bend it.
- **Why Now?:** A look backward: the first learning algorithm, useful precisely because its failure (XOR) motivates multi-layer networks in Phase 5.
- **Requires:** Linear Regression
- **Note:** Idea-teaching only — first learning algorithm, motivates why nonlinearity/multi-layer nets were needed (the XOR problem).

### 2.2 Distance & Margin-Based Models

#### K-Nearest Neighbors
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Can I classify a new point just by comparing it to similar points I've already seen?"
- **Mental Model:** KNN classifies a point by asking its nearest neighbors what they are.
- **Why Now?:** With distance metrics from A.1 defined, KNN is the simplest possible use of them.
- **Requires:** Distance metrics (A.1)
- **Unlocks:** Metric learning, intuition for non-parametric models, retrieval/RAG (Phase 9)
- **Note:** Rarely deployed at scale raw, but foundational for the *idea* of similarity-based reasoning that reappears in embeddings/RAG.

#### Maximum Margin Classifiers → Support Vector Machines
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Of all the lines that separate two classes, which one is safest against future noise?"
- **Mental Model:** SVM finds the widest possible street between two classes, using only the points closest to the edge.
- **Why Now?:** Linear models can separate classes many ways — SVM asks which separating line is the most robust one.
- **Requires:** Linear models, constrained optimization, norms
- **Unlocks:** Kernel methods, understanding margin-based generalization theory

#### Kernel Trick / Kernel Methods
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can a linear method learn a nonlinear boundary without explicitly building new features?"
- **Mental Model:** The kernel trick computes the effect of a much higher-dimensional space without ever visiting it.
- **Why Now?:** SVM is limited to linear boundaries in the given features; the kernel trick lets it act nonlinear implicitly.
- **Requires:** SVM, inner products
- **Unlocks:** Gaussian Processes (Phase 3), conceptual bridge to representation learning (Phase 5)

### 2.3 Tree-Based Models

#### Decision Trees (Entropy/Gini Splitting, CART)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can a machine make decisions without assuming any linear relationship?"
- **Mental Model:** A decision tree is a flowchart of yes/no questions that carves up the data into purer and purer groups.
- **Why Now?:** A completely different function shape than linear models — Phase 1's overfitting lessons show up immediately in how deep a tree is allowed to grow.
- **Requires:** Entropy (A.3), Learning Theory (overfitting)
- **Unlocks:** Random Forest, Gradient Boosting, feature-importance intuition

#### Bagging → Random Forest
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "If one tree overfits, does averaging many different trees fix it?"
- **Mental Model:** A random forest is many trees voting, each trained on a slightly different slice of the data.
- **Why Now?:** Trees have high variance; bagging directly applies the bias-variance tradeoff — average many noisy trees to cancel the noise.
- **Requires:** Decision Trees, Bias-Variance (variance reduction)
- **Unlocks:** general ensembling intuition

#### Boosting (AdaBoost → Gradient Boosting → XGBoost/LightGBM/CatBoost)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of many independent guessers, what if each new model specifically targets the errors of the last?"
- **Mental Model:** Boosting is a team of specialists, each one hired specifically to fix the mistakes the team made so far.
- **Why Now?:** Instead of averaging independent trees (bagging), boosting builds trees sequentially, each correcting the last one's error gradient.
- **Requires:** Decision Trees, functional Gradient Descent, Loss functions
- **Unlocks:** state-of-the-art tabular ML — still industry-dominant for tabular data
- **Importance:** Industry ●●●●● | Research ●●○○○ | Interview ●●●●○ | Implementation ●●●●○

#### Ensemble Theory (Stacking, Blending, Why Diverse Weak Learners Help)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Does the benefit of ensembling come from each model being good, or from them being differently wrong?"
- **Mental Model:** Ensembling works best when your models are each decent but wrong in different ways.
- **Why Now?:** Having seen two ensembling strategies, this generalizes the principle of why diverse weak learners help at all.
- **Requires:** Bagging, Boosting, Bias-Variance
- **Unlocks:** general intuition reused in mixture-of-experts (Phase 9)

---

## Phase 3 — Probabilistic & Bayesian Reasoning

*The branch of ML that treats uncertainty as first-class, not an afterthought.*

#### Naive Bayes
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I build a classifier directly out of Bayes' Rule, if I'm willing to assume features are independent?"
- **Mental Model:** Naive Bayes assumes every feature votes independently, then multiplies the votes together.
- **Why Now?:** Now that Bayes' Rule (A.3) exists, Naive Bayes is the simplest possible classifier built directly from it.
- **Requires:** Bayes' Rule, conditional independence
- **Unlocks:** intuition for generative classifiers, early text classification

#### Bayesian Inference (Prior, Likelihood, Posterior, Bayesian Updating)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Instead of one best-guess parameter, can I keep track of my full uncertainty about it?"
- **Mental Model:** Bayesian inference keeps a whole cloud of plausible answers instead of committing to just one.
- **Why Now?:** MLE/MAP (A.3) gave you a single best-guess parameter; this asks for the full distribution of plausible parameters instead.
- **Requires:** Bayes' Rule, MLE/MAP
- **Unlocks:** Bayesian linear/logistic regression, Bayesian deep learning, Gaussian Processes

#### Bayesian Linear Regression
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can linear regression tell me how confident it is, not just what it predicts?"
- **Mental Model:** Bayesian linear regression draws not one line but a whole family of plausible lines, weighted by belief.
- **Why Now?:** Applying Bayesian inference to the simplest model you know gives you uncertainty bands, not just a point estimate.
- **Requires:** Bayesian Inference, Linear Regression
- **Unlocks:** Gaussian Processes, uncertainty quantification

#### Markov Chains, Hidden Markov Models
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Can I model a sequence by assuming the next step only depends on where I am right now?"
- **Mental Model:** A Markov chain assumes the future only depends on the current state, not the whole history.
- **Why Now?:** The first time this curriculum treats sequences — a direct precursor to RNNs and Transformers in Phase 6.
- **Requires:** conditional probability, joint distributions
- **Unlocks:** sequence-modeling intuition (bridges to RNNs), speech/bio applications
- **Note:** Largely superseded by neural sequence models in production, but essential for understanding sequential structure before Transformers existed.

#### Graphical Models (Bayesian Networks, Markov Random Fields)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "What if the dependencies between variables form a graph rather than a straight chain?"
- **Mental Model:** A graphical model draws probability dependencies as a network diagram instead of a formula.
- **Why Now?:** A conceptual generalization once Markov Chains and Bayes' Rule exist.
- **Requires:** Markov Chains, Bayesian Inference
- **Unlocks:** intuition reused in energy-based models, structured prediction

#### Gaussian Processes
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Can I be Bayesian about the function itself, not just its parameters?"
- **Mental Model:** A Gaussian Process is a Bayesian model that puts a probability distribution directly over functions.
- **Why Now?:** Combines kernel methods (2.2) with Bayesian inference: a Bayesian model over entire functions.
- **Requires:** Kernel methods, Bayesian Inference, multivariate Gaussian
- **Unlocks:** Bayesian optimization, uncertainty-aware modeling, hyperparameter-tuning tools

#### MCMC (Metropolis-Hastings, Gibbs Sampling)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "If I can't write down a distribution's formula, can I still draw samples from it?"
- **Mental Model:** MCMC wanders through possibility space, favoring more probable regions, until the wandering itself becomes a valid sample.
- **Why Now?:** Bayesian inference and sampling (A.3) get hard in high dimensions — MCMC is how you sample from distributions you can't compute directly.
- **Requires:** Sampling (A.3), Bayesian Inference
- **Unlocks:** understanding how diffusion models and energy-based models draw samples

#### Rule-Based Learning / Expert Systems (Historical)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Historical
- **First-Principles Question:** "Can intelligence be hand-coded as rules instead of learned from data?"
- **Mental Model:** An expert system is a giant if-then rulebook written by hand instead of learned from data.
- **Why Now?:** A deliberate look backward at pre-statistical AI, to understand why the entire statistical-learning paradigm was needed.
- **Requires:** none
- **Note:** Pre-statistical AI — teaches why symbolic-only AI failed to scale, motivating statistical learning and, later, neuro-symbolic hybrids (Phase 8).

---

## Phase 4 — Unsupervised Structure

*What can be learned from data with no labels — clustering, compression, and "what's normal."*

### 4.1 Clustering

#### K-Means, K-Medoids
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "With no labels at all, can a machine still discover meaningful groups in data?"
- **Mental Model:** K-Means repeatedly asks "which center is closest to me" and "where should the center actually be" until both agree.
- **Why Now?:** The first unsupervised question: with no labels at all, can you still find structure using only distance metrics from A.1?
- **Requires:** Distance metrics, coordinate-descent optimization
- **Unlocks:** vector quantization, initialization for embeddings

#### Hierarchical Clustering
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Instead of committing to one number of clusters, can I see every possible grouping at every scale?"
- **Mental Model:** Hierarchical clustering builds a family tree by repeatedly merging the two closest groups.
- **Why Now?:** K-Means forces you to pick K groups upfront; this asks what if you built the whole family tree of groupings instead.
- **Requires:** Distance metrics
- **Unlocks:** dendrogram-based analysis, taxonomy discovery

#### DBSCAN / Density-Based Clustering
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "What if my clusters aren't round or evenly sized — can I define them by density instead?"
- **Mental Model:** DBSCAN grows clusters like ink spreading through dense paper, stopping wherever the density thins out.
- **Why Now?:** K-Means assumes round, evenly-sized clusters; density-based clustering fixes that.
- **Requires:** Distance metrics
- **Unlocks:** anomaly-detection intuition, non-convex cluster discovery

#### Gaussian Mixture Models + EM Algorithm
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "What if cluster membership isn't all-or-nothing, but a probability?"
- **Mental Model:** A GMM assumes the data was generated by a handful of overlapping bell curves, and EM figures out which curve made which point.
- **Why Now?:** K-Means gives hard cluster assignments; GMM makes it probabilistic, reusing MLE and Bayesian ideas.
- **Requires:** MLE, Gaussian distribution, Bayesian Inference basics
- **Unlocks:** soft clustering; EM reused conceptually in HMMs and VAEs

### 4.2 Dimensionality Reduction

#### PCA
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I compress data into fewer dimensions while losing as little information as possible?"
- **Mental Model:** PCA rotates your data to the angle where it spreads out the most, then keeps only the axes that matter.
- **Why Now?:** You have vectors, covariance, eigenvectors, and variance from Foundation A. Now you finally have enough mathematical tools to understand PCA naturally. Without those prerequisites, PCA becomes a memorization exercise.
- **Requires:** Eigenvectors/SVD, variance
- **Unlocks:** Autoencoders (as nonlinear PCA), visualization, whitening/preprocessing

#### t-SNE, UMAP
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "For visualization specifically, can I prioritize keeping similar points near each other over preserving exact distances?"
- **Mental Model:** t-SNE cares less about preserving distances exactly and more about keeping neighbors next to each other in the picture.
- **Why Now?:** PCA preserves global variance but can hide local structure; these trade that guarantee for better visualizations.
- **Requires:** PCA (as contrast), distance metrics
- **Unlocks:** embedding visualization used constantly in Phase 5–9 debugging

#### Autoencoders (Bridge Node)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "If PCA is linear compression, what does nonlinear compression look like?"
- **Mental Model:** An autoencoder squeezes data through a narrow bottleneck and is graded on how well it can rebuild the original.
- **Why Now?:** PCA is linear compression; this is a forward pointer to Phase 5/7, where compression gets a neural, nonlinear upgrade.
- **Requires:** PCA, neural networks (forward pointer to Phase 5)
- **Unlocks:** representation learning, generative modeling

### 4.3 Association, Anomaly, Semi/Self-Supervised (Intro)

#### Association Rule Learning (Apriori, FP-Growth)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I find which items tend to appear together, without any notion of distance or clusters?"
- **Mental Model:** Association rules find "people who bought X also bought Y" patterns automatically.
- **Why Now?:** A narrower, industry-specific unsupervised task: what tends to co-occur, rather than what clusters together.
- **Requires:** basic probability
- **Note:** Still used in retail/market-basket analysis; low conceptual reuse elsewhere.

#### Anomaly Detection (Statistical, Isolation Forest, Density-Based, Autoencoder-Based)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Having learned what normal data looks like, can I automatically flag what doesn't belong?"
- **Mental Model:** Anomaly detection learns what "normal" looks like, then flags anything that doesn't fit the mold.
- **Why Now?:** Combines clustering and density estimation from this phase with a practical goal.
- **Requires:** Clustering, density estimation, (later) autoencoders
- **Unlocks:** fraud/security systems, production ML monitoring

#### Semi-Supervised Learning (Self-Training, Label Propagation, Consistency Regularization)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "If labels are expensive but unlabeled data is cheap, can the unlabeled data still help?"
- **Mental Model:** Semi-supervised learning uses a small labeled set to seed labels, then lets structure in unlabeled data spread them further.
- **Why Now?:** A bridge between supervised and unsupervised learning.
- **Requires:** Clustering, supervised basics
- **Unlocks:** modern Self-Supervised Learning (Phase 8), pretraining intuition

#### Self-Supervised Learning (Pretext Tasks — Conceptual Preview)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can a model create its own supervision signal by hiding part of the input and predicting it?"
- **Mental Model:** Self-supervised learning invents its own labels by hiding part of the data and asking the model to predict it.
- **Why Now?:** A forward pointer: this phase's unsupervised ideas culminate in Phase 8's full treatment, the core of modern pretraining.
- **Requires:** representation-learning intuition
- **Unlocks:** foundation-model pretraining (Phase 9) — one of the most industrially important ideas of the modern era

---

## Phase 5 — Representation Learning & Neural Foundations

*The convergence point. Every branch of Phases 2–4 was, in hindsight, searching for good features by hand. Neural networks make feature-search learnable. This is the single most important phase transition in the entire curriculum.*

#### The Representation Learning Idea (Why Hand-Crafted Features Hit a Ceiling)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "What if the model learned its own features instead of engineers hand-crafting them?"
- **Mental Model:** Instead of hand-designing features, let the model learn which features matter directly from data.
- **Why Now?:** This is the convergence point: Phases 2–4 were all, in hindsight, searching for good features by hand.
- **Requires:** Linear models, kernel methods, PCA (as contrast)
- **Unlocks:** everything from here to Phase 9
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●○○

#### Artificial Neuron (as Generalized Linear Model + Nonlinearity)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "What's the smallest unit I can stack many of to build a learnable feature detector?"
- **Mental Model:** A neuron is a weighted vote followed by a decision of how strongly to fire.
- **Why Now?:** The representation-learning idea needs a concrete building block — a linear model (Phase 2) plus a nonlinearity.
- **Requires:** Linear/Logistic Regression, activation functions
- **Unlocks:** MLPs

#### Activation Functions (Sigmoid, Tanh, ReLU Family, GELU/SiLU)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Why can't I just stack linear layers to get a more powerful model?"
- **Mental Model:** Without nonlinearity, ten layers behave exactly like one; activation functions are what make depth matter.
- **Why Now?:** Stacked linear layers alone collapse into one linear layer — nonlinearity is what makes depth actually add power.
- **Requires:** Artificial Neuron, calculus
- **Unlocks:** every deep architecture

#### Multi-Layer Perceptron (MLP) / Feedforward Networks
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can stacking many simple neurons approximate functions far more complex than any single one?"
- **Mental Model:** An MLP is a pipeline of neurons, each layer building slightly more abstract features from the last.
- **Why Now?:** With neurons and activations defined, MLP is stacking many of them into layers to approximate complex functions.
- **Requires:** Artificial Neuron, Activation functions, Loss functions
- **Unlocks:** Backpropagation, all downstream architectures

#### Backpropagation
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "With millions of weights, how do you efficiently compute how each one should change?"
- **Mental Model:** Backprop sends a signal of "how wrong was I" backward through the network, assigning blame to each weight.
- **Why Now?:** You have the chain rule and autodiff from Foundations A/B — backprop is the efficient application of both to train an MLP's many layers at once.
- **Requires:** Chain Rule, MLP, Automatic Differentiation
- **Unlocks:** training of literally every neural network hereafter
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●●●

#### Universal Approximation Theorem (Conceptual)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Is there a theoretical guarantee that neural networks can represent (almost) any function?"
- **Mental Model:** Given enough width, an MLP can approximate any reasonable function — it just doesn't say how to find those weights.
- **Why Now?:** A reassuring theoretical footnote right after backprop makes training possible.
- **Requires:** MLP
- **Note:** Explains why neural nets can work in principle; doesn't explain generalization — an open problem worth flagging honestly.

#### Training Dynamics: Initialization, Vanishing/Exploding Gradients, Normalization, LR Schedules
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Why does a network that should train in theory refuse to train in practice?"
- **Mental Model:** Deep networks are a long chain of multiplications; training dynamics is preventing that chain from vanishing to zero or exploding to infinity.
- **Why Now?:** Backprop works in theory, but deep stacks of layers destabilize gradients — this is the engineering needed to actually train them.
- **Requires:** Backpropagation, Optimization (Phase 1)
- **Unlocks:** training stability for every deep architecture that follows

#### Regularization in Deep Learning (Dropout, Weight Decay, Data Augmentation, Early Stopping)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "A network with millions of parameters can memorize anything — how do you stop it from doing so?"
- **Mental Model:** Dropout randomly disables neurons during training so the network can't rely on any single one too heavily.
- **Why Now?:** Phase 1's regularization principle reapplied to deep nets, which have enough capacity to memorize almost any dataset outright.
- **Requires:** Regularization (Phase 1), MLP
- **Unlocks:** robust training practices reused everywhere

#### Convolutional Neural Networks (Convolution, Pooling, Receptive Fields, ResNet-Style)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can we exploit the spatial structure of images instead of treating every pixel as unrelated?"
- **Mental Model:** A CNN slides small pattern-detectors across an image instead of looking at every pixel independently.
- **Why Now?:** MLPs treat every pixel as independent; CNNs exploit the fact that images have local, spatial structure worth preserving.
- **Requires:** MLP, Backpropagation, linear algebra (convolution as structured matrix multiplication)
- **Unlocks:** the entire computer-vision pipeline, inductive-bias intuition reused vs. Transformers

#### Recurrent Neural Networks (Vanilla RNN, Vanishing-Gradient Problem, LSTM/GRU)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Can a network exploit the fact that data arrives in order, remembering what came before?"
- **Mental Model:** An RNN carries a running memory forward through a sequence, updating it one step at a time.
- **Why Now?:** CNNs exploit spatial structure; RNNs are the analogous move for sequential structure, where order matters.
- **Requires:** MLP, backpropagation-through-time
- **Unlocks:** sequence-modeling intuition, direct motivation for Attention (Phase 6)
- **Note:** Largely superseded by Transformers in production, but essential idea-teaching — you must feel *why* RNNs failed at long-range dependencies to appreciate why attention was invented.

---

## Phase 6 — Sequence, Structure & Attention

*The path from "process a sequence step by step" to "attend to everything at once" — arguably the single most consequential idea shift in modern AI.*

#### The Long-Range Dependency Problem (Why RNNs Struggle)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Why do RNNs forget information from many steps ago, even when it's relevant?"
- **Mental Model:** An RNN's memory of the distant past fades the way a whisper fades after being passed down a long line of people.
- **Why Now?:** Having just learned RNNs, this names their specific failure mode — the exact gap that motivates everything else in this phase.
- **Requires:** RNN/LSTM
- **Unlocks:** motivates Attention directly

#### Word Embeddings (Word2Vec, GloVe)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can words be represented so that 'king' and 'queen' end up mathematically close?"
- **Mental Model:** Word embeddings place words in space so that words with similar meaning end up near each other.
- **Why Now?:** Representation learning (Phase 5) applied to words: dense vectors instead of one-hot symbols.
- **Requires:** Representation Learning idea, dot product/cosine similarity
- **Unlocks:** intuition for all later embedding spaces (image, text, multimodal)

#### Sequence-to-Sequence Models, Encoder-Decoder
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can one RNN read a whole sentence and another RNN generate a translated sentence from it?"
- **Mental Model:** An encoder compresses an entire input sequence into one summary vector; a decoder unpacks it into a new sequence.
- **Why Now?:** RNNs process one sequence; many tasks (translation) need to map one sequence to a different one.
- **Requires:** RNN/LSTM
- **Unlocks:** Attention mechanism (was invented to fix Seq2Seq's bottleneck)

#### Attention Mechanism (Bahdanau/Luong Attention)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of compressing an entire sentence into one vector, can the decoder look back at every word directly?"
- **Mental Model:** Attention lets the decoder glance back at every input word and decide, right now, which ones matter most.
- **Why Now?:** Seq2Seq's single summary vector is a bottleneck — attention was invented specifically to fix it.
- **Requires:** Seq2Seq, weighted sums, softmax
- **Unlocks:** Self-Attention, Transformers

#### Self-Attention & Multi-Head Attention (Query/Key/Value)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can every word in a sequence attend to every other word, not just across encoder/decoder?"
- **Mental Model:** Self-attention is every word in a sentence asking every other word, "how relevant are you to me?" and weighting accordingly.
- **Why Now?:** Attention let a decoder look at an encoder's words; self-attention asks what if every word attended to every other word in the same sequence.
- **Requires:** Attention mechanism, linear algebra, softmax
- **Unlocks:** Transformers directly
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●●●

#### The Transformer Architecture (Positional Encoding, Residual Streams, LayerNorm, Feedforward)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can we remove recurrence entirely and still model sequences, using only attention?"
- **Mental Model:** A Transformer is self-attention plus feedforward layers, stacked, with shortcuts (residuals) that keep gradients flowing through depth.
- **Why Now?:** Self-attention is the core mechanism; the Transformer is the full architecture that makes it trainable at scale.
- **Requires:** Self-Attention, residual connections (from CNN/ResNet), LayerNorm
- **Unlocks:** all of modern NLP/vision/multimodal AI (Phase 9)

#### Encoder-Only (BERT), Decoder-Only (GPT), Encoder-Decoder (T5) Family Tree
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Given the same building block, why do BERT, GPT, and T5 look architecturally different?"
- **Mental Model:** Encoder-only reads and understands; decoder-only reads and generates one token at a time; encoder-decoder does both.
- **Why Now?:** Once you understand the Transformer block, the remaining design choice is simply which pieces you keep.
- **Requires:** Transformer
- **Unlocks:** understanding every modern foundation model's design choice

#### Vision Transformers (ViT) — Patch Embedding as Tokenization
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can an image be turned into a sequence of tokens so a Transformer can process it directly?"
- **Mental Model:** A ViT cuts an image into patches and treats each patch like a word in a sentence.
- **Why Now?:** Once Transformers dominate sequences, the natural question is whether images can be tokenized into a sequence too.
- **Requires:** Transformer, CNN (for contrast)
- **Unlocks:** multimodal architectures (Phase 9)

#### Graph Neural Networks (Message Passing, GCN, GAT)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "What if my data's structure is neither a grid nor a sequence, but an arbitrary graph?"
- **Mental Model:** A GNN lets each node update its representation by aggregating messages from its neighbors.
- **Why Now?:** Not every structure is a grid (images) or a line (text) — GNNs generalize representation learning to arbitrary graphs.
- **Requires:** Representation Learning, Attention (for GAT), linear algebra
- **Unlocks:** recommender systems, molecule/graph-structured industrial applications
- **Note:** Important but narrower industrial footprint than Transformers — Tier 2, not Tier 1, unless your domain is graph-structured data.

#### Positional Encodings, Length Generalization, RoPE/ALiBi
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "If attention treats a sequence like an unordered set, how does the model know word order?"
- **Mental Model:** Positional encoding stamps each token with a signature saying "I'm token number 5," since attention alone is order-blind.
- **Why Now?:** Self-attention alone has no notion of word order — this fixes that gap.
- **Requires:** Transformer
- **Unlocks:** understanding modern long-context LLM engineering (Phase 9)

#### Efficient Attention (Sparse/Linear Attention, FlashAttention)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Attention cost grows quadratically with length — can we make it cheaper without losing too much quality?"
- **Mental Model:** Efficient attention approximates "everyone talks to everyone" with cheaper patterns that scale to long sequences.
- **Why Now?:** Self-attention costs grow quadratically with sequence length — a systems-level fix once you understand why that's a problem at scale.
- **Requires:** Self-Attention
- **Unlocks:** systems-level understanding of why modern LLMs are trainable at scale

---

## Phase 7 — Generative Modeling

*From "learn to classify/predict" to "learn to produce." Taught as a family tree with one shared question: how do you represent and sample from p(data)?*

#### The Generative Modeling Question (Density Estimation vs. Sampling vs. Likelihood)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of predicting a label, can a model learn to generate new, realistic data?"
- **Mental Model:** Generative modeling asks not "what label is this" but "could I draw a new, believable example of this category?"
- **Why Now?:** Everything before this phase learned to classify or predict; this reframes the question entirely.
- **Requires:** Probability (Foundation A, Phase 3), Representation Learning
- **Unlocks:** every node below

#### Autoencoders (Full Treatment: Bottleneck, Reconstruction Loss)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can a neural network learn to compress and reconstruct data, generalizing PCA?"
- **Mental Model:** An autoencoder learns to compress data into a bottleneck and then reconstruct it as faithfully as possible.
- **Why Now?:** Revisiting the Phase-4 bridge node in full: PCA was linear compression, this is its nonlinear, neural generalization.
- **Requires:** PCA (as linear special case), MLP/CNN, backpropagation
- **Unlocks:** VAEs, anomaly detection, denoising

#### Variational Autoencoders (ELBO, Reparameterization Trick)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can I make the autoencoder's bottleneck smooth enough that sampling a random point actually generates something realistic?"
- **Mental Model:** A VAE forces the compressed representation into a smooth, well-behaved cloud, so any sampled point decodes into something plausible.
- **Why Now?:** A vanilla autoencoder's bottleneck has no structure for sampling new points — VAEs add probabilistic structure so you can actually sample.
- **Requires:** Autoencoders, KL Divergence, Bayesian Inference
- **Unlocks:** probabilistic latent-variable generative modeling, conceptual bridge to diffusion

#### Generative Adversarial Networks (Minimax Game, Generator/Discriminator, Mode Collapse)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Instead of a reconstruction loss, can a model learn to generate realistic data by fooling another network?"
- **Mental Model:** A GAN is a forger and a detective locked in an arms race, each one getting better because of the other.
- **Why Now?:** An entirely different answer to the same generative question: train two networks against each other.
- **Requires:** neural networks, game-theoretic optimization intuition
- **Unlocks:** historically dominant image-generation idea
- **Note:** Largely superseded by diffusion models for state-of-the-art generation, but essential for understanding adversarial training (reused in RL and robustness) and the *idea* of implicit density modeling.

#### Normalizing Flows (Invertible Transformations, Change of Variables)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I generate data while still computing its exact likelihood, unlike VAEs or GANs?"
- **Mental Model:** A normalizing flow warps a simple distribution into a complex one through a chain of reversible transformations.
- **Why Now?:** VAEs and GANs don't give you an exact likelihood — flows are the alternative that keeps likelihood exact.
- **Requires:** Jacobians, probability density transformation
- **Unlocks:** exact-likelihood generative modeling intuition

#### Energy-Based Models (Unnormalized Density, Contrastive Divergence)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Do I really need a normalized probability, or can I just score how 'good' a data point is?"
- **Mental Model:** An EBM assigns low energy to realistic data and high energy to unrealistic data, without needing the scores to sum to one.
- **Why Now?:** A conceptual bridge: this framing directly foreshadows diffusion's training objective.
- **Requires:** probability, MCMC (conceptual)
- **Unlocks:** conceptual bridge to diffusion-model training objectives

#### Autoregressive Generative Models (Pixel-by-Pixel / Token-by-Token)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I generate complex data by factorizing it into a sequence of simple, conditional predictions?"
- **Mental Model:** An autoregressive model generates one token at a time, each guess conditioned on everything generated so far — this is literally how LLMs write.
- **Why Now?:** Combining the chain rule of probability (A.3) with sequence modeling (Phase 6).
- **Requires:** Chain Rule of Probability, sequence modeling (Phase 6)
- **Unlocks:** this IS how modern LLMs generate text — direct bridge to Phase 9
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●●●

#### Diffusion Models (Forward Noising, Reverse Denoising, Score Matching)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of generating in one shot, can a model generate by gradually reversing a noising process?"
- **Mental Model:** Diffusion learns to slowly un-blur pure noise back into a realistic image, one small denoising step at a time.
- **Why Now?:** Building on VAE intuition (ELBO) and Gaussian noise: gradually destroy data with noise and learn to reverse it.
- **Requires:** Gaussian distributions, VAE (ELBO intuition), gradient-based optimization
- **Unlocks:** state-of-the-art image/audio/video generation, understanding tools like Stable Diffusion/Sora-class systems
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●○○ | Implementation ●●●○○

#### Metric Learning (Contrastive/Triplet Loss, Siamese Networks)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of hand-picking a distance metric, can I learn an embedding space where distance is meaningful?"
- **Mental Model:** Metric learning trains an embedding space so that similar things end up close and dissimilar things end up far apart, on purpose.
- **Why Now?:** Ties distance metrics (A.1) back to representation learning (Phase 5).
- **Requires:** Distance metrics, Representation Learning
- **Unlocks:** face recognition, retrieval systems, contrastive SSL (Phase 8), embedding models used in RAG (Phase 9)

---

## Phase 8 — Cross-Cutting Learning Paradigms

*Not "more algorithms to memorize" — alternative answers to "where does the training signal come from?" and "how does learning generalize across tasks?" Each connects back into Phases 5–7.*

#### Reinforcement Learning: MDPs, Reward, Policy, Value Function
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "Can an agent learn good behavior purely through trial, error, and delayed reward, with no labeled examples?"
- **Mental Model:** RL is learning by trial and error, where the only feedback is a delayed, sometimes sparse reward signal.
- **Why Now?:** A different training signal entirely: instead of labels or reconstruction, learning comes from delayed reward through interaction.
- **Requires:** Probability, Markov Chains (Phase 3), Optimization
- **Unlocks:** RLHF/RLAIF (Phase 9), robotics, game-playing agents
- **Importance:** Industry ●●●○○ | Research ●●●●● | Interview ●●●○○ | Implementation ●●●○○

#### Value-Based RL (Q-Learning, Deep Q-Networks)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I learn the long-term value of each action, then just always pick the best one?"
- **Mental Model:** Q-learning learns a lookup table (or network) of "how good is this action in this situation," then always picks the best one.
- **Why Now?:** The first concrete algorithm family for solving the MDP problem.
- **Requires:** RL fundamentals, neural networks
- **Unlocks:** understanding of foundational deep-RL breakthroughs (Atari, etc.)

#### Policy-Gradient / Actor-Critic Methods (REINFORCE, PPO)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Instead of learning action values, can I optimize the decision-making policy directly?"
- **Mental Model:** Policy gradient nudges the policy's probabilities directly toward whatever actions turned out to earn more reward.
- **Why Now?:** Value-based methods struggle with continuous/huge action spaces; policy gradients optimize the policy directly — and PPO becomes the backbone of RLHF.
- **Requires:** RL fundamentals, gradients of expectations
- **Unlocks:** RLHF — the single most industrially important RL idea today, used to align LLMs
- **Importance:** Industry ●●●●○ | Research ●●●●○ | Interview ●●●○○ | Implementation ●●●○○

#### Self-Supervised Learning (Full: Contrastive — SimCLR/CLIP-Style, Predictive — BERT/MAE-Style)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can a model learn rich representations from unlabeled data alone, at internet scale?"
- **Mental Model:** Contrastive SSL pulls similar things close and pushes different things apart; masked SSL hides part of the input and predicts it back.
- **Why Now?:** The full version of Phase 4's preview: arguably the single most industrially important pretraining idea of the last five years.
- **Requires:** Metric Learning, Autoencoders, Transformer
- **Unlocks:** modern foundation-model pretraining (Phase 9)
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●○ | Implementation ●●●○○

#### Meta-Learning ("Learning to Learn"; MAML)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can a model learn how to learn new tasks quickly, from just a few examples?"
- **Mental Model:** Meta-learning trains a model to be a fast learner, not just a good performer on one fixed task.
- **Why Now?:** A conceptual leap: instead of learning one task, learn how to adapt quickly to any new task — a direct analogy to in-context learning in Phase 9.
- **Requires:** neural networks, gradient-based optimization
- **Unlocks:** few-shot learning intuition, in-context learning analogy (Phase 9)

#### Federated Learning (Decentralized Training, Privacy-Preserving Aggregation)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "Can I train a model on data that legally or practically can never be centralized?"
- **Mental Model:** Federated learning trains a shared model by sending the model to the data, instead of sending the data to the model.
- **Why Now?:** A systems-level answer to a practical constraint: the data can never leave the user's device.
- **Requires:** distributed optimization intuition
- **Unlocks:** mobile/edge ML, privacy-sensitive industrial deployments

#### Evolutionary Algorithms & Genetic Algorithms
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Rare
- **First-Principles Question:** "What if my objective isn't differentiable at all — can I still optimize it?"
- **Mental Model:** Evolutionary algorithms breed, mutate, and select the best-performing solutions across generations, with no gradient required.
- **Why Now?:** A gradient-free alternative, relevant whenever the objective isn't differentiable — a useful contrast to everything gradient-based so far.
- **Requires:** basic optimization intuition
- **Note:** Idea-teaching — gradient-free optimization; useful when the objective is non-differentiable (architecture search, some RL).

#### Swarm Intelligence (Particle Swarm Optimization, Ant Colony Optimization)
- **Tier:** 3 — Awareness
- **Industrial Frequency:** Historical
- **First-Principles Question:** "Can a solution emerge from many simple agents following local rules, with no central controller?"
- **Mental Model:** Swarm intelligence solves problems the way a flock of birds navigates — no leader, just simple local rules.
- **Why Now?:** A sibling idea to evolutionary algorithms: optimization by many simple agents coordinating.
- **Requires:** Evolutionary Algorithms (as sibling idea)
- **Note:** Niche industrial use (routing/scheduling); mostly awareness-level.

#### Neuro-Symbolic AI & Hybrid Systems
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can neural pattern-recognition and symbolic logic cover for each other's weaknesses?"
- **Mental Model:** Neuro-symbolic systems let a neural network handle perception and a symbolic system handle precise logic and rules.
- **Why Now?:** Ties back to Rule-Based Systems (Phase 3): the failures of pure symbolic AI and pure neural nets can patch each other.
- **Requires:** Rule-Based Learning (Phase 3), neural networks
- **Unlocks:** tool-use/agentic reasoning framing in Phase 9 (LLM + symbolic tools = hybrid system in practice)

---

## Phase 9 — Modern AI Engineering

*The payoff phase — where Phases 0–8 combine into the systems currently reshaping industry. Every node here should be taught by explicitly tracing which earlier nodes it depends on.*

#### Large Language Models as Autoregressive Transformers at Scale
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "What happens when you scale autoregressive Transformers up by orders of magnitude?"
- **Mental Model:** An LLM is a next-token predictor that got so large and well-trained that fluent prediction starts to look like reasoning.
- **Why Now?:** The payoff: autoregressive modeling (Phase 7) + the Transformer decoder (Phase 6) + self-supervised pretraining (Phase 8), scaled up.
- **Requires:** Autoregressive models (Phase 7), Transformer decoder (Phase 6), Self-Supervised pretraining (Phase 8)
- **Unlocks:** everything below
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●●● | Implementation ●●●○○

#### Scaling Laws & Emergent Behavior (Conceptual)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "Can I predict how much better a model gets before I spend the money to train it?"
- **Mental Model:** Scaling laws are the empirical curves that let you predict a model's performance before you've even trained it.
- **Why Now?:** Once LLMs exist, the natural engineering question becomes: how do model size, data, and compute trade off predictably?
- **Requires:** LLMs, optimization/compute intuition (Foundation C)
- **Unlocks:** informed intuition about model/data/compute tradeoffs

#### Pretraining → Fine-Tuning → Instruction-Tuning Pipeline
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How does a model that just predicts the next word turn into one that follows instructions?"
- **Mental Model:** Pretraining teaches the model language broadly; fine-tuning teaches it to behave like a helpful assistant specifically.
- **Why Now?:** Explains the actual industrial recipe: SSL (Phase 8) builds a raw base model, supervised fine-tuning turns it into an assistant.
- **Requires:** SSL (Phase 8), supervised fine-tuning basics (Phase 2/5)
- **Unlocks:** understanding of how base models become assistants

#### Parameter-Efficient Fine-Tuning (LoRA, Adapters, Prefix-Tuning)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I customize a massive model without retraining (or even storing) all of its parameters?"
- **Mental Model:** LoRA freezes almost the entire model and only trains a small, low-rank patch on top.
- **Why Now?:** Full fine-tuning of a huge LLM is prohibitively expensive; LoRA reuses SVD/low-rank ideas from Foundation A.
- **Requires:** SVD (A.1), neural-network fine-tuning
- **Unlocks:** practical, affordable customization of foundation models — high industrial value
- **Importance:** Industry ●●●●● | Research ●●●○○ | Interview ●●●○○ | Implementation ●●●●○

#### RLHF / RLAIF / DPO (Alignment via Preference Optimization)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you shape a model's behavior using human preferences instead of labeled 'correct' answers?"
- **Mental Model:** RLHF trains the model against human preferences the way a coach trains an athlete against a scoreboard, not just a rulebook.
- **Why Now?:** Ties policy-gradient RL (Phase 8) to preference modeling: instruction-tuning teaches format, RLHF shapes values and style.
- **Requires:** Policy-gradient RL (Phase 8), Bradley-Terry/preference modeling (Phase 3), Loss functions
- **Unlocks:** understanding how modern assistants are shaped beyond next-token prediction
- **Importance:** Industry ●●●●● | Research ●●●●● | Interview ●●●○○ | Implementation ●●○○○

#### Embeddings & Vector Search (Dense Retrieval, ANN Search — HNSW/IVF)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I search by meaning instead of by exact keyword match?"
- **Mental Model:** Vector search finds "meaning-similar" results the way a normal search finds "keyword-similar" results.
- **Why Now?:** Metric learning (Phase 7) and word embeddings (Phase 6) combine into a practical retrieval system.
- **Requires:** Metric Learning (Phase 7), word/sentence embeddings (Phase 6)
- **Unlocks:** RAG, recommender systems, semantic search

#### Retrieval-Augmented Generation (RAG)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I give an LLM access to facts it was never trained on, without retraining it?"
- **Mental Model:** RAG gives the model an open book to consult before it answers, instead of relying purely on what it memorized during training.
- **Why Now?:** LLMs alone can't know your private data or recent events; RAG fixes that by retrieving relevant chunks via embeddings first.
- **Requires:** Embeddings/Vector Search, LLMs, prompt construction
- **Unlocks:** knowledge-grounded applications; most production LLM systems today
- **Importance:** Industry ●●●●● | Research ●●●○○ | Interview ●●●●○ | Implementation ●●●●●

#### Prompt Engineering & In-Context Learning
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can I change a model's behavior just by changing what I show it, with no training at all?"
- **Mental Model:** In-context learning is the model picking up a new task pattern just from a few examples shown in the prompt, no retraining involved.
- **Why Now?:** A practical consequence of scale: LLMs pick up new tasks from examples in the prompt, echoing meta-learning's "learning to learn" idea.
- **Requires:** LLMs, Meta-Learning analogy (Phase 8)
- **Unlocks:** practical control of model behavior without training

#### Multimodal Models (Vision-Language, Audio-Language; CLIP-Style, Cross-Attention Fusion)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can a single model share one representation space across images, audio, and text?"
- **Mental Model:** Multimodal models learn a shared space where a picture of a dog and the word "dog" end up close together.
- **Why Now?:** Combines ViT (Phase 6) with contrastive SSL (Phase 8): align vision and language representations in one shared space.
- **Requires:** Vision Transformers (Phase 6), Self-Supervised contrastive learning (Phase 8), Transformer cross-attention
- **Unlocks:** modern assistants that see/hear/speak

#### Diffusion-Based Image/Video/Audio Generation in Production Systems
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Occasionally
- **First-Principles Question:** "How do you turn a diffusion model into a fast, controllable product people actually use?"
- **Mental Model:** Production diffusion systems wrap the same denoising idea with a Transformer backbone and heavy engineering for speed and control.
- **Why Now?:** Takes diffusion models (Phase 7) and asks the systems-engineering question of shipping them as a product.
- **Requires:** Diffusion Models (Phase 7), Transformer (as backbone in modern diffusion systems)
- **Unlocks:** generative-media product engineering

#### AI Agents (Tool Use, Planning, Memory, Multi-Step Reasoning)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "Can an LLM go beyond answering questions to actually planning and taking multi-step actions?"
- **Mental Model:** An agent is an LLM in a loop: observe, decide, act with a tool, observe the result, and repeat until the goal is done.
- **Why Now?:** Combines LLMs, RAG, and tool-calling (Phase 8 neuro-symbolic hybrid) with RL-style feedback loops for multi-step planning.
- **Requires:** LLMs, RAG, Neuro-Symbolic ideas (Phase 8, tool-calling as symbolic interface), RL intuition
- **Unlocks:** autonomous and semi-autonomous production systems
- **Importance:** Industry ●●●●● | Research ●●●●○ | Interview ●●●●○ | Implementation ●●●●○

#### Model Context Protocol / Tool-Calling Interfaces (Engineering Pattern)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you standardize the interface between a model's decisions and real-world actions?"
- **Mental Model:** Tool-calling interfaces are a menu the model can order from, structured so its choices are unambiguous to execute.
- **Why Now?:** An engineering pattern, not a new ML idea: once agents need tools, you need a standard, reliable calling interface.
- **Requires:** AI Agents, API design intuition (Foundation D)
- **Unlocks:** practical agent-building in industry

#### Evaluation of Generative Systems (Hallucination Measurement, LLM-as-Judge, Human Eval)
- **Tier:** 1 — Must Master
- **Industrial Frequency:** Daily
- **First-Principles Question:** "How do you grade an answer when there's no single correct answer to compare against?"
- **Mental Model:** Evaluating generative systems means grading open-ended answers, often using another model as the judge.
- **Why Now?:** Phase 1's evaluation metrics don't cleanly apply to open-ended text — this adapts the same underlying question to generative outputs.
- **Requires:** Evaluation metrics (Phase 1), LLMs
- **Unlocks:** responsible/production deployment

#### AI Safety & Alignment (Reward Hacking, Specification Gaming, Interpretability, Red-Teaming)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Weekly
- **First-Principles Question:** "What happens when a model optimizes for the reward signal instead of the intent behind it?"
- **Mental Model:** A misaligned model is a straight-A student who learned to game the test rather than learn the material.
- **Why Now?:** RLHF optimizes for what the reward model says is good — this asks what happens when the model games that reward instead.
- **Requires:** RLHF, LLMs
- **Unlocks:** responsible frontier-model engineering; increasingly a distinct career track

#### Inference-Time Systems Engineering (Quantization, KV-Cache, Batching, Distillation, Speculative Decoding)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "The model works — but can it serve a million users fast enough and cheaply enough?"
- **Mental Model:** Inference engineering is squeezing the same model to answer faster and cheaper, without meaningfully changing what it says.
- **Why Now?:** Once a model works, the industrial question shifts from "can it work" to "can it run fast and cheap enough to serve millions."
- **Requires:** Transformer internals, GPU/compute basics (Foundation C)
- **Unlocks:** production cost/latency optimization — a major real-world AI-engineer responsibility

#### MLOps / LLMOps (Versioning, Monitoring, Data/Feature Pipelines, Drift Detection)
- **Tier:** 2 — Must Understand
- **Industrial Frequency:** Daily
- **First-Principles Question:** "The model works today — will you notice when it quietly stops working six months from now?"
- **Mental Model:** MLOps is the ongoing maintenance schedule that keeps a model from silently rotting after it ships.
- **Why Now?:** A closing, sustaining concern: reusing evaluation metrics and anomaly detection (Phase 4) to keep a deployed model healthy over time.
- **Requires:** Evaluation metrics, Anomaly Detection (Phase 4), Docker/Git (Foundation D)
- **Unlocks:** sustaining ML systems in production long-term

---

## Appendix I — The Dependency Graph (Adjacency List)

*The "true graph" view: every Tier-1 hub node with its full incoming (requires) and outgoing (unlocks) edges consolidated in one place, so you can see the web rather than just the tree. Read incoming edges as "things that must exist before this node" and outgoing edges as "things this node makes possible."*

**Gradient Descent (Optimization, Phase 1)**
- Incoming: Derivatives/Gradients, Chain Rule, ERM
- Outgoing: Linear Regression, Logistic Regression, MLP/Backpropagation, every neural architecture through Phase 9

**Backpropagation (Phase 5)**
- Incoming: Chain Rule, Automatic Differentiation, MLP
- Outgoing: CNN, RNN, Transformer, VAE, GAN, Diffusion, LLMs — every trained neural network downstream

**PCA (Phase 4)**
- Incoming: Eigenvalues/SVD, Variance, Norms
- Outgoing: Autoencoders, t-SNE/UMAP (as contrast), LoRA (via SVD/low-rank reuse)

**Self-Attention (Phase 6)**
- Incoming: Attention Mechanism, linear algebra, softmax
- Outgoing: The Transformer, ViT, GNN (via GAT), Multimodal Models, LLMs

**The Transformer (Phase 6)**
- Incoming: Self-Attention, residual connections, LayerNorm
- Outgoing: BERT/GPT/T5 family, ViT, LLMs, RAG, Agents, Diffusion-in-production (as backbone)

**Autoregressive Generative Models (Phase 7)**
- Incoming: Chain Rule of Probability, sequence modeling (Phase 6)
- Outgoing: LLMs at scale, Prompt Engineering, RAG, Agents

**Diffusion Models (Phase 7)**
- Incoming: Gaussian distributions, VAE/ELBO intuition, gradient-based optimization
- Outgoing: production image/video/audio generation systems

**Self-Supervised Learning, full treatment (Phase 8)**
- Incoming: Metric Learning, Autoencoders, Transformer
- Outgoing: Pretraining pipeline (Phase 9), LLMs, Multimodal Models

**RLHF / DPO (Phase 9)**
- Incoming: Policy-Gradient RL (Phase 8), preference modeling (Phase 3), Loss functions
- Outgoing: aligned/instruction-following assistants, AI Safety & Alignment work

**Embeddings & Vector Search (Phase 9)**
- Incoming: Metric Learning (Phase 7), Word Embeddings (Phase 6)
- Outgoing: RAG, recommender systems, semantic search, agent memory

**AI Agents (Phase 9)**
- Incoming: LLMs, RAG, Neuro-Symbolic tool-calling (Phase 8), RL intuition
- Outgoing: autonomous production systems, Model Context Protocol / tool interfaces

*This appendix intentionally covers hub nodes rather than all 130+ nodes — these are the ones with the highest fan-out, where seeing the full web matters most. Every other node's incoming/outgoing edges are already given inline as its Requires/Unlocks fields above; nothing is hidden, this is just the highlight reel.*

---

## Appendix II — Idea-Teaching-Only Algorithms

*Not industry-critical today, but skipping them leaves a conceptual gap. Treat as Tier 3, but non-negotiable.*

| Algorithm | Why it's kept |
|---|---|
| Perceptron | Teaches the linear-separability limit → motivates MLPs |
| Vanilla RNN | Teaches the vanishing-gradient limit → motivates LSTM → motivates Attention |
| Hidden Markov Models | Teaches sequential/latent structure before attention existed |
| GANs | Teaches adversarial training before diffusion dominance |
| Rule-Based Expert Systems | Teaches why pure symbolic AI didn't scale → motivates statistical learning, and later, neuro-symbolic hybrids |
| Normalizing Flows / Energy-Based Models | Teach alternative density-modeling views that clarify what diffusion models are actually doing |

---

## Appendix III — Suggested 8–12 Month Timeline

| Month(s) | Phases | Milestone Project |
|---|---|---|
| 1 | Foundations A–D + Phase 1 | Implement gradient descent & a loss-function library from scratch; set up Git/Docker workflow |
| 2 | Phase 2 (Linear/Tree/Ensembles) | Kaggle-style tabular competition using from-scratch + library models |
| 3 | Phase 3 + Phase 4 | Bayesian A/B testing tool + clustering/anomaly-detection mini-project |
| 4–5 | Phase 5 (Neural foundations, CNN/RNN) | Image classifier + a from-scratch backprop MLP library |
| 6 | Phase 6 (Attention/Transformers) | Implement a mini-GPT (nanoGPT-style) from scratch |
| 7 | Phase 7 (Generative modeling) | Train a small VAE and a small diffusion model on toy data |
| 8 | Phase 8 (RL, SSL, meta/federated) | Small RLHF-style loop; a contrastive self-supervised embedding model |
| 9–10 | Phase 9 (LLM engineering, RAG, agents) | Build a full RAG pipeline + a tool-using agent |
| 11–12 | Integration + specialization | Choose a research OR engineering track; capstone spanning ≥3 phases |

---

## Appendix IV — Design Notes for a Future Textbook Author

1. Never introduce a node without first stating its **Requires** and immediately after stating its **Unlocks** — this is what keeps the book idea-first rather than algorithm-first.
2. Every Tier-1 node needs a from-scratch NumPy implementation chapter section; every Tier-2 node needs at least a from-scratch toy version; Tier-3 nodes need only exposition.
3. When two branches reconverge (e.g., Phases 2/3/4 → Phase 5), the chapter should explicitly say: "You now have three different answers to the same question — notice they're all doing implicit representation learning."
4. Revisit older nodes when new ones subsume them (e.g., re-visit PCA when teaching Autoencoders; re-visit GANs when teaching Diffusion) — reinforces the graph structure rather than presenting history as a flat timeline.
5. Flag open research questions honestly (e.g., "why deep nets generalize despite high capacity" is still not fully solved) rather than presenting closed-book certainty.

---

## Appendix V — Standard Chapter Template

Applied to every Tier-1 and Tier-2 node when expanded into a full chapter:

Definition · Motivation/Why it exists · Historical context · Intuition · Mathematical formulation · Geometric interpretation · Worked example by hand · From-scratch implementation (NumPy) · Standard library usage (sklearn/PyTorch/JAX) · Visual intuition · Common mistakes · Interview questions · Industrial applications · Research applications · Links to previous nodes · Links to future nodes · Summary

---

## Version History

| Version | Contents |
|---|---|
| v0.1 | Initial curriculum |
| **v0.2 (this document)** | Added "Why Now?", Mental Models, First-Principles Questions, Industrial Frequency; split Foundation into A (Math) / B (Programming) / C (Computer Science) / D (Data Engineering Basics — new); added Appendix I dependency-graph adjacency list for hub nodes |
| v0.3 | Add explicit dependency-graph edges across the *entire* document, not just hub nodes |
| v0.4 | Expand every Tier-1 node into a full chapter using the Appendix V template |
| v1.0 | Complete AI Engineering Knowledge Graph |

Treat this like software, not a frozen document — it evolves as understanding deepens.
