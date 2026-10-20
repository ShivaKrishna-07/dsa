---
title: "Path With Minimum Effort"
difficulty: "Medium"
time: "O(M * N * log(M * N))"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/path-with-minimum-effort/"
  youtube: "https://www.youtube.com/watch?v=0ytpZyiZFhA"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/path-with-minimum-effort"
---

### Problem Statement

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`. You are situated at `(0, 0)` and hope to travel to `(rows-1, columns-1)`.

A route's **effort** is the **maximum absolute difference** in heights between two consecutive cells of the route. Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

**Example 1:**
```text
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,2,2,2,5] has a maximum absolute difference of 2 in consecutive cells.
```

**Example 2:**
```text
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: Route [1,2,3,4,5] has a maximum difference of 1.
```

---

### Intuition

This is a variant of Dijkstra's algorithm where the distance to a cell is defined as the maximum jump on the path so far, and relaxing an edge means: `newEffort = max(currentEffort, abs(heights[nr][nc] - heights[r][c]))`. A min-heap ensures we always explore the path of smallest maximum effort first.

---

### Code

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        // Min-heap stores {effort, row, col}
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> pq;
        vector<vector<int>> effort(m, vector<int>(n, 1e9));

        effort[0][0] = 0;
        pq.push({0, 0, 0}); // {effort, r, c}

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        while (!pq.empty()) {
            auto [diff, r, c] = pq.top();
            pq.pop();
            if (r == m - 1 && c == n - 1) return diff;
            if (diff > effort[r][c]) continue;

            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int newEffort = max(diff, abs(heights[nr][nc] - heights[r][c]));
                    if (newEffort < effort[nr][nc]) {
                        effort[nr][nc] = newEffort;
                        pq.push({newEffort, nr, nc});
                    }
                }
            }
        }
        return 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N * log(M * N))` — Priority queue on `M * N` cells.
- **Space Complexity:** `O(M * N)` — Effort matrix and heap.
