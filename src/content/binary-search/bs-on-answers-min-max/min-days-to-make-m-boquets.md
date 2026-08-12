---
title: "Minimum Days to Make M Bouquets"
difficulty: "Medium"
time: "O(N log(max(bloomDay) - min(bloomDay)))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/"
  gfg: "https://www.geeksforgeeks.org/problems/minimum-days-to-make-m-bouquets/1"
  youtube: "https://www.youtube.com/watch?v=TXAuxeYBTdg"
tags:
  - "Binary Search"
  - "BS on Answers (min/max)"
---

### Problem Statement

You are given an integer array `bloomDay`, an integer `m` and an integer `k`.

You want to make `m` bouquets. To make a bouquet, you need to use `k` **adjacent flowers** from the garden.

The garden consists of `n` flowers, where the `i`-th flower will bloom in the `bloomDay[i]` and then can be used in **exactly one** bouquet.

Return the minimum number of days you need to wait to be able to make `m` bouquets from the garden. If it is impossible to make `m` bouquets, return `-1`.

### Constraints

- `bloomDay.length == n`
- `1 <= n <= 10^5`
- `1 <= bloomDay[i] <= 10^9`
- `1 <= m <= 10^6`
- `1 <= k <= n`

### Examples

**Example 1:**
```text
Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 1
Output: 3
Explanation: Let us see what happen in the first three days. x means flower bloomed and _ means not bloomed in the garden.
- Day 1: [x, _, _, _, _]   // We can only make 1 bouquet.
- Day 2: [x, _, _, _, x]   // We can only make 2 bouquets.
- Day 3: [x, _, x, _, x]   // Now we can make 3 bouquets of 1 flower each, output is 3.
```

**Example 2:**
```text
Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets of 2 flowers each, so we need 6 flowers. The garden only has 5 flowers, so it is impossible, return -1.
```

### Intuition

First, check if the total flowers required (`m * k`) exceeds the total available flowers in the array `n`. If it does, return `-1` since it's mathematically impossible.

The minimum possible day is `min(bloomDay)` and the maximum possible day is `max(bloomDay)`.
Since the number of bouquets we can make is monotonic with respect to the number of days we wait (waiting longer can only bloom more flowers), we can binary search the day range `[min(bloomDay), max(bloomDay)]`:
- For each day candidate `mid`, count the number of bouquets we can form using groups of `k` adjacent flowers that have bloomed on or before day `mid`.
- If we can form at least `m` bouquets, `mid` is a valid speed candidate, and we try to find a smaller valid day (`high = mid - 1`).
- Otherwise, we cannot form enough bouquets, so we must wait longer (`low = mid + 1`).

### Approach

1. If `m * k > n`, return `-1`.
2. Find `min(bloomDay)` and `max(bloomDay)` to initialize `low` and `high` boundaries.
3. Perform binary search:
   - For a candidate day `mid`, iterate through `bloomDay` to count how many bouquets of `k` adjacent bloomed flowers can be made.
   - If the total bouquets formed is at least `m`, set `high = mid - 1`.
   - Otherwise, set `low = mid + 1`.
4. Return `low`.

---

### Code

```cpp
class Solution {
public:
    bool possible(vector<int>nums, int m, int k, int mid){
        int count=0, ans=0;
        for(int x: nums){
            if(x <= mid){
                count++;
            }else{
                ans += count/k;
                count=0;
            }
        }
        ans += count/k;
        if(ans >= m) return true;
        return false;
    }
    int minDays(vector<int>& nums, int m, int k) {
        int n = nums.size();
        if(m*1LL*k > n) return -1;
        int i=*min_element(nums.begin(), nums.end());
        int j=*max_element(nums.begin(), nums.end());

        while(i<=j){
            int mid = (i+j)/2;
            if(possible(nums, m, k, mid)) j=mid-1;
            else i=mid+1;
        }
        return i;
    }
};
```
