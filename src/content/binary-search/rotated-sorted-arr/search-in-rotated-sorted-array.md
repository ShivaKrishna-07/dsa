---
title: "Search in Rotated Sorted Array"
difficulty: "Medium"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  gfg: "https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1"
  youtube: "https://www.youtube.com/results?search_query=search+in+rotated+sorted+array+binary+search"
tags:
  - "Binary Search"
  - "Rotated Sorted Array"
---

### Problem Statement

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

### Constraints

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

### Examples

**Example 1:**
```text
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
Explanation: 0 is found at index 4.
```

**Example 2:**
```text
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
Explanation: 3 is not in the array, so -1 is returned.
```

### Intuition

In a rotated sorted array, when we divide the array in half at `mid`, at least one of the two halves is always strictly sorted. We can find which half is sorted and check if `target` lies within its boundaries:
- If `nums[low] <= nums[mid]`, the left half is sorted.
  - If `nums[low] <= target < nums[mid]`, target must be in the left half, so we search left (`high = mid - 1`).
  - Otherwise, we search right (`low = mid + 1`).
- Otherwise, the right half is sorted.
  - If `nums[mid] < target <= nums[high]`, target must be in the right half, so we search right (`low = mid + 1`).
  - Otherwise, we search left (`high = mid - 1`).

### Approach

1. Initialize `low = 0` and `high = nums.size() - 1`.
2. Loop while `low <= high`:
   - Calculate `mid = low + (high - low) / 2`.
   - If `nums[mid] == target`, return `mid`.
   - If the left half is sorted (`nums[low] <= nums[mid]`):
     - If `nums[low] <= target && target < nums[mid]`, set `high = mid - 1`.
     - Else, set `low = mid + 1`.
   - Else (right half is sorted):
     - If `nums[mid] < target && target <= nums[high]`, set `low = mid + 1`.
     - Else, set `high = mid - 1`.
3. Return `-1` if target is not found.

---

### Code

```cpp
class Solution {
  public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            // Identify which half is sorted
            if (nums[low] <= nums[mid]) { // Left half is sorted
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // Right half is sorted
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};
```
