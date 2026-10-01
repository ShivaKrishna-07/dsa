---
title: "Largest BST in Binary Tree"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Largest+BST+in+Binary+Tree"
time: "O(N)"
space: "O(H)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/largest-bst/1"
---

### Problem Statement

Given a binary tree. Find the size of its largest subtree that is a Binary Search Tree. 
The size of a tree is the number of nodes in it.

**Example 1:**
```text
        1
      /   \
     4     4
    / \
   6   8

Input: root = [1,4,4,6,8]
Output: 1
Explanation: There's no BST subtree with size > 1 except the leaf nodes.
```

**Example 2:**
```text
          6
        /   \
       6     3
            / \
           2   9
               
Input: root = [6,6,3,null,null,2,9]
Output: 3
Explanation: The subtree rooted at 3 is a BST (3 -> left 2, right 9). Its size is 3.
```

**Example 3: (Edge Case - Tree itself is a BST)**
```text
Input: root = [2,1,3]
Output: 3
```

---

### Intuition

To check if a tree is a BST, the root must be greater than the maximum element in its left subtree, and smaller than the minimum element in its right subtree. 
We can do a **Postorder Traversal (Left, Right, Root)**. From each subtree, we return three things: `[size of BST, minimum value, maximum value]`.
If a subtree is a valid BST, its parent can check if it's also a valid BST in `O(1)` time by comparing its own value to the left's max and right's min! If a subtree is NOT a BST, we pass up an invalid range (like `[-1, INT_MIN, INT_MAX]`) so parents know they aren't valid either, while passing up the maximum size found so far.

---

### Code

```cpp
class NodeValue {
public:
    int maxNode, minNode, maxSize;
    NodeValue(int minNode, int maxNode, int maxSize) {
        this->minNode = minNode;
        this->maxNode = maxNode;
        this->maxSize = maxSize;
    }
};

class Solution {
private:
    NodeValue largestBSTSubtreeHelper(Node* root) {
        // An empty tree is a BST of size 0
        if (root == NULL) {
            return NodeValue(INT_MAX, INT_MIN, 0);
        }
        
        // Postorder: Left, Right, Root
        auto left = largestBSTSubtreeHelper(root->left);
        auto right = largestBSTSubtreeHelper(root->right);
        
        // Current node is a valid BST if:
        // root > max of left AND root < min of right
        if (root->data > left.maxNode && root->data < right.minNode) {
            // It is a BST! Return updated min, max, and size
            return NodeValue(
                min(root->data, left.minNode), 
                max(root->data, right.maxNode), 
                left.maxSize + right.maxSize + 1
            );
        }
        
        // Otherwise, it's not a BST. Return invalid boundaries so parent fails too.
        // But pass up the largest size found so far!
        return NodeValue(INT_MIN, INT_MAX, max(left.maxSize, right.maxSize));
    }

public:
    int largestBst(Node *root) {
        return largestBSTSubtreeHelper(root).maxSize;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` because we visit each node exactly once in a bottom-up postorder traversal.
- **Space Complexity:** `O(H)` for the recursive call stack.
