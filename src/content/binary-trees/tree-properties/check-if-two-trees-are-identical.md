---
title: "Check if Two Trees are Identical"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Check+if+Two+Trees+are+Identical"
  leetcode: "https://leetcode.com/problems/same-tree/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/check-identical-binary-trees"
---

### Problem Statement

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**
```text
      1            1
     / \          / \
    2   3        2   3

Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2:**
```text
      1            1
     /              \
    2                2

Input: p = [1,2], q = [1,null,2]
Output: false
```

---

### Intuition

To verify if two trees are identical, we must traverse them simultaneously. 
At any point, if both nodes are `NULL`, they match. If only one is `NULL`, they don't match. If both have values but they differ, they don't match. 
If the current nodes match, we recursively check if their left subtrees match AND their right subtrees match!

---

### Code

```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Base case: if both are null, they are identical up to this leaf
        if (p == NULL && q == NULL) return true;
        
        // If only one is null, they are not identical
        if (p == NULL || q == NULL) return false;
        
        // Both exist: values must match, AND subtrees must match
        return (p->val == q->val) 
            && isSameTree(p->left, q->left) 
            && isSameTree(p->right, q->right);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(min(N1, N2))` where `N1` and `N2` are the number of nodes in `p` and `q`. We stop early if a mismatch is found.
- **Space Complexity:** `O(min(H1, H2))` for the recursion stack.
