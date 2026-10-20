---
title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance"
difficulty: "Medium"
time: "O(N^3)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
  youtube: "https://www.youtube.com/watch?v=PwMVNSJ5SLI"
  article: "https://takeuforward.org/data-structure/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance-g-43/"
---

### Problem Statement

There are `n` cities numbered from `0` to `n - 1`. Given an array `edges` where `edges[i] = [fromi, toi, weighti]` represents a bidirectional edge with a given weight, and an integer `distanceThreshold`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is at most `distanceThreshold`. If there are multiple such cities, return the city with the greatest numerical index.

**Example 1:**
```text
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: Cities reachable within distance <= 4:
City 0 -> [1, 2] (2 cities)
City 1 -> [0, 2, 3] (3 cities)
City 2 -> [0, 1, 3] (3 cities)
City 3 -> [1, 2] (2 cities)
Both city 0 and 3 reach 2 cities. We choose city 3 since it has the greatest index.
```

---

### Intuition

Compute all-pairs shortest paths using the Floyd-Warshall algorithm. Once the shortest distance matrix is populated, iterate through every city `i` and count how many cities `j` (`j != i`) satisfy `dist[i][j] <= distanceThreshold`. Track the city with the minimum count, breaking ties by preferring the larger city index.

---

### Code

```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        // dist[i][j] stores all-pairs shortest path distance
        vector<vector<int>> dist(n, vector<int>(n, 1e9));

        for (int i = 0; i < n; i++) {
            dist[i][i] = 0;
        }

        for (auto& e : edges) {
            int u = e[0];
            int v = e[1];
            int wt = e[2];
            dist[u][v] = wt;
            dist[v][u] = wt;
        }

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != 1e9 && dist[k][j] != 1e9) {
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }

        int minCnt = n;
        int ans = -1;

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = 0; j < n; j++) {
                if (i != j && dist[i][j] <= distanceThreshold) {
                    cnt++;
                }
            }

            if (cnt <= minCnt) {
                minCnt = cnt;
                ans = i;
            }
        }

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N^3)` — Floyd-Warshall requires three nested loops of size `N`.
- **Space Complexity:** `O(N^2)` — 2D distance matrix of size `N x N`.
