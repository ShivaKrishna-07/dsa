---
title: "Disjoint Set (Union-Find) Theory"
difficulty: "Medium"
time: "O(4 * alpha) ~ O(1)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/watch?v=aBxjDBC4M1U"
  article: "https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/"
---

### What is a Disjoint Set Union (DSU)?

A **Disjoint Set** data structure maintains a collection of disjoint (non-overlapping) sets. It supports two primary operations efficiently:
1. **Find Ultimate Parent (`findUPar`):** Determines which subset an element belongs to. Can be used to check if two elements belong to the same connected component.
2. **Union (`unionByRank` / `unionBySize`):** Merges two subsets into a single subset.

---

### Why DSU over DFS/BFS?

In a dynamic graph where edges are added continuously over time, answering whether two nodes are connected would take `O(V + E)` per query with DFS/BFS. DSU answers connectivity and performs unions in **nearly `O(1)` amortized time**!

---

### Optimizations

#### 1. Path Compression
During the `find` operation, make the queried node point directly to its ultimate parent. This flattens the tree so subsequent queries take `O(1)` time.

```text
Before Path Compression:
    4 -> 3 -> 2 -> 1 (root)

After findUPar(4):
    4 -> 1
    3 -> 1
    2 -> 1
```

#### 2. Union by Rank / Size
Always attach the tree with smaller rank (or smaller size) under the root of the tree with larger rank (or size). This prevents the tree from becoming skewed and ensures logarithmic depth.

---

### Striver's Standard C++ Template

```cpp
class DisjointSet {
public:
    vector<int> rank, parent, size;
    DisjointSet(int n) {
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
    }

    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]); // Path Compression
    }

    void unionByRank(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;

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
        if (ulp_u == ulp_v) return;

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

- **Time Complexity:** `O(4 * alpha)` where `alpha` is the Inverse Ackermann function. Practically `O(1)` for any realistic `N`.
- **Space Complexity:** `O(N)` for `parent`, `rank`, and `size` arrays.
