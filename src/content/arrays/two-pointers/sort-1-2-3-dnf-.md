---
title: "Sort Colors (Dutch National Flag)"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/sort-colors/"
  gfg: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/"
tags:
  - "Arrays"
  - "Two Pointers"
  - "Dutch National Flag"
---

### Problem Statement

Sort an array of red, white and blue colors represented as 0, 1 and 2. The array must be sorted in-place.

### Examples

```text
Input: nums = [2,0,1]
Output: [0,1,2]
```

### Intuition

The Dutch National Flag pattern partitions the array into less-than, equal-to and greater-than regions in one scan.

### Approach

Track low, mid and high pointers. Move 0s to the front, 2s to the back, and let 1s remain in the middle.

### Code

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[high--]);
        }
    }
};
```
