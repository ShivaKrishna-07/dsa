---
title: "Balanced Parentheses"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Valid+Parentheses+leetcode+20"
  leetcode: "https://leetcode.com/problems/valid-parentheses/"
  gfg: "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1"
---

### Problem Statement

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
```text
Input: s = "()[]{}"
Output: true
```

**Example 2:**
```text
Input: s = "(]"
Output: false
```

**Example 3: (Edge Case - Only open brackets)**
```text
Input: s = "((("
Output: false
Explanation: The brackets are never closed.
```

---

### Intuition

Since brackets must be closed in the reverse order they were opened (Last-In-First-Out), a Stack is the ideal data structure. As we iterate through the string, we push any opening brackets onto the stack. When we encounter a closing bracket, we check if the stack is empty (meaning no matching open bracket exists) or if the top of the stack matches the closing bracket. If everything matches perfectly and the stack ends up empty, the string is valid.

---

### Code

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        
        for (char ch : s) {
            // Push opening brackets onto the stack
            if (ch == '(' || ch == '{' || ch == '[') {
                st.push(ch);
            } 
            // Handle closing brackets
            else {
                // If stack is empty, there is no matching opening bracket
                if (st.empty()) return false;
                
                char top = st.top();
                // Check if the top matches the corresponding closing bracket
                if ((ch == ')' && top == '(') ||
                    (ch == '}' && top == '{') ||
                    (ch == ']' && top == '[')) {
                    st.pop();
                } else {
                    return false; // Mismatch found
                }
            }
        }
        
        // If stack is empty, all brackets were matched
        return st.empty();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We iterate through the string exactly once.
- **Space Complexity:** `O(N)` in the worst case (e.g., all opening brackets) as we store characters in the stack.
