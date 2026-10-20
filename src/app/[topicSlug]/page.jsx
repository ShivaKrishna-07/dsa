import { notFound } from "next/navigation";
import PageFade from "@/components/ui/PageFade";
import TopicWorkspace from "@/components/workspace/TopicWorkspace";
import { getTopic, topics } from "@/lib/data";

export function generateStaticParams() {
  return topics.map((topic) => ({ topicSlug: topic.slug }));
}

export function generateMetadata({ params }) {
  const topic = getTopic(params.topicSlug);
  return { title: topic ? `${topic.title} | DSA Pattern Sheet` : "Topic" };
}

export default function TopicPage({ params }) {
  const topic = getTopic(params.topicSlug);
  if (!topic) notFound();

  return (
    <PageFade className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      <TopicWorkspace topic={topic} />
    </PageFade>
  );
}
