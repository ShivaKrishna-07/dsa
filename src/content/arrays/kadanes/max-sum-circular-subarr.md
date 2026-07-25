---
title: "Maximum Sum Circular Subarray"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/maximum-sum-circular-subarray/"
  gfg: "https://www.geeksforgeeks.org/maximum-contiguous-circular-sum/"
tags:
  - "Arrays"
  - "Kadane"
---

### Problem Statement

Find the maximum subarray sum in a circular array, where a subarray may wrap from the end to the beginning.

### Examples

```text
Input: nums = [5,-3,5]
Output: 10
```

### Intuition

The best answer is either non-wrapping Kadane, or total sum minus the minimum subarray.

### Approach

Compute maximum subarray, minimum subarray and total sum. If all values are negative, return the maximum subarray directly.

### Code

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0;
        int maxEnd = 0, minEnd = 0;
        int maxSum = nums[0], minSum = nums[0];
        for (int x : nums) {
            maxEnd = max(x, maxEnd + x);
            maxSum = max(maxSum, maxEnd);
            minEnd = min(x, minEnd + x);
            minSum = min(minSum, minEnd);
            total += x;
        }
        if (maxSum < 0) return maxSum;
        return max(maxSum, total - minSum);
    }
};
```
