---
title: "Two Sum IV - Input is a BST"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Two+Sum+IV+BST+leetcode+653"
time: "O(N)"
space: "O(H)"
platforms:
  leetcode: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
---

### Problem Statement

Given the `root` of a Binary Search Tree and a target number `k`, return `true` if there exist two elements in the BST such that their sum is equal to the given target.

**Example 1:**
```text
        5
      /   \
     3     6
    / \     \
   2   4     7

Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Explanation: 5 + 4 = 9, or 2 + 7 = 9.
```

**Example 2:**
```text
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
```

**Example 3: (Edge Case - Negative target)**
```text
Input: root = [2,1,3], k = 4
Output: true (1 + 3 = 4)
```

---

### Intuition

We know how to solve Two Sum in a sorted array using two pointers (`left` and `right`) in `O(N)` time and `O(1)` space. An inorder traversal of a BST gives us a sorted array! However, storing the array takes `O(N)` space. 
To optimize space to `O(H)`, we can use the concept of a `BSTIterator`. We can create a "Next" iterator that simulates `left` pointer (inorder) and a "Before" iterator that simulates `right` pointer (reverse inorder). By using these two iterators, we can do the two-pointer technique directly on the BST!

---

### Code

```cpp
class BSTIterator {
private:
    stack<TreeNode*> st;
    bool reverse; // true for 'before', false for 'next'
    
    void pushAll(TreeNode* node) {
        while (node != NULL) {
            st.push(node);
            if (reverse == true) {
                node = node->right;
            } else {
                node = node->left;
            }
        }
    }

public:
    BSTIterator(TreeNode* root, bool isReverse) {
        reverse = isReverse;
        pushAll(root);
    }
    
    int next() {
        TreeNode* topNode = st.top();
        st.pop();
        if (reverse == false) {
            pushAll(topNode->right);
        } else {
            pushAll(topNode->left);
        }
        return topNode->val;
    }
};

class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        if (!root) return false;
        
        // 'next' iterator starts at smallest (leftmost)
        BSTIterator l(root, false);
        // 'before' iterator starts at largest (rightmost)
        BSTIterator r(root, true);
        
        int i = l.next();
        int j = r.next();
        
        while (i < j) {
            if (i + j == k) return true;
            else if (i + j < k) i = l.next();
            else j = r.next();
        }
        
        return false;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` as we iterate through nodes. Each node is pushed and popped at most once.
- **Space Complexity:** `O(H)` for the stacks inside the two iterators, which is much better than `O(N)` space used by storing an array.
