---
title: "Serialize and Deserialize Binary Tree"
difficulty: "Hard"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Serialize+and+Deserialize+Binary+Tree"
  leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  article: "https://takeuforward.org/data-structure/serialize-and-deserialize-a-binary-tree/"
---

### Problem Statement

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
Design an algorithm to serialize and deserialize a binary tree. 

**Example 1:**
```text
        1
      /   \
    2       3
           / \
          4   5

Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```

---

### Intuition

To serialize a tree into a string unambiguously, we need to record `NULL` nodes. Level Order Traversal (BFS) is a very intuitive approach for this.
- **Serialize:** We use a queue. If a node is NULL, append `#`. If not, append its value. Push its left and right children (even if NULL).
- **Deserialize:** We split the string by commas. The first element is the root. We push it into a queue. For every node popped from the queue, we read the next two values from the array for its left and right children. If it's `#`, we leave it as NULL. Otherwise, we create a new node, link it, and push it to the queue.

---

### Code

```cpp
class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (root == NULL) return "";
        
        string s = "";
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();
            
            if (curr == NULL) {
                s += "#,";
            } else {
                s += to_string(curr->val) + ",";
                q.push(curr->left);
                q.push(curr->right);
            }
        }
        return s;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        if (data.empty()) return NULL;
        
        stringstream s(data);
        string str;
        
        // Read the first root node
        getline(s, str, ',');
        TreeNode* root = new TreeNode(stoi(str));
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();
            
            // Read left child
            getline(s, str, ',');
            if (str == "#") {
                curr->left = NULL;
            } else {
                TreeNode* leftNode = new TreeNode(stoi(str));
                curr->left = leftNode;
                q.push(leftNode);
            }
            
            // Read right child
            getline(s, str, ',');
            if (str == "#") {
                curr->right = NULL;
            } else {
                TreeNode* rightNode = new TreeNode(stoi(str));
                curr->right = rightNode;
                q.push(rightNode);
            }
        }
        
        return root;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` for both serialization and deserialization, as we visit each node exactly once.
- **Space Complexity:** `O(N)` for the queue during BFS and the final string.
