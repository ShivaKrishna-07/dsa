"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionCard from "@/components/ui/MotionCard";

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
        <div className="p-3 md:h-[calc(100%-3rem)] md:overflow-auto md:p-4">
          <div className="grid gap-4">
            {topic.patterns.map((pattern) => (
              <MotionCard key={pattern.slug}>
                <Link
                  href={`/${topic.slug}/${pattern.slug}`}
                  className="group block rounded-xl border border-ink-800 bg-ink-950/40 p-4 transition hover:border-accent-400 hover:bg-ink-900/60 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div>
                      <h2 className="text-base font-semibold text-ink-100 sm:text-xl">{pattern.title}</h2>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                      <span className="shrink-0 rounded-md border border-ink-800/60 bg-ink-900/50 px-3 py-1.5 text-sm font-medium text-ink-300">
                        {pattern.problems.length} problems
                      </span>
                      <ArrowRight className="h-6 w-6 shrink-0 text-ink-500 transition group-hover:translate-x-1 group-hover:text-accent-300" />
                    </div>
                  </div>
                </Link>
              </MotionCard>
            ))}
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
