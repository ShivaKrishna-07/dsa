import { notFound } from "next/navigation";
import PageFade from "@/components/ui/PageFade";
import LeetCodeWorkspace from "@/components/workspace/LeetCodeWorkspace";
// ProblemWorkspace is preserved and can be swapped back anytime:
// import ProblemWorkspace from "@/components/workspace/ProblemWorkspace";
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
    <PageFade className="w-full px-2 sm:px-3 lg:px-4 py-2 flex-1 flex flex-col">
      <LeetCodeWorkspace problem={problem} />
    </PageFade>
  );
}
