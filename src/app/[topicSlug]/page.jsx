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
    <PageFade className="mx-auto max-w-6xl px-5 py-6">
      <div className="mt-6 mb-3">
        <h1 className="text-2xl font-semibold sm:text-3xl">Patterns</h1>
      </div>
      <TopicWorkspace topic={topic} />
    </PageFade>
  );
}
