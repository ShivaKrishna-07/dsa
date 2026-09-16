---
title: "Minimum Number of Coins"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Greedy+algorithm+to+find+minimum+number+of+coins"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/find-minimum-number-of-coins/1"
---

### Problem Statement

Given an infinite supply of each denomination of Indian currency `{ 1, 2, 5, 10, 20, 50, 100, 200, 500, 2000 }` and a target value `N`.
Find the minimum number of coins and/or notes needed to make the change for `N`.

**Example 1:**
```text
Input: N = 43
Output: 20 20 2 1
Explanation: Minimum number of coins and notes to make 43 are 20, 20, 2, 1.
```


**Example 2:**
```text
Input: N = 1000
Output: 500 500
Explanation: Two 500 notes make 1000.
```

**Example 3: (Edge Case - Exactly one coin)**
```text
Input: N = 10
Output: 10
Explanation: Just one 10 coin is needed.
```

---

### Code

```cpp
class Solution{
public:
    vector<int> minPartition(int N)
    {
        vector<int> coins = {2000, 500, 200, 100, 50, 20, 10, 5, 2, 1};
        vector<int> ans;
        
        for(int i = 0; i < coins.size(); i++) {
            while(N >= coins[i]) {
                N -= coins[i];
                ans.push_back(coins[i]);
            }
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` in the worst case (e.g. if we only had coins of size 1). Practically it's bounded by `O(amount / largest_denomination)`. 
- **Space Complexity:** `O(1)` ignoring the space required for output array, as the coins array size is constant.
