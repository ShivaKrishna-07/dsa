---
title: "Convert Sorted List to Binary Search Tree"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Convert+Sorted+List+to+Binary+Search+Tree+leetcode+109"
time: "O(N log N)"
space: "O(log N)"
platforms:
  leetcode: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/"
---

### Problem Statement

Given the `head` of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

**Example 1:**
```text
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the height-balanced BST shown below:
        0
      /   \
    -3     9
    /     /
  -10    5
```

**Example 2:**
```text
Input: head = []
Output: []
```

**Example 3: (Edge Case - Single element)**
```text
Input: head = [0]
Output: [0]
```

---

### Intuition

To create a height-balanced BST, the root must be the middle element of the sorted list. If we pick the middle element as the root, the left half of the list becomes the left subtree, and the right half becomes the right subtree. 
Since it's a linked list (not an array), we can't find the middle in `O(1)` time. We must use the **Slow and Fast pointer** technique to find the middle! We recursively repeat this process for the left and right halves.

---

### Code

```cpp
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        // Base cases
        if (head == NULL) return NULL;
        if (head->next == NULL) return new TreeNode(head->val);
        
        // Find the middle using slow and fast pointers
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* prev = NULL; // To disconnect the left half
        
        while (fast != NULL && fast->next != NULL) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // Disconnect the left half from the middle
        if (prev != NULL) {
            prev->next = NULL;
        }
        
        // The middle element is the root
        TreeNode* root = new TreeNode(slow->val);
        
        // Recursively build left and right subtrees
        root->left = sortedListToBST(head);
        root->right = sortedListToBST(slow->next);
        
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)`. Finding the middle takes `O(N/2)` for each recursive level. Since the tree is balanced, there are `log N` levels.
- **Space Complexity:** `O(log N)` for the recursive call stack.
