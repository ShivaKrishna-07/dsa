---
title: "Implement Stack using Linked List"
difficulty: "Medium"
time: "O(1)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Implement+Stack+using+Linked+List"
  gfg: "https://practice.geeksforgeeks.org/problems/implement-stack-using-linked-list/1"
---

### Problem Statement

Design a stack that supports push, pop, top, and empty operations using a linked list. 
- `push(x)`: Pushes element `x` onto the top of the stack.
- `pop()`: Removes the element on the top of the stack and returns it.

**Example 1:**
```text
Input:
push(2), push(3), pop(), push(4), pop()
Output:
3, 4
Explanation:
push(2) -> stack is 2
push(3) -> stack is 3 -> 2
pop()   -> returns 3, stack becomes 2
push(4) -> stack is 4 -> 2
pop()   -> returns 4
```

**Example 2:**
```text
Input:
pop() on an empty stack
Output:
-1
```

**Example 3: (Edge Case - Pushing many items)**
```text
Input: push(1), push(2), push(3), pop(), pop(), pop()
Output: 3, 2, 1
```

---

### Intuition

Unlike an array-based stack which can overflow, a linked list stack can grow dynamically. To achieve `O(1)` time complexity for all operations, we must insert and remove nodes at the **head** of the linked list. The head of the linked list essentially acts as the top of the stack.

---

### Code

```cpp
/*
struct StackNode {
    int data;
    StackNode *next;
    StackNode(int a) {
        data = a;
        next = NULL;
    }
};
*/

class MyStack {
private:
    StackNode *top;
    
public:
    MyStack() { top = NULL; }
    
    // Function to push an integer into the stack.
    void push(int x) {
        // Create new node and link it before the current top
        StackNode* newNode = new StackNode(x);
        newNode->next = top;
        top = newNode;
    }
    
    // Function to remove an item from top of the stack.
    int pop() {
        // Return -1 if stack is empty
        if (top == NULL) return -1;
        
        // Save data and delete the top node
        int poppedData = top->data;
        StackNode* temp = top;
        top = top->next;
        delete temp;
        
        return poppedData;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for both push and pop because we only manipulate the head pointer.
- **Space Complexity:** `O(N)` since we dynamically allocate memory for each inserted element.
