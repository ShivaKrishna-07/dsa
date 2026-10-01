---
title: "Count Complete Tree Nodes"
difficulty: "Medium"
time: "O(log^2 N)"
space: "O(log N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Count+Complete+Tree+Nodes"
  leetcode: "https://leetcode.com/problems/count-complete-tree-nodes/"
  article: "https://takeuforward.org/binary-tree/count-number-of-nodes-in-a-binary-tree/"
---

### Problem Statement

Given the `root` of a complete binary tree, return the number of the nodes in the tree.
According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2^h` nodes inclusive at the last level `h`.
Design an algorithm that runs in less than `O(n)` time complexity.

**Example 1:**
```text
           1
         /   \
        2     3
       / \   /
      4   5 6

Input: root = [1,2,3,4,5,6]
Output: 6
```

---

### Intuition

Since it's a *Complete* Binary Tree, we don't need to count every single node (`O(N)`). 
If we travel all the way down the left spine of a subtree to find its left height, and all the way down the right spine to find its right height, and they are EQUAL, we know this entire subtree is a perfect triangle! The number of nodes in a perfect binary tree is `(2^h) - 1`.
If they are NOT equal, we simply recursively count the left and right subtrees (`1 + count(left) + count(right)`). Because it's a complete tree, at least one of the subtrees will always be a perfect tree, allowing us to skip traversing it entirely!

---

### Code

```cpp
class Solution {
private:
    int findLeftHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->left;
        }
        return h;
    }
    
    int findRightHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->right;
        }
        return h;
    }

public:
    int countNodes(TreeNode* root) {
        if (root == NULL) return 0;
        
        int lh = findLeftHeight(root);
        int rh = findRightHeight(root);
        
        // If left height == right height, it's a perfect binary tree!
        if (lh == rh) {
            return (1 << lh) - 1; // 2^h - 1
        }
        
        // Otherwise, recursively count left and right
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(log^2 N)`. Finding the height takes `O(log N)`. We do this at every step down the tree. Since we only ever recurse down one non-perfect path, the depth is `O(log N)`. Total `O(log N * log N)`.
- **Space Complexity:** `O(log N)` for the recursive call stack.
