---
title: "Construct BST from Preorder Traversal"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Construct+BST+from+Preorder+Traversal+leetcode+1008"
time: "O(N)"
space: "O(H)"
platforms:
  leetcode: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"
---

### Problem Statement

Given an array of integers `preorder`, which represents the preorder traversal of a BST (i.e., it visits nodes in the order `Root, Left, Right`), construct the tree and return its root.

**Example 1:**
```text
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
Explanation: 
        8
      /   \
     5     10
    / \      \
   1   7      12
```

**Example 2:**
```text
Input: preorder = [1,3]
Output: [1,null,3]
```

**Example 3: (Edge Case - Decreasing Preorder)**
```text
Input: preorder = [5,4,3,2,1]
Output: [5,4,null,3,null,2,null,1] (Left-skewed tree)
```

---

### Intuition

To build the tree in `O(N)`, we can use an upper bound logic! Since we read elements in Preorder (`Root -> Left -> Right`), the first element is always the root. The subsequent elements will belong to the left subtree as long as they are smaller than the root's value (our upper bound). Once an element is larger than the upper bound, it means we have finished the left subtree and it's time to build the right subtree. We pass the bounds recursively!

---

### Code

```cpp
class Solution {
private:
    TreeNode* build(vector<int>& preorder, int& i, int bound) {
        // If we processed all elements or the current element is greater than the bound
        if (i == preorder.size() || preorder[i] > bound) {
            return NULL;
        }
        
        // Create the root node
        TreeNode* root = new TreeNode(preorder[i++]);
        
        // Build left subtree with current root's value as the strict upper bound
        root->left = build(preorder, i, root->val);
        
        // Build right subtree retaining the parent's upper bound
        root->right = build(preorder, i, bound);
        
        return root;
    }

public:
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        int i = 0;
        // The root has no upper bound, so we use INT_MAX
        return build(preorder, i, INT_MAX);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate over the preorder array exactly once.
- **Space Complexity:** `O(H)` for the recursion stack, where `H` is the height of the constructed BST.
