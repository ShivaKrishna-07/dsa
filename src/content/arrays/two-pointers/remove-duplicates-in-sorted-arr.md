---
title: "Remove Duplicates from Sorted Array"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
  gfg: "https://www.geeksforgeeks.org/remove-duplicates-sorted-array/"
tags:
  - "Arrays"
  - "Two Pointers"
  - "Sorted Array"
---

### Problem Statement

Given a sorted array, remove duplicates in-place so that each unique value appears once. Return the number of unique elements.

### Examples

```text
Input: nums = [1,1,2]
Output: 2
Modified prefix: [1,2]
```

### Intuition

Because equal values are adjacent in a sorted array, a new unique value appears exactly when nums[i] differs from nums[i - 1].

### Approach

Use one pointer to scan and another pointer to write the compact unique prefix.

### Code

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int write = 1;
        for (int read = 1; read < nums.size(); read++) {
            if (nums[read] != nums[read - 1]) {
                nums[write] = nums[read];
                write++;
            }
        }
        return write;
    }
};
```
