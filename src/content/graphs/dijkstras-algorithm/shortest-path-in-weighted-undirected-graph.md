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

To find the shortest path that is also **lexicographically smallest**, standard forward Dijkstra with a `parent` array fails because parent pointers only tie-break the *preceding* node (the end of the path) rather than prioritizing smaller vertex indices at the *beginning* of the path.

**Reverse Dijkstra + Greedy Forward Reconstruction:**
1. **Dijkstra from Destination:** Run Dijkstra's algorithm starting from `dest` to compute `dist[i]`, the minimum distance from each vertex `i` to `dest`.
2. **Unreachable Check:** If `dist[src] == 1e9`, no path exists between `src` and `dest`, return `{-1}`.
3. **Greedy Traversal from Source:** Start at `src` and move towards `dest`. At the current vertex `curr`, consider all neighbors `v` connected with weight `wt`. A neighbor `v` lies on a shortest path to `dest` if:
   $$\text{dist}[\text{curr}] = \text{wt} + \text{dist}[v]$$
   Among all neighbors satisfying this condition, greedily choose the one with the **smallest vertex index** `v`.
4. This forward greedy choice guarantees the resulting path sequence is lexicographically minimal.

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

        // Min-heap stores {distance, vertex}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        // dist[i] stores the shortest distance from vertex i to dest
        vector<int> dist(V + 1, 1e9);

        dist[dest] = 0;
        pq.push({0, dest});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) {
                continue;
            }

            for (auto& [v, wt] : adj[u]) {
                if (dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                    pq.push({dist[v], v});
                }
            }
        }

        // If dest is unreachable from src
        if (dist[src] == 1e9) {
            return {-1};
        }

        // Greedily reconstruct path from src to dest
        vector<int> path;
        int curr = src;
        path.push_back(curr);

        while (curr != dest) {
            int nextNode = -1;

            for (auto& [v, wt] : adj[curr]) {
                // Check if neighbor v lies on an optimal shortest path to dest
                if (dist[curr] == wt + dist[v]) {
                    // Pick the smallest vertex index for lexicographical order
                    if (nextNode == -1 || v < nextNode) {
                        nextNode = v;
                    }
                }
            }

            curr = nextNode;
            path.push_back(curr);
        }

        return path;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O((V + E) * log V)` — Dijkstra traversal from `dest` takes `O((V + E) * log V)`, and greedy path reconstruction takes `O(V + E)`.
- **Space Complexity:** `O(V + E)` — Adjacency list `O(V + E)`, distance array `O(V)`, priority queue `O(V)`.
