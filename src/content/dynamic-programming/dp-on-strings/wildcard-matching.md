---
title: "Wildcard Matching"
difficulty: "Hard"
time: "O(N * M)"
space: "O(M)"
platforms:
  leetcode: "https://leetcode.com/problems/wildcard-matching/"
  youtube: "https://www.youtube.com/watch?v=ZmlQ3FdIt5k"
  article: "https://takeuforward.org/data-structure/wildcard-matching-dp-34/"
---

### Problem Statement

Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `'?'` and `'*'` where: `'?'` matches any single character, and `'*'` matches any sequence of characters (including the empty sequence). The matching should cover the entire input string (not partial).

### Examples

```text
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.

Input: s = "cb", p = "?a"
Output: false
```

### Intuition

If `p[j] == '?'` or `p[j] == s[i]`, advance both pointers. If `p[j] == '*'`, either treat `'*'` as empty sequence (`solve(i, j - 1)`) or match current character and remain on `'*'` (`solve(i - 1, j)`).

### Code

```cpp
// Recursion
class Solution {
private:
    bool solve(int i, int j, string& s, string& p) {
        if (i < 0 && j < 0) return true;
        if (j < 0 && i >= 0) return false;
        if (i < 0 && j >= 0) {
            // Empty s requires pattern to be all '*'
            for (int k = 0; k <= j; k++) {
                if (p[k] != '*') return false;
            }
            return true;
        }
        if (s[i] == p[j] || p[j] == '?') {
            return solve(i - 1, j - 1, s, p);
        }
        if (p[j] == '*') {
            // Either match empty sequence or match 1 character of s and keep '*'
            return solve(i, j - 1, s, p) || solve(i - 1, j, s, p);
        }
        return false;
    }
public:
    bool isMatch(string s, string p) {
        int n = s.size();
        int m = p.size();
        return solve(n - 1, m - 1, s, p);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    bool solve(int i, int j, string& s, string& p, vector<vector<int>>& dp) {
        if (i < 0 && j < 0) return true;
        if (j < 0 && i >= 0) return false;
        if (i < 0 && j >= 0) {
            for (int k = 0; k <= j; k++) {
                if (p[k] != '*') return false;
            }
            return true;
        }
        if (dp[i][j] != -1) return dp[i][j];
        if (s[i] == p[j] || p[j] == '?') {
            return dp[i][j] = solve(i - 1, j - 1, s, p, dp);
        }
        if (p[j] == '*') {
            return dp[i][j] = solve(i, j - 1, s, p, dp) || solve(i - 1, j, s, p, dp);
        }
        return dp[i][j] = false;
    }
public:
    bool isMatch(string s, string p) {
        int n = s.size();
        int m = p.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(n - 1, m - 1, s, p, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size();
        int m = p.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));

        dp[0][0] = true;
        // Prefix of p having only '*' matches empty s
        for (int j = 1; j <= m; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s[i - 1] == p[j - 1] || p[j - 1] == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else {
                    dp[i][j] = false;
                }
            }
        }
        return dp[n][m];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size();
        int m = p.size();
        vector<bool> prev(m + 1, false);

        prev[0] = true;
        for (int j = 1; j <= m; j++) {
            if (p[j - 1] == '*') {
                prev[j] = prev[j - 1];
            }
        }

        for (int i = 1; i <= n; i++) {
            vector<bool> curr(m + 1, false);
            for (int j = 1; j <= m; j++) {
                if (s[i - 1] == p[j - 1] || p[j - 1] == '?') {
                    curr[j] = prev[j - 1];
                } else if (p[j - 1] == '*') {
                    curr[j] = curr[j - 1] || prev[j];
                } else {
                    curr[j] = false;
                }
            }
            prev = curr;
        }
        return prev[m];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(M)
