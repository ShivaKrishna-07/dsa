---
title: "Floor in Sorted Array"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1"
  youtube: "https://www.youtube.com/results?search_query=floor+in+sorted+array+binary+search"
tags:
  - "Binary Search"
  - "Boundaries"
---

### Problem Statement

Given a sorted array `arr[]` of size `N` without duplicates (or with duplicates) and a value `x`, find the index of the **floor** of `x` in the array.

The floor of `x` is defined as the largest element in the array which is less than or equal to `x` (`arr[index] <= x`).

If no such element exists, return `-1`.

### Constraints

- `1 <= N <= 10^7`
- `1 <= arr[i] <= 10^18`
- `0 <= x <= 10^18`

### Examples

**Example 1:**
```text
Input: arr = [1, 2, 8, 10, 11, 12, 19], x = 0
Output: -1
Explanation: No element is less than or equal to 0, so output is -1.
```

**Example 2:**
```text
Input: arr = [1, 2, 8, 10, 11, 12, 19], x = 5
Output: 1
Explanation: Largest element <= 5 is 2, which is at index 1.
```

### Intuition

Since the array is sorted, we can use binary search. We want to find the largest element that satisfies `arr[mid] <= x`.
- If `arr[mid] <= x`, then `mid` is a potential candidate for our floor. We save `mid` to `ans`. Since we want the *largest* element, there could be a larger valid element further to the right. So we search the right half (`i = mid + 1`).
- If `arr[mid] > x`, the element is too large, so we must search in the left half to find smaller values (`j = mid - 1`).

### Approach

1. Initialize `i = 0`, `j = n - 1`, and `ans = -1`.
2. Loop while `i <= j`:
   - Calculate `mid = i + (j - i) / 2`.
   - If `arr[mid] <= x`, set `ans = mid` and move the low pointer `i = mid + 1`.
   - Otherwise, move the high pointer `j = mid - 1`.
3. Return `ans`.

---

### Code

```cpp
class Solution {
  public:
    // Function to find floor of x
    // n: size of vector
    // x: element whose floor is to find
    int findFloor(vector<long long>& arr, long long n, long long x) {
        int i = 0, j = n - 1;
        int ans = -1;
        
        while (i <= j) {
            int mid = i + (j - i) / 2;
            if (arr[mid] <= x) {
                ans = mid;
                i = mid + 1; // Look for a larger element on the right
            } else {
                j = mid - 1; // Look for a smaller element on the left
            }
        }
        return ans;
    }
};
```
