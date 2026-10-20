---
title: "Shortest Path in Directed Acyclic Graph"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1"
  youtube: "https://www.youtube.com/watch?v=ZUFQfFaU-8U"
  article: "https://takeuforward.org/data-structure/shortest-path-in-directed-acyclic-graph-topological-sort/"
---

### Problem Statement

Given a Directed Acyclic Graph of `V` vertices from `0` to `V-1` and a 2D integer array `edges` of size `M`, where each edge is `[u, v, wt]`. Find the shortest path from vertex `0` to all other vertices. If a vertex is unreachable, return `-1` for that vertex.

**Example 1:**
```text
Input: V = 6, E = 7, edges = [[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]]
Output: [0, 2, 3, 6, 1, 5]
```

---

### Intuition

In a DAG, processing nodes in **topological order** guarantees that when we relax edges out of node `u`, we have already found the minimal distance to `u`. This eliminates the need for a priority queue (Dijkstra) and solves the problem in linear `O(V + E)` time, even with negative edge weights.

---

### Code

```cpp
class Solution {
    void topoSort(int node, vector<pair<int, int>> adj[], vector<bool>& vis, stack<int>& st) {
        vis[node] = true;
        for (auto& it : adj[node]) {
            if (!vis[it.first]) topoSort(it.first, adj, vis, st);
        }
        st.push(node);
    }
public:
    vector<int> shortestPath(int V, int E, vector<vector<int>>& edges) {
        vector<pair<int, int>> adj[V];
        for (auto& e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
        }

        vector<bool> vis(V, false);
        // Stack stores topological ordering of DAG
        stack<int> st;
        for (int i = 0; i < V; i++) {
            if (!vis[i]) topoSort(i, adj, vis, st);
        }

        // dist stores shortest distance from source to each vertex
        vector<int> dist(V, 1e9);
        dist[0] = 0;

        while (!st.empty()) {
            int u = st.top();
            st.pop();
            if (dist[u] != 1e9) {
                for (auto& it : adj[u]) {
                    int v = it.first, wt = it.second;
                    // Relax outgoing edges in topological order
                    if (dist[u] + wt < dist[v]) {
                        dist[v] = dist[u] + wt;
                    }
                }
            }
        }

        for (int i = 0; i < V; i++)
            if (dist[i] == 1e9) dist[i] = -1;

        return dist;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Finding topological sort and relaxing edges.
- **Space Complexity:** `O(V + E)` — Adjacency list, visited array, and stack.
