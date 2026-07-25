---
title: "Linked List Cycle"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/linked-list-cycle/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20detect%20loop%20in%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Fast & Slow Pointers"
  - "Cycle Detection"
---

### Problem Statement

Given the head of a linked list, determine whether the list contains a cycle. A cycle exists if following next pointers can lead back to a previously visited node.

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`.
- `pos` is `-1` or a valid index in the linked list.

### Examples

**Example 1:**
```text
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: The tail connects to node index 1.
```

**Example 2:**
```text
Input: head = [1,2], pos = -1
Output: false
Explanation: The list has no cycle.
```

### Intuition

If there is a cycle, a fast pointer moving two steps will eventually catch a slow pointer moving one step. Without a cycle, the fast pointer reaches null.

### Approach

Run Floyd's cycle detection. Move slow by one and fast by two until they meet or fast reaches the end.

### Code

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```
