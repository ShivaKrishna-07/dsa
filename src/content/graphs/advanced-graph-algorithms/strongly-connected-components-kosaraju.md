---
title: "Strongly Connected Components (Kosaraju's Algorithm)"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V + E)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1"
  youtube: "https://www.youtube.com/watch?v=R6uoSjZ2imo"
  article: "https://takeuforward.org/data-structure/strongly-connected-components-kosarajus-algorithm-g-54/"
---

### Problem Statement

Given a directed graph with `V` vertices and adjacency list `adj`, find the total number of Strongly Connected Components (SCC) in the graph. A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex within that subgraph.

**Example 1:**
```text
Input: V = 5, adj = [[2, 3], [0], [1], [4], []]
Output: 3
Explanation: The 3 SCCs are {0, 1, 2}, {3}, and {4}.
```

---

### Intuition

Kosaraju's algorithm exploits the fact that reversing all edges keeps the internal reachability of every SCC intact, but prevents paths between different SCCs. It operates in 3 linear phases:
1. **Sort by Finishing Times:** Run DFS on the original graph and push vertices onto a stack upon completion (similar to topological sort).
2. **Transpose the Graph:** Create a reversed adjacency list reversing all directed edges `u -> v` to `v -> u`.
3. **Traverse SCCs:** Pop vertices from the stack one by one. If unvisited in the transposed graph, launch a DFS traversal to mark all nodes belonging to that SCC and increment the SCC counter.

---

### Code

```cpp
class Solution {
    void dfs1(int u, vector<vector<int>>& adj, vector<int>& vis, stack<int>& st) {
        vis[u] = 1;

        for (auto v : adj[u]) {
            if (!vis[v]) {
                dfs1(v, adj, vis, st);
            }
        }
        st.push(u);
    }

    void dfs2(int u, vector<vector<int>>& revAdj, vector<int>& vis) {
        vis[u] = 1;

        for (auto v : revAdj[u]) {
            if (!vis[v]) {
                dfs2(v, revAdj, vis);
            }
        }
    }

public:
    int kosaraju(int V, vector<vector<int>>& adj) {
        vector<int> vis(V, 0);
        // Stack stores vertices sorted by DFS completion/finishing times
        stack<int> st;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs1(i, adj, vis, st);
            }
        }

        vector<vector<int>> revAdj(V);
        for (int i = 0; i < V; i++) {
            vis[i] = 0;
            for (auto v : adj[i]) {
                revAdj[v].push_back(i);
            }
        }

        int sccCount = 0;

        while (!st.empty()) {
            int u = st.top();
            st.pop();

            if (!vis[u]) {
                sccCount++;
                dfs2(u, revAdj, vis);
            }
        }

        return sccCount;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Phase 1 DFS `O(V + E)`, graph transposition `O(V + E)`, and Phase 2 DFS `O(V + E)`.
- **Space Complexity:** `O(V + E)` — Stack of size `V`, visited array of size `V`, and reversed adjacency list of size `V + E`.
