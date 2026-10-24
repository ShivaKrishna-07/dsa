"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Brain,
  Briefcase,
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2
} from "lucide-react";
import CompanyLogo from "@/components/interviews/CompanyLogo";

export default function ResourceDrawer({ isOpen, onClose, topics = [] }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dsa");

  // Synchronize initial active tab based on current pathname
  useEffect(() => {
    if (pathname?.startsWith("/interview-experiences")) {
      setActiveTab("interviews");
    } else {
      setActiveTab("dsa");
    }
  }, [pathname, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-50 flex h-full w-full max-w-sm sm:max-w-md flex-col border-r border-ink-800 bg-ink-950 text-ink-100 shadow-2xl animate-in slide-in-from-left duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Resource Navigator"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-ink-800/80 px-4 py-3.5 bg-ink-950/80">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 shadow-md shadow-accent-500/20 ring-1 ring-white/20">
              <Brain className="h-4.5 w-4.5 stroke-[2.3] text-[#09090b]" />
            </span>
            <div>
              <div className="text-sm font-bold text-ink-100 tracking-tight">DSA Pattern Suite</div>
              <div className="text-[11px] text-ink-400">Complete Preparation Resources</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 transition"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top-Level Tabs: DSA vs Interview Experiences */}
        <div className="grid grid-cols-2 p-2 border-b border-ink-800/80 bg-ink-950/40 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("dsa")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-semibold transition ${
              activeTab === "dsa"
                ? "bg-accent-500 text-white shadow-sm shadow-accent-500/30"
                : "text-ink-400 hover:bg-ink-900 hover:text-ink-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>DSA Patterns</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("interviews")}
            className={`relative flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-semibold transition ${
              activeTab === "interviews"
                ? "bg-accent-500 text-white shadow-sm shadow-accent-500/30"
                : "text-ink-400 hover:bg-ink-900 hover:text-ink-200"
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Interviews</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          </button>
        </div>

        {/* Tab 1 Content: DSA Patterns */}
        {activeTab === "dsa" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 code-scroll">
            <div className="rounded-xl border border-accent-500/30 bg-accent-500/10 p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-accent-300">Pattern-Based Learning</div>
                <div className="text-[11px] text-ink-300">Master templates first, then solve problems</div>
              </div>
              <Link
                href="/"
                onClick={onClose}
                className="text-xs font-semibold text-accent-400 hover:underline flex items-center gap-1"
              >
                <span>All Topics</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-2 px-1">
                DSA Topics
              </div>
              <div className="space-y-1">
                {topics.map((t) => {
                  const isCurrent = pathname?.startsWith(`/${t.slug}`);
                  const problemCount = (t.patterns || []).reduce(
                    (acc, p) => acc + (p.problems || []).length,
                    0
                  );

                  return (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}`}
                      onClick={onClose}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition ${
                        isCurrent
                          ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 font-semibold"
                          : "border border-transparent text-ink-300 hover:bg-ink-900/80 hover:text-ink-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{t.icon || "📚"}</span>
                        <span>{t.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-500">
                        {problemCount > 0 ? `${problemCount} problems` : `${t.patterns?.length || 0} patterns`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Interview Experiences */}
        {activeTab === "interviews" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 code-scroll">
            {/* Banner card */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-ink-900 to-ink-950 p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Flame className="h-4 w-4" />
                <span>Recent Company Rounds</span>
              </div>
              <p className="text-xs text-ink-300 leading-relaxed mb-3">
                Curated actual interview problem reports from Google, Amazon & Microsoft (2026–2024).
              </p>
              <Link
                href="/interview-experiences"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 py-2 px-3 text-xs font-semibold text-white shadow-md shadow-accent-500/25 hover:bg-accent-400 transition"
              >
                <span>Open All Experiences</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Company Shortcuts */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-2 px-1">
                Filter by Company
              </div>
              <div className="space-y-1.5">
                {[
                  {
                    name: "Google",
                    count: "7 reports",
                    desc: "BFS/DFS, Shortest Paths, Topological Sort, DSU",
                    param: "google"
                  },
                  {
                    name: "Amazon",
                    count: "6 reports",
                    desc: "Grid BFS, Connected Components, Cycle Detection",
                    param: "amazon"
                  },
                  {
                    name: "Microsoft",
                    count: "4 reports",
                    desc: "BFS/DFS, DSU, Component Counting, Priority Queues",
                    param: "microsoft"
                  }
                ].map((co) => (
                  <Link
                    key={co.name}
                    href={`/interview-experiences?company=${co.param}`}
                    onClick={onClose}
                    className="flex items-start gap-3 rounded-xl border border-ink-800 bg-ink-900/40 p-3 hover:border-ink-700 hover:bg-ink-900/90 transition group"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-ink-800 bg-ink-950">
                      <CompanyLogo company={co.name} className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink-100 group-hover:text-accent-300 transition">
                          {co.name}
                        </span>
                        <span className="text-[10px] font-mono text-ink-500 font-semibold">
                          {co.count}
                        </span>
                      </div>
                      <div className="text-[11px] text-ink-400 truncate mt-0.5">{co.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Preparation Strategy Tip */}
            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 p-3 text-xs text-ink-400 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-ink-300 text-[11px] uppercase tracking-wider">
                <Sparkles className="h-3 w-3 text-accent-400" />
                <span>Interviewer Insight</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Top companies frequently modify graph constraints or add adversary follow-ups. Focus on understanding the core invariant rather than memorizing exact questions.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-ink-800/80 p-3 bg-ink-950 text-center">
          <Link
            href="/interview-experiences"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-accent-400 transition"
          >
            <span>View 15 Recommended Practice Checklist</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
