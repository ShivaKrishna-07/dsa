---
title: "Flood Fill"
difficulty: "Easy"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/flood-fill/"
  gfg: "https://practice.geeksforgeeks.org/problems/flood-fill-algorithm1856/1"
  youtube: "https://www.youtube.com/watch?v=C-2_uSRli8o"
  article: "https://takeuforward.org/graph/flood-fill-algorithm/"
---

### Problem Statement

An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value. You are also given three integers `sr`, `sc`, and `color`. You should perform a flood fill on the image starting from the pixel `image[sr][sc]`.

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`.

**Example 1:**
```text
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1), all pixels connected by a path of the same color as the starting pixel are colored with 2.
```

**Example 2:**
```text
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored 0, so no changes are made.
```

---

### Intuition

Starting from `(sr, sc)`, recursively (DFS) or iteratively (BFS) explore all 4-directional neighboring cells that match the original starting color, replacing them with the new color. If the new color is the same as the starting color, return immediately to avoid an infinite loop.

---

### Code

```cpp
// DFS
class Solution {
    int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
    void dfs(vector<vector<int>>& img, int r, int c, int orig, int color) {
        img[r][c] = color;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < img.size() && nc >= 0 && nc < img[0].size() && img[nr][nc] == orig)
                dfs(img, nr, nc, orig, color);
        }
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& img, int sr, int sc, int color) {
        if (img[sr][sc] == color) return img;
        dfs(img, sr, sc, img[sr][sc], color);
        return img;
    }
};
```

```cpp
// BFS
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& img, int sr, int sc, int color) {
        int orig = img[sr][sc];
        if (orig == color) return img;

        int m = img.size(), n = img[0].size();
        queue<pair<int, int>> q;
        q.push({sr, sc});
        img[sr][sc] = color;

        int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && img[nr][nc] == orig) {
                    img[nr][nc] = color;
                    q.push({nr, nc});
                }
            }
        }
        return img;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Every cell is visited at most once.
- **Space Complexity:** `O(M * N)` — Recursion stack for DFS or queue for BFS in the worst case.
