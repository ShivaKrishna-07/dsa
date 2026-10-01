---
title: "Implement Stack using Queue"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Implement+Stack+using+Queue+leetcode+225"
  leetcode: "https://leetcode.com/problems/implement-stack-using-queues/"
---

### Problem Statement

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

*Note:* You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.

**Example 1:**
```text
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]
Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
```

**Example 2:**
```text
Input: ["MyStack", "push", "pop", "empty"]
[[], [5], [], []]
Output: [null, null, 5, true]
```

**Example 3: (Edge Case - Multiple pops)**
```text
Input: ["MyStack", "push", "push", "pop", "pop", "empty"]
[[], [1], [2], [], [], []]
Output: [null, null, null, 2, 1, true]
```

---

### Intuition

A queue works in First-In-First-Out (FIFO), while a stack needs Last-In-First-Out (LIFO). 
We can cleverly simulate LIFO using just **one queue**! When a new element is pushed, we add it to the back of the queue. Then, we simply take all the previously existing elements in the queue, pop them one by one, and push them right back in. This completely reverses the order, putting the newest element at the absolute front of the queue, making it ready to be popped first!

---

### Code

```cpp
class MyStack {
private:
    queue<int> q;

public:
    MyStack() {}
    
    void push(int x) {
        // Step 1: Add new element
        q.push(x);
        
        // Step 2: Cycle all previous elements behind the new one
        int size = q.size();
        for (int i = 0; i < size - 1; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    
    int pop() {
        // Front element is the most recently added due to cycling
        int val = q.front();
        q.pop();
        return val;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return q.empty();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** 
  - `push()` takes `O(N)` because we move `N-1` elements to the back of the queue.
  - `pop()`, `top()`, and `empty()` take `O(1)`.
- **Space Complexity:** `O(N)` for the single queue holding `N` elements.
