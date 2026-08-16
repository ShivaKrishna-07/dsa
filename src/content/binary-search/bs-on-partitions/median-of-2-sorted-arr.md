---
title: "Median of Two Sorted Arrays"
difficulty: "Hard"
time: "O(log(min(N, M)))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/"
  gfg: "https://www.geeksforgeeks.org/problems/median-of-two-sorted-arrays1618/1"
  youtube: "https://www.youtube.com/results?search_query=median+of+two+sorted+arrays+binary+search"
tags:
  - "Binary Search"
  - "BS on Partitions"
---

### Problem Statement

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

The overall run time complexity should be `O(log(m + n))`.

### Constraints

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m, n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

### Examples

**Example 1:**
```text
Input: nums1 = [1, 3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1, 2, 3] and median is 2.
```

**Example 2:**
```text
Input: nums1 = [1, 2], nums2 = [3, 4]
Output: 2.50000
Explanation: merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.
```

### Intuition

To achieve `O(log(min(m, n)))` time, we use a binary search partition method similar to finding the K-th element of two sorted arrays:
- We want to partition the combined array such that exactly half of the total elements are on the left side: `totalLeft = (m + n + 1) / 2`.
- We binary search the partition point `cut1` in the smaller array `nums1`. The remaining elements `cut2 = totalLeft - cut1` will be picked from `nums2`.
- Let `l1, r1` be the boundary values in `nums1` and `l2, r2` be the boundary values in `nums2`:
  - If `l1 <= r2` and `l2 <= r1`, we have partitioned correctly:
    - If total elements `(m + n)` is odd, the median is `max(l1, l2)`.
    - If even, the median is the average of the two middle elements: `(max(l1, l2) + min(r1, r2)) / 2.0`.
  - If `l1 > r2`, we have taken too many elements from `nums1`, so we move left (`high = cut1 - 1`).
  - Otherwise, we move right (`low = cut1 + 1`).

### Approach

1. If `nums1.size() > nums2.size()`, recursively call `findMedianSortedArrays(nums2, nums1)` to ensure we binary search on the smaller array.
2. Initialize `low = 0` and `high = nums1.size()`.
3. Loop while `low <= high`:
   - Calculate `cut1 = low + (high - low) / 2`.
   - Calculate `cut2 = (m + n + 1) / 2 - cut1`.
   - Set the left and right boundary values:
     - `l1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1]`
     - `l2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1]`
     - `r1 = (cut1 == m) ? INT_MAX : nums1[cut1]`
     - `r2 = (cut2 == n) ? INT_MAX : nums2[cut2]`
   - If `l1 <= r2` and `l2 <= r1`:
     - If the total length `(m + n)` is odd, return `max(l1, l2)`.
     - Otherwise, return `(max(l1, l2) + min(r1, r2)) / 2.0`.
   - If `l1 > r2`, set `high = cut1 - 1`.
   - Otherwise, set `low = cut1 + 1`.
4. Return `0.0`.

---

### Code

```cpp
class Solution {
  public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size();
        int n = nums2.size();
        
        if (m > n) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int low = 0, high = m;
        int totalLeft = (m + n + 1) / 2;
        
        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = totalLeft - cut1;
            
            int l1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1];
            int l2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1];
            int r1 = (cut1 == m) ? INT_MAX : nums1[cut1];
            int r2 = (cut2 == n) ? INT_MAX : nums2[cut2];
            
            if (l1 <= r2 && l2 <= r1) {
                if ((m + n) % 2 == 1) {
                    return max(l1, l2);
                } else {
                    return (max(l1, l2) + min(r1, r2)) / 2.0;
                }
            } else if (l1 > r2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }
        return 0.0;
    }
};
```
