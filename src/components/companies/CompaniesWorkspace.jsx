"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, RotateCcw } from "lucide-react";
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

  // Category pill style helper
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "FAANG+":
        return "border-amber-500/30 bg-amber-500/10 text-amber-300";
      case "Tier-1 Product":
        return "border-blue-500/30 bg-blue-500/10 text-blue-300";
      case "Quant / HFT":
        return "border-purple-500/30 bg-purple-500/10 text-purple-300";
      case "Fintech":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
      case "Cloud & AI":
        return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
      case "Consumer Tech":
        return "border-rose-500/30 bg-rose-500/10 text-rose-300";
      default:
        return "border-ink-700 bg-ink-800/60 text-ink-300";
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100">
            Target Companies
          </h1>
          <span className="rounded-full bg-accent-500/15 border border-accent-500/30 px-2 py-0.5 text-xs font-semibold text-accent-400 font-mono">
            {filteredCompanies.length}
          </span>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or role..."
              className="h-8.5 w-52 sm:w-64 rounded-xl border border-ink-700/80 bg-ink-900/90 pl-9 pr-3 text-xs sm:text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50 shadow-sm transition"
            />
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 h-8.5 rounded-xl border border-ink-700/60 bg-ink-800/40 px-2.5 text-xs text-ink-400 hover:text-ink-200 hover:border-ink-600 transition"
              title="Reset filters"
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

      {/* Clean Minimal Table */}
      <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/30 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-800/80 bg-ink-950/70 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                <th className="py-3 px-4 sm:px-5">Company</th>
                <th className="py-3 px-3">Category</th>
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
                    {/* Company Name & Logo */}
                    <td className="py-3 px-4 sm:px-5">
                      <div className="flex items-center gap-3">
                        <CompanyBrandLogo
                          name={comp.name}
                          domain={comp.domain}
                          className="h-7 w-7 p-0.5"
                        />
                        <span className="font-semibold text-ink-100 group-hover:text-accent-300 transition">
                          {comp.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-medium ${getCategoryBadgeClass(
                          comp.category
                        )}`}
                      >
                        {comp.category}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3 text-ink-300 font-medium text-xs sm:text-sm">
                      {comp.role}
                    </td>

                    {/* Package (Value only, no repetitive label) */}
                    <td className="py-3 px-3">
                      <span className="font-extrabold text-accent-300 font-mono text-xs sm:text-sm">
                        {comp.package}
                      </span>
                    </td>

                    {/* Careers Action Link */}
                    <td className="py-3 px-4 sm:px-5 text-right">
                      <a
                        href={comp.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700/80 bg-ink-800/70 hover:bg-accent-500/15 hover:border-accent-500/40 hover:text-accent-300 px-2.5 py-1 text-xs font-semibold text-ink-200 transition"
                      >
                        <span>Apply</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-xs text-ink-400">
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
