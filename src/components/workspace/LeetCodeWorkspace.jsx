"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Lightbulb, Flame, FileText, ChevronLeft, ChevronRight, WrapText, Bookmark } from "lucide-react";
import CodeBlock, { CopyButton } from "@/components/ui/CodeBlock";
import { difficultyClass } from "@/lib/format";
import { SiLeetcode, SiGeeksforgeeks, SiYoutube } from "react-icons/si";
import ReactMarkdown from "react-markdown";
import { useBookmarks } from "@/context/BookmarkContext";

export default function LeetCodeWorkspace({ problem, prevProblem, nextProblem }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const marked = isBookmarked(problem.slug);

  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ps");
  const [wrapCode, setWrapCode] = useState(false);

  // Sync word wrap preference from localStorage on mount
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

  // Determine default selected code tab
  const defaultCodeTab = problem.codes && problem.codes.length > 0
    ? (problem.codes.find((c) => c.name === "Optimal")?.name || problem.codes[0].name)
    : "Solution";
  const [selectedCodeName, setSelectedCodeName] = useState(defaultCodeTab);

  const activeCodeObj = problem.codes?.find((c) => c.name === selectedCodeName) || problem.codes?.[0];
  const activeCode = activeCodeObj ? activeCodeObj.code : (problem.code || "");

  const isRecursionTopic = pathname?.startsWith("/recursion") &&
    !pathname?.includes("word-search") &&
    !pathname?.includes("n-queens") &&
    !pathname?.includes("sudoku-solver");

  // Show only ONE coding platform (prioritizing LeetCode, else GFG)
  const leetcodeUrl = problem.platforms?.leetcode;
  const gfgUrl = !leetcodeUrl ? problem.platforms?.gfg : null;
  const youtubeUrl = problem.platforms?.youtube;
  const articleUrl = problem.platforms?.article;

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

      if (event.key === "ArrowLeft" && prevProblem) {
        router.push(prevProblem.href);
      } else if (event.key === "ArrowRight" && nextProblem) {
        router.push(nextProblem.href);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProblem, nextProblem, router]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 w-full h-[calc(100vh-4.25rem)] overflow-hidden">
      {/* LEFT PANEL: Problem Statement & Intuition */}
      <section className="flex flex-col h-full rounded-xl border border-ink-800 bg-ink-900/40 overflow-hidden shadow-sm">
        {/* Left Panel Header: Tabs on left, Navigation Arrows + Difficulty + Platform Icons on right */}
        <div className="flex items-center justify-between gap-2 border-b border-ink-800/80 bg-ink-950/60 px-3 py-2 shrink-0">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("ps")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "ps"
                  ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                  : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-400" />
              <span>Problem Statement</span>
            </button>

            {problem.intuition && (
              <button
                type="button"
                onClick={() => setActiveTab("intuition")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                  activeTab === "intuition"
                    ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                    : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
                <span>Intuition</span>
              </button>
            )}
          </div>

          {/* Right Header: Problem Prev/Next Arrows + Difficulty + Platform Icons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Prev/Next Problem Navigation Controls */}
            <div className="flex items-center rounded-lg border border-ink-800/80 bg-ink-900/60 p-0.5 shadow-sm">
              {prevProblem ? (
                <Link
                  href={prevProblem.href}
                  className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition"
                  title={`Previous: ${prevProblem.title} (Left Arrow)`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
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

              {nextProblem ? (
                <Link
                  href={nextProblem.href}
                  className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition"
                  title={`Next: ${nextProblem.title} (Right Arrow)`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
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

            {/* Difficulty Badge */}
            <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${difficultyClass(problem.difficulty)}`}>
              {problem.difficulty}
            </span>

            {/* Optional label */}
            {problem.label && (
              <span className="inline-flex items-center gap-1 rounded-md border border-red-500/40 bg-red-950/40 px-2 py-0.5 text-xs font-bold text-red-400">
                <Flame className="h-3 w-3 fill-red-500 text-red-500" />
                {problem.label}
              </span>
            )}

            {/* Bookmark / Review Later Toggle */}
            <button
              type="button"
              onClick={() => toggleBookmark(problem.slug)}
              className={`flex h-7 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition hover:scale-105 shadow-sm ${
                marked
                  ? "border-amber-500/50 bg-amber-500/15 text-amber-300 shadow-amber-500/10"
                  : "border-ink-800/80 bg-ink-900/60 text-ink-400 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
              }`}
              title={marked ? "Marked for review (Click to unmark)" : "Mark to review later"}
            >
              <Bookmark className={`h-3.5 w-3.5 ${marked ? "fill-amber-400 text-amber-400" : ""}`} />
              <span className="hidden sm:inline">
                {marked ? "Review Later" : "Mark"}
              </span>
            </button>

            {/* Platform Icon Buttons */}
            <div className="flex items-center gap-1 pl-1 border-l border-ink-800/80">
              {/* LeetCode Icon */}
              {leetcodeUrl && (
                <Link
                  href={leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-800/70 bg-ink-900/60 text-[#ffa116] hover:border-amber-500/50 hover:bg-ink-800 hover:scale-105 transition shadow-sm"
                  title="Solve on LeetCode"
                >
                  <SiLeetcode className="h-4 w-4" />
                </Link>
              )}

              {/* GFG Icon (shown only if no LeetCode) */}
              {gfgUrl && (
                <Link
                  href={gfgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-800/70 bg-ink-900/60 text-[#22c55e] hover:border-emerald-500/50 hover:bg-ink-800 hover:scale-105 transition shadow-sm"
                  title="Solve on GeeksforGeeks"
                >
                  <SiGeeksforgeeks className="h-4 w-4" />
                </Link>
              )}

              {/* YouTube Icon */}
              {youtubeUrl && (
                <Link
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-800/70 bg-ink-900/60 text-[#ef4444] hover:border-red-500/50 hover:bg-ink-800 hover:scale-105 transition shadow-sm"
                  title="Watch YouTube Solution"
                >
                  <SiYoutube className="h-4 w-4" />
                </Link>
              )}

              {/* Article Icon */}
              {articleUrl && (
                <Link
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-800/70 bg-ink-900/60 text-sky-400 hover:border-sky-500/50 hover:bg-ink-800 hover:scale-105 transition shadow-sm"
                  title="Read Striver Sheet Article"
                >
                  <FileText className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Left Panel Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 code-scroll">
          {activeTab === "ps" ? (
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-100 tracking-tight">
                {problem.title}
              </h1>

              {/* Tags */}
              {problem.tags && problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {problem.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-ink-800 bg-ink-950/40 px-2 py-0.5 text-[11px] font-medium text-ink-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Problem Description with Custom Matrix / Tree syntax highlighting */}
              <article className="prose prose-invert prose-code:before:content-none prose-code:after:content-none max-w-none text-sm text-ink-200">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const textContent = String(children);
                      const isInline = inline || (className ? !className.startsWith("language-") : true);

                      const trimmed = textContent.trim();
                      const lines = trimmed.split("\n");
                      const inputLine = lines.find((l) => l.trim().startsWith("Input:"));

                      const isExplicitNoMatrix = className === "language-no-matrix";
                      const isExplicitMatrix = className === "language-matrix";
                      const isNonMatrixVariable = inputLine && /\b(edges|connections|prerequisites|intervals|lists|adj|stones|operators|points|pairs)\b/i.test(inputLine);
                      const isMatrixVariable = inputLine && /\b(grid|matrix|board|image)\b/i.test(inputLine);

                      const has2DInput = inputLine && inputLine.includes("[[") && (isMatrixVariable || (!isNonMatrixVariable && !pathname?.includes("graph") && !pathname?.includes("greedy") && !pathname?.includes("heap")));
                      const isStandaloneMatrix = !inputLine && /^\[\s*\[[\s\S]*?\]\s*\]$/.test(trimmed);

                      const shouldRenderMatrix = !isExplicitNoMatrix && !isRecursionTopic && !pathname?.includes("tree") && !isInline && (isExplicitMatrix || isStandaloneMatrix || (has2DInput && !isNonMatrixVariable));

                      if (shouldRenderMatrix) {
                        let matrix = null;
                        let otherInputs = "";
                        let outputVal = "";
                        let explanationText = "";

                        const matrixMatch = trimmed.match(/\[\s*\[[\s\S]*?\]\s*\]/);
                        if (matrixMatch) {
                          const cleanedMatrix = matrixMatch[0]
                            .replace(/^[a-zA-Z0-9_\s]+=\s*/, "")
                            .replace(/;\s*$/, "");

                          try {
                            const parsed = JSON.parse(cleanedMatrix);
                            if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
                              matrix = parsed;
                            }
                          } catch (e) {
                            try {
                              const rowMatches = cleanedMatrix.match(/\[\s*[^\[\]]+\s*\]/g);
                              if (rowMatches) {
                                const parsedMatrix = rowMatches.map((rowStr) => {
                                  return rowStr
                                    .replace(/[\[\]]/g, "")
                                    .split(",")
                                    .map((n) => n.trim())
                                    .filter((n) => n !== "")
                                    .map((n) => (isNaN(Number(n)) ? n : Number(n)));
                                });
                                if (parsedMatrix.length > 0 && parsedMatrix[0].length > 0) {
                                  matrix = parsedMatrix;
                                }
                              }
                            } catch (err) {}
                          }
                        }

                        if (inputLine && matrixMatch) {
                          otherInputs = inputLine
                            .replace(/^\s*Input:\s*/i, "")
                            .replace(matrixMatch[0], "")
                            .replace(/^\s*,\s*|,\s*$/, "")
                            .replace(/^[a-zA-Z0-9_\s]+=\s*/, "")
                            .trim();
                        }

                        const outputLine = lines.find((l) => l.trim().startsWith("Output:"));
                        if (outputLine) {
                          outputVal = outputLine.replace(/^\s*Output:\s*/i, "").trim();
                        }

                        const expIdx = lines.findIndex((l) => l.trim().startsWith("Explanation:"));
                        if (expIdx !== -1) {
                          explanationText = lines.slice(expIdx).join("\n").replace(/^\s*Explanation:\s*/i, "").trim();
                        }

                        if (matrix) {
                          if (!outputVal && !otherInputs && !explanationText) {
                            return (
                              <div className="my-3 overflow-x-auto">
                                <div className="inline-block rounded-lg border border-ink-800 bg-ink-950/60 p-3 shadow-inner">
                                  <div
                                    className="grid gap-1.5"
                                    style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(2.5rem, 1fr))` }}
                                  >
                                    {matrix.map((row, rIdx) =>
                                      row.map((val, cIdx) => (
                                        <div
                                          key={`${rIdx}-${cIdx}`}
                                          className="flex h-10 w-10 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-xs font-semibold text-accent-300 transition hover:border-accent-500/50 hover:bg-ink-850"
                                        >
                                          {val}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="my-3 rounded-xl border border-ink-800 bg-ink-950/40 p-4 shadow-sm max-w-xl">
                              <div className="mb-3">
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-2">Matrix Input:</div>
                                <div className="inline-block rounded-lg border border-ink-800 bg-ink-950/60 p-2.5 shadow-inner">
                                  <div
                                    className="grid gap-1.5"
                                    style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(2.2rem, 1fr))` }}
                                  >
                                    {matrix.map((row, rIdx) =>
                                      row.map((val, cIdx) => (
                                        <div
                                          key={`${rIdx}-${cIdx}`}
                                          className="flex h-9 w-9 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-xs font-semibold text-accent-300 transition hover:border-accent-500/50"
                                        >
                                          {val}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-1.5 border-t border-ink-800/60 pt-2.5 text-xs sm:text-sm">
                                {otherInputs && (
                                  <div>
                                    <span className="font-semibold text-ink-300">Other Inputs: </span>
                                    <span className="font-mono text-accent-400">{otherInputs}</span>
                                  </div>
                                )}
                                {outputVal && (
                                  <div>
                                    <span className="font-semibold text-ink-300">Output: </span>
                                    <span className="font-mono text-emerald-400 font-bold">{outputVal}</span>
                                  </div>
                                )}
                                {explanationText && (
                                  <div className="text-ink-400 mt-1 bg-ink-950/40 p-2 rounded-lg border border-ink-900/60 text-xs">
                                    <span className="font-semibold text-ink-300 block mb-0.5">Explanation:</span>
                                    {explanationText}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      }

                      // Tree node highlight syntax **node** in language-text
                      if (!isInline && className === "language-text") {
                        const htmlContent = String(children)
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/\*\*(.*?)\*\*/g, '<span class="text-rose-400 font-bold bg-rose-500/10 px-1 rounded-sm">$1</span>');

                        if (htmlContent !== String(children).replace(/</g, "&lt;").replace(/>/g, "&gt;")) {
                          return (
                            <pre className="whitespace-pre-wrap break-words rounded bg-ink-950/80 p-3 text-xs sm:text-sm">
                              <code className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                            </pre>
                          );
                        }
                      }

                      return isInline ? (
                        <code className={`${className || ""} px-1.5 py-0.5 rounded bg-ink-950/60 text-accent-300 font-mono text-xs`} {...props}>
                          {children}
                        </code>
                      ) : (
                        <pre className="whitespace-pre-wrap break-words rounded bg-ink-950/80 p-3 text-xs sm:text-sm">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      );
                    }
                  }}
                >
                  {problem.problemStatement}
                </ReactMarkdown>
              </article>

              {/* Time & Space Complexity Box at Bottom of Description */}
              <div className="mt-8 pt-4 border-t border-ink-800/70 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-ink-800 bg-ink-950/50 p-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Time Complexity</span>
                  <div className="mt-1 font-mono text-sm font-semibold text-accent-300">{problem.complexity.time}</div>
                  {problem.complexity.timeDesc && (
                    <p className="mt-1.5 text-xs text-ink-400 leading-relaxed">{problem.complexity.timeDesc}</p>
                  )}
                </div>
                <div className="rounded-xl border border-ink-800 bg-ink-950/50 p-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Space Complexity</span>
                  <div className="mt-1 font-mono text-sm font-semibold text-accent-300">{problem.complexity.space}</div>
                  {problem.complexity.spaceDesc && (
                    <p className="mt-1.5 text-xs text-ink-400 leading-relaxed">{problem.complexity.spaceDesc}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Intuition View */
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-100 tracking-tight flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                {problem.title} — Intuition
              </h1>
              <article className="prose prose-invert max-w-none text-sm text-ink-200">
                <ReactMarkdown>{problem.intuition}</ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </section>

      {/* RIGHT PANEL: Code Workspace */}
      <section className="flex flex-col h-full rounded-xl border border-ink-800 bg-ink-900/40 overflow-hidden shadow-sm">
        {/* Code Header Bar: Approach Tabs on left, Word Wrap & Copy Buttons (Icons only) on right */}
        <div className="flex items-center justify-between gap-2 border-b border-ink-800/80 bg-ink-950/60 px-3 py-2 shrink-0">
          {/* Approach Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto code-scroll">
            {problem.codes && problem.codes.length > 1 ? (
              problem.codes.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedCodeName(c.name)}
                  className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                    selectedCodeName === c.name
                      ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60"
                      : "text-ink-400 hover:bg-ink-800/40 hover:text-ink-200"
                  }`}
                >
                  {c.name}
                </button>
              ))
            ) : (
              <span className="rounded-lg bg-ink-800/60 border border-ink-700/50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-ink-100">
                {problem.codes?.[0]?.name || "Solution"}
              </span>
            )}
          </div>

          {/* Action Buttons: Word Wrap + Copy (Icon-only) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Word Wrap Toggle Button */}
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

            {/* Copy Button (Icon only) */}
            <CopyButton code={activeCode} iconOnly />
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="flex-1 overflow-hidden relative">
          <CodeBlock code={activeCode} hideHeader compact wrap={wrapCode} />
        </div>
      </section>
    </div>
  );
}
