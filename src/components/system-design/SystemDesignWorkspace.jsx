"use client";

import { useState, useMemo } from "react";
import { systemDesignData } from "@/content/system-design/systemDesignData";

export default function SystemDesignWorkspace() {
  const [activeTab, setActiveTab] = useState("fundamentals");

  const allTopics = useMemo(() => {
    return systemDesignData.fundamentals.flatMap((p) => p.topics);
  }, []);

  const coreQuestions = useMemo(() => {
    return systemDesignData.questions.flatMap((g) => g.items);
  }, []);

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-6 space-y-4">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100">
            System Design
          </h1>
          <span className="text-xs font-semibold text-accent-300 bg-accent-500/10 border border-accent-500/20 px-2.5 py-0.5 rounded-full font-mono">
            {allTopics.length + coreQuestions.length} Topics
          </span>
        </div>
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
          Fundamentals ({allTopics.length})
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
          Interview Questions ({coreQuestions.length})
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
          {systemDesignData.fundamentals.map((section) => (
            <div key={section.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
                <span>{section.title}</span>
                <span className="text-ink-500 text-[11px] font-mono">
                  {section.topics.length} topics
                </span>
              </div>

              <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
                {section.topics.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-ink-800/30 transition-colors"
                  >
                    <span className="text-xs text-ink-500 w-5 shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-ink-200">
                      {topic.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERVIEW QUESTIONS                                                */}
      {/* ========================================================================= */}
      {activeTab === "questions" && (
        <div className="space-y-4 pt-1">
          {systemDesignData.questions.map((grp) => (
            <div key={grp.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
                <span>{grp.group}</span>
                <span className="text-ink-500 text-[11px] font-mono">
                  {grp.items.length}
                </span>
              </div>

              <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
                {grp.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-ink-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-ink-500 w-5 shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-ink-200">
                        {item.title}
                      </span>
                    </div>

                    {item.concept && (
                      <span className="text-xs text-ink-500 shrink-0 hidden sm:inline">
                        {item.concept}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ANSWERING FRAMEWORK                                                 */}
      {/* ========================================================================= */}
      {activeTab === "framework" && (
        <div className="space-y-4 pt-1">
          {/* Section 1: 8-Step Blueprint */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
              <span>8-Step Interview Sequence</span>
              <span className="text-ink-500 text-[11px]">45 min target</span>
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
        </div>
      )}
    </div>
  );
}
