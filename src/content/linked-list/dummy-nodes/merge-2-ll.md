---
title: "Merge Two Sorted Lists"
difficulty: "Easy"
time: "O(N + M)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20merge%20two%20sorted%20linked%20lists%20cpp"
tags:
  - "Linked List"
  - "Dummy Node"
  - "Merge"
---

### Problem Statement

Merge the two sorted linked lists into one sorted list by splicing together the existing nodes.

### Constraints

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`.
- Both lists are sorted in non-decreasing order.

### Examples

**Example 1:**
```text
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```text
Input: list1 = [], list2 = [0]
Output: [0]
```

### Intuition

At each step, the smaller current head must be the next node of the merged list.

### Approach

Use a dummy node and tail pointer. Append the smaller node, advance that list, and finally attach the remaining nodes.

### Code

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};
```
