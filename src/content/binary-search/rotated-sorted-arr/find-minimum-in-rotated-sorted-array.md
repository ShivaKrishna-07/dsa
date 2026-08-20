---
title: "Find Minimum in Rotated Sorted Array"
difficulty: "Medium"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description"
  gfg: "https://www.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1"
  youtube: "https://www.youtube.com/results?search_query=find+minimum+in+rotated+sorted+array+binary+search"
tags:
  - "Binary Search"
  - "Rotated Sorted Array"
---

### Problem Statement

Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:
- `[4,5,6,7,0,1,2]` if it was rotated 4 times.
- `[0,1,2,4,5,6,7]` if it was rotated 7 times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in `O(log n)` time.

### Constraints

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between `1` and `n` times.

### Examples

**Example 1:**
```text
Input: nums = [3, 4, 5, 1, 2]
Output: 1
Explanation: The original array was [1, 2, 3, 4, 5] rotated 3 times.
```

**Example 2:**
```text
Input: nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0
Explanation: The original array was [0, 1, 2, 4, 5, 6, 7] and it was rotated 4 times.
```

### Intuition

Since all elements are unique, we can perform a binary search using our standard `while (low <= high)` template:
- If the current search space `[low, high]` is already fully sorted (`nums[low] <= nums[high]`), then `nums[low]` must be the minimum element in this segment. We can record it and stop.
- Otherwise, we find `mid`:
  - If `nums[mid] >= nums[low]`, the left half is sorted. The minimum element could be `nums[low]`, so we record it and search the right half by setting `low = mid + 1`.
  - Else, the right half is sorted. The minimum element could be `nums[mid]`, so we record it and search the left half by setting `high = mid - 1`.

### Approach

1. Initialize `low = 0`, `high = nums.size() - 1`, and `ans = nums[0]`.
2. Loop while `low <= high`:
   - If `nums[low] <= nums[high]`, update `ans = min(ans, nums[low])` and break.
   - Calculate `mid = low + (high - low) / 2`.
   - If `nums[mid] >= nums[low]`, update `ans = min(ans, nums[low])` and set `low = mid + 1`.
   - Otherwise, update `ans = min(ans, nums[mid])` and set `high = mid - 1`.
3. Return `ans`.

---

### Code

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        int ans = nums[0];
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            // If the search space is already sorted, the minimum is nums[low]
            if (nums[low] <= nums[high]) {
                ans = min(ans, nums[low]);
                break;
            }
            
            if (nums[mid] >= nums[low]) {
                // Left half is sorted, min could be nums[low]
                ans = min(ans, nums[low]);
                low = mid + 1;
            } else {
                // Right half is sorted, min could be nums[mid]
                ans = min(ans, nums[mid]);
                high = mid - 1;
            }
        }
        return ans;
    }
};
```
