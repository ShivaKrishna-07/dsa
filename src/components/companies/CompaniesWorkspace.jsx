"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Briefcase,
  Building2,
  TrendingUp,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Zap,
  DollarSign
} from "lucide-react";
import CompanyBrandLogo from "@/components/companies/CompanyBrandLogo";
import CustomDropdown from "@/components/interviews/CustomDropdown";
import companiesData from "@/content/companies/fresherCompanies.json";

export default function CompaniesWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("highest");

  // Category dropdown options
  const categoryOptions = useMemo(() => {
    const set = new Set(companiesData.map((c) => c.category));
    const sorted = Array.from(set).sort();
    return [
      { value: "all", label: "All Categories", icon: <Building2 className="h-4 w-4 text-ink-400" /> },
      ...sorted.map((cat) => ({ value: cat, label: cat }))
    ];
  }, []);

  // Sort & Min package options
  const sortOptions = [
    { value: "highest", label: "Highest Package First" },
    { value: "30plus", label: "₹30+ LPA Companies" },
    { value: "20plus", label: "₹20+ LPA Companies" },
    { value: "name", label: "Alphabetical (A-Z)" }
  ];

  // Filtered & sorted companies
  const filteredCompanies = useMemo(() => {
    let list = companiesData.filter((comp) => {
      // Category filter
      if (selectedCategory !== "all" && comp.category !== selectedCategory) {
        return false;
      }

      // Min package filter if selected
      if (selectedSort === "30plus" && comp.minPackage < 25 && comp.maxPackage < 30) {
        return false;
      }
      if (selectedSort === "20plus" && comp.maxPackage < 20) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const inName = comp.name.toLowerCase().includes(query);
        const inCategory = comp.category.toLowerCase().includes(query);
        const inRoles = comp.roles.some((r) => r.toLowerCase().includes(query));
        const inNotes = comp.notes.toLowerCase().includes(query);
        if (!inName && !inCategory && !inRoles && !inNotes) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      if (selectedSort === "highest" || selectedSort === "30plus" || selectedSort === "20plus") {
        return b.maxPackage - a.maxPackage || b.minPackage - a.minPackage;
      }
      if (selectedSort === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return list;
  }, [searchQuery, selectedCategory, selectedSort]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSort("highest");
  };

  const isFiltered =
    searchQuery.trim() !== "" || selectedCategory !== "all" || selectedSort !== "highest";

  // Tier color helper
  const getTierBadge = (tier) => {
    switch (tier) {
      case "High Reward":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Specialized":
        return "border-purple-500/30 bg-purple-500/10 text-purple-300";
      case "Primary Target":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      default:
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ink-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100 flex items-center gap-2.5">
            <span>Target Companies & Fresher Packages</span>
            <span className="rounded-full bg-accent-500/15 border border-accent-500/30 px-2.5 py-0.5 text-xs font-semibold text-accent-400">
              {filteredCompanies.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 mt-0.5">
            Expected fresher SDE packages (₹ LPA) with direct career portals for 2026 batch candidates
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or role..."
              className="h-9 w-44 sm:w-56 rounded-xl border border-ink-700/80 bg-ink-900/90 pl-9 pr-3 text-xs sm:text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50 shadow-sm transition"
            />
          </div>

          {/* Category Dropdown */}
          <CustomDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="Select Category"
          />

          {/* Sort / Range Dropdown */}
          <CustomDropdown
            value={selectedSort}
            onChange={setSelectedSort}
            options={sortOptions}
            placeholder="Sort by"
          />

          {/* Reset Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 h-9 rounded-xl border border-ink-700/60 bg-ink-800/40 px-2.5 text-xs text-ink-400 hover:text-ink-200 hover:border-ink-600 transition"
              title="Reset all filters"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Company Cards */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.id}
              className="group flex flex-col justify-between rounded-2xl border border-ink-800 bg-ink-900/40 p-4 sm:p-5 hover:border-ink-700 hover:bg-ink-900/70 transition shadow-sm"
            >
              <div className="space-y-3.5">
                {/* Header: Logo, Name, Category */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <CompanyBrandLogo
                      name={comp.name}
                      domain={comp.domain}
                      className="h-9 w-9 p-1"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-ink-100 truncate group-hover:text-accent-300 transition">
                        {comp.name}
                      </h3>
                      <span className="text-[11px] text-ink-400 font-medium">
                        {comp.category}
                      </span>
                    </div>
                  </div>

                  {/* Target Tier Badge */}
                  <span
                    className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${getTierBadge(
                      comp.targetTier
                    )}`}
                  >
                    {comp.targetTier}
                  </span>
                </div>

                {/* Package Highlight */}
                <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 px-3 py-2 flex items-center justify-between">
                  <span className="text-xs text-ink-300 font-medium flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-accent-400" />
                    <span>Fresher SDE Package</span>
                  </span>
                  <span className="font-extrabold text-sm sm:text-base text-accent-300 font-mono">
                    {comp.package}
                  </span>
                </div>

                {/* Role Titles */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                    Common Entry Roles
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-ink-800/80 bg-ink-950/70 px-2 py-0.5 text-[11px] font-medium text-ink-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes & Hiring Info */}
                {comp.notes && (
                  <p className="text-xs text-ink-400 leading-relaxed bg-ink-950/40 border border-ink-800/50 rounded-xl p-2.5">
                    {comp.notes}
                  </p>
                )}
              </div>

              {/* Footer: Official Careers Portal Link */}
              <div className="mt-4 pt-3 border-t border-ink-800/60 flex items-center justify-between">
                <span className="text-[11px] text-ink-400 font-medium">
                  2026 Batch Eligible
                </span>

                <a
                  href={comp.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700/80 bg-ink-800/60 hover:bg-accent-500/15 hover:border-accent-500/40 hover:text-accent-300 px-3 py-1.5 text-xs font-semibold text-ink-200 transition shadow-sm"
                >
                  <span>Careers Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-ink-800 bg-ink-900/20 py-12 px-4 text-center">
          <p className="text-sm text-ink-300 font-medium">
            No companies match the current search or filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-ink-700 bg-ink-800 px-3 py-1.5 text-xs font-semibold text-ink-200 hover:bg-ink-700 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
