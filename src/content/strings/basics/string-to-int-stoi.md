---
title: "String to Integer (atoi)"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/string-to-integer-atoi/"
  youtube: "https://www.youtube.com/results?search_query=string+to+integer+atoi+leetcode+cpp"
tags:
  - "Strings"
  - "Parsing"
  - "Simulation"
---

### Problem Statement

Implement `myAtoi(string s)`, which converts a string to a 32-bit signed integer.

Ignore leading spaces, read an optional `+` or `-` sign, then read consecutive digits until a non-digit is reached. If the parsed value goes outside the 32-bit signed integer range, clamp it to `[-2^31, 2^31 - 1]`.

### Constraints

- `0 <= s.length <= 200`
- `s` contains English letters, digits, spaces, `+`, `-`, and `.`.
- Only the space character is considered whitespace.

### Examples

**Example 1:**
```text
Input: s = "42"
Output: 42
Explanation: The string starts directly with digits.
```

**Example 2:**
```text
Input: s = "   -042"
Output: -42
Explanation: Leading spaces are skipped, the sign is negative, and leading zeroes do not change the value.
```

### Intuition

This is a controlled parser. The important part is not conversion itself, but stopping at the correct character and preventing overflow before it happens.

### Approach

Skip spaces, read the sign, then build the number digit by digit. Before multiplying by 10 and adding the next digit, check whether that operation would overflow.

### Code

```cpp
class Solution {
public:
    int myAtoi(string s) {
        int n = s.size();
        int i = 0;

        while (i < n && s[i] == ' ') i++;

        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            if (s[i] == '-') sign = -1;
            i++;
        }

        long long result = 0;
        while (i < n && isdigit(s[i])) {
            int digit = s[i] - '0';

            if (result > (LLONG_MAX - digit) / 10) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }

            result = result * 10 + digit;

            if (sign == 1 && result > INT_MAX) return INT_MAX;
            if (sign == -1 && -result < INT_MIN) return INT_MIN;

            i++;
        }

        return sign * result;
    }
};
```
