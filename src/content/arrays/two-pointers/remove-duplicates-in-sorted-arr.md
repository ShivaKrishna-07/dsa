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
        int n = nums.size();
        int i = 0, j = 0;

        while (j < n) {
            if (nums[i] != nums[j]) {
                i++;
                nums[i] = nums[j];
            }
            j++;
        }

        return i + 1;
    }
};
```
