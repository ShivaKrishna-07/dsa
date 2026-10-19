---
title: "Number of Islands"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  youtube: "https://www.youtube.com/watch?v=muncqlKJrH0"
  leetcode: "https://leetcode.com/problems/number-of-islands/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-islands"
---

### Problem Statement

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

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

---

### Intuition

Traverse the grid. When we find a `'1'`, increment count and run DFS/BFS to mark all connected land cells as visited (flip to `'0'`). Each traversal from an unvisited `'1'` discovers one island.

---

### Code

```cpp
// DFS
class Solution {
    int dx[4] = {-1, 1, 0, 0};
    int dy[4] = {0, 0, -1, 1};

    void dfs(vector<vector<char>>& grid, int i, int j) {
        if(i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() || grid[i][j] == '0') return;
        grid[i][j] = '0';
        for(int d = 0; d < 4; d++) dfs(grid, i + dx[d], j + dy[d]);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int cnt = 0;
        for(int i = 0; i < grid.size(); i++)
            for(int j = 0; j < grid[0].size(); j++)
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    cnt++;
                }
        return cnt;
    }
};
```

```cpp
// BFS
class Solution {
    int dx[4] = {-1, 1, 0, 0};
    int dy[4] = {0, 0, -1, 1};
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size(), cnt = 0;
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(grid[i][j] == '1') {
                    cnt++;
                    queue<pair<int,int>> q;
                    q.push({i, j});
                    grid[i][j] = '0';
                    while(!q.empty()) {
                        auto [r, c] = q.front();
                        q.pop();
                        for(int d = 0; d < 4; d++) {
                            int nr = r + dx[d], nc = c + dy[d];
                            if(nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return cnt;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` every cell visited at most once.
- **Space Complexity:** `O(M * N)` for recursion stack (DFS) or queue (BFS) in worst case.
