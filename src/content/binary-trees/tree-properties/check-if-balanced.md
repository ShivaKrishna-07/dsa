---
title: "Check if Binary Tree is Balanced"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Check+if+Binary+Tree+is+Balanced"
  leetcode: "https://leetcode.com/problems/balanced-binary-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/check-if-a-binary-tree-is-height-balanced"
---

### Problem Statement

Given a binary tree, determine if it is height-balanced.
A height-balanced binary tree is defined as: a binary tree in which the left and right subtrees of *every* node differ in height by no more than `1`.

**Example 1:**
```text
        3
       / \
      9  20
         / \
       15   7

Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**
```text
          1
         / \
        2   2
       / \
      3   3
     / \
    4   4

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

---

### Intuition

A naive approach calculates the height of left and right subtrees for every node, taking `O(N^2)` time.
We can optimize this to `O(N)` by computing the height bottom-up. In the same recursive call that returns the height, we can check the balance condition (`abs(lh - rh) <= 1`). If any subtree is found to be unbalanced, we immediately return `-1` to signal the failure up the recursion chain, avoiding further useless calculations!

---

### Code

```cpp
class Solution {
private:
    int dfsHeight(TreeNode* root) {
        if (root == NULL) return 0;
        
        int leftHeight = dfsHeight(root->left);
        if (leftHeight == -1) return -1; // Propagate failure
        
        int rightHeight = dfsHeight(root->right);
        if (rightHeight == -1) return -1; // Propagate failure
        
        // If the current node is unbalanced, return -1
        if (abs(leftHeight - rightHeight) > 1) return -1;
        
        // Otherwise, return normal height
        return 1 + max(leftHeight, rightHeight);
    }

public:
    bool isBalanced(TreeNode* root) {
        // If dfsHeight returns -1, the tree is unbalanced
        return dfsHeight(root) != -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since each node is visited only once in a bottom-up manner.
- **Space Complexity:** `O(H)` for the recursive call stack.
