---
title: "Rotting Oranges"
difficulty: "Medium"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/rotting-oranges/"
  youtube: "https://www.youtube.com/results?search_query=Rotting+Oranges"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/rotting-oranges"
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
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> vis(n, vector<int>(m));
        // Queue stores {{row, col}, time}
        queue<pair<pair<int, int>, int>> q;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 2) {
                    q.push({{i, j}, 0});
                    vis[i][j] = 1;
                } else {
                    vis[i][j] = 0;
                }
            }
        }

        int drow[4] = {-1, 0, 1, 0};
        int dcol[4] = {0, 1, 0, -1};
        int maxTime = 0;

        while (!q.empty()) {
            int r = q.front().first.first;
            int c = q.front().first.second;
            int t = q.front().second;
            q.pop();
            maxTime = max(maxTime, t);

            for (int i = 0; i < 4; i++) {
                int nrow = r + drow[i];
                int ncol = c + dcol[i];

                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && vis[nrow][ncol] != 1 && grid[nrow][ncol] == 1) {
                    // Rot adjacent orange and push with incremented time
                    q.push({{nrow, ncol}, t + 1});
                    vis[nrow][ncol] = 1;
                }
            }
        }

        // Check if any fresh orange could not be reached
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (vis[i][j] != 1 && grid[i][j] == 1) {
                    return -1;
                }
            }
        }

        return maxTime;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Each cell is visited at most once.
- **Space Complexity:** `O(M * N)` — Queue holds at most `M * N` cells.
