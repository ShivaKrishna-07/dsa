---
title: "Minimum Insertions / Deletions to Convert String"
difficulty: "Medium"
time: "O(N * M)"
space: "O(M)"
platforms:
  leetcode: "https://leetcode.com/problems/delete-operation-for-two-strings/"
  youtube: "https://www.youtube.com/watch?v=yMnHDevQu34"
  article: "https://takeuforward.org/data-structure/minimum-insertions-deletions-to-convert-string-dp-30/"
---

### Problem Statement

Given two strings `word1` and `word2`, return the minimum number of steps required to make `word1` and `word2` the same. In one step, you can delete exactly one character in either string.

### Examples

```text
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and one step to make "eat" to "ea".

Input: word1 = "leetcode", word2 = "etco"
Output: 4
```

### Intuition

To minimize operations, keep the maximum number of common characters in order (which is the LCS). Then delete unwanted characters from `word1` (`n - len(LCS)`) and delete from `word2` (`m - len(LCS)`). Total operations = `n + m - 2 * len(LCS)`.

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
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        int common = lcs(n - 1, m - 1, word1, word2);
        return (n - common) + (m - common);
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
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        int common = lcs(n - 1, m - 1, word1, word2, dp);
        return (n - common) + (m - common);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        int common = dp[n][m];
        return (n - common) + (m - common);
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        vector<int> prev(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            vector<int> curr(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        int common = prev[m];
        return (n - common) + (m - common);
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * M)
- **Space Complexity:** O(M)
