import { topics } from "@/lib/data";

export function rootMenu() {
  return {
    title: "Topics",
    items: topics.map((topic) => ({
      label: topic.title,
      href: `/${topic.slug}`,
      meta: `${topic.patterns.length} patterns`
    }))
  };
}

export function topicMenu(topic) {
  return {
    title: `${topic.title} patterns`,
    items: topic.patterns.map((pattern) => ({
      label: pattern.title,
      href: `/${topic.slug}/${pattern.slug}`,
      meta: `${pattern.problems.length} problems`
    }))
  };
}

export function patternMenu(topic, pattern) {
  return {
    title: `${pattern.title} problems`,
    items: pattern.problems.map((problem) => ({
      label: problem.title,
      href: `/${topic.slug}/${pattern.slug}/${problem.slug}`,
      meta: problem.difficulty
    }))
  };
}
