---
title: "K-th Missing Positive Number"
difficulty: "Easy"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/kth-missing-positive-number/description/"
  gfg: "https://www.geeksforgeeks.org/problems/k-th-missing-element3635/1"
  youtube: "https://www.youtube.com/watch?v=uZ0N_hZpyps"
tags:
  - "Binary Search"
  - "Miscellaneous"
---

### Problem Statement

Given an array `arr` of positive integers sorted in a strictly increasing order, and an integer `k`.

Return the `k`-th positive integer that is missing from this array.

### Constraints

- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`
- `1 <= k <= 1000`
- `arr` is sorted in a strictly increasing order.

### Examples

**Example 1:**
```text
Input: arr = [2, 3, 4, 7, 11], k = 5
Output: 9
Explanation: The missing positive integers are [1, 5, 6, 8, 9, 10, 12, 13, ...]. The 5th missing positive integer is 9.
```

**Example 2:**
```text
Input: arr = [1, 2, 3, 4], k = 2
Output: 6
Explanation: The missing positive integers are [5, 6, 7, ...]. The 2nd missing positive integer is 6.
```

### Intuition

#### Brute Force
If a number `arr[i]` is less than or equal to `k`, it means this number is present in the array and shifts the target missing number up by 1. So, we increment `k`. Once we encounter `arr[i] > k`, we have passed the range of present numbers shifting the target, so the current value of `k` is our answer. This approach takes `O(N)` time.

#### Optimal (Binary Search)
For any index `mid` in the sorted array, the count of missing numbers up to `arr[mid]` is given by `arr[mid] - (mid + 1)`.
Since this count increases monotonically, we can binary search the transition index where the number of missing elements is less than `k`:
- If `missing < k`, the `k`-th missing element must be to the right of `mid`, so `low = mid + 1`.
- Otherwise, it is to the left of `mid`, so `high = mid - 1`.

After the binary search, `high` will point to the index just before the transition. The missing element is then calculated as `arr[high] + (k - (arr[high] - (high + 1)))`, which simplifies directly to `high + k + 1`. This approach takes `O(log N)` time.

---

### Code

```cpp
// ==================== BRUTE FORCE ====================
class MissingKFinder {
public:
    // Function to find the k-th missing number
    int missingK(vector<int> vec, int n, int k) {
        for (int i = 0; i < n; i++) {
            if (vec[i] <= k) {
                k++;  // If current number is less than or equal to k, increment k
            } else {
                break; // Stop when we reach a number greater than k
            }
        }
        return k;  // Return the final value of k which is the missing number
    }
};

// ==================== OPTIMAL (BINARY SEARCH) ====================
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int n = arr.size();
        
        int i=0, j=n-1;
        while(i<=j){
            int mid = i+(j-i)/2;
            int missing = arr[mid] - (mid+1);
            if(missing < k) i = mid+1;
            else j = mid-1;
        }
        return j+k+1;
    }
};
```
