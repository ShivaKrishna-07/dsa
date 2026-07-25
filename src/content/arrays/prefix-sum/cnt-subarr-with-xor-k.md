---
title: "Count Subarrays with Given XOR"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/"
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
int subarraysWithXorK(vector<int> nums, int k) {
    unordered_map<int, int> freq;
    freq[0] = 1;
    int xr = 0, count = 0;
    for (int x : nums) {
        xr ^= x;
        count += freq[xr ^ k];
        freq[xr]++;
    }
    return count;
}
```
