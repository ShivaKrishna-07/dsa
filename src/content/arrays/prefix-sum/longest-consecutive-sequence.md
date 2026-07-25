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
        unordered_set<int> seen(nums.begin(), nums.end());
        int best = 0;
        for (int x : seen) {
            if (!seen.count(x - 1)) {
                int current = x;
                int length = 1;
                while (seen.count(current + 1)) {
                    current++;
                    length++;
                }
                best = max(best, length);
            }
        }
        return best;
    }
};
```
