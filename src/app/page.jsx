import Link from "next/link";
import PageFade from "@/components/ui/PageFade";
import SearchBox from "@/components/ui/SearchBox";
import { TopicIcon } from "@/components/ui/icons";
import MotionCard from "@/components/ui/MotionCard";
import { getTopicStats, topics } from "@/lib/data";
import { pluralize } from "@/lib/format";

export default function HomePage() {
  return (
    <PageFade>
      <section className="mx-auto max-w-6xl px-5 py-4 sm:py-6">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold sm:text-3xl">Topics</h1>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const stats = getTopicStats(topic);
            const isReady = stats.patternCount > 0;

            return (
              <MotionCard key={topic.slug}>
                <Link
                  href={`/${topic.slug}`}
                  className={`block h-full rounded-md border p-5 transition ${
                    isReady
                      ? "border-ink-800 bg-ink-900/60 hover:border-accent-400"
                      : "border-ink-800/70 bg-ink-900/30 text-ink-500"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-700/60 bg-ink-900/50 text-accent-300 shadow-sm">
                        <TopicIcon name={topic.icon} className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold text-ink-100">{topic.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-ink-400">
                      <span className="rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1">
                        {pluralize(stats.patternCount, "pattern")}
                      </span>
                      <span className="rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1">
                        {pluralize(stats.problemCount, "problem")}
                      </span>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            );
          })}
        </div>
      </section>
    </PageFade>
  );
}
