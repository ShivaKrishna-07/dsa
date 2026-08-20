---
title: "Rearrange Array Elements by Sign"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/rearrange-array-elements-by-sign/"
  gfg: "https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/"
tags:
  - "Arrays"
  - "Two Pointers"
  - "Simulation"
---

### Problem Statement

Given an array with equal positive and negative counts, rearrange it so signs alternate and the first element is positive.

### Examples

```text
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation: The positive and negative integers are rearranged in an alternating fashion.
```

### Intuition

Positive numbers must occupy even indices and negative numbers must occupy odd indices.

### Approach

Create an answer array. Place positives at 0, 2, 4... and negatives at 1, 3, 5....

### Code

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> ans(nums.size());
        int pos = 0, neg = 1;
        for (int x : nums) {
            if (x > 0) {
                ans[pos] = x;
                pos += 2;
            } else {
                ans[neg] = x;
                neg += 2;
            }
        }
        return ans;
    }
};
```
