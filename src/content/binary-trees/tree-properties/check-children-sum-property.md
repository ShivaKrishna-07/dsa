---
title: "Check Children Sum Property"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Check+Children+Sum+Property"
  gfg: "https://practice.geeksforgeeks.org/problems/children-sum-parent/1"
  article: "https://takeuforward.org/data-structure/check-for-children-sum-property-in-a-binary-tree/"
---

### Problem Statement

Given a binary tree, write a function to return true if the tree satisfies the Children Sum Property.
The Children Sum Property states that for every node of the tree, its value is equal to the sum of the values of its left child and right child. If a node is a leaf, it automatically satisfies the property.

**Example 1:**
```text
        10
       /   \
      10    0

Input: root = [10,10,0]
Output: 1 (True)
```

**Example 2:**
```text
        10
       /  \
      4    6
     / \
    1   3

Input: root = [10,4,6,1,3]
Output: 1 (True)
```

---

### Intuition

We can check this recursively. For any given node, if it is a leaf node, we return `true`. Otherwise, we sum up the values of its non-null children. If the sum matches the node's value, we recursively check its left and right subtrees!

---

### Code

```cpp
class Solution {
  public:
    bool isSumProperty(Node *root) {
        // code here
        if(root == NULL) return true;
        if(root->left == NULL && root->right == NULL) return true;
        
        int left = root->left ? root->left->data : 0;
        int right = root->right ? root->right->data : 0;
        
        if(root->data != left+right) return false;
        
        return isSumProperty(root->left) && isSumProperty(root->right);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` as we visit each node exactly once.
- **Space Complexity:** `O(H)` for the recursive call stack.
