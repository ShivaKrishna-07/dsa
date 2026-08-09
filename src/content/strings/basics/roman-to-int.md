---
title: "Roman to Integer"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/roman-to-integer/"
  youtube: "https://www.youtube.com/results?search_query=roman+to+integer+leetcode+cpp"
tags:
  - "Strings"
  - "Hash Table"
  - "Math"
---

### Problem Statement

Given a valid Roman numeral string, convert it to an integer.

Roman numerals normally add values from left to right, but six subtractive pairs are possible: `IV`, `IX`, `XL`, `XC`, `CD`, and `CM`.

### Constraints

- `1 <= s.length <= 15`
- `s` contains only `I`, `V`, `X`, `L`, `C`, `D`, and `M`.
- `s` is guaranteed to be a valid Roman numeral in the range `[1, 3999]`.

### Examples

**Example 1:**
```text
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V = 5, III = 3.
```

**Example 2:**
```text
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90, IV = 4.
```

### Intuition

If a smaller value appears before a larger value, it should be subtracted. Otherwise, it should be added.

### Approach

Scan from left to right. Compare each Roman value with the next value. Subtract when the current value is smaller than the next one; otherwise add it.

### Code

```cpp
class Solution {
public:
    int romanToInt(string s) {
        int res = 0;
        unordered_map<char, int> roman = {
            {'I', 1},
            {'V', 5},
            {'X', 10}, 
            {'L', 50},
            {'C', 100},
            {'D', 500},
            {'M', 1000}
        };

        for(int i=0; i<s.size()-1; i++){
            if(roman[s[i]] < roman[s[i+1]]) res-= roman[s[i]];
            else res += roman[s[i]];
        }
        return res+roman[s[s.size()-1]];
    }
};
```
