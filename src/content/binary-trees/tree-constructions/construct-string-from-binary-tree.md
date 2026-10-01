---
title: "Construct String from Binary Tree"
difficulty: "Easy"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Construct+String+from+Binary+Tree"
  leetcode: "https://leetcode.com/problems/construct-string-from-binary-tree/"
---

### Problem Statement

Given the `root` of a binary tree, construct a string consisting of parenthesis and integers from a binary tree with the preorder traversal way, and return it.
Omit all the empty parenthesis pairs that do not affect the one-to-one mapping relationship between the string and the original binary tree.

**Example 1:**
```text
        1
      /   \
    2       3
   /
  4

Input: root = [1,2,3,4]
Output: "1(2(4))(3)"
Explanation: Originally, it needs to be "1(2(4)())(3())", but you need to omit all the empty parenthesis pairs. And it will be "1(2(4))(3)".
```

---

### Intuition

We can use a simple recursive Preorder traversal (Root, Left, Right). 
For the current node, we add its value to the string. 
- If both left and right are NULL, we just return the value.
- If only the left child exists, we wrap its recursive call in `()`.
- If only the right child exists, we MUST still include an empty `()` for the missing left child, so we don't confuse it for a left child! Then we wrap the right child in `()`.

---

### Code

```cpp
class Solution {
public:
    string tree2str(TreeNode* root) {
        if (root == NULL) return "";
        
        string ans = to_string(root->val);
        
        // If it's a leaf node
        if (root->left == NULL && root->right == NULL) {
            return ans;
        }
        
        // We ALWAYS need the left parenthesis if right child exists
        // (even if left child is null)
        ans += "(" + tree2str(root->left) + ")";
        
        // We only add the right parenthesis if right child exists
        if (root->right != NULL) {
            ans += "(" + tree2str(root->right) + ")";
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes. String concatenations can add some overhead, but conceptually it's linear traversal.
- **Space Complexity:** `O(H)` for the recursion stack.
