"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Compass,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Flame,
  Lightbulb,
  ExternalLink
} from "lucide-react";
import { systemDesignData } from "@/content/system-design/systemDesignData";

const STORAGE_KEY = "hld_prep_progress_v1";

export default function SystemDesignWorkspace() {
  const [activeTab, setActiveTab] = useState("fundamentals"); // 'fundamentals' | 'questions' | 'framework'
  const [completed, setCompleted] = useState({});
  const [copied, setCopied] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load HLD progress from localStorage", e);
    }
  }, []);

  // Save progress to localStorage
  const toggleItem = (id) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save HLD progress to localStorage", e);
      }
      return next;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your System Design checklist progress?")) {
      setCompleted({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  // Calculations
  const allFundamentalTopics = useMemo(() => {
    return systemDesignData.fundamentals.flatMap((phase) => phase.topics);
  }, []);

  const totalFundamentals = allFundamentalTopics.length;
  const completedFundamentals = useMemo(() => {
    return allFundamentalTopics.filter((t) => completed[t.id]).length;
  }, [allFundamentalTopics, completed]);

  const fundamentalPercent = totalFundamentals ? Math.round((completedFundamentals / totalFundamentals) * 100) : 0;

  // 16 Core questions (excluding optional and mocks for main metric)
  const coreQuestions = useMemo(() => {
    return systemDesignData.questions
      .filter((g) => g.id !== "grp-optional" && g.id !== "grp-mocks")
      .flatMap((g) => g.items);
  }, []);

  const totalCoreQuestions = coreQuestions.length;
  const completedCoreQuestions = useMemo(() => {
    return coreQuestions.filter((q) => completed[q.id]).length;
  }, [coreQuestions, completed]);

  const questionsPercent = totalCoreQuestions ? Math.round((completedCoreQuestions / totalCoreQuestions) * 100) : 0;

  // Total overall
  const overallPercent = Math.round(
    ((completedFundamentals + completedCoreQuestions) / (totalFundamentals + totalCoreQuestions)) * 100
  );

  // Copy progress summary text
  const copyProgressSummary = () => {
    const text = `🎯 System Design (HLD) Progress Report:
• Fundamentals: ${completedFundamentals}/${totalFundamentals} completed (${fundamentalPercent}%)
• Core Design Questions: ${completedCoreQuestions}/${totalCoreQuestions} completed (${questionsPercent}%)
• Overall Readiness: ${overallPercent}%

Keep learning! Practice consistently.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Stats Dashboard */}
      <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent-300">
                <Compass className="h-3.5 w-3.5 text-accent-400" />
                Fresher / SDE-1 HLD Roadmap
              </span>
              <span className="rounded-full border border-ink-800 bg-ink-950/60 px-2 py-0.5 text-xs font-mono font-medium text-ink-400">
                8 Weeks
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-100">
              System Design (HLD) Preparation
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink-400 max-w-2xl leading-relaxed">
              Targeted high-level design curriculum covering core building blocks, recurring interview systems, and an 8-step structured answering framework.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={copyProgressSummary}
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink-800 bg-ink-900/80 px-3 py-1.5 text-xs font-semibold text-ink-300 hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-accent-300 transition shadow-sm"
              title="Copy progress summary to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-ink-400" />}
              <span>{copied ? "Copied" : "Copy Progress"}</span>
            </button>

            <button
              type="button"
              onClick={resetProgress}
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink-800 bg-ink-900/80 px-3 py-1.5 text-xs font-semibold text-ink-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 transition shadow-sm"
              title="Reset checklist progress"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Metric Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 border-t border-ink-800/80">
          {/* Card 1: Fundamentals */}
          <div className="rounded-xl border border-ink-800/80 bg-ink-950/70 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-400">Fundamentals Progress</span>
              <span className="font-mono font-bold text-accent-400">{fundamentalPercent}%</span>
            </div>
            <div className="mt-2 text-lg sm:text-xl font-bold font-mono text-ink-100">
              {completedFundamentals} <span className="text-xs text-ink-500 font-normal">/ {totalFundamentals} topics</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-ink-850 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-500 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${fundamentalPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Core Designs */}
          <div className="rounded-xl border border-ink-800/80 bg-ink-950/70 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-400">Core Design Questions</span>
              <span className="font-mono font-bold text-emerald-400">{questionsPercent}%</span>
            </div>
            <div className="mt-2 text-lg sm:text-xl font-bold font-mono text-ink-100">
              {completedCoreQuestions} <span className="text-xs text-ink-500 font-normal">/ {totalCoreQuestions} designs</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-ink-850 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${questionsPercent}%` }}
              />
            </div>
          </div>

          {/* Card 3: Overall Readiness */}
          <div className="rounded-xl border border-ink-800/80 bg-ink-950/70 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-400">Total HLD Readiness</span>
              <span className="font-mono font-bold text-amber-400">{overallPercent}%</span>
            </div>
            <div className="mt-2 text-lg sm:text-xl font-bold font-mono text-ink-100">
              {completedFundamentals + completedCoreQuestions}{" "}
              <span className="text-xs text-ink-500 font-normal">/ {totalFundamentals + totalCoreQuestions} total</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-ink-850 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 rounded-full"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (3 Options) */}
      <div className="flex items-center gap-2 border-b border-ink-800/80 pb-1 overflow-x-auto whitespace-nowrap code-scroll">
        <button
          type="button"
          onClick={() => setActiveTab("fundamentals")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === "fundamentals"
              ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 shadow-sm"
              : "border border-transparent text-ink-400 hover:bg-ink-900 hover:text-ink-200"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Fundamentals</span>
          <span className="ml-1 rounded-full bg-ink-900 border border-ink-800 px-2 py-0.2 text-[10px] font-mono">
            {completedFundamentals}/{totalFundamentals}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("questions")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === "questions"
              ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 shadow-sm"
              : "border border-transparent text-ink-400 hover:bg-ink-900 hover:text-ink-200"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Interview Questions</span>
          <span className="ml-1 rounded-full bg-ink-900 border border-ink-800 px-2 py-0.2 text-[10px] font-mono">
            {completedCoreQuestions}/{totalCoreQuestions}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("framework")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === "framework"
              ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 shadow-sm"
              : "border border-transparent text-ink-400 hover:bg-ink-900 hover:text-ink-200"
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Framework to Answer Any Question</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FUNDAMENTALS                                                       */}
      {/* ========================================================================= */}
      {activeTab === "fundamentals" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-ink-400 px-1">
            <span>5 Fundamental Modules • Tick each concept after you can explain it independently</span>
            <span className="font-mono text-accent-400 font-semibold">{completedFundamentals} of {totalFundamentals} mastered</span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {systemDesignData.fundamentals.map((phase) => {
              const phaseCompleted = phase.topics.filter((t) => completed[t.id]).length;
              const phaseTotal = phase.topics.length;
              const phasePct = Math.round((phaseCompleted / phaseTotal) * 100);

              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-ink-800 bg-ink-900/40 p-4 sm:p-5 backdrop-blur-sm shadow-sm space-y-3.5"
                >
                  {/* Phase Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-ink-800/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent-400 font-mono">
                          {phase.phase}
                        </span>
                        <span className="rounded-md border border-ink-800 bg-ink-950/70 px-2 py-0.5 text-[11px] font-mono font-medium text-ink-400">
                          {phase.duration}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-ink-100 mt-1">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-ink-400 mt-0.5">{phase.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono font-semibold text-ink-300">
                        {phaseCompleted} / {phaseTotal}
                      </span>
                      <span className="rounded-full bg-ink-950 border border-ink-800/80 px-2 py-0.5 text-[11px] font-mono text-accent-400">
                        {phasePct}%
                      </span>
                    </div>
                  </div>

                  {/* Checklist of Topics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.topics.map((topic) => {
                      const isDone = Boolean(completed[topic.id]);

                      return (
                        <div
                          key={topic.id}
                          onClick={() => toggleItem(topic.id)}
                          className={`group flex items-start gap-3 rounded-xl border p-2.5 sm:p-3 cursor-pointer select-none transition-all ${
                            isDone
                              ? "border-emerald-500/30 bg-emerald-500/5 text-ink-200"
                              : "border-ink-800/70 bg-ink-950/50 text-ink-300 hover:border-ink-700 hover:bg-ink-900/60 hover:text-ink-100"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleItem(topic.id);
                            }}
                            className="mt-0.5 shrink-0 text-ink-500 transition group-hover:scale-110"
                            aria-label={isDone ? `Mark ${topic.title} as incomplete` : `Mark ${topic.title} as completed`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="h-4 w-4 text-ink-600 group-hover:text-accent-400" />
                            )}
                          </button>

                          <span
                            className={`text-xs sm:text-sm font-medium leading-relaxed ${
                              isDone ? "text-ink-200 line-through decoration-ink-600" : "text-ink-200"
                            }`}
                          >
                            {topic.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERVIEW QUESTIONS                                                */}
      {/* ========================================================================= */}
      {activeTab === "questions" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-ink-400 px-1">
            <span>16 Core Questions + Optional Practice • Each teaches a unique architectural pattern</span>
            <span className="font-mono text-emerald-400 font-semibold">{completedCoreQuestions} of {totalCoreQuestions} completed</span>
          </div>

          <div className="space-y-5">
            {systemDesignData.questions.map((grp) => {
              const isOptionalOrMock = grp.id === "grp-optional" || grp.id === "grp-mocks";

              return (
                <div
                  key={grp.id}
                  className="rounded-2xl border border-ink-800 bg-ink-900/40 overflow-hidden shadow-sm backdrop-blur-sm"
                >
                  {/* Group Header */}
                  <div className="flex items-center justify-between border-b border-ink-800/80 bg-ink-950/80 px-4 sm:px-5 py-3">
                    <h3 className="text-xs sm:text-sm font-bold text-ink-200 tracking-tight">
                      {grp.group}
                    </h3>
                    <span className="text-[11px] font-mono font-medium text-ink-500">
                      {grp.items.filter((it) => completed[it.id]).length}/{grp.items.length} completed
                    </span>
                  </div>

                  {/* Questions List */}
                  <div className="divide-y divide-ink-800/60">
                    {grp.items.map((item, idx) => {
                      const isDone = Boolean(completed[item.id]);

                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer select-none transition-all ${
                            isDone ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-ink-800/40"
                          }`}
                        >
                          {/* Left: Checkbox + Question Title */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(item.id);
                              }}
                              className="shrink-0 text-ink-500 transition hover:scale-110"
                              aria-label={isDone ? `Mark ${item.title} as incomplete` : `Mark ${item.title} as completed`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/20" />
                              ) : (
                                <Circle className="h-4 w-4 text-ink-600 hover:text-accent-400" />
                              )}
                            </button>

                            <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded border border-ink-800 bg-ink-950 font-mono text-[11px] font-semibold text-ink-400">
                              {idx + 1}
                            </span>

                            <div className="min-w-0">
                              <span
                                className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors ${
                                  isDone
                                    ? "text-ink-300 line-through decoration-ink-600"
                                    : "text-ink-100 hover:text-accent-300"
                                }`}
                              >
                                {item.title}
                              </span>
                            </div>
                          </div>

                          {/* Right: Core Concept Tag + Difficulty */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden md:inline-flex rounded-lg border border-ink-800/80 bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-ink-300">
                              {item.concept}
                            </span>

                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                item.difficulty === "Easy"
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : item.difficulty === "Medium"
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  : item.difficulty === "Hard"
                                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                                  : "border-purple-500/30 bg-purple-500/10 text-purple-300"
                              }`}
                            >
                              {item.difficulty}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FRAMEWORK TO ANSWER ANY SYSTEM DESIGN QUESTION                     */}
      {/* ========================================================================= */}
      {activeTab === "framework" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="rounded-2xl border border-accent-500/30 bg-accent-500/5 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-accent-400" />
              <h2 className="text-base sm:text-lg font-bold text-accent-300">
                The 8-Step HLD Interview Sequence
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-ink-300 leading-relaxed">
              Target Interview Duration: <span className="font-semibold text-accent-300">45–60 minutes</span>. Follow this structured blueprint for every design interview to demonstrate senior engineering rigor.
            </p>
          </div>

          {/* 8 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemDesignData.framework.steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-ink-800 bg-ink-900/40 p-4 sm:p-5 backdrop-blur-sm shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-500/40 bg-accent-500/10 font-mono text-xs font-bold text-accent-300">
                      0{step.number}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-ink-800 bg-ink-950/80 px-2 py-0.5 text-[11px] font-mono text-ink-400">
                      <Clock className="h-3 w-3 text-ink-500" />
                      {step.time}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm sm:text-base font-bold text-ink-100">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-400 leading-relaxed">{step.description}</p>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-ink-800/60 text-xs text-ink-300">
                  {step.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 3 Golden Rules Section */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm sm:text-base font-bold text-ink-100">
                Three Golden Rules to Remember
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {systemDesignData.framework.rules.map((rule) => (
                <div
                  key={rule.number}
                  className="rounded-xl border border-ink-800/80 bg-ink-950/60 p-4 space-y-1.5"
                >
                  <span className="font-mono text-xs font-bold text-amber-400">
                    Rule #{rule.number}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-ink-200">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-ink-400 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily 2-Hour Study Routine */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-ink-100">
                  Daily 2-Hour Study Routine
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Total: 2 Hours
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-ink-800 text-ink-500 uppercase text-[10px] tracking-wider">
                    <th className="py-2 px-3">Activity</th>
                    <th className="py-2 px-3">Time</th>
                    <th className="py-2 px-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-800/60">
                  {systemDesignData.framework.dailySchedule.map((row) => (
                    <tr key={row.activity} className="hover:bg-ink-800/30">
                      <td className="py-2.5 px-3 font-semibold text-ink-200">{row.activity}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-accent-300">{row.time}</td>
                      <td className="py-2.5 px-3 text-xs text-ink-400">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

