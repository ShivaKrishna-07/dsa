---
title: "Coin Change 2"
difficulty: "Medium"
time: "O(N * Amount)"
space: "O(Amount)"
platforms:
  leetcode: "https://leetcode.com/problems/coin-change-ii/"
  youtube: "https://www.youtube.com/watch?v=HgyouEi6QFg"
  article: "https://takeuforward.org/data-structure/coin-change-2-dp-22/"
---

### Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`. You may assume that you have an infinite number of each kind of coin.

### Examples

```text
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: There are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Input: amount = 3, coins = [2]
Output: 0
```

### Intuition

Sum the number of ways by not taking the coin (move to `idx - 1`) and taking the coin (stay at `idx` with reduced amount).

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int amount, vector<int>& coins) {
        if (idx == 0) {
            // Can form if exact multiple of coins[0]
            return (amount % coins[0] == 0) ? 1 : 0;
        }
        int notTake = solve(idx - 1, amount, coins);
        int take = 0;
        if (coins[idx] <= amount) {
            take = solve(idx, amount - coins[idx], coins);
        }
        return notTake + take;
    }
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        return solve(n - 1, amount, coins);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int amount, vector<int>& coins, vector<vector<int>>& dp) {
        if (idx == 0) {
            return (amount % coins[0] == 0) ? 1 : 0;
        }
        if (dp[idx][amount] != -1) return dp[idx][amount];
        int notTake = solve(idx - 1, amount, coins, dp);
        int take = 0;
        if (coins[idx] <= amount) {
            take = solve(idx, amount - coins[idx], coins, dp);
        }
        return dp[idx][amount] = notTake + take;
    }
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, -1));
        return solve(n - 1, amount, coins, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<unsigned long long>> dp(n, vector<unsigned long long>(amount + 1, 0));

        for (int a = 0; a <= amount; a++) {
            if (a % coins[0] == 0) {
                dp[0][a] = 1;
            }
        }

        for (int i = 1; i < n; i++) {
            for (int a = 0; a <= amount; a++) {
                unsigned long long notTake = dp[i - 1][a];
                unsigned long long take = 0;
                if (coins[i] <= a) {
                    take = dp[i][a - coins[i]];
                }
                dp[i][a] = notTake + take;
            }
        }
        return dp[n - 1][amount];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<unsigned long long> prev(amount + 1, 0);

        for (int a = 0; a <= amount; a++) {
            if (a % coins[0] == 0) {
                prev[a] = 1;
            }
        }

        for (int i = 1; i < n; i++) {
            vector<unsigned long long> curr(amount + 1, 0);
            for (int a = 0; a <= amount; a++) {
                unsigned long long notTake = prev[a];
                unsigned long long take = 0;
                if (coins[i] <= a) {
                    take = curr[a - coins[i]];
                }
                curr[a] = notTake + take;
            }
            prev = curr;
        }
        return prev[amount];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * Amount)
- **Space Complexity:** O(Amount)
