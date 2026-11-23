---
title: "Minimum Falling Path Sum"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-falling-path-sum/"
  youtube: "https://www.youtube.com/watch?v=N_aJ5qQbYA0"
  article: "https://takeuforward.org/data-structure/minimum-maximum-falling-path-sum-dp-12/"
---

### Problem Statement

Given an `n x n` array of integers `matrix`, return the minimum sum of any falling path through `matrix`. A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right (i.e. `(row + 1, col - 1)`, `(row + 1, col)`, or `(row + 1, col + 1)`).

### Examples

```text
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: Falling path [1, 5, 7] or [1, 4, 8] gives sum 13.

Input: matrix = [[-19,57],[-40,-5]]
Output: -59
```

### Intuition

From any cell `(r, c)`, the element came from `(r - 1, c - 1)`, `(r - 1, c)`, or `(r - 1, c + 1)`. We take the minimum among all three valid parents plus `matrix[r][c]`. The answer is the minimum in the last row.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c, int n, vector<vector<int>>& matrix) {
        if (c < 0 || c >= n) {
            return 1e9;
        }
        if (r == 0) {
            return matrix[0][c];
        }
        // 3 possible upward sources: diagonally left, straight up, diagonally right
        int upLeft = solve(r - 1, c - 1, n, matrix);
        int up = solve(r - 1, c, n, matrix);
        int upRight = solve(r - 1, c + 1, n, matrix);
        return matrix[r][c] + min({upLeft, up, upRight});
    }
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int ans = 1e9;
        for (int c = 0; c < n; c++) {
            ans = min(ans, solve(n - 1, c, n, matrix));
        }
        return ans;
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c, int n, vector<vector<int>>& matrix, vector<vector<int>>& dp) {
        if (c < 0 || c >= n) {
            return 1e9;
        }
        if (r == 0) {
            return matrix[0][c];
        }
        if (dp[r][c] != -1e9) {
            return dp[r][c];
        }
        int upLeft = solve(r - 1, c - 1, n, matrix, dp);
        int up = solve(r - 1, c, n, matrix, dp);
        int upRight = solve(r - 1, c + 1, n, matrix, dp);
        return dp[r][c] = matrix[r][c] + min({upLeft, up, upRight});
    }
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n, -1e9));
        int ans = 1e9;
        for (int c = 0; c < n; c++) {
            ans = min(ans, solve(n - 1, c, n, matrix, dp));
        }
        return ans;
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // Base case: row 0 initialization
        for (int c = 0; c < n; c++) {
            dp[0][c] = matrix[0][c];
        }

        for (int r = 1; r < n; r++) {
            for (int c = 0; c < n; c++) {
                int up = dp[r - 1][c];
                int upLeft = (c > 0) ? dp[r - 1][c - 1] : 1e9;
                int upRight = (c + 1 < n) ? dp[r - 1][c + 1] : 1e9;
                dp[r][c] = matrix[r][c] + min({up, upLeft, upRight});
            }
        }

        int ans = dp[n - 1][0];
        for (int c = 1; c < n; c++) {
            ans = min(ans, dp[n - 1][c]);
        }
        return ans;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> prev(n, 0);

        for (int c = 0; c < n; c++) {
            prev[c] = matrix[0][c];
        }

        for (int r = 1; r < n; r++) {
            vector<int> curr(n, 0);
            for (int c = 0; c < n; c++) {
                int up = prev[c];
                int upLeft = (c > 0) ? prev[c - 1] : 1e9;
                int upRight = (c + 1 < n) ? prev[c + 1] : 1e9;
                curr[c] = matrix[r][c] + min({up, upLeft, upRight});
            }
            prev = curr;
        }

        int ans = prev[0];
        for (int c = 1; c < n; c++) {
            ans = min(ans, prev[c]);
        }
        return ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
