---
title: "Reverse a Doubly Linked List"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20reverse%20doubly%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Doubly Linked List"
  - "Reverse"
---

### Problem Statement

Given the head of a doubly linked list, reverse it and return the new head.

### Constraints

- `0 <= number of nodes <= 10^5`.
- `0 <= Node.data <= 10^5`.

### Examples

**Example 1:**
```text
Input: head = [3,4,5]
Output: [5,4,3]
```

**Example 2:**
```text
Input: head = [75,122,59,196]
Output: [196,59,122,75]
```

### Intuition

In a doubly linked list, reversing means swapping each node's next and prev pointers.

### Approach

Traverse the list, swap next and prev for every node, and track the last processed node as the new head.

### Code

```cpp
Node* reverseDLL(Node* head) {
    Node* curr = head;
    Node* newHead = nullptr;
    while (curr) {
        newHead = curr;
        Node* nextNode = curr->next;
        curr->next = curr->prev;
        curr->prev = nextNode;
        curr = nextNode;
    }
    return newHead;
}
```
