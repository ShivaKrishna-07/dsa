---
title: "Length of Loop in Linked List"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/find-length-of-loop/1"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20length%20of%20loop%20in%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Fast & Slow Pointers"
  - "Cycle Detection"
---

### Problem Statement

Given the head of a linked list, return the number of nodes in the loop. If the linked list has no loop, return `0`.

### Constraints

- `0 <= number of nodes <= 10^5`.
- `1 <= Node.data <= 10^5`.
- The loop position may be absent.

### Examples

**Example 1:**
```text
Input: head = [1,2,3,4,5], pos = 2
Output: 4
Explanation: The loop is 2 -> 3 -> 4 -> 5 -> 2.
```

**Example 2:**
```text
Input: head = [1,2,3], pos = -1
Output: 0
Explanation: There is no loop.
```

### Intuition

Once slow and fast meet, they are inside the loop. Walking from that node until it returns to itself counts the loop length.

### Approach

Use Floyd detection. On meeting, keep one pointer fixed and move another around the cycle while counting nodes.

### Code

```cpp
int countNodesinLoop(Node *head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            int length = 1;
            Node* cur = slow->next;
            while (cur != slow) {
                length++;
                cur = cur->next;
            }
            return length;
        }
    }
    return 0;
}
```
