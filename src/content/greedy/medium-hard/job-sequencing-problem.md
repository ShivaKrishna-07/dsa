---
title: "Job Sequencing Problem"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Job+Sequencing+Problem+greedy"
time: "O(N log N + N * max_deadline)"
space: "O(max_deadline)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1"
---

### Problem Statement

Given a set of `N` jobs where each job `i` has a deadline and profit associated with it. Each job takes 1 unit of time to complete and only one job can be scheduled at a time. We earn the profit if and only if the job is completed by its deadline. The task is to find the number of jobs done and the maximum profit.

**Example 1:**
```text
Input:
N = 4
Jobs = {(1,4,20),(2,1,10),(3,1,40),(4,1,30)}
Output:
2 60
Explanation:
Job1 and Job3 can be done with maximum profit of 60 (20+40).
```

---

### Code

```cpp
struct Job { 
    int id;	 // Job Id 
    int dead; // Deadline of job 
    int profit; // Profit if job is over before or on deadline 
}; 

class Solution 
{
public:
    static bool comparison(Job a, Job b) {
        return (a.profit > b.profit);
    }
    
    vector<int> JobScheduling(Job arr[], int n) { 
        sort(arr, arr + n, comparison);
        
        int maxi = arr[0].dead;
        for (int i = 1; i < n; i++) {
            maxi = max(maxi, arr[i].dead);
        }
        
        int slot[maxi + 1];
        for (int i = 0; i <= maxi; i++) {
            slot[i] = -1;
        }
        
        int countJobs = 0, jobProfit = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = arr[i].dead; j > 0; j--) {
                if (slot[j] == -1) {
                    slot[j] = i;
                    countJobs++;
                    jobProfit += arr[i].profit;
                    break;
                }
            }
        }
        
        return {countJobs, jobProfit};
    } 
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` for sorting the jobs based on profit, and `O(N * max_deadline)` for scheduling them into slots.
- **Space Complexity:** `O(max_deadline)` to maintain the array of slots.
