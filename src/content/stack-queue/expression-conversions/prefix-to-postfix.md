---
title: "Prefix to Postfix"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Prefix+to+Postfix+Conversion"
  gfg: "https://practice.geeksforgeeks.org/problems/prefix-to-postfix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a prefix expression. Convert it to a postfix expression.
- Prefix expression: The operator precedes the operands (e.g., `* A B`).
- Postfix expression: The operator follows the operands (e.g., `A B *`).

**Example 1:**
```text
Input: s = "*-A/BC-/AKL"
Output: ABC/-AK/L-*
```

**Example 2:**
```text
Input: s = "*+AB-CD"
Output: AB+CD-*
```

**Example 3: (Edge Case - one operator)**
```text
Input: s = "/XY"
Output: XY/
```

---

### Intuition

Just like converting Prefix to Infix, we read the Prefix expression **backwards** (from right to left). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack, append the operator at the end of them (`operand1 + operand2 + operator`), and push the new combined string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string preToPost(string s) {
        stack<string> st;
        
        // Traverse the prefix expression from right to left
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s[i];
            
            // If character is an operand, push to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two operands and format as postfix
            else {
                string op1 = st.top(); st.pop();
                string op2 = st.top(); st.pop();
                
                // Postfix format: Operand1 + Operand2 + Operator
                string temp = op1 + op2 + c;
                
                // Push the combined string back
                st.push(temp);
            }
        }
        
        // Final element is the complete postfix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We loop through the string exactly once from right to left.
- **Space Complexity:** `O(N)` to store the strings in the stack during processing.
