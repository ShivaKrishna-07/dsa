---
title: "Number of Distinct Islands"
difficulty: "Medium"
time: "O(M * N * log(M * N))"
space: "O(M * N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/number-of-distinct-islands/1"
  youtube: "https://www.youtube.com/watch?v=7zmgQSJghpo"
  article: "https://takeuforward.org/data-structure/number-of-distinct-islands/"
---

### Problem Statement

Given a boolean 2D matrix `grid` of size `n * m`. You have to find the number of distinct islands where a group of connected 1s (horizontally or vertically) forms an island. Two islands are considered to be distinct if the shape of one cannot be translated into another.

**Example 1:**
```text
Input: grid = [[1, 1, 0, 0, 0],
               [1, 1, 0, 0, 0],
               [0, 0, 0, 1, 1],
               [0, 0, 0, 1, 1]]
Output: 1
Explanation: Both 2x2 islands have identical shapes under translation.
```

**Example 2:**
```text
Input: grid = [[1, 1, 0, 1, 1],
               [1, 0, 0, 0, 0],
               [0, 0, 0, 0, 1],
               [1, 1, 0, 1, 1]]
Output: 3
```

---

### Intuition

To determine if two islands have the same shape, store relative coordinates of each island cell with respect to the starting cell: `(r - r0, c - c0)`. Store the serialized shape in a hash set; the number of unique shapes is the answer.

---

### Code

```cpp
// DFS
class Solution {
    int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
    void dfs(vector<vector<int>>& g, int r, int c, int r0, int c0, vector<vector<bool>>& vis, vector<pair<int,int>>& shape) {
        vis[r][c] = true;
        shape.push_back({r - r0, c - c0});
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < g.size() && nc >= 0 && nc < g[0].size() && g[nr][nc] == 1 && !vis[nr][nc])
                dfs(g, nr, nc, r0, c0, vis, shape);
        }
    }
public:
    int countDistinctIslands(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<vector<bool>> vis(m, vector<bool>(n, false));
        set<vector<pair<int, int>>> st;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1 && !vis[i][j]) {
                    vector<pair<int, int>> shape;
                    dfs(g, i, j, i, j, vis, shape);
                    st.insert(shape);
                }
            }
        }
        return st.size();
    }
};
```

```cpp
// BFS
class Solution {
public:
    int countDistinctIslands(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<vector<bool>> vis(m, vector<bool>(n, false));
        set<vector<pair<int, int>>> st;
        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1 && !vis[i][j]) {
                    vector<pair<int, int>> shape;
                    queue<pair<int, int>> q;
                    vis[i][j] = true;
                    q.push({i, j});

                    while (!q.empty()) {
                        auto [r, c] = q.front(); q.pop();
                        shape.push_back({r - i, c - j});
                        for (auto& d : dirs) {
                            int nr = r + d[0], nc = c + d[1];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && g[nr][nc] == 1 && !vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }
                    st.insert(shape);
                }
            }
        }
        return st.size();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N * log(M * N))` — Traversal takes `O(M * N)` plus insertion into set.
- **Space Complexity:** `O(M * N)` — Visited array and set storage.
