---
title: "Find Minimum and Maximum in BST"
difficulty: "Easy"
time: "O(H)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Find+Minimum+in+BST"
  gfg: "https://practice.geeksforgeeks.org/problems/minimum-element-in-bst/1"
---

### Problem Statement

Given a Binary Search Tree (BST), find the minimum and maximum values present in the tree. If the tree is empty, return `-1`.

**Example 1:**
```text
        5
      /   \
     4     6
    /       \
   3         7
  /
 1

Input: root = [5, 4, 6, 3, null, null, 7, 1]
Output: Min = 1, Max = 7
```

**Example 2:**
```text
Input: root = [9]
Output: Min = 9, Max = 9
```

**Example 3: (Edge Case - Empty Tree)**
```text
Input: root = []
Output: Min = -1, Max = -1
```

---

### Intuition

The BST property dictates that smaller elements are strictly in the left subtree, and larger elements are strictly in the right subtree. 
Therefore, to find the absolute minimum element, we simply keep walking to the **left child** until we hit a node that has no left child. That is the smallest node! 
Conversely, to find the absolute maximum, we keep walking to the **right child** until we hit a node that has no right child.

---

### Code

```cpp
class Solution {
public:
    int minValue(Node* root) {
        if (root == NULL) return -1;
        
        // Keep going left to find minimum
        Node* curr = root;
        while (curr->left != NULL) {
            curr = curr->left;
        }
        
        return curr->data;
    }
    
    int maxValue(Node* root) {
        if (root == NULL) return -1;
        
        // Keep going right to find maximum
        Node* curr = root;
        while (curr->right != NULL) {
            curr = curr->right;
        }
        
        return curr->data;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree, because we travel down exactly one path from the root to a leaf.
- **Space Complexity:** `O(1)` as we just use a pointer to iterate.
