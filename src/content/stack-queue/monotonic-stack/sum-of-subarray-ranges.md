---
title: "Sum of Subarray Ranges"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Sum+of+Subarray+Ranges+leetcode+2104"
  leetcode: "https://leetcode.com/problems/sum-of-subarray-ranges/"
---

### Problem Statement

You are given an integer array `nums`. The range of a subarray of `nums` is the difference between the largest and smallest element in the subarray.

Return the sum of all subarray ranges of `nums`.

**Example 1:**
```text
Input: nums = [1,2,3]
Output: 4
Explanation: 
Ranges:
[1]: 1-1 = 0
[2]: 2-2 = 0
[3]: 3-3 = 0
[1,2]: 2-1 = 1
[2,3]: 3-2 = 1
[1,2,3]: 3-1 = 2
Sum: 0 + 0 + 0 + 1 + 1 + 2 = 4
```

**Example 2:**
```text
Input: nums = [1,3,3]
Output: 4
```

**Example 3: (Edge Case - Decreasing)**
```text
Input: nums = [4,-2,-3,4,1]
Output: 59
```

---

### Intuition

The sum of all subarray ranges is mathematically equivalent to: 
`Sum(Max of all subarrays) - Sum(Min of all subarrays)`.
This is amazing because we already know how to solve "Sum of Subarray Minimums" in `O(N)` time using a monotonic stack! We can just apply the exact same logic twice: once with a monotonically increasing stack to find the sum of minimums, and once with a monotonically decreasing stack to find the sum of maximums.

---

### Code

```cpp
class Solution {
public:
    long long subArrayRanges(vector<int>& nums) {
        int n = nums.size();
        long long sumMins = 0, sumMaxs = 0;
        
        // Pass 1: Sum of Subarray Minimums
        vector<int> leftMin(n), rightMin(n);
        stack<int> stMin;
        for (int i = 0; i < n; i++) {
            while (!stMin.empty() && nums[stMin.top()] >= nums[i]) stMin.pop();
            leftMin[i] = stMin.empty() ? -1 : stMin.top();
            stMin.push(i);
        }
        while (!stMin.empty()) stMin.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!stMin.empty() && nums[stMin.top()] > nums[i]) stMin.pop();
            rightMin[i] = stMin.empty() ? n : stMin.top();
            stMin.push(i);
        }
        
        // Pass 2: Sum of Subarray Maximums
        vector<int> leftMax(n), rightMax(n);
        stack<int> stMax;
        for (int i = 0; i < n; i++) {
            while (!stMax.empty() && nums[stMax.top()] <= nums[i]) stMax.pop();
            leftMax[i] = stMax.empty() ? -1 : stMax.top();
            stMax.push(i);
        }
        while (!stMax.empty()) stMax.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!stMax.empty() && nums[stMax.top()] < nums[i]) stMax.pop();
            rightMax[i] = stMax.empty() ? n : stMax.top();
            stMax.push(i);
        }
        
        // Calculate the result
        for (int i = 0; i < n; i++) {
            long long minContrib = (long long)(i - leftMin[i]) * (rightMin[i] - i) * nums[i];
            long long maxContrib = (long long)(i - leftMax[i]) * (rightMax[i] - i) * nums[i];
            
            sumMins += minContrib;
            sumMaxs += maxContrib;
        }
        
        return sumMaxs - sumMins;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate over the array a constant number of times with our monotonic stacks.
- **Space Complexity:** `O(N)` for the stacks and arrays tracking left/right boundaries.
