---
title: "Implement Queue using Stack"
difficulty: "Easy"
time: "O(1) amortized"
space: "O(N)"
tags: ["Queue", "Stack"]
---

### Problem Statement

Implement a FIFO queue using two stacks.

### Examples

- **Input:** `push(1), push(2), front(), pop()` **Output:** `1, 1`
- **Input:** `push(3), pop(), front()` **Output:** `-1`

### Constraints

- `1 <= number of operations <= 10^5`
- Each element is moved between stacks only when the output stack is empty.

### Intuition

The input stack receives new items. The output stack reverses their order only when needed, making each item move at most twice.

### Code

```cpp
class MyQueue {
    stack<int> input, output;
    void move() {
        if (output.empty()) while (!input.empty()) {
            output.push(input.top());
            input.pop();
        }
    }
public:
    void push(int value) { input.push(value); }
    void pop() { move(); if (!output.empty()) output.pop(); }
    int front() { move(); return output.empty() ? -1 : output.top(); }
    bool empty() { return input.empty() && output.empty(); }
};
```

### Complexity Analysis

- **Time Complexity:** `O(1)` amortized per operation.
- **Space Complexity:** `O(N)` for the two stacks.
