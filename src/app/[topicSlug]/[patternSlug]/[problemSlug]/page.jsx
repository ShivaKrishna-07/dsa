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

  // Find previous and next problems for navigation
  const allProblems = [];
  topics.forEach((t) => {
    t.patterns.forEach((p) => {
      p.problems.forEach((prob) => {
        allProblems.push({
          topicSlug: t.slug,
          patternSlug: p.slug,
          problemSlug: prob.slug,
          href: `/${t.slug}/${p.slug}/${prob.slug}`,
          title: prob.title
        });
      });
    });
  });

  const currentIndex = allProblems.findIndex(
    (p) => p.topicSlug === params.topicSlug && p.patternSlug === params.patternSlug && p.problemSlug === params.problemSlug
  );

  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  return (
    <PageFade className="w-full px-2 sm:px-3 lg:px-4 py-2 flex-1 flex flex-col">
      <LeetCodeWorkspace
        problem={problem}
        prevProblem={prevProblem}
        nextProblem={nextProblem}
      />
    </PageFade>
  );
}
