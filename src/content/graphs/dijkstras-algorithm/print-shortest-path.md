---
title: "Print Shortest Path"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V + E)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1"
  youtube: "https://www.youtube.com/results?search_query=Print+Shortest+Path"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/print-shortest-path"
---

### Problem Statement

Given a weighted undirected graph with `n` vertices (numbered `1` to `n`) and `m` edges, find the shortest path between vertex `1` and vertex `n`. If no path exists, return `[-1]`. If a path exists, return the vertices traversed in order from `1` to `n` (prepended with the total weight of the path as per GFG specification).

**Example 1:**
```text
Input: n = 5, m = 6, edges = [[1,2,2], [2,5,5], [2,3,4], [1,4,1], [4,3,3], [3,5,1]]
Output: [5, 1, 4, 3, 5]
Explanation: Shortest path weight is 5, traversing: 1 -> 4 -> 3 -> 5.
```

---

### Intuition

Run Dijkstra's algorithm while maintaining a `parent` array where `parent[i] = i` initially. Whenever distance to `v` improves via node `u`, update `parent[v] = u`. After Dijkstra finishes, if vertex `n` is unreachable (`dist[n] == 1e9`), return `[-1]`. Otherwise, trace backward from node `n` to node `1` using `parent` pointers and reverse the resulting path.

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
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(n + 1, 1e9);
        // parent stores predecessor node along the shortest path
        vector<int> parent(n + 1);

        for (int i = 1; i <= n; i++) {
            parent[i] = i;
        }

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
        int curr = n;

        while (parent[curr] != curr) {
            path.push_back(curr);
            curr = parent[curr];
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

- **Time Complexity:** `O(E * log V + V)` — `O(E * log V)` for Dijkstra traversal and `O(V)` to backtrack the path.
- **Space Complexity:** `O(V + E)` — Adjacency list, priority queue, distance array, and parent array.
