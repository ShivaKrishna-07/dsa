---
title: "Implement Stack using Linked List"
difficulty: "Easy"
time: "O(1)"
space: "O(N)"
tags: ["Stack", "Linked List"]
---

### Problem Statement

Implement a stack using a singly linked list.

### Examples

- **Input:** `push(10), push(20), top()` **Output:** `20`
- **Input:** `push(10), pop(), empty()` **Output:** `true`

### Constraints

- `1 <= number of operations <= 10^5`
- The linked list must grow dynamically with the number of elements.

### Intuition

Use the head as the stack top. Inserting and removing at the head avoids traversal.

### Code

```cpp
class Stack {
    struct Node { int value; Node* next; };
    Node* head = nullptr;
public:
    void push(int value) { head = new Node{value, head}; }
    void pop() { if (head) { Node* old = head; head = head->next; delete old; } }
    int top() { return head ? head->value : -1; }
    bool empty() { return head == nullptr; }
};
```

### Complexity Analysis

- **Time Complexity:** `O(1)` per operation.
- **Space Complexity:** `O(N)` for the linked-list nodes.
