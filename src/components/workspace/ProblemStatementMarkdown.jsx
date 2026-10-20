"use client";

import ReactMarkdown from "react-markdown";

export default function ProblemStatementMarkdown({ content, isRecursionTopic = false, pathname = "" }) {
  if (!content) return null;

  return (
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
                explanationText = lines
                  .slice(expIdx)
                  .join("\n")
                  .replace(/^\s*Explanation:\s*/i, "")
                  .trim();
              }

              if (matrix && matrix.length > 0 && matrix[0].length > 0) {
                return (
                  <div className="my-4 rounded-xl border border-ink-800 bg-ink-950/60 p-4 shadow-sm">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-500">
                      Matrix Visualization
                    </div>

                    <div className="overflow-x-auto py-2">
                      <div className="inline-block min-w-full">
                        <div
                          className="grid gap-1.5"
                          style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(2.2rem, 1fr))` }}
                        >
                          {matrix.map((row, rIdx) =>
                            row.map((val, cIdx) => (
                              <div
                                key={`${rIdx}-${cIdx}`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 bg-ink-900 font-mono text-xs font-semibold text-accent-300 transition hover:border-accent-500/50"
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
                        <div className="text-ink-400 mt-1 bg-ink-950/40 p-2.5 rounded-lg border border-ink-800/60 text-xs">
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
                  <pre className="whitespace-pre-wrap break-words rounded-xl bg-ink-950/80 p-3 text-xs sm:text-sm">
                    <code className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </pre>
                );
              }
            }

            return isInline ? (
              <code className={`${className || ""} px-1.5 py-0.5 rounded-md bg-ink-950/60 text-accent-300 font-mono text-xs`} {...props}>
                {children}
              </code>
            ) : (
              <pre className="whitespace-pre-wrap break-words rounded-xl bg-ink-950/80 p-3 text-xs sm:text-sm">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
