---
title: "Longest Common Substring"
difficulty: "Medium"
time: "O(N * M)"
space: "O(M)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/longest-common-substring1449/1"
  youtube: "https://www.youtube.com/watch?v=_wP9mWNac5I"
  article: "https://takeuforward.org/data-structure/longest-common-substring-dp-27/"
---

### Problem Statement

Given two strings `s1` and `s2`, find the length of the longest common substring between the two strings. A substring is contiguous.

### Examples

```text
Input: s1 = "ABCDGH", s2 = "ACDGHR"
Output: 4
Explanation: The longest common substring is "CDGH" with length 4.

Input: s1 = "ABC", s2 = "ACB"
Output: 1
```

### Intuition

Unlike LCS where subsequence characters can be non-contiguous, here whenever characters match, `dp[i][j] = 1 + dp[i - 1][j - 1]`. If they do not match, the contiguous match breaks, so `dp[i][j] = 0`. Track the maximum value across the table.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, int count, string& s1, string& s2) {
        if (i < 0 || j < 0) {
            return count;
        }
        int curr = count;
        if (s1[i] == s2[j]) {
            curr = solve(i - 1, j - 1, count + 1, s1, s2);
        }
        // Substring breaks if we shift index without a match
        int opt1 = solve(i - 1, j, 0, s1, s2);
        int opt2 = solve(i, j - 1, 0, s1, s2);
        return max({curr, opt1, opt2});
    }
public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n = s1.size();
        int m = s2.size();
        return solve(n - 1, m - 1, 0, s1, s2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, int count, string& s1, string& s2, vector<vector<vector<int>>>& dp) {
        if (i < 0 || j < 0) {
            return count;
        }
        if (dp[i][j][count] != -1) {
            return dp[i][j][count];
        }
        int curr = count;
        if (s1[i] == s2[j]) {
            curr = solve(i - 1, j - 1, count + 1, s1, s2, dp);
        }
        int opt1 = solve(i - 1, j, 0, s1, s2, dp);
        int opt2 = solve(i, j - 1, 0, s1, s2, dp);
        return dp[i][j][count] = max({curr, opt1, opt2});
    }
public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n = s1.size();
        int m = s2.size();
        int maxLen = min(n, m);
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(m, vector<int>(maxLen + 1, -1)));
        return solve(n - 1, m - 1, 0, s1, s2, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n = s1.size();
        int m = s2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                    maxLen = max(maxLen, dp[i][j]);
                } else {
                    // Contiguity broken: reset to 0
                    dp[i][j] = 0;
                }
            }
        }
        return maxLen;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n = s1.size();
        int m = s2.size();
        vector<int> prev(m + 1, 0);
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            vector<int> curr(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                    maxLen = max(maxLen, curr[j]);
                } else {
                    curr[j] = 0;
                }
            }
            prev = curr;
        }
        return maxLen;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(M)
