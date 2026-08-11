import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
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

export default function ProblemCard({ topicSlug, patternSlug, problem }) {
  const visiblePlatforms = Object.entries(problem.platforms || {}).filter(([key, url]) => {
    return url && typeof url === "string" && url.trim();
  });

  return (
    <MotionCard>
      <Link
        href={`/${topicSlug}/${patternSlug}/${problem.slug}`}
        className="group block rounded-md border border-ink-800 bg-ink-950/40 px-4 py-3 transition hover:border-accent-400"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-ink-100">{problem.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`rounded border px-2 py-0.5 text-xs font-medium ${difficultyClass(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              {visiblePlatforms.map(([key, url]) => (
                <PlatformLink key={key} platform={key} url={url} />
              ))}
            </div>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 text-ink-500 transition group-hover:translate-x-1 group-hover:text-accent-300" />
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
      className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-ink-700 px-2 py-0.5 text-xs text-ink-300 transition hover:border-accent-400 hover:text-ink-100"
    >
      {Icon ? <Icon className={`h-3.5 w-3.5 ${platformIconClass[platform] || ""}`} /> : null}
      {platformLabel(platform)}
      <ExternalLink className="h-3 w-3" />
    </span>
  );
}
