---
title: "Bipartite Graph"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  leetcode: "https://leetcode.com/problems/is-graph-bipartite/"
  gfg: "https://practice.geeksforgeeks.org/problems/bipartite-graph/1"
  youtube: "https://www.youtube.com/watch?v=-vu34sct1g8"
  article: "https://takeuforward.org/graph/bipartite-graph-dfs-bfs/"
---

### Problem Statement

There is an undirected graph with `n` nodes. A graph is bipartite if the nodes can be partitioned into two independent sets `A` and `B` such that every edge in the graph connects a node in `A` and a node in `B`.

Return `true` if and only if it is bipartite.

**Example 1:**
```text
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets.
```

**Example 2:**
```text
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition into sets {0, 2} and {1, 3}.
```

---

### Intuition

A graph is bipartite if and only if it contains no odd-length cycles. We can 2-color the graph using colors `0` and `1`. If an adjacent node already has the same color as the current node, the graph is not bipartite.

---

### Code

```cpp
// BFS
class Solution {
    bool bfs(int start, vector<vector<int>>& adj, vector<int>& color) {
        queue<int> q;
        color[start] = 0;
        q.push(start);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (auto it : adj[node]) {
                if (color[it] == -1) {
                    color[it] = 1 - color[node];
                    q.push(it);
                } else if (color[it] == color[node]) {
                    return false;
                }
            }
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!bfs(i, graph, color)) return false;
            }
        }
        return true;
    }
};
```

```cpp
// DFS
class Solution {
    bool dfs(int node, int c, vector<vector<int>>& adj, vector<int>& color) {
        color[node] = c;
        for (auto it : adj[node]) {
            if (color[it] == -1) {
                if (!dfs(it, 1 - c, adj, color)) return false;
            } else if (color[it] == c) {
                return false;
            }
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, graph, color)) return false;
            }
        }
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Each vertex and edge is visited once.
- **Space Complexity:** `O(V)` — Color array and queue/stack.
