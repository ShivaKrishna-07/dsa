---
title: "Number of Distinct Islands"
difficulty: "Medium"
time: "O(M * N * log(M * N))"
space: "O(M * N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/number-of-distinct-islands/1"
  youtube: "https://www.youtube.com/results?search_query=Number+of+Distinct+Islands"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-distinct-islands"
---

### Problem Statement

Given a boolean 2D matrix `grid` of size `n * m`. You have to find the number of distinct islands where a group of connected 1s (horizontally or vertically) forms an island. Two islands are considered to be distinct if the shape of one cannot be translated into another.

**Example 1:**
```text
Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
Output: 1
Explanation: Both 2x2 islands have identical shapes under translation.
```

**Example 2:**
```text
Input: grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]
Output: 3
Explanation: There are 3 distinct island shapes under translation.
```

---

### Intuition

To determine if two islands have the same shape, record the relative coordinate offset `(r - r0, c - c0)` of each cell from the island's starting cell `(r0, c0)`. When stored in traversal order in a set, translation-invariant duplicate shapes will automatically map to identical vector entries. The final set size gives the number of distinct island shapes.

---

### Code

```cpp
// DFS
class Solution {
private:
    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};

    void dfs(int r, int c, int r0, int c0, vector<vector<int>>& grid, vector<vector<bool>>& vis, vector<pair<int, int>>& shape) {
        vis[r][c] = true;
        shape.push_back({r - r0, c - c0});
        int n = grid.size();
        int m = grid[0].size();

        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k];
            int nc = c + dc[k];

            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1 && !vis[nr][nc]) {
                dfs(nr, nc, r0, c0, grid, vis, shape);
            }
        }
    }

public:
    int countDistinctIslands(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<bool>> vis(n, vector<bool>(m, false));

        // Stores unique island shapes where each pair is a relative coordinate (r - r0, c - c0)
        set<vector<pair<int, int>>> st;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !vis[i][j]) {
                    vector<pair<int, int>> shape;
                    dfs(i, j, i, j, grid, vis, shape);
                    st.insert(shape);
                }
            }
        }

        return st.size();
    }
};
```

```cpp
// BFS
class Solution {
private:
    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};

    void bfs(int r0, int c0, vector<vector<int>>& grid, vector<vector<bool>>& vis, vector<pair<int, int>>& shape) {
        queue<pair<int, int>> q;
        vis[r0][c0] = true;
        q.push({r0, c0});
        int n = grid.size();
        int m = grid[0].size();

        while (!q.empty()) {
            int r = q.front().first;
            int c = q.front().second;
            q.pop();
            shape.push_back({r - r0, c - c0});

            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k];
                int nc = c + dc[k];

                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1 && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
    }

public:
    int countDistinctIslands(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<bool>> vis(n, vector<bool>(m, false));

        // Stores unique island shapes where each pair is a relative coordinate (r - r0, c - c0)
        set<vector<pair<int, int>>> st;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !vis[i][j]) {
                    vector<pair<int, int>> shape;
                    bfs(i, j, grid, vis, shape);
                    st.insert(shape);
                }
            }
        }

        return st.size();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N * log(M * N))` — Traversal takes `O(M * N)` plus set insertion of shape vectors.
- **Space Complexity:** `O(M * N)` — For `vis` array, DFS recursion/BFS queue, and shape storage in the set.
