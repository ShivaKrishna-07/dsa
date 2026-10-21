---
title: "Minimum Spanning Tree (MST) Theory"
difficulty: "Medium"
time: "O(E * log E)"
space: "O(V + E)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Minimum+Spanning+Tree+(MST)+Theory"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/find-the-mst-weight"
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

```text
+--------------------+-------------------------------------+-------------------------------------+
| Feature            | Prim's Algorithm                    | Kruskal's Algorithm                 |
+--------------------+-------------------------------------+-------------------------------------+
| Strategy           | Vertex-driven (grows a single tree) | Edge-driven (connects components)   |
| Core Approach      | Cut Property (cheapest edge)        | Cycle Detection (sorted edges)      |
| Main Data Struct   | Min-Heap (priority_queue)           | Disjoint Set Union (Union-Find)     |
| Time Complexity    | O(E * log V)                        | O(E * log E)                        |
| Best Suited For    | Dense Graphs (E ≈ V^2)              | Sparse Graphs (E ≈ V)               |
+--------------------+-------------------------------------+-------------------------------------+
```

#### 1. Prim's Algorithm (Grows a Single Tree)
- **Concept:** Starts at any arbitrary root vertex and grows a single tree one edge at a time. In each step, it greedily picks the minimum-weight edge connecting a vertex in the tree to an unvisited vertex.
- **Data Structure:** Min-Heap (`priority_queue`) storing `{weight, node}` + `vis` array.
- **Time Complexity:** `O(E * log V)`
- **When to Choose:** Best for **dense graphs** (many edges, `E ≈ V^2`) or when the graph is already in adjacency list format.

#### 2. Kruskal's Algorithm (Connects Forests)
- **Concept:** Treats every vertex as an independent component. It sorts all edges globally in ascending order of weight and greedily adds edges one by one, using Union-Find to skip edges that would form a cycle.
- **Data Structure:** **Disjoint Set Union (DSU)** with path compression and union by size/rank.
- **Time Complexity:** `O(E * log E)`
- **When to Choose:** Best for **sparse graphs** (fewer edges, `E ≈ V`), when edges are already sorted, or when an edge list is directly given.

---

### Code

```cpp
// Prim's
int primMST(int V, vector<pair<int, int>> adj[]) {
    // Min-heap stores {edge weight, node}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<bool> vis(V, false);

    pq.push({0, 0});
    int sum = 0;

    while (!pq.empty()) {
        auto [wt, u] = pq.top();
        pq.pop();

        if (vis[u]) {
            continue;
        }

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

```cpp
// Kruskal's
class DisjointSet {
public:
    // parent[i]: representative root; size[i]: component size
    vector<int> parent, size;

    DisjointSet(int n) {
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }
    }

    int findUPar(int node) {
        if (node == parent[node]) {
            return node;
        }
        return parent[node] = findUPar(parent[node]);
    }

    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) {
            return false;
        }

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
    sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[2] < b[2];
    });

    DisjointSet ds(V);
    int sum = 0;
    int count = 0;

    for (auto& e : edges) {
        if (ds.unionBySize(e[0], e[1])) {
            sum += e[2];
            count++;
            if (count == V - 1) {
                break;
            }
        }
    }
    return sum;
}
```
