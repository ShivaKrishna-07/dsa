---
title: "Recover Binary Search Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Recover+Binary+Search+Tree+leetcode+99"
  leetcode: "https://leetcode.com/problems/recover-binary-search-tree/"
---

### Problem Statement

You are given the `root` of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

**Example 1:**
```text
        1                      3
      /   \                  /   \
     3     null   =>        1     null
      \                      \
       2                      2

Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
```

**Example 2:**
```text
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
```

**Example 3: (Edge Case - Swapped nodes are adjacent)**
```text
Input: root = [2,3,1]
Output: [2,1,3]
```

---

### Intuition

An Inorder traversal of a BST gives a strictly increasing sequence. If two nodes are swapped, there will be a violation in this sorted order!
- If the swapped nodes are **not adjacent**, there will be TWO violations (e.g., `1, 6, 3, 4, 5, 2, 7` -> violations at `6 > 3` and `5 > 2`). The first swapped node is the *first* element of the first violation (6), and the second swapped node is the *second* element of the second violation (2).
- If the swapped nodes are **adjacent**, there is only ONE violation (e.g., `1, 3, 2, 4` -> violation at `3 > 2`). The nodes to swap are exactly the two elements in this violation.
We can track this with just a few pointers during a standard inorder traversal!

---

### Code

```cpp
class Solution {
private:
    TreeNode* first;
    TreeNode* middle;
    TreeNode* last;
    TreeNode* prev;
    
    void inorder(TreeNode* root) {
        if (root == NULL) return;
        
        inorder(root->left);
        
        // If there is a violation
        if (prev != NULL && (root->val < prev->val)) {
            // If this is the first violation, mark these two nodes as 'first' and 'middle'
            if (first == NULL) {
                first = prev;
                middle = root;
            } 
            // If this is the second violation, mark this node as 'last'
            else {
                last = root;
            }
        }
        
        // Mark current node as prev and move on
        prev = root;
        
        inorder(root->right);
    }

public:
    void recoverTree(TreeNode* root) {
        first = middle = last = NULL;
        prev = new TreeNode(INT_MIN); // Can also just leave as NULL
        
        inorder(root);
        
        // If swapped nodes are not adjacent
        if (first != NULL && last != NULL) {
            swap(first->val, last->val);
        } 
        // If swapped nodes are adjacent
        else if (first != NULL && middle != NULL) {
            swap(first->val, middle->val);
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we do a standard inorder traversal visiting each node once.
- **Space Complexity:** `O(H)` for the recursive call stack.
