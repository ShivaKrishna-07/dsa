---
title: "Kth Smallest / Largest Element in BST"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Kth+Smallest+Largest+Element+in+BST"
  leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  gfg: "https://practice.geeksforgeeks.org/problems/find-k-th-smallest-element-in-bst/1"
---

### Problem Statement

Given the `root` of a binary search tree, and an integer `k`, return the `kth` smallest value (1-indexed) of all the values of the nodes in the tree. To find the `kth` largest, you can find the `(N - k + 1)th` smallest element, where `N` is the total number of nodes in the BST.

**Example 1:**
```text
        3
      /   \
     1     4
      \
       2

Input: root = [3,1,4,null,2], k = 1
Output: 1
```

**Example 2:**
```text
          5
        /   \
       3     6
      / \
     2   4
    /
   1

Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

**Example 3: (Edge Case - k = N)**
```text
Input: root = [2,1,3], k = 3
Output: 3 (Largest element)
```

---

### Intuition

The most magical property of a Binary Search Tree is that an **Inorder Traversal (Left, Root, Right)** visits the nodes in perfectly sorted, strictly increasing order! 
So, to find the `kth` smallest element, we just do a standard inorder traversal and keep a counter. When the counter reaches `k`, we've found our answer. For `kth` largest, we can simply reverse the inorder traversal (Right, Root, Left) to visit nodes in decreasing order!

---

### Code

```cpp
class Solution {
private:
    void inorder(TreeNode* root, int& counter, int k, int& kSmallest) {
        if (root == NULL) return;
        
        // Go left
        inorder(root->left, counter, k, kSmallest);
        
        // Process current node
        counter++;
        if (counter == k) {
            kSmallest = root->val;
            return; // Found it!
        }
        
        // Go right
        inorder(root->right, counter, k, kSmallest);
    }

public:
    int kthSmallest(TreeNode* root, int k) {
        int kSmallest = -1;
        int counter = 0;
        inorder(root, counter, k, kSmallest);
        return kSmallest;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` in the worst case if `k == N`. For average cases, it's `O(k)`.
- **Space Complexity:** `O(H)` where `H` is the height of the tree due to the recursion stack.
