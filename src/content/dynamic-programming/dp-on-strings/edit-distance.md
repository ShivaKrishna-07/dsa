---
title: "Edit Distance"
difficulty: "Medium"
time: "O(N * M)"
space: "O(M)"
platforms:
  leetcode: "https://leetcode.com/problems/edit-distance/"
  youtube: "https://www.youtube.com/watch?v=fJaKO8FbDdo"
  article: "https://takeuforward.org/data-structure/edit-distance-dp-33/"
---

### Problem Statement

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.

### Examples

```text
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Input: word1 = "intention", word2 = "execution"
Output: 5
```

### Intuition

If characters match (`word1[i] == word2[j]`), no edit is needed: `solve(i - 1, j - 1)`. Otherwise, try 3 operations: Insert (`solve(i, j - 1)`), Delete (`solve(i - 1, j)`), or Replace (`solve(i - 1, j - 1)`), adding 1 to the minimum.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, string& s1, string& s2) {
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        if (s1[i] == s2[j]) {
            return solve(i - 1, j - 1, s1, s2);
        }
        // Operations: Insert, Delete, Replace
        int insertOp = 1 + solve(i, j - 1, s1, s2);
        int deleteOp = 1 + solve(i - 1, j, s1, s2);
        int replaceOp = 1 + solve(i - 1, j - 1, s1, s2);
        return min({insertOp, deleteOp, replaceOp});
    }
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        return solve(n - 1, m - 1, word1, word2);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, string& s1, string& s2, vector<vector<int>>& dp) {
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        if (dp[i][j] != -1) return dp[i][j];
        if (s1[i] == s2[j]) {
            return dp[i][j] = solve(i - 1, j - 1, s1, s2, dp);
        }
        int insertOp = 1 + solve(i, j - 1, s1, s2, dp);
        int deleteOp = 1 + solve(i - 1, j, s1, s2, dp);
        int replaceOp = 1 + solve(i - 1, j - 1, s1, s2, dp);
        return dp[i][j] = min({insertOp, deleteOp, replaceOp});
    }
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(n - 1, m - 1, word1, word2, dp);
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

        // Base cases: empty prefixes require deletions/insertions
        for (int i = 0; i <= n; i++) dp[i][0] = i;
        for (int j = 0; j <= m; j++) dp[0][j] = j;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]});
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
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();
        vector<int> prev(m + 1, 0);

        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            vector<int> curr(m + 1, 0);
            curr[0] = i;
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min({curr[j - 1], prev[j], prev[j - 1]});
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
