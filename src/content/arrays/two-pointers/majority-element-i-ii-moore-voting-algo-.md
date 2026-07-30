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
        int n = nums.size();

        int cnt1=0, cnt2=0, ele1, ele2;
        for(int i=0; i<n; i++){
            if(cnt1 == 0 && nums[i]!=ele2){
                cnt1 = 1, ele1 = nums[i];
            }
            else if(cnt2 == 0 && nums[i] != ele1){
                cnt2 = 1, ele2 = nums[i];
            }
            else if(ele1 == nums[i]) cnt1++;
            else if(ele2 == nums[i]) cnt2++;
            else cnt1--, cnt2--;
        }
        cnt1=0, cnt2=0;
        for(int i=0; i<n; i++){
            if(nums[i] == ele1) cnt1++;
            if(nums[i] == ele2) cnt2++;
        }
        if(cnt1>n/3 && cnt2>n/3) return {ele1, ele2};
        if(cnt1>n/3) return {ele1};
        if(cnt2>n/3) return {ele2};
        return {};
    }
};
```
