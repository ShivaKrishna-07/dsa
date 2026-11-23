---
title: "Coin Change"
difficulty: "Medium"
time: "O(N * Amount)"
space: "O(Amount)"
platforms:
  leetcode: "https://leetcode.com/problems/coin-change/"
  youtube: "https://www.youtube.com/watch?v=myPeWb3Y68A"
  article: "https://takeuforward.org/data-structure/minimum-coins-dp-20/"
---

### Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.

### Examples

```text
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1 (3 coins).

Input: coins = [2], amount = 3
Output: -1
```

### Intuition

This is an unbounded choice problem: after picking coin at index `idx`, we remain at `idx` because the same coin can be reused indefinitely. If we do not pick, move to `idx - 1`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int amount, vector<int>& coins) {
        if (idx == 0) {
            // Can only form amount if divisible by coin denomination
            if (amount % coins[0] == 0) return amount / coins[0];
            return 1e9;
        }
        int notTake = solve(idx - 1, amount, coins);
        int take = 1e9;
        if (coins[idx] <= amount) {
            take = 1 + solve(idx, amount - coins[idx], coins);
        }
        return min(notTake, take);
    }
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        int ans = solve(n - 1, amount, coins);
        return (ans >= 1e9) ? -1 : ans;
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int amount, vector<int>& coins, vector<vector<int>>& dp) {
        if (idx == 0) {
            if (amount % coins[0] == 0) return amount / coins[0];
            return 1e9;
        }
        if (dp[idx][amount] != -1) return dp[idx][amount];
        int notTake = solve(idx - 1, amount, coins, dp);
        int take = 1e9;
        if (coins[idx] <= amount) {
            take = 1 + solve(idx, amount - coins[idx], coins, dp);
        }
        return dp[idx][amount] = min(notTake, take);
    }
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, -1));
        int ans = solve(n - 1, amount, coins, dp);
        return (ans >= 1e9) ? -1 : ans;
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, 0));

        // Base case: only coins[0] available
        for (int a = 0; a <= amount; a++) {
            if (a % coins[0] == 0) {
                dp[0][a] = a / coins[0];
            } else {
                dp[0][a] = 1e9;
            }
        }

        for (int i = 1; i < n; i++) {
            for (int a = 0; a <= amount; a++) {
                int notTake = dp[i - 1][a];
                int take = 1e9;
                if (coins[i] <= a) {
                    take = 1 + dp[i][a - coins[i]];
                }
                dp[i][a] = min(notTake, take);
            }
        }
        int ans = dp[n - 1][amount];
        return (ans >= 1e9) ? -1 : ans;
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<int> prev(amount + 1, 0);

        for (int a = 0; a <= amount; a++) {
            if (a % coins[0] == 0) {
                prev[a] = a / coins[0];
            } else {
                prev[a] = 1e9;
            }
        }

        for (int i = 1; i < n; i++) {
            vector<int> curr(amount + 1, 0);
            for (int a = 0; a <= amount; a++) {
                int notTake = prev[a];
                int take = 1e9;
                if (coins[i] <= a) {
                    take = 1 + curr[a - coins[i]];
                }
                curr[a] = min(notTake, take);
            }
            prev = curr;
        }
        int ans = prev[amount];
        return (ans >= 1e9) ? -1 : ans;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * Amount)
- **Space Complexity:** O(Amount)
