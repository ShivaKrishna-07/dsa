---
title: "Kth Smallest Element in a Sorted Matrix"
difficulty: "Medium"
time: "O(N log(max_val - min_val))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
  gfg: "https://www.geeksforgeeks.org/problems/kth-element-in-matrix/1"
  youtube: "https://www.youtube.com/watch?v=16YmDvztm8I"
tags:
  - "Binary Search"
  - "Matrix BS"
---

### Problem Statement

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return the `k`-th smallest element in the matrix.

Note that it is the `k`-th smallest element in the sorted order, not the `k`-th distinct element.

You must find a solution with a memory complexity better than `O(n^2)`.

### Constraints

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- All rows and columns of `matrix` are sorted in non-decreasing order.
- `1 <= k <= n^2`

### Examples

**Example 1:**
```text
Input: matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1, 5, 9, 10, 11, 12, 13, 13, 15], and the 8th smallest is 13.
```

**Example 2:**
```text
Input: matrix = [[-5]], k = 1
Output: -5
```

### Intuition

Since the rows and columns are sorted, the minimum element is `matrix[0][0]` and the maximum is `matrix[n - 1][n - 1]`.
We can binary search the value space `[matrix[0][0], matrix[n - 1][n - 1]]`:
- For each candidate value `mid`, we count how many elements in the matrix are less than or equal to `mid`.
- Since the matrix is row-wise and column-wise sorted, we can count the elements in `O(n)` time by traversing from the bottom-left corner `(n-1, 0)`.
- If the count is less than `k`, the `k`-th smallest element must be strictly greater than `mid`, so we search the right half (`low = mid + 1`).
- Otherwise, the `k`-th smallest is less than or equal to `mid`, so we search the left half (`high = mid`).

### Approach

1. Initialize `low = matrix[0][0]` and `high = matrix[n - 1][n - 1]`.
2. Loop while `low < high`:
   - Calculate `mid = low + (high - low) / 2`.
   - Count the number of elements `<= mid` using a helper function `countLessOrEqual(matrix, mid)`:
     - Start from `row = n - 1` and `col = 0`.
     - If `matrix[row][col] <= target`, all elements in the column above `row` are also `<= target`. Add `row + 1` to `count` and move right: `col++`.
     - Otherwise, the current element is too large, so move up: `row--`.
   - If `count < k`, set `low = mid + 1`.
   - Otherwise, set `high = mid`.
3. Return `low`.

---

### Code

```cpp
class Solution {
public:
    bool isKthSmallest(vector<vector<int>>& matrix, int k, int target){
        int n = matrix.size();
        int m = matrix[0].size();
        int row = n-1, col = 0;
        int count = 0;

        while(row >= 0 && col < n){
            if(matrix[row][col] <= target){
                count += (row+1);
                col++;
            }else row--;
        }
        return count < k;
    }
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        int m = matrix[0].size();

        int i = matrix[0][0], j=matrix[n-1][m-1];

        while(i<=j){
            int mid = (i+j)/2;
            if(isKthSmallest(matrix, k, mid)) i=mid+1;
            else j=mid-1;
        }
        return i;
    }
};
```
