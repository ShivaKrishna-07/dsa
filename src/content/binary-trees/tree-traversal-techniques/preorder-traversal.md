---
title: "Preorder Traversal (Recursive & Iterative)"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Preorder+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/preorder-traversal-of-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, return the preorder traversal of its nodes' values.
Preorder traversal follows the **Root, Left, Right** order.

**Example 1:**
```text
        1
          \
           2
          /
        3

Input: root = [1,null,2,3]
Output: [1,2,3]
```

**Example 2:**
```text
Input: root = []
Output: []
```

---

### Intuition

Preorder means we process the current node FIRST, then explore the left branch, then the right branch.
- **Recursive approach:** `print -> preorder(left) -> preorder(right)`.
- **Iterative approach:** Since a stack is LIFO (Last In, First Out), we push the `root` first. Then, in a loop, we pop the top node, process it, and push its **right** child, followed by its **left** child. We push right first so that left gets popped and processed first!

---

### Code

```cpp
class Solution {
public:
    // Iterative Approach
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        if (root == NULL) return ans;
        
        stack<TreeNode*> st;
        st.push(root);
        
        while (!st.empty()) {
            TreeNode* curr = st.top();
            st.pop();
            
            ans.push_back(curr->val);
            
            // Push right first, so left is processed first (LIFO)
            if (curr->right != NULL) st.push(curr->right);
            if (curr->left != NULL) st.push(curr->left);
        }
        
        return ans;
    }
};

class SolutionRecursive {
private:
    void traverse(TreeNode* node, vector<int>& ans) {
        if (node == NULL) return;
        ans.push_back(node->val);
        traverse(node->left, ans);
        traverse(node->right, ans);
    }
    
public:
    // Recursive Approach
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        traverse(root, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is pushed and popped exactly once.
- **Space Complexity:** `O(H)` where `H` is the tree height, for the stack.
