---
title: "Prefix to Postfix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert a prefix expression to postfix notation.

### Examples

- **Input:** `+ab` **Output:** `ab+`.

**Edge Case:** A compound operand expression must remain intact while it is combined with its operator.

### Constraints

- `1 <= expression.length <= 10^5`
- The prefix expression is valid and contains no unary operators.

### Intuition

Scan right to left and combine two operand strings after every operator, placing the operator last. No precedence comparison is needed because prefix notation already encodes the order.

### Code

```cpp
string prefixToPostfix(string expression) {
    stack<string> st;
    for (int i = expression.size() - 1; i >= 0; --i) {
        if (isalnum(expression[i])) st.push(string(1, expression[i]));
        else { string left = st.top(); st.pop(); string right = st.top(); st.pop(); st.push(left + right + expression[i]); }
    }
    return st.top();
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because every token is visited once.
- **Space Complexity:** `O(N)` for intermediate strings on the stack.
