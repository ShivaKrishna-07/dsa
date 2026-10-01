---
title: "Ancestors in Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Ancestors+in+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/ancestors-in-binary-tree/1"
---

### Problem Statement

Given a Binary Tree and a target key, you need to find all the ancestors of the given target key.
The ancestors of a node are all nodes on the path from the root down to (but not including) that node. Return them in bottom-up order (from immediate parent to the root).

**Example 1:**
```text
        1
      /   \
    2       3
   / \     / \
  4   5   6   7
     /
    8

Input: target = 8
Output: [5, 2, 1]
```

---

### Intuition

We can use a recursive Preorder traversal to search for the node.
If we find the target node, we return `true`.
If a recursive call to the left or right child returns `true`, it means the target node exists in that subtree, making the current node an ancestor! We add the current node to our answer array and pass `true` back up.

---

### Code

```cpp
class Solution {
private:
    bool findAncestors(struct Node *root, int target, vector<int>& ans) {
        if (root == NULL) return false;
        
        if (root->data == target) return true;
        
        // If target is found in either left or right subtree
        if (findAncestors(root->left, target, ans) || 
            findAncestors(root->right, target, ans)) {
            
            // Add current node to ancestors list
            ans.push_back(root->data);
            return true;
        }
        
        return false;
    }

public:
    vector<int> Ancestors(struct Node *root, int target) {
        vector<int> ans;
        findAncestors(root, target, ans);
        return ans; // already in bottom-up order because of backtracking!
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` in the worst case if we must traverse the entire tree to find the node.
- **Space Complexity:** `O(H)` for the recursion stack and the output array.
