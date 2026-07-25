import { notFound } from "next/navigation";
import PageFade from "@/components/ui/PageFade";
import PatternWorkspace from "@/components/workspace/PatternWorkspace";
import { getPattern, getTopic, topics } from "@/lib/data";

export function generateStaticParams() {
  return topics.flatMap((topic) =>
    topic.patterns.map((pattern) => ({ topicSlug: topic.slug, patternSlug: pattern.slug }))
  );
}

export function generateMetadata({ params }) {
  const pattern = getPattern(params.topicSlug, params.patternSlug);
  return { title: pattern ? `${pattern.title} | DSA Pattern Sheet` : "Pattern" };
}

export default function PatternPage({ params }) {
  const topic = getTopic(params.topicSlug);
  const pattern = getPattern(params.topicSlug, params.patternSlug);
  if (!topic || !pattern) notFound();

  return (
    <PageFade className="mx-auto max-w-6xl px-5 py-6">
      <PatternWorkspace topic={topic} pattern={pattern} />
    </PageFade>
  );
}
