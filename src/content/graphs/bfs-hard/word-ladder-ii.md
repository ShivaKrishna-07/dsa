---
title: "Word Ladder II"
difficulty: "Hard"
time: "O(N * L * 26 + Paths)"
space: "O(N * L)"
platforms:
  leetcode: "https://leetcode.com/problems/word-ladder-ii/"
  youtube: "https://www.youtube.com/watch?v=DREutrv2gz0"
  article: "https://takeuforward.org/graph/word-ladder-ii-optimised-approach-dfs-bfs/"
---

### Problem Statement

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return all the shortest transformation sequences from `beginWord` to `endWord`, or an empty list if no such sequence exists. Each sequence should be returned as a list of words `[beginWord, s1, s2, ..., sk]`.

**Example 1:**
```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest knowledge sequences of length 5.
```

**Example 2:**
```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList.
```

---

### Intuition

To avoid Time Limit Exceeded (TLE) when storing full path lists in BFS queues, use a two-step approach:
1. **BFS:** Record the minimum level (distance) of each word from `beginWord`.
2. **DFS (Backtracking):** Backtrack from `endWord` back to `beginWord` using the recorded levels, only moving to neighbors whose level is `currLevel - 1`.

---

### Code

```cpp
class Solution {
    // Stores minimum step/distance from beginWord for each reached word
    unordered_map<string, int> stepMap;
    vector<vector<string>> ans;
    string start;

    void dfs(string word, vector<string>& path) {
        if (word == start) {
            vector<string> rev = path;
            reverse(rev.begin(), rev.end());
            ans.push_back(rev);
            return;
        }

        int currStep = stepMap[word];
        for (int i = 0; i < word.size(); i++) {
            char orig = word[i];
            for (char ch = 'a'; ch <= 'z'; ch++) {
                word[i] = ch;
                // Only backtrack to predecessor whose step is exactly currStep - 1
                if (stepMap.count(word) && stepMap[word] + 1 == currStep) {
                    path.push_back(word);
                    dfs(word, path);
                    path.pop_back();
                }
            }
            word[i] = orig;
        }
    }

public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        // Hash set for fast dictionary lookups
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return {};

        start = beginWord;
        // Queue stores word to explore level by level
        queue<string> q;
        q.push(beginWord);
        stepMap[beginWord] = 0;
        dict.erase(beginWord);

        while (!q.empty()) {
            string word = q.front();
            q.pop();
            int step = stepMap[word];
            if (word == endWord) break;

            for (int i = 0; i < word.size(); i++) {
                char orig = word[i];
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    word[i] = ch;
                    if (dict.count(word)) {
                        dict.erase(word);
                        q.push(word);
                        stepMap[word] = step + 1;
                    }
                }
                word[i] = orig;
            }
        }

        if (stepMap.count(endWord)) {
            vector<string> path = {endWord};
            dfs(endWord, path);
        }
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * L * 26 + Paths)` — BFS records distances, then DFS reconstructs all shortest paths.
- **Space Complexity:** `O(N * L)` — Hash maps and recursion depth.
