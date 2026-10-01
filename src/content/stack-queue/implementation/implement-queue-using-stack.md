---
title: "Implement Queue using Stack"
difficulty: "Easy"
time: "O(1) Amortized"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Implement+Queue+using+Stack+leetcode+232"
  leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/"
---

### Problem Statement

Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

*Note:* You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.

**Example 1:**
```text
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]
Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2]
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

**Example 2:**
```text
Input: ["MyQueue", "push", "pop", "empty"]
[[], [5], [], []]
Output: [null, null, 5, true]
```

**Example 3: (Edge Case - Interleaved Push and Pop)**
```text
Push 1, Push 2, Pop (gets 1), Push 3, Pop (gets 2)
```

---

### Intuition

A stack is LIFO, but we need FIFO. We can achieve this by maintaining two stacks: `input` and `output`. 
- Every new element is simply pushed to `input` (`O(1)`).
- When we need to `pop` or `peek`, we check `output`. If `output` is empty, we pour everything from `input` into `output`. This completely reverses the order, placing the oldest elements at the top of `output`, exactly where a queue would expect them!

---

### Code

```cpp
class MyQueue {
private:
    stack<int> input;
    stack<int> output;

public:
    MyQueue() {}
    
    void push(int x) {
        // Always push to the input stack
        input.push(x);
    }
    
    int pop() {
        // Ensure output stack has the reversed elements
        if (output.empty()) {
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
        }
        
        // Pop the top of output (which is the front of the queue)
        int val = output.top();
        output.pop();
        return val;
    }
    
    int peek() {
        // Same logic as pop, but just peek at the top
        if (output.empty()) {
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
        }
        
        return output.top();
    }
    
    bool empty() {
        return input.empty() && output.empty();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** 
  - `push()` takes `O(1)`.
  - `pop()` and `peek()` take `O(1)` **amortized** time. Moving elements between stacks happens rarely, so on average, it's `O(1)` per operation.
- **Space Complexity:** `O(N)` since we store `N` elements across two stacks.
