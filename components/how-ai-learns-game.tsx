"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Brain,
  Zap,
  Target,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
  Flame,
  Award,
  Clock,
  Play,
  Database,
  Scale,
  Wrench,
  Gamepad2,
  Search,
  Users,
  Heart,
  Music,
  Camera,
  Youtube,
  Mic,
  Globe,
  BookOpen,
  Star,
  ArrowRight,
  RefreshCw,
  Puzzle,
} from "lucide-react"

// ============================================
// ANIMATED COMPONENTS
// ============================================

// Training Loop Animation
const TrainingLoopVisual = ({ step, isAnimating }: { step: number; isAnimating: boolean }) => {
  const steps = [
    { icon: Database, label: "Show Data", color: "from-violet-500 to-purple-500" },
    { icon: Lightbulb, label: "Make Guess", color: "from-cyan-500 to-blue-500" },
    { icon: Scale, label: "Check Answer", color: "from-green-500 to-emerald-500" },
    { icon: Wrench, label: "Adjust", color: "from-orange-500 to-amber-500" },
  ]

  return (
    <div className="relative w-full py-4">
      <div className="flex items-center justify-between relative">
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = step === i
          const isPast = step > i
          
          return (
            <div key={i} className="flex flex-col items-center z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? `bg-gradient-to-br ${s.color} shadow-lg scale-110 ring-4 ring-white/50`
                    : isPast
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-gray-100 border-2 border-gray-200"
                } ${isAnimating && isActive ? "animate-bounce" : ""}`}
              >
                <Icon className={`w-7 h-7 ${isActive ? "text-white" : isPast ? "text-green-600" : "text-gray-400"}`} />
              </div>
              <span className={`text-xs mt-2 font-medium ${isActive ? "text-violet-700" : "text-gray-500"}`}>
                {s.label}
              </span>
            </div>
          )
        })}
        
        {/* Connection lines */}
        <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 -z-0">
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-green-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Repeat arrow */}
      <div className="flex justify-center mt-4">
        <div className={`flex items-center gap-2 text-sm ${step === 3 ? "text-violet-600 animate-pulse" : "text-gray-400"}`}>
          <RefreshCw className="w-4 h-4" />
          <span>Repeat millions of times!</span>
        </div>
      </div>
    </div>
  )
}

// Confetti Effect
const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <span className="text-2xl">
            {["🎉", "⭐", "🧠", "✨", "🎊", "💜", "💙", "🏆"][Math.floor(Math.random() * 8)]}
          </span>
        </div>
      ))}
    </div>
  )
}

// Achievement Badge
const AchievementBadge = ({ icon, title, unlocked }: { icon: string; title: string; unlocked: boolean }) => {
  return (
    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
      unlocked 
        ? "bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-400 shadow-lg scale-100" 
        : "bg-gray-100 border-2 border-gray-200 opacity-50 scale-95"
    }`}>
      <span className={`text-2xl ${unlocked ? "" : "grayscale"}`}>{icon}</span>
      <span className={`text-xs font-medium text-center ${unlocked ? "text-yellow-700" : "text-gray-400"}`}>{title}</span>
    </div>
  )
}

// Data Item for Training
type DataItem = {
  id: number
  emoji: string
  label: string
  category: string
}

// ============================================
// LEARNING TYPE LABS
// ============================================

