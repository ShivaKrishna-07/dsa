---
title: "Most Stones Removed with Same Row or Column"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/"
  gfg: "https://practice.geeksforgeeks.org/problems/maximum-stone-removal-sort/1"
  youtube: "https://www.youtube.com/watch?v=OwMNX8SPavM"
  article: "https://takeuforward.org/data-structure/most-stones-removed-with-same-row-or-column-dsu-g-53/"
---

### Problem Statement

On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [xi, yi]`, return the largest possible number of stones that can be removed.

**Example 1:**
```text
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: 5 stones can be removed, leaving 1 stone.
```

**Example 2:**
```text
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
```

---

### Intuition

Treat each row and each column as a node in a bipartite-style graph. A stone at `(r, c)` connects row node `r` with column node `c + offset`. In any connected component of size `K`, we can remove `K - 1` stones by peeling off leaves of a spanning tree until only 1 stone remains.
Therefore:
`Answer = Total Stones - Number of Connected Components`.

---

### Code

```cpp
class DisjointSet {
public:
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
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

class Solution {
public:
    int removeStones(vector<vector<int>>& stones) {
        int maxR = 0, maxC = 0;
        for (auto& s : stones) {
            maxR = max(maxR, s[0]);
            maxC = max(maxC, s[1]);
        }

        int offset = maxR + 1;
        DisjointSet ds(maxR + maxC + 2);
        unordered_set<int> stoneNodes;

        for (auto& s : stones) {
            int nodeRow = s[0];
            int nodeCol = s[1] + offset;
            ds.unionBySize(nodeRow, nodeCol);
            stoneNodes.insert(nodeRow);
            stoneNodes.insert(nodeCol);
        }

        int components = 0;
        for (int node : stoneNodes) {
            if (ds.findUPar(node) == node) components++;
        }

        return stones.size() - components;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * 4 * alpha)` ≈ `O(N)` where `N` is the number of stones.
- **Space Complexity:** `O(maxR + maxC)` for DSU and stoneNodes set.
