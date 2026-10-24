"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ExternalLink, X, RotateCcw } from "lucide-react";
import CompanyBrandLogo from "@/components/companies/CompanyBrandLogo";
import companiesData from "@/content/companies/fresherCompanies.json";

const CATEGORIES = [
  "All",
  "FAANG+",
  "Tier-1 Product",
  "Fintech",
  "Quant / HFT",
  "Cloud & AI",
  "Consumer Tech",
  "Enterprise & SaaS"
];

export default function CompaniesWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [shortcutText, setShortcutText] = useState("Ctrl+K");
  const inputRef = useRef(null);

  // Platform shortcut detection (Cmd+K vs Ctrl+K)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent)
    ) {
      setShortcutText("⌘K");
    }
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K / Slash to focus search
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companiesData.filter((comp) => {
      // Category filter
      if (selectedCategory !== "All" && comp.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const inName = comp.name.toLowerCase().includes(query);
        const inCategory = comp.category.toLowerCase().includes(query);
        const inRole = comp.role?.toLowerCase().includes(query);
        if (!inName && !inCategory && !inRole) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All";

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Minimal Header & Refined Searchbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100">
            Target Companies
          </h1>
          <span className="rounded-full bg-accent-500/15 border border-accent-500/30 px-2 py-0.5 text-xs font-semibold text-accent-400 font-mono">
            {filteredCompanies.length}
          </span>
        </div>

        {/* Improved Searchbar Design */}
        <div className="flex items-center gap-2">
          <div className="group relative flex items-center w-full sm:w-72 rounded-xl border border-ink-700/80 bg-ink-900/90 hover:border-ink-600 focus-within:border-accent-500/70 focus-within:ring-2 focus-within:ring-accent-500/20 shadow-sm transition">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-ink-400 group-focus-within:text-accent-400 transition" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or role..."
              className="h-9 w-full bg-transparent pl-9 pr-14 text-xs sm:text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none"
            />

            {/* Clear Button or Keyboard Shortcut Badge */}
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ink-800 text-ink-400 hover:bg-ink-700 hover:text-ink-200 transition"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <span className="pointer-events-none absolute right-2.5 rounded border border-ink-700/60 bg-ink-800/60 px-1.5 py-0.5 text-[10px] font-mono text-ink-400">
                {shortcutText}
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 h-9 rounded-xl border border-ink-700/60 bg-ink-800/40 px-2.5 text-xs text-ink-400 hover:text-ink-200 hover:border-ink-600 transition shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Outside Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 code-scroll">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25 ring-1 ring-white/10"
                  : "border border-ink-800 bg-ink-900/70 text-ink-300 hover:border-ink-700 hover:bg-ink-900 hover:text-ink-100"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Clean Minimal Table (Category Column Removed, Enlarged Logos) */}
      <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/30 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-800/80 bg-ink-950/70 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                <th className="py-3 px-4 sm:px-5">Company</th>
                <th className="py-3 px-3">Entry Role</th>
                <th className="py-3 px-3 font-semibold text-ink-300">Package (₹ LPA)</th>
                <th className="py-3 px-4 sm:px-5 text-right">Careers Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800/50">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-ink-800/25 transition duration-100 group"
                  >
                    {/* Company Name & Enlarged Logo */}
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="flex items-center gap-3.5">
                        <CompanyBrandLogo
                          name={comp.name}
                          domain={comp.domain}
                          className="h-9 w-9 p-1"
                        />
                        <span className="font-semibold text-sm sm:text-base text-ink-100 group-hover:text-accent-300 transition">
                          {comp.name}
                        </span>
                      </div>
                    </td>

                    {/* Entry Role */}
                    <td className="py-3.5 px-3 text-ink-300 font-medium text-xs sm:text-sm">
                      {comp.role}
                    </td>

                    {/* Package (Value only) */}
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-accent-300 font-mono text-xs sm:text-sm">
                        {comp.package}
                      </span>
                    </td>

                    {/* Careers Action Link */}
                    <td className="py-3.5 px-4 sm:px-5 text-right">
                      <a
                        href={comp.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700/80 bg-ink-800/70 hover:bg-accent-500/15 hover:border-accent-500/40 hover:text-accent-300 px-3 py-1.5 text-xs font-semibold text-ink-200 transition"
                      >
                        <span>Apply</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-xs text-ink-400">
                    No companies found matching &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
