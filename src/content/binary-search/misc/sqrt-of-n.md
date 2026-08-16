---
title: "Square Root of N"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/sqrtx/"
  gfg: "https://www.geeksforgeeks.org/problems/square-root/1"
  youtube: "https://www.youtube.com/results?search_query=square+root+of+n+binary+search"
tags:
  - "Binary Search"
  - "Miscellaneous"
---

### Problem Statement

Given a non-negative integer `n`, compute and return the square root of `n`.

Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned (i.e. `floor(sqrt(n))`).

### Constraints

- `0 <= n <= 2^31 - 1`

### Examples

**Example 1:**
```text
Input: n = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**
```text
Input: n = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
```

### Intuition

The integer square root of a non-negative integer `n` must lie in the range `[1, n]`.
Since the function `f(x) = x * x` is strictly increasing for positive integers, we can use binary search:
- For a candidate root `mid`, we compute `mid * mid`.
- If `mid * mid <= n`, then `mid` is a valid candidate for the floor square root. We record it (`ans = mid`) and try to find a larger value by searching the right half (`low = mid + 1`).
- If `mid * mid > n`, the candidate is too large, so we search the left half (`high = mid - 1`).

### Approach

1. Initialize `low = 1`, `high = n`, and `ans = 0`.
2. Loop while `low <= high`:
   - Calculate `mid = low + (high - low) / 2`.
   - If `mid * mid <= n`, set `ans = mid` and move `low = mid + 1` to search for a potentially larger valid integer.
   - Otherwise, set `high = mid - 1`.
3. Return `ans`.

---

### Code

```cpp
class Solution {
  public:
    int floorSqrt(int n) {
        int i = 1, j = n;
        int ans = 0;
        while(i <= j){
            int mid = (j + i) / 2;
            if(mid * mid <= n){
                ans = mid;
                i = mid + 1;
            } else {
                j = mid - 1;
            }
        }
        return ans;
    }
};
```
