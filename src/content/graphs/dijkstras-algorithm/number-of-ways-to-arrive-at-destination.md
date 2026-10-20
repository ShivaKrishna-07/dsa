---
title: "Number of Ways to Arrive at Destination"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/"
  youtube: "https://www.youtube.com/watch?v=_-0mx0SmYxA"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-ways-to-arrive-at-destination"
---

### Problem Statement

You are in a city that consists of `n` intersections numbered from `0` to `n - 1` with bi-directional roads between some intersections. You are given an integer `n` and a 2D integer array `roads` where `roads[i] = [ui, vi, timei]`.

Return the number of ways you can arrive at your destination (`n - 1`) from intersection `0` in the shortest amount of time. Since the answer may be large, return it modulo `10^9 + 7`.

**Example 1:**
```text
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: The shortest amount of time to get from 0 to 6 is 7. There are 4 paths that achieve this time.
```

---

### Intuition

Maintain two arrays during Dijkstra's: `dist[u]` (shortest distance) and `ways[u]` (number of shortest paths to `u`).
- If a shorter path to `v` is found: `dist[v] = newDist`, `ways[v] = ways[u]`.
- If an equally short path is found: `ways[v] = (ways[v] + ways[u]) % MOD`.

---

### Code

```cpp
class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        const int MOD = 1e9 + 7;
        vector<pair<int, int>> adj[n];
        for (auto& r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }

        // Min-heap stores {distance, node}
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        // dist: minimum distance; ways: number of shortest paths to each vertex
        vector<long long> dist(n, 1e18);
        vector<int> ways(n, 0);

        dist[0] = 0;
        ways[0] = 1;
        pq.push({0, 0});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            if (d > dist[u]) continue;

            for (auto& [v, time] : adj[u]) {
                if (d + time < dist[v]) {
                    dist[v] = d + time;
                    ways[v] = ways[u];
                    pq.push({dist[v], v});
                } else if (d + time == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return ways[n - 1];
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(E * log V)` — Standard Dijkstra.
- **Space Complexity:** `O(V + E)` — Adjacency list, dist and ways arrays.
