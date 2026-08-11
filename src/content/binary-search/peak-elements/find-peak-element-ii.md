---
title: "Find Peak Element (2D)"
difficulty: "Hard"
time: "O(M log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/find-a-peak-element-ii/"
  youtube: "https://www.youtube.com/results?search_query=find+peak+element+ii+2d+matrix+binary+search"
tags:
  - "Binary Search"
  - "Peak Elements"
---

### Problem Statement

A **peak element** in a 2D grid is an element that is **strictly greater than** all of its adjacent neighbors to the left, right, top, and bottom.

Given a **0-indexed** `m x n` matrix `mat` where no two adjacent cells are equal, find any peak element `[r, c]` and return its coordinates `[r, c]`.

You may assume that the entire matrix is surrounded by an outer perimeter with the value `-1` in each cell.

You must write an algorithm that runs in `O(m log n)` or `O(n log m)` time.

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10^5`
- No two adjacent cells are equal.

### Examples

**Example 1:**
```text
Input: mat = [[1, 4], [3, 2]]
Output: [0, 1]
Explanation: Both 4 and 3 are peak elements. For 4, [0, 1] is returned.
```

**Example 2:**
```text
Input: mat = [[10, 20, 15], [21, 30, 14], [7, 16, 32]]
Output: [1, 1]
Explanation: 30 is a peak element (greater than 20, 14, 21, 16).
```

### Intuition

To achieve `O(m log n)` time complexity, we binary search columns and scan rows:
1. Choose the middle column `mid`.
2. Find the row index `maxRow` that contains the maximum element in column `mid`. Because `mat[maxRow][mid]` is the max of column `mid`, it is strictly greater than its top and bottom neighbors `mat[maxRow - 1][mid]` and `mat[maxRow + 1][mid]`.
3. Now check the horizontal neighbors:
   - If `mat[maxRow][mid - 1] > mat[maxRow][mid]`, a larger element exists in the left half. By properties of peak elements, a peak is guaranteed to exist in the left columns. Thus, update `high = mid - 1`.
   - If `mat[maxRow][mid + 1] > mat[maxRow][mid]`, a larger element exists in the right half. Thus, update `low = mid + 1`.
   - If neither horizontal neighbor is larger, `mat[maxRow][mid]` is strictly greater than all four neighbors. This is our 2D peak!

### Approach

1. Set `low = 0` (first column) and `high = n - 1` (last column).
2. Loop while `low <= high`:
   - Compute `mid = low + (high - low) / 2`.
   - Find `maxRow` (the row index with the largest element in column `mid`).
   - Check if left neighbor `mat[maxRow][mid - 1]` exists and is larger than `mat[maxRow][mid]`.
   - Check if right neighbor `mat[maxRow][mid + 1]` exists and is larger than `mat[maxRow][mid]`.
   - If both are smaller, return `{maxRow, mid}`.
   - If the left neighbor is larger, set `high = mid - 1`.
   - Otherwise, set `low = mid + 1`.
3. Return `{-1, -1}` if not found (though a peak is guaranteed to exist).

---

### Code

```cpp
class Solution {
public:
    int findMax(vector<vector<int>>nums, int row, int n){
        int idx = 0;
        for(int i=0; i<n; i++){
            if(nums[i][row] > nums[idx][row]){
                idx = i;
            }
        }
        return idx;
    }
    vector<int> findPeakGrid(vector<vector<int>>& nums) {
        int n = nums.size();
        int m=nums[0].size();
        
        int i=0, j=m-1;
        while(i<=j){
            int mid = (i+j)/2;
            int maxi = findMax(nums, mid, n);
            int left = mid-1 >= 0 ? nums[maxi][mid-1]:-1;
            int right = mid+1 < m ? nums[maxi][mid+1]:-1;

            if(nums[maxi][mid] > left && nums[maxi][mid] > right){
                return {maxi, mid};
            }else if(nums[maxi][mid] > right) j = mid-1;
            else i = mid+1;
        }

        return {-1, -1};
    }
};
```
