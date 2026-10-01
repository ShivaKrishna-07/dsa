---
title: "Smallest String Starting From Leaf"
difficulty: "Medium"
time: "O(N log N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Smallest+String+Starting+From+Leaf"
  leetcode: "https://leetcode.com/problems/smallest-string-starting-from-leaf/"
---

### Problem Statement

You are given the `root` of a binary tree where each node has a value in the range `[0, 25]` representing the letters `'a'` to `'z'`.
Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

**Example 1:**
```text
        0 (a)
       /   \
  1 (b) 2 (c)
   / \      / \
3(d) 4(e) 3(d) 4(e)

Input: root = [0,1,2,3,4,3,4]
Output: "dba"
```

---

### Intuition

We want the lexicographically smallest string. We can use DFS to traverse from the root to the leaves. 
Since we want the string from LEAF to ROOT, we build the string by appending the current character to the *front* of our string (or append to back and reverse when we hit a leaf). 
Once we hit a leaf, we check if the newly formed string is smaller than our global minimum string, and update it!

---

### Code

```cpp
class Solution {
private:
    void dfs(TreeNode* root, string curr, string& ans) {
        if (!root) return;
        
        // Append current character
        curr = char(root->val + 'a') + curr;
        
        // If it's a leaf, compare with current answer
        if (!root->left && !root->right) {
            if (ans == "" || curr < ans) {
                ans = curr;
            }
        }
        
        dfs(root->left, curr, ans);
        dfs(root->right, curr, ans);
    }

public:
    string smallestFromLeaf(TreeNode* root) {
        string ans = "";
        dfs(root, "", ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * L)` where `N` is the number of nodes, and `L` is the average length of the strings. String concatenation/comparison takes `O(L)`.
- **Space Complexity:** `O(N)` for the recursion stack and string memory in the worst case (skewed tree).
