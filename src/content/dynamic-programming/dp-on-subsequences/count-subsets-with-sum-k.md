---
title: "Count Subsets with Sum K"
difficulty: "Medium"
time: "O(N * K)"
space: "O(K)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/perfect-sum-problem5633/1"
  youtube: "https://www.youtube.com/watch?v=ZHyb-A2Mte4"
  article: "https://takeuforward.org/data-structure/count-subsets-with-sum-k-dp-17/"
---

### Problem Statement

Given an array `arr` of non-negative integers and an integer `target`, count the number of subsets with sum equal to `target`. Since the answer may be very large, compute it modulo `10^9 + 7`.

### Examples

```text
Input: arr = [5, 2, 3, 10, 6, 8], target = 10
Output: 3
Explanation: Subsets with sum 10 are [5, 2, 3], [10], and [2, 8].

Input: arr = [2, 5, 1, 4, 3], target = 10
Output: 3
```

### Intuition

Sum the number of subsets formed by excluding the element and the number of subsets formed by including the element. Note that zeros in the array double the number of subsets for each zero present.

### Code

```cpp
// Recursion
class Solution {
private:
    const int MOD = 1e9 + 7;
    int solve(int idx, int sum, vector<int>& arr) {
        if (idx == 0) {
            // If element is 0 and sum is 0, both picking and not picking give sum 0 (2 ways)
            if (sum == 0 && arr[0] == 0) return 2;
            if (sum == 0 || sum == arr[0]) return 1;
            return 0;
        }
        int notTake = solve(idx - 1, sum, arr);
        int take = 0;
        if (arr[idx] <= sum) {
            take = solve(idx - 1, sum - arr[idx], arr);
        }
        return (notTake + take) % MOD;
    }
public:
    int perfectSum(vector<int>& arr, int target) {
        int n = arr.size();
        return solve(n - 1, target, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    const int MOD = 1e9 + 7;
    int solve(int idx, int sum, vector<int>& arr, vector<vector<int>>& dp) {
        if (idx == 0) {
            if (sum == 0 && arr[0] == 0) return 2;
            if (sum == 0 || sum == arr[0]) return 1;
            return 0;
        }
        if (dp[idx][sum] != -1) {
            return dp[idx][sum];
        }
        int notTake = solve(idx - 1, sum, arr, dp);
        int take = 0;
        if (arr[idx] <= sum) {
            take = solve(idx - 1, sum - arr[idx], arr, dp);
        }
        return dp[idx][sum] = (notTake + take) % MOD;
    }
public:
    int perfectSum(vector<int>& arr, int target) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(target + 1, -1));
        return solve(n - 1, target, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int perfectSum(vector<int>& arr, int target) {
        int n = arr.size();
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n, vector<int>(target + 1, 0));

        // Base cases at index 0 handling elements that might be 0
        if (arr[0] == 0) {
            dp[0][0] = 2;
        } else {
            dp[0][0] = 1;
        }
        if (arr[0] != 0 && arr[0] <= target) {
            dp[0][arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            for (int sum = 0; sum <= target; sum++) {
                int notTake = dp[i - 1][sum];
                int take = 0;
                if (arr[i] <= sum) {
                    take = dp[i - 1][sum - arr[i]];
                }
                dp[i][sum] = (notTake + take) % MOD;
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
    int perfectSum(vector<int>& arr, int target) {
        int n = arr.size();
        const int MOD = 1e9 + 7;
        vector<int> prev(target + 1, 0);

        if (arr[0] == 0) {
            prev[0] = 2;
        } else {
            prev[0] = 1;
        }
        if (arr[0] != 0 && arr[0] <= target) {
            prev[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            vector<int> curr(target + 1, 0);
            for (int sum = 0; sum <= target; sum++) {
                int notTake = prev[sum];
                int take = 0;
                if (arr[i] <= sum) {
                    take = prev[sum - arr[i]];
                }
                curr[sum] = (notTake + take) % MOD;
            }
            prev = curr;
        }
        return prev[target];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * K)
- **Space Complexity:** O(K)
