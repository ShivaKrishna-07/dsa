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
        if(temp.size() == 2*n){
            ans.push_back(temp);
            return;
        }

        if(open<n) solve(temp+'(', n, ans, open+1, close);
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

- **Time Complexity:** O<=ft(4^n / sqrt(n)). The time complexity is tied to the n-th Catalan number, which represents the number of valid well-formed parentheses combinations. For each valid sequence of length 2n, we do O(n) work to construct the string.
- **Space Complexity:** O(N) auxiliary space, where N = 2n, due to the maximum depth of the recursive call stack. The output array `ans` takes O<=ft(4^n / sqrt(n) * n) space to store all the strings, though it's typically excluded from auxiliary space.
