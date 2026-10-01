---
title: "Inorder Successor and Predecessor in BST"
difficulty: "Medium"
time: "O(H)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Inorder+Successor+Predecessor+BST"
  gfg: "https://practice.geeksforgeeks.org/problems/predecessor-and-successor/1"
---

### Problem Statement

You are given the `root` of a binary search tree and an integer `key`. You need to find the in-order successor and predecessor of the given key. In case, if the either of predecessor or successor is not present, return `-1`.

- **Successor**: The node with the smallest key strictly greater than `key`.
- **Predecessor**: The node with the largest key strictly smaller than `key`.

**Example 1:**
```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14

Input: root = [8,4,12,2,6,10,14], key = 8
Output: Predecessor = 6, Successor = 10
```

**Example 2:**
```text
Input: root = [8,4,12,2,6,10,14], key = 2
Output: Predecessor = -1, Successor = 4
```

**Example 3: (Edge Case - Key not in BST)**
```text
Input: root = [8,4,12,2,6,10,14], key = 9
Output: Predecessor = 8, Successor = 10
```

---

### Intuition

Instead of doing a full `O(N)` inorder traversal, we can leverage the BST property to do this in `O(H)`!
- **For Successor:** Start at root. If the node's value is `> key`, it's a potential successor. We record it and move **left** to find a tighter (smaller) successor. If it's `<= key`, it can't be a successor, move **right**.
- **For Predecessor:** Start at root. If the node's value is `< key`, it's a potential predecessor. We record it and move **right** to find a tighter (larger) predecessor. If it's `>= key`, move **left**.

---

### Code

```cpp
class Solution {
public:
    void findPreSuc(Node* root, Node*& pre, Node*& suc, int key) {
        pre = NULL;
        suc = NULL;
        
        // Find Successor
        Node* curr = root;
        while (curr != NULL) {
            if (curr->key > key) {
                suc = curr;
                curr = curr->left; // Go left for tighter bound
            } else {
                curr = curr->right;
            }
        }
        
        // Find Predecessor
        curr = root;
        while (curr != NULL) {
            if (curr->key < key) {
                pre = curr;
                curr = curr->right; // Go right for tighter bound
            } else {
                curr = curr->left;
            }
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the tree. We traverse top to bottom twice.
- **Space Complexity:** `O(1)` as we only use a few pointers.
