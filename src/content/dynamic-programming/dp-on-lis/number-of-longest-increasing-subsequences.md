---
title: "Number of Longest Increasing Subsequences"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/"
  youtube: "https://www.youtube.com/watch?v=cKVl1v9Si08"
  article: "https://takeuforward.org/data-structure/number-of-longest-increasing-subsequences-dp-47/"
---

### Problem Statement

Given an integer array `nums`, return the number of longest strictly increasing subsequences.

### Examples

```text
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Input: nums = [2,2,2,2,2]
Output: 5
```

### Intuition

Maintain two 1D arrays: `dp[i]` (length of LIS ending at `i`) and `cnt[i]` (number of such LIS ending at `i`). When `nums[prev] < nums[i]`: if `1 + dp[prev] > dp[i]`, update `dp[i]` and set `cnt[i] = cnt[prev]`; if `1 + dp[prev] == dp[i]`, accumulate `cnt[i] += cnt[prev]`.

### Code

```cpp
// Recursion
class Solution {
private:
    pair<int, int> solve(int i, vector<int>& nums) {
        int maxLen = 1;
        int count = 1;
        for (int prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                auto [len, ways] = solve(prev, nums);
                if (len + 1 > maxLen) {
                    maxLen = len + 1;
                    count = ways;
                } else if (len + 1 == maxLen) {
                    count += ways;
                }
            }
        }
        return {maxLen, count};
    }
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        int globalMax = 0, totalWays = 0;
        for (int i = 0; i < n; i++) {
            auto [len, ways] = solve(i, nums);
            if (len > globalMax) {
                globalMax = len;
                totalWays = ways;
            } else if (len == globalMax) {
                totalWays += ways;
            }
        }
        return totalWays;
    }
};
```

```cpp
// Memoization
class Solution {
private:
    pair<int, int> solve(int i, vector<int>& nums, vector<pair<int, int>>& dp) {
        if (dp[i].first != -1) return dp[i];
        int maxLen = 1;
        int count = 1;
        for (int prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                auto [len, ways] = solve(prev, nums, dp);
                if (len + 1 > maxLen) {
                    maxLen = len + 1;
                    count = ways;
                } else if (len + 1 == maxLen) {
                    count += ways;
                }
            }
        }
        return dp[i] = {maxLen, count};
    }
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<pair<int, int>> dp(n, {-1, -1});
        int globalMax = 0, totalWays = 0;
        for (int i = 0; i < n; i++) {
            auto [len, ways] = solve(i, nums, dp);
            if (len > globalMax) {
                globalMax = len;
                totalWays = ways;
            } else if (len == globalMax) {
                totalWays += ways;
            }
        }
        return totalWays;
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        vector<int> cnt(n, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    if (dp[prev] + 1 > dp[i]) {
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = max(maxLen, dp[i]);
        }

        int totalWays = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalWays += cnt[i];
            }
        }
        return totalWays;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        vector<int> cnt(n, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    if (dp[prev] + 1 > dp[i]) {
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = max(maxLen, dp[i]);
        }

        int totalWays = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalWays += cnt[i];
            }
        }
        return totalWays;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
