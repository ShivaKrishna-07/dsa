---
title: "Sort Stack using Recursion"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Sort+a+Stack+using+Recursion"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/sort-a-stack/1"
---

### Problem Statement

Given a stack, the task is to sort it such that the top of the stack has the greatest element.

**Example 1:**
```text
Input:
Stack: 3 2 1
Output: 3 2 1
```

**Example 2:**
```text
Input:
Stack: 11 2 32 3 41
Output: 41 32 11 3 2
```

---

### Code

```cpp
class Solution {
  public:
    void insert(stack<int> &st, int val){
        if(st.empty() || st.top()<val){
            st.push(val);
            return;
        }
        int x = st.top();
        st.pop();
        insert(st, val);
        st.push(x);
    }
    void sortStack(stack<int> &st) {
        // code here
        if(st.empty()) return;
        
        int val = st.top();
        st.pop();
        sortStack(st);
        insert(st, val);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N^2) in the worst case. The `sortStack` function removes each element one by one (N times). For each element, the `insert` function is called, which in the worst case (e.g., when the stack is already sorted in reverse order) requires popping and pushing all elements currently in the stack, leading to quadratic time complexity.
- **Space Complexity:** O(N) auxiliary space for the recursive call stack. Both `sortStack` and `insert` can go up to a depth of N.
