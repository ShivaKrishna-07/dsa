---
title: "Majority Element"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/majority-element/"
  gfg: "https://www.geeksforgeeks.org/majority-element/"
tags:
  - "Arrays"
  - "Moore Voting"
---

### Problem Statement

Find the element that appears more than floor(n / 2) times. The majority element is guaranteed to exist.

### Examples

```text
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

### Intuition

Pair every occurrence of the majority candidate with a different value. The true majority still survives after all cancellations.

### Approach

Maintain a candidate and count. Reset the candidate when count becomes zero, increment for same values and decrement for different values.

### Code

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        return candidate;
    }
};
```
