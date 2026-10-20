---
title: "Shortest Path in Undirected Graph"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1"
  youtube: "https://www.youtube.com/watch?v=C4gxoTaI71U"
  article: "https://takeuforward.org/data-structure/shortest-path-in-undirected-graph-with-unit-distance-bfs/"
---

### Problem Statement

You are given an Undirected Graph having unit weight of the edges, having `n` nodes from `0` to `n-1` and `m` edges. Find the shortest path from the given source `src` to all other nodes and if it is unreachable to reach any node, then return `-1` for that node.

**Example 1:**
```text
Input: n = 9, m = 10, edges = [[0,1],[0,3],[3,4],[4,5],[5,6],[1,2],[2,6],[6,7],[7,8],[6,8]], src = 0
Output: [0, 1, 2, 1, 2, 3, 3, 4, 4]
```

---

### Intuition

For an unweighted graph (or unit weight), standard Breadth-First Search (BFS) is guaranteed to find the shortest path from the source to any node because it visits nodes level by level.

---

### Code

```cpp
class Solution {
public:
    vector<int> shortestPath(vector<vector<int>>& edges, int n, int m, int src) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        vector<int> dist(n, -1);
        // Queue stores current vertex to process level by level
        queue<int> q;

        dist[src] = 0;
        q.push(src);

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (int v : adj[u]) {
                if (dist[v] == -1) {
                    // First time reaching vertex v gives its shortest path
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return dist;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + 2E)` — Standard BFS on undirected graph.
- **Space Complexity:** `O(V + 2E)` — Adjacency list and distance array.
