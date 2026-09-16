---
title: "Jump Game"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Jump+Game+leetcode+55"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/jump-game/"
---

### Problem Statement

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return `true` if you can reach the last index, or `false` otherwise.

**Example 1:**
```text
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```


**Example 2:**
```text
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0.
```

**Example 3: (Edge Case - Single element)**
```text
Input: nums = [0]
Output: true
Explanation: You are already at the last index.
```

---

### Code

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        int n = nums.size();
        
        for(int i = 0; i < n; i++) {
            if (i > maxReach) {
                return false;
            }
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) {
                return true;
            }
        }
        
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate through the array at most once.
- **Space Complexity:** `O(1)` as we only maintain an integer variable `maxReach`.
