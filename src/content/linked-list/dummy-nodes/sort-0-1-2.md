---
title: "Sort Linked List of 0s, 1s and 2s"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20sort%20linked%20list%20of%200s%201s%20and%202s%20cpp"
tags:
  - "Linked List"
  - "Dummy Node"
  - "Partition"
---

### Problem Statement

Given a linked list containing only 0, 1 and 2, sort it in ascending order.

### Constraints

- `1 <= number of nodes <= 10^5`.
- `Node.data` is either `0`, `1`, or `2`.

### Examples

**Example 1:**
```text
Input: head = [1,2,2,1,2,0,2,2]
Output: [0,1,1,2,2,2,2,2]
```

**Example 2:**
```text
Input: head = [2,2,0,1]
Output: [0,1,2,2]
```

### Intuition

Since there are only three values, build three chains and connect them in order.

### Approach

Use dummy heads for 0, 1 and 2 lists. Append each node to its bucket, terminate the final list, then connect 0 -> 1 -> 2.

### Code

```cpp
Node* segregate(Node* head) {
    Node zeroDummy(0), oneDummy(0), twoDummy(0);
    Node* zero = &zeroDummy;
    Node* one = &oneDummy;
    Node* two = &twoDummy;

    while (head) {
        if (head->data == 0) zero->next = head, zero = zero->next;
        else if (head->data == 1) one->next = head, one = one->next;
        else two->next = head, two = two->next;
        head = head->next;
    }

    zero->next = oneDummy.next ? oneDummy.next : twoDummy.next;
    one->next = twoDummy.next;
    two->next = nullptr;
    return zeroDummy.next;
}
```
