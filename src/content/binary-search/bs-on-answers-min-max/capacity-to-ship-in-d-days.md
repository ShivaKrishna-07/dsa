---
title: "Capacity to Ship Packages Within D Days"
difficulty: "Medium"
time: "O(N log(sum(weights) - max(weights)))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/"
  gfg: "https://www.geeksforgeeks.org/problems/capacity-to-ship-packages-within-d-days/1"
  youtube: "https://www.youtube.com/results?search_query=capacity+to+ship+packages+within+d+days"
tags:
  - "Binary Search"
  - "BS on Answers (min/max)"
---

### Problem Statement

A conveyor belt has packages that must be shipped from one port to another within `days` days.

The `i`-th package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.

### Constraints

- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

### Examples

**Example 1:**
```text
Input: weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
- 1st day: 1, 2, 3, 4, 5 (15)
- 2nd day: 6, 7 (13)
- 3rd day: 8 (8)
- 4th day: 9 (9)
- 5th day: 10 (10)
```

**Example 2:**
```text
Input: weights = [3, 2, 2, 4, 1, 4], days = 3
Output: 6
```

### Intuition

The minimum possible capacity is `max(weights)` because we must be able to carry the heaviest package alone on some day. The maximum possible capacity is `sum(weights)` because at this capacity, we can ship all packages in exactly `1` day.

Since the number of days required to ship packages decreases monotonically as the ship capacity increases, we can binary search the capacity range `[max(weights), sum(weights)]`:
- For each candidate capacity `mid`, calculate the number of days required to ship the packages.
- If the days required are less than or equal to `days`, `mid` is a valid capacity candidate, and we try to find a smaller valid capacity (`high = mid - 1`).
- Otherwise, the capacity is too small, so we must increase it (`low = mid + 1`).

### Approach

1. Initialize `low = max(weights)` and `high = sum(weights)`.
2. Perform binary search:
   - Calculate `mid = low + (high - low) / 2`.
   - Simulating the shipping process: greedily load packages onto the ship. If loading the next package exceeds the capacity `mid`, start a new day and load it.
   - If the total days needed are less than or equal to `days`, set `high = mid - 1`.
   - Otherwise, set `low = mid + 1`.
3. Return `low`.

---

### Code

```cpp
class Solution {
public:
    bool possible(vector<int>nums, int d, int c){
        long long sum=0, cnt=0;
        for(int x:nums){
            if(sum+x <= c) sum += x;
            else{
                cnt++;
                if(x <= c) sum = x;
                else return false;
            }
        }
        if(sum < c) cnt++;
        if(cnt<=d) return true;
        return false;
    }
    int shipWithinDays(vector<int>& nums, int days) {
        int n = nums.size();
        int i=1, j=accumulate(nums.begin(), nums.end(), 0);

        while(i<=j){
            int mid = (i+j)/2;
            if(possible(nums, days, mid)) j=mid-1;
            else i=mid+1;
        }
        return i;
    }
};
```
