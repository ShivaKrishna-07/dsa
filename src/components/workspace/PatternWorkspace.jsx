"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Code2, ListChecks, Sparkles } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import ProblemCard from "@/components/cards/ProblemCard";

export default function PatternWorkspace({ topic, pattern }) {
  const [activeTab, setActiveTab] = useState("problems");

  return (
    <div className="space-y-6">
      {/* Pattern Header / Hero */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            href={`/${topic.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {topic.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-ink-800/80 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-accent-400 shadow-sm">
              {pattern.problems.length} {pattern.problems.length === 1 ? "problem" : "problems"}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-100">
            {pattern.title}
          </h1>
          {pattern.explanation && (
            <p className="mt-2 text-sm sm:text-base text-ink-400 max-w-3xl leading-relaxed">
              {pattern.explanation}
            </p>
          )}
        </div>
      </div>

      {/* Main Workspace Card */}
      <section className="rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm overflow-hidden shadow-sm">
        {/* Tab Switcher Header */}
        <div className="flex items-center justify-between border-b border-ink-800/80 bg-ink-950/70 px-3 sm:px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("problems")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "problems"
                  ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                  : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
              }`}
            >
              <ListChecks className="h-4 w-4 text-accent-400" />
              <span>Problems</span>
              <span className="ml-1 rounded-full bg-ink-950/80 px-2 py-0.2 text-[11px] font-mono text-ink-400">
                {pattern.problems.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("template")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "template"
                  ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                  : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
              }`}
            >
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span>Template & Guide</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        {activeTab === "problems" ? (
          <div className="divide-y divide-ink-800/60">
            {pattern.problems.map((problem, index) => (
              <ProblemCard
                key={problem.slug}
                topicSlug={topic.slug}
                patternSlug={pattern.slug}
                problem={problem}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Template & Cheatsheet View */
          <div className="p-4 sm:p-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <section className="flex flex-col gap-6">
              {pattern.explanation && (
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-ink-100 flex items-center gap-2">
                    <BookOpen className="h-4.5 w-4.5 text-accent-400" />
                    Pattern Overview
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base leading-7 text-ink-300">
                    {pattern.explanation}
                  </p>
                </div>
              )}

              {pattern.appearsIn && pattern.appearsIn.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-500">
                    Commonly Appears In
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {pattern.appearsIn.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink-800 bg-ink-950/60 px-3 py-1 text-xs font-medium text-ink-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="mb-3 text-base sm:text-lg font-semibold text-ink-100 flex items-center gap-2">
                  <Code2 className="h-4.5 w-4.5 text-emerald-400" />
                  Canonical Template
                </h2>
                <div className="overflow-hidden rounded-xl border border-ink-800 bg-ink-950/50 shadow-sm">
                  <CodeBlock code={pattern.template} compact wrap />
                </div>
              </div>
            </section>

            {/* Sidebar Guide */}
            {pattern.identify && pattern.identify.length > 0 && (
              <aside className="h-fit rounded-xl border border-ink-800 bg-ink-950/60 p-5 shadow-sm space-y-3.5">
                <h2 className="font-semibold text-sm sm:text-base text-ink-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  How to Identify
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-ink-300">
                  {pattern.identify.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-400 font-bold text-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
