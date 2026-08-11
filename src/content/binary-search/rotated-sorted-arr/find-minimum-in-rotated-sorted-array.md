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

Since all elements are unique, we can perform a binary search:
- If the current subarray is already fully sorted (`nums[low] < nums[high]`), then `nums[low]` must be the minimum element. We can return it immediately.
- Otherwise, we find `mid`:
  - If `nums[mid] >= nums[low]`, the left half is sorted, meaning the rotation pivot (and therefore the minimum element) must lie in the right half. Thus, we update `low = mid + 1`.
  - Else, the right half is sorted, and `nums[mid]` itself could be the minimum element. Thus, we update `high = mid`.

### Approach

1. Initialize `low = 0` and `high = nums.size() - 1`.
2. Loop while `low < high`:
   - If `nums[low] < nums[high]`, return `nums[low]`.
   - Calculate `mid = low + (high - low) / 2`.
   - If `nums[mid] >= nums[low]`, update `low = mid + 1`.
   - Otherwise, update `high = mid`.
3. Return `nums[low]`.

---

### Code

```cpp
class Solution {
public:
    // Function to find the minimum element using binary search
    int findMin(vector<int>& nums) {

        // Initialize low and high pointers
        int low = 0, high = nums.size() - 1;

        // Binary search loop
        while (low < high) {

            // Calculate mid index
            int mid = low + (high - low) / 2;

            // Check which half to discard
            if (nums[mid] > nums[high]) {

                // Minimum lies in right half
                low = mid + 1;

            } else {

                // Minimum lies in left half (including mid)
                high = mid;
            }
        }

        // Return the minimum element
        return nums[low];
    }
};
```
