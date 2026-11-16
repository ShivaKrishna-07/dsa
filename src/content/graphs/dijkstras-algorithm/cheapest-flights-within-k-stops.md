---
title: "Cheapest Flights Within K Stops"
difficulty: "Medium"
time: "O(K * E)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  youtube: "https://www.youtube.com/results?search_query=Cheapest+Flights+Within+K+Stops"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/cheapest-flights-within-k-stops"
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

We use a modified Dijkstra approach using a min-heap prioritized primarily by the number of `stops` (`{stops, {cost, node}}`). By expanding paths with fewer stops first, we can safely prune any path where `stops > k`. If traversing to neighbor `v` yields a cheaper cost (`d + wt < dist[v]`), we update `dist[v]` and push `{stops + 1, {dist[v], v}}` into the priority queue.

---

### Code

```cpp
class Solution {
public:
    using P = pair<int, pair<int, int>>;

    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<vector<pair<int, int>>> adj(n);

        for (int i = 0; i < flights.size(); i++) {
            adj[flights[i][0]].push_back({flights[i][1], flights[i][2]});
        }

        // Min-heap ordered by {stops, {cost, node}}
        priority_queue<P, vector<P>, greater<P>> pq;
        vector<int> dist(n, 1e9);

        pq.push({0, {0, src}});
        dist[src] = 0;

        while (!pq.empty()) {
            int stops = pq.top().first;
            auto [d, u] = pq.top().second;
            pq.pop();

            // Prune paths exceeding allowed stops
            if (stops > k) {
                continue;
            }

            for (auto [v, wt] : adj[u]) {
                // Only push if a cheaper route to node v is found
                if (d + wt < dist[v]) {
                    dist[v] = d + wt;
                    pq.push({stops + 1, {dist[v], v}});
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
