"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Code2, ListChecks, Sparkles, WrapText } from "lucide-react";
import CodeBlock, { CopyButton } from "@/components/ui/CodeBlock";
import ProblemCard from "@/components/cards/ProblemCard";

export default function PatternWorkspace({ topic, pattern }) {
  const [wrapTemplate, setWrapTemplate] = useState(false);

  // Sync word wrap preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_word_wrap");
      if (saved !== null) {
        setWrapTemplate(saved === "true");
      }
    } catch (e) {}
  }, []);

  const toggleWrapTemplate = () => {
    setWrapTemplate((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("dsa_word_wrap", String(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Pattern Header (Clean title & breadcrumb back link, no subheading) */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            href={`/${topic.slug}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800/80 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 transition shadow-sm"
            title={`Back to ${topic.title}`}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100">
            {pattern.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-ink-800/80 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-accent-400 shadow-sm">
            {pattern.problems.length} {pattern.problems.length === 1 ? "problem" : "problems"}
          </span>
        </div>
      </div>

      {/* Dual Section Grid: Problems List (Left) + Template & Guide (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* LEFT SECTION: Problems List */}
        <section className="lg:col-span-7 flex flex-col rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink-800/80 bg-ink-950/70 px-4 sm:px-5 py-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink-300">
              <ListChecks className="h-4 w-4 text-accent-400" />
              <span>Problems</span>
            </div>
            <span className="rounded-full bg-ink-950/80 border border-ink-800/80 px-2.5 py-0.5 text-xs font-mono font-medium text-ink-400">
              {pattern.problems.length}
            </span>
          </div>

          {/* List of problems */}
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
        </section>

        {/* RIGHT SECTION: Template Code & Guide */}
        <section className="lg:col-span-5 flex flex-col gap-4 sticky top-16">
          {/* Template Code Card */}
          <div className="flex flex-col rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-800/80 bg-ink-950/70 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink-300">
                <Code2 className="h-4 w-4 text-emerald-400" />
                <span>Template Code</span>
              </div>

              {/* Action Buttons: Wrap + Copy (Icons only) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={toggleWrapTemplate}
                  className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg border transition shadow-sm ${
                    wrapTemplate
                      ? "border-accent-400 bg-accent-500 text-white shadow-md shadow-accent-500/25 ring-1 ring-accent-300/40"
                      : "border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100"
                  }`}
                  title={wrapTemplate ? "Word Wrap: On (click to disable)" : "Word Wrap: Off (click to enable)"}
                  aria-label="Toggle word wrap"
                  aria-pressed={wrapTemplate}
                >
                  <WrapText className="h-3.5 w-3.5 stroke-[2.2]" />
                </button>

                <CopyButton code={pattern.template} iconOnly />
              </div>
            </div>

            {/* Code Body */}
            <div className="max-h-[460px] overflow-auto code-scroll p-1">
              <CodeBlock code={pattern.template} hideHeader compact wrap={wrapTemplate} />
            </div>
          </div>

          {/* Pattern Guide (How to Identify & Appears In) */}
          {((pattern.identify && pattern.identify.length > 0) || (pattern.appearsIn && pattern.appearsIn.length > 0)) && (
            <div className="rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm p-4 sm:p-5 shadow-sm space-y-4">
              {pattern.identify && pattern.identify.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    How to Identify
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink-300">
                    {pattern.identify.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-400 text-xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pattern.appearsIn && pattern.appearsIn.length > 0 && (
                <div className="pt-3 border-t border-ink-800/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
                    Commonly Appears In
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.appearsIn.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink-800 bg-ink-950/60 px-2.5 py-0.5 text-xs font-medium text-ink-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
