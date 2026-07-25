---
title: "Merge k Sorted Lists"
difficulty: "Hard"
time: "O(N log K)"
space: "O(K)"
platforms:
  leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/"
  youtube: "https://www.youtube.com/results?search_query=takeuforward%20merge%20k%20sorted%20lists%20cpp"
tags:
  - "Linked List"
  - "Heap"
  - "K-way Merge"
---

### Problem Statement

Given an array of `k` linked lists, where each linked list is sorted in ascending order, merge them into one sorted linked list.

### Constraints

- `k == lists.length`.
- `0 <= k <= 10^4`.
- `0 <= total number of nodes <= 10^4`.
- `-10^4 <= Node.val <= 10^4`.

### Examples

**Example 1:**
```text
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

**Example 2:**
```text
Input: lists = []
Output: []
```

### Intuition

The next node in the merged list is always the smallest current head among all lists.

### Approach

Push all non-null heads into a min-heap. Pop the smallest node, append it, and push its next node if present.

### Code

```cpp
class Solution {
public:
    struct Compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
        for (ListNode* node : lists) {
            if (node) pq.push(node);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();
            tail->next = node;
            tail = tail->next;
            if (node->next) pq.push(node->next);
        }

        return dummy.next;
    }
};
```
