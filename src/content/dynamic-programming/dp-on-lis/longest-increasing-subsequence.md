---
title: "Longest Increasing Subsequence"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/"
  youtube: "https://www.youtube.com/watch?v=ekcwMsSIzVc"
  article: "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/"
---

### Problem Statement

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

### Examples

```text
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Input: nums = [0,1,0,3,2,3]
Output: 4
```

### Intuition

At each element `idx`, we can either skip it, or pick it if `prevIdx == -1` or `nums[idx] > nums[prevIdx]`. In 1D DP, `dp[i]` represents the length of LIS ending at index `i`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int prevIdx, vector<int>& nums) {
        if (idx == nums.size()) {
            return 0;
        }
        int notTake = solve(idx + 1, prevIdx, nums);
        int take = 0;
        // Can take if first element or strictly greater than previously chosen
        if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {
            take = 1 + solve(idx + 1, idx, nums);
        }
        return max(notTake, take);
    }
public:
    int lengthOfLIS(vector<int>& nums) {
        return solve(0, -1, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int prevIdx, vector<int>& nums, vector<vector<int>>& dp) {
        if (idx == nums.size()) {
            return 0;
        }
        // Offset prevIdx by +1 to store -1 at index 0
        if (dp[idx][prevIdx + 1] != -1) {
            return dp[idx][prevIdx + 1];
        }
        int notTake = solve(idx + 1, prevIdx, nums, dp);
        int take = 0;
        if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {
            take = 1 + solve(idx + 1, idx, nums, dp);
        }
        return dp[idx][prevIdx + 1] = max(notTake, take);
    }
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        return solve(0, -1, nums, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        int maxLen = 1;

        // dp[i] = length of LIS ending at index i
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp[i] = max(dp[i], 1 + dp[prev]);
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        return maxLen;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> next(n + 1, 0);
        vector<int> curr(n + 1, 0);

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int prev = idx - 1; prev >= -1; prev--) {
                int notTake = next[prev + 1];
                int take = 0;
                if (prev == -1 || nums[idx] > nums[prev]) {
                    take = 1 + next[idx + 1];
                }
                curr[prev + 1] = max(notTake, take);
            }
            next = curr;
        }
        return next[0];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
