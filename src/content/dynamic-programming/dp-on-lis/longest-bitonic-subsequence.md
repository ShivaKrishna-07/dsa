---
title: "Longest Bitonic Subsequence"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1"
  youtube: "https://www.youtube.com/watch?v=y4vN0WNdPhg"
  article: "https://takeuforward.org/data-structure/longest-bitonic-subsequence-dp-46/"
---

### Problem Statement

Given an array of positive integers `nums`. A sequence is bitonic if it first increases and then decreases or is entirely increasing or decreasing. Find the maximum length of a bitonic subsequence.

### Examples

```text
Input: nums = [1, 2, 5, 3, 2]
Output: 5
Explanation: The sequence [1, 2, 5, 3, 2] is bitonic with peak 5.

Input: nums = [1, 11, 2, 10, 4, 5, 2, 1]
Output: 6
```

### Intuition

A bitonic subsequence peaks at some index `i`. Compute `dp1[i]` (length of LIS starting from left ending at `i`) and `dp2[i]` (length of LIS starting from right ending at `i`). The maximum bitonic sequence length is `max(dp1[i] + dp2[i] - 1)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solveLeft(int i, vector<int>& nums) {
        int maxLen = 1;
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                maxLen = max(maxLen, 1 + solveLeft(j, nums));
            }
        }
        return maxLen;
    }

    int solveRight(int i, int n, vector<int>& nums) {
        int maxLen = 1;
        for (int j = i + 1; j < n; j++) {
            if (nums[j] < nums[i]) {
                maxLen = max(maxLen, 1 + solveRight(j, n, nums));
            }
        }
        return maxLen;
    }
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int left = solveLeft(i, nums);
            int right = solveRight(i, n, nums);
            // Strict bitonic requires both increasing and decreasing part
            if (left > 1 && right > 1) {
                ans = max(ans, left + right - 1);
            }
        }
        return ans;
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solveLeft(int i, vector<int>& nums, vector<int>& dp) {
        if (dp[i] != -1) return dp[i];
        int maxLen = 1;
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                maxLen = max(maxLen, 1 + solveLeft(j, nums, dp));
            }
        }
        return dp[i] = maxLen;
    }

    int solveRight(int i, int n, vector<int>& nums, vector<int>& dp) {
        if (dp[i] != -1) return dp[i];
        int maxLen = 1;
        for (int j = i + 1; j < n; j++) {
            if (nums[j] < nums[i]) {
                maxLen = max(maxLen, 1 + solveRight(j, n, nums, dp));
            }
        }
        return dp[i] = maxLen;
    }
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        vector<int> dpLeft(n, -1);
        vector<int> dpRight(n, -1);
        int ans = 0;

        for (int i = 0; i < n; i++) {
            int left = solveLeft(i, nums, dpLeft);
            int right = solveRight(i, n, nums, dpRight);
            if (left > 1 && right > 1) {
                ans = max(ans, left + right - 1);
            }
        }
        return ans;
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        vector<int> dp1(n, 1);
        vector<int> dp2(n, 1);

        // LIS from left to right
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i] && 1 + dp1[prev] > dp1[i]) {
                    dp1[i] = 1 + dp1[prev];
                }
            }
        }

        // LIS from right to left
        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i] && 1 + dp2[prev] > dp2[i]) {
                    dp2[i] = 1 + dp2[prev];
                }
            }
        }

        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            if (dp1[i] > 1 && dp2[i] > 1) {
                maxLen = max(maxLen, dp1[i] + dp2[i] - 1);
            }
        }
        return maxLen;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        vector<int> dp1(n, 1);
        vector<int> dp2(n, 1);

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i] && 1 + dp1[prev] > dp1[i]) {
                    dp1[i] = 1 + dp1[prev];
                }
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i] && 1 + dp2[prev] > dp2[i]) {
                    dp2[i] = 1 + dp2[prev];
                }
            }
        }

        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            if (dp1[i] > 1 && dp2[i] > 1) {
                maxLen = max(maxLen, dp1[i] + dp2[i] - 1);
            }
        }
        return maxLen;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
