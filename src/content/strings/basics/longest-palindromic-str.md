---
title: "Longest Palindromic Substring"
difficulty: "Medium"
time: "O(N^2)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-palindromic-substring/"
  youtube: "https://www.youtube.com/results?search_query=longest+palindromic+substring+leetcode+cpp"
tags:
  - "Strings"
  - "Two Pointers"
  - "Palindrome"
---

### Problem Statement

Given a string `s`, return the longest palindromic substring in `s`.

A palindrome reads the same forward and backward. If multiple longest palindromic substrings exist, returning any one of them is accepted.

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of only digits and English letters.

### Examples

**Example 1:**
```text
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**
```text
Input: s = "cbbd"
Output: "bb"
Explanation: The longest palindrome has even length.
```

### Intuition

Every palindrome has a center. The center can be one character for odd length palindromes or the gap between two characters for even length palindromes.

### Approach

For every index, expand around both possible centers. Track the best start and length found during expansion.

### Code

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int bestStart = 0, bestLen = 1;

        auto expand = [&](int left, int right) {
            while (left >= 0 && right < s.size() && s[left] == s[right]) {
                left--;
                right++;
            }

            int len = right - left - 1;
            if (len > bestLen) {
                bestLen = len;
                bestStart = left + 1;
            }
        };

        for (int i = 0; i < s.size(); i++) {
            expand(i, i);
            expand(i, i + 1);
        }

        return s.substr(bestStart, bestLen);
    }
};
```
