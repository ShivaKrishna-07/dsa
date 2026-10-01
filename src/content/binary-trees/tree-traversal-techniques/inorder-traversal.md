---
title: "Inorder Traversal (Recursive & Iterative)"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Inorder+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  article: "https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, return the inorder traversal of its nodes' values.
Inorder traversal follows the **Left, Root, Right** order.

**Example 1:**
```text
        **1**
          \
           **2**
          /
        **3**

Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Example 2:**
```text
Input: root = []
Output: []
```

**Example 3:**
```text
Input: root = [1]
Output: [1]
```

---

### Intuition

Inorder traversal requires us to visit the left subtree completely, then the current node, and finally the right subtree. 
- **Recursive approach** is trivial: `inorder(left) -> print -> inorder(right)`.
- **Iterative approach** uses a stack to simulate the recursion. We keep going left, pushing nodes to the stack, until we hit `NULL`. Then we pop from the stack (visiting the node), and move to its right child.

---

### Code

```cpp
class Solution {
public:
    // Iterative Approach
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        stack<TreeNode*> st;
        TreeNode* curr = root;
        
        while (curr != NULL || !st.empty()) {
            // Keep going left
            if (curr != NULL) {
                st.push(curr);
                curr = curr->left;
            } 
            // When we reach a null, process the top node and go right
            else {
                curr = st.top();
                st.pop();
                ans.push_back(curr->val);
                curr = curr->right;
            }
        }
        
        return ans;
    }
};

class SolutionRecursive {
private:
    void traverse(TreeNode* node, vector<int>& ans) {
        if (node == NULL) return;
        traverse(node->left, ans);
        ans.push_back(node->val);
        traverse(node->right, ans);
    }
    
public:
    // Recursive Approach
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        traverse(root, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes in the tree. We visit each node exactly once.
- **Space Complexity:** `O(H)` where `H` is the height of the tree (for the stack or recursion). In the worst case (skewed tree), this can be `O(N)`.
