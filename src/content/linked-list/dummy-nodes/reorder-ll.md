---
title: "Reorder List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/reorder-list/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20reorder%20list%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Fast & Slow Pointers"
  - "Reverse"
  - "Merge"
---

### Problem Statement

Reorder a list from `L0 -> L1 -> ... -> Ln` into `L0 -> Ln -> L1 -> Ln-1 -> ...`. Do not modify node values.

### Constraints

- The number of nodes is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 1000`.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

**Example 2:**
```text
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

### Intuition

The target order alternates between the first half and the reversed second half.

### Approach

Find the middle, reverse the second half, then merge the two halves alternately.

### Code

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;

        ListNode* slow = head;
        ListNode* fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* second = slow->next;
        slow->next = nullptr;
        ListNode* prev = nullptr;
        while (second) {
            ListNode* nextNode = second->next;
            second->next = prev;
            prev = second;
            second = nextNode;
        }

        ListNode* first = head;
        second = prev;
        while (second) {
            ListNode* nextFirst = first->next;
            ListNode* nextSecond = second->next;
            first->next = second;
            second->next = nextFirst;
            first = nextFirst;
            second = nextSecond;
        }
    }
};
```
