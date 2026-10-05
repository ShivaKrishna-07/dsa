---
title: "Flatten Binary Tree to Linked List"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Flatten+Binary+Tree+to+Linked+List"
  leetcode: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/flatten-binary-tree-to-linked-list"
---

### Problem Statement

Given the `root` of a binary tree, flatten the tree into a "linked list":
- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a pre-order traversal of the binary tree.

**Example 1:**
```text
      1
     / \
    2   5
   / \   \
  3   4   6

Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

---

### Intuition

We process nodes in **reverse preorder** (right → left → root). By maintaining a `prev` pointer, each node's `right` is set to the previously processed node, and `left` is set to `NULL`. This builds the flattened list from the tail backwards.

---

### Code

```cpp
class Solution {
public:
    TreeNode* prev = NULL;
    void flatten(TreeNode* root) {
        if(!root) return;

        flatten(root->right);
        flatten(root->left);

        root->right = prev;
        root->left = NULL;
        prev = root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is visited once.
- **Space Complexity:** `O(H)` for the recursive call stack.
