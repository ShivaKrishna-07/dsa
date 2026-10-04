---
title: "Construct Binary Tree from Postorder and Inorder"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Construct+Binary+Tree+from+Postorder+and+Inorder"
  leetcode: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/construct-binary-tree-from-inorder-and-postorder-traversal"
---

### Problem Statement

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
```text
        3
       / \
      9  20
         / \
       15   7

Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
```

---

### Intuition

This is almost identical to building a tree from Preorder and Inorder.
In **Postorder** traversal (Left, Right, Root), the *last* element is ALWAYS the root of the tree (or subtree).
We find this root in the `inorder` array to split the tree into left and right subtrees. Since postorder processes Left then Right then Root, when we backtrack from the end of the postorder array, we must build the **Right** subtree first!

---

### Code

```cpp
class Solution {
private:
    TreeNode* buildTree(vector<int>& inorder, int inStart, int inEnd,
                        vector<int>& postorder, int postStart, int postEnd,
                        unordered_map<int, int>& inMap) {
        
        // Base case: if pointers cross, subtree is empty
        if (inStart > inEnd || postStart > postEnd) return NULL;
        
        // The last element of postorder is the root
        TreeNode* root = new TreeNode(postorder[postEnd]);
        
        // Find the root in inorder array
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart; // Number of nodes in left subtree
        
        // Recursively build left and right subtrees
        root->left = buildTree(inorder, inStart, inRoot - 1, 
                               postorder, postStart, postStart + numsLeft - 1, inMap);
                               
        root->right = buildTree(inorder, inRoot + 1, inEnd, 
                                postorder, postStart + numsLeft, postEnd - 1, inMap);
                                
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        
        return buildTree(inorder, 0, inorder.size() - 1, 
                         postorder, 0, postorder.size() - 1, inMap);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since the Hash Map provides `O(1)` lookups.
- **Space Complexity:** `O(N)` for the Hash Map and the recursive recursion stack.
