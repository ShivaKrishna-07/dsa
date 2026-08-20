---
title: "First & Last Occurrence"
difficulty: "Medium"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
  gfg: "https://www.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1"
  youtube: "https://www.youtube.com/results?search_query=first+and+last+occurrence+binary+search"
tags:
  - "Binary Search"
  - "Boundaries"
---

### Problem Statement

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with `O(log n)` runtime complexity.

### Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non-decreasing array.
- `-10^9 <= target <= 10^9`

### Examples

**Example 1:**
```text
Input: nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]
Explanation: The first occurrence of 8 is at index 3, and the last is at index 4.
```

**Example 2:**
```text
Input: nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]
Explanation: 6 is not present in the array, so return [-1, -1].
```

**Example 3:**
```text
Input: nums = [], target = 0
Output: [-1, -1]
Explanation: The array is empty, so return [-1, -1].
```

### Intuition

Since the array is sorted, we can search for the first and last occurrence independently using two modified binary searches:
1. **Find First Occurrence**: When we find `nums[mid] == target`, instead of stopping, we record `mid` as a candidate and keep searching the left half (`j = mid - 1`) to see if there is a starting occurrence earlier in the array.
2. **Find Last Occurrence**: When we find `nums[mid] == target`, we record `mid` as a candidate and keep searching the right half (`i = mid + 1`) to see if there is an ending occurrence later in the array.

This guarantees `O(log n)` time complexity.

### Approach

1. Run binary search to find the first occurrence (`findFirst`).
2. Run binary search to find the last occurrence (`findLast`).
3. Return `{first, last}`.

---

### Code

```cpp
class Solution {
  public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findFirst(nums, target);
        int last = findLast(nums, target);
        return {first, last};
    }
    
  private:
    int findFirst(vector<int>& nums, int target) {
        int i = 0, j = nums.size() - 1;
        int ans = -1;
        
        while (i <= j) {
            int mid = i + (j - i) / 2;
            if (nums[mid] == target) {
                ans = mid;
                j = mid - 1; // Try to find a smaller index on the left
            } else if (nums[mid] < target) {
                i = mid + 1;
            } else {
                j = mid - 1;
            }
        }
        return ans;
    }
    
    int findLast(vector<int>& nums, int target) {
        int i = 0, j = nums.size() - 1;
        int ans = -1;
        
        while (i <= j) {
            int mid = i + (j - i) / 2;
            if (nums[mid] == target) {
                ans = mid;
                i = mid + 1; // Try to find a larger index on the right
            } else if (nums[mid] < target) {
                i = mid + 1;
            } else {
                j = mid - 1;
            }
        }
        return ans;
    }
};
```
