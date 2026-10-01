---
title: "Floor in a BST"
difficulty: "Medium"
time: "O(H)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Floor+in+a+BST"
  gfg: "https://practice.geeksforgeeks.org/problems/floor-in-bst/1"
---

### Problem Statement

Given a BST and a number `X`, find the **Floor** of `X`.
The Floor of `X` is the maximum integer in the BST which is less than or equal to `X`. If no such element exists, return `-1`.

**Example 1:**
```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14

Input: X = 7
Output: 6
Explanation: 6 is the largest element less than or equal to 7.
```

**Example 2:**
```text
        8
      /   \
     4     12

Input: X = 1
Output: -1
Explanation: There is no element less than or equal to 1.
```

**Example 3: (Edge Case - Exact Match)**
```text
Input: X = 4
Output: 4
```

---

### Intuition

Finding the Floor (the largest number `<= X`) is the exact mirror of finding the Ceil!
- If the current node is exactly `X`, that is our floor.
- If the current node's value is *greater* than `X`, it's too large, so we must search in the left subtree.
- If the current node's value is *less* than `X`, it is a valid candidate for the floor! We save it as a potential answer, and then search the right subtree to see if we can find a larger valid number that is still `<= X`.

---

### Code

```cpp
class Solution {
public:
    int floor(Node* root, int x) {
        int floorVal = -1;
        
        while (root != NULL) {
            // Exact match
            if (root->data == x) {
                floorVal = root->data;
                return floorVal;
            }
            
            // If current node is too large, look left
            if (root->data > x) {
                root = root->left;
            } 
            // If current node is smaller, it's a potential floor, but check right for a larger valid one
            else {
                floorVal = root->data;
                root = root->right;
            }
        }
        
        return floorVal;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the BST. We traverse one path from root to leaf.
- **Space Complexity:** `O(1)` as we use an iterative approach without auxiliary space.
