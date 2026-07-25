const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content');

// Helper to slugify
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const structure = {
  'arrays': {
    title: 'Arrays',
    icon: 'Library',
    patterns: {
      'two-pointers': {
        title: 'Two Pointers',
        description: 'Move multiple indices together to replace nested loops with linear scans.',
        problems: [
          'Remove duplicates in sorted arr',
          'Move zeroes to end',
          'Rearrange by sign',
          'Sort 1, 2, 3 (DNF)',
          'Majority element I, II (Moore voting algo)'
        ]
      },
      'prefix-sum': {
        title: 'Prefix Sum',
        description: 'Store cumulative values to answer range and subarray questions quickly.',
        problems: [
          'Longest subarr sum',
          'Cnt subarr with xor k',
          'Longest consecutive sequence',
          'Find missing & repeating number'
        ]
      },
      'kadanes': {
        title: "Kadane's",
        description: 'Carry the best subarray ending at the current index.',
        problems: [
          'Max subarr sum',
          'Max sum circular subarr',
          'Max absolute sum of any subarr',
          'Largest sum contiguous subarr'
        ]
      },
      'matrix': {
        title: 'Matrix',
        description: 'Grid based traversals and manipulations.',
        problems: [
          'Pascal triangle',
          'Spiral matrix'
        ]
      },
      'observation': {
        title: 'Observation Based',
        description: 'Math or logical tricks for specific array manipulation.',
        problems: [
          'Left rotate by k',
          'Max conse ones',
          'Stock buy & sell'
        ]
      }
    }
  },
  'binary-search': {
    title: 'Binary Search',
    icon: 'Search',
    patterns: {
      'boundaries': {
        title: 'Boundaries',
        description: 'Finding lower or upper bounds in sorted space.',
        problems: [
          'Lower / Upper bound',
          'Floor / Ceil',
          'First & last occurence'
        ]
      },
      'peak-elements': {
        title: 'Peak Elements',
        description: 'Finding peaks and valleys.',
        problems: [
          'Find Peak ele I, II'
        ]
      },
      'bs-on-partitions': {
        title: 'BS on Partitions',
        description: 'Binary searching partitions across multiple arrays.',
        problems: [
          'Median of 2 sorted arr',
          'Kth elem of 2 sorted arr'
        ]
      },
      'rotated-sorted-arr': {
        title: 'Rotated Sorted Array',
        description: 'Searching in arrays that have been shifted.',
        problems: [
          'Search in RSA',
          'Find min/max in RSA',
          'How many times arr rotated'
        ]
      },
      'bs-on-answers-min-max': {
        title: 'BS on Answers (min/max)',
        description: 'Binary searching the answer space for direct values.',
        problems: [
          'Koko eating banans',
          'Min days to make M boquets',
          'Smallest divisor',
          'Capacity to ship in d days'
        ]
      },
      'bs-on-answers-min-max-max-min': {
        title: 'BS on Answers (min(max) or max(min))',
        description: 'Binary searching the answer space for optimized boundaries.',
        problems: [
          'Aggresive cows',
          'Book Allocation',
          'Minimize max distance of gas station'
        ]
      },
      'matrix-bs': {
        title: 'Matrix BS',
        description: 'Binary searching within 2D space.',
        problems: [
          'Search in 2D arr I, II',
          'Matrix median',
          'Kth smallest element in 2D matrix'
        ]
      },
      'bs-on-answers-misc': {
        title: 'BS on Answers (Misc)',
        description: 'Miscellaneous binary search on answers.',
        problems: [
          'Sqrt of N',
          'Nth root of M',
          'Kth missing +ve no'
        ]
      }
    }
  },
  'strings': {
    title: 'Strings',
    icon: 'Type',
    patterns: {
      'basics': {
        title: 'Basics & Manipulations',
        description: 'Basic string manipulation techniques.',
        problems: [
          'Isomorphic str',
          'Roman to int',
          'String to int (stoi)',
          'Longest palindromic str',
          'Reverse every word in string'
        ]
      }
    }
  },
  'linked-list': {
    title: 'Linked List',
    icon: 'ListTree',
    patterns: {
      'fast-and-slow': {
        title: 'Fast & Slow Pointers',
        description: 'Hare and tortoise algorithms.',
        problems: [
          'Detect loop',
          'Len of loop',
          'Remove nth node from back',
          'Start point of loop'
        ]
      },
      'reverse': {
        title: 'Reverse',
        description: 'Reversing lists and sublists.',
        problems: [
          'Reverse LL',
          'Reverse DLL',
          'Reverse k groups',
          'Add 1 to number',
          'Add 2 Numbers'
        ]
      },
      'dummy-nodes': {
        title: 'Dummy Nodes',
        description: 'Using sentinel nodes to simplify edge cases.',
        problems: [
          'Segregate odd even',
          'Sort 0, 1, 2',
          'Flattening LL',
          'Merge 2 LL',
          'Partition list',
          'Reorder LL'
        ]
      },
      'special': {
        title: 'Special',
        description: 'Unique linked list problems.',
        problems: [
          'Intersectn of Y LL',
          'Clone LL'
        ]
      },
      'k-way-merge': {
        title: 'K-way Merge',
        description: 'Merging multiple lists.',
        problems: [
          'Merge k sorted lists'
        ]
      }
    }
  },
  'sliding-window': {
    title: 'Sliding Window',
    icon: 'RectangleHorizontal',
    patterns: {
      'fixed-window': {
        title: 'Fixed Window',
        description: 'Window size remains constant.',
        problems: [
          'Find all anagrams in str',
          'Max points u can obtain from cards',
          'Max no. of occurences of substr',
          'Substring with concatnatn of all words',
          'First -ve in every window'
        ]
      },
      'variable-longest': {
        title: 'Variable Window (Longest/Largest)',
        description: 'Window size expands to find the maximum valid subarray.',
        problems: [
          'Longest substr without repeating chars',
          'Longest Repeating char replacement',
          'Max erase value'
        ]
      },
      'variable-shortest': {
        title: 'Variable Window (Shortest/Minimum)',
        description: 'Window size shrinks to find the minimum valid subarray.',
        problems: [
          'Minimum consecutive cards to pick up',
          'Min window substring',
          'Min window subsequence',
          'Subarr with k diff integers'
        ]
      },
      'counting': {
        title: 'Counting Sliding Window',
        description: 'Using math or specific counting techniques on sliding window.',
        problems: [
          'No. of substr containing all 3 char'
        ]
      },
      'queue-special': {
        title: 'Queue / Special window',
        description: 'Using monotonic queues or specific data structures.',
        problems: [
          'Sliding window max',
          'Longest continous subarr with abs diff <= limit',
          'Max no. of robots within budget'
        ]
      }
    }
  }
};

