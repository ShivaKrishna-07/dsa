---
title: "Spiral Matrix"
difficulty: "Medium"
time: "O(M*N)"
space: "O(M*N)"
platforms:
  leetcode: "https://leetcode.com/problems/spiral-matrix/"
  gfg: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/"
tags:
  - "Arrays"
  - "Matrix"
  - "Simulation"
---

### Problem Statement

Given an m x n matrix, return all elements in spiral order.

### Examples

```text
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

### Intuition

Spiral traversal is layer-by-layer boundary movement: top row, right column, bottom row and left column.

### Approach

Maintain top, bottom, left and right boundaries. After traversing one side, move that boundary inward.

### Code

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) ans.push_back(matrix[top][col]);
            top++;
            for (int row = top; row <= bottom; row++) ans.push_back(matrix[row][right]);
            right--;
            if (top <= bottom) {
                for (int col = right; col >= left; col--) ans.push_back(matrix[bottom][col]);
                bottom--;
            }
            if (left <= right) {
                for (int row = bottom; row >= top; row--) ans.push_back(matrix[row][left]);
                left++;
            }
        }
        return ans;
    }
};
```
