---
title: "Subsets II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Subsets+II"
time: "O(2^N * N log(X))"
space: "O(2^N * N)"
platforms:
  leetcode: "https://leetcode.com/problems/subsets-ii/description/"
  article: "https://takeuforward.org/data-structure/subset-ii-print-all-the-unique-subsets/"
---

### Problem Statement

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the solution in any order.

**Example 1:**
```text
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**Example 2:**
```text
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10

---

### Code

```cpp
class Solution {
public:
    void solve(int i, vector<int>&ds, vector<int>nums, set<vector<int>>&ans){
        // Base case: reached end of array
        if(i == nums.size()){
            ans.insert(ds);
            return;
        }
        
        // Include current element
        ds.push_back(nums[i]);
        solve(i+1, ds, nums, ans);
        
        // Exclude current element
        ds.pop_back();
        solve(i+1, ds, nums, ans);
    }
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        set<vector<int>>ans;
        vector<int>ds;
        sort(nums.begin(), nums.end());
        solve(0, ds, nums, ans);
        vector<vector<int>>res(ans.begin(), ans.end());
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^N * N log(X)) + O(N log N): Generate 2^N subsets, takes O(N) to insert into `set`.
- **Space Complexity:** O(2^N * N): Auxiliary space to store unique subsets in `set` before transferring to vector.
