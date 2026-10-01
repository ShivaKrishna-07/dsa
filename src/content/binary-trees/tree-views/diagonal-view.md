---
title: "Diagonal View of a Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Diagonal+View+of+a+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/diagonal-traversal-of-binary-tree/1"
---

### Problem Statement

Given a Binary Tree, print the diagonal traversal of the binary tree.
Consider lines of slope -1 passing between nodes. Given a Binary Tree, print all diagonal elements in a binary tree belonging to same line.

**Example 1:**
```text
         8
       /   \
      3     10
     / \     \
    1   6     14
       / \   /
      4   7 13

Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: [8, 10, 14, 3, 6, 7, 13, 1, 4]
```

---

### Intuition

To print diagonally, think of the right child as being on the *same* diagonal as the parent, while the left child starts a *new* diagonal (next level).
We can use a simple Queue.
1. Push the root.
2. Pop a node. While the node is not NULL:
   - Add it to the answer.
   - If it has a left child, push the left child into the queue (this queues it for the next diagonal).
   - Move the pointer to the right child (`curr = curr->right`) and repeat, staying on the same diagonal!

---

### Code

```cpp
class Solution {
public:
    vector<int> diagonal(Node *root) {
        vector<int> ans;
        if(root == NULL) return ans;
        
        queue<Node*> q;
        q.push(root);
        
        while(!q.empty()) {
            Node* curr = q.front();
            q.pop();
            
            // Traverse down the entire right slope of this diagonal
            while(curr != NULL) {
                ans.push_back(curr->data);
                
                // If there is a left child, it belongs to the next diagonal
                if(curr->left) {
                    q.push(curr->left);
                }
                
                // Move to the next node on the SAME diagonal
                curr = curr->right;
            }
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is visited and queued exactly once.
- **Space Complexity:** `O(N)` because in the worst case (e.g. all left children), the queue will hold `N` nodes.
