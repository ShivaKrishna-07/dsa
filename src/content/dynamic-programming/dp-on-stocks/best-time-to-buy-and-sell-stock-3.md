---
title: "Best Time to Buy and Sell Stock III"
difficulty: "Hard"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/"
  youtube: "https://www.youtube.com/watch?v=-uQGzhYj8BQ"
  article: "https://takeuforward.org/data-structure/buy-and-sell-stock-iii-dp-37/"
---

### Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. Find the maximum profit you can achieve. You may complete at most two transactions. Note: You may not engage in multiple transactions simultaneously.

### Examples

```text
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 3. Total profit = 6.
```

### Intuition

State is `(idx, buy, cap)` where `cap` denotes the number of transactions remaining (starting at 2). Each completion of a sale decrements `cap` by 1.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int idx, int buy, int cap, vector<int>& prices) {
        if (cap == 0 || idx == prices.size()) {
            return 0;
        }
        if (buy) {
            return max(-prices[idx] + solve(idx + 1, 0, cap, prices), solve(idx + 1, 1, cap, prices));
        }
        // Decrement transaction cap upon completing a sale
        return max(prices[idx] + solve(idx + 1, 1, cap - 1, prices), solve(idx + 1, 0, cap, prices));
    }
public:
    int maxProfit(vector<int>& prices) {
        return solve(0, 1, 2, prices);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int idx, int buy, int cap, vector<int>& prices, vector<vector<vector<int>>>& dp) {
        if (cap == 0 || idx == prices.size()) {
            return 0;
        }
        if (dp[idx][buy][cap] != -1) return dp[idx][buy][cap];
        if (buy) {
            return dp[idx][buy][cap] = max(-prices[idx] + solve(idx + 1, 0, cap, prices, dp), solve(idx + 1, 1, cap, prices, dp));
        }
        return dp[idx][buy][cap] = max(prices[idx] + solve(idx + 1, 1, cap - 1, prices, dp), solve(idx + 1, 0, cap, prices, dp));
    }
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(3, -1)));
        return solve(0, 1, 2, prices, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(3, 0)));

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {
                    if (buy) {
                        dp[idx][buy][cap] = max(-prices[idx] + dp[idx + 1][0][cap], dp[idx + 1][1][cap]);
                    } else {
                        dp[idx][buy][cap] = max(prices[idx] + dp[idx + 1][1][cap - 1], dp[idx + 1][0][cap]);
                    }
                }
            }
        }
        return dp[0][1][2];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> ahead(2, vector<int>(3, 0));
        vector<vector<int>> curr(2, vector<int>(3, 0));

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {
                    if (buy) {
                        curr[buy][cap] = max(-prices[idx] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        curr[buy][cap] = max(prices[idx] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = curr;
        }
        return ahead[1][2];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
