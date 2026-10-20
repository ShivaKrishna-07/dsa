---
title: "Network Delay Time"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/network-delay-time/"
  youtube: "https://www.youtube.com/results?search_query=Network+Delay+Time+takeuforward"
  article: "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/"
---

### Problem Statement

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the **minimum time** it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

**Example 1:**
```text
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

**Example 2:**
```text
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**
```text
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

---

### Intuition

Run Dijkstra's algorithm from source node `k`. The total time needed for all nodes to receive the signal is the maximum distance in the `dist` array. If any node remains unreachable, return `-1`.

---

### Code

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<pair<int, int>> adj[n + 1];
        for (auto& t : times) {
            adj[t[0]].push_back({t[1], t[2]});
        }

        // Min-heap stores {time, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        // Stores shortest signal arrival time to each node
        vector<int> dist(n + 1, 1e9);

        dist[k] = 0;
        pq.push({0, k});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            if (d > dist[u]) continue;

            for (auto& [v, w] : adj[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    pq.push({dist[v], v});
                }
            }
        }

        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        return maxTime;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(E * log V)` — Dijkstra algorithm.
- **Space Complexity:** `O(V + E)` — Adjacency list and distance array.
