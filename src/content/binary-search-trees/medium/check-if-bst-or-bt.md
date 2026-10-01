---
title: "Validate Binary Search Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Validate+Binary+Search+Tree+leetcode+98"
  leetcode: "https://leetcode.com/problems/validate-binary-search-tree/"
---

### Problem Statement

Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1:**
```text
        2
      /   \
     1     3

Input: root = [2,1,3]
Output: true
```

**Example 2:**
```text
        5
      /   \
     1     4
          / \
         3   6

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

**Example 3: (Edge Case - Single Node)**
```text
Input: root = [0]
Output: true
```

---

### Intuition

A common mistake is to just check if `left < root` and `root < right`. But in a BST, *all* nodes in the left subtree must be smaller than the root, not just the direct children! 
To solve this correctly, we can pass a **valid range** `(min, max)` down to each node. When we go left, the new max becomes the current node's value. When we go right, the new min becomes the current node's value. If any node breaks its allowed range, the tree is invalid.

---

### Code

```cpp
class Solution {
private:
    bool isValidBSTHelper(TreeNode* root, long long minVal, long long maxVal) {
        if (root == NULL) return true;
        
        // Node's value must fall strictly within the allowed range
        if (root->val <= minVal || root->val >= maxVal) {
            return false;
        }
        
        // Check left subtree (update max) and right subtree (update min)
        return isValidBSTHelper(root->left, minVal, root->val) && 
               isValidBSTHelper(root->right, root->val, maxVal);
    }

public:
    bool isValidBST(TreeNode* root) {
        // Use LONG_MIN and LONG_MAX to handle INT limits
        return isValidBSTHelper(root, LONG_MIN, LONG_MAX);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes, as we visit every node exactly once.
- **Space Complexity:** `O(H)` for the recursion stack space, where `H` is the height of the tree.
