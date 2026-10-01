---
title: "Morris Inorder Traversal"
difficulty: "Hard"
time: "O(N)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Morris+Inorder+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  article: "https://takeuforward.org/data-structure/morris-inorder-traversal-of-a-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, return the inorder traversal of its nodes' values.
**Follow up:** Recursive solution is trivial, could you do it iteratively? 
**Follow up 2:** Could you do it iteratively with `O(1)` space?

**Example 1:**
```text
        1
          \
           2
          /
        3

Input: root = [1,null,2,3]
Output: [1,3,2]
```

---

### Intuition

Normal traversals use `O(H)` space for a stack. **Morris Traversal** achieves `O(1)` space by temporarily modifying the tree! 
It creates a "thread" from the rightmost node of a left subtree directly back to the current node (its inorder successor).
- If there's no left child, we print the node and go right.
- If there is a left child, we find its rightmost node.
  - If its right child is `NULL`, we link it to the current node (`thread`) and move left.
  - If its right child is already linked to the current node, we unlink it (restoring the tree), print the current node, and move right.

---

### Code

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> inorder;
        TreeNode* curr = root;
        
        while (curr != NULL) {
            // Case 1: No left child
            if (curr->left == NULL) {
                inorder.push_back(curr->val);
                curr = curr->right;
            } 
            // Case 2: Left child exists
            else {
                // Find the inorder predecessor (rightmost node in left subtree)
                TreeNode* prev = curr->left;
                while (prev->right != NULL && prev->right != curr) {
                    prev = prev->right;
                }
                
                // Create a thread and go left
                if (prev->right == NULL) {
                    prev->right = curr;
                    curr = curr->left;
                } 
                // Thread exists: remove it, print, and go right
                else {
                    prev->right = NULL;
                    inorder.push_back(curr->val);
                    curr = curr->right;
                }
            }
        }
        
        return inorder;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)`. Finding the predecessor takes extra time, but amortized over the whole tree, each edge is traversed at most 3 times.
- **Space Complexity:** `O(1)`. No stack or recursion is used!
