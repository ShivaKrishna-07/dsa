---
title: "Number of Operations to Make Network Connected"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/"
  gfg: "https://practice.geeksforgeeks.org/problems/connecting-the-graph/1"
  youtube: "https://www.youtube.com/watch?v=FYrl7iz9_ZU"
  article: "https://takeuforward.org/data-structure/number-of-operations-to-make-network-connected-dsu-g-49/"
---

### Problem Statement

There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` where `connections[i] = [ai, bi]`. Any computer can reach any other computer directly or indirectly through the network.

You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return `-1`.

**Example 1:**
```text
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between 1 and 2 and place between 1 and 3.
```

**Example 2:**
```text
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
```

**Example 3:**
```text
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: Not enough cables.
```

---

### Intuition

To connect `n` nodes, we need at least `n - 1` edges. If `connections.size() < n - 1`, return `-1`. Using DSU, each edge connecting two already-connected nodes is an extra edge. The number of operations needed is simply `(number of connected components) - 1`.

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
    int makeConnected(int n, vector<vector<int>>& connections) {
        if (connections.size() < n - 1) return -1;

        DisjointSet ds(n);
        for (auto& c : connections) {
            ds.unionBySize(c[0], c[1]);
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (ds.parent[i] == i) components++;
        }

        return components - 1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E * 4 * alpha)` ≈ `O(V + E)`.
- **Space Complexity:** `O(V)` for DSU.
