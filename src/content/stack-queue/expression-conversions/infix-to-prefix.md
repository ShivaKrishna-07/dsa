---
title: "Infix to Prefix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert an infix expression to prefix notation.

### Examples

- **Input:** `a + b * c` **Output:** `+a*bc`.

**Edge Case:** Parentheses must be swapped while reversing the expression so their grouping remains correct.

### Constraints

- `1 <= expression.length <= 10^5`
- The expression is valid and contains no unary operators.

### Intuition

Reverse the expression, swap parentheses, convert it to postfix, then reverse the result. This reuses the precedence handling of infix-to-postfix conversion.

### Code

```cpp
string infixToPrefix(string expression) {
    reverse(expression.begin(), expression.end());
    for (char& c : expression) if (c == '(') c = ')'; else if (c == ')') c = '(';
    string postfix = infixToPostfix(expression);
    reverse(postfix.begin(), postfix.end());
    return postfix;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because the expression is scanned a constant number of times.
- **Space Complexity:** `O(N)` for the reversed expression, operator stack, and result.
