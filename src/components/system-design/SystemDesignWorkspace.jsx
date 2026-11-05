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
          <span className="font-mono text-xs font-semibold text-accent-300 bg-accent-500/10 border border-accent-500/20 px-2 py-0.5 rounded-full">
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
                    {phase.phase}: {phase.title}
                  </span>
                  <span className="font-mono text-ink-500 text-[11px]">
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
                  <span className="font-mono text-ink-500 text-[11px]">
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
                          <span className="font-mono text-xs text-ink-500 w-4">
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
      {/* TAB 3: ANSWERING FRAMEWORK                                                */}
      {/* ========================================================================= */}
      {activeTab === "framework" && (
        <div className="space-y-5 pt-1">
          {/* 8-Step Blueprint */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-ink-400 uppercase tracking-wider px-1">
              8-Step HLD Interview Sequence (45–60 min)
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-ink-800/80 bg-ink-950/60 text-ink-500 text-[11px] uppercase tracking-wider">
                      <th className="py-2 px-3 w-10">#</th>
                      <th className="py-2 px-3">Step</th>
                      <th className="py-2 px-3 w-20">Time</th>
                      <th className="py-2 px-3">Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-800/50">
                    {systemDesignData.framework.steps.map((s) => (
                      <tr key={s.number} className="hover:bg-ink-800/30">
                        <td className="py-2.5 px-3 font-mono text-xs text-accent-400 font-bold">
                          0{s.number}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-ink-200 whitespace-nowrap">
                          {s.title}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-xs text-ink-400 whitespace-nowrap">
                          {s.time}
                        </td>
                        <td className="py-2.5 px-3 text-xs text-ink-400">
                          {s.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3 Rules */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-ink-400 uppercase tracking-wider px-1">
              Core Principles
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden p-3 space-y-2 text-xs sm:text-sm">
              {systemDesignData.framework.rules.map((r) => (
                <div key={r.number} className="pt-1.5 first:pt-0">
                  <span className="font-semibold text-ink-200">
                    Rule {r.number}: {r.title}
                  </span>
                  <p className="text-xs text-ink-400 mt-0.5">{r.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-ink-400 uppercase tracking-wider px-1">
              Daily 2-Hour Routine
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-ink-800/50">
                    {systemDesignData.framework.dailySchedule.map((row) => (
                      <tr key={row.activity} className="hover:bg-ink-800/30">
                        <td className="py-2 px-3 font-medium text-ink-200 w-44">
                          {row.activity}
                        </td>
                        <td className="py-2 px-3 font-mono text-xs text-accent-300 w-24">
                          {row.time}
                        </td>
                        <td className="py-2 px-3 text-xs text-ink-400">
                          {row.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
