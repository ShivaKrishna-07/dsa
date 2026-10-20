"use client";

import Link from "next/link";
import { Brain, Columns2, TableProperties } from "lucide-react";
import SearchBox from "@/components/ui/SearchBox";
import NavbarBreadcrumb from "@/components/ui/NavbarBreadcrumb";
import { useLayout } from "@/context/LayoutContext";

export default function Header({ tree = [], items = [] }) {
  const { layoutMode, toggleLayoutMode } = useLayout();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur h-14">
      <div className="flex h-full w-full items-center justify-between gap-3 px-3 sm:px-4">
        {/* Left: Logo and Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition hover:opacity-95"
            title="DSA Patterns"
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

          {/* In sheet layout, breadcrumb is hidden per requirement */}
          {layoutMode !== "sheet" && <NavbarBreadcrumb tree={tree} />}
        </div>

        {/* Right: Search & Layout Mode Switcher */}
        <div className="shrink-0 flex items-center gap-2">
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
      </div>
    </header>
  );
}
