---
title: "All Nodes Distance K in Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=All+Nodes+Distance+K+in+Binary+Tree"
  leetcode: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/nodes-distance-k-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node.

**Example 1:**
```text
          3
        /   \
       5     1
      / \   / \
     6   2 0   8
        / \
       7   4

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.
```

---

### Intuition

To find nodes at distance `K` from the target, we can easily go down to its children using BFS. But how do we go *up* to its ancestors? 
Trees only have pointers downwards!
Solution:
1. Do a standard BFS or DFS to map every node to its **parent pointer**.
2. Once we have parent pointers, the tree acts like an undirected graph. We start a **BFS from the target node**!
3. From the target, we spread out in 3 directions: left child, right child, and parent. We keep track of visited nodes to avoid cycles.
4. When our BFS reaches radius `K`, all nodes currently in the queue are our answer!

---

### Code

```cpp
class Solution {
private:
    void markParents(TreeNode* root, unordered_map<TreeNode*, TreeNode*>& parent_track) {
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();
            
            if(curr->left) {
                parent_track[curr->left] = curr;
                q.push(curr->left);
            }
            if(curr->right) {
                parent_track[curr->right] = curr;
                q.push(curr->right);
            }
        }
    }

public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> parent_track; // Node -> Parent
        markParents(root, parent_track); 
        
        unordered_map<TreeNode*, bool> visited; 
        queue<TreeNode*> q;
        
        q.push(target);
        visited[target] = true;
        int curr_level = 0;
        
        // Standard BFS to distance K
        while(!q.empty()) {
            int size = q.size();
            if(curr_level == k) break; // Reached distance K
            curr_level++;
            
            for(int i = 0; i < size; i++) {
                TreeNode* curr = q.front();
                q.pop();
                
                // Go left
                if(curr->left && !visited[curr->left]) {
                    q.push(curr->left);
                    visited[curr->left] = true;
                }
                // Go right
                if(curr->right && !visited[curr->right]) {
                    q.push(curr->right);
                    visited[curr->right] = true;
                }
                // Go UP to parent
                if(parent_track[curr] && !visited[parent_track[curr]]) {
                    q.push(parent_track[curr]);
                    visited[parent_track[curr]] = true;
                }
            }
        }
        
        vector<int> ans;
        while(!q.empty()) {
            ans.push_back(q.front()->val);
            q.pop();
        }
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` to map parents + `O(N)` for the second BFS. Total `O(N)`.
- **Space Complexity:** `O(N)` to store the parent map, visited map, and BFS queues.
