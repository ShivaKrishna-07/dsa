---
title: "Implement Stack using Queue"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Queue"]
---

### Problem Statement

Implement a LIFO stack using only queue operations.

### Examples

- **Input:** `push(1), push(2), top(), pop()` **Output:** `2, 2`
- **Input:** `push(4), push(7), empty()` **Output:** `false`

### Constraints

- `1 <= number of operations <= 10^5`
- Only queue operations may be used internally.

### Intuition

After inserting an element, rotate the older elements behind it. The front of the queue is then always the stack top.

### Code

```cpp
class MyStack {
    queue<int> values;
public:
    void push(int value) {
        values.push(value);
        for (int count = values.size() - 1; count > 0; --count) {
            values.push(values.front());
            values.pop();
        }
    }
    void pop() { if (!values.empty()) values.pop(); }
    int top() { return values.empty() ? -1 : values.front(); }
    bool empty() { return values.empty(); }
};
```

### Complexity Analysis

- **Time Complexity:** `O(N)` for push and `O(1)` for pop and top.
- **Space Complexity:** `O(N)` for the queue.
