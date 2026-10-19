---
title: "Minimum Spanning Tree"
difficulty: "Medium"
time: "O(E * log E)"
space: "O(V + E)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1"
  youtube: "https://www.youtube.com/watch?v=mJcZjjK5380"
  article: "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
---

### Problem Statement

Given a weighted, undirected, and connected graph of `V` vertices and `E` edges. The task is to find the sum of weights of the edges of the Minimum Spanning Tree.

**Example 1:**
```text
Input: V = 3, E = 3, edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
Output: 4
Explanation: The edges (0, 2) with weight 1 and (1, 2) with weight 3 form the MST. Total weight = 1 + 3 = 4.
```

---

### Intuition

- **Prim's Algorithm:** Start from any node, use a min-heap to greedily pick the minimum weight edge that expands the connected component without creating a cycle.
- **Kruskal's Algorithm:** Sort all edges by weight in ascending order. Iterate through edges and add to the MST using Disjoint Set Union (DSU) if the endpoints belong to different components.

---

### Code

```cpp
// Prim's Algorithm
class Solution {
public:
    int spanningTree(int V, vector<vector<int>> adj[]) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<bool> vis(V, false);

        pq.push({0, 0}); // {weight, node}
        int sum = 0;

        while (!pq.empty()) {
            auto [wt, u] = pq.top();
            pq.pop();
            if (vis[u]) continue;

            vis[u] = true;
            sum += wt;

            for (auto& edge : adj[u]) {
                int v = edge[0], w = edge[1];
                if (!vis[v]) pq.push({w, v});
            }
        }
        return sum;
    }
};
```

```cpp
// Kruskal's Algorithm
class DisjointSet {
    vector<int> parent, size;
public:
    DisjointSet(int n) {
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return false;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
        return true;
    }
};

class Solution {
public:
    int spanningTree(int V, vector<vector<int>> adj[]) {
        vector<vector<int>> edges;
        for (int u = 0; u < V; u++) {
            for (auto& it : adj[u]) {
                int v = it[0], wt = it[1];
                if (u < v) edges.push_back({wt, u, v});
            }
        }

        sort(edges.begin(), edges.end());
        DisjointSet ds(V);
        int sum = 0;

        for (auto& e : edges) {
            int wt = e[0], u = e[1], v = e[2];
            if (ds.unionBySize(u, v)) {
                sum += wt;
            }
        }
        return sum;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** Prim's: `O(E * log V)` | Kruskal's: `O(E * log E)`.
- **Space Complexity:** `O(V + E)` for graph/edges and DSU/priority queue.
