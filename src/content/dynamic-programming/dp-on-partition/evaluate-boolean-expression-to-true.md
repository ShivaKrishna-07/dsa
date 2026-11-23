---
title: "Evaluate Boolean Expression to True"
difficulty: "Hard"
time: "O(N^3)"
space: "O(N^2)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/boolean-parenthesization5611/1"
  youtube: "https://www.youtube.com/watch?v=MM7fXopgyjw"
  article: "https://takeuforward.org/data-structure/boolean-evaluation-to-true-partition-dp-dp-52/"
---

### Problem Statement

Given a boolean expression with symbols `'T'`, `'F'`, and operators `'&'`, `'|'`, `'^'`. Find the number of ways to parenthesize the expression such that it evaluates to true. Return the answer modulo `1003` (or `10^9 + 7`).

### Examples

```text
Input: s = "T|T&F^T"
Output: 4
Explanation: ((T|T)&(F^T)), (T|(T&(F^T))), (((T|T)&F)^T) and (T|((T&F)^T)) are the 4 ways.

Input: s = "T^F"
Output: 1
```

### Intuition

For any operator at index `k`, calculate the number of ways left expression evaluates to true/false and right expression evaluates to true/false. Use boolean logic to aggregate ways to produce true.

### Code

```cpp
// Recursion
class Solution {
private:
    const int MOD = 1003;
    int solve(int i, int j, bool isTrue, string& s) {
        if (i > j) return 0;
        if (i == j) {
            if (isTrue) return (s[i] == 'T') ? 1 : 0;
            return (s[i] == 'F') ? 1 : 0;
        }

        int ways = 0;
        // Operators are at odd indices i + 1, i + 3, ...
        for (int k = i + 1; k <= j - 1; k += 2) {
            int lT = solve(i, k - 1, true, s);
            int lF = solve(i, k - 1, false, s);
            int rT = solve(k + 1, j, true, s);
            int rF = solve(k + 1, j, false, s);

            if (s[k] == '&') {
                if (isTrue) ways = (ways + lT * rT) % MOD;
                else ways = (ways + lF * rT + lT * rF + lF * rF) % MOD;
            } else if (s[k] == '|') {
                if (isTrue) ways = (ways + lT * rT + lT * rF + lF * rT) % MOD;
                else ways = (ways + lF * rF) % MOD;
            } else if (s[k] == '^') {
                if (isTrue) ways = (ways + lT * rF + lF * rT) % MOD;
                else ways = (ways + lT * rT + lF * rF) % MOD;
            }
        }
        return ways;
    }
public:
    int countWays(int n, string s) {
        return solve(0, n - 1, true, s);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    const int MOD = 1003;
    int solve(int i, int j, int isTrue, string& s, vector<vector<vector<int>>>& dp) {
        if (i > j) return 0;
        if (i == j) {
            if (isTrue) return (s[i] == 'T') ? 1 : 0;
            return (s[i] == 'F') ? 1 : 0;
        }
        if (dp[i][j][isTrue] != -1) return dp[i][j][isTrue];

        int ways = 0;
        for (int k = i + 1; k <= j - 1; k += 2) {
            int lT = solve(i, k - 1, 1, s, dp);
            int lF = solve(i, k - 1, 0, s, dp);
            int rT = solve(k + 1, j, 1, s, dp);
            int rF = solve(k + 1, j, 0, s, dp);

            if (s[k] == '&') {
                if (isTrue) ways = (ways + lT * rT) % MOD;
                else ways = (ways + lF * rT + lT * rF + lF * rF) % MOD;
            } else if (s[k] == '|') {
                if (isTrue) ways = (ways + lT * rT + lT * rF + lF * rT) % MOD;
                else ways = (ways + lF * rF) % MOD;
            } else if (s[k] == '^') {
                if (isTrue) ways = (ways + lT * rF + lF * rT) % MOD;
                else ways = (ways + lT * rT + lF * rF) % MOD;
            }
        }
        return dp[i][j][isTrue] = ways;
    }
public:
    int countWays(int n, string s) {
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(2, -1)));
        return solve(0, n - 1, 1, s, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int countWays(int n, string s) {
        const int MOD = 1003;
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(2, 0)));

        for (int i = 0; i < n; i += 2) {
            dp[i][i][1] = (s[i] == 'T') ? 1 : 0;
            dp[i][i][0] = (s[i] == 'F') ? 1 : 0;
        }

        for (int i = n - 1; i >= 0; i -= 2) {
            for (int j = i + 2; j < n; j += 2) {
                for (int isTrue = 0; isTrue <= 1; isTrue++) {
                    int ways = 0;
                    for (int k = i + 1; k <= j - 1; k += 2) {
                        int lT = dp[i][k - 1][1];
                        int lF = dp[i][k - 1][0];
                        int rT = dp[k + 1][j][1];
                        int rF = dp[k + 1][j][0];

                        if (s[k] == '&') {
                            if (isTrue) ways = (ways + lT * rT) % MOD;
                            else ways = (ways + lF * rT + lT * rF + lF * rF) % MOD;
                        } else if (s[k] == '|') {
                            if (isTrue) ways = (ways + lT * rT + lT * rF + lF * rT) % MOD;
                            else ways = (ways + lF * rF) % MOD;
                        } else if (s[k] == '^') {
                            if (isTrue) ways = (ways + lT * rF + lF * rT) % MOD;
                            else ways = (ways + lT * rT + lF * rF) % MOD;
                        }
                    }
                    dp[i][j][isTrue] = ways;
                }
            }
        }
        return dp[0][n - 1][1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int countWays(int n, string s) {
        // Evaluation requires full NxNx2 table
        const int MOD = 1003;
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(2, 0)));

        for (int i = 0; i < n; i += 2) {
            dp[i][i][1] = (s[i] == 'T') ? 1 : 0;
            dp[i][i][0] = (s[i] == 'F') ? 1 : 0;
        }

        for (int i = n - 1; i >= 0; i -= 2) {
            for (int j = i + 2; j < n; j += 2) {
                for (int isTrue = 0; isTrue <= 1; isTrue++) {
                    int ways = 0;
                    for (int k = i + 1; k <= j - 1; k += 2) {
                        int lT = dp[i][k - 1][1];
                        int lF = dp[i][k - 1][0];
                        int rT = dp[k + 1][j][1];
                        int rF = dp[k + 1][j][0];

                        if (s[k] == '&') {
                            if (isTrue) ways = (ways + lT * rT) % MOD;
                            else ways = (ways + lF * rT + lT * rF + lF * rF) % MOD;
                        } else if (s[k] == '|') {
                            if (isTrue) ways = (ways + lT * rT + lT * rF + lF * rT) % MOD;
                            else ways = (ways + lF * rF) % MOD;
                        } else if (s[k] == '^') {
                            if (isTrue) ways = (ways + lT * rF + lF * rT) % MOD;
                            else ways = (ways + lT * rT + lF * rF) % MOD;
                        }
                    }
                    dp[i][j][isTrue] = ways;
                }
            }
        }
        return dp[0][n - 1][1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^3)
- **Space Complexity:** O(N^2)
