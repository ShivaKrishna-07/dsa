---
title: "Pascal's Triangle"
difficulty: "Easy"
time: "O(N^2)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/pascals-triangle/"
  gfg: "https://www.geeksforgeeks.org/pascal-triangle/"
tags:
  - "Arrays"
  - "Matrix"
  - "Combinatorics"
---

### Problem Statement

Given numRows, generate the first numRows of Pascal's Triangle.

### Examples

```text
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

### Intuition

Every inner value is the sum of the two values directly above it.

### Approach

Build rows from top to bottom. Set both ends to 1 and fill the middle from the previous row.

### Code

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;
        for (int row = 0; row < numRows; row++) {
            triangle.push_back(vector<int>(row + 1, 1));
            for (int col = 1; col < row; col++) {
                triangle[row][col] = triangle[row - 1][col - 1] + triangle[row - 1][col];
            }
        }
        return triangle;
    }
};
```
