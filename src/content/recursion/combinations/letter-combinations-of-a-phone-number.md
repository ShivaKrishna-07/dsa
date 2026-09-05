---
title: "Letter Combinations of a Phone Number"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Letter+Combinations+of+a+Phone+Number"
time: "O(4^N * N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
---

### Problem Statement

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that `1` does not map to any letters.

- 2 -> abc
- 3 -> def
- 4 -> ghi
- 5 -> jkl
- 6 -> mno
- 7 -> pqrs
- 8 -> tuv
- 9 -> wxyz

**Example 1:**
```text
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Example 2:**
```text
Input: digits = ""
Output: []
```

**Example 3:**
```text
Input: digits = "2"
Output: ["a","b","c"]
```

**Constraints:**
- 0 <= digits.length <= 4
- `digits[i]` is a digit in the range `['2', '9']`.

---

### Code

```cpp
class Solution {
public:

    void solve(int i, string s, string digits, vector<string>mp, vector<string>&ans){
        if(i == digits.size()){
            ans.push_back(s);
            return;
        }
        int mpIdx = (digits[i]-'0') - 2;
        cout<<mpIdx;
        string text = mp[mpIdx];
        for(int idx=0; idx<text.size(); idx++){
            s += text[idx];
            solve(i+1, s, digits, mp, ans);
            s.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return {};
        
        vector<string>mp = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string>ans;
        solve(0, "", digits, mp, ans);
        return ans;
    }
};
```
*(Note: An empty check for `digits` was added inside `letterCombinations` to handle the empty string edge case correctly as per LeetCode requirements).*

---

### Complexity Analysis

- **Time Complexity:** O(4^N * N), where N is the length of digits. The worst-case is when the input consists entirely of digits like `7` or `9` which map to 4 letters. The total number of combinations is bounded by 4^N, and we take O(N) time to build and copy each string combination into our answer array.
- **Space Complexity:** O(N) auxiliary space. The recursion call stack reaches a maximum depth of N, and the string `s` takes O(N) space.
