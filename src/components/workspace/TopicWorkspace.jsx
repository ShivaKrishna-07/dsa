"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TopicWorkspace({ topic }) {
  return (
    <section className="rounded-md border border-ink-800 bg-ink-900/35 md:h-[calc(100vh-10.25rem)] md:overflow-hidden">
      <div className="flex h-12 items-center border-b border-ink-800 px-4">
        <h1 className="text-lg font-semibold">Patterns</h1>
        <span className="ml-auto rounded border border-ink-800 bg-ink-950/50 px-2.5 py-1 text-xs text-ink-400">
          {topic.patterns.length} total
        </span>
      </div>

      {topic.patterns.length ? (
        <div className="md:h-[calc(100%-3rem)] md:overflow-auto">
          <div className="w-full">
            {/* Body */}
            <div className="divide-y divide-ink-800/60 text-sm text-ink-300">
              {topic.patterns.map((pattern, index) => (
                <Link 
                  key={pattern.slug}
                  href={`/${topic.slug}/${pattern.slug}`}
                  className="grid grid-cols-[minmax(200px,1fr)_120px_60px] items-center gap-4 px-4 py-4 sm:px-6 transition-colors hover:bg-ink-900/40 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ink-700/60 bg-ink-900/50 text-xs font-semibold text-accent-300 shadow-sm transition-all group-hover:border-accent-500/30 group-hover:bg-accent-500/10 group-hover:text-accent-400">
                      {index + 1}
                    </span>
                    <div className="font-medium text-ink-100 text-base">
                      {pattern.title}
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1 text-xs font-medium">
                      {pattern.problems.length} problems
                    </span>
                  </div>
                  <div className="whitespace-nowrap flex justify-end">
                    <ArrowRight className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-accent-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyState title="Patterns coming soon" text="This topic is part of the full sheet structure." />
      )}
    </section>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="m-3 rounded-md border border-ink-800 bg-ink-950/40 p-5 md:m-4 md:p-6">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-400">{text}</p>
    </div>
  );
}
