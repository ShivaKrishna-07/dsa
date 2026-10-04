---
title: "Burning Tree"
difficulty: "Hard"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Burning+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/burning-tree/1"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/minimum-time-burn-binary-tree"
---

### Problem Statement

Given a binary tree and a node `target`, find the minimum time required to burn the complete binary tree if the target is set on fire. It is known that in 1 second all nodes connected to a given node get burned. That is, its left child, right child, and parent.

**Example 1:**
```text
          1
        /   \
       2     3
      / \     \
     4   5     6
        / \     \
       7   8     9
                   \
                   10

Input: root = [1,2,3,4,5,null,6,null,null,7,8,null,9,null,null,null,10], target = 8
Output: 7
```

---

### Intuition

This problem is extremely similar to finding nodes at distance K! 
If fire spreads in 3 directions (left, right, and parent) simultaneously taking 1 second per level, the minimum time to burn the whole tree is simply the **maximum distance (or BFS levels)** from the target node to any other node!
We map the parents first, find the target node, and run a BFS from the target. The time taken is the number of levels the BFS expands!

---

### Code

```cpp
class Solution {
private:
    Node* markParents(Node* root, unordered_map<Node*, Node*>& mpp, int target) {
        queue<Node*> q;
        q.push(root);
        Node* targetNode = NULL;
        
        while(!q.empty()) {
            Node* curr = q.front();
            q.pop();
            
            if(curr->data == target) targetNode = curr;
            
            if(curr->left) {
                mpp[curr->left] = curr;
                q.push(curr->left);
            }
            if(curr->right) {
                mpp[curr->right] = curr;
                q.push(curr->right);
            }
        }
        return targetNode;
    }

public:
    int minTime(Node* root, int target) {
        unordered_map<Node*, Node*> mpp;
        Node* targetNode = markParents(root, mpp, target);
        
        unordered_map<Node*, bool> visited;
        queue<Node*> q;
        
        q.push(targetNode);
        visited[targetNode] = true;
        int time = 0;
        
        while(!q.empty()) {
            int size = q.size();
            bool flag = false; // Check if any node burned in this second
            
            for(int i = 0; i < size; i++) {
                Node* curr = q.front();
                q.pop();
                
                // Fire spreads left
                if(curr->left && !visited[curr->left]) {
                    q.push(curr->left);
                    visited[curr->left] = true;
                    flag = true;
                }
                // Fire spreads right
                if(curr->right && !visited[curr->right]) {
                    q.push(curr->right);
                    visited[curr->right] = true;
                    flag = true;
                }
                // Fire spreads to parent
                if(mpp[curr] && !visited[mpp[curr]]) {
                    q.push(mpp[curr]);
                    visited[mpp[curr]] = true;
                    flag = true;
                }
            }
            
            if(flag == true) time++;
        }
        
        return time;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` for BFS mapping parents, and `O(N)` for BFS spreading the fire.
- **Space Complexity:** `O(N)` for the parent map, visited map, and queues.
