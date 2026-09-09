---
title: "Sort Stack using Recursion"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Sort+a+Stack+using+Recursion"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/sort-a-stack/1"
  article: "https://takeuforward.org/data-structure/sort-a-stack-using-recursion/"
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
        // Base case: if stack is empty or top is smaller than val
        if(st.empty() || st.top()<val){
            st.push(val);
            return;
        }
        int x = st.top();
        st.pop();
        insert(st, val);
        st.push(x); // Backtrack: restore the element
    }
    void sortStack(stack<int> &st) {
        // Base case: empty stack is trivially sorted
        if(st.empty()) return;
        
        int val = st.top();
        st.pop();
        
        sortStack(st);
        
        // Insert the popped element into the sorted stack
        insert(st, val);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N^2): `sortStack` removes N elements, and `insert` may traverse up to N elements each time in the worst case (reverse sorted).
- **Space Complexity:** O(N): Auxiliary space for the recursive call stack in both functions.
