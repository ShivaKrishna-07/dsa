---
title: "Infix to Postfix Conversion"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Expressions"]
---

### Problem Statement

Convert an infix expression to postfix notation while preserving precedence and associativity.

### Examples

- **Input:** `a + b * c` **Output:** `abc*+` because multiplication is evaluated before addition.

**Edge Case:** Parenthesized input such as `(a + b) * c` must become `ab+c*`.

### Constraints

- `1 <= expression.length <= 10^5`
- Operands are alphanumeric and operators are `+`, `-`, `*`, `/`, or `^`.

### Intuition

Output operands immediately and keep operators on a stack. Pop operators with higher or equal precedence before pushing the current operator. Parentheses act as boundaries and are removed from the final expression.

### Code

```cpp
int precedence(char c) { return c == '^' ? 3 : (c == '*' || c == '/') ? 2 : (c == '+' || c == '-') ? 1 : 0; }
string infixToPostfix(string expression) {
    stack<char> operators; string result;
    for (char c : expression) {
        if (isalnum(c)) result += c;
        else if (c == '(') operators.push(c);
        else if (c == ')') { while (operators.top() != '(') { result += operators.top(); operators.pop(); } operators.pop(); }
        else { while (!operators.empty() && operators.top() != '(' && precedence(operators.top()) >= precedence(c)) { result += operators.top(); operators.pop(); } operators.push(c); }
    }
    while (!operators.empty()) { result += operators.top(); operators.pop(); }
    return result;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because every token is pushed to and removed from the operator stack at most once.
- **Space Complexity:** `O(N)` for the operator stack and output expression.
