"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, GitBranch, Layers } from "lucide-react";

export default function TopicWorkspace({ topic }) {
  const totalProblems = topic.patterns.reduce((sum, p) => sum + (p.problems?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Topic Header / Hero */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Topics</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-ink-800/80 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-accent-400 shadow-sm">
              {topic.patterns.length} {topic.patterns.length === 1 ? "pattern" : "patterns"}
            </span>
            <span className="rounded-full border border-ink-800/80 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-ink-300 shadow-sm">
              {totalProblems} problems
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-100">
            {topic.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-400 max-w-3xl leading-relaxed">
            Master the core patterns for {topic.title} to solve interview problems systematically and build intuition.
          </p>
        </div>
      </div>

      {/* Patterns Card */}
      <section className="rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-ink-800/80 bg-ink-950/70 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-400">
            <GitBranch className="h-3.5 w-3.5 text-accent-400" />
            <span>Pattern Name</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-400">
            <Layers className="h-3.5 w-3.5 text-ink-500" />
            <span>Problems</span>
          </div>
        </div>

        {topic.patterns.length ? (
          <div className="divide-y divide-ink-800/60">
            {topic.patterns.map((pattern, index) => (
              <Link
                key={pattern.slug}
                href={`/${topic.slug}/${pattern.slug}`}
                className="group flex items-center justify-between gap-4 px-4 py-4 sm:px-6 transition-all hover:bg-ink-800/40"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-ink-800/80 bg-ink-900/60 font-mono text-xs font-semibold text-accent-300 shadow-sm transition-all group-hover:border-accent-500/40 group-hover:bg-accent-500/10 group-hover:text-accent-300">
                    {index + 1}
                  </span>
                  <div className="font-medium text-ink-100 text-sm sm:text-base truncate group-hover:text-accent-300 transition-colors">
                    {pattern.title}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="rounded-full border border-ink-800 bg-ink-950/60 px-3 py-0.5 text-xs font-medium text-ink-300">
                    {pattern.problems.length} {pattern.problems.length === 1 ? "problem" : "problems"}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-accent-300" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-ink-400">
            Patterns coming soon for this topic.
          </div>
        )}
      </section>
    </div>
  );
}
