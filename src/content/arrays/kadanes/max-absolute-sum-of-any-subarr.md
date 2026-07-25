---
title: "Maximum Absolute Sum of Any Subarray"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/"
tags:
  - "Arrays"
  - "Kadane"
---

### Problem Statement

Return the largest absolute value of the sum of any subarray.

### Examples

```text
Input: nums = [1,-3,2,3,-4]
Output: 5
```

### Intuition

The largest absolute sum is either the maximum subarray sum or the absolute value of the minimum subarray sum.

### Approach

Run Kadane-style tracking for both maximum ending sum and minimum ending sum.

### Code

```cpp
class Solution {
public:
    int maxAbsoluteSum(vector<int>& nums) {
        int maxEnd = 0, minEnd = 0, ans = 0;
        for (int x : nums) {
            maxEnd = max(x, maxEnd + x);
            minEnd = min(x, minEnd + x);
            ans = max(ans, max(abs(maxEnd), abs(minEnd)));
        }
        return ans;
    }
};
```
