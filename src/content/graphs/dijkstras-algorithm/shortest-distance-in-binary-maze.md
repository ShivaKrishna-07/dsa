---
title: "Shortest Path in Binary Matrix"
difficulty: "Medium"
time: "O(N * M)"
space: "O(N * M)"
platforms:
  leetcode: "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-path-in-a-binary-maze-1655453161/1"
  youtube: "https://www.youtube.com/watch?v=U5Mw4eyUmw4"
  article: "https://takeuforward.org/data-structure/g-36-shortest-distance-in-a-binary-maze/"
---

### Problem Statement

Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return `-1`.

A clear path is a path from the top-left cell `(0, 0)` to the bottom-right cell `(n - 1, n - 1)` such that:
- All visited cells are `0`.
- All adjacent cells of the path are 8-directionally connected.
- The length of a clear path is the number of visited cells of this path.

**Example 1:**
```text
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**
```text
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**
```text
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
```

---

### Intuition

Since all edges have equal weight (`1`), we can use standard BFS (which is Dijkstra's algorithm simplified for unit weights). Exploring in 8 directions guarantees finding the shortest path first.

---

### Code

```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) return -1;
        if (n == 1) return 1;

        queue<pair<int, int>> q;
        grid[0][0] = 1; // distance
        q.push({0, 0});

        int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};

        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            int d = grid[r][c];

            for (auto& dir : dirs) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    if (nr == n - 1 && nc == n - 1) return d + 1;
                    grid[nr][nc] = d + 1;
                    q.push({nr, nc});
                }
            }
        }
        return -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * N)` — Every cell is processed at most once.
- **Space Complexity:** `O(N * N)` — BFS queue.
