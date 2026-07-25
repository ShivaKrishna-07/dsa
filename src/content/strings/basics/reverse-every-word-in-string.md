---
title: "Reverse Words in a String"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/"
  youtube: "https://www.youtube.com/results?search_query=reverse+words+in+a+string+leetcode+cpp"
tags:
  - "Strings"
  - "Two Pointers"
  - "Word Parsing"
---

### Problem Statement

Given an input string `s`, reverse the order of the words.

A word is a sequence of non-space characters. The returned string should contain the words in reverse order separated by a single space, with no leading, trailing, or repeated spaces.

### Constraints

- `1 <= s.length <= 10^4`
- `s` contains English letters, digits, and spaces.
- There is at least one word in `s`.

### Examples

**Example 1:**
```text
Input: s = "the sky is blue"
Output: "blue is sky the"
Explanation: The words are returned in reverse order.
```

**Example 2:**
```text
Input: s = "  hello world  "
Output: "world hello"
Explanation: Extra spaces are removed.
```

### Intuition

The useful units are words, not individual characters. If we read words from left to right and place each new word at the front of the answer list, the final order is reversed.

### Approach

Scan the string and extract non-empty words. Reverse the list of words, then join them with a single space.

### Code

```cpp
class Solution {
public:
    string reverseWords(string s) {
        vector<string> words;
        int n = s.size();
        int i = 0;

        while (i < n) {
            while (i < n && s[i] == ' ') i++;
            if (i == n) break;

            int start = i;
            while (i < n && s[i] != ' ') i++;
            words.push_back(s.substr(start, i - start));
        }

        reverse(words.begin(), words.end());

        string ans;
        for (int j = 0; j < words.size(); j++) {
            if (j > 0) ans += ' ';
            ans += words[j];
        }

        return ans;
    }
};
```
