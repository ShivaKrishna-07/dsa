---
title: "Unique Paths II"
difficulty: "Medium"
time: "O(M * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/unique-paths-ii/"
  youtube: "https://www.youtube.com/watch?v=TmhpgXScLyY"
  article: "https://takeuforward.org/data-structure/grid-unique-paths-2-dp-9/"
---

### Problem Statement

You are given an `m x n` integer array `grid`. There is a robot initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. An obstacle and space are marked as `1` or `0` respectively in `grid`. A path that the robot takes cannot include any square that is an obstacle. Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

### Examples

```text
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

### Intuition

Similar to Grid Unique Paths, but whenever a cell contains an obstacle (`grid[r][c] == 1`), no paths can pass through it, returning `0` paths.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c, vector<vector<int>>& grid) {
        if (r >= 0 && c >= 0 && grid[r][c] == 1) {
            return 0;
        }
        if (r == 0 && c == 0) {
            return 1;
        }
        if (r < 0 || c < 0) {
            return 0;
        }
        return solve(r - 1, c, grid) + solve(r, c - 1, grid);
    }
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        return solve(m - 1, n - 1, obstacleGrid);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c, vector<vector<int>>& grid, vector<vector<int>>& dp) {
        if (r >= 0 && c >= 0 && grid[r][c] == 1) {
            return 0;
        }
        if (r == 0 && c == 0) {
            return 1;
        }
        if (r < 0 || c < 0) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        return dp[r][c] = solve(r - 1, c, grid, dp) + solve(r, c - 1, grid, dp);
    }
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return solve(m - 1, n - 1, obstacleGrid, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) {
            return 0;
        }
        vector<vector<int>> dp(m, vector<int>(n, 0));
        // Base case: starting cell is free
        dp[0][0] = 1;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (obstacleGrid[r][c] == 1) {
                    dp[r][c] = 0;
                    continue;
                }
                if (r == 0 && c == 0) continue;
                long long up = (r > 0) ? dp[r - 1][c] : 0;
                long long left = (c > 0) ? dp[r][c - 1] : 0;
                dp[r][c] = up + left;
            }
        }
        return dp[m - 1][n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        vector<int> prev(n, 0);

        for (int r = 0; r < m; r++) {
            vector<int> curr(n, 0);
            for (int c = 0; c < n; c++) {
                if (obstacleGrid[r][c] == 1) {
                    curr[c] = 0;
                } else if (r == 0 && c == 0) {
                    curr[c] = 1;
                } else {
                    int up = prev[c];
                    int left = (c > 0) ? curr[c - 1] : 0;
                    curr[c] = (long long)up + left;
                }
            }
            prev = curr;
        }
        return prev[n - 1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(M * N)
- **Space Complexity:** O(N)
