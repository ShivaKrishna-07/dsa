---
title: "Majority Element II"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/majority-element-ii/"
  gfg: "https://www.geeksforgeeks.org/elements-appear-n3-times/"
tags:
  - "Arrays"
  - "Moore Voting"
---

### Problem Statement

Return all elements that appear more than floor(n / 3) times. There can be at most two such elements.

### Examples

```text
Input: nums = [3,2,3]
Output: [3]
```

### Intuition

If an element appears more than n / 3 times, only two values can satisfy the condition. Extended Moore voting keeps two candidates.

### Approach

Find two potential candidates by cancellation, then verify their actual frequencies in a second pass.

### Code

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int cand1 = 0, cand2 = 1;
        int count1 = 0, count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
            else if (count1 == 0) cand1 = x, count1 = 1;
            else if (count2 == 0) cand2 = x, count2 = 1;
            else count1--, count2--;
        }
        count1 = count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
        }
        vector<int> ans;
        int limit = nums.size() / 3;
        if (count1 > limit) ans.push_back(cand1);
        if (count2 > limit) ans.push_back(cand2);
        return ans;
    }
};
```
