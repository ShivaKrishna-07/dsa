---
title: "Zigzag Level Order Traversal"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Zigzag+Level+Order+Traversal"
  leetcode: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
  article: "https://takeuforward.org/data-structure/zig-zag-traversal-of-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

**Example 1:**
```text
        **3**
       /   \
      9     **20**
           /  \
         15    7

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Explanation: 
Level 1: Left to Right -> [3]
Level 2: Right to Left -> [20, 9]
Level 3: Left to Right -> [15, 7]
```

---

### Intuition

This is exactly the same as normal Level Order Traversal (BFS), but with a twist! We can use a boolean flag `leftToRight`. 
For each level, we create an array of the required size. If `leftToRight` is true, we insert nodes at index `0, 1, 2...`. If it is false, we insert nodes backwards at index `n-1, n-2...`. After finishing a level, we flip the boolean flag!

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if (root == NULL) return ans;
        
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        
        while (!q.empty()) {
            int size = q.size();
            vector<int> level(size);
            
            for (int i = 0; i < size; i++) {
                TreeNode* curr = q.front();
                q.pop();
                
                // Find correct position to place the node based on flag
                int index = leftToRight ? i : (size - 1 - i);
                level[index] = curr->val;
                
                if (curr->left != NULL) q.push(curr->left);
                if (curr->right != NULL) q.push(curr->right);
            }
            
            // Flip the flag for the next level
            leftToRight = !leftToRight;
            ans.push_back(level);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since each node is visited once and placed directly in the array.
- **Space Complexity:** `O(N)` for the queue storing nodes at each level.
