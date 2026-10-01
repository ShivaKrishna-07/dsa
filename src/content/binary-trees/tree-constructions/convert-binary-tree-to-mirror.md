---
title: "Convert Binary Tree to Mirror Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Convert+Binary+Tree+to+Mirror+Tree"
  leetcode: "https://leetcode.com/problems/invert-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, invert the tree (or convert it into its mirror), and return its root.

**Example 1:**
```text
      4                 4
    /   \             /   \
   2     7    =>     7     2
  / \   / \         / \   / \
 1   3 6   9       9   6 3   1

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

---

### Intuition

To invert a binary tree, we just need to swap the left and right children for *every single node* in the tree! 
We can use a Postorder traversal (Bottom-Up) or Preorder traversal (Top-Down). At any given node, we simply `swap(root->left, root->right)` and recursively call the function on the left and right children.

---

### Code

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == NULL) return NULL;
        
        // Swap the left and right children
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;
        
        // Recursively invert the subtrees
        invertTree(root->left);
        invertTree(root->right);
        
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node's children are swapped once.
- **Space Complexity:** `O(H)` for the recursive call stack.
