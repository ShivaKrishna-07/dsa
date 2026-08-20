---
title: "Matrix Median"
difficulty: "Hard"
time: "O(R log C * log(max_val - min_val))"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/matrix-median0728/1"
  youtube: "https://www.youtube.com/results?search_query=matrix+median+binary+search"
tags:
  - "Binary Search"
  - "Matrix BS"
---

### Problem Statement

Given a row-wise sorted matrix of size `R x C` where `R` and `C` are always odd numbers, find the median of the matrix.

The median of the matrix is the middle element of the sorted list of all matrix elements (of size `R * C`).

### Constraints

- `1 <= R, C <= 400`
- `1 <= matrix[i][j] <= 2000`
- Both `R` and `C` are always odd.

### Examples

**Example 1:**
```text
Input: matrix = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]
Output: 5
Explanation: Sorting all matrix elements gives [1, 2, 3, 3, 5, 6, 6, 9, 9], the median is 5.
```

**Example 2:**
```text
Input: matrix = [[1], [2], [3]]
Output: 2
Explanation: The sorted list of all elements is [1, 2, 3], and the median is 2.
```

### Intuition

Since each row is sorted, the minimum element of the entire matrix will be in the first column, and the maximum will be in the last column.
The median is the element at position `(R * C) / 2` in the sorted combined array.
We can binary search the value space `[min_element, max_element]`:
- For a candidate value `mid`, we count how many elements in the matrix are less than or equal to `mid`.
- Since each row is sorted, we can count the elements `<= mid` in each row in `O(log C)` time using `upper_bound`.
- If the total count is less than or equal to `(R * C) / 2`, the median must be strictly greater than `mid`, so we update `low = mid + 1`.
- Otherwise, the median is less than or equal to `mid`, so we update `high = mid - 1`.

### Approach

1. Find the minimum element (search the first column) and maximum element (search the last column) of the matrix.
2. Initialize `low` to the minimum and `high` to the maximum.
3. Perform binary search:
   - Calculate `mid = low + (high - low) / 2`.
   - Count elements `<= mid`: iterate through each row `i` and add `upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin()` to the count.
   - If `count <= (R * C) / 2`, update `low = mid + 1`.
   - Otherwise, update `high = mid - 1`.
4. Return `low`.

---

### Code

```cpp
class Solution {
  public:
    int findMedian(vector<vector<int>>& matrix) {
        int r = matrix.size();
        int c = matrix[0].size();
        int low = INT_MAX, high = INT_MIN;
        
        // Find min and max values in the matrix
        for (int i = 0; i < r; ++i) {
            low = min(low, matrix[i][0]);
            high = max(high, matrix[i][c - 1]);
        }
        
        int targetCount = (r * c) / 2;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            for (int i = 0; i < r; ++i) {
                count += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();
            }
            if (count <= targetCount) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
};
```
