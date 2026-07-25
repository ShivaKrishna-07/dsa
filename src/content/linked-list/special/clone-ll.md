---
title: "Copy List with Random Pointer"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20copy%20list%20with%20random%20pointer%20cpp"
tags:
  - "Linked List"
  - "Random Pointer"
  - "Deep Copy"
---

### Problem Statement

Given a linked list where each node has `next` and `random` pointers, create a deep copy of the list. The copied nodes must be completely new nodes.

### Constraints

- `0 <= n <= 1000`.
- `-10^4 <= Node.val <= 10^4`.
- `random` is null or points to a node in the linked list.

### Examples

**Example 1:**
```text
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: deep copy with the same next and random structure
```

**Example 2:**
```text
Input: head = [[1,1],[2,1]]
Output: deep copy where both random pointers point to copied node 2
```

### Intuition

We need copied nodes to know their copied random targets. Interleaving copies beside original nodes lets us find random copies without a hash map.

### Approach

Insert copied nodes after originals, assign random pointers using original->random->next, then separate the copied list.

### Code

```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;

        for (Node* cur = head; cur; cur = cur->next->next) {
            Node* copy = new Node(cur->val);
            copy->next = cur->next;
            cur->next = copy;
        }

        for (Node* cur = head; cur; cur = cur->next->next) {
            if (cur->random) cur->next->random = cur->random->next;
        }

        Node dummy(0);
        Node* tail = &dummy;
        Node* cur = head;
        while (cur) {
            Node* copy = cur->next;
            cur->next = copy->next;
            tail->next = copy;
            tail = tail->next;
            cur = cur->next;
        }

        return dummy.next;
    }
};
```
