---
title: "How Many Times Array is Rotated"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/rotation4755/1"
  youtube: "https://www.youtube.com/results?search_query=how+many+times+array+is+rotated+binary+search"
tags:
  - "Binary Search"
  - "Rotated Sorted Array"
---

### Problem Statement

Given an ascending sorted rotated array `arr` of distinct integers, find the number of times the array has been rotated.

### Constraints

- `1 <= arr.size() <= 10^5`
- `1 <= arr[i] <= 10^9`
- All elements are **unique**.

### Examples

**Example 1:**
```text
Input: arr = [5, 1, 2, 3, 4]
Output: 1
Explanation: The original array was [1, 2, 3, 4, 5] and it has been rotated 1 time.
```

**Example 2:**
```text
Input: arr = [7, 9, 11, 12, 5]
Output: 4
Explanation: The original array was [5, 7, 9, 11, 12] and it has been rotated 4 times.
```

### Intuition

The number of times a sorted array has been rotated is exactly equal to the index of the minimum element in the array. 

For example, in `[5, 1, 2, 3, 4]`, the minimum element is `1` which is at index `1`. This means the array was rotated `1` time. We can locate the index of the minimum element using binary search.

### Approach

1. Initialize `low = 0` and `high = arr.size() - 1`.
2. Loop while `low < high`:
   - Calculate `mid = low + (high - low) / 2`.
   - If `arr[mid] > arr[high]`, the smallest element (and therefore the pivot) must be in the right half, so set `low = mid + 1`.
   - Otherwise, the smallest element is at `mid` or to its left, so set `high = mid`.
3. When `low == high`, `low` points to the index of the minimum element. Return `low`.

---

### Code

```cpp
class Solution {
  public:
    // Function to find rotation count using binary search
    int findRotations(vector[int]& arr) {
        // Initialize low and high pointers
        int low = 0;
        int high = arr.size() - 1;

        // Loop until low meets high
        while (low < high) {
            // Find mid index
            int mid = low + (high - low) / 2;

            // If mid element is greater than element at high,
            // smallest element lies to the right of mid
            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                // Else smallest element is at mid or to the left
                high = mid;
            }
        }

        // When low == high, we found the smallest element
        return low;
    }
};
```
