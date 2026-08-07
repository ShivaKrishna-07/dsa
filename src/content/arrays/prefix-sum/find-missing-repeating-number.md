---
title: "Missing and Repeating Number"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1"
tags:
  - "Arrays"
  - "Math"
  - "Prefix Sum"
---

### Problem Statement

An array contains numbers from 1 to N, but one number is missing and one number appears twice. Find both numbers.

### Examples

```text
Input: nums = [3,1,2,5,3]
Output: repeating = 3, missing = 4
```

### Intuition

Compare the actual sum and square sum with the expected values from 1 to N.

### Approach

Let x be repeating and y be missing. From sum difference and square-sum difference, derive x - y and x + y, then solve.

### Code

```cpp
class Solution {
  public:
    vector<int> findTwoElement(vector<int>& arr) {
        // code here
        int n = arr.size();
        
        vector<int>temp(n+1, 0);
        vector<int>ans(2);
        for(int i=0; i<n; i++){
            temp[arr[i]]++;
        }
        for(int i=1; i<=n; i++){
            if(temp[i] == 0) ans[1] = i;
            if(temp[i] == 2) ans[0] = i;
        }
        return ans;
    }
};
```
