---
title: "Reverse a Stack"
difficulty: "Medium"
time: "O(N^2)"
space: "O(N)"
tags: ["Stack", "Recursion"]
---

### Problem Statement

Reverse a stack using recursion and no auxiliary stack.

### Examples

- **Input:** bottom-to-top `[1, 2, 3]` **Output:** bottom-to-top `[3, 2, 1]`
- **Input:** an empty stack **Output:** an empty stack

### Constraints

- `0 <= stack size <= 10^3`
- Do not use an auxiliary stack or array.

### Intuition

Remove the top recursively, then insert it at the bottom after the remaining stack has been reversed.

### Code

```cpp
void insertBottom(stack<int>& st, int value) {
    if (st.empty()) { st.push(value); return; }
    int top = st.top(); st.pop();
    insertBottom(st, value);
    st.push(top);
}

void reverseStack(stack<int>& st) {
    if (st.empty()) return;
    int top = st.top(); st.pop();
    reverseStack(st);
    insertBottom(st, top);
}
```

### Complexity Analysis

- **Time Complexity:** `O(N^2)`.
- **Space Complexity:** `O(N)` for recursion depth.
