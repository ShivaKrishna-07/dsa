import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageFade from "@/components/ui/PageFade";
import TopicWorkspace from "@/components/workspace/TopicWorkspace";
import { getTopic, topics } from "@/lib/data";
import { rootMenu, topicMenu } from "@/lib/navigation";

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
    <PageFade className="mx-auto max-w-7xl px-5 py-6">
      <Breadcrumb items={[{ label: topic.title, rootMenu: rootMenu(), menu: topicMenu(topic) }]} />
      <div className="mt-6 mb-3">
        <h1 className="text-2xl font-semibold sm:text-3xl">Patterns</h1>
      </div>
      <TopicWorkspace topic={topic} />
    </PageFade>
  );
}
