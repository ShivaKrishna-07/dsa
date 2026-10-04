---
title: "Postorder Traversal (Recursive & Iterative)"
difficulty: "Hard"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Postorder+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/post-order-traversal-of-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, return the postorder traversal of its nodes' values.
Postorder traversal follows the **Left, Right, Root** order.

**Example 1:**
```text
        1
          \
           2
          /
        3

Input: root = [1,null,2,3]
Output: [3,2,1]
```

---

### Intuition

Postorder is the hardest traversal to implement iteratively. We must visit Left, then Right, then Root. 
- **Recursive:** `postorder(left) -> postorder(right) -> print`.
- **Iterative (2 Stacks):** A clever trick is to observe that `Root -> Right -> Left` is just the exact reverse of `Left -> Right -> Root` (Postorder). So, we can do a modified Preorder (pushing left before right), and push the popped elements into a second stack. At the end, popping from the second stack gives the perfect Postorder!

---

### Code

```cpp
class Solution {
public:
    // Iterative Approach using 2 Stacks
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;
        if (root == NULL) return ans;
        
        stack<TreeNode*> st1, st2;
        st1.push(root);
        
        while (!st1.empty()) {
            TreeNode* curr = st1.top();
            st1.pop();
            
            st2.push(curr); // Store the reverse postorder
            
            // Push left first, then right
            if (curr->left != NULL) st1.push(curr->left);
            if (curr->right != NULL) st1.push(curr->right);
        }
        
        // st2 now contains the postorder traversal
        while (!st2.empty()) {
            ans.push_back(st2.top()->val);
            st2.pop();
        }
        
        return ans;
    }
};

class SolutionRecursive {
private:
    void traverse(TreeNode* node, vector<int>& ans) {
        if (node == NULL) return;
        traverse(node->left, ans);
        traverse(node->right, ans);
        ans.push_back(node->val);
    }
    
public:
    // Recursive Approach
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;
        traverse(root, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since each node is processed twice (once in st1, once in st2).
- **Space Complexity:** `O(2N) ~ O(N)` since we use two stacks that can hold up to `N` elements in total.
