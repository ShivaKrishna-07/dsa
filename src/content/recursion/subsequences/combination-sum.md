---
title: "Combination Sum"
difficulty: "Medium"
youtube: "https://www.youtube.com/watch?v=OyZFFqQtu98"
time: "O(2^T * k)"
space: "O(T/min)"
platforms:
  leetcode: "https://leetcode.com/problems/combination-sum/description/"
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
        if(i == nums.size()){
            if(target == 0){
                ans.push_back(ds);
                return;
            }
            return;
        }
        if(nums[i] <= target){
            ds.push_back(nums[i]);
            solve(i, ds, nums, target-nums[i], ans);
            ds.pop_back();
        }
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

- **Time Complexity:** O(2^T * k), where T is the target value and k is the average length of each combination. In the worst-case, if the smallest candidate is 1, we can branch up to T times. At each step, we either pick the element and stay at the same index, or skip it. Copying the combination array `ds` into `ans` takes O(k) time.
- **Space Complexity:** O(\frac{T}{\text{min}(candidates)}) auxiliary space. This is the maximum possible depth of our recursive call stack, assuming we keep picking the smallest element until we exceed the target.
