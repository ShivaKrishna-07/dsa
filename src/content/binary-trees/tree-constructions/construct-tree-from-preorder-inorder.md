---
title: "Construct Binary Tree from Preorder and Inorder"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Construct+Binary+Tree+from+Preorder+and+Inorder"
  leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-a-binary-tree-from-preorder-and-inorder"
---

### Problem Statement

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
```text
        3
       / \
      9  20
         / \
       15   7

Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

---

### Intuition

In **Preorder** traversal (Root, Left, Right), the first element is ALWAYS the root of the tree (or subtree).
In **Inorder** traversal (Left, Root, Right), if we find that root element, everything to its *left* belongs to the left subtree, and everything to its *right* belongs to the right subtree!
We can recursively apply this logic. To optimize finding the root in the `inorder` array, we can store the indices of elements in a Hash Map (`O(1)` lookup).

---

### Code

```cpp
class Solution {
private:
    TreeNode* buildTree(vector<int>& preorder, int preStart, int preEnd,
                        vector<int>& inorder, int inStart, int inEnd,
                        unordered_map<int, int>& inMap) {
        
        // Base case: if pointers cross, subtree is empty
        if (preStart > preEnd || inStart > inEnd) return NULL;
        
        // The first element of preorder is the root
        TreeNode* root = new TreeNode(preorder[preStart]);
        
        // Find the root in inorder array
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart; // Number of nodes in left subtree
        
        // Recursively build left and right subtrees
        root->left = buildTree(preorder, preStart + 1, preStart + numsLeft,
                               inorder, inStart, inRoot - 1, inMap);
                               
        root->right = buildTree(preorder, preStart + numsLeft + 1, preEnd,
                                inorder, inRoot + 1, inEnd, inMap);
                                
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i; // Map value to its index
        }
        
        return buildTree(preorder, 0, preorder.size() - 1, 
                         inorder, 0, inorder.size() - 1, inMap);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we use a Hash Map to find elements in `O(1)` time.
- **Space Complexity:** `O(N)` for the Hash Map and the recursive call stack.
