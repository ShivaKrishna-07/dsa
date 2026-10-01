---
title: "Top View of Binary Tree"
difficulty: "Medium"
time: "O(N log N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Top+View+of+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1"
  article: "https://takeuforward.org/data-structure/top-view-of-a-binary-tree/"
---

### Problem Statement

Given below is a binary tree. The task is to print the top view of the binary tree. 
Top view of a binary tree is the set of nodes visible when the tree is viewed from the top.

**Example 1:**
```text
        1
      /   \
    2       3
   / \     / \
  4   5   6   7

Input: root = [1,2,3,4,5,6,7]
Output: [4,2,1,3,7]
```

---

### Intuition

Imagine drawing vertical lines down through the tree. A node is visible from the top if it's the *first* node we hit on that vertical line. 
We can assign a horizontal distance (HD) to each node: `root` is at `0`, left child is `HD-1`, right child is `HD+1`. 
By doing a **Level Order Traversal (BFS)**, we guarantee that the first node we see for any given HD is the one closest to the top! We store this in a map (`HD -> node value`). Since maps in C++ are sorted by key, printing the map values will give us the top view from left to right.

---

### Code

```cpp
class Solution {
public:
    vector<int> topView(Node *root) {
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
            
            // If this horizontal distance is not visited yet, add it!
            // Because we are doing level order, the first node we see at a given HD is the top-most
            if(mpp.find(hd) == mpp.end()) {
                mpp[hd] = curr->data;
            }
            
            if(curr->left != NULL) q.push({curr->left, hd - 1});
            if(curr->right != NULL) q.push({curr->right, hd + 1});
        }
        
        // Map is already sorted by HD keys (left to right)
        for(auto it : mpp) {
            ans.push_back(it.second);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` where `N` is the number of nodes. We traverse all nodes (`O(N)`) and inserting into the map takes `O(log N)` each.
- **Space Complexity:** `O(N)` for the queue and the map.
