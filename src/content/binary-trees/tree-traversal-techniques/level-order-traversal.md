---
title: "Level Order Traversal"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Level+Order+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  article: "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1:**
```text
        **3**
       /   \
      9     **20**
           /  \
         15    7

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

---

### Intuition

Level order traversal is simply **Breadth-First Search (BFS)** on a tree. 
We can use a `Queue` data structure. We start by pushing the root into the queue. Then, in a loop, we determine the number of nodes at the current level (`queue.size()`), pop them all one by one, record their values, and push their children (left then right) into the queue for the next level.

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if (root == NULL) return ans;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int size = q.size(); // Number of nodes in the current level
            vector<int> level;
            
            for (int i = 0; i < size; i++) {
                TreeNode* curr = q.front();
                q.pop();
                
                level.push_back(curr->val);
                
                if (curr->left != NULL) q.push(curr->left);
                if (curr->right != NULL) q.push(curr->right);
            }
            
            ans.push_back(level); // Add the completed level to our answer
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes. Every node is pushed and popped exactly once.
- **Space Complexity:** `O(N)` since the queue can hold up to `N/2` nodes at the lowest level (for a full binary tree).
