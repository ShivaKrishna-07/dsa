---
title: "Minimum Spanning Tree (MST) Theory"
difficulty: "Medium"
time: "O(E * log E)"
space: "O(V + E)"
platforms:
  youtube: "https://www.youtube.com/watch?v=mJcZjjK5380"
  article: "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
---

### What is a Spanning Tree?

A **Spanning Tree** of a connected, undirected graph `G = (V, E)` is a subgraph that:
1. Includes **all `V` vertices**.
2. Is a **tree** (connected and contains **no cycles**).
3. Has exactly **`V - 1` edges**.

A graph can have multiple spanning trees.

---

### What is a Minimum Spanning Tree (MST)?

Among all possible spanning trees of a weighted graph, the **Minimum Spanning Tree** is the one with the **minimum total edge weight**.

```text
Given Graph:
    (1)
   0 --- 1
   | \   |
(4)|  \(3)|(2)
   |   \ |
   2 --- 3
    (5)

MST Edges:
  (0, 1) wt: 1
  (1, 3) wt: 2
  (0, 2) wt: 4
Total MST Weight = 1 + 2 + 4 = 7
```

---

### Prim's Algorithm vs Kruskal's Algorithm

| Feature | Prim's Algorithm | Kruskal's Algorithm |
| :--- | :--- | :--- |
| **Approach** | Greedy (Node-based / Cut Property) | Greedy (Edge-based) |
| **Strategy** | Grows a single tree starting from an arbitrary node | Picks the smallest edge globally that doesn't form a cycle |
| **Data Structure** | Min-Heap (Priority Queue) | Disjoint Set Union (Union-Find) |
| **Time Complexity**| `O(E * log V)` | `O(E * log E)` |
| **Preferred When** | Dense Graphs (`E ≈ V^2`) | Sparse Graphs (`E ≈ V`) |

---

### Prim's Algorithm Template

```cpp
int primMST(int V, vector<pair<int, int>> adj[]) {
    // pq stores: {weight, node}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<bool> vis(V, false);

    pq.push({0, 0});
    int sum = 0;

    while (!pq.empty()) {
        auto [wt, u] = pq.top();
        pq.pop();
        if (vis[u]) continue;

        vis[u] = true;
        sum += wt;

        for (auto& [v, w] : adj[u]) {
            if (!vis[v]) {
                pq.push({w, v});
            }
        }
    }
    return sum;
}
```

---

### Kruskal's Algorithm Template

```cpp
class DisjointSet {
public:
    vector<int> parent, size;
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

int kruskalMST(int V, vector<vector<int>>& edges) {
    // edges: [u, v, wt]
    sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[2] < b[2];
    });

    DisjointSet ds(V);
    int sum = 0, count = 0;

    for (auto& e : edges) {
        if (ds.unionBySize(e[0], e[1])) {
            sum += e[2];
            if (++count == V - 1) break;
        }
    }
    return sum;
}
```
