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

For example, in `[5, 1, 2, 3, 4]`, the minimum element is `1` which is at index `1`. This means the array was rotated `1` time. We can locate the index of the minimum element using binary search with our standard `while (low <= high)` template:
- If the current search space `[low, high]` is already fully sorted (`arr[low] <= arr[high]`), the minimum is `arr[low]`. If `arr[low]` is smaller than the current minimum, we update `ansIndex = low` and stop.
- Otherwise, we find `mid`:
  - If `arr[mid] >= arr[low]`, the left half is sorted. The minimum could be `arr[low]`, so we record its index if it's smaller than the current minimum, and search the right half (`low = mid + 1`).
  - Else, the right half is sorted. The minimum could be `arr[mid]`, so we record its index if it's smaller, and search the left half (`high = mid - 1`).

### Approach

1. Initialize `low = 0`, `high = arr.size() - 1`, `ans = arr[0]`, and `ansIndex = 0`.
2. Loop while `low <= high`:
   - If `arr[low] <= arr[high]`, check if `arr[low] < ans`, update `ansIndex = low` and break.
   - Calculate `mid = low + (high - low) / 2`.
   - If `arr[mid] >= arr[low]`, update `ansIndex` if `arr[low]` is smaller, and set `low = mid + 1`.
   - Otherwise, update `ansIndex` if `arr[mid]` is smaller, and set `high = mid - 1`.
3. Return `ansIndex`.

---

### Code

```cpp
class Solution {
  public:
    int findRotations(vector<int>& arr) {
        int low = 0;
        int high = arr.size() - 1;
        int ans = arr[0];
        int ansIndex = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If the search space is already sorted, the minimum is arr[low]
            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    ansIndex = low;
                }
                break;
            }

            if (arr[mid] >= arr[low]) {
                // Left half is sorted, min could be arr[low]
                if (arr[low] < ans) {
                    ans = arr[low];
                    ansIndex = low;
                }
                low = mid + 1;
            } else {
                // Right half is sorted, min could be arr[mid]
                if (arr[mid] < ans) {
                    ans = arr[mid];
                    ansIndex = mid;
                }
                high = mid - 1;
            }
        }

        return ansIndex;
    }
};
```
