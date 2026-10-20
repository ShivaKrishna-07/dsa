---
title: "01 Matrix"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/01-matrix/"
  youtube: "https://www.youtube.com/watch?v=edXdVZ85Il4"
  article: "https://takeuforward.org/data-structure/distance-of-nearest-cell-having-1/"
---

### Problem Statement

Given an `m x n` binary matrix `mat`, return the distance of the nearest `0` for each cell.

The distance between two adjacent cells is `1`.

**Example 1:**
```text
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
```

**Example 2:**
```text
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
```

---

### Intuition

Instead of starting from `1`s and searching for `0`s (which would be slow), we do multi-source BFS starting from all `0`s simultaneously. Distance to `0` starts at `0`, and as BFS spreads level by level to adjacent unvisited cells, their distance is incremented by 1.

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        // Queue stores {row, col} coordinates of 0s for multi-source BFS
        queue<pair<int, int>> q;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    // Update nearest 0 distance for adjacent unvisited cell
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return dist;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Every cell is visited once.
- **Space Complexity:** `O(M * N)` — Distance matrix and queue.
