---
title: "Rotate Array"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/rotate-array/"
  gfg: "https://www.geeksforgeeks.org/array-rotation/"
tags:
  - "Arrays"
  - "Observation"
  - "Reverse"
---

### Problem Statement

Rotate the array by K positions. For LeetCode style rotation, values move to the right by K positions.

### Examples

```text
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation: Rotating the array to the right/left by 3 steps yields [5,6,7,1,2,3,4].
```

### Intuition

Reversing the whole array brings the last K elements to the front, but each segment is internally reversed. Reversing each segment fixes the order.

### Approach

Normalize K with modulo N, reverse the whole array, reverse the first K elements, then reverse the remaining elements.

### Code

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```
