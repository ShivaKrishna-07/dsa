"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Code2,
  Flame,
  Lightbulb,
  Search,
  Sparkles,
  WrapText,
  X
} from "lucide-react";
import { SiGeeksforgeeks, SiLeetcode, SiYoutube } from "react-icons/si";
import { TopicIcon } from "@/components/ui/icons";
import CodeBlock, { CopyButton } from "@/components/ui/CodeBlock";
import ProblemStatementMarkdown from "@/components/workspace/ProblemStatementMarkdown";
import { difficultyClass } from "@/lib/format";

let memoryCachedTopics = null;

export default function StriverSheetWorkspace({ initialTree = [] }) {
  const [fullTopics, setFullTopics] = useState(memoryCachedTopics);
  const topics = fullTopics || initialTree;

  // Default selection
  const defaultSelection = useMemo(() => {
    if (!topics.length) return null;
    for (const t of topics) {
      for (const p of t.patterns || []) {
        if (p.problems && p.problems.length > 0) {
          return {
            topicSlug: t.slug,
            patternSlug: p.slug,
            problemSlug: p.problems[0].slug
          };
        }
      }
    }
    return null;
  }, [topics]);

  const [selectedMeta, setSelectedMeta] = useState(defaultSelection);
  const [activeTab, setActiveTab] = useState("ps"); // 'ps' | 'intuition' | 'code'
  const [selectedCodeName, setSelectedCodeName] = useState("Optimal");
  const [wrapCode, setWrapCode] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const searchInputRef = useRef(null);

  // Focus search input on Ctrl+K / Cmd+K / /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Accordion state (first topic and pattern open by default)
  const [expandedTopics, setExpandedTopics] = useState(() => {
    return defaultSelection ? new Set([defaultSelection.topicSlug]) : new Set();
  });
  const [expandedPatterns, setExpandedPatterns] = useState(() => {
    return defaultSelection ? new Set([`${defaultSelection.topicSlug}-${defaultSelection.patternSlug}`]) : new Set();
  });

  // Fetch full details if not in memory
  useEffect(() => {
    if (memoryCachedTopics) {
      setFullTopics(memoryCachedTopics);
      return;
    }

    fetch("/data/sheet.json")
      .then((res) => {
        if (!res.ok) throw new Error("Fallback to api");
        return res.json();
      })
      .then((data) => {
        memoryCachedTopics = data;
        setFullTopics(data);
      })
      .catch(() => {
        fetch("/api/sheet")
          .then((res) => res.json())
          .then((data) => {
            memoryCachedTopics = data;
            setFullTopics(data);
          })
          .catch(() => {});
      });
  }, []);

  // Sync wrap preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_word_wrap");
      if (saved !== null) {
        setWrapCode(saved === "true");
      }
    } catch (e) {}
  }, []);

  const toggleWrapCode = () => {
    setWrapCode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("dsa_word_wrap", String(next));
      } catch (e) {}
      return next;
    });
  };

  // Toggle topic accordion
  const toggleTopic = (slug) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Toggle pattern accordion
  const togglePattern = (topicSlug, patternSlug) => {
    const key = `${topicSlug}-${patternSlug}`;
    setExpandedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allT = new Set(topics.map((t) => t.slug));
    const allP = new Set();
    topics.forEach((t) => {
      t.patterns?.forEach((p) => {
        allP.add(`${t.slug}-${p.slug}`);
      });
    });
    setExpandedTopics(allT);
    setExpandedPatterns(allP);
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
    setExpandedPatterns(new Set());
  };

  // Select problem and reset code tab if needed
  const selectProblem = (topicSlug, patternSlug, problemSlug) => {
    setSelectedMeta({ topicSlug, patternSlug, problemSlug });
    const fullTopic = fullTopics?.find((t) => t.slug === topicSlug);
    const fullPattern = fullTopic?.patterns?.find((p) => p.slug === patternSlug);
    const fullProblem = fullPattern?.problems?.find((p) => p.slug === problemSlug);

    if (fullProblem?.codes && fullProblem.codes.length > 0) {
      const optimal = fullProblem.codes.find((c) => c.name === "Optimal")?.name;
      setSelectedCodeName(optimal || fullProblem.codes[0].name);
    } else {
      setSelectedCodeName("Solution");
    }
  };

  // Filtered topics based on search query
  const q = filterQuery.trim().toLowerCase();
  const filteredTopics = useMemo(() => {
    if (!q) return topics;
    return topics
      .map((t) => {
        const matchesTopic = t.title.toLowerCase().includes(q);
        const filteredPatterns = (t.patterns || [])
          .map((p) => {
            const matchesPattern = p.title.toLowerCase().includes(q);
            const filteredProblems = (p.problems || []).filter((prob) => {
              return (
                matchesTopic ||
                matchesPattern ||
                prob.title.toLowerCase().includes(q) ||
                (prob.difficulty && prob.difficulty.toLowerCase().includes(q))
              );
            });
            if (matchesPattern || filteredProblems.length > 0) {
              return { ...p, problems: matchesPattern ? p.problems : filteredProblems };
            }
            return null;
          })
          .filter(Boolean);

        if (matchesTopic || filteredPatterns.length > 0) {
          return { ...t, patterns: matchesTopic ? t.patterns : filteredPatterns };
        }
        return null;
      })
      .filter(Boolean);
  }, [topics, q]);

  // When searching, auto-expand matching items
  useEffect(() => {
    if (q) {
      const tSet = new Set();
      const pSet = new Set();
      filteredTopics.forEach((t) => {
        tSet.add(t.slug);
        t.patterns?.forEach((p) => {
          pSet.add(`${t.slug}-${p.slug}`);
        });
      });
      setExpandedTopics(tSet);
      setExpandedPatterns(pSet);
    }
  }, [q, filteredTopics]);

  // Resolve current active problem (from fullTopics if available, fallback to initialTree)
  const currentTopic = (fullTopics || initialTree).find((t) => t.slug === selectedMeta?.topicSlug);
  const currentPattern = currentTopic?.patterns?.find((p) => p.slug === selectedMeta?.patternSlug);
  const activeProblem = currentPattern?.problems?.find((p) => p.slug === selectedMeta?.problemSlug);

  const activeCodeObj = activeProblem?.codes?.find((c) => c.name === selectedCodeName) || activeProblem?.codes?.[0];
  const activeCode = activeCodeObj ? activeCodeObj.code : (activeProblem?.code || "");

  const totalProblemsCount = useMemo(() => {
    return topics.reduce((acc, t) => acc + (t.patterns || []).reduce((a, p) => a + (p.problems?.length || 0), 0), 0);
  }, [topics]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-ink-950 text-ink-100">
      {/* ========================================================================= */}
      {/* LEFT PANEL: Accordion Tree of Topics -> Patterns -> Problems              */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* LEFT PANEL: Accordion Tree of Topics -> Patterns -> Problems              */}
      {/* ========================================================================= */}
      <aside className="flex flex-col w-full md:w-[480px] lg:w-[530px] xl:w-[570px] 2xl:w-[600px] shrink-0 border-r border-ink-800 bg-ink-950">
        {/* Top Control Bar: Search Filter & Expand/Collapse Controls */}
        <div className="border-b border-ink-800/80 bg-ink-950/90 p-2.5 sm:p-3">
          <div className="flex items-center gap-2">
            {/* Search Filter Box */}
            <div className="relative flex-1 min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    if (filterQuery) {
                      setFilterQuery("");
                    } else {
                      searchInputRef.current?.blur();
                    }
                  }
                }}
                placeholder={`Filter ${totalProblemsCount} problems, patterns, topics...`}
                className="w-full rounded-xl border border-ink-800 bg-ink-900/90 py-1.5 pl-9 pr-14 text-xs text-ink-100 placeholder:text-ink-500 outline-none transition focus:border-accent-500/80 focus:ring-1 focus:ring-accent-500/20"
              />
              {filterQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-200 transition"
                  title="Clear filter"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-ink-800 bg-ink-950/80 px-1.5 py-0.5 text-[10px] font-mono text-ink-500">
                  Ctrl+K
                </kbd>
              )}
            </div>

            {/* Expand All / Collapse Buttons */}
            <div className="flex items-center shrink-0 rounded-xl border border-ink-800 bg-ink-900/70 p-0.5 text-[11px] shadow-sm">
              <button
                type="button"
                onClick={expandAll}
                className="rounded-lg px-2.5 py-1 font-medium text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition whitespace-nowrap"
                title="Expand all topics and patterns"
              >
                Expand All
              </button>
              <span className="h-3 w-[1px] bg-ink-800" />
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-lg px-2.5 py-1 font-medium text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition whitespace-nowrap"
                title="Collapse all"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Content List */}
        <div className="flex-1 overflow-y-auto code-scroll">
          {filteredTopics.map((topic) => {
            const isTopicExpanded = expandedTopics.has(topic.slug);
            const topicProblemCount = (topic.patterns || []).reduce((acc, p) => acc + (p.problems?.length || 0), 0);

            return (
              <div key={topic.slug} className="border-b border-ink-800/60">
                {/* Topic Header Accordion Button */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.slug)}
                  className={`flex w-full items-center justify-between gap-2.5 px-3.5 py-3 text-left transition-all ${
                    isTopicExpanded
                      ? "bg-ink-900/90 border-l-[3px] border-l-accent-500 shadow-sm"
                      : "bg-ink-950/60 hover:bg-ink-900/50 border-l-[3px] border-l-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition ${
                      isTopicExpanded
                        ? "bg-accent-500/15 border-accent-500/30 text-accent-300 shadow-sm shadow-accent-500/10"
                        : "border-ink-800 bg-ink-900/80 text-ink-400"
                    }`}>
                      <TopicIcon name={topic.icon} className="h-3.5 w-3.5" />
                    </span>
                    <span className={`font-bold text-xs sm:text-sm tracking-tight truncate ${
                      isTopicExpanded ? "text-ink-100" : "text-ink-200"
                    }`}>
                      {topic.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold border ${
                      isTopicExpanded
                        ? "bg-accent-500/10 text-accent-400 border-accent-500/20"
                        : "border-ink-800 bg-ink-900/80 text-ink-500"
                    }`}>
                      {topicProblemCount}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isTopicExpanded ? "rotate-180 text-accent-400" : "text-ink-500"
                      }`}
                    />
                  </div>
                </button>

                {/* Patterns under Topic */}
                {isTopicExpanded && (
                  <div className="bg-ink-950/90 px-2 py-2 space-y-1.5 border-t border-ink-800/40">
                    {(topic.patterns || []).map((pattern) => {
                      const patternKey = `${topic.slug}-${pattern.slug}`;
                      const isPatternExpanded = expandedPatterns.has(patternKey);

                      return (
                        <div
                          key={pattern.slug}
                          className={`rounded-xl border transition-all overflow-hidden ${
                            isPatternExpanded
                              ? "border-ink-700/80 bg-ink-900/80 shadow-md shadow-black/20"
                              : "border-ink-800/60 bg-ink-900/40 hover:bg-ink-900/60 hover:border-ink-700/50"
                          }`}
                        >
                          {/* Pattern Sub-Accordion Header */}
                          <button
                            type="button"
                            onClick={() => togglePattern(topic.slug, pattern.slug)}
                            className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition ${
                              isPatternExpanded
                                ? "bg-ink-850/90 border-b border-ink-800/70"
                                : "hover:bg-ink-850/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                isPatternExpanded ? "bg-accent-400 shadow-[0_0_6px_rgba(167,139,250,0.6)]" : "bg-ink-600"
                              }`} />
                              <span className={`font-semibold text-xs truncate ${
                                isPatternExpanded ? "text-ink-100" : "text-ink-300"
                              }`}>
                                {pattern.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="rounded-full px-1.5 py-0.2 text-[10px] font-mono font-medium text-ink-400 bg-ink-950 border border-ink-800/70">
                                {pattern.problems?.length || 0}
                              </span>
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                  isPatternExpanded ? "rotate-180 text-accent-400" : "text-ink-500"
                                }`}
                              />
                            </div>
                          </button>

                          {/* Problems List in Pattern */}
                          {isPatternExpanded && (
                            <div className="bg-ink-950/80 p-1 space-y-0.5">
                              {(pattern.problems || []).map((problem, pIdx) => {
                                const isSelected = selectedMeta?.problemSlug === problem.slug;
                                const probLeetcode = problem.platforms?.leetcode;
                                const probGfg = !probLeetcode ? problem.platforms?.gfg : null;
                                const probYoutube = problem.platforms?.youtube;
                                const probArticle = problem.platforms?.article;

                                return (
                                  <div
                                    key={problem.slug}
                                    onClick={() => selectProblem(topic.slug, pattern.slug, problem.slug)}
                                    className={`group flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all ${
                                      isSelected
                                        ? "bg-accent-500/15 border border-accent-500/40 text-ink-100 shadow-sm shadow-accent-500/10"
                                        : "bg-ink-900/30 hover:bg-ink-850/80 border border-transparent hover:border-ink-800/60 text-ink-300"
                                    }`}
                                  >
                                    {/* Left: Index & Title */}
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-semibold transition ${
                                        isSelected
                                          ? "bg-accent-500 text-white font-bold shadow-sm shadow-accent-500/30"
                                          : "bg-ink-950 text-ink-500 border border-ink-800/80"
                                      }`}>
                                        {pIdx + 1}
                                      </span>
                                      <span className={`text-xs truncate ${
                                        isSelected ? "font-semibold text-accent-100" : "font-medium group-hover:text-ink-100"
                                      }`}>
                                        {problem.title}
                                      </span>
                                    </div>

                                    {/* Right: Difficulty & Platform Icons */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className={`rounded-full border px-1.5 py-0.2 text-[10px] font-semibold ${difficultyClass(problem.difficulty)}`}>
                                        {problem.difficulty}
                                      </span>

                                      {problem.label && (
                                        <Flame className="h-3 w-3 fill-red-500 text-red-500 shrink-0" />
                                      )}

                                      {/* Platform Link Icons */}
                                      <div className="flex items-center gap-1 pl-1 border-l border-ink-800/80">
                                        {probLeetcode && (
                                          <a
                                            href={probLeetcode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex h-5 w-5 items-center justify-center rounded hover:bg-ink-800 text-[#ffa116] transition"
                                            title="Solve on LeetCode"
                                          >
                                            <SiLeetcode className="h-3 w-3" />
                                          </a>
                                        )}

                                        {probGfg && (
                                          <a
                                            href={probGfg}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex h-5 w-5 items-center justify-center rounded hover:bg-ink-800 text-[#22c55e] transition"
                                            title="Solve on GeeksforGeeks"
                                          >
                                            <SiGeeksforgeeks className="h-3 w-3" />
                                          </a>
                                        )}

                                        {probYoutube && (
                                          <a
                                            href={probYoutube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex h-5 w-5 items-center justify-center rounded hover:bg-ink-800 text-[#ef4444] transition"
                                            title="YouTube Solution"
                                          >
                                            <SiYoutube className="h-3 w-3" />
                                          </a>
                                        )}

                                        {probArticle && (
                                          <a
                                            href={probArticle}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex h-5 w-5 items-center justify-center rounded hover:bg-ink-800 text-accent-400 transition"
                                            title="Article Solution"
                                          >
                                            <BookOpen className="h-3 w-3" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* RIGHT PANEL: Problem Details Viewer (3 Tabs: Statement, Intuition, Code)   */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-ink-950">
        {activeProblem ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* 3 Tabs: Problem Statement, Intuition, Code */}
            <div className="border-b border-ink-800/80 bg-ink-950/90 px-4 sm:px-6 py-2.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("ps")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                    activeTab === "ps"
                      ? "bg-ink-850 text-ink-100 shadow-sm border border-ink-700/60"
                      : "text-ink-400 hover:bg-ink-850/50 hover:text-ink-200"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-accent-400" />
                  <span>Problem Statement</span>
                </button>

                {activeProblem.intuition && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("intuition")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      activeTab === "intuition"
                        ? "bg-ink-850 text-ink-100 shadow-sm border border-ink-700/60"
                        : "text-ink-400 hover:bg-ink-850/50 hover:text-ink-200"
                    }`}
                  >
                    <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                    <span>Intuition</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                    activeTab === "code"
                      ? "bg-ink-850 text-ink-100 shadow-sm border border-ink-700/60"
                      : "text-ink-400 hover:bg-ink-850/50 hover:text-ink-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-hidden relative">
              {/* TAB 1: Problem Statement */}
              {activeTab === "ps" && (
                <div className="h-full overflow-y-auto p-4 sm:p-6 code-scroll space-y-5">
                  {/* Tags */}
                  {activeProblem.tags && activeProblem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {activeProblem.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-ink-800 bg-ink-950/40 px-2 py-0.5 text-[11px] font-medium text-ink-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Problem Description with Matrix Visualizer */}
                  {activeProblem.problemStatement ? (
                    <ProblemStatementMarkdown content={activeProblem.problemStatement} />
                  ) : (
                    <div className="text-sm text-ink-500 py-8 text-center animate-pulse">Loading problem content...</div>
                  )}

                  {/* Complexity Box */}
                  <div className="mt-8 pt-4 border-t border-ink-800/70 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-3 shadow-sm">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Time Complexity</span>
                      <div className="mt-1 font-mono text-sm font-semibold text-accent-300">{activeProblem.complexity?.time || "O(N)"}</div>
                      {activeProblem.complexity?.timeDesc && (
                        <p className="mt-1 text-xs text-ink-400 leading-relaxed">{activeProblem.complexity.timeDesc}</p>
                      )}
                    </div>
                    <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-3 shadow-sm">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Space Complexity</span>
                      <div className="mt-1 font-mono text-sm font-semibold text-accent-300">{activeProblem.complexity?.space || "O(1)"}</div>
                      {activeProblem.complexity?.spaceDesc && (
                        <p className="mt-1 text-xs text-ink-400 leading-relaxed">{activeProblem.complexity.spaceDesc}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Intuition */}
              {activeTab === "intuition" && (
                <div className="h-full overflow-y-auto p-4 sm:p-6 code-scroll space-y-4">
                  <h2 className="text-lg font-bold text-ink-100 flex items-center gap-2">
                    <Lightbulb className="h-4.5 w-4.5 text-amber-400" />
                    Intuition & Approach
                  </h2>
                  {activeProblem.intuition ? (
                    <ProblemStatementMarkdown content={activeProblem.intuition} />
                  ) : (
                    <div className="text-sm text-ink-500 py-4">No intuition notes recorded for this problem.</div>
                  )}
                </div>
              )}

              {/* TAB 3: Code */}
              {activeTab === "code" && (
                <div className="h-full flex flex-col overflow-hidden">
                  {/* Approach selector + Action Buttons */}
                  <div className="flex items-center justify-between gap-2 border-b border-ink-800/80 bg-ink-950/70 px-4 py-2 shrink-0">
                    <div className="flex items-center gap-1 overflow-x-auto code-scroll">
                      {activeProblem.codes && activeProblem.codes.length > 1 ? (
                        activeProblem.codes.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedCodeName(c.name)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                              selectedCodeName === c.name
                                ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                                : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
                            }`}
                          >
                            {c.name}
                          </button>
                        ))
                      ) : (
                        <span className="rounded-lg bg-ink-800/60 border border-ink-700/50 px-3 py-1 text-xs font-semibold text-ink-100">
                          {activeProblem.codes?.[0]?.name || "Solution"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={toggleWrapCode}
                        className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg border transition shadow-sm ${
                          wrapCode
                            ? "border-accent-400 bg-accent-500 text-white shadow-md shadow-accent-500/25 ring-1 ring-accent-300/40"
                            : "border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100"
                        }`}
                        title={wrapCode ? "Word Wrap: On (click to disable)" : "Word Wrap: Off (click to enable)"}
                        aria-label="Toggle word wrap"
                        aria-pressed={wrapCode}
                      >
                        <WrapText className="h-3.5 w-3.5 stroke-[2.2]" />
                      </button>

                      <CopyButton code={activeCode} iconOnly />
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden relative">
                    <CodeBlock code={activeCode} hideHeader compact wrap={wrapCode} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-ink-400">
            <Sparkles className="h-8 w-8 text-accent-400 mb-3" />
            <h3 className="text-base font-semibold text-ink-200">No Problem Selected</h3>
            <p className="text-xs text-ink-500 mt-1">Select any problem from the left accordion to view its statement, intuition, and solution.</p>
          </div>
        )}
      </main>
    </div>
  );
}
