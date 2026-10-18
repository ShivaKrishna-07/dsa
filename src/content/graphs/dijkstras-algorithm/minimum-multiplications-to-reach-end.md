---
title: "Minimum Multiplications to Reach End"
difficulty: "Medium"
time: "O(100000 * N)"
space: "O(100000)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1"
  youtube: "https://www.youtube.com/watch?v=_BvEJ3VIDWw"
  article: "https://takeuforward.org/data-structure/g-39-minimum-multiplications-to-reach-end/"
---

### Problem Statement

Given `start`, `end` and an array `arr` of `n` numbers. At each step, `start` is multiplied with any number in the array and then modded with `100000`. Find the minimum steps in which `end` can be achieved starting from `start`. If not possible, return `-1`.

**Example 1:**
```text
Input: arr = [2, 5, 7], start = 3, end = 30
Output: 2
Explanation: 3 * 2 = 6, 6 * 5 = 30. Total 2 multiplications.
```

---

### Intuition

The states are vertices from `0` to `99999`. Each multiplication is an edge of weight `1`. Standard BFS with a queue finds the shortest path to `end` in minimum steps.

---

### Code

```cpp
class Solution {
public:
    int minimumMultiplications(vector<int>& arr, int start, int end) {
        if (start == end) return 0;
        const int MOD = 100000;
        vector<int> dist(MOD, -1);
        queue<int> q;

        dist[start] = 0;
        q.push(start);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (int num : arr) {
                int next = (node * num) % MOD;
                if (dist[next] == -1) {
                    dist[next] = dist[node] + 1;
                    if (next == end) return dist[next];
                    q.push(next);
                }
            }
        }
        return -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(100000 * N)` — At most 100,000 states visited.
- **Space Complexity:** `O(100000)` — Distance array and queue.
