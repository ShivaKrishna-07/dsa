---
title: "Reverse Linked List"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/reverse-linked-list/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20reverse%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Reverse"
  - "Pointers"
---

### Problem Statement

Given the head of a singly linked list, reverse the list and return the new head.

### Constraints

- The number of nodes is in the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```text
Input: head = [1,2]
Output: [2,1]
```

### Intuition

Every node's next pointer must point to the previous node instead of the next node.

### Approach

Track previous, current and next. Store next before rewiring current->next, then move all pointers forward.

### Code

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};
```
