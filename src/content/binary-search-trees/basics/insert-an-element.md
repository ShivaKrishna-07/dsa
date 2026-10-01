---
title: "Insert into a Binary Search Tree"
difficulty: "Medium"
time: "O(H)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Insert+into+a+Binary+Search+Tree"
  leetcode: "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
---

### Problem Statement

You are given the `root` node of a binary search tree (BST) and a `value` to insert into the tree. Return the root node of the BST after the insertion. It is **guaranteed** that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

**Example 1:**
```text
        4                      4
      /   \                  /   \
     2     7      =>        2     7
    / \                    / \   /
   1   3                  1   3 5

Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
```

**Example 2:**
```text
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
```

**Example 3: (Edge Case - Empty Tree)**
```text
Input: root = [], val = 5
Output: [5]
Explanation: A new tree is created with 5 as the root.
```

---

### Intuition

To insert a node, we just need to find the correct empty spot (a leaf node's child pointer) where the new value belongs!
We traverse down the tree: if the value to insert is smaller than the current node, we go left; if it's larger, we go right. When we try to go left or right and find that the pointer is `NULL`, we have found the perfect spot to attach our new node.

---

### Code

```cpp
class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        // If tree is empty, new node becomes the root
        if (root == NULL) return new TreeNode(val);
        
        TreeNode* curr = root;
        
        while (true) {
            // Value is smaller, belongs in the left subtree
            if (val < curr->val) {
                // If left child exists, move down left
                if (curr->left != NULL) {
                    curr = curr->left;
                } else {
                    // Spot found! Attach new node and break
                    curr->left = new TreeNode(val);
                    break;
                }
            } 
            // Value is larger, belongs in the right subtree
            else {
                // If right child exists, move down right
                if (curr->right != NULL) {
                    curr = curr->right;
                } else {
                    // Spot found! Attach new node and break
                    curr->right = new TreeNode(val);
                    break;
                }
            }
        }
        
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree.
- **Space Complexity:** `O(1)` as we use an iterative approach.
