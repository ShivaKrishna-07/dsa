---
title: "Add Two Numbers"
difficulty: "Medium"
time: "O(max(N, M))"
space: "O(max(N, M))"
platforms:
  leetcode: "https://leetcode.com/problems/add-two-numbers/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20add%20two%20numbers%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Math"
  - "Carry"
---

### Problem Statement

Two non-empty linked lists represent two non-negative integers in reverse digit order. Add the numbers and return the sum as a linked list in reverse order.

### Constraints

- The number of nodes in each list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`.
- The input numbers do not contain leading zeroes except the number 0 itself.

### Examples

**Example 1:**
```text
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

**Example 2:**
```text
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

### Intuition

Since digits are stored in reverse order, we can add from head to tail just like elementary addition from least significant digit.

### Approach

Traverse both lists while carry exists. Create a node for sum % 10 and update carry = sum / 10.

### Code

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) sum += l1->val, l1 = l1->next;
            if (l2) sum += l2->val, l2 = l2->next;
            tail->next = new ListNode(sum % 10);
            tail = tail->next;
            carry = sum / 10;
        }
        return dummy.next;
    }
};
```
