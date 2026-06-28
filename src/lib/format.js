export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function platformLabel(key) {
  const labels = {
    leetcode: "LeetCode",
    gfg: "GFG",
    codingNinjas: "Coding Ninjas",
    youtube: "YouTube",
    article: "Article"
  };

  return labels[key] || key;
}

export function difficultyClass(difficulty) {
  if (difficulty === "Easy") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (difficulty === "Medium") return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  return "border-rose-500/30 bg-rose-500/10 text-rose-300";
}
