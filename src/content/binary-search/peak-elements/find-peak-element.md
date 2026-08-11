---
title: "Find Peak Element (1D)"
difficulty: "Medium"
time: "O(log N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/find-peak-element/"
  gfg: "https://www.geeksforgeeks.org/problems/find-the-highest-number8127/1"
  youtube: "https://www.youtube.com/results?search_query=find+peak+element+binary+search"
tags:
  - "Binary Search"
  - "Peak Elements"
---

### Problem Statement

A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in `O(log n)` time.

### Constraints

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.

### Examples

**Example 1:**
```text
Input: nums = [1, 2, 3, 1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

**Example 2:**
```text
Input: nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

### Intuition

Since the boundary neighbors `nums[-1]` and `nums[n]` are `-∞`, any array must contain at least one peak element.
We can utilize binary search by observing the slopes:
- If `nums[mid] > nums[mid + 1]`, we are currently on a descending slope. This means a peak must exist at index `mid` or somewhere to its left. So we narrow our search to the left half (`high = mid`).
- If `nums[mid] < nums[mid + 1]`, we are on an ascending slope. A peak must lie strictly to the right of `mid`. So we narrow our search to the right half (`low = mid + 1`).

When `low == high`, the search space has converged to a single element, which is guaranteed to be a peak.

### Approach

1. Initialize `low = 0` and `high = nums.size() - 1`.
2. Loop while `low < high`:
   - Calculate `mid = low + (high - low) / 2`.
   - If `nums[mid] > nums[mid + 1]`, update `high = mid`.
   - Otherwise, update `low = mid + 1`.
3. Return `low`.

---

### Code

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if(n==1) return 0;
        if(nums[0] > nums[1]) return 0;
        if(nums[n-1] > nums[n-2]) return n-1;

        int i=1, j=n-2;

        while(i<=j){
            int mid = (i+j)/2;
            if(nums[mid]>nums[mid+1] && nums[mid] > nums[mid-1]){
                return mid;
            }else if(nums[mid] > nums[mid+1]) j=mid-1;
            else i=mid+1;
        }
        return -1;
    }
};
```
