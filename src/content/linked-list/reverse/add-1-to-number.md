---
title: "Add 1 to a Number Represented as Linked List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20add%201%20to%20number%20represented%20as%20linked%20list%20cpp"
tags:
  - "Linked List"
  - "Reverse"
  - "Carry"
---

### Problem Statement

A linked list represents a non-negative integer, with the most significant digit at the head. Add one to the number and return the updated list.

### Constraints

- `1 <= number of nodes <= 10^5`.
- `0 <= Node.data <= 9`.
- The list represents a valid non-negative integer.

### Examples

**Example 1:**
```text
Input: head = [4,5,6]
Output: [4,5,7]
Explanation: 456 + 1 = 457.
```

**Example 2:**
```text
Input: head = [9,9,9]
Output: [1,0,0,0]
Explanation: 999 + 1 = 1000.
```

### Intuition

Addition starts at the least significant digit, but the list starts at the most significant digit. Reversing lets us process digits naturally.

### Approach

Reverse the list, add carry one digit at a time, append a final carry if needed, then reverse back.

### Code

```cpp
class Solution {
public:
    Node* reverse(Node* head) {
        Node* prev = nullptr;
        while (head) {
            Node* nextNode = head->next;
            head->next = prev;
            prev = head;
            head = nextNode;
        }
        return prev;
    }

    Node* addOne(Node* head) {
        head = reverse(head);
        Node* curr = head;
        int carry = 1;
        Node* prev = nullptr;
        while (curr && carry) {
            int sum = curr->data + carry;
            curr->data = sum % 10;
            carry = sum / 10;
            prev = curr;
            curr = curr->next;
        }
        if (carry) prev->next = new Node(carry);
        return reverse(head);
    }
};
```
