"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Columns2, TableProperties, PanelLeft, Briefcase } from "lucide-react";
import SearchBox from "@/components/ui/SearchBox";
import NavbarBreadcrumb from "@/components/ui/NavbarBreadcrumb";
import { useLayout } from "@/context/LayoutContext";
import ResourceDrawer from "@/components/navigation/ResourceDrawer";

export default function Header({ tree = [], items = [] }) {
  const { layoutMode, toggleLayoutMode } = useLayout();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isInterviewsPage = pathname?.startsWith("/interview-experiences");

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur h-14">
        <div className="flex h-full w-full items-center justify-between gap-3 px-3 sm:px-4">
          {/* Left: Logo and Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="relative group flex items-center shrink-0">
              <Link
                href="/"
                className="flex shrink-0 items-center gap-2.5 transition hover:opacity-95"
                title="DSA Patterns Home"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 shadow-md shadow-accent-500/20 ring-1 ring-white/20">
                  <Brain className="h-4.5 w-4.5 stroke-[2.3] text-[#09090b]" aria-hidden="true" />
                </span>
                {layoutMode === "sheet" && (
                  <span className="font-semibold text-sm sm:text-base text-ink-100 hidden sm:inline tracking-tight">
                    DSA Pattern Sheet
                  </span>
                )}
              </Link>

              {/* Hover-revealed Icon Button: Opens Resource Navigation Drawer */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="ml-1 sm:ml-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/90 text-accent-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 hover:border-accent-500/50 hover:bg-accent-500/15 hover:text-accent-300 transition-all duration-150 shadow-sm"
                title="Open Resource Drawer (DSA & Interview Experiences)"
                aria-label="Open resource navigation drawer"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>

            {/* In sheet layout or on interview experiences page, breadcrumb is hidden */}
            {layoutMode !== "sheet" && !isInterviewsPage && <NavbarBreadcrumb tree={tree} />}
          </div>

          {/* Right: Interviews Shortcut, Search & Layout Mode Switcher (hidden on /interview-experiences) */}
          {!isInterviewsPage && (
            <div className="shrink-0 flex items-center gap-2">
              <Link
                href="/interview-experiences"
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-ink-800 bg-ink-900/60 px-2.5 py-1.5 text-xs font-semibold text-ink-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 transition shadow-sm"
                title="Recent Company Interview Experiences"
              >
                <Briefcase className="h-3.5 w-3.5 text-amber-400" />
                <span>Interviews</span>
                <span className="rounded-full bg-amber-500/20 text-amber-300 px-1.5 py-0.2 text-[10px] font-mono font-bold">
                  2026
                </span>
              </Link>

              {layoutMode !== "sheet" && <SearchBox items={items} />}

              {/* Layout Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleLayoutMode}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition shadow-sm ${
                  layoutMode === "sheet"
                    ? "border-accent-400 bg-accent-500 text-white shadow-md shadow-accent-500/25 ring-1 ring-accent-300/40"
                    : "border-ink-800 bg-ink-900/70 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100"
                }`}
                title={
                  layoutMode === "sheet"
                    ? "Switch to Standard Multi-page Layout"
                    : "Switch to Striver Sheet Accordion Layout"
                }
                aria-label="Toggle layout mode"
              >
                {layoutMode === "sheet" ? (
                  <Columns2 className="h-4 w-4" />
                ) : (
                  <TableProperties className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Slide-out Navigation Drawer with DSA & Interviews Tabs */}
      <ResourceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        topics={tree}
      />
    </>
  );
}
