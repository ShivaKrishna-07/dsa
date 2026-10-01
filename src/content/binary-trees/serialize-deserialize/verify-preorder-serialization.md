---
title: "Verify Preorder Serialization of a Binary Tree"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Verify+Preorder+Serialization+of+a+Binary+Tree"
  leetcode: "https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/"
---

### Problem Statement

One way to serialize a binary tree is to use preorder traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as `'#'`.
Given a string of comma-separated values `preorder`, return `true` if it is a correct preorder traversal serialization of a binary tree.

**Example 1:**
```text
Input: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
Output: true
```

**Example 2:**
```text
Input: preorder = "1,#"
Output: false
```

---

### Intuition

We can use a "vacancy" or "slots" approach. A binary tree starts with 1 empty slot (for the root). 
- Every time we place a non-null node, it consumes 1 slot but creates 2 new slots (its children). Net gain: `+1` slot.
- Every time we place a `#` (null node), it consumes 1 slot and creates 0 new slots. Net loss: `-1` slot.

During the traversal, if slots drop below 0, it's invalid. At the very end of the traversal, the number of available slots MUST be exactly 0 (meaning all leaves were closed with `#`).

---

### Code

```cpp
class Solution {
public:
    bool isValidSerialization(string preorder) {
        int slots = 1; // start with 1 slot for root
        stringstream ss(preorder);
        string node;
        
        while (getline(ss, node, ',')) {
            // Consume a slot
            slots--;
            
            // If slots became negative before we finished, it's invalid
            if (slots < 0) return false;
            
            // If the node is not null, it provides 2 new slots
            if (node != "#") {
                slots += 2;
            }
        }
        
        // Exactly 0 slots should be remaining
        return slots == 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string, to iterate through the characters.
- **Space Complexity:** `O(1)` (excluding the memory used to split/stream the string).
