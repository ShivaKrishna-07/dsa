---
title: "Check if Binary Tree is a Heap"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Check+if+Binary+Tree+is+a+Heap"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/is-binary-tree-heap/1"
---

### Problem Statement

You are given the root of a binary tree, and the task is to determine whether it satisfies the properties of a **max-heap**.

A binary tree is considered a max-heap if it satisfies the following two conditions:
1. **Completeness:** Every level of the tree, except possibly the last, is completely filled, and all nodes are as far left as possible.
2. **Max-Heap Property:** The value of each node is greater than or equal to the values of its children.

**Example 1:**
```text
Input: root = [97, 46, 37, 12, 3, 7, 31, 6, 9]
Output: true
Explanation: The tree is a complete binary tree and satisfies the max-heap property (each parent is greater than its children).
```

**Example 2:**
```text
Input: root = [10, 20, 30]
Output: false
Explanation: The root is 10, but its children (20 and 30) are greater than the root. Thus, it violates the max-heap property.
```

**Example 3: (Edge Case - Not a complete tree)**
```text
Input: root = [5, null, 4]
Output: false
Explanation: The tree has no left child for the root but has a right child. This violates the completeness property of a heap, so it is not a heap.
```

---

### Intuition

To check if a binary tree is a max-heap, we need to verify two things: first, that it is a complete binary tree, and second, that every parent node has a value greater than or equal to its children. We can do this efficiently by performing a level-order traversal (using a queue). If we ever encounter a node after we've seen a missing child, the tree is incomplete. At the same time, we check if any child is greater than its parent.

---

### Code

```cpp
/*
class Node {
   public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/

class Solution {
  public:
    bool isHeap(Node* tree) {
        queue<Node*> q;
        q.push(tree);
        bool isComplete = true; // Flag to track completeness of the tree
        
        while(!q.empty()){
            int sz = q.size();
            
            while(sz--){
                auto node = q.front();
                q.pop();
                
                // Max-heap property: Parent must be >= left child
                if(node->left and node->left->data > node->data){
                    return false;
                }
                
                // Max-heap property: Parent must be >= right child
                if(node->right and node->right->data > node->data){
                    return false;
                }
                
                // Completeness property: If we have seen a missing node, we can't have any more children
                if(isComplete == false and node->left){
                    return false;
                }
                
                if(node->left){
                    q.push(node->left);
                }
                else{
                    isComplete = false; // Left child missing, future nodes must be leaves
                }
                
                if(node->right){
                    q.push(node->right);
                }
                else{
                    isComplete = false; // Right child missing, future nodes must be leaves
                }
                
                // Double check completeness for right child
                if(isComplete == false and node->right){
                    return false;
                }
            }
        }
        
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of nodes in the binary tree. We perform a level-order traversal, visiting each node exactly once.
- **Space Complexity:** `O(N)` for the queue used in the level-order traversal, which can hold at most `(N+1)/2` nodes (the maximum number of nodes at the lowest level).
