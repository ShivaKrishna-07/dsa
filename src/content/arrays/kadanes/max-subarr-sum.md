---
title: "Maximum Subarray"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/maximum-subarray/"
  gfg: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/"
tags:
  - "Arrays"
  - "Kadane"
---

### Problem Statement

Given an integer array, find the maximum possible sum of a non-empty contiguous subarray.

### Examples

```text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has sum 6.
```

### Intuition

At each index, either extend the previous subarray or start a new one from the current value.

### Approach

Maintain current best ending here and global best seen so far.

### Code

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int current = nums[0], best = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            current = max(nums[i], current + nums[i]);
            best = max(best, current);
        }
        return best;
    }
};
```
