---
title: "Burst Balloons"
difficulty: "Hard"
time: "O(N^3)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/burst-balloons/"
  youtube: "https://www.youtube.com/watch?v=Yz4LlDSlkns"
  article: "https://takeuforward.org/data-structure/burst-balloons-partition-dp-dp-51/"
---

### Problem Statement

You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons. If you burst balloon `i` you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds, treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.

### Examples

```text
Input: nums = [3,1,5,8]
Output: 167
Explanation: nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167.

Input: nums = [1,5]
Output: 10
```

### Intuition

Instead of thinking which balloon to burst first (which connects previously independent subproblems), think which balloon `k` to burst LAST in the range `[i, j]`. When balloon `k` is burst last, its neighbors are `nums[i - 1]` and `nums[j + 1]`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, vector<int>& nums) {
        if (i > j) {
            return 0;
        }
        int maxCoins = INT_MIN;
        // Assume balloon k is the LAST to burst in range [i, j]
        for (int k = i; k <= j; k++) {
            int coins = nums[i - 1] * nums[k] * nums[j + 1] + solve(i, k - 1, nums) + solve(k + 1, j, nums);
            maxCoins = max(maxCoins, coins);
        }
        return maxCoins;
    }
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.push_back(1);
        nums.insert(nums.begin(), 1);
        return solve(1, n, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, vector<int>& nums, vector<vector<int>>& dp) {
        if (i > j) {
            return 0;
        }
        if (dp[i][j] != -1) return dp[i][j];
        int maxCoins = INT_MIN;
        for (int k = i; k <= j; k++) {
            int coins = nums[i - 1] * nums[k] * nums[j + 1] + solve(i, k - 1, nums, dp) + solve(k + 1, j, nums, dp);
            maxCoins = max(maxCoins, coins);
        }
        return dp[i][j] = maxCoins;
    }
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.push_back(1);
        nums.insert(nums.begin(), 1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, -1));
        return solve(1, n, nums, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.push_back(1);
        nums.insert(nums.begin(), 1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n; j++) {
                if (i > j) continue;
                int maxCoins = INT_MIN;
                for (int k = i; k <= j; k++) {
                    int coins = nums[i - 1] * nums[k] * nums[j + 1] + dp[i][k - 1] + dp[k + 1][j];
                    maxCoins = max(maxCoins, coins);
                }
                dp[i][j] = maxCoins;
            }
        }
        return dp[1][n];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        // Range DP table requires 2D matrix
        int n = nums.size();
        nums.push_back(1);
        nums.insert(nums.begin(), 1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n; j++) {
                if (i > j) continue;
                int maxCoins = INT_MIN;
                for (int k = i; k <= j; k++) {
                    int coins = nums[i - 1] * nums[k] * nums[j + 1] + dp[i][k - 1] + dp[k + 1][j];
                    maxCoins = max(maxCoins, coins);
                }
                dp[i][j] = maxCoins;
            }
        }
        return dp[1][n];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^3)
- **Space Complexity:** O(N^2)
