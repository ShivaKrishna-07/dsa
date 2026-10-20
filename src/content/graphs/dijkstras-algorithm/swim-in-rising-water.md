---
title: "Swim in Rising Water"
difficulty: "Hard"
time: "O(N^2 * log N)"
space: "O(N^2)"
platforms:
  article: "https://takeuforward.org/practice/dsa/swim-in-rising-water"
  leetcode: "https://leetcode.com/problems/swim-in-rising-water/"
  youtube: "https://www.youtube.com/results?search_query=Swim+in+Rising+Water+LeetCode"
---

### Problem Statement

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

It starts raining at time `0`. At time `t`, the depth of the water is `t`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares is at most `t`.

Return the least time until you can reach the bottom right square `(n - 1, n - 1)` if you start at the top left square `(0, 0)`.

**Example 1:**
```text
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation: At time 0, you are at (0, 0). You must wait until time 3 to swim to (1, 1).
```

**Example 2:**
```text
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
```

---

### Intuition

This problem can be viewed as finding a path from `(0,0)` to `(n-1, n-1)` that minimizes the maximum elevation encountered along the path. We use a min-heap (Dijkstra) prioritizing the smallest elevation threshold encountered so far.

---

### Code

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        // Min-heap stores {water level (max elevation on path), row, col}
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> pq;
        vector<vector<bool>> vis(n, vector<bool>(n, false));

        pq.push({grid[0][0], 0, 0});
        vis[0][0] = true;

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};

        while (!pq.empty()) {
            auto [t, r, c] = pq.top();
            pq.pop();
            if (r == n - 1 && c == n - 1) return t;

            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    pq.push({max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N^2 * log N)` — Every cell pushed into the priority queue once.
- **Space Complexity:** `O(N^2)` — Visited matrix and priority queue.
