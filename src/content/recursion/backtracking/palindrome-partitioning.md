---
title: "Palindrome Partitioning"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Palindrome+Partitioning"
time: "O(2^N * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/palindrome-partitioning/"
  article: "https://takeuforward.org/data-structure/palindrome-partitioning/"
---

### Problem Statement

Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of `s`.

**Example 1:**
```text
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

**Example 2:**
```text
Input: s = "a"
Output: [["a"]]
```

**Constraints:**
- 1 <= s.length <= 16
- `s` contains only lowercase English letters.

---

### Code

```cpp
class Solution {
public: 
    bool isPalin(string s){
        int i=0, j=s.size()-1;
        while(i<=j){
            if(s[i++] != s[j--]) return false;
        }
        return true;
    }
    void solve(string s, vector<string>ds, vector<vector<string>>&ans){
        // Base case: If string is fully partitioned
        if(s.size() == 0){
            ans.push_back(ds);
            return;
        }
        
        // Try partitioning at every possible index
        for(int i=0; i<s.size(); i++){
            string parts = s.substr(0, i+1);
            if(isPalin(parts)){
                ds.push_back(parts);
                solve(s.substr(i+1), ds, ans);
                // Backtrack
                ds.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) {
        vector<vector<string>>ans;
        vector<string>ds;

        solve(s, ds, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^N * N): Worst case 2^(N-1) possible partitions, each taking O(N) time to construct and validate.
- **Space Complexity:** O(N): Auxiliary space for the recursion depth and current partition array `ds`.
