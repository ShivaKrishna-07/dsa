---
title: "Search a 2D Matrix II"
difficulty: "Medium"
time: "O(M + N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/"
  gfg: "https://www.geeksforgeeks.org/problems/search-in-a-row-column-sorted-matrix-1587115621/1"
  youtube: "https://www.youtube.com/results?search_query=search+a+2d+matrix+ii+leetcode"
tags:
  - "Binary Search"
  - "Matrix BS"
---

### Problem Statement

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `-10^9 <= matrix[i][j], target <= 10^9`

### Examples

**Example 1:**
```text
Input: matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], target = 5
Output: true
```

**Example 2:**
```text
Input: matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], target = 20
Output: false
```

### Intuition

Since the rows are sorted from left to right, and columns are sorted from top to bottom, we can search starting from the top-right corner `(0, n - 1)` or the bottom-left corner `(m - 1, 0)`.
If we start at the top-right corner:
- All values in the current row to the left of the current element are smaller.
- All values in the current column below the current element are larger.
This allows us to systematically eliminate one row or one column in each step.

### Approach

1. Initialize `row = 0` and `col = n - 1`.
2. Loop while `row < m` and `col >= 0`:
   - If `matrix[row][col] == target`, return `true`.
   - If `matrix[row][col] > target`, the target must be smaller than all elements below it in the current column. So, eliminate the current column: `col--`.
   - Otherwise (`matrix[row][col] < target`), the target must be larger than all elements to the left in the current row. So, eliminate the current row: `row++`.
3. Return `false` if target is not found.

---

### Code

```cpp
class Solution {
  public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size();
        int n = matrix[0].size();
        int row = 0, col = n - 1;
        
        while (row < m && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }
        return false;
    }
};
```
