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
    <PageFade className="mx-auto max-w-6xl px-5 pb-4 pt-1">
      <TopicWorkspace topic={topic} />
    </PageFade>
  );
}
