---
title: "Minimum Cost to Cut a Stick"
difficulty: "Hard"
time: "O(C^3)"
space: "O(C^2)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/"
  youtube: "https://www.youtube.com/watch?v=xwomavsC86c"
  article: "https://takeuforward.org/data-structure/minimum-cost-to-cut-the-stick-dp-50/"
---

### Problem Statement

Given a wooden stick of length `n` units. The stick is labelled from `0` to `n`. Given an integer array `cuts` where `cuts[i]` denotes a position you should perform a cut at. You can perform cuts in any order. The cost of one cut is the length of the stick to be cut. Return the minimum total cost of the cuts.

### Examples

```text
Input: n = 7, cuts = [1,3,4,5]
Output: 16
Explanation: Using cuts order [3, 5, 1, 4] gives cost 7 + 4 + 3 + 2 = 16.

Input: n = 9, cuts = [5,6,1,4,2]
Output: 22
```

### Intuition

Append 0 and n to cuts array and sort it. For any segment bounded by cut indices `i` and `j`, trying cut `k` from `i + 1` to `j - 1` incurs cost `cuts[j] - cuts[i]` plus the subproblems for left and right pieces.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int i, int j, vector<int>& cuts) {
        if (i > j) {
            return 0;
        }
        int minCost = 1e9;
        // Try making cut k between segment boundaries (i - 1) and (j + 1)
        for (int k = i; k <= j; k++) {
            int cost = cuts[j + 1] - cuts[i - 1] + solve(i, k - 1, cuts) + solve(k + 1, j, cuts);
            minCost = min(minCost, cost);
        }
        return minCost;
    }
public:
    int minCost(int n, vector<int>& cuts) {
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0);
        sort(cuts.begin(), cuts.end());
        return solve(1, c, cuts);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int i, int j, vector<int>& cuts, vector<vector<int>>& dp) {
        if (i > j) {
            return 0;
        }
        if (dp[i][j] != -1) return dp[i][j];
        int minCost = 1e9;
        for (int k = i; k <= j; k++) {
            int cost = cuts[j + 1] - cuts[i - 1] + solve(i, k - 1, cuts, dp) + solve(k + 1, j, cuts, dp);
            minCost = min(minCost, cost);
        }
        return dp[i][j] = minCost;
    }
public:
    int minCost(int n, vector<int>& cuts) {
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0);
        sort(cuts.begin(), cuts.end());
        vector<vector<int>> dp(c + 2, vector<int>(c + 2, -1));
        return solve(1, c, cuts, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0);
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(c + 2, vector<int>(c + 2, 0));

        for (int i = c; i >= 1; i--) {
            for (int j = 1; j <= c; j++) {
                if (i > j) continue;
                int minCost = 1e9;
                for (int k = i; k <= j; k++) {
                    int cost = cuts[j + 1] - cuts[i - 1] + dp[i][k - 1] + dp[k + 1][j];
                    minCost = min(minCost, cost);
                }
                dp[i][j] = minCost;
            }
        }
        return dp[1][c];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        // Tabulation matrix with O(C^2) space is optimal for subsegment lookups
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0);
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(c + 2, vector<int>(c + 2, 0));

        for (int i = c; i >= 1; i--) {
            for (int j = 1; j <= c; j++) {
                if (i > j) continue;
                int minCost = 1e9;
                for (int k = i; k <= j; k++) {
                    int cost = cuts[j + 1] - cuts[i - 1] + dp[i][k - 1] + dp[k + 1][j];
                    minCost = min(minCost, cost);
                }
                dp[i][j] = minCost;
            }
        }
        return dp[1][c];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(C^3)
- **Space Complexity:** O(C^2)
