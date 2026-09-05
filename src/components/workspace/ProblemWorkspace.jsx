"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code2, ExternalLink, Gauge, Lightbulb, Flame } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import Tabs from "@/components/ui/Tabs";
import { difficultyClass, platformLabel } from "@/lib/format";
import { SiLeetcode, SiGeeksforgeeks, SiYoutube } from "react-icons/si";
import ReactMarkdown from "react-markdown";

const platformIcons = {
  leetcode: SiLeetcode,
  gfg: SiGeeksforgeeks,
  youtube: SiYoutube,
};

const platformIconClass = {
  leetcode: "text-[#ffa116]",
  gfg: "text-[#2f8d46]",
  youtube: "text-[#ff0000]"
};

export default function ProblemWorkspace({ problem }) {
  const pathname = usePathname();
  const isRecursionTopic = pathname?.startsWith('/recursion');

  const visiblePlatforms = Object.entries(problem.platforms || {}).filter(([key, url]) => {
    if (!url || typeof url !== "string" || !url.trim()) return false;
    if (key === "youtube") return true;
    if (key === "leetcode") return true;
    return key === "gfg" && !problem.platforms.leetcode;
  });

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-11.5rem)] lg:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="rounded-md border border-ink-800 bg-ink-900/40 p-4 lg:sticky lg:top-[126px] lg:h-[calc(100vh-11.5rem)] lg:overflow-auto">
        <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">{problem.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded border px-2.5 py-1 text-xs font-medium ${difficultyClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          {problem.label && (
            <span className="inline-flex items-center gap-1 rounded border border-red-500/40 bg-red-950/40 px-2.5 py-1 text-xs font-bold text-red-400 animate-pulse">
              <Flame className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              {problem.label}
            </span>
          )}
          {problem.tags.map((tag) => (
            <span key={tag} className="rounded border border-ink-700 px-2.5 py-1 text-xs text-ink-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          {visiblePlatforms.map(([key, url]) => {
            const Icon = platformIcons[key];
            return (
            <Link
              key={key}
              href={url}
              target="_blank"
              className="inline-flex items-center justify-between gap-2 rounded-md border border-ink-700 px-3 py-2 text-sm font-medium text-ink-200 transition hover:border-accent-400"
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className={`h-4 w-4 ${platformIconClass[key] || ""}`} />}
                {platformLabel(key)}
              </span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          )})}
        </div>
        <div className="mt-5 grid gap-3">
          <div className="rounded-md border border-ink-800 bg-ink-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Time</p>
            <p className="mt-1 font-semibold text-sm">{problem.complexity.time}</p>
            {problem.complexity.timeDesc && (
              <p className="mt-2 text-xs text-ink-400 leading-relaxed">
                {problem.complexity.timeDesc}
              </p>
            )}
          </div>
          <div className="rounded-md border border-ink-800 bg-ink-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Space</p>
            <p className="mt-1 font-semibold text-sm">{problem.complexity.space}</p>
            {problem.complexity.spaceDesc && (
              <p className="mt-2 text-xs text-ink-400 leading-relaxed">
                {problem.complexity.spaceDesc}
              </p>
            )}
          </div>
        </div>
      </aside>

      <Tabs
        defaultValue="ps"
        className="rounded-md border border-ink-800 bg-ink-900/35 lg:h-[calc(100vh-11.5rem)] lg:overflow-hidden"
        panelClassName="lg:overflow-auto"
        tabs={[
          {
            value: "ps",
            label: "Problem Statement",
            icon: BookOpen,
            content: (
              <article className="prose prose-invert prose-code:before:content-none prose-code:after:content-none max-w-none p-4 sm:p-6">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const textContent = String(children);
                      const isInline = inline || (className ? !className.startsWith('language-') : true);
                      
                      if (!isRecursionTopic && !isInline && (textContent.includes('[[') || textContent.includes('matrix =') || textContent.includes('mat ='))) {
                        const trimmed = textContent.trim();
                        
                        // Try parsing as a matrix-example block
                        const lines = trimmed.split('\n');
                        let matrix = null;
                        let otherInputs = '';
                        let outputVal = '';
                        let explanationText = '';
                        
                        // Parse matrix
                        const matrixMatch = trimmed.match(/\[\s*\[[\s\S]*?\]\s*\]/);
                        if (matrixMatch) {
                          const cleanedMatrix = matrixMatch[0]
                            .replace(/^[a-zA-Z0-9_\s]+=\s*/, '')
                            .replace(/;\s*$/, '');
                          
                          try {
                            const parsed = JSON.parse(cleanedMatrix);
                            if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
                              matrix = parsed;
                            }
                          } catch (e) {
                            try {
                              const rowMatches = cleanedMatrix.match(/\[\s*[^\[\]]+\s*\]/g);
                              if (rowMatches) {
                                const parsedMatrix = rowMatches.map(rowStr => {
                                  return rowStr
                                    .replace(/[\[\]]/g, '')
                                    .split(',')
                                    .map(n => n.trim())
                                    .filter(n => n !== "")
                                    .map(n => isNaN(Number(n)) ? n : Number(n));
                                });
                                if (parsedMatrix.length > 0 && parsedMatrix[0].length > 0) {
                                  matrix = parsedMatrix;
                                }
                              }
                            } catch (err) {}
                          }
                        }
                        
                        // Extract other details
                        const inputLine = lines.find(l => l.trim().startsWith('Input:'));
                        if (inputLine && matrixMatch) {
                          otherInputs = inputLine
                            .replace(/^\s*Input:\s*/i, '')
                            .replace(matrixMatch[0], '')
                            .replace(/^\s*,\s*|,\s*$/, '')
                            .replace(/^[a-zA-Z0-9_\s]+=\s*/, '')
                            .trim();
                        }
                        
                        const outputLine = lines.find(l => l.trim().startsWith('Output:'));
                        if (outputLine) {
                          outputVal = outputLine.replace(/^\s*Output:\s*/i, '').trim();
                        }
                        
                        const expIdx = lines.findIndex(l => l.trim().startsWith('Explanation:'));
                        if (expIdx !== -1) {
                          explanationText = lines.slice(expIdx).join('\n').replace(/^\s*Explanation:\s*/i, '').trim();
                        }
                        
                        if (matrix) {
                          if (!outputVal && !otherInputs && !explanationText) {
                            // Plain standalone matrix
                            return (
                              <div className="my-4 overflow-x-auto">
                                <div className="inline-block rounded-lg border border-ink-800 bg-ink-950/60 p-3 shadow-inner">
                                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(2.5rem, 1fr))` }}>
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
                          
                          // Formatted Matrix Example Card
                          return (
                            <div className="my-4 rounded-xl border border-ink-800 bg-ink-950/40 p-4 shadow-sm max-w-xl">
                              <div className="mb-4">
                                <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">Matrix Input:</div>
                                <div className="inline-block rounded-lg border border-ink-800 bg-ink-950/60 p-3 shadow-inner">
                                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(2.5rem, 1fr))` }}>
                                    {matrix.map((row, rIdx) => 
                                      row.map((val, cIdx) => (
                                        <div 
                                          key={`${rIdx}-${cIdx}`} 
                                          className="flex h-10 w-10 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-xs font-semibold text-accent-300 transition hover:border-accent-500/50"
                                        >
                                          {val}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid gap-2 border-t border-ink-800/60 pt-3 text-sm">
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
                                  <div className="text-ink-400 mt-1 bg-ink-950/40 p-2.5 rounded-lg border border-ink-900/60">
                                    <span className="font-semibold text-ink-300 block mb-0.5">Explanation:</span>
                                    {explanationText}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      }
                      
                      return isInline ? (
                        <code className={`${className || ""} px-1.5 py-0.5 rounded bg-ink-950/60 text-accent-300 font-mono text-xs`} {...props}>
                          {children}
                        </code>
                      ) : (
                        <pre className="whitespace-pre-wrap break-words rounded bg-ink-950/80 p-4">
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
            )
          },
          {
            value: "code",
            label: "Code",
            icon: Code2,
            content: problem.codes && problem.codes.length > 1 ? (
              <Tabs
                defaultValue={problem.codes.find(c => c.name === "Optimal") ? "Optimal" : problem.codes[0].name}
                className="h-full"
                panelClassName="p-4 overflow-auto"
                tabs={problem.codes.map((c) => ({
                  value: c.name,
                  label: c.name,
                  content: <CodeBlock code={c.code} compact />
                }))}
              />
            ) : (
              <CodeBlock code={problem.code} compact />
            )
          }
        ]}
      />
    </div>
  );
}
