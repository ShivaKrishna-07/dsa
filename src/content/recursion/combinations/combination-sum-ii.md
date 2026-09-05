---
title: "Combination Sum II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Combination+Sum+II"
time: "O(2^N * k)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/combination-sum-ii/description/"
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
        if(target == 0){
            ans.push_back(ds);
            return;
        }
        for(int idx=i; idx<nums.size(); idx++){
            if(target < nums[idx]) break;
            if(idx>i && nums[idx] == nums[idx-1]) continue;
            ds.push_back(nums[idx]);
            solve(idx+1, ds, nums, target-nums[idx], ans);
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

- **Time Complexity:** O(2^N * k), where N is the size of the array and k is the average length of the combinations. We generate subsets recursively up to a bound of 2^N possibilities. For each valid combination, we append it to our answer array which takes O(k) time. (Sorting the array takes O(N log N), which is extremely small compared to the combination generation).
- **Space Complexity:** O(N) auxiliary space. The `ds` vector and the recursive call stack will at most reach a depth of N. Note that the output space required for the 2D array of combinations is not typically counted toward the auxiliary space complexity.
