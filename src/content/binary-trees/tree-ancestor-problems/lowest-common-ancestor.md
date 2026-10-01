---
title: "Lowest Common Ancestor in Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Lowest+Common+Ancestor+Binary+Tree"
  leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
  article: "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/"
---

### Problem Statement

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).

**Example 1:**
```text
        **3**
       /     \
     **5**    1
    / \     / \
   6   2   0   8
      / \
     7   4

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
```

---

### Intuition

We can solve this recursively by traversing the tree bottom-up.
If we reach a `NULL` node, return `NULL`. If we find node `p` or node `q`, we return that node to our parent.
For any parent node, we check the answers returned by its left and right subtrees:
1. If both left and right return a non-null node, it means `p` is on one side and `q` is on the other. This current parent node MUST be the LCA!
2. If only one subtree returns a non-null node, it means both `p` and `q` are located in that same subtree, so we pass that non-null node up to the parent.

---

### Code

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Base case: if root is null, or if we found p or q
        if (root == NULL || root == p || root == q) {
            return root;
        }
        
        // Recursively find LCA in left and right subtrees
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        // If both left and right are non-null, this root is the LCA
        if (left != NULL && right != NULL) {
            return root;
        }
        
        // Otherwise, return whichever side returned a node
        return (left != NULL) ? left : right;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we traverse each node once.
- **Space Complexity:** `O(H)` for the recursive stack.
