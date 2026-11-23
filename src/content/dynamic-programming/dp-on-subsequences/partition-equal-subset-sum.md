---
title: "Partition Equal Subset Sum"
difficulty: "Medium"
time: "O(N * Sum)"
space: "O(Sum)"
platforms:
  leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/"
  youtube: "https://www.youtube.com/watch?v=7win3BXr83Q"
  article: "https://takeuforward.org/data-structure/partition-equal-subset-sum-dp-15/"
---

### Problem Statement

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.

### Examples

```text
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Input: nums = [1,2,3,5]
Output: false
Explanation: Total sum is 11 (odd), cannot partition equally.
```

### Intuition

If total sum is odd, equal partition is impossible. If even, find if there exists a subset with sum equal to `totalSum / 2` using the Subset Sum DP technique.

### Code

```cpp
// Recursion
class Solution {
private:
    bool solve(int idx, int target, vector<int>& nums) {
        if (target == 0) {
            return true;
        }
        if (idx == 0) {
            return nums[0] == target;
        }
        bool notTake = solve(idx - 1, target, nums);
        bool take = false;
        if (nums[idx] <= target) {
            take = solve(idx - 1, target - nums[idx], nums);
        }
        return notTake || take;
    }
public:
    bool canPartition(vector<int>& nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        // Odd sum cannot be partitioned into two equal integers
        if (total % 2 != 0) {
            return false;
        }
        int target = total / 2;
        int n = nums.size();
        return solve(n - 1, target, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    bool solve(int idx, int target, vector<int>& nums, vector<vector<int>>& dp) {
        if (target == 0) {
            return true;
        }
        if (idx == 0) {
            return nums[0] == target;
        }
        if (dp[idx][target] != -1) {
            return dp[idx][target];
        }
        bool notTake = solve(idx - 1, target, nums, dp);
        bool take = false;
        if (nums[idx] <= target) {
            take = solve(idx - 1, target - nums[idx], nums, dp);
        }
        return dp[idx][target] = notTake || take;
    }
public:
    bool canPartition(vector<int>& nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        if (total % 2 != 0) {
            return false;
        }
        int target = total / 2;
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(target + 1, -1));
        return solve(n - 1, target, nums, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        if (total % 2 != 0) {
            return false;
        }
        int target = total / 2;
        int n = nums.size();
        vector<vector<bool>> dp(n, vector<bool>(target + 1, false));

        for (int i = 0; i < n; i++) {
            dp[i][0] = true;
        }
        if (nums[0] <= target) {
            dp[0][nums[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            for (int t = 1; t <= target; t++) {
                bool notTake = dp[i - 1][t];
                bool take = false;
                if (nums[i] <= t) {
                    take = dp[i - 1][t - nums[i]];
                }
                dp[i][t] = notTake || take;
            }
        }
        return dp[n - 1][target];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        if (total % 2 != 0) {
            return false;
        }
        int target = total / 2;
        int n = nums.size();
        vector<bool> prev(target + 1, false);

        prev[0] = true;
        if (nums[0] <= target) {
            prev[nums[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            vector<bool> curr(target + 1, false);
            curr[0] = true;
            for (int t = 1; t <= target; t++) {
                bool notTake = prev[t];
                bool take = false;
                if (nums[i] <= t) {
                    take = prev[t - nums[i]];
                }
                curr[t] = notTake || take;
            }
            prev = curr;
        }
        return prev[target];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * Sum)
- **Space Complexity:** O(Sum)
