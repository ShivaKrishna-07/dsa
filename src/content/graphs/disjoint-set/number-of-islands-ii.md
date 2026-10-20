---
title: "Number of Islands II"
difficulty: "Hard"
time: "O(K * 4 * alpha)"
space: "O(M * N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/number-of-islands/1"
  youtube: "https://www.youtube.com/results?search_query=Number+of+Islands+II"
  article: "https://takeuforward.org/practice/dsa/number-of-islands-ii"
---

### Problem Statement

You are given an empty 2D binary grid of size `n x m` and a list of queries `operators`, where `operators[i] = [r, c]` turns the cell `(r, c)` into a land cell (`1`). You have to return an array of integers representing the number of islands after each operation.

**Example 1:**
```text
Input: n = 4, m = 5, operators = [[1,1],[0,1],[3,3],[3,4]]
Output: [1, 1, 2, 2]
```

---

### Intuition

Flatten each 2D cell `(r, c)` into a 1D index: `r * m + c`.
For each query, if the cell is already land, the count doesn't change. Otherwise, mark it as land, increment the island count, and check its 4 adjacent neighbors. For each adjacent neighbor that is land, if they belong to different components, union them and decrement the island count.

---

### Code

```cpp
class DisjointSet {
public:
    // parent[i]: representative root; size[i]: island size
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
    vector<int> numOfIslands(int n, int m, vector<vector<int>>& operators) {
        DisjointSet ds(n * m);
        vector<vector<bool>> vis(n, vector<bool>(m, false));
        vector<int> ans;
        int count = 0;

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        for (auto& op : operators) {
            int r = op[0], c = op[1];
            if (vis[r][c]) {
                ans.push_back(count);
                continue;
            }

            vis[r][c] = true;
            count++;

            int node = r * m + c;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && vis[nr][nc]) {
                    int adjNode = nr * m + nc;
                    if (ds.unionBySize(node, adjNode)) {
                        count--;
                    }
                }
            }
            ans.push_back(count);
        }
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(K * 4 * alpha)` ≈ `O(K)` where `K` is the number of queries.
- **Space Complexity:** `O(N * M)` for DSU and visited array.
