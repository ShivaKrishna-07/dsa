---
title: "Making A Large Island"
difficulty: "Hard"
time: "O(N^2)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/making-a-large-island/"
  youtube: "https://www.youtube.com/watch?v=lgiz0Oup6gM"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/making-a-large-island"
---

### Problem Statement

You are given an `n x n` binary matrix `grid`. You are allowed to change **at most one** `0` to be `1`.

Return the size of the largest island in `grid` after applying this operation. An island is a 4-directionally connected group of `1`s.

**Example 1:**
```text
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 to connect two 1s into an island of size 3.
```

**Example 2:**
```text
Input: grid = [[1,1],[1,0]]
Output: 4
```

**Example 3:**
```text
Input: grid = [[1,1],[1,1]]
Output: 4
```

---

### Intuition

1. **Step 1:** Connect all adjacent `1`s into components using DSU. The `size` array in DSU keeps track of each component's area.
2. **Step 2:** For every `0` in the grid, inspect its 4 neighbors. Use a set to collect unique ultimate parents of neighboring components, and sum their sizes + 1 (the flipped zero).
3. Maximize over all `0`s, and handle the edge case where the grid is already all `1`s.

---

### Code

```cpp
class DisjointSet {
public:
    // parent[i]: representative root; size[i]: island cell count
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
    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size();
        DisjointSet ds(n * n);
        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        // Step 1: Connect existing 1s
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        ds.unionBySize(r * n + c, nr * n + nc);
                    }
                }
            }
        }

        // Step 2: Try flipping each 0
        int maxArea = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) continue;
                // Stores unique root IDs of adjacent islands to avoid duplicate addition
                unordered_set<int> uniqueParents;
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        uniqueParents.insert(ds.findUPar(nr * n + nc));
                    }
                }
                int area = 1;
                for (int p : uniqueParents) area += ds.size[p];
                maxArea = max(maxArea, area);
            }
        }

        // Case when all cells are 1
        for (int i = 0; i < n * n; i++) {
            maxArea = max(maxArea, ds.size[ds.findUPar(i)]);
        }

        return maxArea;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N^2)` — Two passes over the `N x N` grid.
- **Space Complexity:** `O(N^2)` — DSU structures for `N^2` cells.
