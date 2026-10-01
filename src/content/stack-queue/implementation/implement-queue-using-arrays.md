---
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
