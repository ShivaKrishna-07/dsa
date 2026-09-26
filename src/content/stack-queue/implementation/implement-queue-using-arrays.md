---
title: "Implement Queue using Arrays"
difficulty: "Easy"
time: "O(1)"
space: "O(N)"
tags: ["Queue", "Implementation"]
---

### Problem Statement

Implement a queue with push, pop, front, and empty operations using a circular array.

### Examples

- **Input:** `push(3), push(5), front(), pop()` **Output:** `3, 3`
- **Input:** `push(1), pop(), front()` **Output:** `-1`

### Constraints

- `1 <= number of operations <= 10^5`
- The queue capacity is positive.

### Intuition

A circular buffer reuses freed slots, so neither insertion nor removal requires shifting elements.

### Code

```cpp
class Queue {
    vector<int> values;
    int head = 0, size = 0;
public:
    Queue(int capacity) : values(capacity) {}
    void push(int value) { values[(head + size++) % values.size()] = value; }
    void pop() { if (size) { head = (head + 1) % values.size(); --size; } }
    int front() { return size ? values[head] : -1; }
    bool empty() { return size == 0; }
};
```

### Complexity Analysis

- **Time Complexity:** `O(1)` per operation because indices move without shifting elements.
- **Space Complexity:** `O(N)` for the circular buffer.
