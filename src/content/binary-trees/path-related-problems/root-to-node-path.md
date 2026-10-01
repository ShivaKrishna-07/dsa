---
title: "Root to Node Path in a Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Root+to+Node+Path+in+a+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/root-to-leaf-paths/1"
  article: "https://takeuforward.org/data-structure/print-root-to-node-path-in-a-binary-tree/"
---

### Problem Statement

Given a Binary Tree and a target value `B`, you need to find the path from the root node to the given node `B`.
Note: You can assume that `B` is present in the tree and there is only one such node.

**Example 1:**
```text
        1
      /   \
    2       3
   / \     / \
  4   5   6   7

Input: root = [1,2,3,4,5,6,7], B = 5
Output: [1, 2, 5]
```

---

### Intuition

We can use a recursive Preorder traversal to find the path.
As we visit a node, we add it to our path array. If it's the target node, we return `true` immediately to stop searching.
If it's not the target, we recursively check the left and right subtrees. If either returns `true`, the current node is part of the path, so we also return `true`.
If both subtrees return `false`, this path is a dead end. We remove the current node from our path array (backtrack) and return `false`.

---

### Code

```cpp
class Solution {
private:
    bool getPath(TreeNode* root, vector<int>& arr, int target) {
        // Base case
        if (root == NULL) return false;
        
        // Add current node to the path
        arr.push_back(root->val);
        
        // If we found the target, return true
        if (root->val == target) return true;
        
        // Check left or right subtrees
        if (getPath(root->left, arr, target) || 
            getPath(root->right, arr, target)) {
            return true;
        }
        
        // If not found in this path, backtrack and return false
        arr.pop_back();
        return false;
    }

public:
    vector<int> solve(TreeNode* A, int B) {
        vector<int> arr;
        if (A == NULL) return arr;
        
        getPath(A, arr, B);
        return arr;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since in the worst case we visit all nodes.
- **Space Complexity:** `O(H)` for the recursive call stack and the array to store the path.
