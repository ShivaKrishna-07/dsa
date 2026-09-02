---
title: "Pow(x,n)"
difficulty: "Medium"
youtube: "https://www.youtube.com/watch?v=l0YC3876qxg"
platforms:
  leetcode: "https://leetcode.com/problems/powx-n/description/"
---

### Problem Statement

Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., $x^n$).

**Constraints:**
- $-100.0 < x < 100.0$
- $-2^{31} \le n \le 2^{31}-1$
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- $-10^4 \le x^n \le 10^4$

---

### Code

```cpp
class Solution {
public:
    double helper(double x, long long n){
        if(n == 0) return 1;
        if(n == 1) return x;

        if(n%2 == 0) return helper(x*x, n/2);
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

- **Time Complexity:** $\mathcal{O}(\log N)$, where $N$ is the absolute value of the exponent `n`. At each step, if $N$ is even, we square the base and halve the exponent. If odd, we decrease the exponent by $1$. This reduces the search space logarithmically, making the time complexity logarithmic.
- **Space Complexity:** $\mathcal{O}(\log N)$ auxiliary space required for the recursion stack. The maximum depth of the recursive tree will be proportional to the number of times we can halve $N$, which is $\log_2(N)$.
