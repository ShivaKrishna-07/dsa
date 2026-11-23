---
title: "Triangle"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/triangle/"
  youtube: "https://www.youtube.com/watch?v=SrP-PiLSYC0"
  article: "https://takeuforward.org/data-structure/minimum-path-sum-in-triangular-grid-dp-11/"
---

### Problem Statement

Given a `triangle` array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.

### Examples

```text
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The path 2 -> 3 -> 5 -> 1 yields minimum path sum of 11.

Input: triangle = [[-10]]
Output: -10
```

### Intuition

Starting at the top cell `(0,0)`, we can branch down to `(r + 1, c)` or `(r + 1, c + 1)`. In bottom-up DP, we start from the base row (bottom) and bubble minimum sums upward to `(0,0)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c, int n, vector<vector<int>>& triangle) {
        if (r == n - 1) {
            return triangle[n - 1][c];
        }
        // Either move directly down (r + 1, c) or diagonally (r + 1, c + 1)
        int down = solve(r + 1, c, n, triangle);
        int diag = solve(r + 1, c + 1, n, triangle);
        return triangle[r][c] + min(down, diag);
    }
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        return solve(0, 0, n, triangle);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c, int n, vector<vector<int>>& triangle, vector<vector<int>>& dp) {
        if (r == n - 1) {
            return triangle[n - 1][c];
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int down = solve(r + 1, c, n, triangle, dp);
        int diag = solve(r + 1, c + 1, n, triangle, dp);
        return dp[r][c] = triangle[r][c] + min(down, diag);
    }
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return solve(0, 0, n, triangle, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // Base case: bottom row values remain as initialized
        for (int c = 0; c < n; c++) {
            dp[n - 1][c] = triangle[n - 1][c];
        }

        // Fill from second-to-last row upwards
        for (int r = n - 2; r >= 0; r--) {
            for (int c = r; c >= 0; c--) {
                int down = dp[r + 1][c];
                int diag = dp[r + 1][c + 1];
                dp[r][c] = triangle[r][c] + min(down, diag);
            }
        }
        return dp[0][0];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> prev(n, 0);

        for (int c = 0; c < n; c++) {
            prev[c] = triangle[n - 1][c];
        }

        for (int r = n - 2; r >= 0; r--) {
            vector<int> curr(r + 1, 0);
            for (int c = 0; c <= r; c++) {
                int down = prev[c];
                int diag = prev[c + 1];
                curr[c] = triangle[r][c] + min(down, diag);
            }
            prev = curr;
        }
        return prev[0];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
