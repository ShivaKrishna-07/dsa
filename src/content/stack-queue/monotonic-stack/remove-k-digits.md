---
title: "Remove K Digits"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack"]
---

### Problem Statement

Remove exactly `k` digits from a non-negative number to produce the smallest possible number.

### Examples

- **Input:** `num = "1432219", k = 3` **Output:** `"1219"`
- **Input:** `num = "10200", k = 1` **Output:** `"200"`
- **Input:** `num = "10", k = 2` **Output:** `"0"`

### Constraints

- `1 <= num.length <= 10^5`
- `num` contains only digits and has no leading zero unless it is `"0"`.
- `0 <= k <= num.length`

### Intuition

Remove a previous larger digit whenever a smaller current digit arrives. The remaining digits are the smallest lexicographic choice.

### Code

```cpp
string removeKdigits(string number, int k) {
    string st;
    for (char digit : number) {
        while (k && !st.empty() && st.back() > digit) { st.pop_back(); --k; }
        st.push_back(digit);
    }
    while (k-- && !st.empty()) st.pop_back();
    int start = st.find_first_not_of('0');
    return start == string::npos ? "0" : st.substr(start);
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` amortized because each digit is pushed and removed at most once.
- **Space Complexity:** `O(N)` for the monotonic digit stack.
