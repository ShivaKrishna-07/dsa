---
title: "Longest Consecutive Sequence"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/"
  gfg: "https://www.geeksforgeeks.org/longest-consecutive-subsequence/"
tags:
  - "Arrays"
  - "Hashing"
---

### Problem Statement

Given an unsorted array, return the length of the longest sequence of consecutive integers.

### Examples

```text
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: [1,2,3,4]
```

### Intuition

Only start counting from a number that has no previous number in the set.

### Approach

Put all values into a hash set. For each possible sequence start, walk forward while the next number exists.

### Code

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int n = nums.size();
        if(n == 0 || n == 1) return n;
        unordered_set<int>st;

        for(int i=0; i<n; i++) st.insert(nums[i]);

        int maxi = 1;
        for(int x: nums){
            if(st.find(x - 1) == st.end()){
                int cnt = 1;
                int val = x;
                while(st.find(val+1) != st.end()){
                    val++;
                    cnt++;
                }
                maxi = max(maxi, cnt);
            }
        }
        return maxi;
    }
};
```
