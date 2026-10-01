import PageFade from "@/components/ui/PageFade";
import { getTopicStats, topics } from "@/lib/data";
import TopicListClient from "@/components/home/TopicListClient";

export default function HomePage() {
  const topicsSummary = topics.map((topic) => {
    const stats = getTopicStats(topic);
    return {
      slug: topic.slug,
      title: topic.title,
      icon: topic.icon,
      patternCount: stats.patternCount,
      problemCount: stats.problemCount,
    };
  });

  return (
    <PageFade>
      <section className="mx-auto max-w-6xl px-5 py-4 sm:py-6">
        <TopicListClient topics={topicsSummary} />
      </section>
    </PageFade>
  );
}
