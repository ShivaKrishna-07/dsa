---
title: "Lower & Upper Bound"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/implement-lower-bound/1"
  youtube: "https://www.youtube.com/results?search_query=lower+bound+upper+bound+binary+search+cpp"
tags:
  - "Binary Search"
  - "Boundaries"
---

### Problem Statement

Given a sorted array `arr[]` and a target value `target`:

1. **Lower Bound**: The index of the first element that is **greater than or equal to** `target` (`arr[index] >= target`).
   - **GFG Practice Link:** [Implement Lower Bound](https://www.geeksforgeeks.org/problems/implement-lower-bound/1)
2. **Upper Bound**: The index of the first element that is **strictly greater than** `target` (`arr[index] > target`).
   - **GFG Practice Link:** [Implement Upper Bound](https://www.geeksforgeeks.org/problems/implement-upper-bound/1)

If no such element exists in either case, return `n` (the size of the array).

### Constraints

- `1 <= arr.size() <= 10^5`
- `1 <= arr[i] <= 10^9`
- `1 <= target <= 10^9`

### Examples

#### Lower Bound Examples
**Example 1:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 5
Output: 3
Explanation: arr[3] = 6 is the first element >= 5.
```

**Example 2:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 10
Output: 5
Explanation: No element >= 10, so return n = 5.
```

#### Upper Bound Examples
**Example 1:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 5
Output: 3
Explanation: arr[3] = 6 is the first element > 5.
```

**Example 2:**
```text
Input: arr = [1, 2, 4, 6, 8], target = 4
Output: 3
Explanation: arr[3] = 6 is the first element > 4.
```

### Intuition

Since the array is sorted, we can use binary search.
- For **Lower Bound**, we want the first element `arr[mid] >= target`. If we find it, it's a potential answer. But there could be a smaller valid index on the left, so we record the answer and search in the left half (`j = mid - 1`). If `arr[mid] < target`, we must search in the right half (`i = mid + 1`).
- For **Upper Bound**, we want the first element `arr[mid] > target`. If we find it, it's a potential answer, but we again search left (`j = mid - 1`) to find a smaller index. Otherwise, we search right (`i = mid + 1`).

At the end of the loop, the low pointer `i` will point to the correct boundary index.

### Approach

Maintain `i` (low) and `j` (high).
- **Lower Bound Loop**: Check `arr[mid] >= target`.
- **Upper Bound Loop**: Check `arr[mid] > target`.

In both cases, we adjust the boundaries accordingly and return `i`.

### Code

```cpp
// ==================== LOWER BOUND ====================
class LowerBound {
  public:
    int lowerBound(vector[int]& arr, int target) {
        int n = arr.size();
        int i=0, j=n-1;
        
        while(i<=j){
            int mid = (i+j)/2;
            if(arr[mid] >= target) j = mid-1;
            else i = mid+1;
        }
        return i;
    }
};

// ==================== UPPER BOUND ====================
class Solution {
  public:
    int upperBound(vector[int]& arr, int target) {
        // code here
        int n = arr.size();
        int i=0, j=n-1;
        
        while(i<=j){
            int mid = (i+j)/2;
            if(arr[mid] > target) j = mid-1;
            else i = mid+1;
        }
        return i;
    }
};
```
