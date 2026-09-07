---
title: "Permutations"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Permutations"
time: "O(N! * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/permutations/"
---

### Problem Statement

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in **any order**.

**Example 1:**
```text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**
```text
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**
```text
Input: nums = [1]
Output: [[1]]
```

**Constraints:**
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of `nums` are unique.

---

### Code

```cpp
class Solution {
public:

    void findPermutations(vector<int>& ds, int freq[], vector<int>& nums, vector<vector<int>>& ans){
        if(ds.size() == nums.size()){
            ans.push_back(ds);
            return;
        }

        for(int i=0; i<nums.size(); i++){
            if(!freq[i]){
                ds.push_back(nums[i]);
                freq[i] = 1;
                findPermutations(ds, freq, nums, ans);
                ds.pop_back();
                freq[i] = 0;
            }
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> ans;
        vector<int> ds;
        int freq[nums.size()];
        for (int i = 0; i < nums.size(); i++) freq[i] = 0;

        findPermutations(ds, freq, nums, ans);

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N! * N). There are N! (factorial of N) possible permutations for an array of size N. For each valid permutation, we do an O(N) operation to push the combination `ds` into the answer array. 
- **Space Complexity:** O(N) auxiliary space. The recursion call stack reaches a maximum depth of N. The data structures we maintain—the `ds` array and the `freq` boolean frequency array—also both take O(N) space.
