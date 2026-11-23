---
title: "Ninja's Training"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/geeks-training/1"
  youtube: "https://www.youtube.com/watch?v=AE39gJYuRog"
  article: "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7/"
---

### Problem Statement

A Ninja has an `n`-day training schedule. On each day, the Ninja can perform one of three activities: Running, Stealth Training, or Fighting. Each activity grants merit points. The Ninja cannot perform the same activity on two consecutive days. Given an `n x 3` 2D array `arr` where `arr[i][j]` represents points on day `i` for activity `j`, find the maximum points the Ninja can earn over `n` days.

### Examples

```text
Input: arr = [[10, 40, 70], [20, 50, 80], [30, 60, 90]]
Output: 210
Explanation: Day 1: Activity 2 (70), Day 2: Activity 2 not allowed -> pick Activity 2 (80)? Wait, picking [70, 50, 90] gives 210.

Input: arr = [[1, 2, 5], [3, 1, 1], [3, 3, 3]]
Output: 11
```

### Intuition

For each day, the state is determined by `(day, lastActivity)`. For day `d`, try all 3 activities except `lastActivity`, and take the maximum points obtainable.

### Code

```cpp
// Recursion
class Solution {
private:
    int solve(int day, int last, vector<vector<int>>& arr) {
        if (day == 0) {
            int maxPoints = 0;
            // On day 0, take maximum points among all activities not equal to last
            for (int act = 0; act < 3; act++) {
                if (act != last) {
                    maxPoints = max(maxPoints, arr[0][act]);
                }
            }
            return maxPoints;
        }
        int maxPoints = 0;
        for (int act = 0; act < 3; act++) {
            if (act != last) {
                int points = arr[day][act] + solve(day - 1, act, arr);
                maxPoints = max(maxPoints, points);
            }
        }
        return maxPoints;
    }
public:
    int maximumPoints(vector<vector<int>>& arr) {
        int n = arr.size();
        return solve(n - 1, 3, arr);
    }
};
```

```cpp
// Memoization
class Solution {
private:
    int solve(int day, int last, vector<vector<int>>& arr, vector<vector<int>>& dp) {
        if (day == 0) {
            int maxPoints = 0;
            for (int act = 0; act < 3; act++) {
                if (act != last) {
                    maxPoints = max(maxPoints, arr[0][act]);
                }
            }
            return maxPoints;
        }
        if (dp[day][last] != -1) {
            return dp[day][last];
        }
        int maxPoints = 0;
        for (int act = 0; act < 3; act++) {
            if (act != last) {
                int points = arr[day][act] + solve(day - 1, act, arr, dp);
                maxPoints = max(maxPoints, points);
            }
        }
        return dp[day][last] = maxPoints;
    }
public:
    int maximumPoints(vector<vector<int>>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(4, -1));
        return solve(n - 1, 3, arr, dp);
    }
};
```

```cpp
// Tabulation
class Solution {
public:
    int maximumPoints(vector<vector<int>>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(4, 0));

        // Base cases on day 0: best points when previous action was 'last'
        dp[0][0] = max(arr[0][1], arr[0][2]);
        dp[0][1] = max(arr[0][0], arr[0][2]);
        dp[0][2] = max(arr[0][0], arr[0][1]);
        dp[0][3] = max({arr[0][0], arr[0][1], arr[0][2]});

        for (int day = 1; day < n; day++) {
            for (int last = 0; last < 4; last++) {
                int maxPoints = 0;
                for (int act = 0; act < 3; act++) {
                    if (act != last) {
                        int points = arr[day][act] + dp[day - 1][act];
                        maxPoints = max(maxPoints, points);
                    }
                }
                dp[day][last] = maxPoints;
            }
        }
        return dp[n - 1][3];
    }
};
```

```cpp
// Space Optimization
class Solution {
public:
    int maximumPoints(vector<vector<int>>& arr) {
        int n = arr.size();
        vector<int> prev(4, 0);

        prev[0] = max(arr[0][1], arr[0][2]);
        prev[1] = max(arr[0][0], arr[0][2]);
        prev[2] = max(arr[0][0], arr[0][1]);
        prev[3] = max({arr[0][0], arr[0][1], arr[0][2]});

        for (int day = 1; day < n; day++) {
            vector<int> curr(4, 0);
            for (int last = 0; last < 4; last++) {
                int maxPoints = 0;
                for (int act = 0; act < 3; act++) {
                    if (act != last) {
                        int points = arr[day][act] + prev[act];
                        maxPoints = max(maxPoints, points);
                    }
                }
                curr[last] = maxPoints;
            }
            prev = curr;
        }
        return prev[3];
    }
};
```

### Complexity Analysis

- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
