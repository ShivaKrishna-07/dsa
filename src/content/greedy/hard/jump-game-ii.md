---
title: "Jump Game II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Jump+Game+II+leetcode+45"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/jump-game-ii/"
---

### Problem Statement

You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:
- `0 <= j <= nums[i]` and
- `i + j < n`

Return the minimum number of jumps to reach `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.

**Example 1:**
```text
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```


**Example 2:**
```text
Input: nums = [2,3,0,1,4]
Output: 2
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 3: (Edge Case - Zero jumps needed)**
```text
Input: nums = [0]
Output: 0
Explanation: You are already at the last index, 0 jumps needed.
```

---

### Code

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0;
        int currentReach = 0;
        int maxReach = 0;
        
        for(int i = 0; i < nums.size() - 1; i++) {
            maxReach = max(maxReach, i + nums[i]);
            if(i == currentReach) {
                jumps++;
                currentReach = maxReach;
            }
        }
        
        return jumps;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` as we do a single pass over the array.
- **Space Complexity:** `O(1)` since we only use a few variables for counting and tracking reach.
