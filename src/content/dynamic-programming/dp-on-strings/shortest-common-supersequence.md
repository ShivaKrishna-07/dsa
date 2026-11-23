---
title: "Shortest Common Supersequence"
difficulty: "Hard"
time: "O(N * M)"
space: "O(N * M)"
platforms:
  leetcode: "https://leetcode.com/problems/shortest-common-supersequence/"
  youtube: "https://www.youtube.com/watch?v=xElxDA7d97I"
  article: "https://takeuforward.org/data-structure/shortest-common-supersequence-dp-31/"
---

### Problem Statement

Given two strings `str1` and `str2`, return the shortest string that has both `str1` and `str2` as subsequences. If there are multiple valid strings, return any of them.

### Examples

```text
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can look at the elements "cabac".
str2 = "cab" is a subsequence of "cabac" because we can look at the elements "cabac".
The result is the shortest string that can be made.
```

### Intuition

Build the LCS table. While backtracking: if `str1[i - 1] == str2[j - 1]`, write the character once and advance both. Otherwise, take the character from the path with the greater LCS value and advance that single pointer. Append any remaining characters at the end and reverse.

### Code

```cpp
// Recursion
class Solution {
private:
    string solve(int i, int j, string& s1, string& s2) {
        if (i < 0) return (j >= 0) ? s2.substr(0, j + 1) : "";
        if (j < 0) return (i >= 0) ? s1.substr(0, i + 1) : "";
        if (s1[i] == s2[j]) {
            return solve(i - 1, j - 1, s1, s2) + s1[i];
        }
        string opt1 = solve(i - 1, j, s1, s2) + s1[i];
        string opt2 = solve(i, j - 1, s1, s2) + s2[j];
        return (opt1.size() <= opt2.size()) ? opt1 : opt2;
    }
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size();
        int m = str2.size();
        return solve(n - 1, m - 1, str1, str2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    string solve(int i, int j, string& s1, string& s2, vector<vector<string>>& dp) {
        if (i < 0) return (j >= 0) ? s2.substr(0, j + 1) : "";
        if (j < 0) return (i >= 0) ? s1.substr(0, i + 1) : "";
        if (!dp[i][j].empty()) return dp[i][j];
        if (s1[i] == s2[j]) {
            return dp[i][j] = solve(i - 1, j - 1, s1, s2, dp) + s1[i];
        }
        string opt1 = solve(i - 1, j, s1, s2, dp) + s1[i];
        string opt2 = solve(i, j - 1, s1, s2, dp) + s2[j];
        return dp[i][j] = (opt1.size() <= opt2.size()) ? opt1 : opt2;
    }
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size();
        int m = str2.size();
        vector<vector<string>> dp(n, vector<string>(m, ""));
        return solve(n - 1, m - 1, str1, str2, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size();
        int m = str2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        string ans = "";
        int i = n;
        int j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                ans += str1[i - 1];
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                ans += str1[i - 1];
                i--;
            } else {
                ans += str2[j - 1];
                j--;
            }
        }
        while (i > 0) {
            ans += str1[i - 1];
            i--;
        }
        while (j > 0) {
            ans += str2[j - 1];
            j--;
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        // Full table is required to reconstruct the shortest supersequence string
        int n = str1.size();
        int m = str2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        string ans = "";
        int i = n;
        int j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                ans += str1[i - 1];
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                ans += str1[i - 1];
                i--;
            } else {
                ans += str2[j - 1];
                j--;
            }
        }
        while (i > 0) {
            ans += str1[i - 1];
            i--;
        }
        while (j > 0) {
            ans += str2[j - 1];
            j--;
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(N * M)
