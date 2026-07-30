---
title: "Move Zeroes"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/move-zeroes/"
  gfg: "https://www.geeksforgeeks.org/move-zeroes-end-array/"
tags:
  - "Arrays"
  - "Two Pointers"
  - "In-place"
---

### Problem Statement

Given an integer array, move every zero to the end while keeping the relative order of all non-zero elements. The update must be done in-place.

### Examples

```text
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Intuition

Keep a write pointer at the position where the next non-zero element should go. A read pointer scans the array once.

### Approach

Whenever the read pointer sees a non-zero value, swap it with the write pointer and advance the write pointer. Values before the write pointer are always the compacted non-zero prefix.

### Common Mistakes

- Moving zeroes one by one with repeated shifting.
- Losing the relative order of non-zero elements.

### Code

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        int i = 0, j = 0;

        while (j < n) {
            if (nums[j] != 0) {
                swap(nums[i], nums[j]);
                i++;
            }
            j++;
        }
    }
};
```
