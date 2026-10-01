---
title: "Left View of Binary Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Left+View+of+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1"
  article: "https://takeuforward.org/data-structure/right-left-view-of-binary-tree/"
---

### Problem Statement

Given a Binary Tree, return its Left view. The left view of a Binary Tree is a set of nodes visible when the tree is visited from the Left side.

**Example 1:**
```text
        1
      /   \
    2       3
     \       \
      5       4

Input: root = [1,2,3,null,5,null,4]
Output: [1,2,5]
```

---

### Intuition

The Left View is perfectly symmetric to the Right View. 
Instead of a BFS, we use a recursive DFS approach. We track the current depth. This time, we traverse the **Left** child first, then the **Right** child. The very first time our depth matches the size of our answer array, we know we are looking at the leftmost node of that level!

---

### Code

```cpp
class Solution {
private:
    void dfs(Node* root, int depth, vector<int>& ans) {
        if (root == NULL) return;
        
        // If this is the first time we've reached this depth, add the node!
        if (depth == ans.size()) {
            ans.push_back(root->data);
        }
        
        // Go left FIRST to guarantee we see the leftmost node first
        dfs(root->left, depth + 1, ans);
        dfs(root->right, depth + 1, ans);
    }

public:
    vector<int> leftView(Node *root) {
        vector<int> ans;
        dfs(root, 0, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we visit every node once.
- **Space Complexity:** `O(H)` for the recursion stack.
