---
title: "Largest Divisible Subset"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/largest-divisible-subset/"
  youtube: "https://www.youtube.com/watch?v=gDuZwBW9VvM"
  article: "https://takeuforward.org/data-structure/longest-divisible-subset-dp-44/"
---

### Problem Statement

Given a set of distinct positive integers `nums`, return the largest subset `answer` such that every pair `(answer[i], answer[j])` of elements in this subset satisfies: `answer[i] % answer[j] == 0` or `answer[j] % answer[i] == 0`.

### Examples

```text
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.

Input: nums = [1,2,4,8]
Output: [1,2,4,8]
```

### Intuition

If we sort the array, for any chain `a < b < c`, if `b % a == 0` and `c % b == 0`, then `c % a == 0` is automatically satisfied by transitivity. Thus after sorting, the problem reduces to LIS with condition `nums[i] % nums[prev] == 0`.

### Code

```cpp
// Recursion
class Solution {
private:
    vector<int> solve(int idx, int prevIdx, vector<int>& nums) {
        if (idx == nums.size()) {
            return {};
        }
        vector<int> notTake = solve(idx + 1, prevIdx, nums);
        vector<int> take = {};
        // Divisibility condition on sorted array
        if (prevIdx == -1 || nums[idx] % nums[prevIdx] == 0) {
            take = solve(idx + 1, idx, nums);
            take.insert(take.begin(), nums[idx]);
        }
        return (take.size() > notTake.size()) ? take : notTake;
    }
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return solve(0, -1, nums);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solveLen(int idx, int prevIdx, vector<int>& nums, vector<vector<int>>& dp) {
        if (idx == nums.size()) {
            return 0;
        }
        if (dp[idx][prevIdx + 1] != -1) {
            return dp[idx][prevIdx + 1];
        }
        int notTake = solveLen(idx + 1, prevIdx, nums, dp);
        int take = 0;
        if (prevIdx == -1 || nums[idx] % nums[prevIdx] == 0) {
            take = 1 + solveLen(idx + 1, idx, nums, dp);
        }
        return dp[idx][prevIdx + 1] = max(notTake, take);
    }
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        solveLen(0, -1, nums, dp);

        vector<int> ans;
        int prevIdx = -1;
        for (int idx = 0; idx < n; idx++) {
            int notTake = (idx + 1 < n) ? dp[idx + 1][prevIdx + 1] : 0;
            int take = 0;
            if (prevIdx == -1 || nums[idx] % nums[prevIdx] == 0) {
                take = 1 + ((idx + 1 < n) ? dp[idx + 1][idx + 1] : 0);
            }
            if (take >= notTake && (prevIdx == -1 || nums[idx] % nums[prevIdx] == 0)) {
                ans.push_back(nums[idx]);
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
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1;
        int lastIdx = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
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
        ans.push_back(nums[lastIdx]);
        while (parent[lastIdx] != lastIdx) {
            lastIdx = parent[lastIdx];
            ans.push_back(nums[lastIdx]);
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
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1;
        int lastIdx = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
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
        ans.push_back(nums[lastIdx]);
        while (parent[lastIdx] != lastIdx) {
            lastIdx = parent[lastIdx];
            ans.push_back(nums[lastIdx]);
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
