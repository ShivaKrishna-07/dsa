---
title: "Target Sum"
difficulty: "Medium"
time: "O(N * Target)"
space: "O(Target)"
platforms:
  leetcode: "https://leetcode.com/problems/target-sum/"
  youtube: "https://www.youtube.com/watch?v=b3GD8263-PQ"
  article: "https://takeuforward.org/data-structure/target-sum-dp-21/"
---

### Problem Statement

You are given an integer array `nums` and an integer `target`. You want to build an expression out of nums by adding one of the symbols `+` and `-` before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to `target`.

### Examples

```text
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum 3:
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

### Intuition

Assigning `+` and `-` partitions numbers into two subsets `P` and `N` where `sum(P) - sum(N) = target`. This is identical to the Partitions with Given Difference problem with `d = target`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int target, vector<int>& nums) {
        if (idx == 0) {
            if (target == 0 && nums[0] == 0) return 2;
            if (target == 0 || target == nums[0]) return 1;
            return 0;
        }
        int notTake = solve(idx - 1, target, nums);
        int take = 0;
        if (nums[idx] <= target) {
            take = solve(idx - 1, target - nums[idx], nums);
        }
        return notTake + take;
    }
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = 0;
        for (int x : nums) total += x;
        // target check: sum must be >= target and have same parity
        if (total - target < 0 || (total - target) % 2 != 0) return 0;
        int s = (total - target) / 2;
        int n = nums.size();
        return solve(n - 1, s, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int target, vector<int>& nums, vector<vector<int>>& dp) {
        if (idx == 0) {
            if (target == 0 && nums[0] == 0) return 2;
            if (target == 0 || target == nums[0]) return 1;
            return 0;
        }
        if (dp[idx][target] != -1) return dp[idx][target];
        int notTake = solve(idx - 1, target, nums, dp);
        int take = 0;
        if (nums[idx] <= target) {
            take = solve(idx - 1, target - nums[idx], nums, dp);
        }
        return dp[idx][target] = notTake + take;
    }
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = 0;
        for (int x : nums) total += x;
        if (total - target < 0 || (total - target) % 2 != 0) return 0;
        int s = (total - target) / 2;
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(s + 1, -1));
        return solve(n - 1, s, nums, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = 0;
        for (int x : nums) total += x;
        if (total - target < 0 || (total - target) % 2 != 0) return 0;
        int s = (total - target) / 2;
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(s + 1, 0));

        if (nums[0] == 0) {
            dp[0][0] = 2;
        } else {
            dp[0][0] = 1;
        }
        if (nums[0] != 0 && nums[0] <= s) {
            dp[0][nums[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            for (int t = 0; t <= s; t++) {
                int notTake = dp[i - 1][t];
                int take = 0;
                if (nums[i] <= t) {
                    take = dp[i - 1][t - nums[i]];
                }
                dp[i][t] = notTake + take;
            }
        }
        return dp[n - 1][s];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = 0;
        for (int x : nums) total += x;
        if (total - target < 0 || (total - target) % 2 != 0) return 0;
        int s = (total - target) / 2;
        int n = nums.size();
        vector<int> prev(s + 1, 0);

        if (nums[0] == 0) {
            prev[0] = 2;
        } else {
            prev[0] = 1;
        }
        if (nums[0] != 0 && nums[0] <= s) {
            prev[nums[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            vector<int> curr(s + 1, 0);
            for (int t = 0; t <= s; t++) {
                int notTake = prev[t];
                int take = 0;
                if (nums[i] <= t) {
                    take = prev[t - nums[i]];
                }
                curr[t] = notTake + take;
            }
            prev = curr;
        }
        return prev[s];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * Target)
- **Space Complexity:** O(Target)
