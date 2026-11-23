---
title: "Grid Unique Paths"
difficulty: "Medium"
time: "O(M * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/unique-paths/"
  youtube: "https://www.youtube.com/watch?v=sdE0A2Oxofw"
  article: "https://takeuforward.org/data-structure/grid-unique-paths-count-paths-from-left-top-to-the-right-bottom-of-a-matrix/"
---

### Problem Statement

There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

### Examples

```text
Input: m = 3, n = 7
Output: 28

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

### Intuition

To reach cell `(r, c)`, the robot could have only arrived from the cell directly above `(r - 1, c)` or the cell directly to the left `(r, c - 1)`. Hence, `paths(r, c) = paths(r - 1, c) + paths(r, c - 1)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c) {
        if (r == 0 && c == 0) {
            return 1;
        }
        if (r < 0 || c < 0) {
            return 0;
        }
        // Move from up or from left
        return solve(r - 1, c) + solve(r, c - 1);
    }
public:
    int uniquePaths(int m, int n) {
        return solve(m - 1, n - 1);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c, vector<vector<int>>& dp) {
        if (r == 0 && c == 0) {
            return 1;
        }
        if (r < 0 || c < 0) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        return dp[r][c] = solve(r - 1, c, dp) + solve(r, c - 1, dp);
    }
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return solve(m - 1, n - 1, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 0));
        // Base case: starting point has 1 way
        dp[0][0] = 1;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (r == 0 && c == 0) continue;
                int up = (r > 0) ? dp[r - 1][c] : 0;
                int left = (c > 0) ? dp[r][c - 1] : 0;
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
    int uniquePaths(int m, int n) {
        vector<int> prev(n, 1);

        for (int r = 1; r < m; r++) {
            vector<int> curr(n, 1);
            for (int c = 1; c < n; c++) {
                curr[c] = prev[c] + curr[c - 1];
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
