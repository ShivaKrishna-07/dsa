---
title: "Diameter of Binary Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Diameter+of+Binary+Tree"
  leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/diameter-of-a-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, return the length of the diameter of the tree.
The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
The length of a path between two nodes is represented by the number of edges between them.

**Example 1:**
```text
          1
         / \
        2   3
       / \
      4   5

Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

---

### Intuition

The diameter is simply the longest path between two leaf nodes. For any given node acting as the "curve" (highest point) of the path, the longest path passing through it is `leftHeight + rightHeight`.
Instead of finding the diameter for every node separately (`O(N^2)`), we can find the height of the tree in `O(N)`. While calculating the height bottom-up, we can keep track of the maximum `leftHeight + rightHeight` seen so far across *all* nodes!

---

### Code

```cpp
class Solution {
private:
    int height(TreeNode* root, int& diameter) {
        if (root == NULL) return 0;
        
        int lh = height(root->left, diameter);
        int rh = height(root->right, diameter);
        
        // Update the maximum diameter found so far
        diameter = max(diameter, lh + rh);
        
        // Return height of current node
        return 1 + max(lh, rh);
    }

public:
    int diameterOfBinaryTree(TreeNode* root) {
        int diameter = 0;
        height(root, diameter);
        return diameter;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we do a simple postorder traversal.
- **Space Complexity:** `O(H)` for the recursive call stack.
