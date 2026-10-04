---
title: "Maximum Root to Leaf Path Sum"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Maximum+Root+to+Leaf+Path+Sum"
  gfg: "https://www.geeksforgeeks.org/problems/maximum-sum-leaf-to-root-path/1"
---

### Problem Statement

Given a Binary Tree, find the maximum sum path from a root to any leaf.

**Example 1:**
```text
        1
      /   \
    2       3

Input: root = [1,2,3]
Output: 4
Explanation: The path 1 -> 3 gives the maximum sum of 4.
```

---

### Intuition

This is similar to finding the height of a tree! Instead of adding `1` for each level, we add the `node->val`.
We recursively find the maximum root-to-leaf sum of the left subtree and the right subtree. The answer for the current node is its value plus the maximum of those two subtree sums.

---

### Code

```cpp
class Solution {
    void solve(Node* root, int sum, int &maxi){
        if(root == NULL) return;
        
        if(root->left == NULL && root->right == NULL){
            maxi = max(maxi, sum+root->data);
            return;
        }
        
        solve(root->left, sum+root->data, maxi);
        solve(root->right, sum+root->data, maxi);
    }
  public:
    int maxPathSum(Node* root) {
        // code here
        int maxi=INT_MIN;
        solve(root, 0, maxi);
        return maxi;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is visited once.
- **Space Complexity:** `O(H)` for the recursive stack.
