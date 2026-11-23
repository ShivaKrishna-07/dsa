"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
import { usePathname } from "next/navigation";
import PatternBadge from "@/components/ui/PatternBadge";
import ProblemStatementMarkdown from "@/components/workspace/ProblemStatementMarkdown";
import { difficultyClass } from "@/lib/format";
import { useBookmarks } from "@/context/BookmarkContext";
import { useLayout } from "@/context/LayoutContext";

let memoryCachedTopics = null;

export default function StriverSheetWorkspace({ initialTree = [] }) {
  const { isBookmarked, toggleBookmark, bookmarks, bookmarkCount } = useBookmarks();
  const { activeProblemMeta, setActiveProblemMeta } = useLayout();
  const pathname = usePathname();
  const [fullTopics, setFullTopics] = useState(memoryCachedTopics);
  const topics = fullTopics || initialTree;

  // Default fallback selection (first problem in the tree)
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

  // Priority selection: activeProblemMeta -> pathname match -> defaultSelection
  const resolveTargetSelection = () => {
    if (activeProblemMeta?.topicSlug && activeProblemMeta?.patternSlug && activeProblemMeta?.problemSlug) {
      return activeProblemMeta;
    }
    const pathParts = pathname?.split("/").filter(Boolean) || [];
    if (pathParts.length === 3) {
      return {
        topicSlug: pathParts[0],
        patternSlug: pathParts[1],
        problemSlug: pathParts[2]
      };
    }
    return defaultSelection;
  };

  const [selectedMeta, setSelectedMeta] = useState(() => resolveTargetSelection());
  const [mobileView, setMobileView] = useState("list"); // 'list' | 'details' (for mobile viewport)
  const [activeTab, setActiveTab] = useState("ps"); // 'ps' | 'intuition' | 'code'
  const [selectedCodeName, setSelectedCodeName] = useState("Optimal");
  const [wrapCode, setWrapCode] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all"); // 'all' | 'easy' | 'medium' | 'hard'
  const [filterReviewOnly, setFilterReviewOnly] = useState(false);
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

  // Accordion state (selected topic and pattern open by default)
  const [expandedTopics, setExpandedTopics] = useState(() => {
    const target = resolveTargetSelection();
    return target?.topicSlug ? new Set([target.topicSlug]) : new Set();
  });
  const [expandedPatterns, setExpandedPatterns] = useState(() => {
    const target = resolveTargetSelection();
    return target?.topicSlug && target?.patternSlug
      ? new Set([`${target.topicSlug}-${target.patternSlug}`])
      : new Set();
  });

  // Keep selected problem and accordion expanded when activeProblemMeta or pathname changes
  useEffect(() => {
    const target = resolveTargetSelection();
    if (target?.problemSlug && target.problemSlug !== selectedMeta?.problemSlug) {
      setSelectedMeta(target);
    }
    if (target?.topicSlug) {
      setExpandedTopics((prev) => (prev.has(target.topicSlug) ? prev : new Set([...prev, target.topicSlug])));
    }
    if (target?.topicSlug && target?.patternSlug) {
      const key = `${target.topicSlug}-${target.patternSlug}`;
      setExpandedPatterns((prev) => (prev.has(key) ? prev : new Set([...prev, key])));
    }
  }, [activeProblemMeta, pathname]);

  // Auto-scroll selected problem into view in accordion
  useEffect(() => {
    if (selectedMeta?.problemSlug) {
      const el = document.getElementById(`sheet-prob-${selectedMeta.problemSlug}`);
      if (el) {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedMeta?.problemSlug]);

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
    const meta = { topicSlug, patternSlug, problemSlug };
    setSelectedMeta(meta);
    setActiveProblemMeta(meta);
    try {
      window.history.replaceState(null, "", `/${topicSlug}/${patternSlug}/${problemSlug}`);
    } catch (e) {}
    setMobileView("details");
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

  // Filtered topics based on search query, difficulty, and review later status
  const q = filterQuery.trim().toLowerCase();
  const isFiltering = filterReviewOnly || filterDifficulty !== "all" || Boolean(q);

  const filteredTopics = useMemo(() => {
    if (!isFiltering) return topics;

    return topics
      .map((t) => {
        const matchesTopic = q ? t.title.toLowerCase().includes(q) : false;

        const filteredPatterns = (t.patterns || [])
          .map((p) => {
            const matchesPattern = q ? p.title.toLowerCase().includes(q) : false;

            const filteredProblems = (p.problems || []).filter((prob) => {
              if (filterReviewOnly && !isBookmarked(prob.slug)) {
                return false;
              }
              if (filterDifficulty !== "all" && prob.difficulty?.toLowerCase() !== filterDifficulty) {
                return false;
              }
              if (q) {
                return (
                  matchesTopic ||
                  matchesPattern ||
                  prob.title.toLowerCase().includes(q) ||
                  (prob.difficulty && prob.difficulty.toLowerCase().includes(q))
                );
              }
              return true;
            });

            if (filteredProblems.length > 0) {
              return { ...p, problems: filteredProblems };
            }
            return null;
          })
          .filter(Boolean);

        if (filteredPatterns.length > 0) {
          return { ...t, patterns: filteredPatterns };
        }
        return null;
      })
      .filter(Boolean);
  }, [topics, q, filterReviewOnly, filterDifficulty, bookmarks, isFiltering]);

  // When filtering or searching, auto-expand matching items
  useEffect(() => {
    if (isFiltering) {
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
  }, [isFiltering, filteredTopics]);

  // If currently selected problem is not in filtered list, auto-select the first visible problem
  useEffect(() => {
    if (isFiltering && filteredTopics.length > 0) {
      const isCurrentVisible = filteredTopics.some((t) =>
        t.patterns?.some((p) => p.problems?.some((prob) => prob.slug === selectedMeta?.problemSlug))
      );
      if (!isCurrentVisible) {
        const firstT = filteredTopics[0];
        const firstP = firstT.patterns?.[0];
        const firstProb = firstP?.problems?.[0];
        if (firstT && firstP && firstProb) {
          selectProblem(firstT.slug, firstP.slug, firstProb.slug);
        }
      }
    }
  }, [isFiltering, filteredTopics, selectedMeta?.problemSlug]);

  // Resolve current active problem (from fullTopics if available, fallback to initialTree)
  const currentTopic = (fullTopics || initialTree).find((t) => t.slug === selectedMeta?.topicSlug);
  const currentPattern = currentTopic?.patterns?.find((p) => p.slug === selectedMeta?.patternSlug);
  const activeProblem = currentPattern?.problems?.find((p) => p.slug === selectedMeta?.problemSlug);

  const activeCodeObj = activeProblem?.codes?.find((c) => c.name === selectedCodeName) || activeProblem?.codes?.[0];
  const activeCode = activeCodeObj ? activeCodeObj.code : (activeProblem?.code || "");

  // Keep code tab valid when active problem or full details load
  useEffect(() => {
    if (activeProblem?.codes && activeProblem.codes.length > 0) {
      const currentCodeExists = activeProblem.codes.some((c) => c.name === selectedCodeName);
      if (!currentCodeExists) {
        const optimal = activeProblem.codes.find((c) => c.name === "Optimal")?.name;
        setSelectedCodeName(optimal || activeProblem.codes[0].name);
      }
    }
  }, [activeProblem?.slug, activeProblem?.codes]);

  const allProblemsList = useMemo(() => {
    const list = [];
    const sourceTopics = fullTopics || initialTree || [];
    for (const t of sourceTopics) {
      for (const p of t.patterns || []) {
        for (const prob of p.problems || []) {
          list.push({
            topicSlug: t.slug,
            patternSlug: p.slug,
            problemSlug: prob.slug,
            title: prob.title,
          });
        }
      }
    }
    return list;
  }, [fullTopics, initialTree]);

  const currentIndex = allProblemsList.findIndex(
    (p) => p.problemSlug === selectedMeta?.problemSlug
  );
  const prevProblemItem = currentIndex > 0 ? allProblemsList[currentIndex - 1] : null;
  const nextProblemItem = currentIndex >= 0 && currentIndex < allProblemsList.length - 1 ? allProblemsList[currentIndex + 1] : null;

  // Keyboard navigation for previous/next problems
  useEffect(() => {
    function handleKeyDown(event) {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prevProblemItem) {
        selectProblem(prevProblemItem.topicSlug, prevProblemItem.patternSlug, prevProblemItem.problemSlug);
      } else if (event.key === "ArrowRight" && nextProblemItem) {
        selectProblem(nextProblemItem.topicSlug, nextProblemItem.patternSlug, nextProblemItem.problemSlug);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProblemItem, nextProblemItem]);

  const totalProblemsCount = useMemo(() => {
    return topics.reduce((acc, t) => acc + (t.patterns || []).reduce((a, p) => a + (p.problems?.length || 0), 0), 0);
  }, [topics]);

  const filteredProblemsCount = useMemo(() => {
    return filteredTopics.reduce((acc, t) => acc + (t.patterns || []).reduce((a, p) => a + (p.problems?.length || 0), 0), 0);
  }, [filteredTopics]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-ink-950 text-ink-100">
      {/* ========================================================================= */}
      {/* LEFT PANEL: Accordion Tree of Topics -> Patterns -> Problems              */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* LEFT PANEL: Accordion Tree of Topics -> Patterns -> Problems              */}
      {/* ========================================================================= */}
      <aside className={`flex-col w-full md:w-[480px] lg:w-[530px] xl:w-[570px] 2xl:w-[600px] shrink-0 border-r border-ink-800 bg-ink-950 ${
        mobileView === "details" ? "hidden md:flex" : "flex"
      }`}>
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
                placeholder={
                  isFiltering
                    ? `Search ${filteredProblemsCount} filtered problems...`
                    : `Filter ${totalProblemsCount} problems, patterns, topics...`
                }
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

          {/* Quick Filter Pills Row (Sheet layout only) */}
          <div className="mt-2.5 pt-2 border-t border-ink-800/60 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto code-scroll py-0.5 min-w-0">
              {/* All Problems */}
              <button
                type="button"
                onClick={() => {
                  setFilterReviewOnly(false);
                  setFilterDifficulty("all");
                }}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  !filterReviewOnly && filterDifficulty === "all"
                    ? "bg-accent-500 text-[#09090b] shadow-sm shadow-accent-500/25 ring-1 ring-black/10 font-bold"
                    : "border border-ink-800 bg-ink-900/70 text-ink-400 hover:border-ink-700 hover:bg-ink-850 hover:text-ink-200"
                }`}
                title="Show all problems"
              >
                All
              </button>

              {/* Review Later (Bookmarked) Toggle */}
              <button
                type="button"
                onClick={() => setFilterReviewOnly((prev) => !prev)}
                className={`shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition border ${
                  filterReviewOnly
                    ? "border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold shadow-sm shadow-amber-500/15"
                    : "border-ink-800 bg-ink-900/70 text-ink-400 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
                }`}
                title={filterReviewOnly ? "Review Later filter active (click to clear)" : "Show only problems marked for review"}
              >
                <Bookmark className={`h-3 w-3 ${filterReviewOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>Review Later</span>
                {bookmarkCount > 0 && (
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    filterReviewOnly
                      ? "bg-amber-500/30 text-amber-200"
                      : "bg-ink-800 text-ink-400"
                  }`}>
                    {bookmarkCount}
                  </span>
                )}
              </button>

              <span className="h-3.5 w-[1px] bg-ink-800 shrink-0 mx-0.5" />

              {/* Difficulty: Easy */}
              <button
                type="button"
                onClick={() => setFilterDifficulty((prev) => (prev === "easy" ? "all" : "easy"))}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition border ${
                  filterDifficulty === "easy"
                    ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300 font-bold shadow-sm shadow-emerald-500/15"
                    : "border-ink-800 bg-ink-900/70 text-ink-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                }`}
                title="Filter by Easy difficulty"
              >
                Easy
              </button>

              {/* Difficulty: Medium */}
              <button
                type="button"
                onClick={() => setFilterDifficulty((prev) => (prev === "medium" ? "all" : "medium"))}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition border ${
                  filterDifficulty === "medium"
                    ? "border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold shadow-sm shadow-amber-500/15"
                    : "border-ink-800 bg-ink-900/70 text-ink-400 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
                }`}
                title="Filter by Medium difficulty"
              >
                Medium
              </button>

              {/* Difficulty: Hard */}
              <button
                type="button"
                onClick={() => setFilterDifficulty((prev) => (prev === "hard" ? "all" : "hard"))}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition border ${
                  filterDifficulty === "hard"
                    ? "border-rose-500/60 bg-rose-500/20 text-rose-300 font-bold shadow-sm shadow-rose-500/15"
                    : "border-ink-800 bg-ink-900/70 text-ink-400 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                }`}
                title="Filter by Hard difficulty"
              >
                Hard
              </button>
            </div>

            {/* Problem Count Indicator */}
            <div className="shrink-0 font-mono text-[11px] text-ink-400 hidden sm:block">
              <span className="font-semibold text-ink-200">{filteredProblemsCount}</span>
              <span className="text-ink-500">/{totalProblemsCount}</span>
            </div>
          </div>
        </div>

        {/* Accordion Content List */}
        <div className="flex-1 overflow-y-auto code-scroll">
          {filteredTopics.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-ink-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink-800 bg-ink-900/60 mb-3 shadow-inner">
                {filterReviewOnly ? (
                  <Bookmark className="h-5 w-5 text-amber-400/80" />
                ) : (
                  <Search className="h-5 w-5 text-ink-500" />
                )}
              </div>
              <p className="font-semibold text-ink-200 text-sm">
                {filterReviewOnly ? "No problems marked for review" : "No matching problems found"}
              </p>
              <p className="text-xs text-ink-500 mt-1 max-w-[260px]">
                {filterReviewOnly
                  ? "Click the bookmark icon on any problem to mark it for review later."
                  : "Try adjusting your search query or clearing the active filters."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterReviewOnly(false);
                  setFilterDifficulty("all");
                  setFilterQuery("");
                }}
                className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-ink-700/80 bg-ink-800/80 px-3 py-1.5 text-xs font-semibold text-ink-200 hover:bg-accent-500 hover:text-[#09090b] transition shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => {
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
                              {pattern.badge && (
                                <PatternBadge badge={pattern.badge} compact showLabel={false} />
                              )}
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
                                    id={`sheet-prob-${problem.slug}`}
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
                                          ? "bg-accent-500 text-[#09090b] font-bold shadow-sm shadow-accent-500/30"
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

                                    {/* Right: Difficulty, Bookmark & Platform Icons */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className={`rounded-full border px-1.5 py-0.2 text-[10px] font-semibold ${difficultyClass(problem.difficulty)}`}>
                                        {problem.difficulty}
                                      </span>

                                      {problem.label && (
                                        <Flame className="h-3 w-3 fill-red-500 text-red-500 shrink-0" />
                                      )}

                                      {/* Bookmark / Review Later Toggle */}
                                      {(() => {
                                        const isMarked = isBookmarked(problem.slug);
                                        return (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleBookmark(problem.slug);
                                            }}
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition ${
                                              isMarked
                                                ? "text-amber-400 hover:bg-amber-500/20"
                                                : "text-ink-600 hover:text-amber-400 hover:bg-ink-800 opacity-0 group-hover:opacity-100"
                                            }`}
                                            title={isMarked ? "Marked for review (Click to unmark)" : "Mark to review later"}
                                          >
                                            <Bookmark className={`h-3 w-3 ${isMarked ? "fill-amber-400 text-amber-400" : ""}`} />
                                          </button>
                                        );
                                      })()}

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
          })
        )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* RIGHT PANEL: Problem Details Viewer (3 Tabs: Statement, Intuition, Code)   */}
      {/* ========================================================================= */}
      <main className={`flex-1 min-w-0 flex-col h-full overflow-hidden bg-ink-950 ${
        mobileView === "list" ? "hidden md:flex" : "flex"
      }`}>
        {activeProblem ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header: Tabs on left, Bookmark / Review on right */}
            <div className="flex items-center justify-between gap-2 border-b border-ink-800/80 bg-ink-950/90 px-3 sm:px-6 py-2.5 shrink-0">
              <div className="flex items-center gap-1.5 min-w-0">
                {/* Mobile Back Button to return to list */}
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="md:hidden inline-flex items-center gap-1 rounded-lg border border-ink-800 bg-ink-900/90 px-2.5 py-1.5 text-xs font-semibold text-accent-400 hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-accent-300 transition shrink-0 shadow-sm"
                  title="Back to Sheet List"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>List</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ps")}
                  className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition shrink-0 ${
                    activeTab === "ps"
                      ? "bg-ink-850 text-ink-100 shadow-sm border border-ink-700/60"
                      : "text-ink-400 hover:bg-ink-850/50 hover:text-ink-200"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-accent-400" />
                  <span className="hidden sm:inline">Problem Statement</span>
                  <span className="sm:hidden">Problem</span>
                </button>

                {activeProblem.intuition && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("intuition")}
                    className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition shrink-0 ${
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
                  className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition shrink-0 ${
                    activeTab === "code"
                      ? "bg-ink-850 text-ink-100 shadow-sm border border-ink-700/60"
                      : "text-ink-400 hover:bg-ink-850/50 hover:text-ink-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Code</span>
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Prev/Next Problem Navigation Controls */}
                <div className="flex items-center rounded-lg border border-ink-800/80 bg-ink-900/60 p-0.5 shadow-sm">
                  {prevProblemItem ? (
                    <button
                      type="button"
                      onClick={() => selectProblem(prevProblemItem.topicSlug, prevProblemItem.patternSlug, prevProblemItem.problemSlug)}
                      className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition"
                      title={`Previous: ${prevProblemItem.title} (Left Arrow)`}
                      aria-label={`Previous: ${prevProblemItem.title}`}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-700 cursor-not-allowed"
                      title="No previous problem"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <div className="h-3.5 w-px bg-ink-800/80 my-auto mx-0.5" />

                  {nextProblemItem ? (
                    <button
                      type="button"
                      onClick={() => selectProblem(nextProblemItem.topicSlug, nextProblemItem.patternSlug, nextProblemItem.problemSlug)}
                      className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition"
                      title={`Next: ${nextProblemItem.title} (Right Arrow)`}
                      aria-label={`Next: ${nextProblemItem.title}`}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-700 cursor-not-allowed"
                      title="No next problem"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Bookmark / Review Later Toggle */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(activeProblem.slug)}
                  className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-semibold transition border shrink-0 ${
                    isBookmarked(activeProblem.slug)
                      ? "border-amber-500/50 bg-amber-500/15 text-amber-300 shadow-sm shadow-amber-500/10"
                      : "border-ink-800/80 bg-ink-900/60 text-ink-400 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
                  }`}
                  title={isBookmarked(activeProblem.slug) ? "Marked for review (Click to unmark)" : "Mark to review later"}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked(activeProblem.slug) ? "fill-amber-400 text-amber-400" : ""}`} />
                  <span className="hidden sm:inline">{isBookmarked(activeProblem.slug) ? "Review Later" : "Mark"}</span>
                </button>
              </div>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-hidden relative">
              {/* TAB 1: Problem Statement */}
              {activeTab === "ps" && (
                <div className="h-full overflow-y-auto p-4 sm:p-6 code-scroll space-y-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-ink-100">
                      {activeProblem.title}
                    </h2>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${difficultyClass(activeProblem.difficulty)}`}>
                      {activeProblem.difficulty}
                    </span>
                  </div>
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
                            ? "border-accent-400 bg-accent-500 text-[#09090b] shadow-md shadow-accent-500/25 ring-1 ring-accent-300/40"
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
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className="md:hidden mb-4 inline-flex items-center gap-1.5 rounded-lg border border-ink-800 bg-ink-900/80 px-3 py-1.5 text-xs font-semibold text-accent-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Problems List</span>
            </button>
            <Sparkles className="h-8 w-8 text-accent-400 mb-3" />
            <h3 className="text-base font-semibold text-ink-200">No Problem Selected</h3>
            <p className="text-xs text-ink-500 mt-1">Select any problem from the left accordion to view its statement, intuition, and solution.</p>
          </div>
        )}
      </main>
    </div>
  );
}
