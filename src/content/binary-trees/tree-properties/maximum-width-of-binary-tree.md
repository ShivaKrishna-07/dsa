---
title: "Maximum Width of Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Maximum+Width+of+Binary+Tree"
  leetcode: "https://leetcode.com/problems/maximum-width-of-binary-tree/"
  article: "https://takeuforward.org/data-structure/maximum-width-of-a-binary-tree/"
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
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        
        long long maxWidth = 0;
        queue<pair<TreeNode*, long long>> q;
        q.push({root, 0});
        
        while (!q.empty()) {
            int size = q.size();
            long long minIndex = q.front().second; // minimum index at this level
            long long first, last;
            
            for (int i = 0; i < size; i++) {
                // Normalize index to prevent overflow
                long long currIndex = q.front().second - minIndex;
                TreeNode* node = q.front().first;
                q.pop();
                
                if (i == 0) first = currIndex;
                if (i == size - 1) last = currIndex;
                
                if (node->left) q.push({node->left, currIndex * 2 + 1});
                if (node->right) q.push({node->right, currIndex * 2 + 2});
            }
            
            maxWidth = max(maxWidth, last - first + 1);
        }
        
        return maxWidth;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we visit each node exactly once.
- **Space Complexity:** `O(N)` for the queue used in BFS.
