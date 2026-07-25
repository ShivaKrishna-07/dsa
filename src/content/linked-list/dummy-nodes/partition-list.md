---
title: "Partition List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/partition-list/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20partition%20list%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Dummy Node"
  - "Two Lists"
---

### Problem Statement

Given a linked list and a value `x`, partition the list so that nodes less than `x` come before nodes greater than or equal to `x`. Preserve original relative order in both partitions.

### Constraints

- The number of nodes is in the range `[0, 200]`.
- `-100 <= Node.val <= 100`.
- `-200 <= x <= 200`.

### Examples

**Example 1:**
```text
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

**Example 2:**
```text
Input: head = [2,1], x = 2
Output: [1,2]
```

### Intuition

Stable partitioning is easiest by building two chains: smaller nodes and greater-or-equal nodes.

### Approach

Use two dummy nodes. Append each node to the correct chain, terminate the greater chain, then connect smaller tail to greater head.

### Code

```cpp
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode beforeDummy(0), afterDummy(0);
        ListNode* before = &beforeDummy;
        ListNode* after = &afterDummy;
        while (head) {
            if (head->val < x) {
                before->next = head;
                before = before->next;
            } else {
                after->next = head;
                after = after->next;
            }
            head = head->next;
        }
        after->next = nullptr;
        before->next = afterDummy.next;
        return beforeDummy.next;
    }
};
```
