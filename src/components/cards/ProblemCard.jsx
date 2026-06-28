import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import MotionCard from "@/components/ui/MotionCard";
import { difficultyClass, platformLabel } from "@/lib/format";

export default function ProblemCard({ topicSlug, patternSlug, problem }) {
  return (
    <MotionCard>
      <Link
        href={`/${topicSlug}/${patternSlug}/${problem.slug}`}
        className="group block rounded-md border border-ink-800 bg-ink-950/40 p-4 transition hover:border-accent-400"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-ink-100">{problem.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`rounded border px-2 py-0.5 text-xs font-medium ${difficultyClass(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              {Object.keys(problem.platforms).slice(0, 4).map((key) => (
                <span key={key} className="inline-flex items-center gap-1 rounded border border-ink-700 px-2 py-0.5 text-xs text-ink-300">
                  {platformLabel(key)}
                  <ExternalLink className="h-3 w-3" />
                </span>
              ))}
            </div>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 text-ink-500 transition group-hover:translate-x-1 group-hover:text-accent-300" />
        </div>
      </Link>
    </MotionCard>
  );
}
