---
title: "Cherry Pickup II"
difficulty: "Hard"
time: "O(R * C^2)"
space: "O(C^2)"
platforms:
  leetcode: "https://leetcode.com/problems/cherry-pickup-ii/"
  youtube: "https://www.youtube.com/watch?v=QGfn7JeXK54"
  article: "https://takeuforward.org/data-structure/3-d-dp-ninja-and-his-friends-dp-13/"
---

### Problem Statement

You are given a `rows x cols` matrix `grid` representing a field of cherries where `grid[i][j]` represents the number of cherries that you can collect from the `(i, j)` cell. You have two robots that can collect cherries for you: Robot #1 starts at `(0, 0)` and Robot #2 starts at `(0, cols - 1)`. Both robots move down simultaneously one row at a time. From cell `(i, j)`, each robot can move to `(i + 1, j - 1)`, `(i + 1, j)`, or `(i + 1, j + 1)`. When both robots reach the same cell, only one takes the cherries. Return the maximum number of cherries collected.

### Examples

```text
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: Path of robot #1 and #2 collects total 24 cherries.
```

### Intuition

Both robots always descend one row simultaneously, so they are always at the same row `r`. The state is `(r, c1, c2)`. Each robot has 3 possible moves, giving `3 x 3 = 9` joint transitions.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int r, int c1, int c2, int n, int m, vector<vector<int>>& grid) {
        if (c1 < 0 || c1 >= m || c2 < 0 || c2 >= m) {
            return -1e9;
        }
        if (r == n - 1) {
            // If both robots land on same cell, collect once
            if (c1 == c2) {
                return grid[r][c1];
            }
            return grid[r][c1] + grid[r][c2];
        }

        int maxCherries = -1e9;
        // Explore all 9 combinations of moves for robot 1 and robot 2
        for (int dc1 = -1; dc1 <= 1; dc1++) {
            for (int dc2 = -1; dc2 <= 1; dc2++) {
                int value = (c1 == c2) ? grid[r][c1] : (grid[r][c1] + grid[r][c2]);
                value += solve(r + 1, c1 + dc1, c2 + dc2, n, m, grid);
                maxCherries = max(maxCherries, value);
            }
        }
        return maxCherries;
    }
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        return solve(0, 0, m - 1, n, m, grid);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int r, int c1, int c2, int n, int m, vector<vector<int>>& grid, vector<vector<vector<int>>>& dp) {
        if (c1 < 0 || c1 >= m || c2 < 0 || c2 >= m) {
            return -1e9;
        }
        if (r == n - 1) {
            return (c1 == c2) ? grid[r][c1] : (grid[r][c1] + grid[r][c2]);
        }
        if (dp[r][c1][c2] != -1) {
            return dp[r][c1][c2];
        }

        int maxCherries = -1e9;
        for (int dc1 = -1; dc1 <= 1; dc1++) {
            for (int dc2 = -1; dc2 <= 1; dc2++) {
                int value = (c1 == c2) ? grid[r][c1] : (grid[r][c1] + grid[r][c2]);
                value += solve(r + 1, c1 + dc1, c2 + dc2, n, m, grid, dp);
                maxCherries = max(maxCherries, value);
            }
        }
        return dp[r][c1][c2] = maxCherries;
    }
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(m, vector<int>(m, -1)));
        return solve(0, 0, m - 1, n, m, grid, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(m, vector<int>(m, 0)));

        // Base cases on the bottom row
        for (int c1 = 0; c1 < m; c1++) {
            for (int c2 = 0; c2 < m; c2++) {
                dp[n - 1][c1][c2] = (c1 == c2) ? grid[n - 1][c1] : (grid[n - 1][c1] + grid[n - 1][c2]);
            }
        }

        for (int r = n - 2; r >= 0; r--) {
            for (int c1 = 0; c1 < m; c1++) {
                for (int c2 = 0; c2 < m; c2++) {
                    int maxCherries = -1e9;
                    for (int dc1 = -1; dc1 <= 1; dc1++) {
                        for (int dc2 = -1; dc2 <= 1; dc2++) {
                            int nextC1 = c1 + dc1;
                            int nextC2 = c2 + dc2;
                            if (nextC1 >= 0 && nextC1 < m && nextC2 >= 0 && nextC2 < m) {
                                int val = (c1 == c2) ? grid[r][c1] : (grid[r][c1] + grid[r][c2]);
                                val += dp[r + 1][nextC1][nextC2];
                                maxCherries = max(maxCherries, val);
                            }
                        }
                    }
                    dp[r][c1][c2] = maxCherries;
                }
            }
        }
        return dp[0][0][m - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> prev(m, vector<int>(m, 0));

        for (int c1 = 0; c1 < m; c1++) {
            for (int c2 = 0; c2 < m; c2++) {
                prev[c1][c2] = (c1 == c2) ? grid[n - 1][c1] : (grid[n - 1][c1] + grid[n - 1][c2]);
            }
        }

        for (int r = n - 2; r >= 0; r--) {
            vector<vector<int>> curr(m, vector<int>(m, 0));
            for (int c1 = 0; c1 < m; c1++) {
                for (int c2 = 0; c2 < m; c2++) {
                    int maxCherries = -1e9;
                    for (int dc1 = -1; dc1 <= 1; dc1++) {
                        for (int dc2 = -1; dc2 <= 1; dc2++) {
                            int nextC1 = c1 + dc1;
                            int nextC2 = c2 + dc2;
                            if (nextC1 >= 0 && nextC1 < m && nextC2 >= 0 && nextC2 < m) {
                                int val = (c1 == c2) ? grid[r][c1] : (grid[r][c1] + grid[r][c2]);
                                val += prev[nextC1][nextC2];
                                maxCherries = max(maxCherries, val);
                            }
                        }
                    }
                    curr[c1][c2] = maxCherries;
                }
            }
            prev = curr;
        }
        return prev[0][m - 1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(R * C^2)
- **Space Complexity:** O(C^2)
