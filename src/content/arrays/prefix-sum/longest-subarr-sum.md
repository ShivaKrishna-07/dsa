---
title: "Longest Subarray with Sum K"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/longest-sub-array-sum-k/"
  article: "https://takeuforward.org/arrays/longest-subarray-with-sum-k-postives-and-negatives/"
tags:
  - "Arrays"
  - "Prefix Sum"
  - "Hashing"
---

### Problem Statement

Given an array and a target K, find the length of the longest contiguous subarray whose sum is K.

### Examples

```text
Input: nums = [10,5,2,7,1,9], k = 15
Output: 4
Explanation: [5,2,7,1] has sum 15.
```

### Intuition

If current prefix sum is S, an earlier prefix S - K gives a subarray with sum K.

### Approach

Store the first index where each prefix sum occurs. First occurrence is important because it gives the longest length.

### Code

```cpp
int lenOfLongSubarr(int arr[], int n, int k) {
    unordered_map<long long, int> firstIndex;
    long long sum = 0;
    int best = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
        if (sum == k) best = max(best, i + 1);
        if (firstIndex.count(sum - k)) {
            best = max(best, i - firstIndex[sum - k]);
        }
        if (!firstIndex.count(sum)) firstIndex[sum] = i;
    }
    return best;
}
```
