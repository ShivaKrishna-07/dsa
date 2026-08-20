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
Explanation: Traversing the matrix spirally yields the elements in the specified order.
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
        int n = matrix.size();
        int m = matrix[0].size();

        int left=0, right=m-1;
        int top = 0, bottom = n-1;

        vector<int>ans;
        while(top<=bottom && left<=right){
            for(int i=left; i<=right; i++){
                ans.push_back(matrix[top][i]);
            }
            top++;
            for(int i=top; i<=bottom; i++){
                ans.push_back(matrix[i][right]);
            }
            right--;
            if(top <= bottom){
                for(int i=right; i>=left; i--){
                    ans.push_back(matrix[bottom][i]);
                }
                bottom--;
            }
            if(left<=right){
                for(int i=bottom; i>=top; i--){
                    ans.push_back(matrix[i][left]);            
                }
                left++;
            }
        }

        return ans;
    }
};
```
