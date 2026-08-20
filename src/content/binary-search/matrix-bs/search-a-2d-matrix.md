---
title: "Search a 2D Matrix"
difficulty: "Medium"
time: "O(log(M * N))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/search-a-2d-matrix/"
  gfg: "https://www.geeksforgeeks.org/problems/search-in-a-matrix-1587115621/1"
  youtube: "https://www.youtube.com/results?search_query=search+a+2d+matrix+leetcode"
tags:
  - "Binary Search"
  - "Matrix BS"
---

### Problem Statement

You are given an `m x n` integer matrix `matrix` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.

You must write a solution in `O(log(m * n))` time complexity.

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

### Examples

**Example 1:**
```text
Input: matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3
Output: true
Explanation: 3 is present in the matrix, so return true.
```

**Example 2:**
```text
Input: matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13
Output: false
Explanation: 13 is not present in the matrix, so return false.
```

### Intuition

Since the rows are sorted and the first element of a row is strictly greater than the last element of the previous row, the entire matrix can be treated as a single flat sorted array of size `m * n`. 
We can perform a standard binary search on this virtual 1D array:
- The virtual 1D index `mid` corresponds to the row index `mid / n` and column index `mid % n` in the 2D matrix.

### Approach

1. Initialize `low = 0` and `high = m * n - 1`.
2. Loop while `low <= high`:
   - Calculate `mid = low + (high - low) / 2`.
   - Access the value in the matrix at `matrix[mid / n][mid % n]`.
   - If this value equals the `target`, return `true`.
   - If it is less than the `target`, search the right half by setting `low = mid + 1`.
   - Otherwise, search the left half by setting `high = mid - 1`.
3. Return `false` if target is not found.

---

### Code

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();

        int i=0, j=n-1;
        int row=-1;
        while(i<=j){
            int mid = (i+j)/2;

            if(matrix[mid][0] == target) return true;
            else if(matrix[mid][0] > target) j = mid-1;
            else{
                row = mid;
                i=mid+1;
            }
        }
        if(row == -1) return false;
        i=0, j=m-1;
        while(i<=j){
            int mid = (i+j)/2;
            if(matrix[row][mid] == target) return true;
            else if(matrix[row][mid] < target) i=mid+1;
            else j=mid-1;
        }
        return false;
    }
};
```
