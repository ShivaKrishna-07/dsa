---
title: "Remove Nth Node From End of List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20remove%20nth%20node%20from%20end%20of%20list%20cpp"
tags:
  - "Linked List"
  - "Two Pointers"
  - "Dummy Node"
---

### Problem Statement

Given the head of a linked list, remove the nth node from the end of the list and return the updated head.

### Constraints

- The number of nodes is `sz`.
- `1 <= sz <= 30`.
- `0 <= Node.val <= 100`.
- `1 <= n <= sz`.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Explanation: Node 4 is removed.
```

**Example 2:**
```text
Input: head = [1], n = 1
Output: []
Explanation: The only node is removed.
```

### Intuition

Keep a gap of n nodes between two pointers. When the front pointer reaches the end, the back pointer is before the node to delete.

### Approach

Use a dummy node before head. Advance fast n + 1 steps from dummy, then move fast and slow together. Delete slow->next.

### Code

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        ListNode* node = slow->next;
        slow->next = slow->next->next;
        delete node;
        return dummy.next;
    }
};
```
