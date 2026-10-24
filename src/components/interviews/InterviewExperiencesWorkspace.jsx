"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Code2,
  Calendar,
  Briefcase,
  MapPin,
  Sparkles,
  Layers,
  Filter,
  CheckCircle2,
  Circle,
  Flame,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  ListFilter
} from "lucide-react";
import CompanyLogo from "@/components/interviews/CompanyLogo";
import data from "@/content/interviews/experiences.json";

export default function InterviewExperiencesWorkspace() {
  const { companies, experiences, checklist } = data;

  // Filter States
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPattern, setSelectedPattern] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("feed"); // "feed" | "grouped" | "checklist"

  // Checklist solved state (persisted in localStorage)
  const [solvedChecklist, setSolvedChecklist] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("dsa_interview_checklist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSolved = (id) => {
    setSolvedChecklist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("dsa_interview_checklist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Distinct pattern tags for filter pill
  const allPatterns = useMemo(() => {
    const set = new Set();
    experiences.forEach((exp) => {
      exp.patterns?.forEach((p) => set.add(p));
    });
    return Array.from(set);
  }, [experiences]);

  // Filtered Experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      if (selectedCompany !== "all" && exp.companyId !== selectedCompany) {
        return false;
      }
      if (selectedYear !== "all") {
        if (selectedYear === "2024" && exp.year <= 2024) {
          // matches 2024 and older
        } else if (String(exp.year) !== selectedYear) {
          return false;
        }
      }
      if (selectedPattern !== "all" && !exp.patterns?.includes(selectedPattern)) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const inTitle = exp.title.toLowerCase().includes(query);
        const inDesc = exp.description.toLowerCase().includes(query);
        const inRole = exp.role.toLowerCase().includes(query);
        const inCompany = exp.company.toLowerCase().includes(query);
        const inPattern = exp.patterns?.some((p) => p.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inRole && !inCompany && !inPattern) {
          return false;
        }
      }
      return true;
    });
  }, [experiences, selectedCompany, selectedYear, selectedPattern, searchQuery]);

  // Grouped by company
  const groupedExperiences = useMemo(() => {
    const groups = { google: [], amazon: [], microsoft: [] };
    filteredExperiences.forEach((exp) => {
      if (groups[exp.companyId]) {
        groups[exp.companyId].push(exp);
      }
    });
    return groups;
  }, [filteredExperiences]);

  // Company count helpers
  const countForCompany = (compId) => experiences.filter((e) => e.companyId === compId).length;

  return (
    <div className="mx-auto max-w-[1700px] w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/90 via-ink-950/90 to-[#0c0d12] p-5 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-300">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span>Real Candidate Reports (2026 → 2024)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-100">
              Tech Interview Experiences
            </h1>
            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              Curated coding round questions and pattern breakdowns from recent interview reports at{" "}
              <span className="font-semibold text-blue-400">Google</span>,{" "}
              <span className="font-semibold text-amber-400">Amazon</span>, and{" "}
              <span className="font-semibold text-sky-400">Microsoft</span>. Focus on the underlying pattern, not just memorization.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap md:flex-col items-start gap-2 shrink-0">
            <div className="flex items-center gap-2.5 rounded-2xl border border-ink-800/80 bg-ink-950/70 px-3.5 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <CompanyLogo company="Google" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-500">Google</div>
                <div className="text-xs font-bold text-ink-200">{countForCompany("google")} Reports</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl border border-ink-800/80 bg-ink-950/70 px-3.5 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                <CompanyLogo company="Amazon" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-500">Amazon</div>
                <div className="text-xs font-bold text-ink-200">{countForCompany("amazon")} Reports</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl border border-ink-800/80 bg-ink-950/70 px-3.5 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20">
                <CompanyLogo company="Microsoft" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-500">Microsoft</div>
                <div className="text-xs font-bold text-ink-200">{countForCompany("microsoft")} Reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Selector Tabs */}
      <div className="flex items-center justify-between border-b border-ink-800/80 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border border-ink-800 bg-ink-950/70">
          <button
            type="button"
            onClick={() => setViewMode("feed")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === "feed"
                ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25"
                : "text-ink-400 hover:text-ink-200 hover:bg-ink-900"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Feed View ({filteredExperiences.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grouped")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === "grouped"
                ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25"
                : "text-ink-400 hover:text-ink-200 hover:bg-ink-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>By Company</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("checklist")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === "checklist"
                ? "bg-accent-500 text-white shadow-sm shadow-accent-500/25"
                : "text-ink-400 hover:text-ink-200 hover:bg-ink-900"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              15 Priority Checklist ({solvedChecklist.length}/{checklist.length})
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, roles, tags..."
            className="w-full rounded-xl border border-ink-800 bg-ink-900/60 py-1.5 pl-9 pr-3 text-xs text-ink-200 placeholder-ink-500 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition"
          />
        </div>
      </div>

      {/* Interactive Filters Bar (Shown for Feed & Grouped views) */}
      {viewMode !== "checklist" && (
        <div className="flex flex-col gap-3 rounded-2xl border border-ink-800/80 bg-ink-900/30 p-3.5">
          {/* Company Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 code-scroll">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500 shrink-0 mr-1">
              Company:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCompany("all")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold border transition shrink-0 ${
                selectedCompany === "all"
                  ? "border-accent-500 bg-accent-500/20 text-accent-300"
                  : "border-ink-800 bg-ink-950/60 text-ink-400 hover:border-ink-700 hover:text-ink-200"
              }`}
            >
              <span>All Companies</span>
              <span className="rounded-full bg-ink-900 px-1.5 py-0.2 text-[10px] font-mono text-ink-400">
                {experiences.length}
              </span>
            </button>

            {companies.map((co) => (
              <button
                key={co.id}
                type="button"
                onClick={() => setSelectedCompany(co.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold border transition shrink-0 ${
                  selectedCompany === co.id
                    ? `${co.borderColor} bg-ink-900 text-ink-100 shadow-sm`
                    : "border-ink-800 bg-ink-950/60 text-ink-400 hover:border-ink-700 hover:text-ink-200"
                }`}
              >
                <CompanyLogo company={co.name} className="h-3.5 w-3.5" />
                <span>{co.name}</span>
                <span className="rounded-full bg-ink-900 border border-ink-800 px-1.5 py-0.2 text-[10px] font-mono text-ink-400">
                  {countForCompany(co.id)}
                </span>
              </button>
            ))}
          </div>

          {/* Secondary Filters: Year & Pattern */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ink-800/50 text-xs">
            {/* Year filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-ink-500">Year:</span>
              {["all", "2026", "2025", "2024"].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition ${
                    selectedYear === yr
                      ? "border-accent-500 bg-accent-500/20 text-accent-300 font-semibold"
                      : "border-ink-800 bg-ink-950/50 text-ink-400 hover:text-ink-200"
                  }`}
                >
                  {yr === "all" ? "All" : yr === "2024" ? "2024 & Older" : yr}
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-3.5 w-px bg-ink-800" />

            {/* Pattern filter dropdown / pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-ink-500">Pattern:</span>
              <button
                type="button"
                onClick={() => setSelectedPattern("all")}
                className={`rounded-lg px-2 py-0.5 text-[11px] border transition ${
                  selectedPattern === "all"
                    ? "border-accent-500 bg-accent-500/20 text-accent-300 font-semibold"
                    : "border-ink-800 bg-ink-950/50 text-ink-400 hover:text-ink-200"
                }`}
              >
                All
              </button>
              {allPatterns.slice(0, 7).map((pat) => (
                <button
                  key={pat}
                  type="button"
                  onClick={() => setSelectedPattern(selectedPattern === pat ? "all" : pat)}
                  className={`rounded-lg px-2 py-0.5 text-[11px] border transition ${
                    selectedPattern === pat
                      ? "border-accent-500 bg-accent-500/20 text-accent-300 font-semibold"
                      : "border-ink-800 bg-ink-950/50 text-ink-400 hover:text-ink-200"
                  }`}
                >
                  {pat}
                </button>
              ))}
            </div>

            {/* Reset Filters button */}
            {(selectedCompany !== "all" || selectedYear !== "all" || selectedPattern !== "all" || searchQuery !== "") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCompany("all");
                  setSelectedYear("all");
                  setSelectedPattern("all");
                  setSearchQuery("");
                }}
                className="ml-auto text-[11px] font-semibold text-rose-400 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW 1: FEED VIEW */}
      {viewMode === "feed" && (
        <div className="space-y-4">
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-ink-800 bg-ink-900/30">
              <p className="text-sm font-semibold text-ink-300">No interview experiences matched your filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCompany("all");
                  setSelectedYear("all");
                  setSelectedPattern("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-accent-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} onPatternClick={setSelectedPattern} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: GROUPED BY COMPANY VIEW */}
      {viewMode === "grouped" && (
        <div className="space-y-8">
          {companies.map((co) => {
            const list = groupedExperiences[co.id] || [];
            if (list.length === 0) return null;

            return (
              <section key={co.id} className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-ink-800 pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-ink-800 bg-ink-900">
                      <CompanyLogo company={co.name} className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-ink-100">{co.name}</h2>
                      <p className="text-xs text-ink-400">
                        {list.length} reported rounds · Patterns: {co.patterns.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-ink-800 bg-ink-950 px-2.5 py-0.5 font-mono text-xs text-ink-400">
                    {list.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((exp) => (
                    <ExperienceCard key={exp.id} exp={exp} onPatternClick={setSelectedPattern} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* VIEW 3: 15 PRIORITY PRACTICE CHECKLIST */}
      {viewMode === "checklist" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-ink-900 to-ink-950 p-4 sm:p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Curated High-Yield Graph Checklist</span>
                </div>
                <h2 className="text-lg font-bold text-ink-100">Recommended 15 Graph Problems</h2>
                <p className="text-xs text-ink-300 mt-1 max-w-2xl leading-relaxed">
                  Top prioritized practice problems synthesized across candidate reports from Google, Amazon, and Microsoft. Work through these in order from foundation to advanced variations.
                </p>
              </div>

              <div className="rounded-2xl border border-ink-800 bg-ink-950/80 px-4 py-2.5 text-center">
                <div className="text-[10px] uppercase font-bold text-ink-500">Solved Status</div>
                <div className="text-base font-extrabold text-emerald-400 font-mono">
                  {solvedChecklist.length} / {checklist.length}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist table / cards */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm overflow-hidden divide-y divide-ink-800/60">
            {checklist.map((item, idx) => {
              const isSolved = solvedChecklist.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 gap-3 transition ${
                    isSolved ? "bg-emerald-500/5" : "hover:bg-ink-900/80"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleSolved(item.id)}
                      className="mt-0.5 shrink-0 text-ink-500 hover:text-emerald-400 transition"
                      aria-label={isSolved ? "Mark incomplete" : "Mark solved"}
                    >
                      {isSolved ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-ink-600 hover:text-ink-400" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-ink-500">{idx + 1}.</span>
                        <span
                          className={`text-sm font-bold ${
                            isSolved ? "line-through text-ink-400" : "text-ink-100"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            item.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : item.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {item.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-ink-400 flex-wrap">
                        <span className="font-medium text-accent-400">{item.pattern}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {item.companies.map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-ink-950 border border-ink-800 px-2 py-0.2 text-[10px] font-medium text-ink-300"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 pl-8 sm:pl-0">
                    {item.url.startsWith("/") ? (
                      <Link
                        href={item.url}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-accent-500/40 bg-accent-500/10 px-3 py-1.5 text-xs font-semibold text-accent-300 hover:bg-accent-500/20 transition"
                      >
                        <span>Open Problem</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-ink-800 bg-ink-950 px-3 py-1.5 text-xs font-semibold text-ink-300 hover:border-ink-700 hover:text-ink-100 transition"
                      >
                        <span>Practice on LeetCode</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Experience Card Component
function ExperienceCard({ exp, onPatternClick }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-ink-800 bg-ink-900/40 backdrop-blur-sm p-4 sm:p-5 hover:border-ink-700 hover:bg-ink-900/70 transition shadow-sm group">
      <div className="space-y-3">
        {/* Top Header: Company + Date Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-ink-800 bg-ink-950">
              <CompanyLogo company={exp.company} className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold text-ink-100">{exp.company}</span>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full border border-ink-800 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-mono font-medium text-amber-300">
            <Calendar className="h-3 w-3 text-amber-400" />
            <span>{exp.date}</span>
          </span>
        </div>

        {/* Role & Recruitment Type */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-ink-400">
          <span className="inline-flex items-center gap-1 font-semibold text-ink-200">
            <Briefcase className="h-3 w-3 text-ink-500" />
            <span>{exp.role}</span>
          </span>
          {exp.type && (
            <>
              <span>•</span>
              <span className="rounded bg-ink-950/60 px-1.5 py-0.5 border border-ink-800 text-ink-400 font-medium">
                {exp.type}
              </span>
            </>
          )}
          {exp.location && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-0.5 text-ink-400">
                <MapPin className="h-2.5 w-2.5" />
                <span>{exp.location}</span>
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-ink-100 group-hover:text-accent-300 transition leading-snug">
          {exp.title}
        </h3>

        {/* Description / Follow-ups */}
        <p className="text-xs text-ink-300 leading-relaxed line-clamp-4">{exp.description}</p>

        {/* Patterns Tags */}
        {exp.patterns && exp.patterns.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {exp.patterns.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPatternClick && onPatternClick(p)}
                className="rounded-md border border-ink-800/80 bg-ink-950/70 px-2 py-0.5 text-[10px] font-medium text-accent-400 hover:border-accent-500/50 hover:bg-accent-500/10 transition"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions (Bottom) */}
      <div className="mt-4 pt-3 border-t border-ink-800/60 flex items-center justify-between gap-2 text-xs">
        {/* External Report Link */}
        {exp.sourceUrl && (
          <a
            href={exp.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-accent-400 hover:text-accent-300 hover:underline transition"
            title={`Read report on ${exp.source}`}
          >
            <span>Read Report</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}

        {/* Practice Problem Link */}
        {exp.practiceUrl && (
          exp.practiceUrl.startsWith("/") ? (
            <Link
              href={exp.practiceUrl}
              className="inline-flex items-center gap-1 rounded-lg border border-ink-800 bg-ink-950 px-2.5 py-1 text-[11px] font-semibold text-ink-300 hover:border-accent-500/50 hover:text-accent-300 transition"
            >
              <span>Practice</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          ) : (
            <a
              href={exp.practiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-ink-800 bg-ink-950 px-2.5 py-1 text-[11px] font-semibold text-ink-300 hover:border-accent-500/50 hover:text-accent-300 transition"
            >
              <span>Practice</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )
        )}
      </div>
    </div>
  );
}
