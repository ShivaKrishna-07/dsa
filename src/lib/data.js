import arrays from "@/data/arrays.json";
import binarySearch from "@/data/binary-search.json";
import recursion from "@/data/recursion.json";
import slidingWindow from "@/data/sliding-window.json";
import strings from "@/data/strings.json";

const plannedTopics = [
  { slug: "linked-list", title: "Linked List", icon: "ListTree", patterns: [] },
  { slug: "trees", title: "Trees", icon: "Network", patterns: [] },
  { slug: "bst", title: "BST", icon: "GitFork", patterns: [] },
  { slug: "heap", title: "Heap", icon: "Layers3", patterns: [] },
  { slug: "graph", title: "Graph", icon: "Route", patterns: [] },
  { slug: "dp", title: "DP", icon: "Table2", patterns: [] },
  { slug: "greedy", title: "Greedy", icon: "Zap", patterns: [] },
  { slug: "bit-manipulation", title: "Bit Manipulation", icon: "Binary", patterns: [] },
  { slug: "trie", title: "Trie", icon: "TreePine", patterns: [] }
];

export const topics = [arrays, strings, binarySearch, slidingWindow, recursion, ...plannedTopics];

export function getTopic(slug) {
  return topics.find((topic) => topic.slug === slug);
}

export function getPattern(topicSlug, patternSlug) {
  return getTopic(topicSlug)?.patterns.find((pattern) => pattern.slug === patternSlug);
}

export function getProblem(topicSlug, patternSlug, problemSlug) {
  return getPattern(topicSlug, patternSlug)?.problems.find((problem) => problem.slug === problemSlug);
}

export function getTopicStats(topic) {
  const patternCount = topic.patterns.length;
  const problemCount = topic.patterns.reduce((total, pattern) => total + pattern.problems.length, 0);
  return { patternCount, problemCount };
}

export function getSearchItems() {
  return topics.flatMap((topic) => {
    const topicItem = {
      type: "Topic",
      title: topic.title,
      description: topic.description,
      href: `/${topic.slug}`
    };

    const patternItems = topic.patterns.map((pattern) => ({
      type: "Pattern",
      title: pattern.title,
      description: `${topic.title} / ${pattern.description}`,
      href: `/${topic.slug}/${pattern.slug}`
    }));

    const problemItems = topic.patterns.flatMap((pattern) =>
      pattern.problems.map((problem) => ({
        type: "Problem",
        title: problem.title,
        description: `${topic.title} / ${pattern.title} / ${problem.difficulty}`,
        href: `/${topic.slug}/${pattern.slug}/${problem.slug}`
      }))
    );

    return [topicItem, ...patternItems, ...problemItems];
  });
}
