---
title: "Frog Jump"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/geek-jump/1"
  youtube: "https://www.youtube.com/watch?v=EgG3jsGoPvQ"
  article: "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/"
---

### Problem Statement

A frog is at the 1st stair and wants to reach the `n`-th stair. The frog can jump either `1` step or `2` steps at a time. The height of the `i`-th stair is given in an array `heights`. The energy consumed in a jump from stair `i` to stair `j` is `|heights[i] - heights[j]|`. Find the minimum total energy used by the frog to reach from stair 1 to stair `n`.

### Examples

```text
Input: heights = [10, 20, 30, 10]
Output: 20
Explanation: Frog can jump 10 -> 20 -> 10 with energy |10-20| + |20-10| = 20.

Input: heights = [10, 50, 10]
Output: 0
Explanation: Frog jumps from 1st stair directly to 3rd stair with energy |10-10| = 0.
```

### Intuition

From index `idx`, the frog could have arrived from `idx - 1` or `idx - 2`. The minimum cost to reach `idx` is the minimum of cost from `idx - 1` plus jump cost, and cost from `idx - 2` plus jump cost.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, vector<int>& heights) {
        if (idx == 0) {
            return 0;
        }
        int jump1 = solve(idx - 1, heights) + abs(heights[idx] - heights[idx - 1]);
        int jump2 = INT_MAX;
        // Frog can only jump 2 steps if at least 2 steps behind
        if (idx > 1) {
            jump2 = solve(idx - 2, heights) + abs(heights[idx] - heights[idx - 2]);
        }
        return min(jump1, jump2);
    }
public:
    int minCost(vector<int>& heights) {
        int n = heights.size();
        return solve(n - 1, heights);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, vector<int>& heights, vector<int>& dp) {
        if (idx == 0) {
            return 0;
        }
        if (dp[idx] != -1) {
            return dp[idx];
        }
        int jump1 = solve(idx - 1, heights, dp) + abs(heights[idx] - heights[idx - 1]);
        int jump2 = INT_MAX;
        // Two-step jump valid only when index >= 2
        if (idx > 1) {
            jump2 = solve(idx - 2, heights, dp) + abs(heights[idx] - heights[idx - 2]);
        }
        return dp[idx] = min(jump1, jump2);
    }
public:
    int minCost(vector<int>& heights) {
        int n = heights.size();
        vector<int> dp(n, -1);
        return solve(n - 1, heights, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minCost(vector<int>& heights) {
        int n = heights.size();
        vector<int> dp(n, 0);
        // Base case: 0 cost to start at step 0
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            int jump1 = dp[i - 1] + abs(heights[i] - heights[i - 1]);
            int jump2 = INT_MAX;
            if (i > 1) {
                jump2 = dp[i - 2] + abs(heights[i] - heights[i - 2]);
            }
            dp[i] = min(jump1, jump2);
        }
        return dp[n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minCost(vector<int>& heights) {
        int n = heights.size();
        int prev2 = 0;
        int prev = 0;

        for (int i = 1; i < n; i++) {
            int jump1 = prev + abs(heights[i] - heights[i - 1]);
            int jump2 = INT_MAX;
            if (i > 1) {
                jump2 = prev2 + abs(heights[i] - heights[i - 2]);
            }
            int curr = min(jump1, jump2);
            prev2 = prev;
            prev = curr;
        }
        return prev;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
