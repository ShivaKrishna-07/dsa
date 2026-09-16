---
title: "Minimum Platforms"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Minimum+number+of+platforms+required+for+a+railway"
time: "O(N log N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1"
---

### Problem Statement

Given arrival and departure times of all trains that reach a railway station. Find the minimum number of platforms required for the railway station so that no train is kept waiting.
Consider that all the trains arrive on the same day and leave on the same day. Arrival and departure time can never be the same for a train but we can have arrival time of one train equal to departure time of the other. At any given instance of time, same platform can not be used for both departure of a train and arrival of another train. In such cases, we need different platforms.

**Example 1:**
```text
Input: n = 6 
arr[] = {0900, 0940, 0950, 1100, 1500, 1800}
dep[] = {0910, 1200, 1120, 1130, 1900, 2000}
Output: 3
Explanation: 
Minimum 3 platforms are required to 
safely arrive and depart all trains.
```

---

### Code

```cpp
class Solution{
public:
    int findPlatform(int arr[], int dep[], int n) {
        sort(arr, arr + n);
        sort(dep, dep + n);
        
        int plat_needed = 1, result = 1;
        int i = 1, j = 0;
        
        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                plat_needed++;
                i++;
            } else if (arr[i] > dep[j]) {
                plat_needed--;
                j++;
            }
            
            if (plat_needed > result) {
                result = plat_needed;
            }
        }
        
        return result;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` because sorting the arrival and departure arrays takes `O(N log N)` time. The two pointers traversal takes `O(N)` time.
- **Space Complexity:** `O(1)` as no extra space is used (assuming sorting algorithms take `O(1)` auxiliary space, otherwise `O(log N)` for intro sort).
