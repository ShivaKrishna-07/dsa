---
title: "Number of Islands"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-islands/"
  youtube: "https://www.youtube.com/watch?v=muncqlKJrH0"
  article: "https://takeuforward.org/practice/dsa/number-of-islands"
---

### Problem Statement

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
```text
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

**Example 2:**
```text
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

---

### Intuition

Traverse every cell in the grid. When an unvisited land cell (`grid[i][j] == '1'`) is found, increment the island counter and launch a traversal (DFS or BFS) to visit and mark all 4-directionally connected land cells. Each traversal explores and accounts for one complete island.

---

### Code

```cpp
// DFS
class Solution {
private:
    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};

    void dfs(int i, int j, vector<vector<char>>& grid, vector<vector<int>>& vis) {
        vis[i][j] = 1;
        int n = grid.size();
        int m = grid[0].size();

        for (int k = 0; k < 4; k++) {
            int r = i + dr[k];
            int c = j + dc[k];

            if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == '1' && !vis[r][c]) {
                dfs(r, c, grid, vis);
            }
        }
    }

public:
    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> vis(n, vector<int>(m, 0));

        int ans = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!vis[i][j] && grid[i][j] == '1') {
                    ans++;
                    dfs(i, j, grid, vis);
                }
            }
        }

        return ans;
    }
};
```

```cpp
// BFS
class Solution {
    void bfs(int _i, int _j, vector<vector<char>>& grid, vector<vector<int>>& vis) {
        queue<pair<int, int>> q;
        vis[_i][_j] = 1;
        q.push({_i, _j});
        int n = grid.size();
        int m = grid[0].size();

        while (!q.empty()) {
            int i = q.front().first;
            int j = q.front().second;
            q.pop();

            int dr[] = {-1, 1, 0, 0};
            int dc[] = {0, 0, -1, 1};

            for (int k = 0; k < 4; k++) {
                int r = i + dr[k];
                int c = j + dc[k];

                if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == '1' && !vis[r][c]) {
                    vis[r][c] = 1;
                    q.push({r, c});
                }
            }
        }
    }

public:
    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> vis(n, vector<int>(m, 0));

        int ans = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!vis[i][j] && grid[i][j] == '1') {
                    ans++;
                    bfs(i, j, grid, vis);
                }
            }
        }

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Every cell in the grid is visited at most once.
- **Space Complexity:** `O(M * N)` — For the `vis` matrix and call stack / queue in the worst case.
