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

export default function CodeBlock({ code, title = "C++", compact = false }) {
  const [copied, setCopied] = useState(false);
  const highlightedLines = useMemo(() => code.split("\n").map(tokenizeLine), [code]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-ink-800 px-4">
        <span className="text-sm font-medium text-ink-300">{title}</span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-8 items-center gap-2 rounded-md border border-ink-700 px-2.5 text-xs text-ink-300 hover:border-accent-400 hover:text-ink-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={`code-scroll min-h-0 flex-1 overflow-auto p-0 font-mono text-[13px] leading-6 text-[#d4d4d4] ${compact ? "max-h-none" : ""}`}>
        <code>
          {highlightedLines.map((tokens, index) => (
            <span key={index} className="grid grid-cols-[3rem_1fr]">
              <span className="select-none border-r border-ink-800 pr-3 text-right text-ink-500">{index + 1}</span>
              <span className="px-4">
                {tokens.length
                  ? tokens.map((part, tokenIndex) => (
                      <span key={`${index}-${tokenIndex}`} className={part.className}>
                        {part.token}
                      </span>
                    ))
                  : " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
