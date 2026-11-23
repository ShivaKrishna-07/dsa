---
title: "Best Time to Buy and Sell Stock IV"
difficulty: "Hard"
time: "O(N * K)"
space: "O(K)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/"
  youtube: "https://www.youtube.com/watch?v=IV1dHbk5CDc"
  article: "https://takeuforward.org/data-structure/buy-and-sell-stock-iv-dp-38/"
---

### Problem Statement

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`-th day, and an integer `k`. Find the maximum profit you can achieve. You may complete at most `k` transactions: i.e. you may buy at most `k` times and sell at most `k` times.

### Examples

```text
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 2.

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
```

### Intuition

Generalizes Stock III with maximum transaction limit `k`. State is `(idx, buy, cap)` where `cap` ranges from `0` to `k`.

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
        return max(prices[idx] + solve(idx + 1, 1, cap - 1, prices), solve(idx + 1, 0, cap, prices));
    }
public:
    int maxProfit(int k, vector<int>& prices) {
        return solve(0, 1, k, prices);
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
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(k + 1, -1)));
        return solve(0, 1, k, prices, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(k + 1, 0)));

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy) {
                        dp[idx][buy][cap] = max(-prices[idx] + dp[idx + 1][0][cap], dp[idx + 1][1][cap]);
                    } else {
                        dp[idx][buy][cap] = max(prices[idx] + dp[idx + 1][1][cap - 1], dp[idx + 1][0][cap]);
                    }
                }
            }
        }
        return dp[0][1][k];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> ahead(2, vector<int>(k + 1, 0));
        vector<vector<int>> curr(2, vector<int>(k + 1, 0));

        for (int idx = n - 1; idx >= 0; idx--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy) {
                        curr[buy][cap] = max(-prices[idx] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        curr[buy][cap] = max(prices[idx] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = curr;
        }
        return ahead[1][k];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N * K)
- **Space Complexity:** O(K)
