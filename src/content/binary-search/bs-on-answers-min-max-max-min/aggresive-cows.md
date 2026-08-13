---
title: "Aggressive Cows"
difficulty: "Medium"
time: "O(N log(max_dist) + N log N)"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/aggressive-cows/1"
  youtube: "https://www.youtube.com/watch?v=R_Mfw4ew-Vo"
tags:
  - "Binary Search"
  - "BS on Answers (min(max) or max(min))"
---

### Problem Statement

You are given an array consisting of `n` integers which denote the position of stalls. You are also given an integer `k` which denotes the number of aggressive cows. You must assign the cows to the stalls, such that the minimum distance between any two of them is as large as possible.

Return the maximum possible minimum distance.

### Constraints

- `2 <= stalls.length <= 10^5`
- `0 <= stalls[i] <= 10^9`
- `2 <= k <= stalls.length`

### Examples

**Example 1:**
```text
Input: stalls = [1, 2, 4, 8, 9], k = 3
Output: 3
Explanation: The first cow can be placed at stalls[0]=1, the second cow at stalls[2]=4 (distance of 3), and the third cow at stalls[3]=8 (distance of 4). The minimum distance is min(3, 4) = 3. No other placement yields a larger minimum distance.
```

**Example 2:**
```text
Input: stalls = [1, 2, 8, 4, 9], k = 4
Output: 1
Explanation: Stalls are sorted to [1, 2, 4, 8, 9]. We can place 4 cows at positions 1, 2, 4, 8 (minimum distance 1) or 1, 2, 4, 9 (minimum distance 1).
```

### Intuition

We want to find the **maximum** distance `d` such that we can place `k` cows with at least distance `d` between any two cows.
First, sort the stall coordinates to place cows from left to right.
The minimum possible distance between any two cows is `0` (or `1`), and the maximum possible distance is `stalls[n-1] - stalls[0]`.

Since the feasibility of placing cows decreases monotonically as the minimum distance requirement `d` increases, we can binary search the distance range `[0, stalls[n-1] - stalls[0]]`:
- For a candidate distance `mid`, check if we can place `k` cows such that consecutive cows are at least `mid` apart.
- If it is possible to place `k` cows, then `mid` is a valid candidate. We record it and try to find a larger distance (`low = mid + 1`).
- If it is not possible, the distance is too large, so we search for smaller distances (`high = mid - 1`).

### Approach

1. Sort the `stalls` array in ascending order.
2. Initialize `low = 0` and `high = stalls[n-1] - stalls[0]`.
3. Perform binary search:
   - Calculate `mid = low + (high - low) / 2`.
   - Use a helper function `canCowPlaced(stalls, k, mid)` to count how many cows can be placed with at least `mid` distance. Place the first cow at `stalls[0]`, then place subsequent cows at the next stall that is at least `mid` distance away.
   - If we successfully place at least `k` cows, set `low = mid + 1`.
   - Otherwise, set `high = mid - 1`.
4. Return `high` (or `j` in the code).

---

### Code

```cpp
class Solution {
  public:
    bool canCowPlaced(vector<int>arr, int c, int d){
        int cows=1, last=arr[0];
        for(int i=1; i<arr.size(); i++){
            if(arr[i] - last >= d){
                last = arr[i];
                cows++;
            }
        }
        if(cows >= c) return true;
        else return false;
    }
    int aggressiveCows(vector<int> &arr, int k) {
        // code here
        int n = arr.size();
        sort(arr.begin(), arr.end());
        int i=0, j=arr[n-1]-arr[0];
        
        while(i<=j){
            int mid=(i+j)/2;
            if(canCowPlaced(arr, k, mid)) i=mid+1;
            else j=mid-1;
        }
        return j;
    }
};
```
