import os
import re

content_map = {
    "implement-stack-using-arrays.md": """---
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
""",

    "implement-queue-using-arrays.md": """---
title: "Implement Queue using Arrays"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Implement+Queue+using+Arrays"
time: "O(1)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implement-queue-using-array/1"
---

### Problem Statement

Design a data structure that implements a queue using an array. A queue operates on a First-In-First-Out (FIFO) principle. You need to implement the following functions:
- `push(x)`: Adds an element `x` to the rear of the queue.
- `pop()`: Removes the element from the front of the queue and returns it.
- `front()`: Returns the element at the front of the queue.
- `empty()`: Returns true if the queue is empty, false otherwise.

**Example 1:**
```text
Input:
["Queue", "push", "push", "front", "pop", "empty"]
[[], [10], [20], [], [], []]
Output:
[null, null, null, 10, 10, false]
Explanation: 
Queue q = new Queue();
q.push(10); // queue becomes [10]
q.push(20); // queue becomes [10, 20]
q.front();  // returns 10
q.pop();    // returns 10 and queue becomes [20]
q.empty();  // returns false
```

**Example 2:**
```text
Input:
["Queue", "pop", "empty"]
[[], [], []]
Output:
[null, -1, true]
Explanation: 
Queue q = new Queue();
q.pop();    // queue is empty, returns -1
q.empty();  // returns true
```

**Example 3: (Edge Case - Circular Queue behavior)**
```text
Pushing and popping continuously might exhaust the array if pointers only move right.
```

---

### Intuition

To implement a queue, we need two pointers: `frontIndex` and `rearIndex`. Elements are inserted at `rearIndex` and removed from `frontIndex`. To optimize space and prevent the array from being exhausted despite having empty spaces, we use the modulo operator `%` to wrap the pointers around, creating a **Circular Queue**.

---

### Code

```cpp
class MyQueue {
private:
    int* arr;
    int frontIndex;
    int rearIndex;
    int currentSize;
    int capacity;

public:
    // Initialize your data structure here
    MyQueue(int size = 1000) {
        capacity = size;
        arr = new int[capacity];
        frontIndex = 0;
        rearIndex = -1;
        currentSize = 0;
    }
    
    // Adds element x to the rear of the queue
    void push(int x) {
        // Check if queue is full
        if (currentSize == capacity) return;
        
        // Move rear pointer circularly and add element
        rearIndex = (rearIndex + 1) % capacity;
        arr[rearIndex] = x;
        currentSize++;
    }
    
    // Removes the element from the front and returns it
    int pop() {
        // Check if queue is empty
        if (currentSize == 0) return -1;
        
        // Get front element, move front pointer circularly
        int poppedVal = arr[frontIndex];
        frontIndex = (frontIndex + 1) % capacity;
        currentSize--;
        
        return poppedVal;
    }
    
    // Get the front element
    int front() {
        if (currentSize == 0) return -1;
        return arr[frontIndex];
    }
    
    // Returns whether the queue is empty
    bool empty() {
        return currentSize == 0;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for all operations. Updating pointers and size takes constant time.
- **Space Complexity:** `O(N)` where `N` is the capacity of the array.
""",

    "implement-stack-using-queue.md": """---
title: "Implement Stack using Queue"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Implement+Stack+using+Queue+leetcode+225"
time: "O(N)"
space: "O(N)"
platforms:
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
""",

    "implement-queue-using-stack.md": """---
title: "Implement Queue using Stack"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Implement+Queue+using+Stack+leetcode+232"
time: "O(1) Amortized"
space: "O(N)"
platforms:
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
"""
}

base_dir = r"d:\shiva\dsa\src\content\stack-queue"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in content_map:
            filepath = os.path.join(root, file)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content_map[file])
            print(f"Updated {file}")
