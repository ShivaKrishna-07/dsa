"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Calendar, RotateCcw, Layers, Building2 } from "lucide-react";
import CompanyLogo from "@/components/interviews/CompanyLogo";
import CustomDropdown from "@/components/interviews/CustomDropdown";
import data from "@/content/interviews/experiences.json";

export default function InterviewExperiencesWorkspace() {
  const { companies = [], experiences = [] } = data;
  const searchParams = useSearchParams();

  // Filters: Company, Role, Campus
  const [selectedCompany, setSelectedCompany] = useState(() => {
    const param = searchParams.get("company");
    if (param && ["google", "amazon", "microsoft"].includes(param.toLowerCase())) {
      return param.toLowerCase();
    }
    return "all";
  });

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedCampus, setSelectedCampus] = useState("all");

  // Sync if URL query param changes
  useEffect(() => {
    const param = searchParams.get("company");
    if (param && ["google", "amazon", "microsoft"].includes(param.toLowerCase())) {
      setSelectedCompany(param.toLowerCase());
    }
  }, [searchParams]);

  // Company options: only companies present in the experiences dataset, with logos
  const companyOptions = useMemo(() => {
    const presentCompanyIds = new Set(experiences.map((e) => e.companyId));
    const list = [
      {
        value: "all",
        label: "All Companies",
        icon: <Building2 className="h-4 w-4 text-ink-400" />
      }
    ];

    companies.forEach((comp) => {
      if (presentCompanyIds.has(comp.id)) {
        list.push({
          value: comp.id,
          label: comp.name,
          icon: <CompanyLogo company={comp.name} className="h-4 w-4" />
        });
      }
    });

    return list;
  }, [companies, experiences]);

  // Role options: strictly only roles that exist in our dataset
  const roleOptions = useMemo(() => {
    const set = new Set();
    experiences.forEach((exp) => {
      if (exp.role) set.add(exp.role);
    });
    const sortedRoles = Array.from(set).sort();
    return [
      { value: "all", label: "All Roles" },
      ...sortedRoles.map((role) => ({ value: role, label: role }))
    ];
  }, [experiences]);

  // Campus options: strictly only campus types present in our dataset
  const campusOptions = useMemo(() => {
    const set = new Set();
    experiences.forEach((exp) => {
      if (exp.campus) set.add(exp.campus);
    });
    const sortedCampus = Array.from(set).sort();
    return [
      { value: "all", label: "All Types" },
      ...sortedCampus.map((campus) => ({ value: campus, label: campus }))
    ];
  }, [experiences]);

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      if (selectedCompany !== "all" && exp.companyId !== selectedCompany) {
        return false;
      }
      if (selectedRole !== "all" && exp.role !== selectedRole) {
        return false;
      }
      if (selectedCampus !== "all") {
        if (exp.campus !== selectedCampus) {
          return false;
        }
      }
      return true;
    });
  }, [experiences, selectedCompany, selectedRole, selectedCampus]);

  const resetFilters = () => {
    setSelectedCompany("all");
    setSelectedRole("all");
    setSelectedCampus("all");
  };

  const isFiltered =
    selectedCompany !== "all" || selectedRole !== "all" || selectedCampus !== "all";

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* Top Header & Smooth Custom Dropdown Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-100 flex items-center gap-2.5">
            <span>Interview Experiences</span>
            <span className="rounded-full bg-accent-500/15 border border-accent-500/30 px-2.5 py-0.5 text-xs font-semibold text-accent-400">
              {filteredExperiences.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 mt-0.5">
            Verified recent interview rounds & formats
          </p>
        </div>

        {/* Custom Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Company Filter (with Logo) */}
          <CustomDropdown
            value={selectedCompany}
            onChange={setSelectedCompany}
            options={companyOptions}
            placeholder="Select Company"
          />

          {/* Role Filter (Only existing roles) */}
          <CustomDropdown
            value={selectedRole}
            onChange={setSelectedRole}
            options={roleOptions}
            placeholder="Select Role"
          />

          {/* Campus Type Filter (Only existing types) */}
          <CustomDropdown
            value={selectedCampus}
            onChange={setSelectedCampus}
            options={campusOptions}
            placeholder="Select Campus"
          />

          {/* Reset Filters (shown only when filter active) */}
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

      {/* Cards Grid */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="group flex flex-col justify-between rounded-2xl border border-ink-800 bg-ink-900/40 p-4 sm:p-5 hover:border-ink-700 hover:bg-ink-900/70 transition shadow-sm"
            >
              {/* Header: Company & Date */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-ink-700/60 bg-ink-950/80 p-1 shadow-inner">
                      <CompanyLogo company={exp.company} className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-sm sm:text-base text-ink-100 truncate">
                      {exp.company}
                    </span>
                  </div>

                  {/* Interview Date */}
                  <div className="flex items-center gap-1.5 text-xs text-ink-400 shrink-0 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-ink-400" />
                    <span>{exp.date}</span>
                  </div>
                </div>

                {/* Role, Campus Badge, and Candidate Experience */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-ink-800/50">
                  <span className="text-xs sm:text-sm font-semibold text-ink-200 truncate">
                    {exp.role}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Candidate's Current Experience / YoE if mentioned in article (else nothing) */}
                    {exp.candidateExperience && (
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                        {exp.candidateExperience}
                      </span>
                    )}

                    {/* Campus Badge: strictly On-Campus or Off-Campus only (empty if unknown/null) */}
                    {exp.campus && (
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                          exp.campus === "On-Campus"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {exp.campus}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rounds List */}
                {exp.rounds && exp.rounds.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                      Rounds
                    </div>
                    <div className="space-y-1.5">
                      {exp.rounds.map((round, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-ink-800/60 bg-ink-950/50 px-2.5 py-1.5 text-xs text-ink-300"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-[10px] font-bold text-accent-400">
                            {idx + 1}
                          </span>
                          <span className="truncate">{round}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Read Report Link */}
              <div className="mt-4 pt-3 border-t border-ink-800/60 flex items-center justify-end">
                <a
                  href={exp.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-300 transition"
                >
                  <span>Read Report</span>
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
            No interview experiences match the selected filters.
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
