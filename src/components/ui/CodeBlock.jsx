"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

const keywordSet = new Set([
  "class",
  "public",
  "private",
  "protected",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "const",
  "auto",
  "void",
  "true",
  "false",
  "new",
  "delete"
]);

const typeSet = new Set([
  "int",
  "long",
  "short",
  "double",
  "float",
  "bool",
  "char",
  "string",
  "vector",
  "unordered_map",
  "map",
  "set",
  "pair",
  "Solution"
]);

function classifyToken(token, nextToken) {
  if (/^\/\/.*/.test(token)) return "code-token-comment";
  if (/^".*"$/.test(token) || /^'.*'$/.test(token)) return "code-token-string";
  if (/^\d+$/.test(token)) return "code-token-number";
  if (keywordSet.has(token)) return "code-token-keyword";
  if (typeSet.has(token)) return "code-token-type";
  if (/^[+\-*/%=!<>&|?:]+$/.test(token)) return "code-token-operator";
  if (/^[A-Za-z_]\w*$/.test(token) && nextToken === "(") return "code-token-function";
  return "";
}

function tokenizeLine(line) {
  const commentIndex = line.indexOf("//");
  const source = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
  const comment = commentIndex >= 0 ? line.slice(commentIndex) : "";
  const rawTokens = source.match(/[A-Za-z_]\w*|\d+|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|==|!=|<=|>=|\+\+|--|&&|\|\||->|::|[+\-*/%=!<>&|?:]|[{}()[\],.;]|\s+/g) || [];

  if (comment) rawTokens.push(comment);

  return rawTokens.map((token, index) => ({
    token,
    className: classifyToken(token, rawTokens[index + 1])
  }));
}

export function CopyButton({ code, className = "", iconOnly = false }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      className={`inline-flex items-center justify-center transition shadow-sm ${
        iconOnly
          ? "h-7.5 w-7.5 rounded-lg border border-ink-800 bg-ink-900/60 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100"
          : "h-8 gap-2 rounded-md border border-ink-700 px-2.5 text-xs text-ink-300 hover:border-accent-400 hover:text-ink-100"
      } ${className}`}
      title={copied ? "Copied to clipboard!" : "Copy code"}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {!iconOnly && <span>{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}

export default function CodeBlock({ code, hideHeader = false, compact = false, wrap = false }) {
  const highlightedLines = useMemo(() => {
    const rawLines = (code || "").split("\n");
    return rawLines.map((line) => {
      const tokens = tokenizeLine(line);
      const indentChars = line.match(/^(\s*)/)?.[1] || "";
      let indentCount = 0;
      for (const char of indentChars) {
        if (char === "\t") indentCount += 4;
        else indentCount += 1;
      }
      return { tokens, indentCount };
    });
  }, [code]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
      {!hideHeader && (
        <div className="flex h-10 shrink-0 items-center justify-end border-b border-ink-800 px-4">
          <CopyButton code={code} />
        </div>
      )}
      <pre
        style={{ tabSize: 4 }}
        className={`code-scroll min-h-0 flex-1 ${wrap ? "overflow-y-auto overflow-x-hidden" : "overflow-auto"} p-0 font-mono text-[13px] leading-6 text-[#d4d4d4] ${compact ? "max-h-none" : ""}`}
      >
        <code>
          {highlightedLines.map((item, index) => {
            const safeIndent = Math.min(item.indentCount, 40);
            return (
              <div key={index} className="grid grid-cols-[3rem_1fr]">
                <span className="select-none border-r border-ink-800 pr-3 text-right text-ink-500">{index + 1}</span>
                <div
                  style={
                    wrap && safeIndent > 0
                      ? {
                          paddingLeft: `calc(1rem + ${safeIndent}ch)`,
                          textIndent: `-${safeIndent}ch`
                        }
                      : undefined
                  }
                  className={`px-4 ${wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"}`}
                >
                  {item.tokens.length
                    ? item.tokens.map((part, tokenIndex) => (
                        <span key={`${index}-${tokenIndex}`} className={part.className}>
                          {part.token}
                        </span>
                      ))
                    : " "}
                </div>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
