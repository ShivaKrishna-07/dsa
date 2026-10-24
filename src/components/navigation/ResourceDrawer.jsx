"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Brain,
  Briefcase,
  Layers,
  CheckCircle2
} from "lucide-react";
import CompanyLogo from "@/components/interviews/CompanyLogo";

export default function ResourceDrawer({ isOpen, onClose, topics = [] }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dsa");

  // Keep tab in sync with current route
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

      {/* Drawer Panel: Clean standard sidebar */}
      <aside
        className="relative z-50 flex h-full w-72 sm:w-80 flex-col border-r border-ink-800 bg-ink-950 text-ink-100 shadow-2xl animate-in slide-in-from-left duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Sidebar"
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between border-b border-ink-800/80 px-4 bg-ink-950">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 transition hover:opacity-90"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 shadow-md shadow-accent-500/20 ring-1 ring-white/20">
              <Brain className="h-4.5 w-4.5 stroke-[2.3] text-[#09090b]" />
            </span>
            <span className="text-sm font-bold tracking-tight text-ink-100">
              DSA Pattern Sheet
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 transition"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2 Tabs Segmented Control: DSA vs Interview Experiences */}
        <div className="p-3 border-b border-ink-800/80 bg-ink-950/60">
          <div className="grid grid-cols-2 p-1 rounded-xl border border-ink-800 bg-ink-900/80 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("dsa")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition ${
                activeTab === "dsa"
                  ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25"
                  : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/50"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>DSA</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("interviews")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition ${
                activeTab === "interviews"
                  ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25"
                  : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/50"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Interviews</span>
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Body */}
        <div className="flex-1 overflow-y-auto p-3 code-scroll space-y-1">
          {/* TAB 1: DSA Topics Navigation */}
          {activeTab === "dsa" && (
            <>
              <Link
                href="/"
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                  pathname === "/"
                    ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 font-semibold"
                    : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🏠</span>
                  <span>All Patterns Sheet</span>
                </div>
                <span className="font-mono text-[11px] text-ink-500">Home</span>
              </Link>

              <div className="my-2 border-t border-ink-800/60" />

              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                DSA Topics
              </div>

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
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                      isCurrent
                        ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 font-semibold"
                        : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm shrink-0">{t.icon || "📁"}</span>
                      <span className="truncate">{t.title}</span>
                    </div>
                    <span className="font-mono text-[11px] text-ink-500 shrink-0">
                      {problemCount}
                    </span>
                  </Link>
                );
              })}
            </>
          )}

          {/* TAB 2: Interview Experiences Navigation */}
          {activeTab === "interviews" && (
            <>
              <Link
                href="/interview-experiences"
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                  pathname === "/interview-experiences"
                    ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 font-semibold"
                    : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="h-4 w-4 text-accent-400" />
                  <span>All Experiences</span>
                </div>
                <span className="rounded-full bg-ink-900 px-2 py-0.5 font-mono text-[10px] text-ink-400">
                  16
                </span>
              </Link>

              <div className="my-2 border-t border-ink-800/60" />

              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                Companies
              </div>

              {[
                { name: "Google", param: "google", count: 7 },
                { name: "Amazon", param: "amazon", count: 6 },
                { name: "Microsoft", param: "microsoft", count: 4 }
              ].map((co) => (
                <Link
                  key={co.name}
                  href={`/interview-experiences?company=${co.param}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-ink-300 hover:bg-ink-900 hover:text-ink-100 transition border border-transparent"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CompanyLogo company={co.name} className="h-4 w-4 shrink-0" />
                    <span className="font-medium truncate">{co.name}</span>
                  </div>
                  <span className="rounded-full bg-ink-900 border border-ink-800/60 px-2 py-0.5 font-mono text-[10px] text-ink-400 shrink-0">
                    {co.count}
                  </span>
                </Link>
              ))}

              <div className="my-2 border-t border-ink-800/60" />

              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                Practice
              </div>

              <Link
                href="/interview-experiences"
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-ink-300 hover:bg-ink-900 hover:text-ink-100 transition border border-transparent"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-medium truncate">15 Priority Checklist</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px] shrink-0">
                  Top 15
                </span>
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
