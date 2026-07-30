"use client";

import { Code2, ListChecks } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import ProblemCard from "@/components/cards/ProblemCard";
import Tabs from "@/components/ui/Tabs";

export default function PatternWorkspace({ topic, pattern }) {
  return (
    <Tabs
      defaultValue="problems"
      className="h-[calc(100vh-10.25rem)] overflow-hidden rounded-md border border-ink-800 bg-ink-900/35"
      panelClassName="overflow-auto p-4"
      tabs={[
        {
          value: "problems",
          label: "Problems",
          icon: ListChecks,
          content: (
            <div className="grid gap-3">
              {pattern.problems.map((problem) => (
                <ProblemCard key={problem.slug} topicSlug={topic.slug} patternSlug={pattern.slug} problem={problem} />
              ))}
            </div>
          )
        },
        {
          value: "template",
          label: "Template",
          icon: Code2,
          content: (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <section className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold">Pattern Notes</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-ink-300">{pattern.explanation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Mostly appears in</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pattern.appearsIn.map((item) => (
                      <span key={item} className="rounded border border-ink-700 bg-ink-950/50 px-3 py-1 text-sm text-ink-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="mb-3 text-xl font-semibold">Template Code</h2>
                  <div className="overflow-hidden rounded-md border border-ink-800">
                    <CodeBlock code={pattern.template} compact />
                  </div>
                </div>
              </section>
              <aside className="h-fit rounded-md border border-ink-800 bg-ink-950/50 p-5">
                <h2 className="font-semibold">How to Identify</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-300">
                  {pattern.identify.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent-300">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          )
        }
      ]}
    />
  );
}
