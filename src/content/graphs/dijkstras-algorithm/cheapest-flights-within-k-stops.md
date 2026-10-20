---
title: "Cheapest Flights Within K Stops"
difficulty: "Medium"
time: "O(K * E)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  youtube: "https://www.youtube.com/watch?v=9XybHVqTHcQ"
  article: "https://takeuforward.org/data-structure/g-38-cheapest-flights-within-k-stops/"
---

### Problem Statement

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]`.

You are also given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.

**Example 1:**
```text
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: The optimal path with at most 1 stop is 0 -> 1 -> 3 with cost 100 + 600 = 700.
```

---

### Intuition

Because each step increases the stop count by 1 (unit weight in terms of stops), we can use a standard BFS queue keyed by `(stops, node, cost)`. Sorting by cost with a PQ is not needed and could lead to unnecessary states because stops increase monotonically by 1.

---

### Code

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<pair<int, int>> adj[n];
        for (auto& f : flights) {
            adj[f[0]].push_back({f[1], f[2]});
        }

        // Queue stores {stops, node, cost}
        queue<tuple<int, int, int>> q; // {stops, node, cost}
        // Stores minimum cost to reach each node within allowed stops
        vector<int> dist(n, 1e9);

        dist[src] = 0;
        q.push({0, src, 0});

        while (!q.empty()) {
            auto [stops, u, cost] = q.front();
            q.pop();
            if (stops > k) continue;

            for (auto& [v, price] : adj[u]) {
                if (cost + price < dist[v]) {
                    dist[v] = cost + price;
                    q.push({stops + 1, v, dist[v]});
                }
            }
        }

        return dist[dst] == 1e9 ? -1 : dist[dst];
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(K * E)` — Up to `K + 1` levels of edges relaxed.
- **Space Complexity:** `O(V + E)` — Adjacency list and distance array.
