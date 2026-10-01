---
title: "Ceil in a BST"
difficulty: "Medium"
time: "O(H)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Ceil+in+a+BST"
  gfg: "https://practice.geeksforgeeks.org/problems/implementing-ceil-in-bst/1"
---

### Problem Statement

Given a BST and a number `X`, find the **Ceil** of `X`.
The Ceil of `X` is the minimum integer in the BST which is greater than or equal to `X`. If no such element exists, return `-1`.

**Example 1:**
```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14

Input: X = 5
Output: 6
Explanation: 6 is the smallest element greater than or equal to 5.
```

**Example 2:**
```text
        8
      /   \
     4     12

Input: X = 15
Output: -1
Explanation: There is no element greater than or equal to 15.
```

**Example 3: (Edge Case - Exact Match)**
```text
Input: X = 8
Output: 8
```

---

### Intuition

To find the Ceil (the smallest number `>= X`), we traverse the BST. 
- If we find a node with value exactly `X`, that is our ceil.
- If the current node's value is *less* than `X`, it's too small to be the ceil, so we must search in the right subtree for larger values.
- If the current node's value is *greater* than `X`, it could potentially be our ceil! We record this value as a possible answer, and then search in the left subtree to see if we can find an even smaller valid number.

---

### Code

```cpp
class Solution {
public:
    int findCeil(Node* root, int input) {
        int ceil = -1;
        
        while (root != NULL) {
            // Exact match found
            if (root->data == input) {
                ceil = root->data;
                return ceil;
            }
            
            // If current node is smaller, ceil must be on the right
            if (root->data < input) {
                root = root->right;
            } 
            // If current node is larger, it's a potential ceil, but look for a tighter one on the left
            else {
                ceil = root->data;
                root = root->left;
            }
        }
        
        return ceil;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(H)` where `H` is the height of the BST, as we traverse from root to a leaf in the worst case.
- **Space Complexity:** `O(1)` as we only use a couple of variables for tracking.
