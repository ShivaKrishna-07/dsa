---
title: "Upper Bound"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/implement-upper-bound/1"
  youtube: "https://www.youtube.com/results?search_query=upper+bound+binary+search"
tags:
  - "Binary Search"
  - "Boundaries"
---

### Problem Statement

Given a sorted array `arr[]` and a target value `target`, find the index of the first element that is **strictly greater than** `target` (`arr[index] > target`).

If no such element exists, return `n` (the size of the array).

### Constraints

- `1 <= arr.size() <= 10^5`
- `1 <= arr[i] <= 10^9`
- `1 <= target <= 10^9`

### Examples

**Example 1:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 5
Output: 3
Explanation: arr[3] = 6 is the first element > 5.
```

**Example 2:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 4
Output: 3
Explanation: arr[3] = 6 is the first element > 4.
```

### Intuition

Since the array is sorted, we can use binary search. We want to find the first element where `arr[mid] > target`.
- If we find an element `arr[mid] > target`, it could be our answer, but we need to check if there is a smaller valid index on the left. So we record the index and narrow our search to the left half (`j = mid - 1`).
- If `arr[mid] <= target`, the target is not strictly greater than `target`, so we must search in the right half (`i = mid + 1`).

At the end of the search, the low pointer `i` will point to the correct upper bound index.

### Approach

1. Initialize `i = 0` and `j = n - 1`.
2. Loop while `i <= j`:
   - Calculate `mid = i + (j - i) / 2`.
   - If `arr[mid] > target`, move the high pointer `j = mid - 1`.
   - Otherwise, move the low pointer `i = mid + 1`.
3. Return `i`.

---

### Code

```cpp
class Solution {
  public:
    int upperBound(vector[int]& arr, int target) {
        int n = arr.size();
        int i = 0, j = n - 1;
        
        while (i <= j) {
            int mid = i + (j - i) / 2;
            if (arr[mid] > target) {
                j = mid - 1;
            } else {
                i = mid + 1;
            }
        }
        return i;
    }
};
```
