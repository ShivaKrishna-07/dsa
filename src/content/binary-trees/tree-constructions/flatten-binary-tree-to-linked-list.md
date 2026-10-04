---
title: "Flatten Binary Tree to Linked List"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Flatten+Binary+Tree+to+Linked+List"
  leetcode: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/flatten-binary-tree-to-linked-list"
---

### Problem Statement

Given the `root` of a binary tree, flatten the tree into a "linked list":
- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a pre-order traversal of the binary tree.

**Example 1:**
```text
      1
     / \
    2   5
   / \   \
  3   4   6

Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

---

### Intuition

The naive approach is to do a Preorder traversal, store nodes in a list, and then rewire them. But this takes `O(N)` space.
We can use a **Morris Traversal** concept to do this in `O(1)` space!
For any node, if it has a left child:
1. Find the rightmost node in its left subtree (this is the predecessor).
2. Connect this rightmost node to the current node's right child!
3. Move the entire left subtree to the right, and set left to `NULL`.
4. Move down to the right and repeat!

---

### Code

```cpp
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        
        while (curr != NULL) {
            if (curr->left != NULL) {
                // Find the rightmost node of the left subtree
                TreeNode* prev = curr->left;
                while (prev->right != NULL) {
                    prev = prev->right;
                }
                
                // Connect the rightmost node to the current right child
                prev->right = curr->right;
                
                // Move the left subtree to the right
                curr->right = curr->left;
                curr->left = NULL;
            }
            
            // Move on to the next node
            curr = curr->right;
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since each edge is traversed at most twice.
- **Space Complexity:** `O(1)` as no extra memory or recursive stack is used.
