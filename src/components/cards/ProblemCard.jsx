import Link from "next/link";
import { ArrowRight, ExternalLink, Flame } from "lucide-react";
import { SiGeeksforgeeks, SiLeetcode, SiYoutube } from "react-icons/si";
import MotionCard from "@/components/ui/MotionCard";
import { difficultyClass, platformLabel } from "@/lib/format";

const platformIcons = {
  leetcode: SiLeetcode,
  gfg: SiGeeksforgeeks,
  youtube: SiYoutube
};

const platformIconClass = {
  leetcode: "text-[#ffa116]",
  gfg: "text-[#2f8d46]",
  youtube: "text-[#ff0000]"
};

export default function ProblemCard({ topicSlug, patternSlug, problem, index }) {
  const visiblePlatforms = Object.entries(problem.platforms || {}).filter(([key, url]) => {
    return url && typeof url === "string" && url.trim();
  });

  return (
    <MotionCard>
      <Link
        href={`/${topicSlug}/${patternSlug}/${problem.slug}`}
        className="group block rounded-md border border-ink-800 bg-ink-950/40 px-4 py-3 transition hover:border-accent-400 hover:bg-ink-900/40"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ink-700/60 bg-ink-900/50 text-xs font-semibold text-accent-300 shadow-sm transition-all group-hover:border-accent-500/30 group-hover:bg-accent-500/10 group-hover:text-accent-400">
              {index + 1}
            </span>
            <h3 className="font-medium text-ink-100 truncate">{problem.title}</h3>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 pl-12 sm:pl-0 shrink-0">
            <span className={`w-[68px] shrink-0 text-center rounded border px-2 py-0.5 text-xs font-medium ${difficultyClass(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            {problem.label && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded border border-red-500/40 bg-red-950/40 px-2 py-0.5 text-xs font-bold text-red-400 animate-pulse">
                <Flame className="h-3 w-3 fill-red-500 text-red-500" />
                {problem.label}
              </span>
            )}
            {visiblePlatforms.map(([key, url]) => (
              <PlatformLink key={key} platform={key} url={url} />
            ))}
            <div className="hidden sm:flex items-center justify-end pl-2">
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-hover:translate-x-1 group-hover:text-accent-300" />
            </div>
          </div>
        </div>
      </Link>
    </MotionCard>
  );
}

function PlatformLink({ platform, url }) {
  const Icon = platformIcons[platform];

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
      className="w-[96px] shrink-0 justify-center inline-flex cursor-pointer items-center gap-1.5 rounded border border-ink-700 px-2 py-0.5 text-xs text-ink-300 transition hover:border-accent-400 hover:text-ink-100"
    >
      {Icon ? <Icon className={`h-3.5 w-3.5 shrink-0 ${platformIconClass[platform] || ""}`} /> : null}
      <span className="truncate">{platformLabel(platform)}</span>
      <ExternalLink className="h-3 w-3 shrink-0" />
    </span>
  );
}
