---
title: "Rotting Oranges"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/rotting-oranges/"
  gfg: "https://practice.geeksforgeeks.org/problems/rotten-oranges2536/1"
  youtube: "https://www.youtube.com/watch?v=yf3oUhkvqA0"
  article: "https://takeuforward.org/data-structure/rotten-oranges-bfs/"
---

### Problem Statement

You are given an `m x n` grid where each cell can have one of three values:
- `0` representing an empty cell,
- `1` representing a fresh orange, or
- `2` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.

**Example 1:**
```text
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

**Example 2:**
```text
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner is never rotten, because rotting only happens 4-directionally.
```

**Example 3:**
```text
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

---

### Intuition

This is a classic multi-source BFS problem. All initially rotten oranges start rotting fresh neighbors simultaneously at minute 0. We push all initial rotten oranges into a queue, keep track of elapsed time, and count fresh oranges to verify all were reached.

---

### Code

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int time = 0;
        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        while (!q.empty() && fresh > 0) {
            int sz = q.size();
            time++;
            while (sz--) {
                auto [r, c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }

        return fresh == 0 ? time : -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Each cell is visited at most once.
- **Space Complexity:** `O(M * N)` — Queue holds at most `M * N` cells.
