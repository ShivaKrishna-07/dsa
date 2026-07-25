---
title: "Max Consecutive Ones"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/max-consecutive-ones/"
  gfg: "https://www.geeksforgeeks.org/maximum-consecutive-ones-or-zeros-in-a-binary-array/"
tags:
  - "Arrays"
  - "Observation"
---

### Problem Statement

Given a binary array, return the maximum number of consecutive 1s.

### Examples

```text
Input: nums = [1,1,0,1,1,1]
Output: 3
```

### Intuition

Only the current streak of ones matters. A zero resets the streak.

### Approach

Scan once, increment current streak for 1 and reset for 0. Keep the maximum streak.

### Code

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int current = 0, best = 0;
        for (int x : nums) {
            if (x == 1) current++;
            else current = 0;
            best = max(best, current);
        }
        return best;
    }
};
```
