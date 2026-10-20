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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-100">Topics</h1>
          <p className="mt-1 text-sm text-ink-400">Select a topic to explore its foundational patterns and problems.</p>
        </div>
        
        {mounted && (
          <div className="flex items-center gap-1 rounded-lg border border-ink-800 bg-ink-950/60 p-1 shadow-sm">
            <button
              onClick={() => handleSetView("grid")}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "grid" 
                  ? "bg-ink-800 text-ink-100 shadow-sm" 
                  : "text-ink-400 hover:text-ink-200"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSetView("table")}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "table" 
                  ? "bg-ink-800 text-ink-100 shadow-sm" 
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const isReady = topic.patternCount > 0;

            return (
              <MotionCard key={topic.slug}>
                <Link
                  href={isReady ? `/${topic.slug}` : "#"}
                  className={`group block h-full rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                    isReady
                      ? "border-ink-800 bg-ink-900/40 backdrop-blur-sm hover:border-accent-500/50 hover:bg-ink-900/70 hover:shadow-lg"
                      : "border-ink-800/70 bg-ink-900/20 text-ink-500 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-800 bg-ink-950/70 text-accent-300 shadow-sm group-hover:border-accent-500/40 group-hover:bg-accent-500/10 group-hover:text-accent-300 transition-all">
                        <TopicIcon name={topic.icon} className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold text-ink-100 group-hover:text-accent-300 transition-colors">
                        {topic.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-ink-400">
                      <span className="rounded-full border border-ink-800 bg-ink-950/60 px-3 py-1">
                        {pluralize(topic.patternCount, "pattern")}
                      </span>
                      <span className="rounded-full border border-ink-800 bg-ink-950/60 px-3 py-1">
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
        <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm shadow-sm w-full">
          {/* Header */}
          <div className="grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] gap-4 border-b border-ink-800/80 bg-ink-950/70 px-6 py-3.5 text-xs uppercase tracking-wider text-ink-400 font-bold">
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
                  className={`grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] items-center gap-4 px-6 py-4 transition-all ${
                    isReady ? "hover:bg-ink-800/40 group cursor-pointer" : "opacity-60 bg-ink-950/20 cursor-default pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-ink-800 bg-ink-950/70 text-accent-300 shadow-sm transition-all group-hover:border-accent-500/40 group-hover:bg-accent-500/10 group-hover:text-accent-300">
                      <TopicIcon name={topic.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div className="font-medium text-ink-100 text-base group-hover:text-accent-300 transition-colors">
                      {topic.title}
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full border border-ink-800 bg-ink-950/60 px-3 py-0.5 text-xs font-medium">
                      {topic.patternCount}
                    </span>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full border border-ink-800 bg-ink-950/60 px-3 py-0.5 text-xs font-medium">
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
