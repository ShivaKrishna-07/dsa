---
title: "Count Partitions with Given Difference"
difficulty: "Medium"
time: "O(N * Target)"
space: "O(Target)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1"
  youtube: "https://www.youtube.com/watch?v=zoilQD1kYSg"
  article: "https://takeuforward.org/data-structure/partitions-with-given-difference-dp-18/"
---

### Problem Statement

Given an array `arr` of `n` integers and an integer `d`, count the number of partitions of `arr` into two subsets `S1` and `S2` such that `sum(S1) - sum(S2) = d` and `sum(S1) >= sum(S2)`. Return the answer modulo `10^9 + 7`.

### Examples

```text
Input: arr = [5, 2, 6, 4], d = 3
Output: 1
Explanation: Subset partition is [6, 4] and [5, 2]. Sums are 10 and 7. Difference is 3.

Input: arr = [1, 1, 1, 1], d = 0
Output: 6
```

### Intuition

`S1 + S2 = totalSum` and `S1 - S2 = d`. Adding both yields `2 * S1 = totalSum + d` -> `S1 = (totalSum + d) / 2`. The problem reduces to counting subsets with target sum `S1`. If `totalSum - d < 0` or `(totalSum + d) % 2 != 0`, return 0.

### Code

```cpp
// Recursion
class Solution {
private:
    const int MOD = 1e9 + 7;
    int solve(int idx, int target, vector<int>& arr) {
        if (idx == 0) {
            if (target == 0 && arr[0] == 0) return 2;
            if (target == 0 || target == arr[0]) return 1;
            return 0;
        }
        int notTake = solve(idx - 1, target, arr);
        int take = 0;
        if (arr[idx] <= target) {
            take = solve(idx - 1, target - arr[idx], arr);
        }
        return (notTake + take) % MOD;
    }
public:
    int countPartitions(int n, int d, vector<int>& arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total - d < 0 || (total - d) % 2 != 0) return 0;
        int target = (total - d) / 2;
        return solve(n - 1, target, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    const int MOD = 1e9 + 7;
    int solve(int idx, int target, vector<int>& arr, vector<vector<int>>& dp) {
        if (idx == 0) {
            if (target == 0 && arr[0] == 0) return 2;
            if (target == 0 || target == arr[0]) return 1;
            return 0;
        }
        if (dp[idx][target] != -1) return dp[idx][target];
        int notTake = solve(idx - 1, target, arr, dp);
        int take = 0;
        if (arr[idx] <= target) {
            take = solve(idx - 1, target - arr[idx], arr, dp);
        }
        return dp[idx][target] = (notTake + take) % MOD;
    }
public:
    int countPartitions(int n, int d, vector<int>& arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total - d < 0 || (total - d) % 2 != 0) return 0;
        int target = (total - d) / 2;
        vector<vector<int>> dp(n, vector<int>(target + 1, -1));
        return solve(n - 1, target, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int countPartitions(int n, int d, vector<int>& arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total - d < 0 || (total - d) % 2 != 0) return 0;
        int target = (total - d) / 2;
        const int MOD = 1e9 + 7;

        vector<vector<int>> dp(n, vector<int>(target + 1, 0));
        if (arr[0] == 0) {
            dp[0][0] = 2;
        } else {
            dp[0][0] = 1;
        }
        if (arr[0] != 0 && arr[0] <= target) {
            dp[0][arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            for (int t = 0; t <= target; t++) {
                int notTake = dp[i - 1][t];
                int take = 0;
                if (arr[i] <= t) {
                    take = dp[i - 1][t - arr[i]];
                }
                dp[i][t] = (notTake + take) % MOD;
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
    int countPartitions(int n, int d, vector<int>& arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total - d < 0 || (total - d) % 2 != 0) return 0;
        int target = (total - d) / 2;
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
            for (int t = 0; t <= target; t++) {
                int notTake = prev[t];
                int take = 0;
                if (arr[i] <= t) {
                    take = prev[t - arr[i]];
                }
                curr[t] = (notTake + take) % MOD;
            }
            prev = curr;
        }
        return prev[target];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * Target)
- **Space Complexity:** O(Target)
