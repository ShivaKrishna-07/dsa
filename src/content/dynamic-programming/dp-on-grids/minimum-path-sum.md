---
title: "Minimum Path Sum"
difficulty: "Medium"
time: "O(M * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-path-sum/"
  youtube: "https://www.youtube.com/watch?v=_rgTlyky1uQ"
  article: "https://takeuforward.org/data-structure/minimum-path-sum-in-a-grid-dp-10/"
---

### Problem Statement

Given an `m x n` grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.

### Examples

```text
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

### Intuition

To arrive at `(r, c)`, the cost is `grid[r][c]` plus the minimum path sum between arriving from above `(r - 1, c)` or from left `(r, c - 1)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c, vector<vector<int>>& grid) {
        if (r == 0 && c == 0) {
            return grid[0][0];
        }
        if (r < 0 || c < 0) {
            return 1e9;
        }
        int up = solve(r - 1, c, grid);
        int left = solve(r, c - 1, grid);
        return grid[r][c] + min(up, left);
    }
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        return solve(m - 1, n - 1, grid);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c, vector<vector<int>>& grid, vector<vector<int>>& dp) {
        if (r == 0 && c == 0) {
            return grid[0][0];
        }
        if (r < 0 || c < 0) {
            return 1e9;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int up = solve(r - 1, c, grid, dp);
        int left = solve(r, c - 1, grid, dp);
        return dp[r][c] = grid[r][c] + min(up, left);
    }
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return solve(m - 1, n - 1, grid, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (r == 0 && c == 0) {
                    dp[r][c] = grid[r][c];
                } else {
                    int up = (r > 0) ? dp[r - 1][c] : 1e9;
                    int left = (c > 0) ? dp[r][c - 1] : 1e9;
                    dp[r][c] = grid[r][c] + min(up, left);
                }
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
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<int> prev(n, 0);

        for (int r = 0; r < m; r++) {
            vector<int> curr(n, 0);
            for (int c = 0; c < n; c++) {
                if (r == 0 && c == 0) {
                    curr[c] = grid[0][0];
                } else {
                    int up = (r > 0) ? prev[c] : 1e9;
                    int left = (c > 0) ? curr[c - 1] : 1e9;
                    curr[c] = grid[r][c] + min(up, left);
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
