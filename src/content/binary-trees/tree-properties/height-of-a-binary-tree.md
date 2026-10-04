---
title: "Height of a Binary Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Height+of+Binary+Tree"
  leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-depth-of-a-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, return its maximum depth (or height).
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
```text
        3
       /   \
      9    20
           /  \
         15  7

Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**
```text
Input: root = [1,null,2]
Output: 2
```

---

### Intuition

The height of a tree can be defined recursively. The height of an empty tree is `0`. The height of any node is simply `1 + max(height of left subtree, height of right subtree)`. This naturally screams Postorder Traversal, where we process the children first, and then return the computed height to the parent!

---

### Code

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Base case: an empty tree has height 0
        if (root == NULL) return 0;
        
        // Compute the height of left and right subtrees
        int lh = maxDepth(root->left);
        int rh = maxDepth(root->right);
        
        // Return 1 (current node) + max of left and right heights
        return 1 + max(lh, rh);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes. We visit each node exactly once.
- **Space Complexity:** `O(H)` for the recursive call stack, where `H` is the height of the tree.
