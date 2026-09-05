---
title: "Subsets"
difficulty: "Easy"
youtube: "https://www.youtube.com/watch?v=b7AYbpM5YrE"
time: "O(2^N * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/subsets/description/"
---

### Problem Statement

Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Example 1:**
```text
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**Example 2:**
```text
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- All the numbers of `nums` are unique.

---

### Code

```cpp
class Solution {
public:
    void solve(int i, vector<int>&ds, vector<int>nums, vector<vector<int>>&ans){
        if(i == nums.size()){
            ans.push_back(ds);
            return;
        }
        ds.push_back(nums[i]);
        solve(i+1, ds, nums, ans);
        ds.pop_back();
        solve(i+1, ds, nums, ans);
    }
    vector<vector<int>> subsets(vector<int>& nums){
        vector<vector<int>>ans;
        vector<int>ds;
        solve(0, ds, nums, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^N * N), where N is the number of elements in `nums`. There are exactly 2^N possible subsets, and each time we hit the base case, we copy the subset `ds` into our answer vector `ans`, which takes O(N) time.
- **Space Complexity:** O(N) auxiliary space required for the recursive call stack and the `ds` vector. Note that the output array `ans` takes O(2^N * N) space to store all the answers, but this isn't typically counted as extra algorithmic space.
