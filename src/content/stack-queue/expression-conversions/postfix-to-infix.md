---
title: "Postfix to Infix"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Postfix+to+Infix+Conversion"
  gfg: "https://practice.geeksforgeeks.org/problems/postfix-to-infix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a postfix expression. Convert it to an infix expression.
- Postfix expression: The operator follows the operands (e.g., `A B *`).
- Infix expression: The operator is between the operands (e.g., `(A * B)`).

*Note:* Ensure that the resulting infix expression is properly parenthesized to preserve the exact order of operations.

**Example 1:**
```text
Input: s = "ab*c+"
Output: ((a*b)+c)
```

**Example 2:**
```text
Input: s = "ABC/-AK/L-*"
Output: ((A-(B/C))*((A/K)-L))
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "ab+"
Output: (a+b)
```

---

### Intuition

To evaluate or convert a Postfix expression, we read it **forwards** (from left to right). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack (the first one popped is `operand2`, the second is `operand1`), put the operator between them, wrap the whole thing in parentheses, and push the newly formed string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string postToInfix(string s) {
        stack<string> st;
        
        // Read string from left to right for postfix
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If operand, push as string to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two elements, combine and push back
            else {
                // Top element is operand2 (since we read left-to-right)
                string op2 = st.top(); st.pop();
                // Next element is operand1
                string op1 = st.top(); st.pop();
                
                // Form the new sub-expression (Infix format)
                string temp = "(" + op1 + c + op2 + ")";
                
                // Push it back to stack
                st.push(temp);
            }
        }
        
        // The final element in the stack is our complete infix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We iterate linearly left-to-right.
- **Space Complexity:** `O(N)` for the string stack.
