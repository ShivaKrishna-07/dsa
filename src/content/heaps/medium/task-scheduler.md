---
title: "Task Scheduler"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Task+Scheduler+leetcode+621"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/task-scheduler/"
---

### Problem Statement

Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

**Example 1:**
```text
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
```


**Example 2:**
```text
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: With no cooldown, tasks can run back to back: A -> B -> A -> B -> A -> B.
```

**Example 3: (Edge Case - High cooldown, one task dominating)**
```text
Input: tasks = ["A","A","A"], n = 2
Output: 7
Explanation: A -> idle -> idle -> A -> idle -> idle -> A.
```

---

### Intuition

To minimize idle time, we should always prioritize scheduling the tasks that have the highest remaining frequency. We can use a Max-Heap to keep track of task counts. In each cycle (of length `n+1`), we greedily pick the most frequent available tasks, execute them, and then put them back in the queue for the next cycle if they still have remaining instances.

---

### Code

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Count frequencies of each task
        map<int, int> mp;
        for(char ch: tasks) {
            mp[ch - 'A']++;
        }

        // Store frequencies in a max-heap to process most frequent tasks first
        priority_queue<int> pq;
        for(auto it: mp) {
            pq.push(it.second);
        }
        
        int ans = 0;
        
        // Process tasks in cycles of length (n + 1)
        while(!pq.empty()) {
            vector<int> temp;
            
            // Try to execute (n + 1) tasks in the current cooldown cycle
            for(int i = 1; i <= n + 1; i++) {
                if(!pq.empty()) {
                    int freq = pq.top();
                    pq.pop();
                    freq--;
                    temp.push_back(freq);
                }
            }
            
            // Push tasks with remaining frequencies back into the heap
            for(int f: temp) {
                if(f > 0) pq.push(f);
            }
            
            // Calculate time taken for this cycle
            // If heap is not empty, it means we had to wait (idle) for the full cycle length
            if(pq.size() > 0) {
                ans += n + 1;
            } else {
                // Otherwise, this was the last cycle, only add the time for tasks executed
                ans += temp.size();
            }
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the total number of tasks. The max heap has at most 26 elements, so heap operations take `O(1)` time.
- **Space Complexity:** `O(1)` as the frequency map and max heap will store at most 26 elements (constant size).
