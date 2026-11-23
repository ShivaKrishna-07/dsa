---
title: "Longest String Chain"
difficulty: "Medium"
time: "O(N * logN + N^2 * L)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-string-chain/"
  youtube: "https://www.youtube.com/watch?v=YY8iBaYcc4g"
  article: "https://takeuforward.org/data-structure/longest-string-chain-dp-45/"
---

### Problem Statement

You are given an array of `words` where each word consists of lowercase English letters. `wordA` is a predecessor of `wordB` if and only if we can insert exactly one letter anywhere in `wordA` without changing the order of the other characters to make it equal to `wordB`. Return the length of the longest possible word chain with words chosen from the given list of words.

### Examples

```text
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
```

### Intuition

Sort words by length. Check predecessor condition between two words `s1` and `s2` (length difference must be 1, and `s1` must be formed by removing exactly 1 character from `s2`). Then apply 1D LIS DP.

### Code

```cpp
// Recursion
class Solution {
private:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.size() + 1 != s2.size()) return false;
        int i = 0, j = 0;
        while (j < s2.size()) {
            if (i < s1.size() && s1[i] == s2[j]) {
                i++;
            }
            j++;
        }
        return i == s1.size();
    }

    int solve(int idx, int prevIdx, vector<string>& words) {
        if (idx == words.size()) {
            return 0;
        }
        int notTake = solve(idx + 1, prevIdx, words);
        int take = 0;
        if (prevIdx == -1 || isPredecessor(words[prevIdx], words[idx])) {
            take = 1 + solve(idx + 1, idx, words);
        }
        return max(notTake, take);
    }
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });
        return solve(0, -1, words);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.size() + 1 != s2.size()) return false;
        int i = 0, j = 0;
        while (j < s2.size()) {
            if (i < s1.size() && s1[i] == s2[j]) {
                i++;
            }
            j++;
        }
        return i == s1.size();
    }

    int solve(int idx, int prevIdx, vector<string>& words, vector<vector<int>>& dp) {
        if (idx == words.size()) {
            return 0;
        }
        if (dp[idx][prevIdx + 1] != -1) {
            return dp[idx][prevIdx + 1];
        }
        int notTake = solve(idx + 1, prevIdx, words, dp);
        int take = 0;
        if (prevIdx == -1 || isPredecessor(words[prevIdx], words[idx])) {
            take = 1 + solve(idx + 1, idx, words, dp);
        }
        return dp[idx][prevIdx + 1] = max(notTake, take);
    }
public:
    int longestStrChain(vector<string>& words) {
        int n = words.size();
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        return solve(0, -1, words, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
private:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.size() + 1 != s2.size()) return false;
        int i = 0, j = 0;
        while (j < s2.size()) {
            if (i < s1.size() && s1[i] == s2[j]) {
                i++;
            }
            j++;
        }
        return i == s1.size();
    }
public:
    int longestStrChain(vector<string>& words) {
        int n = words.size();
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });

        vector<int> dp(n, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (isPredecessor(words[prev], words[i]) && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        return maxLen;
    }
};
```

```cpp
// Space Optimization
class Solution {
private:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.size() + 1 != s2.size()) return false;
        int i = 0, j = 0;
        while (j < s2.size()) {
            if (i < s1.size() && s1[i] == s2[j]) {
                i++;
            }
            j++;
        }
        return i == s1.size();
    }
public:
    int longestStrChain(vector<string>& words) {
        int n = words.size();
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });

        vector<int> dp(n, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (isPredecessor(words[prev], words[i]) && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        return maxLen;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * logN + N^2 * L)
- **Space Complexity:** O(N)
