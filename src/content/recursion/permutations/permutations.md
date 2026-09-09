---
title: "Permutations"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Permutations"
time: "O(N! * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/permutations/"
  article: "https://takeuforward.org/data-structure/print-all-permutations-of-a-string-array/"
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
        // Base case: combination length matches array size
        if(ds.size() == nums.size()){
            ans.push_back(ds);
            return;
        }

        for(int i=0; i<nums.size(); i++){
            // If element is not yet chosen
            if(!freq[i]){
                ds.push_back(nums[i]);
                freq[i] = 1; // Mark as visited
                
                findPermutations(ds, freq, nums, ans);
                
                // Backtrack
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

- **Time Complexity:** O(N! * N): N! possible permutations. For each, pushing the combination to the answer array takes O(N).
- **Space Complexity:** O(N): Auxiliary space for the recursion call stack, `ds` array, and `freq` array.
