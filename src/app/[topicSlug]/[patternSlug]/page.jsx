import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageFade from "@/components/ui/PageFade";
import PatternWorkspace from "@/components/workspace/PatternWorkspace";
import { getPattern, getTopic, topics } from "@/lib/data";
import { patternMenu, rootMenu, topicMenu } from "@/lib/navigation";

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
    <PageFade className="mx-auto max-w-7xl px-5 py-6">
      <Breadcrumb
        items={[
          { label: topic.title, href: `/${topic.slug}`, rootMenu: rootMenu(), menu: topicMenu(topic) },
          { label: pattern.title, menu: patternMenu(topic, pattern) }
        ]}
      />

      <PatternWorkspace topic={topic} pattern={pattern} />
    </PageFade>
  );
}
