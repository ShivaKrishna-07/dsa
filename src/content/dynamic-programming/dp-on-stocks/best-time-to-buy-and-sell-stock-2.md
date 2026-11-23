---
title: "Best Time to Buy and Sell Stock II"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
  youtube: "https://www.youtube.com/watch?v=nGJmxkUJQGs"
  article: "https://takeuforward.org/data-structure/buy-and-sell-stock-ii-dp-36/"
---

### Problem Statement

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.

### Examples

```text
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 3. Total profit is 4 + 3 = 7.
```

### Intuition

State is `(idx, buy)`. If `buy == 1`, either buy today (`-prices[idx] + solve(idx + 1, 0)`) or skip (`solve(idx + 1, 1)`). If `buy == 0`, either sell today (`prices[idx] + solve(idx + 1, 1)`) or hold (`solve(idx + 1, 0)`).

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int buy, vector<int>& prices) {
        if (idx == prices.size()) {
            return 0;
        }
        int profit = 0;
        if (buy) {
            // Either buy today or do not buy
            profit = max(-prices[idx] + solve(idx + 1, 0, prices), solve(idx + 1, 1, prices));
        } else {
            // Either sell today or hold
            profit = max(prices[idx] + solve(idx + 1, 1, prices), solve(idx + 1, 0, prices));
        }
        return profit;
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
        if (idx == prices.size()) {
            return 0;
        }
        if (dp[idx][buy] != -1) return dp[idx][buy];
        int profit = 0;
        if (buy) {
            profit = max(-prices[idx] + solve(idx + 1, 0, prices, dp), solve(idx + 1, 1, prices, dp));
        } else {
            profit = max(prices[idx] + solve(idx + 1, 1, prices, dp), solve(idx + 1, 0, prices, dp));
        }
        return dp[idx][buy] = profit;
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
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int buy = 0; buy <= 1; buy++) {
                int profit = 0;
                if (buy) {
                    profit = max(-prices[idx] + dp[idx + 1][0], dp[idx + 1][1]);
                } else {
                    profit = max(prices[idx] + dp[idx + 1][1], dp[idx + 1][0]);
                }
                dp[idx][buy] = profit;
            }
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
        vector<int> ahead(2, 0);
        vector<int> curr(2, 0);

        for (int idx = n - 1; idx >= 0; idx--) {
            curr[1] = max(-prices[idx] + ahead[0], ahead[1]);
            curr[0] = max(prices[idx] + ahead[1], ahead[0]);
            ahead = curr;
        }
        return ahead[1];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
