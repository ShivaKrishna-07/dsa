---
title: "Valid Parenthesis Checker"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Valid+Parenthesis+String+leetcode+678"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/valid-parenthesis-string/"
---

### Problem Statement

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` if `s` is valid.

The following rules define a valid string:
- Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
- Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
- Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
- `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.

**Example 1:**
```text
Input: s = "(*)"
Output: true
```

---

### Code

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int cmin = 0, cmax = 0;
        
        for (char c : s) {
            if (c == '(') {
                cmax++;
                cmin++;
            } else if (c == ')') {
                cmax--;
                cmin = max(cmin - 1, 0);
            } else if (c == '*') {
                cmax++;
                cmin = max(cmin - 1, 0);
            }
            if (cmax < 0) return false;
        }
        
        return cmin == 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of string `s`. We traverse the string once.
- **Space Complexity:** `O(1)` as we only maintain two variables `cmin` and `cmax`.
