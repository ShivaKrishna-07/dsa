---
title: "K-th Element of Two Sorted Arrays"
difficulty: "Hard"
time: "O(log(min(N, M)))"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1"
  youtube: "https://www.youtube.com/results?search_query=kth+element+of+two+sorted+arrays+binary+search"
tags:
  - "Binary Search"
  - "BS on Partitions"
---

### Problem Statement

Given two sorted arrays `arr1` and `arr2` of size `N` and `M` respectively and an element `k`. The task is to find the element that would be at the `k`-th position of the final sorted array.

### Constraints

- `1 <= N, M <= 10^6`
- `1 <= arr1[i], arr2[i] <= 10^9`
- `1 <= k <= N + M`

### Examples

**Example 1:**
```text
Input: arr1 = [2, 3, 6, 7, 9], arr2 = [1, 4, 8, 10], k = 5
Output: 6
Explanation: The final sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.
```

**Example 2:**
```text
Input: arr1 = [100, 112, 256, 349, 770], arr2 = [72, 86, 113, 119, 265, 445, 892], k = 7
Output: 256
```

### Intuition

Instead of merging the two sorted arrays (which would take `O(N + M)` time and space), we can find the `k`-th element in `O(log(min(N, M)))` time using binary search:
- We partition the combined search space such that the left side contains exactly `k` elements.
- We choose `cut1` elements from `arr1` and `cut2` elements from `arr2` such that `cut1 + cut2 = k`.
- To ensure optimal time, we always run binary search on the smaller array (say `arr1`).
  - The minimum elements we can pick from `arr1` is `max(0, k - M)` (if `k` exceeds `M`, we must pick at least `k - M` elements from `arr1`).
  - The maximum elements we can pick from `arr1` is `min(k, N)`.
- Let `l1` and `r1` be the boundary values in `arr1` and `l2`, `r2` be the boundary values in `arr2` at our partition:
  - If `l1 <= r2` and `l2 <= r1`, we have partitioned correctly. The `k`-th element is simply `max(l1, l2)`.
  - If `l1 > r2`, we have taken too many elements from `arr1`, so we move left (`high = cut1 - 1`).
  - Otherwise, we have taken too few elements from `arr1`, so we move right (`low = cut1 + 1`).

### Approach

1. If `arr1.size() > arr2.size()`, recursively call `kthElement(arr2, arr1, k)` to ensure binary search runs on the smaller array.
2. Initialize `low = max(0, k - arr2.size())` and `high = min(k, arr1.size())`.
3. Loop while `low <= high`:
   - Calculate `cut1 = low + (high - low) / 2`.
   - Calculate `cut2 = k - cut1`.
   - Set the left and right boundary values:
     - `l1 = (cut1 == 0) ? INT_MIN : arr1[cut1 - 1]`
     - `l2 = (cut2 == 0) ? INT_MIN : arr2[cut2 - 1]`
     - `r1 = (cut1 == arr1.size()) ? INT_MAX : arr1[cut1]`
     - `r2 = (cut2 == arr2.size()) ? INT_MAX : arr2[cut2]`
   - If `l1 <= r2` and `l2 <= r1`, return `max(l1, l2)`.
   - If `l1 > r2`, set `high = cut1 - 1`.
   - Otherwise, set `low = cut1 + 1`.
4. Return `-1` if not found.

---

### Code

```cpp
class Solution {
  public:
    int kthElement(vector<int>& arr1, vector<int>& arr2, int k) {
        int n = arr1.size();
        int m = arr2.size();
        
        // Ensure arr1 is the smaller array
        if (n > m) {
            return kthElement(arr2, arr1, k);
        }
        
        int low = max(0, k - m);
        int high = min(k, n);
        
        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;
            
            int l1 = (cut1 == 0) ? INT_MIN : arr1[cut1 - 1];
            int l2 = (cut2 == 0) ? INT_MIN : arr2[cut2 - 1];
            int r1 = (cut1 == n) ? INT_MAX : arr1[cut1];
            int r2 = (cut2 == m) ? INT_MAX : arr2[cut2];
            
            if (l1 <= r2 && l2 <= r1) {
                return max(l1, l2);
            } else if (l1 > r2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }
        return -1;
    }
};
```
