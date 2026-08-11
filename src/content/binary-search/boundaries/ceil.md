---
title: "Ceil in Sorted Array"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1"
  youtube: "https://www.youtube.com/results?search_query=ceil+in+sorted+array+binary+search"
tags:
  - "Binary Search"
  - "Boundaries"
---

### Problem Statement

Given a sorted array `arr[]` of size `N` and a value `x`, find the index of the **ceil** of `x` in the array.

The ceil of `x` is defined as the smallest element in the array which is greater than or equal to `x` (`arr[index] >= x`).

If no such element exists, return `-1`.

### Constraints

- `1 <= N <= 10^7`
- `1 <= arr[i] <= 10^18`
- `0 <= x <= 10^18`

### Examples

**Example 1:**
```text
Input: arr = [1, 2, 8, 10, 11, 12, 19], x = 5
Output: 2
Explanation: Smallest element >= 5 is 8, which is at index 2.
```

**Example 2:**
```text
Input: arr = [1, 2, 8, 10, 11, 12, 19], x = 20
Output: -1
Explanation: No element is greater than or equal to 20, so output is -1.
```

### Intuition

Since the array is sorted, we can use binary search. We want to find the smallest element that satisfies `arr[mid] >= x`.
- If `arr[mid] >= x`, then `mid` is a potential candidate for our ceil. We save `mid` to `ans`. Since we want the *smallest* element, there could be a smaller valid element further to the left. So we search the left half (`j = mid - 1`).
- If `arr[mid] < x`, the element is too small, so we must search in the right half to find larger values (`i = mid + 1`).

### Approach

1. Initialize `i = 0`, `j = n - 1`, and `ans = -1`.
2. Loop while `i <= j`:
   - Calculate `mid = i + (j - i) / 2`.
   - If `arr[mid] >= x`, set `ans = mid` and move the high pointer `j = mid - 1`.
   - Otherwise, move the low pointer `i = mid + 1`.
3. Return `ans`.

---

### Code

```cpp
class Solution {
  public:
    // Function to find ceil of x
    int findCeil(vector<int>& arr, int x) {
        int n = arr.size();
        int i = 0, j = n - 1;
        int ans = -1;
        
        while (i <= j) {
            int mid = i + (j - i) / 2;
            if (arr[mid] >= x) {
                ans = mid;
                j = mid - 1; // Look for a smaller element on the left
            } else {
                i = mid + 1; // Look for a larger element on the right
            }
        }
        return ans;
    }
};
```
