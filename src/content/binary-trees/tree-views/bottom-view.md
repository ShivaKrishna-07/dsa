---
title: "Bottom View of Binary Tree"
difficulty: "Medium"
time: "O(N log N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Bottom+View+of+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1"
  article: "https://takeuforward.org/data-structure/bottom-view-of-a-binary-tree/"
---

### Problem Statement

Given a binary tree, print the bottom view from left to right.
A node is included in the bottom view if it can be seen when we look at the tree from the bottom.

**Example 1:**
```text
        1
      /   \
    2       3
   / \     / \
  4   5   6   7

Input: root = [1,2,3,4,5,6,7]
Output: [4,2,6,3,7]
```

---

### Intuition

The Bottom View is almost identical to the Top View! We still draw vertical lines (assign Horizontal Distances).
However, since we are looking from the bottom, if multiple nodes fall on the same vertical line, the one that is deepest (lowest level) hides the others.
Using Level Order Traversal (BFS), we simply *overwrite* the map value for a given HD every time we see a new node. Because we go level by level, the last node we process for any HD will be the bottom-most node!

---

### Code

```cpp
class Solution {
public:
    vector <int> bottomView(Node *root) {
        vector<int> ans;
        if(root == NULL) return ans;
        
        // map to store {Horizontal Distance -> Node Value}
        map<int, int> mpp;
        // queue to perform BFS {Node, Horizontal Distance}
        queue<pair<Node*, int>> q;
        
        q.push({root, 0});
        
        while(!q.empty()) {
            auto it = q.front();
            q.pop();
            
            Node* curr = it.first;
            int hd = it.second;
            
            // Unconditionally overwrite the value at this HD
            // Since we are doing BFS, the last node seen at an HD is the bottom-most
            mpp[hd] = curr->data;
            
            if(curr->left != NULL) q.push({curr->left, hd - 1});
            if(curr->right != NULL) q.push({curr->right, hd + 1});
        }
        
        for(auto it : mpp) {
            ans.push_back(it.second);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)`. Traversing takes `O(N)`, inserting into map takes `O(log N)`.
- **Space Complexity:** `O(N)` to store the map and queue.
