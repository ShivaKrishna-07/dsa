---
title: "Find Nth Root of M"
difficulty: "Easy"
time: "O(N log M)"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1"
  youtube: "https://www.youtube.com/results?search_query=find+nth+root+of+m+binary+search"
tags:
  - "Binary Search"
  - "Miscellaneous"
---

### Problem Statement

You are given two positive integers `n` and `m`. You have to find the `n`-th root of `m`. If the `n`-th root is an integer, return it; otherwise, return `-1`.

### Constraints

- `1 <= n <= 30`
- `1 <= m <= 10^9`

### Examples

**Example 1:**
```text
Input: n = 2, m = 9
Output: 3
Explanation: 3^2 = 9, so the 2nd root of 9 is 3.
```

**Example 2:**
```text
Input: n = 3, m = 9
Output: -1
Explanation: 3rd root of 9 is not an integer.
```

### Intuition

Since the `n`-th root must be an integer, it is bounded in the range `[1, m]`. 
Because `f(x) = x^n` is strictly increasing for positive values of `x`, we can perform a binary search on the range `[1, m]`:
- For each candidate root `mid`, we compute `mid^n`.
- To prevent integer overflow, we compute `mid^n` iteratively, checking after each multiplication if it exceeds `m`.
- If `mid^n == m`, we have found the exact integer root, so return `mid`.
- If `mid^n > m`, the root must be smaller than `mid`, so we search the left half (`high = mid - 1`).
- If `mid^n < m`, the root must be larger than `mid`, so we search the right half (`low = mid + 1`).

If the binary search completes without finding an exact match, return `-1`.

### Approach

1. If `m == 0` or `m == 1`, return `m`.
2. Initialize `low = 1` and `high = m`.
3. Loop while `low <= high`:
   - Calculate `mid = low + (high - low) / 2`.
   - Calculate the product `mid^n` using a helper function `prod(mid, n, m)`. If at any point the product exceeds `m`, terminate early to avoid overflow.
   - If the product equals `m`, return `mid`.
   - If the product exceeds `m`, update `high = mid - 1`.
   - Otherwise, update `low = mid + 1`.
4. Return `-1` if no exact integer root exists.

---

### Code

```cpp
class Solution {
  public:
    int prod(int mid, int n, int m){
        int ans = 1;
        for(int i=1; i<=n; i++){
            ans *= mid;
            if(ans > m) break;
        }
        return ans;
    }
    int nthRoot(int n, int m) {
        if(m == 0 || m == 1) return m;
        int i=1, j=m;
        
        while(i<=j){
            int mid = (i+j)/2;
            int val = prod(mid, n, m);
            
            if(val == m) return mid;
            else if(val > m) j=mid-1;
            else i=mid+1;
        }
        return -1;
    }
};
```
