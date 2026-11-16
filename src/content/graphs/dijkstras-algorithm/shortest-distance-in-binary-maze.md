---
title: "Shortest Path in Binary Matrix"
difficulty: "Medium"
time: "O(N * M * log(N * M))"
space: "O(N * M)"
platforms:
  leetcode: "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
  youtube: "https://www.youtube.com/results?search_query=Shortest+Path+in+Binary+Matrix"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/shortest-distance-binary-maze"
---

### Problem Statement

Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return `-1`.

A clear path is a path from the top-left cell `(0, 0)` to the bottom-right cell `(n - 1, n - 1)` such that:
- All visited cells are `0`.
- All adjacent cells of the path are 8-directionally connected.
- The length of a clear path is the number of visited cells of this path.

**Example 1:**
```text
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**
```text
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**
```text
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
```

---

### Intuition

We model the grid as a graph where each transition has weight `1`. Using Dijkstra's algorithm with a min-priority queue, we start at `(0, 0)` with distance `1` and explore all 8 valid directions, greedily updating the minimum distance to each cell until we reach `(n - 1, m - 1)`.

---

### Code

```cpp
class Solution {
public:
    using p = pair<int, pair<int, int>>;
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        if (grid[0][0] == 1 || grid[n - 1][m - 1] == 1) {
            return -1;
        }

        priority_queue<p, vector<p>, greater<p>> pq;

        vector<vector<int>> dist(n, vector<int>(m, 1e9));
        dist[0][0] = 1;
        pq.push({1, {0, 0}});

        int drow[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dcol[] = {-1, 0, 1, -1, 1, -1, 0, 1};

        while (!pq.empty()) {
            int d = pq.top().first;
            auto [row, col] = pq.top().second;
            pq.pop();

            if (row == n - 1 && col == m - 1) {
                return d;
            }

            for (int i = 0; i < 8; i++) {
                int nrow = row + drow[i];
                int ncol = col + dcol[i];

                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && grid[nrow][ncol] == 0) {
                    if (d + 1 < dist[nrow][ncol]) {
                        dist[nrow][ncol] = d + 1;
                        pq.push({d + 1, {nrow, ncol}});
                    }
                }
            }
        }

        return -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * M * log(N * M))` — Priority queue operations for 8-directional traversal across grid cells.
- **Space Complexity:** `O(N * M)` — Distance matrix and priority queue.
