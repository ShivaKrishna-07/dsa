---
title: "House Robber"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/house-robber/"
  youtube: "https://www.youtube.com/watch?v=GrMBrJNk_NY"
  article: "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/"
---

### Problem Statement

You are given an array of integers `nums`. Find the maximum sum of a subsequence such that no two elements in the subsequence are adjacent in the original array.

### Examples

```text
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and rob house 3 (money = 3). Total = 1 + 3 = 4.

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), house 3 (money = 9) and house 5 (money = 1). Total = 2 + 9 + 1 = 12.
```

### Intuition

For each element at index `idx`, we make a choice: pick it (and add to result of `idx - 2`), or do not pick it (and take result of `idx - 1`). Take the maximum of both choices.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, vector<int>& nums) {
        if (idx == 0) {
            return nums[0];
        }
        if (idx < 0) {
            return 0;
        }
        // Choice 1: pick current element and jump to (idx - 2)
        int pick = nums[idx] + solve(idx - 2, nums);
        // Choice 2: skip current element and jump to (idx - 1)
        int notPick = solve(idx - 1, nums);
        return max(pick, notPick);
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        return solve(n - 1, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, vector<int>& nums, vector<int>& dp) {
        if (idx == 0) {
            return nums[0];
        }
        if (idx < 0) {
            return 0;
        }
        if (dp[idx] != -1) {
            return dp[idx];
        }
        int pick = nums[idx] + solve(idx - 2, nums, dp);
        int notPick = solve(idx - 1, nums, dp);
        return dp[idx] = max(pick, notPick);
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, -1);
        return solve(n - 1, nums, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }
        vector<int> dp(n, 0);
        // Base case: only one element to pick
        dp[0] = nums[0];

        for (int i = 1; i < n; i++) {
            int pick = nums[i];
            if (i > 1) {
                pick += dp[i - 2];
            }
            int notPick = dp[i - 1];
            dp[i] = max(pick, notPick);
        }
        return dp[n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        int prev2 = 0;
        int prev = nums[0];

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int curr = max(pick, notPick);
            prev2 = prev;
            prev = curr;
        }
        return prev;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
