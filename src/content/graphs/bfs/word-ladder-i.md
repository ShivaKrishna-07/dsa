---
title: "Word Ladder I"
difficulty: "Hard"
time: "O(N * L * 26)"
space: "O(N * L)"
platforms:
  leetcode: "https://leetcode.com/problems/word-ladder/"
  youtube: "https://www.youtube.com/results?search_query=Word+Ladder+I"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/word-ladder"
---

### Problem Statement

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
- Every adjacent pair of words differs by a single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

**Example 1:**
```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.
```

**Example 2:**
```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

---

### Intuition

Model this as an unweighted shortest path graph problem where each word is a vertex, and an edge connects words differing by 1 character. Using BFS, at each step change each character of the current word from `'a'` to `'z'`. If the new word exists in the dictionary, push it to the queue with level + 1 and erase it from the dictionary so it won't be revisited.

---

### Code

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        // Hash set for O(1) dictionary word lookups and removal
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;

        // Queue stores {current word, transformation step count}
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        dict.erase(beginWord);

        while (!q.empty()) {
            auto [word, steps] = q.front();
            q.pop();
            if (word == endWord) return steps;

            for (int i = 0; i < word.size(); i++) {
                char orig = word[i];
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    word[i] = ch;
                    if (dict.count(word)) {
                        // Erase word to avoid revisiting
                        dict.erase(word);
                        q.push({word, steps + 1});
                    }
                }
                word[i] = orig;
            }
        }
        return 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * L * 26)` — where `N` is size of `wordList` and `L` is word length.
- **Space Complexity:** `O(N * L)` — Set and BFS queue storage.
