---
title: "Morris Preorder Traversal"
difficulty: "Hard"
time: "O(N)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Morris+Preorder+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/morris-preorder-traversal"
---

### Problem Statement

Given the `root` of a binary tree, return the preorder traversal of its nodes' values.
**Follow up:** Could you do it iteratively with `O(1)` space?

**Example 1:**
```text
        1
          \
           2
          /
        3

Input: root = [1,null,2,3]
Output: [1,2,3]
```

---

### Intuition

Morris Preorder Traversal works exactly like Morris Inorder Traversal! The only difference is *when* we print the node.
In Preorder (Root, Left, Right), we must print the node *before* going to the left subtree. So, we print the node right when we create the temporary thread! If the thread already exists, we simply remove it (to restore the tree structure) and move right.

---

### Code

```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> preorder;
        TreeNode* curr = root;
        
        while (curr != NULL) {
            // Case 1: No left child
            if (curr->left == NULL) {
                preorder.push_back(curr->val);
                curr = curr->right;
            } 
            // Case 2: Left child exists
            else {
                // Find the inorder predecessor
                TreeNode* prev = curr->left;
                while (prev->right != NULL && prev->right != curr) {
                    prev = prev->right;
                }
                
                // Create a thread, PRINT CURRENT, and go left
                if (prev->right == NULL) {
                    prev->right = curr;
                    preorder.push_back(curr->val); // Print before going left
                    curr = curr->left;
                } 
                // Thread exists: remove it, and go right
                else {
                    prev->right = NULL;
                    curr = curr->right;
                }
            }
        }
        
        return preorder;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)`. Each edge is traversed at most 3 times, giving a linear time complexity.
- **Space Complexity:** `O(1)`. No auxiliary memory is used.
