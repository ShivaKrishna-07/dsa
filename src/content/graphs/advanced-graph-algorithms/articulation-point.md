---
title: "Articulation Point in Graph"
difficulty: "Hard"
time: "O(V + 2E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/articulation-point-1/1"
  youtube: "https://www.youtube.com/watch?v=j1QDfU21iZk"
  article: "https://takeuforward.org/data-structure/articulation-point-in-graph-g-56/"
---

### Problem Statement

Given an undirected connected graph with `V` vertices and adjacency list `adj`, find all articulation points (cut vertices) in the graph. An articulation point is a vertex whose removal disconnects the graph into two or more components. Return the vertices in sorted order, or `[-1]` if no articulation point exists.

**Example 1:**
```text
Input: V = 5, adj = [[1], [0, 4], [3, 4], [2, 4], [1, 2, 3]]
Output: [1, 4]
Explanation: Removing node 1 or node 4 disconnects the graph.
```

---

### Intuition

We maintain discovery time `tin[]` and lowest reachable discovery time `low[]` via DFS. A vertex `u` is an articulation point if:
1. `parent != -1` and for some child `v`, `low[v] >= tin[u]`. This signifies that child `v` has no back-edge to reach any proper ancestor of `u`.
2. `parent == -1` (the root of the DFS tree) and it has more than 1 independent DFS child (`child > 1`).

Use a boolean `mark[]` array to ensure each articulation point is recorded at most once.

---

### Code

```cpp
class Solution {
    int timer = 1;

    void dfs(int u, int p, vector<int> adj[], vector<int>& vis, vector<int>& tin, vector<int>& low, vector<int>& mark) {
        vis[u] = 1;
        tin[u] = timer;
        low[u] = timer;
        timer++;

        int child = 0;

        for (auto v : adj[u]) {
            if (v == p) {
                continue;
            }

            if (!vis[v]) {
                dfs(v, u, adj, vis, tin, low, mark);
                low[u] = min(low[u], low[v]);

                if (low[v] >= tin[u] && p != -1) {
                    mark[u] = 1;
                }
                child++;
            } else {
                low[u] = min(low[u], tin[v]);
            }
        }

        if (p == -1 && child > 1) {
            mark[u] = 1;
        }
    }

public:
    vector<int> articulationPoints(int V, vector<int> adj[]) {
        vector<int> vis(V, 0);
        vector<int> tin(V);
        vector<int> low(V);
        vector<int> mark(V, 0);

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        vector<int> ans;
        for (int i = 0; i < V; i++) {
            if (mark[i] == 1) {
                ans.push_back(i);
            }
        }

        if (ans.empty()) {
            return {-1};
        }

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + 2E)` — Single DFS traversal checking each vertex and edge.
- **Space Complexity:** `O(V)` — Arrays for `vis`, `tin`, `low`, and `mark` along with the recursion call stack.
