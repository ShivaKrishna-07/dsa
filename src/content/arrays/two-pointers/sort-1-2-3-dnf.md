---
title: "Sort 0s, 1s and 2s"
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

Given an array containing only 0, 1 and 2, sort it in-place without using a sorting algorithm.

### Examples

```text
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Explanation: The array is sorted in ascending order in-place.
```

### Intuition

Maintain three zones: all 0s before low, all 2s after high, and unknown values between mid and high.

### Approach

If nums[mid] is 0, swap it into the low zone. If it is 1, move mid. If it is 2, swap it into the high zone and recheck the new nums[mid].

### Code

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```
