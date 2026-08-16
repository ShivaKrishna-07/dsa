---
title: "Minimize Max Distance of Gas Station"
difficulty: "Hard"
label: "Most Challenging"
time: "O(K log N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/minimize-max-distance-to-gas-station/1"
  youtube: "https://www.youtube.com/watch?v=kMSBvlZ-_HA"
tags:
  - "Binary Search"
  - "BS on Answers (min(max) or max(min))"
  - "Heap"
---

### Problem Statement

We have an array `stalls` representing the positions of `N` gas stations along a straight line. We want to place `K` new gas stations such that the maximum distance between any two adjacent gas stations is minimized.

Return the minimum possible value of this maximum distance.

### Constraints

- `2 <= stalls.length <= 10^5`
- `0 <= stalls[i] <= 10^9`
- `1 <= K <= 10^6`
- The answer should be within `10^-6` of the actual value.

### Examples

**Example 1:**
```text
Input: stalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], K = 9
Output: 0.50
Explanation: Place a gas station at each midpoint between consecutive stations. The new distances will be 0.50.
```

**Example 2:**
```text
Input: stalls = [3, 6, 12, 19, 20], K = 4
Output: 2.25
```

### Intuition

To minimize the maximum distance between any two adjacent gas stations, we can greedily insert gas stations into the largest current intervals.
Using a heap (Priority Queue) allows us to dynamically retrieve the largest interval:
1. Initially, compute all `N-1` distances between consecutive stations and push `{distance, interval_index}` to a max-heap.
2. Maintain a `howMany` array of size `N-1` tracking how many new stations are placed in each interval.
3. For each of the `K` new gas stations:
   - Pop the largest interval length from the heap.
   - Increment the number of gas stations placed in this interval.
   - Recalculate the new interval length as `initial_difference / (howMany[interval_index] + 1)`.
   - Push the updated length back into the heap.
4. The top of the heap after placing all `K` stations will be the minimized maximum distance.

---

### Code

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    double findSmallestMaxDist(vector<int> &arr, int k) {
        int n = arr.size();
        vector<int> howMany(n - 1, 0);
        priority_queue<pair<long double, int>> pq;
        
        for (int i = 0; i < n - 1; i++) {
            pq.push({(long double)(arr[i + 1] - arr[i]), i});
        }
        
        for (int gasStations = 1; gasStations <= k; gasStations++) {
            auto tp = pq.top(); 
            pq.pop();
            int secInd = tp.second;
            
            howMany[secInd]++;
            long double iniDiff = arr[secInd + 1] - arr[secInd];
            long double newSecLen = iniDiff / (long double)(howMany[secInd] + 1);
            pq.push({newSecLen, secInd});
        }
        
        return pq.top().first;
    }
};
```
