---
title: "Implement Stack using Arrays"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Implement+Stack+using+Arrays"
time: "O(1)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implement-stack-using-array/1"
---

### Problem Statement

Design a data structure that implements a stack using an array. A stack operates on a Last-In-First-Out (LIFO) principle. You need to implement the following functions:
- `push(x)`: Pushes element `x` onto the top of the stack.
- `pop()`: Removes the element on the top of the stack and returns it.
- `top()`: Returns the element on the top of the stack.
- `empty()`: Returns true if the stack is empty, false otherwise.

**Example 1:**
```text
Input:
["Stack", "push", "push", "top", "pop", "empty"]
[[], [3], [5], [], [], []]
Output:
[null, null, null, 5, 5, false]
Explanation: 
Stack st = new Stack();
st.push(3); // stack becomes [3]
st.push(5); // stack becomes [3, 5]
st.top();   // returns 5
st.pop();   // returns 5 and stack becomes [3]
st.empty(); // returns false
```

**Example 2:**
```text
Input:
["Stack", "pop", "empty"]
[[], [], []]
Output:
[null, -1, true]
Explanation: 
Stack st = new Stack();
st.pop();   // stack is empty, typically returns -1
st.empty(); // returns true
```

**Example 3: (Edge Case - Stack Overflow)**
```text
Input: Max capacity 2. push(1), push(2), push(3)
Output: Stack overflow on 3rd push if using fixed size array.
```

---

### Intuition

An array is perfectly suited to implement a stack. We can keep an integer variable `topIndex` initialized to `-1`. When we push, we increment `topIndex` and store the value at that index. When we pop, we simply return the value at `topIndex` and decrement `topIndex`. This makes all operations extremely fast and constant time.

---

### Code

```cpp
class MyStack {
private:
    int* arr;
    int topIndex;
    int capacity;

public:
    // Initialize your data structure here
    MyStack(int size = 1000) {
        capacity = size;
        arr = new int[capacity];
        topIndex = -1;
    }
    
    // Push element x onto stack
    void push(int x) {
        // Check for stack overflow
        if (topIndex >= capacity - 1) return;
        
        // Increment top pointer and add element
        topIndex++;
        arr[topIndex] = x;
    }
    
    // Removes the element on top of the stack and returns that element
    int pop() {
        // Check for stack underflow
        if (topIndex == -1) return -1;
        
        // Return element and decrement pointer
        int poppedVal = arr[topIndex];
        topIndex--;
        
        return poppedVal;
    }
    
    // Get the top element
    int top() {
        if (topIndex == -1) return -1;
        return arr[topIndex];
    }
    
    // Returns whether the stack is empty
    bool empty() {
        return topIndex == -1;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for all operations (`push`, `pop`, `top`, `empty`) as we directly access array indices.
- **Space Complexity:** `O(N)` where `N` is the capacity of the array allocated initially.
