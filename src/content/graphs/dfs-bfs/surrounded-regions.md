---
title: "Surrounded Regions"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/surrounded-regions/"
  gfg: "https://practice.geeksforgeeks.org/problems/replace-os-with-xs0052/1"
  youtube: "https://www.youtube.com/watch?v=BtdgAys4yMk"
  article: "https://takeuforward.org/graph/surrounded-regions-replace-os-with-xs/"
---

### Problem Statement

Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

**Example 1:**
```text
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
```

**Example 2:**
```text
Input: board = [["X"]]
Output: [["X"]]
```

---

### Intuition

Any `'O'` connected to the boundary cannot be surrounded. Start traversals (DFS/BFS) from all boundary `'O'`s and mark them as safe. Then, flip all unmarked `'O'`s to `'X'`.

---

### Code

```cpp
// DFS
class Solution {
    int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
    void dfs(vector<vector<char>>& b, int r, int c, vector<vector<bool>>& safe) {
        safe[r][c] = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < b.size() && nc >= 0 && nc < b[0].size() && b[nr][nc] == 'O' && !safe[nr][nc])
                dfs(b, nr, nc, safe);
        }
    }
public:
    void solve(vector<vector<char>>& b) {
        int m = b.size(), n = b[0].size();
        vector<vector<bool>> safe(m, vector<bool>(n, false));

        for (int i = 0; i < m; i++) {
            if (b[i][0] == 'O' && !safe[i][0]) dfs(b, i, 0, safe);
            if (b[i][n - 1] == 'O' && !safe[i][n - 1]) dfs(b, i, n - 1, safe);
        }
        for (int j = 0; j < n; j++) {
            if (b[0][j] == 'O' && !safe[0][j]) dfs(b, 0, j, safe);
            if (b[m - 1][j] == 'O' && !safe[m - 1][j]) dfs(b, m - 1, j, safe);
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (b[i][j] == 'O' && !safe[i][j]) b[i][j] = 'X';
            }
        }
    }
};
```

```cpp
// BFS
class Solution {
public:
    void solve(vector<vector<char>>& b) {
        int m = b.size(), n = b[0].size();
        vector<vector<bool>> safe(m, vector<bool>(n, false));
        queue<pair<int, int>> q;

        for (int i = 0; i < m; i++) {
            if (b[i][0] == 'O') {
                safe[i][0] = true;
                q.push({i, 0});
            }
            if (b[i][n - 1] == 'O' && !safe[i][n - 1]) {
                safe[i][n - 1] = true;
                q.push({i, n - 1});
            }
        }
        for (int j = 0; j < n; j++) {
            if (b[0][j] == 'O' && !safe[0][j]) {
                safe[0][j] = true;
                q.push({0, j});
            }
            if (b[m - 1][j] == 'O' && !safe[m - 1][j]) {
                safe[m - 1][j] = true;
                q.push({m - 1, j});
            }
        }

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && b[nr][nc] == 'O' && !safe[nr][nc]) {
                    safe[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (b[i][j] == 'O' && !safe[i][j]) b[i][j] = 'X';
            }
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Every cell is visited at most twice.
- **Space Complexity:** `O(M * N)` — Safe matrix and queue/call-stack.
