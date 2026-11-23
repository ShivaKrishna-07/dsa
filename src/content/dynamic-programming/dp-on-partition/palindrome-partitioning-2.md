---
title: "Palindrome Partitioning II"
difficulty: "Hard"
time: "O(N^2)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/palindrome-partitioning-ii/"
  youtube: "https://www.youtube.com/watch?v=_H8V5hGDdfc"
  article: "https://takeuforward.org/data-structure/palindrome-partitioning-ii-front-partition-dp-53/"
---

### Problem Statement

Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return the minimum cuts needed for a palindrome partitioning of `s`.

### Examples

```text
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.

Input: s = "a"
Output: 0
```

### Intuition

Front partition: start at index `i`. For every `j` from `i` to `n - 1`, if substring `s[i...j]` is a palindrome, make a cut at `j` with cost `1 + solve(j + 1)`. Return the minimum cuts overall (subtracting 1 for the end boundary).

### Code

```cpp
// Recursion
class Solution {
private:
    bool isPalindrome(int i, int j, string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }

    int solve(int i, int n, string& s) {
        if (i == n) {
            return 0;
        }
        int minCuts = 1e9;
        // Check every prefix s[i...j] that forms a palindrome
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int cuts = 1 + solve(j + 1, n, s);
                minCuts = min(minCuts, cuts);
            }
        }
        return minCuts;
    }
public:
    int minCut(string s) {
        int n = s.size();
        return solve(0, n, s) - 1;
    }
};
```

```cpp
// Memoization
class Solution {
private:
    bool isPalindrome(int i, int j, string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }

    int solve(int i, int n, string& s, vector<int>& dp) {
        if (i == n) {
            return 0;
        }
        if (dp[i] != -1) return dp[i];
        int minCuts = 1e9;
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int cuts = 1 + solve(j + 1, n, s, dp);
                minCuts = min(minCuts, cuts);
            }
        }
        return dp[i] = minCuts;
    }
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n, -1);
        return solve(0, n, s, dp) - 1;
    }
};
```

```cpp
// Tabulation
class Solution {
private:
    bool isPalindrome(int i, int j, string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int minCuts = 1e9;
            for (int j = i; j < n; j++) {
                if (isPalindrome(i, j, s)) {
                    int cuts = 1 + dp[j + 1];
                    minCuts = min(minCuts, cuts);
                }
            }
            dp[i] = minCuts;
        }
        return dp[0] - 1;
    }
};
```

```cpp
// Space Optimization
class Solution {
private:
    bool isPalindrome(int i, int j, string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }
public:
    int minCut(string s) {
        // Tabulation already runs in O(N) space
        int n = s.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int minCuts = 1e9;
            for (int j = i; j < n; j++) {
                if (isPalindrome(i, j, s)) {
                    int cuts = 1 + dp[j + 1];
                    minCuts = min(minCuts, cuts);
                }
            }
            dp[i] = minCuts;
        }
        return dp[0] - 1;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N^2)
- **Space Complexity:** O(N)
