---
title: "Right View of Binary Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Right+View+of+Binary+Tree"
  leetcode: "https://leetcode.com/problems/binary-tree-right-side-view/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/left-and-right-views-of-a-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.

**Example 1:**
```text
        1
      /   \
    2       3
     \       \
      5       4

Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
```

---

### Intuition

To see the right side, we just want the *last* node at every level.
While BFS (Level Order) can easily grab the last node of each level, a simpler recursive DFS approach is extremely elegant! 
We keep track of our current depth. We traverse the **Right** child first, then the **Left** child. The first time we reach a new depth, the node we are on is guaranteed to be the rightmost node at that level!

---

### Code

```cpp
class Solution {
private:
    void dfs(TreeNode* root, int depth, vector<int>& ans) {
        if (root == NULL) return;
        
        // If this is the first time we've reached this depth, add the node!
        if (depth == ans.size()) {
            ans.push_back(root->val);
        }
        
        // Go right FIRST to guarantee we see the rightmost node first
        dfs(root->right, depth + 1, ans);
        dfs(root->left, depth + 1, ans);
    }

public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> ans;
        dfs(root, 0, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we visit each node exactly once.
- **Space Complexity:** `O(H)` for the recursive stack.
