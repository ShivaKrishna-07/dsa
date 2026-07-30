---
title: "Count Subarrays with Given XOR"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1"
  article: "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/"
tags:
  - "Arrays"
  - "Prefix XOR"
  - "Hashing"
---

### Problem Statement

Given an array and an integer K, count the number of subarrays whose XOR is K.

### Examples

```text
Input: nums = [4,2,2,6,4], k = 6
Output: 4
```

### Intuition

For XOR, if prefixXor is X and we need K, then a previous prefix X xor K completes a valid subarray.

### Approach

Track frequencies of prefix XOR values. For each current XOR, add how many previous prefixes equal current xor K.

### Code

```cpp
class Solution {
  public:
    long subarrayXor(vector<int> &arr, int k) {
        int n = arr.size();
        unordered_map<int, int>mp;
        mp[0] = 1;
        
        int xr = 0;
        int cnt = 0;
        
        for(int i=0; i<n; i++){
            xr ^= arr[i];
            int x = xr^k;
            
            cnt += mp[x];
            mp[xr]++;
        }
        return cnt;
    }
};
```
