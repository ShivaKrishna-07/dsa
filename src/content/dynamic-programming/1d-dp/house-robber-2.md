---
title: "House Robber II"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/house-robber-ii/"
  youtube: "https://www.youtube.com/watch?v=3WaxQMELSkw"
  article: "https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6/"
---

### Problem Statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Adjacent houses have security systems connected and will contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.

### Examples

```text
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.
```

### Intuition

Since the first and last houses are adjacent, we cannot rob both. Thus, either we exclude the first house and solve for houses `1` to `n - 1`, or we exclude the last house and solve for houses `0` to `n - 2`. The answer is the maximum of these two linear House Robber subproblems.

### Code

```cpp
// Recursion
class Solution {
private:
    int robLinear(int idx, vector<int>& nums, int start) {
        if (idx < start) {
            return 0;
        }
        if (idx == start) {
            return nums[start];
        }
        int pick = nums[idx] + robLinear(idx - 2, nums, start);
        int notPick = robLinear(idx - 1, nums, start);
        return max(pick, notPick);
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }
        // Case 1: leave out first house; Case 2: leave out last house
        return max(robLinear(n - 1, nums, 1), robLinear(n - 2, nums, 0));
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int robLinear(int idx, vector<int>& nums, int start, vector<int>& dp) {
        if (idx < start) {
            return 0;
        }
        if (idx == start) {
            return nums[start];
        }
        if (dp[idx] != -1) {
            return dp[idx];
        }
        int pick = nums[idx] + robLinear(idx - 2, nums, start, dp);
        int notPick = robLinear(idx - 1, nums, start, dp);
        return dp[idx] = max(pick, notPick);
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }
        vector<int> dp1(n, -1);
        vector<int> dp2(n, -1);
        return max(robLinear(n - 1, nums, 1, dp1), robLinear(n - 2, nums, 0, dp2));
    }
};
```

```cpp
// Tabulation
class Solution {
private:
    int robLinear(vector<int>& arr) {
        int m = arr.size();
        if (m == 1) {
            return arr[0];
        }
        vector<int> dp(m, 0);
        // Base case: first house in slice
        dp[0] = arr[0];

        for (int i = 1; i < m; i++) {
            int pick = arr[i];
            if (i > 1) {
                pick += dp[i - 2];
            }
            int notPick = dp[i - 1];
            dp[i] = max(pick, notPick);
        }
        return dp[m - 1];
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }
        vector<int> arr1(nums.begin() + 1, nums.end());
        vector<int> arr2(nums.begin(), nums.end() - 1);
        return max(robLinear(arr1), robLinear(arr2));
    }
};
```

```cpp
// Space Optimization
class Solution {
private:
    int robLinear(int start, int end, vector<int>& nums) {
        int prev2 = 0;
        int prev = 0;

        for (int i = start; i <= end; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int curr = max(pick, notPick);
            prev2 = prev;
            prev = curr;
        }
        return prev;
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }
        // Exclude first vs exclude last house
        return max(robLinear(1, n - 1, nums), robLinear(0, n - 2, nums));
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
