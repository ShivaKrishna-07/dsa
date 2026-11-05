"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { systemDesignData } from "@/content/system-design/systemDesignData";

const STORAGE_KEY = "hld_prep_progress_v1";

export default function SystemDesignWorkspace() {
  const [activeTab, setActiveTab] = useState("fundamentals");
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const toggleItem = (id) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Reset all System Design progress?")) {
      setCompleted({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  const allTopics = useMemo(() => {
    return systemDesignData.fundamentals.flatMap((p) => p.topics);
  }, []);
  const completedTopicsCount = allTopics.filter((t) => completed[t.id]).length;

  const coreQuestions = useMemo(() => {
    return systemDesignData.questions
      .filter((g) => g.id !== "grp-optional" && g.id !== "grp-mocks")
      .flatMap((g) => g.items);
  }, []);
  const completedQuestionsCount = coreQuestions.filter((q) => completed[q.id]).length;

  const totalDone = completedTopicsCount + completedQuestionsCount;
  const totalItems = allTopics.length + coreQuestions.length;

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-6 space-y-4">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100">
            System Design
          </h1>
          <span className="text-xs font-semibold text-accent-300 bg-accent-500/10 border border-accent-500/20 px-2 py-0.5 rounded-full">
            {totalDone}/{totalItems}
          </span>
        </div>

        {totalDone > 0 && (
          <button
            type="button"
            onClick={resetProgress}
            className="flex items-center gap-1 text-xs text-ink-500 hover:text-red-400 transition"
            title="Reset checklist"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Minimal Tabs */}
      <div className="flex items-center gap-1.5 border-b border-ink-800/60 pb-2 overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={() => setActiveTab("fundamentals")}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "fundamentals"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Fundamentals ({completedTopicsCount}/{allTopics.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("questions")}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "questions"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Interview Questions ({completedQuestionsCount}/{coreQuestions.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("framework")}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "framework"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Answering Framework
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FUNDAMENTALS                                                       */}
      {/* ========================================================================= */}
      {activeTab === "fundamentals" && (
        <div className="space-y-4 pt-1">
          {systemDesignData.fundamentals.map((phase) => {
            const phaseDone = phase.topics.filter((t) => completed[t.id]).length;

            return (
              <div key={phase.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
                  <span>
                    {phase.phase} – {phase.title}
                  </span>
                  <span className="text-ink-500 text-[11px]">
                    {phaseDone}/{phase.topics.length} · {phase.duration}
                  </span>
                </div>

                <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
                  {phase.topics.map((topic) => {
                    const isDone = Boolean(completed[topic.id]);

                    return (
                      <div
                        key={topic.id}
                        onClick={() => toggleItem(topic.id)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 cursor-pointer select-none transition-colors ${
                          isDone
                            ? "bg-emerald-500/5 text-ink-400"
                            : "hover:bg-ink-800/40 text-ink-200"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-ink-600 hover:text-ink-400 shrink-0" />
                        )}
                        <span
                          className={`text-xs sm:text-sm ${
                            isDone ? "line-through text-ink-500" : ""
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
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERVIEW QUESTIONS                                                */}
      {/* ========================================================================= */}
      {activeTab === "questions" && (
        <div className="space-y-4 pt-1">
          {systemDesignData.questions.map((grp) => {
            const grpDone = grp.items.filter((it) => completed[it.id]).length;

            return (
              <div key={grp.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
                  <span>{grp.group}</span>
                  <span className="text-ink-500 text-[11px]">
                    {grpDone}/{grp.items.length}
                  </span>
                </div>

                <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
                  {grp.items.map((item, idx) => {
                    const isDone = Boolean(completed[item.id]);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer select-none transition-colors ${
                          isDone
                            ? "bg-emerald-500/5 text-ink-400"
                            : "hover:bg-ink-800/40 text-ink-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-ink-600 hover:text-ink-400 shrink-0" />
                          )}
                          <span className="text-xs text-ink-500 w-4">
                            {idx + 1}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-medium ${
                              isDone ? "line-through text-ink-500" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {item.concept && (
                          <span className="text-xs text-ink-500 shrink-0 hidden sm:inline">
                            {item.concept}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ANSWERING FRAMEWORK (Identical UI to Tab 1 & Tab 2)                 */}
      {/* ========================================================================= */}
      {activeTab === "framework" && (
        <div className="space-y-4 pt-1">
          {/* Section 1: 8-Step Blueprint */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
              <span>8-Step Interview Sequence</span>
              <span className="text-ink-500 text-[11px]">45–60 min target</span>
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
              {systemDesignData.framework.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-ink-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-ink-500 w-4">
                      {step.number}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-ink-200">
                      {step.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <span className="text-xs text-ink-500 hidden sm:inline">
                      {step.description}
                    </span>
                    <span className="text-xs text-ink-400">
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Core Principles */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
              <span>Core Principles</span>
              <span className="text-ink-500 text-[11px]">3 golden rules</span>
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
              {systemDesignData.framework.rules.map((rule) => (
                <div
                  key={rule.number}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-ink-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-ink-500 w-4">
                      {rule.number}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-ink-200">
                      {rule.title}
                    </span>
                  </div>

                  <span className="text-xs text-ink-500 shrink-0 hidden sm:inline">
                    {rule.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Daily Study Routine */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
              <span>Daily Study Routine</span>
              <span className="text-ink-500 text-[11px]">2 hours total</span>
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
              {systemDesignData.framework.dailySchedule.map((row, idx) => (
                <div
                  key={row.activity}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-ink-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-ink-500 w-4">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-ink-200">
                      {row.activity}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <span className="text-xs text-ink-500 hidden sm:inline">
                      {row.desc}
                    </span>
                    <span className="text-xs text-ink-400">
                      {row.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
