---
title: "Smallest Divisor Given a Threshold"
difficulty: "Medium"
time: "O(N log(max(nums)))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/"
  gfg: "https://www.geeksforgeeks.org/problems/smallest-divisor-with-the-given-threshold/1"
  youtube: "https://www.youtube.com/results?search_query=find+the+smallest+divisor+given+a+threshold"
tags:
  - "Binary Search"
  - "BS on Answers (min/max)"
---

### Problem Statement

Given an array of integers `nums` and an integer `threshold`, we will choose a positive integer `divisor`, divide all the array by it, and sum the division's result. Find the **smallest** `divisor` such that the result mentioned above is less than or equal to `threshold`.

Each result of division is rounded to the nearest integer greater than or equal to that element (For example: `7/3 = 3` and `10/2 = 5`).

The test cases are generated so that there will be an answer.

### Constraints

- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^6`
- `nums.length <= threshold <= 10^6`

### Examples

**Example 1:**
```text
Input: nums = [1, 2, 5, 9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2). Therefore we return 5.
```

**Example 2:**
```text
Input: nums = [44, 22, 33, 11, 1], threshold = 5
Output: 44
```

### Intuition

The minimum possible divisor is `1`. The maximum divisor is `max(nums)` because any divisor larger than `max(nums)` will result in each element dividing to `1` (after rounding up), giving a total sum of `nums.length` (the minimum possible sum).

Since the division sum decreases monotonically as the divisor increases, we can binary search the range `[1, max(nums)]`:
- For each candidate divisor `mid`, compute the sum of division results.
- If the sum is less than or equal to `threshold`, `mid` is a valid divisor candidate, and we try to find a smaller valid divisor (`high = mid - 1`).
- If the sum exceeds `threshold`, the divisor is too small, so we must increase it (`low = mid + 1`).

### Approach

1. Initialize `low = 1` and `high = max(nums)`.
2. Perform binary search:
   - Calculate `mid = low + (high - low) / 2`.
   - Calculate the sum of division results: for each element `x`, add `ceil(x / mid)` to the sum.
   - If the sum is less than or equal to `threshold`, update `high = mid - 1`.
   - Otherwise, update `low = mid + 1`.
3. Return `low`.

---

### Code

```cpp
class Solution {
public:
    bool possible(vector<int>nums, int t, int d){
        long long sum=0;
        for(int x:nums){
            sum += ceil((double)x/d);
        }
        if(sum <= t) return true;
        return false;
    }
    int smallestDivisor(vector<int>& nums, int threshold) {
        int n = nums.size();
        int i=1, j=*max_element(nums.begin(), nums.end());

        while(i<=j){
            int mid = (i+j)/2;
            if(possible(nums, threshold, mid)) j=mid-1;
            else i=mid+1;
        }
        return i;
    }
};
```
