"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, LayoutGrid, List } from "lucide-react";
import { TopicIcon } from "@/components/ui/icons";
import MotionCard from "@/components/ui/MotionCard";
import { pluralize } from "@/lib/format";

export default function TopicListClient({ topics }) {
  const [viewMode, setViewMode] = useState("grid");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dsa_topic_view");
    if (saved === "grid" || saved === "table") {
      setViewMode(saved);
    }
  }, []);

  const handleSetView = (mode) => {
    setViewMode(mode);
    localStorage.setItem("dsa_topic_view", mode);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between max-w-5xl">
        <h1 className="text-2xl font-semibold sm:text-3xl text-ink-100">Topics</h1>
        
        {mounted && (
          <div className="flex items-center gap-1 rounded-md border border-ink-800 bg-ink-950/40 p-1">
            <button
              onClick={() => handleSetView("grid")}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "grid" 
                  ? "bg-ink-800 text-ink-100" 
                  : "text-ink-400 hover:text-ink-200"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSetView("table")}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "table" 
                  ? "bg-ink-800 text-ink-100" 
                  : "text-ink-400 hover:text-ink-200"
              }`}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {!mounted || viewMode === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
          {topics.map((topic) => {
            const isReady = topic.patternCount > 0;

            return (
              <MotionCard key={topic.slug}>
                <Link
                  href={isReady ? `/${topic.slug}` : "#"}
                  className={`block h-full rounded-md border p-5 transition ${
                    isReady
                      ? "border-ink-800 bg-ink-900/60 hover:border-accent-400"
                      : "border-ink-800/70 bg-ink-900/30 text-ink-500 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-700/60 bg-ink-900/50 text-accent-300 shadow-sm">
                        <TopicIcon name={topic.icon} className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold text-ink-100">{topic.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-ink-400">
                      <span className="rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1">
                        {pluralize(topic.patternCount, "pattern")}
                      </span>
                      <span className="rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1">
                        {pluralize(topic.problemCount, "problem")}
                      </span>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-ink-800 bg-ink-950/40 shadow-sm w-full max-w-5xl">
          {/* Header */}
          <div className="grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] gap-4 border-b border-ink-800/60 bg-ink-900/60 px-6 py-4 text-xs uppercase text-ink-400 font-medium">
            <div>Topic</div>
            <div>Patterns</div>
            <div>Problems</div>
            <div className="text-right">Action</div>
          </div>
          
          {/* Body */}
          <div className="divide-y divide-ink-800/60 text-sm text-ink-300">
            {topics.map((topic) => {
              const isReady = topic.patternCount > 0;

              return (
                <Link 
                  key={topic.slug}
                  href={isReady ? `/${topic.slug}` : "#"}
                  className={`grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] items-center gap-4 px-6 py-4 transition-colors ${
                    isReady ? "hover:bg-ink-900/40 group cursor-pointer" : "opacity-60 bg-ink-950/20 cursor-default pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-700/60 bg-ink-900/50 text-accent-300 shadow-sm transition-all group-hover:border-accent-500/30 group-hover:bg-accent-500/10 group-hover:text-accent-400">
                      <TopicIcon name={topic.icon} className="h-5 w-5" />
                    </span>
                    <div className="font-medium text-ink-100 text-base">
                      {topic.title}
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1 text-xs font-medium">
                      {topic.patternCount}
                    </span>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1 text-xs font-medium">
                      {topic.problemCount}
                    </span>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    {isReady ? (
                      <span className="inline-flex items-center justify-center rounded-md text-ink-500 transition-colors group-hover:text-accent-400">
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-xs text-ink-600 uppercase font-semibold">Coming Soon</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
