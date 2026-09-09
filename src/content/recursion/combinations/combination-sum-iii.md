---
title: "Combination Sum III"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Combination+Sum+III"
time: "O(2^9 * k)"
space: "O(k)"
platforms:
  leetcode: "https://leetcode.com/problems/combination-sum-iii/description/"
---

### Problem Statement

Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:
- Only numbers `1` through `9` are used.
- Each number is used **at most once**.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

**Example 1:**
```text
Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
```

**Example 2:**
```text
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.
```

**Constraints:**
- 2 <= k <= 9
- 1 <= n <= 60

---

### Code

```cpp
class Solution {
public:
    void solve(int i, int sum, vector<int>ds, int n, int k, vector<vector<int>>&ans){
        // Base case: reached 10 or valid combination length
        if(i==10 || ds.size()==k){
            if(ds.size() == k && sum == n){
                ans.push_back(ds);
            }
            return;
        }

        // Include current number
        ds.push_back(i);
        solve(i+1, sum+i, ds, n, k, ans);
        
        // Exclude current number (backtrack)
        ds.pop_back();
        solve(i+1, sum, ds, n, k, ans);
    }
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>>ans;
        vector<int>ds;
        solve(1, 0, ds, n, k, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^9 * k): 9 numbers (1 to 9) yields 2^9 possible combinations. O(k) to copy valid ones.
- **Space Complexity:** O(k): Auxiliary space for the recursion stack and `ds` array.
