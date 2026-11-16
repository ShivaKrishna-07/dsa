---
title: "Shortest Path in Weighted Undirected Graph"
difficulty: "Medium"
time: "O((V + E) * log V)"
space: "O(V + E)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1"
  youtube: "https://www.youtube.com/results?search_query=Shortest+Path+in+Weighted+Undirected+Graph"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/print-shortest-path"
---

### Problem Statement

Given a weighted undirected graph with `V` vertices numbered from `1` to `V` and `E` edges, where `edges[i] = [u, v, w]` denotes an undirected edge between vertices `u` and `v` with weight `w`. We are also given two vertices `src` and `dest`, find the shortest path from `src` to `dest`.

- If multiple shortest paths exist with the same total weight, return the one whose sequence of vertices is **lexicographically smallest**.
- If no path exists between `src` and `dest`, return `{-1}`.

**Note:** The graph contains no negative-weight edges.

**Example 1:**
```text
Input: V = 5, edges = [[1, 2, 2], [2, 5, 5], [2, 3, 4], [1, 4, 1], [4, 3, 3], [3, 5, 1]], src = 1, dest = 5
Output: [1, 4, 3, 5]
Explanation: The shortest path from vertex 1 to vertex 5 is 1 -> 4 -> 3 -> 5 with a total weight of 5.
```

**Example 2:**
```text
Input: V = 6, edges = [[1, 2, 1], [1, 3, 1], [2, 4, 1], [3, 4, 1], [4, 6, 1], [2, 5, 2], [5, 6, 1]], src = 1, dest = 6
Output: [1, 2, 4, 6]
Explanation: Paths 1 -> 2 -> 4 -> 6 and 1 -> 3 -> 4 -> 6 both have total weight 3. [1, 2, 4, 6] is lexicographically smaller.
```

---

### Intuition

We use Dijkstra's algorithm starting from `src` with a `parent` array to record the predecessor along the shortest path to each vertex. When relaxing edges, if an alternate path achieves the exact same shortest distance (`d + wt == dist[v]`), we break ties by selecting the parent vertex with the smaller index (`u < parent[v]`). Once Dijkstra completes, we backtrack using the `parent` array from `dest` to `src` and reverse the sequence to obtain the shortest path.

---

### Code

```cpp
class Solution {
public:
    vector<int> shortestPath(int V, vector<vector<int>>& edges, int src, int dest) {
        vector<vector<pair<int, int>>> adj(V + 1);
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int wt = edge[2];
            adj[u].push_back({v, wt});
            adj[v].push_back({u, wt});
        }

        // Min-heap stores {distance, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        // dist: shortest distance; parent: predecessor vertex along shortest path
        vector<int> dist(V + 1, 1e9);
        vector<int> parent(V + 1);

        for (int i = 1; i <= V; i++) {
            parent[i] = i;
        }

        dist[src] = 0;
        pq.push({0, src});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            // Skip stale pair: a shorter distance to u has already been processed
            if (d > dist[u]) {
                continue;
            }

            for (auto& neighbor : adj[u]) {
                int v = neighbor.first;
                int wt = neighbor.second;

                if (d + wt < dist[v]) {
                    dist[v] = d + wt;
                    parent[v] = u;
                    pq.push({dist[v], v});
                } else if (d + wt == dist[v]) {
                    // Tie-breaker for lexicographically smaller path
                    if (u < parent[v]) {
                        parent[v] = u;
                        pq.push({dist[v], v});
                    }
                }
            }
        }

        if (dist[dest] == 1e9) {
            return {-1};
        }

        vector<int> path;
        int curr = dest;
        while (curr != src) {
            path.push_back(curr);
            curr = parent[curr];
        }
        path.push_back(src);

        reverse(path.begin(), path.end());
        return path;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O((V + E) * log V)` — Dijkstra traversal from `dest` takes `O((V + E) * log V)`, and greedy path reconstruction takes `O(V + E)`.
- **Space Complexity:** `O(V + E)` — Adjacency list `O(V + E)`, distance array `O(V)`, priority queue `O(V)`.
