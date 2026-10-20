---
title: "Alien Dictionary"
difficulty: "Hard"
time: "O(N * L + K)"
space: "O(K)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/alien-dictionary/1"
  youtube: "https://www.youtube.com/watch?v=U3N_je7tWAs"
  article: "https://takeuforward.org/data-structure/alien-dictionary-topological-sort/"
---

### Problem Statement

Given a sorted dictionary of an alien language having `N` words and `k` starting alphabets of the standard dictionary. Find the order of characters in the alien language. If no valid ordering exists, return `""`.

**Example 1:**
```text
Input: N = 5, K = 4, dict = ["baa","abcd","abca","cab","cad"]
Output: "bdac"
Explanation: By comparing adjacent words, we deduce 'b' < 'd', 'd' < 'a', and 'a' < 'c'.
```

**Example 2:**
```text
Input: N = 3, K = 3, dict = ["caa","aaa","aab"]
Output: "cab"
```

---

### Intuition

Compare consecutive words in the dictionary. The first differing character between word `i` and word `i+1` gives a directed edge: `word[i][j] -> word[i+1][j]`. Once the graph of `K` characters is constructed, finding a valid ordering is equivalent to finding a topological sort of the directed graph.

---

### Code

```cpp
class Solution {
public:
    string findOrder(string dict[], int n, int k) {
        vector<vector<int>> adj(k);
        // Stores in-degree (preceding characters count) for each letter
        vector<int> indegree(k, 0);

        for (int i = 0; i < n - 1; i++) {
            string s1 = dict[i], s2 = dict[i + 1];
            int len = min(s1.size(), s2.size());
            bool diff = false;
            for (int j = 0; j < len; j++) {
                if (s1[j] != s2[j]) {
                    adj[s1[j] - 'a'].push_back(s2[j] - 'a');
                    indegree[s2[j] - 'a']++;
                    diff = true;
                    break;
                }
            }
            if (!diff && s1.size() > s2.size()) return "";
        }

        // Queue stores characters with in-degree 0
        queue<int> q;
        for (int i = 0; i < k; i++)
            if (indegree[i] == 0) q.push(i);

        string ans = "";
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            ans += (char)(u + 'a');
            for (int v : adj[u]) {
                if (--indegree[v] == 0) q.push(v);
            }
        }

        return ans.size() == k ? ans : "";
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * L + K)` — `N` comparisons of words of length `L`, plus topological sort over `K` characters.
- **Space Complexity:** `O(K)` — Graph and queue for `K` characters.
