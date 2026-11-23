---
title: "Print Longest Increasing Subsequence"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/printing-longest-increasing-subsequence/1"
  youtube: "https://www.youtube.com/watch?v=IFfYfonAFGc"
  article: "https://takeuforward.org/data-structure/printing-longest-increasing-subsequence-dp-42/"
---

### Problem Statement

Given an integer array `arr`, return any one longest strictly increasing subsequence.

### Examples

```text
Input: arr = [10, 22, 9, 33, 21, 50, 41, 60, 80]
Output: [10, 22, 33, 50, 60, 80]
Explanation: The longest increasing subsequence is of length 6.

Input: arr = [1, 2, 3]
Output: [1, 2, 3]
```

### Intuition

Maintain a predecessor parent array `parent` alongside the 1D LIS array `dp`. When `dp[prev] + 1 > dp[i]`, record `parent[i] = prev`. After filling, backtrack from the index having the maximum LIS length.

### Code

```cpp
// Recursion
class Solution {
private:
    vector<int> solve(int idx, int prevIdx, vector<int>& arr) {
        if (idx == arr.size()) {
            return {};
        }
        vector<int> notTake = solve(idx + 1, prevIdx, arr);
        vector<int> take = {};
        if (prevIdx == -1 || arr[idx] > arr[prevIdx]) {
            take = solve(idx + 1, idx, arr);
            take.insert(take.begin(), arr[idx]);
        }
        return (take.size() > notTake.size()) ? take : notTake;
    }
public:
    vector<int> longestIncreasingSubsequence(int n, vector<int>& arr) {
        return solve(0, -1, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solveLen(int idx, int prevIdx, vector<int>& arr, vector<vector<int>>& dp) {
        if (idx == arr.size()) {
            return 0;
        }
        if (dp[idx][prevIdx + 1] != -1) {
            return dp[idx][prevIdx + 1];
        }
        int notTake = solveLen(idx + 1, prevIdx, arr, dp);
        int take = 0;
        if (prevIdx == -1 || arr[idx] > arr[prevIdx]) {
            take = 1 + solveLen(idx + 1, idx, arr, dp);
        }
        return dp[idx][prevIdx + 1] = max(notTake, take);
    }
public:
    vector<int> longestIncreasingSubsequence(int n, vector<int>& arr) {
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        solveLen(0, -1, arr, dp);

        // Reconstruct from memo table
        vector<int> ans;
        int prevIdx = -1;
        for (int idx = 0; idx < n; idx++) {
            int notTake = (idx + 1 < n) ? dp[idx + 1][prevIdx + 1] : 0;
            int take = 0;
            if (prevIdx == -1 || arr[idx] > arr[prevIdx]) {
                take = 1 + ((idx + 1 < n) ? dp[idx + 1][idx + 1] : 0);
            }
            if (take >= notTake && (prevIdx == -1 || arr[idx] > arr[prevIdx])) {
                ans.push_back(arr[idx]);
                prevIdx = idx;
            }
        }
        return ans;
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    vector<int> longestIncreasingSubsequence(int n, vector<int>& arr) {
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1;
        int lastIdx = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIdx = i;
            }
        }

        vector<int> ans;
        ans.push_back(arr[lastIdx]);
        while (parent[lastIdx] != lastIdx) {
            lastIdx = parent[lastIdx];
            ans.push_back(arr[lastIdx]);
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    vector<int> longestIncreasingSubsequence(int n, vector<int>& arr) {
        // Backtracking an LIS requires parent indices
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1;
        int lastIdx = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIdx = i;
            }
        }

        vector<int> ans;
        ans.push_back(arr[lastIdx]);
        while (parent[lastIdx] != lastIdx) {
            lastIdx = parent[lastIdx];
            ans.push_back(arr[lastIdx]);
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
