---
title: "Best Time to Buy and Sell Stock"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  youtube: "https://www.youtube.com/watch?v=excAOvwF_Wk"
  article: "https://takeuforward.org/data-structure/stock-buy-and-sell-dp-35/"
---

### Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

### Examples

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.

Input: prices = [7,6,4,3,1]
Output: 0
```

### Intuition

To maximize profit, track the minimum price seen so far as we iterate forward. Selling at the current day gives profit `prices[i] - minPrice`. Update global maximum profit.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, vector<int>& prices, int& minPrice) {
        if (i < 0) {
            return 0;
        }
        int prevProfit = solve(i - 1, prices, minPrice);
        minPrice = min(minPrice, prices[i]);
        int currProfit = prices[i] - minPrice;
        return max(prevProfit, currProfit);
    }
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int minPrice = prices[0];
        return solve(n - 1, prices, minPrice);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, vector<int>& prices, vector<int>& dp, int& minPrice) {
        if (i == 0) {
            minPrice = prices[0];
            return 0;
        }
        if (dp[i] != -1) return dp[i];
        int prevProfit = solve(i - 1, prices, dp, minPrice);
        minPrice = min(minPrice, prices[i]);
        return dp[i] = max(prevProfit, prices[i] - minPrice);
    }
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> dp(n, -1);
        int minPrice = INT_MAX;
        return solve(n - 1, prices, dp, minPrice);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> dp(n, 0);
        int minPrice = prices[0];

        for (int i = 1; i < n; i++) {
            minPrice = min(minPrice, prices[i]);
            dp[i] = max(dp[i - 1], prices[i] - minPrice);
        }
        return dp[n - 1];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int i = 1; i < n; i++) {
            int profit = prices[i] - minPrice;
            maxProfit = max(maxProfit, profit);
            minPrice = min(minPrice, prices[i]);
        }
        return maxProfit;
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