// Lab 1: Supervised Learning - Image Classification Trainer
const SupervisedLab = ({ onComplete, onScore }: { onComplete: () => void; onScore: (points: number) => void }) => {
  const [phase, setPhase] = useState<"intro" | "training" | "testing" | "complete">("intro")
  const [trainingData, setTrainingData] = useState<DataItem[]>([])
  const [currentItem, setCurrentItem] = useState(0)
  const [userLabels, setUserLabels] = useState<Record<number, string>>({})
  const [testResults, setTestResults] = useState<boolean[]>([])
  const [aiAccuracy, setAiAccuracy] = useState(0)
  const [trainingStep, setTrainingStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const allItems: DataItem[] = [
    { id: 1, emoji: "🏰", label: "Castle", category: "monument" },
    { id: 2, emoji: "🗽", label: "Statue of Liberty", category: "monument" },
    { id: 3, emoji: "⚽", label: "Football", category: "sport" },
    { id: 4, emoji: "🏀", label: "Basketball", category: "sport" },
    { id: 5, emoji: "💻", label: "Laptop", category: "computer" },
    { id: 6, emoji: "🖥️", label: "Desktop PC", category: "computer" },
    { id: 7, emoji: "🏛️", label: "Parthenon", category: "monument" },
    { id: 8, emoji: "🎾", label: "Tennis", category: "sport" },
    { id: 9, emoji: "⌨️", label: "Keyboard", category: "computer" },
    { id: 10, emoji: "🏟️", label: "Colosseum", category: "monument" },
  ]

  const testItems: DataItem[] = [
    { id: 11, emoji: "🕌", label: "Taj Mahal", category: "monument" },
    { id: 12, emoji: "🏈", label: "American Football", category: "sport" },
    { id: 13, emoji: "🖱️", label: "Mouse", category: "computer" },
  ]

  useEffect(() => {
    setTrainingData(allItems.slice(0, 6))
  }, [])

  const handleLabel = (itemId: number, category: string) => {
    setUserLabels({ ...userLabels, [itemId]: category })
    
    // Animate training loop
    setIsAnimating(true)
    let step = 0
    const interval = setInterval(() => {
      setTrainingStep(step)
      step++
      if (step > 3) {
        clearInterval(interval)
        setIsAnimating(false)
        if (currentItem < trainingData.length - 1) {
          setCurrentItem(currentItem + 1)
        } else {
          setPhase("testing")
          setCurrentItem(0)
        }
      }
    }, 400)
  }

  const handleTest = (category: string) => {
    const correct = testItems[currentItem].category === category
    setTestResults([...testResults, correct])
    
    if (currentItem < testItems.length - 1) {
      setCurrentItem(currentItem + 1)
    } else {
      const accuracy = Math.round(([...testResults, correct].filter(Boolean).length / testItems.length) * 100)
      setAiAccuracy(accuracy)
      setPhase("complete")
      const points = accuracy >= 100 ? 150 : accuracy >= 66 ? 100 : 50
      onScore(points)
    }
  }

  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl mb-4 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Supervised Learning Lab</h3>
          <p className="text-gray-600 mt-2">Be the teacher! Label data to train your AI</p>
        </div>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-2xl border-2 border-violet-200">
          <h4 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> How It Works
          </h4>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
              <span>You&apos;ll see images (emojis) and label them with categories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
              <span>Watch the AI learn from YOUR labels!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
              <span>Test the AI on new images to see how well it learned</span>
            </li>
          </ol>
        </div>
        
        <Button
          onClick={() => setPhase("training")}
          className="w-full h-14 text-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        >
          Start Training <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  }

  if (phase === "training") {
    const item = trainingData[currentItem]
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-violet-100 text-violet-700">Training Phase</Badge>
          <span className="text-sm text-gray-500">{currentItem + 1} / {trainingData.length}</span>
        </div>
        
        <Progress value={((currentItem + 1) / trainingData.length) * 100} className="h-2" />
        
        {/* Training Loop Visualization */}
        <TrainingLoopVisual step={trainingStep} isAnimating={isAnimating} />
        
        {/* Current Item */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center shadow-lg">
          <p className="text-sm text-gray-500 mb-2">What category is this?</p>
          <div className="text-8xl mb-4 animate-bounce">{item.emoji}</div>
          <p className="text-lg font-medium text-gray-700">{item.label}</p>
        </div>
        
        {/* Category Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {["monument", "sport", "computer"].map((cat) => (
            <Button
              key={cat}
              onClick={() => handleLabel(item.id, cat)}
              disabled={isAnimating}
              className={`h-16 text-lg capitalize ${
                cat === "monument" ? "bg-amber-500 hover:bg-amber-600" :
                cat === "sport" ? "bg-green-500 hover:bg-green-600" :
                "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {cat === "monument" ? "🏛️" : cat === "sport" ? "⚽" : "💻"} {cat}
            </Button>
          ))}
        </div>
        
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-yellow-800">
            <Lightbulb className="w-4 h-4 inline mr-1" />
            Each label you give teaches the AI what things look like!
          </p>
        </div>
      </div>
    )
  }

  if (phase === "testing") {
    const item = testItems[currentItem]
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-cyan-100 text-cyan-700">Testing Phase</Badge>
          <span className="text-sm text-gray-500">{currentItem + 1} / {testItems.length}</span>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border-2 border-cyan-200">
          <p className="text-cyan-800 text-center">
            <Brain className="w-4 h-4 inline mr-1" />
            Now let&apos;s see if your AI learned correctly! Classify these NEW items.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center shadow-lg">
          <p className="text-sm text-gray-500 mb-2">NEW: What category is this?</p>
          <div className="text-8xl mb-4">{item.emoji}</div>
          <p className="text-lg font-medium text-gray-700">{item.label}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {["monument", "sport", "computer"].map((cat) => (
            <Button
              key={cat}
              onClick={() => handleTest(cat)}
              variant="outline"
              className="h-16 text-lg capitalize border-2 hover:border-violet-400 hover:bg-violet-50"
            >
              {cat === "monument" ? "🏛️" : cat === "sport" ? "⚽" : "💻"} {cat}
            </Button>
          ))}
        </div>
        
        {testResults.length > 0 && (
          <div className="flex justify-center gap-2">
            {testResults.map((r, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${r ? "bg-green-100" : "bg-red-100"}`}>
                {r ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">{aiAccuracy === 100 ? "🎉" : aiAccuracy >= 66 ? "👍" : "📚"}</div>
      <h3 className="text-2xl font-bold text-gray-800">Training Complete!</h3>
      
      <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl p-6 border-2 border-violet-200">
        <p className="text-sm text-violet-600 mb-2">AI Accuracy</p>
        <p className="text-5xl font-black text-violet-700">{aiAccuracy}%</p>
        <Progress value={aiAccuracy} className="mt-4 h-3" />
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800">
          <Lightbulb className="w-4 h-4 inline mr-1" />
          {aiAccuracy === 100 
            ? "Perfect! Your labels taught the AI perfectly!" 
            : "Real AI needs MILLIONS of examples to get better!"}
        </p>
      </div>
      
      <Button onClick={onComplete} className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500">
        Continue to Next Lab <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

// Lab 2: Unsupervised Learning - Pattern Finder
const UnsupervisedLab = ({ onComplete, onScore }: { onComplete: () => void; onScore: (points: number) => void }) => {
  const [phase, setPhase] = useState<"intro" | "grouping" | "complete">("intro")
  const [items] = useState([
    { id: 1, emoji: "🔴", size: "small", shape: "circle" },
    { id: 2, emoji: "🟢", size: "small", shape: "circle" },
    { id: 3, emoji: "🔵", size: "small", shape: "circle" },
    { id: 4, emoji: "🟥", size: "large", shape: "square" },
    { id: 5, emoji: "🟩", size: "large", shape: "square" },
    { id: 6, emoji: "🟦", size: "large", shape: "square" },
    { id: 7, emoji: "🔺", size: "medium", shape: "triangle" },
    { id: 8, emoji: "🔻", size: "medium", shape: "triangle" },
  ])
  const [groups, setGroups] = useState<Record<string, number[]>>({ A: [], B: [], C: [] })
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [discovered, setDiscovered] = useState<string | null>(null)

  const unassignedItems = items.filter(item => 
    !Object.values(groups).flat().includes(item.id)
  )

  const handleDrop = (groupId: string) => {
    if (selectedItem !== null) {
      setGroups({
        ...groups,
        [groupId]: [...groups[groupId], selectedItem]
      })
      setSelectedItem(null)
    }
  }

  const checkPatterns = () => {
    // Check if user found a valid pattern (by shape or by color)
    const groupA = items.filter(i => groups.A.includes(i.id))
    const groupB = items.filter(i => groups.B.includes(i.id))
    const groupC = items.filter(i => groups.C.includes(i.id))
    
    // Check shape pattern
    const shapePattern = 
      groupA.every(i => i.shape === groupA[0]?.shape) && groupA.length >= 2 &&
      groupB.every(i => i.shape === groupB[0]?.shape) && groupB.length >= 2 &&
      groupC.every(i => i.shape === groupC[0]?.shape) && groupC.length >= 2
    
    if (shapePattern) {
      setDiscovered("shape")
      onScore(150)
    } else if (Object.values(groups).flat().length === items.length) {
      setDiscovered("attempt")
      onScore(75)
    }
    
    if (Object.values(groups).flat().length === items.length) {
      setPhase("complete")
    }
  }

  useEffect(() => {
    if (Object.values(groups).flat().length === items.length && phase === "grouping") {
      checkPatterns()
    }
  }, [groups])

  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-4 shadow-lg">
            <Puzzle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Unsupervised Learning Lab</h3>
          <p className="text-gray-600 mt-2">Find hidden patterns without any labels!</p>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200">
          <h4 className="font-bold text-cyan-800 mb-3 flex items-center gap-2">
            <Search className="w-5 h-5" /> The Challenge
          </h4>
          <p className="text-gray-700 mb-3">
            You&apos;ll see shapes with NO LABELS. Your job is to find patterns and group similar items together - just like AI does!
          </p>
          <p className="text-cyan-700 font-medium">
            Can you discover what makes things similar?
          </p>
        </div>
        
        <Button
          onClick={() => setPhase("grouping")}
          className="w-full h-14 text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
        >
          Start Pattern Hunt <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  }

  if (phase === "grouping") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-cyan-100 text-cyan-700">Pattern Finding</Badge>
          <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
            {showHint ? "Hide" : "Show"} Hint 💡
          </Button>
        </div>
        
        {showHint && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
            💡 Look at the SHAPES! Circles, squares, and triangles...
          </div>
        )}
        
        {/* Unassigned items */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Click an item, then click a group to place it:</p>
          <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
            {unassignedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`text-4xl p-2 rounded-xl transition-all ${
                  selectedItem === item.id 
                    ? "bg-cyan-100 ring-4 ring-cyan-400 scale-110" 
                    : "hover:bg-gray-100"
                }`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Groups */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(groups).map(([groupId, itemIds]) => (
            <button
              key={groupId}
              onClick={() => handleDrop(groupId)}
              className={`bg-white rounded-xl border-2 p-4 min-h-[140px] transition-all ${
                selectedItem !== null 
                  ? "border-cyan-400 border-dashed hover:bg-cyan-50 cursor-pointer" 
                  : "border-gray-200"
              }`}
            >
              <p className="text-sm font-medium text-gray-500 mb-2">Group {groupId}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {itemIds.map((id) => {
                  const item = items.find(i => i.id === id)
                  return <span key={id} className="text-3xl">{item?.emoji}</span>
                })}
              </div>
            </button>
          ))}
        </div>
        
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4 text-center">
          <p className="text-cyan-800">
            <Brain className="w-4 h-4 inline mr-1" />
            AI finds patterns in data WITHOUT being told what to look for!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">{discovered === "shape" ? "🎉" : "🧩"}</div>
      <h3 className="text-2xl font-bold text-gray-800">Pattern Discovery!</h3>
      
      <div className={`rounded-2xl p-6 border-2 ${
        discovered === "shape" 
          ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300" 
          : "bg-gradient-to-br from-cyan-100 to-blue-100 border-cyan-300"
      }`}>
        {discovered === "shape" ? (
          <>
            <p className="text-green-700 font-bold text-lg">You found the SHAPE pattern! 🎯</p>
            <p className="text-green-600 mt-2">Circles, Squares, and Triangles - just like AI clustering!</p>
          </>
        ) : (
          <>
            <p className="text-cyan-700 font-bold text-lg">Good effort! 👏</p>
            <p className="text-cyan-600 mt-2">The hidden pattern was SHAPES - AI would group by circles, squares, triangles!</p>
          </>
        )}
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800">
          <Lightbulb className="w-4 h-4 inline mr-1" />
          Unsupervised learning helps AI discover customer groups, find similar songs, and more!
        </p>
      </div>
      
      <Button onClick={onComplete} className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500">
        Continue to Final Lab <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

// Lab 3: Reinforcement Learning - Reward Game
const ReinforcementLab = ({ onComplete, onScore }: { onComplete: () => void; onScore: (points: number) => void }) => {
  const [phase, setPhase] = useState<"intro" | "playing" | "complete">("intro")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition] = useState({ x: 3, y: 3 })
  const [totalReward, setTotalReward] = useState(0)
  const [moves, setMoves] = useState(0)
  const [lastReward, setLastReward] = useState<number | null>(null)
  const [history, setHistory] = useState<Array<{ move: string; reward: number }>>([])
  const gridSize = 4

  const calculateReward = (newX: number, newY: number) => {
    const oldDistance = Math.abs(position.x - targetPosition.x) + Math.abs(position.y - targetPosition.y)
    const newDistance = Math.abs(newX - targetPosition.x) + Math.abs(newY - targetPosition.y)
    
    if (newX === targetPosition.x && newY === targetPosition.y) {
      return 100 // Reached goal!
    } else if (newDistance < oldDistance) {
      return 10 // Getting closer
    } else if (newDistance > oldDistance) {
      return -5 // Moving away
    }
    return 0
  }

  const move = (direction: string) => {
    let newX = position.x
    let newY = position.y
    
    switch (direction) {
      case "up": newY = Math.max(0, position.y - 1); break
      case "down": newY = Math.min(gridSize - 1, position.y + 1); break
      case "left": newX = Math.max(0, position.x - 1); break
      case "right": newX = Math.min(gridSize - 1, position.x + 1); break
    }
    
    const reward = calculateReward(newX, newY)
    setPosition({ x: newX, y: newY })
    setTotalReward(totalReward + reward)
    setLastReward(reward)
    setMoves(moves + 1)
    setHistory([...history, { move: direction, reward }])
    
    if (newX === targetPosition.x && newY === targetPosition.y) {
      setTimeout(() => {
        setPhase("complete")
        const bonus = moves <= 6 ? 100 : moves <= 10 ? 50 : 0
        onScore(150 + bonus)
      }, 500)
    }
  }

  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-4 shadow-lg">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Reinforcement Learning Lab</h3>
          <p className="text-gray-600 mt-2">Learn by playing - get rewards for good moves!</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5" /> The Game
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-xl">🤖</span> You control the robot (start at top-left)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl">⭐</span> Reach the star (bottom-right)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 font-bold">+10</span> points for moves that get CLOSER
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500 font-bold">-5</span> points for moves that go FARTHER
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold">+100</span> bonus for reaching the goal!
            </li>
          </ul>
        </div>
        
        <Button
          onClick={() => setPhase("playing")}
          className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          Start Playing <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  }

  if (phase === "playing") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-green-100 text-green-700">Learning by Playing</Badge>
          <div className="flex items-center gap-4">
            <span className="text-sm">Moves: <strong>{moves}</strong></span>
            <span className={`text-lg font-bold ${totalReward >= 0 ? "text-green-600" : "text-red-600"}`}>
              Score: {totalReward > 0 ? "+" : ""}{totalReward}
            </span>
          </div>
        </div>
        
        {/* Last reward feedback */}
        {lastReward !== null && (
          <div className={`text-center py-2 rounded-lg font-bold animate-pulse ${
            lastReward > 0 ? "bg-green-100 text-green-700" : 
            lastReward < 0 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
          }`}>
            {lastReward > 0 ? `+${lastReward} Great move! 👍` : 
             lastReward < 0 ? `${lastReward} Wrong direction! 👎` : "No change"}
          </div>
        )}
        
        {/* Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-1 bg-gray-200 p-2 rounded-xl">
            {[...Array(gridSize * gridSize)].map((_, i) => {
              const x = i % gridSize
              const y = Math.floor(i / gridSize)
              const isRobot = position.x === x && position.y === y
              const isTarget = targetPosition.x === x && targetPosition.y === y
              
              return (
                <div
                  key={i}
                  className={`w-14 h-14 rounded-lg flex items-center justify-center text-3xl transition-all ${
                    isRobot && isTarget ? "bg-yellow-300" :
                    isRobot ? "bg-blue-400" :
                    isTarget ? "bg-yellow-200" : "bg-white"
                  }`}
                >
                  {isRobot && isTarget ? "🎉" :
                   isRobot ? "🤖" :
                   isTarget ? "⭐" : ""}
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <Button onClick={() => move("up")} className="w-16 h-12 bg-gray-700">↑</Button>
          <div className="flex gap-2">
            <Button onClick={() => move("left")} className="w-16 h-12 bg-gray-700">←</Button>
            <Button onClick={() => move("down")} className="w-16 h-12 bg-gray-700">↓</Button>
            <Button onClick={() => move("right")} className="w-16 h-12 bg-gray-700">→</Button>
          </div>
        </div>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800">
            <Brain className="w-4 h-4 inline mr-1" />
            AI learns which actions give rewards - just like you&apos;re learning now!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">🏆</div>
      <h3 className="text-2xl font-bold text-gray-800">Goal Reached!</h3>
      
      <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-300">
        <p className="text-sm text-green-600 mb-2">Final Score</p>
        <p className="text-5xl font-black text-green-700">+{totalReward}</p>
        <p className="text-green-600 mt-2">in {moves} moves</p>
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800">
          <Lightbulb className="w-4 h-4 inline mr-1" />
          This is how AI learns to play games, drive cars, and control robots - by trying actions and learning from rewards!
        </p>
      </div>
      
      <Button onClick={onComplete} className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500">
        See Final Results <Trophy className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

// ============================================
// MAIN GAME COMPONENT
// ============================================

export default function HowAILearnsGame() {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "complete">("welcome")
  const [currentLab, setCurrentLab] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [timeSpent, setTimeSpent] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const labs = [
    { id: "supervised", title: "Supervised Learning", icon: Users, color: "from-violet-500 to-purple-500" },
    { id: "unsupervised", title: "Unsupervised Learning", icon: Puzzle, color: "from-cyan-500 to-blue-500" },
    { id: "reinforcement", title: "Reinforcement Learning", icon: Gamepad2, color: "from-green-500 to-emerald-500" },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing") {
      interval = setInterval(() => setTimeSpent(t => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  const handleLabComplete = () => {
    if (currentLab < labs.length - 1) {
      setCurrentLab(currentLab + 1)
    } else {
      setShowConfetti(true)
      setGameState("complete")
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  const handleScore = (points: number) => {
    setScores([...scores, points])
  }

  const totalScore = scores.reduce((a, b) => a + b, 0)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Welcome Screen
  if (gameState === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-blue-900 p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <Card className="max-w-3xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-xl relative z-10">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 blur-3xl opacity-50 rounded-full animate-pulse" />
                <div className="relative flex gap-4 items-center">
                  <div className="text-6xl animate-bounce">🎓</div>
                  <Brain className="w-16 h-16 text-violet-600 animate-pulse" />
                  <div className="text-6xl animate-bounce" style={{ animationDelay: "0.3s" }}>🤖</div>
                </div>
              </div>
            </div>
            <CardTitle className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600">
              AI Training Lab
            </CardTitle>
            <p className="text-xl mt-3 text-gray-600 font-medium">
              Experience how AI REALLY learns! 🧪
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50/80 to-blue-50/80 p-5 rounded-2xl border-2 border-violet-200">
              <p className="text-center text-gray-700 font-semibold text-lg">
                🔬 Complete 3 hands-on labs to master AI learning types!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {labs.map((lab, i) => {
                const Icon = lab.icon
                return (
                  <div key={lab.id} className={`flex flex-col items-center gap-3 p-4 bg-gradient-to-br ${lab.color} rounded-xl text-white hover:scale-105 transition-all cursor-default group`}>
                    <div className="bg-white/20 rounded-xl p-3 group-hover:rotate-12 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Lab {i + 1}</p>
                      <p className="text-sm opacity-90">{lab.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" /> What You&apos;ll Learn
                </h4>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  <li>• How AI learns from labeled data</li>
                  <li>• How AI finds hidden patterns</li>
                  <li>• How AI learns from rewards</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                <h4 className="font-bold text-green-800 flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> Earn Points
                </h4>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  <li>• Train AI accurately = more points!</li>
                  <li>• Find patterns = bonus points!</li>
                  <li>• Reach goals efficiently = rewards!</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={() => setGameState("playing")}
              size="lg"
              className="w-full text-xl h-16 font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl group"
            >
              <Play className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" />
              Enter the AI Lab!
              <Sparkles className="w-7 h-7 ml-3 animate-pulse" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Complete Screen
  if (gameState === "complete") {
    const achievements = [
      { icon: "🎓", title: "Teacher", unlocked: scores[0] >= 100 },
      { icon: "🔍", title: "Pattern Finder", unlocked: scores[1] >= 100 },
      { icon: "🎮", title: "Game Master", unlocked: scores[2] >= 150 },
      { icon: "⚡", title: "Speed Learner", unlocked: timeSpent < 300 },
      { icon: "🏆", title: "AI Expert", unlocked: totalScore >= 400 },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-blue-900 p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        {showConfetti && <Confetti />}
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-xl text-center relative z-10">
          <CardHeader>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/50 blur-3xl rounded-full animate-pulse" />
                <div className="text-8xl animate-bounce relative">🎉</div>
                <div className="absolute -top-4 -left-4 text-3xl animate-spin" style={{ animationDuration: "3s" }}>⭐</div>
                <div className="absolute -top-4 -right-4 text-3xl animate-spin" style={{ animationDuration: "4s" }}>⭐</div>
              </div>
            </div>
            <CardTitle className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
              Lab Complete! 🧪
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 rounded-3xl p-8 border-2 border-violet-200 shadow-inner">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 mb-2">
                {totalScore}
              </div>
              <div className="text-gray-600 font-medium">Total Points</div>
            </div>

            {/* Lab Scores */}
            <div className="grid grid-cols-3 gap-3">
              {labs.map((lab, i) => {
                const Icon = lab.icon
                return (
                  <div key={lab.id} className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
                    <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${lab.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl font-bold text-gray-700">{scores[i] || 0}</div>
                    <div className="text-xs text-gray-500">{lab.title.split(" ")[0]}</div>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto text-blue-500 mb-1" />
                <div className="text-lg font-bold text-gray-700">{formatTime(timeSpent)}</div>
                <div className="text-xs text-gray-500">Time</div>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto text-green-500 mb-1" />
                <div className="text-lg font-bold text-gray-700">3/3</div>
                <div className="text-xs text-gray-500">Labs</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center justify-center gap-2">
                <Award className="w-5 h-5" /> Achievements
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {achievements.map((a, i) => (
                  <AchievementBadge key={i} {...a} />
                ))}
              </div>
            </div>

            {/* Key Learnings */}
            <div className="bg-gradient-to-r from-violet-50 to-blue-50 border-2 border-violet-200 rounded-2xl p-4 text-left">
              <h3 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" /> What You Learned:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <span><strong>Supervised:</strong> AI learns from labeled examples you provide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span><strong>Unsupervised:</strong> AI finds hidden patterns without labels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Reinforcement:</strong> AI learns by getting rewards for good actions</span>
                </li>
              </ul>
            </div>

            {/* Real World */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: Camera, label: "Photos", color: "text-violet-500" },
                { icon: Music, label: "Music", color: "text-cyan-500" },
                { icon: Mic, label: "Assistants", color: "text-green-500" },
                { icon: Youtube, label: "Videos", color: "text-red-500" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <item.icon className={`w-6 h-6 mx-auto ${item.color}`} />
                  <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                setGameState("welcome")
                setCurrentLab(0)
                setScores([])
                setTimeSpent(0)
              }}
              size="lg"
              className="w-full text-xl h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white hover:scale-105 transition-all shadow-xl"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Try Again!
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Playing Screen
  const currentLabData = labs[currentLab]
  const CurrentIcon = currentLabData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-gradient-to-br ${currentLabData.color} rounded-xl`}>
                <CurrentIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Lab {currentLab + 1} of 3</h1>
                <p className="text-sm text-gray-500">{currentLabData.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{formatTime(timeSpent)}</span>
              </div>
              <div className="bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-xl border-2 border-violet-200">
                <p className="text-xs text-violet-600 font-medium">Score</p>
                <p className="text-xl font-bold text-violet-700">{totalScore}</p>
              </div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4 flex gap-2">
            {labs.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < currentLab ? "bg-green-500" :
                  i === currentLab ? "bg-violet-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Lab Content */}
        <Card className="border-2 shadow-xl">
          <CardContent className="pt-6">
            {currentLab === 0 && (
              <SupervisedLab onComplete={handleLabComplete} onScore={handleScore} />
            )}
            {currentLab === 1 && (
              <UnsupervisedLab onComplete={handleLabComplete} onScore={handleScore} />
            )}
            {currentLab === 2 && (
              <ReinforcementLab onComplete={handleLabComplete} onScore={handleScore} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
