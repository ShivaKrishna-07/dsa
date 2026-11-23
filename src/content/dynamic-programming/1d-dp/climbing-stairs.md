---
title: "Climbing Stairs"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/climbing-stairs/"
  youtube: "https://www.youtube.com/watch?v=mLfjzJsN8us"
  article: "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/"
---

### Problem Statement

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

### Examples

```text
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

### Intuition

To reach step `i`, the frog/climber must have come from either step `i - 1` (by taking 1 step) or step `i - 2` (by taking 2 steps). Hence, the total distinct ways to reach step `i` is the sum of ways to reach `i - 1` and `i - 2`, which matches the Fibonacci recurrence.

### Code

```cpp
// Recursion
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        // Either take 1 step from (n - 1) or 2 steps from (n - 2)
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int n, vector<int>& dp) {
        if (n <= 1) {
            return 1;
        }
        if (dp[n] != -1) {
            return dp[n];
        }
        // Store sum of subproblems
        return dp[n] = solve(n - 1, dp) + solve(n - 2, dp);
    }
public:
    int climbStairs(int n) {
        vector<int> dp(n + 1, -1);
        return solve(n, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        vector<int> dp(n + 1);
        // Base cases: 1 way to be at ground (0 steps) or take 1 step
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        int prev2 = 1;
        int prev = 1;

        for (int i = 2; i <= n; i++) {
            int curr = prev + prev2;
            prev2 = prev;
            prev = curr;
        }
        return prev;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
