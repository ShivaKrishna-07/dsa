"use client";

import Link from "next/link";
import { BookOpen, Code2, ExternalLink, Gauge, Lightbulb } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import Tabs from "@/components/ui/Tabs";
import { difficultyClass, platformLabel } from "@/lib/format";
import { SiLeetcode, SiGeeksforgeeks, SiYoutube } from "react-icons/si";
import ReactMarkdown from "react-markdown";

const platformIcons = {
  leetcode: SiLeetcode,
  gfg: SiGeeksforgeeks,
  youtube: SiYoutube,
};

export default function ProblemWorkspace({ problem }) {
  const visiblePlatforms = Object.entries(problem.platforms || {}).filter(([key, url]) => {
    if (!url || typeof url !== "string" || !url.trim()) return false;
    if (key === "youtube") return true;
    if (key === "leetcode") return true;
    return key === "gfg" && !problem.platforms.leetcode;
  });

  return (
    <div className="grid h-[calc(100vh-11.5rem)] gap-4 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="rounded-md border border-ink-800 bg-ink-900/40 p-4 lg:sticky lg:top-[126px] lg:h-[calc(100vh-11.5rem)] lg:overflow-auto">
        <h1 className="mb-4 text-3xl font-semibold">{problem.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded border px-2.5 py-1 text-xs font-medium ${difficultyClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          {problem.tags.map((tag) => (
            <span key={tag} className="rounded border border-ink-700 px-2.5 py-1 text-xs text-ink-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          {visiblePlatforms.map(([key, url]) => {
            const Icon = platformIcons[key];
            return (
            <Link
              key={key}
              href={url}
              target="_blank"
              className="inline-flex items-center justify-between gap-2 rounded-md border border-ink-700 px-3 py-2 text-sm font-medium text-ink-200 transition hover:border-accent-400"
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {platformLabel(key)}
              </span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          )})}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-md border border-ink-800 bg-ink-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Time</p>
            <p className="mt-1 font-semibold">{problem.complexity.time}</p>
          </div>
          <div className="rounded-md border border-ink-800 bg-ink-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Space</p>
            <p className="mt-1 font-semibold">{problem.complexity.space}</p>
          </div>
        </div>
      </aside>

      <Tabs
        defaultValue="code"
        className="h-[calc(100vh-11.5rem)] overflow-hidden rounded-md border border-ink-800 bg-ink-900/35"
        panelClassName="overflow-auto"
        tabs={[
          {
            value: "code",
            label: "Code",
            icon: Code2,
            content: <CodeBlock code={problem.code} compact />
          },
          {
            value: "ps",
            label: "Problem Statement",
            icon: BookOpen,
            content: (
              <article className="prose prose-invert max-w-none p-6">
                <ReactMarkdown>{problem.problemStatement}</ReactMarkdown>
              </article>
            )
          }
        ]}
      />
    </div>
  );
}
