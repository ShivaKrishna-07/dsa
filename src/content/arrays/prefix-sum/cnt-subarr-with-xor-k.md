---
title: "Count Subarrays with Given XOR"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1"
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
        // code here
        int n = arr.size();
        int cnt=0;
        unordered_map<int, int>mp;
        int xorr=0;
        
        for(int i=0; i<n; i++){
            xorr ^= arr[i];
            if(xorr == k) cnt++;
            if(mp.count(xorr^k)){
                cnt += mp[xorr^k];
            }
            
            mp[xorr]++;
        }
        return cnt;
    }
};
```
