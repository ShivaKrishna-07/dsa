---
title: "Prefix to Infix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Prefix+to+Infix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/prefix-to-infix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a prefix expression. Convert it to an infix expression.
- Prefix expression: The operator precedes the operands (e.g., `* A B`).
- Infix expression: The operator is between the operands (e.g., `(A * B)`).

*Note:* Ensure that the resulting infix expression is properly parenthesized to preserve the exact order of operations.

**Example 1:**
```text
Input: s = "*-A/BC-/AKL"
Output: ((A-(B/C))*((A/K)-L))
```

**Example 2:**
```text
Input: s = "*+AB-CD"
Output: ((A+B)*(C-D))
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "+AB"
Output: (A+B)
```

---

### Intuition

To evaluate or convert a Prefix expression, we read it **backwards** (from right to left). 
We use a stack of strings. When we see an operand (a letter or number), we push it onto the stack. When we see an operator, we pop the top two operands from the stack, put the operator between them, wrap the whole thing in parentheses, and push the newly formed string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string preToInfix(string s) {
        stack<string> st;
        
        // Read string from right to left
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s[i];
            
            // If operand, push as string to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two elements, combine and push back
            else {
                // Top element is operand1 (since we read right-to-left)
                string op1 = st.top(); st.pop();
                // Next element is operand2
                string op2 = st.top(); st.pop();
                
                // Form the new sub-expression
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

- **Time Complexity:** `O(N)` where `N` is the length of the string. We process each character once. String concatenations can theoretically take more time, but for typical expression lengths, it's considered linear.
- **Space Complexity:** `O(N)` for the stack of strings.
