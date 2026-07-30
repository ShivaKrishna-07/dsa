---
title: "Largest Sum Contiguous Subarray"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/"
tags:
  - "Arrays"
  - "Kadane"
---

### Problem Statement

Find the largest sum among all contiguous subarrays of the given array.

### Examples

```text
Input: arr = [-2,-3,4,-1,-2,1,5,-3]
Output: 7
Explanation: [4,-1,-2,1,5] has sum 7.
```

### Intuition

A negative running sum hurts any future subarray, so restart when starting fresh is better.

### Approach

Use Kadane's recurrence: current = max(arr[i], current + arr[i]).

### Code

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        int sum = 0;
        int maxi = INT_MIN;

        for(int i=0; i<n; i++){
            if(sum < 0) sum = 0;
            
            sum += nums[i];
            maxi = max(maxi, sum);
        }
        return maxi;
    }
};
```
