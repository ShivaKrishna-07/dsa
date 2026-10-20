---
title: "Flood Fill"
difficulty: "Easy"
time: "O(M * N)"
space: "O(M * N)"
platforms:
  leetcode: "https://leetcode.com/problems/flood-fill/"
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

Starting from `(sr, sc)`, recursively (DFS) or iteratively (BFS) explore all 4-directional neighboring cells that match the original starting color `stColor`, replacing them with `color`. If the new `color` equals `stColor`, return immediately to avoid redundant traversal or infinite loops.

---

### Code

```cpp
// DFS
class Solution {
private:
    int drow[4] = {-1, 0, 1, 0};
    int dcol[4] = {0, 1, 0, -1};

    void dfs(int r, int c, vector<vector<int>>& image, int stColor, int color, int n, int m) {
        image[r][c] = color;

        for (int i = 0; i < 4; i++) {
            int nrow = r + drow[i];
            int ncol = c + dcol[i];

            if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && image[nrow][ncol] == stColor) {
                dfs(nrow, ncol, image, stColor, color, n, m);
            }
        }
    }

public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int stColor = image[sr][sc];
        if (color == stColor) {
            return image;
        }

        int n = image.size();
        int m = image[0].size();
        dfs(sr, sc, image, stColor, color, n, m);

        return image;
    }
};
```

```cpp
// BFS
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int n = image.size();
        int m = image[0].size();

        int stColor = image[sr][sc];
        if (color == stColor) {
            return image;
        }

        queue<pair<int, int>> q;
        q.push({sr, sc});
        image[sr][sc] = color;

        int drow[4] = {-1, 0, 1, 0};
        int dcol[4] = {0, 1, 0, -1};

        while (!q.empty()) {
            int r = q.front().first;
            int c = q.front().second;
            q.pop();

            for (int i = 0; i < 4; i++) {
                int nrow = r + drow[i];
                int ncol = c + dcol[i];

                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && image[nrow][ncol] == stColor) {
                    image[nrow][ncol] = color;
                    q.push({nrow, ncol});
                }
            }
        }

        return image;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(M * N)` — Every cell is visited at most once.
- **Space Complexity:** `O(M * N)` — Recursion stack for DFS or queue for BFS in the worst case.
