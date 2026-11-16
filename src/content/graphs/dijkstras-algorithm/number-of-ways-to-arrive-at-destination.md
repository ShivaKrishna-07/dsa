---
title: "Number of Ways to Arrive at Destination"
difficulty: "Medium"
time: "O(E * log V)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/"
  youtube: "https://www.youtube.com/results?search_query=Number+of+Ways+to+Arrive+at+Destination"
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
    using P = pair<long long, long long>;
    int mod = 1e9 + 7;

    int countPaths(int n, vector<vector<int>>& roads) {
        vector<vector<P>> adj(n);

        for (auto& it : roads) {
            adj[it[0]].push_back({it[1], it[2]});
            adj[it[1]].push_back({it[0], it[2]});
        }

        // Min-heap stores {distance, node}
        priority_queue<P, vector<P>, greater<P>> pq;
        vector<long long> dist(n, LLONG_MAX);
        vector<int> ways(n, 0);

        pq.push({0, 0});
        dist[0] = 0;
        ways[0] = 1;

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            for (auto [v, cost] : adj[u]) {
                // Found a shorter path: update distance and inherit ways count
                if (cost + d < dist[v]) {
                    dist[v] = cost + d;
                    ways[v] = ways[u];
                    pq.push({dist[v], v});
                } else if (cost + d == dist[v]) {
                    // Found an additional shortest path: accumulate ways
                    ways[v] = (ways[v] + ways[u]) % mod;
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
