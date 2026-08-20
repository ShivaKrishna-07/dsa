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
Explanation: The first 5 rows of Pascal's triangle are generated.
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
        
        vector<vector<int>>ans;
        for(int row=1; row<=numRows; row++){
            ans.push_back(generateRow(row));
        }
        return ans;
    }
    vector<int> generateRow(int row){
        vector<int>ans;
        long long res = 1;
        ans.push_back(1);
        for(int col=1; col<row; col++){
            res *= (row-col);
            res /= col;
            ans.push_back(res);
        }
        return ans;
    }
};
```
