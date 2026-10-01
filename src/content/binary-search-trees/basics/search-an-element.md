---
title: "Search in a Binary Search Tree"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Search+in+a+Binary+Search+Tree"
time: "O(H)"
space: "O(H)"
platforms:
  leetcode: "https://leetcode.com/problems/search-in-a-binary-search-tree/"
---

### Problem Statement

You are given the `root` of a binary search tree (BST) and an integer `val`.
Find the node in the BST that the node's value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.

**Example 1:**
```text
        4
      /   \
     2     7
    / \
   1   3

Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

**Example 2:**
```text
        4
      /   \
     2     7
    / \
   1   3

Input: root = [4,2,7,1,3], val = 5
Output: []
Explanation: 5 is not found in the BST.
```

**Example 3: (Edge Case - Empty Tree)**
```text
Input: root = [], val = 5
Output: []
```

---

### Intuition

A Binary Search Tree (BST) has a special property: for any given node, all values in its left subtree are smaller, and all values in its right subtree are larger. 
To search for a value, we can start at the root. If the target value is smaller than the current node's value, we move left. If it's larger, we move right. If it's equal, we've found it! This is exactly like a binary search on an array.

---

### Code

```cpp
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        // Continue searching while root is not null and we haven't found the value
        while (root != NULL && root->val != val) {
            // If the target value is smaller, go left. Otherwise, go right.
            if (val < root->val) {
                root = root->left;
            } else {
                root = root->right;
            }
        }
        
        // Will return the node if found, or NULL if not found
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree. In the worst case (skewed tree), this is `O(N)`. For a balanced BST, it is `O(log N)`.
- **Space Complexity:** `O(1)` as we are using an iterative approach without any extra space.
