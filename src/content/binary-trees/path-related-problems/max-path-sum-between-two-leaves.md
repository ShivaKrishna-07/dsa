---
title: "Max Path Sum Between Two Leaves"
difficulty: "Hard"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Max+Path+Sum+Between+Two+Leaves"
  gfg: "https://www.geeksforgeeks.org/problems/maximum-path-sum/1"
---

### Problem Statement

Given the root of a binary tree, where each node contains an integer value, find the maximum possible path sum between any two leaf nodes. If the tree has fewer than two leaf nodes, return `-1`.

**Example 1:**
```text
        3
       / \
      4   5
     / \
   -10  4

Input: root = [3, 4, 5, -10, 4]
Output: 16
Explanation: The maximum path sum is between leaf node 4 and leaf node 5: 4 -> 4 -> 3 -> 5 = 16.
```

---

### Intuition

We can solve this using a post-order traversal (bottom-up approach), similar to finding the diameter or the maximum path sum between any two nodes. 

At any given node, if it has **both left and right children**, it means a path between two leaves can pass *through* this node as its highest point. We update our global maximum with the sum of the max path from the left child + max path from the right child + current node's value. 
To its parent, this node can only provide a single path (either from the left or right). Thus, we return `node->data + max(leftPath, rightPath)`. 
If a node only has one child, a path between two leaves cannot curve at this node, so we simply pass the sum from the existing child upwards.

---

### Code

```cpp
class Solution {
private:
    int solve(Node* root, int& maxi) {
        if (!root) return 0;
        
        if (!root->left && !root->right) return root->data;
        
        int ls = solve(root->left, maxi);
        int rs = solve(root->right, maxi);
        
        // If the current node has both children, it can act as the highest point of a path
        if (root->left && root->right) {
            maxi = max(maxi, ls + rs + root->data);
            return max(ls, rs) + root->data;
        }
        
        // If it has only one child, pass the sum upwards
        return root->left ? ls + root->data : rs + root->data;
    }
public:
    int maxPathSum(Node* root) {
        int maxi = INT_MIN;
        int val = solve(root, maxi);
        
        // If maxi is still INT_MIN, it means no node had both left and right children
        // (i.e., there are fewer than two leaf nodes in the tree)
        if (maxi == INT_MIN) {
            return -1;
        }
        
        return maxi;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since every node is visited exactly once.
- **Space Complexity:** `O(H)` for the recursive stack, where `H` is the height of the tree.
