---
title: "Shortest Path in Weighted Undirected Graph"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V + E)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1"
  youtube: "https://www.youtube.com/watch?v=rp1SMw7HSO8"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/print-shortest-path"
---

### Problem Statement

You are given a weighted undirected graph having `n` vertices numbered from `1` to `n` and `m` edges. Find the shortest path between the vertex `1` and vertex `n`. If no path exists, return `[-1]`. If a path exists, return the path with the first element being the weight of the path followed by the nodes visited in order.

**Example 1:**
```text
Input: n = 5, m = 6, edges = [[1,2,2], [2,5,5], [2,3,4], [1,4,1], [4,3,3], [3,5,1]]
Output: [5, 1, 4, 3, 5]
Explanation: Shortest path weight is 5, path: 1 -> 4 -> 3 -> 5.
```

---

### Intuition

Run Dijkstra's algorithm while maintaining a `parent` array. Whenever the distance to vertex `v` is updated through `u`, set `parent[v] = u`. After reaching node `n`, trace back from `n` to `1` using the parent pointers.

---

### Code

```cpp
class Solution {
public:
    vector<int> shortestPath(int n, int m, vector<vector<int>>& edges) {
        vector<pair<int, int>> adj[n + 1];
        for (auto& e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        // Min-heap stores {distance, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        // dist: shortest distance; parent: predecessor vertex along shortest path
        vector<int> dist(n + 1, 1e9), parent(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;

        dist[1] = 0;
        pq.push({0, 1});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) {
                continue;
            }

            for (auto& [v, w] : adj[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    parent[v] = u;
                    pq.push({dist[v], v});
                }
            }
        }

        if (dist[n] == 1e9) {
            return {-1};
        }

        vector<int> path;
        int node = n;
        while (parent[node] != node) {
            path.push_back(node);
            node = parent[node];
        }
        path.push_back(1);
        path.push_back(dist[n]);
        reverse(path.begin(), path.end());
        return path;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(E * log V)` — Dijkstra with min-heap.
- **Space Complexity:** `O(V + E)` — Adjacency list, parent and distance arrays.
