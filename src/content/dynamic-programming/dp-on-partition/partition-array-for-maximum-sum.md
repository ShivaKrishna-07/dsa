---
title: "Partition Array for Maximum Sum"
difficulty: "Medium"
time: "O(N * K)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/partition-array-for-maximum-sum/"
  youtube: "https://www.youtube.com/watch?v=PhWWJmaKfMc"
  article: "https://takeuforward.org/data-structure/partition-array-for-maximum-sum-front-partition-dp-54/"
---

### Problem Statement

Given an integer array `arr`, partition the array into (contiguous) subarrays of length at most `k`. After partitioning, each subarray has their values changed to become the maximum value of that subarray. Return the largest sum of the given array after partitioning.

### Examples

```text
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]

Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83
```

### Intuition

From index `i`, consider all possible partition lengths `len` from `1` to `k`. Track the maximum element in the current segment: its contribution is `len * maxVal + solve(i + len)`. Take the maximum across all valid `len`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int n, int k, vector<int>& arr) {
        if (i == n) {
            return 0;
        }
        int maxVal = 0;
        int maxSum = 0;
        // Try all partition sizes from 1 up to k
        for (int j = i; j < min(n, i + k); j++) {
            maxVal = max(maxVal, arr[j]);
            int len = j - i + 1;
            int sum = len * maxVal + solve(j + 1, n, k, arr);
            maxSum = max(maxSum, sum);
        }
        return maxSum;
    }
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        return solve(0, n, k, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int n, int k, vector<int>& arr, vector<int>& dp) {
        if (i == n) {
            return 0;
        }
        if (dp[i] != -1) return dp[i];
        int maxVal = 0;
        int maxSum = 0;
        for (int j = i; j < min(n, i + k); j++) {
            maxVal = max(maxVal, arr[j]);
            int len = j - i + 1;
            int sum = len * maxVal + solve(j + 1, n, k, arr, dp);
            maxSum = max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n, -1);
        return solve(0, n, k, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int maxVal = 0;
            int maxSum = 0;
            for (int j = i; j < min(n, i + k); j++) {
                maxVal = max(maxVal, arr[j]);
                int len = j - i + 1;
                int sum = len * maxVal + dp[j + 1];
                maxSum = max(maxSum, sum);
            }
            dp[i] = maxSum;
        }
        return dp[0];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        // Sliding window of size k can optimize space
        int n = arr.size();
        vector<int> dp(k + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int maxVal = 0;
            int maxSum = 0;
            for (int j = i; j < min(n, i + k); j++) {
                maxVal = max(maxVal, arr[j]);
                int len = j - i + 1;
                int sum = len * maxVal + dp[(j + 1) % (k + 1)];
                maxSum = max(maxSum, sum);
            }
            dp[i % (k + 1)] = maxSum;
        }
        return dp[0];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * K)
- **Space Complexity:** O(N)
