---
title: "Maximum Width of Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Maximum+Width+of+Binary+Tree"
  leetcode: "https://leetcode.com/problems/maximum-width-of-binary-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/maximum-width-of-a-binary-tree"
---

### Problem Statement

Given the `root` of a binary tree, return the maximum width of the given tree.
The maximum width of a tree is the maximum width among all levels.
The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

**Example 1:**
```text
           1
         /   \
        3     2
       / \     \
      5   3     9

Input: root = [1,3,2,5,3,null,9]
Output: 4
Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
```

---

### Intuition

To calculate the width including null nodes, we can assign a unique index to every node just like in an array representation of a complete binary tree. 
If a node has index `i`, its left child will have index `2*i + 1` and right child `2*i + 2`.
The width of a level is simply `(last node index) - (first node index) + 1`. We use Level Order Traversal (BFS) to visit nodes level by level. To prevent integer overflow for skewed trees, we normalize indices at each level by subtracting the minimum index of that level!

---

### Code

```cpp
// Approach-1 (Using BFS)
class Solution {
public:
    typedef unsigned long long ll;
    int widthOfBinaryTree(TreeNode* root) {
        if(!root)   
            return 0;
        queue<pair<TreeNode*, ll>> q;
        q.push({root, 0});
        ll maxWidth = 0;
        
        while(!q.empty()) {
            int n = q.size();
            ll f = q.front().second;
            ll l = q.back().second;
            maxWidth = max(maxWidth, l-f+1);
            
            while(n--) {
                TreeNode* curr = q.front().first;
                ll d          = q.front().second;
                q.pop();
                if(curr->left) {
                    q.push({curr->left, 2*d+1});
                }
                if(curr->right) {
                    q.push({curr->right, 2*d+2});
                }
            }
        }
        return maxWidth;
    }
};

// Approach-2 : Using DFS
class SolutionDFS {
public:
    typedef unsigned long long ll;
    
    void DFS(TreeNode* root, ll d, int level, vector<int>& arr, ll& maxWidth) {
        if(!root)
            return;
        
        if(level == arr.size()) {
            arr.push_back(d);
        } else {
            maxWidth = max(maxWidth, d-arr[level]+1);
        }
        
        DFS(root->left, 2*d+1, level+1, arr, maxWidth);
        DFS(root->right, 2*d+2, level+1, arr, maxWidth);
    }
    
    int widthOfBinaryTree(TreeNode* root) {
        if(!root)   
            return 0;
        
        ll maxWidth = 1;
        vector<int> arr;
        DFS(root, 0, 0, arr, maxWidth);
        return maxWidth;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we visit each node exactly once.
- **Space Complexity:** `O(N)` for the queue used in BFS.
