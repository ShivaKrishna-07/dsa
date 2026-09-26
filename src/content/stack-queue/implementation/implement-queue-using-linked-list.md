---
title: "Implement Queue using Linked List"
difficulty: "Easy"
time: "O(1)"
space: "O(N)"
tags: ["Queue", "Linked List"]
---

### Problem Statement

Implement a queue using a singly linked list.

### Examples

- **Input:** `push(10), push(20), front()` **Output:** `10`
- **Input:** `push(10), pop(), empty()` **Output:** `true`

### Constraints

- `1 <= number of operations <= 10^5`
- Maintain front and rear pointers so insertion does not require traversal.

### Intuition

Maintain both front and rear pointers. Append at the rear and remove from the front.

### Code

```cpp
class Queue {
    struct Node { int value; Node* next; };
    Node *frontNode = nullptr, *rear = nullptr;
public:
    void push(int value) {
        Node* node = new Node{value, nullptr};
        if (!rear) frontNode = rear = node;
        else rear = rear->next = node;
    }
    void pop() {
        if (!frontNode) return;
        Node* old = frontNode; frontNode = frontNode->next; delete old;
        if (!frontNode) rear = nullptr;
    }
    int front() { return frontNode ? frontNode->value : -1; }
    bool empty() { return frontNode == nullptr; }
};
```

### Complexity Analysis

- **Time Complexity:** `O(1)` per operation.
- **Space Complexity:** `O(N)` for the linked-list nodes.
