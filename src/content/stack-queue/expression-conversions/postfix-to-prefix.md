---
title: "Postfix to Prefix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert a postfix expression to prefix notation.

### Examples

- **Input:** `ab+` **Output:** `+ab`.

**Edge Case:** For a non-commutative operator, preserve the left and right pop order exactly.

### Constraints

- `1 <= expression.length <= 10^5`
- The postfix expression is valid and contains binary operators only.

### Intuition

Scan left to right and put each operator before the two expression fragments it combines. Postfix order already determines precedence, so no operator stack is required.

### Code

```cpp
string postfixToPrefix(string expression) {
    stack<string> st;
    for (char c : expression) {
        if (isalnum(c)) st.push(string(1, c));
        else { string right = st.top(); st.pop(); string left = st.top(); st.pop(); st.push(string(1, c) + left + right); }
    }
    return st.top();
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because each token is processed exactly once.
- **Space Complexity:** `O(N)` for intermediate prefix expressions.
