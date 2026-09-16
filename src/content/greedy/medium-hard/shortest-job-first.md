---
title: "Shortest Job First"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Shortest+Job+First+CPU+Scheduling"
time: "O(N log N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/shortest-job-first/1"
---

### Problem Statement

Geek is a software engineer. He is simulating a Shortest Job First (SJF) CPU scheduling algorithm.
Given an array of integers `bt` of size `N` representing the burst time of `N` processes. The processes arrive at the same time and are scheduled according to the Shortest Job First algorithm. Find the average waiting time for the processes.

**Example 1:**
```text
Input:
n = 5
bt = [4, 3, 7, 1, 2]
Output: 4
Explanation: 
Sorting the burst times: [1, 2, 3, 4, 7]
Waiting times: [0, 1, 3, 6, 10]
Average waiting time = (0 + 1 + 3 + 6 + 10) / 5 = 4.
```

---

### Code

```cpp
class Solution {
public:
    long long solve(vector<int>& bt) {
        sort(bt.begin(), bt.end());
        
        long long totalWaitTime = 0;
        long long currentWait = 0;
        
        for (int i = 0; i < bt.size(); i++) {
            totalWaitTime += currentWait;
            currentWait += bt[i];
        }
        
        return totalWaitTime / bt.size();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` because of the sorting step.
- **Space Complexity:** `O(1)` as we calculate in-place without extra structures.
