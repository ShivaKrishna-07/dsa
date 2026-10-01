---
title: "Maximum Difference Between Node and Ancestor"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Maximum+Difference+Between+Node+and+Ancestor"
  leetcode: "https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/"
---

### Problem Statement

Given the `root` of a binary tree, find the maximum value `v` for which there exist different nodes `a` and `b` where `v = |a.val - b.val|` and `a` is an ancestor of `b`.

**Example 1:**
```text
        8
      /   \
    3      10
   / \       \
  1   6      14
     / \     /
    4   7   13

Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are:
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.
```

---

### Intuition

Instead of checking every node against all its ancestors (`O(N^2)`), we can realize that for any given path from root to leaf, the maximum difference will always be between the **maximum** node and the **minimum** node on that path.
We can simply pass down the `max_val` and `min_val` seen so far during a DFS traversal. When we reach a leaf, the max difference for that path is `max_val - min_val`. We take the maximum of all these path differences.

---

### Code

```cpp
class Solution {
private:
    int dfs(TreeNode* root, int minVal, int maxVal) {
        if (root == NULL) {
            return maxVal - minVal;
        }
        
        // Update max and min values seen so far on this path
        minVal = min(minVal, root->val);
        maxVal = max(maxVal, root->val);
        
        // Recurse for left and right children, returning the maximum difference found
        int leftDiff = dfs(root->left, minVal, maxVal);
        int rightDiff = dfs(root->right, minVal, maxVal);
        
        return max(leftDiff, rightDiff);
    }

public:
    int maxAncestorDiff(TreeNode* root) {
        if (root == NULL) return 0;
        return dfs(root, root->val, root->val);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is visited exactly once.
- **Space Complexity:** `O(H)` for the recursive call stack.
