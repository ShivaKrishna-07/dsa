---
title: "Generate Parentheses"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Generate+Parentheses"
time: "O(4^n / sqrt(n))"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/generate-parentheses/"
---

### Problem Statement

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example 1:**
```text
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**
```text
Input: n = 1
Output: ["()"]
```

**Constraints:**
- 1 <= n <= 8

---

### Code

```cpp
class Solution {
public:
    void solve(string temp, int n, vector<string>&ans, int open, int close){
        // Base case: valid parentheses of length 2n
        if(temp.size() == 2*n){
            ans.push_back(temp);
            return;
        }

        // Add open parenthesis if we haven't reached n
        if(open<n) solve(temp+'(', n, ans, open+1, close);
        
        // Add close parenthesis if valid
        if(close<open) solve(temp+')', n, ans, open, close+1);
    }
    vector<string> generateParenthesis(int n) {
        vector<string>ans;

        solve("", n, ans, 0, 0);

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(4^n / sqrt(n)): Tied to n-th Catalan number, representing valid combinations.
- **Space Complexity:** O(N): Auxiliary space for max recursion depth N = 2n.
