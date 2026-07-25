---
title: "Odd Even Linked List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/odd-even-linked-list/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20odd%20even%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Pointer Rewiring"
---

### Problem Statement

Group all nodes at odd indices followed by all nodes at even indices. The first node is considered odd, and relative order inside both groups must remain unchanged.

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^6 <= Node.val <= 10^6`.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
```

**Example 2:**
```text
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

### Intuition

Odd-position nodes and even-position nodes already appear in alternating chains. We only need to stitch each chain separately.

### Approach

Keep odd and even pointers plus the even head. Move odd to odd->next->next and even similarly, then connect odd tail to even head.

### Code

```cpp
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head) return nullptr;
        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* evenHead = even;
        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = evenHead;
        return head;
    }
};
```
