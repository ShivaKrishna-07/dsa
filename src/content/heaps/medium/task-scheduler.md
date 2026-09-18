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
        // Count frequencies of all tasks
        unordered_map<char, int> counts;
        for (char t : tasks) {
            counts[t]++;
        }
        
        // Max-heap to process the most frequent tasks first
        priority_queue<int> maxHeap;
        for (auto& pair : counts) {
            maxHeap.push(pair.second);
        }
        
        int time = 0;
        
        while (!maxHeap.empty()) {
            vector<int> temp;
            int cycle = n + 1; // Number of slots in one cooldown cycle
            
            // Schedule tasks for the current cycle
            while (cycle > 0 && !maxHeap.empty()) {
                int max_freq = maxHeap.top();
                maxHeap.pop();
                
                // If a task is not completely finished, queue it for the next cycle
                if (max_freq > 1) {
                    temp.push_back(max_freq - 1);
                }
                
                time++;
                cycle--;
            }
            
            // Push unfinished tasks back into the heap
            for (int t : temp) {
                maxHeap.push(t);
            }
            
            // If heap is not empty, it means we need idle time to finish the cycle
            if (!maxHeap.empty()) {
                time += cycle; 
            }
        }
        
        return time;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the total number of tasks. The max heap has at most 26 elements, so heap operations take `O(1)` time.
- **Space Complexity:** `O(1)` as the frequency map and max heap will store at most 26 elements (constant size).
