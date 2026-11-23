---
title: "Best Time to Buy and Sell Stock with Transaction Fee"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
  youtube: "https://www.youtube.com/watch?v=k4eK-vEmnKg"
  article: "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-transaction-fees-dp-40/"
---

### Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day, and an integer `fee` representing a transaction fee. Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

### Examples

```text
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

### Intuition

Identical to Stock II, but subtract `fee` whenever completing a sale: `prices[idx] - fee + solve(idx + 1, 1)`.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int buy, int fee, vector<int>& prices) {
        if (idx == prices.size()) {
            return 0;
        }
        if (buy) {
            return max(-prices[idx] + solve(idx + 1, 0, fee, prices), solve(idx + 1, 1, fee, prices));
        }
        // Deduct fee on completing transaction
        return max(prices[idx] - fee + solve(idx + 1, 1, fee, prices), solve(idx + 1, 0, fee, prices));
    }
public:
    int maxProfit(vector<int>& prices, int fee) {
        return solve(0, 1, fee, prices);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int buy, int fee, vector<int>& prices, vector<vector<int>>& dp) {
        if (idx == prices.size()) {
            return 0;
        }
        if (dp[idx][buy] != -1) return dp[idx][buy];
        if (buy) {
            return dp[idx][buy] = max(-prices[idx] + solve(idx + 1, 0, fee, prices, dp), solve(idx + 1, 1, fee, prices, dp));
        }
        return dp[idx][buy] = max(prices[idx] - fee + solve(idx + 1, 1, fee, prices, dp), solve(idx + 1, 0, fee, prices, dp));
    }
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return solve(0, 1, fee, prices, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int idx = n - 1; idx >= 0; idx--) {
            dp[idx][1] = max(-prices[idx] + dp[idx + 1][0], dp[idx + 1][1]);
            dp[idx][0] = max(prices[idx] - fee + dp[idx + 1][1], dp[idx + 1][0]);
        }
        return dp[0][1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        int aheadBuy = 0, aheadNotBuy = 0;

        for (int idx = n - 1; idx >= 0; idx--) {
            int currBuy = max(-prices[idx] + aheadNotBuy, aheadBuy);
            int currNotBuy = max(prices[idx] - fee + aheadBuy, aheadNotBuy);
            aheadBuy = currBuy;
            aheadNotBuy = currNotBuy;
        }
        return aheadBuy;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
