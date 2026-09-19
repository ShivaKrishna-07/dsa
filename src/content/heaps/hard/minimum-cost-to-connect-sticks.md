---
title: "Minimum Cost to Connect Sticks"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Minimum+Cost+to+Connect+Sticks+leetcode"
time: "O(N log N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
  gfg: "https://practice.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1"
---

### Problem Statement

You have some number of sticks with positive integer lengths. These lengths are given as an array `sticks`, where `sticks[i]` is the length of the `i`th stick.

You can connect any two sticks of lengths `x` and `y` into one stick by paying a cost of `x + y`. You must connect all the sticks until there is only one stick remaining.

Return the **minimum cost** of connecting all the given sticks into one stick in this way.

**Example 1:**
```text
Input: sticks = [2,4,3]
Output: 14
Explanation: 
1. Connect 2 and 3 to a stick of length 5 (cost = 5).
2. Connect 5 and 4 to a stick of length 9 (cost = 9).
Total cost = 5 + 9 = 14.
```

**Example 2:**
```text
Input: sticks = [1,8,3,5]
Output: 30
Explanation: 
1. Connect 1 and 3 (cost = 4).
2. Connect 4 and 5 (cost = 9).
3. Connect 9 and 8 (cost = 17).
Total cost = 4 + 9 + 17 = 30.
```

**Example 3: (Edge Case - Single stick)**
```text
Input: sticks = [5]
Output: 0
Explanation: There is only one stick, so no connections are needed. Cost is 0.
```

---

### Intuition

To minimize the total cost, we should always pick the two smallest sticks available at any step. By repeatedly combining the smallest possible pieces, we keep the cumulative sums as small as possible. A Min-Heap perfectly serves this purpose. We can continuously extract the two smallest elements, add them to get the connection cost, and push their sum back into the heap. We do this until only one stick is left.

---

### Code

```cpp
class Solution {
public:
    long long connectSticks(vector<int>& sticks) {
        // Min-heap to always get the two smallest sticks
        priority_queue<long long, vector<long long>, greater<long long>> minHeap;
        for (int stick : sticks) {
            minHeap.push(stick);
        }
        
        long long totalCost = 0;
        
        // Connect sticks until only one is left
        while (minHeap.size() > 1) {
            // Get the two smallest sticks
            long long first = minHeap.top();
            minHeap.pop();
            long long second = minHeap.top();
            minHeap.pop();
            
            // Connect them and add to total cost
            long long cost = first + second;
            totalCost += cost;
            
            // Push the new connected stick back into the heap
            minHeap.push(cost);
        }
        
        return totalCost;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` where `N` is the number of sticks. We insert `N` elements into the heap, and then perform `N-1` combinations. Each combination involves two pops and one push, which take `O(log N)` time.
- **Space Complexity:** `O(N)` for storing the elements in the priority queue.
