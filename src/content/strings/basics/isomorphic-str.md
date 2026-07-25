---
title: "Isomorphic Strings"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/isomorphic-strings/"
  youtube: "https://www.youtube.com/results?search_query=isomorphic+strings+leetcode+cpp"
tags:
  - "Strings"
  - "Hash Table"
  - "Character Mapping"
---

### Problem Statement

Given two strings `s` and `t`, determine whether they are isomorphic.

Two strings are isomorphic if every character in `s` can be replaced with exactly one character to get `t`, while preserving order. No two different characters in `s` may map to the same character in `t`, but a character may map to itself.

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist of valid ASCII characters.

### Examples

**Example 1:**
```text
Input: s = "egg", t = "add"
Output: true
Explanation: 'e' maps to 'a' and 'g' maps to 'd'.
```

**Example 2:**
```text
Input: s = "foo", t = "bar"
Output: false
Explanation: 'o' would need to map to both 'a' and 'r'.
```

### Intuition

The mapping must be one-to-one in both directions. Checking only `s -> t` is not enough because two different characters from `s` could map to the same character in `t`.

### Approach

Maintain two arrays/maps: one for mapping characters from `s` to `t`, and one for `t` to `s`. While scanning both strings, reject as soon as an existing mapping conflicts.

### Code

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        vector<int> mapST(256, -1), mapTS(256, -1);

        for (int i = 0; i < s.size(); i++) {
            unsigned char a = s[i];
            unsigned char b = t[i];

            if (mapST[a] == -1 && mapTS[b] == -1) {
                mapST[a] = b;
                mapTS[b] = a;
            } else if (mapST[a] != b || mapTS[b] != a) {
                return false;
            }
        }

        return true;
    }
};
```
