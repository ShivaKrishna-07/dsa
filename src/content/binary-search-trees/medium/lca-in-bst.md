---
title: "Lowest Common Ancestor of a BST"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Lowest+Common+Ancestor+BST+leetcode+235"
time: "O(H)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
---

### Problem Statement

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The LCA is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).

**Example 1:**
```text
         6
       /   \
      2     8
     / \   / \
    0   4 7   9
       / \
      3   5

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
```

**Example 2:**
```text
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of 2 and 4 is 2, since a node can be a descendant of itself.
```

**Example 3: (Edge Case - Tree with two nodes)**
```text
Input: root = [2,1], p = 2, q = 1
Output: 2
```

---

### Intuition

In a standard Binary Tree, finding the LCA is complex. But in a BST, it's incredibly simple! 
Because of the sorted nature of a BST, if both `p` and `q` are smaller than the current root, their LCA must be in the left subtree. If both are larger, their LCA must be in the right subtree. **The very first node we encounter where `p` and `q` are on different sides** (one is smaller, one is larger), or where the node matches `p` or `q`, is guaranteed to be the Lowest Common Ancestor!

---

### Code

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == NULL) return NULL;
        
        int curr = root->val;
        
        // If both p and q are greater than root, LCA is in right subtree
        if (curr < p->val && curr < q->val) {
            return lowestCommonAncestor(root->right, p, q);
        }
        
        // If both p and q are lesser than root, LCA is in left subtree
        if (curr > p->val && curr > q->val) {
            return lowestCommonAncestor(root->left, p, q);
        }
        
        // We found the split point (or root == p or root == q)
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree. We only traverse a single path down the tree.
- **Space Complexity:** `O(H)` due to recursive call stack. (Can easily be converted to `O(1)` iteratively).
