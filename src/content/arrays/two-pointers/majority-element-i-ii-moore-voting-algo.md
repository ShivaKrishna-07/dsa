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
Explanation: 2 appears 4 times, which is greater than n/2 times (7/2 = 3).
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
        int n = nums.size();

        int cnt=1, ele = nums[0];
        for(int i=1; i<n; i++){
            if(cnt == 0){
                ele = nums[i];
            }
            if(nums[i] == ele){
                cnt++;
            }else{
                cnt--;
            }
        }
        return ele;
    }
};
```
