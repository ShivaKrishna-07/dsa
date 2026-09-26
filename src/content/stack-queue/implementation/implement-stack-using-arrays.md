---
title: "Implement Stack using Arrays"
difficulty: "Easy"
time: "O(1)"
space: "O(N)"
tags: ["Stack", "Implementation"]
---

### Problem Statement

Implement a stack with push, pop, top, and empty operations using an array.

### Examples

- **Input:** `push(3), push(5), top(), pop()` **Output:** `5, 5`
- **Input:** `pop()` on an empty stack **Output:** no operation

### Constraints

- `1 <= number of operations <= 10^5`
- Values fit in a signed 32-bit integer.

### Intuition

Keep a pointer to the last inserted element. Every operation changes or reads only that position.

### Code

```cpp
class Stack {
    vector<int> values;
public:
    void push(int value) { values.push_back(value); }
    void pop() { if (!values.empty()) values.pop_back(); }
    int top() { return values.empty() ? -1 : values.back(); }
    bool empty() { return values.empty(); }
};
```

### Complexity Analysis

- **Time Complexity:** `O(1)` per operation because the array end is accessed directly.
- **Space Complexity:** `O(N)` for stored values.
