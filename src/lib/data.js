import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content');

export function getAllData() {
  if (!fs.existsSync(contentDir)) return [];

  const topicsJsonPath = path.join(contentDir, 'topics.json');
  if (!fs.existsSync(topicsJsonPath)) return [];
  const topicsList = JSON.parse(fs.readFileSync(topicsJsonPath, 'utf8'));

  return topicsList.map(topicMeta => {
    const topicDir = path.join(contentDir, topicMeta.slug);
    const patternsJsonPath = path.join(topicDir, 'patterns.json');
    
    let patterns = [];
    if (fs.existsSync(patternsJsonPath)) {
      patterns = JSON.parse(fs.readFileSync(patternsJsonPath, 'utf8'));
      
      patterns = patterns.map(patternMeta => {
        const patternDir = path.join(topicDir, patternMeta.slug);
        let problems = [];
        
        if (fs.existsSync(patternDir)) {
          const files = fs.readdirSync(patternDir).filter(f => f.endsWith('.md'));
          problems = files.map(file => {
            const filePath = path.join(patternDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);
            
            // Prefer the solution block after "### Code"; examples often contain earlier text fences.
            const codeSection = content.split('### Code')[1] || '';
            const codes = [];
            const regex = /```(?:cpp|c\+\+|javascript|js|text)?\n([\s\S]*?)```/g;
            let match;
            while ((match = regex.exec(codeSection)) !== null) {
              const codeText = match[1].trim();
              let name = "Optimal"; // Default
              if (codeText.toLowerCase().includes("brute")) {
                name = "Brute Force";
              } else if (codeText.toLowerCase().includes("better")) {
                name = "Better";
              } else if (codeText.toLowerCase().includes("optimal")) {
                name = "Optimal";
              } else if (codes.length === 0) {
                name = "Solution";
              } else {
                name = `Solution ${codes.length + 1}`;
              }
              codes.push({ name, code: codeText });
            }
            
            const code = codes.length > 0 ? codes[0].code : '';
            // For the Problem Statement, we can just strip the ### Code section completely
            const psMatch = content.split('### Code')[0];
            
            return {
              slug: file.replace(/\.md$/, ''),
              title: data.title || file,
              difficulty: data.difficulty || 'Medium',
              label: data.label || null,
              complexity: {
                time: data.time || 'O(1)',
                space: data.space || 'O(1)'
              },
              platforms: data.platforms || {},
              tags: data.tags || [],
              code: code,
              codes: codes,
              problemStatement: psMatch.replace('### Problem Statement', '').trim()
            };
          });
        }
        
        if (patternMeta.slug === 'two-pointers') {
          problems.reverse();
        }
        
        if (patternMeta.problemsOrder) {
          problems.sort((a, b) => {
            const indexA = patternMeta.problemsOrder.indexOf(a.slug);
            const indexB = patternMeta.problemsOrder.indexOf(b.slug);
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });
        }
        
        return {
          ...patternMeta,
          problems
        };
      });
    }

    return {
      ...topicMeta,
      patterns
    };
  });
}

const cachedTopics = getAllData();

export const topics = process.env.NODE_ENV === 'development'
  ? new Proxy([], {
      get(target, prop) {
        const latest = getAllData();
        const value = latest[prop];
        if (typeof value === 'function') {
          return value.bind(latest);
        }
        return value;
      },
      getOwnPropertyDescriptor(target, prop) {
        return Reflect.getOwnPropertyDescriptor(getAllData(), prop);
      },
      ownKeys(target) {
        return Reflect.ownKeys(getAllData());
      }
    })
  : cachedTopics;

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
      description: topic.description || '',
      href: `/${topic.slug}`
    };

    const patternItems = topic.patterns.map((pattern) => ({
      type: "Pattern",
      title: pattern.title,
      description: `${topic.title} / ${pattern.description || ''}`,
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
