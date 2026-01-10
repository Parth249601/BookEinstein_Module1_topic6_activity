# AI Training Lab: How AI Learns

<div align="center">

**An Interactive Educational Game to Experience Three Types of Machine Learning**

[Getting Started](#-getting-started) • [Key Concepts](#-key-concepts) • [How to Play](#-how-to-play) • [Labs Overview](#-labs-overview)

</div>

---

## 📖 Overview

**AI Training Lab** is a hands-on, interactive web-based game that teaches players how artificial intelligence actually learns through three distinct learning paradigms:

- **Supervised Learning** - Learning from labeled examples
- **Unsupervised Learning** - Finding hidden patterns without labels
- **Reinforcement Learning** - Learning through trial, error, and rewards

Unlike traditional lessons, this game puts YOU in control—you become the AI trainer and experience firsthand how machines acquire knowledge.

---

## 🎓 Key Concepts

Understanding these three learning types is fundamental to grasping how AI works:

### 1. Supervised Learning 🟣

**"Learning with a Teacher"**

| Aspect              | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| **How It Works**    | AI learns from labeled examples—you show it data AND tell it the correct answer  |
| **Real-World Uses** | Email spam detection, image recognition, medical diagnosis, language translation |
| **In This Game**    | You label images (emojis) with categories, then test if the AI learned correctly |

**The Training Loop:**

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│ Show Data  │ ─▶ │ Make Guess │ ─▶ │Check Answer│ ─▶ │  Adjust    │
│   📊       │    │   💡       │    │    ⚖️      │    │    🔧      │
└────────────┘    └────────────┘    └────────────┘    └────────────┘
                              ↑                              │
                              └────── Repeat millions ───────┘
```

### 2. Unsupervised Learning 🔵

**"Learning Without a Teacher"**

| Aspect              | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| **How It Works**    | AI finds hidden patterns and groups in data WITHOUT being told what to look for   |
| **Real-World Uses** | Customer segmentation, music recommendations, anomaly detection, data compression |
| **In This Game**    | You group shapes by finding hidden patterns—just like AI clustering algorithms    |

**Key Insight:** The AI discovers structure in data on its own. In this lab, shapes can be grouped by color, size, OR shape—there's no "right" answer, just patterns!

### 3. Reinforcement Learning 🟢

**"Learning by Doing"**

| Aspect              | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| **How It Works**    | AI learns through trial and error—getting rewards for good actions and penalties for bad ones                |
| **Real-World Uses** | Game-playing AI, robotics, self-driving cars, stock trading, recommendation engines                          |
| **In This Game**    | You guide a robot to a goal, earning points for moves that get closer and losing points for wrong directions |

**The Reward System:**
| Action | Points | Meaning |
|--------|--------|---------|
| Move closer to goal | +10 | Good choice! |
| Move away from goal | -5 | Wrong direction! |
| Reach the goal | +100 | Success! |

---

## 🎮 How to Play

### Game Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   WELCOME   │ ──▶ │   LAB 1     │ ──▶ │   LAB 2     │ ──▶ │   LAB 3     │
│   SCREEN    │     │ Supervised  │     │Unsupervised │     │Reinforcement│
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────┐
                                                           │   RESULTS   │
                                                           │   SCREEN    │
                                                           └─────────────┘
```

### Step-by-Step Guide

#### 1. **Welcome Screen**

- Read the overview of all three labs
- Understand what you'll learn in each
- Click **"Enter the AI Lab!"** to begin

#### 2. **Lab 1: Supervised Learning**

- **Introduction**: Read how supervised learning works
- **Training Phase**:
  - See an emoji (🐕, 🚗, 🍎, etc.)
  - Click the correct category: **Animal**, **Vehicle**, or **Fruit**
  - Watch the training loop animation showing how AI learns from your label
- **Testing Phase**:
  - The AI now tries to classify NEW images it hasn't seen
  - See if your training was accurate!
- **Results**: View the AI's accuracy percentage

#### 3. **Lab 2: Unsupervised Learning**

- **Introduction**: Learn about pattern finding without labels
- **Grouping Phase**:
  - See a collection of shapes (circles, squares, triangles in different colors)
  - Click a shape, then click a group (A, B, or C) to place it
  - Try to find the hidden pattern!
- **Discovery**: See if you found the shape-based pattern or another valid grouping

#### 4. **Lab 3: Reinforcement Learning**

- **Introduction**: Understand reward-based learning
- **Playing Phase**:
  - Control a robot (🤖) on a 4×4 grid
  - Navigate to the star (⭐) in the corner
  - Use arrow buttons: ↑ ↓ ← →
  - Watch your reward score change based on your moves
- **Goal**: Reach the target with maximum points (fewer moves = bonus!)

#### 5. **Results Screen**

- See your total score across all labs
- View achievements unlocked
- See time spent
- Option to play again

### Scoring System

| Lab                    | Max Points | How to Earn                    |
| ---------------------- | ---------- | ------------------------------ |
| Supervised Learning    | 150        | High accuracy on testing phase |
| Unsupervised Learning  | 150        | Finding the correct pattern    |
| Reinforcement Learning | 250+       | Reaching goal efficiently      |

### Achievements

| Badge | Title          | How to Unlock                        |
| ----- | -------------- | ------------------------------------ |
| 🎓    | Teacher        | Score 100+ in Supervised Lab         |
| 🔍    | Pattern Finder | Score 100+ in Unsupervised Lab       |
| 🎮    | Game Master    | Score 150+ in Reinforcement Lab      |
| ⚡    | Speed Learner  | Complete all labs in under 5 minutes |
| 🏆    | AI Expert      | Total score 400+                     |

---

## 🧪 Labs Overview

### Lab 1: Supervised Learning - Image Classifier

**Your Role:** AI Teacher

**Task:** Label training images so the AI learns to categorize objects

**Categories:**

- 🐾 **Animals**: Dog, Cat, Bird, Fish
- 🚗 **Vehicles**: Car, Bicycle, Airplane, Bus
- 🍎 **Fruits**: Apple, Banana, Orange, Grapes

**Training Items:** 6 labeled examples
**Test Items:** 3 new images the AI hasn't seen

---

### Lab 2: Unsupervised Learning - Pattern Finder

**Your Role:** Pattern Detective

**Task:** Group shapes by discovering hidden similarities

**Available Shapes:**

- 🔴 🟢 🔵 Small circles
- 🟥 🟩 🟦 Large squares
- 🔺 🔻 Medium triangles

**Goal:** Find patterns like grouping by shape (circles vs squares vs triangles)

---

### Lab 3: Reinforcement Learning - Robot Navigator

**Your Role:** Robot Controller

**Task:** Guide the robot from start to goal using trial and error

**Grid:** 4×4 playing field
**Start Position:** Top-left corner (0,0)
**Goal Position:** Bottom-right corner (3,3)

**Optimal Path:** 6 moves (3 right + 3 down)

---

## 🧠 Learning Objectives

After completing all three labs, players will:

1. ✅ **Understand** the difference between supervised, unsupervised, and reinforcement learning
2. ✅ **Experience** how labels affect AI training accuracy
3. ✅ **Discover** how AI finds patterns without human guidance
4. ✅ **Learn** how reward signals guide AI behavior
5. ✅ **Apply** these concepts to recognize real-world AI applications

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v18.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Navigate to the project directory:**

   ```bash
   cd HowAILearnsActivity
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Create production build                  |
| `npm start`     | Run production server                    |
| `npm run lint`  | Run ESLint for code quality checks       |

---

## 🏗️ Project Structure

```
HowAILearnsActivity/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main entry point
├── components/
│   ├── how-ai-learns-game.tsx   # Main game component with all 3 labs
│   └── ui/                      # Reusable UI components (Button, Card, etc.)
├── lib/
│   └── utils.ts             # Utility functions
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 Tech Stack

| Technology         | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| **Next.js 15**     | React framework with App Router                   |
| **React 19**       | UI component library                              |
| **TypeScript 5**   | Type-safe JavaScript                              |
| **Tailwind CSS 4** | Utility-first styling                             |
| **Radix UI**       | Accessible UI primitives (Dialog, Progress, Tabs) |
| **Lucide React**   | Beautiful icon library                            |

---

## 🎯 Educational Use Cases

This game is perfect for:

- **Students (ages 10+)** learning about AI fundamentals
- **Teachers** introducing machine learning concepts interactively
- **Anyone curious** about how AI systems learn differently
- **STEM programs** teaching computational thinking

---

## 📊 Real-World Connections

| Lab               | Real-World AI Applications                                           |
| ----------------- | -------------------------------------------------------------------- |
| **Supervised**    | Gmail spam filter, Face ID, Google Translate, Medical X-ray analysis |
| **Unsupervised**  | Spotify playlist grouping, Netflix recommendations, Fraud detection  |
| **Reinforcement** | AlphaGo, Tesla Autopilot, Robot walking, Game-playing AI             |

---

<div align="center">

**Built with ❤️ for AI Education**

_Learn by DOING, not just reading!_

</div>
