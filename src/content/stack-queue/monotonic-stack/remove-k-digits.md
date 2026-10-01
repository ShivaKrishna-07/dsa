---
title: "Remove K Digits"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Remove+K+Digits+leetcode+402"
  leetcode: "https://leetcode.com/problems/remove-k-digits/"
---

### Problem Statement

Given string `num` representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.

**Example 1:**
```text
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

**Example 2:**
```text
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
```

**Example 3: (Edge Case - Remove all)**
```text
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
```

---

### Intuition

To make the resulting number as small as possible, we should prioritize removing larger digits that appear earlier (at higher decimal places). 
We can use a **Monotonic Stack**. As we iterate through the digits from left to right, if the current digit is smaller than the top of our stack, popping the top digit guarantees a smaller resulting number! We do this until we've removed `k` digits. Finally, we handle edge cases like remaining `k` (e.g., for increasing strings like "1234"), and strip leading zeros.

---

### Code

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string ans = ""; // Using string as a stack
        
        for (char c : num) {
            // While current digit is smaller than the last recorded digit, pop it!
            while (ans.length() > 0 && ans.back() > c && k > 0) {
                ans.pop_back();
                k--;
            }
            
            // Prevent pushing leading zeros
            if (ans.length() > 0 || c != '0') {
                ans.push_back(c);
            }
        }
        
        // If we still need to remove digits (e.g., number was like "1234")
        while (ans.length() > 0 && k > 0) {
            ans.pop_back();
            k--;
        }
        
        // If string is empty, the smallest number is "0"
        if (ans == "") return "0";
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of `num`. Every digit is pushed and popped at most once.
- **Space Complexity:** `O(N)` to store the result (which acts as our stack).
