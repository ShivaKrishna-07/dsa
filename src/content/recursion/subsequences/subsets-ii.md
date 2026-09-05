---
title: "Subsets II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Subsets+II"
time: "O(2^N * N log(X))"
space: "O(2^N * N)"
platforms:
  leetcode: "https://leetcode.com/problems/subsets-ii/description/"
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
        if(i == nums.size()){
            ans.insert(ds);
            return;
        }
        ds.push_back(nums[i]);
        solve(i+1, ds, nums, ans);
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

- **Time Complexity:** O(2^N * N log(X)) + O(N log N), where N is the number of elements in `nums`. We first sort the array taking O(N log N). There are 2^N possible subsets generated, and each subset takes O(N) time to insert into the `std::set`. The logarithmic factor comes from the `set` insertion (where X is the number of unique subsets generated so far, bounded by 2^N).
- **Space Complexity:** O(2^N * N) to store all the unique subsets inside the `set` before transferring them to the final vector `res`. Additionally, the recursion stack and temporary subset array `ds` take O(N) auxiliary space.
