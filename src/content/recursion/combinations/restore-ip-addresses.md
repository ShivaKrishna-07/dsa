---
title: "Restore IP Addresses"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Restore+IP+Addresses"
time: "O(3^4)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/restore-ip-addresses/"
---

### Problem Statement

A **valid IP address** consists of exactly four integers separated by single dots. Each integer is between `0` and `255` (inclusive) and cannot have leading zeros.

For example, `"0.1.2.201"` and `"192.168.1.1"` are valid IP addresses, but `"0.011.255.245"`, `"192.168.1.312"` and `"192.168@1.1"` are invalid IP addresses.

Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into `s`. You are not allowed to reorder or remove any digits in `s`. You may return the valid IP addresses in **any** order.

**Example 1:**
```text
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
```

**Example 2:**
```text
Input: s = "0000"
Output: ["0.0.0.0"]
```

**Example 3:**
```text
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

**Constraints:**
- 1 <= s.length <= 20
- `s` consists of digits only.

---

### Code

```cpp
class Solution {
public:
    void findValidIps(int i, string ip, string curr, string s, vector<string>&ans){
        // Base case: string fully traversed
        if(i == s.size()){
            // Must have exactly 3 dots and no leftover current segment
            if(curr.empty() && count(ip.begin(), ip.end(), '.') == 3)
                ans.push_back(ip);
            return;
        }
        
        // No leading zeros allowed in a segment
        if(!curr.empty() and stoi(curr)==0) return;
        
        curr += s[i];
        
        // Segment value cannot exceed 255
        if(stoi(curr) > 255) return;

        // Choice 1: Continue extending current segment
        findValidIps(i+1, ip, curr, s, ans);
        
        // Choice 2: Add dot and start new segment
        if(ip.empty()) findValidIps(i+1, curr, "", s, ans);
        else findValidIps(i+1, ip+"."+curr, "", s, ans);
    }
    vector<string> restoreIpAddresses(string s) {
        vector<string>ans;
        findValidIps(0, "", "", s, ans);

        return ans;
    }
};
```
*(Note: I removed the stray `cout<<ip<<endl;` from your solution snippet to keep the final execution clean and fast without printing to standard output during evaluation!)*

---

### Complexity Analysis

- **Time Complexity:** O(3^4): Exactly 4 segments, each 1 to 3 digits. Bounded to 3^4 = 81 possibilities. Heavily pruned.
- **Space Complexity:** O(N): Auxiliary space for the recursive call stack and string tracking.
