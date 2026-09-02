---
title: "Count Good Numbers"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Count+Good+Numbers"
platforms:
  leetcode: "https://leetcode.com/problems/count-good-numbers/description/"
---

### Problem Statement

A digit string is **good** if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (`2`, `3`, `5`, or `7`).
- For example, `"2582"` is good because the digits (`2` and `8`) at even positions are even and the digits (`5` and `2`) at odd positions are prime. 
- However, `"3245"` is not good because `3` is at an even index but is not even.

Given an integer `n`, return the total number of good digit strings of length `n`. Since the answer may be large, return it modulo $10^9 + 7$.

A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

**Constraints:**
- $1 \le n \le 10^{15}$

---

### Code

```cpp
class Solution {
public:
    const long long MOD = 1e9+7;
    long long findPow(long long x, long long n){
        if(n == 0) return 1;
        
        long long half = findPow(x, n/2);
        long long result = (half*half)%MOD;

        if(n%2 == 1) result = (result*x)%MOD;

        return result;
    }
    int countGoodNumbers(long long n) {
        return (findPow(5, (n+1)/2)*findPow(4, n/2))%MOD;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log N)$, where $N$ is the input integer `n`. We use binary exponentiation (`findPow`) to compute $5^{\text{even positions}}$ and $4^{\text{odd positions}}$, which halves the search space at each recursive step.
- **Space Complexity:** $\mathcal{O}(\log N)$ auxiliary space required for the recursive call stack during the binary exponentiation process.
