---
title: "Best Time to Buy and Sell Stock with Cooldown"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
  youtube: "https://www.youtube.com/watch?v=IGIe46xw3YY"
  article: "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-cooldown-dp-39/"
---

### Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. Find the maximum profit you can achieve. You may complete as many transactions as you like with the restriction: after you sell your stock, you cannot buy stock on the next day (i.e. cooldown one day).

### Examples

```text
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
```

### Intuition

Selling at index `idx` forces a cooldown day, meaning the next available day to buy is `idx + 2` instead of `idx + 1`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int buy, vector<int>& prices) {
        if (idx >= prices.size()) {
            return 0;
        }
        if (buy) {
            return max(-prices[idx] + solve(idx + 1, 0, prices), solve(idx + 1, 1, prices));
        }
        // Next buy occurs at (idx + 2) due to 1-day cooldown
        return max(prices[idx] + solve(idx + 2, 1, prices), solve(idx + 1, 0, prices));
    }
public:
    int maxProfit(vector<int>& prices) {
        return solve(0, 1, prices);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int buy, vector<int>& prices, vector<vector<int>>& dp) {
        if (idx >= prices.size()) {
            return 0;
        }
        if (dp[idx][buy] != -1) return dp[idx][buy];
        if (buy) {
            return dp[idx][buy] = max(-prices[idx] + solve(idx + 1, 0, prices, dp), solve(idx + 1, 1, prices, dp));
        }
        return dp[idx][buy] = max(prices[idx] + solve(idx + 2, 1, prices, dp), solve(idx + 1, 0, prices, dp));
    }
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return solve(0, 1, prices, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 2, vector<int>(2, 0));

        for (int idx = n - 1; idx >= 0; idx--) {
            dp[idx][1] = max(-prices[idx] + dp[idx + 1][0], dp[idx + 1][1]);
            dp[idx][0] = max(prices[idx] + dp[idx + 2][1], dp[idx + 1][0]);
        }
        return dp[0][1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> front2(2, 0);
        vector<int> front1(2, 0);
        vector<int> curr(2, 0);

        for (int idx = n - 1; idx >= 0; idx--) {
            curr[1] = max(-prices[idx] + front1[0], front1[1]);
            curr[0] = max(prices[idx] + front2[1], front1[0]);
            front2 = front1;
            front1 = curr;
        }
        return curr[1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
