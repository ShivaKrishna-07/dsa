---
title: "Prefix to Infix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert a prefix expression to its equivalent infix expression.

### Examples

- **Input:** `+a*bc` **Output:** `(a+(b*c))`.

**Edge Case:** The right-to-left scan is required because an operator appears before both operands.

### Constraints

- `1 <= expression.length <= 10^5`
- The prefix expression contains valid binary operators and operands.

### Intuition

Scan from right to left. An operator combines the two most recent operand expressions, with the first popped expression on the left.

### Code

```cpp
string prefixToInfix(string expression) {
    stack<string> st;
    for (int i = expression.size() - 1; i >= 0; --i) {
        if (isalnum(expression[i])) st.push(string(1, expression[i]));
        else { string left = st.top(); st.pop(); string right = st.top(); st.pop(); st.push("(" + left + expression[i] + right + ")"); }
    }
    return st.top();
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because each operand and operator is processed once.
- **Space Complexity:** `O(N)` for the intermediate expression stack.
