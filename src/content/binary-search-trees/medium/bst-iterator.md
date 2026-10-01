---
title: "Binary Search Tree Iterator"
difficulty: "Medium"
time: "O(1) Average"
space: "O(H)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Binary+Search+Tree+Iterator+leetcode+173"
  leetcode: "https://leetcode.com/problems/binary-search-tree-iterator/"
---

### Problem Statement

Implement the `BSTIterator` class that represents an iterator over the **in-order traversal** of a binary search tree (BST):
- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the pointer.

**Example 1:**
```text
        7
      /   \
     3    15
         /  \
        9    20

Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]
```

**Example 2:**
```text
Input: root = [1]
Output: next() -> 1, hasNext() -> false
```

---

### Intuition

If we just dump the inorder traversal into an array, it takes `O(N)` space. We want an iterator that uses only `O(H)` space!
We can simulate the recursive call stack of an inorder traversal using our own Stack. 
When initializing, we push the root and *all its left children* onto the stack. This gives us the smallest element at the top. 
When `next()` is called, we pop the top element to return it. Before returning, if this element has a right child, we move to that right child and push it along with *all its left children* to the stack. This beautifully simulates pausing and resuming an inorder traversal!

---

### Code

```cpp
class BSTIterator {
private:
    stack<TreeNode*> myStack;
    
    // Helper function to push all left children
    void pushAllLeft(TreeNode* node) {
        while (node != NULL) {
            myStack.push(node);
            node = node->left;
        }
    }

public:
    BSTIterator(TreeNode* root) {
        pushAllLeft(root);
    }
    
    int next() {
        // The top of the stack is always the next smallest element
        TreeNode* topNode = myStack.top();
        myStack.pop();
        
        // If it has a right child, we must process its left branch next
        if (topNode->right != NULL) {
            pushAllLeft(topNode->right);
        }
        
        return topNode->val;
    }
    
    bool hasNext() {
        return !myStack.empty();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` average for `next()` and `hasNext()`. While `pushAllLeft` runs a `while` loop, every node is pushed and popped exactly once over the entire traversal.
- **Space Complexity:** `O(H)` where `H` is the height of the tree, representing the maximum elements in the stack at any time.
