---
title: "Number of Enclaves"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-enclaves/"
  youtube: "https://www.youtube.com/watch?v=rxKcepXQgU4"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-enclaves"
---

### Problem Statement

You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell.

A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

Return the number of land cells in `grid` for which we cannot walk off the boundary of the grid in any number of moves.

**Example 1:**
```text
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and none of them can walk off the boundary.
```

**Example 2:**
```text
Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.
```

---

### Intuition

Any land cell connected to the boundary can walk off the grid. Traverse starting from all boundary land cells using DFS or BFS, marking all connected land cells as visited. Afterward, any remaining unvisited land cells are enclaves.

---

### Code

```cpp
// DFS
class Solution {
    int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
    void dfs(vector<vector<int>>& g, int r, int c, vector<vector<bool>>& vis) {
        vis[r][c] = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < g.size() && nc >= 0 && nc < g[0].size() && g[nr][nc] == 1 && !vis[nr][nc])
                dfs(g, nr, nc, vis);
        }
    }
public:
    int numEnclaves(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<vector<bool>> vis(m, vector<bool>(n, false));

        for (int i = 0; i < m; i++) {
            if (g[i][0] == 1 && !vis[i][0]) dfs(g, i, 0, vis);
            if (g[i][n - 1] == 1 && !vis[i][n - 1]) dfs(g, i, n - 1, vis);
        }
        for (int j = 0; j < n; j++) {
            if (g[0][j] == 1 && !vis[0][j]) dfs(g, 0, j, vis);
            if (g[m - 1][j] == 1 && !vis[m - 1][j]) dfs(g, m - 1, j, vis);
        }

        int cnt = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (g[i][j] == 1 && !vis[i][j]) cnt++;
        return cnt;
    }
};
```

```cpp
// BFS
class Solution {
public:
    int numEnclaves(vector<vector<int>>& g) {
        int m = g.size(), n = g[0].size();
        vector<vector<bool>> vis(m, vector<bool>(n, false));
        // Queue stores {row, col} coordinates of boundary-connected land
        queue<pair<int, int>> q;

        for (int i = 0; i < m; i++) {
            if (g[i][0] == 1) {
                vis[i][0] = true;
                q.push({i, 0});
            }
            if (g[i][n - 1] == 1 && !vis[i][n - 1]) {
                vis[i][n - 1] = true;
                q.push({i, n - 1});
            }
        }
        for (int j = 0; j < n; j++) {
            if (g[0][j] == 1 && !vis[0][j]) {
                vis[0][j] = true;
                q.push({0, j});
            }
            if (g[m - 1][j] == 1 && !vis[m - 1][j]) {
                vis[m - 1][j] = true;
                q.push({m - 1, j});
            }
        }

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && g[nr][nc] == 1 && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }

        int cnt = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (g[i][j] == 1 && !vis[i][j]) cnt++;
        return cnt;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Each cell is visited at most once.
- **Space Complexity:** `O(M * N)` — For the visited grid and recursion/queue.
