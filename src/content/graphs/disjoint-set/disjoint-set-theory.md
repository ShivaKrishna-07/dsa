---
title: "Disjoint Set (Union-Find) Theory"
difficulty: "Medium"
time: "O(4 * alpha) ~ O(1)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/watch?v=aBxjDBC4M1U"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/disjoint-set-union"
---

### Problem Statement

A **Disjoint Set** (Union-Find) data structure maintains a collection of disjoint (non-overlapping) sets. It efficiently answers dynamic connectivity queries and merges components via two primary operations:

1. **Find Ultimate Parent (`findUPar`):** Determines the representative root of the set containing an element. Can check if two elements `u` and `v` belong to the same component (`findUPar(u) == findUPar(v)`).
2. **Union (`unionByRank` / `unionBySize`):** Merges two disjoint subsets into a single connected component.

---

### Why DSU over DFS/BFS?

In a dynamic graph where edges are added continuously over time, answering whether two nodes are connected takes `O(V + E)` per query with standard DFS/BFS. DSU answers connectivity queries and performs unions in **nearly `O(1)` amortized time**!

---

### Optimizations

#### 1. Path Compression
During the `find` operation, make every visited node point directly to the ultimate root parent. This flattens the tree so subsequent queries take `O(1)` time.

```text
Before Path Compression:
    4 -> 3 -> 2 -> 1 (root)

After findUPar(4):
    4 -> 1
    3 -> 1
    2 -> 1
```

#### 2. Union by Rank / Size
Always attach the tree with smaller rank (or smaller size) under the root of the tree with larger rank (or size). This prevents the tree from becoming skewed and ensures near-constant depth.

---

### Intuition

We maintain two main arrays: `parent` and `rank` (or `size`). Initially, every vertex is its own parent (`parent[i] = i`). Path compression recursively updates `parent[node]` to the ultimate root on each traversal. When joining two components `u` and `v`, find their ultimate parents `ulp_u` and `ulp_v`. If they differ, attach the smaller tree under the larger tree's root.

---

### Code

```cpp
class DisjointSet {
public:
    // parent[i]: representative root; rank/size: tree depth/size for balanced union
    vector<int> rank, parent, size;

    DisjointSet(int n) {
        rank.resize(n + 1, 0);
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
        // Path compression: attaches node directly to root
        return parent[node] = findUPar(parent[node]);
    }

    void unionByRank(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) {
            return;
        }

        if (rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        } else if (rank[ulp_v] < rank[ulp_u]) {
            parent[ulp_v] = ulp_u;
        } else {
            parent[ulp_v] = ulp_u;
            rank[ulp_u]++;
        }
    }

    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) {
            return;
        }

        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(4 * alpha)` per query, where `alpha` is the Inverse Ackermann function. Practically `O(1)` for any realistic `N`.
- **Space Complexity:** `O(N)` for storing `parent`, `rank`, and `size` arrays.
