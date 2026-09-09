---
title: "Combination Sum II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Combination+Sum+II"
time: "O(2^N * k)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/combination-sum-ii/description/"
  article: "https://takeuforward.org/data-structure/combination-sum-ii-find-all-unique-combinations/"
---

### Problem Statement

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**
```text
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**
```text
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
```

**Constraints:**
- 1 <= candidates.length <= 100
- 1 <= candidates[i] <= 50
- 1 <= target <= 30

---

### Code

```cpp
class Solution {
public:
    void solve(int i, vector<int>&ds, vector<int>nums, int target, vector<vector<int>>&ans){
        // Base case: target is reached
        if(target == 0){
            ans.push_back(ds);
            return;
        }
        for(int idx=i; idx<nums.size(); idx++){
            // Prune if current number exceeds target
            if(target < nums[idx]) break;
            // Skip duplicate elements
            if(idx>i && nums[idx] == nums[idx-1]) continue;
            
            ds.push_back(nums[idx]);
            solve(idx+1, ds, nums, target-nums[idx], ans);
            // Backtrack
            ds.pop_back();
        }
    }
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>>ans;
        vector<int>ds;
        solve(0, ds, candidates, target, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^N * k): N is array size, k is average combination length. Up to 2^N subsets, and O(k) to copy each valid one to the answer.
- **Space Complexity:** O(N): Auxiliary space for the recursion depth and `ds` vector.
