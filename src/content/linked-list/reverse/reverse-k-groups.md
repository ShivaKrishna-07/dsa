---
title: "Reverse Nodes in k-Group"
difficulty: "Hard"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20reverse%20nodes%20in%20k%20group%20cpp"
tags:
  - "Linked List"
  - "Reverse"
  - "Recursion"
---

### Problem Statement

Given the head of a linked list, reverse nodes in groups of size `k`. If the number of remaining nodes is less than `k`, leave them unchanged.

### Constraints

- The number of nodes is `n`.
- `1 <= k <= n <= 5000`.
- `0 <= Node.val <= 1000`.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

**Example 2:**
```text
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

### Intuition

Reverse exactly k nodes at a time. The old head of the group becomes the tail and should connect to the next processed group.

### Approach

Check if k nodes exist. Reverse the first k nodes, then recursively process the remaining list and connect it to the group tail.

### Code

```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* check = head;
        for (int i = 0; i < k; i++) {
            if (!check) return head;
            check = check->next;
        }

        ListNode* prev = nullptr;
        ListNode* curr = head;
        for (int i = 0; i < k; i++) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        head->next = reverseKGroup(curr, k);
        return prev;
    }
};
```
