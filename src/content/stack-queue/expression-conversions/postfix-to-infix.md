---
title: "Postfix to Infix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert a postfix expression to its equivalent infix expression.

### Examples

- **Input:** `abc*+` **Output:** `(a+(b*c))`.

**Edge Case:** When an operator is read, the second popped expression is its left operand.

### Constraints

- `1 <= expression.length <= 10^5`
- The postfix expression is valid and contains binary operators only.

### Intuition

Scan left to right. Every operator combines the two latest expression fragments, with the earlier fragment on the left. Parentheses make the recovered evaluation order explicit.

### Code

```cpp
string postfixToInfix(string expression) {
    stack<string> st;
    for (char c : expression) {
        if (isalnum(c)) st.push(string(1, c));
        else { string right = st.top(); st.pop(); string left = st.top(); st.pop(); st.push("(" + left + c + right + ")"); }
    }
    return st.top();
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because every token is pushed or combined once.
- **Space Complexity:** `O(N)` for the expression stack.
