---
title: "Balanced Parentheses"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Parentheses"]
---

### Problem Statement

Determine whether a string of brackets is balanced and correctly nested.

### Examples

- **Input:** `s = "{[()]}"` **Output:** `true`
- **Input:** `s = "([)]"` **Output:** `false`

### Constraints

- `1 <= s.length <= 10^5`
- `s` contains only `()[]{}` characters.

### Intuition

Each closing bracket must match the most recent unmatched opening bracket, which is exactly stack behavior.

### Code

```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            if ((c == ')' && st.top() != '(') || (c == ']' && st.top() != '[') || (c == '}' && st.top() != '{')) return false;
            st.pop();
        }
    }
    return st.empty();
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)`.
- **Space Complexity:** `O(N)` in the worst case when all brackets are opening brackets.
