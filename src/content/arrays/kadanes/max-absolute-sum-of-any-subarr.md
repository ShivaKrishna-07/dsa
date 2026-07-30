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
        int n = nums.size();
        int sum = 0, maxi = INT_MIN;

      // find max subarr of +ve elements
        for(int i=0; i<n; i++){
            sum = max(sum+nums[i], nums[i]);
            maxi = max(maxi, sum);
        }
        sum = 0;
        int mini=INT_MAX;

        // find min subarr of -ve elements
        for(int i=0; i<n; i++){
            sum = min(sum+nums[i], nums[i]);
            mini = min(mini, sum);
        }
        // return abs of max(max_subarr, min_subarr)
        return max(abs(mini), abs(maxi));
    }
};
```
