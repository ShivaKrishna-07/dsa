---
title: "Merge K Sorted Lists"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Merge+K+Sorted+Lists+leetcode+23"
time: "O(N log K)"
space: "O(K)"
platforms:
  leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/"
---

### Problem Statement

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
```text
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

---

### Code

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
    struct compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, compare> pq;
        
        // Push the head of all k lists
        for (int i = 0; i < lists.size(); i++) {
            if (lists[i] != nullptr) {
                pq.push(lists[i]);
            }
        }
        
        ListNode* dummy = new ListNode(-1);
        ListNode* tail = dummy;
        
        while (!pq.empty()) {
            ListNode* minNode = pq.top();
            pq.pop();
            
            tail->next = minNode;
            tail = minNode;
            
            if (minNode->next != nullptr) {
                pq.push(minNode->next);
            }
        }
        
        return dummy->next;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the total number of nodes across all lists, and `K` is the number of linked lists.
- **Space Complexity:** `O(K)` for the priority queue storing the current front node of each list.
