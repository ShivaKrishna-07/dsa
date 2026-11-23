---
title: "Longest Palindromic Subsequence"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-palindromic-subsequence/"
  youtube: "https://www.youtube.com/watch?v=6i_T5kkfv4A"
  article: "https://takeuforward.org/data-structure/longest-palindromic-subsequence-dp-28/"
---

### Problem Statement

Given a string `s`, find the longest palindromic subsequence's length in `s`. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

### Examples

```text
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
```

### Intuition

A palindrome reads the same forwards and backwards. The longest palindromic subsequence of `s` is simply the Longest Common Subsequence of `s` and its reverse `reverse(s)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, string& s, string& rev) {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (s[i] == rev[j]) {
            return 1 + solve(i - 1, j - 1, s, rev);
        }
        return max(solve(i - 1, j, s, rev), solve(i, j - 1, s, rev));
    }
public:
    int longestPalindromeSubseq(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        return solve(n - 1, n - 1, s, rev);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, string& s, string& rev, vector<vector<int>>& dp) {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        if (s[i] == rev[j]) {
            return dp[i][j] = 1 + solve(i - 1, j - 1, s, rev, dp);
        }
        return dp[i][j] = max(solve(i - 1, j, s, rev, dp), solve(i, j - 1, s, rev, dp));
    }
public:
    int longestPalindromeSubseq(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return solve(n - 1, n - 1, s, rev, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        // LCS between s and reversed s
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == rev[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][n];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        vector<int> prev(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            vector<int> curr(n + 1, 0);
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == rev[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        return prev[n];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
