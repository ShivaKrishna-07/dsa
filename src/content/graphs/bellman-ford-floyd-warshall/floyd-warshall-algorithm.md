---
title: "Floyd-Warshall Algorithm"
difficulty: "Medium"
time: "O(V^3)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1"
  youtube: "https://www.youtube.com/watch?v=YbY8cVwWAvc"
  article: "https://takeuforward.org/practice/dsa/floyd-warshall-algorithm"
---

### Problem Statement

Given a directed weighted graph represented as an adjacency matrix of size `n x n`, find the shortest distance between every pair of vertices. `matrix[i][j]` represents the weight of the edge from `i` to `j`, or `-1` if no direct edge exists. Modify `matrix` in-place.

**Example 1:**
```text
Input: matrix = [[0, 25], [-1, 0]]
Output: [[0, 25], [-1, 0]]
```

---

### Intuition

Floyd-Warshall is an all-pairs shortest path dynamic programming algorithm. It considers every vertex `k` as an intermediate hopping node. For every pair of vertices `(i, j)`, it checks if going from `i` to `j` through intermediate node `k` (`matrix[i][k] + matrix[k][j]`) produces a shorter distance than the direct path `matrix[i][j]`.

---

### Code

```cpp
class Solution {
public:
    void shortestDistance(vector<vector<int>>& matrix) {
        int n = matrix.size();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) {
                    matrix[i][j] = 1e9;
                }
                if (i == j) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Intermediate vertex k must be outer loop to consider paths via 0..k
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (matrix[i][k] != 1e9 && matrix[k][j] != 1e9) {
                        // Relaxation: check if path via k is strictly shorter
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                    }
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1e9) {
                    matrix[i][j] = -1;
                }
            }
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V^3)` — Three nested loops running `V` iterations each.
- **Space Complexity:** `O(1)` — Operates in-place on the given adjacency matrix.
