---
title: "Pow(x,n)"
difficulty: "Medium"
youtube: "https://www.youtube.com/watch?v=l0YC3876qxg"
time: "O(log N)"
space: "O(log N)"
platforms:
  leetcode: "https://leetcode.com/problems/powx-n/description/"
  article: "https://takeuforward.org/data-structure/implement-powxn-x-raised-to-the-power-n/"
---

### Problem Statement

Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., x^n).

**Constraints:**
- -100.0 < x < 100.0
- -2^{31} <= n <= 2^{31}-1
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- -10^4 <= x^n <= 10^4

---

### Code

```cpp
class Solution {
public:
    double helper(double x, long long n){
        // Base cases
        if(n == 0) return 1;
        if(n == 1) return x;

        // If exponent is even
        if(n%2 == 0) return helper(x*x, n/2);
        
        // If exponent is odd
        return x*helper(x, n-1);
    }
    double myPow(double x, int n) {
        long long N = n;
        double ans = helper(x, abs(N));

        if(N<0) return 1.0/ans;
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(\log N): The exponent is halved at each step, reducing the search space logarithmically.
- **Space Complexity:** O(\log N): Auxiliary space for the recursive call stack depth.
