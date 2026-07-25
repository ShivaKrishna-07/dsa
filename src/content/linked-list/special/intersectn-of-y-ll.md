---
title: "Intersection of Two Linked Lists"
difficulty: "Easy"
time: "O(N + M)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20intersection%20of%20two%20linked%20lists%20cpp"
tags:
  - "Linked List"
  - "Two Pointers"
  - "Pointer Identity"
---

### Problem Statement

Given the heads of two singly linked lists, return the node at which the two lists intersect. If they do not intersect, return `null`.

### Constraints

- The number of nodes in both lists is in the range `[0, 3 * 10^4]`.
- `1 <= Node.val <= 10^5`.
- The lists must retain their original structure.

### Examples

**Example 1:**
```text
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
Output: node with value 8
```

**Example 2:**
```text
Input: listA = [2,6,4], listB = [1,5]
Output: null
```

### Intuition

If both pointers traverse list A plus list B, they cover equal total distance. If an intersection exists, they meet there.

### Approach

Move pointer A through list A then list B; move pointer B through list B then list A. Stop when they are equal.

### Code

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode* a = headA;
        ListNode* b = headB;
        while (a != b) {
            a = a ? a->next : headB;
            b = b ? b->next : headA;
        }
        return a;
    }
};
```
