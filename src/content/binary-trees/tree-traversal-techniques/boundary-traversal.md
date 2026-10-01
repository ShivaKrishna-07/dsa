---
title: "Boundary Traversal of Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Boundary+Traversal+of+Binary+Tree"
  gfg: "https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1"
  article: "https://takeuforward.org/data-structure/boundary-traversal-of-a-binary-tree/"
---

### Problem Statement

Given a Binary Tree, find its Boundary Traversal. The traversal should be in the following order:
1. **Left Boundary**: This includes all the nodes on the path from the root to the left-most leaf node.
2. **Leaves**: All the leaf nodes of the tree in left-to-right order.
3. **Right Boundary**: This includes all the nodes on the path from the right-most leaf node to the root (in reverse order).

**Example 1:**
```text
        1
       /   \
     2     3
    / \    / \
  4  5  6   7
      / \
     8  9

Input: root = [1,2,3,4,5,6,7,null,null,8,9]
Output: [1,2,4,8,9,6,7,3]
```

---

### Intuition

We can break the problem into exactly 3 parts (just like the definition):
1. **Left Boundary:** Traverse down the left side. If there's no left child, go right. Stop when reaching a leaf. Exclude leaves.
2. **Leaves:** A simple Inorder/Preorder traversal where we only store nodes if `left == NULL && right == NULL`.
3. **Right Boundary:** Traverse down the right side. If there's no right child, go left. Collect nodes in a temporary array, then reverse it before adding to the answer (since we need it bottom-up).

---

### Code

```cpp
class Solution {
private:
    bool isLeaf(Node* root) {
        return (root->left == NULL && root->right == NULL);
    }
    
    void addLeftBoundary(Node* root, vector<int>& res) {
        Node* curr = root->left;
        while (curr != NULL) {
            if (!isLeaf(curr)) res.push_back(curr->data);
            if (curr->left != NULL) curr = curr->left;
            else curr = curr->right;
        }
    }
    
    void addLeaves(Node* root, vector<int>& res) {
        if (isLeaf(root)) {
            res.push_back(root->data);
            return;
        }
        if (root->left != NULL) addLeaves(root->left, res);
        if (root->right != NULL) addLeaves(root->right, res);
    }
    
    void addRightBoundary(Node* root, vector<int>& res) {
        Node* curr = root->right;
        vector<int> temp;
        while (curr != NULL) {
            if (!isLeaf(curr)) temp.push_back(curr->data);
            if (curr->right != NULL) curr = curr->right;
            else curr = curr->left;
        }
        // Reverse because we need bottom-up
        for (int i = temp.size() - 1; i >= 0; i--) {
            res.push_back(temp[i]);
        }
    }

public:
    vector<int> boundary(Node *root) {
        vector<int> res;
        if (root == NULL) return res;
        
        // Root is always included first (unless it's a leaf itself)
        if (!isLeaf(root)) res.push_back(root->data);
        
        addLeftBoundary(root, res);
        addLeaves(root, res);
        addRightBoundary(root, res);
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)`. We traverse the left boundary `O(H)`, leaves `O(N)`, and right boundary `O(H)`.
- **Space Complexity:** `O(H)` for the recursive stack during leaf traversal and temp array for the right boundary.