const defaultTemplate = `function solve() {
  // Add template here
}`;

const topicsList = [];

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

for (const [topicSlug, topicData] of Object.entries(structure)) {
  topicsList.push({
    slug: topicSlug,
    title: topicData.title,
    icon: topicData.icon
  });

  const topicDir = path.join(contentDir, topicSlug);
  if (!fs.existsSync(topicDir)) fs.mkdirSync(topicDir, { recursive: true });

  const patternsList = [];

  for (const [patternSlug, patternData] of Object.entries(topicData.patterns)) {
    patternsList.push({
      slug: patternSlug,
      title: patternData.title,
      description: patternData.description,
      identify: ['Add identification tips here'],
      appearsIn: ['Add places it appears here'],
      template: defaultTemplate,
      explanation: 'Add explanation here'
    });

    const patternDir = path.join(topicDir, patternSlug);
    if (!fs.existsSync(patternDir)) fs.mkdirSync(patternDir, { recursive: true });

    for (const problemTitle of patternData.problems) {
      const problemSlug = slugify(problemTitle);
      const filePath = path.join(patternDir, `${problemSlug}.md`);

      const mdContent = `---
title: "${problemTitle}"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: ""
  youtube: ""
tags:
  - "${topicData.title}"
  - "${patternData.title}"
---

### Problem Statement

Add the problem statement here.

### Examples

**Example 1:**
\`\`\`text
Input: 
Output: 
Explanation: 
\`\`\`

**Example 2:**
\`\`\`text
Input: 
Output: 
Explanation: 
\`\`\`

---

### Code

\`\`\`javascript
// Your code solution here
\`\`\`
`;
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, mdContent);
      }
    }
  }

  // Write patterns.json
  fs.writeFileSync(path.join(topicDir, 'patterns.json'), JSON.stringify(patternsList, null, 2));
}

// Write topics.json
fs.writeFileSync(path.join(contentDir, 'topics.json'), JSON.stringify(topicsList, null, 2));

console.log('Scaffolding complete!');
