"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Brain, Layers, Briefcase } from "lucide-react";

export default function ResourceDrawer({ isOpen, onClose }) {
  const pathname = usePathname();
  const isInterviews = pathname?.startsWith("/interview-experiences");

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

      {/* Sidebar: Clean, minimal with 2 navigation links only */}
      <aside
        className="relative z-50 flex h-full w-64 sm:w-72 flex-col border-r border-ink-800 bg-ink-950 text-ink-100 shadow-2xl animate-in slide-in-from-left duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Sidebar"
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between border-b border-ink-800/80 px-4 bg-ink-950">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 shadow-md shadow-accent-500/20 ring-1 ring-white/20">
              <Brain className="h-4.5 w-4.5 stroke-[2.3] text-[#09090b]" />
            </span>
            <span className="text-sm font-bold tracking-tight text-ink-100">
              DSA Pattern Sheet
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 transition"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2 Navigation Tabs only */}
        <nav className="flex-1 p-3 space-y-1.5" aria-label="Main Navigation">
          {/* Tab 1: DSA */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
              !isInterviews
                ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 shadow-sm"
                : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
            }`}
          >
            <Layers className="h-4.5 w-4.5" />
            <span>DSA</span>
          </Link>

          {/* Tab 2: Interview Experiences */}
          <Link
            href="/interview-experiences"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
              isInterviews
                ? "bg-accent-500/15 border border-accent-500/40 text-accent-300 shadow-sm"
                : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
            }`}
          >
            <Briefcase className="h-4.5 w-4.5" />
            <span>Interview Experiences</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
}
