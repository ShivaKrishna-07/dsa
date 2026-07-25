"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionCard from "@/components/ui/MotionCard";

export default function TopicWorkspace({ topic }) {
  if (!topic.patterns.length) {
    return <EmptyState title="Patterns coming soon" text="This topic is part of the full sheet structure." />;
  }

  return (
    <div className="mt-4 grid gap-4 py-2">
      {topic.patterns.map((pattern) => (
        <MotionCard key={pattern.slug}>
          <Link
            href={`/${topic.slug}/${pattern.slug}`}
            className="group block rounded-xl border border-ink-800 bg-ink-900/40 p-5 transition hover:border-accent-400 hover:bg-ink-900/60"
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold text-ink-100">{pattern.title}</h2>
                <p className="mt-2 text-base leading-6 text-ink-400">{pattern.description}</p>
              </div>
              <div className="flex items-center gap-5">
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
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="mt-2 rounded-md border border-ink-800 bg-ink-950/40 p-6">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-400">{text}</p>
    </div>
  );
}
