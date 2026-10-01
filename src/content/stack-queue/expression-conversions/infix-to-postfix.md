---
title: "Infix to Postfix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Infix+to+Postfix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1"
---

### Problem Statement

Given an infix expression in the form of string `str`. Convert this infix expression to postfix expression.
- Infix expression: The operator is in between the operands (e.g., `A + B`).
- Postfix expression: The operator follows the operands (e.g., `A B +`).

The expression contains:
- Lowercase and uppercase English letters (operands).
- Operators: `+`, `-`, `*`, `/`, `^`.
- Parentheses: `(` and `)`.

**Example 1:**
```text
Input: str = "a+b*(c^d-e)^(f+g*h)-i"
Output: abcd^e-fgh*+^*+i-
```

**Example 2:**
```text
Input: str = "A*(B+C)/D"
Output: ABC+*D/
```

**Example 3: (Edge Case - Simple expression)**
```text
Input: str = "a+b"
Output: ab+
```

---

### Intuition

We use a Stack to keep track of operators and their precedence. As we read the infix expression from left to right:
1. Operands are immediately appended to our answer.
2. Opening parentheses `(` are pushed to the stack.
3. Closing parentheses `)` pop everything until an opening parenthesis `(` is found.
4. For operators, we must pop and output any operators on the stack that have strictly greater or equal precedence before pushing the current operator. This guarantees correct order of operations!

---

### Code

```cpp
class Solution {
private:
    // Helper function to define operator precedence
    int precedence(char c) {
        if (c == '^') return 3;
        else if (c == '*' || c == '/') return 2;
        else if (c == '+' || c == '-') return 1;
        return -1;
    }

public:
    string infixToPostfix(string s) {
        stack<char> st;
        string res = "";
        
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If operand, add directly to result
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                res += c;
            }
            // If left parenthesis, push to stack
            else if (c == '(') {
                st.push('(');
            }
            // If right parenthesis, pop until left parenthesis
            else if (c == ')') {
                while (!st.empty() && st.top() != '(') {
                    res += st.top();
                    st.pop();
                }
                st.pop(); // Remove the '('
            }
            // If an operator is encountered
            else {
                // Pop operators with higher or equal precedence
                while (!st.empty() && precedence(c) <= precedence(st.top())) {
                    // Note: '^' is right-associative
                    if (c == '^' && st.top() == '^') break;
                    
                    res += st.top();
                    st.pop();
                }
                st.push(c);
            }
        }
        
        // Pop all remaining operators from the stack
        while (!st.empty()) {
            res += st.top();
            st.pop();
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. Each character is pushed and popped from the stack at most once.
- **Space Complexity:** `O(N)` for the stack to hold the operators.
