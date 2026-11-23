---
title: "Partition Set Into 2 Subsets With Min Absolute Sum Diff"
difficulty: "Hard"
time: "O(N * TotalSum)"
space: "O(TotalSum)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/minimum-sum-partition3317/1"
  youtube: "https://www.youtube.com/watch?v=GS_OqZb2CWc"
  article: "https://takeuforward.org/data-structure/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum-dp-16/"
---

### Problem Statement

Given an array `arr` of `n` integers, divide it into two sets `S1` and `S2` such that the absolute difference between their sums is minimum and find the minimum difference.

### Examples

```text
Input: arr = [1, 6, 11, 5]
Output: 1
Explanation: Subset 1 = [1, 5, 6], sum = 12. Subset 2 = [11], sum = 11. Absolute difference = 1.

Input: arr = [1, 4]
Output: 3
```

### Intuition

If one subset sum is `s1`, the other is `totalSum - s1`. The absolute difference is `|totalSum - 2 * s1|`. Compute the last row of the Subset Sum DP table for targets from `0` to `totalSum / 2` to find reachable sums.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int currSum, int totalSum, vector<int>& arr) {
        if (idx < 0) {
            return abs((totalSum - currSum) - currSum);
        }
        // Choice 1: include element in subset 1
        int take = solve(idx - 1, currSum + arr[idx], totalSum, arr);
        // Choice 2: exclude element from subset 1
        int notTake = solve(idx - 1, currSum, totalSum, arr);
        return min(take, notTake);
    }
public:
    int minDifference(vector<int>& arr, int n) {
        int totalSum = 0;
        for (int x : arr) {
            totalSum += x;
        }
        return solve(n - 1, 0, totalSum, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int currSum, int totalSum, vector<int>& arr, vector<vector<int>>& dp) {
        if (idx < 0) {
            return abs((totalSum - currSum) - currSum);
        }
        if (dp[idx][currSum] != -1) {
            return dp[idx][currSum];
        }
        int take = solve(idx - 1, currSum + arr[idx], totalSum, arr, dp);
        int notTake = solve(idx - 1, currSum, totalSum, arr, dp);
        return dp[idx][currSum] = min(take, notTake);
    }
public:
    int minDifference(vector<int>& arr, int n) {
        int totalSum = 0;
        for (int x : arr) {
            totalSum += x;
        }
        vector<vector<int>> dp(n, vector<int>(totalSum + 1, -1));
        return solve(n - 1, 0, totalSum, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minDifference(vector<int>& arr, int n) {
        int totalSum = 0;
        for (int x : arr) {
            totalSum += x;
        }
        vector<vector<bool>> dp(n, vector<bool>(totalSum + 1, false));

        for (int i = 0; i < n; i++) {
            dp[i][0] = true;
        }
        if (arr[0] <= totalSum) {
            dp[0][arr[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            for (int t = 1; t <= totalSum; t++) {
                bool notTake = dp[i - 1][t];
                bool take = false;
                if (arr[i] <= t) {
                    take = dp[i - 1][t - arr[i]];
                }
                dp[i][t] = notTake || take;
            }
        }

        // Check achievable sums up to totalSum / 2
        int minDiff = 1e9;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (dp[n - 1][s1]) {
                minDiff = min(minDiff, abs((totalSum - s1) - s1));
            }
        }
        return minDiff;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minDifference(vector<int>& arr, int n) {
        int totalSum = 0;
        for (int x : arr) {
            totalSum += x;
        }
        vector<bool> prev(totalSum + 1, false);

        prev[0] = true;
        if (arr[0] <= totalSum) {
            prev[arr[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            vector<bool> curr(totalSum + 1, false);
            curr[0] = true;
            for (int t = 1; t <= totalSum; t++) {
                bool notTake = prev[t];
                bool take = false;
                if (arr[i] <= t) {
                    take = prev[t - arr[i]];
                }
                curr[t] = notTake || take;
            }
            prev = curr;
        }

        int minDiff = 1e9;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (prev[s1]) {
                minDiff = min(minDiff, abs((totalSum - s1) - s1));
            }
        }
        return minDiff;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * TotalSum)
- **Space Complexity:** O(TotalSum)
