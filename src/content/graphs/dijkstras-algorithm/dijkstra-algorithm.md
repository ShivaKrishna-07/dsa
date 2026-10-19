---
title: "Dijkstra's Algorithm (Priority Queue)"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1"
  youtube: "https://www.youtube.com/watch?v=V6H1qAeB-l4"
  article: "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/"
---

### Problem Statement

Given a weighted, undirected, and connected graph of `V` vertices and an adjacency list `adj` where `adj[i]` contains pairs of `[v, w]` representing an edge between `i` and `v` with weight `w`. Find the shortest distance of all vertices from the given source vertex `S`.

**Example 1:**
```text
Input: V = 3, E = 3, adj = [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], S = 2
Output: [4, 3, 0]
```

---

### Intuition

Dijkstra's algorithm greedily extracts the vertex with the smallest provisional distance using a min-heap (priority queue). For each adjacent vertex, if taking the current edge offers a strictly shorter path, update the distance and push into the priority queue.

---

### Code

```cpp
class Solution {
public:
    vector<int> dijkstra(int V, vector<vector<int>> adj[], int S) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(V, 1e9);

        dist[S] = 0;
        pq.push({0, S});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) {
                continue;
            }

            for (auto& edge : adj[u]) {
                int v = edge[0];
                int wt = edge[1];

                if (d + wt < dist[v]) {
                    dist[v] = d + wt;
                    pq.push({dist[v], v});
                }
            }
        }
        return dist;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(E * log V)` — Each edge relaxation can push into the min-heap.
- **Space Complexity:** `O(V)` — Distance array and priority queue.
