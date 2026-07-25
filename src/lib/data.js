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
            const codeSection = content.split('### Code')[1] || content;
            const codeMatch =
              codeSection.match(/```(?:cpp|c\+\+|javascript|js)?\n([\s\S]*?)```/) ||
              content.match(/```(?:cpp|c\+\+)\n([\s\S]*?)```/);
            const code = codeMatch ? codeMatch[1].trim() : '';
            // For the Problem Statement, we can just strip the ### Code section completely
            const psMatch = content.split('### Code')[0];
            
            return {
              slug: file.replace(/\.md$/, ''),
              title: data.title || file,
              difficulty: data.difficulty || 'Medium',
              complexity: {
                time: data.time || 'O(1)',
                space: data.space || 'O(1)'
              },
              platforms: data.platforms || {},
              tags: data.tags || [],
              code: code,
              problemStatement: psMatch.replace('### Problem Statement', '').trim()
            };
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

export const topics = getAllData();

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
