---
title: "Minimum Insertions to Make String Palindrome"
difficulty: "Hard"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/"
  youtube: "https://www.youtube.com/watch?v=xPBLEj41rFU"
  article: "https://takeuforward.org/data-structure/minimum-insertions-to-make-string-palindrome-dp-29/"
---

### Problem Statement

Given a string `s`. In one step you can insert any character at any index of the string. Return the minimum number of steps to make `s` palindrome.

### Examples

```text
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already a palindrome we do not need to insert any character.

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
```

### Intuition

To minimize insertions, keep the longest palindromic subsequence unchanged and insert matching counterparts for all remaining characters: `n - length(LPS)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int lcs(int i, int j, string& s1, string& s2) {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (s1[i] == s2[j]) {
            return 1 + lcs(i - 1, j - 1, s1, s2);
        }
        return max(lcs(i - 1, j, s1, s2), lcs(i, j - 1, s1, s2));
    }
public:
    int minInsertions(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        // Insertions needed = total length - LPS length
        return n - lcs(n - 1, n - 1, s, rev);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int lcs(int i, int j, string& s1, string& s2, vector<vector<int>>& dp) {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        if (s1[i] == s2[j]) {
            return dp[i][j] = 1 + lcs(i - 1, j - 1, s1, s2, dp);
        }
        return dp[i][j] = max(lcs(i - 1, j, s1, s2, dp), lcs(i, j - 1, s1, s2, dp));
    }
public:
    int minInsertions(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return n - lcs(n - 1, n - 1, s, rev, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minInsertions(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == rev[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return n - dp[n][n];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minInsertions(string s) {
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
        return n - prev[n];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
