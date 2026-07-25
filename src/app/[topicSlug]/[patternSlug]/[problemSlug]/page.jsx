import { notFound } from "next/navigation";
import PageFade from "@/components/ui/PageFade";
import ProblemWorkspace from "@/components/workspace/ProblemWorkspace";
import { getPattern, getProblem, getTopic, topics } from "@/lib/data";

export function generateStaticParams() {
  return topics.flatMap((topic) =>
    topic.patterns.flatMap((pattern) =>
      pattern.problems.map((problem) => ({
        topicSlug: topic.slug,
        patternSlug: pattern.slug,
        problemSlug: problem.slug
      }))
    )
  );
}

export function generateMetadata({ params }) {
  const problem = getProblem(params.topicSlug, params.patternSlug, params.problemSlug);
  return { title: problem ? `${problem.title} | DSA Pattern Sheet` : "Problem" };
}

export default function ProblemPage({ params }) {
  const topic = getTopic(params.topicSlug);
  const pattern = getPattern(params.topicSlug, params.patternSlug);
  const problem = getProblem(params.topicSlug, params.patternSlug, params.problemSlug);
  if (!topic || !pattern || !problem) notFound();

  return (
    <PageFade className="mx-auto max-w-7xl px-5 pt-0 pb-4">
      <ProblemWorkspace problem={problem} />
    </PageFade>
  );
}
