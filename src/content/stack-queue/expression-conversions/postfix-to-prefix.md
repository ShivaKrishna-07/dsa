---
title: "Postfix to Prefix"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Postfix+to+Prefix+Conversion"
  gfg: "https://practice.geeksforgeeks.org/problems/postfix-to-prefix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a postfix expression. Convert it to a prefix expression.
- Postfix expression: The operator follows the operands (e.g., `A B *`).
- Prefix expression: The operator precedes the operands (e.g., `* A B`).

**Example 1:**
```text
Input: s = "ABC/-AK/L-*"
Output: *-A/BC-/AKL
```

**Example 2:**
```text
Input: s = "ab+c*"
Output: *+abc
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "ab+"
Output: +ab
```

---

### Intuition

For Postfix expressions, we read them **forwards** (from left to right). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack (first popped is `operand2`, second is `operand1`), prefix them with the operator (`operator + operand1 + operand2`), and push the new combined string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string postToPre(string s) {
        stack<string> st;
        
        // Traverse the postfix expression from left to right
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If character is an operand, push to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two operands and format as prefix
            else {
                // Because we read left-to-right, the top is operand2
                string op2 = st.top(); st.pop();
                string op1 = st.top(); st.pop();
                
                // Prefix format: Operator + Operand1 + Operand2
                string temp = c + op1 + op2;
                
                // Push the combined string back
                st.push(temp);
            }
        }
        
        // Final element is the complete prefix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. Processed completely in one pass.
- **Space Complexity:** `O(N)` for the stack.
