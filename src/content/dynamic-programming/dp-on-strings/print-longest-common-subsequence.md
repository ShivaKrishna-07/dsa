---
title: "Print Longest Common Subsequence"
difficulty: "Medium"
time: "O(N * M)"
space: "O(N * M)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/print-all-lcs-sequences3413/1"
  youtube: "https://www.youtube.com/watch?v=-zI4LmblZ38"
  article: "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/"
---

### Problem Statement

Given two strings `s1` and `s2`, print the longest common subsequence string between them.

### Examples

```text
Input: s1 = "abcde", s2 = "bdgek"
Output: "bde"
Explanation: The longest common subsequence is "bde".

Input: s1 = "ab", s2 = "cd"
Output: ""
```

### Intuition

Build the LCS 2D DP matrix. Then backtrack starting from `dp[n][m]`: if characters match, prepend the character to result and step diagonally `(i - 1, j - 1)`; otherwise step to whichever neighbor has larger value.

### Code

```cpp
// Recursion
class Solution {
private:
    string solve(int i, int j, string& s1, string& s2) {
        if (i < 0 || j < 0) {
            return "";
        }
        if (s1[i] == s2[j]) {
            return solve(i - 1, j - 1, s1, s2) + s1[i];
        }
        string opt1 = solve(i - 1, j, s1, s2);
        string opt2 = solve(i, j - 1, s1, s2);
        return (opt1.size() >= opt2.size()) ? opt1 : opt2;
    }
public:
    string printLCS(string s1, string s2) {
        int n = s1.size();
        int m = s2.size();
        return solve(n - 1, m - 1, s1, s2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    string solve(int i, int j, string& s1, string& s2, vector<vector<string>>& dp) {
        if (i < 0 || j < 0) {
            return "";
        }
        if (!dp[i][j].empty()) {
            return dp[i][j];
        }
        if (s1[i] == s2[j]) {
            return dp[i][j] = solve(i - 1, j - 1, s1, s2, dp) + s1[i];
        }
        string opt1 = solve(i - 1, j, s1, s2, dp);
        string opt2 = solve(i, j - 1, s1, s2, dp);
        return dp[i][j] = (opt1.size() >= opt2.size()) ? opt1 : opt2;
    }
public:
    string printLCS(string s1, string s2) {
        int n = s1.size();
        int m = s2.size();
        vector<vector<string>> dp(n, vector<string>(m, ""));
        return solve(n - 1, m - 1, s1, s2, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    string printLCS(string s1, string s2) {
        int n = s1.size();
        int m = s2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtrack from (n, m) to reconstruct string
        string ans = "";
        int i = n;
        int j = m;
        while (i > 0 && j > 0) {
            if (s1[i - 1] == s2[j - 1]) {
                ans += s1[i - 1];
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
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
    string printLCS(string s1, string s2) {
        // LCS string reconstruction fundamentally requires backtracking through the table
        int n = s1.size();
        int m = s2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        string ans = "";
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s1[i - 1] == s2[j - 1]) {
                ans += s1[i - 1];
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        reverse(ans.begin(), ans.end());
        return ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(N * M)
