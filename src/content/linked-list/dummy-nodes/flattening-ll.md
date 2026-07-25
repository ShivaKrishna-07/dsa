---
title: "Flattening a Linked List"
difficulty: "Medium"
time: "O(N * K)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20flattening%20a%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Merge"
  - "Recursion"
---

### Problem Statement

Given a linked list where each node has `next` and `bottom` pointers, and each bottom list is sorted, flatten it into one sorted list using bottom pointers.

### Constraints

- `1 <= number of head nodes <= 100`.
- `1 <= total nodes <= 10^4`.
- Bottom lists are sorted in non-decreasing order.

### Examples

**Example 1:**
```text
Input: 5->10->19->28 with bottom lists [7,8,30], [20], [22,50], [35,40,45]
Output: 5->7->8->10->19->20->22->28->30->35->40->45->50
```

**Example 2:**
```text
Input: head lists [1,4,7] and [2,3,8]
Output: 1->2->3->4->7->8
```

### Intuition

The problem is repeated merging of sorted lists, but using bottom pointers instead of next pointers.

### Approach

Recursively flatten the right side, then merge the current bottom list with the flattened right list.

### Code

```cpp
Node* merge(Node* a, Node* b) {
    Node dummy(0);
    Node* tail = &dummy;
    while (a && b) {
        if (a->data <= b->data) {
            tail->bottom = a;
            a = a->bottom;
        } else {
            tail->bottom = b;
            b = b->bottom;
        }
        tail = tail->bottom;
        tail->next = nullptr;
    }
    tail->bottom = a ? a : b;
    return dummy.bottom;
}

Node* flatten(Node* root) {
    if (!root || !root->next) return root;
    root->next = flatten(root->next);
    return merge(root, root->next);
}
```
