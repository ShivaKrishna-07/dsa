---
title: "Best Time to Buy and Sell Stock"
difficulty: "Easy"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  gfg: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/"
tags:
  - "Arrays"
  - "Observation"
---

### Problem Statement

Given stock prices where prices[i] is the price on day i, choose one buy day and one later sell day to maximize profit.

### Examples

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
```

### Intuition

For every sell day, the best buy day is the minimum price seen before it.

### Approach

Track the minimum price so far and update the best profit at each day.

### Code

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = prices[0];
        int best = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            best = max(best, price - minPrice);
        }
        return best;
    }
};
```
