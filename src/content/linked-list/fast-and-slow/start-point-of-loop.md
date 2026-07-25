---
title: "Linked List Cycle II"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20starting%20point%20of%20loop%20in%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Fast & Slow Pointers"
  - "Cycle Detection"
---

### Problem Statement

Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`.
- `pos` is `-1` or a valid index in the linked list.

### Examples

**Example 1:**
```text
Input: head = [3,2,0,-4], pos = 1
Output: node with value 2
Explanation: The cycle starts at index 1.
```

**Example 2:**
```text
Input: head = [1], pos = -1
Output: null
Explanation: There is no cycle.
```

### Intuition

After slow and fast meet inside the loop, moving one pointer from head and one from the meeting point makes both meet at the loop start.

### Approach

First detect the meeting point. If no meeting exists, return null. Otherwise move one pointer to head and advance both one step until they meet.

### Code

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                ListNode* entry = head;
                while (entry != slow) {
                    entry = entry->next;
                    slow = slow->next;
                }
                return entry;
            }
        }
        return nullptr;
    }
};
```
