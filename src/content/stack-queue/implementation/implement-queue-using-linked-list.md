---
title: "Implement Queue using Linked List"
difficulty: "Medium"
time: "O(1)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Implement+Queue+using+Linked+List"
  gfg: "https://practice.geeksforgeeks.org/problems/implement-queue-using-linked-list/1"
---

### Problem Statement

Design a queue that supports push and pop operations using a linked list.
- `push(x)`: Adds an element `x` to the rear of the queue.
- `pop()`: Removes the element from the front of the queue and returns it.

**Example 1:**
```text
Input:
push(2), push(3), pop(), push(4), pop()
Output:
2, 3
Explanation:
push(2) -> queue is 2
push(3) -> queue is 2 -> 3
pop()   -> returns 2, queue becomes 3
push(4) -> queue is 3 -> 4
pop()   -> returns 3
```

**Example 2:**
```text
Input:
pop() on an empty queue
Output:
-1
```

**Example 3: (Edge Case - Alternating push and pop)**
```text
Input: push(10), pop(), push(20), pop()
Output: 10, 20
```

---

### Intuition

To maintain `O(1)` time complexity for both push and pop operations in a Queue (First-In-First-Out), we need to maintain two pointers: `front` and `rear`. 
We insert new nodes at the `rear` and remove nodes from the `front`. This avoids the need to traverse the entire linked list for every operation.

---

### Code

```cpp
/* Structure of a node in Queue
struct QueueNode {
    int data;
    QueueNode *next;
    QueueNode(int a) {
        data = a;
        next = NULL;
    }
};
*/

class MyQueue {
private:
    QueueNode *front;
    QueueNode *rear;
    
public:
    MyQueue() { front = rear = NULL; }
    
    // Function to push an element into the queue.
    void push(int x) {
        QueueNode* newNode = new QueueNode(x);
        
        // If queue is empty, new node is both front and rear
        if (front == NULL) {
            front = rear = newNode;
            return;
        }
        
        // Otherwise, add to the end and update rear
        rear->next = newNode;
        rear = newNode;
    }
    
    // Function to pop front element from the queue.
    int pop() {
        // Return -1 if queue is empty
        if (front == NULL) return -1;
        
        // Retrieve data and delete front node
        int poppedData = front->data;
        QueueNode* temp = front;
        front = front->next;
        
        // If queue becomes empty, update rear to NULL too
        if (front == NULL) {
            rear = NULL;
        }
        
        delete temp;
        return poppedData;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for both push and pop. We directly access `rear` for insertions and `front` for deletions.
- **Space Complexity:** `O(N)` because we dynamically create a node for every pushed element.
