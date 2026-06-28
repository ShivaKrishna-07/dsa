"use client";

import Link from "next/link";

export default function TopicWorkspace({ topic }) {
  if (!topic.patterns.length) {
    return <EmptyState title="Patterns coming soon" text="This topic is part of the full sheet structure." />;
  }

  return (
    <div className="mt-2 grid gap-3 md:grid-cols-2">
      {topic.patterns.map((pattern) => (
        <Link
          key={pattern.slug}
          href={`/${topic.slug}/${pattern.slug}`}
          className="block rounded-md border border-ink-800 bg-ink-950/40 p-5 transition hover:border-accent-400"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold">{pattern.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-400">{pattern.description}</p>
            </div>
            <span className="shrink-0 rounded border border-ink-700 px-2 py-1 text-xs text-ink-300">
              {pattern.problems.length} problems
            </span>
          </div>
        </Link>
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
