---
title: "Distinct Subsequences"
difficulty: "Hard"
time: "O(N * M)"
space: "O(M)"
platforms:
  leetcode: "https://leetcode.com/problems/distinct-subsequences/"
  youtube: "https://www.youtube.com/watch?v=nVG7eTiD2bY"
  article: "https://takeuforward.org/data-structure/distinct-subsequences-dp-32/"
---

### Problem Statement

Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`. The test cases are generated so that the answer fits on a 32-bit signed integer.

### Examples

```text
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabb_b_it
rab_b_bit
ra_b_bbit
```

### Intuition

If characters match (`s[i] == t[j]`), we can either consume the matching character (`solve(i - 1, j - 1)`) or search for another occurrence in `s` (`solve(i - 1, j)`). If they don't match, we must skip `s[i]` (`solve(i - 1, j)`).

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, string& s, string& t) {
        if (j < 0) {
            // All characters in t matched
            return 1;
        }
        if (i < 0) {
            // String s exhausted before matching t
            return 0;
        }
        if (s[i] == t[j]) {
            return solve(i - 1, j - 1, s, t) + solve(i - 1, j, s, t);
        }
        return solve(i - 1, j, s, t);
    }
public:
    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();
        return solve(n - 1, m - 1, s, t);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, string& s, string& t, vector<vector<int>>& dp) {
        if (j < 0) {
            return 1;
        }
        if (i < 0) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        if (s[i] == t[j]) {
            return dp[i][j] = solve(i - 1, j - 1, s, t, dp) + solve(i - 1, j, s, t, dp);
        }
        return dp[i][j] = solve(i - 1, j, s, t, dp);
    }
public:
    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(n - 1, m - 1, s, t, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();
        vector<vector<double>> dp(n + 1, vector<double>(m + 1, 0));

        // Empty t can always be matched in 1 way
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s[i - 1] == t[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return (int)dp[n][m];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();
        vector<double> prev(m + 1, 0);

        prev[0] = 1;

        for (int i = 1; i <= n; i++) {
            // Traverse right to left for 1D array optimization
            for (int j = m; j >= 1; j--) {
                if (s[i - 1] == t[j - 1]) {
                    prev[j] = prev[j - 1] + prev[j];
                }
            }
        }
        return (int)prev[m];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(M)
