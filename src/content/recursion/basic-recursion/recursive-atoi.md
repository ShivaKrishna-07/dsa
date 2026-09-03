---
title: "Recursive Implementation of atoi()"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Recursive+Implementation+of+atoi"
platforms:
  leetcode: "https://leetcode.com/problems/string-to-integer-atoi/description/"
---

### Problem Statement

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is `0`.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer so that it remains in the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`, and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.

Return the integer as the final result.

---

### Code

```cpp
class Solution {
public:
    int myAtoi(string s) {
        int n = s.size();

        int i = 0;
        while(i<n && s[i] == ' ') i++;

        int sign = 1;
        if(s[i] == '-' || s[i] == '+'){
            if(s[i] == '-') sign = -1;
            i++;
        }

        long ans = 0;
        // while(i<n && isdigit(s[i])){
        //     int digit = s[i] - '0';

        //     if(ans > (INT_MAX-digit)/10)
        //         return sign == 1 ? INT_MAX : INT_MIN;
            
        //     ans = ans*10 + digit;
        //     i++;
        // } 
        return atoi(s, ans, i, sign);
    }

    int atoi(string s, long ans, int i, int sign){
        if(sign*ans >= INT_MAX) return INT_MAX;
        if(sign*ans <= INT_MIN) return INT_MIN;

        if(i >= s.size() || !isdigit(s[i])) return sign*ans;
        ans = ans*10 + (s[i]-'0');

        return ans = atoi(s, ans, i+1, sign);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N), where N is the length of the string `s`. We iterate through the string once processing leading whitespaces, and then the recursive calls process the digit characters.
- **Space Complexity:** O(N) in the worst case for the call stack due to recursion, where N is the length of the numeric part of the string.
