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
Explanation: The circular subarray [5, 5] has sum 10.
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
        int n = nums.size();

        int sum = accumulate(nums.begin(), nums.end(), 0);
        int minSum = kadanesMin(nums, n);
        int maxSum = kadanesMax(nums, n);

        // Total_sum - min_subarray_sum = max sum subarray with wrap around 
        int circularSum = sum - minSum;

        // if all elements are -ve, then maxSum will be -ve
        // in that case circularSum will be 0, which is wrong
        // so return maxSum
        
        if(maxSum < 0) return maxSum;
        return max(maxSum, circularSum);
    }
    // function to find max subarr of +ve elements
    int kadanesMax(vector<int>&nums, int n){
        int sum = 0, maxi=INT_MIN;
        for(int x: nums){
            sum = max(sum+x, x);
            maxi = max(maxi, sum);
        }
        return maxi;
    }
    
    // function to find min subarr of -ve elements  
    int kadanesMin(vector<int>&nums, int n){
        int sum = 0, mini=INT_MAX;
        for(int x: nums){
            sum = min(sum+x, x);
            mini = min(mini, sum);
        }
        return mini;
    }
};
```
