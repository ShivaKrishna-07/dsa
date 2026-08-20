---
title: "Koko Eating Bananas"
difficulty: "Medium"
time: "O(N log(max(piles)))"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/koko-eating-bananas/"
  gfg: "https://www.geeksforgeeks.org/problems/koko-eating-bananas/1"
  youtube: "https://www.youtube.com/watch?v=qyfekrNni90"
tags:
  - "Binary Search"
  - "BS on Answers (min/max)"
---

### Problem Statement

Koko loves to eat bananas. There are `n` piles of bananas, where the `i`-th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

### Constraints

- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

### Examples

**Example 1:**
```text
Input: piles = [3, 6, 7, 11], h = 8
Output: 4
Explanation: With speed 4, Koko eats the piles in 1 + 2 + 2 + 3 = 8 hours.
```

**Example 2:**
```text
Input: piles = [30, 11, 23, 4, 20], h = 5
Output: 30
Explanation: With speed 30, Koko eats the piles in 1 + 1 + 1 + 1 + 1 = 5 hours.
```

**Example 3:**
```text
Input: piles = [30, 11, 23, 4, 20], h = 6
Output: 23
Explanation: With speed 23, Koko eats the piles in 2 + 1 + 1 + 1 + 1 = 6 hours.
```

### Intuition

The minimum possible eating speed is `1` banana/hour, and the maximum reasonable speed is `max(piles)` (at which Koko finishes every pile in exactly 1 hour).
Since the ability to finish the bananas in time is monotonic with respect to speed `k` (if speed `k` is valid, any speed `> k` is also valid), we can binary search the speed range `[1, max(piles)]`:
- For each speed `mid`, we compute the total hours required.
- If the total hours exceed `h`, Koko eats too slowly, so we search for a faster speed (`low = mid + 1`).
- Otherwise, Koko finishes in time, so `mid` is a valid speed candidate, and we try to find a slower valid speed (`high = mid - 1`).

### Approach

1. Find the maximum element in `piles` to set the high boundary.
2. Initialize `low = 1` and `high = max(piles)`.
3. Perform binary search:
   - For the current speed `mid`, calculate total hours by summing up `ceil(pile / mid)` for each pile.
   - If the total hours are less than or equal to `h`, we record `mid` as a potential solution and try smaller speeds by setting `high = mid - 1`.
   - If the total hours are greater than `h`, we must search for larger speeds by setting `low = mid + 1`.
4. Return `low`.

---

### Code

```cpp
class Solution {
public:
    bool possible(vector<int>piles, int h, int target){
        long long hours = 0;
        for(int x:piles){
            hours += ceil((double)x/target);
        }
        if(hours <= h) return true;
        return false;
    }
    int minEatingSpeed(vector<int>& piles, int h) {
        int n = piles.size();
        int i=1, j=*max_element(piles.begin(), piles.end());

        while(i<=j){
            int mid = (i+j)/2;
            if(!possible(piles, h, mid)) i=mid+1;
            else j=mid-1;
        }
        return i;

    }
};
```
