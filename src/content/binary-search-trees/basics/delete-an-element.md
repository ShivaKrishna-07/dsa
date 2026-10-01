---
title: "Delete Node in a BST"
difficulty: "Medium"
time: "O(H)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Delete+Node+in+a+BST"
  leetcode: "https://leetcode.com/problems/delete-node-in-a-bst/"
---

### Problem Statement

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:
1. Search for a node to remove.
2. If the node is found, delete the node.

**Example 1:**
```text
        5                      5
      /   \                  /   \
     3     6      =>        4     6
    / \     \              /       \
   2   4     7            2         7

Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
```

**Example 2:**
```text
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.
```

**Example 3: (Edge Case - Delete Root)**
```text
Input: root = [5], key = 5
Output: []
```

---

### Intuition

Deleting a node in a BST is tricky because we must preserve the BST structure. 
1. **Search**: First, find the node.
2. **Delete**:
   - If it has no children, just remove it.
   - If it has one child, replace it with that child.
   - If it has TWO children, this is the hard part! We must replace the node with the largest element in its left subtree (or smallest in its right subtree). Let's use the largest in the left subtree. We find the right-most node of the left subtree, connect it to the deleted node's right subtree, and then replace the deleted node with its left child!

---

### Code

```cpp
class Solution {
private:
    TreeNode* helper(TreeNode* root) {
        // If one child is missing, simply return the other
        if (root->left == NULL) return root->right;
        if (root->right == NULL) return root->left;
        
        // If both children exist:
        // Find the right-most node in the left subtree
        TreeNode* rightChild = root->right;
        TreeNode* lastRight = findLastRight(root->left);
        
        // Connect the original right subtree to this right-most node
        lastRight->right = rightChild;
        
        // Replace the deleted node with its left child
        return root->left;
    }
    
    TreeNode* findLastRight(TreeNode* root) {
        while (root->right != NULL) {
            root = root->right;
        }
        return root;
    }

public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (root == NULL) return NULL;
        
        // If root itself is to be deleted
        if (root->val == key) {
            return helper(root);
        }
        
        TreeNode* curr = root;
        while (curr != NULL) {
            if (curr->val > key) {
                // If the left child is the target
                if (curr->left != NULL && curr->left->val == key) {
                    curr->left = helper(curr->left);
                    break;
                } else {
                    curr = curr->left;
                }
            } else {
                // If the right child is the target
                if (curr->right != NULL && curr->right->val == key) {
                    curr->right = helper(curr->right);
                    break;
                } else {
                    curr = curr->right;
                }
            }
        }
        
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree. Searching takes `O(H)` and rearranging pointers takes `O(H)` to find the last right node.
- **Space Complexity:** `O(1)` auxiliary space as we modify pointers iteratively.
