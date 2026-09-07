---
title: "Palindrome Partitioning"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Palindrome+Partitioning"
time: "O(2^N * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/palindrome-partitioning/"
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
        if(s.size() == 0){
            ans.push_back(ds);
            return;
        }
        for(int i=0; i<s.size(); i++){
            string parts = s.substr(0, i+1);
            if(isPalin(parts)){
                ds.push_back(parts);
                solve(s.substr(i+1), ds, ans);
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

- **Time Complexity:** O(2^N * N), where N is the length of the string. In the worst-case scenario where every substring is a palindrome (e.g., `"aaaa"`), there are exactly 2^(N-1) possible partitions. For each partition, validating palindromes and constructing substrings takes an additional O(N) time.
- **Space Complexity:** O(N) auxiliary space. The recursion call stack reaches a maximum depth of N. The current partition array `ds` also uses O(N) space to store the substrings at each level.
