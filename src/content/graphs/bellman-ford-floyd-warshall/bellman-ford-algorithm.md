---
title: "Bellman-Ford Algorithm"
difficulty: "Medium"
time: "O(V * E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1"
  youtube: "https://www.youtube.com/watch?v=0vVofAhAYjc"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/bellman-ford-algorithm"
---

### Problem Statement

Given an edge list of a directed weighted graph with `V` vertices and `E` edges, find the shortest distance of all vertices from the given source vertex `S`. If the graph contains a negative weight cycle, return `[-1]`.

**Example 1:**
```text
Input: V = 3, edges = [[0, 1, 5], [1, 0, 3], [1, 2, -1], [2, 0, 1]], S = 2
Output: [1, 6, 0]
```

---

### Intuition

Dijkstra's algorithm fails when negative edge weights are present because it assumes once a node is visited, its shortest distance is finalized. Bellman-Ford relaxes all `E` edges `V - 1` times. Since any simple shortest path contains at most `V - 1` edges, `V - 1` relaxations guarantee optimal distances. Relaxing edges a $V$-th time detects negative cycles if any distance further decreases.

---

### Code

```cpp
class Solution {
public:
    vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
        // Stores shortest distance from source to each vertex
        vector<int> dist(V, 1e8);
        dist[src] = 0;

        // Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (auto& edge : edges) {
                int u = edge[0];
                int v = edge[1];
                int wt = edge[2];

                if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }

        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int wt = edge[2];

            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
                return {-1};
            }
        }

        return dist;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V * E)` — We iterate over all `E` edges `V - 1` times plus one additional check for negative cycles.
- **Space Complexity:** `O(V)` — Distance array of size `V`.
