---
title: "Binary Tree Maximum Path Sum"
difficulty: "Hard"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Binary+Tree+Maximum+Path+Sum"
  leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
  article: "https://takeuforward.org/data-structure/maximum-sum-path-in-binary-tree/"
---

### Problem Statement

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.
The **path sum** of a path is the sum of the node's values in the path.
Given the `root` of a binary tree, return the maximum path sum of any non-empty path.

**Example 1:**
```text
        -10
        /  \
       9   20
          /  \
         15   7

Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
```

---

### Intuition

This is an extension of the "Diameter of Binary Tree" problem! 
Instead of counting edges, we sum the node values. For any given node acting as the highest point (the "curve") of the path, the maximum path sum passing through it is `node->val + leftMaxPathSum + rightMaxPathSum`.
Wait, what if a subtree has a *negative* maximum path sum? We should just ignore it (replace it with `0`)!
While calculating this bottom-up, we update our global maximum. Then, we return `node->val + max(leftMax, rightMax)` to the parent so they can use this path!

---

### Code

```cpp
class Solution {
private:
    int findMaxPath(TreeNode* root, int& maxi) {
        if (root == NULL) return 0;
        
        // If a subtree returns a negative sum, we ignore it by taking max with 0
        int leftMax = max(0, findMaxPath(root->left, maxi));
        int rightMax = max(0, findMaxPath(root->right, maxi));
        
        // Update the global maximum path sum found so far
        maxi = max(maxi, root->val + leftMax + rightMax);
        
        // Return the max path sum extending downwards
        return root->val + max(leftMax, rightMax);
    }

public:
    int maxPathSum(TreeNode* root) {
        int maxi = INT_MIN;
        findMaxPath(root, maxi);
        return maxi;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we visit each node exactly once.
- **Space Complexity:** `O(H)` for the recursive call stack.
