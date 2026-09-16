---
title: "Expression Add Operators"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Expression+Add+Operators+leetcode+282"
time: "O(N * 4^N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/expression-add-operators/"
---

### Problem Statement

Given a string `num` that contains only digits and an integer `target`, return all possibilities to insert the binary operators `'+'`, `'-'`, and/or `'*'` between the digits of `num` so that the resultant expression evaluates to the `target` value.

Note that operands in the returned expressions **should not** contain leading zeros.

**Example 1:**
```text
Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.
```

**Example 2:**
```text
Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.
```

**Example 3:**
```text
Input: num = "3456237490", target = 9191
Output: []
Explanation: There are no expressions that evaluate to 9191.
```

**Constraints:**
- 1 <= num.length <= 10
- `num` consists of only digits.
- -2^31 <= target <= 2^31 - 1

---

### Code

```cpp
class Solution {
public:
    void solve(string& num, int target, int idx, long cur, long prev, string path, vector<string>& ans){
        // Base case: all digits used, check if expression equals target
        if(idx == num.size()){
            if(cur == target) ans.push_back(path);
            return;
        }

        for(int i=idx; i<num.size(); i++){
            // No leading zeros allowed (e.g., "05")
            if(i > idx && num[idx] == '0') break;

            string part = num.substr(idx, i-idx+1);
            long val = stol(part);

            // First operand: no operator needed
            if(idx == 0){
                solve(num, target, i+1, val, val, part, ans);
            } else {
                // Try addition
                solve(num, target, i+1, cur+val, val, path+"+"+part, ans);

                // Try subtraction
                solve(num, target, i+1, cur-val, -val, path+"-"+part, ans);

                // Try multiplication: undo prev, apply prev*val
                solve(num, target, i+1, cur-prev + prev*val, prev*val, path+"*"+part, ans);
            }
        }
    }

    vector<string> addOperators(string num, int target) {
        vector<string> ans;
        solve(num, target, 0, 0, 0, "", ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N * 4^N): At each digit position, we have 4 choices (join digit, +, -, *). String operations add O(N) per call.
- **Space Complexity:** O(N): Auxiliary space for the recursion depth, bounded by the length of `num`.
