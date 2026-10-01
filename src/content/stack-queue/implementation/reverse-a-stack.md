---
title: "Reverse a Stack"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Reverse+a+Stack+using+recursion"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1"
---

### Problem Statement

You are given a stack `St`. You have to reverse the stack using recursion. 
You are not allowed to use any extra space like arrays or linked lists, although the recursive call stack is allowed.

**Example 1:**
```text
Input:
St = {3,2,1,7,6}
Output:
{6,7,1,2,3}
Explanation:
Input stack from top to bottom is 6, 7, 1, 2, 3. 
When reversed it becomes 3, 2, 1, 7, 6.
```

**Example 2:**
```text
Input:
St = {4,3,9,6}
Output:
{6,9,3,4}
```

**Example 3: (Edge Case - Single element)**
```text
Input: St = {1}
Output: {1}
```

---

### Intuition

To reverse a stack using recursion without extra data structures, we need two recursive functions. The first function `Reverse` pops elements and stores them in the call stack until the original stack is empty. The second function `insertAtBottom` is then called for each popped element as the recursion unwinds, which strategically pushes the element all the way down to the bottom of the stack!

---

### Code

```cpp
class Solution {
private:
    // Helper function to insert an element at the bottom of the stack
    void insertAtBottom(stack<int>& st, int element) {
        // Base case: if stack is empty, we found the bottom!
        if (st.empty()) {
            st.push(element);
            return;
        }
        
        // Pop the top element and hold it in the call stack
        int topElement = st.top();
        st.pop();
        
        // Recursively go deeper
        insertAtBottom(st, element);
        
        // Put the top element back after the target element was inserted at bottom
        st.push(topElement);
    }

public:
    void Reverse(stack<int>& st) {
        // Base case: if stack is empty, nothing to reverse
        if (st.empty()) {
            return;
        }
        
        // Pop the top element
        int topElement = st.top();
        st.pop();
        
        // Recursively reverse the remaining stack
        Reverse(st);
        
        // Insert the popped element at the bottom of the reversed stack
        insertAtBottom(st, topElement);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N^2)`. The `Reverse` function is called `N` times. During each call, `insertAtBottom` takes `O(N)` time to traverse down to the bottom of the stack.
- **Space Complexity:** `O(N)` due to the recursive call stack for both `Reverse` and `insertAtBottom`.
