import Link from "next/link";
import { ArrowRight, BookOpen, Flame } from "lucide-react";
import { SiGeeksforgeeks, SiLeetcode, SiYoutube } from "react-icons/si";
import { difficultyClass, platformLabel } from "@/lib/format";

const platformIcons = {
  leetcode: SiLeetcode,
  gfg: SiGeeksforgeeks,
  youtube: SiYoutube,
  article: BookOpen
};

const platformStyles = {
  leetcode: "text-[#ffa116] hover:border-amber-500/50 hover:bg-amber-500/10",
  gfg: "text-[#22c55e] hover:border-emerald-500/50 hover:bg-emerald-500/10",
  youtube: "text-[#ef4444] hover:border-red-500/50 hover:bg-red-500/10",
  article: "text-accent-400 hover:border-accent-500/50 hover:bg-accent-500/10"
};

export default function ProblemCard({ topicSlug, patternSlug, problem, index }) {
  const hasLeetcode = Boolean(problem.platforms?.leetcode && typeof problem.platforms.leetcode === "string" && problem.platforms.leetcode.trim());
  const visiblePlatforms = Object.entries(problem.platforms || {}).filter(([key, url]) => {
    if (!url || typeof url !== "string" || !url.trim()) return false;
    if (key === "gfg" && hasLeetcode) return false;
    return true;
  });

  return (
    <Link
      href={`/${topicSlug}/${patternSlug}/${problem.slug}`}
      className="group block px-4 py-3.5 sm:px-6 transition-all hover:bg-ink-800/40"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Problem index & Title */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-ink-800/80 bg-ink-900/60 font-mono text-xs font-semibold text-accent-300 shadow-sm transition-all group-hover:border-accent-500/40 group-hover:bg-accent-500/10 group-hover:text-accent-300">
            {index + 1}
          </span>
          <h3 className="font-medium text-ink-100 text-sm sm:text-base truncate group-hover:text-accent-300 transition-colors">
            {problem.title}
          </h3>
        </div>
        
        {/* Right: Difficulty, Label, Platforms, Arrow */}
        <div className="flex items-center gap-2 sm:gap-3 pl-10.5 sm:pl-0 shrink-0">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${difficultyClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>

          {problem.label && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-500/40 bg-red-950/40 px-2.5 py-0.5 text-xs font-bold text-red-400">
              <Flame className="h-3 w-3 fill-red-500 text-red-500" />
              {problem.label}
            </span>
          )}

          {visiblePlatforms.length > 0 && (
            <div className="flex items-center gap-1.5 pl-1 border-l border-ink-800/70">
              {visiblePlatforms.map(([key, url]) => (
                <PlatformIconLink key={key} platform={key} url={url} />
              ))}
            </div>
          )}

          <div className="hidden sm:flex items-center justify-end pl-1">
            <ArrowRight className="h-4 w-4 shrink-0 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-accent-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function PlatformIconLink({ platform, url }) {
  const Icon = platformIcons[platform] || BookOpen;
  const style = platformStyles[platform] || "text-ink-300 hover:border-ink-700 hover:bg-ink-800";

  function open(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <span
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") open(event);
      }}
      className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ink-800/80 bg-ink-900/60 transition-all hover:scale-105 shadow-sm ${style}`}
      title={`${platformLabel(platform)}`}
    >
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}
