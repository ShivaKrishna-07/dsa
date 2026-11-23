---
title: "Rod Cutting Problem"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/rod-cutting0840/1"
  youtube: "https://www.youtube.com/watch?v=mO8XnP_4fz4"
  article: "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/"
---

### Problem Statement

Given a rod of length `n` inches and an array of prices `price`, where `price[i]` represents the price of a piece of length `i + 1`. Determine the maximum value obtainable by cutting up the rod and selling the pieces.

### Examples

```text
Input: price = [1, 5, 8, 9, 10, 17, 17, 20]
Output: 22
Explanation: Cut rod of length 8 into two pieces of length 2 and 6 with value 5 + 17 = 22.

Input: price = [3, 5, 8, 9, 10, 17, 17, 20]
Output: 24
```

### Intuition

This is an unbounded knapsack problem where items are rod piece lengths `1, 2, ..., n`, weights are the piece lengths themselves, and the bag capacity is the initial rod length `n`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int length, vector<int>& price) {
        if (idx == 0) {
            // Pieces of length 1
            return length * price[0];
        }
        int notTake = solve(idx - 1, length, price);
        int take = 0;
        int rodLen = idx + 1;
        if (rodLen <= length) {
            take = price[idx] + solve(idx, length - rodLen, price);
        }
        return max(notTake, take);
    }
public:
    int cutRod(vector<int>& price) {
        int n = price.size();
        return solve(n - 1, n, price);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int length, vector<int>& price, vector<vector<int>>& dp) {
        if (idx == 0) {
            return length * price[0];
        }
        if (dp[idx][length] != -1) return dp[idx][length];
        int notTake = solve(idx - 1, length, price, dp);
        int take = 0;
        int rodLen = idx + 1;
        if (rodLen <= length) {
            take = price[idx] + solve(idx, length - rodLen, price, dp);
        }
        return dp[idx][length] = max(notTake, take);
    }
public:
    int cutRod(vector<int>& price) {
        int n = price.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        return solve(n - 1, n, price, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int cutRod(vector<int>& price) {
        int n = price.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, 0));

        // Base case: length 1 pieces
        for (int len = 0; len <= n; len++) {
            dp[0][len] = len * price[0];
        }

        for (int i = 1; i < n; i++) {
            for (int len = 0; len <= n; len++) {
                int notTake = dp[i - 1][len];
                int take = 0;
                int rodLen = i + 1;
                if (rodLen <= len) {
                    take = price[i] + dp[i][len - rodLen];
                }
                dp[i][len] = max(notTake, take);
            }
        }
        return dp[n - 1][n];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int cutRod(vector<int>& price) {
        int n = price.size();
        vector<int> prev(n + 1, 0);

        for (int len = 0; len <= n; len++) {
            prev[len] = len * price[0];
        }

        for (int i = 1; i < n; i++) {
            for (int len = 0; len <= n; len++) {
                int notTake = prev[len];
                int take = 0;
                int rodLen = i + 1;
                if (rodLen <= len) {
                    take = price[i] + prev[len - rodLen];
                }
                prev[len] = max(notTake, take);
            }
        }
        return prev[n];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
