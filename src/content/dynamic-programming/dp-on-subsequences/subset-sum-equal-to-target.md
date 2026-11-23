---
title: "Subset Sum Equal To Target"
difficulty: "Medium"
time: "O(N * Target)"
space: "O(Target)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1"
  youtube: "https://www.youtube.com/watch?v=fWX9xDmIzRI"
  article: "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/"
---

### Problem Statement

Given an array of non-negative integers `arr` and an integer `target`, determine if there is a subset of the given array with sum equal to `target`.

### Examples

```text
Input: arr = [3, 34, 4, 12, 5, 2], target = 9
Output: true
Explanation: The subset [4, 5] has sum 9.

Input: arr = [3, 34, 4, 12, 5, 2], target = 30
Output: false
```

### Intuition

For each index `idx`, either exclude the element (check if target can be made from `idx - 1`) or include it (if `arr[idx] <= target`, check if `target - arr[idx]` can be made from `idx - 1`). If either branch succeeds, return true.

### Code

```cpp
// Recursion
class Solution {
private:
    bool solve(int idx, int target, vector<int>& arr) {
        if (target == 0) {
            return true;
        }
        if (idx == 0) {
            return arr[0] == target;
        }
        // Exclude current element
        bool notTake = solve(idx - 1, target, arr);
        // Include current element if within remaining target
        bool take = false;
        if (arr[idx] <= target) {
            take = solve(idx - 1, target - arr[idx], arr);
        }
        return notTake || take;
    }
public:
    bool isSubsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        return solve(n - 1, target, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    bool solve(int idx, int target, vector<int>& arr, vector<vector<int>>& dp) {
        if (target == 0) {
            return true;
        }
        if (idx == 0) {
            return arr[0] == target;
        }
        if (dp[idx][target] != -1) {
            return dp[idx][target];
        }
        bool notTake = solve(idx - 1, target, arr, dp);
        bool take = false;
        if (arr[idx] <= target) {
            take = solve(idx - 1, target - arr[idx], arr, dp);
        }
        return dp[idx][target] = notTake || take;
    }
public:
    bool isSubsetSum(vector<int>& arr, int target) {
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
    bool isSubsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        vector<vector<bool>> dp(n, vector<bool>(target + 1, false));

        // Base case: target 0 is always achievable with empty subset
        for (int i = 0; i < n; i++) {
            dp[i][0] = true;
        }
        if (arr[0] <= target) {
            dp[0][arr[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            for (int t = 1; t <= target; t++) {
                bool notTake = dp[i - 1][t];
                bool take = false;
                if (arr[i] <= t) {
                    take = dp[i - 1][t - arr[i]];
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
    bool isSubsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        vector<bool> prev(target + 1, false);

        // Target 0 can always be formed
        prev[0] = true;
        if (arr[0] <= target) {
            prev[arr[0]] = true;
        }

        for (int i = 1; i < n; i++) {
            vector<bool> curr(target + 1, false);
            curr[0] = true;
            for (int t = 1; t <= target; t++) {
                bool notTake = prev[t];
                bool take = false;
                if (arr[i] <= t) {
                    take = prev[t - arr[i]];
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

- **Time Complexity:** O(N * Target)
- **Space Complexity:** O(Target)
