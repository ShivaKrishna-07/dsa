---
title: "Infix to Prefix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Infix+to+Prefix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/infix-to-prefix/1"
---

### Problem Statement

Given an infix expression in the form of string `str`, convert this infix expression to prefix expression.
- Infix expression: The operator is in between the operands (e.g., `A + B`).
- Prefix expression: The operator precedes the operands (e.g., `+ A B`).

The expression contains:
- Lowercase and uppercase English letters (operands).
- Operators: `+`, `-`, `*`, `/`, `^`.
- Parentheses: `(` and `)`.

**Example 1:**
```text
Input: str = "x+y*z/w+u"
Output: ++x/*yzwu
```

**Example 2:**
```text
Input: str = "a+b*(c^d-e)^(f+g*h)-i"
Output: -+a*b^-^cde+f*ghi
```

**Example 3: (Edge Case - simple grouping)**
```text
Input: str = "(A+B)*C"
Output: *+ABC
```

---

### Intuition

Converting infix to prefix is very similar to converting infix to postfix! We can cleverly reuse the same logic with a simple trick:
1. **Reverse** the given infix string (also swap `(` with `)` and vice versa).
2. Compute the **postfix** expression for this reversed string.
3. **Reverse** the resulting postfix expression. The result is perfectly formatted prefix!
*Note on step 2:* Because we reversed the string, the associativity of operators like `^` is flipped, so we adjust our strictly greater/less precedence checks slightly.

---

### Code

```cpp
class Solution {
private:
    int precedence(char c) {
        if (c == '^') return 3;
        else if (c == '*' || c == '/') return 2;
        else if (c == '+' || c == '-') return 1;
        return -1;
    }

public:
    string infixToPrefix(string s) {
        // Step 1: Reverse the infix expression and swap brackets
        reverse(s.begin(), s.end());
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') s[i] = ')';
            else if (s[i] == ')') s[i] = '(';
        }
        
        stack<char> st;
        string res = "";
        
        // Step 2: Compute postfix of the modified string
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // Operands go directly to result
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                res += c;
            }
            else if (c == '(') {
                st.push('(');
            }
            else if (c == ')') {
                while (!st.empty() && st.top() != '(') {
                    res += st.top();
                    st.pop();
                }
                st.pop();
            }
            else {
                // Notice the strict inequality here for right-associativity since we reversed
                while (!st.empty() && precedence(c) < precedence(st.top())) {
                    res += st.top();
                    st.pop();
                }
                
                // If precedence is equal, we pop if it's left-associative (which is true for ^ originally, but flipped here)
                if (!st.empty() && precedence(c) == precedence(st.top()) && c == '^') {
                    while (!st.empty() && precedence(c) == precedence(st.top())) {
                        res += st.top();
                        st.pop();
                    }
                }
                st.push(c);
            }
        }
        
        while (!st.empty()) {
            res += st.top();
            st.pop();
        }
        
        // Step 3: Reverse the final result
        reverse(res.begin(), res.end());
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the string length. Reversing strings takes `O(N)`, and the single stack pass takes `O(N)`.
- **Space Complexity:** `O(N)` for the operator stack and the resultant string.
