import Link from "next/link";
import PageFade from "@/components/ui/PageFade";
import { TopicIcon } from "@/components/ui/icons";
import { getTopicStats, topics } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <PageFade>
      <section className="mx-auto max-w-5xl px-5 py-4 sm:py-6">
        <div className="mb-6 max-w-3xl">
          <h1 className="text-2xl font-semibold sm:text-3xl text-ink-100">Topics</h1>
        </div>

        <div className="overflow-hidden rounded-lg border border-ink-800 bg-ink-950/40 shadow-sm w-full">
          {/* Header */}
          <div className="grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] gap-4 border-b border-ink-800/60 bg-ink-900/60 px-6 py-4 text-xs uppercase text-ink-400 font-medium">
            <div>Topic</div>
            <div>Patterns</div>
            <div>Problems</div>
            <div className="text-right">Action</div>
          </div>
          
          {/* Body */}
          <div className="divide-y divide-ink-800/60 text-sm text-ink-300">
            {topics.map((topic) => {
              const stats = getTopicStats(topic);
              const isReady = stats.patternCount > 0;

              return (
                <Link 
                  key={topic.slug}
                  href={isReady ? `/${topic.slug}` : "#"}
                  className={`grid grid-cols-[minmax(200px,1fr)_120px_120px_100px] items-center gap-4 px-6 py-4 transition-colors ${
                    isReady ? "hover:bg-ink-900/40 group cursor-pointer" : "opacity-60 bg-ink-950/20 cursor-default pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-700/60 bg-ink-900/50 text-accent-300 shadow-sm transition-all group-hover:border-accent-500/30 group-hover:bg-accent-500/10 group-hover:text-accent-400">
                      <TopicIcon name={topic.icon} className="h-5 w-5" />
                    </span>
                    <div className="font-medium text-ink-100 text-base">
                      {topic.title}
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1 text-xs font-medium">
                      {stats.patternCount}
                    </span>
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md border border-ink-800/60 bg-ink-900/40 px-2.5 py-1 text-xs font-medium">
                      {stats.problemCount}
                    </span>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    {isReady ? (
                      <span className="inline-flex items-center justify-center rounded-md text-ink-500 transition-colors group-hover:text-accent-400">
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-xs text-ink-600 uppercase font-semibold">Coming Soon</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageFade>
  );
}
