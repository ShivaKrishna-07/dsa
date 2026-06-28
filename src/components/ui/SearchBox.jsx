"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FileCode2, Folder, GitBranch, Search } from "lucide-react";
import { getSearchItems } from "@/lib/data";

const typeIcons = {
  Topic: Folder,
  Pattern: GitBranch,
  Problem: FileCode2
};

export default function SearchBox({ variant = "header" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const items = getSearchItems();
  const trimmed = query.trim().toLowerCase();

  const groupedResults = useMemo(() => {
    if (!trimmed) return {};
    return items
      .filter((item) => `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(trimmed))
      .slice(0, 12)
      .reduce((groups, item) => {
        groups[item.type] = [...(groups[item.type] || []), item];
        return groups;
      }, {});
  }, [items, trimmed]);

  const resultTypes = ["Problem", "Pattern", "Topic"].filter((type) => groupedResults[type]?.length);
  const isHero = variant === "hero";

  function submit(event) {
    event.preventDefault();
    const firstType = resultTypes[0];
    const first = firstType ? groupedResults[firstType][0] : null;
    if (first) router.push(first.href);
  }

  return (
    <div className={isHero ? "relative w-full max-w-2xl" : "relative w-full max-w-xl"}>
      <form onSubmit={submit}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        <input
          aria-label="Search topics, patterns, and problems"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topic, pattern, problem"
          className={`w-full rounded-md border border-ink-700 bg-ink-900/90 py-2.5 pl-10 pr-3 text-sm text-ink-100 outline-none transition placeholder:text-ink-500 focus:border-accent-400 ${
            isHero ? "h-12 text-base" : "h-10"
          }`}
        />
      </form>

      {resultTypes.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-auto rounded-md border border-ink-700 bg-ink-900 shadow-soft">
          {resultTypes.map((type) => {
            const Icon = typeIcons[type];
            return (
              <section key={type} className="border-b border-ink-800 last:border-b-0">
                <div className="flex items-center gap-2 bg-ink-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <Icon className="h-3.5 w-3.5" />
                  {type}
                </div>
                {groupedResults[type].map((item) => (
                  <Link
                    key={`${item.type}-${item.href}`}
                    href={item.href}
                    onClick={() => setQuery("")}
                    className="block px-4 py-3 hover:bg-ink-850"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-ink-100">{item.title}</span>
                      <span className="shrink-0 rounded border border-ink-700 px-2 py-0.5 text-xs text-ink-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-ink-500">{item.description}</p>
                  </Link>
                ))}
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
