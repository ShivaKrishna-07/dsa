---
title: "Combination Sum"
difficulty: "Medium"
youtube: "https://www.youtube.com/watch?v=OyZFFqQtu98"
time: "O(2^T * k)"
space: "O(T/min)"
platforms:
  leetcode: "https://leetcode.com/problems/combination-sum/description/"
  article: "https://takeuforward.org/data-structure/combination-sum-1/"
---

### Problem Statement

Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Example 1:**
```text
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**
```text
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

**Constraints:**
- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- All elements of `candidates` are **distinct**.
- 1 <= target <= 40

---

### Code

```cpp
class Solution {
public:
    void solve(int i, vector<int>&ds, vector<int>nums, int target, vector<vector<int>>&ans){
        // Base case: processed all elements
        if(i == nums.size()){
            if(target == 0){
                ans.push_back(ds);
                return;
            }
            return;
        }
        
        // Include element if it doesn't exceed target
        if(nums[i] <= target){
            ds.push_back(nums[i]);
            solve(i, ds, nums, target-nums[i], ans);
            ds.pop_back(); // Backtrack
        }
        
        // Exclude current element and move to next
        solve(i+1, ds, nums, target, ans);
    }
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>>ans;
        vector<int>ds;
        solve(0, ds, candidates, target, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^T * k): T is target value, k is average combination length. Worst case branching up to T times.
- **Space Complexity:** O(T/min(candidates)): Auxiliary space for recursive stack depth.
