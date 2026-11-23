---
title: "Matrix Chain Multiplication"
difficulty: "Hard"
time: "O(N^3)"
space: "O(N^2)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1"
  youtube: "https://www.youtube.com/watch?v=vRVfmbCFW7Y"
  article: "https://takeuforward.org/data-structure/matrix-chain-multiplication-dp-48/"
---

### Problem Statement

Given a sequence of matrices, find the most efficient way to multiply these matrices together. The problem is not actually to perform the multiplications, but merely to decide in which order to perform the multiplications. You are given an array `arr` of dimensions where matrix `i` has dimension `arr[i-1] x arr[i]`.

### Examples

```text
Input: arr = [40, 20, 30, 10, 30]
Output: 26000
Explanation: There are 4 matrices of dimensions 40x20, 20x30, 30x10, 10x30. Optimal grouping yields 26,000 multiplications.

Input: arr = [10, 20, 30]
Output: 6000
```

### Intuition

For a chain from index `i` to `j`, partition into two subchains at every possible cut point `k` from `i` to `j - 1`. The cost is `cost(i, k) + cost(k + 1, j) + arr[i - 1] * arr[k] * arr[j]`. Find the minimum across all cuts.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, vector<int>& arr) {
        if (i == j) {
            return 0;
        }
        int minOps = 1e9;
        // Try all possible partition split points k between i and j - 1
        for (int k = i; k < j; k++) {
            int ops = solve(i, k, arr) + solve(k + 1, j, arr) + arr[i - 1] * arr[k] * arr[j];
            minOps = min(minOps, ops);
        }
        return minOps;
    }
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        return solve(1, n - 1, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, vector<int>& arr, vector<vector<int>>& dp) {
        if (i == j) {
            return 0;
        }
        if (dp[i][j] != -1) return dp[i][j];
        int minOps = 1e9;
        for (int k = i; k < j; k++) {
            int ops = solve(i, k, arr, dp) + solve(k + 1, j, arr, dp) + arr[i - 1] * arr[k] * arr[j];
            minOps = min(minOps, ops);
        }
        return dp[i][j] = minOps;
    }
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return solve(1, n - 1, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // i goes from bottom to top, j from left to right
        for (int i = n - 1; i >= 1; i--) {
            for (int j = i + 1; j < n; j++) {
                int minOps = 1e9;
                for (int k = i; k < j; k++) {
                    int ops = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    minOps = min(minOps, ops);
                }
                dp[i][j] = minOps;
            }
        }
        return dp[1][n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int matrixMultiplication(vector<int>& arr) {
        // Since transition requires arbitrary sub-intervals dp[i][k] and dp[k+1][j],
        // the O(N^2) 2D table is the optimal representation
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int i = n - 1; i >= 1; i--) {
            for (int j = i + 1; j < n; j++) {
                int minOps = 1e9;
                for (int k = i; k < j; k++) {
                    int ops = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    minOps = min(minOps, ops);
                }
                dp[i][j] = minOps;
            }
        }
        return dp[1][n - 1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^3)
- **Space Complexity:** O(N^2)
