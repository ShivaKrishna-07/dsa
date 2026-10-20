---
title: "Dijkstra's Algorithm (Set)"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1"
  youtube: "https://www.youtube.com/watch?v=PATgNiuTP2o"
  article: "https://takeuforward.org/data-structure/dijkstras-algorithm-using-set-g-33/"
---

### Problem Statement

Given a weighted, undirected, and connected graph of `V` vertices and an adjacency list `adj` where `adj[i]` contains pairs of `[v, w]` representing an edge between `i` and `v` with weight `w`. Find the shortest distance of all vertices from the given source vertex `S` using `std::set`.

**Example 1:**
```text
Input: V = 3, E = 3, adj = [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], S = 2
Output: [4, 3, 0]
```

---

### Intuition

Dijkstra using `std::set` stores elements ordered by distance. When a shorter distance to an adjacent vertex `v` is found, if `v` is already reachable with an existing distance, we can erase `{dist[v], v}` from the set before inserting the updated distance. This prevents redundant checks for outdated distances.

---

### Code

```cpp
class Solution {
public:
    vector<int> dijkstra(int V, vector<vector<int>> adj[], int S) {
        // Set stores {distance, node} in ascending order
        set<pair<int, int>> st;
        // Stores shortest distance from source to each vertex
        vector<int> dist(V, 1e9);

        dist[S] = 0;
        st.insert({0, S});

        while (!st.empty()) {
            auto it = st.begin();
            int d = it->first;
            int u = it->second;
            st.erase(it);

            for (auto& edge : adj[u]) {
                int v = edge[0];
                int wt = edge[1];

                if (d + wt < dist[v]) {
                    if (dist[v] != 1e9) {
                        st.erase({dist[v], v});
                    }
                    dist[v] = d + wt;
                    st.insert({dist[v], v});
                }
            }
        }
        return dist;
    }
};

/*
Why Dijkstra using Set can be better than Priority Queue:

1. Elimination of Redundant Visits:
   - In priority_queue, when a shorter path to a node is discovered, the old entry cannot be deleted. It stays in the heap and must later be popped and skipped.
   - In std::set, we can actively find and erase the old {dist[v], v} pair via st.erase(). This saves subsequent iterations on redundant entries.

2. Trade-offs:
   - Erasing from a set takes O(log N) time (red-black tree rebalancing).
   - In dense graphs, erasing avoids many useless queue operations.
   - In sparse graphs, priority_queue is generally faster in practice due to lower constant overhead and cache locality.
*/
```

---

### Complexity Analysis

- **Time Complexity:** `O(E * log V)` — Each edge relaxation performs `erase` and `insert` taking logarithmic time.
- **Space Complexity:** `O(V)` — Distance array and set holding at most `V` elements.
