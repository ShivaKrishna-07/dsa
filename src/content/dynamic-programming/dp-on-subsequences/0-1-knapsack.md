---
title: "0/1 Knapsack"
difficulty: "Medium"
time: "O(N * W)"
space: "O(W)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1"
  youtube: "https://www.youtube.com/watch?v=GqOmJHQZivw"
  article: "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/"
---

### Problem Statement

You are given weights `wt` and values `val` of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. Each item can be picked at most once (0 or 1 choice).

### Examples

```text
Input: W = 4, val = [1, 2, 3], wt = [4, 5, 1]
Output: 3
Explanation: Choose item with weight 1 and value 3.

Input: W = 3, val = [1, 2, 3], wt = [4, 5, 6]
Output: 0
```

### Intuition

For item `idx`, we can either not pick it (and retain capacity `cap`), or pick it (adding `val[idx]` and consuming `wt[idx]` capacity). Take the maximum value achievable.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int cap, vector<int>& val, vector<int>& wt) {
        if (idx == 0) {
            // At index 0, take if weight fits in capacity
            if (wt[0] <= cap) return val[0];
            return 0;
        }
        int notTake = solve(idx - 1, cap, val, wt);
        int take = INT_MIN;
        if (wt[idx] <= cap) {
            take = val[idx] + solve(idx - 1, cap - wt[idx], val, wt);
        }
        return max(notTake, take);
    }
public:
    int knapSack(int capacity, vector<int>& val, vector<int>& wt) {
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
            if (wt[0] <= cap) return val[0];
            return 0;
        }
        if (dp[idx][cap] != -1) return dp[idx][cap];
        int notTake = solve(idx - 1, cap, val, wt, dp);
        int take = INT_MIN;
        if (wt[idx] <= cap) {
            take = val[idx] + solve(idx - 1, cap - wt[idx], val, wt, dp);
        }
        return dp[idx][cap] = max(notTake, take);
    }
public:
    int knapSack(int capacity, vector<int>& val, vector<int>& wt) {
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
    int knapSack(int capacity, vector<int>& val, vector<int>& wt) {
        int n = val.size();
        vector<vector<int>> dp(n, vector<int>(capacity + 1, 0));

        // Base case: at index 0, any capacity >= wt[0] can hold val[0]
        for (int w = wt[0]; w <= capacity; w++) {
            dp[0][w] = val[0];
        }

        for (int i = 1; i < n; i++) {
            for (int cap = 0; cap <= capacity; cap++) {
                int notTake = dp[i - 1][cap];
                int take = INT_MIN;
                if (wt[i] <= cap) {
                    take = val[i] + dp[i - 1][cap - wt[i]];
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
    int knapSack(int capacity, vector<int>& val, vector<int>& wt) {
        int n = val.size();
        vector<int> prev(capacity + 1, 0);

        for (int w = wt[0]; w <= capacity; w++) {
            prev[w] = val[0];
        }

        for (int i = 1; i < n; i++) {
            // Iterate backwards to optimize into a single 1D array
            for (int cap = capacity; cap >= 0; cap--) {
                int notTake = prev[cap];
                int take = INT_MIN;
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
