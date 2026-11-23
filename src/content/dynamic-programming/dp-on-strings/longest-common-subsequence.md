---
title: "Longest Common Subsequence"
difficulty: "Medium"
time: "O(N * M)"
space: "O(M)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-common-subsequence/"
  youtube: "https://www.youtube.com/watch?v=NPZn9jBrX8U"
  article: "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/"
---

### Problem Statement

Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.

### Examples

```text
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Input: text1 = "abc", text2 = "def"
Output: 0
```

### Intuition

If characters match (`text1[i] == text2[j]`), both pointers advance with cost `1 + solve(i - 1, j - 1)`. If they do not match, take the maximum of advancing either pointer: `max(solve(i - 1, j), solve(i, j - 1))`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, string& s1, string& s2) {
        if (i < 0 || j < 0) {
            return 0;
        }
        // If characters match, advance both pointers
        if (s1[i] == s2[j]) {
            return 1 + solve(i - 1, j - 1, s1, s2);
        }
        // Otherwise try skipping a character in either string
        return max(solve(i - 1, j, s1, s2), solve(i, j - 1, s1, s2));
    }
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        return solve(n - 1, m - 1, text1, text2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, string& s1, string& s2, vector<vector<int>>& dp) {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        if (s1[i] == s2[j]) {
            return dp[i][j] = 1 + solve(i - 1, j - 1, s1, s2, dp);
        }
        return dp[i][j] = max(solve(i - 1, j, s1, s2, dp), solve(i, j - 1, s1, s2, dp));
    }
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(n - 1, m - 1, text1, text2, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // 1-based indexing for clean boundary conditions
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
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
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<int> prev(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            vector<int> curr(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
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
