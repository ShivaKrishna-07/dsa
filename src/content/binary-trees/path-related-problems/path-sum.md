---
title: "Path Sum"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Path+Sum+Binary+Tree"
  leetcode: "https://leetcode.com/problems/path-sum/"
---

### Problem Statement

Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.
A leaf is a node with no children.

**Example 1:**
```text
          5
         / \
        4   8
       /   / \
      11  13  4
     /  \      \
    7    2      1

Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown as 5 -> 4 -> 11 -> 2.
```

---

### Intuition

We can solve this problem using DFS. Starting from the root, we subtract the current node's value from `targetSum`.
If we reach a leaf node, we check if the remaining `targetSum` exactly equals the leaf's value. If it does, we found our path!
If the node is not a leaf, we recursively check its left and right children with the updated `targetSum`.

---

### Code

```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (root == NULL) return false;
        
        // If it's a leaf node, check if the remaining sum matches its value
        if (root->left == NULL && root->right == NULL) {
            return targetSum == root->val;
        }
        
        // Recursively check left and right subtrees with the reduced sum
        bool leftPath = hasPathSum(root->left, targetSum - root->val);
        bool rightPath = hasPathSum(root->right, targetSum - root->val);
        
        return leftPath || rightPath;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes.
- **Space Complexity:** `O(H)` for the recursion stack.
