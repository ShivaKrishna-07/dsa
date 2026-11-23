---
title: "Unbounded Knapsack"
difficulty: "Medium"
time: "O(N * W)"
space: "O(W)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1"
  youtube: "https://www.youtube.com/watch?v=OgvOZ6OrJoY"
  article: "https://takeuforward.org/data-structure/unbounded-knapsack-dp-23/"
---

### Problem Statement

Given a set of `n` items, each with a weight and a value, represented by the array `wt` and `val` respectively, also given a knapsack with weight limit `capacity`, the task is to find the maximum value of the items that can be put in the knapsack. You can pick any item multiple times (unbounded).

### Examples

```text
Input: val = [1, 1], wt = [2, 1], capacity = 3
Output: 3
Explanation: Pick item with weight 1 and value 1 three times. Total value = 3.

Input: val = [6, 1, 7, 7], wt = [1, 3, 4, 5], capacity = 8
Output: 48
```

### Intuition

Similar to 0/1 knapsack, but when an item is chosen, we stay at the same item index `idx` because it can be chosen repeatedly.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int cap, vector<int>& val, vector<int>& wt) {
        if (idx == 0) {
            // Take as many copies of item 0 as possible
            return (cap / wt[0]) * val[0];
        }
        int notTake = solve(idx - 1, cap, val, wt);
        int take = 0;
        if (wt[idx] <= cap) {
            take = val[idx] + solve(idx, cap - wt[idx], val, wt);
        }
        return max(notTake, take);
    }
public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        return solve(n - 1, capacity, val, wt);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int cap, vector<int>& val, vector<int>& wt, vector<vector<int>>& dp) {
        if (idx == 0) {
            return (cap / wt[0]) * val[0];
        }
        if (dp[idx][cap] != -1) return dp[idx][cap];
        int notTake = solve(idx - 1, cap, val, wt, dp);
        int take = 0;
        if (wt[idx] <= cap) {
            take = val[idx] + solve(idx, cap - wt[idx], val, wt, dp);
        }
        return dp[idx][cap] = max(notTake, take);
    }
public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        vector<vector<int>> dp(n, vector<int>(capacity + 1, -1));
        return solve(n - 1, capacity, val, wt, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        vector<vector<int>> dp(n, vector<int>(capacity + 1, 0));

        // Base case: multiple copies of 0th item
        for (int cap = 0; cap <= capacity; cap++) {
            dp[0][cap] = (cap / wt[0]) * val[0];
        }

        for (int i = 1; i < n; i++) {
            for (int cap = 0; cap <= capacity; cap++) {
                int notTake = dp[i - 1][cap];
                int take = 0;
                if (wt[i] <= cap) {
                    take = val[i] + dp[i][cap - wt[i]];
                }
                dp[i][cap] = max(notTake, take);
            }
        }
        return dp[n - 1][capacity];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        vector<int> prev(capacity + 1, 0);

        for (int cap = 0; cap <= capacity; cap++) {
            prev[cap] = (cap / wt[0]) * val[0];
        }

        for (int i = 1; i < n; i++) {
            for (int cap = 0; cap <= capacity; cap++) {
                int notTake = prev[cap];
                int take = 0;
                if (wt[i] <= cap) {
                    take = val[i] + prev[cap - wt[i]];
                }
                prev[cap] = max(notTake, take);
            }
        }
        return prev[capacity];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * W)
- **Space Complexity:** O(W)
