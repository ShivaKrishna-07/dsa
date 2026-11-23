---
title: "Frog Jump with K Distances"
difficulty: "Medium"
time: "O(N * K)"
space: "O(K)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/minimal-cost/1"
  youtube: "https://www.youtube.com/watch?v=Kmh3645ocGQ"
  article: "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/"
---

### Problem Statement

This is a follow-up of the Frog Jump problem. The frog can jump up to `k` steps at a time (i.e. `1, 2, ..., k` steps). Find the minimum total energy consumed to reach stair `n - 1` from stair `0`.

### Examples

```text
Input: k = 3, heights = [10, 30, 40, 50, 20]
Output: 30
Explanation: Jump from index 0 -> 1 -> 4: |10-30| + |30-20| = 20 + 10 = 30.

Input: k = 1, heights = [10, 20, 10]
Output: 20
```

### Intuition

Instead of checking only 1 or 2 steps backward, check all jumps `j` from `1` to `k` steps backward from the current index, taking the minimum across all valid jumps.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int k, vector<int>& heights) {
        if (idx == 0) {
            return 0;
        }
        int minSteps = INT_MAX;
        // Try all jumps of size 1 to k
        for (int j = 1; j <= k; j++) {
            if (idx - j >= 0) {
                int jump = solve(idx - j, k, heights) + abs(heights[idx] - heights[idx - j]);
                minSteps = min(minSteps, jump);
            }
        }
        return minSteps;
    }
public:
    int minimizeCost(int k, vector<int>& heights) {
        int n = heights.size();
        return solve(n - 1, k, heights);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int k, vector<int>& heights, vector<int>& dp) {
        if (idx == 0) {
            return 0;
        }
        if (dp[idx] != -1) {
            return dp[idx];
        }
        int minSteps = INT_MAX;
        // Check all valid backward jumps up to k
        for (int j = 1; j <= k; j++) {
            if (idx - j >= 0) {
                int jump = solve(idx - j, k, heights, dp) + abs(heights[idx] - heights[idx - j]);
                minSteps = min(minSteps, jump);
            }
        }
        return dp[idx] = minSteps;
    }
public:
    int minimizeCost(int k, vector<int>& heights) {
        int n = heights.size();
        vector<int> dp(n, -1);
        return solve(n - 1, k, heights, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minimizeCost(int k, vector<int>& heights) {
        int n = heights.size();
        vector<int> dp(n, INT_MAX);
        // Base case: starting at index 0 costs 0
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k; j++) {
                if (i - j >= 0) {
                    int jump = dp[i - j] + abs(heights[i] - heights[i - j]);
                    dp[i] = min(dp[i], jump);
                }
            }
        }
        return dp[n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minimizeCost(int k, vector<int>& heights) {
        int n = heights.size();
        // Maintain a sliding window of the last k answers
        vector<int> dp(min(n, k), 0);

        for (int i = 1; i < n; i++) {
            int minCost = INT_MAX;
            for (int j = 1; j <= k; j++) {
                if (i - j >= 0) {
                    int jump = dp[(i - j) % k] + abs(heights[i] - heights[i - j]);
                    minCost = min(minCost, jump);
                }
            }
            dp[i % k] = minCost;
        }
        return dp[(n - 1) % k];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * K)
- **Space Complexity:** O(K)
