"use client";

import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";

function rootMenu(tree) {
  return {
    title: "Topics",
    items: tree.map((topic) => ({
      label: topic.title,
      href: `/${topic.slug}`,
      meta: `${topic.patterns.length} patterns`
    }))
  };
}

function topicMenu(topic) {
  return {
    title: `${topic.title} patterns`,
    items: topic.patterns.map((pattern) => ({
      label: pattern.title,
      href: `/${topic.slug}/${pattern.slug}`,
      meta: `${pattern.problems.length} problems`
    }))
  };
}

function patternMenu(topic, pattern) {
  return {
    title: `${pattern.title} problems`,
    items: pattern.problems.map((problem) => ({
      label: problem.title,
      href: `/${topic.slug}/${pattern.slug}/${problem.slug}`,
      meta: problem.difficulty
    }))
  };
}

export default function RouteBreadcrumb({ tree }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const [topicSlug, patternSlug, problemSlug] = segments;
  const topic = tree.find((item) => item.slug === topicSlug);
  if (!topic) return null;

  const pattern = topic.patterns.find((item) => item.slug === patternSlug);
  const problem = pattern?.problems.find((item) => item.slug === problemSlug);
  const menuForRoot = rootMenu(tree);

  const items = [
    {
      label: topic.title,
      href: pattern ? `/${topic.slug}` : undefined,
      rootMenu: menuForRoot,
      menu: topicMenu(topic)
    }
  ];

  if (pattern) {
    items.push({
      label: pattern.title,
      href: problem ? `/${topic.slug}/${pattern.slug}` : undefined,
      menu: patternMenu(topic, pattern)
    });
  }

  if (problem) {
    items.push({
      label: problem.title,
      menu: patternMenu(topic, pattern)
    });
  }

  // Calculate prev and next problem from flattened tree hierarchy
  const allProblems = [];
  tree.forEach((t) => {
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
    (p) => p.topicSlug === topicSlug && p.patternSlug === patternSlug && p.problemSlug === problemSlug
  );

  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-5 pt-3">
      <Breadcrumb
        items={items}
        prevProblem={prevProblem}
        nextProblem={nextProblem}
        showNav={!!problem}
      />
    </div>
  );
}
